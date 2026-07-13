Ext.define('Ext.Praxis.view.payments.AccountingMasterProcessForm.Grids.ErrorsFoundGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-ErrorsFoundGrid',
    title: 'Errors Found of Accounting Master Process',
    titleAlign: 'center',
    minHeight: 200,
    maxHeight: 630,
    width: '95%',
    layout: 'fit',
    requires: [
        'Ext.Praxis.controller.payments.AccountingMasterProcess.ErrorsFoundGridController'
    ],
    controller: 'ErrorsFoundGridController',
    tbar: {
        layout: {
            type: 'hbox',
            pack: 'end' // Empuja todo el contenido al final (derecha)
        },
        items: [
            {
                xtype: 'button',
                iconCls: 'prx-icon-back',
                scale: 'small',
                text: 'Back',
                tooltip: 'Return to Accounting Master Process',
                listeners: {
                    click: 'onClickBack'
                }
            },
            // '->',
            {
                xtype: 'button',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export to Excel',
                listeners: {
                    click: 'onDownloadExcelErrors'
                }
            },
        ]
    },
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
                dataIndex: 'RN',
                xtype: 'rownumberer',
                width: 40
            },
            {
                text: 'Open',
                xtype: 'widgetcolumn',
                width: 90,
                padding: 0,
                margin: 0,
                widget: {
                    xtype: 'splitbutton',
                    iconCls: 'prx-icon-detail',
                    iconCls: 'prx-icon-detail',
                    text: 'Detail',
                    padding: 0,
                    margin: 0,
                    // acción por defecto (si quieres alguna)
                    handler: function (btn) {
                        // const rec = btn.getWidgetRecord();
                        // acción default opcional
                        btn.showMenu();
                    },
                    menu: [
                        {
                            text: 'Settlement',
                            itemId: 'settlement',
                            handler: 'onOpenSettlement'
                        },
                        {
                            text: 'By Payment',
                            itemId: 'byPayment',
                            handler: 'onOpenByPayment'
                        },
                        {
                            text: 'By Ticket',
                            itemId: 'byTicket',
                            handler: 'onOpenByTicket'
                        },
                        {
                            text: 'Complement',
                            itemId: 'complement',
                            handler: 'onOpenComplement'
                        },
                        {
                            text: 'Accounting',
                            itemId: 'accounting',
                            handler: 'onOpenAccounting'
                        }
                    ]
                },
                onWidgetAttach: function (col, widget, record) {
                    // 1) Si OPEN_DETAIL = 'N' => deshabilitar todo el botón
                    const openDetail = (record.get('OPEN_DETAIL') || '').toUpperCase();
                    widget.setDisabled(openDetail !== 'Y');
            
                    // 2) Habilitar / deshabilitar cada opción del menú según VIEW_*
                    const map = {
                        settlement : 'VIEW_SETTLEMENT',
                        byPayment  : 'VIEW_BY_PAYMENT',
                        byTicket   : 'VIEW_BY_TICKET',
                        complement : 'VIEW_COMPLEMENT',
                        accounting : 'VIEW_ACCOUNTING'
                    };
            
                    Ext.Object.each(map, function (itemId, fieldName) {
                        const mi = widget.menu.down('#' + itemId);
                        if (mi) {
                            const val = (record.get(fieldName) || '').toUpperCase();
                            mi.setDisabled(val !== 'Y');
                        }
                    });
                }
            },
            {
                text: 'Process<br>Type',
                dataIndex: 'TYPE_ERROR_PROCESS',
                width: 80
            },
            {
                text: 'Processor',
                dataIndex: 'PROCESSOR',
                width: 120
            },
            {
                text: 'Processing<br>Date',
                dataIndex: 'PRDA',
                width: 90
            },
            {
                text: 'Ref. Number',
                dataIndex: 'AREFNBR',
                width: 150
            },
            {
                text: 'Complement<br>Id',
                dataIndex: 'TRANSACTID',
                width: 100
            },
            {
                text: 'Ticket',
                dataIndex: 'TICKET',
                width: 100
            },
            {
                text: 'Status',
                dataIndex: 'STATUS_DESCRIPTION',
                width: 100,
                renderer: function (value, metaData) {
                    // metaData.style = "text-align:center;font-weight:bold;background-color:#8EDFB3;";
                    // return value;
                    metaData.tdStyle = (value && value !== '') ? 'text-align:center;font-weight:bold;background-color:#8EDFB3;' : '';
                    return value ? Ext.String.htmlEncode(value) : '';
                }
            },
            {
                text: 'Currency',
                dataIndex: 'CURRENCY',
                width: 70
            },
            {
                text: 'Amount',
                dataIndex: 'AMOUNT',
                width: 100,
                align: 'right',
                renderer: function (value, metaData) {
                    metaData.style = "text-align:right;";
                    return value != null && value !== '' ? Ext.util.Format.number(value, '0,000.00') : '';
                }
            },
            {
                text: 'Error',
                flex: 1,
                defaults: {
                    align: 'center',
                    renderer: function (value, metaData) {
                        metaData.style = "text-align:center;";
                        if (value === undefined || value === null) return '';
                        return Ext.String.htmlEncode(String(value).trim());
                    }
                },
                columns: [
                    {
                        text: 'Type',
                        dataIndex: 'TYPE_ERROR_DESCRIPTION',
                        width: 200,
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:center;";
                            var tooltip = record.get('TYPE_ERROR_ERROR_TRASLATE');
                            if (tooltip) {
                                metaData.tdAttr = 'data-qtip="' + Ext.String.htmlEncode(tooltip) + '"';
                            }
                            // Color styling for the type column
                            metaData.tdStyle = (value && value !== '') ? 'background-color:#fceaea' : '';
                            return value ? Ext.String.htmlEncode(value) : '';
                        }
                    },
                    {
                        text: 'Code',
                        dataIndex: 'CERROR',
                        width: 50,
                        renderer: function (value, metaData, record) {
                            // Color styling for code column
                            metaData.style = "text-align:center;";
                            metaData.tdStyle = (value && value !== '') ? 'background-color:#fceaea' : '';
                            return value ? Ext.String.htmlEncode(String(value).trim()) : '';
                        }
                    },
                    {
                        text: 'Description',
                        dataIndex: 'DERROR',
                        flex: 1,
                        minWidth: 200,
                        renderer: function (value, metaData, record) {
                            metaData.style = "text-align:left;";
                            var val = Ext.String.htmlEncode(String(value).trim());
                            metaData.tdAttr = 'data-qtip="' + val + '"';
                            // Color styling for description column
                            metaData.tdStyle = (val && val !== '') ? 'background-color:#fceaea' : '';
                            return val;
                        }
                    }
                ]
            }
        ]
    },
    listeners: {
        afterrender: 'afterRender'
    }
});
