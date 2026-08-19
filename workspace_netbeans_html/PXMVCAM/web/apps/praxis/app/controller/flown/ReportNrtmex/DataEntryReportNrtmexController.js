Ext.define('Ext.Praxis.controller.flown.ReportNrtmex.DataEntryReportNrtmexController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryReportNrtmexController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    copia: '',
    // </editor-fold>
    
    init: function (view) {
        prototype.id = 'ReportNrtmexForm';
        prototype.url = CONTEXTPATH + '/ReportNrtmex';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        this.lst = this.p.lst;
//        console.log(this.p);
//        this.obtainData();
    },
    afterRender: function () {
//        console.log('afterRender');
        this.obtainData();
        switch (this.actionCode) {
            case 'I':
                this.setearCamposClave();
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
//                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.getData();
                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
//                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {
        console.log(meDE.beanResult);
        this.setValue('de-cmbSTATUS', this.beanResult.STVAL);
        this.setValue('de-txtTICKET', this.beanResult.CCIA + this.beanResult.FORMA + this.beanResult.SERIE);
        this.setValue('de-txtCUPON', this.beanResult.CUPON);//Cortar
        this.setValue('de-txtSEQ', this.beanResult.SEQ);
        this.setValue('de-txtSEQROL', this.beanResult.SEQRO);
        this.setValue('de-txtORIG', this.beanResult.ORIG);
        this.setValue('de-txtDEST', this.beanResult.DEST);
        this.setValue('de-txtSDATE', this.beanResult.strFormatDate);
        this.setValue('de-txtCOUNTRY', this.beanResult.SCOUNTRY);
        this.setValue('de-txtAGENT', this.beanResult.AGENTE);
        this.setValue('de-txtRFIC', this.beanResult.RFIC);
        this.setValue('de-txtRECODE', this.beanResult.RECODE);
        this.setValue('de-txtFDESCRIP', this.beanResult.DESC_RECODE);
        this.setValue('de-txtRDATE', this.beanResult.descRDATE);
        this.setValue('de-txtFCONT', this.beanResult.descFCONT);
        this.setValue('de-txtIDCON', this.beanResult.IDCON);
        
        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },
    obtainData: function () {
        var cmbSTATUS = Ext.getCmp(prototype.id + '-de-cmbSTATUS');
        cmbSTATUS.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["0", "Venta sin Uso"],
                ["1", "Uso sin Venta"],
                ["2", "MATCH"]
            ]
        }));
        cmbSTATUS.setValue('');

    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {
        
        beanTemp.STVAL = this.getValue("de-cmbSTATUS").trim();
        beanTemp.TICKET = this.getValue("de-txtTICKET").trim();
        beanTemp.CUPON = this.getValue("de-txtCUPON").trim();
        beanTemp.SEQ = this.getValue("de-txtSEQ").trim();
        beanTemp.SEQRO = this.getValue("de-txtSEQROL").trim();
        beanTemp.ORIG = this.getValue("de-txtORIG").trim();
        beanTemp.DEST = this.getValue("de-txtDEST").trim();
//        beanTemp.SDATE = this.getValue("de-txtSDATE").trim();
        beanTemp.DSALES = this.beanResult.DSALES;
        beanTemp.SCOUNTRY = this.getValue("de-txtCOUNTRY").trim();
        beanTemp.AGENTE = this.getValue("de-txtAGENT").trim();
        beanTemp.RFIC = this.getValue("de-txtRFIC").trim();
        beanTemp.RECODE = this.getValue("de-txtRECODE").trim();
        beanTemp.DESC_RECODE = this.getValue("de-txtFDESCRIP").trim();
//        beanTemp.RDATE = this.getValue("de-txtRDATE").trim();
        beanTemp.RDATE = this.beanResult.RDATE;
//        beanTemp.FCONT = this.getValue("de-txtFCONT").trim();
        beanTemp.FCONT = this.beanResult.FCONT;
        beanTemp.IDCON = this.getValue("de-txtIDCON").trim();

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();
    },
    getData: function () {
        meDE.bean.data.IN_TICKET = meDE.bean.data.strTicket.substr(0, 3) +  meDE.bean.data.strTicket.substr(4, 4) + meDE.bean.data.strTicket.substr(8, 6);
        var beanString = JSON.stringify(meDE.bean.data);
        console.log(beanString);
        Ext.Ajax.request({
            url: prototype.url + '/search',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanResult = res.data[0];
                console.log(meDE.beanResult);
                meDE.mostrarData();
            }
        });
    },
    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        //this.setValue('txtCODSOUR', '');

    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to insert ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    var msjResult = this.validacionInsert(beanTemp);
                    if (msjResult === '') {
                        beanTemp.option = 'I';
                        beanTemp.beanString = JSON.stringify(beanTemp);
                        this.MaintenanceA4479(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
//        var msj = this.validateDates();

//        if (msj === '') {
            Ext.Msg.show(
                    {
                        title: '.:PRAXIS:.',
                        msg: 'Are you sure to update?',
                        buttons: Ext.MessageBox.YESNO,
                        scope: this,
                        animateTarget: btn,
                        icon: Ext.MessageBox.QUESTION,
                        modal: true,
                        fn: function (btn) {
                            if (btn === 'yes') {
                                var beanTemp = {};
                                this.llenarData(beanTemp);
                                beanTemp.option = 'U';
                                beanTemp.beanString = JSON.stringify(beanTemp);
                                this.MaintenanceA4479(beanTemp);
                            }
                        }
                    });
//        } else {
//            global.Msg({msg: msj});
//        }

    },
    validateDates: function () {
//        var DATINI = this.getValue("de-txtINI");
//        var DATFIN = this.getValue("de-txtFIN");
//        var msj = '';
//
//        if (DATINI.length === 8 && DATFIN.length === 8) {
//            if (DATFIN < DATINI) {
//                msj = 'Error in dates';
//            }
//        } else {
//            msj = 'Error in date lenghts'
//        }
//
//        return msj;
    },
    onDeleteClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    beanTemp.option = 'D';
                    beanTemp.beanString = JSON.stringify(meDE.beanResult);
                    this.MaintenanceA4479(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>
    //<editor-fold defaultstate="collapsed" desc="MaintenanceA4479">
    MaintenanceA4479: function (beanTemp) {
        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA4479',
            method: 'POST',
            timeout: 60000000,
            params: beanTemp,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    Ext.getCmp(prototype.id + '-dataEntry').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                } else {
                    global.Msg({msg: 'An error occurred'});
                }
            }
        });
//        global.Msg({msg: 'Under Construction'});
    },
    //</editor-fold>

    validacionInsert: function (beanTemp) {
//        var msjResult = '';
//        if (this.getValue("de-txtCodeTable") === '' /* || this.getValue("de-txtCant1") === '' || this.getValue("de-txtCant2") === '' */ || this.getValue("de-txtCDesc1") === '' || this.getValue("cmbDoc") === '') {
//            msjResult = "You must enter the required field.";
//        }
//        return msjResult;
    },
    DeshabilitarCampoClave: function () {
//        Ext.getCmp(prototype.id + '-de-txtCodeTable').setReadOnly(true);
    },
    setearCamposClave: function () {
//        Ext.getCmp(prototype.id + '-de-txtCodeTable').setValue('89');
        //Ext.getCmp(prototype.id + '-de-txtCodeTable').setReadOnly(true);
    },
    Habilitarlbl: function () {
//        Ext.getCmp(prototype.id + '-lblDescripcion').show();
//        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
//        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function () {
//        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
//            Ext.getCmp(prototype.id + '-lbldes').hide();
//        } else {
//            Ext.getCmp(prototype.id + '-lbldes').show();
//        }
    },
    Habilitarlbl1: function () {
//        Ext.getCmp(prototype.id + '-lbldes').hide();
//        if (this.getValue("txtCODSOUR") == '') {
//            Ext.getCmp(prototype.id + '-lbldes2').hide();
//        } else {
//            Ext.getCmp(prototype.id + '-lbldes2').show();
//        }
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
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
//            this.btnSearch_click();
        }
    }
// </editor-fold>
});