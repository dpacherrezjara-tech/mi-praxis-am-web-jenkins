Ext.define('Ext.Praxis.view.sales.OracleManualPolicyTransferForm.Options', {
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
                            id: prototype.id + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear filters',
                            listeners: {
                                click: 'onClickClearBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnUpload',
                            iconCls: 'prx-icon-image-process',
                            text: 'Upload Policies',
                            tooltip: 'Upload Policies (.zip)',
                            listeners: {
                                click: 'onClickUploadBtn'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
