
Ext.define('Ext.Praxis.view.eecta.CargaRecibosForm.InfoGridCab', {
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
                            height: 500,  
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
                                    {text: 'Lote', dataIndex: 'A4102LOTE', width: 80, align: 'center', locked: true},
                                    {text: 'Id <br>Carga', dataIndex: 'A4102IDRCB', width: 75, align: 'center', locked: true},
                                    {text: 'Id <br>Cliente', dataIndex: 'A4102CDCLI', width: 75, align: 'center', locked: true},
                                    {text: 'Nombre Cliente', dataIndex: 'A3953RSOCI', width: 260, align: 'left', locked: true},                                    
                                    {text: 'Fecha<br>Recibo', dataIndex: 'A4102FECRC', align: 'center', width: 70, locked: true},
                                    {
                                        xtype: 'actioncolumn',
                                        text:'Detalle<br>Recibos',
                                        sortable: false,
                                        width: 60, locked: true,
                                        align: 'center',                                        
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Ver detalle recibos',
                                                handler: 'onDetailReciboClick'
                                            }
                                        ]

                                    },
                                    {text: 'Qty', dataIndex: 'A4102QTYRC', align: 'center', width: 40, locked: true},                                                                        
                                    {text: 'Mda.', dataIndex: 'A4102MDARC', width: 50, align: 'center', locked: true},
                                    {text: 'Total', dataIndex: 'A4102TOTRC', width: 90, align: 'right',locked: true,
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Total<br>Aplicado', dataIndex: 'A4102TOTAP', width: 90, align: 'right',
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
                                        text: 'Total<br>Ajuste', dataIndex: 'A4102TAJUS', width: 60, align: 'right',
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
                                        xtype: 'actioncolumn',
                                        text:'Detalle<br>Apl.',
                                        sortable: false,
                                        width: 65,
                                        align: 'center',                                        
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Ver detalle aplicacion de pago',
                                                handler: 'onDetailAplClick'
                                            }
                                        ]

                                    },
                                    {
                                        text: 'Saldo', dataIndex: 'A4102SALDO', width: 90, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Estado', dataIndex: 'A4102ESTAD', width: 90, align: 'left'},                                    
                                    
                                    {text: 'Registrado', dataIndex: 'A4102REGIS', align: 'center', width: 80},  
                                    {text: 'Fecha', dataIndex: 'A4102FREGI', align: 'center', width: 70},  
                                    {text: 'Hora', dataIndex: 'A4102HREGI', align: 'center', width: 60},  
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
                                    //console.log(record.data.A3958STSPG); 
                                    if ( record.data.A4102ESTAD === "ANULADO" )                  
                                         return 'rowC';                                        
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
                            id: prototype.id + '-pie',
                            width: '100%',
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
                                    id: prototype.id + '-boxPaginacion',
                                    //width: 100,
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id + '-paggin',
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
//                        {
//                            xtype: 'panel',
//                            id: prototype.id + '-pie',
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
//                                            id: prototype.id + '-lbl-currentPage',
//                                            text: '1',
//                                            width: 50
//                                        },
//                                        {
//                                            text: 'Of',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id + '-lbl-pageCount',
//                                            text: '0',
//                                            width: 50
//                                        },
//                                        {xtype: 'tbspacer', width: 100},
//                                        {
//                                            text: 'Total Records',
//                                            width: 80
//                                        },
//                                        {
//                                            id: prototype.id + '-lbl-total',
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
