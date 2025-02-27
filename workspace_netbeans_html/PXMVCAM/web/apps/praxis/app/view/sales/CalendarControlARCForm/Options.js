Ext.define('Ext.Praxis.view.sales.CalendarControlARCForm.Options', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-options',
    border: false,
    layout: {
        type: 'hbox',
        pack: 'end'
    },
    items: [
        {
            xtype: 'radiogroup',
            id: prototype.id + '-calendarVersion-1',
            columns: 2, // Muestra los radios en columna
            vertical: false,
            border: false,
            padding: 5,
            width: 200,
            items: [
                {boxLabel: '<span style="color: green; font-weight: bold;">New</span>', name: 'opcion', inputValue: 'ARC2', checked: true},
                {boxLabel: '<span style="color: green; font-weight: bold;">Old</span>', name: 'opcion', inputValue: 'ARC'}
            ],
            listeners: {
                change: 'onChangeVersion'
            }
        },
        {
            xtype: 'panel',
            border: true,
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnSearch',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search',
                            listeners: {
                                click: 'btnSearch_click'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnFilter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter',
                            listeners: {
                                click: 'btnFilter_click'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnExcel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel',
                            listeners: {
                                click: 'btnExcel_click'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
                            listeners: {
                                click: 'btnClear_click'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnBack',
                            iconCls: 'prx-icon-back',
                            tooltip: 'Back',
                            listeners: {
                                click: 'btnBack_click'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});