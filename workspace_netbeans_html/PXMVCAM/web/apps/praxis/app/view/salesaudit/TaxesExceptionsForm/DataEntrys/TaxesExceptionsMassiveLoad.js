prototype.idDE2 = prototype.id + '-TaxesExceptionsMassiveLoad';
Ext.define('Ext.Praxis.view.salesaudit.TaxesExceptionsForm.DataEntrys.TaxesExceptionsMassiveLoad', {
    extend: 'Ext.window.Window',
    alias: 'widget.TaxesExceptionsMassiveLoad',
    requires: [
        'Ext.Praxis.controller.salesaudit.TaxesExceptions.TaxesExceptionsMassiveLoadController'
    ],
    controller: 'TaxesExceptionsMassiveLoadController',
    title: 'Tax Exception Massive - Form',
    header: true,
    width: 800,
    resizable: false,
    layout: 'hbox',
    modal: true,
    border: false,
    bodyStyle: 'background: #ffffff;',
    defaults: {
        border: false
    },
    bodyPadding: 10,
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            width: '100%',
            margin: '10 0 5 0',
            items: [

                {
                    xtype: 'filefield',
                    flex: 1,
                    fieldLabel: 'Excel File',
                    labelWidth: 60,
                    id: prototype.idDE2 + '-massiveExcelFile',
                    name: 'excelFile',
                    msgTarget: 'side',
                    allowBlank: false,
                    buttonText: 'Select File',
                    listeners: {
                        change: 'onSelectField'
                    }
                }
            ]
        },
        {
            xtype: 'label',
            width: '100%',
            margin: '0 0 5 0',
            html: '<b style="color:#c82d2d;font-size:9px;display:block;text-align:right">Required Layout (*): TICKET-SALEDATE-TAXCODE-COMMENT</b>'
        },
        {
            xtype: 'grid',
            id: prototype.idDE2 + '-gridErrors',
            hidden: true,
            flex: 1,
            minHeight: 100,
            maxHeight: 300,
            width: '100%',
            margin: '5 0 5 0',
            border: true,
            columnLines: true,
            viewConfig: {
                stripeRows: false,
                enableTextSelection: true,
                markDirty: true
            },
            columns: {
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                items: [
                    { text: 'Ticket', dataIndex: 'TICKET', width: 100 },
                    { text: 'Error Comment', dataIndex: 'COMENTARIO', flex: 1 }
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
            margin: '7 5 7 5',
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
                    text: 'Update',
                    id: prototype.idDE2 + '-btn-update',
                    iconCls: 'prx-icon-reload',
                    listeners: {
                        click: 'onUpdateClick'
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