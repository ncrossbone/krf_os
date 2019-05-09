Ext.define('Ext.draw.Animator', {
    uses: ['Ext.draw.Draw'],
    singleton: true,

    frameCallbacks: {},
    frameCallbackId: 0,
    scheduled: 0,
    frameStartTimeOffset: Ext.now(),
    animations: [],
    running: false,

    animationTime: function () {
        return Ext.AnimationQueue.frameStartTime - this.frameStartTimeOffset;
    },

    add: function (animation) {
        var me = this;
        if (!me.contains(animation)) {
            me.animations.push(animation);
            me.ignite();
            if ('fireEvent' in animation) {
                animation.fireEvent('animationstart', animation);
            }
        }
    },

    remove: function (animation) {
        var me = this,
            animations = me.animations,
            i = 0,
            l = animations.length;

        for (; i < l; ++i) {
            if (animations[i] === animation) {
                animations.splice(i, 1);
                if ('fireEvent' in animation) {
                    animation.fireEvent('animationend', animation);
                }
                return;
            }
        }
    },

    contains: function (animation) {
        return Ext.Array.indexOf(this.animations, animation) > -1;
    },

    empty: function () {
        return this.animations.length === 0;
    },

    step: function (frameTime) {
        var me = this,
            animations = me.animations,
            animation,
            i = 0,
            ln = animations.length;

        for (; i < ln; i++) {
            animation = animations[i];
            animation.step(frameTime);
            if (!animation.animating) {
                animations.splice(i, 1);
                i--;
                ln--;
                if (animation.fireEvent) {
                    animation.fireEvent('animationend', animation);
                }
            }
        }
    },

    schedule: function (callback, scope) {
        scope = scope || this;
        var id = 'frameCallback' + (this.frameCallbackId++);

        if (Ext.isString(callback)) {
            callback = scope[callback];
        }
        Ext.draw.Animator.frameCallbacks[id] = {fn: callback, scope: scope, once: true};
        this.scheduled++;
        Ext.draw.Animator.ignite();
        return id;
    },

    scheduleIf: function (callback, scope) {
        scope = scope || this;
        var frameCallbacks = Ext.draw.Animator.frameCallbacks,
            cb, id;

        if (Ext.isString(callback)) {
            callback = scope[callback];
        }
        for (id in frameCallbacks) {
            cb = frameCallbacks[id];
            if (cb.once && cb.fn === callback && cb.scope === scope) {
                return null;
            }
        }
        return this.schedule(callback, scope);
    },

    cancel: function (id) {
        if (Ext.draw.Animator.frameCallbacks[id] && Ext.draw.Animator.frameCallbacks[id].once) {
            this.scheduled--;
            delete Ext.draw.Animator.frameCallbacks[id];
        }
    },

    addFrameCallback: function (callback, scope) {
        scope = scope || this;
        if (Ext.isString(callback)) {
            callback = scope[callback];
        }
        var id = 'frameCallback' + (this.frameCallbackId++);

        Ext.draw.Animator.frameCallbacks[id] = {fn: callback, scope: scope};
        return id;
    },

    removeFrameCallback: function (id) {
        delete Ext.draw.Animator.frameCallbacks[id];
    },

    fireFrameCallbacks: function () {
        var callbacks = this.frameCallbacks,
            id, fn, cb;

        for (id in callbacks) {
            cb = callbacks[id];
            fn = cb.fn;
            if (Ext.isString(fn)) {
                fn = cb.scope[fn];
            }

            fn.call(cb.scope);

            if (callbacks[id] && cb.once) {
                this.scheduled--;
                delete callbacks[id];
            }
        }
    },

    handleFrame: function() {
        var me = this;

        me.step(me.animationTime());
        me.fireFrameCallbacks();
        if (!me.scheduled && me.empty()) {
            Ext.AnimationQueue.stop(me.handleFrame, me);
            me.running = false;
            Ext.draw.Draw.endUpdateIOS();
        }
    },

    ignite: function() {
        if (!this.running) {
            this.running = true;
            Ext.AnimationQueue.start(this.handleFrame, this);
            Ext.draw.Draw.beginUpdateIOS();
        }
    }
});
