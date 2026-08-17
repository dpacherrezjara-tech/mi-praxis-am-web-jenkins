
Ext.define('Ext.Praxis.view.eecta.CargaRecibosForm.InfoGridAplCab', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id05 + '-infoGridAplCab',
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
                align: 'center'
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
                            id: prototype.id05 + '-infoGridCab',
                            columnLines: true,
                            width: 890,
                            height: 170,
                            padding: '0px 5px 1px 5px',
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            plugins: 'gridfilters',
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
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Ver detalle de pago',
                                                handler: 'get_apl_recibo_det'
                                            }
                                        ]

                                    }, 
                                    {text: 'Id Apl.', dataIndex: 'A4105IDAPL', width: 90, align: 'center', locked: true,
                                        summaryType: 'count',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000') + ' Pago(s)' ;
                                        },
                                        filter: {                                            
                                            type: 'string',                                            
                                            //value: '139', // setting a value makes the filter active.
                                            itemDefaults: {
                                                // any Ext.form.field.Text configs accepted
                                            }
                                        }
                                    },                                                                        
                                    //{text: 'Ref. Pago', dataIndex: 'A3959REFPG', align: 'left', width: 130, locked: true},
                                    {text: 'Fecha<br>Pago', dataIndex: 'A4105FECPG', align: 'left', width: 70},
                                    {text: 'Mda<br>Pago', dataIndex: 'A4105MDAPG', align: 'center', width: 60},                                                                        
                                    {
                                        text: 'Total<br>Pago', dataIndex: 'A4105TOTPG', width: 80, align: 'right',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            metaData.style = 'font-weight:bold;color:green;';     
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },                                                                        
                                    {text: 'Tipo<br>Aplicacion', dataIndex: 'A4105TIPPG_00', align: 'left', width: 100},
                                    {text: 'Usuario', dataIndex: 'A4105REGIS', width: 80, align: 'left'},
                                    {text: 'Fecha', dataIndex: 'A4105FREGI', width: 80, align: 'left'},
                                    {text: 'Hora', dataIndex: 'A4105HREGI', width: 50, align: 'left'}
                                    //{text: 'Banco', dataIndex: 'A3959BANCO', align: 'left', width: 130},
                                    //{text: 'Cta Bancaria', dataIndex: 'A3959CTABC', align: 'left', width: 100}
                                ],
                                defaults: {
                                    sortable: true,
                                    menuDisabled: false,
                                    align: 'center'
                                }
                            },
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
                                getRowClass: function (record, rowIndex, rowParams, store) {
                                    //console.log(record.data.A3958STSPG); 
//                                    if ( record.data.A3958STSPG === "T" )                  
//                                         return 'rowC';                                        
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
                        }
                                // </editor-fold>
                                // <editor-fold defaultstate="collapsed" desc="pie">
//                        {
//                            xtype: 'panel',
//                            id: prototype.id05 + '-pie',
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
//                                            id: prototype.id05 + '-lbl-currentPage',
//                                            text: '1',
//                                            width: 50
//                                        },
//                                        {
//                                            text: 'Of',
//                                            width: 50
//                                        },
//                                        {
//                                            id: prototype.id05 + '-lbl-pageCount',
//                                            text: '0',
//                                            width: 50
//                                        },
//                                        {xtype: 'tbspacer', width: 100},
//                                        {
//                                            text: 'Total Records',
//                                            width: 80
//                                        },
//                                        {
//                                            id: prototype.id05 + '-lbl-total',
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
