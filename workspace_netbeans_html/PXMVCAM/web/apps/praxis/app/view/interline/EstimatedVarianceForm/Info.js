Ext.define('Ext.Praxis.view.interline.EstimatedVarianceForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
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
//                height: 570,
                align: 'center'
            },
            items: [
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
                        width: prototype.widthGrid,
//                        height: 545,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: prototype.widthGrid,
                            height: 510,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        text: 'Code', dataIndex: 'LCODE', width: 70,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Description', dataIndex: 'DESCRIPTION', width: 200,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                      text: 'Estimation',
                                      defaults: {
                                          menuDisabled: true,
                                          sortable: false,
                                          align: 'center'
                                      },
                                      columns: [
                                          {text: 'Gross', dataIndex: 'EGROSS', width: 90,
                                            renderer: function(value){
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                          },
                                          {text: 'ISC', dataIndex: 'EISC', width: 90,
                                            renderer: function(value){
                                            return Ext.util.Format.number(value, '0,000.00');
                                            }
                                          },
                                          {text: 'Other', dataIndex: 'EOTHER', width: 90,
                                            renderer: function(value){
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                          }
                                      ]
                                    },
                                    {
                                      text: 'Real',
                                      defaults: {
                                          menuDisabled: true,
                                          sortable: false,
                                          align: 'center'
                                      },
                                      columns: [
                                          {text: 'Gross', dataIndex: 'LGROSS', width: 90,
                                            renderer: function(value){
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                          },
                                          {text: 'ISC', dataIndex: 'LISC', width: 90,
                                            renderer: function(value){
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                          },
                                          {text: 'Other', dataIndex: 'LOTHER', width: 90,
                                            renderer: function(value){
                                                return Ext.util.Format.number(value, '0,000.00');
                                            }
                                          }
                                      ]
                                    },
                                    {
                                      text: 'Percentage Variation',
                                      defaults: {
                                          menuDisabled: true,
                                          sortable: false,
                                          align: 'center'
                                      },
                                      columns: [
                                          {text: 'Gross', dataIndex: 'VGROSS', width: 90,
                                          renderer: function(value, metaData, record, rowIndex, colIndex, store, view)
                                          {
                                            var value_abs = Math.abs(value);
                                            if (value_abs <= 5){
                                                metaData.style = "background-color: #61d361;";
                                                return value + "%";
                                            }
                                            else if (value_abs >= 6 && value <= 15){
                                                metaData.style = "background-color: #ffff88;";
                                                return value + "%";
                                            }
                                            else if (value_abs >= 16){
                                                metaData.style = "background-color: #fdb5b5;";
                                                return value + "%";
                                            }
                                          }},
                                          {text: 'ISC', dataIndex: 'VISC', width: 90,
                                          renderer: function(value, metaData, record, rowIndex, colIndex, store, view)
                                          {
                                            var value_abs = Math.abs(value);
                                            if (value_abs <= 5){
                                                metaData.style = "background-color: #61d361;";
                                                return value + "%";
                                            }
                                            else if (value_abs >= 6 && value <= 15){
                                                metaData.style = "background-color: #ffff88;";
                                                return value + "%";
                                            }
                                            else if (value_abs >= 16){
                                                metaData.style = "background-color: #fdb5b5;";
                                                return value + "%";
                                            }
                                          }},
                                          {text: 'Other', dataIndex: 'VOTHER', width: 90,
                                          renderer: function(value, metaData, record, rowIndex, colIndex, store, view)
                                          {
                                            var value_abs = Math.abs(value);
                                            if (value_abs <= 5){
                                                metaData.style = "background-color: #61d361;";
                                                return value + "%";
                                            }
                                            else if (value_abs >= 6 && value <= 15){
                                                metaData.style = "background-color: #ffff88;";
                                                return value + "%";
                                            }
                                            else if (value_abs >= 16){
                                                metaData.style = "background-color: #fdb5b5;";
                                                return value + "%";
                                            }
                                          }}
                                      ]
                                    }                                    
                                    
                                    /*{
                                        text: 'Edit',
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        width: 90,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-edit',
                                                tooltip: 'Edit',
                                                handler: 'onEditClick'
                                            }
                                        ]
                                    }*/
                                ]
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
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
                                border: true
                            },
                            padding: '1px 0px 1px 0px',
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
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="Chart">
                        {
                            xtype: 'panel',
//                            id: prototype.id + '-byMonth_02',
                            hidden: false,
                            margin: '5 0 5 0',
                            border: false,
                            layout: {
                                type: 'vbox',
                                aling: 'center'
                            },
                            bodyStyle: 'background-color: transparent;',
                            items: [
                                {
                                    xtype: 'panel',
//                                    id: prototype.id + '-panelGraficos',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    padding: '5 0 0 5',
                                    border: true,
                                    layout: {
                                        type: 'vbox'
                                    },
                                    items: [
                                        {
                                            xtype: 'cartesian',
                                            // title: '<div style="text-align:center;color:#6E6E73;font-size:14px">Passenger by Market</div>',
                                            id: prototype.id + '-displaySAChart32',
                                            width: 1400,
                                            border: false,
                                            height: 400,
                                            background: '#E0F8F7',
                                            captions: {
                                                title: {
                                                    text: 'Total Variance',
                                                    alignTo: 'chart'
                                                }
                                            },
                                            animation: {
                                                duration: 200
                                            },
                                            interactions: ['itemhighlight'],
                                            legend: {
                                                docked: 'bottom',
                                                background: '#E3EAEF'
                                            },
                                            axes: [{
                                                    type: 'numeric3d',
                                                    position: 'left',
                                                    fields: ['VGROSS', 'VISC', 'VOTHER'],
                                                    grid: true,
                                                    title: '',
                                                    //title: 'Millions of USD',
                                                }, {
                                                    type: 'category3d',
                                                    position: 'bottom',
//                                                            fields: 'strFormatDate',
                                                    grid: true,
                                                    title: {
                                                        text: 'Code',
                                                        translationX: -30
                                                    }
                                                }],
                                            series: [{
                                                    type: 'bar3d',
                                                    stacked: false,
                                                    title: ['GROSS', 'ISC', 'OTHER'],
                                                    xField: 'LCODE',
                                                    yField: ['VGROSS', 'VISC', 'VOTHER'],
                                                    colors: ['#FDB541', '#FD8A8A', '#AAE3E2', '#ffff99'],
                                                    highlight: true,
                                                    style: {
                                                        inGroupGapWidth: -7,
                                                        minGapWidth: 2,
                                                        maxBarWidth: 1200
                                                    },
                                                    tooltip: {
                                                        trackMouse: true,
                                                        height: 28,
                                                        renderer: function (toolTip, record, ctx) {
                                                            var name = '';
                                                            if (ctx.field === 'VGROSS') {
                                                                name = 'GROSS';
                                                            } else if (ctx.field === 'VISC') {
                                                                name = 'ISC';
                                                            } else if (ctx.field === 'VOTHER') {
                                                                name = 'OTHER';
                                                            }
                                                            toolTip.setHtml(name + ' : ' + '<b>' + Ext.util.Format.number(record.get(ctx.field), '0,000') + '</b>');
                                                        }
                                                    },
                                                    label: {
                                                        display: 'insideEnd',
                                                        field: ['VGROSS', 'VISC', 'VOTHER'],
                                                        renderer: function(text) {
                                                            //Ext.util.Format.numberRenderer('0');
                                                            var value1 = parseFloat(text);
                                                            var value = value1.toFixed(0);
                                                            return value + '%';
                                                        },
                                                        orientation: 'horizontal',
                                                        color: '#000000',
                                                        'text-anchor': 'middle'
                                                    }
                                                }]
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