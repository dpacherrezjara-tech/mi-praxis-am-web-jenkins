Ext.define('Ext.Praxis.view.salesaudit.WaiverForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAEF;',
    padding: '4px 0px 4px 0px',
    layout: 'hbox',
    items: [
        {
            xtype: 'form',
            id: prototype.id + '-formFilters',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '0px 5px 1px 0px',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '6px 4px 6px 4px',
                labelAlign: 'right'
            },
            items: [
                {
                    xtype: 'textfield',
                    id: prototype.id + '-Ccust',
                    name: 'IN_CCUST',
                    value: '139',
                    hidden: true
                },
                {
                    xtype: 'textfield',
                    name: 'IN_NCASO',
                    fieldLabel: 'Case',
                    labelWidth: 40,
                    width: 140,
                    maxLength: 10,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    listeners: { specialkey: 'onEnterKeyPress' }
                },
                {
                    xtype: 'textfield',
                    name: 'IN_TKT',
                    fieldLabel: 'Ticket',
                    labelWidth: 45,
                    width: 170,
                    maxLength: 13,
                    maskRe: /[0-9]/,
                    enforceMaxLength: true,
                    listeners: { specialkey: 'onEnterKeyPress' }
                },
                {
                    xtype: 'textfield',
                    name: 'IN_CODIT',
                    fieldLabel: 'IT Code',
                    labelWidth: 75,
                    width: 180,
                    maxLength: 15,
                    maskRe: /[a-zA-Z0-9]/,
                    enforceMaxLength: true,
                    listeners: { specialkey: 'onEnterKeyPress' }
                },
                {
                    xtype: 'textfield',
                    name: 'IN_PNR',
                    fieldLabel: 'PNR',
                    labelWidth: 35,
                    width: 110,
                    maxLength: 6,
                    maskRe: /[a-zA-Z0-9]/,
                    enforceMaxLength: true,
                    listeners: { specialkey: 'onEnterKeyPress' }
                },
                {
                    xtype: 'datefield',
                    name: 'IN_FROM',
                    fieldLabel: 'From',
                    format: 'Ymd',
                    labelWidth: 70,
                    width: 155,
                    value: new Date(anioActual, mesActual, 1),
                    listeners: { specialkey: 'onEnterKeyPress' }
                },
                {
                    xtype: 'datefield',
                    name: 'IN_TO',
                    fieldLabel: 'To',
                    format: 'Ymd',
                    labelWidth: 25,
                    width: 130,
                    value: new Date(),
                    listeners: { specialkey: 'onEnterKeyPress' }
                }
            ]
        }
    ]
});
