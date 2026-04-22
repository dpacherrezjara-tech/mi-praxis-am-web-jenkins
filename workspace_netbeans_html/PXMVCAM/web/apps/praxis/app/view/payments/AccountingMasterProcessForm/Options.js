Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.Options', {
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
                            listeners: {
                                click: 'onClickSearchBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnConsistency',
                            iconCls: 'prx-icon-reload',
                            tooltip: 'Consistency',
                            listeners: {
                                click: 'onClickConsistencyBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnExecuteProcess',
                            iconCls: 'prx-icon-image-process',
                            tooltip: 'Execute Accounting Process',
                            listeners: {
                                click: 'onClickExecuteProcess'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnFilter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display/Hide filter',
                            listeners: {
                                click: 'onClickFilterBtn'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
