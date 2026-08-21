Ext.define('Ext.Praxis.view.travelbank.ReconciliationReportForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
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
                        width: '100%',
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: 900,
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
                                        text: 'Nbr.', dataIndex: 'RN', width: 70,
                                        renderer: function (value, metaData) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Account BT', dataIndex: 'A4460CUENT', width: 170
                                    },
                                    {
                                        text: 'Curr.', dataIndex: 'A4460MONED', width: 80
                                    },                                    
                                    {
                                        text: 'Balance', dataIndex: 'A4460SALDO', width: 120,align: 'right',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            metaData.style = 'font-weight:bold;color:green;';     
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Balance<br>Revenue', dataIndex: 'A4460SALRV', width: 120,align: 'right',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            metaData.style = 'font-weight:bold;color:green;';     
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                     {
                                        text: 'Balance<br>Pesos', dataIndex: 'A4460SALPE', width: 120, align: 'right',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            metaData.style = 'font-weight:bold;color:green;';     
                                            return Ext.util.Format.number(value, '0,000.00');
                                        }
                                    },
                                    {
                                        text: 'Update <br>to date', dataIndex: 'A4460FREVI', width: 80, 
                                        renderer: function (value, metaData, record) {
                                            return record.get('A4460FREVI').trim()===''?record.get('A4460FREGI'):record.get('A4460FREVI');
                                        }
                                    },
                                    {
                                        text: 'Account<br>statement',
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        //width: 60,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-image-file',
                                                tooltip: 'View Account Statament',
                                                handler: 'onDetailAccountStatamentClick'
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
                            id: prototype.id + '-pie',
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
                                    id: prototype.id + '-boxPaginacion',
                                    width: '100wh',                                    
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id + '-paggin',
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