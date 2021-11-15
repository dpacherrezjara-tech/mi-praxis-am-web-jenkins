prototype.widthContenedor = 1200;   
prototype.widthGrid = '100%';
prototype.id02 = 'CargaRecibosBatch';
prototype.id03 = 'CatalogoClienteRef';
prototype.id04 = 'CargaRecibosRef';
prototype.id05 = 'CargaRecibosDetAplForm';
prototype.id06 = 'CargaRecibosDetRecForm';
prototype.id07 = 'CargaRecibosComplemento';
prototype.id08 = 'CargaRecibosComplementoGridDet';
prototype.id09 = 'CargaRecibosRefManual';

//console.log(prototype.id);

Ext.define('Ext.Praxis.view.eecta.CargaRecibosForm.CargaRecibosForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.CargaRecibosForm',
    requires: [
        'Ext.Praxis.controller.eecta.CargaRecibos.CargaRecibosController',
        'Ext.Praxis.view.eecta.CargaRecibosForm.Options',
        'Ext.Praxis.view.eecta.CargaRecibosForm.Filters'
    ],
    controller: 'CargaRecibosController',
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
                                            height: 550, 
                                            layout: 'fit',
                                            items: [
                                                // <editor-fold defaultstate="collapsed" desc="setGridData">
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-contenedor-grid',
                                                    layout: 'border',
                                                    align: 'center',                                                    
                                                    border: true,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    bodyStyle: 'background: transparent'                                                    
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