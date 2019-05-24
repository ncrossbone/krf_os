Ext.define('Ext.draw.modifier.Highlight', {
    extend: 'Ext.draw.modifier.Modifier',
    alias: 'modifier.highlight',

    config: {

        enabled: false,

        highlightStyle: null
    },

    preFx: true,

    applyHighlightStyle: function (style, oldStyle) {
        oldStyle = oldStyle || {};
        if (this.getSprite()) {
            Ext.apply(oldStyle, this.getSprite().self.def.normalize(style));
        } else {
            Ext.apply(oldStyle, style);
        }
        return oldStyle;
    },

    prepareAttributes: function (attr) {
        if (!attr.hasOwnProperty('highlightOriginal')) {
            attr.highlighted = false;
            attr.highlightOriginal = Ext.Object.chain(attr);
            attr.highlightOriginal.prototype = attr;
            attr.highlightOriginal.removeFromInstance = {};
        }
        if (this._lower) {
            this._lower.prepareAttributes(attr.highlightOriginal);
        }
    },

    updateSprite: function (sprite, oldSprite) {
        if (sprite) {
            if (this.getHighlightStyle()) {
                this._highlightStyle = sprite.self.def.normalize(this.getHighlightStyle());
            }
            this.setHighlightStyle(sprite.config.highlight);
        }

        sprite.self.def.setConfig({
            defaults: {
                highlighted: false
            },
            processors: {
                highlighted: 'bool'
            }
        });
        this.setSprite(sprite);
    },

    filterChanges: function (attr, changes) {
        var me = this,
            highlightOriginal = attr.highlightOriginal,
            style = me.getHighlightStyle(),
            name;
        if (attr.highlighted) {
            for (name in changes) {
                if (style.hasOwnProperty(name)) {
                    highlightOriginal[name] = changes[name];
                    delete changes[name];
                }
            }
        }

        for (name in changes) {
            if (name !== 'highlighted' && highlightOriginal[name] === changes[name]) {
                delete changes[name];
            }
        }

        return changes;
    },

    pushDown: function (attr, changes) {
        var highlightStyle = this.getHighlightStyle(),
            highlightOriginal = attr.highlightOriginal,
            removeFromInstance = highlightOriginal.removeFromInstance,
            highlighted, name, tplAttr, timer;

        if (changes.hasOwnProperty('highlighted')) {
            highlighted = changes.highlighted;
            delete changes.highlighted;

            if (this._lower) {
                changes = this._lower.pushDown(highlightOriginal, changes);
            }
            changes = this.filterChanges(attr, changes);

            if (highlighted !== attr.highlighted) {
                if (highlighted) {
                    for (name in highlightStyle) {
                        if (name in changes) {
                            highlightOriginal[name] = changes[name];
                        } else {

                            tplAttr = attr.template && attr.template.ownAttr;
                            if (tplAttr && !attr.prototype.hasOwnProperty(name)) {
                                removeFromInstance[name] = true;
                                highlightOriginal[name] = tplAttr.animationOriginal[name];
                            } else {


                                timer = highlightOriginal.timers[name];
                                if (timer && timer.remove) {
                                    removeFromInstance[name] = true;
                                }
                                highlightOriginal[name] = attr[name];
                            }
                        }
                        if (highlightOriginal[name] !== highlightStyle[name]) {
                            changes[name] = highlightStyle[name];
                        }
                    }
                } else {
                    for (name in highlightStyle) {
                        if (!(name in changes)) {
                            changes[name] = highlightOriginal[name];
                        }
                        delete highlightOriginal[name];
                    }
                    changes.removeFromInstance = changes.removeFromInstance || {};
                    Ext.apply(changes.removeFromInstance, removeFromInstance);
                    highlightOriginal.removeFromInstance = {};
                }
                changes.highlighted = highlighted;
            }
        } else {
            if (this._lower) {
                changes = this._lower.pushDown(highlightOriginal, changes);
            }
            changes = this.filterChanges(attr, changes);
        }

        return changes;
    },

    popUp: function (attr, changes) {
        changes = this.filterChanges(attr, changes);
        Ext.draw.modifier.Modifier.prototype.popUp.call(this, attr, changes);
    }

});
