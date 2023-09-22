Ext.define('Ext.Praxis.view.flown.ReportNrtmexForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 'auto',
                height: 600,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridMainData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '10 0 0 0',
                            border: false,
                            height: 560,
                            width: 720,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainData',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    height: 550,
                                    width: 680,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Flight<br>Date', dataIndex: 'strFormatDate', width: 80,
                                                listeners: {
                                                    click: 'onGridDetail'
                                                },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#flown-report-nrtmex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                },
                                            },
                                            {text: 'Flight Information',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Total Cpns', dataIndex: 'QTYTOT', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetail'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-report-nrtmex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                    },
                                                    {text: 'Pending', dataIndex: 'QTYPEND', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetailPE'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-report-nrtmex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                    },
                                                    {text: 'Conciliated', dataIndex: 'QTYCONC', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetailCO'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-report-nrtmex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                    },
                                                ]
                                            },
                                            {text: 'Tax',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Applied', dataIndex: 'QTYAPLI', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetailAP'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-report-nrtmex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                    },
                                                    {text: 'Not Applied', dataIndex: 'QTYAPLI', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetailNA'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-report-nrtmex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                    },
                                                    {text: 'Exonerated', dataIndex: 'QTYEXON', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetailEX'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-report-nrtmex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        // --------------------------   GRID DETAIL DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '10 0 0 0',
                            border: false,
                            height: 570,
                            width: 1295,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridData',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    height: 555,
                                    width: 1285,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            bodyStyle: 'background-color: #E3EAEF;',
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Period', dataIndex: 'strFormatDate2', width: 80,
//                                                        listeners: {
//                                                            click: 'onGridDetEMD'
//                                                        },
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#flown-emd-standalone-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                },
                                            },
                                            {text: 'Flight Information',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Ticket', dataIndex: 'strTicket', width: 120,
                                                        listeners: {
                                                            click: 'viewTicket'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-emd-standalone-form" style="color:#057ECB">' + value + '</a>';
                                                        },
                                                    },
                                                    {text: 'Flight Date', dataIndex: 'strFormatDate2', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Orig', dataIndex: 'CDEPART', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Dest', dataIndex: 'CARRIVA', width: 45,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Service<br>Clas', dataIndex: 'CLAS', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Carr', dataIndex: 'CARR', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Stock', dataIndex: 'FSTOCK', width: 45,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Poliza Date', dataIndex: 'strFormatDate3', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Equip', dataIndex: 'EQUIPO', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Matric', dataIndex: 'MATRICUL', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Qty<br>Pax', dataIndex: 'QTYPAX', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYPAX, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Period<br>Oper', dataIndex: 'strFormatDate4', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Date<br>oper', dataIndex: 'strFormatDate5', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Fare<br>Basis', dataIndex: 'FBASE', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {text: 'CDD Information',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Type', dataIndex: 'TPAX', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Name', dataIndex: 'PAXNAME', width: 150,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'PNR', dataIndex: 'SPNR', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'PNR<br>Locator', dataIndex: 'CRPNRL', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Brithday', dataIndex: 'FNAC', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Doc.<br>Type', dataIndex: 'TIDOCT', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Doc.<br>Nbr', dataIndex: 'DOCIDEN', width: 70,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Country', dataIndex: 'CCOUNTRY', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {text: 'Transact', dataIndex: 'TTRANS', width: 60,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#";
                                                    return value;
                                                },
                                            },
                                            {text: 'Comments', dataIndex: 'COMMENTS', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;background-color:#";
                                                    return value;
                                                },
                                            },
                                            {text: 'Tax Amount', dataIndex: 'TAXAMOUNT', width: 90,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.TOT_TAXAMOUNT, '0,000.00') + '<b>';
                                                }
                                            },
//                                            {text: 'Ruta', dataIndex: 'RUTA', width: 120,
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:center;background-color:#";
//                                                    return value;
//                                                },
//                                            },
//                                            {
//                                                text: 'Edit',
//                                                sortable: false,
//                                                xtype: 'actioncolumn',
//                                                width: 45,
//                                                align: 'center',
//                                                items: [
//                                                    {
//                                                        iconCls: 'prx-icon-edit',
//                                                        tooltip: 'Edit',
//                                                        handler: 'onEditClick'
//                                                    }
//                                                ]
//                                            }
                                        ]
                                    }
                                },
                            ]
                        },
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    width: 1132,
                    hidden: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    items: [
                        {
                            xtype: 'panel',
                            width: 1132,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults: {
                                xtype: 'label'
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
                                    text: 'Total found',
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
                },
                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);


