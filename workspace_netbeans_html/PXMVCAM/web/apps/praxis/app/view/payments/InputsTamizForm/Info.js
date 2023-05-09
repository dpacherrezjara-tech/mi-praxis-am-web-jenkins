Ext.define('Ext.Praxis.view.payments.InputsTamizForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id + '-regionCenterForm01',
            xtype:'panel',
            width: 1400,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            items: []

        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            }
        }
    ]
}
);


