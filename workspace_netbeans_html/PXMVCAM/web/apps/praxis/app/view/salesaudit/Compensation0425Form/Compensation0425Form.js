Ext.define('Ext.Praxis.view.salesaudit.Compensation0425Form.Compensation0425Form', {
    extend: 'Ext.form.Panel',
    alias: 'widget.Compensation0425Form',
    requires: [
        'Ext.Praxis.controller.salesaudit.Compensation0425Form.Compensation0425FormController',
        'Ext.Praxis.view.salesaudit.Compensation0425Form.Options',
        'Ext.Praxis.view.salesaudit.Compensation0425Form.Filters',
        'Ext.Praxis.view.salesaudit.Compensation0425Form.Grids.Compensation0425Grids',
        'Ext.Praxis.view.salesaudit.Compensation0425Form.Charts.Compensation0425Chart',
        'Ext.Praxis.view.salesaudit.Compensation0425Form.DataEntrys.CompensationReason',
        'Ext.Praxis.view.salesaudit.Compensation0425Form.DataEntrys.Compensation0425DataEntry'
        
    ],
    controller: 'Compensation0425FormController',
    layout: {
        type: 'fit'
    },
     id: prototype.id + '-Compensation0425Form',
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.id + '-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id + '-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            width: 1650,
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id + '-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: 1650,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        },
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        },
                                        {
                                            xtype: 'panel',
//                                            height: 500,
                                            minHeight: 300,
                                            width: 1650,
                                            bodyStyle: 'background: #E3EAF9',
                                            layout: 'fit',
                                            defaults: {
                                                bodyStyle: 'background: transparent'
                                            },
                                            items: [
                                                {
                                                    xtype: prototype.id + '-Compensation0425Grids',
                                                    id: prototype.id + '-mainContent'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 500,
                                            width: 1650,
                                            bodyStyle: 'background: #E3EAF9',
                                            layout: 'fit',
                                            defaults: {
                                                bodyStyle: 'background: transparent'
                                            },
                                            items: [
                                                {
                                                    xtype: prototype.id + '-Compensation0425Chart',
                                                    id: prototype.id + '-contentChart'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});




