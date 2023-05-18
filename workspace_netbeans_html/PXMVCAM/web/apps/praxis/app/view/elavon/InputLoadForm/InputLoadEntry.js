/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.elavon.InputLoadForm.InputLoadEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-dataEntry',
    controller: prototype.id + '-dataEntryController',
    requires: [
        'Ext.Praxis.controller.elavon.InputLoad.InputLoadEntryController'
    ],
    title: 'Load File',
    header: true,
    width: 400,
    height: 120,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.id + '-form01',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'filefield',
                    padding: '10 2 2 2',
                    id: prototype.id + '-file',
                    name: 'excelfile',
                    labelAlign: 'right',
                    fieldLabel: '<strong style="font-weight:bold;color:#0B333C;">Input File</strong>',
                    allowBlank: false,
                    accept: '.xlsx, .xls, .txt',
                    labelWidth: 70,
                    width: 340,
                    //buttonText: 'Select logo...',
                    regex: /(.)+((\.xlsx)|(\.txt)(\w)?)$/i,
                    regexText: 'Only XLS,XLSX,TXT formats are accepted',
                    buttonConfig: {
                        text: 'Browse...',
                        width: 75,
                        glyph: 'xf3b6@Ionicons'
                    },
                    listeners: {
                        change: function(fld, value) {
                            var newValue = value.replace(/C:\\fakepath\\/g, '');
                            fld.setRawValue(newValue);
                        }
                    }
                },
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    margin: '2 0 2 7',
                    layout: {
                        pack: 'center'
                    },
                    fieldStyle: 'text-align:center',
                    defaults: {
                        scale: 'medium'
                    },
                    items: [
//                                {
//                                    xtype: 'tbseparator'
//                                },
                        {
                            xtype: 'button',
                            id: prototype.id02 + '-btn-save',
                            text: 'Procesar',
                            icon: 'resources/img/botones/process.png',
                            listeners: {
                                click: 'onSaveClick'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});


