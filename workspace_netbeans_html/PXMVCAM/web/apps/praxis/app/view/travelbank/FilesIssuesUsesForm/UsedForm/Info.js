Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.UsedForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id06 + '-info',    
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id06 + '-boxConsultas',
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
                // <editor-fold defaultstate="collapsed" desc="boxMainData">
                {
                    region: 'center',
                    id: prototype.id06 + '-boxMainData',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        //width: prototype.widthGrid,
                        width: '100%',
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id06 + '-gridData',
                            width: prototype.widthGrid,
                            // width: '100vw',
                            height: 510,
                            columnLines: true,
                            margin: 3,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Trasmission<br>Date', dataIndex: 'A4282PRDA', width: 90,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Service<br>Type', dataIndex: 'A4282TIP', width: 80
                                    },
                                    {
                                        text: 'Transacctions', dataIndex: 'A4282TRX2', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Amout', dataIndex: 'A4282TOT', width: 90,                                        
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    
                                    {
                                        text: 'Currency', dataIndex: 'A4282MDA', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Accounting',
                                        columns: [
                                            {text: 'Period', dataIndex: 'A4282PCONT', width: 80, align: 'center'},
                                            {text: 'Date', dataIndex: 'A4282FCONT', width: 80, align: 'center'}
                                        ]
                                    },
                                     {
                                        text: 'Delivery',
                                        columns: [
                                            {text: 'Nbr<br>Identifier', dataIndex: 'A4282IDFIL', width: 70, align: 'center'},
                                            {text: 'File Type', dataIndex: 'A4282TYPE', width: 70, align: 'center'},
                                            {text: 'Head <br>Whithout Trax.', dataIndex: 'A4282STS2_1', width: 90, align: 'center'}
                                        ]
                                    },
                                    {
                                        text: 'Final<br>State', dataIndex: 'A4282STS_1', width: 80,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Edit',
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 70,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                tooltip: 'Edit',
                                                handler: 'onEditClick'
                                            }
                                        ]
                                    }
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id06 + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center',
                                padding:2
                            },
                            border: true,                            
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: 1,
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
                                            id: prototype.id06 + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id06 + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id06 + '-lbl-total',
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
                // </editor-fold>
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
});