prototype.idDE2 = prototype.id + '-LoggerDataEntryFlown';

Ext.define('Ext.Praxis.view.flown.AccountingMasterProcessForm.DataEntryLogs', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryLogs',
    requires: [
        'Ext.Praxis.controller.flown.AccountingMasterProcess.DataEntryLogsAMPController'
    ],
    controller: 'DataEntryLogsAMPController',
    title: 'Logger - Form',
    header: true,
    width: 950,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'grid',
            titleAlign: 'center',
            minHeight: 100,
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true,
                markDirty: false
            },
            columnLines: true,
            title: 'Process Log',
            id: prototype.idDE2 + '-gridLogger',
            width: '100%',
            maxHeight: 450,
            columns: {
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                items: [
                    {
                        text: 'RN',
                        locked: true,
                        xtype: 'rownumberer', // Columna de número de fila
                        width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                    },
                    {text: 'Date Process', dataIndex: 'A4492FPROC', width: 100},
                    {text: 'Module', dataIndex: 'A4492MODUL', width: 120},
                    {text: 'Status', dataIndex: 'A4492PROG', width: 150,
                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                            if (value.trim() === 'Completed') {
                                metaData.style = "text-align:center;font-weight:bold;background-color:#27F565;";
                            } else {
                                metaData.style = "text-align:center;font-weight:bold;background-color:#F54627;";
                            }
                            return value;
                        }
                    },
                    {text: 'Description', dataIndex: 'A4492DESC', flex: 1},
                    {text: 'Date', dataIndex: 'A4492FREGI', width: 80},
                    {text: 'Hour', dataIndex: 'A4492HREGI', width: 80}
                ]
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            border: false,
            margin: '7 0 7 0',
            padding: '3 0 3 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Reload',
                    iconCls: 'prx-icon-reload',
                    listeners: {
                        click: 'onReloadGrid'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.idDE2 + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
});