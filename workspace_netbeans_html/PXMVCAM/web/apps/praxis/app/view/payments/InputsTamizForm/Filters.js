Ext.define('Ext.Praxis.view.payments.InputsTamizForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'vbox',
    items: [
        {
            id: prototype.id + '-Filters3_1',
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
//                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                hidden: false
            },
            items: [
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Processing Date </strong>',
                    align: 'left',
                    fieldStyle: 'text-align: left;',
                    padding: '8px 7px 0px 10px',
                    hidden: false
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    fieldLabel: 'From',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 60,
                    width: 150,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromMonth',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%',
                    listeners: {
                        change: 'cbxDateFromMonth_Change'
                    }
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromDay',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%',
                    listeners: {
                        change: 'cbxDateFromMonth_Day'
                    }
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToYear',
                    fieldLabel: 'To',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 60,
                    width: 150,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToMonth',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToDay',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%'
                }
            ]
        },
        {
            id: prototype.id + '-Filters3_2',
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '5 10 5 10',
            layout: 'column',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false
            },
            items: [
                
                {
                    xtype: 'combo',
                    fieldLabel: 'Group By',
                    id: prototype.id + '-cmbVISTA',
                    triggerAction: 'all',
                    enableKeyEvents: true,
                    caseSensitive: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    width: 170,
                    labelWidth: 70,
                    fieldStyle: 'text-align: left;',
                    hidden: false
//                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Source',
                    id: prototype.id + '-cmbSourceCalendar',
                    enableKeyEvents: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'A051KEY2',
                    displayField: 'A051DESCR1',
                    labelWidth: 50,
                    width: 250,
                    margin: '0px 0px 0px 20px',
                    hidden: true,
                    fieldStyle: 'text-align: left;',
                    queryMode: 'local',
                    triggerAction: 'all'
                },
                {
                    xtype: 'combo',
                    fieldLabel: '<strong style="font-size:13px;">File Type</strong>',
                    id: prototype.id + '-cmbFileType',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    //autocomplete: true,
                    allowBlank: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'code',
                    displayField: 'name',
                    width: 250,
                    labelWidth: 120,
                    hidden: true,
                    hiddenLabel: false,
                    store: Ext.create('Ext.data.Store', {
                        data: [
                            {code: 'P', name: 'Processors'},
                            {code: 'C', name: 'Complements'}
                        ]
                    }),
                    value:'P',
                    listeners:{
                        change:'onChangeFileType'
                    }
                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Source',
                    id: prototype.id + '-cmbFUENTE-det-PROC',
                    enableKeyEvents: true,
                    readOnly: false,
                    editable: false,
                    valueField: 'A051KEY2',
                    displayField: 'A051DESCR1',
                    labelWidth: 50,
                    width: 250,
                    margin: '0px 0px 0px 20px',
                    hidden: true,
                    fieldStyle: 'text-align: left;',
                    //emptyText: 'All',
                    queryMode: 'local',
                    triggerAction: 'all',
                    listeners: {
                        select: 'onClickSearchBtn'
                    }
                },
                {
                    xtype: 'button',
                    text: 'Days Receipt',
                    margin: '0px 0px 0px 20px',
                    padding: '3px 5px',
                    hidden: true,
                    id: prototype.id + '-btnDaysReceiptSettlement',
                    iconCls: 'prx-icon-query',
                    tooltip: 'Days Receipt of Settlement',
                    listeners: {
                        click: 'onClickViewDaysReceiptSettlement'
                    }
                }
            ]
        }

    ]
});
