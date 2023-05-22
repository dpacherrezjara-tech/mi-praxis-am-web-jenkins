
// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'TransaccionErrorForm';
prototype.id2 = 'TransaccionErrorDetalleForm';
prototype.id3 = 'CrudIssueDataEntry';

prototype.url = CONTEXTPATH+'/TransaccionError';
prototype.url1 = CONTEXTPATH+'/TransactionFiles';

prototype.widthContenedor = 1300;//910
prototype.widthGrid = 1200;
// </editor-fold>

Ext.define('Ext.Praxis.view.travelbank.TransaccionErrorForm.TransaccionErrorForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.TransaccionErrorForm',
    //alias: 'widget.' + prototype.id + '-transaccionBalanceForm',
    requires: [
        'Ext.Praxis.controller.travelbank.TransaccionError.TransaccionErrorController',
        'Ext.Praxis.view.travelbank.TransaccionErrorForm.Options',
        'Ext.Praxis.view.travelbank.TransaccionErrorForm.Filters',
        'Ext.Praxis.view.travelbank.TransaccionErrorForm.Info'
    ],
    controller: 'TransaccionErrorController',
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
                                            //border:true,title:'xxxxxxxxx',
                                            height: 500,
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