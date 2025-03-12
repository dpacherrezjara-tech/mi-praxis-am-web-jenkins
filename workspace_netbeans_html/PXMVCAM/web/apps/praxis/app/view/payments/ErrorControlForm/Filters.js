Ext.define('Ext.Praxis.view.payments.ErrorControlForm.Filters', {
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
            margin: '0 0 0 0 ',
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
                    layout: 'column',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        padding: '5px 1px 5px 1px',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Date',
                            id: prototype.id + '-cmbDate',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['FPROC', 'Processing Date']
                                ]
                            }),
                            labelWidth: 100,
                            width: 230,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: 'FPROC'
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'From',
                            format: 'Ymd',
                            labelWidth: 50,
                            width: 150,
                            id: prototype.id + '-dateFrom',
                            value: new Date(new Date().getFullYear(), 0, 1),
                            validator: 'validaFecha',
                            listeners: {
                                change: 'onChangeFechaBtn'
                            }
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'To',
                            format: 'Ymd',
                            labelWidth: 30,
                            width: 130,
                            id: prototype.id + '-dateTo',
                            value: new Date(),
                            validator: 'validaFecha',
                            listeners: {
                                change: 'onChangeFechaBtn'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.id + '-cmbProcessor',
                            fieldLabel: 'Processor',
                            labelWidth: 70,
                            width: 200,
                            displayField: 'a4451desc1',
                            valueField: 'a4451key2',
                            queryMode: 'local',
                            editable: false,
                            value: ''
                        },
                        {
                            xtype: 'combobox',
                            id: prototype.id + '-cmbError',
                            fieldLabel: 'Error Code',
                            labelWidth: 70,
                            width: 350,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            value: '',
                            listeners: {
                                change: 'onClickSearchBtn'
                            }
                        },
                    ]
                }
            ]
        }
    ]
});
