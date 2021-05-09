Ext.define('Ext.Praxis.view.screens.AbnormalValuesForm.tabs.ScrDBIataControl', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-ScrDBIataControl',
    requires: [
          'Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrDBIataControlController'
    ],
    controller: 'ScrDBIataControlController',
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