Ext.define('Ext.Praxis.view.payments.MerchantNumberForm.Grids.MerchantsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-MerchantsGrid',
    requires: [
        'Ext.Praxis.controller.payments.MerchantNumber.MerchantsGridController'
    ],
    controller: 'MerchantsGridController',
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
            {text: 'Nbr', dataIndex: 'RN', width: 40, hidden: true},
            {text: 'Merchant<br>Nbr.', dataIndex: 'MERCHN', width: 75},
            {text: 'Merchant Name', dataIndex: 'DESCR', flex: 1,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    var data = record.data;
                    metaData.style = "text-align:left;";
                    metaData.tdAttr = 'data-qtip="' + data.DESCR + '"';
                    return value;
                }
            },
            {text: 'Status', dataIndex: 'STATUS', width: 70,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:left;";
                    const sts = {
                        '0': 'Disabled',
                        '1': 'Enabled'
                    };
                    return sts[value.trim()];
                }
            },
            {text: 'Operative<br>Unit', dataIndex: 'UNIOPE', width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    const sts = {
                        '': '',
                        '1': 'AEROVIAS DE MX',
                        '2': 'AEROMEXICO CARGO',
                        '3': 'PLM'
                    };
                    return sts[value.trim()];
                }
            },
            {text: 'Channel', dataIndex: 'CANAL', width: 60},
            {text: 'Social',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center'
                },
                columns: [
                    {text: 'Reason', dataIndex: 'RSOCIAL', width: 250,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            var data = record.data;
                            metaData.style = "text-align:left;";
                            metaData.tdAttr = 'data-qtip="' + data.RSOCIAL + '"';
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'Merchant',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center'
                },
                columns: [
                    {text: 'Payment', dataIndex: 'MERCHP', width: 75}
                ]
            },
            {text: 'Country', dataIndex: 'SCOUNTRY', width: 60,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;";
                    return value;
                }
            },
            {
                text: 'IATA',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center'
                },
                columns: [
                    {text: 'Code', dataIndex: 'CIATA', width: 70},
                    {text: 'Name', dataIndex: 'STRDESCRIP', width: 200,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:left;";
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'Commission Policy Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center'
                },
                columns: [
                    {text: 'Client Code', dataIndex: 'CODCLIT1', width: 77,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#e5ecef;";
                            return value;
                        }
                    },
                    {text: 'Client Address', dataIndex: 'DIRCLIT1', width: 165,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:left;background-color:#e5ecef;";
                            return value;
                        }
                    }
                ]
            },
            {
                text: 'Chargeback Policy Information',
                defaults: {
                    menuDisabled: true,
                    sortable: true,
                    align: 'center'
                },
                columns: [
                    {text: 'Client Code', dataIndex: 'CODCLIT2', width: 77,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:center;background-color:#e5ecef;";
                            return value;
                        }
                    },
                    {text: 'Client Address', dataIndex: 'DIRCLIT2', width: 165,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "text-align:left;background-color:#e5ecef;";
                            return value;
                        }
                    }
                ]
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 40,
                text: 'Edit',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-edit',
                        tooltip: 'Edit',
                        handler: 'onEditClick'
                    }
                ]
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 40,
                text: 'Del',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-image-trash',
                        tooltip: 'Delete',
                        handler: 'onDeleteClick'
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
                    click: 'onDownloadExcel'
                }
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});
