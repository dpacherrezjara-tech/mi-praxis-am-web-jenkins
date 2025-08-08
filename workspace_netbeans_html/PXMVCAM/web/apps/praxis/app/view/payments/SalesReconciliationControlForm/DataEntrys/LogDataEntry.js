prototype.idLog = prototype.id + '-LogDataEntry';

Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.LogDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.LogDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.LogDataEntryController'
    ],
    title: 'Log By Payment',
    header: true,
    width: 950,
    maxHeight: 700,
    resizable: true,
    layout: 'fit',
    modal: true,
    controller: 'LogDataEntryController',
    border: false,
    scrollable: true,
    bodyStyle: 'background-color: white !important;',

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
            padding: 10,
            style: 'background: white',

            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    flex: 1,
                    margin: '0 10 0 0',
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idLog + '-grid-Log',
                            flex: 1,
                            style: 'background: white',
                            columns: [
                                {text: 'Ref. Number', dataIndex: 'AREFNBR', align: 'center', width: 170},
                                {text: 'Corrl', dataIndex: 'CORRL', align: 'center', width: 60},
                                {text: 'Merchand ID', dataIndex: 'SMERCHID', align: 'center', width: 130},
                                {text: 'Status', dataIndex: 'STVAL', align: 'center', flex:1,
                                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                                        metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                                        const opts = {
                                            'C': 'Match Complement',
                                            'E': 'Duplicate Payment',
                                            'M': 'Match Multi-Payment',
                                            '0': 'Stand By',
                                            '1': 'Match',
                                            '2': 'Sales Without Settl.',
                                            '3': 'Settl. Without Sales',
                                            '4': 'Match Partial',
                                            '5': 'Match Manual',
                                            '8': 'Match Transactional',
                                            '9': 'Match Void'
                                        };
                                        return opts[value] || '';
                                    }},
                                {
                                    text: 'Created',
                                    defaults: {
                                        align: 'center',
                                        menuDisabled: true,
                                        sortable: true
                                    },
                                    columns: [
                                        {text: 'User', dataIndex: 'USCR', width: 120},
                                        {text: 'Date', dataIndex: 'FECR', width: 110},
                                        {text: 'Time', dataIndex: 'HOCR', width: 110}
                                    ]

                                },
                            ],
                        },
                    ]
                },
            ]
        }
    ],
});