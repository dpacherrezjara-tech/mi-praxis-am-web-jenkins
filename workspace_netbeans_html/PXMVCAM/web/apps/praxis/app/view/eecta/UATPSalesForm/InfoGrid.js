
Ext.define('Ext.Praxis.view.eecta.UATPSalesForm.InfoGrid', {
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
                            width: '99%',
                            height: 510,
                            padding: '0px 5px 1px 5px',                           
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            columns: {
                                items: [
                                    {text: 'Id File', dataIndex: 'A4264IDFIL', width: 120, align: 'center'},
                                    {text: 'Invoice Code', dataIndex: 'A4264INVC', align: 'left', width: 120},
                                    {text: 'Processing Date', dataIndex: 'A4264PRDA', align: 'left', width:120},
                                    {text: 'File Name', dataIndex: 'A4264FLNM', width: 120, align: 'left',flex:1},
                                    {text: 'Total Nbr. of Batches', dataIndex: 'A3957FARE', width: 155, align: 'left',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {text: 'Total Received', dataIndex: 'A4264TLINV', width: 120, align: 'left',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {
                                        text: 'Status', dataIndex: 'A4264STREC', width: 120, align: 'left',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            switch (value) {
                                                case '0':
                                                    return 'OK';
                                                    break;
                                                case '1':
                                                    return 'With Errors';
                                                    break;
                                                default:
                                                    return 'Error';
                                                    break;
                                            }
                                        }
                                    },
                                    {
                                        text: 'St. Formateo', dataIndex: 'A4264STCAR', width: 120, align: 'left',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            switch (value) {
                                                case 'P':
                                                    return 'Pending';
                                                    break;
                                                case '1':
                                                    return 'Loaded OK';
                                                    break;
                                                case '1':
                                                    return 'With Errors';
                                                    break;
                                                case '1':
                                                    return 'Without Sales';
                                                    break;
                                                default:
                                                    return 'Error';
                                                    break;
                                            }
                                        }
                                    },
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center',
                                    padding:'8px'
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
