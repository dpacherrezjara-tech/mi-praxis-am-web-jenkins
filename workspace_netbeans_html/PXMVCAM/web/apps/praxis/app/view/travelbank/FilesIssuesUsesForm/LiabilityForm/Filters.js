Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.LiabilityForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id19 + '-filters',
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
                    id: prototype.id19 + '-boxSearchFilter',
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
                                            id: prototype.id19 + '-cmbfiltro',
                                            fieldLabel: 'Filter by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            //labelWidth: 120,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "(Select)"],
                                                    ["1", "Unique Service Credit ID"],
                                                    ["2", "Account Number"],
                                                    ["3", "Transmission Date"],                                                    
                                                    ["4", "Number Identifier"]
//                                                    ["5", "Accounting date"],
//                                                    ["6", "Accounting Period"]
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
                                            width: 300,
                                            height: 26,
                                            value: "3",
                                            //listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            padding: '4 0',
                                            listeners: {
                                                change: 'onMostrarFiltrosChange'
                                            }
                                        }
                                    ]
                                },
                                // <editor-fold defaultstate="collapsed" desc="Unique Service Credit ID">
                                {
                                    xtype: 'panel',
                                    id: prototype.id19 + '-BoxUniqueServiceCreditID',
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
                                            id: prototype.id19 + '-A4357IDMER',
                                            fieldLabel: 'Credit ID', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength:10,
                                            width: 220,
                                            height: 26,
                                            maskRe: /[0-9]/,
                                            value: '',
                                            //maskRe:/[1234567890\.]/, NUMERO CON DECIMAL
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>  
                                // <editor-fold defaultstate="collapsed" desc="Account Number">
                                {
                                    xtype: 'panel',
                                    id: prototype.id19 + '-BoxAccountNumber',
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
                                            id: prototype.id19 + '-A4357NCTAT',
                                            fieldLabel: 'Account Number', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 20,
                                            width: 280,
                                            height: 26,
                                            maskRe: /[0-9]/,
                                            value: '',
                                            //maskRe:/[1234567890\.]/, NUMERO CON DECIMAL
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>                                 
                                // <editor-fold defaultstate="collapsed" desc="Desde/Hasta">
                                {
                                    xtype: 'panel',
                                    id: prototype.id19 + '-BoxFechasDesdeHasta',
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
                                            xtype: 'datefield',
                                            id: prototype.id19 + '-fecha1',
                                            fieldLabel: 'Date from', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            //labelWidth: 125,
                                            width: 200,
                                            height: 26,
                                            format: 'Ymd',
                                            //formatText: '',
                                            //invalidText: 'Type the date in the format: YYYY/MM/DD',
                                            value: '20221001',
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            //padding:'2 2 2 2 ',                                            
                                            listeners: {
                                                //change: 'onUpperValue',
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        Ext.getCmp(prototype.id19 + '-fecha2').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id19 + '-fecha2',
                                            fieldLabel: 'To', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 30,
                                            width: 130,
                                            height: 26,
                                            format: 'Ymd', value: new Date(),
                                            minValue: new Date(1990, 00, 01),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            padding: '2 0 0 10 ',
                                            listeners: {
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {

                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                // </editor-fold>                                                               
                                // <editor-fold defaultstate="collapsed" desc="NBR IDENTIFIER">
                                {
                                    xtype: 'panel',
                                    id: prototype.id19 + '-BoxNbrIDENTIFIER',
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
                                            id: prototype.id19 + '-A4357IDFIL1',
                                            fieldLabel: 'Nbr Identifier from ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 140,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            width: 230,
                                            height: 26,
                                            maskRe: /[0-9]/,
                                            value: '',
                                            //maskRe:/[1234567890\.]/, NUMERO CON DECIMAL
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: prototype.id19 + '-A4357IDFIL2',
                                            fieldLabel: 'To', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 30,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            width: 145,
                                            height: 26,
                                            maskRe: /[0-9]/,
                                            value: '',
                                            //maskRe:/[1234567890\.]/, NUMERO CON DECIMAL
                                            listeners: {
                                                keypress: 'onTxtFilterKeypress'
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