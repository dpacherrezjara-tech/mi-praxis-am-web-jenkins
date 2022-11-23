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
                            width: '100%',
                            height: 510,
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [
                                    {text: 'Record Type', dataIndex: 'a4298TYPE', width: 110, align: 'center', padding: 8,flex:1},
                                    {text: 'Fecha Proceso', dataIndex: 'a4298PRDA', align: 'center', width: 120},
                                    {text: 'Secuencia', dataIndex: 'a4298SQFIL', align: 'left', width: 120},
                                    {text: 'Total de <br> Lineas File', dataIndex: 'a4298TLIN', width: 120, align: 'left',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0');
                                        }
                                    },
                                    {text: 'Transacciones <br> Grabadas', dataIndex: 'a4298QTRN', width: 120, align: 'left',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0');
                                        }
                                    },
                                    {text: 'Lineas <br> Recibicidas', dataIndex: 'a4298QLIN', width: 120, align: 'left',
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
                                                    return 'prx-icon-detail';
                                                },
                                                tooltip: 'Click for Show Delivery',
                                                handler: 'onShowDelivery'
                                            }
                                        ]
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
                                            //padding:'8px'
                                }
                            },
                            bbar: Ext.create('Ext.PagingToolbar', {
                                id: prototype.id + '-PagingToolbar',
                                displayInfo: true,
                                displayMsg: 'Displaying records {0} - {1} of {2}',
                                emptyMsg: "No records to display",
                                inputItemWidth: 35
                            })
                        }
                        // </editor-fold>
                    ]
                }
            ]
        }
    ]
});


