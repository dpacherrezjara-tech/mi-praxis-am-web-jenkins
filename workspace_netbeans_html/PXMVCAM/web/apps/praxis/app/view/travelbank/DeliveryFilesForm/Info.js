//<editor-fold defaultstate="collapsed" desc="Stores">
let storeInfo = Ext.create('Ext.data.Store', {
    storeId: prototype.id + 'storeInfo',
    page : {
        start: 0,
        limit: 20
    }
});
//</editor-fold>

Ext.define('Ext.Praxis.view.travelbank.DeliveryFilesForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
//                height: 570,
                align: 'center'
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="boxMainData">
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: prototype.widthGrid,
//                        height: 545,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: prototype.widthGrid,
                            height: 510,
                            columnLines: true,
                            store: storeInfo ,
                            viewConfig: {
                                deferEmptyText: false,
                                emptyText: 'No data Available',
                            },
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Type', dataIndex: 'A4275TYPE', width: 70
                                    },
                                    {
                                        text: 'ID File', dataIndex: 'A4275IDFIL', width: 145
                                    },
                                    {
                                        text: 'Transmission Date', dataIndex: 'A4275PRDA', width: 145
                                    },
                                    {
                                        text: 'Total Transactions', dataIndex: 'A4275TNTX', width: 130
                                    },
                                    {
                                        text: 'Total Received', dataIndex: 'A4275TLIN', width: 138
                                    },
                                    {
                                        text: 'File Code', dataIndex: 'A4275FCOD', width: 145
                                    },
                                    {
                                        text: 'Reception Status', dataIndex: 'A4275STREC', width: 145,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        let html = '';
                                        if (record.get('A4275STREC') === 'Loaded')
                                            html = '<img src="resources/img/semaforo/Circle_Green.png" title="Loaded" >';
                                        else {
                                            html = '<img src="resources/img/semaforo/Circle_Red.png" title="Loaded with Errors" >';
                                        }
                                        return html;
                                    }
                                    },
                                    {
                                        text: 'Ver',
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 80,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                tooltip: 'Edit',
                                                handler: 'onEditClick'
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 0px 1px 0px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: prototype.widthGrid,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label',
                                        margin: '3px 0px 0px 5px'
                                    },
                                    items: [
                                        {
                                            text: 'Page',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 50
                                        }
                                    ]
                                }
                            ]
                        }
                        // </editor-fold>
                    ]
                }
                // </editor-fold>
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
});