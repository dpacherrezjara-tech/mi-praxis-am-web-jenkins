Ext.define('Ext.Praxis.controller.travelbank.FilesIssuesUses.FileMergeDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FileMergeDataEntryController',
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
//                Ext.getCmp(prototype.id18+'-btn-save').hide();
//                Ext.getCmp(prototype.id18+'-btn-update').hide();
//                if(this.p.rec.data.ESTADO === 'Error'){
//                    Ext.getCmp(prototype.id18+'-btn-delete').show();
//                }else{
//                    Ext.getCmp(prototype.id18+'-btn-delete').hide();
//                }                            
//                Ext.getCmp(prototype.id18+'-btn-cancel').show();
                break;
//            case 'I':
//                Ext.getCmp(prototype.id18+'-btn-save').show();
//                Ext.getCmp(prototype.id18+'-btn-update').hide();
//                Ext.getCmp(prototype.id18+'-btn-delete').hide();
//                Ext.getCmp(prototype.id18+'-btn-cancel').show();
//                break;

        }
//        global.AccessControlMaganer();

    },

    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function (rec) {
        console.log(rec);
//        this.setFormatParameter(rec);
        // <editor-fold defaultstate="collapsed" desc="DataHeader">        
        this.setValue('A4356NCTAF', rec.get('A4356NCTAF'));
        this.setValue('A4356NCTAT', rec.get('A4356NCTAT'));
        this.setValue('A4356MDA', rec.get('A4356MDA'));
        this.setValue('A4356VBALF', Ext.util.Format.number(rec.get('A4356VBALF'), '0,000.00'));
        this.setValue('A4356VBALT', Ext.util.Format.number(rec.get('A4356VBALT'), '0,000.00'));
        this.setValue('A4356STSM', rec.get('A4356STSM'));
        this.setValue('A4356FCRE', rec.get('A4356FCRE'));
        this.setValue('A4356PRDA', rec.get('A4356PRDA'));
        this.setValue('A4356IDFIL', rec.get('A4356IDFIL'));
        this.setValue('A4356TYPE', rec.get('A4356TYPE'));        
        this.setValue('A4356PCONT', rec.get('A4356PCONT'));
        this.setValue('A4356FCONT', rec.get('A4356FCONT'));
        //Accounting & Audit Data        
        this.setValue('A4356REGIS', rec.get('A4356REGIS'));
        this.setValue('A4356FREGI', rec.get('A4356FREGI'));
        this.setValue('A4356HREGI', rec.get('A4356HREGI'));
        this.setValue('A4356REVIS', rec.get('A4356REVIS'));
        this.setValue('A4356FREVI', rec.get('A4356FREVI'));
        this.setValue('A4356HREVI', rec.get('A4356HREVI'));
        // </editor-fold>         
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
                me.detalleSearchParams.VP_IDISS = Ext.getCmp(prototype.id18 + '-A4308IDISS-Filter').getValue();
                break;
            case '2':
                me.detalleSearchParams.VP_Document = Ext.getCmp(prototype.id18 + '-DocumentTKT-Filter').getValue();
                break;
            case '3':
                me.detalleSearchParams.VP_IDISS = Ext.getCmp(prototype.id18 + '-A4308IDISR-Filter').getValue();
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
//                                        Ext.getCmp(prototype.id18 + '-btnSearch').fireEvent('click', {});
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
        return Ext.getCmp(prototype.id18 + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id18 + '-' + id).focus();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id18 + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    // </editor-fold>

    llenarData: function () {
       
    },
    
     // <editor-fold defaultstate="collapsed" desc="Info Detail merge from/to">
    onDetailMergeFromClick: function () {
        // var store = grid.getStore();
        //var rec = store.getAt(rowIndex);
        var rec = {
            VP_OPCION: '1',
            VP_NCTA: this.getValue('A4356NCTAF'),
            VP_PRDA: this.getValue('A4356FCRE'), //A4356PRDA
            VP_TRAN: 'USMG',
            VP_MDA : this.getValue('A4356MDA'),
            VP_VBAL: this.getValue('A4356VBALF').replace(",",'').replace(",",'').replace(",",'')
        };
        this.winDataEntry('U', rec);
    },
    onDetailMergeToClick: function () {
        // var store = grid.getStore();
        //var rec = store.getAt(rowIndex);
        var rec = {
            VP_OPCION: '2',
            VP_NCTA: this.getValue('A4356NCTAT'),
            VP_PRDA: this.getValue('A4356FCRE'), // A4356PRDA
            VP_TRAN: 'MERG',
            VP_MDA : this.getValue('A4356MDA'),
            VP_VBAL: this.getValue('A4356VBALT').replace(",",'').replace(",",'').replace(",",'')
        };
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.MergeForm.FileMergeDataEntryDetail', {
            id: 'FileMergeDataEntryDetail',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    }
    // </editor-fold>
});




