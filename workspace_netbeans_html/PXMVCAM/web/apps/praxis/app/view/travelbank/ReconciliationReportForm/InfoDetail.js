Ext.define('Ext.Praxis.view.travelbank.ReconciliationReportForm.InfoDetail', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id1 + '-infoDetail',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id1 + '-boxConsultas',
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
                    id: prototype.id1 + '-boxMainData',
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
                            id: prototype.id1 + '-gridData',
                            width: prototype.widthGrid,
                            //width: 1000,
                            height: 540,
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
                                        text: 'Nbr.', dataIndex: 'RN', width: 50, locked: true,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Travel Bank<br>Account number', dataIndex: 'A4467CUENT', width: 150, locked: true
                                    },
                                    {
                                        text: 'Credit ID', dataIndex: 'A4467CRDID', width: 90, locked: true
                                    },
                                    {
                                        text: 'Seq.', dataIndex: 'A4467CRDSQ', width: 40, locked: true
                                    },
                                    {
                                        text: '', locked: true,
                                        sortable: false, width: 30,
                                        xtype: 'actioncolumn',
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'View transaction',
                                                handler: 'onEditClick'
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Date<br>of issue', dataIndex: 'A4467FEMIS', width: 70, locked: true
                                    },
                                    {
                                        text: 'Service<br>Code', dataIndex: 'A4467SERVC', width: 70, locked: true
                                    },
                                    {
                                        text: 'Status', dataIndex: 'A4467LSTA', width: 70, locked: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            let html = '';
                                            if (record.get('A4467LSTA') === 'M')
                                                html = '<img src="resources/img/semaforo/Circle_Green.png" title="Match Liability" >';
                                            else {
                                                html = '<img src="resources/img/semaforo/Circle_Red.png" title="Difference Liability" >';
                                            }
                                            let html2 = '';
                                            if (record.get('A4467PSTA') === 'M')
                                                html2 = '<img src="resources/img/semaforo/Circle_Green.png" title="Match Precontabilidad" >';
                                            else {
                                                html2 = '<img src="resources/img/semaforo/Circle_Red.png" title="Difference Precontabilidad" >';
                                            }

                                            return html + ' ' + html2;
                                        }
                                    },
                                    {
                                        text: 'Curr.', dataIndex: 'A4467MONED', width: 50, locked: true
                                    },
                                    {
                                        text: 'Amounts Travel bank',
                                        columns: [
                                            {
                                                text: 'Local amounts',
                                                columns: [
                                                    {
                                                        text: 'Original<br>Amount', dataIndex: 'A4467AORIG', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            // metaData.style = 'font-weight:bold;color:green;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount<br>Used', dataIndex: 'A4467AUSAD', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            metaData.style = 'font-weight:bold;color:red;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Remaining<br>Balance', dataIndex: 'A4467ABALR', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            // metaData.style = 'font-weight:bold;color:green;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Revenue amounts',
                                                columns: [
                                                    {
                                                        text: 'Original<br>Amount', dataIndex: 'A4467AORRV', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            // metaData.style = 'font-weight:bold;color:green;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount<br>Used', dataIndex: 'A4467AUSRV', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            metaData.style = 'font-weight:bold;color:red;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Remaining<br>Balance', dataIndex: 'A4467ABLRV', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            // metaData.style = 'font-weight:bold;color:green;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amounts in pesos',
                                                columns: [
                                                    {
                                                        text: 'Original<br>Amount', dataIndex: 'A4467AORMX', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            // metaData.style = 'font-weight:bold;color:green;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount<br>Used', dataIndex: 'A4467AUSMX', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            // metaData.style = 'font-weight:bold;color:green;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Remaining<br>Balance', dataIndex: 'A4467ABLMX', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            // metaData.style = 'font-weight:bold;color:green;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Liability detail(SABRE)',
                                        columns: [
                                            {
                                                text: 'Original<br>Amount', dataIndex: 'A4467LVORG', width: 110, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    // metaData.style = 'font-weight:bold;color:green;';
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            },
                                            {
                                                text: 'Remaining<br>Balance', dataIndex: 'A4467LBALR', width: 110, align: 'right',
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                    // metaData.style = 'font-weight:bold;color:green;';
                                                    return Ext.util.Format.number(value, '0,000.00');
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Pre Contabilidad(Oracle)',
                                        columns: [
                                            {
                                                text: 'Local amounts',
                                                columns: [
                                                    {
                                                        text: 'Original<br>Amount', dataIndex: 'A4467PORGA', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            // metaData.style = 'font-weight:bold;color:green;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount<br>Used', dataIndex: 'A4467PUSAD', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            metaData.style = 'font-weight:bold;color:red;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Remaining<br>Balance', dataIndex: 'A4467PBALR', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            // metaData.style = 'font-weight:bold;color:green;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Revenue amounts',
                                                columns: [
                                                    {
                                                        text: 'Original<br>Amount', dataIndex: 'A4467PORRV', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            // metaData.style = 'font-weight:bold;color:green;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount<br>Used', dataIndex: 'A4467PUSRV', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            metaData.style = 'font-weight:bold;color:red;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Remaining<br>Balance', dataIndex: 'A4467PBLRV', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            // metaData.style = 'font-weight:bold;color:green;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Amount in Pesos',
                                                columns: [
                                                    {
                                                        text: 'Original<br>Amount', dataIndex: 'A4467PORMX', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            // metaData.style = 'font-weight:bold;color:green;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Amount<br>Used', dataIndex: 'A4467PUSMX', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            // metaData.style = 'font-weight:bold;color:green;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    },
                                                    {
                                                        text: 'Remaining<br>Balance', dataIndex: 'A4467PBLMX', width: 110, align: 'right',
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            // metaData.style = 'font-weight:bold;color:green;';
                                                            return Ext.util.Format.number(value, '0,000.00');
                                                        }
                                                    }
                                                ]
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
                            id: prototype.id1 + '-pie',
                            width: '99%',
                            align: 'center',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id1 + '-boxPaginacion',
                                    width: '100wh',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id1 + '-paggin',
                                                    pageSize: 10,
                                                    border: false,
                                                    displayInfo: true,
                                                    hidden: false
                                                }
                                            ]
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
        }
    ]
});