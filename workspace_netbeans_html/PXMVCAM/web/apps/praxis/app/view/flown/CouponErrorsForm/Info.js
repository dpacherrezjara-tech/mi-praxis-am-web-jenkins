Ext.define('Ext.Praxis.view.flown.CouponErrorsForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    bodyStyle: 'background-color: #F4F7FD;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            margin: '15px 0 0 0px',
            id: prototype.id + '-boxConsultas',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false
            },
            border: false,
            autoScroll: true,
            items: [
                {
                    xtype: 'panel',
                    hidden: false,
                    border: false,
                    width: 1300,
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #F4F7FD;',
                    padding: '4',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.id + '-gridData',
                            margin: '15px 0 0 0px',
                            height: 490,
                            width: 712,
                            hidden: false,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Nbr', dataIndex: 'A2543TIP', width: 50,style: 'padding: 6px;background: #6A95AF; border-color:white !important'},
                                    {text: 'Process', dataIndex: 'A2543PROCESS', width: 130,style: 'padding: 6px;background: #6A95AF; border-color:white !important'},
                                    {text: 'Error Code', dataIndex: 'A2543COD', width: 100,style: 'padding: 6px;background: #6A95AF; border-color:white !important'},
                                    {text: 'Error Description', dataIndex: 'A2543DES', width: 430,style: 'padding: 6px;background: #6A95AF; border-color:white !important',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align: left;';
                                            return '<b>' + value + '</b>';
                                        },
                                    }
                                ]
                            }
                        },
                        {xtype: 'tbspacer', width: 10, height:20},
                    ]
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    hidden: false,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    width: 410,
                    height: 30,
                    margin: '18 0 0 0 ',
                    defaults: {
                        border: false
                    },
                    items: [
                        {
                            bodyStyle: 'background: #6A95AF; border-radius: 5px;',
                            xtype: 'panel',
                            id: prototype.id + '-panelPie',
                            width: '100%',
                            height: '100%',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults: {
                                xtype: 'label'
                            },
                             items: [
                                {
                                    text: 'Page',
                                    width: 50,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
                                },
                                {
                                    id: prototype.id + '-lbl-currentPage',
                                    text: '1',
                                    width: 50,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
                                },
                                {
                                    text: 'OF',
                                    width: 50,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
                                },
                                {
                                    id: prototype.id + '-lbl-pageCount',
                                    text: '0',
                                    width: 50,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
                                },
                                {xtype: 'tbspacer', width: 50},
                                {
                                    text: 'Total Found',
                                    width: 80,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
                                },
                                {
                                    id: prototype.id + '-lbl-total',
                                    text: '0',
                                    width: 40,
                                    style: 'margin-top: 7px;color:white;font-weight:bold'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
);

