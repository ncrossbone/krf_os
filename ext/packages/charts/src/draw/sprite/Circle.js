Ext.define('Ext.draw.sprite.Circle', {
    extend: 'Ext.draw.sprite.Path',
    alias: 'sprite.circle',
    type: 'circle',
    inheritableStatics: {
        def: {
            processors: {
                
                cx: 'number',

                cy: 'number',

                r: 'number'
            },
            aliases: {
                radius: 'r',
                x: 'cx',
                y: 'cy',
                centerX: 'cx',
                centerY: 'cy'
            },
            defaults: {
                cx: 0,
                cy: 0,
                r: 4
            },
            triggers: {
                cx: 'path',
                cy: 'path',
                r: 'path'
            }
        }
    },

    updatePlainBBox: function (plain) {
        var attr = this.attr,
            cx = attr.cx,
            cy = attr.cy,
            r = attr.r;

        plain.x = cx - r;
        plain.y = cy - r;
        plain.width = r + r;
        plain.height = r + r;
    },

    updateTransformedBBox: function (transform) {
        var attr = this.attr,
            cx = attr.cx,
            cy = attr.cy,
            r = attr.r,
            matrix = attr.matrix,
            scaleX = matrix.getScaleX(),
            scaleY = matrix.getScaleY(),
            rx, ry;

        rx = scaleX * r;
        ry = scaleY * r;
        transform.x = matrix.x(cx, cy) - rx;
        transform.y = matrix.y(cx, cy) - ry;
        transform.width = rx + rx;
        transform.height = ry + ry;
    },

    updatePath: function (path, attr) {
        path.arc(attr.cx, attr.cy, attr.r, 0, Math.PI * 2, false);
    }
});