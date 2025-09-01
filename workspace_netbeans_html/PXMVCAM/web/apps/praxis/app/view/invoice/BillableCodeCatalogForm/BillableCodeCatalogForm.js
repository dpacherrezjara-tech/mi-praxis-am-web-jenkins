prototype.id = 'BillableCodeCatalogForm';
prototype.url = CONTEXTPATH + '/BillableCodeCatalog';
prototype.width = 1650;
prototype.height = 630;
//fechaActual = new Date(),mesActual = fechaActual.getMonth(),anioActual = fechaActual.getFullYear();

Ext.define('Ext.Praxis.view.invoice.BillableCodeCatalogForm.BillableCodeCatalogForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.BillableCodeCatalogForm',
    requires: [
        'Ext.Praxis.controller.invoice.BillableCodeCatalog.BillableCodeCatalogController',
        'Ext.Praxis.view.invoice.BillableCodeCatalogForm.Options',
        'Ext.Praxis.view.invoice.BillableCodeCatalogForm.Filters',
        'Ext.Praxis.view.invoice.BillableCodeCatalogForm.Grids.MainGrid',
        //'Ext.Praxis.view.invoice.BillableCodeCatalogForm.DataEntrys.MaintenanceDataEntry'
    ],
    controller: 'BillableCodeCatalogController',
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




