/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.ExpireForm.InfoDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id12 + '-infoDetail',
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
//                    id: prototype.id12 + '-boxMainData',
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
                            id: prototype.id12 + '-gridDataDetail',
                            width: 920,
                            height: 250,
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
                                        text: 'Credit Expiry<br>Transaction ID', dataIndex: 'A4308IDEXP', width: 90,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Transacction', dataIndex: 'A4308TRNCU', width: 80
                                    },
                                    {
                                        text: 'Account<br>Number', dataIndex: 'A4308NCTA', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Service<br> Credit Code', dataIndex: 'A4308SERV', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Expire value', dataIndex: 'A4308VALOR', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },

                                    {
                                        text: 'Currency', dataIndex: 'A4308MDA', width: 80,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    
                                    {
                                        text: 'Service<br>Type', dataIndex: 'A4308TIPD', width: 80,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Issue Date', dataIndex: 'A4308FEMI', width: 80,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Expire<br> Date', dataIndex: 'A4308FEXP', width: 80,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
//                                    {
//                                        text: 'Document<br> number', width: 80,
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "text-align:center;";
//                                            return record.get('A4281CIA') + record.get('A4281FORMA') + record.get('A4281SERIE');
//                                        }
//                                    },
                                    {
                                        text: 'ID <br>Reference Nbr', dataIndex: 'A4308IDISS', width: 80,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Error <br>Code', dataIndex: 'A4308ERR', width: 80,
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
                            id: prototype.id12 + '-pie-1',
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
                                    id: prototype.id12 + '-boxPaginacion',
                                    width: '100wh',                                    
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id12 + '-paggin',
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
//                        // <editor-fold defaultstate="collapsed" desc="pie">
//                        {
//                            xtype: 'panel',
//                            id: prototype.id12 + '-pie-1',
//                            layout: {
//                                type: 'hbox',
//                                pack: 'center',
//                                padding: 2
//                            },
//                            border: true,
//                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                            defaults: {
//                                border: true
//                            },
//                            padding: 1,
//                            items: [
//                                {
//                                    xtype: 'panel',
//                                    width: prototype.widthGrid,
//                                    height: 25,
//                                    layout: {
//                                        type: 'hbox',
//                                        pack: 'center'
//                                    },
//                                    defaults: {
//                                        xtype: 'label',
//                                        margin: '3px 0px 0px 5px'
//                                    },
//                                    items: [
//                                        {
//                                            text: 'Page',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id12 + '-lbl-currentPage',
//                                            text: '1',
//                                            width: 50
//                                        },
//                                        {
//                                            text: 'Of',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id12 + '-lbl-pageCount',
//                                            text: '0',
//                                            width: 50
//                                        },
//                                        {xtype: 'tbspacer', width: 100},
//                                        {
//                                            text: 'Total found',
//                                            width: 80
//                                        },
//                                        {
//                                            id: prototype.id12 + '-lbl-total',
//                                            text: '0',
//                                            width: 50
//                                        }
//                                    ]
//                                }
//                            ]
//                        }
//                        // </editor-fold>
                    ]
                }
                // </editor-fold>
            ]
        }
    ]
});