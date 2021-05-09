Ext.define('Ext.Praxis.view.payments.ClarificationLoadForm.Filters', {
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
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults:  {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
//                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: true,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Bank Code:',
                    id: prototype.id+'-cmbBankCode',           
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 350,
                    labelWidth: 150,
                    hidden: false,
                    hiddenLabel: false
                }
                ,
                {
                    xtype: 'combo',
                    fieldLabel: 'Input',
                    id: prototype.id+'-cmbInput',
                    queryMode: 'local',
                    triggerAction: 'all',
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 150,
                    width: 350,
                    hidden: false,
                    hiddenLabel: false
                }
                ,
//                {
//                    xtype: 'label',
//                    html: '<strong style="color:#000;">Choose File:</strong>',
//                    align: 'right',
//                    hiddenLabel: false,
//                    hidden: false,
//                    selectOnFocus: true,
//                    enableKeyEvents: true,
//                    enforceMaxLength: true,
//                    margin: '5px 0px 0px 100px'
//                }
//                ,
//                {
//                    xtype: 'button',
//                    id: prototype.id + '-btnLoadFile',
//                    buttonText: 'Load',
//                    width: 140,
//                    height: 25,
//                    hidden: false,
//                    margin: '8px 5px 5px 10px',
//                    padding: '2 5 5 5',  
//                    listeners: {
//                         click: 'btnLoad_click'
//                    }
//                 }
                ,
                {
                    xtype: 'panel',
                    layout: 'hbox',
//                    id: prototype.id + '-btnLoadFile',
                    bodyStyle: 'background: transparent',
                    border: false,
                    hidden: false,
                    
                    items:[
                        {
                            xtype: 'filefield',
                            id: prototype.id + '-btnLoadFile',
                            fieldLabel: '<strong style="color:#000;">Choose File</strong>',
                            labelWidth: 80,
                            allowBlank: true,
                            accept: '.xlsx, .xls, .csv',
                            margin: '2 4 2 70',
                            width: 190,
                            listeners:{
                                change: 'btnLoad_click'
                            },
                            regex: /(.)+((\.xlsx)|(\.xls)|(\.csv)(\w)?)$/i,
                            regexText: 'Only CSV, XLS and XLSX formats are accepted',
                            buttonConfig: {
                                text : '<strong>Load</strong>',
                                width: 80,
//                                cls: 'x-btn-upload x-btn-upload-txt',
//                                overCls: 'x-btn-upload-hover x-btn-upload-txt-hover'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});



