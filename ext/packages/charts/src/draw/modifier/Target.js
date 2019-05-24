Ext.define('Ext.draw.modifier.Target', {
    requires: ['Ext.draw.Matrix'],
    extend: 'Ext.draw.modifier.Modifier',
    alias: 'modifier.target',
    statics: {
        
        uniqueId: 0
    },

    prepareAttributes: function (attr) {
        if (this._lower) {
            this._lower.prepareAttributes(attr);
        }
        attr.attributeId = 'attribute-' + Ext.draw.modifier.Target.uniqueId++;
        if (!attr.hasOwnProperty('canvasAttributes')) {
            attr.bbox = {
                plain: {dirty: true},
                transform: {dirty: true}
            };
            attr.dirty = true;
            
            attr.pendingUpdaters = {};
            
            attr.canvasAttributes = {};
            attr.matrix = new Ext.draw.Matrix();
            attr.inverseMatrix = new Ext.draw.Matrix();
        }
    },

    applyChanges: function (attr, changes) {

        Ext.apply(attr, changes);

        var sprite = this.getSprite(),
            pendingUpdaters = attr.pendingUpdaters,
            triggers = sprite.self.def.getTriggers(),
            updaters, instances, instance,
            name, hasChanges, canvasAttributes,
            i, j, ln;

        for (name in changes) {
            hasChanges = true;
            if ((updaters = triggers[name])) {
                sprite.scheduleUpdaters(attr, updaters, [name]);
            }
            if (attr.template && changes.removeFromInstance && changes.removeFromInstance[name]) {
                delete attr[name];
            }
        }

        if (!hasChanges) {
            return;
        }

        if (pendingUpdaters.canvas) {
            canvasAttributes = pendingUpdaters.canvas;
            delete pendingUpdaters.canvas;
            for (i = 0, ln = canvasAttributes.length; i < ln; i++) {
                name = canvasAttributes[i];
                attr.canvasAttributes[name] = attr[name];
            }
        }

        if (attr.hasOwnProperty('children')) {
            instances = attr.children;
            for (i = 0, ln = instances.length; i < ln; i++) {
                instance = instances[i];
                Ext.apply(instance.pendingUpdaters, pendingUpdaters);
                if (canvasAttributes) {
                    for (j = 0; j < canvasAttributes.length; j++) {
                        name = canvasAttributes[j];
                        instance.canvasAttributes[name] = instance[name];
                    }
                }
                sprite.callUpdaters(instance);
            }
        }

        sprite.setDirty(true);
        sprite.callUpdaters(attr);
    },

    popUp: function (attr, changes) {
        this.applyChanges(attr, changes);
    },

    pushDown: function (attr, changes) {


        if (this._lower) {
            changes = this._lower.pushDown(attr, changes);
        }
        this.applyChanges(attr, changes);
        return changes;
    }
});
