prototype.id = 'ArithmeticValidationForm';
prototype.url = CONTEXTPATH + '/ArithmeticValidation';
prototype.width = 1750;
prototype.height = 650;
//fechaActual = new Date(),mesActual = fechaActual.getMonth(),anioActual = fechaActual.getFullYear();

Ext.define('Ext.Praxis.view.invoice.ArithmeticValidationForm.ArithmeticValidationForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ArithmeticValidationForm',
    requires: [
        'Ext.Praxis.controller.invoice.ArithmeticValidation.ArithmeticValidationController',
        'Ext.Praxis.view.invoice.ArithmeticValidationForm.Options',
        'Ext.Praxis.view.invoice.ArithmeticValidationForm.Filters',
        'Ext.Praxis.view.invoice.ArithmeticValidationForm.Grids.MainGrid'
    ],
    controller: 'ArithmeticValidationController',
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
                            width: prototype.width,
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
                                        width: prototype.width,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        },
                                        {
                                            id: prototype.id + '-contentFilter',
                                            xtype: 'panel',
                                            border: false,
                                            defaults: {
                                                width: prototype.width,
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: prototype.id + '-filters'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: prototype.id + '-MainGrid',
                                            bodyStyle: 'background-color: #E3EAF9;'
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




