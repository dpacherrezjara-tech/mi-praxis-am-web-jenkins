Ext.define('Ext.Praxis.view.salesaudit.MaintenanceAnalystsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '3 0',
    layout: 'column',
    
    items: [{
        xtype: 'panel',
        id: prototype.id + '-contFilter',
        margin: '0 7',
        border: false,
        width: 1800,
        bodyStyle: 'background: transparent',
        layout: 'vbox',
        defaults: { border: false },
        
        items: [
            // Primera línea
            {
                xtype: 'panel',
                width: '100%',
                layout: 'hbox',
                bodyStyle: 'background: transparent',
                defaults: { margin: '4 0' },
                
                items: [
                    {
                        xtype: 'combo',
                        id: prototype.id + '-cmbFecFiltro',
                        fieldLabel: 'Search By:',
                        labelAlign: 'right',
                        labelWidth: 65,
                        labelStyle: 'font-weight: bold;',
                        width: 210,
                        value: "CHGDATE",
                        queryMode: 'local',
                        valueField: 'code',
                        displayField: 'name',
                        allowBlank: false,
                        forceSelection: true,
                        listeners: { change: 'onCmbSearchChange' }
                    },
                    { xtype: 'tbspacer', width: 10 },
                    {
                        xtype: 'datefield',
                        id: prototype.id + '-txtFilterDateFrom',
                        fieldLabel: 'From',
                        format: 'Y/m/d',
                        maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                        labelWidth: 40,
                        labelAlign: 'right',
                        width: 130
                    },
                    { xtype: 'tbspacer', width: 5 },
                    {
                        xtype: 'datefield',
                        id: prototype.id + '-txtFilterDateTo',
                        fieldLabel: 'To',
                        format: 'Y/m/d',
                        maxValue: Ext.Date.format(new Date(), 'Y/m/d'),
                        labelWidth: 40,
                        labelAlign: 'right',
                        width: 130
                    },
                    { xtype: 'tbspacer', width: 5 },
                    {
                        xtype: 'combo',
                        id: prototype.id + '-txtUser',
                        fieldLabel: 'Auditor',
                        queryMode: 'local',
                        displayField: 'A4836USER',
                        valueField: 'A4836USER',
                        width: 200,
                        labelWidth: 50,
                        labelAlign: 'right',
                        listConfig: { minWidth: 200 }
                    },
                    { xtype: 'tbspacer', width: 5 },
                    {
                        xtype: 'textfield',
                        id: prototype.id + '-txtFuente',
                        fieldLabel: 'Fuente',
                        labelAlign: 'right',
                        width: 150,
                        labelWidth: 50
                    },
                    { xtype: 'tbspacer', width: 5 },
                    {
                        xtype: 'textfield',
                        id: prototype.id + '-txtCanal',
                        fieldLabel: 'Canal',
                        labelAlign: 'right',
                        width: 150,
                        labelWidth: 50
                    },
                    {
                        xtype: 'textfield',
                        id: prototype.id + '-txtFcmi',
                        fieldLabel: 'Fcmi',
                        labelAlign: 'right',
                        width: 120,
                        labelWidth: 50
                    },
                    { xtype: 'tbspacer', width: 5 },
                    {
                        xtype: 'textfield',
                        id: prototype.id + '-txtKey',
                        fieldLabel: 'Key',
                        labelAlign: 'right',
                        width: 150,
                        labelWidth: 50
                    },
                ]
            },
            {
                xtype: 'panel',
                width: '100%',
                layout: 'hbox',
                bodyStyle: 'background: transparent',
                defaults: { margin: '4 0' },
                
                items: [
                    
                    
                    { xtype: 'tbspacer', width: 5 },
                    {
                        xtype: 'textfield',
                        id: prototype.id + '-txtIata',
                        fieldLabel: 'Iata',
                        labelAlign: 'right',
                        width: 110,
                        labelWidth: 50
                    },
                    { xtype: 'tbspacer', width: 5 },
                    {
                        xtype: 'combo',
                        id: prototype.id + '-Cmbstatus',
                        fieldLabel: 'Status',
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'code',
                        width: 150,
                        labelWidth: 40,
                        listConfig: { minWidth: 300 }
                    }
                ]
            }
        ]
    }]
});