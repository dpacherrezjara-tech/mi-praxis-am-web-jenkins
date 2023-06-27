Ext.define('Ext.Praxis.view.travelbank.ReconciliationReportForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 2 0 ',
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
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [
                                {
                                    xtype: 'panel',
                                    border: false,
                                    hidden: false,
                                    bodyStyle: 'background: transparent;"',
                                    margin: '3 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '4 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbfiltro',
                                            fieldLabel: 'View by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            //labelWidth: 120,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["1", "Account BT"],
                                                    ["2", "Credit ID"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: true,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 200,
                                            height: 26,
                                            value: "1",
                                            //listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            padding: '2 0',
                                            listeners: {
                                                change: 'onMostrarFiltrosChange'
                                            }
                                        }
                                    ]
                                },
                                // <editor-fold defaultstate="collapsed" desc="Desde/Hasta">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxFechasDesdeHasta',
                                    border: false,
                                    hidden: true,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '3 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '2 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            id: prototype.id + '-Fechas_chk',
                                            checked: false,
                                            padding: '4px 2px 0px 10px',
                                            boxLabel: 'Date Issue',
                                            labelStyle: 'font-weight: bold;',
                                            enableKeyEvents: true,
                                            listeners: {
                                                change: function (obj, newValue, oldValue, eOpts) {
                                                    if (newValue) {
                                                        Ext.getCmp(prototype.id + '-fecha1').setDisabled(false);
                                                        Ext.getCmp(prototype.id + '-fecha2').setDisabled(false);
                                                        Ext.getCmp(prototype.id + '-fecha1').focus();
                                                    } else {
                                                        Ext.getCmp(prototype.id + '-fecha1').setDisabled(true);
                                                        Ext.getCmp(prototype.id + '-fecha2').setDisabled(true);
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-fecha1', disabled: true,
                                            //fieldLabel: 'Date Issue', 
                                            labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            //labelWidth: 125,
                                            width: 80,
                                            height: 26,
                                            format: 'Ymd',
                                            //invalidText: 'Type the date in the format: YYYY/MM/DD',
                                            value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            //padding:'2 2 2 2 ',                                            
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-fecha2').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-fecha2',
                                            fieldLabel: 'To', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 20, disabled: true,
                                            width: 100,
                                            height: 26,
                                            format: 'Ymd', value: new Date(),
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            padding: '2 0 0 2', //10
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-NCTA').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>                                
                                // <editor-fold defaultstate="collapsed" desc="Account Number">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxAccountNumber',
                                    border: false,
                                    hidden: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '3 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '4 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-NCTA',
                                            fieldLabel: 'Account Nbr', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 110,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 16,
                                            width: 270,
                                            height: 26,
                                            maskRe: /[0-9]/,
                                            value: '',
                                            //maskRe:/[1234567890\.]/, NUMERO CON DECIMAL
                                            listeners: {
                                                // keypress: 'onTxtFilterKeypress'
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-MDA').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>                                 
                                // <editor-fold defaultstate="collapsed" desc="Moneda">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxMoneda',
                                    border: false,
                                    hidden: false,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '3 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '4 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-MDA',
                                            fieldLabel: 'Currency', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 80,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 3,
                                            width: 130,
                                            height: 26,
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id + '-CreditID').focus();
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold> 
                                // <editor-fold defaultstate="collapsed" desc="Credit id">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxCreditId',
                                    border: false,
                                    hidden: true,
                                    layout: 'hbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '3 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '4 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-CreditID',
                                            fieldLabel: 'Credit ID', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 70,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 170,
                                            height: 26,
                                            maskRe: /[0-9]/,
                                            listeners: {
                                                keypress: 'onTextKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>  
                                // <editor-fold defaultstate="collapsed" desc="Estado Saldo">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxEstadoSaldo',
                                    border: false,
                                    hidden: false,
                                    layout: 'vbox',
                                    bodyStyle: 'background: transparent;"',
                                    margin: '3 0',
                                    defaults: {
                                        anchor: '100%',
                                        padding: '4 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            id: prototype.id + '-SALDOS_chk',
                                            checked: true,
                                            padding: '0px 0px 0px 10px',
                                            boxLabel: 'Balance greater than 0',
                                            labelStyle: 'font-weight: bold;'
                                        }
//                                        {
//                                            xtype: 'checkboxfield',
//                                            id: prototype.id + '-LIABI_chk',
//                                            checked: false,
//                                            padding: '0px 0px 0px 10px',
//                                            boxLabel: 'Diff. Liability',
//                                            labelStyle: 'font-weight: bold;'
//                                        },
//                                        {
//                                            xtype: 'checkboxfield',
//                                            id: prototype.id + '-PRECON_chk',
//                                            checked: false,
//                                            padding: '0px 0px 0px 10px',
//                                            boxLabel: 'Diff. Pre contabilidad',
//                                            labelStyle: 'font-weight: bold;'
//                                        }
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