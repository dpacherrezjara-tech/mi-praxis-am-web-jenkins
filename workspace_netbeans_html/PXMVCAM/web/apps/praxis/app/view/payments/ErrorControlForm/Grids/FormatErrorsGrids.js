Ext.define('Ext.Praxis.view.payments.ErrorControlForm.Grids.FormatErrorsGrids', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-FormatErrorsGrids',
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
        {
            xtype: 'grid',
            border: false,
            width: '60%',
            minHeight: 250,
            id: prototype.id + '-formatErrorGrid',
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
                    {
                        text: 'RN',
                        xtype: 'rownumberer', // Agrega la columna de números de fila
                        width: 40 // Ajusta el ancho de la columna si es necesario
                    },
                    {
                        text: 'Date', dataIndex: 'A4481FPROC', width: 85
                    },
                    {
                        text: 'File Type', dataIndex: 'A4451DESC1', flex: 1,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "font-weight:bold;";
                            return value;
                        }
                    },
                    {
                        text: 'Qty. Errors', dataIndex: 'TOTAL', width: 90,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "font-weight:bold;color:#ED4D2B;";
                            return value;
                        }
                    },
                    {
                        xtype: 'actioncolumn',
                        sortable: false,
                        width: 50,
                        align: 'center',
                        items: [
                            {
                                getClass: function (value, metadata, record) {
                                    return 'prx-icon-detail';
                                },
                                tooltip: 'Click for Show Details',
                                handler: 'loadFormatErrors'
                            }
                        ]
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
                            click: 'downloadFormatErrors'
                        }
                    }
                ]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true
            }
        },
        {
            xtype: 'grid',
            border: false,
            width: '100%',
            minHeight: 250,
            hidden: true,
            id: prototype.id + '-formatErrorDetGrid',
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
                    {
                        text: 'RN', dataIndex: 'RN', width: 40
                    },
                    {
                        text: 'Fecha<br>de Proceso', dataIndex: 'A4481FPROC', width: 85
                    },
                    {
                        text: 'ID File', dataIndex: 'A4481IDFIL', width: 85
                    },
                    {
                        text: 'Procesador', dataIndex: 'A4451DESC1', flex: 1
                    },
                    {
                        text: 'Pais<br>de venta', dataIndex: 'A4481PSVTA', width: 85
                    },
                    {
                        text: 'ID Reference', dataIndex: 'A4481IDREF', width: 85
                    },
                    {
                        text: 'Ticket<br>Number', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            const rec = record.data;
                            return rec.A4481CIA + rec.A4481FORMA + rec.A4481SERIE;
                        }
                    },
                    {
                        text: 'Status<br>Error', dataIndex: 'A4481STSER', width: 85,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            let opts = {
                                '0': 'Pending',
                                '1': 'Audited',
                                '2': 'Pending System'
                            };
                            return opts[value] || '';
                        }
                    },
                    {
                        text: 'Tipo de<br>Correccion', dataIndex: 'A4481TIPCO', width: 85,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            let opts = {
                                'A': 'Automatic',
//                                'F': 'Forced Match'
                            };
                            return opts[value] || '';
                        }
                    },
                    {
                        text: 'Program', dataIndex: 'A4481PROG', width: 85
                    },
                    {
                        text: 'Error Code', dataIndex: 'A4481CODER', width: 85,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = "font-weight:bold;";
                            return value;
                        }
                    },
                    {
                        text: 'Error Description', dataIndex: 'A4481DATA', flex: 1
                    },
                    {
                        text: 'Audited By', dataIndex: 'A4481USRFZ', width: 95
                    },
                    {
                        text: 'Audited Date', dataIndex: 'A4481FECFZ', width: 85
                    },
                    {
                        xtype: 'actioncolumn',
                        sortable: false,
                        width: 50,
                        align: 'center',
                        items: [
                            {
                                getClass: function (value, metadata, record) {
                                    return 'prx-icon-detail';
                                },
                                tooltip: 'Click for Show Details',
                                handler: 'openAuditDataEntry'
                            }
                        ]
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
                            click: 'downloadDetFormatErrors'
                        }
                    },
                    {
                        xtype: 'button',
                        scale: 'small',
                        iconCls: 'prx-icon-back',
                        width: 25,
                        tooltip: 'Back',
                        listeners: {
                            click: 'backFormatErrorSumm'
                        }
                    }
                ]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true
            }
        }
    ]
});