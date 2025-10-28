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
                                    xtype: 'label',
                                    html: '<strong style="color:#000;">Search By: </strong>',
                                    align: 'center'
                                },
                                {xtype: 'tbspacer', width: 8},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cbxFiltro',
                                    name: 'IN_OPTION',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ['', 'All'],
                                            ['1', 'Destination'],
                                            ['2', 'City'],
                                            ['3', 'Country'],
                                            ['4', 'Zone'],
                                            ['5', 'Region'],
                                            ['6', 'Sub Region']
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    selectOnFocus: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: true,
                                    width: 120,
                                    value: '',
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        change: 'onChangeCombo'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Code',
                                    labelWidth: 60,
                                    width: 100,
                                    id: prototype.id + '-txtCode',
                                    name: 'IN_CODE',
                                    maxLength: 3,
                                    enforceMaxLength: true,
                                    listeners: {
                                        specialkey: 'onEnterKeyPress'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Name',
                                    labelWidth: 60,
                                    width: 300,
                                    id: prototype.id + '-txtName',
                                    name: 'IN_NAME',
                                    maxLength: 50,
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

