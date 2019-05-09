Ext.define('Ext.draw.sprite.Image', {
    extend: 'Ext.draw.sprite.Rect',
    alias: 'sprite.image',
    type: 'image',
    statics: {
        imageLoaders: {}
    },

    inheritableStatics: {
        def: {
            processors: {
                src: 'string'
            },
            triggers: {
                src: 'src'
            },
            updaters: {
                src: 'updateSource'
            },
            defaults: {
                src: '',
                
                width: null,
                
                height: null
            }
        }
    },

    updateSurface: function (surface) {
        if (surface) {
            this.updateSource(this.attr);
        }
    },

    updateSource: function (attr) {
        var me = this,
            src = attr.src,
            surface = me.getSurface(),
            loadingStub = Ext.draw.sprite.Image.imageLoaders[src],
            width = attr.width,
            height = attr.height,
            imageLoader,
            i;

        if (!surface) {
            return;
        }

        if (!loadingStub) {
            imageLoader = new Image();
            loadingStub = Ext.draw.sprite.Image.imageLoaders[src] = {
                image: imageLoader,
                done: false,
                pendingSprites: [me],
                pendingSurfaces: [surface]
            };
            imageLoader.width = width;
            imageLoader.height = height;
            imageLoader.onload = function () {
                var item;
                
                if (!loadingStub.done) {
                    loadingStub.done = true;
                    
                    for (i = 0; i < loadingStub.pendingSprites.length; i++) {
                        item = loadingStub.pendingSprites[i];
                        
                        if (!item.destroyed) {
                            item.setDirty(true);
                        }
                    }
                    
                    for (i = 0; i < loadingStub.pendingSurfaces.length; i++) {
                        item = loadingStub.pendingSurfaces[i];
                        
                        if (!item.destroyed) {
                            item.renderFrame();
                        }
                    }
                }
            };
            imageLoader.src = src;
        } else {
            Ext.Array.include(loadingStub.pendingSprites, me);
            Ext.Array.include(loadingStub.pendingSurfaces, surface);
        }
    },

    render: function (surface, ctx) {
        var me = this,
            attr = me.attr,
            mat = attr.matrix,
            src = attr.src,
            x = attr.x,
            y = attr.y,
            width = attr.width,
            height = attr.height,
            loadingStub = Ext.draw.sprite.Image.imageLoaders[src],
            image;

        if (loadingStub && loadingStub.done) {
            mat.toContext(ctx);
            image = loadingStub.image;
            ctx.drawImage(image, x, y,
                width || (image.naturalWidth || image.width) / surface.devicePixelRatio,
                height || (image.naturalHeight || image.height) / surface.devicePixelRatio);
        }

        var debug = attr.debug || this.statics().debug || Ext.draw.sprite.Sprite.debug;
        if (debug) {
            debug.bbox && this.renderBBox(surface, ctx);
        }
    },

    isVisible: function () {
        var attr = this.attr,
            parent = this.getParent(),
            hasParent = parent && (parent.isSurface || parent.isVisible()),
            isSeen = hasParent && !attr.hidden && attr.globalAlpha;

        return !!isSeen;
    }

});
