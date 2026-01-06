Ext.define('Ext.Praxis.view.salesaudit.MaintenanceAnalystsForm.Options', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-options',
    border: false,
    layout: { type: 'hbox', pack: 'end' },

    items: [
        {
            xtype: 'panel',
            id: prototype.id + '-pagi12',
            layout: 'hbox',
            border: false,
            defaults: { style: 'padding: 4px; margin: 1px;' },

            items: [
                {
                    xtype: 'checkbox',
                    id: prototype.id + '-pagination',
                    boxLabel: 'Pagination?',
                    checked: true,
                    listeners: { change: 'onPaginationChkChange' }
                },
                {
                    xtype: 'Paginator',
                    id: prototype.id + '-pagginator-01',
                    pagInfo: [
                        prototype.id + '-lbl-currentPage',
                        prototype.id + '-lbl-pageCount',
                        prototype.id + '-lbl-total'
                    ]
                }
            ]
        },
        { xtype: 'tbspacer', width: 20 },
        {
            xtype: 'toolbar',
            border: true,

            items: [
                {
                    xtype: 'button',
                    id: prototype.id + '-btnSearch',
                    iconCls: 'prx-icon-search',
                    tooltip: 'Search'
                },
                {
                    xtype: 'button',
                    id: prototype.id + '-btnAdd',
                    iconCls: 'prx-icon-add',
                    tooltip: 'New'
                },
                // {
                //     xtype: 'button',
                //     id: prototype.id + '-btnFilter',
                //     iconCls: 'prx-icon-filter',
                //     tooltip: 'Display filter'
                // },
                {
                    xtype: 'button',
                    id: prototype.id + '-btnExcel',
                    iconCls: 'prx-icon-excel',
                    tooltip: 'Export to Excel'
                },
                {
                    xtype: 'button',
                    id: prototype.id + '-btnClear',
                    iconCls: 'prx-icon-clear',
                    tooltip: 'Clear Options'
                }
            ]
        }
    ]
});
