Ext.define('Ext.Praxis.view.screens.Dashboard01Form.tabs.ByIATA', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-ByIATA',
    requires: [
        'Ext.Praxis.controller.screens.Dashboard01.tabs.ByIATAController'
    ],
    controller: 'ByIATAController',
    //layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            xtype: 'panel',
            width: '100%',
            id: prototype.id + '-filterMain',
            hidden: true,
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center',
                margin: "0 15 0 0"  // (top, right, bottom, left)
            },
            items: [
                {
                    xtype: 'checkboxfield',
                    id: prototype.id + '-chkWP_FA',
                    width: 130,
                    boxLabel: 'WorkProgress',
                    inputValue: '1',
                    listeners: {
                        change: 'chkWP_FA_click'
                    }
                },
                {
                    xtype: 'button',
                    id: prototype.id + '-btnSwap_FA',
                    icon: 'resources/img/exchange.png',
                    tooltip: 'Swap',
                    listeners: {
                        click: 'btnSwap_FA_click'
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            id: prototype.id + '-boxMainDataByIATA',
            width: '100%',
            hidden: false,
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center',
                margin: "0 15 0 0"  // (top, right, bottom, left)
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridDataByIATA',
                    width: 945,
                    height: 392,
                    columnLines: true,
                    hidden: false,
                    margin: "5 0 0 0",
                    features: [{
                            ftype: 'summary',
                            dock: 'bottom'
                        }],
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        items: [
                            {text: 'Year', dataIndex: 'YEAR', width: 90,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;";
                                    return  value;
                                },
                            },
                            {text: 'Code', dataIndex: 'CODE', width: 70,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:center;";
                                    return  value;
                                },
                            },
                            {text: 'Country', dataIndex: 'COUNTRY', width: 150,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:left;";
                                    return  value;
                                },
                            },
                            {text: 'IATAS with Sales', dataIndex: 'SALES', width: 150,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                    value = Ext.util.Format.number(value, '0,000');
                                    return  value;
                                },
                            },
                            {text: 'IATAS Without Sales', dataIndex: 'NOSALES', width: 150,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                    value = Ext.util.Format.number(value, '0,000');
                                    return  value;
                                },
                            },
                            {text: 'Total IATAS by Country', dataIndex: 'ALLSALES', width: 150,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                    value = Ext.util.Format.number(value, '0,000');
                                    return  value;
                                },
                            },
                            {text: 'Efectivity', dataIndex: 'EFFECTIVITY', width: 70,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;";
                                    value = Ext.util.Format.number(value, '00.00');
                                    return  value;
                                },
                            },
                            {text: 'AMOUNT $', dataIndex: 'AMOUNT', width: 100,
                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                    metaData.style = "text-align:right;background-color:#d5f4d5;";
                                    value = Ext.util.Format.number(value, '0,000');
                                    return  value;
                                },
                            }
                        ]
                    }
                }
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