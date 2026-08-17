Ext.define('Ext.Praxis.view.salesaudit.DynamicFaresForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'vbox',
    items: [
        {
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: transparent',
            height: 'auto',
            width: '100%',
            margin: '0 0 0 0 ',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                margin: '4 4 4 4',
                bodyStyle: 'background: transparent'
            },
            items: [
                {
                    xtype: 'form',
                    border: false,
                    id: prototype.id + '-formFilters',
                    width: '100%',
                    bodyStyle: 'background: transparent',
                    layout: {
                        type: 'vbox',
                        pack: 'center'
                    },

                    defaults: {
                        xtype: 'panel',
                        margin: '2 2 2 2',
                        border: false,
                        width: '100%',
                        layout: 'hbox',
                        padding: 3,
                        bodyStyle: 'background: transparent',
                        defaults: {
                            fieldStyle: 'text-align: center;',
                            hiddenLabel: false,
                            labelAlign: 'right'
                        }
                    },
                    items: [
                        {
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'IN_CCUST',
                                    value: '139',
                                    hidden: true
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'From',
                                    name: 'IN_PRDA_FROM',
                                    format: 'Ymd',
                                    labelWidth: 50,
                                    width: 150,
                                    value: new Date()
                                },
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'To',
                                    name: 'IN_PRDA_TO',
                                    format: 'Ymd',
                                    labelWidth: 30,
                                    width: 130,
                                    value: new Date()
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'IN_TICKET',
                                    fieldLabel: 'Ticket',
                                    labelWidth: 60,
                                    width: 180,
                                    enforceMaxLength: true,
                                    maxLength: 13,
                                    maskRe: /^[0-9]$/
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'IN_DPID',
                                    fieldLabel: 'DP ID',
                                    labelWidth: 60,
                                    width: 250,
                                    enforceMaxLength: true,
                                    maxLength: 25
                                }
                            ]
                        }
                    ]
                }

            ]
        }
    ]
});
