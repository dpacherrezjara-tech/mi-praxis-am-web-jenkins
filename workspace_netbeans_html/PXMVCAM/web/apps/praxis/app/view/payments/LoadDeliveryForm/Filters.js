Ext.define('Ext.Praxis.view.payments.LoadDeliveryForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '2 0 2 0 ',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            width: prototype.widthContenedor,
            border: false,
            bodyStyle: 'background: transparent',
            layout: 'vbox',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-boxSearchFilter',
                    width: '100%',
                    layout: 'hbox',
                    border: true,
                    bodyStyle: 'background: transparent',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            width: '70%',
                            layout: 'hbox',
                            border: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [
                                {
                                    xtype: 'panel',
                                    //width: '100%',
                                    layout: 'hbox',
                                    border: false,
                                    bodyStyle: 'background-color: #E3EAF9;',
                                    defaults: {
                                        anchor: '100%'
                                    },
                                    items: [
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbfiltro-procesador',
                                            fieldLabel: 'Procesador', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 120,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["", "-TODOS-"],
                                                    ["WP00", "WORLDPAY"],
                                                    ["PRISMA00", "PRISMA"],
                                                    ["FIRSTD00", "FIRSTDATA"],
                                                    ["CIELO00", "CIELO"],
                                                    ["GETNET00", "GETNET"],
                                                    ["REDE00", "REDE"],
                                                    ["AMEX00", "AMEX AR"],
                                                    ["AMEX01", "AMEX MX"],
                                                    ["AMEX02", "AMEX US"],
                                                    ["AMEX03", "AMEX ASIA"],
                                                    ["AMEX04", "AMEX EU"],
                                                    ["KOREA00", "KOREA 1"],
                                                    ["KOREA01", "KOREA 2"],
                                                    ["KOREA02", "KOREA 3"],
                                                    ["KOREA03", "KOREA 4"],
                                                    ["IZIPAY00", "IZIPAY MC&VA"],
                                                    ["IZIPAY01", "IZIPAY CMR&DN"],
                                                    ["IZIPAY02", "IZIPAY AMEX"],
                                                    ["NIUBIZ00", "NIUBIZ"],
                                                    ["DINERS00", "DINERS"],
                                                    ["PLACET00", "PLACETOPAY"],
                                                    ["TRANSB00", "TRANSBANK"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: false,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 240,
                                            height: 26,
                                            value: "",
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            padding: '6 0',
                                            listeners: {
                                                // change: 'cmbfiltro_clickHandler'
                                            }
                                        },
                                        {
                                            xtype: 'combo',
                                            id: prototype.id + '-cmbfiltro',
                                            fieldLabel: 'Search by', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 80,
                                            store: new Ext.data.SimpleStore({
                                                fields: ['code', 'name'],
                                                data: [
                                                    ["1", "System Date"],
                                                    ["2", "Processing Date"]
                                                ]
                                            }),
                                            queryMode: 'local',
                                            triggerAction: 'all',
                                            autoSelect: false,
                                            forceSelection: true,
                                            caseSensitive: false,
                                            editable: false,
                                            typeAhead: true,
                                            valueField: 'code', displayField: 'name',
                                            width: 240,
                                            height: 26,
                                            value: "2",
                                            listConfig: {maxHeight: 111},
                                            enableKeyEvents: true,
                                            padding: '6 0',
                                            listeners: {
                                                change: 'cmbfiltro_clickHandler'
                                            }
                                        },
                                        //{xtype: 'tbspacer', width: 2},
                                        {
                                            xtype: 'panel',
                                            id: prototype.id + '-BoxFilter01',
                                            border: false,
                                            hidden: false,
                                            layout: 'hbox',
                                            bodyStyle: 'background: transparent;"',
                                            margin: '3 0',
                                            defaults: {
                                                anchor: '100%',
                                                padding: '4 0'
                                            },
                                            items: [
                                                {
                                                    xtype: 'datefield',
                                                    id: prototype.id + '-fecha1',
                                                    fieldLabel: 'From', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 50,
                                                    width: 135,
                                                    height: 26,
                                                    format: 'Ymd',
                                                    //formatText: '',
                                                    //invalidText: 'Type the date in the format: YYYY/MM/DD',
                                                    minValue: new Date(1990, 00, 01),
                                                    maskRe: /[0-9/]/,
                                                    editable: true,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    //padding:'2 2 2 2 ',                                            
                                                    listeners: {
                                                        change: 'validateDatefield',
                                                        keypress: function (obj, e) {
                                                            if (e.getKey() === e.ENTER) {
                                                                Ext.getCmp(prototype.id + '-fecha2').focus();
                                                            }
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    id: prototype.id + '-fecha2',
                                                    fieldLabel: 'To', labelAlign: 'right', labelStyle: 'font-weight: bold;', labelWidth: 38,
                                                    width: 128,
                                                    height: 26,
                                                    format: 'Ymd',
                                                    minValue: new Date(1990, 00, 01),
                                                    maskRe: /[0-9/]/,
                                                    editable: true,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maxLength: 10,
                                                    //padding: '2 0 0 10 ',
                                                    listeners: {
                                                        change: 'validateDatefield2',
                                                        keypress: function (obj, e) {
                                                            if (e.getKey() === e.ENTER) {

                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            width: '30%',
                            layout: {
                                type: 'hbox',
                                pack: 'end'
                            },
                            border: false,
                            bodyStyle: 'background-color: #E3EAF9;',
                            items: [
                                {
                                    xtype: 'progressbar',
                                    id: prototype.id + '-progressBar',
                                    width: 128,
                                    height: 26,
                                    margin: '5 8 5 8 ',
                                    padding: '4 2 4 2',
                                    hidden: true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});
