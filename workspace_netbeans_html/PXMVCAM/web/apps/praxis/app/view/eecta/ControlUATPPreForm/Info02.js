
Ext.define('Ext.Praxis.view.eecta.ControlUATPPreForm.Info02', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id03 + '-info02',
    align: 'left',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id03 + '-boxPrincipal',
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
                    id: prototype.id03 + '-boxMainData',
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
                            id: prototype.id03 + '-gridData',
                            columnLines: true,
                            width: 990,
                            height: 390,
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [
                                    {
                                        text: 'Ticket', dataIndex: 'A4250SERIE', width: 110, align: 'center', locked: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return record.get('A4250CIA') + record.get('A4250FORMA') + record.get('A4250SERIE');
                                        }
                                    },
                                    {
                                        text: 'Seq', dataIndex: 'A4250SEQ', width: 40, align: 'center', locked: true
                                    },
//                                    {
//                                        text: 'PNR', dataIndex: 'A4250PNR', width: 50, align: 'center', locked: true
//                                    },
                                    {
                                        text: 'Estado', dataIndex: 'A4250STAT', align: 'center', width: 100, locked: true,
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            var VL_DES = 'Pendiente';
//                                            if (record.get('A4250STAT') === '2')
//                                                VL_DES = 'Error al obtener UUID';
//                                            if (record.get('A4250STAT') === '1')
//                                                VL_DES = 'OK';
//                                            var html = '<img src="resources/img/semaforo/Circle_Silver.png" title="' + VL_DES + '">';
//                                            if (value === '1')
//                                                html = '<img src="resources/img/semaforo/Circle_Green.png" title="' + VL_DES + '" >';
//                                            if (value === '2')
//                                                html = '<img src="resources/img/semaforo/Circle_Red.png" title="' + VL_DES + '" >';
//                                            return html;
//                                        }
                                    },
                                    {text: 'Trx.', dataIndex: 'A4250TRNCU', align: 'center', width: 60, locked: true},
                                    {text: 'Fecha<br>Contable', dataIndex: 'A4250FCONT', align: 'center', width: 70, locked: true},
                                    {
                                        text: 'Información Pre-Compra',
                                        columns: [
                                            {text: '# Id', dataIndex: 'A4250IDANT', width: 60, align: 'left'},
                                            {text: 'UUID', dataIndex: 'A4250CFDIP', width: 150, align: 'left'}
                                        ]
                                    },
                                    {
                                        text: 'Información Facturación',
                                        columns: [
                                            {
                                                xtype: 'actioncolumn',
                                                text: 'PDF',
                                                sortable: false,
                                                width: 40,
                                                align: 'center',
                                                locked: false,
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-download',
                                                        tooltip: 'Descargar documento PDF',
                                                        handler: 'onPreDonwloadDocumentPDFClick'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'actioncolumn',
                                                text: 'XML',
                                                sortable: false,
                                                width: 40,
                                                align: 'center',
                                                locked: false,
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-download',
                                                        tooltip: 'Descargar documento XML',
                                                        handler: 'onPreDonwloadDocumentXMLClick'
                                                    }
                                                ]
                                            },
                                            {text: 'Estado', dataIndex: 'A4250STDE', width: 90, align: 'left'},
                                            {text: 'CDFI', dataIndex: 'A4250CFDI', width: 150, align: 'left'},
                                            {text: 'Fecha', dataIndex: 'A4250FECTB', width: 70, align: 'center'},
                                            {text: 'FOP', dataIndex: 'A4250FOP', width: 60, align: 'center'},
                                            {text: 'Metodo', dataIndex: 'A4250MPG', width: 60, align: 'center'},
                                            {text: 'Tipo', dataIndex: 'A4250TIPO', width: 50, align: 'center'},
                                            {text: 'RFC', dataIndex: 'A4250RFC', width: 80, align: 'left'},
                                            //{text: 'RFC Name', dataIndex: 'A4250RFCN', width: 210, align: 'left'},                                            
                                            {text: 'Detalle<br>Mensaje', dataIndex: 'A4250RMSG', width: 110, align: 'left'}
                                        ]
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
                            id: prototype.id03 + '-pie',
                            width: 780,
                            height: 35,
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
                                    id: prototype.id03 + '-boxPaginacion',
                                    width: '99%',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id03 + '-paggin',
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
