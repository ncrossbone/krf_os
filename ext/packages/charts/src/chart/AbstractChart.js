Ext.define('Ext.chart.AbstractChart', {

    extend: 'Ext.draw.Container',

    requires: [
        'Ext.chart.theme.Default',
        'Ext.chart.series.Series',
        'Ext.chart.interactions.Abstract',
        'Ext.chart.axis.Axis',
        'Ext.data.StoreManager',
        'Ext.chart.legend.Legend',
        'Ext.chart.legend.SpriteLegend',
        'Ext.chart.legend.store.Store',
        'Ext.data.Store'
    ],

    isChart: true,

    defaultBindProperty: 'store',

    config: {

        
        store: 'ext-empty-store',

      
        theme: 'default',

        style: null,

        animation: !Ext.isIE8,

        series: [],

        axes: [],

        
        legend: null,

        colors: null,

       
        insetPadding: {
            top: 10,
            left: 10,
            right: 10,
            bottom: 10
        },

        background: null,

        interactions: [],

        mainRect: null,

        resizeHandler: null,

        highlightItem: null
    },

    animationSuspendCount: 0,

    chartLayoutSuspendCount: 0,

    axisThicknessSuspendCount: 0,

    isThicknessChanged: false,

    surfaceZIndexes: {
        background: 0, 
        main: 1,       
        grid: 2,       
        series: 3,     
        axis: 4,       
        chart: 5,      
        overlay: 6,    
                       
        legend: 7,     
        title: 8       
    },

    constructor: function (config) {
        var me = this;

        me.itemListeners = {};
        me.surfaceMap = {};
        me.chartComponents = {};

        me.isInitializing = true;

        me.suspendChartLayout();
        me.animationSuspendCount++;

        me.callParent(arguments);

        me.isInitializing = false;

        me.getSurface('main');
        me.getSurface('chart').setFlipRtlText(me.getInherited().rtl);
        me.getSurface('overlay').waitFor(me.getSurface('series'));

        me.animationSuspendCount--;
        me.resumeChartLayout();
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
        if (this.animationSuspendCount) {
            return {
                duration: 0
            };
        } else {
            return this.callParent();
        }
    },

    applyInsetPadding: function (padding, oldPadding) {
        if (!Ext.isObject(padding)) {
            return Ext.util.Format.parseBox(padding);
        } else if (!oldPadding) {
            return padding;
        } else {
            return Ext.apply(oldPadding, padding);
        }
    },

    suspendAnimation: function () {
        var me = this,
            seriesList = me.getSeries(),
            n = seriesList.length,
            i = -1,
            series;

        me.animationSuspendCount++;
        if (me.animationSuspendCount === 1) {
            while (++i < n) {
                series = seriesList[i];
                series.setAnimation(series.getAnimation());
            }
        }
    },

    resumeAnimation: function () {
        var me = this,
            seriesList = me.getSeries(),
            n = seriesList.length,
            i = -1,
            series, animation;

        me.animationSuspendCount--;
        if (me.animationSuspendCount === 0) {
            while (++i < n) {
                series = seriesList[i];
                animation = series.getAnimation();
                series.setAnimation(animation.duration && animation || me.getAnimation());
            }
        }
    },

    suspendChartLayout: function () {
        var me = this;

        me.chartLayoutSuspendCount++;
        if (me.chartLayoutSuspendCount === 1) {
            if (me.scheduledLayoutId) {
                me.layoutInSuspension = true;
                me.cancelChartLayout();
            } else {
                me.layoutInSuspension = false;
            }
        }
    },

    resumeChartLayout: function () {
        var me = this;

        me.chartLayoutSuspendCount--;
        if (me.chartLayoutSuspendCount === 0) {
            if (me.layoutInSuspension) {
                me.scheduleLayout();
            }
        }
    },

    cancelChartLayout: function () {
        if (this.scheduledLayoutId) {
            Ext.draw.Animator.cancel(this.scheduledLayoutId);
            this.scheduledLayoutId = null;
        }
    },

    scheduleLayout: function () {
        var me = this;

        if (me.allowSchedule() && !me.scheduledLayoutId) {
            me.scheduledLayoutId = Ext.draw.Animator.schedule('doScheduleLayout', me);
        }
    },

    allowSchedule: function() {
        return true;
    },

    doScheduleLayout: function () {
        var me = this;

        if (me.chartLayoutSuspendCount) {
            me.layoutInSuspension = true;
        } else {
            me.performLayout();
        }
        me.scheduledLayoutId = null;
    },

    suspendThicknessChanged: function () {
        this.axisThicknessSuspendCount++;
    },

    resumeThicknessChanged: function () {
        if (this.axisThicknessSuspendCount > 0) {
            this.axisThicknessSuspendCount--;
            if (this.axisThicknessSuspendCount === 0 && this.isThicknessChanged) {
                this.onThicknessChanged();
            }
        }
    },

    onThicknessChanged: function () {
        if (this.axisThicknessSuspendCount === 0) {
            this.isThicknessChanged = false;
            this.performLayout();
        } else {
            this.isThicknessChanged = true;
        }
    },

    applySprites: function (sprites) {
        var surface = this.getSurface('chart');

        sprites = Ext.Array.from(sprites);
        surface.removeAll(true);
        surface.add(sprites);

        return sprites;
    },

    initItems: function () {
        var items = this.items,
            i, ln, item;
        if (items && !items.isMixedCollection) {
            this.items = [];
            items = Ext.Array.from(items);
            for (i = 0, ln = items.length; i < ln; i++) {
                item = items[i];
                if (item.type) {
                    Ext.raise("To add custom sprites to the chart use the 'sprites' config.");
                } else {
                    this.items.push(item);
                }
            }
        }
        this.callParent();
    },

    applyBackground: function (newBackground, oldBackground) {
        var surface = this.getSurface('background');

        return this.refreshBackground(surface, newBackground, oldBackground);
    },

    refreshBackground: function (surface, newBackground, oldBackground) {
        var width, height, isUpdateOld;

        if (newBackground) {
            if (oldBackground) {
                width = oldBackground.attr.width;
                height = oldBackground.attr.height;
                isUpdateOld = oldBackground.type === (newBackground.type || 'rect');
            }
            if (newBackground.isSprite) {
                oldBackground = newBackground;
            } else if (newBackground.type === 'image' && Ext.isString(newBackground.src)) {
                if (isUpdateOld) {
                    oldBackground.setAttributes({
                        src: newBackground.src
                    });
                } else {
                    surface.remove(oldBackground, true);
                    oldBackground = surface.add(newBackground);
                }
            } else {
                if (isUpdateOld) {
                    oldBackground.setAttributes({
                        fillStyle: newBackground
                    });
                } else {
                    surface.remove(oldBackground, true);
                    oldBackground = surface.add({
                        type: 'rect',
                        fillStyle: newBackground,
                        fx: {
                            customDurations: {
                                x: 0,
                                y: 0,
                                width: 0,
                                height: 0
                            }
                        }
                    });
                }
            }
        }
        if (width && height) {
            oldBackground.setAttributes({
                width: width,
                height: height
            });
        }
        oldBackground.setAnimation(this.getAnimation());

        return oldBackground;
    },

    getLegendStore: function () {
        return this.legendStore;
    },

    refreshLegendStore: function () {
        var me = this,
            legendStore = me.getLegendStore(),
            series;

        if (legendStore) {
            var seriesList = me.getSeries(),
                ln = seriesList.length,
                legendData = [],
                i = 0;

            for (; i < ln; i++) {
                series = seriesList[i];
                if (series.getShowInLegend()) {
                    series.provideLegendInfo(legendData);
                }
            }
            legendStore.setData(legendData);
        }
    },

    onUpdateLegendStore: function (store, record) {
        var series = this.getSeries(), seriesItem;

        if (record && series) {
            seriesItem = series.map[record.get('series')];
            if (seriesItem) {
                seriesItem.setHiddenByIndex(record.get('index'), record.get('disabled'));
                this.redraw();
            }
        }
    },

    defaultResizeHandler: function (size) {
        this.scheduleLayout();
        return false;
    },

    applyMainRect: function (newRect, rect) {
        if (!rect) {
            return newRect;
        }
        this.getSeries();
        this.getAxes();
        if (newRect[0] === rect[0] &&
            newRect[1] === rect[1] &&
            newRect[2] === rect[2] &&
            newRect[3] === rect[3]) {
            return rect;
        } else {
            return newRect;
        }
    },

    register: function (component) {
        var map = this.chartComponents,
            id = component.getId();

        if (id === undefined) {
            Ext.raise('Chart component id is undefined. ' +
                'Please ensure the component has an id.');
        }
        if (id in map) {
            Ext.raise('Registering duplicate chart component id "' + id + '"');
        }

        map[id] = component;
    },

    unregister: function (component) {
        var map = this.chartComponents,
            id = component.getId();

        delete map[id];
    },

    get: function (id) {
        return this.chartComponents[id];
    },

    getAxis: function (axis) {
        if (axis instanceof Ext.chart.axis.Axis) {
            return axis;
        } else if (Ext.isNumber(axis)) {
            return this.getAxes()[axis];
        } else if (Ext.isString(axis)) {
            return this.get(axis);
        }
    },

    getSurface: function (name, type) {
        name = name || 'main';
        type = type || name;

        var me = this,
            surface = this.callParent([name]),
            zIndexes = me.surfaceZIndexes,
            map = me.surfaceMap;

        if (type in zIndexes) {
            surface.element.setStyle('zIndex', zIndexes[type]);
        }
        if (!map[type]) {
            map[type] = [];
        }
        if (Ext.Array.indexOf(map[type], surface) < 0) {
            surface.type = type;
            map[type].push(surface);
            surface.on('destroy', me.forgetSurface, me);
        }
        return surface;
    },

    forgetSurface: function (surface) {
        var map = this.surfaceMap;

        if (!map || this.isDestroying) {
            return;
        }

        var group = map[surface.type],
            index = group ? Ext.Array.indexOf(group, surface) : -1;

        if (index >= 0) {
            group.splice(index, 1);
        }
    },

    applyAxes: function (newAxes, oldAxes) {
        var me = this,
            positions = {left: 'right', right: 'left'},
            result = [],
            axis, oldAxis,
            linkedTo, id,
            i, ln, oldMap;

        me.animationSuspendCount++;

        me.getStore();

        if (!oldAxes) {
            oldAxes = [];
            oldAxes.map = {};
        }

        oldMap = oldAxes.map;
        result.map = {};

        newAxes = Ext.Array.from(newAxes, true);

        for (i = 0, ln = newAxes.length; i < ln; i++) {
            axis = newAxes[i];
            if (!axis) {
                continue;
            }
            if (axis instanceof Ext.chart.axis.Axis) {
                oldAxis = oldMap[axis.getId()];
                axis.setChart(me);
            } else {
                axis = Ext.Object.chain(axis);
                linkedTo = axis.linkedTo;
                id = axis.id;
                if (Ext.isNumber(linkedTo)) {
                    axis = Ext.merge({}, newAxes[linkedTo], axis);
                } else if (Ext.isString(linkedTo)) {
                    Ext.Array.each(newAxes, function (item) {
                        if (item.id === axis.linkedTo) {
                            axis = Ext.merge({}, item, axis);
                            return false;
                        }
                    });
                }
                axis.id = id;
                axis.chart = me;
                if (me.getInherited().rtl) {
                    axis.position = positions[axis.position] || axis.position;
                }
                id = axis.getId && axis.getId() || axis.id;
                axis = Ext.factory(axis, null, oldAxis = oldMap[id], 'axis');
            }

            if (axis) {
                result.push(axis);
                result.map[axis.getId()] = axis;
                if (!oldAxis) {
                    axis.on('animationstart', 'onAnimationStart', me);
                    axis.on('animationend', 'onAnimationEnd', me);
                }
            }
        }

        for (i in oldMap) {
            if (!result.map[i]) {
                oldMap[i].destroy();
            }
        }

        me.animationSuspendCount--;

        return result;
    },

    updateAxes: function () {
        if (!this.isDestroying) {
            this.scheduleLayout();
        }
    },

    circularCopyArray: function(inArray, startIndex, count) {
        var outArray = [],
            i, len = inArray && inArray.length;

        if (len) {
            for (i = 0; i < count; i++) {
                outArray.push(inArray[(startIndex + i) % len]);
            }
        }
        return outArray;
    },

    circularCopyObject: function(inObject, startIndex, count) {
        var me = this,
            name, value, outObject = {};

        if (count) {
            for (name in inObject) {
                if (inObject.hasOwnProperty(name)) {
                    value = inObject[name];
                    if (Ext.isArray(value)) {
                        outObject[name] = me.circularCopyArray(value, startIndex, count);
                    } else {
                        outObject[name] = value;
                    }
                }
            }
        }
        return outObject;
    },

    getColors: function () {
        var me = this,
            configColors = me.config.colors,
            theme = me.getTheme();

        if (Ext.isArray(configColors) && configColors.length > 0) {
            configColors = me.applyColors(configColors);
        }

        return configColors || (theme && theme.getColors());
    },

    applyColors: function (newColors) {
        newColors = Ext.Array.map(newColors, function(color) {
            if (Ext.isString(color)) {
                return color;
            } else {
                return color.toString();
            }
        });
        return newColors;
    },

    updateColors: function (newColors) {
        var me = this,
            theme = me.getTheme(),
            colors = newColors || (theme && theme.getColors()),
            colorIndex = 0,
            series = me.getSeries(),
            seriesCount = series && series.length,
            i, seriesItem, seriesColors, seriesColorCount;

        if (colors.length) {
            for (i = 0; i < seriesCount; i++) {
                seriesItem = series[i];
                seriesColorCount = seriesItem.themeColorCount();
                seriesColors = me.circularCopyArray(colors, colorIndex, seriesColorCount);
                colorIndex += seriesColorCount;
                seriesItem.updateChartColors(seriesColors);
            }
        }
        me.refreshLegendStore();
    },

    applyTheme: function (theme) {
        if (theme && theme.isTheme) {
            return theme;
        }
        return Ext.Factory.chartTheme(theme);
    },

    updateGradients: function (gradients) {
        if (!Ext.isEmpty(gradients)) {
            this.updateTheme(this.getTheme());
        }        
    },

    updateTheme: function (theme) {
        var me = this,
            axes = me.getAxes(),
            seriesList = me.getSeries(),
            colors = me.getColors(),
            series, i;

        me.updateChartTheme(theme);

        for (i = 0; i < axes.length; i++) {
            axes[i].updateTheme(theme);
        }

        for (i = 0; i < seriesList.length; i++) {
            series = seriesList[i];


            series.updateTheme(theme);
        }

        me.updateSpriteTheme(theme);

        me.updateColors(colors);

        me.redraw();
    },

    themeOnlyIfConfigured: {
    },

    updateChartTheme: function (theme) {
        var me = this,
            chartTheme = theme.getChart(),
            initialConfig = me.getInitialConfig(),
            defaultConfig = me.defaultConfig,
            configs = me.self.getConfigurator().configs,
            genericChartTheme = chartTheme.defaults,
            specificChartTheme = chartTheme[me.xtype],
            themeOnlyIfConfigured = me.themeOnlyIfConfigured,
            key, value, isObjValue, isUnusedConfig, initialValue, cfg;

        chartTheme = Ext.merge({}, genericChartTheme, specificChartTheme);
        for (key in chartTheme) {
            value = chartTheme[key];
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

    updateSpriteTheme: function (theme) {
        this.getSprites();

        var me = this,
            chartSurface = me.getSurface('chart'),
            sprites = chartSurface.getItems(),
            styles = theme.getSprites(),
            sprite, style,
            key, attr,
            isText,
            i, ln;

        for (i = 0, ln = sprites.length; i < ln; i++) {
            sprite = sprites[i];
            style = styles[sprite.type];
            if (style) {
                attr = {};
                isText = sprite.type === 'text';
                for (key in style) {
                    if (!(key in sprite.config)) {
                        if (!(isText && key.indexOf('font') === 0 && sprite.config.font)) {
                            attr[key] = style[key];
                        }
                    }
                }
                sprite.setAttributes(attr);
            }
        }
    },

    addSeries: function(newSeries) {
        var series = this.getSeries();

        Ext.Array.push(series, newSeries);
        this.setSeries(series);
    },

   
    removeSeries: function(series) {
        series = Ext.Array.from(series);

        var existingSeries = this.getSeries(),
            newSeries = [],
            len = series.length,
            removeMap = {},
            i, s;

        for (i = 0; i < len; i++) {
            s = series[i];

            if (typeof s !== 'string') {
                s = s.getId();
            }
            removeMap[s] = true;
        }

        for (i = 0, len = existingSeries.length; i < len; i++) {
            if (!removeMap[existingSeries[i].getId()]) {
                newSeries.push(existingSeries[i]);
            }
        }

        this.setSeries(newSeries);
    },

    applySeries: function (newSeries, oldSeries) {
        var me = this,
            result = [],
            oldMap, oldSeriesItem,
            i, ln, series;

        me.animationSuspendCount++;

        me.getAxes();
        if (oldSeries) {
            oldMap = oldSeries.map;
        } else {
            oldSeries = [];
            oldMap = oldSeries.map = {};
        }
        result.map = {};
        newSeries = Ext.Array.from(newSeries, true);
        for (i = 0, ln = newSeries.length; i < ln; i++) {
            series = newSeries[i];
            if (!series) {
                continue;
            }
            oldSeriesItem = oldMap[series.getId && series.getId() || series.id];

            if (series instanceof Ext.chart.series.Series) {
               
                if (oldSeriesItem && oldSeriesItem !== series) {
                    oldSeriesItem.destroy();
                }
                series.setChart(me);
            }
            else if (Ext.isObject(series)) {

                if (oldSeriesItem) {
                    oldSeriesItem.setConfig(series);
                    series = oldSeriesItem;
                }
                else {
                    if (Ext.isString(series)) {
                        series = {
                            type: series
                        };
                    }
                    series.chart = me;
                    series = Ext.create(series.xclass || ('series.' + series.type), series);
                    series.on('animationstart', 'onAnimationStart', me);
                    series.on('animationend', 'onAnimationEnd', me);
                }
            }

            result.push(series);
            result.map[series.getId()] = series;
        }

        for (i in oldMap) {
            if (!result.map[oldMap[i].id]) {
                oldMap[i].destroy();
            }
        }

        me.animationSuspendCount--;

        return result;
    },

    defaultLegendType: 'dom',

    applyLegend: function (legend) {
        var me = this,
            result,
            alias;

        if (legend) {
            if (Ext.isBoolean(legend)) {
                result = Ext.create('legend.' + me.defaultLegendType, {
                    docked: 'bottom',
                    chart: me
                });
            } else {
                legend.docked = legend.docked || 'bottom';
                legend.chart = me;
                alias = 'legend.' + (legend.type || me.defaultLegendType);
                result = Ext.create(alias, legend);
            }
            return result;
        }

        return null;
    },

    updateLegend: function (legend, oldLegend) {
        var me = this;

        if (oldLegend) {
            oldLegend.destroy();
        }
        if (legend) {
            me.getSurface('legend');
            me.getItems();
            me.legendStore = new Ext.chart.legend.store.Store({
                chart: me,
                store: me.legendStore
            });
            me.refreshLegendStore();
            me.legendStore.on('update', 'onUpdateLegendStore', me);
            legend.setStore(me.legendStore);
        }
    },

    updateSeries: function (newSeries, oldSeries) {
        var me = this;

        if (me.isDestroying) {
            return;
        }

        me.animationSuspendCount++;

        me.fireEvent('serieschange', me, newSeries, oldSeries);
        me.refreshLegendStore();
        if (!Ext.isEmpty(newSeries)) {
            me.updateTheme(me.getTheme());
        }
        me.scheduleLayout();

        me.animationSuspendCount--;
    },

    applyInteractions: function (interactions, oldInteractions) {
        if (!oldInteractions) {
            oldInteractions = [];
            oldInteractions.map = {};
        }

        var me = this,
            result = [], oldMap = oldInteractions.map,
            i, ln, interaction;
        result.map = {};
        interactions = Ext.Array.from(interactions, true);
        for (i = 0, ln = interactions.length; i < ln; i++) {
            interaction = interactions[i];
            if (!interaction) {
                continue;
            }
            interaction = Ext.factory(interaction, null, oldMap[interaction.getId && interaction.getId() || interaction.id], 'interaction');
            if (interaction) {
                interaction.setChart(me);
                result.push(interaction);
                result.map[interaction.getId()] = interaction;
            }
        }

        for (i in oldMap) {
            if (!result.map[i]) {
                oldMap[i].destroy();
            }
        }
        return result;
    },

    getInteraction: function (type) {
        var interactions = this.getInteractions(),
            len = interactions && interactions.length,
            out = null,
            interaction, i;

        if (len) {
            for (i = 0; i < len; ++i) {
                interaction = interactions[i];
                if (interaction.type === type) {
                    out = interaction;
                    break;
                }
            }
        }
        return out;
    },

    applyStore: function (store) {
        return store && Ext.StoreManager.lookup(store);
    },

    updateStore: function (newStore, oldStore) {
        var me = this;

        if (oldStore && !oldStore.destroyed) {
            oldStore.un({
                datachanged: 'onDataChanged',
                update: 'onDataChanged',
                scope: me,
                order: 'after'
            });
            if (oldStore.autoDestroy) {
                oldStore.destroy();
            }
        }
        if (newStore) {
            newStore.on({
                datachanged: 'onDataChanged',
                update: 'onDataChanged',
                scope: me,
                order: 'after'
            });
        }

        me.fireEvent('storechange', me, newStore, oldStore);
        me.onDataChanged();
    },

    redraw: function () {
        this.fireEvent('redraw', this);
    },

    performLayout: function () {
        var me = this,
            legend = me.getLegend(),
            chartRect = me.getChartRect(true),
            background = me.getBackground(),
            result = true;

        me.hasFirstLayout = true;
        me.fireEvent('layout', me);
        me.cancelChartLayout();
        me.getSurface('background').setRect(chartRect);
        me.getSurface('chart').setRect(chartRect);

        if (legend && legend.isSpriteLegend) {
            me.getSurface('legend').setRect(me.spriteLegendRect);
            result = legend.performLayout();
        }

        background.setAttributes({
            width: chartRect[2],
            height: chartRect[3]
        });

        return result;
    },

    getChartRect: function (isRecompute) {
        var me = this,
            chartRect, innerSize;

        if (isRecompute) {
            me.chartRect = null;
        }

        if (me.chartRect) {
            chartRect = me.chartRect;
        } else {
            innerSize = me.innerElement.getSize();
            chartRect = me.chartRect = [0, 0, innerSize.width, innerSize.height];
        }

        if (isRecompute) {
            me.computeSpriteLegendRect(chartRect);
        }

        return chartRect;
    },

    computeSpriteLegendRect: function (chartRect) {
        var me = this,
            legend = me.getLegend();

        if (legend && legend.isSpriteLegend) {

            var legendSize = legend.getSize(),
                legendHeight = legendSize.height,
                legendWidth = legendSize.width,
                docked = legend.getDocked(),
                legendRect = [0, 0, 0, 0];

            switch (docked) {
                case 'top':
                    chartRect[1] = legendHeight;
                    legendRect[2] = chartRect[2];  
                    legendRect[3] = legendHeight;  
                    break;
                case 'bottom':
                    chartRect[3] -= legendHeight;
                    legendRect[1] = chartRect[3];  
                    legendRect[2] = chartRect[2];  
                    legendRect[3] = legendHeight;  
                    break;
                case 'left':
                    chartRect[0] = legendWidth;
                    legendRect[2] = legendWidth;   
                    legendRect[3] = chartRect[3];  
                    break;
                case 'right':
                    chartRect[2] -= legendWidth;
                    legendRect[0] = chartRect[2];  
                    legendRect[2] = legendWidth;   
                    legendRect[3] = chartRect[3];  
                    break;
            }

            me.spriteLegendRect = legendRect;

        }
    },

    getEventXY: function (e) {
        return this.getSurface().getEventXY(e);
    },

    getItemForPoint: function (x, y) {
        var me = this,
            seriesList = me.getSeries(),
            mainRect = me.getMainRect(),
            ln = seriesList.length,
            i = me.hasFirstLayout ? ln - 1 : -1,
            series, item;

        if (!(mainRect && x >= 0 && x <= mainRect[2] && y >= 0 && y <= mainRect[3])) {
            return null;
        }
        for (; i >= 0; i--) {
            series = seriesList[i];
            item = series.getItemForPoint(x, y);
            if (item) {
                return item;
            }
        }

        return null;
    },

    getItemsForPoint: function (x, y) {
        var me = this,
            seriesList = me.getSeries(),
            ln = seriesList.length,
            i = me.hasFirstLayout ? ln - 1 : -1,
            items = [],
            series, item;

        for (; i >= 0; i--) {
            series = seriesList[i];
            item = series.getItemForPoint(x, y);
            if (item) {
                items.push(item);
            }
        }

        return items;
    },

    onAnimationStart: function () {
        this.fireEvent('animationstart', this);
    },

    onAnimationEnd: function () {
        this.fireEvent('animationend', this);
    },

    onDataChanged: function () {
        var me = this;

        if (me.isInitializing) {
            return;
        }

        var rect = me.getMainRect(),
            store = me.getStore(),
            series = me.getSeries(),
            axes = me.getAxes();

        if (!store || !axes || !series) {
            return;
        }

        if (!rect) { 
            me.on({
                redraw: me.onDataChanged,
                scope: me,
                single: true
            });
            return;
        }

        me.processData();
        me.redraw();
    },

    recordCount: 0,

    processData: function () {
        var me = this,
            recordCount = me.getStore().getCount(),
            seriesList = me.getSeries(),
            ln = seriesList.length,
            isNeedUpdateColors = false,
            i = 0,
            series;

        for (; i < ln; i++) {
            series = seriesList[i];
            series.processData();
            if (!isNeedUpdateColors && series.isStoreDependantColorCount) {
                isNeedUpdateColors = true;
            }
        }
        if (isNeedUpdateColors && recordCount > me.recordCount) {
            me.updateColors(me.getColors());
            me.recordCount = recordCount;
        }
    },

    bindStore: function (store) {
        this.setStore(store);
    },

    applyHighlightItem: function (newHighlightItem, oldHighlightItem) {
        if (newHighlightItem === oldHighlightItem) {
            return;
        }
        if (Ext.isObject(newHighlightItem) && Ext.isObject(oldHighlightItem)) {
            var i1 = newHighlightItem,
                i2 = oldHighlightItem,
                s1 = i1.sprite && (i1.sprite[0] || i1.sprite),
                s2 = i2.sprite && (i2.sprite[0] || i2.sprite);

            if (s1 === s2 && i1.index === i2.index) {
                return;
            }
        }
        return newHighlightItem;
    },

    updateHighlightItem: function (newHighlightItem, oldHighlightItem) {
        if (oldHighlightItem) {
            oldHighlightItem.series.setAttributesForItem(oldHighlightItem, {highlighted: false});
        }
        if (newHighlightItem) {
            newHighlightItem.series.setAttributesForItem(newHighlightItem, {highlighted: true});
            this.fireEvent('itemhighlight', this, newHighlightItem, oldHighlightItem);
        }
        this.fireEvent('itemhighlightchange', this, newHighlightItem, oldHighlightItem);
    },

    destroyChart: function () {
        var me = this,
            legend = me.getLegend(),
            axes = me.getAxes(),
            series = me.getSeries(),
            interactions = me.getInteractions(),
            emptyArray = [],
            i, ln;

        me.surfaceMap = null;

        for (i = 0, ln = interactions.length; i < ln; i++) {
            interactions[i].destroy();
        }
        for (i = 0, ln = axes.length; i < ln; i++) {
            axes[i].destroy();
        }
        for (i = 0, ln = series.length; i < ln; i++) {
            series[i].destroy();
        }

        me.setInteractions(emptyArray);
        me.setAxes(emptyArray);
        me.setSeries(emptyArray);

        if (legend) {
            legend.destroy();
            me.setLegend(null);
        }

        me.legendStore = null;
        me.setStore(null);
        me.cancelChartLayout();
    },

    getRefItems: function (deep) {
        var me = this,
            series = me.getSeries(),
            axes = me.getAxes(),
            interaction = me.getInteractions(),
            ans = [], i, ln;

        for (i = 0, ln = series.length; i < ln; i++) {
            ans.push(series[i]);
            if (series[i].getRefItems) {
                ans.push.apply(ans, series[i].getRefItems(deep));
            }
        }

        for (i = 0, ln = axes.length; i < ln; i++) {
            ans.push(axes[i]);
            if (axes[i].getRefItems) {
                ans.push.apply(ans, axes[i].getRefItems(deep));
            }
        }

        for (i = 0, ln = interaction.length; i < ln; i++) {
            ans.push(interaction[i]);
            if (interaction[i].getRefItems) {
                ans.push.apply(ans, interaction[i].getRefItems(deep));
            }
        }

        return ans;
    }

});
