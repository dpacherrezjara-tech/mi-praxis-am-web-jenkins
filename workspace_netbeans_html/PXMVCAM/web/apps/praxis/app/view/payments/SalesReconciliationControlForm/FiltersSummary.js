Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.FiltersSummary', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filtersSummary',
    requires: [
        'Ext.Praxis.view.widgets.MonthField'
    ],
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'hbox',
    items: [
        {
            xtype: 'form',
            border: false,
            id: prototype.id + '-filtersSummary-1',
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                fieldStyle: 'text-align: center;',
                padding: '5 5 5 5',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        padding: '5 1 5 1',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Date',
                            name: 'IN_DATE',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['PRDA', 'Processing Date']
                                ]
                            }),
                            labelWidth: 50,
                            width: 180,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: 'PRDA'
                        },
                        {
                            xtype: 'datefield',
                            name: 'IN_DATEFROM',
                            fieldLabel: 'From',
                            format: 'Ymd',
                            editable: false, // Deshabilita la edición del campo
                            labelWidth: 50,
                            width: 150,
                            value: new Date(new Date().getFullYear(), 0, 1),
                            validator: 'validaFecha',
                            listeners: {
                                change: 'onChangeFechaBtn'
                            }
                        },
                        {
                            xtype: 'datefield',
                            name: 'IN_DATETO',
                            fieldLabel: 'To',
                            format: 'Ymd',
                            altFormats: 'm',
                            editable: false, // Deshabilita la edición del campo
                            labelWidth: 30,
                            width: 130,
                            value: new Date(),
                            validator: 'validaFecha',
                            listeners: {
                                change: 'onChangeFechaBtn'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbProctypeSumm',
                            name: 'IN_PROCTYPE',
                            labelWidth: 70,
                            width: 250,
                            valueField: 'a4451key3',
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
                        }
                    ]
                }
            ]
        }
    ]
});
