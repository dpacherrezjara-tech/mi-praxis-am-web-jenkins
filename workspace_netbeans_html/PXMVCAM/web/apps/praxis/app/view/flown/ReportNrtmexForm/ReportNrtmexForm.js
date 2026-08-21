
prototype.id = 'ReportNrtmexForm';
prototype.url = CONTEXTPATH + '/ReportNrtmex';

Ext.define('Ext.Praxis.view.flown.ReportNrtmexForm.ReportNrtmexForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ReportNrtmexForm',
    requires: [
        'Ext.Praxis.view.flown.ReportNrtmexForm.Options',
        'Ext.Praxis.view.flown.ReportNrtmexForm.Filters',
        'Ext.Praxis.view.flown.ReportNrtmexForm.Info',
        'Ext.Praxis.controller.flown.ReportNrtmex.ReportNrtmexController'
    ],
    controller: 'ReportNrtmexController',
    layout: {
        type: 'fit'
    },
    padding: '0 0 0 0',
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
//                    defaults: {
//                        border: false,
//                        autoScroll: true
//                    },
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            width: 880,
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
                                        width: 1800,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        }
                                        ,
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        }
                                        ,
                                        {
                                            xtype: 'panel',
                                            height: 700,
                                            width: 1800,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    width: 1750,
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: true,
                                                    defaults: {
                                                        border: false
                                                    },
                                                    bodyStyle: 'background-color: white;',
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: prototype.id + '-info',
                                                            id: prototype.id + '-contentInfo'
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
        }
    ]
});




