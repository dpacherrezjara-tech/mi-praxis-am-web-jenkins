/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.view.salesaudit.RFNDAssociatedARCRFNDForm.RFNDARCFormRazones', {
    extend: 'Ext.window.Window',
    alias: 'widget.RFNDARCFormRazones',

    controller: 'RFNDARCFormRazonesController',

    requires: [
        'Ext.Praxis.controller.salesaudit.RFNDAssociatedARCRFNDForm.RFNDARCFormRazonesController'
    ],

    title: 'SELECT ISSUE REASON',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 450,
    width: 800,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,

    defaults: {
        border: false
    },

    items: [
        {
            xtype: 'panel',
            layout: 'hbox',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.idRFNDARCFormRazones + '-gridControlRazon',
                    flex: 1,
                    height: 400,
                    features: [
                        {
                            ftype: 'grouping',
                            groupHeaderTpl: '{name}',
                            startCollapsed: true
                        }
                    ],
                    columns: {
                        items: [
                            {text: 'Cod.Razon', dataIndex: 'A4360CODRZ', flex: 1},
                            {text: 'Relation', dataIndex: 'A4360FAMIL', flex: 1},
                            {text: 'Description', dataIndex: 'A4360COMES', width: 300, renderer: 'OnRendererColumnDescription', cellWrap: true},
                            {
                                xtype: 'actioncolumn',
                                width: 50,
                                menuDisabled: true,
                                sortable: false,
                                items: [
                                    {
                                        iconCls: 'prx-icon-check',
                                        handler: 'OnChkRFNDHandler',
                                        isDisabled: 'OnChkRFNDIsDisabled'
                                    }
                                ]
                            }
                        ],
                        defaults: {
                            sortable: true,
                            menuDisabled: true
                        }
                    },
                    viewConfig: {
                        stripeRows: true,
                        enableTextSelection: true,
                        markDirty: false
                    },
                    listeners: {
                        // afterrender: 'OnLoadDataAfterRender'
                    }
                }
            ]
        }
    ]
});