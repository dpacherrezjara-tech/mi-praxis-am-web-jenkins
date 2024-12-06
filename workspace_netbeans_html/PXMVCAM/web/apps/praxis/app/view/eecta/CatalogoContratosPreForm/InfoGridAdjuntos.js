
Ext.define('Ext.Praxis.view.eecta.CatalogoContratosPreForm.InfoGridAdjuntos', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info-adjuntos',
    //layout: 'border',
    //align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-boxPrincipal-adjuntos',
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
                    id: prototype.id + '-boxMainData-adjuntos',
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
                            id: prototype.id + '-gridData-adjuntos',
                            columnLines: true,
                            autoScroll: true,
                            width: '100%',
                            height: 150,
                            padding: '0px 5px 1px 5px',
                            plugins: {
                                ptype: 'cellediting',
                                clicksToEdit: 1
                            },
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'right',
                                    items: [
                                        {
                                            text: 'Add',
                                            id: prototype.id + '-gridData-adjuntos-add',
                                            iconCls: 'prx-icon-add',
                                            handler: 'onClickAdd_uatp',
                                            hidden:true
                                        }
//                                        ,{
//                                            text:'handle',
//                                            //handler: 'crud_uatpAdd'
//                                            handler:'getModifiedRecords'
//                                        }
                                    ]
                                }],
                            columns: {
                                items: [
                                    {
                                        text: 'Nbr.', dataIndex: 'A4549ITEM', align: 'right', locked: true, width: 50
                                    },
                                    {
                                        text: 'Attach file', dataIndex: 'A4549NCONT', locked: true, align: 'left', width: 340
                                    },
                                    {
                                        text: 'Comment', dataIndex: 'A4549COMEN', align: 'left', width: 130,
                                        editor: {
                                            xtype: 'textfield',
                                            allowBlank: false,
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 100
                                        }
                                    },
                                    {
                                        text: '',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = ' color:#008FE3;text-align:center;text-decoration:underline;';
                                            return '<a href="#eecta-catalogoContratos-pre-form" style="color:#008FE3;">' + "Download" + '</a>';
                                        },
                                        listeners: {
                                            click: 'btnPdf_click'
                                        }
                                    }
//                                    {
//                                        xtype: 'actioncolumn',
//                                        sortable: false,
//                                        width: 40,
//                                        align: 'center',
//                                        items: [
//                                            {
//                                                tooltip: 'Click for Remove',
//                                                iconCls: 'prx-icon-image-trash',
//                                                handler: 'onClickRemove_uatp'
//                                            }
//                                        ]
//                                    }
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
                                getRowClass: function (record, rowIndex, rowParams, store) {
                                    if (rowIndex % 2 === 0)
                                        return 'rowA';
                                }
                            },
                            trackMouseOver: true,
                            scope: this,
                            listeners: {
                                scope: this,
                                afterrender: function (obj) {

                                }
                            }
                        }
                        // </editor-fold>

                    ]
                }
            ]
        }
    ]
});
