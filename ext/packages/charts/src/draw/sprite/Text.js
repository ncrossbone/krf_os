Ext.define('Ext.draw.sprite.Text', function () {

    var fontSizes = {
        'xx-small': true,
        'x-small': true,
        'small': true,
        'medium': true,
        'large': true,
        'x-large': true,
        'xx-large': true
    };
    var fontWeights = {
        normal: true,
        bold: true,
        bolder: true,
        lighter: true,
        100: true,
        200: true,
        300: true,
        400: true,
        500: true,
        600: true,
        700: true,
        800: true,
        900: true
    };
    var textAlignments = {
        start: 'start',
        left: 'start',
        center: 'center',
        middle: 'center',
        end: 'end',
        right: 'end'
    };
    var textBaselines = {
        top: 'top',
        hanging: 'hanging',
        middle: 'middle',
        center: 'middle',
        alphabetic: 'alphabetic',
        ideographic: 'ideographic',
        bottom: 'bottom'
    };

return {
    extend: 'Ext.draw.sprite.Sprite',
    requires: [
        'Ext.draw.TextMeasurer',
        'Ext.draw.Color'
    ],
    alias: 'sprite.text',
    type: 'text',
    lineBreakRe: /\r?\n/g,
    statics: {
        debug: false,

        fontSizes: fontSizes,
        fontWeights: fontWeights,
        textAlignments: textAlignments,
        textBaselines: textBaselines
    },
    inheritableStatics: {

        def: {
            animationProcessors: {
                text: 'text'
            },
            processors: {
                
                x: 'number',

                y: 'number',

                text: 'string',

                fontSize: function (n) {
                    if (Ext.isNumber(+n)) {
                        return n + 'px';
                    } else if (n.match(Ext.dom.Element.unitRe)) {
                        return n;
                    } else if (n in fontSizes) {
                        return n;
                    }
                },

                fontStyle: 'enums(,italic,oblique)',

                fontVariant: 'enums(,small-caps)',

                fontWeight: function (n) {
                    if (n in fontWeights) {
                        return String(n);
                    } else {
                        return '';
                    }
                },

                fontFamily: 'string',

                textAlign: function (n) {
                    return textAlignments[n] || 'center';
                },

                textBaseline: function (n) {
                    return textBaselines[n] || 'alphabetic';
                },

                font: 'string'
                ,debug: 'default'
            },
            aliases: {
                'font-size': 'fontSize',
                'font-family': 'fontFamily',
                'font-weight': 'fontWeight',
                'font-variant': 'fontVariant',
                'text-anchor': 'textAlign'
            },
            defaults: {
                fontStyle: '',
                fontVariant: '',
                fontWeight: '',
                fontSize: '10px',
                fontFamily: 'sans-serif',
                font: '10px sans-serif',
                textBaseline: 'alphabetic',
                textAlign: 'start',
                strokeStyle: 'rgba(0, 0, 0, 0)',
                fillStyle: '#000',
                x: 0,
                y: 0,
                text: ''
            },
            triggers: {
                fontStyle: 'fontX,bbox',
                fontVariant: 'fontX,bbox',
                fontWeight: 'fontX,bbox',
                fontSize: 'fontX,bbox',
                fontFamily: 'fontX,bbox',
                font: 'font,bbox,canvas',
                textBaseline: 'bbox',
                textAlign: 'bbox',
                x: 'bbox',
                y: 'bbox',
                text: 'bbox'
            },
            updaters: {
                fontX: 'makeFontShorthand',
                font: 'parseFontShorthand'
            }
        }
    },

    config: {
        preciseMeasurement: undefined
    },

    constructor: function (config) {
        if (config && config.font) {
            config = Ext.clone(config);
            for (var key in config) {
                if (key !== 'font' && key.indexOf('font') === 0) {
                    delete config[key];
                }
            }
        }
        Ext.draw.sprite.Sprite.prototype.constructor.call(this, config);
    },

    fontValuesMap: {
        'italic': 'fontStyle',
        'oblique': 'fontStyle',

        'small-caps': 'fontVariant',

        'bold': 'fontWeight',
        'bolder': 'fontWeight',
        'lighter': 'fontWeight',
        '100': 'fontWeight',
        '200': 'fontWeight',
        '300': 'fontWeight',
        '400': 'fontWeight',
        '500': 'fontWeight',
        '600': 'fontWeight',
        '700': 'fontWeight',
        '800': 'fontWeight',
        '900': 'fontWeight',

        'xx-small': 'fontSize',
        'x-small': 'fontSize',
        'small': 'fontSize',
        'medium': 'fontSize',
        'large': 'fontSize',
        'x-large': 'fontSize',
        'xx-large': 'fontSize'
    },

    makeFontShorthand: function (attr) {
        var parts = [];

        if (attr.fontStyle) {
            parts.push(attr.fontStyle);
        }
        if (attr.fontVariant) {
            parts.push(attr.fontVariant);
        }
        if (attr.fontWeight) {
            parts.push(attr.fontWeight);
        }
        if (attr.fontSize) {
            parts.push(attr.fontSize);
        }
        if (attr.fontFamily) {
            parts.push(attr.fontFamily);
        }
        this.setAttributes({
            font: parts.join(' ')
        }, true);
    },

    parseFontShorthand: function (attr) {
        var value = attr.font,
            ln = value.length,
            changes = {},
            dispatcher = this.fontValuesMap,
            start = 0, end, slashIndex,
            part, fontProperty;

        while (start < ln && end !== -1) {
            end = value.indexOf(' ', start);
            if (end < 0) {
                part = value.substr(start);
            } else if (end > start) {
                part = value.substr(start, end - start);
            } else {
                continue;
            }

            slashIndex = part.indexOf('/');
            if (slashIndex > 0) {
                part = part.substr(0, slashIndex);
            } else if (slashIndex === 0) {
                continue;
            }

            if (part !== 'normal' && part !== 'inherit') {
                fontProperty = dispatcher[part];
                if (fontProperty) {
                    changes[fontProperty] = part;
                } else if (part.match(Ext.dom.Element.unitRe)) {
                    changes.fontSize = part;
                } else { 
                    changes.fontFamily = value.substr(start);
                    break;
                }
            }

            start = end + 1;
        }

        if (!changes.fontStyle) {
            changes.fontStyle = '';   
        }
        if (!changes.fontVariant) {
            changes.fontVariant = ''; 
        }
        if (!changes.fontWeight) {
            changes.fontWeight = '';  
        }

        this.setAttributes(changes, true);
    },

    fontProperties: {
        fontStyle: true,
        fontVariant: true,
        fontWeight: true,
        fontSize: true,
        fontFamily: true
    },

    setAttributes: function (changes, bypassNormalization, avoidCopy) {
        var key, obj;

        if (changes && changes.font) {
            obj = {};
            for (key in changes) {
                if (!(key in this.fontProperties)) {
                    obj[key] = changes[key];
                }
            }
            changes = obj;
        }
        this.callParent([changes, bypassNormalization, avoidCopy]);
    },

    getBBox: function (isWithoutTransform) {
        var me = this,
            plain = me.attr.bbox.plain,
            surface = me.getSurface();
     
        if (plain.dirty) {
            me.updatePlainBBox(plain);
            plain.dirty = false;
        } if (surface && surface.getInherited().rtl && surface.getFlipRtlText()) {
           
            me.updatePlainBBox(plain, true);
        }
        return me.callParent([isWithoutTransform]);
    },

    rtlAlignments: {
        start: 'end',
        center: 'center',
        end: 'start'
    },

    updatePlainBBox: function (plain, useOldSize) {
        var me = this,
            attr = me.attr,
            x = attr.x,
            y = attr.y,
            dx = [],
            font = attr.font,
            text = attr.text,
            baseline = attr.textBaseline,
            alignment = attr.textAlign,
            precise = me.getPreciseMeasurement(),
            size, textMeasurerPrecision;

        if (useOldSize && me.oldSize) {
            size = me.oldSize;
        } else {
            textMeasurerPrecision = Ext.draw.TextMeasurer.precise;
            if (Ext.isBoolean(precise)) {
                Ext.draw.TextMeasurer.precise = precise;
            }
            size = me.oldSize = Ext.draw.TextMeasurer.measureText(text, font);
            Ext.draw.TextMeasurer.precise = textMeasurerPrecision;
        }

        var surface = me.getSurface(),
            isRtl = (surface && surface.getInherited().rtl) || false,
            flipRtlText = isRtl && surface.getFlipRtlText(),
            sizes = size.sizes,
            blockHeight = size.height,
            blockWidth = size.width,
            ln = sizes ? sizes.length : 0,
            lineWidth, rect,
            i = 0;

        switch (baseline) {
            case 'hanging' :
            case 'top':
                break;
            case 'ideographic' :
            case 'bottom' :
                y -= blockHeight;
                break;
            case 'alphabetic' :
                y -= blockHeight * 0.8;
                break;
            case 'middle' :
                y -= blockHeight * 0.5;
                break;
        }
        if (flipRtlText) {
            rect = surface.getRect();
            x = rect[2] - rect[0] - x;
            alignment = me.rtlAlignments[alignment];
        }

        switch (alignment) {
            case 'start':
                if (isRtl) {
                    for (; i < ln; i++) {
                        lineWidth = sizes[i].width;
                        dx.push(-(blockWidth - lineWidth));
                    }
                }
                break;
            case 'end' :
                x -= blockWidth;
                if (isRtl) {
                    break;
                }
                for (; i < ln; i++) {
                    lineWidth = sizes[i].width;
                    dx.push(blockWidth - lineWidth);
                }
                break;
            case 'center' :
                x -= blockWidth * 0.5;
                for (; i < ln; i++) {
                    lineWidth = sizes[i].width;
                    dx.push((isRtl ? -1 : 1) * (blockWidth - lineWidth) * 0.5);
                }
                break;
        }

        attr.textAlignOffsets = dx;

        plain.x = x;
        plain.y = y;
        plain.width = blockWidth;
        plain.height = blockHeight;
    },

    setText: function (text) {
        this.setAttributes({text: text}, true);
    },

    render: function (surface, ctx, rect) {
        var me = this,
            attr = me.attr,
            mat = Ext.draw.Matrix.fly(attr.matrix.elements.slice(0)),
            bbox = me.getBBox(true),
            dx = attr.textAlignOffsets,
            none = Ext.util.Color.RGBA_NONE,
            x, y, i, lines, lineHeight;

        if (attr.text.length === 0) {
            return;
        }

        lines = attr.text.split(me.lineBreakRe);
        lineHeight = bbox.height / lines.length;
        x = attr.bbox.plain.x;
        y = attr.bbox.plain.y + lineHeight * 0.78;
        mat.toContext(ctx);
        if (surface.getInherited().rtl) {
            x += attr.bbox.plain.width;
        }

        for (i = 0; i < lines.length; i++) {
            if (ctx.fillStyle !== none) {
                ctx.fillText(lines[i], x + (dx[i] || 0), y + lineHeight * i);
            }
            if (ctx.strokeStyle !== none) {
                ctx.strokeText(lines[i], x + (dx[i] || 0), y + lineHeight * i);
            }
        }
        var debug = attr.debug || this.statics().debug || Ext.draw.sprite.Sprite.debug;
        if (debug) {
            this.attr.inverseMatrix.toContext(ctx);
            debug.bbox && me.renderBBox(surface, ctx);
        }
    }
};

});