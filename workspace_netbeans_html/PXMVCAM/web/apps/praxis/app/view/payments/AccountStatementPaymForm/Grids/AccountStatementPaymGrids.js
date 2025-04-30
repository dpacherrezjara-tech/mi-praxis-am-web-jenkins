Ext.define('Ext.Praxis.view.payments.AccountStatementPaymForm.Grids.AccountStatementPaymGrids', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-AccountStatementPaymGrids',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    padding: '0 0 0 0',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    width: '100%',
    defaults: {
        border: false
    },
    items: [
        //<editor-fold defaultstate="collapsed" desc="Summary">
        {
            xtype: 'grid',
            border: false,
            width: 1100,
            minHeight: 250,
            hidden: true,
            id: prototype.id + '-summaryGrid',
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
                    {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 100},
                    {text: 'Accounting<br>Date', dataIndex: 'FCONTL', width: 100},
                    {text: 'Processor', dataIndex: 'DESC_PRO', flex: 1,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#7ac970;font-weight:bolder;";
                            return value;
                        }
                    },
                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 70},
                    {text: 'Currency', dataIndex: 'SCURRENCY', width: 70},
                    {text: 'Qty', dataIndex: 'TOTAL', width: 100},
                    {text: 'Amount', dataIndex: 'VTOTAL', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    //metaData.style = "text-align:center;background-color:#e3e57b;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#f71a1a;";
                    {text: 'Qty<br>Match', dataIndex: 'TMATCH', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#f71a1a;";
                            return value;
                        },
                        listeners:{
                            click:'loadDetailLiqMatch'
                        }
                    },
                    {text: 'Amount<br>Match', dataIndex: 'VMATCH', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'Qty<br>Pending', dataIndex: 'TPEND', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#f71a1a;";
                            return value;
                        },
                        listeners:{
                            click:'loadDetailLiqPend'
                        }
                    },
                    {text: 'Amount<br>Pending', dataIndex: 'VPEND', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    }
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
                            click: 'downloadSummaryDetail'
                        }
                    }
                ]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true
            }
        },
        //</editor-fold> 
        //<editor-fold defaultstate="collapsed" desc="Detail">
        {
            xtype: 'grid',
            border: false,
            width: '100%',
            minHeight: 250,
            hidden: true,
            id: prototype.id + '-detailGrid',
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
                    {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 100},
                    {text: 'Acounting<br>Date', dataIndex: 'FCONTL', width: 100},
                    {text: 'Processor', dataIndex: 'DESC_PRO', width: 160,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#7ac970;font-weight:bolder;";
                            return value;
                        }
                    },
                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 70},
                    {text: 'Currency', dataIndex: 'SCURRENCY', width: 70},
                    {text: 'Amount', dataIndex: 'TGROSAMOUN', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'ID Sales', dataIndex: 'IDFLEX', width: 350},
                    {text: 'ID MPD', dataIndex: 'IDPRAXIS', width: 350},
                    {text: 'Qty Tkt', dataIndex: 'QTYTKT', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;text-decoration:underline;cursor:pointer;font-weight:bolder;color:#f71a1a;";
                            return value;
                        },
                        listeners:{
                            click:'onLoadTicketConcil'
                        }
                    },
                    {text: 'Status', dataIndex: 'STVAL', width: 160,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#fff63b;font-weight:bolder;";
                            let opts = {
                              '0':'Stand By',
                              '1':'Match',
                              '3':'Sales W/O Settlement',
                              '4':'Match Difference',
                              '5':'Match Manual',
                              '6':'Forced Match',
                              '7':'Compensation Match',
                              '8':'Pending RFND'
                            };
                            return opts[value]|| '';
                        }
                    },
                    {text: 'Card Number', dataIndex: 'SCARDN', width: 190},
                    {text: 'Auth', dataIndex: 'SAUTHOC', width: 100},
                    {text: 'PNR', dataIndex: 'SPNR', width: 100}
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
                            click: 'downloadLiqDetail'
                        }
                    },
                    {
                        xtype: 'button',
                        scale: 'small',
                        iconCls: 'prx-icon-back',
                        width: 25,
                        tooltip: 'Back',
                        listeners: {
                            click: 'backDetailSummary'
                        }
                    }
                ]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true
            }
        },
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Sale">
        {
            xtype: 'grid',
            border: false,
            width: '100%',
            minHeight: 250,
            hidden: true,
            id: prototype.id + '-saleGrid',
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
                    {text: 'Processing<br>Date', dataIndex: 'PRDA', width: 100},
                    {text: 'Acounting<br>Date', dataIndex: 'FCONTL', width: 100},
                    {text: 'Processor', dataIndex: 'DESC_PRO', width: 160,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#7ac970;font-weight:bolder;";
                            return value;
                        }
                    },
                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 70},
                    {text: 'Currency', dataIndex: 'SCURRENCY', width: 70},
                    {text: 'Amount', dataIndex: 'SVFOPS', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:right;";
                            value = Ext.util.Format.number(value, '0,000.00');
                            return value;
                        }
                    },
                    {text: 'ID Sales', dataIndex: 'IDCON', width: 350},
                    {text: 'ID MPD', dataIndex: 'IDCONL', width: 350},
                    {text: 'Status', dataIndex: 'STVAL', width: 160,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#fff63b;font-weight:bolder;";
                            let opts = {
                              '0':'Stand By',
                              '1':'Match',
                              '3':'Sales W/O Settlement',
                              '4':'Match Difference',
                              '5':'Match Manual',
                              '6':'Forced Match',
                              '7':'Compensation Match',
                              '8':'Pending RFND'
                            };
                            return opts[value]|| '';
                        }
                    },
                    {text: 'Ticket', dataIndex: 'TICKET', width: 120},
                    {text: 'IATA', dataIndex: 'SAGENT', width: 120},
                    {text: 'Card Number', dataIndex: 'SCARDN', width: 190},
                    {text: 'Auth', dataIndex: 'SAUTHOC', width: 100},
                    {text: 'PNR', dataIndex: 'SPNR', width: 100}
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
                            click: 'downloadSaleDetail'
                        }
                    },
                    {
                        xtype: 'button',
                        scale: 'small',
                        iconCls: 'prx-icon-back',
                        width: 25,
                        tooltip: 'Back',
                        listeners: {
                            click: 'backDetailLiq'
                        }
                    }
                ]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true
            }
        }
        //</editor-fold>
    ]
});