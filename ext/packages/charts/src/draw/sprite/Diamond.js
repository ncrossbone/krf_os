Ext.define('Ext.draw.sprite.Diamond', {
    extend: 'Ext.draw.sprite.Path',
    alias: 'sprite.diamond',

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
                size: 'path'
            }
        }
    },

    updatePath: function (path, attr) {
        var s = attr.size * 1.25,
            x = attr.x - attr.lineWidth / 2,
            y = attr.y;
        path.fromSvgString(['M', x, y - s, 'l', s, s, -s, s, -s, -s, s, -s, 'z']);
    }

});