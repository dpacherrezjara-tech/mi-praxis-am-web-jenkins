Ext.define('Ext.Praxis.view.screens.AbnormalValuesForm.tabs.ScrDBIataControl', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-ScrDBIataControl',
    requires: [
        'Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrDBIataControlController'
    ],
    controller: 'ScrDBIataControlController',
    //layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        //border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipalIataControl',
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
                    xtype: 'panel',
                    id: prototype.id + '-boxMainDataIataControl',
                    width: '100%',
//                    hidden: false,
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
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'panel',
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridMainDataByValues',
                                    padding: '5px 0px 0px 0px',
                                    width: 784,
                                    height: 528,
                                    columnLines: true,
                                    /*features: [{
                                     ftype: 'summary'
                                     }],*/
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Country', align: 'center', columns: [
                                                    {
                                                        text: 'Code', dataIndex: 'AIRLINE', align: 'center', width: 50,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "font-weight:bold;text-align:center;background:#d5f4d5;";
                                                            return value;
                                                        }
                                                    },
                                                    {
                                                        text: 'Name', dataIndex: 'strCountryName',align: 'center', width: 120,
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            metaData.style = "text-align:left;";
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {
                                                text: 'Src', dataIndex: 'FMETHOD', width: 60
                                            },
                                            {
                                                text: 'Type', dataIndex: 'TDOC', width: 70
                                            },
                                            {
                                                text: 'USD', columns: [
                                                    {
                                                        text: 'Sales', columns: [
                                                            {
                                                                text: 'Amount', dataIndex: 'Aud1', align: 'center', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            },
                                                            {
                                                                text: 'Coupons', dataIndex: 'Rej1', align: 'center', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Average', columns: [
                                                            {
                                                                text: '5 months', dataIndex: 'Avg1', align: 'center', width: 100,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        text: 'Differences', dataIndex: 'Diff1', align: 'center', width: 90,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000.00');
                                                                }
                                                    },
                                                    {
                                                        text: 'Variation', dataIndex: 'Var1', align: 'center', width: 80,
                                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                    metaData.style = "text-align:right;";
                                                                    return Ext.util.Format.number(value, '0,000%');
                                                                }
                                                    },
                                                ]
                                            },
                                        ]
                                    }
                                },
                            ]
                        },
                    ]


                },
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