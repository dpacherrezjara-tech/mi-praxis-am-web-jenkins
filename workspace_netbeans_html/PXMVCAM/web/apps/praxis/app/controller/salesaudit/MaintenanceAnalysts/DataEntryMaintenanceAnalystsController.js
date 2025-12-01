/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.MaintenanceAnalysts.DataEntryMaintenanceAnalystsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryMaintenanceAnalystsController',

    beanTMP: {},
    urlWin01: CONTEXTPATH + '/MaintenanceAnalysts',

    A3406FALTA: '',

    init: function (view) {
        var me = this;
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        const me = this;
        const cmbProctypeSett2 = Ext.getCmp(prototype.id01 + '-cmbProctypeSett2');
        cmbProctypeSett2.setStore(me.view.params.data);        
        //        

        switch (String(me.view.params.action)) {
            case 'U':
                var rec = me.view.params.rec;

                Ext.getCmp(prototype.id01 + '-btn-save').hide();
                Ext.getCmp(prototype.id01 + '-btn-update').show();
                Ext.getCmp(prototype.id01 + '-btn-delete').show();

                Ext.getCmp(prototype.id01 + '-txtA2665DESCR').setValue(rec.get('A4836DESCR'));
                Ext.getCmp(prototype.id01 + '-txtuser').setValue(rec.get('A4836USER'));
                //Ext.getCmp(prototype.id01 + '-cmbProctypeSett2').setValue(rec.get('A4836PROCE'));
                me.OnLoadCmbStatus(rec.get('A4836FLAG'));
                Ext.getCmp(prototype.id01 + '-cmbProctypeSett2').setValue(rec.get('A4836PROCE'));
                // Ext.getCmp(prototype.id01 + '-CmbStatus').setValue(rec.get('A3406FLAG') == 'Enabled' ? 'AC' : 'IN');

                Ext.getCmp(prototype.id01 + '-txtA3406REGIS').setValue(rec.get('A4836REGIS'));
                Ext.getCmp(prototype.id01 + '-txtA3406FREGI').setValue(rec.get('A4836FREGI'));
                Ext.getCmp(prototype.id01 + '-txtA3406HREGI').setValue(rec.get('A4836HREGI'));
                Ext.getCmp(prototype.id01 + '-txtA3406REVIS').setValue(rec.get('A4836REVIS'));
                Ext.getCmp(prototype.id01 + '-txtA3406FREVI').setValue(rec.get('A4836FREVI'));
                Ext.getCmp(prototype.id01 + '-txtA3406HREVI').setValue(rec.get('A4836HREVI'));             

                break;
            case 'I':
                Ext.getCmp(prototype.id01 + '-btn-save').show();
                Ext.getCmp(prototype.id01 + '-btn-update').hide();
                Ext.getCmp(prototype.id01 + '-btn-delete').hide();

                Ext.getCmp(prototype.id01 + '-txtA2665DESCR').setValue('');

                Ext.getCmp(prototype.id01 + '-txtuser').setValue('');
                //Ext.getCmp(prototype.id01 + '-txtpais').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406REGIS').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406FREGI').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406HREGI').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406REVIS').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406FREVI').setValue('');
                Ext.getCmp(prototype.id01 + '-txtA3406HREVI').setValue('');
                //
                me.OnLoadCmbStatus('AC');
                Ext.getCmp(prototype.id01 + '-cmbProctypeSett2').setValue('AMEX00');
                break;
            default:
                Ext.getCmp(prototype.id01 + '-btn-save').hide();
                Ext.getCmp(prototype.id01 + '-btn-update').hide();
                Ext.getCmp(prototype.id01 + '-btn-delete').hide();
        }
        
    },
    onCmbProctype: function (obj, records, eOpts) {
        Ext.getCmp(prototype.id01 + '-txtA2665DESCR').setValue(obj.getRawValue());
    },
    OnLoadCmbStatus: function (id) {
        var cmbSearch = Ext.getCmp(prototype.id01 + '-CmbStatus');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "AC", "name": "Enabled"},
                {"code": "IN", "name": "Disabled"}
            ]
        }));

        cmbSearch.setValue(id);
    },
    
    onDeleClick: function () {
         var me = this;
        var rec = me.view.params.rec;
            me.beanTMP.IN_OPTION = 'D';
            me.beanTMP.A4836DESCR = Ext.getCmp(prototype.id01 + '-txtA2665DESCR').getValue();
            me.beanTMP.A4836USER = Ext.getCmp(prototype.id01 + '-txtuser').getValue();
            me.beanTMP.A4836PROCE = Ext.getCmp(prototype.id01 + '-cmbProctypeSett2').getValue();
            me.beanTMP.A4836FLAG = Ext.getCmp(prototype.id01 + '-CmbStatus').getValue();
            me.beanTMP.A4836CORR = rec.get('A4836CORR');
            me.beanTMP.A4836FALTA = rec.get('A4836FALTA');
            me.beanTMP.A4836FBAJA = rec.get('A4836PROCE');

            if (me.beanTMP.A4836USER === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field Auditor');
                return;
            }
            if (me.beanTMP.A4836PROCE === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Procesador');
                return;
            }
            if (me.beanTMP.A3406FLAG === '') {
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
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id01 + '-win'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();

                        Ext.Ajax.request({
                            url: me.urlWin01 + '/mantenimientoAuditor/',
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
                                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                            Ext.getCmp(prototype.id01 + '-win').close();

                                        }


                                    }});
                            }
                        });

                    }
                }
            });
    },
    onSaveClick: function (obj) {
        var me = this;
        var action = String(me.view.params.action);

        if (action === 'I') {
            me.beanTMP.IN_OPTION = action;
            me.beanTMP.A4836DESCR = Ext.getCmp(prototype.id01 + '-txtA2665DESCR').getValue();
            me.beanTMP.A4836USER = Ext.getCmp(prototype.id01 + '-txtuser').getValue();
            me.beanTMP.A4836PROCE = Ext.getCmp(prototype.id01 + '-cmbProctypeSett2').getValue();
            me.beanTMP.A4836FLAG = Ext.getCmp(prototype.id01 + '-CmbStatus').getValue();
            me.beanTMP.A4836CORR = 0;
            me.beanTMP.A4836FALTA = "";
            me.beanTMP.A4836FBAJA = "";

            if (me.beanTMP.A4836USER === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field Auditor');
                return;
            }
            if (me.beanTMP.A4836PROCE === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Procesador');
                return;
            }
            if (me.beanTMP.A3406FLAG === '') {
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
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id01 + '-win'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();

                        Ext.Ajax.request({
                            url: me.urlWin01 + '/mantenimientoAuditor/',
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
                                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                            Ext.getCmp(prototype.id01 + '-win').close();

                                        }


                                    }});
                            }
                        });

                    }
                }
            });
        } else if (action === 'U' || action === 'D') {
            var rec = me.view.params.rec;
            me.beanTMP.IN_OPTION = action;
            me.beanTMP.A4836DESCR = Ext.getCmp(prototype.id01 + '-txtA2665DESCR').getValue();
            me.beanTMP.A4836USER = Ext.getCmp(prototype.id01 + '-txtuser').getValue();
            me.beanTMP.A4836PROCE = Ext.getCmp(prototype.id01 + '-cmbProctypeSett2').getValue();
            me.beanTMP.A4836FLAG = Ext.getCmp(prototype.id01 + '-CmbStatus').getValue();
            me.beanTMP.A4836CORR = rec.get('A4836CORR');
            me.beanTMP.A4836FALTA = rec.get('A4836FALTA');
            me.beanTMP.A4836FBAJA = rec.get('A4836PROCE');

            if (me.beanTMP.A4836USER === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field Auditor');
                return;
            }
            if (me.beanTMP.A4836PROCE === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Procesador');
                return;
            }
            if (me.beanTMP.A3406FLAG === '') {
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
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id01 + '-win'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();

                        Ext.Ajax.request({
                            url: me.urlWin01 + '/mantenimientoAuditor/',
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
                                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                            Ext.getCmp(prototype.id01 + '-win').close();

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
        Ext.getCmp(prototype.id01 + '-win').close();
    }

});