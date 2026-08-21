
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
                            width: '100%',
                            height: 525,
                            padding: '0px 5px 1px 5px',                           
                            features: [
                                {
                                    dock: 'bottom',
                                    ftype: 'summary'
                                }
                            ],
                            resizable: false,
                            selModel: {                                
                                selType: 'checkboxmodel',
                                mode:'SINGLE',
                                listeners: {
                                    beforeselect: function (grid, record, index, eOpts, metaData) {
                                        return true;
                                    }
                                }
                            },
                            selectable: {
                                columns: false, // Can select cells and rows, but not columns
                                extensible: false // Uses the draggable selection extender
                            },
                            columns: {
                                items: [
                                    {text: 'Id File', dataIndex: 'A4264IDFIL', width: 110, align: 'center',padding:8},
                                    {text: 'Invoice Code', dataIndex: 'A4264INVC', align: 'center', width: 120},
                                    {text: 'Processing Date', dataIndex: 'A4264PRDA', align: 'center', width:120,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            //console.log(metaData);
                                            metaData.style = 'font-style: italic;';
                                            return value;
                                        }
                                    },
                                    {text: 'File Name', dataIndex: 'A4264FLNM', width: 120, align: 'left',flex:1},
                                    {text: 'Total Nbr.<br>of Batches', dataIndex: 'A4264TTRNC', width: 120, align: 'center',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {text: 'Total Received', dataIndex: 'A4264TLINVC', width: 120, align: 'center',
                                        summaryType: 'sum',
                                        summaryRenderer: function (value, summaryData, dataIndex) {
                                            return Ext.util.Format.number(value, '0,000');
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return Ext.util.Format.number(value, '0,000');
                                        }
                                    },
                                    {
                                        text: 'Status', dataIndex: 'A4264STREC', width: 120, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            var html = '<img src="resources/img/icon/delete.png" title="Error" >';
                                            switch (value) {
                                                case '0':
                                                    html =  '<img src="resources/img/icon/check.png" width="16" height="16" title="Formateado">';
                                                    break;
                                                case '1':
                                                    html = '<img src="resources/img/icon/warning.png" title="With Errors" >';
                                                    break;
                                            }
                                            return html;
                                        }
                                    },
                                    {
                                        text: 'St. Formateo', dataIndex: 'A4264STCAR', width: 120, align: 'center',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            var html = '<img src="resources/img/icon/delete.png" title="Error" >';
                                            switch (value) {
                                                case 'P':
                                                    html = '<img src="resources/img/icon/16x16/loading_robot.png" title="Pending" >';
                                                    break;
                                                case '0':
                                                    html =  '<img src="resources/img/icon/check.png" width="16" height="16" title="Loaded OK">';
                                                    break;
                                                case '1':
                                                    html = '<img src="resources/img/icon/warning.png" title="With Errors" >';
                                                    break;
                                                case '2':
                                                    html =  '<img src="resources/img/icon/list-error.png" width="16" height="16" title="Without Sales">';
                                                    break;
                                            }                                            
                                            return html;
                                            
                                        }
                                    },
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
