Ext.define('Ext.theme.neptune.layout.component.Dock', {
    override: 'Ext.layout.component.Dock',

    noBorderClassTable: [
        0,                                      
        Ext.baseCSSPrefix + 'noborder-l',       
        Ext.baseCSSPrefix + 'noborder-b',       
        Ext.baseCSSPrefix + 'noborder-bl',      
        Ext.baseCSSPrefix + 'noborder-r',       
        Ext.baseCSSPrefix + 'noborder-rl',      
        Ext.baseCSSPrefix + 'noborder-rb',      
        Ext.baseCSSPrefix + 'noborder-rbl',     
        Ext.baseCSSPrefix + 'noborder-t',       
        Ext.baseCSSPrefix + 'noborder-tl',      
        Ext.baseCSSPrefix + 'noborder-tb',      
        Ext.baseCSSPrefix + 'noborder-tbl',     
        Ext.baseCSSPrefix + 'noborder-tr',      
        Ext.baseCSSPrefix + 'noborder-trl',     
        Ext.baseCSSPrefix + 'noborder-trb',     
        Ext.baseCSSPrefix + 'noborder-trbl'     
    ],

    
    edgeMasks: {
        top: 8,
        right: 4,
        bottom: 2,
        left: 1
    },

    handleItemBorders: function() {
        var me     = this,
            edges  = 0,
            maskT  = 8,
            maskR  = 4,
            maskB  = 2,
            maskL  = 1,
            owner  = me.owner,
            bodyBorder  = owner.bodyBorder,
            ownerBorder = owner.border,
            collapsed   = me.collapsed,
            edgeMasks   = me.edgeMasks,
            noBorderCls = me.noBorderClassTable,
            dockedItemsGen = owner.dockedItems.generation,
            b, borderCls, docked, edgesTouched, i, ln, item, dock, lastValue, mask,
            addCls, removeCls;

        if (me.initializedBorders === dockedItemsGen) {
            return;
        }

        addCls = [];
        removeCls = [];

        borderCls   = me.getBorderCollapseTable();
        noBorderCls = me.getBorderClassTable ? me.getBorderClassTable() : noBorderCls;

        me.initializedBorders = dockedItemsGen;

        me.collapsed = false;
        docked = me.getDockedItems('visual');
        me.collapsed = collapsed;

        for (i = 0, ln = docked.length; i < ln; i++) {
            item = docked[i];
            if (item.ignoreBorderManagement) {
               
                continue;
            }

            dock = item.dock;
            mask = edgesTouched = 0;
            addCls.length = 0;
            removeCls.length = 0;

            if (dock !== 'bottom') {
                if (edges & maskT) { 
                    b = item.border;
                } else {
                    b = ownerBorder;
                    if (b !== false) {
                        edgesTouched += maskT;
                    }
                }
                if (b === false) {
                    mask += maskT;
                }
            }
            if (dock !== 'left') {
                if (edges & maskR) { 
                    b = item.border;
                } else {
                    b = ownerBorder;
                    if (b !== false) {
                        edgesTouched += maskR;
                    }
                }
                if (b === false) {
                    mask += maskR;
                }
            }
            if (dock !== 'top') {
                if (edges & maskB) { 
                    b = item.border;
                } else {
                    b = ownerBorder;
                    if (b !== false) {
                        edgesTouched += maskB;
                    }
                }
                if (b === false) {
                    mask += maskB;
                }
            }
            if (dock !== 'right') {
                if (edges & maskL) { 
                    b = item.border;
                } else {
                    b = ownerBorder;
                    if (b !== false) {
                        edgesTouched += maskL;
                    }
                }
                if (b === false) {
                    mask += maskL;
                }
            }

            if ((lastValue = item.lastBorderMask) !== mask) {
                item.lastBorderMask = mask;
                if (lastValue) {
                    removeCls[0] = noBorderCls[lastValue];
                }
                if (mask) {
                    addCls[0] = noBorderCls[mask];
                }
            }

            if ((lastValue = item.lastBorderCollapse) !== edgesTouched) {
                item.lastBorderCollapse = edgesTouched;
                if (lastValue) {
                    removeCls[removeCls.length] = borderCls[lastValue];
                }
                if (edgesTouched) {
                    addCls[addCls.length] = borderCls[edgesTouched];
                }
            }

            if (removeCls.length) {
                item.removeCls(removeCls);
            }
            if (addCls.length) {
                item.addCls(addCls);
            }


            edges |= edgeMasks[dock]; 
        }

        mask = edgesTouched = 0;
        addCls.length = 0;
        removeCls.length = 0;

        if (edges & maskT) { 
            b = bodyBorder;
        } else {
            b = ownerBorder;
            if (b !== false) {
                edgesTouched += maskT;
            }
        }
        if (b === false) {
            mask += maskT;
        }

        if (edges & maskR) { 
            b = bodyBorder;
        } else {
            b = ownerBorder;
            if (b !== false) {
                edgesTouched += maskR;
            }
        }
        if (b === false) {
            mask += maskR;
        }

        if (edges & maskB) { 
            b = bodyBorder;
        } else {
            b = ownerBorder;
            if (b !== false) {
                edgesTouched += maskB;
            }
        }
        if (b === false) {
            mask += maskB;
        }

        if (edges & maskL) { 
            b = bodyBorder;
        } else {
            b = ownerBorder;
            if (b !== false) {
                edgesTouched += maskL;
            }
        }
        if (b === false) {
            mask += maskL;
        }

        if ((lastValue = me.lastBodyBorderMask) !== mask) {
            me.lastBodyBorderMask = mask;
            if (lastValue) {
                removeCls[0] = noBorderCls[lastValue];
            }
            if (mask) {
                addCls[0] = noBorderCls[mask];
            }
        }

        if ((lastValue = me.lastBodyBorderCollapse) !== edgesTouched) {
            me.lastBodyBorderCollapse = edgesTouched;
            if (lastValue) {
                removeCls[removeCls.length] = borderCls[lastValue];
            }
            if (edgesTouched) {
                addCls[addCls.length] = borderCls[edgesTouched];
            }
        }

        if (removeCls.length) {
            owner.removeBodyCls(removeCls);
        }
        if (addCls.length) {
            owner.addBodyCls(addCls);
        }
    },

    onRemove: function (item) {
        var me = this,
            lastBorderMask = item.lastBorderMask,
            lastBorderCollapse = item.lastBorderCollapse;

        if (!item.destroyed && !item.ignoreBorderManagement) {
            if (lastBorderMask) {
                item.lastBorderMask = 0;
                item.removeCls(me.noBorderClassTable[lastBorderMask]);
            }
            if (lastBorderCollapse) {
                item.lastBorderCollapse = 0;
                item.removeCls(me.getBorderCollapseTable()[lastBorderCollapse]);
            }
        }

        me.callParent([item]);
    }
});
