Ext.define('Ext.Praxis.controller.travelbank.FilesIssuesUses.FileUsedDataEntryDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FileUsedDataEntryDetailController',
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
//                Ext.getCmp(prototype.id09+'-btn-save').hide();
//                Ext.getCmp(prototype.id09+'-btn-update').hide();
//                if(this.p.rec.data.ESTADO === 'Error'){
//                    Ext.getCmp(prototype.id09+'-btn-delete').show();
//                }else{
//                    Ext.getCmp(prototype.id09+'-btn-delete').hide();
//                }                            
//                Ext.getCmp(prototype.id09+'-btn-cancel').show();
                break;
//            case 'I':
//                Ext.getCmp(prototype.id09+'-btn-save').show();
//                Ext.getCmp(prototype.id09+'-btn-update').hide();
//                Ext.getCmp(prototype.id09+'-btn-delete').hide();
//                Ext.getCmp(prototype.id09+'-btn-cancel').show();
//                break;

        }
//        global.AccessControlMaganer();

    },

    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function (rec) {
        console.log(rec);
        this.setFormatParameter(rec);
//        // <editor-fold defaultstate="collapsed" desc="DataHeader">        
        this.setValue('A4283IDUSE', rec.get('A4283IDUSE'));
        this.setValue('A4283NCTA', rec.get('A4283NCTA'));        
        this.setValue('A4283PRDA', rec.get('A4283PRDA'));
        this.setValue('A4283MDA', rec.get('A4283MDA'));
        this.setValue('A4283REF', rec.get('A4283REF'));       
        this.setValue('TktNumber', rec.get('A4283CIA') + rec.get('A4283FORMA')+ rec.get('A4283SERIE')  );       
        this.setValue('A4283VALOR', Ext.util.Format.number(rec.get('A4283VALOR'), '0,000.00'));
        
//        this.setValue('A4281MOT', rec.get('A4281MOT'));
//        this.setValue('A4281TIPD', rec.get('A4281TIPD'));
//        this.setValue('A4281FEMI', rec.get('A4281FEMI'));
//        this.setValue('A4281FEXP', rec.get('A4281FEXP'));
//        this.setValue('ticket-number', rec.get('A4281CIA')+rec.get('A4281FORMA')+rec.get('A4281SERIE'));   
//        this.setValue('A4281IDISR', rec.get('A4281IDISR'));
////        //Accounting & Audit Data        
//        this.setValue('A4281REGIS', rec.get('A4281REGIS'));
//        this.setValue('A4281FREGI', rec.get('A4281FREGI'));
//        this.setValue('A4281HREGI', rec.get('A4281HREGI'));
//        this.setValue('A4281REVIS', rec.get('A4281REVIS'));
//        this.setValue('A4281FREVI', rec.get('A4281FREVI'));
//        this.setValue('A4281HREVI', rec.get('A4281HREVI'));
//        // </editor-fold>         
        this.setGridDataDetalle('');
    },

    // </editor-fold>   
     // <editor-fold defaultstate="collapsed" desc="setGridDataDetalle">
    setGridDataDetalle: function (vmode) {
        var me = this;
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
        //Ext.getCmp(prototype.id07 + '-gridFileIssueDetail-Container').mask('Cargando...', '');
        var storeGridDatas = Ext.create('Ext.Praxis.store.travelbank.AccountingMasterTravelbank.GridData', {
            proxy: {
                url: prototype.url + '/searchUsedDetalleN2'
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
        
        Ext.getCmp(prototype.id09 + '-gridDataDetail').setStore(storeGridDatas);
        Ext.getCmp(prototype.id09 + '-gridDataDetail').getStore().reload();
        Ext.getCmp(prototype.id09 + '-paggin').setStore(storeGridDatas);
        
    },
    // </editor-fold> 
    
    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function (rec) {
        var me = this;
        //console.log(rec);        
        me.detalleSearchParams = {
            VP_OPCION: '0',
            VP_PRDA: rec.get('A4283PRDA'),
            VP_MDA: rec.get('A4283MDA'),
            VP_SQDIA: rec.get('A4283SQDIA'),
            VP_IDUSE: rec.get('A4283IDUSE'),
            VP_Document: '',
            VP_NCTA: '',
            VP_IDISS: ''            
        };
//        filter.VP_OPCION = request.getParameter("VP_OPCION");
//        filter.VP_PRDA = request.getParameter("VP_PRDA");
//        filter.VP_MDA = request.getParameter("VP_MDA");
//        filter.VP_SQDIA = request.getParameter("VP_SQDIA");
//        filter.VP_IDUSE = request.getParameter("VP_IDUSE");
//        filter.VP_Document = request.getParameter("VP_Document");
//        filter.VP_NCTA = request.getParameter("VP_NCTA");
//        filter.VP_IDISS = request.getParameter("VP_IDISS");

        // <editor-fold defaultstate="collapsed" desc="llenarData">
        
//        var cmbfiltro = this.getValue('cmbfiltroDataEntry');
//        me.detalleSearchParams.VP_OPCION = cmbfiltro;
//        switch (cmbfiltro) {
//            case "1" :
//                me.detalleSearchParams.VP_IDISS = Ext.getCmp(prototype.id09 + '-A4281IDISS-Filter').getValue();
//                break;
//            case '2':
//                me.detalleSearchParams.VP_Document = Ext.getCmp(prototype.id09 + '-DocumentTKT-Filter').getValue();
//                break;
//            case '3':
//                me.detalleSearchParams.VP_IDISS = Ext.getCmp(prototype.id09 + '-A4281IDISR-Filter').getValue();
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
//                                        Ext.getCmp(prototype.id09 + '-btnSearch').fireEvent('click', {});
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
        return Ext.getCmp(prototype.id09 + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id09 + '-' + id).focus();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id09 + '-' + id).setValue(txt);
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
                IN_FECHA_PROCESO = Ext.util.Format.date(Ext.getCmp(prototype.id09 + '-txtProcessDate').getValue(), 'Ymd');
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
    // <editor-fold defaultstate="collapsed" desc="Info">
    btnAdd_click: function () {
        this.winDataEntry('I');
    },
    onEditA4283N2Click: function (grid, rowIndex) {
        console.log('onEditA4283N2Click...');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function (action, rec) {       
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.UsedForm.FileUsedDataEntryDetailN2', {
            id: 'FileUsedDataEntryDetailN2',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    }
    // </editor-fold>
});




