/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.sales.SalesReportForm.DataEntryRftx', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.idRfnd + '-dataEntryRftx',
    controller: prototype.idRfnd + '-dataEntryRftxController',
    requires: [
        'Ext.Praxis.controller.sales.SalesReport.DataEntryRftxController'
    ],
    title: 'Refund Information',
    header: true,
    width: 1470,
    height: 800,
    border: false,
    resizable: false,
    layout: {
        type: 'border',
        align: 'center'
    },
    modal: true,
    items: [
        {
            region: 'center',
            xtype: 'form',
            id: prototype.idRfnd + '-DataEntryRftx-center',
            border: false,
            layout: {
                type: 'vbox'
            },
            items: [
               
            ]
        }
    ]
});

