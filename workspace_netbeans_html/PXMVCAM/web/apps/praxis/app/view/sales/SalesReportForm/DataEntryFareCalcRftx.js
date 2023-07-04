/*
 * @Dvicente
 */
Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryFareCalcRftx', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryFareCalcRftx',
    controller: 'DataEntryFareCalcRftxController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryFareCalcRftxController'
    ],
    id: prototype.idRftxFareCalc + '-winDataEntryFareCalcRftx',
    title: 'Fare Calculation',
    header: true,
    height: 200,
    width: 700,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.idRftxFareCalc + '-dataEntryFareCalcRftx',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
                {
                    xtype: 'panel',
                    height: 130,
                    layout: {
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'textarea',
                            bodyStyle: 'background: #E5ECEF',
                            padding: '5 0 0 0',
                            id: prototype.idRftxFareCalc + '-det-TktFareCalc',
                            height: 100,
                            width: 680
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            style: 'background-color: #E3EAF9; padding: 5px;',
            items: [
                {
                    text: 'Close',
                    id: prototype.idRftxFareCalc + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }, {
                    text: 'Save',
                    id: prototype.idRftxFareCalc + '-gridFareCalcSave',
                    iconCls: 'prx-icon-save',
                    hidden:true,
                    listeners: {
                        click: 'onSaveFareCalcClick'
                    }
                }
            ]
        }
    ]

});

