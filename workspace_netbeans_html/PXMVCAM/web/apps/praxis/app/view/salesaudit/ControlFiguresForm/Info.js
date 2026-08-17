/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Ext.Praxis.view.salesaudit.ControlFiguresForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            id: prototype.id + '-regionCenterGrid01',
            //width: 1550,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------

                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            margin: '1',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            border: false,
                            frame: false,
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelGridContainer',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    border: false,
                                    frame: false,
                                    bodyStyle: 'background-color: #E3EAEF; border:none;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelGridData2',
                                            flex: 4, // ancho proporcional
                                            border: false,
                                            frame: false,
                                            bodyStyle: 'background-color: #E3EAEF; border:none;',
                                            layout: {
                                                type: 'fit',
                                                align: 'center'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: prototype.id + '-labelTitle1',
                                                    labelAlign: 'center',
                                                    labelStyle: 'color:#231223',
                                                    align: 'center',
                                                    margin: '10 0 0 0',
                                                    hide: true
                                                },
                                                {
                                                    xtype: 'grid',
                                                    padding: '10 0 0 0',
                                                    id: prototype.id + '-gridData',
                                                    border: false,
                                                    frame: false,
                                                    bodyStyle: 'background-color: #E3EAEF; border:none;',
                                                    height: 550,
                                                    width: 1200, // ajusta si quieres más ancho
                                                    columnLines: true,
                                                    resizable: false,
                                                    columns: {
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: true,
                                                            resizable: false,
                                                            align: 'center'
                                                        },
                                                        items: [
                                                            {text: 'Processing <br>Date', width: 80, dataIndex: 'FECPRO'},
                                                            {text: 'System Date', width: 85, dataIndex: 'FECSYS'},
                                                            {text: 'Accounting <br>Date', width: 85, dataIndex: 'FECPRO'},
                                                            {text: 'Memo', width: 80, dataIndex: 'QTYSAMEMO', //renderer: 'getInt',
                                                                summaryType: 'sum',
                                                                summaryRenderer: function (value,summaryData, dataIndex, metaData, record) {
                                                                    metaData.style = "text-align:center;font-weight:bold;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            },
                                                            {text: 'Tickets QTY',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [

                                                                    {text: 'Praxis', width: 80, dataIndex: 'QTYPXFA', renderer: 'getInt',
                                                                        summaryType: 'sum',
                                                                        summaryRenderer: function (value,summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;font-weight:bold;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        }},
                                                                    {text: 'Sales Audit',
                                                                        defaults: {
                                                                            menuDisabled: true,
                                                                            sortable: true,
                                                                            align: 'center',
                                                                            border: true
                                                                        },
                                                                        columns: [
                                                                            {text: 'Processed', width: 80, dataIndex: 'QTYSAFAPR', renderer: 'getInt',
                                                                                summaryType: 'sum',
                                                                                summaryRenderer: function (value,summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;font-weight:bold;";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                }},
                                                                            {text: 'Void', width: 70, dataIndex: 'QTYSAFAVO', renderer: 'getInt',
                                                                                summaryType: 'sum',
                                                                                summaryRenderer: function (value,summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;font-weight:bold;";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                }},
                                                                            {text: 'Exonerated(*)', width: 90, dataIndex: 'QTYSAFAEX', renderer: 'getInt',
                                                                                summaryType: 'sum',
                                                                                summaryRenderer: function (value,summaryData, dataIndex, metaData, record) {
                                                                                    metaData.style = "text-align:right;font-weight:bold;";
                                                                                    return Ext.util.Format.number(value, '0,000');
                                                                                }}
                                                                        ]
                                                                    },
                                                                    {text: 'Difference', width: 80, dataIndex: 'DIFFARE', renderer: 'getInt',
                                                                        summaryType: 'sum',
                                                                        summaryRenderer: function (value,summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;font-weight:bold;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        }}
                                                                ]
                                                            },
                                                            {text: 'Tax QTY',
                                                                defaults: {
                                                                    menuDisabled: true,
                                                                    sortable: true,
                                                                    align: 'center',
                                                                    border: true
                                                                },
                                                                columns: [
                                                                    {text: 'Praxis', width: 80, dataIndex: 'QTYPXTX', renderer: 'getInt',
                                                                    summaryType: 'sum',
                                                                        summaryRenderer: function (value,summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;font-weight:bold;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        }},
                                                                    {text: 'Sales Audit<br>Processed', width: 80, dataIndex: 'QTYSATX', renderer: 'getInt',
                                                                    summaryType: 'sum',
                                                                        summaryRenderer: function (value,summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;font-weight:bold;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        }},
                                                                    {text: 'Difference', width: 80, dataIndex: 'DIFTAX', renderer: 'getInt',
                                                                    summaryType: 'sum',
                                                                        summaryRenderer: function (value,summaryData, dataIndex, metaData, record) {
                                                                            metaData.style = "text-align:right;font-weight:bold;";
                                                                            return Ext.util.Format.number(value, '0,000');
                                                                        }}
                                                                ]
                                                            },
                                                            {text: 'Formatting <br> Status', width: 95, dataIndex: 'FLAGF',
                                                                renderer: function (value, metaData, record) {
                                                                    var background = record.data['FLAGF'] === '1' ? '99FFCC' : record.data['FLAGF'] === '2' ? 'FF0000' : 'FBD705';
                                                                    var texto = record.data['FLAGF'] === '0' ? 'Pending' : record.data['FLAGF'] === '1' ? 'Ok' : record.data['FLAGF'] === 'X' ? 'Processing' : 'Error';
                                                                    metaData.style = 'background:#' + background + ';';
                                                                    return texto;
                                                                }
                                                            },
                                                            {text: 'Audit Process <br> Status', width: 95, dataIndex: 'FLAGD',
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    var background = record.data['FLAGD'] === '1' ? '99FFCC' : record.data['FLAGF'] === '2' ? 'FF0000' : 'FBD705';
                                                                    var texto = record.data['FLAGD'] === '0' ? 'Pending' : record.data['FLAGF'] === '1' ? 'Ok' : record.data['FLAGF'] === 'X' ? 'Processing' : 'Error';
                                                                    metaData.style = 'background:#' + background + ';';
                                                                    return texto;
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    features: [
                                                        {
                                                            ftype: 'summary' // Agrega la característica de resumen al grid
                                                        }
                                                    ]
                                                }
                                            ]
                                        },

                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-panelResumen',
                                            title: 'Resumen',
                                            flex: 1.7,
                                            height: 500,
                                            padding: '10 0 0 0',
                                            autoScroll: true,
                                            border: false,
                                            frame: false,
                                            width: 400,
                                            bodyStyle: 'background-color: #FFFFFF; border:none;',
                                            layout: 'vbox',

                                            items: [
                                                // 🔹 Bloque 1
                                                {
                                                    xtype: 'panel',
                                                    width: '100%',
                                                    layout: 'vbox',
                                                    id: prototype.id + '-gridVentas',
                                                    hidden: true,
//                                                    margin: '2 2 2 0',
                                                    border: false,
                                                    frame: false,
                                                    bodyStyle: 'background-color: #FFFFFF; border:none;',
                                                    padding: '0 10 0 10',
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            frame: false,
                                                            bodyStyle: 'background-color: #FFFFFF; border:none;',
                                                            width: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'VENTAS:',
                                                                    width: 100,
                                                                    style: 'font-weight: bold; padding-top: 5px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-TOTALVENTAS',
//                                                                    fieldLabel: 'TOTAL',
                                                                    value: '0.00',
                                                                    labelWidth: 60,
//                                                                    margin: '5 0 0 10',
                                                                    width: 160
                                                                }
                                                            ]
                                                        },
//                                                       
                                                        {
                                                            xtype: 'grid',
                                                            height: 140,
                                                            width: '100%',
                                                            align: 'center',
                                                            store: Ext.create('Ext.data.Store', {
                                                                fields: ['BSP', 'ARC', 'ASR', 'MANUAL']
                                                            }),
                                                            columns: [
                                                                {text: '', dataIndex: 'TRX', width: 60,
                                                                    renderer: function (value, meta, record, rowIndex) {
//                                                                        var labels = ['EXCH', 'SALE', 'RFND', 'RFTX'];
                                                                        meta.style = "background-color:#F0F0F0; font-weight:bold;";
//                                                                        return labels[rowIndex];
                                                                        return value || '';
                                                                    },
                                                                    summaryRenderer: function (value, summaryData, dataIndex) {
                                                                        return 'TOTAL';
                                                                    }},
                                                                // Columnas de datos
                                                                {text: 'BSP', dataIndex: 'BSP', flex: 1, summaryType: 'sum', align: 'right',
                                                                    renderer: function (value) {
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    },
                                                                    summaryRenderer: function (value) {
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    }},
                                                                {text: 'ARC', dataIndex: 'ARC', flex: 1, summaryType: 'sum', align: 'right',
                                                                    renderer: function (value) {
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    },
                                                                    summaryRenderer: function (value) {
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    }},
                                                                {text: 'ASR', dataIndex: 'ASR', flex: 1, summaryType: 'sum', align: 'right',
                                                                    renderer: function (value) {
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    },
                                                                    summaryRenderer: function (value) {
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    }},
                                                                {text: 'MANUAL', dataIndex: 'MANUAL', flex: 1, summaryType: 'sum', align: 'right',
                                                                    renderer: function (value) {
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    },
                                                                    summaryRenderer: function (value) {
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    }},
                                                                {text: 'TOTAL', dataIndex: 'total', flex: 1, align: 'right', renderer: function (value, meta, record) {
                                                                        var sum = record.get('BSP') + record.get('ARC') + record.get('ASR') + record.get('MANUAL');
                                                                        meta.tdCls = 'x-grid-cell-special';
                                                                        meta.style = "background-color:#D9EDF7;font-weight:bold;";
//                                                                        return sum;

                                                                        return Ext.util.Format.number(sum, '0,000')

                                                                    }, }
                                                            ],
                                                            features: [
                                                                {
                                                                    ftype: 'summary',
                                                                    dock: 'bottom'
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                },

                                                {xtype: 'component', html: '<hr style="border:1px solid #ccc; margin:10px 0;">'},

                                                // 🔹 Bloque 2
                                                {
                                                    xtype: 'panel',
                                                    width: '100%',
                                                    layout: 'vbox',
                                                    id: prototype.id + '-gridAuditoria',
                                                    hidden: true,
//                                                    margin: '2 2 2 0',
                                                    border: false,
                                                    frame: false,
                                                    bodyStyle: 'background-color: #FFFFFF; border:none;',
                                                    padding: '0 10 0 10',
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            frame: false,
                                                            bodyStyle: 'background-color: #FFFFFF; border:none;',
                                                            width: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'AUDITORIA:',
                                                                    width: 100,
                                                                    style: 'font-weight: bold; padding-top: 5px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-TOTALAUDITORIA',
//                                                                    fieldLabel: 'TOTAL',
                                                                    value: '0.00',
                                                                    labelWidth: 60,
//                                                                    margin: '5 0 0 10',
                                                                    width: 160
                                                                }
                                                            ]
                                                        },
//                                                       
                                                        {
                                                            xtype: 'grid',
                                                            height: 140,
                                                            width: '100%',
                                                            align: 'center',
                                                            store: Ext.create('Ext.data.Store', {
                                                                fields: ['BSP', 'ARC', 'ASR', 'MANUAL']
                                                            }),
                                                            columns: [
                                                                {text: '', dataIndex: 'TRX', width: 60, renderer: function (value, meta, record, rowIndex) {
//                                                                        var labels = ['EXONERATED', 'VOID'];
                                                                        meta.style = "background-color:#F0F0F0; font-weight:bold;";
//                                                                        return labels[rowIndex];
                                                                        return value || '';
                                                                    },
                                                                    summaryRenderer: function (value, summaryData, dataIndex) {
                                                                        return 'TOTAL';
                                                                    }},
                                                                // Columnas de datos
                                                                {text: 'BSP', dataIndex: 'BSP', flex: 1, summaryType: 'sum', align: 'right',
                                                                    renderer: function (value) {
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    },
                                                                    summaryRenderer: function (value) {
//                                                                        return value
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    }},
                                                                {text: 'ARC', dataIndex: 'ARC', flex: 1, summaryType: 'sum', align: 'right',
                                                                    renderer: function (value) {
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    },
                                                                    summaryRenderer: function (value) {
//                                                                        return value;
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    }},
                                                                {text: 'ASR', dataIndex: 'ASR', flex: 1, summaryType: 'sum', align: 'right',
                                                                    renderer: function (value) {
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    },
                                                                    summaryRenderer: function (value) {
//                                                                        return value;
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    }},
                                                                {text: 'MANUAL', dataIndex: 'MANUAL', flex: 1, summaryType: 'sum', align: 'right',
                                                                    renderer: function (value) {
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    },
                                                                    summaryRenderer: function (value) {
//                                                                        return value;
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    }},
                                                                {text: 'TOTAL', dataIndex: 'total', flex: 1, align: 'right', renderer: function (value, meta, record) {
                                                                        var sum = record.get('BSP') + record.get('ARC') + record.get('ASR') + record.get('MANUAL');
                                                                        meta.tdCls = 'x-grid-cell-special';
                                                                        meta.style = "background-color:#D9EDF7;font-weight:bold;";
//                                                                        return sum;
                                                                        return Ext.util.Format.number(sum, '0,000')
                                                                    }, }
                                                            ],
                                                            features: [
                                                                {
                                                                    ftype: 'summary',
                                                                    dock: 'bottom'
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                },

                                                {xtype: 'component', html: '<hr style="border:1px solid #ccc; margin:10px 0;">'},

                                                // 🔹 Bloque 3
                                                {
                                                    xtype: 'panel',
                                                    width: '100%',
                                                    layout: 'vbox',
                                                    id: prototype.id + '-gridRestante',
                                                    hidden: true,
//                                                    margin: '2 2 2 0',
                                                    border: false,
                                                    frame: false,
                                                    bodyStyle: 'background-color: #FFFFFF; border:none;',
                                                    padding: '0 10 0 10',
                                                    items: [
                                                        {
                                                            xtype: 'panel',
                                                            layout: 'hbox',
                                                            border: false,
                                                            frame: false,
                                                            bodyStyle: 'background-color: #FFFFFF; border:none;',
                                                            width: '100%',
                                                            items: [
                                                                {
                                                                    xtype: 'label',
                                                                    text: 'RESTANTE:',
                                                                    width: 100,
                                                                    style: 'font-weight: bold; padding-top: 5px;'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    id: prototype.id + '-TOTALRESTANTE',
//                                                                    fieldLabel: 'TOTAL',
                                                                    value: '0.00',
                                                                    labelWidth: 60,
//                                                                    margin: '5 0 0 10',
                                                                    width: 160
                                                                }
                                                            ]
                                                        },
//                                                       
                                                        {
                                                            xtype: 'grid',
                                                            height: 95,
                                                            width: '100%',
                                                            align: 'center',
                                                            store: Ext.create('Ext.data.Store', {
                                                                fields: ['BSP', 'ARC', 'ASR', 'MANUAL']
                                                            }),
                                                            columns: [
                                                                {text: '', dataIndex: 'TRX', width: 100, renderer: function (value, meta, record, rowIndex) {
//                                                                        var labels = ['EXCH', 'SALE', 'RFND', 'RFTX'];
                                                                        meta.style = "background-color:#F0F0F0; font-weight:bold;";
//                                                                        return labels[rowIndex];
                                                                        return value || '';
                                                                    },
                                                                    summaryRenderer: function (value, summaryData, dataIndex) {
                                                                        return 'TOTAL';
                                                                    }},
                                                                // Columnas de datos
                                                                {text: 'BSP', dataIndex: 'BSP', flex: 1, summaryType: 'sum', align: 'right',
                                                                    renderer: function (value) {
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    },
                                                                    summaryRenderer: function (value) {
//                                                                        return value;
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    }},
                                                                {text: 'ARC', dataIndex: 'ARC', flex: 1, summaryType: 'sum', align: 'right',
                                                                    renderer: function (value) {
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    },
                                                                    summaryRenderer: function (value) {
//                                                                        return value;
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    }},
                                                                {text: 'ASR', dataIndex: 'ASR', flex: 1, summaryType: 'sum', align: 'right',
                                                                    renderer: function (value) {
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    }, summaryRenderer: function (value) {
//                                                                        return value;
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    }},
                                                                {text: 'MANUAL', dataIndex: 'MANUAL', flex: 1, summaryType: 'sum', align: 'right',
                                                                    renderer: function (value) {
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    },
                                                                    summaryRenderer: function (value) {
//                                                                        return value;
                                                                        return Ext.util.Format.number(value, '0,000')
                                                                    }},
                                                                {text: 'TOTAL', dataIndex: 'total', flex: 1, align: 'right', renderer: function (value, meta, record) {
                                                                        var sum = record.get('BSP') + record.get('ARC') + record.get('ASR') + record.get('MANUAL');
                                                                        meta.tdCls = 'x-grid-cell-special';
                                                                        meta.style = "background-color:#D9EDF7;font-weight:bold;";
//                                                                        return sum;
                                                                        return Ext.util.Format.number(sum, '0,000')

                                                                    }, }
                                                            ],
                                                            features: [
                                                                {
                                                                    ftype: 'summary',
                                                                    dock: 'bottom'
                                                                }
                                                            ]
                                                        }

                                                    ]
                                                },
                                            ]
                                        }

                                    ]
                                },
                                {
                                    xtype: 'panel',
//                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    frame: false,
                                    bodyStyle: 'background-color: #E3EAEF; border:none;',
                                    padding: '0',
                                    margin: '10 0 0 0',
                                    width: 1672,
                                    layout: {
                                        type: 'vbox',
                                        align: 'top'
                                    },
                                    items: [
                                        {
                                            xtype: 'textareafield',
                                            grow: true,
                                            anchor: '100%',
                                            id: prototype.id + '-txaReference',
                                            required: true,
                                            readOnly: true,
                                            fieldLabel: '',
                                            width: 580,
                                            labelWidth: 0,
                                            labelAlign: 'left',
                                            padding: '0'
                                        }
                                    ]
                                }
                            ]
                        }


                    ]
                },
                /** PAGINATION LABELS*/
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true,
                        padding: '0px 1px 0px 1px'
                    },
                    padding: '1px 1px 1px 1px',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelPie',
                            width: 1672,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults: {
                                xtype: 'label',
                                margin: '3px 0px 0px 5px'
                            },
                            items: [
                                {
                                    text: 'Page',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id + '-lbl-total',
                                    text: '0',
                                    width: 50
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
}
);

