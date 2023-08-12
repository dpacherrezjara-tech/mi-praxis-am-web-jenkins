Ext.define('Ext.Praxis.controller.travelbank.FilesIssuesUses.FileMergeDataEntryDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FileMergeDataEntryDetailController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    msjAlert: '',
    beanOption: '',
    dataentryParams: {},
    detalleSearchParams: {},
    // </editor-fold>
    init: function () {
        //console.log('init');
    },
    afterRender: function () {
        this.p = this.view.params;
        switch (this.p.action) {
            case 'U':
                this.mostrarData(this.p.rec);
//                Ext.getCmp(prototype.id19+'-btn-save').hide();
//                Ext.getCmp(prototype.id19+'-btn-update').hide();
//                if(this.p.rec.data.ESTADO === 'Error'){
//                    Ext.getCmp(prototype.id19+'-btn-delete').show();
//                }else{
//                    Ext.getCmp(prototype.id19+'-btn-delete').hide();
//                }                            
//                Ext.getCmp(prototype.id19+'-btn-cancel').show();
                break;
//            case 'I':
//                Ext.getCmp(prototype.id19+'-btn-save').show();
//                Ext.getCmp(prototype.id19+'-btn-update').hide();
//                Ext.getCmp(prototype.id19+'-btn-delete').hide();
//                Ext.getCmp(prototype.id19+'-btn-cancel').show();
//                break;

        }
//        global.AccessControlMaganer();

    },

    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function (rec) {
        console.log(rec);
        // <editor-fold defaultstate="collapsed" desc="DataHeader">        
        this.setValue('NCTA', rec.VP_NCTA);
        this.setValue('MDA', rec.VP_MDA);
        this.setValue('VBAL', Ext.util.Format.number(rec.VP_VBAL, '0,000.00'));
        this.setValue('PRDA', rec.VP_PRDA);
        this.setValue('TRAN', rec.VP_TRAN);
        // </editor-fold>         
        this.setGridDataDetalle(rec);
    },
    // </editor-fold>   

    // <editor-fold defaultstate="collapsed" desc="setGridDataDetalle">
    setGridDataDetalle: function (rec) {
        var me = this;
        this.setFormatParameter(rec);
//        if (vmode === 'S') {
//            if (me.detalleSearchParams.VP_OPCION !== '') {
//                if (me.detalleSearchParams.VP_OPCION === '1' && me.detalleSearchParams.VP_IDUSE === '') {
//                    Ext.Msg.show({title: '.:PRAXIS:.', msg: 'Enter Unique Service Credit ID', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING, fn: false});
//                    return;
//                }
//                if (me.detalleSearchParams.VP_OPCION === '2' && me.detalleSearchParams.VP_Document === '') {
//                    Ext.Msg.show({title: '.:PRAXIS:.', msg: 'Enter Document number', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING, fn: false});
//                    return;
//                }
//                if (me.detalleSearchParams.VP_OPCION === '3' && me.detalleSearchParams.VP_NCTA === '') {
//                    Ext.Msg.show({title: '.:PRAXIS:.', msg: 'Enter Account number', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING, fn: false});
//                    return;
//                }
//                if (me.detalleSearchParams.VP_OPCION === '4' && me.detalleSearchParams.VP_IDISS === '') {
//                    Ext.Msg.show({title: '.:PRAXIS:.', msg: 'Enter Unique Service Credit ID', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING, fn: false});
//                    return;
//                }
//            }
//        }        
        var storeGridDatas = Ext.create('Ext.Praxis.store.travelbank.AccountingMasterTravelbank.GridData', {
            proxy: {
                url: prototype.url + '/searchMergeDetalle'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.detalleSearchParams;
                },
                load: function (obj) {
                    if (obj.data.length === 0) {
                        Ext.Msg.show({title: '.:PRAXIS:.', msg: 'Data not found', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING, fn: false});
                    }
                }
            }
        });
        Ext.getCmp(prototype.id19 + '-gridDataDetail').setStore(storeGridDatas);
        Ext.getCmp(prototype.id19 + '-gridDataDetail').getStore().reload();
        Ext.getCmp(prototype.id19 + '-paggin').setStore(storeGridDatas);

    },
    // </editor-fold> 

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function (rec) {
        var me = this;
        //console.log(rec);        
        me.detalleSearchParams = {
            VP_OPCION: rec.VP_OPCION,
            VP_NCTA: rec.VP_NCTA,
            VP_PRDA: rec.VP_PRDA,
            VP_TRAN: ''
        };
        // <editor-fold defaultstate="collapsed" desc="llenarData Filter">
//        var cmbfiltro = this.getValue('cmbfiltroDataEntry');
//        me.detalleSearchParams.VP_OPCION = cmbfiltro;
//        switch (cmbfiltro) {
//            case "1" :
//                me.detalleSearchParams.VP_IDISS = Ext.getCmp(prototype.id19 + '-A4308IDISS-Filter').getValue();
//                break;
//            case '2':
//                me.detalleSearchParams.VP_Document = Ext.getCmp(prototype.id19 + '-DocumentTKT-Filter').getValue();
//                break;
//            case '3':
//                me.detalleSearchParams.VP_IDISS = Ext.getCmp(prototype.id19 + '-A4308IDISR-Filter').getValue();
//                break;
//        }
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación">
//        _path = prototype.url + '/getXLSX?' +
//                'IN_MODULO=' + searchParams.IN_MODULO + '&' +
//                'IN_FECHA_PROCESO=' + searchParams.IN_FECHA_PROCESO + '&' +
//                'IN_FECHA_ACUSE=' + searchParams.IN_FECHA_ACUSE + '&' +
//                'A1955STATU=' + searchParams.A1955STATU;
        // </editor-fold>
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="CRUD">
    onSaveClick: function (btn) {
        if (this.validaRequiredFields()) {
            switch (this.getValue('cbxModulo')) {
                case "PTBCREDITI" :
                case "PTBCREDITU" :
                case "PTBLOSSES" :
                case "PTBEXPIRY" :
                case "PTBREPORT" :
                case "PTBDETAIL" :
                    Ext.Msg.show({
                        title: '.:PRAXIS:.',
                        msg: 'Are you sure to insert ?',
                        buttons: Ext.MessageBox.YESNO,
                        scope: this,
                        icon: Ext.MessageBox.QUESTION,
                        modal: true,
                        fn: function (btn) {
                            if (btn === 'yes') {
                                this.view.params.action = "I";
                                this.llenarData();
                                this.crud();
                            }
                        }
                    });
                    break;
            }
        } else {
            var msg = this.msjAlert;
            if (msg === '')
                msg = 'You must enter all required fields.';
            global.Msg({
                msg: msg
            });
        }
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    onDeleteClick: function (btn) {
        switch (this.getValue('cbxModulo')) {
            case "PSALES" :
                dataentryParams = {};
                dataentryParams.IN_MODULO = 'SALES';
                dataentryParams.IN_FECHA_PROCESO = this.p.rec.get('A1955FPROC');
                this.setReverse(this.p.rec);
                break;

        }
    },
    // </editor-fold>

    validaRequiredFields: function () {
        var cbxModulo = this.getValue('cbxModulo');
        if (cbxModulo === '') {
            this.msjAlert = 'Select Module.';
            return false;
        } else {
            switch (cbxModulo) {
                case "PTBCREDITI" :
                case "PTBCREDITU" :
                case "PTBLOSSES" :
                case "PTBEXPIRY" :
                case "PTBREPORT" :
                case "PTBDETAIL" :
                    if (this.getValue('txtProcessDate') === '' || this.getValue('txtProcessDate') === null) {
                        this.msjAlert = 'Enter correct data';
                        return false;
                    }
                    break;
                case "PCADUCOS" :
                    if (this.getValue('cmbDateFromYear') === '' || this.getValue('cmbDateFromMonth') === '') {
                        this.msjAlert = 'Enter correct data';
                        return false;
                    }
                    break;
            }
        }
        return true;
    },

    crud: function () {
//        var mod = this;
//        Ext.Ajax.request({
//            url: prototype.url + '/Maintance',
//            method: 'POST',
//            timeout: 60000000,
//            params: this.beanOption,
//
//            beforerequest: Ext.getCmp('DataEntryAccountingMasterTravelbankForm').mask('Loading...'),
//            success: function (response, options) {
//                var res = Ext.JSON.decode(response.responseText);
//                if (res.success) {
//                    var msg = res.intResult;                    
//                    var icon = 1;
//                    if (msg === 'RECORD EXISTS') {
//                        icon = 2;
//                    }
//                    global.Msg({
//                        msg: msg,
//                        icon: icon,
//                        fn: function () {
//                            if (msg === 'RECORD INSERTED') {
//                                Ext.getCmp('DataEntryAccountingMasterTravelbankForm').close(),
//                                        Ext.getCmp(prototype.id19 + '-btnSearch').fireEvent('click', {});
//                            }
//                        }
//                    });
//                } else {
//                    global.Msg({
//                        msg: res.sesion
//                    });
//                }
//                Ext.getCmp('DataEntryAccountingMasterTravelbankForm').unmask();
//            },
//            failure: function (response, opts) {
//                console.log('server-side failure with status code ' + response.status);
//                Ext.getCmp('DataEntryAccountingMasterTravelbankForm').unmask();
//            }
//        });
    },

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id19 + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id19 + '-' + id).focus();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id19 + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    // </editor-fold>

    llenarData: function () {
        this.beanOption = {};

        var A1955KEY2 = '', A1955KEY4 = '', IN_FECHA_PROCESO = '';
        var A1955MODUL = this.getValue('cbxModulo');

        switch (this.getValue('cbxModulo')) {
            case "PTBCREDITI" :
            case "PTBCREDITU" :
            case "PTBLOSSES" :
            case "PTBEXPIRY" :
            case "PTBREPORT" :
            case "PTBDETAIL" :
                IN_FECHA_PROCESO = Ext.util.Format.date(Ext.getCmp(prototype.id19 + '-txtProcessDate').getValue(), 'Ymd');
                break;
                /*case "PAPINT" : case "PARINT" :
                 IN_FECHA_PROCESO = this.getValue('cbxDateYear')+this.getValue('cbxDateMonth')+this.getValue('cbxDatePeriod');
                 break;*/
            case "PCADUCOS" :
                IN_FECHA_PROCESO = this.getValue('cmbDateFromYear') + this.getValue('cmbDateFromMonth');
                //A1955KEY2 = this.getValue('cmbDateFromYear')+this.getValue('cmbDateFromMonth');
                //A1955KEY4 = this.getValue('cmbDateToYear')+this.getValue('cmbDateToMonth');
                break;
        }

        this.beanOption = {
            A1955MODUL: A1955MODUL,
            IN_FECHA_PROCESO: IN_FECHA_PROCESO,
            A1955KEY2: A1955KEY2,
            A1955KEY4: A1955KEY4,
            strOption: this.view.params.action
        };
    }
});




