/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.flown.AccountedAmountsInvoicedForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAF9;',
    padding: '2px 0px 1px 0px',
    layout: 'column',
    items: [
        {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: transparent',
            padding: '0px 5px 1px 0px',
            layout: 'vbox',
            defaults: {
                labelStyle: 'font-weight:bold;',
                fieldStyle: 'text-align: center;',
                padding: '0px 1px 0px 0px',
                anchor: '100%',
                width: 1890
            },
            items: [
                /**
                 *  PANEL DATE
                 * 
                 * */
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    border: false,
                    layout: 'column',
                    defaults: {
                        labelStyle: 'font-weight:bold;',
                        fieldStyle: 'text-align: center;',
                        padding: '8px 5px 8px 5px',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Value Date:</strong>',
                            align: 'left',
                            fieldStyle: 'text-align: left;',
                            padding: '11px 7px 8px 10px'
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: 'From <strong style="color:#AC4546;font-size:13px;"> (*)</strong>',
                            anchor: '100%',
                            id: prototype.id + '-txtDateFrom',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 160,
                            labelWidth: 60
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: 'To <strong style="color:#AC4546;font-size:13px;"> (*)</strong>',
                            anchor: '100%',
                            id: prototype.id + '-txtDateTo',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 160,
                            labelWidth: 60
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxType',
                            required: true,
                            fieldLabel: 'Type',
                            width: 120,
                            labelWidth: 40,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'

                        },
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Accounting date flown:</strong>',
                            align: 'left',
                            fieldStyle: 'text-align: left;',
                            padding: '11px 7px 8px 10px'
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: 'From',
                            anchor: '100%',
                            id: prototype.id + '-txtDateFlownFrom',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 160,
                            labelWidth: 40
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: 'To',
                            anchor: '100%',
                            id: prototype.id + '-txtDateFlownTo',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 160,
                            labelWidth: 40
                        },
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Date flight:</strong>',
                            align: 'left',
                            fieldStyle: 'text-align: left;',
                            padding: '11px 7px 8px 10px'
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: 'From',
                            anchor: '100%',
                            id: prototype.id + '-txtDateFlightFrom',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 160,
                            labelWidth: 40
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m/d',
                            fieldLabel: 'To',
                            anchor: '100%',
                            id: prototype.id + '-txtDateFlightTo',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 160,
                            labelWidth: 40
                        },
                        {
                            xtype: 'label',
                            html: '<strong style="color:#000;">Billing:</strong>',
                            align: 'left',
                            fieldStyle: 'text-align: left;',
                            padding: '11px 7px 8px 10px'
                        },
                        {
                            xtype: 'datefield',
                            format: 'Y/m',
                            fieldLabel: 'From',
                            anchor: '100%',
                            id: prototype.id + '-txtDateBillingFrom',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 145,
                            labelWidth: 40
                        },
                                                {
                            xtype: 'datefield',
                            format: 'Y/m',
                            fieldLabel: 'To',
                            anchor: '100%',
                            id: prototype.id + '-txtDateBillingTo',
                            fieldStyle: 'text-align:center',
                            maskRe: /[0-9/]/,
                            enforceMaxLength: true,
                            width: 145,
                            labelWidth: 40
                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxPeriod',
                            required: true,
                            fieldLabel: 'Period',
                            width: 120,
                            labelWidth: 40,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'

                        },
                        {
                            xtype: 'combo',
                            id: prototype.id + '-cbxFlag',
                            required: true,
                            fieldLabel: 'Rep',
                            width: 100,
                            labelWidth: 40,
                            labelAlign: 'left',
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'

                        }
                    ]
                }

            ]
        }
    ]
});

