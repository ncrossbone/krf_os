
Ext.define('Ext.draw.Container', {
    extend: 'Ext.draw.ContainerBase',
    alternateClassName: 'Ext.draw.Component',
    xtype: 'draw',
    defaultType: 'surface',
    isDrawContainer: true,

    requires: [
        'Ext.draw.Surface',
        'Ext.draw.engine.Svg',
        'Ext.draw.engine.Canvas',
        'Ext.draw.gradient.GradientDefinition'
    ],
    
    engine: 'Ext.draw.engine.Canvas',

    config: {
        cls: Ext.baseCSSPrefix + 'draw-container',

        resizeHandler: null,

        sprites: null,

        gradients: [],

        touchAction: {
            panX: false,
            panY: false,
            pinchZoom: false,
            doubleTapZoom: false
        }
    },

    defaultDownloadServerUrl: 'http://svg.sencha.io',

    supportedFormats: ['png', 'pdf', 'jpeg', 'gif'],

    supportedOptions: {
        version: Ext.isNumber,
        data: Ext.isString,
        format: function (format) {
            return Ext.Array.indexOf(this.supportedFormats, format) >= 0;
        },
        filename: Ext.isString,
        width: Ext.isNumber,
        height: Ext.isNumber,
        scale: Ext.isNumber,
        pdf: Ext.isObject,
        jpeg: Ext.isObject
    },

    initAnimator: function() {
        this.frameCallbackId = Ext.draw.Animator.addFrameCallback('renderFrame', this);
    },

    applyGradients: function (gradients) {
        var result = [],
            i, n, gradient, offset;
        if (!Ext.isArray(gradients)) {
            return result;
        }
        for (i = 0, n = gradients.length; i < n; i++) {
            gradient = gradients[i];
            if (!Ext.isObject(gradient)) {
                continue;
            }
            if (typeof gradient.type !== 'string') {
                gradient.type = 'linear';
            }
            if (gradient.angle) {
                gradient.degrees = gradient.angle;
                delete gradient.angle;
            }
            if (Ext.isObject(gradient.stops)) {
                gradient.stops = (function (stops) {
                    var result = [], stop;
                    for (offset in stops) {
                        stop = stops[offset];
                        stop.offset = offset / 100;
                        result.push(stop);
                    }
                    return result;
                })(gradient.stops);
            }
            result.push(gradient);
        }
        Ext.draw.gradient.GradientDefinition.add(result);
        return result;
    },

    applySprites: function (sprites) {
        if (!sprites) {
            return;
        }

        sprites = Ext.Array.from(sprites);

        var ln = sprites.length,
            result = [],
            i, surface, sprite;

        for (i = 0; i < ln; i++) {
            sprite = sprites[i];
            surface = sprite.surface;
            if (!(surface && surface.isSurface)) {
                if (Ext.isString(surface)) {
                    surface = this.getSurface(surface);
                    delete sprite.surface;
                } else {
                    surface = this.getSurface('main');
                }
            }
            sprite = surface.add(sprite);
            result.push(sprite);
        }

        return result;
    },

    resizeDelay: 500, 
    resizeTimerId: 0,

    handleResize: function (size, instantly) {
       
        var me = this,
            el = me.element,
            resizeHandler = me.getResizeHandler() || me.defaultResizeHandler,
            result;

        if (!el) {
            return;
        }

        size = size || el.getSize();

        if (!(size.width && size.height)) {
            return;
        }

        clearTimeout(me.resizeTimerId);

        if (!instantly) {
            me.resizeTimerId = Ext.defer(me.handleResize, me.resizeDelay, me, [size, true]);
            return;
        } else {
            me.resizeTimerId = 0;
        }

        me.fireEvent('bodyresize', me, size);
        result = resizeHandler.call(me, size);
        if (result !== false) {
            me.renderFrame();
        }
    },

    defaultResizeHandler: function (size) {
        this.getItems().each(function (surface) {
            surface.setRect([0, 0, size.width, size.height]);
        });
    },

    getSurface: function (id) {
        var me = this,
            surfaces = me.getItems(),
            oldCount = surfaces.getCount(),
            surface;

        surface = me.createSurface(id);

        if (surfaces.getCount() > oldCount) {
        
            me.handleResize(null, true);
        }

        return surface;
    },

    createSurface: function (id) {
        id = this.getId() + '-' + (id || 'main');

        var me = this,
            surfaces = me.getItems(),
            surface = surfaces.get(id);

        if (!surface) {
            surface = me.add({xclass: me.engine, id: id});
        }

        return surface;
    },

    renderFrame: function () {
        var me = this,
            surfaces = me.getItems(),
            i, ln, item;

        for (i = 0, ln = surfaces.length; i < ln; i++) {
            item = surfaces.items[i];
            if (item.isSurface) {
                item.renderFrame();
            }
        }
    },

    getImage: function (format) {
        var size = this.innerElement.getSize(),
            surfaces = Array.prototype.slice.call(this.items.items),
            zIndexes = this.surfaceZIndexes,
            image, imageElement,
            i, j, surface, zIndex;

        for (j = 1; j < surfaces.length; j++) {
            surface = surfaces[j];
            zIndex = zIndexes[surface.type];
            i = j - 1;
            while (i >= 0 && zIndexes[surfaces[i].type] > zIndex) {
                surfaces[i + 1] = surfaces[i];
                i--;
            }
            surfaces[i + 1] = surface;
        }

        surface = surfaces[0];
        if ((Ext.isIE || Ext.isEdge) && surface.isSVG) {
            
            image = {
                data: surface.toSVG(size, surfaces),
                type: 'svg-markup'
            };
        } else {
            image = surface.flatten(size, surfaces);

            if (format === 'image') {
                imageElement = new Image();
                imageElement.src = image.data;
                image.data = imageElement;
                return image;
            }
            if (format === 'stream') {
                image.data = image.data.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
                return image;
            }
        }

        return image;
    },

    download: function (config) {
        var me = this,
            inputs = [],
            markup, name, value;

        if (Ext.isIE8) {
            return false;
        }

        config = Ext.apply({
            version: 2,
            data: me.getImage().data
        }, config);

        for (name in config) {
            if (config.hasOwnProperty(name)) {
                value = config[name];
                if (name in me.supportedOptions) {
                    if (me.supportedOptions[name].call(me, value)) {
                        inputs.push({
                            tag: 'input',
                            type: 'hidden',
                            name: name,
                            value: Ext.String.htmlEncode(
                                Ext.isObject(value) ? Ext.JSON.encode(value) : value
                            )
                        });
                    }
                    else {
                        Ext.log.error('Invalid value for image download option "' + name + '": ' + value);
                    }
                }
                else {
                    Ext.log.error('Invalid image download option: "' + name + '"');
                }
            }
        }

        markup = Ext.dom.Helper.markup({
            tag: 'html',
            children: [
                {tag: 'head'},
                {
                    tag: 'body',
                    children: [
                        {
                            tag: 'form',
                            method: 'POST',
                            action: config.url || me.defaultDownloadServerUrl,
                            children: inputs
                        },
                        {
                            tag: 'script',
                            type: 'text/javascript',
                            children: 'document.getElementsByTagName("form")[0].submit();'
                        }
                    ]
                }
            ]
        });

        window.open('', 'ImageDownload_' + Date.now()).document.write(markup);
    },

    destroy: function () {
        var me = this,
            callbackId = me.frameCallbackId;

        if (callbackId) {
            Ext.draw.Animator.removeFrameCallback(callbackId);
        }

        clearTimeout(me.resizeTimerId);
        me.resizeTimerId = 0;

        me.callParent();
    }

}, function () {
    if (location.search.match('svg')) {
        Ext.draw.Container.prototype.engine = 'Ext.draw.engine.Svg';
    } else if ((Ext.os.is.BlackBerry && Ext.os.version.getMajor() === 10) || (Ext.browser.is.AndroidStock4 && (Ext.os.version.getMinor() === 1 || Ext.os.version.getMinor() === 2 || Ext.os.version.getMinor() === 3))) {
        
        Ext.draw.Container.prototype.engine = 'Ext.draw.engine.Svg';
    }
});
