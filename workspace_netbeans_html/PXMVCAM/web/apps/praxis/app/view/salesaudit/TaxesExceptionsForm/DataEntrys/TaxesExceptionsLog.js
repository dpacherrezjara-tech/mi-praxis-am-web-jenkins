
prototype.idDE3 = prototype.id + '-TaxesExceptionsLog';

Ext.define('Ext.Praxis.view.salesaudit.TaxesExceptionsForm.DataEntrys.TaxesExceptionsLog', {
    extend: 'Ext.window.Window',
    alias: 'widget.TaxesExceptionsLog',
    requires: [
        'Ext.Praxis.controller.salesaudit.TaxesExceptions.TaxesExceptionsLogController'
    ],
    controller: 'TaxesExceptionsLogController',
    title: 'History of Taxes Exception',
    header: true,
    width: 900,
    height: 400,
    resizable: false,
    layout: 'vbox',
    modal: true,
    border: false,
    bodyStyle: 'background: #ffffff;',
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'panel',
            layout: 'fit',
            width: '100%',
            height: '100%',
            items: [
                {
                    xtype: 'grid',
                    margin: '5 0 5 0',
                    minHeight: 100,
                    viewConfig: {
                        stripeRows: false,
                        enableTextSelection: true,
                        markDirty: true
                    },
                    columnLines: true,
                    id: prototype.idDE3 + '-gridTaxesExceptionsLog',
                    scrollable: true,
                    flex: 1,
                    columns: {
                        defaults: {
                            align: 'center',
                            menuDisabled: true,
                            sortable: true
                        },
                        items: [
                            {text: 'RN', dataIndex: 'IDCHG' , xtype: 'rownumberer' , width: 40},
                            {text: 'Action', dataIndex: 'ACTION', width: 70},
                            {text: 'Tax<br>Code', dataIndex: 'CTAX', width: 50},
                            {text: 'Description<br>Action', dataIndex: 'NOTE', flex: 1},
                            {text: 'User', dataIndex: 'USCH', width: 60},
                            {text: 'Date', dataIndex: 'FECH', width: 80},
                            {text: 'Hour', dataIndex: 'HOCH', width: 60}
                        ]
                    }
                }
            ]
        }
    ]
});