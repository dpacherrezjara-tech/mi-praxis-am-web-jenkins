Ext.define('Ext.Praxis.view.flown.EMDStandaloneForm.Info', {
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
                width: 1790,
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
                            id: prototype.id + '-panelGridDataMain',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '10 0 0 0',
                            border: false,
                            height: 560,
                            width: 1000,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    height: 550,
                                    width: 520,
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
                                            {text: 'Information EMD Standalone',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date',id: prototype.id + '-strFormatDate', dataIndex: 'strFormatDate', width: 100,
                                                        listeners: {
                                                            click: 'onGridDataMidle'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-emd-standalone-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                    },
                                                    {text: 'Total EMDS', dataIndex: 'QTYUSED', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYUSED, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'EMDS Conciliated', dataIndex: 'QTYCONCI', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYCONCI, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total<br>Pending', dataIndex: 'QTYPEND', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYPEND, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Accounted', dataIndex: 'QTYPOLIZA', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridDataMain').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYPOLIZA, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelMidleGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '10 0 0 0',
                            border: false,
                            height: 560,
                            width: 1000,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMidleData',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    border: false,
                                    height: 550,
                                    width: 533,
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
                                            {text: 'Information EMD Standalone',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date',id: prototype.id + '-strDateMidle', dataIndex: 'strFormatDate', width: 100,
                                                        listeners: {
                                                            click: 'onGridData'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-emd-standalone-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                    },
                                                    {text: 'Total EMDS', dataIndex: 'QTYUSED', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return  value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMidleData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYUSED, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'EMDS Conciliated', dataIndex: 'QTYCONCI', width: 120,
                                                        listeners: {
                                                            click: 'onGridDataDetailConcliliated'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<a href="#flown-emd-standalone-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMidleData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYCONCI, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Total<br>Pending', dataIndex: 'QTYPEND', width: 100,
                                                        listeners: {
                                                            click: 'onGridDataDetailPending'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return '<a href="#flown-emd-standalone-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMidleData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYPEND, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Accounted', dataIndex: 'QTYPOLIZA', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMidleData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYPOLIZA, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: false,
                            height: 582,
                            width: 1775,
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
                                    height: 580,
                                    width: 1760,
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
                                            {text: 'Used Information',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date',id: prototype.id + '-strDateDetail', dataIndex: 'strFormatDate', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E6FFE6";
                                                            value = '<b>' + value + '</b>';
//                                                            return '<a href="#flown-emd-standalone-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Ticket', dataIndex: 'strTicket', width: 120,
                                                        listeners: {
                                                            click: 'viewTicket'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E6FFE6";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-emd-standalone-form" style="color:#057ECB">' + value + '</a>';
                                                        },
                                                    },
                                                    {text: 'Seq', dataIndex: 'SEQ', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E6FFE6";
                                                            value = Ext.util.Format.number(value, '00');
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Roll', dataIndex: 'SEQRO', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E6FFE6";
                                                            value = Ext.util.Format.number(value, '00');
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'VCR<br>Date', dataIndex: 'descDVCR', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E6FFE6";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Status', dataIndex: 'descSTVAL', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E6FFE6";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'RFIC', dataIndex: 'RFIC', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E6FFE6";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Reason<br>Code', dataIndex: 'RECODE', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E6FFE6";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Free Description', dataIndex: 'DESC_RECODE', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#E6FFE6";
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {text: 'Sales Information',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Country', dataIndex: 'SCOUNTRY', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E0F0FF";
//                                                            return '<a href="#flown-emd-standalone-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;

                                                        },
                                                    },
                                                    {text: 'Agent', dataIndex: 'AGENTE', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E0F0FF";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Sale<br>Date', dataIndex: 'descFVTA', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E0F0FF";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Orig', dataIndex: 'ORIG', width: 60,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E0F0FF";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Dest', dataIndex: 'DEST', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E0F0FF";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Fare<br>Basis', dataIndex: 'FBASE', width: 110,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#E0F0FF";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'RBD', dataIndex: 'RBD', width: 40, hidden: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E0F0FF";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Pax', dataIndex: 'QTYPAX', width: 40, hidden: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E0F0FF";
                                                            value = Ext.util.Format.number(value, '0,000');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.totAMOUNT1, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Pax<br>Type', dataIndex: 'TPAX', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E0F0FF";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Oper.', dataIndex: 'TOPUS', width: 50, hidden: true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E0F0FF";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Carrier', dataIndex: 'CARR', width: 55,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E0F0FF";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Accounting<br>Date', dataIndex: 'descFCONTS', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E0F0FF";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Valuation<br>Date', dataIndex: 'descFECVAL', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E0F0FF";
                                                            value = '<b>' + value + '</b>';
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Curr.', dataIndex: 'CURRENCY', width: 40,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#E0F0FF";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Total<br>Value', dataIndex: 'VCPN', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#E0F0FF";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'YQ Value',
                                                        defaults: {
                                                            menuDisabled: true,
                                                            sortable: false,
                                                            align: 'center'
                                                        },
                                                        columns: [
                                                            {text: '16%', dataIndex: 'TN16', width: 55,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#E0F0FF";
                                                                    value = Ext.util.Format.number(value, '00.00');
                                                                    return value;
                                                                },
                                                            },
                                                            {text: '0%', dataIndex: 'TN00', width: 55,
                                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;background-color:#E0F0FF";
                                                                    value = Ext.util.Format.number(value, '00.00');
                                                                    return value;
                                                                },
                                                            },
                                                        ]
                                                    },
                                                ]
                                            },
                                            {text: 'Poliza',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Date', dataIndex: 'descFCONT', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            value = '<b>' + value + '</b>';
//                                                            return '<a href="#flown-emd-standalone-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                            return value;

                                                        },
                                                    },
                                                    {text: 'Id', dataIndex: 'IDCON', width: 140,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Edit',
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 45,
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


