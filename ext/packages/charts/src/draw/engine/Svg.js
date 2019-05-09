Ext.define('Ext.draw.engine.Svg', {
    extend: 'Ext.draw.Surface',
    requires: ['Ext.draw.engine.SvgContext'],
    isSVG: true,

    config: {
        highPrecision: false
    },

    getElementConfig: function () {
        return {
            reference: 'element',
            style: {
                position: 'absolute'
            },
            children: [
                {
                    reference: 'innerElement',
                    style: {
                        width: '100%',
                        height: '100%',
                        position: 'relative'
                    },
                    children: [
                        {
                            tag: 'svg',
                            reference: 'svgElement',
                            namespace: "http://www.w3.org/2000/svg",
                            width: '100%',
                            height: '100%',
                            version: 1.1
                        }
                    ]
                }
            ]
        };
    },

    constructor: function (config) {
        var me = this;
        me.callParent([config]);
        me.mainGroup = me.createSvgNode("g");
        me.defsElement = me.createSvgNode("defs");
        me.svgElement.appendChild(me.mainGroup);
        me.svgElement.appendChild(me.defsElement);
        me.ctx = new Ext.draw.engine.SvgContext(me);
    },
    createSvgNode: function (type) {
        var node = document.createElementNS("http://www.w3.org/2000/svg", type);
        return Ext.get(node);
    },

    getSvgElement: function (group, tag, position) {
        var childNodes = group.dom.childNodes,
            length = childNodes.length,
            element;

        if (position < length) {
            element = childNodes[position];
            if (element.tagName === tag) {
                return Ext.get(element);
            } else {
                Ext.destroy(element);
            }
        } else if (position > length) {
            Ext.raise("Invalid position.");
        }

        element = Ext.get(this.createSvgNode(tag));
        if (position === 0) {
            group.insertFirst(element);
        } else {
            element.insertAfter(Ext.fly(childNodes[position - 1]));
        }
        element.cache = {};

        return element;
    },

    setElementAttributes: function (element, attributes) {
        var dom = element.dom,
            cache = element.cache,
            name, value;
        for (name in attributes) {
            value = attributes[name];
            if (cache[name] !== value) {
                cache[name] = value;
                dom.setAttribute(name, value);
            }
        }
    },

    getNextDef: function (tagName) {
        return this.getSvgElement(this.defsElement, tagName, this.defsPosition++);
    },

    clearTransform: function () {
        var me = this;
        me.mainGroup.set({transform: me.matrix.toSvg()});
    },

    clear: function () {
        this.ctx.clear();
        this.removeSurplusDefs();
        this.defsPosition = 0;
    },

    removeSurplusDefs: function () {
        var defsElement = this.defsElement,
            defs = defsElement.dom.childNodes,
            ln = defs.length,
            i;

        for (i = ln - 1; i > this.defsPosition; i--) {
            defsElement.removeChild(defs[i]);
        }
    },

    renderSprite: function (sprite) {
        var me = this,
            rect = me.getRect(),
            ctx = me.ctx;

        if (sprite.attr.hidden || sprite.attr.globalAlpha === 0) {
            ctx.save();
            ctx.restore();
            return;
        }

        sprite.element = ctx.save();
        sprite.preRender(this);
        sprite.useAttributes(ctx, rect);
        if (false === sprite.render(this, ctx, [0, 0, rect[2], rect[3]])) {
            return false;
        }
        sprite.setDirty(false);
        ctx.restore();
    },

    toSVG: function (size, surfaces) {
        var className = Ext.getClassName(this),
            svg, surface, rect, i;

        svg = '<svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg"' +
            ' width="' + size.width + '"' +
            ' height="' + size.height + '">';

        for (i = 0; i < surfaces.length; i++) {
            surface = surfaces[i];
            if (Ext.getClassName(surface) !== className) {
                continue;
            }
            rect = surface.getRect();
            svg += '<g transform="translate(' + rect[0] + ',' + rect[1] + ')">';
            svg += this.serializeNode(surface.svgElement.dom);
            svg += '</g>';
        }
        svg += '</svg>';

        return svg;
    },

    flatten: function (size, surfaces) {
        var svg = '<?xml version="1.0" standalone="yes"?>';

        svg += this.toSVG(size, surfaces);

        return {
            data: 'data:image/svg+xml;utf8,' + encodeURIComponent(svg),
            type: 'svg'
        };
    },

    serializeNode: function (node) {
        var result = '',
            i, n, attr, child;
        if (node.nodeType === document.TEXT_NODE) {
            return node.nodeValue;
        }
        result += '<' + node.nodeName;
        if (node.attributes.length) {
            for (i = 0, n = node.attributes.length; i < n; i++) {
                attr = node.attributes[i];
                result += ' ' + attr.name + '="' + attr.value + '"';
            }
        }
        result += '>';
        if (node.childNodes && node.childNodes.length) {
            for (i = 0, n = node.childNodes.length; i < n; i++) {
                child = node.childNodes[i];
                result += this.serializeNode(child);
            }
        }
        result += '</' + node.nodeName + '>';
        return result;
    },

    destroy: function () {
        var me = this;

        me.ctx.destroy();
        me.mainGroup.destroy();
        me.defsElement.destroy();

        delete me.mainGroup;
        delete me.defsElement;
        delete me.ctx;

        me.callParent();
    },

    remove: function (sprite, destroySprite) {
        if (sprite && sprite.element) {
           
            sprite.element.destroy();
            sprite.element = null;
        }
        this.callParent(arguments);
    }
});
