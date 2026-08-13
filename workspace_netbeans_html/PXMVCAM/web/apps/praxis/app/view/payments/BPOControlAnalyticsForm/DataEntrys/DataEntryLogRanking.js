prototype.idRanking = prototype.id + '-DataEntryLogRanking';

Ext.define('Ext.Praxis.view.payments.BPOControlAnalyticsForm.DataEntrys.DataEntryLogRanking', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryLogRanking',
    requires: [
        'Ext.Praxis.controller.payments.BPOControlAnalytics.DataEntryLogRankingController'
    ],
    title: 'Detail',
    header: true,
    width: 1200,
    height: 618,
    resizable: true,
    layout: 'fit',
    modal: true,
    controller: 'DataEntryLogRankingController',
    
    scrollable: true,
    bodyStyle: 'background-color: white !important;',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false,
    },

    tbar: {
        layout: {
            pack: 'end'
        },
        defaults: {
            scale: 'medium'
        },
        items: [
            {
                xtype: 'button',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export to Excel',
                listeners: {
                    click: 'downloadExcelLog'
                }
            },
        ]
    },
   
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            flex: 1,
            // padding: 4,
            style: 'background: white',
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    // padding: 8,
                    flex: 1,
                    style: 'background: white',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idRanking + '-grid-Detail',
                            style: 'background: white',
//                            maxHeight: 550,
                            flex: 1,
                            columnLines: true,
                            viewConfig: {
                                enableTextSelection: true
                            },
                            columns: [
                                {text: 'Date', dataIndex: 'PRDA', align: 'center', width: 80},
                                {text: 'Country', dataIndex: 'SCOUNTRY', align: 'center', width: 60},
                                // {text: 'PROCTYPE', dataIndex: 'PROCTYPE', align: 'center', width: 100},
                                {text: 'Processor', dataIndex: 'PROCTYPE_DESC', align: 'center', width: 140},  // --
                                {text: 'Merchant ID', dataIndex: 'PMERCHID', align: 'center', width: 120},
                                {
                                    text: 'Credit Card',
                                    defaults: {
                                        align: 'center',
                                        menuDisabled: true,
                                        sortable: true
                                    },
                                    columns: [
                                        {text: 'Card Number', dataIndex: 'SCARDN', width: 130},
                                        {text: 'Auth', dataIndex: 'SAUTHOC', width: 80},
                                    ]
                                },
                                {text: 'PNR', dataIndex: 'SPNR', align: 'center', width: 100},
                                {text: 'Ticket', dataIndex: 'TKT', align: 'center', width: 110},
                                {text: 'Qty Tkt', dataIndex: 'QTYTKT', align: 'center', width: 60},  // --
                                // {text: 'Doc<br>Type', dataIndex: 'TDOC', align: 'center', width: 60},
                                {text: 'Currrency', dataIndex: 'SCURRENCY', align: 'center', width: 100},
                                {text: 'Transaction<br>Type', dataIndex: 'TRANSTYPE', align: 'center', width: 100},
                                // {text: 'GRUPOT', dataIndex: 'GRUPOT', align: 'center', width: 90}, // --
                                {text: 'Code Chbk', dataIndex: 'CODCHGBACK', align: 'center', width: 100},
                                {
                                    text: 'Autorization',
                                    defaults: {
                                        align: 'center',
                                        menuDisabled: true,
                                        sortable: true
                                    },
                                    columns: [
                                        {text: 'Date', dataIndex: 'FEAUT', width: 80},
                                        {text: 'Time', dataIndex: 'HOAUT', width: 70},
                                        {text: 'User', dataIndex: 'AUASI', width: 100},
                                    ]
                                },
                                {
                                    text: 'Asignation',
                                    defaults: {
                                        align: 'center',
                                        menuDisabled: true,
                                        sortable: true
                                    },
                                    columns: [
                                        {text: 'Date', dataIndex: 'FEASI', width: 80},
                                        {text: 'Time', dataIndex: 'HOASI', width: 70},
                                    ]
                                },
                            ]
                        }
                    ]
                }
            ]


        }
    ],

    bbar: {
        xtype: 'pagingtoolbar',
        id: prototype.idRanking + '-pagginLog',
        displayInfo: true
    }

});