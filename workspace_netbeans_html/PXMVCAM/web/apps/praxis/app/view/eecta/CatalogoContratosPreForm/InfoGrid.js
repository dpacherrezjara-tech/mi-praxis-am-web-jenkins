
Ext.define('Ext.Praxis.view.eecta.CatalogoContratosPreForm.InfoGrid', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-infoGrid',
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
                        // <editor-fold defaultstate="collapsed" desc="gridTree">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            columnLines: true,
                            width: '99%',
                            height: 510,
                            padding: '0px 5px 1px 5px',
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
                                                tooltip: 'Click for view detail',
                                                handler: 'onEditClick'
                                                        //isDisabled: 'onDetailIsDisabled'
                                            }
                                        ]
                                    },
                                    {text: 'Id', dataIndex: 'A4241IDANT', align: 'left', width: 50, locked: true},
                                    {text: 'Date', dataIndex: 'A4241FEC', align: 'left', width: 70, locked: true},
                                    {text: 'Customer<br>Code', dataIndex: 'A4241CDCLI', align: 'left', width: 85, locked: true},
                                    {text: 'Customer Name', dataIndex: 'A3953RSOCI', align: 'left', width: 250, locked: true},
                                    {
                                        text: 'Invoice<br>FA, NC, NC TKT', dataIndex: 'A4241STATB', align: 'center', width: 100, locked: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            metaData.tdStyle = 'font-weight:bold;';
                                            var html = '<img src="resources/img/semaforo/Circle_Silver.png" title="Pendiente" >';
                                            if (record.get('A4241STATB') === '1')
                                                var html = '<img src="resources/img/semaforo/Circle_Green.png" title="Facturado FA" >';
                                            if (record.get('A4241STATB') === 'X')
                                                var html = '<img src="resources/img/semaforo/Circle_Orange.png" title="Enviado para timbrar FA" >';
                                            
                                            var html1 = '<img src="resources/img/semaforo/Circle_Silver.png" title="Pendiente" >';
                                            if (record.get('A4241STA2') === '1')
                                                var html1 = '<img src="resources/img/semaforo/Circle_Green.png" title="Facturado NC" >';
                                            if (record.get('A4241STA2') === 'X')
                                                var html1 = '<img src="resources/img/semaforo/Circle_Orange.png" title="Enviado para timbrar NC" >';
                                            
                                            var html2 = '<img src="resources/img/semaforo/Circle_Silver.png" title="Pendiente" >';
                                            if (record.get('A4241STA1') === '1')
                                                var html2 = '<img src="resources/img/semaforo/Circle_Green.png" title="Facturado NC TKT" >';
                                            if (record.get('A4241STA1') === 'X')
                                                var html2 = '<img src="resources/img/semaforo/Circle_Orange.png" title="Enviado para timbrar NC TKT" >';
                                            
                                            return html + ' ' + html1 + ' ' + html2 ;
                                        }
                                    },
                                    {text: 'Curr.', dataIndex: 'A4241MDA', width: 50, align: 'left'},
                                    {text: 'Amount<br>Prepaid', dataIndex: 'A4241TOTAN', width: 110, align: 'right',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: '% Profit ', dataIndex: 'A4241PORBF', width: 60, align: 'right',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Amount<br>Profit', dataIndex: 'A4241TOTBF', width: 90, align: 'right',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {text: 'Total', dataIndex: 'A4241TOT', width: 120, align: 'right',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    //{text: 'Contr.', dataIndex: 'A4241CONTR', width: 50, align: 'left'},
                                    {
                                        text: 'Control Totals & Balance',
                                        columns: [
                                            {text: 'Available<br>balance', dataIndex: 'A4242SALDO', width: 100, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    metaData.tdStyle = 'font-weight:bold;';
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'Redeemed<br>Prepaid', dataIndex: 'A4242VTAAN', width: 100, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'Balance<br>Prepaid', dataIndex: 'A4242SALAN', width: 100, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'Redeemed<br>Profit', dataIndex: 'A4242VTABF', width: 100, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {text: 'Balance<br>Profit', dataIndex: 'A4242SALBF', width: 100, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
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
                                    if (rowIndex % 2 == 0)
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
