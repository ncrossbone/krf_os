Ext.define('Ext.draw.Matrix', {

    isMatrix: true,

    statics: {
        
        createAffineMatrixFromTwoPair: function (x0, y0, x1, y1, x0p, y0p, x1p, y1p) {
            var dx = x1 - x0,
                dy = y1 - y0,
                dxp = x1p - x0p,
                dyp = y1p - y0p,
                r = 1 / (dx * dx + dy * dy),
                a = dx * dxp + dy * dyp,
                b = dxp * dy - dx * dyp,
                c = -a * x0 - b * y0,
                f = b * x0 - a * y0;

            return new this(a * r, -b * r, b * r, a * r, c * r + x0p, f * r + y0p);
        },

        createPanZoomFromTwoPair: function (x0, y0, x1, y1, x0p, y0p, x1p, y1p) {
            if (arguments.length === 2) {
                return this.createPanZoomFromTwoPair.apply(this, x0.concat(y0));
            }
            var dx = x1 - x0,
                dy = y1 - y0,
                cx = (x0 + x1) * 0.5,
                cy = (y0 + y1) * 0.5,
                dxp = x1p - x0p,
                dyp = y1p - y0p,
                cxp = (x0p + x1p) * 0.5,
                cyp = (y0p + y1p) * 0.5,
                r = dx * dx + dy * dy,
                rp = dxp * dxp + dyp * dyp,
                scale = Math.sqrt(rp / r);

            return new this(scale, 0, 0, scale, cxp - scale * cx, cyp - scale * cy);
        },

        fly: (function () {
            var flyMatrix = null,
                simplefly = function (elements) {
                    flyMatrix.elements = elements;
                    return flyMatrix;
                };

            return function (elements) {
                if (!flyMatrix) {
                    flyMatrix = new Ext.draw.Matrix();
                }
                flyMatrix.elements = elements;
                Ext.draw.Matrix.fly = simplefly;
                return flyMatrix;
            };
        })(),

        create: function (mat) {
            if (mat instanceof this) {
                return mat;
            }
            return new this(mat);
        }
    },

    constructor: function (xx, xy, yx, yy, dx, dy) {
        if (xx && xx.length === 6) {
            this.elements = xx.slice();
        } else if (xx !== undefined) {
            this.elements = [xx, xy, yx, yy, dx, dy];
        } else {
            this.elements = [1, 0, 0, 1, 0, 0];
        }
    },

    prepend: function (xx, xy, yx, yy, dx, dy) {
        var elements = this.elements,
            xx0 = elements[0],
            xy0 = elements[1],
            yx0 = elements[2],
            yy0 = elements[3],
            dx0 = elements[4],
            dy0 = elements[5];

        elements[0] = xx * xx0 + yx * xy0;
        elements[1] = xy * xx0 + yy * xy0;
        elements[2] = xx * yx0 + yx * yy0;
        elements[3] = xy * yx0 + yy * yy0;
        elements[4] = xx * dx0 + yx * dy0 + dx;
        elements[5] = xy * dx0 + yy * dy0 + dy;
        return this;
    },

    prependMatrix: function (matrix) {
        return this.prepend.apply(this, matrix.elements);
    },

    append: function (xx, xy, yx, yy, dx, dy) {
        var elements = this.elements,
            xx0 = elements[0],
            xy0 = elements[1],
            yx0 = elements[2],
            yy0 = elements[3],
            dx0 = elements[4],
            dy0 = elements[5];

        elements[0] = xx * xx0 + xy * yx0;
        elements[1] = xx * xy0 + xy * yy0;
        elements[2] = yx * xx0 + yy * yx0;
        elements[3] = yx * xy0 + yy * yy0;
        elements[4] = dx * xx0 + dy * yx0 + dx0;
        elements[5] = dx * xy0 + dy * yy0 + dy0;
        return this;
    },

    appendMatrix: function (matrix) {
        return this.append.apply(this, matrix.elements);
    },

    set: function (xx, xy, yx, yy, dx, dy) {
        var elements = this.elements;

        elements[0] = xx;
        elements[1] = xy;
        elements[2] = yx;
        elements[3] = yy;
        elements[4] = dx;
        elements[5] = dy;

        return this;
    },

    inverse: function (target) {
        var elements = this.elements,
            a = elements[0],
            b = elements[1],
            c = elements[2],
            d = elements[3],
            e = elements[4],
            f = elements[5],
            rDim = 1 / (a * d - b * c);

        a *= rDim;
        b *= rDim;
        c *= rDim;
        d *= rDim;
        if (target) {
            target.set(d, -b, -c, a, c * f - d * e, b * e - a * f);
            return target;
        } else {
            return new Ext.draw.Matrix(d, -b, -c, a, c * f - d * e, b * e - a * f);
        }
    },

    translate: function (x, y, prepend) {
        if (prepend) {
            return this.prepend(1, 0, 0, 1, x, y);
        } else {
            return this.append(1, 0, 0, 1, x, y);
        }
    },

    scale: function (sx, sy, scx, scy, prepend) {
        var me = this;

        if (sy == null) {
            sy = sx;
        }
        if (scx === undefined) {
            scx = 0;
        }
        if (scy === undefined) {
            scy = 0;
        }

        if (prepend) {
            return me.prepend(sx, 0, 0, sy, scx - scx * sx, scy - scy * sy);
        } else {
            return me.append(sx, 0, 0, sy, scx - scx * sx, scy - scy * sy);
        }
    },

    rotate: function (angle, rcx, rcy, prepend) {
        var me = this,
            cos = Math.cos(angle),
            sin = Math.sin(angle);

        rcx = rcx || 0;
        rcy = rcy || 0;

        if (prepend) {
            return me.prepend(
                cos, sin,
                -sin, cos,
                rcx - cos * rcx + rcy * sin,
                rcy - cos * rcy - rcx * sin
            );
        } else {
            return me.append(
                cos, sin,
                -sin, cos,
                rcx - cos * rcx + rcy * sin,
                rcy - cos * rcy - rcx * sin
            );
        }
    },

    rotateFromVector: function (x, y, prepend) {
        var me = this,
            d = Math.sqrt(x * x + y * y),
            cos = x / d,
            sin = y / d;
        if (prepend) {
            return me.prepend(cos, sin, -sin, cos, 0, 0);
        } else {
            return me.append(cos, sin, -sin, cos, 0, 0);
        }
    },

    clone: function () {
        return new Ext.draw.Matrix(this.elements);
    },

    flipX: function () {
        return this.append(-1, 0, 0, 1, 0, 0);
    },

    flipY: function () {
        return this.append(1, 0, 0, -1, 0, 0);
    },

    skewX: function (angle) {
        return this.append(1, 0, Math.tan(angle), 1, 0, 0);
    },

    skewY: function (angle) {
        return this.append(1, Math.tan(angle), 0, 1, 0, 0);
    },

    shearX: function (factor) {
        return this.append(1, 0, factor, 1, 0, 0);
    },

    shearY: function (factor) {
        return this.append(1, factor, 0, 1, 0, 0);
    },

    reset: function () {
        return this.set(1, 0, 0, 1, 0, 0);
    },

    precisionCompensate: function (devicePixelRatio, comp) {
        var elements = this.elements,
            x2x = elements[0],
            x2y = elements[1],
            y2x = elements[2],
            y2y = elements[3],
            newDx = elements[4],
            newDy = elements[5],
            r = x2y * y2x - x2x * y2y;

        comp.b = devicePixelRatio * x2y / x2x;
        comp.c = devicePixelRatio * y2x / y2y;
        comp.d = devicePixelRatio;
        comp.xx = x2x / devicePixelRatio;
        comp.yy = y2y / devicePixelRatio;
        comp.dx = (newDy * x2x * y2x - newDx * x2x * y2y) / r / devicePixelRatio;
        comp.dy = (newDx * x2y * y2y - newDy * x2x * y2y) / r / devicePixelRatio;
    },

    precisionCompensateRect: function (devicePixelRatio, comp) {
        var elements = this.elements,
            x2x = elements[0],
            x2y = elements[1],
            y2x = elements[2],
            y2y = elements[3],
            newDx = elements[4],
            newDy = elements[5],
            yxOnXx = y2x / x2x;

        comp.b = devicePixelRatio * x2y / x2x;
        comp.c = devicePixelRatio * yxOnXx;
        comp.d = devicePixelRatio * y2y / x2x;
        comp.xx = x2x / devicePixelRatio;
        comp.yy = x2x / devicePixelRatio;
        comp.dx = (newDy * y2x - newDx * y2y) / (x2y * yxOnXx - y2y) / devicePixelRatio;
        comp.dy = -(newDy * x2x - newDx * x2y) / (x2y * yxOnXx - y2y) / devicePixelRatio;
    },

    x: function (x, y) {
        var elements = this.elements;
        return x * elements[0] + y * elements[2] + elements[4];
    },

    y: function (x, y) {
        var elements = this.elements;

        return x * elements[1] + y * elements[3] + elements[5];
    },

    get: function (i, j) {
        return +this.elements[i + j * 2].toFixed(4);
    },

    transformPoint: function (point) {
        var elements = this.elements,
            x, y;

        if (point.isPoint) {
            x = point.x;
            y = point.y;
        } else {
            x = point[0];
            y = point[1];
        }
        return [
            x * elements[0] + y * elements[2] + elements[4],
            x * elements[1] + y * elements[3] + elements[5]
        ];
    },

    transformBBox: function (bbox, radius, target) {
        var elements = this.elements,
            l = bbox.x,
            t = bbox.y,
            w0 = bbox.width * 0.5,
            h0 = bbox.height * 0.5,
            xx = elements[0],
            xy = elements[1],
            yx = elements[2],
            yy = elements[3],
            cx = l + w0,
            cy = t + h0,
            w, h, scales;

        if (radius) {
            w0 -= radius;
            h0 -= radius;
            scales = [
                Math.sqrt(elements[0] * elements[0] + elements[2] * elements[2]),
                Math.sqrt(elements[1] * elements[1] + elements[3] * elements[3])
            ];
            w = Math.abs(w0 * xx) + Math.abs(h0 * yx) + Math.abs(scales[0] * radius);
            h = Math.abs(w0 * xy) + Math.abs(h0 * yy) + Math.abs(scales[1] * radius);
        } else {
            w = Math.abs(w0 * xx) + Math.abs(h0 * yx);
            h = Math.abs(w0 * xy) + Math.abs(h0 * yy);
        }

        if (!target) {
            target = {};
        }

        target.x = cx * xx + cy * yx + elements[4] - w;
        target.y = cx * xy + cy * yy + elements[5] - h;
        target.width = w + w;
        target.height = h + h;

        return target;
    },

    transformList: function (list) {
        var elements = this.elements,
            xx = elements[0], yx = elements[2], dx = elements[4],
            xy = elements[1], yy = elements[3], dy = elements[5],
            ln = list.length,
            p, i;

        for (i = 0; i < ln; i++) {
            p = list[i];
            list[i] = [
                p[0] * xx + p[1] * yx + dx,
                p[0] * xy + p[1] * yy + dy
            ];
        }
        return list;
    },

    isIdentity: function () {
        var elements = this.elements;

        return elements[0] === 1 &&
               elements[1] === 0 &&
               elements[2] === 0 &&
               elements[3] === 1 &&
               elements[4] === 0 &&
               elements[5] === 0;
    },

    isEqual: function (matrix) {
        var elements = matrix && matrix.isMatrix ? matrix.elements : matrix,
            myElements = this.elements;

        return myElements[0] === elements[0] &&
               myElements[1] === elements[1] &&
               myElements[2] === elements[2] &&
               myElements[3] === elements[3] &&
               myElements[4] === elements[4] &&
               myElements[5] === elements[5];
    },

    equals: function (matrix) {
        return this.isEqual(matrix);
    },

    toArray: function () {
        var elements = this.elements;
        return [elements[0], elements[2], elements[4], elements[1], elements[3], elements[5]];
    },

    toVerticalArray: function () {
        return this.elements.slice();
    },

    toString: function () {
        var me = this;
        return [me.get(0, 0), me.get(0, 1), me.get(1, 0), me.get(1, 1), me.get(2, 0), me.get(2, 1)].join(',');
    },

    toContext: function (ctx) {
        ctx.transform.apply(ctx, this.elements);
        return this;
    },

    toSvg: function () {
        var elements = this.elements;
        return "matrix(" +
            elements[0].toFixed(9) + ',' +
            elements[1].toFixed(9) + ',' +
            elements[2].toFixed(9) + ',' +
            elements[3].toFixed(9) + ',' +
            elements[4].toFixed(9) + ',' +
            elements[5].toFixed(9) +
            ")";
    },

    getScaleX: function () {
        var elements = this.elements;
        return Math.sqrt(elements[0] * elements[0] + elements[2] * elements[2]);
    },

    getScaleY: function () {
        var elements = this.elements;
        return Math.sqrt(elements[1] * elements[1] + elements[3] * elements[3]);
    },

    getXX: function () {
        return this.elements[0];
    },

    getXY: function () {
        return this.elements[1];
    },

    getYX: function () {
        return this.elements[2];
    },

    getYY: function () {
        return this.elements[3];
    },

    getDX: function () {
        return this.elements[4];
    },

    getDY: function () {
        return this.elements[5];
    },

    split: function () {
        var el = this.elements,
            xx = el[0],
            xy = el[1],
            yy = el[3],
            out = {
                translateX: el[4],
                translateY: el[5]
            };
        out.rotate = out.rotation = Math.atan2(xy, xx);
        out.scaleX = xx / Math.cos(out.rotate);
        out.scaleY = yy / xx * out.scaleX;

        return out;
    }
}, function () {
    function registerName(properties, name, i) {
        properties[name] = {
            get: function () {
                return this.elements[i];
            },
            set: function (val) {
                this.elements[i] = val;
            }
        };
    }

    if (Object.defineProperties) {
        var properties = {};
     
        registerName(properties, 'a', 0);
        registerName(properties, 'b', 1);
        registerName(properties, 'c', 2);
        registerName(properties, 'd', 3);
        registerName(properties, 'e', 4);
        registerName(properties, 'f', 5);
        Object.defineProperties(this.prototype, properties);
    }

    this.prototype.multiply = this.prototype.appendMatrix;
});
