
Ext.define('Ext.draw.modifier.Animation', {
    requires: [
        'Ext.draw.TimingFunctions',
        'Ext.draw.Animator'
    ],
    extend: 'Ext.draw.modifier.Modifier',
    alias: 'modifier.animation',

    config: {
        
        easing: Ext.identityFn,

        duration: 0,

        customEasings: {},

        customDurations: {}
    },

    constructor: function (config) {
        var me = this;

        me.anyAnimation = me.anySpecialAnimations = false;
        me.animating = 0;
        me.animatingPool = [];
        me.callParent([config]);
    },

    prepareAttributes: function (attr) {
        if (!attr.hasOwnProperty('timers')) {
            attr.animating = false;
            attr.timers = {};
            attr.animationOriginal = Ext.Object.chain(attr);
            attr.animationOriginal.prototype = attr;
        }
        if (this._lower) {
            this._lower.prepareAttributes(attr.animationOriginal);
        }
    },

    updateSprite: function (sprite) {
        this.setConfig(sprite.config.fx);
    },

    updateDuration: function (duration) {
        this.anyAnimation = duration > 0;
    },

    applyEasing: function (easing) {
        if (typeof easing === 'string') {
            easing = Ext.draw.TimingFunctions.easingMap[easing];
        }
        return easing;
    },

    applyCustomEasings: function (newEasings, oldEasings) {
        oldEasings = oldEasings || {};
        var any, key, attrs, easing, i, ln;

        for (key in newEasings) {
            any = true;
            easing = newEasings[key];
            attrs = key.split(',');
            if (typeof easing === 'string') {
                easing = Ext.draw.TimingFunctions.easingMap[easing];
            }
            for (i = 0, ln = attrs.length; i < ln; i++) {
                oldEasings[attrs[i]] = easing;
            }
        }
        if (any) {
            this.anySpecialAnimations = any;
        }
        return oldEasings;
    },

    setEasingOn: function (attrs, easing) {
        attrs = Ext.Array.from(attrs).slice();
        var customEasings = {},
            ln = attrs.length,
            i = 0;

        for (; i < ln; i++) {
            customEasings[attrs[i]] = easing;
        }
        this.setCustomEasings(customEasings);
    },

    clearEasingOn: function (attrs) {
        attrs = Ext.Array.from(attrs, true);
        var i = 0, ln = attrs.length;
        for (; i < ln; i++) {
            delete this._customEasings[attrs[i]];
        }
    },

    applyCustomDurations: function (newDurations, oldDurations) {
        oldDurations = oldDurations || {};
        var any, key, duration, attrs, i, ln;

        for (key in newDurations) {
            any = true;
            duration = newDurations[key];
            attrs = key.split(',');
            for (i = 0, ln = attrs.length; i < ln; i++) {
                oldDurations[attrs[i]] = duration;
            }
        }
        if (any) {
            this.anySpecialAnimations = any;
        }
        return oldDurations;
    },

    setDurationOn: function (attrs, duration) {
        attrs = Ext.Array.from(attrs).slice();
        var customDurations = {},
            i = 0,
            ln = attrs.length;

        for (; i < ln; i++) {
            customDurations[attrs[i]] = duration;
        }
        this.setCustomDurations(customDurations);
    },

    clearDurationOn: function (attrs) {
        attrs = Ext.Array.from(attrs, true);
        var i = 0, ln = attrs.length;

        for (; i < ln; i++) {
            delete this._customDurations[attrs[i]];
        }
    },

    setAnimating: function (attr, animating) {
        var me = this,
            pool = me.animatingPool;

        if (attr.animating !== animating) {
            attr.animating = animating;
            if (animating) {
                pool.push(attr);
                if (me.animating === 0) {
                    Ext.draw.Animator.add(me);
                }
                me.animating++;
            } else {
                for (var i = pool.length; i--;) {
                    if (pool[i] === attr) {
                        pool.splice(i, 1);
                    }
                }
                me.animating = pool.length;
            }
        }
    },

    setAttrs: function (attr, changes) {
        var me = this,
            timers = attr.timers,
            parsers = me._sprite.self.def._animationProcessors,
            defaultEasing = me._easing,
            defaultDuration = me._duration,
            customDurations = me._customDurations,
            customEasings = me._customEasings,
            anySpecial = me.anySpecialAnimations,
            any = me.anyAnimation || anySpecial,
            animationOriginal = attr.animationOriginal,
            ignite = false,
            timer, name, newValue, startValue, parser, easing, duration;

        if (!any) { 
            for (name in changes) {
                if (attr[name] === changes[name]) {
                    delete changes[name];
                } else {
                    attr[name] = changes[name];
                }
                delete animationOriginal[name];
                delete timers[name];
            }
            return changes;
        } else { 
            for (name in changes) {
                newValue = changes[name];
                startValue = attr[name];
                if (newValue !== startValue && startValue !== undefined && startValue !== null && (parser = parsers[name])) {
                    
                    easing = defaultEasing;
                    duration = defaultDuration;
                    if (anySpecial) {
                        if (name in customEasings) {
                            easing = customEasings[name];
                        }
                        if (name in customDurations) {
                            duration = customDurations[name];
                        }
                    }

                    if (startValue && startValue.isGradient || newValue && newValue.isGradient) {
                        duration = 0;
                    }

                    if (duration) {
                        if (!timers[name]) {
                            timers[name] = {};
                        }

                        timer = timers[name];
                        timer.start = 0;
                        timer.easing = easing;
                        timer.duration = duration;
                        timer.compute = parser.compute;
                        timer.serve = parser.serve || Ext.identityFn;
                        timer.remove = changes.removeFromInstance && changes.removeFromInstance[name];

                        if (parser.parseInitial) {
                            var initial = parser.parseInitial(startValue, newValue);
                            timer.source = initial[0];
                            timer.target = initial[1];
                        } else if (parser.parse) {
                            timer.source = parser.parse(startValue);
                            timer.target = parser.parse(newValue);
                        } else {
                            timer.source = startValue;
                            timer.target = newValue;
                        }
                        animationOriginal[name] = newValue;
                        delete changes[name];
                        ignite = true;
                        continue;
                    } else {
                        delete animationOriginal[name];
                    }
                } else {
                    delete animationOriginal[name];
                }

                delete timers[name];
            }
        }

        if (ignite && !attr.animating) {
            me.setAnimating(attr, true);
        }

        return changes;
    },

    updateAttributes: function (attr) {
        if (!attr.animating) {
            return {};
        }
        var changes = {},
            any = false,
            timers = attr.timers,
            animationOriginal = attr.animationOriginal,
            now = Ext.draw.Animator.animationTime(),
            name, timer, delta;

        if (attr.lastUpdate === now) {
            return null;
        }

        for (name in timers) {
            timer = timers[name];
            if (!timer.start) {
                timer.start = now;
                delta = 0;
            } else {
                delta = (now - timer.start) / timer.duration;
            }
            if (delta >= 1) {
                changes[name] = animationOriginal[name];
                delete animationOriginal[name];
                if (timers[name].remove) {
                    changes.removeFromInstance = changes.removeFromInstance || {};
                    changes.removeFromInstance[name] = true;
                }
                delete timers[name];
            } else {
                changes[name] = timer.serve(timer.compute(timer.source, timer.target, timer.easing(delta), attr[name]));
                any = true;
            }
        }
        attr.lastUpdate = now;
        this.setAnimating(attr, any);
        return changes;
    },

    pushDown: function (attr, changes) {
        changes = this.callParent([attr.animationOriginal, changes]);
        return this.setAttrs(attr, changes);
    },

    popUp: function (attr, changes) {
        attr = attr.prototype;
        changes = this.setAttrs(attr, changes);
        if (this._upper) {
            return this._upper.popUp(attr, changes);
        } else {
            return Ext.apply(attr, changes);
        }
    },

    step: function (frameTime) {
        var me = this,
            pool = me.animatingPool.slice(),
            ln = pool.length,
            i = 0,
            attr, changes;

        for (; i < ln; i++) {
            attr = pool[i];
            changes = me.updateAttributes(attr);

            if (changes && me._upper) {
                me._upper.popUp(attr, changes);
            }
        }
    },

    stop: function () {
        this.step();

        var me = this,
            pool = me.animatingPool,
            i, ln;

        for (i = 0, ln = pool.length; i < ln; i++) {
            pool[i].animating = false;
        }
        me.animatingPool.length = 0;
        me.animating = 0;
        Ext.draw.Animator.remove(me);
    },

    destroy: function () {
        this.stop();
        this.callParent();
    }
});
