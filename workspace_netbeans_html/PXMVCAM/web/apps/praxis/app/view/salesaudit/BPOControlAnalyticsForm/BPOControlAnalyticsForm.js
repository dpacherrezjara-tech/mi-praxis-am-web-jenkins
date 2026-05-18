// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'BPOControlAnalyticsForm';
prototype.width = 1800;
// </editor-fold>

Ext.define('Ext.Praxis.view.salesaudit.BPOControlAnalyticsForm.BPOControlAnalyticsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.BPOControlAnalyticsForm',
    requires: [
        'Ext.Praxis.controller.salesaudit.BPOControlAnalytics.BPOControlAnalyticsController',
        'Ext.Praxis.view.salesaudit.BPOControlAnalyticsForm.Options',
        'Ext.Praxis.view.salesaudit.BPOControlAnalyticsForm.Filters',
        // 'Ext.Praxis.view.salesaudit.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsGrid'
        'Ext.Praxis.view.salesaudit.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsAnalisisGrid',
        'Ext.Praxis.view.salesaudit.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsRankingGrid',
        'Ext.Praxis.view.salesaudit.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsRendimientoGrid',
        'Ext.Praxis.view.salesaudit.BPOControlAnalyticsForm.Graphics.GraphicsRanking'
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