// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'OdvCitysForm';
prototype.width = 1800;
// </editor-fold>

Ext.define('Ext.Praxis.view.sales.OdvCitysForm.OdvCitysForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.OdvCitysForm',
    requires: [
        'Ext.Praxis.controller.sales.OdvCitys.OdvCitysController',
        'Ext.Praxis.view.sales.OdvCitysForm.Options',
        'Ext.Praxis.view.sales.OdvCitysForm.Filters',
        'Ext.Praxis.view.sales.OdvCitysForm.Grids.OdvCitysFormGrid'
    ],
    controller: 'OdvCitysController',
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
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-mainContent',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            height: 630,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [
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