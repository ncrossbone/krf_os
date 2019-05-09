
Ext.define('Ext.ux.DataView.DragSelector', {
    requires: ['Ext.dd.DragTracker', 'Ext.util.Region'],

    init: function(dataview) {
        var scroller = dataview.getScrollable();

        if (scroller && (scroller.getX() || scroller.getY()) && (Ext.supports.PointerEvents || Ext.supports.MSPointerEvents)) {
         
            Ext.log.warn('DragSelector not available on PointerEvent devices')
            
            return;
        }
        
        this.dataview = dataview;
        dataview.mon(dataview, {
            beforecontainerclick: this.cancelClick,
            scope: this,
            render: {
                fn: this.onRender,
                scope: this,
                single: true
            }
        });
    },

    onRender: function() {
        
        this.tracker = Ext.create('Ext.dd.DragTracker', {
            dataview: this.dataview,
            el: this.dataview.el,
            onBeforeStart: this.onBeforeStart,
            onStart: this.onStart.bind(this),
            onDrag : this.onDrag.bind(this),
            onEnd  : Ext.Function.createDelayed(this.onEnd, 100, this)
        });

        
        this.dragRegion = Ext.create('Ext.util.Region');
    },

    onBeforeStart: function(e) {
        return e.target === this.dataview.getEl().dom;
    },

    onStart: function(e) {
        var dataview = this.dataview;

        this.dragging = true;

        this.fillRegions();
        this.getProxy().show();
        dataview.getSelectionModel().deselectAll();
    },

    
    cancelClick: function() {
        return !this.dragging;
    },

    onDrag: function(e) {
        var selModel     = this.dataview.getSelectionModel(),
            dragRegion   = this.dragRegion,
            bodyRegion   = this.bodyRegion,
            proxy        = this.getProxy(),
            regions      = this.regions,
            length       = regions.length,

            startXY   = this.tracker.startXY,
            currentXY = this.tracker.getXY(),
            minX      = Math.min(startXY[0], currentXY[0]),
            minY      = Math.min(startXY[1], currentXY[1]),
            width     = Math.abs(startXY[0] - currentXY[0]),
            height    = Math.abs(startXY[1] - currentXY[1]),
            region, selected, i;

        Ext.apply(dragRegion, {
            top: minY,
            left: minX,
            right: minX + width,
            bottom: minY + height
        });

        dragRegion.constrainTo(bodyRegion);
        proxy.setBox(dragRegion);

        for (i = 0; i < length; i++) {
            region = regions[i];
            selected = dragRegion.intersect(region);

            if (selected) {
                selModel.select(i, true);
            } else {
                selModel.deselect(i);
            }
        }
    },

    onEnd: function(e) {
        var dataview = this.dataview,
            selModel = dataview.getSelectionModel();

        this.dragging = false;
        this.getProxy().hide();
    },

 
    getProxy: function() {
        if (!this.proxy) {
            this.proxy = this.dataview.getEl().createChild({
                tag: 'div',
                cls: 'x-view-selector'
            });
        }
        return this.proxy;
    },

    
    fillRegions: function() {
        var dataview = this.dataview,
            regions  = this.regions = [];

        dataview.all.each(function(node) {
            regions.push(node.getRegion());
        });
        this.bodyRegion = dataview.getEl().getRegion();
    }
});
