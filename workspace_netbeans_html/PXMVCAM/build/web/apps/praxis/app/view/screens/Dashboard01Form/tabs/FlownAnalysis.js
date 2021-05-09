Ext.define('Ext.Praxis.view.screens.Dashboard01Form.tabs.FlownAnalysis', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-FlownAnalysis',
    requires: [
          'Ext.Praxis.controller.screens.Dashboard01.tabs.FlownAnalysisController'
    ],
    controller: 'FlownAnalysisController',
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
            id: prototype.id + '-boxPrincipalIataControl',
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
                    id: prototype.id + '-tabMain333',
                    width: 1300,
                    height: 650,
                    anchor: '100%',
                    margin: '1 1 1 1',
                    autoScroll: true,
                    bodyStyle: 'background: transparent',
                    items: [
                        
                        
                
                
                
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