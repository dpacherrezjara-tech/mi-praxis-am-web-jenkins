prototype.idDE5 = prototype.id + '-BatchLogDataEntry';
Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.BatchLogDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.BatchLogDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.BatchLogDataEntryController'
    ],
    controller: 'BatchLogDataEntryController',
    title: 'Batch Log - Form',
    header: true,
    width: 1070,
    resizable: false,
    layout: 'fit',
    modal: false,
    border: false,
    defaults: {
        border: false
    },
    scrollable: true,
    items: [
        {
            xtype: 'panel',
            width: '100%',
            border: false,
            margin: 3,
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            anchor: '100%',
            items: [
                //<editor-fold defaultstate="collapsed" desc="Filtros">
                {
                    xtype: 'form',
                    layout: 'hbox',
                    id: prototype.idDE5 + '-formFilters',
                    border: true,
                    defaults: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align: center;',
                        padding: '5 1 5 1',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            name: 'IN_FROM',
                            fieldLabel: 'From',
                            format: 'Ymd',
                            editable: false, // Deshabilita la edición del campo
                            labelWidth: 50,
                            width: 150,
                            value: new Date()
                        },
                        {
                            xtype: 'datefield',
                            name: 'IN_TO',
                            fieldLabel: 'To',
                            format: 'Ymd',
                            editable: false, // Deshabilita la edición del campo
                            labelWidth: 50,
                            width: 150,
                            value: new Date()
                        },
                        {
                            name: 'IN_USCR',
                            fieldLabel: 'Username',
                            labelWidth: 100,
                            width: 200
                        },
                        {
                            xtype: 'button',
                            id: prototype.idDE5 + '-btnSearch',
                            height: 25,
                            width: 25,
                            margin: '4 4 4 7',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search',
                            listeners: {
                                click: 'onClickSearchBtn'
                            }
                        }
//                        {
//                            xtype: 'button',
//                            id: prototype.idDeProd + '-btnExcel',
//                            height: 25,
//                            width: 25,
//                            margin: '4 4 4 4',
//                            iconCls: 'prx-icon-excel',
//                            tooltip: 'Export',
//                            listeners: {
//                                click: 'onExportExcelBtn'
//                            }
//                        }
                    ]
                },
                //</editor-fold>,
                //<editor-fold defaultstate="collapsed" desc="Grilla">
                {
                    xtype: 'grid',
                    defaults: {},
                    width: '98%',
                    minHeight: 100,
                    maxHeight: 150,
                    margin: '5 8 5 8',
                    border: false,
                    id: prototype.idDE5 + '-gridLog',
                    emptyText: 'No Logs available',
                    store: new Ext.data.Store({
                        data: [],
                        autoLoad: true
                    }),
                    columnLines: true,
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        markDirty: false
                    },
                    columns: {
                        defaults: {
                            align: 'center',
                            menuDisabled: true,
                            sortable: true
                        },
                        items: [
                            {text: '#', xtype: 'rownumberer', width: 50},
                            {
                                text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80
                            },
                            {
                                text: 'Processor', dataIndex: 'DESC_PROCTYPE', flex: 1
                            },
                            {
                                text: 'Description', dataIndex: 'DESCR', width: 250
                            },
                            {
                                text: 'Total', dataIndex: 'TOTAL', width: 80
                            },
                            {
                                text: 'Matchs', dataIndex: 'MATCHS', width: 80
                            },
                            {
                                text: 'Errors', dataIndex: 'ERRORS', width: 80,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;text-decoration:underline;cursor:pointer;font-weight:bolder;color:red;";
                                    return value;
                                },
                                listeners: {
                                    click: 'onClickErrors'
                                }
                            },
                            {
                                text: 'User', dataIndex: 'USCR', width: 80
                            },
                            {
                                text: 'Date<br>Process', dataIndex: 'FECR', width: 80
                            },
                            {text: 'Status', dataIndex: 'STS', width: 50,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    const opcion = {
                                        '0': () => {
                                            metaData.tdAttr = 'data-qtip="Processing"';
                                            return '<img src="resources/img/botones/arrow-refresh.png"/>';
                                        },
                                        '1': () => {
                                            metaData.tdAttr = 'data-qtip="Success"';
                                            return '<img src="resources/img/icon/16x16/check.png"/>';
                                        },
                                        '2': () => {
                                            metaData.tdAttr = 'data-qtip="Error"';
                                            return '<img src="resources/img/icon/delete.png"/>';
                                        }
                                    };
                                    return opcion[value]();
                                }
                            }
                        ]
                    }
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Grilla Info">
                {
                    xtype: 'grid',
                    id: prototype.idDE5 + '-gridLogDetail',
                    defaults: {},
                    width: '98%',
                    minHeight: 100,
                    maxHeight: 150,
                    margin: '5 8 5 8',
                    border: false,
                    hidden: true,
                    autoScroll: true,
                    store: new Ext.data.Store({
                        data: [],
                        autoLoad: true
                    }),
                    columnLines: true,
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        markDirty: false
                    },
                    columns: {
                        defaults: {
                            align: 'center',
                            menuDisabled: true,
                            sortable: true
                        },
                        items: [
                            {text: '#', xtype: 'rownumberer', width: 50, locked: true},
                            {
                                sortable: false,
                                locked: true,
                                xtype: 'actioncolumn',
                                width: 40,
                                text: 'Det',
                                align: 'center',
                                items: [
                                    {
                                        iconCls: 'prx-icon-edit',
                                        tooltip: 'Open Detail',
                                        handler: 'onClickInfo'
                                    }
                                ]
                            },
                            {
                                text: 'Processing<br>Date', dataIndex: 'PRDA', width: 80
                            },
                            {
                                text: 'Processor', dataIndex: 'DESC_PROCTYPE', width: 160
                            },
                            {
                                text: 'Error<br>Description', dataIndex: 'ERRORMSG', width: 250
                            },
                            {
                                text: 'Card Number', dataIndex: 'SCARDN', width: 160
                            },
                            {
                                text: 'Auth<br>Code', dataIndex: 'SAUTHOC', width: 80
                            },
                            {
                                text: 'Curr', dataIndex: 'SCURRENCY', width: 60
                            },
                            {
                                text: 'Transac.<br>Amount', dataIndex: 'TGROSAMOUN', width: 120
                            },
                            {
                                text: 'PNR', dataIndex: 'SPNR', width: 80
                            },
                            {
                                text: 'Ticket', dataIndex: 'TICKET', width: 120
                            }
                        ]
                    }
                }
                //</editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '3 5 3 5',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClose'
                    }
                }
            ]
        }
    ]
});