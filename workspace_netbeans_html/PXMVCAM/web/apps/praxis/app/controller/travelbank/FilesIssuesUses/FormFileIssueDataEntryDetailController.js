Ext.define('Ext.Praxis.controller.travelbank.FilesIssuesUses.FormFileIssueDataEntryDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormFileIssueDataEntryDetailController',
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
//                Ext.getCmp(prototype.id05+'-btn-save').hide();
//                Ext.getCmp(prototype.id05+'-btn-update').hide();
//                if(this.p.rec.data.ESTADO === 'Error'){
//                    Ext.getCmp(prototype.id05+'-btn-delete').show();
//                }else{
//                    Ext.getCmp(prototype.id05+'-btn-delete').hide();
//                }                            
//                Ext.getCmp(prototype.id05+'-btn-cancel').show();
                break;
//            case 'I':
//                Ext.getCmp(prototype.id05+'-btn-save').show();
//                Ext.getCmp(prototype.id05+'-btn-update').hide();
//                Ext.getCmp(prototype.id05+'-btn-delete').hide();
//                Ext.getCmp(prototype.id05+'-btn-cancel').show();
//                break;

        }
//        global.AccessControlMaganer();

    },
    
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function (rec) {
        console.log(rec);
//        this.setFormatParameter(rec);
//        // <editor-fold defaultstate="collapsed" desc="DataHeader">        
        this.setValue('A4281IDISS', rec.get('A4281IDISS'));
        this.setValue('A4281TRNCU', rec.get('A4281TRNCU'));
        this.setValue('A4281NCTA', rec.get('A4281NCTA'));
        this.setValue('A4281SERV', rec.get('A4281SERV'));
        this.setValue('A4281VALOR', Ext.util.Format.number(rec.get('A4281VALOR'), '0,000.00'));
        this.setValue('A4281MDA', rec.get('A4281MDA'));
        this.setValue('A4281MOT', rec.get('A4281MOT'));
        this.setValue('A4281TIPD', rec.get('A4281TIPD'));
        this.setValue('A4281FEMI', rec.get('A4281FEMI'));
        this.setValue('A4281FEXP', rec.get('A4281FEXP'));
        this.setValue('ticket-number', rec.get('A4281CIA')+rec.get('A4281FORMA')+rec.get('A4281SERIE'));   
        this.setValue('A4281IDISR', rec.get('A4281IDISR'));
//        //Accounting & Audit Data        
        this.setValue('A4281REGIS', rec.get('A4281REGIS'));
        this.setValue('A4281FREGI', rec.get('A4281FREGI'));
        this.setValue('A4281HREGI', rec.get('A4281HREGI'));
        this.setValue('A4281REVIS', rec.get('A4281REVIS'));
        this.setValue('A4281FREVI', rec.get('A4281FREVI'));
        this.setValue('A4281HREVI', rec.get('A4281HREVI'));
//        // </editor-fold>         
//        this.setGridDataDetalle('');
    },
    // </editor-fold>   

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function (rec) {
        var me = this;
        //console.log(rec);        
        me.detalleSearchParams = {
            VP_PRDA: rec.get('A4280PRDA'),
            VP_MDA: rec.get('A4280MDA'),
            VP_SQDIA: rec.get('A4280SQDIA'),
            VP_IDISS: '',
            VP_Document: '',
            VP_IDISR: ''
        };
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var cmbfiltro = this.getValue('cmbfiltroDataEntry');
        me.detalleSearchParams.VP_OPCION = cmbfiltro;
        switch (cmbfiltro) {
            case "1" :
                me.detalleSearchParams.VP_IDISS = Ext.getCmp(prototype.id05 + '-A4281IDISS-Filter').getValue();
                break;
            case '2':
                me.detalleSearchParams.VP_Document = Ext.getCmp(prototype.id05 + '-DocumentTKT-Filter').getValue();
                break;
            case '3':
                me.detalleSearchParams.VP_IDISS = Ext.getCmp(prototype.id05 + '-A4281IDISR-Filter').getValue();
                break;
        }
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
//                                        Ext.getCmp(prototype.id05 + '-btnSearch').fireEvent('click', {});
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
        return Ext.getCmp(prototype.id05 + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id05 + '-' + id).focus();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id05 + '-' + id).setValue(txt);
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
                IN_FECHA_PROCESO = Ext.util.Format.date(Ext.getCmp(prototype.id05 + '-txtProcessDate').getValue(), 'Ymd');
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




