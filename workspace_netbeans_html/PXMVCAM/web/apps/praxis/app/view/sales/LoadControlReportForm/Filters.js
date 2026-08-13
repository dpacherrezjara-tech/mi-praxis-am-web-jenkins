Ext.define('Ext.Praxis.view.sales.LoadControlReportForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '1 0 1 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            width: prototype.widthContenedor,
            border: false,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter',
                    width: '100%',
                    layout: 'vbox',
                    border: false,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            layout: 'vbox',
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                defaults: {
                                    anchor: '100%'
                                }
                            },
                            items: [
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter01">                                
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxFilter01',
                                    border: false,
                                    hidden: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '1 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '1 0'
                                    },
                                    items: [
//                                        {
//                                            xtype: 'combo',
//                                            id: prototype.id + '-cmbfiltro-fechas',
//                                            fieldLabel: 'Filter by', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
//                                            height: 26, fieldStyle: 'text-align:left;font-size:13px;',
//                                            store: new Ext.data.SimpleStore({
//                                                fields: ['code', 'name'],
//                                                data: [
//                                                    ["01", "Issued Date Voucher"],
//                                                    ["02", "System Date"]
//                                                ]
//                                            }),
//                                            queryMode: 'local',
//                                            triggerAction: 'all',
//                                            autoSelect: false,
//                                            forceSelection: true,
//                                            caseSensitive: false,
//                                            editable: true,
//                                            typeAhead: true,
//                                            valueField: 'code', displayField: 'name',
//                                            width: 200,
//                                            //height: 26,
//                                            value: "02",
//                                            listConfig: {maxHeight: 111},
//                                            enableKeyEvents: true,
//                                            padding: '6 0',
//                                            listeners: {
//                                                //focus: function(combo) {
//                                                //    combo.expand();
//                                                //},
//                                                //keypress: 'onTextKeypress',
//                                                //change: 'cmbfiltro_clickHandler'
//                                            }
//                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-fecha01',
                                            fieldLabel: 'Date from:', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 80,
                                            width: 170, height: 26, fieldStyle: 'text-align:center;font-size:13px;',
                                            format: 'Ymd',
                                            value: new Date(),
                                            //minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            //padding:'2 2 2 2 ', 
                                            padding: '6 0',
                                            listeners: {
                                                change: function (obj, e) {
                                                    //Ext.getCmp(prototype.id + '-fecha02').setValue(obj.rawValue);
                                                },
                                                //change: 'CmbDate_clickHandler'
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        // Ext.getCmp(prototype.id + '-fecha02').focus();                                                        
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-FUEN',
                                            fieldLabel: 'Source', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
                                            //fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                            height: 26, fieldStyle: 'text-align:center;font-size:13px;',
                                            enableKeyEvents: true,
                                            padding: '6 0 0 2',
                                            width: 100,
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            //height: 24,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-PAIS',
                                            fieldLabel: 'Country', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                            //fieldStyle: 'text-align:left;font-weight: bold;font-size:13px;',
                                            height: 26, fieldStyle: 'text-align:center;font-size:13px;',
                                            enableKeyEvents: true,
                                            padding: '6 0 0 2',
                                            width: 110,
                                            enforceMaxLength: true,
                                            maxLength: 2,
                                            listeners: {
                                                change: 'onUpperValue',
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                        {
                                           width: 110,
                                           border:false
                                        },
                                        {
                                            xtype: 'checkbox', 
                                            id: prototype.id + '-chk-export-excel',
                                            // hideLabel: true,
                                            boxLabel: 'Export to Excel',
                                            inputValue: '1',
                                            padding: '8 0 8 8',
                                            checked: false,                                            
                                            listeners: {
                                                change: 'onChangeExportToExcel'
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-fecha01-excel',
                                            fieldLabel: 'Date from:', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 80,
                                            width: 170, height: 26, fieldStyle: 'text-align:center;font-size:13px;',
                                            format: 'Ymd', disabled:true,
                                            value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                                            //minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            //padding:'2 2 2 2 ', 
                                            padding: '6 0',
                                            listeners: {
                                                change: function (obj, e) {
                                                    //Ext.getCmp(prototype.id + '-fecha02').setValue(obj.rawValue);
                                                },
                                                //change: 'CmbDate_clickHandler'
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        // Ext.getCmp(prototype.id + '-fecha02').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-fecha02-excel',
                                            fieldLabel: 'to:', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 40,
                                            width: 130, height: 26, fieldStyle: 'text-align:center;font-size:13px;',
                                            format: 'Ymd', disabled:true,
                                            value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                                            //minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            //padding:'2 2 2 2 ', 
                                            padding: '6 0',
                                            listeners: {
                                                change: function (obj, e) {
                                                    //Ext.getCmp(prototype.id + '-fecha02').setValue(obj.rawValue);
                                                },
                                                //change: 'CmbDate_clickHandler'
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        // Ext.getCmp(prototype.id + '-fecha02').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                                // </editor-fold>                                
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});