Ext.define('Ext.draw.sprite.Instancing', {
    extend: 'Ext.draw.sprite.Sprite',
    alias: 'sprite.instancing',
    type: 'instancing',
    isInstancing: true,

    config: {
        template: null,
        instances: null
    },

    instances: null,

    applyTemplate: function (template) {
        
        if (!Ext.isObject(template)) {
            Ext.raise("A template of an instancing sprite must either be " +
                "a sprite instance or a valid config object from which a template " +
                "sprite will be created.");
        } else if (template.isInstancing || template.isComposite) {
            Ext.raise("Can't use an instancing or composite sprite " +
                "as a template for an instancing sprite.");
        }
        if (!template.isSprite) {
            if (!template.xclass && !template.type) {
                template.type = 'circle';
            }
            template = Ext.create(template.xclass || 'sprite.' + template.type, template);
        }
        var surface = template.getSurface();
        if (surface) {
            surface.remove(template);
        }
        template.setParent(this);
        return template;
    },

    updateTemplate: function (template, oldTemplate) {
        if (oldTemplate) {
            delete oldTemplate.ownAttr;
        }
        template.setSurface(this.getSurface());
        template.ownAttr = template.attr;

        this.clearAll();
    },

    updateInstances: function (instances) {
        this.clearAll();

        if (Ext.isArray(instances)) {
            for (var i = 0, ln = instances.length; i < ln; i++) {
                this.add(instances[i]);
            }
        }
    },

    updateSurface: function (surface) {
        var template = this.getTemplate();

        if (template && !template.destroyed) {
            template.setSurface(surface);
        }
    },

    get: function (index) {
        return this.instances[index];
    },

    getCount: function () {
        return this.instances.length;
    },

    clearAll: function () {
        var template = this.getTemplate();

        template.attr.children = this.instances = [];
        this.position = 0;
    },

    createInstance: function (config, bypassNormalization, avoidCopy) {
        return this.add(config, bypassNormalization, avoidCopy);
    },

    add: function (config, bypassNormalization, avoidCopy) {
        var template = this.getTemplate(),
            originalAttr = template.attr,
            attr = Ext.Object.chain(originalAttr);

        template.topModifier.prepareAttributes(attr);
        template.attr = attr;
        template.setAttributes(config, bypassNormalization, avoidCopy);
        attr.template = template;
        this.instances.push(attr);
        template.attr = originalAttr;
        this.position++;
        return attr;
    },

    getBBox: function () { return null; },

    getBBoxFor: function (index, isWithoutTransform) {
        var template = this.getTemplate(),
            originalAttr = template.attr,
            bbox;

        template.attr = this.instances[index];
        bbox = template.getBBox(isWithoutTransform);
        template.attr = originalAttr;
        return bbox;
    },

    isVisible: function () {
        var attr = this.attr,
            parent = this.getParent(),
            result;

        result = parent && parent.isSurface && !attr.hidden && attr.globalAlpha;

        return !!result;
    },

    isInstanceVisible: function (index) {
        var me = this,
            template = me.getTemplate(),
            originalAttr = template.attr,
            instances = me.instances,
            result = false;

        if (!Ext.isNumber(index) || index < 0 || index >= instances.length || !me.isVisible()) {
            return result;
        }

        template.attr = instances[index];
        result = template.isVisible(point, options);
        template.attr = originalAttr;

        return result;
    },

    render: function (surface, ctx, rect) {
        
        if (!this.getTemplate()) {
            Ext.raise('An instancing sprite must have a template.');
        }
        var me = this,
            template = me.getTemplate(),
            surfaceRect = surface.getRect(),
            mat = me.attr.matrix,
            originalAttr = template.attr,
            instances = me.instances,
            ln = me.position,
            i;

        mat.toContext(ctx);
        template.preRender(surface, ctx, rect);
        template.useAttributes(ctx, surfaceRect);

        for (i = 0; i < ln; i++) {
            if (instances[i].hidden) {
                continue;
            }
            ctx.save();
            template.attr = instances[i];
            template.useAttributes(ctx, surfaceRect);
            template.render(surface, ctx, rect);
            ctx.restore();
        }

        template.attr = originalAttr;
    },

    setAttributesFor: function (index, changes, bypassNormalization) {
        var template = this.getTemplate(),
            originalAttr = template.attr,
            attr = this.instances[index];

        if (!attr) {
            return;
        }
        template.attr = attr;
        if (bypassNormalization) {
            changes = Ext.apply({}, changes);
        } else {
            changes = template.self.def.normalize(changes);
        }
        template.topModifier.pushDown(attr, changes);
        template.attr = originalAttr;
    },

    destroy: function () {
        var me = this,
            template = me.getTemplate();

        me.instances = null;

        if (template) {
            template.destroy();
        }

        me.callParent();
    }
});