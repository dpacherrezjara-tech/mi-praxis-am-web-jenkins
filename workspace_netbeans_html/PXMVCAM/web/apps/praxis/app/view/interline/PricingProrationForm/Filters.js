/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.interline.PricingProrationForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '0px 5px 1px 0px',
            layout: 'vbox',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '0px 1px 0px 0px',
                anchor: '100%',
                width: 1070
            },
            items: [
                /**
                 *  Panel 01
                 * */
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id+'-panelFilters1',
                    border: false,
                    //style: 'border-bottom: 2px #ffffff solid;',
                    layout: 'hbox',
                    defaults: {
                        //labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 0px 8px 5px',
                        anchor: '100%'
                    },
                    items: [
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            text: 'Clearing Date',
                            style: 'font-weight:bold;',
                            padding: '10 5 5 5'

                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'combo',
                            id: prototype.id+'-cmbDateFromYear',
                            fieldStyle: 'text-align: center;',
                            disabled: false,
                            editable: false,
                            fieldLabel: 'From',
                            width: 110,
                            labelWidth: 40,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            listConfig: {maxHeight: 111, minWidth: 70},
//                            viewConfig: {
//                                scroll:false,
//                            },
                            maxLength: 4,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id+'-cmbDateFromMonth',
                            fieldStyle: 'text-align: center;',
                            disabled: false,
                            editable: false,
                            fieldLabel: '',
                            width: 60,
                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            maxLength: 3,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id+'-cmbDateToYear',
                            fieldStyle: 'text-align: center;',
                            disabled: false,
                            editable: false,
                            fieldLabel: 'To',
                            width: 100,
                            labelWidth: 30,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            listConfig: {maxHeight: 111, minWidth: 70},
                            maxLength: 4,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id+'-cmbDateToMonth',
                            fieldStyle: 'text-align: center;',
                            disabled: false,
                            editable: false,
                            fieldLabel: '',
                            width: 60,
                            labelWidth: 0,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            maxLength: 3,
                            enforceMaxLength: true
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id+'-cmbStatus',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"], ["P", "Processed"], ["I", "Pending"]
                                ]
                            }),
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            fieldLabel: 'Status',
                            width: 160,
                            value: "",
                            labelWidth: 70,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name',
                            listeners: {
                                keypress: 'onTextKeypress'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id+'-cmbSource',
                            fieldStyle: 'text-align: left;',
                            disabled: false,
                            fieldLabel: 'Source',
                            width: 180,
                            labelWidth: 60,
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'CODSOUR',
                            displayField: 'DESSOU',
                            listConfig: {maxHeight: 111, minWidth: 280}
                        },
                        {xtype: 'tbspacer', width: 15},
                        
                        //proamos
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtGRUPO',
                                    required: true,
                                    disabled: false,
                                    readOnly: false,
                                    fieldLabel: 'Group Number',
                                    width: 150,
                                    labelWidth: 90,
                                    enableKeyEvents: true,
                                    labelAlign: 'right',
                                    enforceMaxLength: true,
                                    maxLength: 6,
                                    maskRe: /[0-9]/,
                                    listeners: {
                                        keypress: 'eventKey'
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    value: 'to',
                                    margin: '0 5 0 5', // espacio entre los campos
                                    style: 'font-weight:bold; text-align:center',
                                    width: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFIN_GRUPO',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 6,
                                    width: 60,
                                    enableKeyEvents: false
                                }
                            ]
                        }

                        

                    ]
                },
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelSearch',
                    border: false,
                    layout: {
                        type: 'hbox',
//                        pack: 'end'
                    },
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 0px 2px 10px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-radiogroup1',
                            fieldLabel: '',
                            horizontal: false,
                            items: [
                                {boxLabel: '<strong style="color:#148D28" >Normal   </strong>', name: 'radiogroup1', inputValue: 'NORMAL', width: 80, checked: true},
                                {boxLabel: '<strong style="color:#148D28" >ISR Group </strong>', name: 'radiogroup1', inputValue: 'ISRGR', width: 100},
                                {boxLabel: '<strong style="color:#148D28" >Pre Closing ISR </strong>', name: 'radiogroup1', inputValue: 'ISR', width: 130},
                                {boxLabel: '<strong style="color:#610B0B" >ISR Closed </strong>', name: 'radiogroup1', inputValue: 'ISRCL', width: 100},
                                {boxLabel: '<strong style="color:#08088A" >ISR Unmatch </strong>', name: 'radiogroup1', inputValue: 'ISRUM', width: 100},

                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'  // esto centra verticalmente los elementos
                                    },
                                    items: [

                                        {xtype: 'tbspacer', width: 15},
                                        {
                                            xtype: 'label',
                                            text: 'Airline:',
                                            width: 40,
                                            margin: '0 5 0 0'
                                        },

                                        {
                                            xtype: 'textfield',
                                            id: prototype.id + '-txtINCIA',
                                            fieldStyle: 'text-align:center',
                                            enforceMaxLength: true,
                                            maskRe: /[0-9]/,
                                            maxLength: 3,
                                            width: 40,
                                            enableKeyEvents: false
                                        }
                                    ]
                                }

                                
                            ],
                            listeners: {change: 'cmbTypeRep_changeHandler' }
                            
                            
                        }
                    ]
                    
                },
            ]
        }
    ]
});



