
Ext.define('Ext.Praxis.view.eecta.CargaRecibosForm.InfoGridComplDet', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id08 + '-infoGridComplDet',    
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id08 + '-boxPrincipal',
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
                    id: prototype.id08 + '-boxMainData',
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
                            id: prototype.id08 + '-infoGridCargaRecibosComplDet',
                            columnLines: true,
                            width: 900,
                            height: 350,
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [
                                    
                                    {text: 'Id<br>Documento', dataIndex: 'A4108CFDI', width: 80, align: 'center', locked: true},
                                    {text: 'Serie', dataIndex: 'A4108TIPO', align: 'center', width: 70, locked: true},
                                    {
                                        text: 'Folio', dataIndex: 'A4108CIA', align: 'center', width: 70, locked: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return record.get('A4108CIA')+record.get('A4108FORMA')+record.get('A4108SERIE');
                                        }
                                    
                                    },
                                    {text: 'Mda.', dataIndex: 'A4108MDA', width: 50, align: 'center'},
                                    {text: 'Tipo<br>Cambio', dataIndex: 'A4108TCAM', width: 90, align: 'right',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },   
                                    {text: 'Metodo<br>Pago', dataIndex: 'A4108MPG', align: 'center', width: 70, locked: true},
                                    {text: 'Nº<br>Parcialidad', dataIndex: 'A4108SQAPL', align: 'center', width: 70, locked: true},
                                    {text: 'Importe<br>Saldo Anterior', dataIndex: 'A4108TOT', width: 90, align: 'right',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Importe<br>Pagado', dataIndex: 'A4108TOTAP', width: 90, align: 'right',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Importe<br>Ajuste', dataIndex: 'A4108TAJUS', width: 90, align: 'right',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                     {text: 'Importe<br>Saldo Insuluto', dataIndex: 'A4108SALD', width: 90, align: 'right',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
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
//                            id: prototype.id08 + '-pie',
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
//                                            id: prototype.id08 + '-lbl-currentPage',
//                                            text: '1',
//                                            width: 50
//                                        },
//                                        {
//                                            text: 'Of',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id08 + '-lbl-pageCount',
//                                            text: '0',
//                                            width: 50
//                                        },
//                                        {xtype: 'tbspacer', width: 100},
//                                        {
//                                            text: 'Total Records',
//                                            width: 80
//                                        },
//                                        {
//                                            id: prototype.id08 + '-lbl-total',
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
