Ext.define('Ext.Praxis.view.payments.EMDTrackingForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '2px 5px 1px 5px',
            layout: 'column',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
//                hidden: true,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true
            },
            items: [
                {
                    xtype: 'label',
                    html: '<strong style="color:#000;">Sale Date</strong>',
                    align: 'left',
                    fieldStyle: 'text-align: left;',
                    padding: '8px 5px 0px 15px',
                    hidden: false
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromYear',
                    fieldLabel: 'From',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 60,
                    width: 140,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateFromMonth',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToYear',
                    fieldLabel: 'To',
                    labelAlign: 'right',
                    queryMode: 'local',
                    editable: false,
                    triggerAction: 'all',
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 60,
                    width: 150,
                    anchor: '100%'
                },
                {
                    xtype: 'combo',
                    id: prototype.id + '-cmbDateToMonth',
                    labelAlign: 'right',
                    queryMode: 'local',
                    triggerAction: 'all',
                    editable: false,
                    autoSelect: false,
                    enableKeyEvents: true,
                    caseSensitive: true,
                    hidden: false,
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    width: 70,
                    anchor: '100%'
                },
//                {xtype: 'tbspacer', width: 20},
                {
                    xtype: 'textfield',
                    fieldLabel: 'Ticket:',
                    id: prototype.id + '-txtTICKET',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true,
                    maskRe: /[0-9]/,
                    maxLength: 15,
                    labelWidth: 60,
                    width: 180,
                    enableKeyEvents: true,
                    listeners: {
                        keypress: 'filterTicketEMD'
                    }
                },
                {xtype: 'tbspacer', width: 20},
                {
                    xtype: 'checkboxfield',
                    id: prototype.id + '-chkLog',
                    width: 50,
                    boxLabel: 'Log',
                    inputValue: '0',
                    checked: false,
                    listeners: {
                        change: 'btnSearch_click'
                    }
                }
            ]
        }
    ]
});



