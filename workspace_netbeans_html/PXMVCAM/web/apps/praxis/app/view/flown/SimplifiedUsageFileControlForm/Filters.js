/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

Ext.define('Ext.Praxis.view.flown.SimplifiedUsageFileControlForm.Filters', {
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
                            border: true,
                            bodyStyle: 'background-color: #E3EAF9;',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbfiltro',
                                    fieldLabel: 'Filter by',
                                    labelAlign: 'right',
                                    labelStyle: 'font-weight: bold;',
                                    labelWidth: 120,
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["1", "File Date"]
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
                                    width: 240,
                                    //height: 26,
                                    value: "1",
                                    // listConfig: {maxHeight: 111},
                                    enableKeyEvents: true,
                                    padding: '6 0',
                                    listeners: {
                                        //focus: function(combo) {
                                        //    combo.expand();
                                        //},
                                        //keypress: 'onTextKeypress',
                                        change: 'cmbfiltro_clickHandler'
                                    }
                                },
                                {xtype: 'tbspacer', width: 10},
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
                                            fieldLabel: 'Date from', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 125,
                                            width: 210,
                                            value: Ext.Date.getFirstDateOfMonth(new Date()),
                                            format: 'Ymd',  
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 8,                                           
                                            listeners: {
                                                change: function(obj){
//                                                    console.log(obj);
                                                    Ext.getCmp(prototype.id + '-fecha2').setValue(obj.rawValue);
                                                },
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
                                            fieldLabel: 'Date to', labelAlign: 'left', 
                                            labelStyle: 'font-weight: bold;', labelWidth: 50,
                                            width: 150,
                                            value: new Date(),
                                            format: 'Ymd',
                                            maxValue: new Date(),
                                            maskRe: /[0-9/]/,
                                            editable: true,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 8,
                                            padding: '2 0 0 10 ',
                                            listeners: {
                                                // change: function(obj){
                                                    // Ext.getCmp(prototype.id + '-fecha2').setValue(obj.rawValue);
                                                //},
                                                keypress: function (obj, e) {
                                                    if (e.getKey() === e.ENTER) {
                                                        
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbfiltroEstado',
                                            fieldLabel: 'Status',
                                            labelAlign: 'right',
                                            labelStyle: 'font-weight: bold;',
                                            labelWidth: 120,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "-Todos-"],
                                                    ["0", "Información Generada"],
                                                    ["1", "Error al generar Información"],
                                                    ["2", "Enviado a SFTP"],
                                                    ["3", "Error en envio hacia SFTP"],
                                                    ["5", "No hay información para enviar"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: true,
                                            typeAhead: true,
                                            valueField: 'code', 
                                            displayField: 'name',
                                            width: 350, 
                                            value: "", 
                                            enableKeyEvents: true,
                                            padding: '6 0',
                                            listeners: {
                                                 change: 'search'
                                            }
                                        }
                                    ]
                                }
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter02">

                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter02">

                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="BoxFilter04">

                                // </editor-fold>
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});