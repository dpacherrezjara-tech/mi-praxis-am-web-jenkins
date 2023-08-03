prototype.id = 'ErrorControlForm';
prototype.url = CONTEXTPATH + '/ErrorControl';

Ext.define('Ext.Praxis.view.payments.ErrorControlForm.ErrorControlForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ErrorControlForm',
    requires: [
        'Ext.Praxis.controller.payments.ErrorControl.ErrorControlController',
        'Ext.Praxis.view.payments.ErrorControlForm.Options',
        'Ext.Praxis.view.payments.ErrorControlForm.Filters',
        'Ext.Praxis.view.payments.ErrorControlForm.FormatSummary',
        'Ext.Praxis.view.payments.ErrorControlForm.ChargeSummary'
    ],
    controller: 'ErrorControlController',
    layout: {
        type: 'fit'
    },
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
                            width: 1400,
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
                                        width: 1400,
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
                                            height: 670,
                                            width: 1400,
                                            bodyStyle: 'background: transparent',
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'tabpanel',
                                                    id: prototype.id + '-tabMain',
                                                    width: 1400,
                                                    height: 670,
                                                    anchor: '100%',
                                                    margin: '1 1 1 1',
                                                    autoScroll: true,
                                                    bodyStyle: 'background: transparent',
                                                    listeners: {
                                                        tabchange: 'onChangeTab'
                                                    },
                                                    items: [
                                                        {
                                                            id: prototype.id + '-tabFormat',
                                                            title: 'Format',
                                                            itemId: 'F',
                                                            tabConfig: {
                                                                flex: 1,
                                                                style: {
                                                                    'text-align': 'center'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            id: prototype.id + '-tabCharge',
                                                            title: 'Load',
                                                            itemId: 'C',
                                                            tabConfig: {
                                                                flex: 1,
                                                                style: {
                                                                    'text-align': 'center'
                                                                }
                                                            }
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




