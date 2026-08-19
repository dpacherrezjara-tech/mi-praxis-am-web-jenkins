Ext.define('Ext.Praxis.view.salesaudit.SalesAuditAcceptedForm.DataEntryDetailsPDI', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDetailsPDI',
    controller: 'DataEntryDetailsPDIController',
    requires: [
        'Ext.Praxis.controller.salesaudit.SalesAuditAccepted.DataEntryDetailsPDIController'
    ],
    header: true,
    minHeight: 200,
    height: 588,
    title: 'PDI Information',
    width: 1261,
    border: false,
    resizable: true,
    layout: 'fit',
    modal: true,
    closable: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'grid',
            id: prototype.id + '-gridPDI',
            flex: 1,
            autoScroll: true,
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
                    { text: 'ID', dataIndex: 'ID', width: 50, align: 'center' },
                    { text: 'Processing<br>Date', dataIndex: 'PRDA', width: 100, align: 'center' },
                    { text: 'PNR', dataIndex: 'PNR', width: 100, align: 'center' },
                    { text: 'PNR Sabre', dataIndex: 'PNRAA', width: 100, align: 'center' },
                    { text: 'Source', dataIndex: 'FUENTE', width: 100, align: 'center' },
                    { text: 'Sabre Code', dataIndex: 'SRCODE', width: 100, align: 'center' },
                    { text: 'Process', dataIndex: 'SRTYPE', width: 100, align: 'center' },
                    { text: 'Sequence', dataIndex: 'RPH', width: 100, align: 'center' },
                    { text: 'Type', dataIndex: 'TYPE', width: 100, align: 'center' },
                    { text: 'Description', dataIndex: 'DESCRIP', width: 398 }
                ]
            },
            store: {
                fields: [
                    'ID', 'PRDA', 'PNR', 'PNRAA',
                    'FUENTE', 'SRCODE', 'SRTYPE', 'RPH', 'TYPE',
                    'DESCRIP'
                ],
                data: [],
                pageSize: 20
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
                        hidden: true,
                        id: prototype.id + '-backButton-1',
                        scale: 'small',
                        iconCls: 'prx-icon-back',
                        width: 25,
                        tooltip: 'Back',
                        listeners: {
                            click: 'onClickBackButton'
                        }
                    }
                ]
            },
            bbar: {
                xtype: 'pagingtoolbar',
                id: prototype.id + '-pagingToolbar',
                displayInfo: true
            }
        }
    ]
});
