/*  
 create by DP
*/
Ext.define('Ext.Praxis.view.salesaudit.TaxesExceptionsForm.Charts.TaxesExceptionsChart', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.' + prototype.id + '-TaxesExceptionsChart',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    width: '100%',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    items: [
        {
            xtype: 'panel',
            layout: 'fit',
            flex: 1,
            border: false,
            items: [{
                xtype: 'polar',
                id: prototype.id + '-chartPieExceptionTickets',
                hidden: false, 
                store: {
                    type: 'json',
                    fields: ['CTAX', 'PERCENT'],
                    data: []
                },
                insetPadding: 50,
                innerPadding: 20,
                interactions: ['rotate', 'itemhighlight'],
                legend: {
                    docked: 'right'
                },
                sprites: [{
                    type: 'text',
                    text: 'Percent for Code TAX',
                    font: '20px Helvetica',
                    x: 300,
                    y: 40
                }],
                series: [{
                    type: 'pie',
                    angleField: 'PERCENT',
                    label: {
                        field: 'CTAX',
                        display: 'outside',
                        calloutLine: {
                            length: 40,
                            width: 3
                        }
                    },
                    highlight: true,
                    tooltip: {
                        trackMouse: true,
                        renderer: function (tooltip, record) {
                            tooltip.setHtml(record.get('CTAX') + ': ' + record.get('PERCENT') + '%');
                        }
                    }
                }]
            }]
        },
        {
            xtype: 'panel',
            layout: 'fit',
            flex: 1,
            border: false,
            items: [{
                xtype: 'cartesian',
                id: prototype.id + '-chartLinealExceptionTickets',
                hidden: false,
                store: {
                    type: 'json',
                    fields: ['CTAX', 'PERCENT'],
                    data: []
                },
                insetPadding: '70 40 30 40',
                innerPadding: '0 40 30 40',

                sprites: [{
                    type: 'text',
                    text: 'Percent for Code TAX',
                    font: '20px Helvetica',
                    x: 300,
                    y: 40
                }],
                axes: [
                    {
                        type: 'numeric',
                        position: 'left',
                        fields: ['PERCENT'],
                        title: 'Percentage',
                        grid: true,
                        minimum: 0,
                        renderer: function (axis, label) {
                            return label + '%';
                        }
                    },
                    {
                        type: 'category',
                        position: 'bottom',
                        fields: ['CTAX'],
                        title: 'Tax Code',
                        label: {
                            rotate: {
                                degrees: -45
                            }
                        }
                    }
                ],
                series: [{
                    type: 'line',
                    xField: 'CTAX',
                    yField: 'PERCENT',
                    style: {
                        stroke: '#4978B0',   // <-- Color Line
                        lineWidth: 3
                    },
                    marker: {
                        type: 'circle',
                        radius: 4,
                        lineWidth: 2,
                        fill: '#4978B0',
                        stroke: '#4978B0'
                    },
                    label: {
                        display: 'insideEnd',
                        field: 'PERCENT',
                        orientation: 'vertical',
                        color: '#000'
                    },
                    highlight: true,
                    tooltip: {
                        trackMouse: true,
                        renderer: function (tooltip, record) {
                            tooltip.setHtml(record.get('CTAX') + ': ' + record.get('PERCENT') + '%');
                        }
                    }
                }]
            }]
        }
    ]
    
    
});




