Ext.define('Ext.Praxis.view.flown.EmdsSabreForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'hbox',
    items: [
        {
            xtype: 'combobox',
            fieldLabel: 'Search By',
            margin: '10 10 10 10',
            labelStyle: 'text-align: left;font-weight:bold',
            id: prototype.id + '-cmbFilters',
            store: Ext.create('Ext.data.SimpleStore', {
                fields: ['code', 'name'],
                data: [
                    ['S', 'Summary'],
                    ['F', 'Browser']
                ]
            }),
            labelWidth: 75,
            width: 180,
            displayField: 'name',
            valueField: 'code',
            queryMode: 'local',
            editable: false,
            hidden: true,
            readOnly: true,
            value: 'S',
            listeners: {
                change: 'onChangeFilters'
            }
        },
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
                //<editor-fold defaultstate="collapsed" desc="Summary">
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-formFiltersS',
                    bodyStyle: 'background: transparent',
                    margin: '0 0 0 10',
                    layout: 'vbox',
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
                                    fieldLabel: 'Search By',
                                    name: 'IN_TDATE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ["FPROC", "Processing Date"]
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    readOnly: true,
                                    value: 'FPROC'
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_FPROCF',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
//                                    value: new Date(),
                                    value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_FPROCT',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    altFormats: 'm',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date(),
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    name: 'IN_STVAL',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"],
                                            ["1", "Used"],
                                            ["3", "No Used"],
                                            ["4", "Processed"]
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Origin',
                                    name: 'IN_FTE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['S', 'ASR'],
                                            ['A', 'ARC'],
                                            ['B', 'BSP']
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 130,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Pax Type',
                                    name: 'IN_TPAX',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"],
                                            ["A", "ADT"],
                                            ["C", "CHD"],
                                            ["I", "INF"]
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 160,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Ticket Number',
                                    labelWidth: 110,
                                    width: 230,
                                    name: 'IN_TICKET',
                                    maxLength: 13, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }
                            ]
                        }

                    ]
                },
                //</editor-fold>
                //<editor-fold defaultstate="collapsed" desc="Browser">
                {
                    xtype: 'form',
                    border: false,
                    hidden: true,
                    id: prototype.id + '-formFiltersB',
                    bodyStyle: 'background: transparent',
                    margin: '0 0 0 10',
                    layout: 'vbox',
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
                                    xtype: 'datefield',
                                    name: 'IN_FPROCF',
                                    fieldLabel: 'From',
                                    format: 'Ymd',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date(),
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'datefield',
                                    name: 'IN_FPROCT',
                                    fieldLabel: 'To',
                                    format: 'Ymd',
                                    altFormats: 'm',
                                    editable: true, // Deshabilita la edición del campo
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date(),
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Status',
                                    name: 'IN_STVAL',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"],
                                            ["1", "Used"],
                                            ["3", "No Used"],
                                            ["4", "Processed"]
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 180,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Origin',
                                    name: 'IN_FTE',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['S', 'ASR'],
                                            ['A', 'ARC'],
                                            ['B', 'BSP'],
                                            ['C', 'CTN']
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 130,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Pax Type',
                                    name: 'IN_TPAX',
                                    store: Ext.create('Ext.data.SimpleStore', {
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"],
                                            ["AD", "ADT"],
                                            ["CH", "CHD"],
                                            ["IN", "INF"]
                                        ]
                                    }),
                                    labelWidth: 60,
                                    width: 160,
                                    displayField: 'name',
                                    valueField: 'code',
                                    queryMode: 'local',
                                    editable: false,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Ticket Number',
                                    labelWidth: 110,
                                    width: 230,
                                    name: 'IN_TICKET',
                                    maxLength: 13, // Límite máximo de caracteres
                                    maskRe: /[0-9]/, // Expresión regular para permitir solo números
                                    enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                }
                            ]
                        }

                    ]
                }
                //</editor-fold>
            ]
        }
    ]
});
