prototype.id = 'MaintenanceAnalystsForm';

Ext.define('Ext.Praxis.view.salesaudit.MaintenanceAnalystsForm.MaintenanceAnalystsForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.MaintenanceAnalystsForm',

    requires: [
        'Ext.Praxis.view.salesaudit.MaintenanceAnalystsForm.Options',
        'Ext.Praxis.view.salesaudit.MaintenanceAnalystsForm.Filters',
        'Ext.Praxis.view.salesaudit.MaintenanceAnalystsForm.Info',
        'Ext.Praxis.controller.salesaudit.MaintenanceAnalysts.MaintenanceAnalystsController',
        'Ext.Praxis.view.salesaudit.MaintenanceAnalystsForm.DataEntryMaintenanceAnalysts',
        'Ext.Praxis.view.salesaudit.MaintenanceAnalystsForm.DataEntryRules'
    ],

    controller: 'MaintenanceAnalystsController',
    layout: 'fit',
    border: false,

    items: [{
        id: prototype.id + '-xpanel',
        border: false,
        layout: 'fit',

        items: [{
            id: prototype.id + '-form',
            border: false,
            bodyCls: 'colorFondo',
            layout: 'fit',

            items: [{
                xtype: 'panel',
                region: 'center',
                width: 1800,
                layout: 'border',

                items: [{
                    region: 'center',
                    id: prototype.id + '-centerC',
                    layout: { type: 'vbox', align: 'center' },
                    border: true,
                    autoScroll: true,
                    defaults: { width: 1800, align: 'center' },

                    items: [
                        { xtype: prototype.id + '-options' },
                        {
                            xtype: prototype.id + '-filters',
                            id: prototype.id + '-contentFilter'
                        },
                        {
                            xtype: 'panel',
                            height: 600,
                            width: 1800,
                            layout: 'fit',

                            items: [{
                                xtype: 'panel',
                                id: prototype.id + '-centerC-panel01',
                                width: 1200,
                                layout: 'border',
                                align: 'center',
                                border: true,
                                bodyStyle: 'background-color: white;',

                                items: [{
                                    region: 'center',
                                    xtype: prototype.id + '-info',
                                    id: prototype.id + '-contentInfo'
                                }]
                            }]
                        }
                    ]
                }]
            }]
        }]
    }]
});
