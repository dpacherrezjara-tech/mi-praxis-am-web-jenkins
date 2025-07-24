Ext.define('Ext.Praxis.view.flown.CouponErrorsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            margin: '8px 0 8px 10px',
            layout: 'column',
            defaults: {
                fieldStyle: 'text-align: center;',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right'
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Error Code',
                    hidden: false,
                    id: prototype.id + '-txtErrorCode',
                    editable: true,
                    readOnly: false,
                    enforceMaxLength: true,
                    maxLength: 6,
                    labelWidth: 65,
                    labelAlign: 'left',
                    width: 150
                }
            ]
        }
    ]
});

