
prototype.id = 'DynamicFaresForm';

Ext.define('Ext.Praxis.view.salesaudit.DynamicFaresForm.DynamicFaresForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.DynamicFaresForm',
    requires: [
        'Ext.Praxis.controller.salesaudit.DynamicFaresForm.DynamicFaresFormController',
        'Ext.Praxis.view.salesaudit.DynamicFaresForm.Options',
        'Ext.Praxis.view.salesaudit.DynamicFaresForm.Filters',
        'Ext.Praxis.view.salesaudit.DynamicFaresForm.Grids.DynamicFaresGrids'
    ],
    controller: 'DynamicFaresFormController',
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
                                            height: 670,
                                            width: 1650,
                                            bodyStyle: 'background: #E3EAF9',
                                            layout: 'fit',
                                            defaults: {
                                                bodyStyle: 'background: transparent'
                                            },
                                            items: [
                                                {
                                                    xtype: prototype.id + '-DynamicFaresGrids',
                                                    id: prototype.id + '-mainContent'
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
