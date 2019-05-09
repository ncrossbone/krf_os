(function () {
    if (!Ext.global.Float32Array) {
        var Float32Array = function (array) {
            if (typeof array === 'number') {
                this.length = array;
            } else if ('length' in array) {
                this.length = array.length;
                for (var i = 0, len = array.length; i < len; i++) {
                    this[i] = +array[i];
                }
            }
        };

        Float32Array.prototype = [];
        Ext.global.Float32Array = Float32Array;
    }
})();

Ext.define('Ext.draw.Draw', {
    singleton: true,

    radian: Math.PI / 180,
    pi2: Math.PI * 2,

    
    reflectFn: function (a) {
        return a;
    },

    rad: function (degrees) {
        return (degrees % 360) * this.radian;
    },

    degrees: function (radian) {
        return (radian / this.radian) % 360;
    },

    isBBoxIntersect: function (bbox1, bbox2, padding) {
        padding = padding || 0;
        return (Math.max(bbox1.x, bbox2.x) - padding > Math.min(bbox1.x + bbox1.width, bbox2.x + bbox2.width)) ||
            (Math.max(bbox1.y, bbox2.y) - padding > Math.min(bbox1.y + bbox1.height, bbox2.y + bbox2.height));
    },

    isPointInBBox: function (x, y, bbox) {
        return !!bbox && x >= bbox.x && x <= (bbox.x + bbox.width) && y >= bbox.y && y <= (bbox.y + bbox.height);
    },

    spline: function (points) {
        var i, j, ln = points.length,
            nd, d, y, ny,
            r = 0,
            zs = new Float32Array(points.length),
            result = new Float32Array(points.length * 3 - 2);

        zs[0] = 0;
        zs[ln - 1] = 0;

        for (i = 1; i < ln - 1; i++) {
            zs[i] = (points[i + 1] + points[i - 1] - 2 * points[i]) - zs[i - 1];
            r = 1 / (4 - r);
            zs[i] *= r;
        }

        for (i = ln - 2; i > 0; i--) {
            r = 3.732050807568877 + 48.248711305964385 / (-13.928203230275537 + Math.pow(0.07179676972449123, i));
            zs[i] -= zs[i + 1] * r;
        }

        ny = points[0];
        nd = ny - zs[0];
        for (i = 0, j = 0; i < ln - 1; j += 3) {
            y = ny;
            d = nd;
            i++;
            ny = points[i];
            nd = ny - zs[i];
            result[j] = y;
            result[j + 1] = (nd + 2 * d) / 3;
            result[j + 2] = (nd * 2 + d) / 3;
        }
        result[j] = ny;
        return result;
    },

    getAnchors: function (prevX, prevY, curX, curY, nextX, nextY, value) {
        value = value || 4;
        var PI = Math.PI,
            halfPI = PI / 2,
            abs = Math.abs,
            sin = Math.sin,
            cos = Math.cos,
            atan = Math.atan,
            control1Length, control2Length, control1Angle, control2Angle,
            control1X, control1Y, control2X, control2Y, alpha;

        control1Length = (curX - prevX) / value;
        control2Length = (nextX - curX) / value;

        if ((curY >= prevY && curY >= nextY) || (curY <= prevY && curY <= nextY)) {
            control1Angle = control2Angle = halfPI;
        } else {
            control1Angle = atan((curX - prevX) / abs(curY - prevY));
            if (prevY < curY) {
                control1Angle = PI - control1Angle;
            }
            control2Angle = atan((nextX - curX) / abs(curY - nextY));
            if (nextY < curY) {
                control2Angle = PI - control2Angle;
            }
        }

        alpha = halfPI - ((control1Angle + control2Angle) % (PI * 2)) / 2;
        if (alpha > halfPI) {
            alpha -= PI;
        }
        control1Angle += alpha;
        control2Angle += alpha;

        control1X = curX - control1Length * sin(control1Angle);
        control1Y = curY + control1Length * cos(control1Angle);
        control2X = curX + control2Length * sin(control2Angle);
        control2Y = curY + control2Length * cos(control2Angle);

        if ((curY > prevY && control1Y < prevY) || (curY < prevY && control1Y > prevY)) {
            control1X += abs(prevY - control1Y) * (control1X - curX) / (control1Y - curY);
            control1Y = prevY;
        }
        if ((curY > nextY && control2Y < nextY) || (curY < nextY && control2Y > nextY)) {
            control2X -= abs(nextY - control2Y) * (control2X - curX) / (control2Y - curY);
            control2Y = nextY;
        }

        return {
            x1: control1X,
            y1: control1Y,
            x2: control2X,
            y2: control2Y
        };
    },

    smooth: function (dataX, dataY, value) {
        var ln = dataX.length,
            prevX, prevY,
            curX, curY,
            nextX, nextY,
            x, y,
            smoothX = [], smoothY = [],
            i, anchors;

        for (i = 0; i < ln - 1; i++) {
            prevX = dataX[i];
            prevY = dataY[i];
            if (i === 0) {
                x = prevX;
                y = prevY;
                smoothX.push(x);
                smoothY.push(y);
                if (ln === 1) {
                    break;
                }
            }
            curX = dataX[i+1];
            curY = dataY[i+1];
            nextX = dataX[i+2];
            nextY = dataY[i+2];
            if ( !(Ext.isNumber(nextX) && Ext.isNumber(nextY)) ) {
                smoothX.push(x, curX, curX);
                smoothY.push(y, curY, curY);
                break;
            }
            anchors = this.getAnchors(prevX, prevY, curX, curY, nextX, nextY, value);
            smoothX.push(x, anchors.x1, curX);
            smoothY.push(y, anchors.y1, curY);
            x = anchors.x2;
            y = anchors.y2;
        }
        return {
            smoothX: smoothX,
            smoothY: smoothY
        }
    },

    beginUpdateIOS: Ext.os.is.iOS ? function () {
        this.iosUpdateEl = Ext.getBody().createChild({
            'data-sticky': true,
            style: 'position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; background: rgba(0,0,0,0.001); z-index: 100000'
        });
    } : Ext.emptyFn,

    endUpdateIOS: function() {
        this.iosUpdateEl = Ext.destroy(this.iosUpdateEl);
    }
});
