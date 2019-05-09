Ext.define('Ext.draw.sprite.Sprite', {
    alias: 'sprite.sprite',

    mixins: {
        observable: 'Ext.mixin.Observable'
    },

    requires: [
        'Ext.draw.Draw',
        'Ext.draw.gradient.Gradient',
        'Ext.draw.sprite.AttributeDefinition',
        'Ext.draw.modifier.Target',
        'Ext.draw.modifier.Animation',
        'Ext.draw.modifier.Highlight'
    ],

    isSprite: true,

    statics: {
        defaultHitTestOptions: {
            fill: true,
            stroke: true
        }
        ,debug: false
    },

    inheritableStatics: {
        def: {
            processors: {
                debug: 'default',
                
                strokeStyle: "color",

                fillStyle: "color",

                strokeOpacity: "limited01",

                fillOpacity: "limited01",

                lineWidth: "number",

                lineCap: "enums(butt,round,square)",

                lineJoin: "enums(round,bevel,miter)",

                lineDash: "data",

                lineDashOffset: "number",

                miterLimit: "number",

                shadowColor: "color",

                shadowOffsetX: "number",

                shadowOffsetY: "number",

                shadowBlur: "number",

                globalAlpha: "limited01",

                globalCompositeOperation: "enums(source-over,destination-over,source-in,destination-in,source-out,destination-out,source-atop,destination-atop,lighter,xor,copy)",

                hidden: "bool",

                transformFillStroke: "bool",

                zIndex: "number",

                translationX: "number",

                translationY: "number",

                rotationRads: "number",

                rotationCenterX: "number",

                rotationCenterY: "number",

                scalingX: "number",

                scalingY: "number",

                scalingCenterX: "number",

                scalingCenterY: "number",
                
                constrainGradients: "bool"
                
            },

            aliases: {
                "stroke": "strokeStyle",
                "fill": "fillStyle",
                "color": "fillStyle",
                "stroke-width": "lineWidth",
                "stroke-linecap": "lineCap",
                "stroke-linejoin": "lineJoin",
                "stroke-miterlimit": "miterLimit",
                "text-anchor": "textAlign",
                "opacity": "globalAlpha",

                translateX: "translationX",
                translateY: "translationY",
                rotateRads: "rotationRads",
                rotateCenterX: "rotationCenterX",
                rotateCenterY: "rotationCenterY",
                scaleX: "scalingX",
                scaleY: "scalingY",
                scaleCenterX: "scalingCenterX",
                scaleCenterY: "scalingCenterY"
            },

            defaults: {
                hidden: false,
                zIndex: 0,

                strokeStyle: "none",
                fillStyle: "none",
                lineWidth: 1,
                lineDash: [],
                lineDashOffset: 0,
                lineCap: "butt",
                lineJoin: "miter",
                miterLimit: 10,

                shadowColor: "none",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 0,

                globalAlpha: 1,
                strokeOpacity: 1,
                fillOpacity: 1,
                transformFillStroke: false,

                translationX: 0,
                translationY: 0,
                rotationRads: 0,
                rotationCenterX: null,
                rotationCenterY: null,
                scalingX: 1,
                scalingY: 1,
                scalingCenterX: null,
                scalingCenterY: null,
                
                constrainGradients: false
            },

            triggers: {
                zIndex: "zIndex",

                globalAlpha: "canvas",
                globalCompositeOperation: "canvas",

                transformFillStroke: "canvas",
                strokeStyle: "canvas",
                fillStyle: "canvas",
                strokeOpacity: "canvas",
                fillOpacity: "canvas",

                lineWidth: "canvas",
                lineCap: "canvas",
                lineJoin: "canvas",
                lineDash: "canvas",
                lineDashOffset: "canvas",
                miterLimit: "canvas",

                shadowColor: "canvas",
                shadowOffsetX: "canvas",
                shadowOffsetY: "canvas",
                shadowBlur: "canvas",

                translationX: "transform",
                translationY: "transform",
                rotationRads: "transform",
                rotationCenterX: "transform",
                rotationCenterY: "transform",
                scalingX: "transform",
                scalingY: "transform",
                scalingCenterX: "transform",
                scalingCenterY: "transform",
                
                constrainGradients: "canvas"
            },

            updaters: {
                bbox: 'bboxUpdater',

                zIndex: function (attr) {
                    attr.dirtyZIndex = true;
                },

                transform: function (attr) {
                    attr.dirtyTransform = true;
                    attr.bbox.transform.dirty = true;
                }
            }
        }
    },

    config: {
        parent: null,
        surface: null
    },

    onClassExtended: function (subClass, data) {
        var superclassCfg = subClass.superclass.self.def.initialConfig,
            ownCfg = data.inheritableStatics && data.inheritableStatics.def,
            cfg;

        if (ownCfg) {
            cfg = Ext.Object.merge({}, superclassCfg, ownCfg);
            subClass.def = new Ext.draw.sprite.AttributeDefinition(cfg);
            delete data.inheritableStatics.def;
        } else {
            subClass.def = new Ext.draw.sprite.AttributeDefinition(superclassCfg);
        }

        subClass.def.spriteClass = subClass;
    },

    constructor: function (config) {
        if (Ext.getClassName(this) === 'Ext.draw.sprite.Sprite') {
            throw 'Ext.draw.sprite.Sprite is an abstract class';
        }
        var me = this,
            attributeDefinition = me.self.def,
            defaults = attributeDefinition.getDefaults(),
            modifiers;

        config = Ext.isObject(config) ? config : {};

        me.id = config.id || Ext.id(null, 'ext-sprite-');
        me.attr = {};
        me.mixins.observable.constructor.apply(me, arguments);
        
        modifiers = Ext.Array.from(config.modifiers, true);
        me.prepareModifiers(modifiers);
        me.initializeAttributes();
        me.setAttributes(defaults, true);
        var processors = attributeDefinition.getProcessors();
        for (var name in config) {
            if (name in processors && me['get' + name.charAt(0).toUpperCase() + name.substr(1)]) {
                Ext.raise('The ' + me.$className +
                    ' sprite has both a config and an attribute with the same name: ' + name + '.');
            }
        }
        me.setAttributes(config);
    },


    getDirty: function () {
        return this.attr.dirty;
    },

    setDirty: function (dirty) {
        this.attr.dirty = dirty;
        if (dirty) {
            var parent = this.getParent();
            if (parent) {
                parent.setDirty(true);
            }
        }
    },

    addModifier: function (modifier, reinitializeAttributes) {
        var me = this;
        if (!(modifier instanceof Ext.draw.modifier.Modifier)) {
            modifier = Ext.factory(modifier, null, null, 'modifier');
        }
        modifier.setSprite(me);
        if (modifier.preFx || modifier.config && modifier.config.preFx) {
            if (me.fx._lower) {
                me.fx._lower.setUpper(modifier);
            }
            modifier.setUpper(me.fx);
        } else {
            me.topModifier._lower.setUpper(modifier);
            modifier.setUpper(me.topModifier);
        }
        if (reinitializeAttributes) {
            me.initializeAttributes();
        }
        return modifier;
    },

    prepareModifiers: function (additionalModifiers) {
        var me = this,
            i, ln;

        me.topModifier = new Ext.draw.modifier.Target({sprite: me});

        me.fx = new Ext.draw.modifier.Animation({sprite: me});
        me.fx.setUpper(me.topModifier);

        for (i = 0, ln = additionalModifiers.length; i < ln; i++) {
            me.addModifier(additionalModifiers[i], false);
        }
    },

    getAnimation: function () {
        return this.fx;
    },

    setAnimation: function (config) {
        this.fx.setConfig(config);
    },

    initializeAttributes: function () {
        this.topModifier.prepareAttributes(this.attr);
    },

    callUpdaters: function (attr) {
        attr = attr || this.attr;
        
        var me = this,
            pendingUpdaters = attr.pendingUpdaters,
            updaters = me.self.def.getUpdaters(),
            any = false,
            dirty = false,
            flags, updater, fn;


        me.callUpdaters = Ext.emptyFn; 

        do {
            any = false;
            for (updater in pendingUpdaters) {
                any = true;
                flags = pendingUpdaters[updater];
                delete pendingUpdaters[updater];
                fn = updaters[updater];
                if (typeof fn === 'string') {
                    fn = me[fn];
                }
                if (fn) {
                    fn.call(me, attr, flags);
                }
            }
            dirty = dirty || any;
        } while (any);

        delete me.callUpdaters; 
        if (dirty) {
            me.setDirty(true);
        }
    },

    callUpdater: function (attr, updater, triggers) {
        this.scheduleUpdater(attr, updater, triggers);
        this.callUpdaters(attr);
    },

    scheduleUpdaters: function (attr, updaters, triggers) {
        var updater;

        attr = attr || this.attr;

        if (triggers) {
            for (var i = 0, ln = updaters.length; i < ln; i++) {
                updater = updaters[i];
                this.scheduleUpdater(attr, updater, triggers);
            }
        } else {
            for (updater in updaters) {
                triggers = updaters[updater];
                this.scheduleUpdater(attr, updater, triggers);
            }
        }
    },

    scheduleUpdater: function (attr, updater, triggers) {
        triggers = triggers || [];
        attr = attr || this.attr;

        var pendingUpdaters = attr.pendingUpdaters;

        if (updater in pendingUpdaters) {
            if (triggers.length) {
                pendingUpdaters[updater] = Ext.Array.merge(pendingUpdaters[updater], triggers);
            }
        } else {
            pendingUpdaters[updater] = triggers;
        }
    },

    setAttributes: function (changes, bypassNormalization, avoidCopy) {
        var me = this,
            attr = me.attr,
            normalizedChanges,
            name, value, obj;

        if (me.isDestroyed) {
            Ext.Error.raise("Setting attributes of a destroyed sprite.");
        }
        if (bypassNormalization) {
            if (avoidCopy) {
                me.topModifier.pushDown(attr, changes);
            } else {
                obj = {};
                for (name in changes) {
                    value = changes[name];
                    if (value !== attr[name]) {
                        obj[name] = value;
                    }
                }
                me.topModifier.pushDown(attr, obj);
            }
        } else {
            normalizedChanges = me.self.def.normalize(changes);
            me.topModifier.pushDown(attr, normalizedChanges);
        }
    },

    setAttributesBypassingNormalization: function (changes, avoidCopy) {
        return this.setAttributes(changes, true, avoidCopy);
    },

    bboxUpdater: function (attr) {
        var hasRotation = attr.rotationRads !== 0,
            hasScaling = attr.scalingX !== 1 || attr.scalingY !== 1,
            noRotationCenter = attr.rotationCenterX === null || attr.rotationCenterY === null,
            noScalingCenter = attr.scalingCenterX === null || attr.scalingCenterY === null;

        attr.bbox.plain.dirty = true;  


        attr.bbox.transform.dirty = true;  

        if (hasRotation && noRotationCenter || hasScaling && noScalingCenter) {
            this.scheduleUpdater(attr, 'transform');
        }
    },

    getBBox: function (isWithoutTransform) {
        var me = this,
            attr = me.attr,
            bbox = attr.bbox,
            plain = bbox.plain,
            transform = bbox.transform;

        if (plain.dirty) {
            me.updatePlainBBox(plain);
            plain.dirty = false;
        }

        if (!isWithoutTransform) {
            me.applyTransformations();
            if (transform.dirty) {
                me.updateTransformedBBox(transform, plain);
                transform.dirty = false;
            }
            return transform;
        }

        return plain;
    },

    updatePlainBBox: Ext.emptyFn,

    updateTransformedBBox: function (transform, plain) {
        this.attr.matrix.transformBBox(plain, 0, transform);
    },

    getBBoxCenter: function (isWithoutTransform) {
        var bbox = this.getBBox(isWithoutTransform);
        if (bbox) {
            return [
                bbox.x + bbox.width * 0.5,
                bbox.y + bbox.height * 0.5
            ];
        } else {
            return [0, 0];
        }
    },

    hide: function () {
        this.attr.hidden = true;
        this.setDirty(true);
        return this;
    },

    show: function () {
        this.attr.hidden = false;
        this.setDirty(true);
        return this;
    },

    useAttributes: function (ctx, rect) {
        this.applyTransformations();
        var attr = this.attr,
            canvasAttributes = attr.canvasAttributes,
            strokeStyle = canvasAttributes.strokeStyle,
            fillStyle = canvasAttributes.fillStyle,
            lineDash = canvasAttributes.lineDash,
            lineDashOffset = canvasAttributes.lineDashOffset,
            id;

        if (strokeStyle) {
            if (strokeStyle.isGradient) {
                ctx.strokeStyle = 'black';
                ctx.strokeGradient = strokeStyle;
            } else {
                ctx.strokeGradient = false;
            }
        }

        if (fillStyle) {
            if (fillStyle.isGradient) {
                ctx.fillStyle = 'black';
                ctx.fillGradient = fillStyle;
            } else {
                ctx.fillGradient = false;
            }
        }

        if (lineDash) {
            ctx.setLineDash(lineDash);
        }

        if ( Ext.isNumber(lineDashOffset) && Ext.isNumber(ctx.lineDashOffset) ) {
            ctx.lineDashOffset = lineDashOffset;
        }

        for (id in canvasAttributes) {
            if (canvasAttributes[id] !== undefined && canvasAttributes[id] !== ctx[id]) {
                ctx[id] = canvasAttributes[id];
            }
        }

        this.setGradientBBox(ctx, rect);
    },

    setGradientBBox: function (ctx, rect) {
        var attr = this.attr;
        if (attr.constrainGradients) {
            ctx.setGradientBBox({x: rect[0], y: rect[1], width: rect[2], height: rect[3]});
        } else {
            ctx.setGradientBBox(this.getBBox(attr.transformFillStroke));
        }
    },

    applyTransformations: function (force) {
        if (!force && !this.attr.dirtyTransform) {
            return;
        }
        var me = this,
            attr = me.attr,
            center = me.getBBoxCenter(true),
            centerX = center[0],
            centerY = center[1],

            tx = attr.translationX,
            ty = attr.translationY,

            sx = attr.scalingX,
            sy = attr.scalingY === null ? attr.scalingX : attr.scalingY,
            scx = attr.scalingCenterX === null ? centerX : attr.scalingCenterX,
            scy = attr.scalingCenterY === null ? centerY : attr.scalingCenterY,

            rad = attr.rotationRads,
            rcx = attr.rotationCenterX === null ? centerX : attr.rotationCenterX,
            rcy = attr.rotationCenterY === null ? centerY : attr.rotationCenterY,

            cos = Math.cos(rad),
            sin = Math.sin(rad),

            tx_4, ty_4;

        if (sx === 1 && sy === 1) {
            scx = 0;
            scy = 0;
        }

        if (rad === 0) {
            rcx = 0;
            rcy = 0;
        }

        tx_4 = scx * (1 - sx) - rcx;
        ty_4 = scy * (1 - sy) - rcy;

        attr.matrix.elements = [
            cos * sx, sin * sx,
            -sin * sy, cos * sy,
            cos * tx_4 - sin * ty_4 + rcx + tx,
            sin * tx_4 + cos * ty_4 + rcy + ty
        ];
        attr.matrix.inverse(attr.inverseMatrix);
        attr.dirtyTransform = false;
        attr.bbox.transform.dirty = true;
    },

    transform: function (matrix, isSplit) {
        var attr = this.attr,
            spriteMatrix = attr.matrix,
            elements;

        if (matrix && matrix.isMatrix) {
            elements = matrix.elements;
        } else {
            elements = matrix;
        }
        if (!(Ext.isArray(elements) && elements.length === 6)) {
            Ext.raise("An instance of Ext.draw.Matrix or an array of 6 numbers is expected.");
        }

        spriteMatrix.prepend.apply(spriteMatrix, elements.slice());
        spriteMatrix.inverse(attr.inverseMatrix);

        if (isSplit) {
            this.updateTransformAttributes();
        }

        attr.dirtyTransform = false;
        attr.bbox.transform.dirty = true;

        this.setDirty(true);

        return this;
    },

    updateTransformAttributes: function () {
        var attr = this.attr,
            split = attr.matrix.split();

        attr.rotationRads = split.rotate;
        attr.rotationCenterX = 0;
        attr.rotationCenterY = 0;
        attr.scalingX = split.scaleX;
        attr.scalingY = split.scaleY;
        attr.scalingCenterX = 0;
        attr.scalingCenterY = 0;
        attr.translationX = split.translateX;
        attr.translationY = split.translateY;
    },

    resetTransform: function (isSplit) {
        var attr = this.attr;

        attr.matrix.reset();
        attr.inverseMatrix.reset();

        if (!isSplit) {
            this.updateTransformAttributes();
        }

        attr.dirtyTransform = false;
        attr.bbox.transform.dirty = true;

        this.setDirty(true);

        return this;
    },

    setTransform: function (matrix, isSplit) {
        this.resetTransform(true);
        this.transform.call(this, matrix, isSplit);

        return this;
    },

    preRender: Ext.emptyFn,

    render: Ext.emptyFn,

    renderBBox: function (surface, ctx) {
        var bbox = this.getBBox();

        ctx.beginPath();
        ctx.moveTo(bbox.x, bbox.y);
        ctx.lineTo(bbox.x + bbox.width, bbox.y);
        ctx.lineTo(bbox.x + bbox.width, bbox.y + bbox.height);
        ctx.lineTo(bbox.x, bbox.y + bbox.height);
        ctx.closePath();

        ctx.strokeStyle = 'red';
        ctx.strokeOpacity = 1;
        ctx.lineWidth = 0.5;

        ctx.stroke();
    },

    hitTest: function (point, options) {
        if (this.isVisible()) {
            var x = point[0],
                y = point[1],
                bbox = this.getBBox(),
                isBBoxHit = bbox && x >= bbox.x && x <= (bbox.x + bbox.width) &&
                                    y >= bbox.y && y <= (bbox.y + bbox.height);
            if (isBBoxHit) {
                return {
                    sprite: this
                };
            }
        }
        return null;
    },

    isVisible: function () {
        var attr = this.attr,
            parent = this.getParent(),
            hasParent = parent && (parent.isSurface || parent.isVisible()),
            isSeen = hasParent && !attr.hidden && attr.globalAlpha,
            none1 = Ext.util.Color.NONE,
            none2 = Ext.util.Color.RGBA_NONE,
            hasFill = attr.fillOpacity && attr.fillStyle !== none1 && attr.fillStyle !== none2,
            hasStroke = attr.strokeOpacity && attr.strokeStyle !== none1 && attr.strokeStyle !== none2,
            result = isSeen && (hasFill || hasStroke);

        return !!result;
    },

    repaint: function () {
        var surface = this.getSurface();
        if (surface) {
            surface.renderFrame();
        }
    },

    remove: function () {
        var surface = this.getSurface();

        if (surface && surface.isSurface) {
            return surface.remove(this);
        }

        return null;
    },

    destroy: function () {
        var me = this,
            modifier = me.topModifier,
            currentModifier;

        while (modifier) {
            currentModifier = modifier;
            modifier = modifier._lower;
            currentModifier.destroy();
        }

        delete me.attr;

        me.remove();

        if (me.fireEvent('beforedestroy', me) !== false) {
            me.fireEvent('destroy', me);
        }

        me.callParent();
    }
}, function () { 
    this.def = new Ext.draw.sprite.AttributeDefinition(this.def);
    this.def.spriteClass = this;
});

