Ext.define('Ext.Praxis.view.flown.FlightConciliationForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    layout: 'fit',
    items: [
        {
            xtype: 'fieldset',
            id: prototype.id + '-titleFieldsetBSP',
            title: '<span style="color:#1A4D8F;font-weight:bold;">FILTERS</span>',
            style: 'border: 1px solid #1A4D8F; padding: 10px; margin: 10px 15px;',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaultType: 'container',
            defaults: {
                layout: 'hbox',
                margin: '0 0 14 0',
                defaults: {
                    labelAlign: 'right',
                    labelStyle: 'font-size: 12px;',
                    fieldStyle: 'text-align: center; font-size: 12px;',
                    margin: '0 8 0 0'
                }
            },
            items: [
                // ================= FILA 1 =================
                {
                    items: [
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbTipoFecha',
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    [1, "Transaction Date"], [2, "Processing Date"]
                                ]
                            }),
                            hidden: true,
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
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                                focus: function (combo) {
                                    combo.expand();
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-searchBy',
                            fieldLabel: 'Search By',
                            labelAlign: 'left',
                            labelWidth: 70,
                            width: 170,
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "Flight Date"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            caseSensitive: false,
                            autoSelect: true,
                            disabled: true,
                            editable: false,
                            value: "",
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all'
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'From',
                            labelWidth: 35,
                            layout: 'hbox',
                            defaults: {margin: '0 0 0 0'},
                            items: [
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
                                    width: 55,
                                    listConfig: {maxHeight: 111, minWidth: 70},
                                    listeners: {
                                        change: 'cbxDateFromYear_changeHandler'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromMonth',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {minWidth: 60},
                                    width: 50,
                                    listeners: {
                                        change: 'cbxDateFromMonth_changeHandler'
                                    }
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateFromDay',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code', displayField: 'name',
                                    emptyText: 'All',
                                    width: 45,
                                    listConfig: {maxHeight: 111, minWidth: 60},
                                    listeners: {
                                        change: 'cbxDateFromDay_changeHandler'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'To',
                            labelWidth: 20,
                            layout: 'hbox',
                            defaults: {margin: '0 0 0 0'},
                            items: [
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
                                    width: 55,
                                    listConfig: {maxHeight: 111, minWidth: 70}
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToMonth',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {minWidth: 60},
                                    width: 50
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbDateToDay',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code',
                                    displayField: 'name',
                                    emptyText: 'All',
                                    width: 45,
                                    listConfig: {maxHeight: 111, minWidth: 60}
                                }
                            ]
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbFlagFlown',
                            fieldLabel: 'Flag Flown',
                            labelWidth: 70,
                            width: 150,
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"], ["P", "Scheduled"], ["C", "Charter"],
                                    ["X", "Canceled"], ["U", "Unscheduled"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            value: "",
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                                keyup: function (combo, e) {
                                    var key = String.fromCharCode(e.getKey());
                                    var filter = /^[a-zA-Z]+$/;
                                    var test_bool = filter.test(key);
                                    if (test_bool) {
                                        combo.doQuery(key);
                                    }
                                },
                                keypress: 'onTextKeypress'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbCarrier',
                            fieldLabel: 'Carrier',
                            labelWidth: 50,
                            width: 150,
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["", "All"], ["AM", "Aeroméxico"],
                                    ["5D", "AM Connect"], ["VW", "Aeromar"]
                                ]
                            }),
                            queryMode: 'local',
                            forceSelection: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            value: "",
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                                keyup: function (combo, e) {
                                    var key = String.fromCharCode(e.getKey());
                                    var filter = /^[a-zA-Z]+$/;
                                    var test_bool = filter.test(key);
                                    if (test_bool) {
                                        combo.doQuery(key);
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtFlight',
                            fieldLabel: 'Flight Number',
                            labelWidth: 90,
                            width: 130,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 4,
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'onTextKeypress'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtTKT',
                            fieldLabel: 'Ticket',
                            labelWidth: 45,
                            width: 145,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 15,
                            enableKeyEvents: true,
                            listeners: {
                                change: 'onValidarChange',
                                keypress: 'BuscarTKT_keyDownHandler'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtROLL',
                            fieldLabel: 'Rolling',
                            labelWidth: 50,
                            width: 90,
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
//                    maxLength: 2,
                            enableKeyEvents: true,
                            listeners: {
//                                change: 'onValidarChange',
                                keypress: 'BuscarTKT_keyDownHandler'
                            }
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Scan Tickets',
                            labelWidth: 80,
                            layout: 'hbox',
                            defaults: {margin: '0 5 0 0'},
                            items: [
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
                                    width: 82,
                                    autoEl: {
                                        tag: 'label',
                                        'data-qtip': 'Format valid YYYY/MM/DD'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    id: prototype.id + '-btnScanTicket',
                                    iconCls: 'prx-icon-update',
                                    tooltip: 'Scan Tickets',
                                    border: true,
                                    listeners: {
                                        click: 'btnScanTicket_clickHandler'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkManifest',
                            boxLabel: '<b>Flight Manifest</b>',
                            checked: false,
                            width: 130,
                            listeners: {
                                change: 'btnSearch_click'
                            }
                        },
                        {
                            xtype: 'checkboxfield',
                            id: prototype.id + '-chkObs',
                            boxLabel: '<b>Obs.</b>',
                            checked: false,
                            width: 80,
                            listeners: {
                                change: 'onChangeChkObs'
                            }
                        }
                    ]
                },
                // ================= FILA 2 =================
                {
                    margin: '0 0 4 0',
                    items: [
                        {
                            xtype: 'form',
                            id: prototype.id + '-form-01',
                            border: false,
                            width: 330,
                            bodyPadding: 0,
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [{
                                    xtype: 'filefield',
                                    id: prototype.id + '-file',
                                    name: 'excelfile',
                                    fieldLabel: 'Update Excel',
                                    allowBlank: true,
                                    accept: '.xlsx, .xls',
                                    labelWidth: 100,
                                    width: 330,
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
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-upload',
                            width: 110,
                            html: '<strong style="color:white;">Update Excel</strong>',
                            style: 'background:#24678D;color:white;font-weight:bold;',
                            border: false,
                            listeners: {
                                click: 'onFileLoad'
                            }
                        },
                        {
                            xtype: 'form',
                            id: prototype.id + '-form-01_INF',
                            border: false,
                            width: 330,
                            bodyPadding: 0,
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [{
                                    xtype: 'filefield',
                                    id: prototype.id + '-file_INF',
                                    name: 'excelfile_INF',
                                    fieldLabel: 'Update INF',
                                    allowBlank: true,
                                    accept: '.xlsx, .xls',
                                    labelWidth: 100,
                                    width: 330,
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
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-upload_INF',
                            width: 110,
                            html: '<strong style="color:white;">Update INF</strong>',
                            style: 'background:#24678D;color:white;font-weight:bold;',
                            border: false,
                            listeners: {
                                click: 'onFileLoad_INF'
                            }
                        },
                        {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Flight Date',
                            labelWidth: 70,
                            layout: 'hbox',
                            defaults: {margin: '0 0 0 0'},
                            items: [
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbAnioContador',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    forceSelection: true,
                                    caseSensitive: true,
                                    editable: false,
                                    valueField: 'code',
                                    displayField: 'name',
                                    width: 55,
                                    listConfig: {maxHeight: 111, minWidth: 70}
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbMesContador',
                                    queryMode: 'local',
                                    triggerAction: 'all',
                                    editable: false,
                                    autoSelect: false,
                                    enableKeyEvents: true,
                                    caseSensitive: true,
                                    valueField: 'code', displayField: 'name',
                                    listConfig: {minWidth: 60},
                                    width: 50
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnActualizarContador',
                            width: 110,
                            html: '<strong style="color:white;">Update Counter</strong>',
                            style: 'background:#24678D;color:white;font-weight:bold;',
                            border: false,
                            listeners: {
                                click: 'btnActualizarContador_click'
                            }
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbControl',
                            fieldLabel: 'Control',
                            labelWidth: 55,
                            width: 165,
                            store: new Ext.data.SimpleStore({
                                fields: ['code', 'name'],
                                data: [
                                    ["ODS", "ODS Control"], ["JSON", "JSON Control"]
                                ]
                            }),
                            queryMode: 'local',
                            allowBlank: true,
                            forceSelection: true,
                            caseSensitive: false,
                            autoSelect: true,
                            editable: false,
                            value: "ODS",
                            typeAhead: true,
                            valueField: 'code', displayField: 'name',
                            enableKeyEvents: true,
                            triggerAction: 'all',
                            listeners: {
                                change: 'changeControl'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnRefresh',
                            icon: 'resources/img/botones/refresh.png',
                            tooltip: 'Refresh',
                            listeners: {
                                click: 'actualizar'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtNENV',
                            width: 30,
                            editable: false
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtDPRDA',
                            width: 100,
                            editable: false
                        }
                    ]
                },
                // ================= FILA 3 =================
                {
                    margin: '0 0 0 0',
                    items: [
                        {
                            xtype: 'form',
                            id: prototype.id + '-form-01_VLO',
                            border: false,
                            width: 330,
                            bodyPadding: 0,
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [{
                                    xtype: 'filefield',
                                    id: prototype.id + '-file_VLO',
                                    name: 'excelfile_VLO',
                                    fieldLabel: 'Cierre de Vuelo',
                                    allowBlank: true,
                                    accept: '.xlsx, .xls',
                                    labelWidth: 100,
                                    width: 330,
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
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-upload_VLO',
                            width: 110,
                            html: '<strong style="color:white;">Process File</strong>',
                            style: 'background:#24678D;color:white;font-weight:bold;',
                            border: false,
                            listeners: {
                                click: 'onClickFileLoad_VLO'
                            }
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.id + '-txtManifestName',
                            fieldStyle: 'text-align: left; font-size: 12px;',
                            fieldLabel: 'Manifest Name',
                            labelAlign: 'left',
                            labelWidth: 100,
                            emptyText: 'e.g. LIM_0019_20260724',
                            enforceMaxLength: true,
                            maskRe: /[A-Za-z0-9_]/,
                            maxLength: 20,
                            width: 330,
                            enableKeyEvents: true,
                            listeners: {
                                change: 'onUpperValue',
                                keypress: 'onManifestNameKeypress'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnLoadManifest',
                            width: 110,
                            html: '<strong style="color:white;">Load Manifest</strong>',
                            style: 'background:#24678D;color:white;font-weight:bold;',
                            border: false,
                            listeners: {
                                click: 'btnLoadManifest_click'
                            }
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelFSabre',
                                    html: 'Scan Sabre:',
                                    hidden: true,
                                    align: 'center',
                                    fieldStyle: 'text-align: center;',
                                    padding: '0 7px 0 0'
                                },
                                {
                                    xtype: 'combo',
                                    id: prototype.id + '-cmbFSabre',
                                    hidden: true,
                                    store: new Ext.data.SimpleStore({
                                        fields: ['code', 'name'],
                                        data: [
                                            ["", "All"], ["0", "Not Found"], ["1", "Found"],
                                            ["2", "Found but not matching coupon"], ["4", "No Revenue(Employes/Oth)"], ["5", "Manual"], ["6", "BPO Found"]
                                        ]
                                    }),
                                    queryMode: 'local',
                                    allowBlank: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    width: 275,
                                    value: "",
                                    typeAhead: true,
                                    valueField: 'code', displayField: 'name',
                                    enableKeyEvents: true,
                                    triggerAction: 'all',
                                    listeners: {
                                        change: 'cmbFSabre_changeHandler'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: prototype.id + '-filter_3',
                            hidden: true,
                            items: [{
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
                                    allowBlank: true,
                                    forceSelection: true,
                                    caseSensitive: false,
                                    autoSelect: true,
                                    editable: false,
                                    labelAlign: 'right',
                                    labelStyle: 'font-size: 12px;',
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
                                }]
                        }
                    ]
                }
            ]
        }
    ]
});
