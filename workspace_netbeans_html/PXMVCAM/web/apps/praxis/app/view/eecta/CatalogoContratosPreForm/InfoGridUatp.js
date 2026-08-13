
Ext.define('Ext.Praxis.view.eecta.CatalogoContratosPreForm.InfoGridUatp', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info-uatp',
    //layout: 'border',
    //align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipal-uatp',
            layout: {
                type: 'vbox',
                align: 'left'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'left'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData-uatp',
                    border: false,
                    width: '100%',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'left'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="grid">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData-uatp',
                            columnLines: true,
                            autoScroll: true,
                            width: '100%',
                            height: 150,
                            padding: '0px 5px 1px 5px',
                            plugins: {
                                ptype: 'cellediting',
                                clicksToEdit: 1
                            },
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'right',
                                    items: [
                                        {
                                            text: 'Add',
                                            id: prototype.id + '-gridData-uatp-add',
                                            iconCls: 'prx-icon-add',
                                            handler: 'onClickAdd_uatp'
                                        }
//                                        ,{
//                                            text:'handle',
//                                            //handler: 'crud_uatpAdd'
//                                            handler:'getModifiedRecords'
//                                        }
                                    ]
                                }],
                            columns: {
                                items: [
                                    {
                                        text: 'Nbr.', dataIndex: 'A4244ITEM', align: 'right', locked: true, width: 50
                                    },
                                    {
                                        text: 'UATP Number', dataIndex: 'A4244UATP', locked: true, align: 'left', width: 200,
                                        editor: {
                                            xtype: 'textfield',
                                            allowBlank: false,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 19
                                        }
                                    },
                                    {
                                        text: 'Type', dataIndex: 'A4244TIPO', align: 'center', width: 130,
                                        editor: {
                                            xtype: 'textfield',
                                            allowBlank: false,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 1,
                                            maskRe: /[A/B/a/b]/,
                                            emptyText: 'A=Anticipo o B=Beneficio'
                                        }
                                    },
                                    {
                                        text: 'Sale', dataIndex: 'A4244VENTA', align: 'right', width: 110,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Curr.', dataIndex: 'A4244MDA', align: 'center', width: 50
                                    },
                                    {
                                        text: 'Applied', dataIndex: 'A4244TOTAP', width: 110, align: 'right',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
//                                    {
//                                        text: 'Balance', dataIndex: 'A4244SALDP', width: 110, align: 'right',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        }
//                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        sortable: false,
                                        width: 40,
                                        align: 'center',
                                        items: [
                                            {
                                                tooltip: 'Click for Remove',
                                                iconCls: 'prx-icon-image-trash',
                                                handler: 'onClickRemove_uatp'
                                            }
                                        ]
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'left'
                                }
                            },
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                                getRowClass: function (record, rowIndex, rowParams, store) {
                                    if (rowIndex % 2 === 0)
                                        return 'rowA';
                                }
                            },
                            trackMouseOver: true,
                            scope: this,
                            listeners: {
                                scope: this,
                                afterrender: function (obj) {

                                }
                            }
                        }
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
//                        {
//                            xtype: 'panel',
//                            id: prototype.id + '-pie',
//                            width: prototype.widthGrid,
//                            layout: {
//                                type: 'hbox',
//                                pack: 'center'
//                            },
//                            border: true,
//                            height: 25,
//                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                            defaults: {
//                                border: true
//                            },
//                            padding: '1px 1px 1px 1px',
//                            items: [
//                                {
//                                    xtype: 'panel',
//                                    width: prototype.widthGrid,
//                                    height: 25,
//                                    layout: {
//                                        type: 'hbox',
//                                        pack: 'center'
//                                    },
//                                    defaults: {
//                                        xtype: 'label',
//                                        margin: '3px 0px 0px 5px'
//                                    },
//                                    items: [
//                                        {
//                                            text: 'Page',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id + '-lbl-currentPage',
//                                            text: '1',
//                                            width: 50
//                                        },
//                                        {
//                                            text: 'Of',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id + '-lbl-pageCount',
//                                            text: '0',
//                                            width: 50
//                                        },
//                                        {xtype: 'tbspacer', width: 100},
//                                        {
//                                            text: 'Total Records',
//                                            width: 80
//                                        },
//                                        {
//                                            id: prototype.id + '-lbl-total',
//                                            text: '0',
//                                            width: 50
//                                        }
//                                    ]
//                                }
//                            ]
//                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});
