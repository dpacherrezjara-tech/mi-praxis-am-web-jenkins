prototype.id = 'BankEmissorCatalogForm';
prototype.url = CONTEXTPATH + '/BankEmissorCatalog';
prototype.width = 1850;
prototype.height = 630;
fechaActual = new Date(),mesActual = fechaActual.getMonth(),anioActual = fechaActual.getFullYear();

Ext.define('Ext.Praxis.view.payments.BankEmissorCatalogForm.BankEmissorCatalogForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.BankEmissorCatalogForm',
    requires: [
        'Ext.Praxis.controller.payments.BankEmissorCatalog.BankEmissorCatalogController',
        'Ext.Praxis.view.payments.BankEmissorCatalogForm.Options',
        'Ext.Praxis.view.payments.BankEmissorCatalogForm.Filters',
        'Ext.Praxis.view.payments.BankEmissorCatalogForm.Grids.BanksGrid'
        //'Ext.Praxis.view.payments.BankEmissorCatalogForm.DataEntrys.BankMaintenanceDataEntry'
    ],
    controller: 'BankEmissorCatalogController',
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
                                            xtype: 'panel',
                                            id: prototype.id + '-mainContent',
                                            height: prototype.height,
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
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
});




