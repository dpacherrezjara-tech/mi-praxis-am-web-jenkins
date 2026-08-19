Ext.define('Ext.Praxis.view.salesaudit.ADMManualForm.AccountingCTA', {
    extend: 'Ext.window.Window',
    alias: 'widget.AccountingCTA',
    controller: 'AccountingCTAController',
    requires: [
        'Ext.Praxis.controller.salesaudit.ADMManualForm.AccountingCTAController'
    ],
    id: prototype.idAccountingCTA + '-viewAccountingCTA',
    title: 'ACCOUNTING CTA',
    header: true,
    height: 500,
    width: 1080,
    border: false,
    resizable: false,
    layout: 'fit',
    modal: true,
    defaults: {
        border: false
    },
    items: [
        {
            /*PANTALLA - 1ERA FILA*/
            xtype: 'form',
            border: false,
            layout: 'column',
            defaults: {
                padding: '5px 1px 5px 1px',
                anchor: '100%',
                hiddenLabel: false,
                labelAlign: 'right',
                xtype: 'textfield',
                hidden: false,
                selectOnFocus: true,
                enableKeyEvents: true,
                enforceMaxLength: true},
            items: [
                /*PANTALLA - ACCOUNTING MASTER 1ERA FILA*/
                {//cmb Type CTA  ** TODOS
                    xtype: 'combo',
                    fieldLabel: 'Type CTA',
                    id: prototype.idAccountingCTA + '-cmbTypeCta',
                    labelAlign: 'center',
                    queryMode: 'local',
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'SELECT', hidden: false,
                    labelWidth: 55,
                    labelClsExtra: 'prx-label-search',
                    width: 230,
                    padding: '5px 0px 0px 10px',
                    editable: false,
                    listConfig: {
                        minWidth: 200
                    },
                    listeners: {
                        afterrender: 'onCmbhAfterRender',
                        change: 'onCmbSearchChange'
                    }
                },
                //AMS
                {//AMS - lbl Document Type
                    xtype: 'label',
                    id: prototype.idAccountingCTA + '-lblDocumentType',
                    html: 'Document Type:', hidden: true,
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 6px 8px 10px'
                },
                {//AMS - txt Document Type
                    xtype: 'textfield',
                    id: prototype.idAccountingCTA + '-txtDocumentType',
                    fieldStyle: 'text-align:center', hidden: true,
                    enforceMaxLength: true,
                    maxLength: 4,
                    width: 40,
                    listeners: {
                        change: 'onUpperValue'
                    }
                },
                {//AMS - cmb Account Type
                    xtype: 'combo',
                    fieldLabel: 'Account Type:',
                    id: prototype.idAccountingCTA + '-cmbCtaType',
                    labelAlign: 'center', hidden: true,
                    queryMode: 'local',
                    valueField: 'code',
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 80,
                    labelClsExtra: 'prx-label-search',
                    width: 170,
                    padding: '5px 0px 0px 10px',
                    editable: false,
                    listConfig: {
                        minWidth: 200
                    },
                    listeners: {
                        afterrender: 'onCmbhAfterRender',
                        change: 'onCmbChange'
                    }
                },
                {//AMS - lbl Sub Type
                    xtype: 'label',
                    id: prototype.idAccountingCTA + '-lblSubType',
                    html: 'Sub Type:', hidden: true,
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 6px 8px 10px'
                },
                {//AMS - txt Sub Type
                    xtype: 'textfield',
                    id: prototype.idAccountingCTA + '-txtSubType',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true, hidden: true,
                    maxLength: 4,
                    width: 50,
                    listeners: {
                        change: 'onUpperValue'
                    }
                },
                {//AMS - lbl Category
                    xtype: 'label',
                    id: prototype.idAccountingCTA + '-lblCategory',
                    html: 'Category:', hidden: true,
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 6px 8px 10px'
                },
                {//AMS - txt Category
                    xtype: 'textfield',
                    id: prototype.idAccountingCTA + '-txtCategory',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true, hidden: true,
                    maxLength: 4,
                    width: 40,
                    listeners: {
                        change: 'onUpperValue'
                    }
                },
                {//AMS - lbl Account
                    xtype: 'label',
                    id: prototype.idAccountingCTA + '-lblCta',
                    html: 'Account:', hidden: true,
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 6px 8px 10px'
                },
                {//AMS - txt Account
                    xtype: 'textfield',
                    id: prototype.idAccountingCTA + '-txtCta',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true, hidden: true,
                    maxLength: 4,
                    width: 60
                },
                //AMT 
                {//cmb Country
                    xtype: 'combo',
                    fieldLabel: 'Country:',
                    id: prototype.idAccountingCTA + '-cmbCountry1',
                    labelAlign: 'center',
                    queryMode: 'local',
                    valueField: 'code',
                    displayField: 'name', hidden: true,
                    emptyText: 'All',
                    labelWidth: 45,
                    width: 200,
                    labelClsExtra: 'prx-label-search',
                    padding: '5px 0px 0px 10px',
                    editable: false,
                    listConfig: {
                        minWidth: 130
                    },
                    listeners: {
                        afterrender: 'onCmbhAfterRender',
                        change: 'onCmbChange'
                    }
                },
                {//cmb Tax 
                    xtype: 'combo',
                    fieldLabel: 'Tax:',
                    id: prototype.idAccountingCTA + '-cmbTAX1',
                    labelAlign: 'center',
                    queryMode: 'local',
                    valueField: 'code',
                    displayField: 'name', hidden: true,
                    emptyText: 'All',
                    labelWidth: 20,
                    labelClsExtra: 'prx-label-search',
                    width: 75,
                    padding: '5px 0px 0px 10px',
                    editable: false,
                    listConfig: {
                        minWidth: 100
                    },
                    listeners: {
                        afterrender: 'onCmbhAfterRender',
                        change: 'onCmbChange'
                    }
                },
                {//AMT - cmb Currency
                    xtype: 'combo',
                    fieldLabel: 'Currency:',
                    id: prototype.idAccountingCTA + '-cmbCurrency1',
                    labelAlign: 'center',
                    queryMode: 'local',
                    valueField: 'code', hidden: true,
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 50,
                    padding: '5px 0px 0px 10px',
                    labelClsExtra: 'prx-label-search',
                    width: 110,
                    editable: false,
                    listConfig: {
                        minWidth: 100
                    },
                    listeners: {
                        afterrender: 'onCmbhAfterRender',
                        change: 'onCmbChange'
                    }
                },
                {//AMT - cmb Type
                    xtype: 'combo',
                    fieldLabel: 'Type:',
                    id: prototype.idAccountingCTA + '-cmbType1',
                    labelAlign: 'center',
                    queryMode: 'local',
                    valueField: 'code',
                    displayField: 'name', hidden: true,
                    emptyText: 'All',
                    labelWidth: 30,
                    padding: '5px 0px 0px 10px',
                    labelClsExtra: 'prx-label-search',
                    width: 140,
                    editable: false,
                    listConfig: {
                        minWidth: 200
                    },
                    listeners: {
                        afterrender: 'onCmbhAfterRender',
                        change: 'onCmbChange'
                    }
                },
                {//AMT - lbl Account
                    xtype: 'label',
                    id: prototype.idAccountingCTA + '-lblAccount1',
                    html: 'Account:', hidden: true,
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 10px'
                },
                {//AMT - txt Account 
                    xtype: 'textfield',
                    id: prototype.idAccountingCTA + '-txtAccount1',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true, hidden: true,
                    maxLength: 4,
                    width: 60,
                    listeners: {
                        change: 'onUpperValue'
                    }
                },
                //AMC
                {//AMC - cmbo Source
                    xtype: 'combo',
                    fieldLabel: 'Source:',
                    id: prototype.idAccountingCTA + '-cmbSource2',
                    labelAlign: 'center',
                    queryMode: 'local',
                    valueField: 'code',
                    displayField: 'name', hidden: true,
                    emptyText: 'All',
                    labelWidth: 45,
                    labelClsExtra: 'prx-label-search',
                    width: 100,
                    padding: '5px 0px 0px 10px',
                    editable: false,
                    listConfig: {
                        minWidth: 130
                    },
                    listeners: {
                        afterrender: 'onCmbhAfterRender',
                        change: 'onCmbChange'
                    }
                },
                {//AMC - cmb Country
                    xtype: 'combo',
                    fieldLabel: 'Country:',
                    id: prototype.idAccountingCTA + '-cmbCountry2',
                    labelAlign: 'center',
                    queryMode: 'local',
                    valueField: 'code', hidden: true,
                    displayField: 'name',
                    emptyText: 'All',
                    labelWidth: 45,
                    labelClsExtra: 'prx-label-search',
                    width: 200,
                    padding: '5px 0px 0px 10px',
                    editable: false,
                    listConfig: {
                        minWidth: 200
                    },
                    listeners: {
                        afterrender: 'onCmbhAfterRender',
                        change: 'onCmbChange'
                    }
                },
                {//AMC-TYPE
                    xtype: 'combo',
                    id: prototype.idAccountingCTA + '-cmbType2',
                    fieldLabel: 'Type:',
                    queryMode: 'local',
                    triggerAction: 'all',
                    autoSelect: true,
                    enableKeyEvents: true,
                    forceSelection: true,
                    caseSensitive: false,
                    editable: false,
                    valueField: 'code', displayField: 'name',
                    emptyText: 'All',
                    typeAhead: true,
                    labelWidth: 45,
                    width: 100,
                    hidden: true,
//                    hiddenLabel: false,
                    listConfig: {maxHeight: 111},
                    listeners: {
                        blur: function (cmp) {
                            if (cmp.rawValue.length === 0) {
                                if (cmp.getValue() === null) {
                                    cmp.setValue('');
                                }
                            } else {
                                cmp.setRawValue(cmp.rawValue.toUpperCase());
                            }
                        }
                    }
                },
                {//AMC - cmb Currency
                    xtype: 'combo',
                    fieldLabel: 'Currency:',
                    id: prototype.idAccountingCTA + '-cmbCurrency2',
                    labelAlign: 'center',
                    queryMode: 'local',
                    valueField: 'code',
                    displayField: 'name', hidden: true,
                    emptyText: 'All',
                    labelWidth: 50,
                    labelClsExtra: 'prx-label-search',
                    width: 110,
                    padding: '5px 0px 0px 10px',
                    editable: false,
                    listConfig: {
                        minWidth: 200
                    },
                    listeners: {
                        afterrender: 'onCmbhAfterRender',
                        change: 'onCmbChange'
                    }
                },

                //AMU
                {//AMU - cmb Type
                    xtype: 'combo',
                    fieldLabel: 'Type:',
                    id: prototype.idAccountingCTA + '-cmbType3',
                    labelAlign: 'center',
                    queryMode: 'local',
                    valueField: 'code',
                    displayField: 'name', hidden: true,
                    emptyText: 'All',
                    labelWidth: 30,
                    labelClsExtra: 'prx-label-search',
                    width: 100,
                    padding: '5px 0px 0px 10px',
                    editable: false,
                    listConfig: {
                        minWidth: 200
                    },
                    listeners: {
                        afterrender: 'onCmbhAfterRender',
                        change: 'onCmbChange'
                    }
                },
                {//AMU - lbl Client
                    xtype: 'label',
                    id: prototype.idAccountingCTA + '-lblClient3',
                    html: 'Client:', hidden: true,
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 10px'
                },
                {//AMU - txt Client
                    xtype: 'textfield',
                    id: prototype.idAccountingCTA + '-txtClient3',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true, hidden: true,
                    maxLength: 4,
                    width: 60
                },
                {//AMU - lbl UATP Card
                    xtype: 'label',
                    id: prototype.idAccountingCTA + '-lblUATPCard3',
                    html: 'UATP Card:',
                    align: 'center',
                    fieldStyle: 'text-align: center;', hidden: true,
                    padding: '8px 7px 8px 10px'
                },
                {//AMU - txt UATP Card
                    xtype: 'textfield',
                    id: prototype.idAccountingCTA + '-txtUATPCard3',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true, hidden: true,
                    maxLength: 4,
                    width: 60
                },
                {//AMU - lbl Account
                    xtype: 'label',
                    id: prototype.idAccountingCTA + '-lblAccount3',
                    html: 'Account:', hidden: true,
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 10px'
                },
                {//AMU - txt Account 
                    xtype: 'textfield',
                    id: prototype.idAccountingCTA + '-txtAccount3',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true, hidden: true,
                    maxLength: 4,
                    width: 40,
                    listeners: {
                        change: 'onUpperValue'
                    }
                },
                {//AMU - lbl SubAccount
                    xtype: 'label',
                    id: prototype.idAccountingCTA + '-lblSubAccount3',
                    html: 'Sub Account', hidden: true,
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 10px'
                },
                {//AMU - txt SubAccount 
                    xtype: 'textfield',
                    id: prototype.idAccountingCTA + '-txtSubAccount3',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true, hidden: true,
                    maxLength: 4,
                    width: 60,
                    listeners: {
                        change: 'onUpperValue'
                    }
                },
                {//AMU - cmb Mode
                    xtype: 'combo',
                    fieldLabel: 'Mode:',
                    id: prototype.idAccountingCTA + '-cmbMode3',
                    labelAlign: 'center',
                    queryMode: 'local',
                    valueField: 'code',
                    displayField: 'name', hidden: true,
                    emptyText: 'All',
                    labelWidth: 30,
                    labelClsExtra: 'prx-label-search',
                    width: 120,
                    padding: '4px 0px 0px 10px',
                    editable: false,
                    listConfig: {
                        minWidth: 200
                    },
                    listeners: {
                        afterrender: 'onCmbhAfterRender',
                        change: 'onCmbChange'
                    }
                },

                //AMP
                {//AMP - cmbSource4 
                    xtype: 'combo',
                    fieldLabel: 'Source:',
                    id: prototype.idAccountingCTA + '-cmbSource4',
                    labelAlign: 'center',
                    queryMode: 'local',
                    valueField: 'code',
                    displayField: 'name', hidden: true,
                    emptyText: 'All',
                    labelWidth: 43,
                    labelClsExtra: 'prx-label-search',
                    width: 160,
                    padding: '5px 0px 0px 10px',
                    editable: false,
                    listConfig: {
                        minWidth: 200
                    },
                    listeners: {
                        afterrender: 'onCmbhAfterRender',
                        change: 'onCmbChange'

                    }
                },
                {//AMP - cboFOPCode 
                    xtype: 'combo',
                    id: prototype.idAccountingCTA + '-cboFOPCode',
                    labelAlign: 'center',
                    queryMode: 'local',
                    valueField: 'code',
                    displayField: 'name', hidden: true,
//                    emptyText: 'All',
//                    labelWidth: 90,
                    labelClsExtra: 'prx-label-search',
                    width: 50,
                    padding: '5px 0px 0px 10px',
                    editable: false,
                    listConfig: {
                        minWidth: 200
                    },
                    listeners: {
                        afterrender: 'onCmbhAfterRender',
                        change: 'onCmbChange'
                    }
                },
                {
                    xtype: 'textfield',
                    id: prototype.idAccountingCTA + '-txtPTCardNumber',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true, hidden: true,
                    maxLength: 10,
                    width: 80
                },
                {//AMP - lbl Account
                    xtype: 'label',
                    id: prototype.idAccountingCTA + '-lblAccount4',
                    html: 'Account',
                    align: 'center', hidden: true,
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 8px 10px'
                },
                {//AMP - txt Account 
                    xtype: 'textfield',
                    id: prototype.idAccountingCTA + '-txtAccount4',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true, hidden: true,
                    maxLength: 4,
                    width: 40,
                    listeners: {
                        change: 'onUpperValue'
                    }
                },
                {//AMP - lbl SubAccount
                    xtype: 'label',
                    id: prototype.idAccountingCTA + '-lblSubAccount4',
                    html: 'Sub Account', hidden: true,
                    align: 'center',
                    fieldStyle: 'text-align: center;',
                    padding: '8px 7px 0px 10px'
                },
                {//AMP - txt SubAccount 
                    xtype: 'textfield',
                    id: prototype.idAccountingCTA + '-txtSubAccount4',
                    fieldStyle: 'text-align:center',
                    enforceMaxLength: true, hidden: true,
                    maxLength: 4,
                    width: 40,
                    listeners: {
                        change: 'onUpperValue'
                    }
                },
                /*PANTALLA 1ERA FILA - BOTON BUSCAR*/
                {xtype: 'tbspacer', width: 25},
                {
                    xtype: 'button',
                    id: prototype.idAccountingCTA + '-btnSearch',
                    iconCls: 'prx-icon-search',
                    tooltip: 'Search',
                    bodyStyle: 'background: white',
                    border: false,
                    align: 'center',
                    listeners: {
                        click: 'imgSerech_clickHandler'
                    }
                },
                /*PANTALLA 2DA FILA */
                {
                    xtype: 'form',
                    border: false,
                    layout: 'column',
                    defaults: {
                        padding: '3px 1px 5px 1px',
                        anchor: '100%',
                        hiddenLabel: false,
                        labelAlign: 'right',
                        xtype: 'textfield',
                        hidden: false,
                        selectOnFocus: true,
                        enableKeyEvents: true,
                        enforceMaxLength: true},
                    items: [
                        //AMS
                        {//AMS - lbl Sub Account
                            xtype: 'label',
                            id: prototype.idAccountingCTA + '-lblSubCta',
                            html: 'Sub Account:', hidden: true,
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '8px 6px 8px 10px'
                        },
                        {//AMS - txt Sub Account
                            xtype: 'textfield',
                            id: prototype.idAccountingCTA + '-txtSubCta',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true, hidden: true,
                            maxLength: 5,
                            width: 60
                        },
                        //AMT

                        {//AMT - lbl SubAccount
                            xtype: 'label',
                            id: prototype.idAccountingCTA + '-lblSubAccount1',
                            html: 'Sub Account:',
                            align: 'center', hidden: true,
                            fieldStyle: 'text-align: center;',
                            padding: '6px 5px 8px 10px'
                        },
                        {//AMT - txt SubAccount 
                            xtype: 'textfield',
                            id: prototype.idAccountingCTA + '-txtSubAccount1',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true, hidden: true,
                            maxLength: 4,
                            width: 60,
                            listeners: {
                                change: 'onUpperValue'
                            }
                        },
                        {xtype: 'tbspacer', width: 10},
                        {//AMT - cmb Controlled
                            xtype: 'combo',
                            fieldLabel: 'Controlled',
                            id: prototype.idAccountingCTA + '-cmbControlled1',
                            labelAlign: 'center',
                            queryMode: 'local', hidden: true,
                            valueField: 'code',
                            displayField: 'name',
                            emptyText: 'All',
                            labelWidth: 60,
                            labelClsExtra: 'prx-label-search',
                            width: 120,
                            editable: false,
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbhAfterRender',
                                change: 'onCmbChange'
                            }
                        },
                        //AMC
                        {//AMC - cmb SubSource
                            xtype: 'combo',
                            fieldLabel: 'Sub Source:',
                            id: prototype.idAccountingCTA + '-cmbSubSource2',
                            labelAlign: 'center',
                            queryMode: 'local',
                            valueField: 'code',
                            displayField: 'name', hidden: true,
                            emptyText: 'All',
                            labelWidth: 65,
                            labelClsExtra: 'prx-label-search',
                            width: 120,
                            padding: '6px 5px 8px 0px',
                            editable: false,
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbhAfterRender',
                                change: 'onCmbChange'
                            }
                        },
                        {//AMC - cmb Payment Form
                            xtype: 'combo',
                            fieldLabel: 'Payment Form:',
                            id: prototype.idAccountingCTA + '-cmbPayForm2',
                            labelAlign: 'center',
                            queryMode: 'local',
                            valueField: 'code',
                            displayField: 'name', hidden: true,
                            emptyText: 'All',
                            labelWidth: 83,
                            labelClsExtra: 'prx-label-search',
                            width: 140,
                            padding: '6px 5px 8px 10px',
                            editable: false,
                            listConfig: {
                                minWidth: 200
                            },
                            listeners: {
                                afterrender: 'onCmbhAfterRender',
                                change: 'onCmbChange'
                            }
                        },
                        {//AMC - lbl Client
                            xtype: 'label',
                            id: prototype.idAccountingCTA + '-lblClient2',
                            html: 'Client:',
                            align: 'center', hidden: true,
                            fieldStyle: 'text-align: center;',
                            padding: '9px 7px 9px 10px'
                        },
                        {//AMC - txt Client
                            xtype: 'textfield',
                            id: prototype.idAccountingCTA + '-txtClient2',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true, hidden: true,
                            maxLength: 4,
                            width: 50,
                            padding: '6px 0px'
                        },
                        {//AMC - lbl IATA
                            xtype: 'label',
                            id: prototype.idAccountingCTA + '-lblIATA2',
                            html: 'IATA:', hidden: true,
                            align: 'center',
                            fieldStyle: 'text-align: center;',
                            padding: '9px 7px 9px 10px'
                        },
                        {//AMC - txt IATA
                            xtype: 'textfield',
                            id: prototype.idAccountingCTA + '-txtIATA2',
                            fieldStyle: 'text-align:center',
                            enforceMaxLength: true, hidden: true,
                            maxLength: 4,
                            width: 60,
                            padding: '6px 0px'
                        }
                    ]
                },
                // GRID
                {
                    xtype: 'panel',
                    align: 'center',
                    border: false,
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    items: [
//                        {xtype: 'tbspacer', width: 10},
                        //AMS -GRID
                        {
                            xtype: 'grid', hidden: true,
                            id: prototype.idAccountingCTA + '-gridData',
                            height: 350,
                            width: 1060,
                            align: 'center',
                            columnLines: true,
                            padding: '0px 10px',
                            border: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Type', width: 50, dataIndex: 'A1740TITRA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Country', width: 110, dataIndex: 'A1740INTNU',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Company', width: 80, dataIndex: 'A1740CIA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Unit', width: 40, dataIndex: 'A1740UNIDA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'C.Cost', width: 70, dataIndex: 'A1740CECOS',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Location', width: 70, dataIndex: 'A1740UBICA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Account', width: 70, dataIndex: 'A1740CTA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Sub account', width: 90, dataIndex: 'A1740SCTA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Equipment', width: 80, dataIndex: 'A1740EQUI',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Inter company', width: 100, dataIndex: 'A1740ICIA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Country Location', width: 120, dataIndex: 'A1740INTNU',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Client', width: 200, dataIndex: 'A1740CLIE',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 23,
                                        menuDisabled: true,
                                        sortable: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-check',
                                                handler: 'OnChkRFNDHandlerMasterSales',
                                                isDisabled: 'OnChkRFNDIsDisabled'
                                            }
                                        ]
                                    }
                                ],
                                listeners: {
                                    beforecellmousedown: function () {
                                        return false;
                                    }
                                }
                            }
                        },
                        //AMT -GRID
                        {
                            xtype: 'grid',
                            id: prototype.idAccountingCTA + '-gridDataTax',
                            height: 350, hidden: true,
                            width: 1060,
                            align: 'center',
                            padding: '0px 10px',
                            columnLines: true,
                            border: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Type', width: 50, dataIndex: 'A1741TIPO',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Country', width: 110, dataIndex: 'A1741PAIS',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Company', width: 80, dataIndex: 'A1741CIA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Unit', width: 40, dataIndex: 'A1741UNIDA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'C.Cost', width: 70, dataIndex: 'A1741CECOS',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Location', width: 70, dataIndex: 'A1741UBICA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Account', width: 70, dataIndex: 'A1741CTA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Sub account', width: 90, dataIndex: 'A1741SCTA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Equipment', width: 80, dataIndex: 'A1741EQUI',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Inter company', width: 100, dataIndex: 'A1741ICIA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Country Location', width: 120, dataIndex: 'A1741INTNU',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Description', width: 200, dataIndex: 'A1741CONCE',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 23,
                                        menuDisabled: true,
                                        sortable: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-check',
                                                handler: 'OnChkRFNDHandlerTax',
                                                isDisabled: 'OnChkRFNDIsDisabled'
                                            }
                                        ]
                                    }
                                ],
                                listeners: {
                                    beforecellmousedown: function () {
                                        return false;
                                    }
                                }
                            }
                        },
                        //AMC - GRID
                        {
                            xtype: 'grid',
                            id: prototype.idAccountingCTA + '-gridDataClien',
                            height: 340, hidden: true,
                            width: 1060,
                            align: 'center',
                            columnLines: true,
                            padding: '0px 10px',
                            border: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Type', width: 50, dataIndex: 'A1736TIPO',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Country', width: 110, dataIndex: 'A1736PAIS',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Company', width: 80, dataIndex: 'A1736CIA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Unit', width: 40, dataIndex: 'A1736UNID',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'C.Cost', width: 70, dataIndex: 'A1736CECO',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Location', width: 70, dataIndex: 'A1736UBI',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Account', width: 70, dataIndex: 'A1736CTAC',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Sub account', width: 90, dataIndex: 'A1736SCTA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Equipment', width: 80, dataIndex: 'A1736EQUI',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Inter company', width: 100, dataIndex: 'A1736ICIA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Description', width: 250, dataIndex: 'A1736NOMBR',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
//                                            {text: 'Country Location', width: 120, dataIndex: '',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:center;";
//                                                    return value;
//                                                }
//                                            },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 23,
                                        menuDisabled: true,
                                        sortable: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-check',
                                                handler: 'OnChkRFNDHandlerClient',
                                                isDisabled: 'OnChkRFNDIsDisabled'
                                            }
                                        ]
                                    }
                                ],
                                listeners: {
                                    beforecellmousedown: function () {
                                        return false;
                                    }
                                }
                            }
                        },
                        //AMU - GRID
                        {
                            xtype: 'grid',
                            id: prototype.idAccountingCTA + '-gridDataUATP',
                            height: 388,
                            width: 1060,
                            align: 'center', hidden: true,
                            columnLines: true,
                            padding: '0px 10px',
                            border: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {text: 'Type', width: 50, dataIndex: 'A1820TIPO',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
//                                            {text: 'Country', width: 120, dataIndex: '',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:center;";
//                                                    return value;
//                                                }
//                                            },
                                    {text: 'Company', width: 80, dataIndex: 'A1820CIA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Unit', width: 40, dataIndex: 'A1820UNID',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'C.Cost', width: 70, dataIndex: 'A1820CECO',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Location', width: 70, dataIndex: 'A1820UBI',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Description', width: 405, dataIndex: 'A1820DESCR',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = 'text-align :left ; margin-left : 5px ';
                                            return value;
                                        }},
                                    {text: 'Account', width: 70, dataIndex: 'A1820CTA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Sub account', width: 90, dataIndex: 'A1820SCTA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Equipment', width: 80, dataIndex: 'A1820EQUI',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Inter company', width: 100, dataIndex: 'A1820ICIA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
//                                            {text: 'Country Location', width: 120, dataIndex: '',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:center;";
//                                                    return value;
//                                                }
//                                            },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 23,
                                        menuDisabled: true,
                                        sortable: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-check',
                                                handler: 'OnChkRFNDHandlerUATP',
                                                isDisabled: 'OnChkRFNDIsDisabled'
                                            }
                                        ]
                                    }
                                ],
                                listeners: {
                                    beforecellmousedown: function () {
                                        return false;
                                    }
                                }
                            }
                        },
                        //AMP - GRID
                        {
                            xtype: 'grid',
                            id: prototype.idAccountingCTA + '-gridDataPAGA',
                            height: 388,
                            width: 1020,
                            columnLines: true,
                            padding: '5px 0px 0px 30px',
                            border: true, hidden: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    align: 'center',
                                    sortable: true
                                },
                                items: [
//                                            {text: 'Type', width: 50, dataIndex: '',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:center;";
//                                                    return value;
//                                                }
//                                            },
//                                            {text: 'Country', width: 120, dataIndex: '',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:center;";
//                                                    return value;
//                                                }
//                                            },
                                    {text: 'Concept', width: 350, dataIndex: 'A1835CONC',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {text: 'Company', width: 80, dataIndex: 'A1835CIA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Unit', width: 40, dataIndex: 'A1835UNIDA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'C.Cost', width: 70, dataIndex: 'A1835CENCO',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Location', width: 70, dataIndex: 'A1835UBICA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Account', width: 70, dataIndex: 'A1835CUENT',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Sub account', width: 90, dataIndex: 'A1835SUBCT',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Equipment', width: 80, dataIndex: 'A1835EQUI',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
                                    {text: 'Inter company', width: 100, dataIndex: 'A1835INCIA',
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:center;";
                                            return value;
                                        }
                                    },
//                                            {text: 'Country Location', width: 120, dataIndex: '',
//                                                renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
//                                                    metaData.style = "text-align:center;";
//                                                    return value;
//                                                }
//                                            },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 23,
                                        menuDisabled: true,
                                        sortable: false,
                                        items: [
                                            {
                                                iconCls: 'prx-icon-check',
                                                handler: 'OnChkRFNDHandlerPAGA',
                                                isDisabled: 'OnChkRFNDIsDisabled'
                                            }
                                        ]
                                    }
                                ],
                                listeners: {
                                    beforecellmousedown: function () {
                                        return false;
                                    }
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            defaults: {
                scale: 'medium'
            },
            layout: {
                type: 'hbox',
                pack: 'center'

            },
            items: [
                {
                    text: 'Close',
                    id: prototype.idAccountingCTA + '-btn-close',
                    iconCls: 'prx-icon-cancel',
                    listeners: {
                        click: 'onCloseClick'
                    }
                }
            ]
        }
    ]

});
