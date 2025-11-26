Ext.define('Ext.Praxis.view.payments.BPOControlAnalyticsForm.Filters', {
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
                //<editor-fold defaultstate="collapsed" desc="Filters">
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
                                    xtype: 'combobox',
                                    fieldLabel: 'Search By',
                                    labelStyle: 'text-align: left;font-weight:bold',
                                    id: prototype.id + '-cmbOption',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['1', 'System Date'],
                                            ['2', 'Working Date']
                                        ]
                                    }),
                                    labelWidth: 75,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    name: 'IN_OPTION',
                                    value: '1',
                                    // listeners: {
                                    //     change: 'onChangeFiltersBT'
                                    // }
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'From',
                                    name: 'IN_DATEFROM',
                                    format: 'Ymd',
                                    editable: false,
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date()
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'To',
                                    name: 'IN_DATETO',
                                    format: 'Ymd',
                                    editable: false,
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date()
                                },
                                {
                                    xtype: 'combo',
                                    fieldLabel: 'Auditor',
                                    id: prototype.id + '-txtUser',
                                    labelWidth: 50,
                                    width: 160,
                                    editable: false,
                                    name: 'IN_USER',
                                    valueField: 'A4836USER',        
                                    displayField: 'A4836USER',    
                                    value:'All'
                                },

                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Processor',
                                    id: prototype.id + '-cmbProctypef',
                                    labelWidth: 80,
                                    width: 250,
                                    editable: false,
                                    name: 'IN_PROCESADOR',
                                    valueField: 'A4451KEY2',
                                    displayField: 'A4451DESC1',
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Type',
                                    id: prototype.id + '-cmbType',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['AU', 'User Time Analysis'],  // ANALISIS DE TIEMPO POR USUARIO
                                            ['RP', 'Productivity Ranking'], // RANKING DE PRODUCTIVIDAD
                                            ['RU', 'User Performance'] // RENDIMIENTO POR USUARIO
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 270,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    name: 'IN_TYPE',
                                    value: 'AU'
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


