valor = '0';
Ext.define('Ext.Praxis.view.payments.SalesComplementAmexForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1620,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        //Panel Principal
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            border: true,
                            width: 1600,
                            margin: '0 0 0 0 ',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    width: 1600,
                                    //height: 600,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary',
                                            dock: 'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Country', dataIndex: 'COUNTRY', width: 80
                                            },
                                            {
                                                text: 'Processing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'PRDA', width: 100
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status', dataIndex: 'descFAMEX', width: 100
                                            },
                                            {
                                                text: 'Plusgrade ID', dataIndex: 'PLUSGRAID', width: 100
                                            },
                                            {
                                                text: 'Sale',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Country', dataIndex: 'SCOUNTRY', width: 70
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Sale',
                                                id: prototype.id + '-adgTitFecha',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'SDATE', width: 100
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Credit Card',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'SCARCOD', width: 70
                                                    },
                                                    {
                                                        text: 'Bin', dataIndex: 'SCARDBIN', width: 70
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'PNR', dataIndex: 'PNR', width: 80
                                            },
                                            {
                                                text: 'Currency',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Partner', dataIndex: 'CURRPARTN', width: 80
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Total',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Amount', dataIndex: 'SVFOP', width: 80,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;";
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'EMD',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Number', dataIndex: 'EMDNUMBER', width: 100
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Add Pax',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'EMD Number', dataIndex: 'ADDPAXEMD', width: 280
                                                    },
                                                    {
                                                        text: 'Ticket Nbr.', dataIndex: 'ADDPAXTKT', width: 280
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                                {
                                    xtype: 'panel',
                                    id: prototype.id + '-pie',
                                    width: prototype.widthGrid,
                                    hidden: false,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    border: true,
                                    height: 25,
                                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                    defaults: {
                                        border: true
                                    },
                                    padding: '1px 0px 1px 0px',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: prototype.widthGrid,
                                            height: 25,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'center'
                                            },
                                            defaults: {
                                                xtype: 'label',
                                                margin: '3px 0px 0px 5px'
                                            },
                                            items: [
                                                {
                                                    text: 'Page',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-lbl-currentPage',
                                                    text: '1',
                                                    width: 50
                                                },
                                                {
                                                    text: 'Of',
                                                    width: 50
                                                },
                                                {
                                                    id: prototype.id + '-lbl-pageCount',
                                                    text: '0',
                                                    width: 50
                                                },
                                                {xtype: 'tbspacer', width: 100},
                                                {
                                                    text: 'Total found',
                                                    width: 80
                                                },
                                                {
                                                    id: prototype.id + '-lbl-total',
                                                    text: '0',
                                                    width: 50
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                    ]
                },
                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);



