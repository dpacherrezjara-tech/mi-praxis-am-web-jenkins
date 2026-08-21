Ext.define('Ext.Praxis.view.payments.MerchantNumberForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryMerchantNumberForm',
    requires:[
        'Ext.Praxis.controller.payments.MerchantNumber.DataEntryMerchantNumberController'
    ],
    controller: 'DataEntryMerchantNumberController',
    title:'Merchant Number - Data Entry Form',
    header:true,
    height:430,
    width:765,
    resizable:false,
    layout:'fit',
    modal:true,
    border: false,
    defaults: {
        border: false
    },
    items:[
        {
            xtype: 'form',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width:930,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '4 2 4 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Merchant Nbr.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 130
                                },
                                {
                                    xtype: 'label',
                                    text: '(*)',
                                    style: 'font-weight:bold;color:red;',
                                    width: 20,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Mandatory Field'
                                    }
                                },
                                { xtype: 'tbspacer', width: 5 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtMERCHN',
                                    fieldStyle: 'text-align:left',
                                    enforceMaxLength: true,
                                    editable: true,
                                    enabled: false,
                                    maxLength: 20,
                                    maskRe: /[0-9]/,
                                    readOnly: false,
                                    width: 290
                                },
                                { xtype: 'tbspacer', width: 40 },
                                {
                                    xtype: 'label',
                                    text: 'Canal: ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 50
                                },
                                { xtype: 'tbspacer', width: 5 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtCANAL',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    maxLength: 3,
                                    width: 60,
                                    maskRe: /[a-zA-Z]/,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                                ,
                                { xtype: 'tbspacer', width: 105 }
                            ]
                        }, 
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
//                            bodyStyle: 'background:#E5ECEF;',
                            margin: '4 2 4 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [                                                       
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Merchant Name',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 150
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtDESCR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    maxChars: '40',
                                    width: 520
                                },
                                { xtype: 'tbspacer', width: 50 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 4 20',
//                            bodyStyle: 'background:#E5ECEF;',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Social Reason',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 150
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtRSOCIAL',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    maxChars: '40',
                                    width: 520
                                },
                              
                                { xtype: 'tbspacer', width: 50 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 4 20',
//                            bodyStyle: 'background:#E5ECEF;',
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'IATA Code',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 150
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtCIATA',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    enforceMaxLength: true,
                                    width: 100,
                                    maskRe: /[1-9]/,
                                    maxLength: 8                                  
                                },
                                { xtype: 'tbspacer', width: 80 },
                                {
                                    xtype: 'label',
                                    text: ' Name',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 50
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtNameIATA',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    readOnly: true,
//                                    enforceMaxLength: true,
                                    fieldStyle: 'text-align:left;',
                                    width: 286,
                                    maskRe: /[a-zA-Z]/
//                                    maxLength: 5
                                },
                                { xtype: 'tbspacer', width: 5 }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 4 20',
//                            bodyStyle: 'background:#E5ECEF;',
                            
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Country',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 150
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtSCOUNTRY',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    enforceMaxLength: true,
                                    fieldStyle: 'text-align:left;',
                                    width: 100,
                                    maskRe: /[a-zA-Z]/,
                                    maxLength: 2
                                },
                                { xtype: 'tbspacer', width: 80 },
                                {
                                    xtype: 'label',
                                    text: 'Name',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 50
                                },
                                { xtype: 'tbspacer', width: 4 },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-de-txtNameCTRY',
                                    style: 'font-weight:bold;color:#0B333C;',
//                                    enforceMaxLength: true,
                                    fieldStyle: 'text-align:left;',
                                    readOnly: true,
                                    width: 286,
                                    maskRe: /[a-zA-Z]/
//                                    maxLength: 5
                                },
                                { xtype: 'tbspacer', width: 5 } 
                            ]
                        },
                        // <editor-fold defaultstate="collapsed" desc="Commission Policy Information">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
//                                bodyStyle: 'background:#E5ECEF;',
//                                bodyStyle: 'background:#efe5e5',
                                margin: '2 2 0 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [   
                                    {
                                        xtype: 'label',
                                        html: '<strong style="color:#121E31; text-decoration: underline; ">Commission Policy Information</strong>',
//                                        bodyStyle: 'background:#E5ECEF;',
                                        fontSize: '11',
                                        margin: '0 0 0 7',
                                        width: 234,
                                        height: 20
                                    },
                                    { xtype: 'tbspacer', width: 470}
                                ]
                            },
                            // </editor-fold>
                            // <editor-fold defaultstate="collapsed" desc="Client Code 1">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
//                                bodyStyle: 'background:#E5ECEF;',
                                bodyStyle: 'background:#efe5e5',
                                margin: '4 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [                                                       
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Client Code 1',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 120,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 35},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtCODCLIT1',
                                        fieldStyle: 'text-align:left',
    //                                    margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 5,
//                                        readOnly: true,
                                        width: 70
                                    },
                                    {xtype: 'tbspacer', width: 110},
                                    {
                                        xtype: 'label',
                                        text: 'Client Address 1',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 100,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 20},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtDIRCLIT1',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 8,
//                                        readOnly: true,
                                        width: 218
                                    },
                                    { xtype: 'tbspacer', width: 30}
                                ]
                            },
                            // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="Chargeback Policy Information">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
//                                bodyStyle: 'background:#E5ECEF;',
//                                bodyStyle: 'background:#efe5e5',
                                margin: '2 2 0 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [   
                                    {
                                        xtype: 'label',
                                        html: '<strong style="color:#121E31; text-decoration: underline; ">Chargeback Policy Information</strong>',
//                                        bodyStyle: 'background:#E5ECEF;',
                                        fontSize: '11',
                                        margin: '0 0 0 7',
                                        width: 234,
                                        height: 20
                                    },
                                    { xtype: 'tbspacer', width: 665}
                                ]
                            },
                            // </editor-fold>
                            // <editor-fold defaultstate="collapsed" desc="Client Code 1">
                            {
                                xtype: 'panel',
                                layout: 'hbox',
                                border: false,
//                                bodyStyle: 'background:#E5ECEF;',
                                bodyStyle: 'background:#efe5e5',
                                margin: '4 2 4 20',
                                defaults: {
                                    anchor: '100%',
                                    width: 1080
                                },
                                items: [                                                       
                                    { xtype: 'tbspacer', width: 7 },
                                    {
                                        xtype: 'label',
                                        text: 'Client Code 2',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 120,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 35},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtCODCLIT2',
                                        fieldStyle: 'text-align:left',
    //                                    margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 5,
//                                        readOnly: true,
                                        width: 70
                                    },
                                    {xtype: 'tbspacer', width: 110},
                                    {
                                        xtype: 'label',
                                        text: 'Client Address 2',
                                        style: 'font-weight:bold;color:#121E31;',
                                        width: 100,
                                        padding: '3 0'
                                    },
                                    {xtype: 'tbspacer', width: 20},
                                    {
                                        xtype: 'textfield',
                                        id: prototype.id+'-de-txtDIRCLIT2',
                                        fieldStyle: 'text-align:left',
                                        margin: '0 0 0 3',
                                        enforceMaxLength: true,
                                        maxLength: 8,
//                                        readOnly: true,
                                        width: 218
                                    },
                                    { xtype: 'tbspacer', width: 30}
                                ]
                            }
                            // </editor-fold>
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    border: false,
//                                bodyStyle: 'background:#E5ECEF;',
//                                bodyStyle: 'background:#efe5e5',
                    margin: '10 2 0 20',
                    defaults: {
                        anchor: '100%',
                        width: 1080
                    },
                    items: [   
                        {
                            xtype: 'label',
                            html: '<strong style="color:#121E31; text-decoration: underline; ">Control Data</strong>',
//                                        bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            margin: '0 0 0 7',
                            width: 234
                        }
//                        { xtype: 'tbspacer', width: 470}
                    ]
                },
                // </editor-fold>
                
                {           
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '4 2 4 50',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Creator User ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    height: 20
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtUSCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtFECR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtHOCR',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border:false,
                            layout: 'hbox',
                            margin: '5 0 10 50',
                            
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtUSUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtFEUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 20 },
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-txtHOUP',
                                    readOnly: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items:[
                {
                    text: 'Save',
                    id:prototype.id+'-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners:{
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id:prototype.id+'-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners:{
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id:prototype.id+'-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners:{
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id:prototype.id+'-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
  }
);