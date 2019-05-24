Ext.define('Ext.chart.theme.Base', {

    mixins: {
        factoryable: 'Ext.mixin.Factoryable'
    },

    requires: ['Ext.draw.Color'],

    factoryConfig: {
        type: 'chart.theme'
    },

    isTheme: true,

    config: {
        
        baseColor: null,

        colors: undefined,

        gradients: null,

        chart: {
            defaults: {
                background: 'white'
            }
        },

        axis: {
            defaults: {
                label: {
                    x: 0,
                    y: 0,
                    textBaseline: 'middle',
                    textAlign: 'center',
                    fontSize: 'default',
                    fontFamily: 'default',
                    fontWeight: 'default',
                    fillStyle: 'black'
                },
                title: {
                    fillStyle: 'black',
                    fontSize: 'default*1.23',
                    fontFamily: 'default',
                    fontWeight: 'default'
                },
                style: {
                    strokeStyle: 'black'
                },
                grid: {
                    strokeStyle: 'rgb(221, 221, 221)'
                }
            },
            top: {
                style: {
                    textPadding: 5
                }
            },
            bottom: {
                style: {
                    textPadding: 5
                }
            }
        },

        series: {
            defaults: {
                label: {
                    fillStyle: 'black',
                    strokeStyle: 'none',
                    fontFamily: 'default',
                    fontWeight: 'default',
                    fontSize: 'default*1.077',
                    textBaseline: 'middle',
                    textAlign: 'center'
                },
                labelOverflowPadding: 5
            }
        },

        sprites: {
            text: {
                fontSize: 'default',
                fontWeight: 'default',
                fontFamily: 'default',
                fillStyle: 'black'
            }
        },

        legend: {
            label: {
                fontSize: 14,
                fontWeight: 'default',
                fontFamily: 'default',
                fillStyle: 'black'
            },
            border: {
                lineWidth: 1,
                radius: 4,
                fillStyle: 'none',
                strokeStyle: 'gray'
            },
            background: 'white'
        },

        seriesThemes: undefined,

        markerThemes: {
            type: ['circle', 'cross', 'plus', 'square', 'triangle', 'diamond']
        },

        useGradients: false,

        background: null
    },

    colorDefaults: [ '#94ae0a', '#115fa6', '#a61120', '#ff8809', '#ffd13e', '#a61187', '#24ad9a', '#7c7474', '#a66111' ],

    constructor: function (config) {
        this.initConfig(config);
        this.resolveDefaults();
    },

    defaultRegEx: /^default([+\-/\*]\d+(?:\.\d+)?)?$/,

    defaultOperators: {
        '*': function (v1, v2) {
            return v1 * v2;
        },
        '+': function (v1, v2) {
            return v1 + v2;
        },
        '-': function (v1, v2) {
            return v1 - v2;
        }
    },

    resolveDefaults: function () {
        var me = this;
        Ext.onReady(function () {
            var sprites = Ext.clone(me.getSprites()),
                legend = Ext.clone(me.getLegend()),
                axis = Ext.clone(me.getAxis()),
                series = Ext.clone(me.getSeries()),
                div, key, config;

            if (!me.superclass.defaults) {
                div = Ext.getBody().createChild({tag: 'div', cls: 'x-component'});
                me.superclass.defaults = {
                    fontFamily: div.getStyle('fontFamily'),
                    fontWeight: div.getStyle('fontWeight'),
                    fontSize: parseFloat(div.getStyle('fontSize')),
                    fontVariant: div.getStyle('fontVariant'),
                    fontStyle: div.getStyle('fontStyle')
                };
                div.destroy();
            }

            me.replaceDefaults(sprites.text);
            me.setSprites(sprites);

            me.replaceDefaults(legend.label);
            me.setLegend(legend);

            for (key in axis) {
                config = axis[key];
                me.replaceDefaults(config.label);
                me.replaceDefaults(config.title);
            }
            me.setAxis(axis);

            for (key in series) {
                config = series[key];
                me.replaceDefaults(config.label);
            }
            me.setSeries(series);
        });
    },

    replaceDefaults: function (target) {
        var me = this,
            defaults = me.superclass.defaults,
            defaultRegEx = me.defaultRegEx,
            key, value, match, binaryFn;

        if (Ext.isObject(target)) {
            for (key in defaults) {
                match = defaultRegEx.exec(target[key]);
                if (match) {
                    value = defaults[key];
                    match = match[1];
                    if (match) {
                        binaryFn = me.defaultOperators[match.charAt(0)];
                        value = Math.round(binaryFn(value, parseFloat(match.substr(1))));
                    }
                    target[key] = value;
                }
            }
        }
    },

    applyBaseColor: function (baseColor) {
        var midColor, midL;
        if (baseColor) {
            midColor = baseColor.isColor ? baseColor : Ext.util.Color.fromString(baseColor);
            midL = midColor.getHSL()[2];
            if (midL < 0.15) {
                midColor = midColor.createLighter(0.3);
            } else if (midL < 0.3) {
                midColor = midColor.createLighter(0.15);
            } else if (midL > 0.85) {
                midColor = midColor.createDarker(0.3);
            } else if (midL > 0.7) {
                midColor = midColor.createDarker(0.15);
            }
            this.setColors([
                midColor.createDarker(0.3).toString(),
                midColor.createDarker(0.15).toString(),
                midColor.toString(),
                midColor.createLighter(0.12).toString(),
                midColor.createLighter(0.24).toString(),
                midColor.createLighter(0.31).toString()
            ]);
        }
        return baseColor;
    },

    applyColors: function (newColors) {
        return newColors || this.colorDefaults;
    },

    updateUseGradients: function (useGradients) {
        if (useGradients) {
            this.updateGradients({
                type: 'linear',
                degrees: 90
            });
        }
    },

    updateBackground: function (background) {
        if (background) {
            var chart = this.getChart();
            chart.defaults.background = background;
            this.setChart(chart);
        }
    },

    updateGradients: function (gradients) {
        var colors = this.getColors(),
            items = [], gradient,
            midColor, color,
            i, ln;

        if (Ext.isObject(gradients)) {
            for (i = 0, ln = colors && colors.length || 0; i < ln; i++) {
                midColor = Ext.util.Color.fromString(colors[i]);
                if (midColor) {
                    color = midColor.createLighter(0.15).toString();
                    gradient = Ext.apply(Ext.Object.chain(gradients), {
                        stops: [
                            {
                                offset: 1,
                                color: midColor.toString()
                            },
                            {
                                offset: 0,
                                color: color.toString()
                            }
                        ]
                    });
                    items.push(gradient);
                }
            }
            this.setColors(items);
        }
    },

    applySeriesThemes: function (newSeriesThemes) {
        this.getBaseColor();
        this.getUseGradients();
        this.getGradients();
        var colors = this.getColors(); 
        if (!newSeriesThemes) {
            newSeriesThemes = {
                fillStyle: Ext.Array.clone(colors),
                strokeStyle: Ext.Array.map(colors, function (value) {
                    var color = Ext.util.Color.fromString(value.stops ? value.stops[0].color : value);
                    return color.createDarker(0.15).toString();
                })
            };
        }
        return newSeriesThemes;
    }

});
