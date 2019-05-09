Ext.define('Ext.chart.series.Series', {

    requires: [
        'Ext.chart.Markers',
        'Ext.chart.sprite.Label',
        'Ext.tip.ToolTip'
    ],

    mixins: [
        'Ext.mixin.Observable',
        'Ext.mixin.Bindable'
    ],

    isSeries: true,

    defaultBindProperty: 'store',

    type: null,

    seriesType: 'sprite',

    identifiablePrefix: 'ext-line-',

    observableType: 'series',

    darkerStrokeRatio: 0.15,


    config: {
     
        chart: null,

        title: null,

        renderer: null,

        showInLegend: true,

        triggerAfterDraw: false,

        style: {},

        subStyle: {},

        themeStyle: {},

        colors: null,

        useDarkerStrokeColor: true,

        store: null,

        label: {},

        labelOverflowPadding: null,

        showMarkers: true,

        marker: null,

        markerSubStyle: null,

        itemInstancing: null,

        background: null,

        highlightItem: null,

        surface: null,

        overlaySurface: null,

        hidden: false,

        highlight: false,

        highlightCfg: {
            merge: function (value) {
                return value;
            },
            $value: {
                fillStyle: 'yellow',
                strokeStyle: 'red'
            }
        },

        animation: null,

        tooltip: null
    },

    directions: [],

    sprites: null,

    themeColorCount: function() {
        return 1;
    },

    isStoreDependantColorCount: false,

    themeMarkerCount: function() {
        return 0;
    },

    getFields: function (fieldCategory) {
        var me = this,
            fields = [], fieldsItem,
            i, ln;
        for (i = 0, ln = fieldCategory.length; i < ln; i++) {
            fieldsItem = me['get' + fieldCategory[i] + 'Field']();
            if (Ext.isArray(fieldsItem)) {
                fields.push.apply(fields, fieldsItem);
            } else {
                fields.push(fieldsItem);
            }
        }
        return fields;
    },

    applyAnimation: function (newAnimation, oldAnimation) {
        if (!newAnimation) {
            newAnimation = {
                duration: 0
            };
        } else if (newAnimation === true) {
            newAnimation = {
                easing: 'easeInOut',
                duration: 500
            };
        }
        return oldAnimation ? Ext.apply({}, newAnimation, oldAnimation) : newAnimation;
    },

    getAnimation: function () {
        var chart = this.getChart();
        if (chart && chart.animationSuspendCount) {
            return {
                duration: 0
            };
        } else {
            return this.callParent();
        }
    },

    updateTitle: function () {
        var me = this,
            chart = me.getChart();

        if (chart && !chart.isInitializing) {
            chart.refreshLegendStore();
        }
    },

    applyHighlight: function (highlight, oldHighlight) {
        if (Ext.isObject(highlight)) {
            highlight = Ext.merge({}, this.config.highlightCfg, highlight);
        } else if (highlight === true) {
            highlight = this.config.highlightCfg;
        }
        return Ext.apply(oldHighlight || {}, highlight);
    },

    updateHighlight: function (highlight) {
        this.getStyle();
        if (!Ext.Object.isEmpty(highlight)) {
            this.addItemHighlight();
        }
    },

    updateHighlightCfg: function (highlightCfg) {
        if (!Ext.Object.equals(highlightCfg, this.defaultConfig.highlightCfg)) {
            this.addItemHighlight();
        }
    },

    applyItemInstancing: function (instancing, oldInstancing) {
        return Ext.merge(oldInstancing || {}, instancing);
    },

    setAttributesForItem: function (item, change) {
        var sprite = item && item.sprite,
            i;

        if (sprite) {
            if (sprite.itemsMarker && item.category === 'items') {
                sprite.putMarker(item.category, change, item.index, false, true);
            }
            if (sprite.isMarkerHolder && item.category === 'markers') {
                sprite.putMarker(item.category, change, item.index, false, true);
            } else if (sprite.isInstancing) {
                sprite.setAttributesFor(item.index, change);
            } else {
                if (Ext.isArray(sprite)) {
                    for (i = 0; i < sprite.length; i++) {
                        sprite[i].setAttributes(change);
                    }
                } else {
                    sprite.setAttributes(change);
                }
            }
        }
    },

    getBBoxForItem: function (item) {
        if (item && item.sprite) {
            if (item.sprite.itemsMarker && item.category === 'items') {
                return item.sprite.getMarkerBBox(item.category, item.index);
            } else if (item.sprite instanceof Ext.draw.sprite.Instancing) {
                return item.sprite.getBBoxFor(item.index);
            } else {
                return item.sprite.getBBox();
            }
        }
        return null;
    },

    applyHighlightItem: function (newHighlightItem, oldHighlightItem) {
        if (newHighlightItem === oldHighlightItem) {
            return;
        }
        if (Ext.isObject(newHighlightItem) && Ext.isObject(oldHighlightItem)) {
            var isSameSprite = newHighlightItem.sprite === oldHighlightItem.sprite,
                isSameIndex = newHighlightItem.index === oldHighlightItem.index;

            if (isSameSprite && isSameIndex) {
                return;
            }
        }
        return newHighlightItem;
    },

    updateHighlightItem: function (newHighlightItem, oldHighlightItem) {
        this.setAttributesForItem(oldHighlightItem, {highlighted: false});
        this.setAttributesForItem(newHighlightItem, {highlighted: true});
    },

    constructor: function (config) {
        var me = this,
            id;

        config = config || {};

        if (config.tips) {
            config = Ext.apply({
                tooltip: config.tips
            }, config);
        }
        if (config.highlightCfg) {
            config = Ext.apply({
                highlight: config.highlightCfg
            }, config);
        }

        if ('id' in config) {
            id = config.id;
        } else if ('id' in me.config) {
            id = me.config.id;
        } else {
            id = me.getId();
        }
        me.setId(id);

        me.sprites = [];
        me.dataRange = [];

        me.mixins.observable.constructor.call(me, config);
        me.initBindable();
    },

    lookupViewModel: function (skipThis) {
        var chart = this.getChart();
        return chart ? chart.lookupViewModel(skipThis) : null;
    },

    applyTooltip: function (tooltip, oldTooltip) {
        var config = Ext.apply({
            xtype: 'tooltip',
            renderer: Ext.emptyFn,
            constrainPosition: true,
            shrinkWrapDock: true,
            autoHide: true,
            mouseOffset: [20, 20]
        }, tooltip);

        return Ext.create(config);
    },

    updateTooltip: function () {
        this.addItemHighlight();
    },

    addItemHighlight: function () {
        var chart = this.getChart();

        if (!chart) {
            return;
        }

        var interactions = chart.getInteractions(),
            i, interaction, hasRequiredInteraction;

        for (i = 0; i < interactions.length; i++) {
            interaction = interactions[i];
            if (interaction.isItemHighlight || interaction.isItemEdit) {
                hasRequiredInteraction = true;
                break;
            }
        }
        if (!hasRequiredInteraction) {
            interactions.push('itemhighlight');
            chart.setInteractions(interactions);
        }
    },

    showTooltip: function (item, event) {
        var me = this,
            tooltip = me.getTooltip();

        if (!tooltip) {
            return;
        }
        clearTimeout(me.tooltipTimeout);

        tooltip.pointerEvent = event;
        tooltip.currentTarget.attach((item.sprite.length ? item.sprite[0] : item.sprite).getSurface().el.dom);

        Ext.callback(tooltip.renderer, tooltip.scope,
            [tooltip, item.record, item], 0, me);

        if (tooltip.isVisible()) {
            tooltip.handleAfterShow();
        } else {
            tooltip.show();
        }
    },

    hideTooltip: function (item) {
        var me = this,
            tooltip = me.getTooltip();

        if (!tooltip) {
            return;
        }
        clearTimeout(me.tooltipTimeout);
        me.tooltipTimeout = Ext.defer(function () {
            tooltip.hide();
        }, 1);
    },

    applyStore: function (store) {
        return store && Ext.StoreManager.lookup(store);
    },

    getStore: function () {
        return this._store || this.getChart() && this.getChart().getStore();
    },

    updateStore: function (newStore, oldStore) {
        var me = this,
            chart = me.getChart(),
            chartStore = chart && chart.getStore(),
            sprites, sprite, len, i;

        oldStore = oldStore || chartStore;

        if (oldStore && oldStore !== newStore) {
            oldStore.un({
                datachanged: 'onDataChanged',
                update: 'onDataChanged',
                scope: me
            });
        }
        if (newStore) {
            newStore.on({
                datachanged: 'onDataChanged',
                update: 'onDataChanged',
                scope: me
            });
            sprites = me.getSprites();
            for (i = 0, len = sprites.length; i < len; i++) {
                sprite = sprites[i];
                if (sprite.setStore) {
                    sprite.setStore(newStore);
                }
            }
            me.onDataChanged();
        }

        me.fireEvent('storechange', me, newStore, oldStore);
    },

    onStoreChange: function (chart, newStore, oldStore) {
        if (!this._store) {
            this.updateStore(newStore, oldStore);
        }
    },

    coordinate: function (direction, directionOffset, directionCount) {
        var me = this,
            store = me.getStore(),
            hidden = me.getHidden(),
            items = store.getData().items,
            axis = me['get' + direction + 'Axis'](),
            range = {min: Infinity, max: -Infinity},
            fieldCategory = me['fieldCategory' + direction] || [direction],
            fields = me.getFields(fieldCategory),
            i, field, data, style = {},
            sprites = me.getSprites();

        if (sprites.length > 0) {
            if (!Ext.isBoolean(hidden) || !hidden) {
                for (i = 0; i < fieldCategory.length; i++) {
                    field = fields[i];
                    data = me.coordinateData(items, field, axis);
                    me.getRangeOfData(data, range);
                    style['data' + fieldCategory[i]] = data;
                }
            }
            me.dataRange[directionOffset] = range.min;
            me.dataRange[directionOffset + directionCount] = range.max;
            style['dataMin' + direction] = range.min;
            style['dataMax' + direction] = range.max;
            if (axis) {
                axis.range = null;
                style['range' + direction] = axis.getRange();
            }
            for (i = 0; i < sprites.length; i++) {
                sprites[i].setAttributes(style);
            }
        }
    },

    coordinateData: function (items, field, axis) {
        var data = [],
            length = items.length,
            layout = axis && axis.getLayout(),
            i, x;

        for (i = 0; i < length; i++) {
            x = items[i].data[field];
            if (!Ext.isEmpty(x, true)) {
                if (layout) {
                    data[i] = layout.getCoordFor(x, field, i, items);
                } else {
                    data[i] = +x;
                }
            } else {
                data[i] = x;
            }
        }
        return data;
    },

    getRangeOfData: function (data, range) {
        var length = data.length,
            min = range.min,
            max = range.max,
            i, value;

        for (i = 0; i < length; i++) {
            value = data[i];
            if (value < min) {
                min = value;
            }
            if (value > max) {
                max = value;
            }
        }
        range.min = min;
        range.max = max;
    },

    updateLabelData: function () {
        var me = this,
            store = me.getStore(),
            items = store.getData().items,
            sprites = me.getSprites(),
            labelTpl = me.getLabel().getTemplate(),
            labelFields = Ext.Array.from(labelTpl.getField()),
            i, j, ln, labels,
            sprite, field;

        if (!sprites.length || !labelFields.length) {
            return;
        }

        for (i = 0; i < sprites.length; i++) {
            labels = [];
            sprite = sprites[i];
            field = sprite.getField();
            if (Ext.Array.indexOf(labelFields, field) < 0) {
                field = labelFields[i];
            }
            for (j = 0, ln = items.length; j < ln; j++) {
                labels.push(items[j].get(field));
            }
            sprite.setAttributes({labels: labels});
        }
    },

    processData: function () {
        var me = this;

        if (me.isProcessingData || !me.getStore()) {
            return;
        }

        var directions = this.directions,
            i, ln = directions.length,
            direction, axis;

        me.isProcessingData = true;

        for (i = 0; i < ln; i++) {
            direction = directions[i];
            axis = me['get' + direction + 'Axis']();
            if (axis) {
                axis.processData(me);
                continue;
            }
            if (me['coordinate' + direction]) {
                me['coordinate' + direction]();
            }
        }
        me.updateLabelData();

        me.isProcessingData = false;
    },

    applyBackground: function (background) {
        if (this.getChart()) {
            this.getSurface().setBackground(background);
            return this.getSurface().getBackground();
        } else {
            return background;
        }
    },

    updateChart: function (newChart, oldChart) {
        var me = this,
            store = me._store;

        if (oldChart) {
            oldChart.un('axeschange', 'onAxesChange', me);
            me.clearSprites();
            me.setSurface(null);
            me.setOverlaySurface(null);
            oldChart.unregister(me);
            me.onChartDetached(oldChart);
            if (!store) {
                me.updateStore(null);
            }
        }
        if (newChart) {
            me.setSurface(newChart.getSurface('series'));
            me.setOverlaySurface(newChart.getSurface('overlay'));

            newChart.on('axeschange', 'onAxesChange', me);
            if (newChart.getAxes()) {
                me.onAxesChange(newChart);
            }
            me.onChartAttached(newChart);
            newChart.register(me);
            if (!store) {
                me.updateStore(newChart.getStore());
            }
        }
    },

    onAxesChange: function (chart) {
        var me = this,
            axes = chart.getAxes(), axis,
            directionToAxesMap = {},
            directionToFieldsMap = {},
            needHighPrecision = false,
            directions = this.directions, direction,
            i, ln;

        for (i = 0, ln = directions.length; i < ln; i++) {
            direction = directions[i];
            directionToFieldsMap[direction] = me.getFields(me['fieldCategory' + direction]);
        }

        for (i = 0, ln = axes.length; i < ln; i++) {
            axis = axes[i];
            if (!directionToAxesMap[axis.getDirection()]) {
                directionToAxesMap[axis.getDirection()] = [axis];
            } else {
                directionToAxesMap[axis.getDirection()].push(axis);
            }
        }

        for (i = 0, ln = directions.length; i < ln; i++) {
            direction = directions[i];
            if (me['get' + direction + 'Axis']()) {
                continue;
            }
            if (directionToAxesMap[direction]) {
                axis = me.findMatchingAxis(directionToAxesMap[direction], directionToFieldsMap[direction]);
                if (axis) {
                    me['set' + direction + 'Axis'](axis);
                    if (axis.getNeedHighPrecision()) {
                        needHighPrecision = true;
                    }
                }
            }
        }
        this.getSurface().setHighPrecision(needHighPrecision);
    },

    findMatchingAxis: function (directionAxes, directionFields) {
        var axis, axisFields,
            i, j;

        for (i = 0; i < directionAxes.length; i++) {
            axis = directionAxes[i];
            axisFields = axis.getFields();
            if (!axisFields.length) {
                return axis;
            } else {
                if (directionFields) {
                    for (j = 0; j < directionFields.length; j++) {
                        if ( Ext.Array.indexOf(axisFields, directionFields[j]) >= 0 ) {
                            return axis;
                        }
                    }
                }
            }
        }
    },

    onChartDetached: function (oldChart) {
        var me = this;
        me.fireEvent('chartdetached', oldChart, me);
        oldChart.un('storechange', 'onStoreChange', me);
    },

    onChartAttached: function (chart) {
        var me = this;
        me.setBackground(me.getBackground());
        me.fireEvent('chartattached', chart, me);
        chart.on('storechange', 'onStoreChange', me);
        me.processData();
    },

    updateOverlaySurface: function (overlaySurface) {
        var me = this;
        if (overlaySurface) {
            if (me.getLabel()) {
                me.getOverlaySurface().add(me.getLabel());
            }
        }
    },

    applyLabel: function (label, oldLabel) {
        var template, chart;

        if (!oldLabel) {
            oldLabel = new Ext.chart.Markers({zIndex: 10});
            oldLabel.setTemplate(new Ext.chart.sprite.Label(label));
        } else {
            template = oldLabel.getTemplate();
            template.setAttributes(label);
            if (label) {
                if (label.field) {
                    template.setField(label.field);
                    this.updateLabelData();
                }
                if (label.display) {
                    oldLabel.setAttributes({
                        hidden: label.display === 'none'
                    });
                }
            }
            oldLabel.setDirty(true); 
            this.updateLabel(); 
        }
        return oldLabel;
    },

    updateLabel: function () {
        var chart = this.getChart();

        if (chart && !chart.isInitializing) {
            chart.redraw();
        }
    },

    createItemInstancingSprite: function (sprite, itemInstancing) {
        var me = this,
            markers = new Ext.chart.Markers(),
            config, template;

        markers.setAttributes({zIndex: Number.MAX_VALUE});
        config = Ext.apply({}, itemInstancing);
        if (me.getHighlight()) {
            config.highlight = me.getHighlight();
            config.modifiers = ['highlight'];
        }
        markers.setTemplate(config);
        template = markers.getTemplate();
        template.setAttributes(me.getStyle());
        template.fx.on('animationstart', 'onSpriteAnimationStart', this);
        template.fx.on('animationend', 'onSpriteAnimationEnd', this);
        sprite.bindMarker('items', markers);

        me.getSurface().add(markers);
        return markers;
    },

    getDefaultSpriteConfig: function () {
        return {
            type: this.seriesType,
            renderer: this.getRenderer()
        };
    },

    updateRenderer: function (renderer) {
        var me = this,
            chart = me.getChart(),
            sprites;

        if (chart && chart.isInitializing) {
            return;
        }
        sprites = me.getSprites();
        if (sprites.length) {
            sprites[0].setAttributes({renderer: renderer || null});
            if (chart && !chart.isInitializing) {
                chart.redraw();
            }
        }
    },

    updateShowMarkers: function (showMarkers) {
        var sprites = this.getSprites(),
            sprite = sprites && sprites[0],
            markers = sprite && sprite.getMarker('markers');

        if (markers) {
            markers.getTemplate().setAttributes({
                hidden: !showMarkers
            });
        }
    },

    createSprite: function () {
        var me = this,
            surface = me.getSurface(),
            itemInstancing = me.getItemInstancing(),
            sprite = surface.add(me.getDefaultSpriteConfig()),
            marker = me.getMarker(),
            markers, markersTpl;

        sprite.setAttributes(me.getStyle());
        sprite.setSeries(me);

        if (itemInstancing) {
            sprite.itemsMarker = me.createItemInstancingSprite(sprite, itemInstancing);
        }

        if (sprite.bindMarker) {
            if (marker) {
                markers = new Ext.chart.Markers();
                markersTpl = Ext.Object.merge({}, marker);
                if (me.getHighlight()) {
                    markersTpl.highlight = me.getHighlight();
                    markersTpl.modifiers = ['highlight'];
                }
                markers.setTemplate(markersTpl);
                markers.getTemplate().fx.setCustomDurations({
                    translationX: 0,
                    translationY: 0
                });
                sprite.dataMarker = markers;
                sprite.bindMarker('markers', markers);
                me.getOverlaySurface().add(markers);
            }
            if (me.getLabel().getTemplate().getField()) {
                sprite.bindMarker('labels', me.getLabel());
            }
        }

        if (sprite.setStore) {
            sprite.setStore(me.getStore());
        }

        sprite.fx.on('animationstart', 'onSpriteAnimationStart', me);
        sprite.fx.on('animationend', 'onSpriteAnimationEnd', me);

        me.sprites.push(sprite);

        return sprite;
    },

    getSprites: Ext.emptyFn,

    onDataChanged: function () {
        var me = this,
            chart = me.getChart(),
            chartStore = chart && chart.getStore(),
            seriesStore = me.getStore();

        if (seriesStore !== chartStore) {
            me.processData();
        }
    },

    isXType: function (xtype) {
        return xtype === 'series';
    },

    getItemId: function () {
        return this.getId();
    },

    applyThemeStyle: function (theme, oldTheme) {
        var me = this,
            fill, stroke;

        fill = theme && theme.subStyle && theme.subStyle.fillStyle;
        stroke = fill && theme.subStyle.strokeStyle;
        if (fill && !stroke) {
            theme.subStyle.strokeStyle = me.getStrokeColorsFromFillColors(fill);
        }

        fill = theme && theme.markerSubStyle && theme.markerSubStyle.fillStyle;
        stroke = fill && theme.markerSubStyle.strokeStyle;
        if (fill && !stroke) {
            theme.markerSubStyle.strokeStyle = me.getStrokeColorsFromFillColors(fill);
        }
        return Ext.apply(oldTheme || {}, theme);
    },

    applyStyle: function (style, oldStyle) {
        var cls = Ext.ClassManager.get(Ext.ClassManager.getNameByAlias('sprite.' + this.seriesType));
        if (cls && cls.def) {
            style = cls.def.normalize(style);
        }
        return Ext.apply({}, style, oldStyle);
    },

    applySubStyle: function (subStyle, oldSubStyle) {
        var cls = Ext.ClassManager.get(Ext.ClassManager.getNameByAlias('sprite.' + this.seriesType));
        if (cls && cls.def) {
            subStyle = cls.def.batchedNormalize(subStyle, true);
        }
        return Ext.merge({}, oldSubStyle, subStyle);
    },

    applyMarker: function (marker, oldMarker) {
        var type = (marker && marker.type) || (oldMarker && oldMarker.type) || 'circle',
            cls = Ext.ClassManager.get(Ext.ClassManager.getNameByAlias('sprite.' + type));
        if (cls && cls.def) {
            marker = cls.def.normalize(Ext.isObject(marker) ? marker : {}, true);
            marker.type = type;
        }
        return Ext.merge(oldMarker || {}, marker);
    },

    applyMarkerSubStyle: function (marker, oldMarker) {
        var type = (marker && marker.type) || (oldMarker && oldMarker.type) || 'circle',
            cls = Ext.ClassManager.get(Ext.ClassManager.getNameByAlias('sprite.' + type));
        if (cls && cls.def) {
            marker = cls.def.batchedNormalize(marker, true);
        }
        return Ext.merge(oldMarker || {}, marker);
    },

    updateHidden: function (hidden) {
        var me = this;

        me.getColors();
        me.getSubStyle();
        me.setSubStyle({hidden: hidden});
        me.processData();
        me.doUpdateStyles();

        if (!Ext.isArray(hidden)) {
            me.updateLegendStore(hidden);
        }
    },

    updateLegendStore: function (hidden, index) {
        var me = this,
            chart = me.getChart(),
            legendStore = chart.getLegendStore(),
            id = me.getId(),
            record;

        if (legendStore) {
            if (arguments.length > 1) {
                record = legendStore.findBy(function (rec) {
                    return rec.get('series') === id &&
                           rec.get('index')  === index;
                });
                if (record !== -1) {
                    record = legendStore.getAt(record);
                }
            } else {
                record = legendStore.findRecord('series', id);
            }
            if (record && record.get('disabled') !== hidden) {
                record.set('disabled', hidden);
            }
        }
    },

    setHiddenByIndex: function (index, value) {
        var me = this;

        if (Ext.isArray(me.getHidden())) {
            me.getHidden()[index] = value;
            me.updateHidden(me.getHidden());
            me.updateLegendStore(value, index);
        } else {
            me.setHidden(value);
        }
    },

    getStrokeColorsFromFillColors: function (colors) {
        var me = this,
            darker = me.getUseDarkerStrokeColor(),
            darkerRatio = (Ext.isNumber(darker) ? darker : me.darkerStrokeRatio),
            strokeColors;

        if (darker) {
            strokeColors = Ext.Array.map(colors, function (color) {
                color = Ext.isString(color) ? color : color.stops[0].color;
                color = Ext.util.Color.fromString(color);
                return color.createDarker(darkerRatio).toString();
            });
        } else {
            strokeColors = Ext.Array.clone(colors);
        }
        return strokeColors;
    },

    updateThemeColors: function (colors) {
        var me = this,
            theme = me.getThemeStyle(),
            fillColors = Ext.Array.clone(colors),
            strokeColors = me.getStrokeColorsFromFillColors(colors),
            newSubStyle = { fillStyle: fillColors, strokeStyle: strokeColors };

        theme.subStyle = Ext.apply(theme.subStyle || {}, newSubStyle);
        theme.markerSubStyle = Ext.apply(theme.markerSubStyle || {}, newSubStyle);

        me.doUpdateStyles();
    },

    themeOnlyIfConfigured: {
    },

    updateTheme: function (theme) {
        var me = this,
            seriesTheme = theme.getSeries(),
            initialConfig = me.getInitialConfig(),
            defaultConfig = me.defaultConfig,
            configs = me.self.getConfigurator().configs,
            genericSeriesTheme = seriesTheme.defaults,
            specificSeriesTheme = seriesTheme[me.type],
            themeOnlyIfConfigured = me.themeOnlyIfConfigured,
            key, value, isObjValue, isUnusedConfig, initialValue, cfg;

        seriesTheme = Ext.merge({}, genericSeriesTheme, specificSeriesTheme);
        for (key in seriesTheme) {
            value = seriesTheme[key];
            cfg = configs[key];
            if (value !== null && value !== undefined && cfg) {
                initialValue = initialConfig[key];
                isObjValue = Ext.isObject(value);
                isUnusedConfig = initialValue === defaultConfig[key];
                if (isObjValue) {
                    if (isUnusedConfig && themeOnlyIfConfigured[key]) {
                        continue;
                    }
                    value = Ext.merge({}, value, initialValue);
                }
                if (isUnusedConfig || isObjValue) {
                    me[cfg.names.set](value);
                }
            }
        }
    },

    updateChartColors: function (colors) {
        var me = this;

        if (!me.getColors()) {
            me.updateThemeColors(colors);
        }
    },

    updateColors: function (colors) {
        this.updateThemeColors(colors);
    },

    updateStyle: function () {
        this.doUpdateStyles();
    },

    updateSubStyle: function () {
        this.doUpdateStyles();
    },

    updateThemeStyle: function () {
        this.doUpdateStyles();
    },

    doUpdateStyles: function () {
        var me = this,
            sprites = me.sprites,
            itemInstancing = me.getItemInstancing(),
            i = 0, ln = sprites && sprites.length,
            showMarkers = me.getConfig('showMarkers', true),
            markerCfg = me.getMarker(),
            style;

        for (; i < ln; i++) {
            style = me.getStyleByIndex(i);
            if (itemInstancing) {
                sprites[i].itemsMarker.getTemplate().setAttributes(style);
            }
            sprites[i].setAttributes(style);
            if (markerCfg && sprites[i].dataMarker) {
                sprites[i].dataMarker.getTemplate().setAttributes(me.getMarkerStyleByIndex(i));
            }
        }
    },

    getStyleWithTheme: function() {
        var me = this,
            theme = me.getThemeStyle(),
            seriesThemeStyle = (theme && theme.style) || {},
            style = Ext.applyIf(Ext.apply({}, me.getStyle()), seriesThemeStyle);
        return style;
    },

    getSubStyleWithTheme: function() {
        var me = this,
            theme = me.getThemeStyle(),
            seriesThemeSubStyle = (theme && theme.subStyle) || {},
            subStyle = Ext.applyIf(Ext.apply({}, me.getSubStyle()), seriesThemeSubStyle);
        return subStyle;
    },

    getStyleByIndex: function (i) {
        var me = this,
            theme = me.getThemeStyle(),
            style, themeStyle, subStyle, themeSubStyle,
            result = {};

        style = me.getStyle();
        themeStyle = (theme && theme.style) || {};

        subStyle = me.styleDataForIndex(me.getSubStyle(), i);
        themeSubStyle = me.styleDataForIndex((theme && theme.subStyle), i);

        Ext.apply(result, themeStyle);
        Ext.apply(result, themeSubStyle);

        Ext.apply(result, style);
        Ext.apply(result, subStyle);

        return result;
    },

    getMarkerStyleByIndex: function (i) {
        var me = this,
            theme = me.getThemeStyle(),
            style, themeStyle, subStyle, themeSubStyle,
            markerStyle, themeMarkerStyle, markerSubStyle, themeMarkerSubStyle,
            result = {};

        style = me.getStyle();
        themeStyle = (theme && theme.style) || {};

        subStyle = me.styleDataForIndex(me.getSubStyle(), i);
        if (subStyle.hasOwnProperty('hidden')) {
            subStyle.hidden = subStyle.hidden || !this.getConfig('showMarkers', true);
        }
        themeSubStyle = me.styleDataForIndex((theme && theme.subStyle), i);

        markerStyle = me.getMarker();
        themeMarkerStyle = (theme && theme.marker) || {};

        markerSubStyle = me.getMarkerSubStyle();
        themeMarkerSubStyle = me.styleDataForIndex((theme && theme.markerSubStyle), i);

        Ext.apply(result, themeStyle);
        Ext.apply(result, themeSubStyle);
        Ext.apply(result, themeMarkerStyle);
        Ext.apply(result, themeMarkerSubStyle);

        Ext.apply(result, style);
        Ext.apply(result, subStyle);
        Ext.apply(result, markerStyle);
        Ext.apply(result, markerSubStyle);

        return result;
    },

    styleDataForIndex: function (style, i) {
        var value, name, result = {};

        if (style) {
            for (name in style) {
                value = style[name];
                if (Ext.isArray(value)) {
                    result[name] = value[i % value.length];
                } else {
                    result[name] = value;
                }
            }
        }
        return result;
    },

    getItemForPoint: Ext.emptyFn,

    getItemByIndex: function (index, category) {
        var me = this,
            sprites = me.getSprites(),
            sprite = sprites && sprites[0],
            item;

        if (!sprite) {
            return;
        }

        if (category === undefined && sprite.isMarkerHolder) {
            category = me.getItemInstancing() ? 'items' : 'markers';
        } else if (!category || category === '' || category === 'sprites') {
            sprite = sprites[index];
        }

        if (sprite) {
            item = {
                series: me,
                category: category,
                index: index,
                record: me.getStore().getData().items[index],
                field: me.getYField(),
                sprite: sprite
            };
            return item;
        }
    },

    onSpriteAnimationStart: function (sprite) {
        this.fireEvent('animationstart', this, sprite);
    },

    onSpriteAnimationEnd: function (sprite) {
        this.fireEvent('animationend', this, sprite);
    },

    resolveListenerScope: function (defaultScope) {
        var me = this,
            namedScope = Ext._namedScopes[defaultScope],
            chart = me.getChart(),
            scope;

        if (!namedScope) {
            scope = chart ? chart.resolveListenerScope(defaultScope, false) : (defaultScope || me);
        } else if (namedScope.isThis) {
            scope = me;
        } else if (namedScope.isController) {
            scope = chart ? chart.resolveListenerScope(defaultScope, false) : me;
        } else if (namedScope.isSelf) {
            scope = chart ? chart.resolveListenerScope(defaultScope, false) : me;
            if (scope === chart && !chart.getInheritedConfig('defaultListenerScope')) {
                scope = me;
            }
        }

        return scope;
    },

    provideLegendInfo: function (target) {
        target.push({
            name: this.getTitle() || this.getId(),
            mark: 'black',
            disabled: this.getHidden(),
            series: this.getId(),
            index: 0
        });
    },

    clearSprites: function () {
        var sprites = this.sprites,
            sprite, i, ln;

        for (i = 0, ln = sprites.length; i < ln; i++) {
            sprite = sprites[i];
            if (sprite && sprite.isSprite) {
                sprite.destroy();
            }
        }
        this.sprites = [];
    },

    destroy: function () {
        var me = this,
            store = me._store,
            tooltip = me.getConfig('tooltip', true);

        if (store && store.getAutoDestroy()) {
            Ext.destroy(store);
        }

        me.setChart(null);

        me.clearListeners();

        if (tooltip) {
            Ext.destroy(tooltip);
            clearTimeout(me.tooltipTimeout);
        }
        me.callParent();
    }
});
