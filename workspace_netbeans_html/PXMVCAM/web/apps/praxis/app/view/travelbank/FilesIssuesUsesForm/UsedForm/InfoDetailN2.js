/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.UsedForm.InfoDetailN2', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id09 + '-infoDetailN2',
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
//                    id: prototype.id07 + '-boxMainData',
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
                            id: prototype.id09 + '-gridDataDetail',
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
                                                handler: 'onEditA4283N2Click'
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Unique Service<br> Credit ID', dataIndex: 'A4283IDISS', width: 100,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Transaction', dataIndex: 'A4283TRNCU', width: 80
                                    },
//                                    {
//                                        text: 'Account<br>Number', dataIndex: 'A4283NCTA', width: 120,
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            metaData.style = "text-align:left;";
//                                            return value;
//                                        }
//                                    },
                                    {
                                        text: 'Used<br>Value', dataIndex: 'A4283VALO1', width: 90,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Curr.', dataIndex: 'A4283MDA1', width: 70,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Date', dataIndex: 'A4283FEMI', width: 80,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Service', dataIndex: 'A4283SERV', width: 80,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Service Type', dataIndex: 'A4283TIPD', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                            //return record.get('A4283CIA') + record.get('A4283FORMA') + record.get('A4283SERIE');
                                        }
                                    },
                                    {
                                        text: 'Ref.', dataIndex: 'A4283REF1', width: 80,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },

                                    {
                                        text: 'Error <br>Code', dataIndex: 'A4283ERR', width: 80,
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
                            id: prototype.id09 + '-pie',
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
                                    id: prototype.id09 + '-boxPaginacion',
                                    width: '100wh',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id09 + '-paggin',
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
//                        // </editor-fold>
                    ]
                }
                // </editor-fold>
            ]
        }
    ]
});