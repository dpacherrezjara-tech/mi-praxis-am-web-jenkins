
prototype.idDE3 = prototype.id + '-RobotdisputeMyarcLog';

Ext.define('Ext.Praxis.view.salesaudit.RobotdisputeMyarcForm.RobotdisputeMyarcLog', {
    extend: 'Ext.window.Window',
    alias: 'widget.RobotdisputeMyarcLog',
    requires: [
        'Ext.Praxis.controller.salesaudit.RobotdisputeMyarcForm.RobotdisputeMyarcLogController'
    ],
    controller: 'RobotdisputeMyarcLogController',
    title: 'Sent Debit History',
    header: true,
    width: 900,
    height: 400,
    resizable: false,
    layout: 'vbox',
    modal: true,
    border: false,
    bodyStyle: 'background: #ffffff;',
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'panel',
            layout: 'fit',
            width: '100%',
            height: '100%',
            items: [
                {
                    xtype: 'grid',
                    margin: '5 0 5 0',
                    minHeight: 100,
                    viewConfig: {
                        stripeRows: false,
                        enableTextSelection: true,
                        markDirty: true
                    },
                    columnLines: true,
                    id: prototype.idDE3 + '-gridRobotdisputeMyarcLog',
                    scrollable: true,
                    flex: 1,
                    columns: {
                        defaults: {
                            align: 'center',
                            menuDisabled: true,
                            sortable: true
                        },
                        items: [
                            {text: 'RN', dataIndex: 'RN', xtype: 'rownumberer', width: 40},
                            {text: 'Memo Number', dataIndex: 'A4137NMEMO', align: 'center', width: 100, sortable: false},
                            {text: 'Area', dataIndex: 'A4137AREA', align: 'left', width: 120, sortable: false},
                            {text: 'Origin', dataIndex: 'A4137ORIGEN', align: 'center', width: 100, sortable: false},
                            {text: 'Process', dataIndex: 'A4137BASE', align: 'left', width: 120, sortable: false},
                            {text: 'Status', dataIndex: 'A4137FLAG', width: 260, align: 'right'},
                            {text: 'System <br> Date', dataIndex: 'A4137FREGI', align: 'center', width: 70, sortable: false},
                            {text: 'Hour', dataIndex: 'A4137HREGI', width: 60}
                        ]
                    }, tbar: {
                        layout: {
                            pack: 'end'
                        },
                        defaults: {
                            scale: 'medium'
                        },
                        items: [
                            {
                                xtype: 'button',
                                iconCls: 'prx-icon-excel',
                                scale: 'small',
                                tooltip: 'Export to Excel',
                                listeners: {
                                    click: 'downloadexcelMainLog'
                                }
                            }
                        ]
                    }
                }
            ]
        }
    ]
});