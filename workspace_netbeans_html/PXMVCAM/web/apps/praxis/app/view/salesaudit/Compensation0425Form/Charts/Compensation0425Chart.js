/*
 create by zpp
*/
Ext.define('Ext.Praxis.view.salesaudit.Compensation0425Form.Charts.Compensation0425Chart', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.' + prototype.id + '-Compensation0425Chart',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    width: '100%',
    border: false,
    scrollable: {
        x: 'auto',
        y: false
    },
    bodyStyle: 'background-color: #f9f9f7; padding: 8px;',
    defaults: {
        xtype: 'panel',
        layout: 'fit',
        flex: 1,
        minWidth: 430,
        margin: '0 4 0 4',
        bodyStyle: 'background-color: #fcfcfb;',
        style: {
            borderRadius: '4px'
        }
    },
    items: [
        {
            title: 'Percent by Status',
            items: [{
                xtype: 'polar',
                id: prototype.id + '-chartCompensation0425',
                hidden: false,
                store: {
                    type: 'json',
                    fields: ['A4961FLADM', 'PERCENT'],
                    data: []
                },
                background: '#fcfcfb',
                insetPadding: 40,
                innerPadding: 20,
                interactions: ['rotate', 'itemhighlight'],
                legend: {
                    docked: 'bottom',
                    label: {
                        color: '#0b0b0b'
                    }
                },
                series: [{
                    type: 'pie',
                    angleField: 'PERCENT',
                    donut: 40,
                    label: {
                        field: 'A4961FLADM',
                        display: 'outside',
                        color: '#0b0b0b',
                        calloutLine: {
                            length: 20,
                            width: 1,
                            color: '#898781'
                        },
                        renderer: function (text, sprite, config, rendererData, index) {
                            var record = rendererData.store.getAt(index);
                            return record ? (text + ' (' + Ext.util.Format.number(record.get('PERCENT'), '0.0') + '%)') : text;
                        }
                    },
                    highlight: true,
                    tooltip: {
                        trackMouse: true,
                        renderer: function (tooltip, record) {
                            tooltip.setHtml(record.get('A4961FLADM') + ': ' + Ext.util.Format.number(record.get('PERCENT'), '0.0') + '%');
                        }
                    }
                }]
            }]
        },
        {
            title: 'Quantity by Status (Monthly)',
            items: [{
                xtype: 'cartesian',
                id: prototype.id + '-chartLinealchartCompensation',
                hidden: false,
                store: {
                    type: 'json',
                    fields: ['PERIOD'],
                    data: []
                },
                background: '#fcfcfb',
                insetPadding: '20 20 10 10',
                innerPadding: '0 10 10 0',
                legend: {
                    docked: 'bottom',
                    label: {
                        color: '#0b0b0b'
                    }
                },
                axes: [
                    {
                        type: 'numeric',
                        position: 'left',
                        fields: [],
                        title: {
                            text: 'Quantity',
                            fontWeight: 'bold',
                            color: '#52514e'
                        },
                        grid: {
                            stroke: '#e1e0d9',
                            lineWidth: 1
                        },
                        style: {
                            strokeStyle: '#c3c2b7'
                        },
                        label: {
                            color: '#898781'
                        },
                        minimum: 0,
                        renderer: function (axis, label) {
                            return Ext.util.Format.number(label, '0,000');
                        }
                    },
                    {
                        type: 'category',
                        position: 'bottom',
                        fields: ['PERIOD'],
                        title: {
                            text: 'Month / Year',
                            fontWeight: 'bold',
                            color: '#52514e'
                        },
                        style: {
                            strokeStyle: '#c3c2b7'
                        },
                        label: {
                            color: '#898781',
                            rotate: {
                                degrees: -45
                            }
                        }
                    }
                ],
                series: []
            }]
        }
    ]


});




