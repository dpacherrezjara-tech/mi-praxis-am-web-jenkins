
Ext.define('Ext.Praxis.view.salesaudit.WaiverForm.WaiverRecordForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.' + prototype.id + '-recordForm',
    requires: [
        'Ext.Praxis.controller.salesaudit.Waiver.WaiverRecordController'
    ],
    controller: 'WaiverRecordController',
    title: 'Waiver',
    header: true,
    height: 620,
    width: 870,
    resizable: false,
    layout: 'fit',
    modal: true,
    border: false,
    defaults: {
        border: false
    },
    listeners: {
        afterrender: 'afterRender'
    },
    items: [
        {
            xtype: 'form',
            autoScroll: true,
            defaults: {
                style: 'margin: 3px;',
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent;',
                    layout: 'vbox',
                    defaults: {
                        anchor: '100%',
                        xtype: 'panel',
                        layout: 'hbox',
                        border: false,
                        padding: '2 0'
                    },
                    items: [
                        // Row: Case No + Status
                        {
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Case No:', style: 'font-weight:bold;color:#0B333C;', width: 120 },
                                { xtype: 'label', text: '(*)', style: 'font-weight:bold;color:#9C1717;', width: 25 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtNcaso', width: 110, maxLength: 10, maskRe: /[0-9]/, enforceMaxLength: true },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Status:', style: 'font-weight:bold;color:#0B333C;', width: 55 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtEstad', width: 180, maxLength: 30, enforceMaxLength: true },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Pax:', style: 'font-weight:bold;color:#0B333C;', width: 35 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtNpax', width: 60, maxLength: 5, maskRe: /[0-9]/, enforceMaxLength: true }
                            ]
                        },
                        // Row: Name
                        {
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Name:', style: 'font-weight:bold;color:#0B333C;', width: 120 },
                                { xtype: 'label', text: '(*)', style: 'font-weight:bold;color:#9C1717;', width: 25 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtPcaso', width: 580, maxLength: 200, enforceMaxLength: true }
                            ]
                        },
                        // Row: Case Type
                        {
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Case Type:', style: 'font-weight:bold;color:#0B333C;', width: 120 },
                                { xtype: 'label', text: ' ', width: 25 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtTcaso', width: 580, maxLength: 200, enforceMaxLength: true }
                            ]
                        },
                        // Row: Close Date + Close Time
                        {
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Close Date:', style: 'font-weight:bold;color:#0B333C;', width: 120 },
                                { xtype: 'label', text: ' ', width: 25 },
                                { xtype: 'datefield', id: prototype.id + '-rec-dtFcrre', format: 'Ymd', submitFormat: 'Ymd', width: 130 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Close Time:', style: 'font-weight:bold;color:#0B333C;', width: 80 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtHcrre', width: 80, maxLength: 6, maskRe: /[0-9]/, enforceMaxLength: true }
                            ]
                        },
                        // Row: Expiry Date + Expiry Time
                        {
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Expiry Date:', style: 'font-weight:bold;color:#0B333C;', width: 120 },
                                { xtype: 'label', text: ' ', width: 25 },
                                { xtype: 'datefield', id: prototype.id + '-rec-dtFveto', format: 'Ymd', submitFormat: 'Ymd', width: 130 },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Expiry Time:', style: 'font-weight:bold;color:#0B333C;', width: 80 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtHveto', width: 80, maxLength: 6, maskRe: /[0-9]/, enforceMaxLength: true }
                            ]
                        },
                        // Row: PNR + IATA + Seq
                        {
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'PNR:', style: 'font-weight:bold;color:#0B333C;', width: 120 },
                                { xtype: 'label', text: ' ', width: 25 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtPnr', width: 130, maxLength: 15, enforceMaxLength: true },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'IATA:', style: 'font-weight:bold;color:#0B333C;', width: 40 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtIatae', width: 100, maxLength: 10, enforceMaxLength: true },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Seq:', style: 'font-weight:bold;color:#0B333C;', width: 35 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtSeq', width: 80, maxLength: 10, enforceMaxLength: true }
                            ]
                        },
                        // Row: Tickets
                        {
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Tickets:', style: 'font-weight:bold;color:#0B333C;', width: 120 },
                                { xtype: 'label', text: ' ', width: 25 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtTkts', width: 580, maxLength: 500, enforceMaxLength: true }
                            ]
                        },
                        // Row: Reservation
                        {
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Reservation:', style: 'font-weight:bold;color:#0B333C;', width: 120 },
                                { xtype: 'label', text: ' ', width: 25 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtCodit', width: 200, maxLength: 15, enforceMaxLength: true }
                            ]
                        },
                        // Row: Agency
                        {
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Agency:', style: 'font-weight:bold;color:#0B333C;', width: 120 },
                                { xtype: 'label', text: ' ', width: 25 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtAgene', width: 580, maxLength: 200, enforceMaxLength: true }
                            ]
                        },
                        // Row: Concept + Sub Concept
                        {
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Concept:', style: 'font-weight:bold;color:#0B333C;', width: 120 },
                                { xtype: 'label', text: ' ', width: 25 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtCcpto', width: 230, maxLength: 100, enforceMaxLength: true },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Sub Concept:', style: 'font-weight:bold;color:#0B333C;', width: 90 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtScpto', width: 230, maxLength: 100, enforceMaxLength: true }
                            ]
                        },
                        // Row: Currency + Amount
                        {
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Currency:', style: 'font-weight:bold;color:#0B333C;', width: 120 },
                                { xtype: 'label', text: ' ', width: 25 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtCurrw', width: 60, maxLength: 3, enforceMaxLength: true },
                                { xtype: 'tbspacer', width: 20 },
                                { xtype: 'label', text: 'Amount:', style: 'font-weight:bold;color:#0B333C;', width: 60 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtAmouw', width: 120, maxLength: 20, enforceMaxLength: true }
                            ]
                        },
                        // Row: Executive
                        {
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Executive:', style: 'font-weight:bold;color:#0B333C;', width: 120 },
                                { xtype: 'label', text: ' ', width: 25 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtEjecb', width: 400, maxLength: 100, enforceMaxLength: true }
                            ]
                        },
                        // Row: Flight No + Flight Date + Flight Time
                        {
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Flight No:', style: 'font-weight:bold;color:#0B333C;', width: 120 },
                                { xtype: 'label', text: ' ', width: 25 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtNvlo', width: 150, maxLength: 50, enforceMaxLength: true },
                                { xtype: 'tbspacer', width: 15 },
                                { xtype: 'label', text: 'Date:', style: 'font-weight:bold;color:#0B333C;', width: 40 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtFvlo', width: 100, maxLength: 20, enforceMaxLength: true },
                                { xtype: 'tbspacer', width: 15 },
                                { xtype: 'label', text: 'Time:', style: 'font-weight:bold;color:#0B333C;', width: 40 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtHvlo', width: 80, maxLength: 10, enforceMaxLength: true }
                            ]
                        },
                        // Row: Itinerary
                        {
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Itinerary:', style: 'font-weight:bold;color:#0B333C;', width: 120 },
                                { xtype: 'label', text: ' ', width: 25 },
                                { xtype: 'textfield', id: prototype.id + '-rec-txtItin', width: 580, maxLength: 500, enforceMaxLength: true }
                            ]
                        },
                        // Row: Description
                        {
                            items: [
                                { xtype: 'tbspacer', width: 7 },
                                { xtype: 'label', text: 'Description:', style: 'font-weight:bold;color:#0B333C;', width: 120 },
                                { xtype: 'label', text: ' ', width: 25 },
                                { xtype: 'textarea', id: prototype.id + '-rec-txtDescr', width: 580, height: 60, maxLength: 1000, enforceMaxLength: true }
                            ]
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
            margin: '10 0',
            layout: {
                pack: 'center'
            },
            defaults: {
                scale: 'medium'
            },
            items: [
                {
                    text: 'Save',
                    id: prototype.id + '-rec-btnSave',
                    iconCls: 'prx-icon-save',
                    listeners: { click: 'onSaveClick' }
                },
                {
                    text: 'Cancel',
                    id: prototype.id + '-rec-btnCancel',
                    iconCls: 'prx-icon-cancel',
                    listeners: { click: 'onCancelClick' }
                }
            ]
        }
    ]
});
