/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
prototype.widthContenedor = 1300;
prototype.widthGrid = '100%';
prototype.id01 = 'LoadControlReport';

Ext.define('Ext.Praxis.view.sales.LoadControlReportForm.LoadControlReportForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.LoadControlReportForm',
    requires: [
        'Ext.Praxis.controller.sales.LoadControlReport.LoadControlReportController',
        'Ext.Praxis.view.sales.LoadControlReportForm.Options',
        'Ext.Praxis.view.sales.LoadControlReportForm.Filters',
        'Ext.Praxis.view.sales.LoadControlReportForm.Info'
    ],
    controller: 'LoadControlReportController',
    id: prototype.id + '-ContenedorMain',
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
                    defaults: {
                        border: false,
                        autoScroll: true
                    },
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
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
                                        width: prototype.widthContenedor,
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
                                            id: prototype.id + '-panel-contenedor-grid',
                                            height: 600,
                                            layout: 'fit',
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="setGridData">
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-contenedor-grid',
                                                    align: 'center',
                                                    layout: 'hbox',
                                                    border: true,
                                                    bodyStyle: 'background: transparent',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            border: true,
                                                            width: '100%',
                                                            padding: '1 1 1 1',
                                                            layout: 'vbox',
                                                            items: [
                                                                {
                                                                    xtype: prototype.id + '-info'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                                // </editor-fold>                                                 
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


