Ext.define('Ext.Praxis.view.payments.ErrorControlForm.Grids.LoadErrorsGrids', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-LoadErrorsGrids',
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
            width: '100%',
            minHeight: 250,
            id: prototype.id + '-loadErrorGrid',
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
                    {text: 'Processing<br>Date', dataIndex: 'A4701PRDA', width: 100},
                    {text: 'Process', dataIndex: 'A4701PROCE', width: 100},
                    {text: 'File', dataIndex: 'A4701TFILE', width: 100},
                    {text: 'File Name', dataIndex: 'A4701NFILE', width: 450},
                    {text: 'File Path', dataIndex: 'A4701PATH', width: 450},
                    {text: 'Status', dataIndex: 'A4701STAT', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            let opts = {
                                'OK': () => {
                                    metaData.style = "background-color:#9ffa2b;text-align:center;font-weight:bold;";
                                    value = 'OK ✅';
                                },
                                'ER': () => {
                                    metaData.style = "color:#ffffff;background-color:#fb5656;text-align:center;font-weight:bold;";
                                    value = 'ERROR ⚠️';
                                }
                            };
                            opts[value]?opts[value]():()=>{value='';};
                            return value;
                        }
                    },
                    {text: 'Error Code', dataIndex: 'A4701CDERR', width: 100},
                    {text: 'Message', dataIndex: 'A4701MSN', width: 350}
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
                            click: 'downloadLoadErrors'
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