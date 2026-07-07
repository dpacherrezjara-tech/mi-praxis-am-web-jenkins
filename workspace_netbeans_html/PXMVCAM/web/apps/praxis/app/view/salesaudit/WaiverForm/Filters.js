Ext.define('Ext.Praxis.view.salesaudit.WaiverForm.Filters', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-filters',
    border: true,
    bodyStyle: 'background-color: #E3EAEF;',
    padding: '4px 0px 4px 0px',
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
                width: 1400
            },
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'background: transparent',
                    id: prototype.id + '-panelFilters1',
                    border: false,
                    layout: 'hbox',
                    defaults: {
                        fieldStyle: 'text-align: center;',
                        padding: '6px 4px 6px 4px',
                        anchor: '100%'
                    },
                    items: [

                        {
                            xtype: 'label',
                            text: 'Search By',
                            style: 'font-weight:bold; font-size:12px;',
                            padding: '10 8 5 5'
                        },

                        {
                            xtype: 'textfield',
                            id: prototype.id + '-Ccust',
                            value: '139',
                            hidden: true
                        },

                        {
                            xtype: 'combo',
                            id: prototype.id + '-cmbType',
                            fieldStyle: 'text-align: left;',
                            editable: false,
                            width: 160,
                            labelWidth: 0,
                            queryMode: 'local',
                            triggerAction: 'all',
                            valueField: 'code',
                            displayField: 'name'
                        },

                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelFilter1',
                            bodyStyle: 'background-color: #dce6ef; border-radius: 4px;',
                            padding: '4px 6px 4px 6px',
                            border: true,
                            layout: { type: 'hbox', align: 'middle' },
                            defaults: { padding: '2px 4px 2px 4px' },
                            items: [
                                // {
                                //     xtype: 'label',
                                //     text: 'Caso',
                                //     style: 'font-weight:bold; font-size:11px; color:#2c5282;',
                                //     padding: '0 6 0 0'
                                // },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtCaso',
                                    width: 120,
                                    labelWidth: 0,
                                    fieldStyle: 'text-align: center;',
                                    maxLength: 10,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true,
                                    // emptyText: '0000000000'
                                }
                            ]
                        },

                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelFilter2',
                            bodyStyle: 'background-color: #dce6ef; border-radius: 4px;',
                            padding: '4px 6px 4px 6px',
                            border: true,
                            layout: { type: 'hbox', align: 'middle' },
                            defaults: { padding: '2px 4px 2px 4px' },
                            items: [
                                // {
                                //     xtype: 'label',
                                //     text: 'Ticket',
                                //     style: 'font-weight:bold; font-size:11px; color:#2c5282;',
                                //     padding: '0 6 0 0'
                                // },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtTicket',
                                    width: 150,
                                    labelWidth: 0,
                                    fieldStyle: 'text-align: center;',
                                    maxLength: 13,
                                    maskRe: /[0-9]/,
                                    enforceMaxLength: true,
                                    // emptyText: '0000000000000'
                                }
                            ]
                        },

                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelFilter3',
                            bodyStyle: 'background-color: #dce6ef; border-radius: 4px;',
                            padding: '4px 6px 4px 6px',
                            border: true,
                            layout: { type: 'hbox', align: 'middle' },
                            defaults: { padding: '2px 4px 2px 4px' },
                            items: [
                                // {
                                //     xtype: 'label',
                                //     text: 'Reserva',
                                //     style: 'font-weight:bold; font-size:11px; color:#2c5282;',
                                //     padding: '0 6 0 0'
                                // },
                                {
                                    xtype: 'textfield',
                                    id: prototype.id + '-txtReserva',
                                    width: 160,
                                    labelWidth: 0,
                                    fieldStyle: 'text-align: center;',
                                    maxLength: 15,
                                    maskRe: /[a-zA-Z0-9]/,
                                    enforceMaxLength: true,
                                    // emptyText: '000000000000000'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelFilter4',
                            bodyStyle: 'background-color: #dce6ef; border-radius: 4px;',
                            padding: '4px 6px 4px 6px',
                            border: true,
                            layout: { type: 'hbox', align: 'middle' },
                            defaults: { padding: '2px 4px 2px 4px' },
                            items: [
                                // {
                                //     xtype: 'label',
                                //     text: 'Fecha Cierre',
                                //     style: 'font-weight:bold; font-size:11px; color:#2c5282;',
                                //     padding: '0 6 0 0'
                                // },
                                {
                                    xtype: 'datefield',
                                    format: 'Y/m/d',
                                    id: prototype.id + '-FechaCierreFrom',
                                    fieldStyle: 'text-align:center; color:#1a56db;',
                                    fieldLabel: 'From',
                                    enforceMaxLength: true,
                                    width: 140,
                                    labelWidth: 35
                                },
                                {
                                    xtype: 'datefield',
                                    format: 'Y/m/d',
                                    id: prototype.id + '-FechaCierreTo',
                                    fieldStyle: 'text-align:center; color:#1a56db;',
                                    fieldLabel: 'To',
                                    enforceMaxLength: true,
                                    width: 125,
                                    labelWidth: 20
                                }
                            ]
                        },

                        // === FECHA VENCIMIENTO (A2537FVETO - YYYYMMDD) ===
                        {
                            xtype: 'panel',
                            id: prototype.id + '-panelFilter5',
                            bodyStyle: 'background-color: #dce6ef; border-radius: 4px;',
                            padding: '4px 6px 4px 6px',
                            border: true,
                            layout: { type: 'hbox', align: 'middle' },
                            defaults: { padding: '2px 4px 2px 4px' },
                            items: [
                                // {
                                //     xtype: 'label',
                                //     text: 'Fecha Venc.',
                                //     style: 'font-weight:bold; font-size:11px; color:#2c5282;',
                                //     padding: '0 6 0 0'
                                // },
                                {
                                    xtype: 'datefield',
                                    format: 'Y/m/d',
                                    id: prototype.id + '-FechaVencimientoFrom',
                                    fieldStyle: 'text-align:center; color:#1a56db;',
                                    fieldLabel: 'From',
                                    enforceMaxLength: true,
                                    width: 140,
                                    labelWidth: 35
                                },
                                {
                                    xtype: 'datefield',
                                    format: 'Y/m/d',
                                    id: prototype.id + '-FechaVencimientoTo',
                                    fieldStyle: 'text-align:center; color:#1a56db;',
                                    fieldLabel: 'To',
                                    enforceMaxLength: true,
                                    width: 125,
                                    labelWidth: 20
                                }
                            ]
                        }

                    ]
                }
            ]
        }
    ]
});