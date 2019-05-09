Ext.define('Ext.draw.sprite.Tick', {
    extend: 'Ext.draw.sprite.Line',
    alias: 'sprite.tick',

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
                x: 'tick',
                y: 'tick',
                size: 'tick'
            },
            updaters: {
                tick: function (attr) {
                    var size = attr.size * 1.5,
                        halfLineWidth = attr.lineWidth / 2,
                        x = attr.x,
                        y = attr.y;
                    this.setAttributes({
                        fromX: x - halfLineWidth,
                        fromY: y - size,
                        toX: x - halfLineWidth,
                        toY: y + size
                    });
                }
            }
        }
    }

});