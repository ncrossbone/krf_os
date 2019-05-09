Ext.define('Ext.draw.ContainerBase', {
    extend: 'Ext.panel.Panel',

    requires: ['Ext.window.Window'],
    
    previewTitleText: 'Chart Preview',
    
    previewAltText: 'Chart preview',

    layout: 'container',

    addElementListener: function() {
        var me = this,
            args = arguments;

        if (me.rendered) {
            me.el.on.apply(me.el, args);
        } else {
            me.on('render', function() {
                me.el.on.apply(me.el, args);
            });
        }
    },

    removeElementListener: function() {
        var me = this,
            args = arguments;
        if (me.rendered) {
            me.el.un.apply(me.el, args);
        }
    },

    afterRender: function() {
        this.callParent(arguments);
        this.initAnimator();
    },

    getItems: function() {
        var me = this,
            items = me.items;

        if (!items || !items.isMixedCollection) {
            me.initItems();
        }

        return me.items;
    },

    onRender: function() {
        this.callParent(arguments);
        this.element = this.el;
        this.innerElement = this.body;
    },

    setItems: function(items) {
        this.items = items;
        return items;
    },

    setSurfaceSize: function(width, height) {
        this.resizeHandler({
            width: width,
            height: height
        });
        this.renderFrame();
    },

    onResize: function (width, height, oldWidth, oldHeight) {
        var me = this;

        me.callParent([width, height, oldWidth, oldHeight]);
        me.handleResize({
            width: width,
            height: height
        });
    },

    preview: function () {
        var image = this.getImage(),
            items;

        if (Ext.isIE8) {
            return false;
        }

        if (image.type === 'svg-markup') {
            items = {
                xtype: 'container',
                html: image.data
            };
        } else {
            items = {
                xtype: 'image',
                mode: 'img',
                cls: Ext.baseCSSPrefix + 'chart-image',
                alt: this.previewAltText,
                src: image.data,
                listeners: {
                    afterrender: function () {
                        var me = this,
                            img = me.imgEl.dom,
                            ratio = image.type === 'svg' ? 1 : (window['devicePixelRatio'] || 1),
                            size;

                        if (!img.naturalWidth || !img.naturalHeight) {
                            img.onload = function () {
                                var width = img.naturalWidth,
                                    height = img.naturalHeight;
                                me.setWidth(Math.floor(width / ratio));
                                me.setHeight(Math.floor(height / ratio));
                            }
                        } else {
                            size = me.getSize();
                            me.setWidth(Math.floor(size.width / ratio));
                            me.setHeight(Math.floor(size.height / ratio));
                        }
                    }
                }
            };
        }

        new Ext.window.Window({
            title: this.previewTitleText,
            closeable: true,
            renderTo: Ext.getBody(),
            autoShow: true,
            maximizeable: true,
            maximized: true,
            border: true,
            layout: {
                type: 'hbox',
                pack: 'center',
                align: 'middle'
            },
            items: {
                xtype: 'container',
                items: items
            }
        });
    },

    privates: {
        getTargetEl: function() {
            return this.innerElement;
        },

        reattachToBody: function() {
            var me = this;
            if (me.pendingDetachSize) {
                me.handleResize();
            }
            me.pendingDetachSize = false;
            me.callParent();
        }
    }
});
