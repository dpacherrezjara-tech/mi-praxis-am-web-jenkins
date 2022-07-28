Ext.define('Ext.Praxis.view.screens.AbnormalValuesForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    requires: [
          'Ext.Praxis.view.screens.AbnormalValuesForm.tabs.ScrAVSales',
          'Ext.Praxis.view.screens.AbnormalValuesForm.tabs.ScrDBIataControl',
          'Ext.Praxis.view.screens.AbnormalValuesForm.tabs.ScrDifferenceFare'
    ],
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipal',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                
                {
                    xtype: 'tabpanel',
                    id: prototype.id + '-tabMain',
                    deferredRender: true,
                    width: 1700,
                    height: 650,
                    anchor: '100%',
                    margin: '1 1 1 1',
                    autoScroll: true,
                    bodyStyle: 'background: transparent', 
                    listeners: {
                        'tabchange': function (tabPanel, tab) {
                            console.log(tabPanel.id + ' ' + tab.id);
                            me.changeTab_clickHandler(tab.id);

                        }
                    },
//                    activeTab: 0,     ///  ------- here is something what you looking for
                    items: [
                        
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-ScrAVSales_tab',
                            title: 'Sales Analysis',
//                            layout: {
//                                type: 'vbox',
//                                align: 'center'
//                            },
//                            margin: '10 10 10 10',
//                            defaults: {
//                                labelAlign: 'left'
//                            },
                            items: [
                                {
                                    id: prototype.id+ '-ScrAVSales_screen',
                                    xtype:prototype.id + '-ScrAVSales'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-ScrDBIataControl_tab',
                            title: 'Sales Agent Control',
                            /*layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            margin: '10 10 10 10',
                            defaults: {
                                labelAlign: 'left'
                            },*/
                            items: [
                                {                                    
                                    id: prototype.id+ '-ScrDBIataControl_screen',
                                    xtype:prototype.id + '-ScrDBIataControl'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-tabScrAVCreditCard',
                            title: 'Credit Card Analysis',
                            /*layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            margin: '10 10 10 10',
                            defaults: {
                                labelAlign: 'left'
                            },*/
                            items: [
                                {
//                                    xtype:prototype.id + '-ScrDBIataControl'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-tabScrExchange',
                            title: 'Exchange Analysis',
                            items: [
                                {
//                                    xtype:prototype.id + '-ScrDBIataControl'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-tabScrRefund',
                            title: 'Refund Analysis',
                            /*layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            margin: '10 10 10 10',
                            defaults: {
                                labelAlign: 'left'
                            },*/
                            items: [
                                {
//                                    xtype:prototype.id + '-ScrDBIataControl'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-tabScrOALParticipation',
                            title: 'Participation OAL',
                            /*layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            margin: '10 10 10 10',
                            defaults: {
                                labelAlign: 'left'
                            },*/
                            items: [
                                {
//                                    xtype:prototype.id + '-ScrDBIataControl'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyStyle: 'background: transparent',
                            id: prototype.id + '-ScrDifferenceFare_tab',
                            title: 'Analysis of Differences by Exchange Rate',
                            items: [
                                {
                                    id: prototype.id+ '-ScrDifferenceFare_screen',
                                    xtype:prototype.id + '-ScrDifferenceFare'
                                }
                            ]
                        }    
                
                    ]
                }
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
});