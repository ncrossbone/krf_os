Ext.define('Ext.draw.engine.SvgContext', {

    requires: ['Ext.draw.Color'],

    toSave: ['strokeOpacity', 'strokeStyle', 'fillOpacity', 'fillStyle', 'globalAlpha',
        'lineWidth', 'lineCap', 'lineJoin', 'lineDash', 'lineDashOffset', 'miterLimit',
        'shadowOffsetX', 'shadowOffsetY', 'shadowBlur', 'shadowColor',
        'globalCompositeOperation', 'position', 'fillGradient', 'strokeGradient'],

    strokeOpacity: 1,
    strokeStyle: 'none',
    fillOpacity: 1,
    fillStyle: 'none',
    lineDas: [],
    lineDashOffset: 0,
    globalAlpha: 1,
    lineWidth: 1,
    lineCap: 'butt',
    lineJoin: 'miter',
    miterLimit: 10,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
    shadowColor: 'none',
    globalCompositeOperation: 'src',

    urlStringRe: /^url\(#([\w\-]+)\)$/,

    constructor: function (SvgSurface) {
        var me = this;

        me.surface = SvgSurface;
        me.state = [];
        me.matrix = new Ext.draw.Matrix();
        me.path = null;
        me.clear();
    },

    clear: function () {
        this.group = this.surface.mainGroup;
        this.position = 0;
        this.path = null;
    },

    getElement: function (tag) {
        return this.surface.getSvgElement(this.group, tag, this.position++);
    },

    save: function () {
        var toSave = this.toSave,
            obj = {},
            group = this.getElement('g'),
            key, i;

        for (i = 0; i < toSave.length; i++) {
            key = toSave[i];
            if (key in this) {
                obj[key] = this[key];
            }
        }
        this.position = 0;
        obj.matrix = this.matrix.clone();
        this.state.push(obj);
        this.group = group;
        return group;
    },

    restore: function () {
        var toSave = this.toSave,
            obj = this.state.pop(),
            group = this.group,
            children = group.dom.childNodes,
            key, i;

        while (children.length > this.position) {
            group.last().destroy();
        }
        for (i = 0; i < toSave.length; i++) {
            key = toSave[i];
            if (key in obj) {
                this[key] = obj[key];
            } else {
                delete this[key];
            }
        }

        this.setTransform.apply(this, obj.matrix.elements);
        this.group = group.getParent();
    },

    transform: function (xx, yx, xy, yy, dx, dy) {
        if (this.path) {
            var inv = Ext.draw.Matrix.fly([xx, yx, xy, yy, dx, dy]).inverse();
            this.path.transform(inv);
        }
        this.matrix.append(xx, yx, xy, yy, dx, dy);
    },

    setTransform: function (xx, yx, xy, yy, dx, dy) {
        if (this.path) {
            this.path.transform(this.matrix);
        }
        this.matrix.reset();
        this.transform(xx, yx, xy, yy, dx, dy);
    },

    scale: function (x, y) {
        this.transform(x, 0, 0, y, 0, 0);
    },

    rotate: function (angle) {
        var xx = Math.cos(angle),
            yx = Math.sin(angle),
            xy = -Math.sin(angle),
            yy = Math.cos(angle);
        this.transform(xx, yx, xy, yy, 0, 0);
    },

    translate: function (x, y) {
        this.transform(1, 0, 0, 1, x, y);
    },

    setGradientBBox: function (bbox) {
        this.bbox = bbox;
    },

    beginPath: function () {
        this.path = new Ext.draw.Path();
    },

    moveTo: function (x, y) {
        if (!this.path) {
            this.beginPath();
        }
        this.path.moveTo(x, y);
        this.path.element = null;
    },

    lineTo: function (x, y) {
        if (!this.path) {
            this.beginPath();
        }
        this.path.lineTo(x, y);
        this.path.element = null;
    },

    rect: function (x, y, width, height) {
        this.moveTo(x, y);
        this.lineTo(x + width, y);
        this.lineTo(x + width, y + height);
        this.lineTo(x, y + height);
        this.closePath();
    },

    strokeRect: function (x, y, width, height) {
        this.beginPath();
        this.rect(x, y, width, height);
        this.stroke();
    },

    fillRect: function (x, y, width, height) {
        this.beginPath();
        this.rect(x, y, width, height);
        this.fill();
    },

    closePath: function () {
        if (!this.path) {
            this.beginPath();
        }
        this.path.closePath();
        this.path.element = null;
    },

    arcSvg: function (r1, r2, rotation, large, swipe, x2, y2) {
        if (!this.path) {
            this.beginPath();
        }
        this.path.arcSvg(r1, r2, rotation, large, swipe, x2, y2);
        this.path.element = null;
    },

    arc: function (x, y, radius, startAngle, endAngle, anticlockwise) {
        if (!this.path) {
            this.beginPath();
        }
        this.path.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        this.path.element = null;
    },

    ellipse: function (x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) {
        if (!this.path) {
            this.beginPath();
        }
        this.path.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
        this.path.element = null;
    },

    arcTo: function (x1, y1, x2, y2, radiusX, radiusY, rotation) {
        if (!this.path) {
            this.beginPath();
        }
        this.path.arcTo(x1, y1, x2, y2, radiusX, radiusY, rotation);
        this.path.element = null;
    },

    bezierCurveTo: function (x1, y1, x2, y2, x3, y3) {
        if (!this.path) {
            this.beginPath();
        }
        this.path.bezierCurveTo(x1, y1, x2, y2, x3, y3);
        this.path.element = null;
    },

    strokeText: function (text, x, y) {
        text = String(text);
        if (this.strokeStyle) {
            var element = this.getElement('text'),
                tspan = this.surface.getSvgElement(element, 'tspan', 0);
            this.surface.setElementAttributes(element, {
                "x": x,
                "y": y,
                "transform": this.matrix.toSvg(),
                "stroke": this.strokeStyle,
                "fill": "none",
                "opacity": this.globalAlpha,
                "stroke-opacity": this.strokeOpacity,
                "style": "font: " + this.font,
                "stroke-dasharray": this.lineDash.join(','),
                "stroke-dashoffset": this.lineDashOffset
            });
            if (this.lineDash.length) {
                this.surface.setElementAttributes(element, {
                    "stroke-dasharray": this.lineDash.join(','),
                    "stroke-dashoffset": this.lineDashOffset
                });
            }
            if (tspan.dom.firstChild) {
                tspan.dom.removeChild(tspan.dom.firstChild);
            }
            this.surface.setElementAttributes(tspan, {
                "alignment-baseline": "alphabetic"
            });
            tspan.dom.appendChild(document.createTextNode(Ext.String.htmlDecode(text)));
        }
    },

    fillText: function (text, x, y) {
        text = String(text);
        if (this.fillStyle) {
            var element = this.getElement('text'),
                tspan = this.surface.getSvgElement(element, 'tspan', 0);
            this.surface.setElementAttributes(element, {
                "x": x,
                "y": y,
                "transform": this.matrix.toSvg(),
                "fill": this.fillStyle,
                "opacity": this.globalAlpha,
                "fill-opacity": this.fillOpacity,
                "style": "font: " + this.font
            });
            if (tspan.dom.firstChild) {
                tspan.dom.removeChild(tspan.dom.firstChild);
            }
            this.surface.setElementAttributes(tspan, {
                "alignment-baseline": "alphabetic"
            });
            tspan.dom.appendChild(document.createTextNode(Ext.String.htmlDecode(text)));
        }
    },

    drawImage: function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
        var me = this,
            element = me.getElement('image'),
            x = sx, y = sy,
            width = typeof sw === 'undefined' ? image.width : sw,
            height = typeof sh === 'undefined' ? image.height : sh,
            viewBox = null;
        if (typeof dh !== 'undefined') {
            viewBox = sx + " " + sy + " " + sw + " " + sh;
            x = dx;
            y = dy;
            width = dw;
            height = dh;
        }
        element.dom.setAttributeNS("http:/" + "/www.w3.org/1999/xlink", "href", image.src);
        me.surface.setElementAttributes(element, {
            viewBox: viewBox,
            x: x,
            y: y,
            width: width,
            height: height,
            opacity: me.globalAlpha,
            transform: me.matrix.toSvg()
        });
    },

    fill: function () {
        var me = this;

        if (!me.path) {
            return;
        }
        if (me.fillStyle) {
            var path,
                fillGradient = me.fillGradient,
                element = me.path.element,
                bbox = me.bbox,
                fill;

            if (!element) {
                path = me.path.toString();
                element = me.path.element = me.getElement('path');
                me.surface.setElementAttributes(element, {
                    "d": path,
                    "transform": me.matrix.toSvg()
                });
            }
            if (fillGradient && bbox) {
                fill = fillGradient.generateGradient(me, bbox);
            } else {
                fill = me.fillStyle;
            }
            me.surface.setElementAttributes(element, {
                "fill": fill,
                "fill-opacity": me.fillOpacity * me.globalAlpha
            });
        }
    },

    stroke: function () {
        var me = this;

        if (!me.path) {
            return;
        }
        if (me.strokeStyle) {
            var path,
                strokeGradient = me.strokeGradient,
                element = me.path.element,
                bbox = me.bbox,
                stroke;

            if (!element || !me.path.svgString) {
                path = me.path.toString();
                if (!path) {
                    return;
                }
                element = me.path.element = me.getElement('path');
                me.surface.setElementAttributes(element, {
                    "fill": "none",
                    "d": path,
                    "transform": me.matrix.toSvg()
                });
            }
            if (strokeGradient && bbox) {
                stroke = strokeGradient.generateGradient(me, bbox);
            } else {
                stroke = me.strokeStyle;
            }
            me.surface.setElementAttributes(element, {
                "stroke": stroke,
                "stroke-linecap": me.lineCap,
                "stroke-linejoin": me.lineJoin,
                "stroke-width": me.lineWidth,
                "stroke-opacity": me.strokeOpacity * me.globalAlpha,
                "stroke-dasharray": me.lineDash.join(','),
                "stroke-dashoffset": me.lineDashOffset
            });
            if (me.lineDash.length) {
                me.surface.setElementAttributes(element, {
                    "stroke-dasharray": me.lineDash.join(','),
                    "stroke-dashoffset": me.lineDashOffset
                });
            }
        }
    },

    fillStroke: function (attr, transformFillStroke) {
        var ctx = this,
            fillStyle = ctx.fillStyle,
            strokeStyle = ctx.strokeStyle,
            fillOpacity = ctx.fillOpacity,
            strokeOpacity = ctx.strokeOpacity;

        if (transformFillStroke === undefined) {
            transformFillStroke = attr.transformFillStroke;
        }

        if (!transformFillStroke) {
            attr.inverseMatrix.toContext(ctx);
        }

        if (fillStyle && fillOpacity !== 0) {
            ctx.fill();
        }

        if (strokeStyle && strokeOpacity !== 0) {
            ctx.stroke();
        }
    },

    appendPath: function (path) {
        this.path = path.clone();
    },

    setLineDash: function (lineDash) {
        this.lineDash = lineDash;
    },

    getLineDash: function () {
        return this.lineDash;
    },

    createLinearGradient: function (x0, y0, x1, y1) {
        var me = this,
            element = me.surface.getNextDef('linearGradient'),
            gradient;

        me.surface.setElementAttributes(element, {
            "x1": x0,
            "y1": y0,
            "x2": x1,
            "y2": y1,
            "gradientUnits": "userSpaceOnUse"
        });
        gradient = new Ext.draw.engine.SvgContext.Gradient(me, me.surface, element);

        return gradient;
    },

    createRadialGradient: function (x0, y0, r0, x1, y1, r1) {
        var me = this,
            element = me.surface.getNextDef('radialGradient'),
            gradient;

        me.surface.setElementAttributes(element, {
            "fx": x0,
            "fy": y0,
            "cx": x1,
            "cy": y1,
            "r": r1,
            "gradientUnits": "userSpaceOnUse"
        });
        gradient = new Ext.draw.engine.SvgContext.Gradient(me, me.surface, element, r0 / r1);

        return gradient;
    }
});

Ext.define('Ext.draw.engine.SvgContext.Gradient', {


    isGradient: true,

    constructor: function (ctx, surface, element, compression) {
        var me = this;

        me.ctx = ctx;
        me.surface = surface;
        me.element = element;
        me.position = 0;
        me.compression = compression || 0;
    },

    addColorStop: function (offset, color) {
        var me = this,
            stop = me.surface.getSvgElement(me.element, 'stop', me.position++),
            compression = me.compression;

        me.surface.setElementAttributes(stop, {
            "offset": (((1 - compression) * offset + compression) * 100).toFixed(2) + '%',
            "stop-color": color,
            "stop-opacity": Ext.util.Color.fly(color).a.toFixed(15)
        });
    },

    toString: function () {
        var children = this.element.dom.childNodes;
        while (children.length > this.position) {
            Ext.fly(children[children.length - 1]).destroy();
        }
        return 'url(#' + this.element.getId() + ')';
    }

});
