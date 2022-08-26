/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

Ext.define('Ext.Praxis.store.eecta.UATPSales.GridData', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.eecta.SalesList.GridData',   
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'GET'
        },
        timeout: 60000000,
        reader: {
            keepRawData: true,
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    }
});


