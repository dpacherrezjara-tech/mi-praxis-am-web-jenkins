Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryFOPVoid', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntryFOPVoid',
    controller: 'DataEntryFOPVoidController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryFOPVoidController'
    ],
    id: prototype.idVoidFOP + '-winDataEntryFOPVoid',
    title: 'FOP Void Information',
    header: true,
//    bodyStyle: 'background: transparent; top:17px !important',
    height: 230,
    width: 620,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            id: prototype.idVoidFOP + '-form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [

                {
                    xtype: 'grid',
                    id: prototype.idVoidFOP + '-det-gridDataVoidFOP',
                    columnLines: true,
                    dockedItems: [{
                            xtype: 'toolbar',
                            items: [{
                                    text: 'Add Fop',
                                    id: prototype.idVoidFOP + '-gridFopADD',
                                    iconCls: 'prx-icon-add',
                                    handler: 'onAddFopClick',
                                    hidden:true
                                }, '-']
                        }],
                    autoScroll: true,
                    height: 300,
                    flex: 1,
                    columns: {
                        items: [//maxLength: 3,enforceMaxLength: 3,
                            {text: 'Code', width: 50, dataIndex: 'cfop'},
                            {text: 'Card<br>Type', width: 45, dataIndex: 'ttarj'},
                            {text: 'Ref Number', width: 150, dataIndex: 'nref'},
                            {text: 'Curr', width: 40, dataIndex: 'mfop'},
                            {text: 'Amount', dataIndex: 'vfop', width: 120, align: 'right',
                                summaryType: 'sum', summaryRenderer: 'OnAmountSummary', renderer: 'onColumnAmountRenderer'},
                            {text: 'Expired<br>Card Date', width: 80, dataIndex: 'fexp'},
                            {text: 'Approval<br>Card', width: 70, dataIndex: 'capl'}
                        ],
                        defaults: {
                            sortable: false,
                            menuDisabled: true,
                            align: 'center'
                        }
                    }
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
                    id: prototype.idVoidFOP + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onClickCancel'
                    }
                }, {
                    text: 'Save',
                    id: prototype.idVoidFOP + '-gridFopSave',
                    iconCls: 'prx-icon-save',
                    hidden:true,
                    listeners: {
                        click: 'onSaveFopClick'
                    }
                }
            ]
        }
    ]

});
