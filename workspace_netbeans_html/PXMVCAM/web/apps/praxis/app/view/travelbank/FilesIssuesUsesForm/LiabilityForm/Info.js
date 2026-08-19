Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.LiabilityForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id19 + '-info',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id19 + '-boxConsultas',
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
                    id: prototype.id19 + '-boxMainData',
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
                            id: prototype.id19 + '-gridData',
                            //width: prototype.widthGrid,
                            width: 1100,
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
                                    {
                                        text: 'Edit',
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 60,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                tooltip: 'Edit',
                                                handler: 'onEditClick'
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Unique Service<br> Credit ID', dataIndex: 'A4357IDMER', width: 90,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Transacction', dataIndex: 'A4357TRNCU', width: 80
                                    },
                                    {
                                        text: 'Account<br>Number', dataIndex: 'A4357NCTAT', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Service<br> Credit Code', dataIndex: 'A4357SERV', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Currency', dataIndex: 'A4357MDA', width: 80,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },

                                    {
                                        text: 'Original<br>Amount', dataIndex: 'A4357VALOR', width: 80,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Balance<br>Remainin', dataIndex: 'A4357BALNC', width: 80,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Service<br>Type', dataIndex: 'A4357TIPD', width: 80,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Issue Date', dataIndex: 'A4357FEMI', width: 80,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Expire<br> Date', dataIndex: 'A4357FEXP', width: 80,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
//                                    {
//                                        text: 'Accounting',
//                                        columns: [
//                                            {text: 'Period', dataIndex: 'A4357PCONT', width: 80, align: 'center'},
//                                            {text: 'Date', dataIndex: 'A4357FCONT', width: 80, align: 'center'}
//                                        ]
//                                    },
                                    {
                                        text: 'Delivery',
                                        columns: [
                                            {text: 'Transmission date', dataIndex: 'A4357PRDA', width: 90, align: 'center'},
                                            {text: 'Nbr<br>Identifier', dataIndex: 'A4357IDFIL', width: 70, align: 'center'},
                                            {text: 'File Type', dataIndex: 'A4357TYPE', width: 70, align: 'center'}
                                        ]
                                    },
                                    {
                                        text: 'Error <br>Code', dataIndex: 'A4357ERR', width: 80,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id19 + '-pie',
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
                                            id: prototype.id19 + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id19 + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id19 + '-lbl-total',
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