
Ext.define('Ext.Praxis.view.eecta.CargaRecibosForm.InfoGrid', {
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
            id: prototype.id + '-boxPrincipal',
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
                    id: prototype.id + '-boxMainData',
                    border: false,
                    width: prototype.widthContenedor,
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
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
                            id: prototype.id + '-gridData',
                            columnLines: true,                            
                            width: '100%',
                            height: 490,
                            padding: '0px 5px 1px 5px',
//                            features: [
//                                {
//                                    dock: 'bottom',
//                                    ftype: 'summary'
//                                }
//                            ],
//                            selModel: {                                
//                                selType: 'checkboxmodel',
//                                listeners: {
//                                    beforeselect: function (grid, record, index, eOpts, metaData) {
//                                        return true;
//                                        if (Ext.String.trim(record.get('FLAG')) === 'Y')
//                                            return false;
//                                    }
//                                }
//                            },
                            columns: {
                                items: [                                    
                                    {text: 'Nº Lote', dataIndex: 'A4096LOTE', width: 80, align: 'center', locked: true},
                                    {text: 'Fecha<br>Carga', dataIndex: 'A4096FCARG', align: 'center', width: 70, locked: true},
                                    {text: 'Fecha<br>Recibo', dataIndex: 'A4096FRCBO', align: 'center', width: 70, locked: true},
                                    {text: 'Fecha<br>Deposito', dataIndex: 'A4096FDPTO', align: 'center', width: 70, locked: true},
                                    {text: 'No', dataIndex: 'A4096NRO', align: 'center', width: 40, locked: true},                                    
                                    {text: 'Unidad Ope.', dataIndex: 'A4096UNDOP', align: 'left', width: 120, locked: true},
                                    {text: 'Trx. Origen', dataIndex: 'A4096TRXOR', width: 90, align: 'left', locked: true},
                                    {text: 'Mda.', dataIndex: 'A4096MDATX', width: 50, align: 'center', locked: true},
                                    {text: 'Monto<br>Disponible', dataIndex: 'A4096MONTO', width: 90, align: 'right',locked: true,
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Tipo', dataIndex: 'A4096TIPO', width: 40, align: 'center'},
                                    {text: 'Estado', dataIndex: 'A4096ESTAD', width: 55, align: 'center'},
                                    {text: 'Cuenta', dataIndex: 'A4096CUENT', width: 80, align: 'center'},
                                    {text: 'Descripcion', dataIndex: 'A4096DESCR', width: 120, align: 'left'},                                   
                                    {text: 'Referencia', dataIndex: 'A4096REFER', width: 120, align: 'left'}, 
                                    //{text: 'Estado<br>Recibo', dataIndex: 'A4079STSRC', width: 90, align: 'left'},                                     
                                    {
                                        text: 'Monto<br>Aplicado', dataIndex: 'A4096TOTAP', width: 90, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {                                            
                                            metaData.style = 'font-weight:bold;color:green;';                                            
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Saldo', dataIndex: 'A4096SALDP', width: 90, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Cliente', dataIndex: 'A4096CDCLI', width: 70, align: 'left'},
                                    {text: 'Err.', dataIndex: 'A4096DESER', width: 70, align: 'left'}
                                    //{text: 'Banco', dataIndex: 'A3953BANCO', width: 70, align: 'left'},                                    
                                    //{text: 'Cta. Bancaria', dataIndex: 'A3953CTABC', width: 70, align: 'left'},
//                                    {
//                                        xtype: 'actioncolumn',
//                                        text:'Detalle<br>Pagos',
//                                        sortable: false,
//                                        width: 55,
//                                        align: 'center',                                        
//                                        items: [
//                                            {
//                                                iconCls: 'prx-icon-detail',
//                                                tooltip: 'Ver detalle de boletos',
//                                                handler: 'onDetailPagoClick'
//                                            }
//                                        ]
//
//                                    }
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
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            width: prototype.widthGrid,
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
                            padding: '1px 1px 1px 1px',
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
                                            text: 'Total Records',
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
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});
