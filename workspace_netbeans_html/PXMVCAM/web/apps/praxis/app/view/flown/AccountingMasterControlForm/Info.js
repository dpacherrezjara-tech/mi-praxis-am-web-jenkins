/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.AccountingMasterControlForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    style: 'margin: 1px;',
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1030,
                height: 530,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData',
                    height: 520,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Nbr', width: 50, dataIndex: 'RN'},
                            {text: 'ID Process', width: 80, dataIndex: 'A4492ID'},
                            {text: 'Module', width: 100, dataIndex: 'A4492MODUL'},
                            {text: 'Proc. Date', width: 100, dataIndex: 'A4492FPROC'},
                            {text: 'Cont. Date', width: 100, dataIndex: 'A4492FCONT'},
                            {text: 'Program', width: 200, dataIndex: 'A4492PROG'},
                            {text: 'Description', width: 100, dataIndex: 'A4492DESC'},
                            {text: 'Creator User', width: 100, dataIndex: 'A4492UREGI'},
                            {text: 'Creation Date', width: 100, dataIndex: 'A4492FREGI'},
                            {text: 'Creation Time', width: 100, dataIndex: 'A4492HREGI'}

                        ]
                    }
                }
                ,
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true,
                        padding: '0px 0px 0px 0px'
                    },
                    padding: '1px 0px 1px 0px',
                    items: [
                        {
                            xtype: 'panel',
                            width: 790,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults: {
                                xtype: 'label',
                                margin: '3px 0px 0px 5px'
                            },
                            items: [
                                {
                                    text: 'Page',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-currentPage',
                                    text: '1',
                                    width: 50
                                },
                                {
                                    text: 'Of',
                                    width: 50
                                },
                                {
                                    id: prototype.id + '-lbl-pageCount',
                                    text: '0',
                                    width: 50
                                },
                                {xtype: 'tbspacer', width: 100},
                                {
                                    text: 'Total found',
                                    width: 80
                                },
                                {
                                    id: prototype.id + '-lbl-total',
                                    text: '0',
                                    width: 50
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
}
);

