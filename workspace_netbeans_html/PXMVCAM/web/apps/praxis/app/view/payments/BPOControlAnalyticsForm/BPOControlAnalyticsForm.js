// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'BPOControlAnalyticsForm';
prototype.width = 1800;
// </editor-fold>

Ext.define('Ext.Praxis.view.payments.BPOControlAnalyticsForm.BPOControlAnalyticsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.BPOControlAnalyticsForm',
    requires: [
        'Ext.Praxis.controller.payments.BPOControlAnalytics.BPOControlAnalyticsController',
        'Ext.Praxis.view.payments.BPOControlAnalyticsForm.Options',
        'Ext.Praxis.view.payments.BPOControlAnalyticsForm.Filters',
        // 'Ext.Praxis.view.payments.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsGrid'
        'Ext.Praxis.view.payments.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsAnalisisGrid',
        'Ext.Praxis.view.payments.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsRankingGrid',
        'Ext.Praxis.view.payments.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsRendimientoGrid',
        'Ext.Praxis.view.payments.BPOControlAnalyticsForm.Graphics.GraphicsRanking'
    ],
    controller: 'BPOControlAnalyticsController',
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
                                        align: 'stretch'
                                    },
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: prototype.width,
                                        align: 'stretch'
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
                                        },
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-legend',
                                            bodyStyle: 'background-color: #E3EAF9;',
                                            height: 630,
                                            layout: {
                                                type: 'vbox',
                                                align: 'center'
                                            },
                                            items: [
                                            ]
                                        },
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