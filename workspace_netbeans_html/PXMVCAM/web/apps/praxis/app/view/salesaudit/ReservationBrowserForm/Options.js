Ext.define('Ext.Praxis.view.salesaudit.ReservationBrowserForm.Options', {
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
            layout: 'hbox',
            border: false,
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnKeyRobot',
                            iconCls: 'prx-icon-key',
                            tooltip: 'Key Command Center',
                            listeners: {
                                click: 'onClickKeyRobotBtn'
                            }
                        },
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
                            id: prototype.id + '-btnFilter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter',
                            listeners: {
                                click: 'onClickFilterBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnLoadRobot',
                            iconCls: 'prx-icon-processing',
                            tooltip: 'Execute Robot',
                            listeners: {
                                click: 'onClickLoadRobot'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnRobotLog',
                            iconCls: 'prx-icon-image-log',
                            tooltip: 'Robot Log',
                            listeners: {
                                click: 'onClickRobot'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
                            listeners: {
                                click: 'onClearOptionsBtn'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
