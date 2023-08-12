
Ext.define('Ext.Praxis.view.eecta.CargaRecibosForm.InfoGrid', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id06 + '-info',
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
            id: prototype.id06 + '-boxPrincipal',
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
                    id: prototype.id06 + '-boxMainData',
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
                            id: prototype.id06 + '-gridData',
                            columnLines: true,                            
                            width: 900,
                            height: 430, //490
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
                                    {
                                        xtype: 'actioncolumn',                                        
                                        sortable: false,
                                        width: 40,
                                        align: 'center',
                                        locked: true,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-trash',
                                                tooltip: 'Anular',
                                                handler: 'get_anular_recibo'                                                
                                            }
                                        ]

                                    },
                                    {text: 'Nº Lote', dataIndex: 'A4103LOTE', width: 80, align: 'center', locked: true},                                    
                                    {text: 'Fecha<br>Recibo', dataIndex: 'A4103FECRC', align: 'center', width: 70, locked: true},
                                    {text: 'Fecha<br>Deposito', dataIndex: 'A4103FECDP', align: 'center', width: 70, locked: true},
                                    {text: 'No', dataIndex: 'A4103NRO', align: 'center', width: 40, locked: true},                                    
                                    {text: 'Unidad Ope.', dataIndex: 'A4103UNDOP', align: 'left', width: 120, locked: true},
                                    {text: 'Trx. Origen', dataIndex: 'A4103NUMRC', width: 90, align: 'left', locked: true},
                                    {text: 'Mda.', dataIndex: 'A4103MDARC', width: 50, align: 'center', locked: true},
                                    {text: 'Monto<br>Disponible', dataIndex: 'A4103MONTO', width: 90, align: 'right',locked: true,
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Monto<br>Aplicado', dataIndex: 'A4103TOTAP', width: 90, align: 'right',
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
                                        text: 'Monto<br>Ajuste', dataIndex: 'A4103TAJUS', width: 90, align: 'right',
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
                                        text: 'Saldo', dataIndex: 'A4103SALDO', width: 90, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    //{text: 'Estado<br>Recibo', dataIndex: 'A4079STSRC', width: 90, align: 'left'},
                                    
                                    {text: 'Tipo', dataIndex: 'A4103TIPO', width: 40, align: 'center'},
                                    {text: 'Estado', dataIndex: 'A4103ESTAD', width: 55, align: 'center'},
                                    {text: 'Cuenta', dataIndex: 'A4103CUENT', width: 80, align: 'center'},
                                    {text: 'Descripcion', dataIndex: 'A4103DESRC', width: 120, align: 'left'},                                   
                                    {text: 'Referencia', dataIndex: 'A4103REFRC', width: 120, align: 'left'}                                                                        
//                                    {
//                                        xtype: 'actioncolumn',
//                                        text:'Detalle<br>Aplicacion',
//                                        sortable: false,
//                                        width: 55,
//                                        align: 'center',                                        
//                                        items: [
//                                            {
//                                                iconCls: 'prx-icon-detail',
//                                                tooltip: 'Ver detalle aplicacion de pago',
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
                                markDirty: false,
                                getRowClass: function (record, rowIndex, rowParams, store) {                                    
                                    if ( record.data.A4103STAT === "A" )                  
                                         return 'rowC';                                        
//                                    if (rowIndex % 2 === 0)
//                                        return 'rowA';
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
                            id: prototype.id06 + '-pie',
                            width: 900,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            //height: 35,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id06 + '-boxPaginacion',
                                    //width: 100,
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id06 + '-paggin',
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
