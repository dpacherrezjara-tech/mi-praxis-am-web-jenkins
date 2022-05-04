Ext.define('Ext.Praxis.view.payments.SalesReconciliAmexForm.DataEntrySettlement', {
    extend: 'Ext.window.Window',
    alias: 'widget.DataEntrySettlementSalesReconciliAmexForm',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliAmex.DataEntrySettlementSalesReconciliAmexController'
    ],
    controller: 'DataEntrySettlementSalesReconciliAmexController',
    title: 'Sales Reconciliation by Amex - Settlement Form',
    header: true,
//    height: 650,
    width: 840,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'form',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;"',
                    layout: 'vbox',
                    width: 930,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            text: 'General Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 8'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '0 2 0 20',
                            defaults: {
                                anchor: '100%',
                                width: 1080
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7, height: 24},
                                {
                                    xtype: 'label',
                                    text: 'Payment Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtPAYDATE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Processing Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtPRDA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'AX Number',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtAXPAYNBR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 5},
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '0 2 0 20',
                            items: [
                                {xtype: 'tbspacer', width: 7, height: 24},
                                {
                                    xtype: 'label',
                                    text: 'Merchant ID',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtMERCHID',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Sales Merchant ID',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSMERCHID',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Qty Tkts',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtQTYTKT',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 5},
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '0 2 0 20',
                            items: [
                                {xtype: 'tbspacer', width: 7, height: 24},
                                {
                                    xtype: 'label',
                                    text: 'ID Submission',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtIDITEMS',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'ID Transaction',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtIDITEMT',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 275},
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Error Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 280,
                            height: 20,
                            margin: '4 2 4 8'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '0 2 0 20',
                            bodyStyle: 'background:#efe5e5;',
                            items: [
                                {xtype: 'tbspacer', width: 7, height: 24},
                                {
                                    xtype: 'label',
                                    text: 'Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCERROR',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Description',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtDES_CERROR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 200,
                                },
                                {xtype: 'tbspacer', width: 170},
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '0 2 0 20',
                            bodyStyle: 'background:#efe5e5;',
                            items: [
                                {xtype: 'tbspacer', width: 7, height: 24},
                                {
                                    xtype: 'label',
                                    text: 'History',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCERRORHST',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    text: 'Flag Selection',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFLAG',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 200
                                },
                                {xtype: 'tbspacer', width: 170},
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Sales Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 8'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '0 2 0 20',
                            items: [
                                {xtype: 'tbspacer', width: 7, height: 24},
                                {
                                    xtype: 'label',
                                    text: 'Sales Date',
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtBSUMDATE',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;',
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'PNR',
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSPNR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'TICKET',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtISREFNBR',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    width: 100,
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '0 2 0 20',
                            bodyStyle: 'background:#efe5e5;',
                            items: [
                                {xtype: 'tbspacer', width: 7, height: 24},
                                {
                                    xtype: 'label',
                                    text: 'Transact. Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTRANSDATE',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Currency',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtPCURRENCY',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Transact. Amount',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtTGROSAMOUN',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '0 2 0 20',
                            bodyStyle: 'background:#efe5e5;',
                            items: [
                                {xtype: 'tbspacer', width: 7, height: 24},
                                {
                                    xtype: 'label',
                                    text: 'Card Account Nbr.',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSCARDN',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Approval Code',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSAUTHOC',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    text: 'Sales Amount',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSVFOPS',
                                    fieldStyle: 'text-align:right',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '0 2 0 20',
                            bodyStyle: 'background:#efe5e5;',
                            items: [
                                {xtype: 'tbspacer', width: 7, height: 24},
                                {
                                    xtype: 'label',
                                    text: 'Inst. Plan',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtNBRINSTA',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Inst. Number',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtINSTANBR',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    text: 'Status',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtSTVAL',
                                    fieldStyle: 'text-align:center',
                                    enforceMaxLength: true,
                                    readOnly: true,
                                    width: 100
                                }
                            ]
                        },
                        {xtype: 'tbspacer', height: 5},
                        {
                            xtype: 'label',
                            text: 'Accounting Information',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 8'
                        },
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background:#efe5e5;',
                            margin: '0 2 0 20',
                            items: [
                                {xtype: 'tbspacer', width: 7, height: 24},
                                {
                                    xtype: 'label',
                                    text: 'Status',
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtSTCONL',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    readOnly: true,
                                    fieldStyle: 'text-align:center;',
                                    width: 105,
                                },
                                {xtype: 'tbspacer', width: 35},
                                {
                                    xtype: 'label',
                                    text: 'Date',
                                    textAlign: 'center',
                                    paddingLeft: 3,
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtFCONTL',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:left;',
                                    readOnly: true,
                                    width: 100,
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'ID',
                                    textAlign: 'center',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-de-txtIDCONL',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    fieldStyle: 'text-align:center;',
                                    readOnly: true,
                                    width: 100,
                                }
                            ]
                        },
                        {
                            xtype: 'label',
                            text: 'Breakdown',
                            style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                            bodyStyle: 'background:#E5ECEF;',
                            fontSize: '11',
                            width: 234,
                            height: 20,
                            margin: '4 2 4 8'
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelDataInfoScan',
                            layout: 'vbox',
                            border: false,
                            width: 780,
                            height: 250,
                            hidden: false,
                            bodyStyle: 'background:#E5ECEF;',
                            margin: '10 2 12 20',
                            items: [
                                {
                                    xtype: 'grid',
                                    id: prototype.id + '-gridDataInfoScan',
                                    width: 780,
                                    height: 250,
//                                    hidden: false,
                                    columnLines: true,
                                    features: [{
                                            ftype: 'summary',
                                            dock:  'bottom'
                                        }],
                                    columns: {
                                        defaults: {
                                            menuDisabled: true,
                                            sortable: true,
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                text: 'Payment',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'DATE', width: 85,
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Sales',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'TRANSDATE', width: 85,
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Processing',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {
                                                        text: 'Date', dataIndex: 'AXPRODAT', width: 85,
                                                    }
                                                ]
                                            },
                                            {
                                                text: 'Status',
                                                defaults: {
                                                    menuDisabled: true,
                                                    sortable: false,
                                                    align: 'center'
                                                },
                                                columns: [
                                                    {text: 'Reconciliation<br>Settlement', dataIndex: 'desCERROR', width: 100,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            if (record.data.CERROR === '') {
                                                                metaData.style = "text-align:center;background-color:#C6E5B1;";
                                                            } else {
                                                                metaData.tdAttr = 'data-qtip="' + record.data.DES_CERROR + '"';
                                                                metaData.style = "text-align:center;background-color:#FF6F6F;";
                                                            }
                                                            return value;
                                                        }
                                                    },
                                                    {text: 'Settlement<br>vs Sales', dataIndex: 'descSTVAL', width: 90,
                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                            var data = record.data;
                                                            metaData.style = "text-align:center;";
                                                            metaData.tdAttr = 'data-qtip="' + data.descSTVAL + '"';
                                                            return value;
                                                        }
                                                    },
                                                ]
                                            },
                                            {text: 'PNR', dataIndex: 'SPNR', width: 80,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:center;";
//                                                            value = '<br>' + value + '<br>';
                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Ticket', dataIndex: 'ISREFNBR', width: 120,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    value = '<b>' + value + '</b>';
                                                    return '<a href="#payments-sales-reconcili-amex-form" style="color:#057ECB;text-decoration:underline;">' + value + '</a>';
                                                }
                                            },
                                            {text: 'Card Number', dataIndex: 'SCARDN', width: 140},
                                            {text: 'Auth.', dataIndex: 'SAUTHOC', width: 70},
                                            {
                                                text: 'Transaction <br> Amount', dataIndex: 'TGROSAMOUN', width: 100,
                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.style = "text-align:right;background-color:#B2DAFA";
                                                    value = Ext.util.Format.number(value, '0,000.00');
                                                    return value;
                                                },
                                                summaryRenderer: function (value, summaryData, dataIndex, metaData, record) {
                                                    var data = Ext.getCmp(prototype.id + '-gridDataInfoScan').getStore().getData().items[0].data;
                                                    metaData.style = 'text-align:right; margin-right:3px ';
                                                    return '<b>' + Ext.util.Format.number(data.totTGROSAMOUN, '0,000.00') + '<b>';
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                    ]
                },
                // <editor-fold defaultstate="collapsed" desc="ControlData">
                {
                    xtype: 'label',
                    text: 'Control Data',
                    fontSize: '11',
                    style: 'font-weight:bold;color:#0B333C;text-decoration-line: underline;',
                    width: 234,
                    margin: '8 2 4 8'
                },
                {
                    items: [
                        {
                            xtype: 'panel',
                            layout: 'hbox',
                            border: false,
                            margin: '8 2 4 20',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'Creator User ',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120,
                                    height: 20
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSCR',
                                    readOnly: true,
                                    width: 100,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Creation Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFECR',
                                    readOnly: true,
                                    width: 100,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Creation Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOCR',
                                    readOnly: true,
                                    width: 100,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            layout: 'hbox',
                            margin: '8 2 4 20',
                            defaults: {
                                labelAlign: 'left'
                            },
                            items: [
                                {xtype: 'tbspacer', width: 7},
                                {
                                    xtype: 'label',
                                    text: 'User Update',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtUSUP',
                                    readOnly: true,
                                    width: 100,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Update Date',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtFEUP',
                                    readOnly: true,
                                    width: 100,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                },
                                {xtype: 'tbspacer', width: 40},
                                {
                                    xtype: 'label',
                                    text: 'Update Time',
                                    style: 'font-weight:bold;color:#0B333C;',
                                    width: 120
                                },
                                {xtype: 'tbspacer', width: 10},
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtHOUP',
                                    readOnly: true,
                                    width: 100,
                                    listeners: {
                                        change: 'onUpperValue'
                                    }
                                }
                            ]
                        }
                    ]
                }
                // </editor-fold>
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            margin: '10 0 10 0',
            layout: {
                pack: 'center'
            },
            fieldStyle: 'text-align:center',
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-btn-save',
                    iconCls: 'prx-icon-save',
                    listeners: {
                        click: 'onSaveClick'
                    }
                },
                {
                    text: 'Update',
                    id: prototype.id + '-btn-update',
                    iconCls: 'prx-icon-update',
                    listeners: {
                        click: 'onUpdateClick'
                    }
                },
                {
                    text: 'Delete',
                    id: prototype.id + '-btn-delete',
                    iconCls: 'prx-icon-delete',
                    listeners: {
                        click: 'onDeleteClick'
                    }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-btn-cancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCancelClick'
                    }
                }
            ]
        }
    ]
}
);