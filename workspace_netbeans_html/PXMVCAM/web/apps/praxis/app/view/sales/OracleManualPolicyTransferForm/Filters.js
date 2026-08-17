Ext.define('Ext.Praxis.view.sales.OracleManualPolicyTransferForm.Filters', {
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
                type: 'vbox',
                align: 'center'
            },
            items: [
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
                                    value: '139',
                                    hidden: true
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-dateFprocFrom',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: false,
                                    labelWidth: 50,
                                    width: 150,
                                    name: 'IN_FPROC_FROM',
                                    value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                                    listeners: {
                                        change: 'onChangeFechaBtn'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    id: prototype.id + '-dateFprocTo',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    editable: false,
                                    labelWidth: 30,
                                    width: 130,
                                    name: 'IN_FPROC_TO',
                                    value: new Date(),
                                    listeners: {
                                        change: 'onChangeFechaBtn'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbModule',
                                    name: 'IN_MODULE',
                                    fieldLabel: 'Module',
                                    labelWidth: 60,
                                    width: 250,
                                    displayField: 'NAME',
                                    valueField: 'CODE',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    id: prototype.id + '-cmbStatus',
                                    name: 'IN_STATUS',
                                    fieldLabel: 'Status',
                                    labelWidth: 60,
                                    width: 180,
                                    displayField: 'NAME',
                                    valueField: 'CODE',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
