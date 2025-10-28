Ext.define('Ext.Praxis.view.sales.OdvCitysForm.Grids.OdvCitysFormGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.' + prototype.id + '-OdvCitysFormGrid',
    requires: [
        'Ext.Praxis.controller.sales.OdvCitys.OdvCitysGridController'
    ],
    controller: 'OdvCitysGridController',
//    id: prototype.id + '-gridOdvCitys',
    minHeight: 200,
    height: 'auto',
    width: 1800,
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
//            {
//                text: 'Customer',
//                dataIndex: 'A2936CCUST',
//                width: 80
//            },
            {
                text: 'Destination',
                columns: [
                    {text: 'Code', dataIndex: 'A2936CATTO', width: 50},
                    {text: 'Name', dataIndex: 'A2936NATTO', width: 250 },
                ]
            },
            {
                text: 'City',
                columns: [
                    {text: 'Code', dataIndex: 'A2936CCITY', width: 50},
                    {text: 'Name', dataIndex: 'A2936NCITY', width: 250},
                ]
            },
            {
                text: 'Country',
                columns: [
                    {text: 'Code', dataIndex: 'A2936CPAIS', width: 50},
                    {text: 'Name', dataIndex: 'A2936NPAIS', width: 250},
                ]
            },
            {
                text: 'Zone',
                columns: [
                    {text: 'Code', dataIndex: 'A2936IDZON', width: 50},
                    {text: 'Name', dataIndex: 'A2936NZONE', width: 250},
                ]
            },
            {
                text: 'Region',
                columns: [
                    {text: 'Code', dataIndex: 'A2936CREGI', width: 50},
                    {text: 'Name', dataIndex: 'A2936NREGI', width: 250},
                ]
            },
            {
                text: 'Sub Region',
                columns: [
                    {text: 'Code', dataIndex: 'A2936CSREG', width: 50},
                    {text: 'Name', dataIndex: 'A2936NCSRG', width: 250},
                ]
            },
            {
                text: 'Hub',
                dataIndex: 'A2936IDHUB',
                width: 50
            },
            {
                text: 'Gateway',
                dataIndex: 'A2936GATTO',
                width: 100
            },
            /*{
             text: 'Created',
             columns: [
             {text: 'User', dataIndex: 'A2936INGRE', width: 80},
             {text: 'Date', dataIndex: 'A2936FINGR', width: 90},
             {text: 'Time', dataIndex: 'A2936HINGR', width: 80},
             ]
             },
             {
             text: 'Update',
             columns: [
             {text: 'User', dataIndex: 'A2936MODIF', width: 80},
             {text: 'Date', dataIndex: 'A2936FMODI', width: 100},
             {text: 'Time', dataIndex: 'A2936HMODI', width: 80},
             ]
             },*/

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
                        handler: 'onEditOdvCitys'
                    }
                ]
            }


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
                    click: 'downloadExcel'
                }
            },
        ]
    },
    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true
    }
});



        