Ext.define('Ext.Praxis.view.payments.AccountingTransactionForm.Options', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-options',
    border: false,
    layout: {
        type: 'hbox',
        pack: 'end'
    },
    items: [
        {
            xtype: 'panel',
            border: true,
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnSearch',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search',
                            listeners:{
                                click:'onClickSearchBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'prx-icon-excel',
//                            scale: 'small',
                            tooltip: 'Export All Detail Accounting to Excel',
                            listeners: {
                                click: 'downloadAllDetailAccountingExcel'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnFilter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter',
                            listeners: {
                                click: 'onClickFilterBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
                            listeners: {
                                click: 'onClickClearBtn'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
