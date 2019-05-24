Ext.define('Ext.draw.TextMeasurer', {
    singleton: true,

    requires: ['Ext.util.TextMetrics'],

    measureDiv: null,
    measureCache: {},

    precise: Ext.isIE8,

    measureDivTpl: {
        tag: 'div',
        style: {
            overflow: 'hidden',
            position: 'relative',
            'float': 'left', 
            width: 0,
            height: 0
        },
        'data-sticky': true,
        
        children: {
            tag: 'div',
            style: {
                display: 'block',
                position: 'absolute',
                x: -100000,
                y: -100000,
                padding: 0,
                margin: 0,
                'z-index': -100000,
                'white-space': 'nowrap'
            }
        }
    },

    actualMeasureText: function (text, font) {
        var me = Ext.draw.TextMeasurer,
            measureDiv = me.measureDiv,
            FARAWAY = 100000,
            size;

        if (!measureDiv) {
            var parent = Ext.Element.create({
                'data-sticky': true,
                style: {
                    "overflow": "hidden",
                    "position": "relative",
                    "float": "left", 
                    "width": 0,
                    "height": 0
                }
            });
            me.measureDiv = measureDiv = Ext.Element.create({
                style: {
                    "position": 'absolute',
                    "x": FARAWAY,
                    "y": FARAWAY,
                    "z-index": -FARAWAY,
                    "white-space": "nowrap",
                    "display": 'block',
                    "padding": 0,
                    "margin": 0
                }
            });
            Ext.getBody().appendChild(parent);
            parent.appendChild(measureDiv);
        }
        if (font) {
            measureDiv.setStyle({
                font: font,
                lineHeight: 'normal'
            });
        }
        measureDiv.setText('(' + text + ')');
        size = measureDiv.getSize();
        measureDiv.setText('()');
        size.width -= measureDiv.getSize().width;
        return size;
    },

    measureTextSingleLine: function (text, font) {
        if (this.precise) {
            return this.preciseMeasureTextSingleLine(text, font);
        }
        text = text.toString();
        var cache = this.measureCache,
            chars = text.split(''),
            width = 0,
            height = 0,
            cachedItem, charactor, i, ln, size;

        if (!cache[font]) {
            cache[font] = {};
        }
        cache = cache[font];

        if (cache[text]) {
            return cache[text];
        }

        for (i = 0, ln = chars.length; i < ln; i++) {
            charactor = chars[i];
            if (!(cachedItem = cache[charactor])) {
                size = this.actualMeasureText(charactor, font);
                cachedItem = cache[charactor] = size;
            }
            width += cachedItem.width;
            height = Math.max(height, cachedItem.height);
        }
        return cache[text] = {
            width: width,
            height: height
        };
    },

    preciseMeasureTextSingleLine: function (text, font) {
        text = text.toString();
        var measureDiv = this.measureDiv ||
            (this.measureDiv = Ext.getBody().createChild(this.measureDivTpl).down('div'));
        measureDiv.setStyle({font: font || ''});
        return Ext.util.TextMetrics.measure(measureDiv, text);
    },

    measureText: function (text, font) {
        var lines = text.split('\n'),
            ln = lines.length,
            height = 0,
            width = 0,
            line, i,
            sizes;

        if (ln === 1) {
            return this.measureTextSingleLine(text, font);
        }

        sizes = [];
        for (i = 0; i < ln; i++) {
            line = this.measureTextSingleLine(lines[i], font);
            sizes.push(line);
            height += line.height;
            width = Math.max(width, line.width);
        }

        return {
            width: width,
            height: height,
            sizes: sizes
        };
    }
});