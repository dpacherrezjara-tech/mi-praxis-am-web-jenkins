Ext.define('Ext.Praxis.view.sales.AttosMasterFileForm.Info', {
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
            id:prototype.id+'-boxMainData',
            hidden: false,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 939,
                height: 510,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData',
                    width: 939,
                    height: 510,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {
                                text: 'Airport',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Code', dataIndex: 'A4290CTATO', width: 80},
                                    {text: 'Name', dataIndex: 'A4290NOMBR', width: 200,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdAttr = 'data-qtip="' + record.data.A4290NOMBR+'"';
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'City',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Code', dataIndex: 'A4290CIUD', width: 80},
                                    {text: 'Name', dataIndex: 'A4290NOMCD', width: 200,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdAttr = 'data-qtip="' + record.data.A4290NOMCD+'"';
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    }
                                ]
                            },
                            {
                                text: 'Country',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: false,
                                    align: 'center'
                                },
                                columns: [
                                    {text: 'Code', dataIndex: 'A4290PAIS', width: 80},
                                    {text: 'Name', dataIndex: 'strNomPais', width: 200,
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.tdAttr = 'data-qtip="' + record.data.strNomPais+'"';
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {text: 'Start Date', dataIndex: 'A4290FINI', width: 80, hidden: false},
                                    {text: 'End Date', dataIndex: 'A4290FFIN', width: 80, hidden: false}
                                ]
                            },
                            {text: 'Status', width: 60, dataIndex: 'A4290STAT'},
                            {
                                text: 'Edit',
                                sortable: false,
                                xtype: 'actioncolumn',
                                width: 39,
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
                //<editor-fold defaultstate="collapsed" desc="pie">
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
                        border: false
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: 950,
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
                //</editor-fold>
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
