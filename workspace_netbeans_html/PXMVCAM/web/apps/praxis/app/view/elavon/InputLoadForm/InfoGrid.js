/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

Ext.define('Ext.Praxis.view.elavon.InputLoadForm.InfoGrid', {
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
                        // <editor-fold defaultstate="collapsed" desc="gridTree">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            columnLines: true,
                            //width: 990,
                            width: '100%',
                            height: 510,
                            padding: '0px 5px 1px 5px',
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            resizable: false,
                            columns: {
                                items: [
                                    {text: 'Id <br> Consecutivo', dataIndex: 'A4294IDFIL', width: 110, align: 'center', padding: 8},
                                    {text: 'Fecha Proceso', dataIndex: 'A4294PRDA', align: 'center', width: 120},
                                    {text: 'Nombre de Archivo', dataIndex: 'A4294FLNM', align: 'left', width: 120, flex: 1},
                                    {text: 'Total de <br> Registros de <br> Archivo', dataIndex: 'A4294TTRF', width: 120, align: 'left',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0');
                                        }
                                    },
                                    {text: 'Registros <br> Cargados', dataIndex: 'A4294TTRC', width: 120, align: 'left',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0');
                                        }
                                    },
                                    {text: 'Registros <br> procesados', dataIndex: 'A4294TTRP', width: 120, align: 'left',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0');
                                        }
                                    },
                                    {
                                        text: 'Registros <br> MATCH', dataIndex: 'A4294TTRM', width: 120, align: 'left',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0');
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        sortable: false,
                                        width: 50,
                                        align: 'center',
                                        items: [
                                            {
                                                getClass: function (v, meta, rec) {
                                                    switch (rec.get("A4294STCAR")){
                                                        case 'P':
                                                            return 'prx-icon-incomplete';
                                                            break;
                                                        case '0':
                                                            return 'prx-icon-downloadfile';
                                                            break;
                                                        default:
                                                            return 'prx-icon-process-error';
                                                    }
                                                    console.log(rec.get("A4294STCAR"));
                                                },
                                                tooltip: 'Click for download',
                                                handler: 'onDownloadClick'
                                            }
                                        ]
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center',
                                    //padding:'8px'
                                }
                            },
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
//                                getRowClass: function (record, rowIndex, rowParams, store) {
//                                    if (rowIndex % 2 == 0)
//                                        return 'rowA';
//                                }
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


