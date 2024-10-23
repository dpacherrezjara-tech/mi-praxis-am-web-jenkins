/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Ext.Praxis.view.flown.AverageFareForm.Info', {
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
            id: prototype.id + '-regionCenterGrid01',
            //width: 1550,
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
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle1',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '10 0 0 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridData',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 852,
                                    columnLines: true,
                                    resizable: false,
//                                    features: [{
//                                            ftype: 'summary'
//                                        }
//                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Route',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center',
                                                    border: true
                                                },
                                                columns: [
                                                    {text: 'From', width: 70, dataIndex: 'A1781ORIG', id: prototype.id + '-clmA1781ORIG',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var tool = record.data['strDescORIG'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return  value;
                                                        }
                                                    },
                                                    {text: 'To', width: 70, dataIndex: 'A1781DEST', id: prototype.id + '-clmA1781DEST',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var tool = record.data['strDescDEST'].trim();
                                                            if (tool.length > 0) {
                                                                metaData.tdAttr = 'data-qtip = "' + tool + '"';
                                                            }
                                                            return  value;
                                                        }
                                                    }

                                                ]
                                            },
                                            {text: 'Fare<br>Basis', width: 180, dataIndex: 'VP_A1781FARE', renderer: 'getText', id: prototype.id + '-clmVP_A1781FARE'},
                                            {text: 'RBD', width: 70, dataIndex: 'A1781RBD', id: prototype.id + '-clmA1781RBD'},
                                            {text: 'Cod. <br>Reason', width: 80, dataIndex: 'RFIC', id: prototype.id + '-clmRFIC1'},
                                            {text: 'Sub <br>Cod.', width: 80, dataIndex: 'RECODE', id: prototype.id + '-clmRECODE1'},
                                            {text: 'Code <br>Desc.', width: 200, dataIndex: 'CODEDESC', id: prototype.id + '-clmCODEDESC1', align: 'left',},
                                            {text: 'Qty<br>Coupons', width: 100, dataIndex: 'A1781QCUPO',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#flown-average-fare-form" style="color:#008FE3;">' + value + '</a>';
                                                },
                                                listeners: {
                                                    click: 'onSetGridDataDetail'
                                                }
                                            },
                                            {text: 'Sales Total', width: 100, dataIndex: 'A1781TVALO', renderer: 'getDouble'},
                                            {text: 'Average', width: 100, dataIndex: 'A1781PROME', renderer: 'getDouble', id: prototype.id + '-clmA1781PROME' },
                                            {text: 'Currency', width: 80, dataIndex: 'A1781MONED' },
                                            
                                        ]
                                    }
                                }
                            ]
                        },
                        // --------------------------   GRID  DATA DETAIL-----------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataDetail',
                            bodyStyle: 'background-color: #E3EAF9;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle2',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '10 0 0 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '20 0 0 0',
                                    id: prototype.id + '-gridDataDetail',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 560,
                                    width: 772,
                                    columnLines: true,
                                    resizable: false,
                                    features: [{
                                            ftype: 'summary'
                                        }
                                    ],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            {text: 'Coupon', width: 170, dataIndex: 'strTicket'},
                                            {text: 'Sales<br>Date', width: 100, dataIndex: 'DSALES'},
                                            {text: 'Fare<br>Base', width: 100, dataIndex: 'FAREBASE'},
                                            {text: 'Booking<br>Code', width: 100, dataIndex: 'BOOKI'},
                                            {text: 'Clase<br>Code', width: 100, dataIndex: 'CLASE'},
//                                            {text: 'Cod. <br>Reason', width: 80, dataIndex: 'RFIC', id: prototype.id + '-clmRFIC2'},
//                                            {text: 'Sub <br>Cod.', width: 80, dataIndex: 'RECODE', id: prototype.id + '-clmRECODE2'},
//                                            {text: 'Code <br>Desc.', width: 80, dataIndex: 'CODEDESC', id: prototype.id + '-clmCODEDESC2'},
                                            {text: 'Currency', width: 100, dataIndex: 'CURRENC'},
                                            {text: 'Amount<br>Coupon', width: 100, dataIndex: 'VALOR', renderer: 'getDouble',
                                                summaryRenderer: function(value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataDetail').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right';
                                                    return '<b>' + Ext.util.Format.number(data.totVAL, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        }

                    ]
                },
                /** PAGINATION LABELS*/
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true,
                        padding: '0px 1px 0px 1px'
                    },
                    padding: '1px 1px 1px 1px',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelPie',
                            width: 762,
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
}
);

