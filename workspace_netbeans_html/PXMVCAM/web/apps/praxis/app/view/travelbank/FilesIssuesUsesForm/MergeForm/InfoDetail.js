/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.MergeForm.InfoDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id19 + '-infoDetail',
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
                align: 'center'
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="boxMainData">
                {
                    region: 'center',
//                    id: prototype.id19 + '-boxMainData',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        width: '100%',
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id19 + '-gridDataDetail',
                            width: 920,
                            height: 320,
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
                                                tooltip: 'Edit'
                                                        //handler: 'onEditClick'
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
                            id: prototype.id19 + '-pie-1',
                            width: '99%',
                            align: 'center',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id19 + '-boxPaginacion',
                                    width: '100wh',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id19 + '-paggin',
                                                    pageSize: 10,
                                                    border: false,
                                                    displayInfo: true,
                                                    hidden: false
                                                }
                                            ]
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
        }
    ]
});