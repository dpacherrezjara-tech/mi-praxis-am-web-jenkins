Ext.define('Ext.Praxis.view.payments.WorkloadReassignmentForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '3 0',
    layout: 'column',
    items: [
        {
            xtype: 'panel',
            id: prototype.id + '-contFilter',
            margin: '0 7',
            border: false,
            width: 1200,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
//                    padding: '0 0 0 300',
                    bodyStyle: 'background: transparent;"',
                    defaults: {
                        margin: '4 0'
                    },
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: 'Search By:',
                            labelAlign: 'right',
                            id: prototype.id + '-cmbFecFiltro',
                            queryMode: 'local',
                            allowBlank: false,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
//                            width: 150,
                            labelWidth: 65,
                            width: 210,
                            anchor: '100%',
                            value: "CHGDATE",
                            typeAhead: true,
                            valueField: 'code',
                            displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            labelStyle: 'font-weight: bold;',
                            listeners: {
                                change: 'onCmbSearchChange'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'datefield',
                            id: prototype.id + '-txtFilterDateFrom',
                            fieldLabel: 'From',
                            format: 'Y/m/d',
                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                            labelWidth: 40,
                            labelAlign: 'right',
                            width: 130,
                            listeners: {
                                specialkey: 'onSearchkey'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'datefield',
                            id: prototype.id + '-txtFilterDateTo',
                            fieldLabel: 'To',
                            format: 'Y/m/d',
                            maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                            labelWidth: 40,
                            labelAlign: 'right',
                            width: 130,
                            listeners: {
                                specialkey: 'onSearchkey'
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-txtUser',
                            fieldLabel: 'Auditor',
                            queryMode: 'local',
                            displayField: 'A4836USER',
                            valueField: 'A4836USER',
                            width: 200,
                            labelWidth: 50,
                            labelAlign: 'right',
                            emptyText: '',
                            listConfig: {
                                minWidth: 200
                            }
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbProctypeSettl',
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
                            id: prototype.id + '-cmbUser',
                            fieldLabel: 'Auditor',
                            queryMode: 'local',
                            displayField: 'A4836USER',
                            valueField: 'A4836USER',
                            width: 200,
                            labelWidth: 50,
                            labelAlign: 'right',
                            editable: false,
                            hidden: true,
                            emptyText: 'Select', 
                            forceSelection: true,

                            listeners: {
                                change: function (combo, newValue) {
                                    var grid = Ext.getCmp(prototype.id + '-gridDETALLE');
                                    var store = grid.getStore();

                                    // 🔴 SIEMPRE limpia filtros
                                    store.clearFilter(true);
                                    // 🔹 SELECT → muestra todo
                                    if (newValue === 'Select') {
                                        store.loadData(store.getRange(), false); // 🔥 CLAVE
                                        return;
                                    }

                                    // 🔹 Filtra por Auditor
                                    store.filterBy(function (rec) {
                                        return rec.get('AUASI') === newValue;
                                    });
                                }
                            }
                        }

                    ]
                }
            ]
        }
    ]
});
