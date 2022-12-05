/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.RfndarcUserMaintenanceForm.DataEntryARCUserMaintenanceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryARCUserMaintenanceController',

    beanTMP: {},
    urlWin01: CONTEXTPATH + '/RfndarcUserMaintenanceForm',

    A4359FALTA: '',

    init: function (view) {
        var me = this;
       // this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        switch (String(this.view.params.action)) {
            case 'U':
                var rec = this.view.params.rec;

                Ext.getCmp(prototype.idDataEntryARCUserMain + '-btn-save').hide();
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-btn-update').show();
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-btn-delete').show();

                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtA2665DESCR').setValue(rec.get('A4359DESCR'));
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtuser').setValue(rec.get('A4359USER'));
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtpais').setValue(rec.get('A4359PAIS'));
                this.OnLoadCmbStatus(rec.get('A4359FLAG') === 'Enabled' ? 'AC' : 'IN');
                // Ext.getCmp(prototype.idDataEntryARCUserMain + '-CmbStatus').setValue(rec.get('A4359FLAG') == 'Enabled' ? 'AC' : 'IN');

                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtA4359REGIS').setValue(rec.get('A4359REGIS'));
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtA4359FREGI').setValue(rec.get('A4359FREGI'));
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtA4359HREGI').setValue(rec.get('A4359HREGI'));
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtA4359REVIS').setValue(rec.get('A4359REVIS'));
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtA4359FREVI').setValue(rec.get('A4359FREVI'));
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtA4359HREVI').setValue(rec.get('A4359HREVI'));
                this.A4359FALTA = rec.get('A4359FALTA');

                break;
            case 'I':
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-btn-save').show();
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-btn-update').hide();
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-btn-delete').hide();

                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtA2665DESCR').setValue('');
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtuser').setValue('');
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtpais').setValue('US');
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtA4359REGIS').setValue('');
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtA4359FREGI').setValue('');
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtA4359HREGI').setValue('');
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtA4359REVIS').setValue('');
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtA4359FREVI').setValue('');
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtA4359HREVI').setValue('');
                this.OnLoadCmbStatus('AC');

                break;
            default:
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-btn-save').hide();
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-btn-update').hide();
                Ext.getCmp(prototype.idDataEntryARCUserMain + '-btn-delete').hide();
        }
    },

    OnLoadCmbStatus: function (id) {
        var cmbSearch = Ext.getCmp(prototype.idDataEntryARCUserMain + '-CmbStatus');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "AC", "name": "Enabled"},
                {"code": "IN", "name": "Disabled"}
            ]
        }));

        cmbSearch.setValue(id);
    },

    onSaveClick: function (obj) {
        var me = this;
        var action = String(me.view.params.action);

        if (action === 'I') {
            me.beanTMP.IN_OPTION = action;
            me.beanTMP.A4359DESCR = Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtA2665DESCR').getValue();
            me.beanTMP.A4359USER = Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtuser').getValue();
            me.beanTMP.A4359PAIS = Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtpais').getValue();
            me.beanTMP.A4359FLAG = Ext.getCmp(prototype.idDataEntryARCUserMain + '-CmbStatus').getValue();
            me.beanTMP.A4359FALTA = '';

            if (me.beanTMP.A4359USER === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field');
                return;
            }
            if (me.beanTMP.A4359PAIS === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Country');
                return;
            }
            if (me.beanTMP.A4359FLAG === '') {
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
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idDataEntryARCUserMain + '-win'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();

                        Ext.Ajax.request({
                            url: me.urlWin01 + '/mantenimientoRfndUser/',
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
                                            Ext.getCmp(prototype.idDataEntryARCUserMain + '-win').close();

                                        }


                                    }});
                            }
                        });

                    }
                }
            });
        } else if (action === 'U' || action === 'D') {
            me.beanTMP.IN_OPTION = action;
            me.beanTMP.A4359DESCR = Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtA2665DESCR').getValue();
            me.beanTMP.A4359USER = Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtuser').getValue();
            me.beanTMP.A4359PAIS = Ext.getCmp(prototype.idDataEntryARCUserMain + '-txtpais').getValue();
            me.beanTMP.A4359FLAG = Ext.getCmp(prototype.idDataEntryARCUserMain + '-CmbStatus').getValue();
            me.beanTMP.A4359FALTA = me.A4359FALTA;

            if (me.beanTMP.A4359USER === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field');
                return;
            }
            if (me.beanTMP.A4359PAIS === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Country');
                return;
            }
            if (me.beanTMP.A4359FLAG === '') {
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
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idDataEntryARCUserMain + '-win'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();

                        Ext.Ajax.request({
                            url: me.urlWin01 + '/mantenimientoRfndUser/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanTMP)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD INSERTED' || res.data === 'RECORD UPDATE' || res.data === 'RECORD DISABLED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.id + '-Contenedor').getController().onSearchClick();
                                            Ext.getCmp(prototype.idDataEntryARCUserMain + '-win').close();

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
        Ext.getCmp(prototype.idDataEntryARCUserMain + '-win').close();
    }

});