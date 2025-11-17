Ext.define('Ext.Praxis.view.panel.UsersReportForm.Info', {
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
                width: 1200,
//                height: 570,
                align: 'center'
            },
            items: [
                // <editor-fold defaultstate="collapsed" desc="boxMainData">
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
                        minWidth: 500,
//                        height: 545,
                        align: 'center'
                    },
                    items: [
                        {
                            title: 'Info',
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            width: 1220,
                            height: 510,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    { text:'Airline', dataIndex: 'CCUST', type: 'string', width: 60, align: 'C'},
                                    { text:'User', dataIndex: 'USR', type: 'string', width: 100, align: 'L' },
                                    { text:'Name', dataIndex: 'NOM', type: 'string', width: 110, align: 'L'},
                                    { text:'Last Name', dataIndex: 'APE', type: 'string', width: 100, align: 'L'},
                                    { text:'Description', dataIndex: 'DESC1', type: 'string', width: 100, align: 'L'},
                                    { text:'Mail', dataIndex: 'MAIL', type: 'string', width: 100, align: 'L'},
                                    { text:'Profile', dataIndex: 'PROFILE', type: 'string', width: 100, align: 'L'},
                                    { text:'Program', dataIndex: 'NPROG', type: 'string', width: 100, align: 'L'},
                                    { text:'PERMA', dataIndex: 'PERMA', type: 'string', width: 60, align: 'L'},
                                    { text:'PERML', dataIndex: 'PERML', type: 'string', width: 60, align: 'L'},
                                    { text:'PERMC', dataIndex: 'PERMC', type: 'string', width: 60, align: 'L'},
                                    { text:'PERMM', dataIndex: 'PERMM', type: 'string', width: 60, align: 'L'},
                                    { text:'PERME', dataIndex: 'PERME', type: 'string', width: 60, align: 'L'},
                                    { text:'PERMX', dataIndex: 'PERMX', type: 'string', width: 60, align: 'L'},
                                    { text:'USRC', dataIndex: 'USRC', type: 'string', width: 60, align: 'L'},
                                    { text:'DATC', dataIndex: 'DATC', type: 'string', width: 60, align: 'L'}
                                ]
                            }
                        },
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            hidden: true,
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
                        }
                        // </editor-fold>
                    ]
                }
                // </editor-fold>
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