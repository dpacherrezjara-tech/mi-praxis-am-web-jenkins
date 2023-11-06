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
                            width: 920,
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
                                    width: 880,
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
                                            {text: 'Flown Information',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Total Cpns', dataIndex: 'QTYTOTAL', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetail'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#a3d5ff";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-report-nrtmex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYTOTAL, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Pending', dataIndex: 'QTYPEND', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetailPE'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#a3d5ff";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-report-nrtmex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYPEND, '0,000') + '<b>';
                                                        }
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
                                                    {text: 'Conciliated', dataIndex: 'QTYCONC', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetailCO'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-report-nrtmex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYCONC, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Paid', dataIndex: 'QTYPAY', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetailPA'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-report-nrtmex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYPAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Not Payed', dataIndex: 'QTYNOPAY', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetailNP'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-report-nrtmex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYNOPAY, '0,000') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Audit Tax',
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
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYAPLI, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Not Applied', dataIndex: 'QTYNOAPLI', width: 100,
                                                        listeners: {
                                                            click: 'onGridDetailNA'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-report-nrtmex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYNOAPLI, '0,000') + '<b>';
                                                        }
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
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridMainData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYEXON, '0,000') + '<b>';
                                                        }
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
                            height: 595,
                            width: 1695,
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
                                    height: 583,
                                    width: 1685,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary'
//                                            dock: 'bottom'  
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
                                                    {text: 'Ticket', dataIndex: 'strTicket', width: 120,
                                                        listeners: {
                                                            click: 'viewTicket'
                                                        },
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            value = '<b>' + value + '</b>';
                                                            return '<a href="#flown-report-nrtmex-form" style="color:#057ECB">' + value + '</a>';
                                                        },
                                                    },
                                                    {text: 'Status', dataIndex: 'descSTVAL', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Flight Date', dataIndex: 'strFormatDate2', width: 75,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Orig', dataIndex: 'CDEPART', width: 40,hidden:true,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Dest', dataIndex: 'CARRIVA', width: 45,hidden:true,
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
                                                    {text: 'Equip', dataIndex: 'EQUIPO', width: 60,
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
//                                                    {text: 'Qty<br>Pax', dataIndex: 'QTYPAX', width: 40,
//                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                            metaData.style = "text-align:right;background-color:#";
//                                                            value = Ext.util.Format.number(value, '0,000');
//                                                            return value;
//                                                        },
//                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
//                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
//                                                            metaData.style = 'text-align:right; margin-right:3px ';
//                                                            return '<b>' + Ext.util.Format.number(data.TOT_QTYPAX, '0,000') + '<b>';
//                                                        }
//                                                    },
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
                                                    {text: 'Fare<br>Basis', dataIndex: 'FBASE', width: 95,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Poliza<br>Date', dataIndex: 'FCONT', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Routing', dataIndex: 'ROUTF', width: 200,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#";
                                                            return value;
                                                        },
                                                    },
                                                ]
                                            },
                                            {text: 'Sales Tax',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'CDTAXS', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#9CD2FF";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_STOTAL, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Currency', dataIndex: 'MONTAXS', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#9CD2FF";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Amount', dataIndex: 'VALTAXS', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#9CD2FF";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_VALTAXS, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'Audit Tax',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Code', dataIndex: 'CDTAX', width: 50,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5";
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_ATOTAL, '0,000') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Currency', dataIndex: 'MONTAX', width: 65,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Amount', dataIndex: 'VALTAX', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:right;background-color:#d5f4d5";
                                                            value = Ext.util.Format.number(value, '0,000.00');
                                                            return value;
                                                        },
                                                        summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                            var data = Ext.getCmp(prototype.id + '-gridData').getStore().getData().items[0].data;
                                                            metaData.style = 'text-align:right; margin-right:3px ';
                                                            return '<b>' + Ext.util.Format.number(data.TOT_VALTAX, '0,000.00') + '<b>';
                                                        }
                                                    },
                                                    {text: 'Date', dataIndex: 'strFormatDate7', width: 80,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5";
                                                            return value;
                                                        },
                                                    },
                                                    {text: 'Result', dataIndex: 'RESULT', width: 120,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:center;background-color:#d5f4d5";
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
                                                            metaData.style = "text-align:left;background-color:#";
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
                                            {text: 'Transact', dataIndex: 'TTRANS', width: 70,
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


