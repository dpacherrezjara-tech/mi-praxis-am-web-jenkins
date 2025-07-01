
prototype.idDE3 = prototype.id + '-TaxesExceptionsLog';

Ext.define('Ext.Praxis.view.salesaudit.TaxesExceptionsForm.DataEntrys.TaxesExceptionsLog', {
    extend: 'Ext.window.Window',
    alias: 'widget.TaxesExceptionsLog',
    requires: [
        'Ext.Praxis.controller.salesaudit.TaxesExceptions.TaxesExceptionsLogController'
    ],
    controller: 'TaxesExceptionsLogController',
    title: 'History of Taxes Exception',
    header: true,
    width: 1350,
    resizable: false,
    layout: 'vbox',
    modal: true,
    border: false,
    bodyStyle: 'background: #ffffff;',
    defaults: {
        border: false
    },
    
});