Ext.define('Ext.Praxis.view.payments.AccountStatementSummForm.Filters', {
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
                                    hidden:true,
                                    value:'139'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Search By',
                                    name: 'IN_TDATE',
                                    id: prototype.id + '-cmbDate',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['1', 'Sale Date'],
                                            ['2', 'Processing Date'],
                                            ['3', 'File Date']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 210,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: '1'
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Date',
                                    name: 'IN_TDATE',
                                    id: prototype.id + '-cmbDate',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['1', 'Sale Date'],
                                            ['2', 'Processing Date'],
                                            ['3', 'File Date']
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: '1'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_DATE',
                                    format: 'Ymd',
                                    editable: false,
                                    width: 100,
                                    value: new Date()
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Source',
                                    name: 'IN_FUENT',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['ASR', 'ASR'],
                                            ['BSP', 'BSP'],
                                            ['ARC', 'ARC'],
                                            ['MAN', 'MAN']
                                        ]
                                    }),
                                    labelWidth: 50,
                                    width: 120,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Sub-Source',
                                    name: 'IN_SFUEN',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['CCT', 'CCT'],
                                            ['FRA', 'FRA'],
                                            ['CTO', 'CTO'],
                                            ['ATO', 'ATO']
                                        ]
                                    }),
                                    labelWidth: 80,
                                    width: 150,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbPaises',
                                    name: 'IN_PAIS',
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    fieldLabel: 'Country',
                                    labelWidth: 65,
                                    labelAlign: 'right',
                                    width: 230,
                                    typeAhead: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'IN_IDCON',
                                    fieldStyle: 'text-align:left',
                                    fieldLabel: 'Accounting ID',
                                    labelStyle:'font-weight:bold;text-align:right;',
                                    labelWidth: 100,
                                    width: 390,
                                    enableKeyEvents: true,
                                    listeners:{
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
