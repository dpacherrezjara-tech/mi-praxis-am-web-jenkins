
Ext.define('Ext.Praxis.view.eecta.CatalogoClienteForm.InfoGridRef', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id03 + '-info-ref',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id03 + '-boxPrincipal',
            layout: {
                type: 'vbox',
                align: 'left'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'left'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id03 + '-boxMainData',
                    border: false,
                    width: '100%',
                    hidden: false,
                    layout: {
                        type: 'vbox',
                        align: 'left'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: false,
                        align: 'left'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="grid">
                        {
                            xtype: 'grid',
                            id: prototype.id03 + '-gridData',
                            columnLines: true,
                            autoScroll: true,
                            width: '100%',
                            border: false,
                            height: 360,
                            padding: '0px 5px 1px 5px',
                            columns: {
                                items: [
                                    {
                                        text: 'Código', dataIndex: 'A4097CDCLI', locked: true, align: 'left', width: 70
                                    },
                                    {
                                        text: 'Nombre Cliente', dataIndex: 'A3953RSOCI', locked: true, align: 'left', width: 220
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        sortable: false,
                                        width: 40,
                                        align: 'center',
                                        items: [
                                            {
                                                iconCls: 'prx-icon-detail',
                                                tooltip: 'Click for view detail',
                                                handler: 'onEditClickRef'
                                            }
                                        ]
                                    }
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'left'
                                }
                            },
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false,
//                                getRowClass: function (record, rowIndex, rowParams, store) {
//                                    if (rowIndex % 2 === 0)
//                                        return 'rowA';
//                                }
                                getRowClass: function (record, rowIndex, rowParams, store) {
                                    //console.log(record.data.A3958STSPG); 
                                    if ( record.data.A4097STAT === "0" )                  
                                         return 'rowC';                                        
//                                    if (rowIndex % 2 === 0)
//                                        return 'rowA';
                                }
                            },
                            trackMouseOver: true,
                            scope: this,
                            listeners: {
                                scope: this,
                                afterrender: function (obj) {

                                }
                            }
                        },
                        // </editor-fold>
                        // <editor-fold defaultstate="collapsed" desc="pie">
                        {

                            xtype: 'panel',
                            id: prototype.id03 + '-pie',
                            width: '100%',
                            hidden: false,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            height: 35,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            defaults: {
                                border: true
                            },
                            padding: '1px 1px 1px 1px',
                            items: [
                                {
                                    xtype: 'panel',
                                    id: prototype.id03 + '-boxPaginacion',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'toolbar',
                                            cls: 'x-toolbar-pag',
                                            items: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    id: prototype.id03 + '-paggin',
                                                    pageSize: 20,
                                                    border: false,
                                                    displayInfo: false,
                                                    hidden: false
                                                }
                                            ]
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
