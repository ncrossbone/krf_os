Ext.define('Ext.draw.sprite.Square', {
    extend: 'Ext.draw.sprite.Path',
    alias: 'sprite.square',

    inheritableStatics: {
        def: {
            processors: {
                x: 'number',
                y: 'number',
                size: 'number'
            },
            defaults: {
                x: 0,
                y: 0,
                size: 4
            },
            triggers: {
                x: 'path',
                y: 'path',
                size: 'size'
            }
        }
    },

    updatePath: function (path, attr) {
        var size = attr.size * 1.2,
            s = size * 2,
            x = attr.x - attr.lineWidth / 2,
            y = attr.y;

        path.fromSvgString('M'.concat(x - size, ',', y - size, 'l', [s, 0, 0, s, -s, 0, 0, -s, 'z']));
    }

});