/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.flown.AccountingMasterProcess.DataEntryAccountingMasterProcessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/AccountingMasterProcess',
    PERML: 'N',
    p: {},
    dataentryParams: {},
    aux: false,
    /**
     * Constructor
     */
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.p = this.view.params;
        this.setStoreData();

        switch (this.p.action) {
            case 'I':
                Ext.getCmp(prototype.idDE + '-btn-save').show();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.idDE + '-btn-save').hide();
                
                if (this.p.rec.data.ESTADO === 'Error') {
                    Ext.getCmp(prototype.idDE + '-btn-delete').show();
                } else {
                    Ext.getCmp(prototype.idDE + '-btn-delete').hide();
                }
                this.view.setHeight(this.view.getHeight());
                break;
        }
        global.AccessControlMaganer();
        console.log('PERML');
        console.log(userAccess);
        console.log(optionSelect);
        $.each(userAccess, function (x, y) {
            if (y.NPROG === optionSelect.nprog) {
                PERML = y.PERML;
                console.log('Access:' + PERML);
            }
        });
        this.controlConsistency();
    }
    ,
    setStoreData: function () {
        var cbxModulo = Ext.getCmp(prototype.idDE + '-de-cbxModulo');
        cbxModulo.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: true,
            fields: ['code', 'name'],
            data: [
                ["", "(Select)"],
                ["PFLOWNPRE", "Flown Accounting"],
                ["PPFLOWN", "Flown Accounting Pending"]
            ]}));
        cbxModulo.setValue("");
    },
    onUpdateClick: function (btn) {
    }
    ,
    onSaveClick: function (btn) {
        var module = Ext.getCmp(prototype.idDE + '-de-cbxModulo').getValue();
        var date = Ext.getCmp(prototype.idDE + '-de-txtProcessDate');
        var msj = '';
        if (module === '') {
            msj = 'Select Module.';
        } else {
            if (date.getValue() === null) {
                msj = 'Enter correct data';
            } else {
                if (!date.isValid()) {
                    msj = 'Enter correct data';
                }
            }
        }

        if (msj === '') {
            switch (module) {
                case "PFLOWNPRE" :
                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: 'Are you sure to insert?',
                        buttons: Ext.MessageBox.YESNO,
                        scope: this,
                        icon: Ext.MessageBox.QUESTION,
                        modal: true,
                        fn: function (btn) {
                            if (btn === 'yes') {
                                this.p.action = "I";
                                this.validation();
                            }
                        }
                    });
                    break;
                case "PPFLOWN" :
                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: 'Are you sure to insert?',
                        buttons: Ext.MessageBox.YESNO,
                        scope: this,
                        icon: Ext.MessageBox.QUESTION,
                        modal: true,
                        fn: function (btn) {
                            if (btn === 'yes') {
                                this.p.action = "I";
                                this.crudPending();
                            }
                        }
                    });
                    break;
            }
        } else {
            global.Msg({
                msg: msj
            });
        }
    }
    ,
    onDeleteClick: function (btn) {
        var cbxModulo = Ext.getCmp(prototype.idDE + '-de-cbxModulo').getValue();

        switch (cbxModulo) {
            case "PFLOWNPRE" :
                dataentryParams = {};
                dataentryParams.IN_MODULO = 'FLOWN';
                dataentryParams.IN_FECHA_PROCESO = this.p.rec.get('A1955FPROC');
                this.setReverse(this.p.rec);
                break;
            case "PPFLOWN" :
                Ext.Msg.show({
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to delete ?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.p.action = "D";
                            this.crudPending();
                        }
                    }
                });
                break;
        }
    },
    validation: function () {
        var rec = this.p.rec;
        var strOption = this.p.action;
        var me = this;
        //console.log('opcion : ' + strOption);
        Ext.Ajax.request({
            url: this.url + '/validation',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            success: function (response) {
                var res = Ext.JSON.decode(response.responseText);
                var result = res.data;
                var val_flown = result.IN_FLOWN;
                var val_emd = result.IN_EMD;
                if (val_flown !== -99)
                {
                    if (val_flown === 0) {
                        /*Ext.Msg.show({
                         title: '.:Flown Validation:.',
                         msg: 'Flown Valuation is pendinng'
                         });*/
                        Ext.Msg.alert('.:Flown Validation:.', 'Flown Valuation is pending');
                    } else {
                        if (val_emd === 0) {
                            Ext.Msg.show({
                                title: '.:PRAXIS:.',
                                msg: 'EMDs Valuation is pending. Are you sure to insert ?',
                                buttons: Ext.MessageBox.YESNO,
                                scope: me,
                                icon: Ext.MessageBox.QUESTION,
                                modal: true,
                                fn: function (btn) {
                                    if (btn === 'yes') {
                                        me.p.action = "I";
                                        me.crud();
                                    }
                                }
                            });
                        } else {
                            me.p.action = "I";
                            me.crud();
                        }
                    }
                } else
                {
                    Ext.Msg.alert('.:Flown Validation:.', 'RECORD EXISTS');

                }
            }
        });
    },
    crud: function () {
        var rec = this.p.rec;
        var strOption = this.p.action;
        console.log(strOption);
        Ext.Ajax.request({
            url: this.url + '/mantenimiento',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var result = res.result;
                //console.log(result);
                global.Msg({
                    msg: result,
                    icon: 1,
                    fn: function () {
                        //exito
                        Ext.getCmp('DataEntryAccountingMasterProcessForm').close();
                        Ext.getCmp(prototype.idDE + '-btnSearch').fireEvent('click', {});
                    }
                });

            }
        });
    },
    crudPending: function () {
        var rec = this.p.rec;
        var strOption = this.p.action;
        console.log('opcion : ' + strOption);
        Ext.Ajax.request({
            url: this.url + '/MaintancePendingFlown',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(strOption),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var result = res.result;
                //console.log(result);
                global.Msg({
                    msg: result,
                    icon: 1,
                    fn: function () {
                        //exito
                        Ext.getCmp('DataEntryAccountingMasterProcessForm').close();
                        Ext.getCmp(prototype.idDE + '-btnSearch').fireEvent('click', {});
                    }
                });

            }
        });
    }
    ,
    //<editor-fold defaultstate="collapsed" desc="controlLight">
    controlConsistency: function () {

        if (PERML === 'Y') {
            console.log('opcion PERML: ' + PERML);
            console.log(Ext.getCmp(prototype.idDE + '-de-chkConsistencia'));
            Ext.getCmp(prototype.idDE + '-de-chkConsistencia').setValue(true);
            Ext.getCmp(prototype.idDE + '-de-chkConsistencia').disable();
        }
    },
    // </editor-fold>
    getDataEntryValues: function (strOption) {

        var A1955MODUL = Ext.getCmp(prototype.idDE + '-de-cbxModulo').getValue();
        var IN_ENVIO = Ext.getCmp(prototype.idDE + '-de-chkConsistencia').getValue();
        var IN_FECHA_PROCESO = Ext.getCmp(prototype.idDE + '-de-txtProcessDate').getValue();
        IN_FECHA_PROCESO = Ext.util.Format.date(IN_FECHA_PROCESO, 'Ymd');

        console.log("A1955MODUL : " + A1955MODUL);
        console.log("IN_ENVIO : " + IN_ENVIO);
        console.log("IN_FECHA_PROCESO : " + IN_FECHA_PROCESO);

        return {
            strOption: strOption,
            A1955MODUL: A1955MODUL,
            IN_ENVIO: IN_ENVIO,
            IN_FECHA_PROCESO: IN_FECHA_PROCESO
        };
    }
    ,
    onCancelClick: function (btn) {
        this.view.close();
    }
    ,
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }
    ,
    getDataInputs: function () {
        var rec = this.p.rec;

        Ext.getCmp(prototype.idDE + '-de-cbxModulo').setValue(rec.get('A1955MODUL').trim());
        var fecha = rec.get('A1955FPROC');
        var fecha = fecha.substring(0, 4) + '/' + fecha.substring(4, 6) + '/' + fecha.substring(6, 8);
        Ext.getCmp(prototype.idDE + '-de-txtProcessDate').setValue(fecha);

        Ext.getCmp(prototype.idDE + '-USCR').setValue(rec.get('A1955USRIN'));
        Ext.getCmp(prototype.idDE + '-FECR').setValue(rec.get('A1955FECIN'));
        Ext.getCmp(prototype.idDE + '-HOCR').setValue(rec.get('A1955HORIN'));
        Ext.getCmp(prototype.idDE + '-USUP').setValue(rec.get('A1955USRAC'));
        Ext.getCmp(prototype.idDE + '-FEUP').setValue(rec.get('A1955FECAC'));
        Ext.getCmp(prototype.idDE + '-HOUP').setValue(rec.get('A1955HORAC'));

    },
    setReverse: function (objDT) {
        //console.log(objDT.data);        

        /*Ext.create('Ext.Praxis.view.flown.AccountingMasterProcessForm.DataEntryReverse', {
         id: prototype.idDE + '-dataEntryReverse',
         params: {
         //rec: res.data,
         obj: objDT.data
         }
         }).show();  */
        Ext.Ajax.request({
            url: prototype.url + '/searchReversa',
            method: 'POST',
            timeout: 60000000,
            params: dataentryParams,
            //beforerequest: Ext.getCmp('DataEntryAccountingMasterProcess2Form').mask('Loading...'),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                //console.log(res);
                if (res.success) {
                    Ext.create('Ext.Praxis.view.flown.AccountingMasterProcessForm.DataEntryReverse', {
                        id: prototype.idDE + '-dataEntryReverse',
                        params: {
                            rec: res.data,
                            obj: objDT.data
                        }
                    }).show();
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                //Ext.getCmp('DataEntryAccountingMasterProcess2Form').unmask();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                //Ext.getCmp('DataEntryAccountingMasterProcess2Form').unmask();
            }
        });
    },
    onLogsClick: function () {
        let date = this.p.rec.get('A1955FPROC');
        let params = {
            IN_FPROC: date
        };
        const newWin = Ext.create('Ext.Praxis.view.flown.AccountingMasterProcessForm.DataEntryLogs', {
            id: prototype.idDE + '-DataEntryLogs-1',
            searchParams: params
        });
        newWin.show();
    }
});


