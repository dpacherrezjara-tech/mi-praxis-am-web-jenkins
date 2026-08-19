
Ext.define('Ext.Praxis.view.eecta.CargaRecibosForm.InfoGridCompl', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id07 + '-infoGridCompl',
    //layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id07 + '-boxPrincipal',
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
                {
                    region: 'center',
                    id: prototype.id07 + '-boxMainData',
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
                            id: prototype.id07 + '-infoGridCargaRecibosCompl',
                            columnLines: true,
                            width: 900,
                            height: 350,
                            padding: '0px 5px 1px 5px',
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
                                                tooltip: 'Detalle documentos relacionados',
                                                handler: 'onDetailClickDocRelacionado'
                                            }
                                        ]
                                    },
                                    {text: 'Nº Envio', dataIndex: 'A4107NLOTE', width: 80, align: 'center', locked: true},
                                    {text: 'Fecha', dataIndex: 'A4107FPROC', align: 'center', width: 70, locked: true},
                                    {text: 'IdCliente', dataIndex: 'A4107CDCLI', align: 'center', width: 70, locked: true},
                                    {text: 'RFC', dataIndex: 'A4107RFC', align: 'center', width: 90, locked: true},
                                    {text: 'Cliente', dataIndex: 'A4107RSOCI', align: 'center', width: 230, locked: true},
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
                                                handler: 'onDonwloadDocumentPDFClick'
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
                                                handler: 'onDonwloadDocumentXMLClick'
                                            }
                                        ]
                                    },
                                    {text: 'Fecha<br>Pago', dataIndex: 'A4107FPAGO', width: 70, align: 'left'},
                                    {text: 'Forma de<br> Pago', dataIndex: 'A4107FOP', width: 70, align: 'center'},
                                    {text: 'Mda.', dataIndex: 'A4107MONED', width: 50, align: 'center'},
                                    {text: 'Monto', dataIndex: 'A4107TMONT', width: 90, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Número <br>de Operación', dataIndex: 'A4107NUMRC', align: 'left', width: 120},
                                    {text: 'Folio Fiscal', dataIndex: 'A4107FFISC', align: 'left', width: 120},
                                    {text: 'Nº Certificado', dataIndex: 'A4107NSERI', align: 'left', width: 80},
                                    {text: 'Fecha<br>Emisión', dataIndex: 'A4107FEMIS', align: 'center', width: 70},
                                    {
                                        text: 'Estado', dataIndex: 'A4107ESTAD', width: 120, align: 'center', locked: false
                                    },
                                    {
                                        text: 'Mensaje <br>Error', dataIndex: 'A4107RMSG', width: 170, align: 'left',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (record.get('A4107ESTAD') === '0')
                                                metaData.style = 'font-weight:bold;color:green;';
                                            if (record.get('A4107ESTAD') !== '0')
                                                metaData.style = 'font-weight:bold;color:red;';
                                            return value;
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
                                markDirty: false
                            },
                            trackMouseOver: true,
                            scope: this,
                            listeners: {
                                scope: this,
                                afterrender: function (obj) {

                                }
                            }
                        }
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
//                        {
//                            xtype: 'panel',
//                            id: prototype.id07 + '-pie',
//                            width: prototype.widthGrid,
//                            layout: {
//                                type: 'hbox',
//                                pack: 'center'
//                            },
//                            border: true,
//                            height: 25,
//                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
//                            defaults: {
//                                border: true
//                            },
//                            padding: '1px 1px 1px 1px',
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
//                                            id: prototype.id07 + '-lbl-currentPage',
//                                            text: '1',
//                                            width: 50
//                                        },
//                                        {
//                                            text: 'Of',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id07 + '-lbl-pageCount',
//                                            text: '0',
//                                            width: 50
//                                        },
//                                        {xtype: 'tbspacer', width: 100},
//                                        {
//                                            text: 'Total Records',
//                                            width: 80
//                                        },
//                                        {
//                                            id: prototype.id07 + '-lbl-total',
//                                            text: '0',
//                                            width: 50
//                                        }
//                                    ]
//                                }
//                            ]
//                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});
