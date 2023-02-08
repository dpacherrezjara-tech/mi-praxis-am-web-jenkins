Ext.define('Ext.Praxis.controller.travelbank.FilesIssuesUses.FormFileIssueDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FormFileIssueDataEntryController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    msjAlert: '',
    beanOption: '',
    dataentryParams: {},
    detalleSearchParams: {},
    // </editor-fold>
    init: function (view) {
        // this.setStoreData();
    },
    afterRender: function () {
        this.p = this.view.params;
        switch (this.p.action) {
            case 'U':
                this.mostrarData(this.p.rec);
//                Ext.getCmp(prototype.id+'-btn-save').hide();
//                Ext.getCmp(prototype.id+'-btn-update').hide();
//                if(this.p.rec.data.ESTADO === 'Error'){
//                    Ext.getCmp(prototype.id+'-btn-delete').show();
//                }else{
//                    Ext.getCmp(prototype.id+'-btn-delete').hide();
//                }                            
//                Ext.getCmp(prototype.id+'-btn-cancel').show();
                break;
//            case 'I':
//                Ext.getCmp(prototype.id+'-btn-save').show();
//                Ext.getCmp(prototype.id+'-btn-update').hide();
//                Ext.getCmp(prototype.id+'-btn-delete').hide();
//                Ext.getCmp(prototype.id+'-btn-cancel').show();
//                break;

        }
//        global.AccessControlMaganer();

    },
    onMostrarFiltrosChangeDataEntry: function ( ) {
//        this.limpiarCampos();
        var strOp = this.getValue('cmbfiltroDataEntry');
        switch (strOp) {
            case '1':
                Ext.getCmp(prototype.id + '-BoxUniqueServiceCreditID').show();
                Ext.getCmp(prototype.id + '-BoxDocumentNumber').hide();
                Ext.getCmp(prototype.id + '-BoxIdReferenceNbr').hide();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-BoxUniqueServiceCreditID').hide();
                Ext.getCmp(prototype.id + '-BoxDocumentNumber').show();
                Ext.getCmp(prototype.id + '-BoxIdReferenceNbr').hide();
                break;
            case '3':
                Ext.getCmp(prototype.id + '-BoxUniqueServiceCreditID').hide();
                Ext.getCmp(prototype.id + '-BoxDocumentNumber').hide();
                Ext.getCmp(prototype.id + '-BoxIdReferenceNbr').show();
                break;
        }
    },

    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    setStoreData: function () {
        var storeComboDataYear = win.getStoreYear(false);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        //Ext.getCmp(prototype.id+'-cmbDateToYear').bindStore(storeComboDataYear);
        //Ext.getCmp(prototype.id+'-cbxDateYear').bindStore(storeComboDataYear);

        var storeComboDataMonth = win.getStoreMonth(false);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        //Ext.getCmp(prototype.id+'-cmbDateToMonth').bindStore(storeComboDataMonth);
        //Ext.getCmp(prototype.id+'-cbxDateMonth').bindStore(storeComboDataMonth);
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function (rec) {
        this.setFormatParameter(rec);
        // <editor-fold defaultstate="collapsed" desc="DataHeader">
        //   this.setValue('USCR', rec.get('A1955USRIN'));
        //   this.setValue('FECR', rec.get('A1955FECIN'));
        //   this.setValue('HOCR', rec.get('A1955HORIN'));
        //   this.setValue('USUP', rec.get('A1955USRAC'));
        //   this.setValue('FEUP', rec.get('A1955FECAC'));
        //   this.setValue('HOUP', rec.get('A1955HORAC'));
        // </editor-fold>         
        this.setGridDataDetalle();
    },
    // </editor-fold>   

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function (rec) {
        var me = this;
        console.log(rec);
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
        switch (cmbfiltro) {
            case "1" :
                me.detalleSearchParams.VP_DESDE = Ext.getCmp(prototype.id + '-A4281IDISS-Filter').getValue();
                break;
            case '2':
                me.detalleSearchParams.VP_DESDE = Ext.getCmp(prototype.id + '-DocumentTKT-Filter').getValue();
                break;
            case '3':
                me.detalleSearchParams.VP_IDISS = Ext.getCmp(prototype.id + '-A4281IDISR-Filter').getValue();
                break;
        }
        me.detalleSearchParams.VP_OPCION = cmbfiltro;
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

    // <editor-fold defaultstate="collapsed" desc="setGridDataDetalle">
    setGridDataDetalle: function () {
        var me = this;

        Ext.Ajax.request({
            url: prototype.url + '/searchDetalle',
            timeout: 60000000,
            method: 'POST',
            params: me.detalleSearchParams,
            // beforerequest: Ext.getCmp(prototype.id + '-gridMainContem').mask('Cargando...', ''),
            success: function (response) {
                //win.lblUser_toolTip("Estructura: A4280");
                var res = Ext.JSON.decode(response.responseText);
                // Ext.getCmp(prototype.id + '-gridMainContem').unmask('Loading...', '');
                if (res.total === 0) {
                    global.Msg({
                        msg: 'Data not found'
                    });
                    return;
                }
                Ext.getCmp(prototype.id + '-gridDataDetail').setStore(res.data);
                Ext.getCmp(prototype.id + '-gridDataDetail').getStore().reload();
                Ext.getCmp(prototype.id + '-paggin').setStore(res.data);

                // <editor-fold defaultstate="collapsed" desc="paggin">
                var pag = Ext.getCmp(prototype.id + '-paggin');
                var pagData = pag.getPageData();
                var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                var total = Ext.util.Format.number(pagData.total, '0,000');
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                // </editor-fold>

            }
        });
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
                    /*case "PAPINT" : case "PARINT" :
                     if (this.getValue('cbxDatePeriod')==='') {
                     this.msjAlert='Enter correct data.';
                     return false;
                     }
                     break;*/
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
        var mod = this;
        Ext.Ajax.request({
            url: prototype.url + '/Maintance',
            method: 'POST',
            timeout: 60000000,
            params: this.beanOption,

            beforerequest: Ext.getCmp('DataEntryAccountingMasterTravelbankForm').mask('Loading...'),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msg = res.intResult;
                    /*var cbxModulo = mod.getValue('cbxModulo');
                     if(cbxModulo==='PSALES')
                     {
                     var lstGroups = res.lstGroups;
                     if(lstGroups.length>0)
                     {
                     var groups = '';
                     for(var i=0 ; i<lstGroups.length; i++)
                     {
                     if(i<(lstGroups.length-1))
                     groups+=lstGroups[i].A1955ERRLG+',';
                     else
                     groups+=lstGroups[i].A1955ERRLG;
                     }
                     msg = 'Observed Groups: ' + groups 
                     }
                     }*/

                    var icon = 1;
                    if (msg === 'RECORD EXISTS') {
                        icon = 2;
                    }
                    global.Msg({
                        msg: msg,
                        icon: icon,
                        fn: function () {
                            if (msg === 'RECORD INSERTED') {
                                Ext.getCmp('DataEntryAccountingMasterTravelbankForm').close(),
                                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                            }
                        }
                    });
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                Ext.getCmp('DataEntryAccountingMasterTravelbankForm').unmask();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp('DataEntryAccountingMasterTravelbankForm').unmask();
            }
        });
    },

    crudPending: function () {
        Ext.Ajax.request({
            url: prototype.url + '/MaintancePending',
            method: 'POST',
            timeout: 60000000,
            params: this.beanOption,
            beforerequest: Ext.getCmp('DataEntryAccountingMasterTravelbankForm').mask('Loading...'),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msg = res.intResult;
                    var icon = 1;
                    if (msg === 'RECORD EXISTS') {
                        icon = 2;
                    }
                    global.Msg({
                        msg: msg,
                        icon: icon,
                        fn: function () {
                            if (msg === 'RECORD INSERTED') {
                                Ext.getCmp('DataEntryAccountingMasterTravelbankForm').close(),
                                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                            }
                        }
                    });
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                Ext.getCmp('DataEntryAccountingMasterTravelbankForm').unmask();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp('DataEntryAccountingMasterTravelbankForm').unmask();
            }
        });
    },

    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
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
                IN_FECHA_PROCESO = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtProcessDate').getValue(), 'Ymd');
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
    },
    limpiarCampos: function () {
        var mes = new Date().getMonth() + 1;
        if (mes < 10)
            mes = "0" + mes;
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue(mes);
        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(new Date().getFullYear());
        this.setValue("txtProcessDate", "");
    },
    setReverse: function (objDT) {
        Ext.Ajax.request({
            url: prototype.url + '/searchReversa',
            method: 'POST',
            timeout: 60000000,
            params: dataentryParams,
            //beforerequest: Ext.getCmp('DataEntryAccountingMasterTravelbankForm').mask('Loading...'),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.create('Ext.Praxis.view.travelbank.AccountingMasterTravelbankForm.DataEntryReverse', {
                        id: 'DataEntryReverseAccountingMasterTravelbankForm',
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
                //Ext.getCmp('DataEntryAccountingMasterTravelbankForm').unmask();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                //Ext.getCmp('DataEntryAccountingMasterTravelbankForm').unmask();
            }
        });
    }
});

