prototype.idCcardf = prototype.id + '-CreditCardFilterDataEntry';
Ext.define('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.CreditCardFilterDataEntry', {
    extend: 'Ext.window.Window',
    alias: 'widget.CreditCardFilterDataEntry',
    requires: [
        'Ext.Praxis.controller.payments.SalesReconciliationControl.CreditCardFilterDataEntryController'
    ],
    controller: 'CreditCardFilterDataEntryController',
    title: 'Credit Card Filter - Form',
    header: true,
    width: 1025,
    resizable: true,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    scrollable: true,
    items: [
        {
            xtype: 'panel',
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            anchor: '100%',
            items: [
                //<editor-fold defaultstate="collapsed" desc="Filtros">
                {
                    xtype: 'form',
                    layout: 'hbox',
                    id: prototype.idCcardf + '-formFilters',
                    border: true,
                    defaults: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align: center;',
                        padding: '5 1 5 1',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        hidden: false
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Search By',
                            name: 'IN_DATE',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['PRDA', 'Processing Date']
                                ]
                            }),
                            labelWidth: 80,
                            width: 230,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            readOnly: true,
                            value: 'PRDA'
                        },
                        {
                            xtype: 'datefield',
                            name: 'IN_FROM',
                            fieldLabel: 'From',
                            format: 'Ymd',
                            editable: false, // Deshabilita la edición del campo
                            labelWidth: 50,
                            width: 150,
                            value: new Date(),
                            validator: 'validaFecha',
                            listeners: {
                                change: 'onChangeDate'
                            },
                            id: prototype.idCcardf + '-datefieldFrom'
                        },
                        {
                            xtype: 'datefield',
                            name: 'IN_TO',
                            fieldLabel: 'To',
                            format: 'Ymd',
                            altFormats: 'm',
                            editable: false, // Deshabilita la edición del campo
                            labelWidth: 30,
                            width: 130,
                            value: new Date(),
                            validator: 'validaFecha',
                            listeners: {
                                change: 'onChangeDate'
                            },
                            id: prototype.idCcardf + '-datefieldTo'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Card Number',
                            labelWidth: 80,
                            width: 150,
                            name: 'creditcard',
                            maxLength: 6, // Límite máximo de caracteres
                            maskRe: /[0-9]/, // Expresión regular para permitir solo números
                            enforceMaxLength: true // Aplicar la longitud máxima de caracteres
                        },
                        {
                            xtype: 'label',
                            text: '*****(*)'
                        },
                        {
                            xtype: 'textfield',
                            name: 'creditcard',
                            width: 50,
                            maxLength: 4, // Límite máximo de caracteres
                            maskRe: /[0-9]/, // Expresión regular para permitir solo números
                            enforceMaxLength: true, // Aplicar la longitud máxima de caracteres
                            listeners: {
                                specialkey: 'onEnterKeyPress'
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Status',
                            name: 'IN_STVAL',
                            store: Ext.create('Ext.data.SimpleStore', {
                                fields: ['code', 'name'],
                                data: [
                                    ['', 'All'],
//                                    ['A', 'Match OC/Camepa'],
                                    ['C', 'Match Complement'],
//                                    ['D', 'Match Balance'],
                                    ['E', 'Duplicate Payment'],
                                    ['M', 'Match Multi-Payment'],
                                    ['0', 'Stand By'],
                                    ['1', 'Match'],
                                    ['3', 'Settl. Without Sales'],
                                    ['4', 'Match Partial'],
                                    ['5', 'Match Manual'],
//                                    ['6', 'Match Forced'],
//                                    ['7', 'Match Compensation'],
                                    ['8', 'Match Transactional'],
                                    ['9', 'Match Void'],
                                ]
                            }),
                            labelWidth: 55,
                            width: 180,
                            displayField: 'name',
                            valueField: 'code',
                            queryMode: 'local',
                            editable: false,
                            value: ''
                        },
                        {
                            xtype: 'button',
                            id: prototype.idCcardf + '-btnSearch',
                            height: 25,
                            width: 25,
                            margin: '4 4 4 7',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search',
                            listeners: {
                                click: 'onClickSearchBtn'
                            }
                        }
                    ]
                },
                //</editor-fold>
                {
                    xtype: 'panel',
                    width: '100%',
                    layout: 'hbox',
                    border: false,
                    items: [
                        {
                            xtype: 'grid',
                            id: prototype.idCcardf + '-gridSummary',
                            columnLines: true,
                            autoScroll: true,
                            minHeight: 400,
                            flex: 1,
                            maxHeight: 530,
                            margin: '5 5 5 5',
                            viewConfig: {
                                stripeRows: true,
                                enableTextSelection: true,
                                markDirty: false
                            },
                            columns: {
                                defaults: {
                                    align: 'center',
                                    menuDisabled: true,
                                    sortable: true
                                },
                                items: [
                                    {
                                        text: 'RN',
                                        xtype: 'rownumberer', // Columna de número de fila
                                        width: 40 // Ancho de la columna de número de fila (ajusta según tus necesidades)
                                    },
                                    {text: 'Processing<br>Date', dataIndex: 'prda', width: 80},
                                    {text: 'Processor', dataIndex: 'desc_PROCTYPE', flex: 1},
                                    {text: 'Country', dataIndex: 'scountry', width: 70},
                                    {text: 'Card Number', dataIndex: 'scardn', width: 170},
                                    {
                                        text: 'Qty<br>Sale', dataIndex: 'qty_SALE', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                                            metaData.style = "text-align:center;text-decoration:underline;cursor:pointer;";
                                            metaData.style += "font-weight:bolder;color:#057ECB;";
                                            return value;
                                        },
                                        listeners: {
                                            click: 'onSearchTranstypeCC'
                                        }
                                    },
                                    {
                                        text: 'Qty<br>Refund', dataIndex: 'qty_RFND', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                                            metaData.style = "text-align:center;text-decoration:underline;cursor:pointer;";
                                            metaData.style += "font-weight:bolder;color:#057ECB;";
                                            return value;
                                        },
                                        listeners: {
                                            click: 'onSearchTranstypeCC'
                                        }
                                    },
                                    {
                                        text: 'Qty<br>Chargeback', dataIndex: 'qty_CHBK', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                                            metaData.style = "text-align:center;text-decoration:underline;cursor:pointer;";
                                            metaData.style += "font-weight:bolder;color:#057ECB;";
                                            return value;
                                        },
                                        listeners: {
                                            click: 'onSearchTranstypeCC'
                                        }
                                    },
                                    {
                                        text: 'Qty<br>Adjustment', dataIndex: 'qty_ADJU', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                                            metaData.style = "text-align:center;text-decoration:underline;cursor:pointer;";
                                            metaData.style += "font-weight:bolder;color:#057ECB;";
                                            return value;
                                        },
                                        listeners: {
                                            click: 'onSearchTranstypeCC'
                                        }
                                    },
                                    {
                                        text: 'Qty<br>Void', dataIndex: 'qty_VOID', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                                            metaData.style = "text-align:center;text-decoration:underline;cursor:pointer;";
                                            metaData.style += "font-weight:bolder;color:#057ECB;";
                                            return value;
                                        },
                                        listeners: {
                                            click: 'onSearchVoidCC'
                                        }
                                    },
                                    {
                                        text: 'Qty', dataIndex: 'qty', width: 80,
                                        renderer: function (value, metaData, record, rowIndex, colIndex) {
                                            const obj = record.data;
                                            metaData.tdAttr = 'data-qtip="' +
                                                    'MATCH: ' + obj.qty_MATCH + '<br>' +
                                                    'PENDING: ' + obj.qty_PENDING
                                                    + '"';
                                            metaData.style = "text-align:center;text-decoration:underline;cursor:pointer;";
                                            metaData.style += "font-weight:bolder;color:#057ECB;background-color:#C0EDB3;";
                                            return `<b>${value}</b>`;
                                        },
                                        listeners: {
                                            click: 'onSearchCreditCard'
                                        }
                                    }
                                ]
                            },
                            bbar: {
                                xtype: 'pagingtoolbar',
                                displayInfo: true
                            }
                        }
                    ]
                }
            ]
        }
    ]
});