Ext.define('Ext.Praxis.view.sales.OdvCitysForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: transparent',
            height: 'auto',
            margin: '0 0 0 0',
            layout: {
                type: 'hbox',
                align: 'center'
            },
            items: [
                //<editor-fold defaultstate="collapsed" desc="Summary">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-panelFilters',
                    bodyStyle: 'background: transparent',
                    padding: '2px 5px 1px 5px',
                    layout: 'vbox',
                    defaults: {
                        xtype: 'panel',
                        border: false,
                        bodyStyle: 'background: transparent',
                        padding: '2px 5px 1px 5px',
                        layout: 'hbox',
                        defaults: {
                            fieldStyle: 'text-align: center;',
                            padding: '5px 1px 5px 1px',
                            anchor: '100%',
                            hiddenLabel: false,
                            labelAlign: 'right',
                            hidden: false
                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'IN_CCUST',
                                    hidden: true,
                                    value: '139'
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Destination Code', //
                                    labelWidth: 100,
                                    width: 200,
                                    name: 'IN_CATTO',
                                    maxLength: 3, 
//                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true, 
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'City Code', //
                                    labelWidth: 60,
                                    width: 160,
                                    name: 'IN_CCITY',
                                    maxLength: 3, 
//                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true, 
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Country Code',
                                    name: 'IN_PAIS',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['EG', 'ADM'],
                                            ['J', 'Adjustment']
                                        ]
                                    }),
                                    labelWidth: 100,
                                    width: 260,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Zone', //
                                    labelWidth: 60,
                                    width: 160,
                                    name: 'IN_ZONE',
                                    maxLength: 3, 
//                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true, 
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Region', //
                                    labelWidth: 60,
                                    width: 160,
                                    name: 'IN_CREGI',
                                    maxLength: 3, 
//                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true, 
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                
                            ]
                        }
                    ]
                },
                        //</editor-fold>
            ]
        }
    ]
});

