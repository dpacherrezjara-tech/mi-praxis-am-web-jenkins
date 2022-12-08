/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

Ext.define('Ext.Praxis.view.payments.LoadDeliveryForm.Info', {
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
//                {
//                    region: 'center',
//                    id: prototype.id + '-boxMainData',
//                    border: false,
//                    width: prototype.widthContenedor,
//                    hidden: false,
//                    layout: {
//                        type: 'vbox',
//                        align: 'center'
//                    },
//                    defaults: {
//                        bodyStyle: 'background: transparent;',
//                        border: false,
//                        align: 'left'
//                    },
//                    items: [
//                        // <editor-fold defaultstate="collapsed" desc="gridTree">
//                        {
//                            xtype: 'grid',
//                            id: prototype.id + '-gridData',
//                            columnLines: true,
//                            width: '100%',
//                            height: 400,
//                            padding: '0px 5px 1px 5px',
//                            columns: {
//                                items: [
//                                    {text: 'Id File', dataIndex: 'a4298IDFIL', width: 110, align: 'center'},
//                                    {text: 'Seq.', dataIndex: 'a4298SQFIL', align: 'center', width: 80},
//                                    {text: 'Processing date', dataIndex: 'a4298PRDA', align: 'center', width: 120},
//                                    {text: 'Record Type', dataIndex: 'a4298TYPE', width: 110, align: 'center', padding: 8, flex: 1},
//                                    {text: 'Total de <br> Lineas File', dataIndex: 'a4298TLIN', width: 120, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0');
//                                        },
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
//                                            return Ext.util.Format.number(value, '0');
//                                        }
//                                    },
//                                    {text: 'Transacciones <br> Grabadas', dataIndex: 'a4298QTRN', width: 120, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0');
//                                        },
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
//                                            return Ext.util.Format.number(value, '0');
//                                        }
//                                    },
//                                    {text: 'Lineas <br> Recibicidas', dataIndex: 'a4298QLIN', width: 120, align: 'right',
//                                        summaryType: 'sum',
//                                        summaryRenderer: function (value, summaryData, dataIndex) {
//                                            return Ext.util.Format.number(value, '0');
//                                        },
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
//                                            return Ext.util.Format.number(value, '0');
//                                        }
//                                    },
//                                    {
//                                        text: 'Estado<br>Carga', dataIndex: 'a4298STREC', width: 120, align: 'center',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            var html = '<img src="resources/img/semaforo/Circle_Silver.png" title="ERROR" >';
//                                            if (record.get('a4298STREC') === '0')
//                                                var html = '<img src="resources/img/semaforo/Circle_Green.png" title="OK" >';
//                                            return html;
//                                        }
//                                    },
//                                    {
//                                        text: 'Estado<br>Formateo', dataIndex: 'a4298STCAR', width: 120, align: 'center',
//                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                            var html = '<img src="resources/img/semaforo/Circle_Silver.png" title="PENDIENTE" >';
//                                            if (record.get('a4298STCAR') !== 'P')
//                                                var html = '<img src="resources/img/semaforo/Circle_Green.png" title="FORMATEADO" >';
//                                            return html;
//                                        }
//                                    },
//                                    {
//                                        xtype: 'actioncolumn',
//                                        sortable: false,
//                                        width: 50,
//                                        align: 'center',
//                                        items: [
//                                            {
//                                                getClass: function (v, meta, rec) {
//                                                    return 'prx-icon-detail';
//                                                },
//                                                tooltip: 'Click for Show Delivery',
//                                                handler: 'onShowDelivery'
//                                            }
//                                        ]
//                                    }
//                                ],
//                                defaults: {
//                                    sortable: false,
//                                    menuDisabled: true,
//                                    align: 'center'
//                                            //padding:'8px'
//                                }
//                            },
//                            bbar: Ext.create('Ext.PagingToolbar', {
//                                id: prototype.id + '-PagingToolbar',
//                                displayInfo: true,
//                                displayMsg: 'Displaying records {0} - {1} of {2}',
//                                emptyMsg: "No records to display",
//                                inputItemWidth: 35
//                            })
//                        },
//                        {
////                            xtype: 'panel',
////                            id: prototype.id + '-pie',
////                            width: 210,
////                            height: 35,                            
////                            layout: {
////                                type: 'hbox',
////                                pack: 'center'
////                            },
////                            border: true,                            
////                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
////                            defaults: {
////                                border: true
////                            },
////                            padding: '1px 1px 1px 1px',
////                            items: [
////                                {
////                                    xtype: 'panel',
////                                    id: prototype.id + '-boxPaginacion',
////                                    width: 210,
////                                    border: false,
////                                    items: [
////                                        {
////                                            xtype: 'toolbar',
////                                            cls: 'x-toolbar-pag',
////                                            items: [
////                                                {
////                                                    xtype: 'pagingtoolbar',
////                                                    id: prototype.id + '-paggin',
////                                                    pageSize: 20,
////                                                    border: false,
////                                                    displayInfo: true,
////                                                    hidden: false
////                                                }
////                                            ]
////                                        }
////                                    ]
////                                }
////                            ]
//                        }
//                        // </editor-fold>                        
//                    ]
//                },
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    border: false,
                    width: prototype.widthContenedor,
                    height:550,
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
                        // <editor-fold defaultstate="collapsed" desc="panelTree">
                        {
                                    xtype: 'panel',
                                    id: prototype.id+'-boxDetail',
                                    width:'100%',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        bodyStyle: 'background: transparent;'
                                    },
                                    items: [
                                    ]
                                }
                        // </editor-fold>                        
                    ]
                }

            ]
        }
    ]
});


