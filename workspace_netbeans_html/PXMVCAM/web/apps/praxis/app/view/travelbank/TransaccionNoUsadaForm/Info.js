//<editor-fold defaultstate="collapsed" desc="Stores">
//let storeInfo = Ext.create('Ext.data.Store', {
//    storeId: prototype.id + 'storeInfo',
//    page: {
//        start: 0,
//        limit: 20
//    }
//});
//</editor-fold>

Ext.define('Ext.Praxis.view.travelbank.TransaccionNoUsadaForm.Info', {
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
            id: prototype.id + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
//                height: 570,
                align: 'center'
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="boxMainData">
                {
                    region: 'center',
                    id: prototype.id + '-boxMainData',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        //width: prototype.widthGrid,
//                        height: 545,
                        align: 'center'
                    },
                    items: [
//                        {
//                            xtype: 'panel',
//                            padding: '2px',
//                            layout: {
//                                type: 'hbox',
//                                pack: 'end'
//                            },
//                            items: [
//                                {
//                                    xtype: 'textfield', width: 250, id: prototype.id + '-A4417SALDO', readOnly: true,
//                                    fieldLabel: 'Balance:', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
//                                    fieldStyle: 'text-align:center;font-weight: bold;font-size:14px;', value: '0.00'
//                                }
//                            ]
//                        },
                        // <editor-fold defaultstate="collapsed" desc="gridData">                        
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: 1200,
                            height: 360,
                            columnLines: true,
                            //store: [storeInfo],
                            viewConfig: {
                                deferEmptyText: false,
                                emptyText: 'No data Available'
                            },
                            columns:{
                                items:[                                                                        
                                    {
                                        text: 'Concept',
                                        dataIndex: 'CONCEPTO',
                                        width: 140,
                                        align: 'left',
                                        locked: true
//                                        renderer: function(value, metaData, record, rowIndex, colIndex) {
//                                            return '<strong style="color:#000;font-size:12px;">' + value + '</strong> ';
//                                        }
                                    },
                                    {
                                        text: 'Months',
                                        columns:[
                                            {
                                                text: 'January',
                                                dataIndex: 'ENE',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    metaData.style = "text-align:right;";                                                   
                                                    if (value < 0) metaData.style = "text-align:right;color:red";                                                                                                            
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }, 
                                            {
                                                text: 'February',
                                                dataIndex: 'FEB',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    metaData.style = "text-align:right;";                                                   
                                                    if (value < 0) metaData.style = "text-align:right;color:red";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }, 
                                            {
                                                text: 'March',
                                                dataIndex: 'MAR',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    metaData.style = "text-align:right;";                                                   
                                                    if (value < 0) metaData.style = "text-align:right;color:red";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'April',
                                                dataIndex: 'ABR',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    metaData.style = "text-align:right;";                                                   
                                                    if (value < 0) metaData.style = "text-align:right;color:red";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }, 
                                            {
                                                text: 'May',
                                                dataIndex: 'MAY',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    metaData.style = "text-align:right;";                                                   
                                                    if (value < 0) metaData.style = "text-align:right;color:red";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'June',
                                                dataIndex: 'JUN',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    metaData.style = "text-align:right;";                                                   
                                                    if (value < 0) metaData.style = "text-align:right;color:red";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'July',
                                                dataIndex: 'JUL',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    metaData.style = "text-align:right;";                                                   
                                                    if (value < 0) metaData.style = "text-align:right;color:red";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },                                            
                                            {
                                                text: 'August',
                                                dataIndex: 'AGO',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    metaData.style = "text-align:right;";                                                   
                                                    if (value < 0) metaData.style = "text-align:right;color:red";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'September',
                                                dataIndex: 'SET',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    metaData.style = "text-align:right;";                                                   
                                                    if (value < 0) metaData.style = "text-align:right;color:red";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'October',
                                                dataIndex: 'OCT',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    metaData.style = "text-align:right;";                                                   
                                                    if (value < 0) metaData.style = "text-align:right;color:red";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'November',
                                                dataIndex: 'NOV',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    metaData.style = "text-align:right;";                                                   
                                                    if (value < 0) metaData.style = "text-align:right;color:red";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },                                            
                                            {
                                                text: 'December',
                                                dataIndex: 'DIC',
                                                width: 102,
                                                align: 'right',
                                                renderer: function(value, metaData, record, rowIndex, colIndex) {
                                                    metaData.style = "text-align:right;";                                                   
                                                    if (value < 0) metaData.style = "text-align:right;color:red";
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
//                        {
//                            xtype: 'panel',
//                            id: prototype.id + '-pie',
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
//                            padding: '1px 0px 1px 0px',
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
//                                            text: 'Total found',
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
                // </editor-fold>
            ]
        }        
    ]
});