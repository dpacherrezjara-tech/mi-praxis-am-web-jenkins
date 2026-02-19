// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'UomqReportForm';
prototype.url = CONTEXTPATH+'/UomqReportForm';
prototype.widthContenedor = 1380;
prototype.width = 1350;
prototype.height = 600;
fechaActual = new Date(), mesActual = fechaActual.getMonth(), anioActual = fechaActual.getFullYear();
// </editor-fold>

Ext.define('Ext.Praxis.view.interline.UomqReportForm.UomqReportForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.UomqReportForm',
    requires: [
        'Ext.Praxis.controller.interline.UomqReport.UomqReportController',
        'Ext.Praxis.view.interline.UomqReportForm.Options',
        'Ext.Praxis.view.interline.UomqReportForm.Filters',
        'Ext.Praxis.view.interline.UomqReportForm.Grids.UomqReportGrid'
    ],
    controller: 'UomqReportController',
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