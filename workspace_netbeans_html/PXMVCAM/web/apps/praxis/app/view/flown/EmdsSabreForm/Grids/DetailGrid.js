Ext.define('Ext.Praxis.view.flown.EmdsSabreForm.Grids.DetailGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-DetailGrid',
    requires: [
        'Ext.Praxis.controller.flown.EmdsSabre.DetailGridController'
    ],
    controller: 'DetailGridController',
    maxHeight: prototype.height,
    minHeight: 200,
    height: 'auto',
    width: prototype.width,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
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
            {text: 'Processing<br>Date', dataIndex: 'FPROC', width: 90},
            {text: 'Ticket', width: 130,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "font-weight:bold;";
                    const {CCIA, FORMA, SERIE} = record.data;
                    return CCIA + FORMA + SERIE;
                }
            },
            {text: 'Seq', dataIndex: 'SEQ', width: 60},
            {text: 'Coupon', dataIndex: 'CUPON', width: 60},
            {text: 'Source', dataIndex: 'FTE', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#92ea84;";
                            const opts = {
                                'B': 'BSP',
                                'A': 'ARC',
                                'M': 'MAN',
                                'S': 'ASR'
                            };
                            return opts[value];
                        }
            },
            {text: 'Group', dataIndex: 'GRUPO', width: 80},
            {
                text: 'Process Information',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                        metaData.style = "text-align:center;background-color:#84abea;";
                        return value;
                    }
                },
                columns: [
                    {text: 'Status', dataIndex: 'STVAL', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#92ea84;";
                            const opts = {
                                '0': 'Pending',
                                '1': 'Used',
                                '2': 'No Used',
                                '4': 'Status Changed'
                            };
                            return opts[value];
                        }
                    },
                    {text: 'BATCH', dataIndex: 'LOTE', width: 100},
                    {text: 'Status<br>Changed', dataIndex: 'STUSE', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#84abea;";

                            const {STUSE, STVAL} = record.data;
                            if (STVAL === '1') {
                                value = '#dae868';
                            } else {
                                if (record.data.STUSE.trim() === 'USED') {
                                    value = 'green';
                                    //return `${value} <img src="resources/img/icon/16x16/circle_green.png"/>`;
                                } else {
                                    value = 'red';
                                    //return `${value} <img src="resources/img/icon/16x16/circle_red.png"/>`;
                                }
                            }
                            return  `${STUSE} <i class="fas fa-circle" style="font-size: 16px; color: ${value} ;"></i>`;
                        }
                    }
                ]
            },
            {
                text: 'Document Information',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                        metaData.style = "text-align:center;background-color:#9a84d1;";
                        return value;
                    }
                },
                columns: [
                    {text: 'Doc.<br>Code', dataIndex: 'CDOC', width: 80},
                    {text: 'RFIC', dataIndex: 'RFIC', width: 80},
                    {text: 'RFISC', dataIndex: 'RFIS', width: 80},
                    {text: 'Country', dataIndex: 'PSVVTA', width: 60},
                    {text: 'IATA<br>Code', dataIndex: 'AGTIA', width: 100},
                    {text: 'Sale<br>Date', dataIndex: 'FVTA', width: 90},
                    {text: 'Pax<br>Type', dataIndex: 'TPAX', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;font-weight:bold;background-color:#92ea84;";
                            const opts = {
                                'A': 'Adult',
                                'C': 'Child',
                                'I': 'Infant'
                            };
                            return opts[value];
                        }
                    }
                ]
            },
            {
                text: 'Coupon Detail',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                        metaData.style = "text-align:right;background-color:#F0D094";
                        value = Ext.util.Format.number(value, '0,000.00');
                        return value;
                    }
                },
                columns: [
                    {text: 'Carrier<br>Mkt.', dataIndex: 'CARR', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;background-color:#F0D094;";
                            return value;
                        }
                    },
                    {text: 'Carrier<br>Opered', dataIndex: 'CARROP', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;background-color:#F0D094;";
                            return value;
                        }
                    },
                    {text: 'Coupon<br>Value', dataIndex: 'VCPN', width: 100},
                    {text: 'Commision', dataIndex: 'COMISI', width: 100},
                    {text: 'S. Commision', dataIndex: 'SCOMISI', width: 100},
                    {text: 'YQ', dataIndex: 'YQ', width: 100},
                    {text: 'Currency', dataIndex: 'MDACP', width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            metaData.style = "text-align:center;background-color:#F0D094;";
                            return value;
                        }
                    },
                    {text: 'Coupon<br>Value Rev', dataIndex: 'VCPNRV', width: 100},
                    {text: 'Commision<br>Rev', dataIndex: 'COMREV', width: 100},
                    {text: 'S. Commision<br>Rev', dataIndex: 'SCOMREV', width: 100},
                    {text: 'YQ Rev', dataIndex: 'YQREV', width: 100}
                ]
            },
            {
                text: 'Use Information',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value, metaData, record, rowIndex, colIndex) {
                        metaData.style = "text-align:center;background-color:#e4d768;";
                        return value;
                    }
                },
                columns: [
                    {text: 'Flag', dataIndex: 'TUSO', width: 100},
                    {text: 'Flight<br>Date', dataIndex: 'DFLIGHT', width: 100},
                    {text: 'Flight<br>Number', dataIndex: 'NFLIGHT', width: 100},
                    {text: 'Dep.<br>Airport', dataIndex: 'CDEPART', width: 100},
                    {text: 'Arr.<br>Airport', dataIndex: 'CARRIVA', width: 100}
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
                id: prototype.id + '-backButton',
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


