Ext.define('Ext.Praxis.view.salesaudit.Compensation0425Form.Options', {
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
                            id: prototype.id + '-btnAdd',
                            //hidden: typeof gloUsr === 'undefined' || gloUsr !== 'DANAZCO' && gloUsr !== 'JLEYVA' && gloUsr !== 'FMARTINEZ' && gloUsr !== 'ANGELAG',
                             iconCls: 'prx-icon-rules',
                            tooltip: 'Rule maintenance',
                            listeners: {
                                click: 'onClickAddBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnSave',
                            iconCls: 'prx-icon-image-update',
                            tooltip: 'Generate ADM',
                            listeners: {
                                click: 'onClickSaveBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnFilter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Rule maintenance',
                            listeners: {
                                click: 'onClickToggleFilterBtn'
                            }
                        },                        
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
                            listeners: {
                                click: 'onClickClearOptionsBtn'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
