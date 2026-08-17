Ext.define('Ext.Praxis.view.sales.OracleManualPolicyTransferForm.DataEntrys.PolicyLoadDrilldown', {
    extend: 'Ext.window.Window',
    alias: 'widget.PolicyLoadDrilldown',
    requires: [
        'Ext.Praxis.controller.sales.OracleManualPolicyTransfer.PolicyLoadDrilldownController'
    ],
    controller: 'PolicyLoadDrilldownController',
    title: 'Manual Policy Transfer - Detail',
    header: true,
    width: 900,
    height: 550,
    resizable: true,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    initComponent: function () {
        this.callParent(arguments);
    },
    items: [
        {
            xtype: 'panel',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.idDD + '-headerInfo',
                    bodyStyle: 'background: transparent; padding: 8px 10px;',
                    html: ''
                },
                {
                    xtype: 'panel',
                    id: prototype.idDD + '-contentArea',
                    flex: 1,
                    border: false,
                    layout: 'fit',
                    tbar: {
                        items: [
                            {
                                xtype: 'button',
                                id: prototype.idDD + '-btnBack',
                                iconCls: 'prx-icon-back',
                                text: 'Back',
                                disabled: true,
                                listeners: {
                                    click: 'onBackClick'
                                }
                            },
                            '->',
                            {
                                xtype: 'button',
                                id: prototype.idDD + '-btnExcel',
                                iconCls: 'prx-icon-excel',
                                tooltip: 'Export to Excel',
                                listeners: {
                                    click: 'onDownloadExcel'
                                }
                            }
                        ]
                    },
                    items: []
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '5 0 5 0',
            layout: {
                pack: 'center'
            },
            defaults: {
                scale: 'medium',
                margin: '5 5 5 5'
            },
            items: [
                {
                    text: 'Close',
                    padding: '5',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]
});
