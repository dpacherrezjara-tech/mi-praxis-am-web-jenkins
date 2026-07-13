prototype.idRanking = prototype.id + '-DataEntryLogRanking';

Ext.define('Ext.Praxis.view.salesaudit.BPOControlAnalyticsForm.DataEntrys.DataEntryLogRanking', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryLogRanking',
    requires: [
        'Ext.Praxis.controller.salesaudit.BPOControlAnalytics.DataEntryLogRankingController'
    ],
    title: 'Detail',
    header: true,
    width: 940,
    height: 599,
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
                                {text: 'Ticket Nbr', dataIndex: 'A1672TICKET', width: 130},
                                {text: 'Source', dataIndex: 'A1672FUENT', width: 55},
                                {text: 'Channel', dataIndex: 'A1672CANAL', width: 60},
                                {text: 'Country', dataIndex: 'A1672PAIVT', width: 60},
                                {text: 'IATA', dataIndex: 'A1672AGENT', width: 70},
                                {text: 'Trans.', dataIndex: 'A1672TRNCU', width: 50},
                                {text: 'Doc. <br> Type', dataIndex: 'A1672TDOC', width: 40},
                                {text: 'Issue <br> Date', dataIndex: 'A1672FVENT', width: 70},
                                {text: 'Processing<br>Date', dataIndex: 'A1672FPROC', width: 80},
                                {text: 'Working<br>Date', dataIndex: 'A1672FAASI', width: 70},
                                {text: 'Working<br>Hour', dataIndex: 'A1672HAASI', width: 70},
                                {text: 'Suggested<br>Date', dataIndex: 'A1672FREVI', width: 75},
                                {text: 'Status', dataIndex: 'A1672FLADM', width: 88}
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