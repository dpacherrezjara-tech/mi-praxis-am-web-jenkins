Ext.define('Ext.Praxis.view.flown.FlightManifestForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    margin: '2 0 2 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                anchor: '100%',
                width: prototype.widthContenedor,
                bodyStyle: 'background-color: #E3EAF9;'
            },
            items: [
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults: {
                        padding: '5px 1px 5px 1px',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        enableKeyEvents: true,
                        enforceMaxLength: true
                    },
                    items: [
                        {xtype: 'tbspacer', width: 7},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbTipoFecha',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    [1, "Transaction Date"], [2, "Processing Date"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            selectOnFocus: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: true,
                            width: 123,
                            value: 1,
                            typeAhead: true,
                            hidden: true,
                            padding: '5 4 5 1',
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                                focus: function (combo) {
                                    combo.expand();
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        // <editor-fold defaultstate="collapsed" desc="Combo Date">
                        {
                            xtype: 'label',
                            id: prototype.id + '-lblFlightDate',
                            text: 'Flight Date',
                            style: 'font-weight:bold;',
                            padding: '8px 7px 8px 0px'
                        },
                        {xtype: 'tbspacer', width: 8},
                        {
                            xtype: 'label',
                            html: 'From:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromYear',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: true,
                            editable: false,
                            valueField: 'code',
                            displayField: 'name',
                            width: 70,
                            listConfig: {maxHeight: 111, minWidth: 70},
                            listeners: {
                                change: 'cbxDateFromYear_changeHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromMonth',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code', displayField: 'name',
                            listConfig: {minWidth: 60},
                            width: 60,
                            anchor: '100%',
                            listeners: {
                                change: 'cbxDateFromMonth_changeHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateFromDay',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code', displayField: 'name',
                            emptyText: 'All',
                            width: 60,
                            anchor: '100%',
                            listConfig: {maxHeight: 111, minWidth: 60},
                            listeners: {
                                change: 'cbxDateFromDay_changeHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'label',
                            html: 'To:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToYear',
                            queryMode: 'local',
                            triggerAction: 'all',
                            autoSelect: false,
                            enableKeyEvents: true,
                            forceSelection: true,
                            caseSensitive: true,
                            editable: false,
                            valueField: 'code',
                            displayField: 'name',
                            width: 70,
                            hiddenLabel: false,
                            listConfig: {maxHeight: 111, minWidth: 70}
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToMonth',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code', displayField: 'name',
                            listConfig: {minWidth: 60},
                            width: 60,
                            anchor: '100%'
                        },
                        {xtype: 'tbspacer', width: 4},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbDateToDay',
                            labelAlign: 'right',
                            queryMode: 'local',
                            triggerAction: 'all',
                            editable: false,
                            autoSelect: false,
                            enableKeyEvents: true,
                            caseSensitive: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 0,
                            width: 60,
                            anchor: '100%',
                            listConfig: {maxHeight: 111, minWidth: 60}
                        },
                        // </editor-fold>
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'label',
                            html: 'Orig:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCDEPART',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[a-zA-Z]/,
                            maxLength: 3,
                            width: 50,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'onTextKeypress',
                                change: function(field, newValue) {
                                    field.setValue(newValue.toUpperCase());
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'label',
                            html: 'Flight Number:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFlight',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 4,
                            width: 50,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'onTextKeypress'
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'label',
                            html: 'Last Name:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtLNAME',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[a-zA-Z\s]/,
                            maxLength: 40,
                            width: 150,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'onTextKeypress',
                                change: function(field, newValue) {
                                    field.setValue(newValue.toUpperCase());
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'label',
                            html: 'Seat:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 7px 8px 0px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtCHAIR',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[a-zA-Z0-9]/, 
                            maxLength: 5,
                            width: 50,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'onTextKeypress',
                                change: function(field, newValue) {
                                    field.setValue(newValue.toUpperCase());
                                }
                            }
                        },
                        {xtype: 'tbspacer', width: 15},
                        {
                            xtype: 'label',
                            html: 'Ticket:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '7px 7px 6px 0px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTKT',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9 ]/,
                            maxLength: 15,
                            width: 156,
                            enableKeyEvents: true,
                            listeners: {
                                change: 'onValidarChange',
                                keypress: 'BuscarTKT_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-upload',
                            hidden: true,
                            margin: '2 0 0 0',
                            width: 60,
                            html: '<strong style="color:white;">UPDATE</strong>',
                            style: 'background:#24678D;color:white;font-weight:bold;',
                            border: false,
                            listeners: {
                                click: 'onFileLoad'
                            }
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    hidden: true,
                    style: 'border-top: 4px #ffffff solid;border-left: 0px;',
                    defaults: {
                        padding: '5px 1px 5px 1px',
                        anchor: '100%'
                    },
                    items: [
//                        {xtype: 'tbspacer', width: 7},
//                        {
//                            xtype: 'label',
//                            html: 'Ticket:',
//                            align: 'center',
//                            fieldStyle: 'text-align: center;',
//                            padding: '7px 7px 6px 0px'
//                        },
//                        {
//                            xtype: 'textfield',
//                            id: prototype.id + '-txtTKT',
//                            fieldStyle: 'text-align:center',
//                            enforceMaxLength: true,
//                            maskRe: /[0-9]/,
////                            maxLength: 13,
//                            width: 156,
//                            enableKeyEvents: true,
//                            listeners: {
//                                change: 'onValidarChange',
//                                keypress: 'BuscarTKT_keyDownHandler'
//                            }
//                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            html: 'Rolling:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '7px 7px 6px 0px'
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtROLL',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
//                            maxLength: 2,
                            width: 40,
                            enableKeyEvents: true,
                            listeners: {
//                                change: 'onValidarChange',
                                keypress: 'BuscarTKT_keyDownHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            id: prototype.id + '-labelFSabre',
                            html: 'Scan Sabre:',
                            hidden: true,
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '7px 7px 6px 0px'
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFSabre',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"], ["0", "Not Found"], ["1", "Found"],
                                    ["2", "Found but not matching coupon"], ["4", "No Revenue(Employes/Oth)"], ["5", "Manual"], ["6", "BPO Found"]
                                ]
                            }),
                            queryMode: 'local',
                            hidden: true,
                            allowBlank: true,
                            forceSelection: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            width: 200,
                            value: "",
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                                change: 'cmbFSabre_changeHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'label',
                            id: prototype.id + '-labelScanTicket',
                            text: 'Scan Tickets',
                            style: 'text-align:left;font-weight:bold;',
                            padding: '8 0'
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'datefield',
                            id: prototype.id + '-txtFilterDatem',
                            format: 'Y/m/d',
                            formatText: '',
                            invalidText: 'Type the date in the format: YYYY/MM/DD',
                            minValue: new Date(1990, 00, 01),
                            maxValue: new Date(),
                            maskRe: /[0-9/]/,
                            fieldStyle: 'text-align:center;color:blue;',
                            editable: true,
                            enforceMaxLength: true,
                            maxLength: 10,
                            width: 90,
                            autoEl: {
                                tag: 'label',
                                'data-qtip': 'Format valid YYYY/MM/DD'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnScanTicket',
//                            html: '<strong>Process</strong>',
                            iconCls: 'prx-icon-update',
                            tooltip: 'Scan Tickets',
                            border: true,
//                            margin: '2 0',
//                            width: 80,
                            listeners: {
                                click: 'btnScanTicket_clickHandler'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
//                        {
//                            xtype: 'label',
//                            id: prototype.id + '-labelScanTicket',
//                            html: 'Scan Tickets',
////                            hidden: true,
//                            align: 'center',
//                            fieldStyle: 'text-align: center;',
//                            padding: '7px 7px 6px 0px'
//                        },
//                        {
//                            xtype: 'button',
//                            id: prototype.id + '-btnScanTicket',
//                            iconCls: 'prx-icon-update',
//                            tooltip: 'Scan Tickets',
////                            hidden: true,
//                            listeners: {
//                                click: 'btnScanTicket_clickHandler'
//                            }
//                        },
                        {xtype: 'tbspacer', width: 650},
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbControl',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["ODS", "ODS Control"], ["JSON", "JSON Control"]
                                ]
                            }),
                            queryMode: 'local',
//                            hidden: true,
                            allowBlank: true,
                            forceSelection: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            width: 110,
                            value: "ODS",
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                                change: 'changeControl'
                            }
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnRefresh',
                            icon: 'resources/img/botones/refresh.png',
                            tooltip: 'Refresh',
                            listeners: {
                                click: 'actualizar'
                            }
                        },
                        {xtype: 'tbspacer', width: 3},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtNENV',
                            fieldStyle: 'text-align:center',
                            editable: false,
                            width: 30
                        },
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtDPRDA',
                            fieldStyle: 'text-align:center',
                            editable: false,
                            width: 100
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-waa',
                    hidden: true,
                    layout: 'hbox',
                    style: 'border-top: 4px #ffffff solid;border-left: 0px;',
                    defaults: {
                        padding: '5px 1px 5px 1px',
                        anchor: '100%'
                    },
                    items: [
                        {xtype: 'tbspacer', width: 5},
                        {
                            xtype: 'form',
                            id: prototype.id + '-form-01_INF',
                            border: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [{
                                    xtype: 'filefield',
                                    id: prototype.id + '-file_INF',
                                    name: 'excelfile_INF',
//                                fieldLabel: '<strong style="font-weight:bold;color:#0B333C;">Update INF</strong>',
                                    allowBlank: true,
                                    accept: '.xlsx, .xls',
                                    labelWidth: 85,
                                    width: 150,
                                    buttonText: 'Select excel...',
                                    regex: /(.)+((\.xlsx)|(\.xls)|(\.csv)(\w)?)$/i,
                                    regexText: 'Only XLS and XLSX formats are accepted',
                                    buttonConfig: {
                                        text: '<strong>Select file</strong>',
                                        width: 80
                                    },
                                    listeners: {
                                        //change: 'onUploadChange'
                                    }
                                }]
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-upload_INF',
                            margin: '2 0 0 0',
                            width: 90,
                            html: '<strong style="color:white;">Update INF</strong>',
                            style: 'background:#24678D;color:white;font-weight:bold;',
                            border: false,
                            listeners: {
                                click: 'onFileLoad_INF'
                            }
                        },
                        {xtype: 'tbspacer', width: 60},
                        {
                            xtype: 'panel',
                            id: prototype.id + '-filter_3',
                            hidden: true,
                            border: false,
                            layout: 'hbox',
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmb_Diff',
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["N", "All"],
                                            ["Y", "Diff > 0"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    fieldLabel: 'ODS vs VCR',
                                    //                            hidden: true,
                                    allowBlank: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    labelWidth: 75,
                                    width: 150,
                                    value: "N",
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        change: 'onDIFF'
                                    }
                                }
                            ]
                        },
                        {xtype: 'tbspacer', width: 665},
                        {
                            xtype: 'label',
                            html: 'Cierre de Vuelo:',
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '7px 7px 6px 0px'
                        },
                        {
                            xtype: 'form',
                            id: prototype.id + '-form-01_VLO',
                            border: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [{
                                xtype: 'filefield',
                                id: prototype.id + '-file_VLO',
                                name: 'excelfile_VLO',
//                                fieldLabel: '<strong style="font-weight:bold;color:#0B333C;">Update VLO</strong>',
                                allowBlank: true,
                                accept: '.xlsx, .xls',
                                labelWidth: 85,
                                width: 250,
                                buttonText: 'Select excel...',
                                regex: /(.)+((\.xlsx)|(\.xls)|(\.csv)(\w)?)$/i,
                                regexText: 'Only XLS and XLSX formats are accepted',
                                buttonConfig: {
                                    text : '<strong>Select file</strong>',
                                    width: 80
                                },
                                listeners:{
                                    //change: 'onUploadChange'
                                }
                            }]
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            xtype: 'button',
                            id:prototype.id+'-btn-upload_VLO',
                            margin: '2 0 0 0',
                            width: 90,
                            html: '<strong style="color:white;">Process File</strong>',
                            style: 'background:#24678D;color:white;font-weight:bold;',
                            border: false,
                            listeners:{
                                click: 'onClickFileLoad_VLO'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});