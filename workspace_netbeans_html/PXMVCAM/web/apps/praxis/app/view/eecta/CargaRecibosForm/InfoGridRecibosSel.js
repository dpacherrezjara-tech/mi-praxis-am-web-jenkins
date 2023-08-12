
Ext.define('Ext.Praxis.view.eecta.CargaRecibosForm.InfoGridRecibosSel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id09 + '-infoGridRecibosSel',    
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id09 + '-boxPrincipal',
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
                    id: prototype.id09 + '-boxMainData',
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
                            id: prototype.id09 + '-infoGridSeleccionados',
                            columnLines: true,                            
                            width: 650,
                            height: 250,
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [                                      
                                    {text: 'Trx. Origen', dataIndex: 'A4096TRXOR', width: 90, align: 'left', locked: true},
                                    {text: 'Mda.', dataIndex: 'A4096MDATX', width: 50, align: 'center', locked: true},
                                    {text: 'Monto<br>Disponible', dataIndex: 'A4096MONTO', width: 90, align: 'right', locked: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Tipo', dataIndex: 'A4096TIPO', width: 40, align: 'center', locked: true},
                                    {text: 'Estado', dataIndex: 'A4096ESTAD', width: 55, align: 'center', locked: true},
                                    {text: 'Cuenta', dataIndex: 'A4096CUENT', width: 80, align: 'center'},
                                    {text: 'Descripcion', dataIndex: 'A4096DESCR', width: 120, align: 'left'},                                   
                                    {text: 'Referencia', dataIndex: 'A4096REFER', width: 120, align: 'left'},
                                    {
                                        text: 'Cliente Actual',
                                        columns: [
                                            {text: 'Codigo', dataIndex: 'A4096CDCLI', width: 70, align: 'left'},
                                            {text: 'Nombre', dataIndex: 'A3953RSOCI', width: 200, align: 'left'}
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
//                            id: prototype.id09 + '-pie',
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
//                                            id: prototype.id09 + '-lbl-currentPage',
//                                            text: '1',
//                                            width: 50
//                                        },
//                                        {
//                                            text: 'Of',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id09 + '-lbl-pageCount',
//                                            text: '0',
//                                            width: 50
//                                        },
//                                        {xtype: 'tbspacer', width: 100},
//                                        {
//                                            text: 'Total Records',
//                                            width: 80
//                                        },
//                                        {
//                                            id: prototype.id09 + '-lbl-total',
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
