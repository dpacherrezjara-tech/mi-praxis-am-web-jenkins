Ext.define('Ext.Praxis.view.salesaudit.MiscellaneousAgentForm.Grids.MiscellaneousAgentGrid',{
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-MiscellaneousAgent',
    requires: [
        'Ext.Praxis.controller.salesaudit.MiscellaneousAgentForm.MiscellaneousAgentGridController'
    ],
    controller: 'MiscellaneousAgentGridController',
    minHeight: 200,
    height: 'auto',
    width: 1700,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        markDirty: false
    },
    columnLines: true,
    columns: {
        defaults: {
            align: 'center',
            menuDisabled: true,
            sortable: true
        },
        items: [
            {
                text: 'Key 1', dataIndex: 'A4593KEY1', 
                width: 80
            }, {
                text: 'Key 2', dataIndex: 'A4593KEY2', width: 150
            },
            {
                text: 'Key 3', dataIndex: 'A4593KEY3', width: 150
            },
            {
                text: 'Description 1', dataIndex: 'A4593DESC1', width: 200
            },
            {
                text: 'Description 2', dataIndex: 'A4593DESC2', width: 200
            },
              {
                text: 'Status', dataIndex: 'A4593STS', width: 100
            },
             {
                text: 'Comment', dataIndex: 'A4593COMEN', width: 200
            },
            {
                text: 'Created',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'User', dataIndex: 'A4593USCR', width: 100
                    },
                    {
                        text: 'Date Time', dataIndex: 'A4593TSCR', width: 120
                    }, 
                ]
            },
             {
                text: 'Update',
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    align: 'center'
                },
                columns: [
                    {
                        text: 'User', dataIndex: 'A4593USUP', width: 100
                    },
                    {
                        text: 'Date Time', dataIndex: 'A4593TSUP', width: 120
                    }, 
                ]
            },
          
            {
                sortable: false,
                xtype: 'actioncolumn',
                width: 50,
                text: 'Detail',
                align: 'center',
                items: [
                    {
                        iconCls: 'prx-icon-detail',
//                        tooltip: 'copy SPNR',
                        handler: 'detailSettlBalancesCtrl'
                    }
                ]
            },
            
            
        ]
    },
    tbar: {
        layout: {
            pack: 'end'
        },
        defaults: {
            scale: 'medium'
        },
        items: [
            {
                xtype: 'button',
                iconCls: 'prx-icon-excel',
                scale: 'small',
                tooltip: 'Export to Excel',
                listeners: {
                    click: 'downloadExcelSetrlBalancesCntl'
                }
            },
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});



        