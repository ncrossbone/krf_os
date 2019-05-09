
Ext.define('Ext.draw.Surface', {
    extend: 'Ext.draw.SurfaceBase',
    xtype: 'surface',

    requires: [
        'Ext.draw.sprite.*',
        'Ext.draw.gradient.*',
        'Ext.draw.sprite.AttributeDefinition',
        'Ext.draw.Matrix',
        'Ext.draw.Draw'
    ],

    uses: [
        'Ext.draw.engine.Canvas'
    ],

    devicePixelRatio: window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI,

    deprecated: {
        '5.1.0': {
            statics: {
                methods: {
                   
                    stableSort: function (list) {
                        return Ext.Array.sort(list, function (a, b) {
                            return a.attr.zIndex - b.attr.zIndex;
                        });
                    }
                }
            }
        }
    },

    cls: Ext.baseCSSPrefix + 'surface',

    config: {
       
        rect: null,

        background: null,

        items: [],

        dirty: false,

        flipRtlText: false
    },

    isSurface: true,

    isPendingRenderFrame: false,

    dirtyPredecessorCount: 0,

    constructor: function (config) {
        var me = this;

        me.predecessors = [];
        me.successors = [];
        me.map = {};

        me.callParent([config]);
        me.matrix = new Ext.draw.Matrix();
        me.inverseMatrix = me.matrix.inverse();
    },

    roundPixel: function (num) {
        return Math.round(this.devicePixelRatio * num) / this.devicePixelRatio;
    },

    waitFor: function (surface) {
        var me = this,
            predecessors = me.predecessors;

        if (!Ext.Array.contains(predecessors, surface)) {
            predecessors.push(surface);
            surface.successors.push(me);
            if (surface.getDirty()) {
                me.dirtyPredecessorCount++;
            }
        }
    },

    updateDirty: function (dirty) {
        var successors = this.successors,
            ln = successors.length,
            i = 0,
            successor;

        for (; i < ln; i++) {
            successor = successors[i];
            if (dirty) {
                successor.dirtyPredecessorCount++;
                successor.setDirty(true);
            } else {
                successor.dirtyPredecessorCount--;
                if (successor.dirtyPredecessorCount === 0 && successor.isPendingRenderFrame) {
                    successor.renderFrame();
                }
            }
        }
    },

    applyBackground: function (background, oldBackground) {
        this.setDirty(true);
        if (Ext.isString(background)) {
            background = { fillStyle: background };
        }
        return Ext.factory(background, Ext.draw.sprite.Rect, oldBackground);
    },

    applyRect: function (rect, oldRect) {
        if (oldRect && rect[0] === oldRect[0] && rect[1] === oldRect[1] && rect[2] === oldRect[2] && rect[3] === oldRect[3]) {
            return;
        }
        if (Ext.isArray(rect)) {
            return [rect[0], rect[1], rect[2], rect[3]];
        } else if (Ext.isObject(rect)) {
            return [
                rect.x || rect.left,
                rect.y || rect.top,
                rect.width || (rect.right - rect.left),
                rect.height || (rect.bottom - rect.top)
            ];
        }
    },

    updateRect: function (rect) {
        var me = this,
            l = rect[0],
            t = rect[1],
            r = l + rect[2],
            b = t + rect[3],
            background = me.getBackground(),
            element = me.element;

        element.setLocalXY(Math.floor(l), Math.floor(t));
        element.setSize(Math.ceil(r - Math.floor(l)), Math.ceil(b - Math.floor(t)));

        if (background) {
            background.setAttributes({
                x: 0,
                y: 0,
                width: Math.ceil(r - Math.floor(l)),
                height: Math.ceil(b - Math.floor(t))
            });
        }
        me.setDirty(true);
    },

    resetTransform: function () {
        this.matrix.set(1, 0, 0, 1, 0, 0);
        this.inverseMatrix.set(1, 0, 0, 1, 0, 0);
        this.setDirty(true);
    },

    get: function (id) {
        return this.map[id] || this.getItems()[id];
    },

    add: function () {
        var me = this,
            args = Array.prototype.slice.call(arguments),
            argIsArray = Ext.isArray(args[0]),
            map = me.map,
            results = [],
            items, item, sprite,
            oldSurface,
            i, ln;

        items = Ext.Array.clean(argIsArray ? args[0] : args);

        if (!items.length) {
            return results;
        }

        for (i = 0, ln = items.length; i < ln; i++) {
            item = items[i];
            
            if (!item || item.destroyed) {
                continue;
            }
            
            sprite = null;
            if (item.isSprite && !map[item.getId()]) {
                sprite = item;
            } else if (!map[item.id]) {
                sprite = this.createItem(item);
            }
            if (sprite) {
                map[sprite.getId()] = sprite;
                results.push(sprite);
                oldSurface = sprite.getSurface();
                if (oldSurface && oldSurface.isSurface) {
                    oldSurface.remove(sprite);
                }
                sprite.setParent(me);
                sprite.setSurface(me);
                me.onAdd(sprite);
            }
        }

        items = me.getItems();
        if (items) {
            items.push.apply(items, results);
        }

        me.dirtyZIndex = true;
        me.setDirty(true);

        if (!argIsArray && results.length === 1) {
            return results[0];
        } else {
            return results;
        }
    },

    onAdd: Ext.emptyFn,

    remove: function (sprite, isDestroy) {
        var me = this,
            destroying = me.clearing,
            id, isOwnSprite;

        if (sprite) {
            if (sprite.charAt) { 
                sprite = me.map[sprite];
            }
            if (!sprite || !sprite.isSprite) {
                return null;
            }

            id = sprite.id;
            isOwnSprite = me.map[id];
            delete me.map[id];

            if (sprite.destroyed || sprite.destroying) {
                if (isOwnSprite && !destroying) {
                    Ext.Array.remove(me.getItems(), sprite);
                }
                return sprite;
            }

            if (!isOwnSprite) {
                if (isDestroy) {
                    sprite.destroy();
                }
                
                return sprite;
            }
            
            sprite.setParent(null);
            sprite.setSurface(null);

            if (isDestroy) {
                sprite.destroy();
            }
            
            if (!destroying) {
                Ext.Array.remove(me.getItems(), sprite);

                me.dirtyZIndex = true;
                me.setDirty(true);
            }
        }

        return sprite || null;
    },

    removeAll: function (isDestroy) {
        var me = this,
            items = me.getItems(),
            item, ln, i;

        me.clearing = !!isDestroy;
        for (i = items.length - 1; i >= 0; i--) {
            item = items[i];
            if (isDestroy) {
                item.destroy();
            } else {
                item.setParent(null);
                item.setSurface(null);
            }
        }

        me.clearing = false;

        items.length = 0;
        me.map = {};
        me.dirtyZIndex = true;

        if (!me.destroying) {
            me.setDirty(true);
        }
    },

    applyItems: function (items) {
        if (this.getItems()) {
            this.removeAll(true);
        }
        return Ext.Array.from(this.add(items));
    },

    createItem: function (config) {
        return Ext.create(config.xclass || 'sprite.' + config.type, config);
    },

    getBBox: function (sprites, isWithoutTransform) {
        sprites = Ext.Array.from(sprites);

        var left = Infinity,
            right = -Infinity,
            top = Infinity,
            bottom = -Infinity,
            ln = sprites.length,
            sprite, bbox, i;

        for (i = 0; i < ln; i++) {
            sprite = sprites[i];
            bbox = sprite.getBBox(isWithoutTransform);
            if (left > bbox.x) {
                left = bbox.x;
            }
            if (right < bbox.x + bbox.width) {
                right = bbox.x + bbox.width;
            }
            if (top > bbox.y) {
                top = bbox.y;
            }
            if (bottom < bbox.y + bbox.height) {
                bottom = bbox.y + bbox.height;
            }
        }
        return {
            x: left,
            y: top,
            width: right - left,
            height: bottom - top
        };
    },

    emptyRect: [0, 0, 0, 0],

    getEventXY: function (e) {
        var me = this,
            isRtl = me.getInherited().rtl,
            pageXY = e.getXY(), 
            container = me.getOwnerBody(), 
            xy = container.getXY(), 
            rect = me.getRect() || me.emptyRect, 
            result = [],
            width;

        if (isRtl) {
            width = container.getWidth();
            result[0] = xy[0] - pageXY[0] - rect[0] + width;
        } else {
            result[0] = pageXY[0] - xy[0] - rect[0];
        }
        result[1] = pageXY[1] - xy[1] - rect[1];
        return result;
    },

    clear: Ext.emptyFn,

    orderByZIndex: function () {
        var me = this,
            items = me.getItems(),
            dirtyZIndex = false,
            i, ln;

        if (me.getDirty()) {
            for (i = 0, ln = items.length; i < ln; i++) {
                if (items[i].attr.dirtyZIndex) {
                    dirtyZIndex = true;
                    break;
                }
            }
            if (dirtyZIndex) {
                Ext.Array.sort(items, function (a, b) {
                    return a.attr.zIndex - b.attr.zIndex;
                });
                this.setDirty(true);
            }

            for (i = 0, ln = items.length; i < ln; i++) {
                items[i].attr.dirtyZIndex = false;
            }
        }
    },

    repaint: function () {
        var me = this;
        me.repaint = Ext.emptyFn;
        Ext.defer(function () {
            delete me.repaint;
            me.element.repaint();
        }, 1);
    },

    renderFrame: function () {
        var me = this;

        if ( !(me.element && me.getDirty() && me.getRect()) ) {
            return;
        }
        if (me.dirtyPredecessorCount > 0) {
            me.isPendingRenderFrame = true;
            return;
        }

        var background = me.getBackground(),
            items = me.getItems(),
            item, i, ln;

        me.orderByZIndex();
        if (me.getDirty()) {
            me.clear();
            me.clearTransform();

            if (background) {
                me.renderSprite(background);
            }

            for (i = 0, ln = items.length; i < ln; i++) {
                item = items[i];
                if (me.renderSprite(item) === false) {
                    return;
                }
                item.attr.textPositionCount = me.textPosition;
            }

            me.setDirty(false);
        }
    },

    renderSprite: Ext.emptyFn,

    clearTransform: Ext.emptyFn,

    destroy: function () {
        var me = this;

        me.destroying = true;
        me.removeAll(true);
        me.destroying = false;
        me.predecessors = me.successors = null;

        if (me.hasListeners.destroy) {
            me.fireEvent('destroy', me);
        }

        me.callParent();
    }

});
