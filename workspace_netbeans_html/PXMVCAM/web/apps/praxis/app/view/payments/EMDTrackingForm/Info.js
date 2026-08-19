Ext.define('Ext.Praxis.view.payments.EMDTrackingForm.Info', {
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
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1550,
                height: 650,
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
                            border: false,
                            height: 700,
                            width: 1125,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    height: 345,
                                    width: 1125,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Sale<br>Date', dataIndex: 'strFormatDate', width: 80,
                                                listeners: {
                                                    click: 'onGridDetEMD'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-emd-tracking-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                },
                                            },
                                            {text: 'Currency', dataIndex: 'CURRENCY', width: 80},
                                            {text: 'Sale',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tickets', dataIndex: 'QTKTS1', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTKTS1, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'AMOUNT1', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT1, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'EMD',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tickets', dataIndex: 'QTKTEN', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ecf6ce";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTKTEN, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'AMOUNTEN', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ecf6ce";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNTEN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'New',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tickets', dataIndex: 'QTKTNEW', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ffc875";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTKTNEW, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'AMOUNTNEW', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ffc875";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNTNEW, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Flown',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tickets', dataIndex: 'QTKTFLOW', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#9cd2ff";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTKTFLOW, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'AMOUNTFLOW', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#9cd2ff";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNTFLOW, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Aclaration',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tickets', dataIndex: 'QTKTACLA', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTKTACLA, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'AMOUNTCL', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNTCL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Chargeback',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tickets', dataIndex: 'QTKTCHAR', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#9cd2ff";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTKTCHAR, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'AMOUNTCH', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#9cd2ff";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNTCH, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                                //GRAFICO DE BARRAS 
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-panelGraphic',
                                    bodyStyle: 'background-color: #D1E8FE;',
                                    width: 1120,
                                    height: 280,
                                    layout: {
                                        type: 'vbox',
                                        align: 'left',
                                        pack: 'left'
                                    },
                                    defaults: {
                                        bodyStyle: 'background: D1E8FE;',
                                        border: true,
                                        align: 'left',
//                                        margin: "0 0 0 0"  // (top, right, bottom, left)
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            id: prototype.id + '-Box_Decide',
                                            background: '#D1E8FE',
                                            fieldLabel: '',
                                            padding: '5 0 0 920',
                                            horizontal: true,
                                            items: [
                                                {boxLabel: '<strong style="color:#3399FF" >Tickets</strong>', name: 'rd', inputValue: 'TK', width: 80, checked: true},
                                                {boxLabel: '<strong style="color:#3399FF" >Amounts</strong>', name: 'rd', inputValue: 'AM', width: 80},
                                            ],
                                            listeners: {
                                                change: 'decide_ticket_amount'
                                            }
                                        },
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displayEMDTrackingBared1',
                                            width: 1125,
                                            border: false,
                                            hidden: true,
                                            height: 250,
                                            background: '#D1E8FE',
                                            captions: {
                                                title: {
                                                    text: '',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#D1E8FE'
                                            },
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    yField: ['QTKTS1', 'QTKTEN', 'QTKTNEW', 'QTKTFLOW'],
                                                    grid: true,
                                                    title: '',
                                                    renderer: function (obj, value) {
                                                        if (value > 1) {
                                                            if ((value / 1000).toString().length > 3) {
                                                                return  ' ' + Ext.util.Format.number((value / 1000000), '0.0') + 'M';
                                                            } else {
                                                                return  ' ' + Ext.util.Format.number((value / 1000), '0') + 'K';
                                                            }
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    grid: true,
                                                    title: {
                                                        text: '',
                                                        translationX: -30
                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: ['Sales', 'Emd', 'New', 'Flown'],
                                                    xField: 'strFormatDate',
                                                    yField: ['QTKTS1', 'QTKTEN', 'QTKTNEW', 'QTKTFLOW'],
                                                    colors: ['#6DC36D', '#E7D40A', '#E36B2C', '#109DFA'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1000
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            var date = record.get('strFormatDate');
                                                            var data = '';
                                                            if (ctx.field === 'QTKTS1') {
                                                                data = 'Sales';
                                                            } else if (ctx.field === 'QTKTEN') {
                                                                data = 'EMD';
                                                            } else if (ctx.field === 'QTKTNEW') {
                                                                data = 'New';
                                                            } else if (ctx.field === 'QTKTFLOW') {
                                                                data = 'Flown';
                                                            } else if (ctx.field === 'QTKTACLA') {
                                                                data = 'Aclaration';
                                                            } else if (ctx.field === 'QTKTCHAR') {
                                                                data = 'ChargeBack';
                                                            }
                                                            toolTip.setHtml('<b>' + 'Ticket ' + data + ' ' + date + ' : ' + Ext.util.Format.number(record.get(ctx.field), '0,00') + ' qty' + '</b>');
                                                        }
                                                    },
                                                }]
                                        },
                                        {
                                            xtype: 'cartesian',
                                            id: prototype.id + '-displayEMDTrackingBared2',
                                            width: 1125,
                                            border: false,
                                            hidden: true,
                                            height: 250,
                                            background: '#D1E8FE',
                                            captions: {
                                                title: {
                                                    text: '',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#D1E8FE'
                                            },
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    yField: ['AMOUNT1', 'AMOUNTEN', 'AMOUNTNEW', 'AMOUNTFLOW'],
                                                    grid: true,
                                                    title: '',
                                                    renderer: function (obj, value) {
                                                        if (value > 1) {
                                                            if ((value / 1000).toString().length > 3) {
                                                                return  ' ' + Ext.util.Format.number((value / 1000000), '0.0') + 'M';
                                                            } else {
                                                                return  ' ' + Ext.util.Format.number((value / 1000), '0') + 'K';
                                                            }
                                                        } else {
                                                            return '';
                                                        }
                                                    }
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
                                                    grid: true,
                                                    title: {
                                                        text: '',
                                                        translationX: -30
                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: ['Sales', 'Emd', 'New', 'Flown'],
                                                    xField: 'strFormatDate',
                                                    yField: ['AMOUNT1', 'AMOUNTEN', 'AMOUNTNEW', 'AMOUNTFLOW'],
                                                    colors: ['#6DC36D', '#E7D40A', '#E36B2C', '#109DFA'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1000
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            var date = record.get('strFormatDate');
                                                            var data = '';
                                                            if (ctx.field === 'AMOUNT1') {
                                                                data = 'Sales';
                                                            } else if (ctx.field === 'AMOUNTEN') {
                                                                data = 'EMD';
                                                            } else if (ctx.field === 'AMOUNTNEW') {
                                                                data = 'New';
                                                            } else if (ctx.field === 'AMOUNTFLOW') {
                                                                data = 'Flown';
                                                            }
                                                            toolTip.setHtml('<b>' + 'Amount ' + data + ' ' + date + ' : ' + Ext.util.Format.number(record.get(ctx.field), '0,00') + ' USD' + '</b>');
                                                        }
                                                    },
                                                }]
                                        },
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDetEMD',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 650,
                            width: 1155,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetEMD',
                                    height: 640,
                                    width: 1155,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Sale<br>Date', dataIndex: 'strFormatDate2', width: 90,
                                                listeners: {
                                                    click: 'onGridDetEMDTicket'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-emd-tracking-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                },
                                            },
                                            {text: 'Currency', dataIndex: 'CURRENCY', width: 90},
                                            {text: 'Sale',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tickets', dataIndex: 'QTKTS1', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTKTS1, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'AMOUNT1', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetEMD').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT1, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'EMD',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tickets', dataIndex: 'QTKTEN', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ecf6ce";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetEMD').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTKTEN, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'AMOUNTEN', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ecf6ce";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetEMD').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNTEN, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'New',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tickets', dataIndex: 'QTKTNEW', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ffc875";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetEMD').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTKTNEW, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'AMOUNTNEW', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#ffc875";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetEMD').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNTNEW, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Flown',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tickets', dataIndex: 'QTKTFLOW', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#9cd2ff";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetEMD').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTKTFLOW, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'AMOUNTFLOW', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#9cd2ff";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetEMD').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNTFLOW, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Aclaration',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tickets', dataIndex: 'QTKTACLA', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetEMD').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTKTACLA, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'AMOUNTCL', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetEMD').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNTCL, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Chargeback',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Tickets', dataIndex: 'QTKTCHAR', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#9cd2ff";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetEMD').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTKTCHAR, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'AMOUNTCH', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#9cd2ff";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetEMD').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNTCH, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            }
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 7, height: 10},
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDetEMDTicket',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 600,
                            width: 1395,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetEMDTicket',
//                                    height: 520,
                                    height: 'auto',
                                    width: 1395,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Sale',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Ticket', dataIndex: 'strTicket', width: 120,
                                                        listeners: {
                                                            click: 'viewTicket'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            metaData.style = "text-align:center;background-color:#d5f4d5";
                                                            return '<a href="#payments-emd-tracking-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Agent', dataIndex: 'AGENTE', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Currency', dataIndex: 'CURRENCY', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Amount', dataIndex: 'VFOP', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataDetEMDTicket').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totVFOP, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Status Cpn',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: '1', dataIndex: 'STUSO1', width: 30,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: '2', dataIndex: 'STUSO2', width: 30,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: '3', dataIndex: 'STUSO3', width: 30,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: '4', dataIndex: 'STUSO4', width: 30,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5";
                                                                    return value;
                                                                },
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                            {text: 'Issued',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Doc.<br>Type', dataIndex: 'strDesc1', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Trace<br>EMD', dataIndex: 'TRACE', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Ticket', dataIndex: 'strDesc', width: 120,
                                                        listeners: {
                                                            click: 'viewTicket2'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            value = '<b>' + value + '</b>';
                                                            metaData.style = "text-align:center";
                                                            return '<a href="#payments-emd-tracking-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        }
                                                    },
                                                    {text: 'Date', dataIndex: 'strFormatDate6', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Status Cpn',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: '1', dataIndex: 'STUSON', width: 30,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: '2', dataIndex: 'STUSON2', width: 30,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: '3', dataIndex: 'STUSON3', width: 30,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: '4', dataIndex: 'STUSON4', width: 30,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center";
                                                                    return value;
                                                                },
                                                            }
                                                        ]
                                                    },
                                                    {text: 'Message', dataIndex: 'MSGERR', width: 130,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Bank Information',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Date', dataIndex: 'strFormatDate5', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#d5f4d5";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Status', dataIndex: 'desSTVALB', width: 120,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center;background-color:#B2DAFA";
                                                                    return value;
                                                                },
                                                            },
                                                            {text: 'Transaction<br>Date', dataIndex: 'strFormatDate4', width: 90,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:center";
                                                                    return value;
                                                                },
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                                {xtype: 'tbspacer', width: 7, height: 10},
                            ]
                        },
                        // --------------------------   GRID LOG DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataLog',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: false,
                            height: 700,
                            width: 1125,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataLog',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    height: 345,
                                    width: 900,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Process<br>Date', dataIndex: 'strFormatDate', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Qty', dataIndex: 'QTY', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataLog').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totQTY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Amount', dataIndex: 'SVFOPUSD', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataLog').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totSVFOPUSD, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Bank Notification',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Aclarations', dataIndex: 'ACLARAC', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataLog').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totACLARAC, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'ChargeBack',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Qty', dataIndex: 'CHGBACK', width: 100,
                                                                listeners: {
                                                                    click: 'onGridDetTicketLogChar'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<a href="#payments-emd-tracking-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataLog').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totCHGBACK, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'USD', dataIndex: 'CHGBACK_AMT', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataLog').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totCHGBACK_AMT, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Reverse ChargeBack',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: 'Qty', dataIndex: 'REVERSE', width: 100,
                                                                listeners: {
                                                                    click: 'onGridDetTicketLogRChar'
                                                                },
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5";
                                                                    value = Ext.util.Format.number(value, '0,000');
                                                                    return '<a href="#payments-emd-tracking-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataLog').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totREVERSE, '0,000') + '<b>';
                                                                }
                                                            },
                                                            {text: 'USD', dataIndex: 'REVERSE_AMT', width: 100,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#d5f4d5";
                                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                                    return value;
                                                                },
                                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                                    var data = Ext.getCmp(prototype.id + '-gridDataLog').getStore().getData().items[0].data;
                                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                                    return '<b>' + Ext.util.Format.number(data.totREVERSE_AMT, '0,000.00') + '<b>';
                                                                }
                                                            },
                                                        ]
                                                    },
                                                    {text: 'Others', dataIndex: 'OTHER', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetTicketLogOChar'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<a href="#payments-emd-tracking-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataLog').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totOTHER, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDetTicketLog',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: false,
                            height: 700,
                            width: 1535,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataDetTicketLog',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    height: 680,
                                    width: 1530,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Ticket', dataIndex: 'strTicket', width: 120,
                                                listeners: {
                                                    click: 'viewTicket'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    metaData.style = "text-align:center;background-color:#d5f4d5";
                                                    return '<a href="#payments-emd-tracking-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Sale<br>Date', dataIndex: 'strFormatDate1', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Status', dataIndex: 'STVAL', width: 50,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Bank<br>Date', dataIndex: 'strFormatDate2', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Bank<br>Code', dataIndex: 'CODEBANK', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Card<br>Code', dataIndex: 'SCARCOD', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Card Number', dataIndex: 'CARDNBR', width: 150,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Auth', dataIndex: 'AUTHNBR', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Curr.', dataIndex: 'MFOP', width: 70,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Amount', dataIndex: 'VFOP', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#d5f4d5";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
//                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetTicketLog').getStore().getData().items[0].data;
//                                                    metaData.style = 'text-align:right; margin-right:3px ';
//                                                    return '<b>' + Ext.util.Format.number(data.totVFOP, '0,000.00') + '<b>';
//                                                }
                                            },
                                            {text: 'Status Cpn',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: '1', dataIndex: 'strDescUsoCpn1', width: 30,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5";
                                                            return value;
                                                        },
                                                    },
                                                    {text: '2', dataIndex: 'strDescUsoCpn2', width: 30,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5";
                                                            return value;
                                                        },
                                                    },
                                                    {text: '3', dataIndex: 'strDescUsoCpn3', width: 30,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5";
                                                            return value;
                                                        },
                                                    },
                                                    {text: '4', dataIndex: 'strDescUsoCpn4', width: 30,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5";
                                                            return value;
                                                        },
                                                    }
                                                ]
                                            },
                                            {text: 'Passenger', dataIndex: 'PAX', width: 230,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },
                                            },
                                            {text: 'Msj Error', dataIndex: 'MSGERR', width: 230,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:left;";
                                                    return value;
                                                },
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    width: 1132,
                    hidden: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    items: [
                        {
                            xtype: 'panel',
                            width: 1132,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults: {
                                xtype: 'label'
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
                },
                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);


