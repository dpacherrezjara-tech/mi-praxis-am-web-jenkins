Ext.define('Ext.Praxis.view.payments.PaymentAnalyticsForm.Filters', {
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
                //<editor-fold defaultstate="collapsed" desc="filters">
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
                                    xtype: 'datefield',
                                    fieldLabel: 'From',
                                    name: 'IN_PRDA_FROM',
                                    format: 'Ymd',
                                    editable: false,
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date()
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'To',
                                    name: 'IN_PRDA_TO',
                                    format: 'Ymd',
                                    editable: false,
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date()
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbProctypeSettl2',
                                    name: 'IN_PROCTYPESQ',
                                    labelWidth: 70,
                                    width: 250,
                                    valueField: 'a4451key2',
                                    displayField: 'a4451desc1',
                                    fieldLabel: 'Processor',
                                    queryMode: 'local',
                                    editable: false,
                                    allowBlank: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    labelAlign: 'right',
                                    typeAhead: true,
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbMonedabST2',
                                    name: 'IN_SCURRENCY',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Currency',
                                    labelWidth: 70,
                                    labelAlign: 'right',
                                    width: 140,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                }
                            ]
                        }
                    ]
                },
                //</editor-fold>
            ]
        }
    ]
});

