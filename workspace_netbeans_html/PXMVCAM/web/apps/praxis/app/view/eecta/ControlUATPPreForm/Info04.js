
Ext.define('Ext.Praxis.view.eecta.ControlUATPPreForm.Info04', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id05 + '-info04',
    align: 'left',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id05 + '-boxPrincipal',
            layout: {
                type: 'vbox',
                align: 'left'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'left'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id05 + '-boxMainData',
                    border: false,
                    width: prototype.widthContenedor,
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'left'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="grid">
                        {
                            xtype: 'grid',
                            id: prototype.id05 + '-gridData',
                            columnLines: true,
                            width: 1200,
                            height: 390,
                            padding: '1px 5px 1px 5px',
                            columns: {
                                items: [
                                    {
                                        xtype: 'actioncolumn',
                                        text: '',
                                        sortable: false,
                                        width: 40,
                                        align: 'center',
                                        locked: true,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Detalle de boletos',
                                                handler: 'onDetailClick04'
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Fecha', dataIndex: 'A4516FPROC', width: 70, align: 'center', locked: true
                                    },
                                    {
                                        text: 'Id Cliente', dataIndex: 'A4516CDCLI', width: 90, align: 'center', locked: true
                                    },
                                    {
                                        text: 'Nombre Cliente', dataIndex: 'A3953RSOCI', width: 200, align: 'left', locked: true
                                    },
                                    {
                                        text: 'Lote<br>Envio', dataIndex: 'A4516NLOTE', width: 80, align: 'center'
                                    },
                                    {
                                        text: 'Total<br>Enviado', dataIndex: 'A4516TLTTK', width: 70, align: 'center'
                                    },
                                    {
                                        text: 'Facturación',
                                        columns: [
                                            {text: 'Facturado', dataIndex: 'A4516TLPDF', width: 70, align: 'center'},
                                            {text: 'No<br>Facturado', dataIndex: 'A4516TLNFA', width: 70, align: 'center'},
                                            {text: 'Error', dataIndex: 'A4516TLERR', width: 60, align: 'center',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = 'font-weight:bold;color:red;';
                                                    return value;
                                                }
                                            },
                                            {text: 'Total', dataIndex: 'A4516TTLRC', width: 60, align: 'center'}
                                        ]
                                    },
                                    {
                                        text: 'Estado', dataIndex: 'A4516ESTAD_1', align: 'left', width: 120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (record.get('A4516ESTAD') === '2')
                                                metaData.style = 'font-weight:bold;color:green;';
                                            if (record.get('A4516ESTAD') === '4')
                                                metaData.style = 'font-weight:bold;color:red;';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Enviado a <br>Cliente', dataIndex: 'A4516IENV', align: 'center', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (record.get('A4516IENV') === '1')
                                                metaData.style = 'font-weight:bold;color:green;';
                                            return value==='1'?'Si':'No';
                                        }
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                }
                            },
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                                getRowClass: function (record, rowIndex, rowParams, store) {
                                    if (rowIndex % 2 === 0)
                                        return 'rowA';
                                }
                            },
                            trackMouseOver: true,
                            scope: this,
                            listeners: {
                                scope: this,
                                afterrender: function (obj) {

                                }
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id05 + '-pie',
                            // width: 780,
                            // height: 35,
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
                                    id: prototype.id05 + '-boxPaginacion',
                                    //width: '100%',
                                    //border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id05 + '-paggin',
                                                    pageSize: 20,
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
            ]
        }
    ]
});
