
prototype.idDE3 = prototype.id + '-Compensation0425Log';

Ext.define('Ext.Praxis.view.salesaudit.Compensation0425Form.DataEntrys.Compensation0425Log', {
    extend: 'Ext.window.Window',
    alias: 'widget.Compensation0425Log',
    requires: [
        'Ext.Praxis.controller.salesaudit.Compensation0425Form.Compensation0425LogController'
    ],
    controller: 'Compensation0425LogController',
    title: 'History of ompensation 0425',
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
                    id: prototype.idDE3 + '-gridCompensationLog',
                    scrollable: true,
                    flex: 1,
                    columns: {
                        defaults: {
                            align: 'center',
                            menuDisabled: true,
                            sortable: true
                        },
                        items: [
                            {text: 'RN', dataIndex: 'RN' , xtype: 'rownumberer' , width: 40},
                            {text: 'Sec', dataIndex: 'A4962CORRE', width: 70},
                            {text: 'Code', dataIndex: 'A4962CODIG', width: 50},
                            {text: 'Description<br>Action', dataIndex: 'A4962DESCR', flex: 1},
                            {text: 'Date', dataIndex: 'A4962FREGI', width: 80},
                            {text: 'Hour', dataIndex: 'A4962HREGI', width: 60}
                        ]
                    }
                }
            ]
        }
    ]
});