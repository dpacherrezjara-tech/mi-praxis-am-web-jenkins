Ext.define('Ext.Praxis.view.salesaudit.MaintenanceAnalystsForm.Info', {
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
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1600,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridDataMain',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            border: true,
                            height: 500,
                            width: 1600,
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataMain',
                                    height: 500,
                                    width: 1600,
                                    columnLines: true,
                                    features: [{
                                        ftype: 'grouping',
                                        groupHeaderTpl: [
                                            '<div>',
                                            '{name}',
                                            '</div>'
                                        ],
                                        startCollapsed: false,  // Los grupos inician expandidos
                                        enableGroupingMenu: false,
                                        collapsible: true
                                    }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: false,
                                            align: 'center'
                                        },
                                        items: [
                                            { text: 'RN', dataIndex: 'RN', width: 50, hidden: true },
                                            { text: 'Auditor', dataIndex: 'A4886USER', width: 130 },
                                            { text: 'Description', dataIndex: 'A4886DESCR', width: 190 },
                                            { text: 'Channel', dataIndex: 'A4420CANAL', width: 130 },
                                            {
                                                text: 'Queq', dataIndex: 'A4420QUEQ',
                                                // width: 150,
                                                flex: 1,
                                                renderer: function (value) {
                                                    return value
                                                        ? '<span data-qtip="' + Ext.String.htmlEncode(value) + '">' +
                                                        Ext.String.htmlEncode(value) +
                                                        '</span>'
                                                        : '';
                                                }
                                            },
                                            { text: 'Transaction', dataIndex: 'A4420TRAS', width: 150 },
                                            // { text: 'Iata', dataIndex: 'A4420IATA', width: 150 },
                                            {
                                                text: 'Iata',
                                                dataIndex: 'A4420IATA',
                                                // width: 150,
                                                flex: 1,
                                                renderer: function (value) {
                                                    return value
                                                        ? '<span data-qtip="' + Ext.String.htmlEncode(value) + '">' +
                                                        Ext.String.htmlEncode(value) +
                                                        '</span>'
                                                        : '';
                                                }
                                            },
                                            { text: 'Fcmi', dataIndex: 'A4420FCMI', width: 150 },
                                            { text: 'Status', dataIndex: 'A4886FLAG', width: 110 },
                                            { text: '', dataIndex: '', width: 60, renderer: 'onRendererColumnOnStatus' },
                                            {
                                                sortable: false,
                                                xtype: 'actioncolumn',
                                                width: 50,
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'prx-icon-edit',
                                                        tooltip: 'Detail',
                                                        handler: 'onEditClick',
                                                        isActionDisabled: 'OnEditActionDisabled'
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pagginator-legend',
                            hidden: true,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            bodyStyle: 'background-color: transparent;',
                            defaults: {
                                border: false,
                                padding: '0px 5px 0px 5px'
                            },
                            padding: '1px 5px 1px 5px',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: prototype.widthContenedor,
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
                                        { xtype: 'tbspacer', width: 100 },
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 50
                                        },
                                        { xtype: 'tbspacer', width: 20 },
                                        {
                                            id: prototype.id + '-lblRowsTotalADM',
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
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]


});