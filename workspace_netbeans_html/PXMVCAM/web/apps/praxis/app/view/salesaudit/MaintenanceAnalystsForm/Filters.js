Ext.define('Ext.Praxis.view.salesaudit.MaintenanceAnalystsForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '3 0',
    layout: 'column',

    items: [{
        xtype: 'panel',
        // id: prototype.id + '-contFilter',
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
                id: prototype.id + '-panelFilters',
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
                        id: prototype.id + '-cmbFuente',
                        fieldLabel: 'Fuente',
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'code',
                        width: 200,
                        labelWidth: 50,
                        labelAlign: 'right',
                        listConfig: { minWidth: 200 }
                    },
                    { xtype: 'tbspacer', width: 5 },
                    {
                        xtype: 'combo',
                        id: prototype.id + '-cmbUser',
                        fieldLabel: 'Auditor',
                        queryMode: 'local',
                        displayField: 'A4886USER',
                        valueField: 'A4886USER',
                        width: 200,
                        labelWidth: 50,
                        labelAlign: 'right',
                        editable: false,
                        forceSelection: true,
                        store: {
                            fields: ['A4886USER'],
                            data: []
                        },
                        listConfig: { minWidth: 200 }
                    },


                    { xtype: 'tbspacer', width: 5 },
                    {
                        xtype: 'combo',
                        id: prototype.id + '-cmbStatus',
                        fieldLabel: 'Status',
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'code',
                        width: 200,
                        labelWidth: 50,
                        labelAlign: 'right',
                        listConfig: { minWidth: 200 }
                    },



                ]
            },

        ]
    }]
});