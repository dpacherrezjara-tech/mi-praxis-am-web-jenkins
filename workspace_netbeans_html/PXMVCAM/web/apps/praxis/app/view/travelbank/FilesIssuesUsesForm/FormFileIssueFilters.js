Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.FormFileIssueFilters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-formFileIssueFilters',
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
                            border: true,
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
                                            fieldLabel: 'Filter by', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            //labelWidth: 120,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "(Select)"],
                                                    ["1", "TRANSMISSION DATE"],
                                                    ["2", "NUMBER IDENTIFIER"],
                                                    ["3", "ACCOUNTING DATE"],
                                                    ["4", "ACCOUNTING PERIOD"],
                                                    ["5", "UNIQUE SERVICE CREDIT ID"]
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
                                            value: "1",
                                            //listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            padding: '4 0',
                                            listeners: {
                                                change: 'onMostrarFiltrosChange'
                                            }
                                        }
                                    ]
                                },
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter01">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxFilter01',
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
                                            id: prototype.id + '-fecha1',
                                            fieldLabel: 'Date from', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            //labelWidth: 125,
                                            width: 200,
                                            height: 26,
                                            format: 'Ymd',
                                            //formatText: '',
                                            //invalidText: 'Type the date in the format: YYYY/MM/DD',
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
                                                        Ext.getCmp(prototype.id + '-fecha2').focus();
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: prototype.id + '-fecha2',
                                            fieldLabel: 'To', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 30,
                                            width: 130,
                                            height: 26,
                                            format: 'Ymd',
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
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter02">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxFilter02',
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
                                            id: prototype.id + '-A4280IDFILE1',
                                            fieldLabel: 'From number ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            width: 215,
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
                                            id: prototype.id + '-A4280IDFILE2',
                                            fieldLabel: 'To', labelAlign: 'right', labelStyle: 'font-weight: bold;',
                                            labelWidth: 30,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            width: 130,
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
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter03">
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-BoxFilter03',
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
                                            id: prototype.id + '-A4281YIDISS',
                                            fieldLabel: 'Nbr. Credit ID ', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            fieldStyle: 'text-align:center;font-weight: bold;font-size:13px;',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 9,
                                            width: 215,
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