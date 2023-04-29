Ext.define('Ext.Praxis.view.sales.AttosMasterFileForm.DataEntry',{
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryAttosMasterFileForm',

    controller: 'DataEntryAttosMasterFileController',

    requires:[
        'Ext.Praxis.controller.sales.AttosMasterFile.DataEntryAttosMasterFileController'
    ],

    title:'Complete Information',
    header:true,
    height:370,
    width:950,
    border:false,
    resizable:false,
    layout:'fit',
    modal:true,
    defaults:{
        border: false
    },

    items:[
        {
            xtype: 'form',
            id: prototype.id + '-formDataEntry',
            defaults:{
                style: 'margin: 3px;',
                border: false
            },
            items:[
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Airport Code',
                            style: 'font-weight:bold;color:#000;',
                            width: 90
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            id:prototype.id+'-lblMandatorySystem',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        { xtype: 'tbspacer', width: 2 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA4290CTATO',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 78
                        },
                        { xtype: 'tbspacer', width: 18 },
                        {
                            xtype: 'label',
                            text: 'Airport Name',
                            style: 'font-weight:bold;color:#000;',
                            fieldStyle: 'text-align:right',
                            width: 90
                        },
                        {
                            xtype: 'label',
                            text: '(*)',
                            id:prototype.id+'-lblMandatorySystem0',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        { xtype: 'tbspacer', width: 2 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA4290NOMBR',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 30,
                            width: 170
                        },
                        { xtype: 'tbspacer', width: 18 },
                        {
                            xtype: 'label',
                            text: 'Category',
                            style: 'font-weight:bold;color:#000;',
                            fieldStyle: 'text-align:right',
                            width: 80,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Service Type'
                            }
                        },
                        { xtype: 'tbspacer', width: 2 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA4290CATEG',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 1,
                            width: 66
                        },
                        { xtype: 'tbspacer', width: 18 },
                        {
                            xtype: 'label',
                            text: 'Time Zone',
                            style: 'font-weight:bold;color:#000;',
                            fieldStyle: 'text-align:right',
                            width: 75,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Country Time Zone'
                            }
                        },
                        { xtype: 'tbspacer', width: 2 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA4290TIMZ',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 90
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'City Code',
                            style: 'font-weight:bold;color:#000;',
                            width: 90
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
                        { xtype: 'tbspacer', width: 2 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA4290CIUD',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 3,
                            width: 78
                        },
                        { xtype: 'tbspacer', width: 18 },
                        {
                            xtype: 'label',
                            text: 'City Name',
                            style: 'font-weight:bold;color:#000;',
                            fieldStyle: 'text-align:right',
                            width: 90
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
                        { xtype: 'tbspacer', width: 2 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA4290NOMCD',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 30,
                            width: 170
                        },
                        { xtype: 'tbspacer', width: 18 },
                        {
                            xtype: 'label',
                            text: 'State Code',
                            style: 'font-weight:bold;color:#000;',
                            fieldStyle: 'text-align:right',
                            width: 80
                        },
                        { xtype: 'tbspacer', width: 2 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA4290STATE',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 2,
                            width: 66
                        },
                        { xtype: 'tbspacer', width: 18 },
                        {
                            xtype: 'label',
                            text: 'Status',
                            style: 'font-weight:bold;color:#000;',
                            fieldStyle: 'text-align:right',
                            width: 55
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
                        { xtype: 'tbspacer', width: 2 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA4290STAT',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 1,
                            width: 90
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items:[
                        { xtype: 'tbspacer', width: 7 },
                        {
                            xtype: 'label',
                            text: 'Country Code',
                            style: 'font-weight:bold;color:#000;',
                            width: 90
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
                        { xtype: 'tbspacer', width: 2 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA4290PAIS',
                            fieldStyle: 'text-align:left',
                            enforceMaxLength: true,
                            maxLength: 2,
                            width: 78
                        },
                        { xtype: 'tbspacer', width: 18 },
                        {
                            xtype: 'label',
                            text: 'Country Name',
                            style: 'font-weight:bold;color:#000;',
                            fieldStyle: 'text-align:right',
                            width: 110
                        },
                        { xtype: 'tbspacer', width: 2 },
                        {
                            xtype: 'textfield',
                            id:prototype.id+'-txtA4290nomPAIS',
                            fieldStyle: 'text-align:left',
                            readOnly: true,
                            enforceMaxLength: true,
                            maxLength: 30,
                            width: 336
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'column',
                    width: 850,
                    margin: '2 0 2 0',
                    border: false,
//                    bodyStyle:{"background-color":"rgb(219, 226, 229)"},
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults:{
                                style: 'margin: 3px;',
                                border: false
                            },
//                            bodyStyle:{"background-color":"rgb(219, 226, 229)"},
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
//                                    bodyStyle:{"background-color":"rgb(219, 226, 229)"},
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Decimal Longitude',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 130
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA4290LONG',
                                            fieldStyle: 'text-align:left',
                                            width: 90
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    //title: '<u>Seats Capacity</u>',
//                                    bodyStyle:{"background-color":"rgb(219, 226, 229)"},
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Decimal Latitude',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 130
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:prototype.id+'-txtA4290LATI',
                                            fieldStyle: 'text-align:left',
                                            width: 90
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            defaults:{
                                style: 'margin: 3px;',
                                border: false
                            },
//                            bodyStyle:{"background-color":"rgb(219, 226, 229)"},
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
//                                    bodyStyle:{"background-color":"rgb(219, 226, 229)"},
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'Start Date',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 110
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
                                        {
                                            xtype: 'datefield',
                                            id:prototype.id+'-txtStartDate',
                                            format: 'Y/m/d',
                                            maskRe: /[0-9/]/,
                                            fieldStyle: 'text-align:center;',
                                            editable: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 90/*,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format valid YYYY/MM/DD'
                                            }*/
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    //title: '<u>Seats Capacity</u>',
//                                    bodyStyle:{"background-color":"rgb(219, 226, 229)"},
                                    items:[
                                        { xtype: 'tbspacer', width: 7 },
                                        {
                                            xtype: 'label',
                                            text: 'End Date',
                                            style: 'font-weight:bold;color:#000;',
                                            width: 130
                                        },
                                        {
                                            xtype: 'datefield',
                                            id:prototype.id+'-txtEndDate',
                                            format: 'Y/m/d',
                                            maskRe: /[0-9/]/,
                                            fieldStyle: 'text-align:center;',
                                            editable: true,
                                            enforceMaxLength: true,
                                            maxLength: 10,
                                            width: 90/*,
                                            autoEl: {
                                                tag: 'label',
                                                'data-qtip': 'Format valid YYYY/MM/DD'
                                            }*/
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    id: prototype.id+'-ControlData',
                    title: 'Control Data',
                    margin: '15 0 8 0',
                    width: 800,
                    border: true,
                    defaults:{
                        style: 'margin: 3px;',
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'Creator User',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-USCR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 70 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-FECR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 70 },
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-HOCR',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            margin: '5 0 10 0',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items:[
                                { xtype: 'tbspacer', width: 7 },
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-USUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 70 },
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-FEUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                },
                                { xtype: 'tbspacer', width: 70 },
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#000;',
                                    width: 120
                                },
                                {
                                    xtype: 'textfield',
                                    id:prototype.id+'-HOUP',
                                    readOnly: true,
                                    enforceMaxLength: true,
                                    width: 80,
                                    listeners:{
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
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
                },
                { xtype: 'tbspacer', width: 30 },
                {
                    xtype: 'label',
                    text: '(*) Required Fields',
                    style: 'font-weight:bold;color:red;',
                    width: 120
                }
//                ,
//                { xtype: 'tbspacer', width: 30 },
//                {
//                    xtype: 'button',
//                    id:prototype.id+'-btn-prev',
//                    icon: 'resources/img/botones/prev.png',
//                    tooltip: 'View Previous Flight Manifest',
//                    border: false,
//                    listeners:{
//                        click: 'onPrevClick'
//                    }
//                },
//                {
//                    xtype: 'button',
//                    id:prototype.id+'-btn-next',
//                    icon: 'resources/img/botones/next2.png',
//                    tooltip: 'View Next Flight Manifest',
//                    border: false,
//                    listeners:{
//                        click: 'onNextClick'
//                    }
//                }
            ]
        }
    ]

});