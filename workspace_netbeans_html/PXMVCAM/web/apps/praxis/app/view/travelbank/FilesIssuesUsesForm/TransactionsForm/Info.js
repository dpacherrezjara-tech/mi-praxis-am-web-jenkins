Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.TransactionsForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id22 + '-info',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id22 + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="boxMainData">
                {
                    region: 'center',
                    id: prototype.id22 + '-boxMainData',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        //width: prototype.widthGrid,
                        width: '100%',
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id22 + '-gridData',
                            //width: prototype.widthGrid,
                            width: 850,
                            // width: '100vw',
                            height: 510,
                            columnLines: true,
                            margin: 3,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
//                                    {
//                                        text: 'Edit',
//                                        sortable: false,
//                                        xtype: 'actioncolumn',
//                                        width: 60,
//                                        align: 'center',
//                                        items: [
//                                            {
//                                                iconCls: 'prx-icon-edit',
//                                                tooltip: 'Edit',
//                                                handler: 'onEditClick'
//                                            }
//                                        ]
//                                    },
                                    {
                                        text: 'File', dataIndex: 'XFILE', width: 90,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Transacction', dataIndex: 'XTRANSACTION', width: 100
                                    },
                                    {
                                        text: 'Date', dataIndex: 'XDATE', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Ticket', dataIndex: 'XTICKET', width: 110,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Curr.', dataIndex: 'XCURR', width: 70,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },

                                    {
                                        text: 'Value', dataIndex: 'XVALUE', width: 90,
                                        renderer: function (value, metaData) {
                                            if (value < 0)
                                                metaData.style = "text-align:right;color:red";
                                            else
                                                metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Balance', dataIndex: 'XBALANCE', width: 90,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');;
                                        }
                                    },
                                    {
                                        text: 'TC. BSR', dataIndex: 'XTCAMBIO', width: 90,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0.000000');;
                                        }
                                    },
                                    {
                                        text: 'Valor USD', dataIndex: 'XVREVENUE', width: 90,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');;
                                        }
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id22 + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center',
                                padding: 2
                            },
                            border: true,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: 1,
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
                                            id: prototype.id22 + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id22 + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id22 + '-lbl-total',
                                            text: '0',
                                            width: 50
                                        }
                                    ]
                                }
                            ]
                        }
                        // </editor-fold>
                    ]
                }
                // </editor-fold>
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
});