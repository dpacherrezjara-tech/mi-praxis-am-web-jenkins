/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Ext.Praxis.view.salesaudit.WaiverForm.Info', {
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
            id: prototype.id + '-regionCenterGrid01',
            //width: 1550,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    padding: '1',
                    margin: '1',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        // --------------------------   GRID MAIN DATA---------------------
                        //-----------------------------------------------------------------
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelGridData',
                            bodyStyle: 'background-color: #E3EAEF;',
                            padding: '1',
                            margin: '1',
                            //width: 100,    
                            layout: {
                                type: 'vbox',
                                align: 'center'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    id: prototype.id + '-labelTitle1',
                                    labelAlign: 'center',
                                    labelStyle: 'color:#231223',
                                    align: 'center',
                                    margin: '10 0 0 0',
                                    hide: true
                                },
                                {
                                    xtype: 'grid',
                                    padding: '10 0 0 0',
                                    id: prototype.id + '-gridData',
                                    bodyStyle: 'background-color: #E3EAEF;',
                                    height: 550,
                                    width: 1300,
                                    columnLines: true,
                                    resizable: false,
                                    viewConfig: {
                                        enableTextSelection: true
                                    },
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            resizable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'File', width: 75, dataIndex: 'A2537RUTAA',
                                                renderer: function (value, metaData) {
                                                    metaData.style = 'color:#008FE3;text-align:center;text-decoration:underline;';
                                                    return '<a href="#salesaudit-waiver-form" style="color:#008FE3;">Download</a>';
                                                },
                                                listeners: {
                                                    click: 'onDownloadFile'
                                                }
                                            },
                                            { text: 'Case', width: 90, dataIndex: 'A2537NCASO' },
                                            {
                                                text: 'Case Type', width: 200, dataIndex: 'A2537TCASO',
                                                renderer: function (value, metaData) {
                                                    metaData.style = 'text-align:left';
                                                    if (value && value.trim().length > 0) {
                                                        metaData.tdAttr = 'data-qtip="' + value.trim() + '"';
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Status', width: 120, dataIndex: 'A2537ESTAD',
                                                renderer: function (value, metaData) {
                                                    metaData.style = 'text-align:left';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Name', width: 250, dataIndex: 'A2537PCASO',
                                                renderer: function (value, metaData) {
                                                    metaData.style = 'text-align:left';
                                                    if (value && value.trim().length > 0) {
                                                        metaData.tdAttr = 'data-qtip="' + value.trim() + '"';
                                                    }
                                                    return value;
                                                }
                                            },
                                            { text: 'Close<br>Date', width: 75, dataIndex: 'A2537FCRRE' },
                                            { text: 'Expiry<br>Date', width: 75, dataIndex: 'A2537FVETO' },
                                            { text: 'PNR', width: 75, dataIndex: 'A2537PNR' },
                                            {
                                                text: 'Ticket',
                                                width: 220,
                                                dataIndex: 'A2537TKTS',
                                                renderer: function (value, metaData) {
                                                    if (!value) return '';
                                                    metaData.style = 'cursor:pointer; color:#1a56db; text-decoration:underline;';
                                                    var unique = value.trim().split(' ').filter(function (v, i, a) {
                                                        return v !== '' && a.indexOf(v) === i;
                                                    }).join(' ');
                                                    return unique;
                                                },
                                                listeners: {
                                                    click: 'onTicketClick'
                                                }
                                            },
                                            { text: 'Reservation', width: 110, dataIndex: 'A2537CODIT' },
                                            {
                                                text: 'Itinerary', width: 250, dataIndex: 'A2537ITIN',
                                                renderer: function (value, metaData) {
                                                    metaData.style = 'text-align:left';
                                                    if (value && value.trim().length > 0) {
                                                        metaData.tdAttr = 'data-qtip="' + value.trim() + '"';
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Agency', width: 250, dataIndex: 'A2537AGENE',
                                                renderer: function (value, metaData) {
                                                    metaData.style = 'text-align:left';
                                                    if (value && value.trim().length > 0) {
                                                        metaData.tdAttr = 'data-qtip="' + value.trim() + '"';
                                                    }
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Concept', width: 200, dataIndex: 'A2537CCPTO',
                                                renderer: function (value, metaData) {
                                                    metaData.style = 'text-align:left';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Sub Concept', width: 200, dataIndex: 'A2537SCPTO',
                                                renderer: function (value, metaData) {
                                                    metaData.style = 'text-align:left';
                                                    return value;
                                                }
                                            },
                                            { text: 'Curr', width: 50, dataIndex: 'A2537CURRW' },
                                            {
                                                text: 'Amount', width: 65, dataIndex: 'A2537AMOUW',
                                                renderer: function (value, metaData) {
                                                    metaData.style = 'text-align:right';
                                                    return value ? value.trim() : '';
                                                }
                                            },
                                            {
                                                text: 'Description', width: 200, dataIndex: 'A2537DESCR',
                                                renderer: function (value, metaData) {
                                                    metaData.style = 'text-align:left';
                                                    if (value && value.trim().length > 0) {
                                                        metaData.tdAttr = 'data-qtip="' + value.trim() + '"';
                                                    }
                                                    return value;
                                                }
                                            },
                                            { text: 'Seq', width: 100, dataIndex: 'A2537SEQ' },
                                            { text: 'Close<br>Time', width: 75, dataIndex: 'A2537HCRRE' },
                                            { text: 'Expiry<br>Time', width: 75, dataIndex: 'A2537HVETO' },
                                            {
                                                text: 'Flight No', width: 180, dataIndex: 'A2537NVLO',
                                                renderer: function (value, metaData) {
                                                    metaData.style = 'text-align:left';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Flight Date', width: 200, dataIndex: 'A2537FVLO',
                                                renderer: function (value, metaData) {
                                                    metaData.style = 'text-align:left';
                                                    return value;
                                                }
                                            },
                                            {
                                                text: 'Flight Time', width: 150, dataIndex: 'A2537HVLO',
                                                renderer: function (value, metaData) {
                                                    metaData.style = 'text-align:left';
                                                    return value;
                                                }
                                            },
                                            { text: 'IATA', width: 80, dataIndex: 'A2537IATAE' },
                                            {
                                                text: 'Executive', width: 250, dataIndex: 'A2537EJECB',
                                                renderer: function (value, metaData) {
                                                    metaData.style = 'text-align:left';
                                                    if (value && value.trim().length > 0) {
                                                        metaData.tdAttr = 'data-qtip="' + value.trim() + '"';
                                                    }
                                                    return value;
                                                }
                                            },
                                            { text: 'Pax', width: 50, dataIndex: 'A2537NPAX' },
                                            { text: 'Entered<br>By', width: 100, dataIndex: 'A2537INGRE' },
                                            { text: 'Entry<br>Date', width: 90, dataIndex: 'A2537FINGR' },
                                            { text: 'Entry<br>Time', width: 80, dataIndex: 'A2537HINGR' },
                                            // { text: 'Modified<br>By', width: 100, dataIndex: 'A2537MODIF' },
                                            // { text: 'Modify<br>Date', width: 90, dataIndex: 'A2537FMODI' },
                                            // { text: 'Modify<br>Time', width: 80, dataIndex: 'A2537HMODI' },
                                            // {
                                            //     xtype: 'actioncolumn',
                                            //     text: 'Edit',
                                            //     width: 40,
                                            //     sortable: false,
                                            //     resizable: false,
                                            //     align: 'center',
                                            //     items: [{
                                            //         iconCls: 'prx-icon-edit',
                                            //         tooltip: 'Edit',
                                            //         handler: 'onEditWaiverClick'
                                            //     }]
                                            // }
                                        ]
                                    }
                                }

                            ]
                        }

                    ]
                },
                /** PAGINATION LABELS*/
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
                        padding: '0px 1px 0px 1px'
                    },
                    padding: '1px 1px 1px 1px',
                    items: [
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelPie',
                            width: 1300,
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
                                { xtype: 'tbspacer', width: 100 },
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

