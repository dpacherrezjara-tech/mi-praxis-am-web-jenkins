Ext.define('Ext.Praxis.view.eecta.ControlUATPPreForm.Info05', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id06 + '-info05',
    align: 'left',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id06 + '-boxPrincipal',
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
                    id: prototype.id06 + '-boxMainData',
                    border: false,
                    width: prototype.widthContenedor,
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
                            id: prototype.id06 + '-gridData',
                            columnLines: true,
                            width: 850,
                            height: 280,
                            padding: '1px 5px 1px 5px',
                            plugins: {
                                ptype: 'cellediting',
                                clicksToEdit: 1
                            },
                            columns: {
                                items: [
                                    {
                                        xtype: 'actioncolumn',
                                        sortable: false,
                                        width: 40,
                                        align: 'center',
                                        items: [
                                            {
                                                tooltip: 'Click for Remove',
                                                iconCls: 'prx-icon-image-trash',
                                                handler: 'onClickRemove_uuid'
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Ticket', dataIndex: 'A4250SERIE', width: 110, align: 'center', 
                                        //locked: true,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                            return record.get('A4250CIA') + record.get('A4250FORMA') + record.get('A4250SERIE');
                                        }
                                    },
                                    {text: 'CDFI', dataIndex: 'A4250CFDI', width: 250, align: 'left'},
                                    {text: 'Fecha', dataIndex: 'A4250FECTB', width: 70, align: 'center'},
                                    {text: 'FOP', dataIndex: 'A4250FOP', width: 60, align: 'center'},
                                    {text: 'Metodo', dataIndex: 'A4250MPG', width: 60, align: 'center'},
                                    {text: 'Tipo', dataIndex: 'A4250TIPO', width: 50, align: 'center'},
                                    {text: 'RFC', dataIndex: 'A4250RFC', width: 80, align: 'left'},
                                    {text: 'Detalle<br>Mensaje', dataIndex: 'A4250RMSG', width: 150, align: 'left'}
                                ],
                                defaults: {
                                    sortable: false,
                                    menuDisabled: true,
                                    align: 'center'
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
