Ext.define('Ext.Praxis.view.program.ProMasterTicketForm.DataEntryDeliveryARC', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryDeliveryARCForm',
    requires: [
        'Ext.Praxis.controller.program.ProMasterTicket.DataEntryDeliveryARCController'
    ],
    controller: 'DataEntryDeliveryARCController',
    title: 'View Delivery ARC - Browser',
    header: true,
    closable: false,
    closeAction: 'hide',
    height: 640,
    width: 1300,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            width: '100%',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    bodyStyle: 'background: transparent;"',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        anchor: '100%',
                        width: '100%'
                    },
                    items: [
                        {xtype: 'tbspacer', height: 5},
                        {
                            xtype: 'panel',
                            layout: 'vbox',
                            border: false,
                            bodyStyle: 'background: transparent;"',
                            defaults: {
                                anchor: '100%',
                                width: '100%'
                            },
                            items: [
                                {xtype: 'tbspacer', height: 5},
                                {
                                    xtype: 'panel',
                                    //id: prototype.id+'-1-boxDeliveryData',
                                    border: false,
                                    flex: 3,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    defaults: {
                                        width: '100%'
                                    },
                                    items: [
                                        // <editor-fold defaultstate="collapsed" desc="gridData">
                                        {
                                            xtype: 'grid',
                                            id: prototype.id+'-1-gridDeliveryData',
                                            height: 487,
                                            columnLines: true,
                                            plugins: [
                                                { 
                                                    ptype: 'cellediting',
                                                    clicksToEdit: 1
                                                }
                                            ],                                            
                                            columns: {
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: true,
                                                    align: 'center'
                                                },
                                                items: [
                                                    {
                                                        text: 'SOURCE', dataIndex: 'A4471SOURC', width: 80,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'FEC_CARGA', dataIndex: 'A4471FFILE', width: 120,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'REF_NUM_FILE', dataIndex: 'A4471REFNB', width: 120,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'STATUS_VOID', dataIndex: 'A4471STATU', width: 100,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'CREDIT_CARD_CONTRAT', dataIndex: 'A4471CCC', width: 170,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'IATA_CODE', dataIndex: 'A4471IATA', width: 100,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    
                                                    {
                                                        text: 'CIA', dataIndex: 'A4471CIA', width: 100,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'FORMA', dataIndex: 'A4471FORMA', width: 100,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'SERIE', dataIndex: 'A4471SERIE', width: 100,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'FEC_VTA', dataIndex: 'A4471FVENT', width: 80,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'IND_ELEC_TKT', dataIndex: 'A4471IDET', width: 120,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'TOTAL_VENTA', dataIndex: 'A4471TOTVT', width: 100,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'REFERENCE_NUMBER', dataIndex: 'A4471RFNUM', width: 150,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'ESAC', dataIndex: 'A4471ESAC', width: 80,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'SOURCE_ESAC', dataIndex: 'A4471SESAC', width: 120,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'FECHA_REPORTE', dataIndex: 'A4471FREPO', width: 120,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        text: 'NRO_PAG', dataIndex: 'A4471NPAG', width: 80,editor:{ xtype:'textfield', editable: false }
                                                    },
                                                    {
                                                        xtype: 'actioncolumn',
                                                        text: 'REPORT',
                                                        width: 80,
                                                        align: 'center',
                                                        items: [
                                                          
                                                            
                                                             {
                                                xtype: 'button',
                                                id: prototype.id + '-btnTxt',
                                                icon: 'resources/img/botones/16x16/txt.png',
                                                tooltip: 'Info',
                                                handler: 'gridDataDeliveryARC_act1_clickHandler'
                                                         }
                                                            
                                                            
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        // </editor-fold>
                                        // <editor-fold defaultstate="collapsed" desc="pie">
                                        {
                                            xtype: 'panel',
                                            id: prototype.id+'-1-pie-1',
                                            border: true,
                                            hidden: true,
                                            height: 25,
                                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                                            defaults: {
                                                border: false
                                            },
                                            padding: '1px 0px 1px 0px',
                                            items: [
                                                {
                                                    xtype: 'panel',
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
                                                            id: prototype.id+'-1-lblPagActual',
                                                            text: '1',
                                                            width: 50
                                                        },
//                                                        {
//                                                            text: 'Of',
//                                                            width: 50
//                                                        },
                                                        {
                                                            id: prototype.id+'-1-lblPagTotal',
                                                            text: '0',
                                                            hidden: true,
                                                            width: 50
                                                        },
//                                                        {xtype: 'tbspacer', width: 100},
//                                                        {
//                                                            text: 'Total found',
//                                                            width: 80
//                                                        },
                                                        {
                                                            id: prototype.id+'-1-lblRowsTotal',
                                                            text: '0',
                                                            hidden: true,
                                                            width: 50
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
                }
            ]
        }
    ],
    dockedItems:[
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout:{
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults:{
                scale: 'medium'
            },
            items:[
                  {
                    text: 'Cancel',
                    id:prototype.id+'-btn-cance1-1',
                    iconCls: 'prx-icon-cancel',
                    listeners:{
                        click: 'onCancelClick'
                    }
                }
                //ProMasterTicketForm_btn_cance_1_btnIconEl  
                
            ]
        }
    ]
});