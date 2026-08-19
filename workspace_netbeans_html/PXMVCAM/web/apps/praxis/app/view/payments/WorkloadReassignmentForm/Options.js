Ext.define('Ext.Praxis.view.payments.WorkloadReassignmentForm.Options', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-options',
    border: false,
    layout: {
        type: 'hbox',
        pack: 'end'
    },
    items: [
        {
            xtype: 'panel',
            layout: 'hbox',
            id: prototype.id + '-pagi12',
            border: false,
            defaults: {
                style: 'padding: 4px; margin: 1px;'
            },
            items: [
                {
                    xtype: 'checkbox',
                    id: prototype.id + '-pagination',
                    boxLabel: 'Pagination?',
                    checked: true,
                    listeners: {
                        change: 'onPaginationChkChange'
                    }
                },
                {
                    xtype: 'Paginator',
                    id: prototype.id + '-pagginator-01',
                    hidden:true,
                    pagInfo: [
                        prototype.id + '-lbl-currentPage',
                        prototype.id + '-lbl-pageCount',
                        prototype.id + '-lbl-total'
                    ]
                }
            ]
        },
        {xtype: 'tbspacer', width: 20},
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
                            tooltip: 'Search'
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnback',
                            iconCls: 'prx-icon-back',
                            tooltip: 'Back',
                            hidden: true
                        },
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
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnuser',
                            iconCls: 'prx-icon-user',//'prx-icon-image-update',
                            tooltip: 'Agregar carga de trabajo a los Analistas',
                            hidden: true
                        }

                    ]
                }
            ]
        }
    ]
});
