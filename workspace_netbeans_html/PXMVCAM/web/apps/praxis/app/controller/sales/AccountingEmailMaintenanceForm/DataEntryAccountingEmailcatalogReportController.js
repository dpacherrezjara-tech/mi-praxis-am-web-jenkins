/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.sales.AccountingEmailMaintenanceForm.DataEntryAccountingEmailcatalogReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAccountingEmailcatalogReportController',
    beanTMP: {},
    urlWin01: CONTEXTPATH + '/AccountingEmailMaintenanceForm',
    init: function (view) {
        var me = this;
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.OnLoadCmbStatus();
        switch (String(this.view.params.action)) {
            case 'U':
                var rec = this.view.params.rec;

                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-btn-save').hide();
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-btn-update').show();
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-btn-delete').show();

              
                
                
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtmailAirline').setValue(rec.get('A4306CORER'));
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-CmbStatus').setValue(rec.get('A4306FLAG'));
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-CmbModule').setValue(rec.get('A4306MODULCO'));
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-CmbType').setValue(rec.get('A4306TYPECO'));

                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406LABL').setValue(rec.get('A4306LABL'));
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406PROP').setValue(rec.get('A4306PROP'));
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406REGIS').setValue(rec.get('A4306REGIS'));
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406FREGI').setValue(rec.get('A4306FREGI'));
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406HREGI').setValue(rec.get('A4306HREGI'));
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406REVIS').setValue(rec.get('A4306REVIS'));
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406FREVI').setValue(rec.get('A4306FREVI'));
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406HREVI').setValue(rec.get('A4306HREVI'));
                break;
            case 'I':
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-btn-save').show();
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-btn-update').hide();
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-btn-delete').hide();

                
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtmailAirline').setValue('');
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-CmbStatus').setValue('');
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-CmbModule').setValue('');
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-CmbType').setValue('');
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406LABL').setValue('');
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406PROP').setValue('');
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406REGIS').setValue('');
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406FREGI').setValue('');
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406HREGI').setValue('');
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406REVIS').setValue('');
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406FREVI').setValue('');
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406HREVI').setValue('');

                break;
            default:
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-btn-save').hide();
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-btn-update').hide();
                Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-btn-delete').hide();
        }
    },

    OnLoadCmbStatus: function (id) {
        var CmbStatus = Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-CmbStatus');
        var CmbModule = Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-CmbModule');
        var CmbType = Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-CmbType');

        CmbModule.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "ADM", "name": "ADMs"},
                {"code": "AUDIT", "name": "AUDITs"},
                {"code": "BI", "name": "BI"},
                {"code": "CADUCOS", "name": "Caducos Accounting SOA"},
                {"code": "FLOWN", "name": "Flown Accounting SOA"},
                {"code": "FOB", "name": "FOB Accounting SOA"},
                {"code": "INTACC", "name": "INTACC"},
                {"code": "INTAP", "name": "IXP Accounting SOA"},
                {"code": "INTAR", "name": "IXC Accounting SOA"},
                {"code": "INVOICE", "name": "Invoice Accounting SOA"},
                {"code": "IVA", "name": "IVA Accounting SOA"},
                {"code": "PADJMAFLOWN", "name": "ADJ MAN Flown Accounting"},
                {"code": "PADJMAIXC", "name": "ADJ MAN IXC Accounting"},
                {"code": "PADJMAIXP", "name": "ADJ MAN IXP Accounting"},
                {"code": "PADJMAN", "name": " PADJMAN"},
                {"code": "PADJMASALES", "name": "ADJ MAN Sales Accounting"},
                {"code": "PADJMVFLOWN", "name": "ADJ MASSIVE Flown Accounting"},
                {"code": "PADJMVIXC", "name": "ADJ MASSIVE IXC Accounting"},
                {"code": "PADJMVIXP", "name": "ADJ MASSIVE IXP Accounting"},
                {"code": "PADJMVSALES", "name": "ADJ MASSIVE Sales Accounting"},
                {"code": "PADM", "name": "ADM Accounting"},
                {"code": "PAPINT", "name": "IXP Accounting"},
                {"code": "PARINT", "name": "IXC Accounting"},
                {"code": "PAUTFM", "name": " PAUTFM"},
                {"code": "PCADUCOS", "name": "Caducos Accounting"},
                {"code": "PFLOWN", "name": "Flown Accounting"},
                {"code": "PINVOICE", "name": "Invoice Accounting"},
                {"code": "PIXCEST", "name": "IXC Accounting (Estimated)"},
                {"code": "PIXPEST", "name": "IXP Accounting (Estimated)"},
                {"code": "PLMAP", "name": "PLM AP Accounting SOA"},
                {"code": "PLMGLAR", "name": "PLM GL/AR Accounting SOA"},
                {"code": "PLMINIT", "name": "PLMINIT"},
                {"code": "PPLM", "name": "PLM Accounting"},
                {"code": "PPLMAP", "name": "PLM AP Accounting"},
                {"code": "PPLMGLAR", "name": "PLM GL/AR Accounting"},
                {"code": "PPLMIVA", "name": "PLM IVA Accounting"},
                {"code": "PRFTX", "name": "Refund Tax Accounting"},
                {"code": "PSALES", "name": "Sales Accounting"},
                {"code": "PSALESD", "name": "Sales Error Accounting"},
                {"code": "SALES", "name": "Sales Accounting SOA"},
                {"code": "SOA", "name": " SOA"},
                {"code": "TC", "name": "Tipos de Cambio"},
                {"code": "UATP", "name": "UATP"}
            ]
        }));

        CmbType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "MI", "name": "MIATECH"},
                {"code": "AM", "name": "AEROMEXICO"},
                {"code": "WS", "name": "SOA"},
                {"code": "ER", "name": "ERROR"}
            ]
        }));


        CmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "A", "name": "ACTIVE"},
                {"code": "E", "name": "INACTIVE"}
            ]
        }));
    },
    onSaveClick: function (obj) {
        var me = this;
        me.onGrabarClick('I');
    },
    onUpdateClick: function (obj) {
        var me = this;
        me.onGrabarClick('U');
    },
    onDeleteClick: function (obj) {
        var me = this;
        me.onGrabarClick('D');
    },
    onGrabarClick: function (action) {
        var me = this;
        var rec = this.view.params.rec;

        if (action === 'I') {
            me.beanTMP.IN_OPCION = action;
            me.beanTMP.A4306MODUL = Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-CmbModule').getValue();
            me.beanTMP.A4306TYPE = Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-CmbType').getValue();
            me.beanTMP.A4306CORER = Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtmailAirline').getValue();
            me.beanTMP.A4306CORRL = '';
            me.beanTMP.A4306FLAG = Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-CmbStatus').getValue();
            me.beanTMP.A4306LABL = Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406LABL').getValue();
            me.beanTMP.A4306PROP = Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406PROP').getValue();
            
            if (me.beanTMP.A4306MODUL === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Module');
                return;
            }
            if (me.beanTMP.A4306TYPE === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Type');
                return;
            }
            if (me.beanTMP.A4306CORER === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, E-Mail');
                return;
            }
            if (me.beanTMP.A4306FLAG === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Status');
                return;
            }

            Ext.Msg.show({
                title: '.: PRAXIS :.',
                message: 'SAVE RECORD?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-win'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();

                        Ext.Ajax.request({
                            url: me.urlWin01 + '/mantenimiento/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanTMP)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD INSERTED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.id + '-Contenedor').getController().onSearchClick();
                                            Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-win').close();

                                        }


                                    }});
                            }
                        });

                    }
                }
            });
        } else if (action === 'U' || action === 'D') {
            me.beanTMP.IN_OPCION = action;
            me.beanTMP.A4306MODUL = Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-CmbModule').getValue();
            me.beanTMP.A4306TYPE = Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-CmbType').getValue();
            me.beanTMP.A4306CORER = Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtmailAirline').getValue();
            me.beanTMP.A4306CORRL = rec.get('A4306CORRL');
            me.beanTMP.A4306FLAG = Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-CmbStatus').getValue();
            me.beanTMP.A4306LABL = Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406LABL').getValue();
            me.beanTMP.A4306PROP = Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-txtA3406PROP').getValue();

            if (me.beanTMP.A4306MODUL === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Module');
                return;
            }
            if (me.beanTMP.A4306TYPE === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Type');
                return;
            }
            if (me.beanTMP.A4306CORER === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, E-Mail');
                return;
            }
            if (me.beanTMP.A4306FLAG === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Status');
                return;
            }

            Ext.Msg.show({
                title: '.: PRAXIS :.',
                message: 'UPDATE RECORD?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (btn) {
                    if (btn === 'yes') {
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-win'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();

                        Ext.Ajax.request({
                            url: me.urlWin01 + '/mantenimiento/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanTMP)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD INSERTED' || res.data === 'RECORD UPDATE' || res.data === 'RECORD DELETE') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.idAccoEmailMain + '-Contenedor').getController().onSearchClick();
                                            Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-win').close();

                                        }


                                    }});
                            }
                        });

                    }
                }
            });
        }
    },

    onCloseClick: function (obj) {
        Ext.getCmp(prototype.ididDataEntryEmailcatalogReportForm + '-win').close();
    }

});