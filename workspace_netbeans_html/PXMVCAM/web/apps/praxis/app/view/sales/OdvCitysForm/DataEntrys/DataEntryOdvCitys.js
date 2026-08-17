prototype.idDE = prototype.idDE + 'DataEntryOdvCitys';

Ext.define('Ext.Praxis.view.sales.OdvCitysForm.DataEntrys.DataEntryOdvCitys', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryOdvCitys',
    id: prototype.idDE + '-DataEntryOdvCitysForm',
    requires: [
        'Ext.Praxis.controller.sales.OdvCitys.DataEntryOdvCitysController'
    ],

    controller: 'DataEntryOdvCitysController',
    title: 'Edit',
    initComponent: function () {
        const me = this;
        me.title = me.option === 'C' ? 'Create' : 'Edit';

        me.callParent(arguments);
    },

    header: true,
//    height: 370,
    width: 700,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },

    items: [
        {
            xtype: 'form',
            id: prototype.idDE + '-DataEntryFormOdv',
            layout: 'vbox',
            border: false,
            defaults: {
                border: false,
                width: '120%',
            },
            items: [
                // Destination
                {
                    xtype: 'panel',
                    margin: '8 0 0 0',
                    layout: 'hbox',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {xtype: 'label', text: 'Destination Code', style: 'font-weight:bold;color:#000;', width: 120,},
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
                        {
                            xtype: 'textfield', 
                            id: prototype.idDE + '-txtCATTO', 
                            name: 'A2936CATTO', 
                            maxLength: 3, 
                            enforceMaxLength: true,
                            width: 50,
                            readOnly: true,
                            allowBlank: false,
                            maskRe: /[A-Za-z]/,
                            fieldStyle: 'text-transform: uppercase;',
                            listeners: {
                                change: function(field, newValue) {
                                    if (newValue && newValue.length > 3) {
                                        field.setValue(newValue.substring(0, 3));
                                    }
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 21},
                        {xtype: 'label', text: 'Destination Name', style: 'font-weight:bold;color:#000;', width: 120},
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
                        {
                            xtype: 'textfield', 
                            id: prototype.idDE + '-txtNATTO', 
                            name: 'A2936NATTO', 
                            maxLength: 50, 
                            enforceMaxLength: true, 
                            width: 315,
                            allowBlank: false,
                            fieldStyle: 'text-transform: uppercase;',
                            maskRe: /[A-Za-z]/,
                            listeners: {
                                change: function(field, newValue) {
                                    if (newValue && newValue.length > 50) {
                                        field.setValue(newValue.substring(0, 50));
                                    }
                                }
                            }
                        }
                    ]
                },

                // City
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '8 0 0 0',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {xtype: 'label', text: 'City Code', style: 'font-weight:bold;color:#000;', width: 120,},
                        {
                            xtype: 'label',
                            text: '(*)',
                            id:prototype.id+'-lblMandatorySystem1',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        {
                            xtype: 'textfield', 
                            id: prototype.idDE + '-txtCCITY', 
                            fieldStyle: 'text-transform: uppercase;',
                            maskRe: /[A-Za-z]/,
                            name: 'A2936CCITY', 
                            maxLength: 3,
                            enforceMaxLength: true, 
                            width: 50,
                            readOnly: true,
                            allowBlank: false,
                            listeners: {
                                change: function(field, newValue) {
                                    if (newValue && newValue.length > 3) {
                                        field.setValue(newValue.substring(0, 3));
                                    }
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 21},
                        {xtype: 'label', text: 'City Name', style: 'font-weight:bold;color:#000;', width: 120},
                        {
                            xtype: 'label',
                            text: '(*)',
                            id:prototype.id+'-lblMandatorySystem2',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        {
                            xtype: 'textfield', 
                            id: prototype.idDE + '-txtNCITY', 
                            name: 'A2936NCITY', 
                            maskRe: /[A-Za-z]/,
                            fieldStyle: 'text-transform: uppercase;',
                            maxLength: 50,  
                            enforceMaxLength: true, 
                            width: 315,
                            allowBlank: false,
                            listeners: {
                                change: function(field, newValue) {
                                    if (newValue && newValue.length > 50) {
                                        field.setValue(newValue.substring(0, 50));
                                    }
                                }
                            }
                        }
                    ]
                },

                // Country
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '8 0 0 0',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {xtype: 'label', text: 'Country Code', style: 'font-weight:bold;color:#000;', width: 120,},
                         {
                            xtype: 'label',
                            text: '(*)',
                            id:prototype.id+'-lblMandatorySystem3',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        {
                            xtype: 'textfield', 
                            id: prototype.idDE + '-txtCPAIS', 
                            name: 'A2936CPAIS', 
                            maskRe: /[A-Za-z]/,
                            fieldStyle: 'text-transform: uppercase;',
                            maxLength: 2,
                            enforceMaxLength: true, 
                            width: 50,
                            readOnly: true,
                            allowBlank: false,
                            listeners: {
                                change: function(field, newValue) {
                                    if (newValue && newValue.length > 2) {
                                        field.setValue(newValue.substring(0, 2));
                                    }
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 21},
                        {xtype: 'label', text: 'Country Name', style: 'font-weight:bold;color:#000;', width: 120},
                        {
                            xtype: 'label',
                            text: '(*)',
                            id:prototype.id+'-lblMandatorySystem4',
                            style: 'font-weight:bold;color:red;',
                            width: 20,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Mandatory Field'
                            }
                        },
                        {
                            xtype: 'textfield', 
                            id: prototype.idDE + '-txtNPAIS', 
                            name: 'A2936NPAIS',  
                            maskRe: /[A-Za-z]/,
                            fieldStyle: 'text-transform: uppercase;',
                            maxLength: 50, 
                            enforceMaxLength: true, 
                            width: 315,
                            allowBlank: false,
                            listeners: {
                                change: function(field, newValue) {
                                    if (newValue && newValue.length > 50) {
                                        field.setValue(newValue.substring(0, 50));
                                    }
                                }
                            }
                        }
                    ]
                },
                // Zone
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '8 0 0 0',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {xtype: 'label', text: 'Zone Code', style: 'font-weight:bold;color:#000;', width: 140},
                        {
                            xtype: 'textfield', 
                            id: prototype.idDE + '-txtIDZON', 
                            name: 'A2936IDZON', 
                            maskRe: /[A-Za-z]/,
                            fieldStyle: 'text-transform: uppercase;',
                            maxLength: 3,
                            enforceMaxLength: true, 
                            width: 50,
                            listeners: {
                                change: function(field, newValue) {
                                    if (newValue && newValue.length > 3) {
                                        field.setValue(newValue.substring(0, 3));
                                    }
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 21},
                        {xtype: 'label', text: 'Zone Name', style: 'font-weight:bold;color:#000;', width: 140},
                        {
                            xtype: 'textfield', 
                            id: prototype.idDE + '-txtNZONE', 
                            name: 'A2936NZONE', 
                            maskRe: /[A-Za-z]/,
                            fieldStyle: 'text-transform: uppercase;',
                            maxLength: 20,  
                            enforceMaxLength: true,
                            width: 315,
                            listeners: {
                                change: function(field, newValue) {
                                    if (newValue && newValue.length > 20) {
                                        field.setValue(newValue.substring(0, 20));
                                    }
                                }
                            }
                        }
                    ]
                },
                // Region
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '8 0 0 0',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {xtype: 'label', text: 'Region Code', style: 'font-weight:bold;color:#000;', width: 140},
                        {
                            xtype: 'textfield', 
                            id: prototype.idDE + '-txtCREGI', 
                            name: 'A2936CREGI', 
                            maskRe: /[A-Za-z]/,
                            fieldStyle: 'text-transform: uppercase;',
                            maxLength: 3, 
                            enforceMaxLength: true,
                            width: 50,
                            listeners: {
                                change: function(field, newValue) {
                                    if (newValue && newValue.length > 3) {
                                        field.setValue(newValue.substring(0, 3));
                                    }
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 21},
                        {xtype: 'label', text: 'Region Name', style: 'font-weight:bold;color:#000;', width: 140},
                        {
                            xtype: 'textfield', 
                            id: prototype.idDE + '-txtNREGI', 
                            name: 'A2936NREGI', 
                            maskRe: /[A-Za-z]/,
                            fieldStyle: 'text-transform: uppercase;',
                            maxLength: 20,  
                            enforceMaxLength: true,
                            width: 315,
                            listeners: {
                                change: function(field, newValue) {
                                    if (newValue && newValue.length > 20) {
                                        field.setValue(newValue.substring(0, 20));
                                    }
                                }
                            }
                        }
                    ]
                },
                // Sub Region
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '8 0 0 0',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {xtype: 'label', text: 'Sub Region Code', style: 'font-weight:bold;color:#000;', width: 140},
                        {
                            xtype: 'textfield', 
                            id: prototype.idDE + '-txtCSREG', 
                            maskRe: /[A-Za-z]/,
                            name: 'A2936CSREG', 
                            fieldStyle: 'text-transform: uppercase;',
                            maxLength: 3,
                            enforceMaxLength: true, 
                            width: 50,
                            listeners: {
                                change: function(field, newValue) {
                                    if (newValue && newValue.length > 3) {
                                        field.setValue(newValue.substring(0, 3));
                                    }
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 21},
                        {xtype: 'label', text: 'Sub Region Name', style: 'font-weight:bold;color:#000;', width: 140},
                        {
                            xtype: 'textfield', 
                            id: prototype.idDE + '-txtNCSRG', 
                            maskRe: /[A-Za-z]/,
                            name: 'A2936NCSRG', 
                            fieldStyle: 'text-transform: uppercase;',
                            maxLength: 20,
                            enforceMaxLength: true, 
                            width: 315,
                            listeners: {
                                change: function(field, newValue) {
                                    if (newValue && newValue.length > 20) {
                                        field.setValue(newValue.substring(0, 20));
                                    }
                                }
                            }
                        }
                    ]
                },
                // Hub & Gateway
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '8 0 0 0',
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {xtype: 'label', text: 'Hub', style: 'font-weight:bold;color:#000;', width: 140},
                        {
                            xtype: 'textfield', 
                            id: prototype.idDE + '-txtIDHUB', 
                            name: 'A2936IDHUB', 
                            maxLength: 3,
                            enforceMaxLength: true, 
                            width: 50,
                            listeners: {
                                change: function(field, newValue) {
                                    if (newValue && newValue.length > 3) {
                                        field.setValue(newValue.substring(0, 3));
                                    }
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 21},
                        {xtype: 'label', text: 'Gateway', style: 'font-weight:bold;color:#000;', width: 140},
                        {
                            xtype: 'textfield', 
                            id: prototype.idDE + '-txtGATTO', 
                            name: 'A2936GATTO', 
                            maskRe: /[A-Za-z]/,
                            fieldStyle: 'text-transform: uppercase;',
                            maxLength:20,
                            enforceMaxLength: true, 
                            width: 315,
                            listeners: {
                                change: function(field, newValue) {
                                    if (newValue && newValue.length > 20) {
                                        field.setValue(newValue.substring(0, 20));
                                    }
                                }
                            }
                        }
                    ]
                },
                // Fieldset Control Data
                {
                    xtype: 'fieldset',
                    id: prototype.idDE + '-ControlData',
                    title: 'Control Data',
                    margin: '10 0 10 50',
                    width: 580,
                    border: true,
                    defaults: {
                        style: 'margin: 5px 0;', 
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
//                            margin: '5 0 10 0',
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {xtype: 'label', text: 'Creator User', style: 'font-weight:bold;color:#000;', width: 90},
                                {xtype: 'textfield', id: prototype.idDE + '-USCR', name: 'A2936INGRE', readOnly: true, width: 80},
                                {xtype: 'tbspacer', width: 10},
                                {xtype: 'label', text: 'Creation Date', style: 'font-weight:bold;color:#000;', width: 90},
                                {xtype: 'textfield', id: prototype.idDE + '-FECR', name: 'A2936FINGR', readOnly: true, width: 80},
                                {xtype: 'tbspacer', width: 10},
                                {xtype: 'label', text: 'Creation Time', style: 'font-weight:bold;color:#000;', width: 90},
                                {xtype: 'textfield', id: prototype.idDE + '-HOCR', name: 'A2936HINGR', readOnly: true, width: 80}
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
//                            margin: '5 0 10 0',
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {xtype: 'label', text: 'Update User', style: 'font-weight:bold;color:#000;', width: 90},
                                {xtype: 'textfield', id: prototype.idDE + '-MODIF', name: 'A2936MODIF', readOnly: true, width: 80},
                                {xtype: 'tbspacer', width: 10},
                                {xtype: 'label', text: 'Update Date', style: 'font-weight:bold;color:#000;', width: 90},
                                {xtype: 'textfield', id: prototype.idDE + '-FMODI', name: 'A2936FMODI', readOnly: true, width: 80},
                                {xtype: 'tbspacer', width: 10},
                                {xtype: 'label', text: 'Update Time', style: 'font-weight:bold;color:#000;', width: 90},
                                {xtype: 'textfield', id: prototype.idDE + '-HMODI', name: 'A2936HMODI', readOnly: true, width: 80}
                            ]
                        },
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '7 0 7 0',
            layout: {
                pack: 'center'
            },
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Update',
                    id: prototype.idDE + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Create',
                    id: prototype.idDE + '-btn-create',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onCreateClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.idDE + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleteClick'
                    }
                }
            ]
        }
    ]

});