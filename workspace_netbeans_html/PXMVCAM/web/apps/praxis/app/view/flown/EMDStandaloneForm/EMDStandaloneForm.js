
prototype.id = 'EMDStandaloneForm';
prototype.url = CONTEXTPATH + '/EMDStandalone';

Ext.define('Ext.Praxis.view.flown.EMDStandaloneForm.EMDStandaloneForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.EMDStandaloneForm',
    requires: [
        'Ext.Praxis.view.flown.EMDStandaloneForm.Options',
        'Ext.Praxis.view.flown.EMDStandaloneForm.Filters',
        'Ext.Praxis.view.flown.EMDStandaloneForm.Info',
        'Ext.Praxis.controller.flown.EMDStandalone.EMDStandaloneController'
    ],
    controller: 'EMDStandaloneController',
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
                                                    width: 1650,
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




