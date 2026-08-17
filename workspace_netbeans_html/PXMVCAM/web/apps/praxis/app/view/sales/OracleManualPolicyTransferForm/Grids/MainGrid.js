Ext.define('Ext.Praxis.view.sales.OracleManualPolicyTransferForm.Grids.MainGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-MainGrid',
    requires: [
        'Ext.Praxis.controller.sales.OracleManualPolicyTransfer.MainGridController'
    ],
    controller: 'OracleManualPolicyTransferMainGridController',
    title: 'Oracle Manual Policy Transfer - Loaded Files',
    titleAlign: 'center',
    minHeight: 200,
    maxHeight: 630,
    width: '78%',
    layout: 'fit',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
    },
    columnLines: true,
    tbar: {
        layout: {
            pack: 'end'
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
                text: 'Detail',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-detail',
                        tooltip: 'View detail',
                        handler: 'onClickDrilldown'
                    }
                ]
            },
            {
                text: 'Upload Number',
                dataIndex: 'ENVIO_JOB',
                width: 120
            },
            {
                text: 'Upload Date',
                dataIndex: 'DATE_UPLOAD',
                width: 100
            },
            {
                text: 'Upload Status',
                dataIndex: 'STATUS_DESCRIPTION_JOB',
                width: 110,
                renderer: function (value, metaData, record) {
                    metaData.style = "text-align:center;font-weight:bold;";

                    // L=Loading, N=Pending, P=Processing, C=Uploaded (final), E=Error
                    const codeStatus = record.get('STATUS_JOB') || '';
                    const colorMap = {
                        'L': '#E0E0E0',
                        'N': '#FFE5B4',
                        'P': '#B4E5FF',
                        'C': '#B4FFB4',
                        'E': '#FFB4B4'
                    };

                    const bgColor = colorMap[codeStatus] || '';
                    if (bgColor) {
                        metaData.style += "background-color:" + bgColor + ";";
                    }

                    return value || '';
                }
            },
            {
                text: 'Module',
                dataIndex: 'MODULE_DESCRIPTION',
                width: 140
            },
            {
                text: 'File Name',
                dataIndex: 'NAMEZIP',
                width: 220
            },
            {
                text: 'Folders',
                dataIndex: 'TOTFOLDERS',
                width: 80
            },
            {
                text: 'Files',
                dataIndex: 'TOTFILES',
                width: 80
            },
            {
                text: 'Lines',
                dataIndex: 'TOTLINES',
                width: 90,
                renderer: function (value) {
                    return Ext.util.Format.number(value || 0, '0,000');
                }
            },
            {
                text: 'Status',
                dataIndex: 'STATUS_DESCRIPTION',
                width: 110,
                renderer: function (value, metaData, record) {
                    metaData.style = "text-align:center;font-weight:bold;";

                    // L=Loading, N=Pending, P=Processing, C=Uploaded (final), E=Error
                    const codeStatus = record.get('STATUS') || '';
                    const colorMap = {
                        'L': '#E0E0E0',
                        'N': '#FFE5B4',
                        'P': '#B4E5FF',
                        'C': '#B4FFB4',
                        'E': '#FFB4B4'
                    };

                    const bgColor = colorMap[codeStatus] || '';
                    if (bgColor) {
                        metaData.style += "background-color:" + bgColor + ";";
                    }

                    return value || '';
                }
            },
            {
                text: 'User',
                dataIndex: 'USCR',
                width: 100
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
                        text: 'Date',
                        dataIndex: 'FECR',
                        width: 90
                    },
                    {
                        text: 'Hour',
                        dataIndex: 'HOCR',
                        width: 70
                    }
                ]
            }
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Displaying files {0} - {1} of {2}',
        emptyMsg: 'No files to display'
    }
});
