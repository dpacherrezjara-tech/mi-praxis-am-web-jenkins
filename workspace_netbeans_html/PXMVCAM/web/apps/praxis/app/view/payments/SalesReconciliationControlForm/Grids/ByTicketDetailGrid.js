Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByTicketDetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-ByTicketDetailGrid',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.ByTicketDetailGridController',
        'Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TicketConciliationDataEntry'
    ],
    controller: 'ByTicketDetailGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: prototype.width,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false,
        listeners: {
            refresh: function (dataview) {
                Ext.each(dataview.panel.columns, function (column) {
                    if (column.autoSizeColumn === true)
                        column.autoSize();
                });
            }
        }
    },
    columnLines: true,
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            //<editor-fold defaultstate="collapsed" desc="Detail Cols">
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 40,
                text: 'Edit',
                locked: true,
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-detail',
                        tooltip: 'Open Detail',
                        handler: 'onClickTicket'
                    }
                ]
            },
            {text: 'Sale<br>Date', dataIndex: 'a4496FECVT', width: 75},
            {text: 'IATA', dataIndex: 'a4496AGENT', width: 80},
            {text: 'Src', dataIndex: 'a4496FUENT', width: 50},
            {text: 'Channel', dataIndex: 'a4496SFUEN', width: 60},
            {text: 'Country', dataIndex: 'a4496PAIS', width: 60},
            {text: 'Agent', dataIndex: 'a4496CODAG', width: 80},
            {text: 'Trnx', dataIndex: 'a4496TRNCU', width: 60},
            {text: 'Doc.<br>Type', dataIndex: 'a4496TIPOD', width: 60},
            {text: 'Void', dataIndex: 'a4496TKVOI', width: 45},
            {text: 'RFIC', dataIndex: 'a4496RFIC', width: 55},
            {text: 'RFIS', dataIndex: 'a4496RFIS1', width: 55},
            {text: 'Pax Name', dataIndex: 'a4496PAX', minWidth: 180, width: 180, autoSizeColumn: true},
            {
                text: 'Ticket', width: 130,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    metaData.style = "text-align:center;background-color:#FCF6DC;font-weight:bold;";
                    const {a4496CIA, a4496FORMA, a4496SERIE} = record.data;
                    return `${a4496CIA + a4496FORMA + a4496SERIE}`;
                }
            },
            {
                text: 'PNR', width: 65, dataIndex: 'a4496PNR',
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    metaData.style = "text-align:center;background-color:#FCF6DC;font-weight:bold;";
                    return value;
                }
            },
            {text: 'Payment Information',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = "text-align:center;background-color:#B2DAFA";
                        return value;
                    }
                },
                columns: [
                    {text: 'Card<br>Code', dataIndex: 'a4501TTARJ', width: 55},
                    {text: 'Card Number', dataIndex: 'a4501NREF', width: 130},
                    {text: 'Auth<br>Number', dataIndex: 'a4501CAPL', width: 60},
                    {text: 'Amount', dataIndex: 'a4501VFOP', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Curr.', dataIndex: 'a4501MFOP', width: 60}
                ]
            },
            {text: 'Conciliation Information',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                        metaData.style = "text-align:center;background-color:#F0D094;";
                        return value;
                    }
                },
                columns: [
                    {text: 'Expected<br>Date', dataIndex: 'procdate', width: 80},
                    {text: 'Payment<br>Date', dataIndex: 'paydate', width: 80},
                    {text: 'Difference', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#F0D094;";
                            const fecha1Str = record.data.paydate;
                            const fecha2Str = record.data.procdate; // Puedes dejar esto como una cadena vacía o null

                            if (!fecha2Str || !fecha1Str) {
                                value = 0;
                            } else {
                                const fecha1 = new Date(
                                        parseInt(fecha1Str.substring(0, 4)),
                                        parseInt(fecha1Str.substring(4, 6)) - 1,
                                        parseInt(fecha1Str.substring(6, 8))
                                        );

                                const fecha2 = new Date(
                                        parseInt(fecha2Str.substring(0, 4)),
                                        parseInt(fecha2Str.substring(4, 6)) - 1,
                                        parseInt(fecha2Str.substring(6, 8))
                                        );

                                if (isNaN(fecha1.getTime()) || isNaN(fecha2.getTime())) {
                                    value = 0;
                                } else {
                                    const diferenciaEnMilisegundos = fecha1 - fecha2;
                                    const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

                                    value = diferenciaEnDias;
                                }
                            }
                            return value;
                        }
                    },
                    {text: 'Processing<br>Date', dataIndex: 'a4501PRDA', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                            return value;
                        }
                    },
                    {text: 'Status', dataIndex: 'a4501STVAL', minWidth: 100, width: 100, autoSizeColumn: true,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                            const opts = {
                                '0': 'Stand By',
                                '1': 'Match',
                                '2': 'Sales Without Settl.',
                                '3': 'Settl. Without Sales',
                                '4': 'Match Parcial',
                                '5': 'Match Manual',
                                '6': 'Match Forzado',
                                '7': 'Match por Compensacion',
                                '8': 'Match Transaccional',
                                '9': 'Match Void'
                            };
                            return opts[value] || '';
                        }
                    },
                    {text: 'User<br>Update', dataIndex: 'a4501USUP', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                            return value;
                        }
                    },
                    {text: 'Date<br>Update', dataIndex: 'a4501FEUP', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                            return value;
                        }
                    },
                    {text: 'Processor', dataIndex: 'desc_PROCTYPE', width: 120},
                    {text: 'Chargeback<br>Status', dataIndex: 'chargeback', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#F0D094;";
                            const opts = {
                                'N': 'None',
                                '': 'Pending Rev.',
                                'Y': 'Reversed'
                            };
                            return opts[value.trim()];
                        }
                    },
                    {text: 'ADM<br>Status', dataIndex: 'a4501STADM', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#F0D094;";
                            return value.trim() === '' ? '' : 'Suggested';
                        }
                    }
                ]
            }
            //</editor-fold>
        ]
    },
    tbar: {
        layout: {
            pack: 'end'
        },
        defaults: {
            scale: 'medium'
        },
        items: [
            {
                xtype: 'button',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export to Excel',
                listeners: {
                    click: 'downloadExcel'
                }
            },
            {
                xtype: 'button',
                id: prototype.id + '-backButtonDetail-2',
                scale: 'small',
                iconCls: 'prx-icon-back',
                width: 25,
                tooltip: 'Back to Summary',
                listeners: {
                    click: function (btn) {
                        const panel = btn.up().up().up();
                        const views = panel.items.items;
                        views.at(-1).destroy();
                        views.at(-1).show();
                    }
                }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});


