Ext.define('Ext.Praxis.controller.travelbank.FilesIssuesUses.FileUsedDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FileUsedDataEntryController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    msjAlert: '',
    beanOption: '',
    dataentryParams: {},
    detalleSearchParams: {},
    // </editor-fold>
    init: function () {

    },
    afterRender: function () {
        this.p = this.view.params;
        switch (this.p.action) {
            case 'U':
                this.mostrarData(this.p.rec);
//                Ext.getCmp(prototype.id07+'-btn-save').hide();
//                Ext.getCmp(prototype.id07+'-btn-update').hide();
//                if(this.p.rec.data.ESTADO === 'Error'){
//                    Ext.getCmp(prototype.id07+'-btn-delete').show();
//                }else{
//                    Ext.getCmp(prototype.id07+'-btn-delete').hide();
//                }                            
//                Ext.getCmp(prototype.id07+'-btn-cancel').show();
                break;
//            case 'I':
//                Ext.getCmp(prototype.id07+'-btn-save').show();
//                Ext.getCmp(prototype.id07+'-btn-update').hide();
//                Ext.getCmp(prototype.id07+'-btn-delete').hide();
//                Ext.getCmp(prototype.id07+'-btn-cancel').show();
//                break;

        }
//        global.AccessControlMaganer();

    },
    onMostrarFiltrosChangeDataEntry: function ( ) {
//        this.limpiarCampos();
        var strOp = this.getValue('cmbfiltroDataEntry');
        switch (strOp) {
            case '1':
                Ext.getCmp(prototype.id07 + '-BoxTransactionID').show();
                Ext.getCmp(prototype.id07 + '-BoxDocumentNumber').hide();
                Ext.getCmp(prototype.id07 + '-BoxAccountNumber').hide();
                Ext.getCmp(prototype.id07 + '-BoxUniqueServiceCreditID').hide();
                Ext.getCmp(prototype.id07 + '-A4283IDUSE-Filter').focus();
                break;
            case '2':
                Ext.getCmp(prototype.id07 + '-BoxTransactionID').hide();
                Ext.getCmp(prototype.id07 + '-BoxDocumentNumber').show();
                Ext.getCmp(prototype.id07 + '-BoxAccountNumber').hide();
                Ext.getCmp(prototype.id07 + '-BoxUniqueServiceCreditID').hide();
                Ext.getCmp(prototype.id07 + '-DocumentTKT-Filter').focus();
                break;
            case '3':
                Ext.getCmp(prototype.id07 + '-BoxTransactionID').hide();
                Ext.getCmp(prototype.id07 + '-BoxDocumentNumber').hide();
                Ext.getCmp(prototype.id07 + '-BoxAccountNumber').show();
                Ext.getCmp(prototype.id07 + '-BoxUniqueServiceCreditID').hide();
                Ext.getCmp(prototype.id07 + '-A4283NCTA-Filter').focus();
                break;
            case '4':
                Ext.getCmp(prototype.id07 + '-BoxTransactionID').hide();
                Ext.getCmp(prototype.id07 + '-BoxDocumentNumber').hide();
                Ext.getCmp(prototype.id07 + '-BoxAccountNumber').hide();
                Ext.getCmp(prototype.id07 + '-BoxUniqueServiceCreditID').show();
                Ext.getCmp(prototype.id07 + '-A4283IDISS-Filter').focus();
                break;    
            default:
                Ext.getCmp(prototype.id07 + '-BoxTransactionID').hide();
                Ext.getCmp(prototype.id07 + '-BoxDocumentNumber').hide();
                Ext.getCmp(prototype.id07 + '-BoxAccountNumber').hide();
                Ext.getCmp(prototype.id07 + '-BoxUniqueServiceCreditID').hide();
                this.btnSearchDetalleClick(); //reload
                break;
        }
    },

    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function (rec) {
        this.setFormatParameter(rec);
        // <editor-fold defaultstate="collapsed" desc="DataHeader">        
        this.setValue('A4282PRDA', rec.get('A4282PRDA'));
        this.setValue('A4282MDA', rec.get('A4282MDA'));
        this.setValue('A4282TIP', rec.get('A4282TIP'));
        this.setValue('A4282TRX2', rec.get('A4282TRX2'));
        this.setValue('A4282TOT', Ext.util.Format.number(rec.get('A4282TOT'), '0,000.00'));
        //Delivery file 
        this.setValue('A4282IDFIL', rec.get('A4282IDFIL'));
        this.setValue('A4282TYPE', rec.get('A4282TYPE'));
        this.setValue('A4282STS2', rec.get('A4282STS2_1'));
        this.setValue('A4282STS', rec.get('A4282STS_1'));

        //Accounting & Audit Data
        this.setValue('A4282PCONT', rec.get('A4282PCONT'));
        this.setValue('A4282FCONT', rec.get('A4282FCONT'));
        this.setValue('A4282REGIS', rec.get('A4282REGIS'));
        this.setValue('A4282FREGI', rec.get('A4282FREGI'));
        this.setValue('A4282HREGI', rec.get('A4282HREGI'));
        this.setValue('A4282REVIS', rec.get('A4282REVIS'));
        this.setValue('A4282FREVI', rec.get('A4282FREVI'));
        this.setValue('A4282HREVI', rec.get('A4282HREVI'));
        // </editor-fold>         
        this.setGridDataDetalle('');
    },
    // </editor-fold>   

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function (rec) {
        var me = this;
        //console.log(rec);        
        me.detalleSearchParams = {
            VP_PRDA: rec.get('A4282PRDA'),
            VP_MDA: rec.get('A4282MDA'),
            VP_SQDIA: rec.get('A4282SQDIA'),
            VP_IDUSE: '',
            VP_Document: '',
            VP_NCTA: '',
            VP_IDISS: ''
        };
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var cmbfiltro = this.getValue('cmbfiltroDataEntry');
        me.detalleSearchParams.VP_OPCION = cmbfiltro;
        switch (cmbfiltro) {
            case "1" :
                me.detalleSearchParams.VP_IDUSE = Ext.getCmp(prototype.id07 + '-A4283IDUSE-Filter').getValue();
                break;
            case '2':
                me.detalleSearchParams.VP_Document = Ext.getCmp(prototype.id07 + '-DocumentTKT-Filter').getValue();
                break;
            case '3':
                me.detalleSearchParams.VP_NCTA = Ext.getCmp(prototype.id07 + '-A4283NCTA-Filter').getValue();
                break;
            case '4':
                me.detalleSearchParams.VP_IDISS = Ext.getCmp(prototype.id07 + '-A4283IDISS-Filter').getValue();
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

    // <editor-fold defaultstate="collapsed" desc="setGridDataDetalle">
    setGridDataDetalle: function (vmode) {
        var me = this;
        if (vmode === 'S') {
            if (me.detalleSearchParams.VP_OPCION !== '') {
                if (me.detalleSearchParams.VP_OPCION === '1' && me.detalleSearchParams.VP_IDUSE === '') {
                    Ext.Msg.show({title: '.:PRAXIS:.', msg: 'Enter Unique Service Credit ID', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING, fn: false});
                    return;
                }
                if (me.detalleSearchParams.VP_OPCION === '2' && me.detalleSearchParams.VP_Document === '') {
                    Ext.Msg.show({title: '.:PRAXIS:.', msg: 'Enter Document number', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING, fn: false});
                    return;
                }
                if (me.detalleSearchParams.VP_OPCION === '3' && me.detalleSearchParams.VP_NCTA === '') {
                    Ext.Msg.show({title: '.:PRAXIS:.', msg: 'Enter Account number', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING, fn: false});
                    return;
                }
                if (me.detalleSearchParams.VP_OPCION === '4' && me.detalleSearchParams.VP_IDISS === '') {
                    Ext.Msg.show({title: '.:PRAXIS:.', msg: 'Enter Unique Service Credit ID', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING, fn: false});
                    return;
                }
            }
        }
        //Ext.getCmp(prototype.id07 + '-gridFileIssueDetail-Container').mask('Cargando...', '');
        var storeGridDatas = Ext.create('Ext.Praxis.store.travelbank.AccountingMasterTravelbank.GridData', {
            proxy: {
                url: prototype.url + '/searchUsedDetalle'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.detalleSearchParams;
                },
                load: function (obj) {
                    //Ext.getCmp(prototype.id07 + '-gridFileIssueDetail-Container').unmask('Loading...', '');
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id02 + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id02 + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id02 + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id02 + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        Ext.Msg.show({title: '.:PRAXIS:.', msg: 'Data not found', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING, fn: false});
                    }
                }
            }
        });
        
        Ext.getCmp(prototype.id07 + '-gridDataDetail').setStore(storeGridDatas);
        Ext.getCmp(prototype.id07 + '-gridDataDetail').getStore().reload();
        Ext.getCmp(prototype.id07 + '-paggin').setStore(storeGridDatas);
        
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
//                                        Ext.getCmp(prototype.id07 + '-btnSearch').fireEvent('click', {});
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
        return Ext.getCmp(prototype.id07 + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id07 + '-' + id).focus();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id07 + '-' + id).setValue(txt);
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
                IN_FECHA_PROCESO = Ext.util.Format.date(Ext.getCmp(prototype.id07 + '-txtProcessDate').getValue(), 'Ymd');
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
        Ext.getCmp(prototype.id07 + '-cmbDateFromMonth').setValue(mes);
        Ext.getCmp(prototype.id07 + '-cmbDateFromYear').setValue(new Date().getFullYear());
        this.setValue("txtProcessDate", "");
    },

    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearchDetalleClick();
        }
    },
    btnSearchDetalleClick: function () {
        this.setFormatParameter(this.p.rec);
        this.setGridDataDetalle('S');
    },

    // <editor-fold defaultstate="collapsed" desc="Info">
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    onEditA4283Click: function (grid, rowIndex) {        
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.UsedForm.FileUsedDataEntryDetail', {
            id: 'FileUsedDataEntryDetail',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    }
    // </editor-fold>
});

