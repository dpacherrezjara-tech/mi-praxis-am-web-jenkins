Ext.define('Ext.Praxis.view.payments.SabreTicketStatusForm.Grids.SabreTicketStatusGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-SabreTicketStatusGrid',
    requires: [
        'Ext.Praxis.controller.payments.SabreTicketStatus.SabreTicketStatusGridController'
    ],
    controller: 'SabreTicketStatusGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: 1700,
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
            // {
            //     sortable: false,
            //     xtype: 'actioncolumn',
            //     width: 40,
            //     text: 'Edit',
            //     locked: true,
            //     align: 'center',
            //     items: [
            //         {
            //             iconCls: 'prx-icon-detail',
            //             tooltip: 'Open Detail',
            //             handler: 'onClickTicket'
            //         }
            //     ]
            // },
            { text: 'Sale<br>Date', dataIndex: 'A4496FECVT', width: 75 },
            { text: 'IATA', dataIndex: 'A4496AGENT', width: 80 },
            { text: 'Src', dataIndex: 'A4496FUENT', width: 50 },
            { text: 'Channel', dataIndex: 'A4496SFUEN', width: 60 },
            { text: 'Country', dataIndex: 'A4496PAIS', width: 60 },
            { text: 'Agent', dataIndex: 'A4496CODAG', width: 80 },
            { text: 'Trnx', dataIndex: 'A4496TRNCU', width: 60 },
            { text: 'Doc.<br>Type', dataIndex: 'A4496TIPOD', width: 60 },
            { text: 'Void', dataIndex: 'A4496TKVOI', width: 45 },
            { text: 'RFIC', dataIndex: 'A4496RFIC', width: 55 },
            { text: 'RFIS', dataIndex: 'A4496RFIS1', width: 55 },
            { text: 'Pax Name', dataIndex: 'A4496PAX', minWidth: 180, width: 180, autoSizeColumn: true },
            {
                text: 'Ticket', width: 130,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    metaData.style = "text-align:center;background-color:#FCF6DC;font-weight:bold;";
                    const { A4496CIA, A4496FORMA, A4496SERIE } = record.data;
                    return `${A4496CIA + A4496FORMA + A4496SERIE}`;
                }
            },
            {
                text: 'PNR', width: 65, dataIndex: 'A4496PNR',
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    metaData.style = "text-align:center;background-color:#FCF6DC;font-weight:bold;";
                    return value;
                }
            },
            {
                text: 'Payment Information',
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
                    { text: 'Card<br>Type', dataIndex: 'CARDTYPE', width: 55 },
                    { text: 'Card<br>Code', dataIndex: 'A4501TTARJ', width: 55 },
                    { text: 'Card Number', dataIndex: 'A4501NREF', width: 130 },
                    { text: 'Auth<br>Number', dataIndex: 'A4501CAPL', width: 60 },
                    {
                        text: 'Amount', dataIndex: 'A4501VFOP', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#B2DAFA";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    { text: 'Curr.', dataIndex: 'A4501MFOP', width: 60 }
                ]
            },
            {
                text: 'Conciliation Information',
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
                    {
                        text: 'Reconciliation<br>Amount', dataIndex: 'RECONCILIATION_AMOUNT', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#F0D094";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {
                        text: 'Difference<br>Amount', dataIndex: 'DIFFERENCE_AMOUNT', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;background-color:#F0D094";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    { text: 'Expected<br>Date', dataIndex: 'PROCDATE', width: 80 },
                    { text: 'Payment<br>Date', dataIndex: 'PAYDATE', width: 80 },
                    {
                        text: 'Difference', dataIndex: 'DIFFERENCE_DAYS', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#F0D094;";

                            return value;
                        }
                    },
                    {
                        text: 'Processing<br>Date', dataIndex: 'A4501PRDA', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                            return value;
                        }
                    },
                    {
                        text: 'Status', dataIndex: 'STVAL_DESCRIPTION', minWidth: 100, width: 100, autoSizeColumn: true,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                            return value || '';
                        }
                    },
                    {
                        text: 'User<br>Update', dataIndex: 'A4501USUP', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                            return value;
                        }
                    },
                    {
                        text: 'Date<br>Update', dataIndex: 'A4501FEUP', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                            return value;
                        }
                    },
                    { text: 'Processor', dataIndex: 'DESC_PROCTYPE', width: 120 },
                    {
                        text: 'Chargeback<br>Status', dataIndex: 'CHARGEBACK', width: 100,
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
                    {
                        text: 'ADM<br>Status', dataIndex: 'A4501STADM', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#F0D094;";
                            return value.trim() === '' ? '' : 'Suggested';
                        }
                    },
                    { text: 'Uses Sabre', dataIndex: 'ESTAF_CONCAT', width: 180 }
                ]
            }
            //</editor-fold>
        ]
    },
    // tbar: {
    //     layout: {
    //         pack: 'end'
    //     },
    //     defaults: {
    //         scale: 'medium'
    //     },
    //     items: [
    //         {
    //             xtype: 'button',
    //             iconCls: 'prx-icon-excel',
    //             scale: 'small',
    //             tooltip: 'Export to Excel',
    //             listeners: {
    //                 click: 'downloadExcel'
    //             }
    //         },

    //     ]
    // },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});



