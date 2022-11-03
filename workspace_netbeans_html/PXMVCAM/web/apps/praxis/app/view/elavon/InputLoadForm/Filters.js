/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

Ext.define('Ext.Praxis.view.elavon.InputLoadForm.Filters', {
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
                    layout: 'hbox',
                    border: true,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '70%',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [
                                {
                                    xtype: 'panel',
                                    //width: '100%',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbfiltro',
                                            fieldLabel: 'Search by', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    //["1", "System Date"],
                                                    ["2", "Processing Date"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: false,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 240,
                                            height: 26,
                                            value: "2",
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            padding: '6 0',
                                            listeners: {
                                                change: 'cmbfiltro_clickHandler'
                                            }
                                        },
                                        //{xtype: 'tbspacer', width: 2},
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
                                                    fieldLabel: 'From', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
                                                    width: 128,
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
                                                    fieldLabel: 'To', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 38,
                                                    width: 128,
                                                    height: 26,
                                                    format: 'Ymd',
                                                    minValue: new Date(1990, 00, 01),
                                                    maskRe: /[0-9/]/,
                                                    editable: true,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    //padding: '2 0 0 10 ',
                                                    listeners: {
                                                        keypress: function (obj, e) {
                                                            if (e.getKey() === e.ENTER) {

                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'radiogroup',
                                                    id:prototype.id + '-formatFile',
                                                    fieldLabel: "Change Format", labelStyle: 'font-weight: bold;', labelWidth: 97,
                                                    layout: 'hbox',
                                                    //flex: 1,
                                                    margin: '5 0 0 15',
                                                    defaults: {
                                                        margin: '0 5 0 5'
                                                    },
//                                                    listeners: {
//                                                        change: function (rg, value) {
//                                                            console.log(value);
//                                                        }
//                                                    },
                                                    items: [
                                                        {
                                                            xtype: "radio",
                                                            width:65,
                                                            align:'center',
                                                            boxLabel: '<div style="display: flex;justify-content: center;align-items:center;">Excel <img style="margin-left:3px;"  src="resources/img/icon/excel.png"/></div>',
                                                            inputValue: 'xlsx'
                                                        }, {
                                                            xtype: "radio",
                                                            width:95,
                                                            boxLabel: '<div style="display: flex;justify-content: center;align-items:center;">Plain Text <img style="margin-left:2px;"  src="resources/img/icon/file.png"/></div>',
                                                            inputValue: 'txt',
                                                            checked: true
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: '30%',
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            border: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [
                                {
                                    xtype: 'progressbar',
                                    id: prototype.id + '-progressBar',
                                    width: 128,
                                    height: 26,
                                    margin: '5 8 5 8 ',
                                    padding: '4 2 4 2',
                                    hidden: true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
