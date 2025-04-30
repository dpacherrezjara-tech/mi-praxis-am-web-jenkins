prototype.idDE = prototype.id + 'PNRDataEntry';

Ext.define('Ext.Praxis.view.payments.ChargebackSabreStatusForm.DataEntrys.PNRDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.PNRDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.ChargebackSabreStatus.PNRDataEntryController'
    ],
    controller: 'PNRDataEntryController',
    title: 'PNR - Form',
    header: true,
    height: 640,
    width: 1320,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'panel',
            width: 1300,
            height: 600,
            border: true,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: [
                {
                    xtype: 'form',
                    width: '100%',
                    id: prototype.idDE + '-pnrDataEntryForm',
                    //height: 50,
                    border: true,
                    layout: {
                        type: 'hbox',
                        align: 'left'
                    },
                    defaults: {
                        margin: '5 5 5 5'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            name: 'IN_TFILTER',
                            fieldLabel: 'Search By',
                            id: prototype.idDE + '-cmbType',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['3', 'PNR']
                                ]
                            }),
                            labelWidth: 60,
                            width: 150,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: '3',
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            id: prototype.idDE + '-txtPNR',
                            name: 'IN_PNR',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true,
                            maskRe: /[a-zA-Z0-9]/,
                            maxLength: 6,
                            width: 100,
                            readOnly: true
                        }
                    ]
                },
                {
                    xtype: 'grid',
                    id: prototype.idDE + '-PNRGrid',
                    width: 1300,
                    minHeight: 100,
                    maxHeioght: 570,
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        markDirty: false,
                        listeners: {
                            refresh: function (dataview) {
                                Ext.each(dataview.panel.columns, function (column) {
                                    if (column.autoSizeColumn === true)
                                        column.autoSize();
                                });
                            }
                        }
                    },
                    columnLines: true,
                    columns: {
                        defaults: {
                            align: 'center',
                            menuDisabled: true,
                            sortable: true
                        },
                        items: [
                            {text: 'Pax Name', dataIndex: 'A4496PAX', flex: 1},
                            {text: 'Ticket', dataIndex: 'TICKET', width: 150,
                                listeners:{
                                    click:'onViewTicket'
                                },
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "background-color:#FCF6DC;text-align:center;text-decoration:underline;cursor:pointer;color:#057ECB";
                                    return value;
                                }},
                            {text: 'Source', dataIndex: 'A4496FUENT', width: 80},
                            {text: 'Sub-Source', dataIndex: 'A4496SFUEN', width: 80},
                            {text: 'EPR', dataIndex: 'A4496CODAG', width: 80},
                            {text: 'PNR', dataIndex: 'A4496PNR', width: 80},
                            {text: 'Sale<br>Date', dataIndex: 'A4496FECVT', width: 80},
                            {text: 'Fare<br>Currency', dataIndex: 'A4496MDA', width: 50},
                            {text: 'Fare<br>Amount', dataIndex: 'A4496TARIF', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    return Ext.util.Format.number(value, '0,000.00');
                                }},
                            {text: 'Form of Payment',
                                defaults: {
                                    menuDisabled: true,
                                    //sortable: false,
                                    align: 'center',
                                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                        metaData.style = "text-align:center;background-color:#c0f0af;";
                                        return value;
                                    },
                                },
                                columns: [
                                    {text: 'Fop<br>Type', dataIndex: 'A4501CFOP', width: 80},
                                    {text: 'Card<br>Type', dataIndex: 'A4501TTARJ', width: 50},
                                    {text: 'C. Card<br>Number', dataIndex: 'A4501NREF', width: 150, autoSizeColumn: true},
                                    {text: 'Fop<br>Currency', dataIndex: 'A4501MFOP', width: 50},
                                    {text: 'Fop<br>Amount', dataIndex: 'A4501VFOP', width: 100,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;background-color:#c0f0af;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }},
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
}
);