/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
prototype.widthContenedor = 1100;
prototype.widthGrid = '100%';
prototype.id = 'SimplifiedUsageFileControlForm'; 
prototype.id01 = 'SimplifiedUsageFileControlDetailError'; 
 

Ext.define('Ext.Praxis.view.flown.SimplifiedUsageFileControlForm.SimplifiedUsageFileControlForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.SimplifiedUsageFileControlForm',
    requires: [
        'Ext.Praxis.controller.flown.SimplifiedUsageFileControl.SimplifiedUsageFileControlController',
        'Ext.Praxis.view.flown.SimplifiedUsageFileControlForm.Options',
        'Ext.Praxis.view.flown.SimplifiedUsageFileControlForm.Filters',
        'Ext.Praxis.view.flown.SimplifiedUsageFileControlForm.Info'
    ],
    controller: 'SimplifiedUsageFileControlController',
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
                                            height: 400,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-contenedor-grid',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: true,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    bodyStyle: 'background: transparent',
                                                    items: [
                                                        {
                                                            xtype: prototype.id + '-info' 
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
