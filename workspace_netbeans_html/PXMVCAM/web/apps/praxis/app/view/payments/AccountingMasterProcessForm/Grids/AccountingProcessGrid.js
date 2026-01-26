Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.AccountingProcessGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-AccountingProcessGrid',
    title: 'Accounting Master Process - Executed Processes',
    titleAlign: 'center',
    minHeight: 200,
    maxHeight: 630,
    width: '75%',
    layout: 'fit',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false,
        listeners: {
            refresh: function (dataview) {
                Ext.each(dataview.panel.columns, function (column) {
                    if (column.autoSizeColumn === true) {
                        column.autoSize();
                    }
                });
            }
        }
    },
    columnLines: true,
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            {
                text: 'RN',
                dataIndex: 'RN',
                xtype: 'rownumberer',
                width: 40
            },
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 40,
                text: 'Log',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-image-log',
                        tooltip: 'Open Log',
                        handler: 'onClickLog'
                    }
                ]
            },
            {
                text: 'Number<br>Process',
                dataIndex: 'A1955ENVIO',
                width: 120
            },
            {
                text: 'Process<br>Date',
                dataIndex: 'A1955FPROC',
                width: 120,
                renderer: function (value, metaData) {
                    metaData.style = "text-align:center;";
                    return value || '';
                }
            },
            {
                text: 'Accounting<br>Date',
                dataIndex: 'A1955FCONT',
                width: 120
            },
            {
                text: 'Module<br>Process',
                dataIndex: 'A4451DESC1',
                width: 120
            },
            {
                text: 'Status',
                dataIndex: 'STATUS_DESCRIPTION',
                width: 120,
                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                    metaData.style = "text-align:center;font-weight:bold;";
                    
                    // Obtener el código del status desde el record
                    const codeStatus = record.get('CODE_STATUS') || '';
                    
                    console.log("codeStatus", codeStatus);
                    console.log("value", value);
                    // Definir colores basados en el código del status
                    let bgColor = '';
                    const colorMap = {
                        'N': '#FFE5B4',
                        'P': '#B4E5FF',
                        'A': '#B4FFB4',
                        'F': '#B4FFB4',
                        'E': '#FFB4B4',
                    };
                    
                    // Obtener el color basado en el código del status
                    bgColor = colorMap[codeStatus] || '';
                    
                    // Aplicar el color de fondo si existe
                    if (bgColor) {
                        metaData.style += "background-color:" + bgColor + ";";
                    }
                    
                    // Retornar la descripción del status como texto
                    return value || '';
                }
            },
            {
                text: 'Records Processed',
                dataIndex: 'RECORDS_PROCESSED',
                width: 130,
                renderer: function (value, metaData) {
                    metaData.style = "text-align:right;";
                    return Ext.util.Format.number(value || 0, '0,000');
                },
                summaryType: 'sum',
                summaryRenderer: function (value) {
                    return 'Total: ' + Ext.util.Format.number(value || 0, '0,000');
                }
            },
            {
                text: 'Errors Found',
                dataIndex: 'ERROR_FOUND',
                width: 130,
                renderer: function (value, metaData) {
                    metaData.style = "text-align:right;";
                    return Ext.util.Format.number(value || 0, '0,000');
                },
                summaryType: 'sum',
                summaryRenderer: function (value) {
                    return 'Total: ' + Ext.util.Format.number(value || 0, '0,000');
                }
            },
            {
                text: 'Create',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                columns: [
                    {
                        text: 'User',
                        dataIndex: 'A1955USRIN',
                        width: 80
                    },
                    {
                        text: 'Date',
                        dataIndex: 'A1955FECIN',
                        width: 80
                    },
                    {
                        text: 'Hour',
                        dataIndex: 'A1955HORIN',
                        width: 60
                    }
                ]
            },
            {
                text: 'Update',
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                columns: [
                    {
                        text: 'User',
                        dataIndex: 'A1955USRAC',
                        width: 80
                    },
                    {
                        text: 'Date',
                        dataIndex: 'A1955FECAC',
                        width: 80
                    },
                    {
                        text: 'Hour',
                        dataIndex: 'A1955HORAC',
                        width: 60
                    }
                ]
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Displaying processes {0} - {1} of {2}',
        emptyMsg: 'No processes to display'
    }
});
