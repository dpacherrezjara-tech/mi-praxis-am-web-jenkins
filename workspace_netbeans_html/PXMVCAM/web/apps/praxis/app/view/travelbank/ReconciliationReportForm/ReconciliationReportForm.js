
// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'ReconciliationReportForm';
prototype.id1 = 'ReconciliationReportFormDetail';
prototype.id2 = 'DetalleTransaccionesForm';
prototype.id3 = 'AccountStatementForm_';

prototype.url = CONTEXTPATH+'/ReconciliationReport';
prototype.url2 = CONTEXTPATH + '/TransaccionBalance';
prototype.url3 = CONTEXTPATH + '/AccountStatement';

prototype.widthContenedor = 1300; 
prototype.widthGrid = 1200;
// </editor-fold>

Ext.define('Ext.Praxis.view.travelbank.ReconciliationReportForm.ReconciliationReportForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ReconciliationReportForm',
    //alias: 'widget.' + prototype.id + '-transaccionBalanceForm',
    requires: [
        'Ext.Praxis.controller.travelbank.ReconciliationReport.ReconciliationReportController',
        'Ext.Praxis.view.travelbank.ReconciliationReportForm.Options',
        'Ext.Praxis.view.travelbank.ReconciliationReportForm.Filters',
        'Ext.Praxis.view.travelbank.ReconciliationReportForm.Info',
        'Ext.Praxis.view.travelbank.ReconciliationReportForm.InfoDetail'
    ],
    controller: 'ReconciliationReportController',
    layout: {
        type: 'fit'
    },
    padding: '0 0 0 0',
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.id + '-xpanel',
            border: false,
            autoScroll: false,
            layout: 'fit',
            items: [
                {
                    id: prototype.id + '-form',
                    border: false,
                    bodyCls: 'colorFondo',
                    layout: 'fit',
                    defaults: {
                        border: false,
                        autoScroll: true
                    },
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
//                          width: 900,
                            layout: 'border',
                            items: [
                                {
                                    region: 'center',
                                    id: prototype.id + '-centerC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center'
                                    },
                                    border: true,
                                    autoScroll: true,
                                    defaults: {
                                        width: prototype.widthContenedor,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        }
                                        ,
                                        {
                                            xtype: prototype.id + '-filters',
                                            id: prototype.id + '-contentFilter'
                                        }
                                        ,
                                        {
                                            xtype: 'panel',                                            
                                            height: 600,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    id: prototype.id + '-centerC-panel01',
                                                    layout: 'border',
                                                    align: 'center',
                                                    border: true,
                                                    padding: 2,
                                                    defaults: {
                                                        border: true
                                                    },
                                                    bodyStyle: 'background-color: white;',
                                                    items: [
                                                        {
                                                            region: 'center',
                                                            xtype: prototype.id + '-info',
                                                            id: prototype.id + '-contentInfo'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});