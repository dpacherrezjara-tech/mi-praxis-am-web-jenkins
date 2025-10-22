
prototype.id = 'ParametersNaturalDischargesForm';

Ext.define('Ext.Praxis.view.flown.ParametersNaturalDischargesForm.ParametersNaturalDischargesForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ParametersNaturalDischargesForm',
    requires: [
        'Ext.Praxis.controller.flown.ParametersNaturalDischarges.ParametersNaturalDischargesController',
        'Ext.Praxis.view.flown.ParametersNaturalDischargesForm.Grids.ParametersNaturalDischargesGrids',
        'Ext.Praxis.view.flown.ParametersNaturalDischargesForm.DataEntrys.ParameterNaturalDischargesDataEntry',
        'Ext.Praxis.view.flown.ParametersNaturalDischargesForm.Options'
    ],
    controller: 'ParametersNaturalDischargesController',
    layout: {
        type: 'fit'
    },
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
                    items: [
                        {
                            xtype: 'panel',
                            region: 'center',
                            width: 950,
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
                                        width: 950,
                                        align: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: prototype.id + '-options'
                                        },
                                        {
                                            xtype: 'panel',
                                            marginTop: 50,
                                            minHeight: 300,
                                            width: 950,
                                            bodyStyle: 'background: #E3EAF9',
                                            layout: 'fit',
                                            defaults: {
                                                bodyStyle: 'background: transparent'
                                            },
                                            items: [
                                                {
                                                    xtype: prototype.id + '-ParametersNaturalDischargesGrids',
                                                    id: prototype.id + '-mainContent'
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




