prototype.idLOG = prototype.id + '-LogAccountingProcessDataEntry';

Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.DataEntrys.LogAccountingProcessDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.LogAccountingProcessDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.AccountingMasterProcess.LogAccountingProcessDataEntryController'
    ],
    controller: 'LogAccountingProcessDataEntryController',
    title: 'Accounting Process Log',
    header: true,
    width: 900,
    height: 500,
    maxHeight: 800,
    resizable: false,
    scrollable: true,
    layout: 'fit',
    modal: true,
    border: false,
    bodyStyle: 'background-color: white !important;',
    listeners: {
        afterrender: 'afterRender'
    },
    items: [
        {
            xtype: 'grid',
            id: prototype.idLOG + '-logGrid',
            border: true,
            columnLines: true,
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true,
                markDirty: false
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
                        width: 50
                    },
                    {
                        text: 'Status',
                        dataIndex: 'STATUS_DESCRIPTION',
                        width: 100,
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;font-weight:bold;";
                            let bgColor = '';
                            const codeStatus = record.get('CODE_STATUS') || '';
                            
                            const colorMap = {
                                'N': '#FFE5B4',
                                'P': '#B4E5FF',
                                'A': '#B4FFB4',
                                'F': '#B4FFB4',
                                'E': '#FFB4B4',
                                'K': '#FFCD85',
                            };
                            
                            bgColor = colorMap[codeStatus] || '';
                            if (bgColor) {
                                metaData.style += "background-color:" + bgColor + ";";
                            }
                            
                            return value || '';
                        }
                    },
                    {
                        text: 'Log Message',
                        dataIndex: 'MESSAGE',
                        flex: 1,
                        minWidth: 200,
                        renderer: function (value, metaData) {
                            metaData.style = "text-align:left;";
                            
                            if (value && value.length > 100) {
                                metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(value) + '"';
                                return value.substring(0, 100) + '...';
                            }
                            return value;
                        }
                    },
                    {
                        text: 'User',
                        dataIndex: 'USCR',
                        width: 100,
                    },
                    {
                        text: 'Date',
                        dataIndex: 'FECR',
                        width: 100,
                    },
                    {
                        text: 'Hour',
                        dataIndex: 'HOCR',
                        width: 100,
                    }
                ]
            },
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '7 0 7 0',
            layout: {
                pack: 'center'
            },
            defaults: {
                scale: 'medium',
                margin: '0 5 0 5'
            },
            items: [
                {
                    text: 'Close',
                    iconCls: 'prx-icon-cancel',
                    tooltip: 'Close',
                    listeners: {
                        click: 'onClickClose'
                    }
                }
            ]
        }
    ]
});
