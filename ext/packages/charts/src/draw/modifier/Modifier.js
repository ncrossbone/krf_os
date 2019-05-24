Ext.define('Ext.draw.modifier.Modifier', {
    mixins: {
        observable: 'Ext.mixin.Observable'
    },
    config: {
        lower: null,

        upper: null,

        sprite: null
    },

    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);
    },

    updateUpper: function (upper) {
        if (upper) {
            upper.setLower(this);
        }
    },

    updateLower: function (lower) {
        if (lower) {
            lower.setUpper(this);
        }
    },

    prepareAttributes: function (attr) {
        if (this._lower) {
            this._lower.prepareAttributes(attr);
        }
    },

    popUp: function (attributes, changes) {
        if (this._upper) {
            this._upper.popUp(attributes, changes);
        } else {
            Ext.apply(attributes, changes);
        }
    },

    pushDown: function (attr, changes) {
        if (this._lower) {
            return this._lower.pushDown(attr, changes);
        } else {
            for (var name in changes) {
                if (changes[name] === attr[name]) {
                    delete changes[name];
                }
            }
            return changes;
        }
    }
});
