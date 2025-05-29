/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

Ext.define('Ext.Praxis.view.flown.SimplifiedUsageFileControlForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
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
                            //width: 990,
                            width: '99%',
                            height: 350,
                            padding: '0px 5px 1px 5px',
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {text: 'Nbr ID', dataIndex: 'RN', width: 80, align: 'center'},
                                    {text: 'File Date', dataIndex: 'FECHA', align: 'center', width: 80},
                                    {text: 'File Name', dataIndex: 'FILNAME', align: 'left', flex: 1},
                                    {
                                        text: 'Record Type Count',
                                        columns: [
                                            {text: 'Lift', dataIndex: 'QTYLIFT', width: 70, align: 'center'},
                                            {text: 'Payable', dataIndex: 'QTYIPAY', width: 70, align: 'center'},
                                            {text: 'Total', dataIndex: 'QTYTOTAL', width: 70, align: 'center'}
                                        ]
                                    },
                                    {text: 'Status', dataIndex: 'ESTADO_1', width: 100, align: 'left',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            
                                            if (record.get('ESTADO') === '1' || record.get('ESTADO') === '3' )
                                                metaData.style = 'font-weight:bold;color:blue;';
                                                                                        
                                            return value;
                                        }
                                    },
                                    {text: 'Message', dataIndex: 'LOGTXT', width: 200, align: 'left',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            if (record.get('ESTADO') === '0' || record.get('ESTADO') === '2' )
                                                metaData.style = 'font-weight:bold;color:green;';
                                            if (record.get('ESTADO') === '1' || record.get('ESTADO') === '3' )
                                                metaData.style = 'font-weight:bold;color:red;';
                                            if (record.get('ESTADO') === '4' || record.get('ESTADO') === '5' )
                                                metaData.style = 'font-weight:bold;color:orange;';
                                            
                                            return value;
                                        }
                                    },
//                                    {text: 'Fare', dataIndex: 'A3957FARE', width: 90, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        },
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
//                                            return Ext.util.Format.number(value, '0,000.00');
//                                        }
//                                    },

//                                    {
//                                        xtype: 'actioncolumn',
//                                        sortable: false,
//                                        width: 40,
//                                        align: 'center',
//                                        items: [
//                                            {
//                                                iconCls: 'prx-icon-pdf',
//                                                tooltip: 'Detail',
//                                                handler: 'onReportVentaUATP_PDF'
//                                            }
//                                        ]
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
