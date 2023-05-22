Ext.define('Ext.Praxis.view.travelbank.TransaccionErrorForm.InfoDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id2 + '-infoDetail',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id2 + '-boxConsultas',
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
                    id: prototype.id2 + '-boxMainData',
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
                            id: prototype.id2 + '-gridData',
                            //width: prototype.widthGrid,
                            width: 800,
                            height: 350,
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
                                        text: 'Account Nbr.', dataIndex: 'A4435NCTA', width: 130,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Date', dataIndex: 'A4435FECHA', width: 70
                                    },
                                    {
                                        text: 'Id Trax.', dataIndex: 'A4435ID', width: 90
                                    },
                                    {
                                        text: 'Seq.', dataIndex: 'A4435SQ', width: 50
                                    },
                                    {
                                        text: 'File', dataIndex: 'A4435TYPE', width: 80
                                    },
                                    {
                                        text: 'Serv.Code', dataIndex: 'A4435SERV', width: 80, align: 'center'
                                    },
                                    {
                                        text: 'Type', dataIndex: 'A4435TIPD', width: 80, align: 'center'
                                    },
                                    {
                                        text: 'Ticket', width: 110,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            // metaData.style = "text-align:center;";
                                            return record.get('A4435CIA') + '' + record.get('A4435FORMA') + '' + record.get('A4435SERIE')  ;
                                        }
                                    },
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
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id2 + '-pie',
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
                                    id: prototype.id2 + '-boxPaginacion',
                                    width: '100wh',                                    
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id2 + '-paggin',
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