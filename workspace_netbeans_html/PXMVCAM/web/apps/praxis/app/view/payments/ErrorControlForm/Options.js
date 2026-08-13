Ext.define('Ext.Praxis.view.payments.ErrorControlForm.Options', {
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
            border: true,
            items: [
                {
                    xtype: 'toolbar',
                    items: [
                        {
                            xtype: 'radiogroup',
                            id: prototype.id + '-viewOption',
                            //fieldLabel: 'Opciones',
                            columns: 3, // Puedes ajustar el número de columnas según tus necesidades
                            vertical: false, // Esto alinea los botones verticalmente,
                            defaults: {
                                margin: '0 5 0 5' // Margen entre los botones
                            },
                            items: [
                                {boxLabel: '<b style="color:#148D28;">Load</b>', name: 'opcion', inputValue: 'L', checked: true, width: 100},
                                {boxLabel: '<b style="color:#148D28;">Format</b>', name: 'opcion', inputValue: 'F', width: 80}
                            ],
                            listeners: {
                                change: 'onChangeModule'
                            }
                        }
                    ]
                }
            ]
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
                            listeners:{
                                click:'onClickSearchBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnFilter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter',
                            listeners: {
                                click: 'onClickFilterBtn'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btnClear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
                            listeners: {
                                click: 'onClickClearBtn'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
