Ext.define('Ext.Praxis.controller.flown.EMDStandalone.DataEntryEMDStandaloneController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryEMDStandaloneController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanEMDS: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    paramsDetail: {},
    paramsDetailEMDs: {},
    lstA1852: {},
    dataObtain: {},
    copia: '',
    // </editor-fold>
    init: function (view) {
        prototype.id = 'EMDStandaloneForm';
        prototype.url = CONTEXTPATH + '/EMDStandalone';
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
        this.setValue('de-txtCUPON', this.beanResult.CUPON);
        this.setValue('de-txtSEQ', this.beanResult.SEQ);
        this.setValue('de-txtSEQROL', this.beanResult.SEQRO);
        this.setValue('de-txtDFLIGHT', this.beanResult.strDate);
        this.setValue('de-txtRFIC', this.beanResult.RFIC);
        this.setValue('de-txtRECODE', this.beanResult.RECODE);
        this.setValue('de-txtFDESCRIP', this.beanResult.DESC_RECODE);
        this.setValue('de-txtDVCR', this.beanResult.DVCR);
        this.setValue('de-txtCOUNTRY', this.beanResult.SCOUNTRY);
        this.setValue('de-txtAGENT', this.beanResult.AGENTE);
        this.setValue('de-txtFVTA', this.beanResult.FVTA);
        this.setValue('de-txtORIG', this.beanResult.ORIG);
        this.setValue('de-txtDEST', this.beanResult.DEST);
        this.setValue('de-txtFBASE', this.beanResult.FBASE);
        this.setValue('de-txtRBD', this.beanResult.RBD);
        this.setValue('de-txtPAX', this.beanResult.QTYPAX);
        this.setValue('de-txtPTYPE', this.beanResult.TPAX);
        this.setValue('de-txtOPER', this.beanResult.TOPUS);
        this.setValue('de-txtCARRIER', this.beanResult.CARR);
        this.setValue('de-txtFCONTS', this.beanResult.FCONTS);
        this.setValue('de-txtFECVAL', this.beanResult.FECVAL);
        this.setValue('de-txtCURRENCY', this.beanResult.CURRENCY);
        this.setValue('de-txtTOTAL', this.beanResult.VCPN);
        this.setValue('de-txtVCPMX', this.beanResult.VCPMX);
        this.setValue('de-txtFCONT', this.beanResult.FCONT);
        this.setValue('de-txtIDCON', this.beanResult.IDCON);
        this.setValue('de-txtTN16', this.beanResult.TN16);
        this.setValue('de-txtTN00', this.beanResult.TN00);

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
        console.log(beanTemp);
        beanTemp.STVAL = this.getValue("de-cmbSTATUS").trim();
        beanTemp.TICKET = this.getValue("de-txtTICKET").trim();
        beanTemp.CUPON = this.getValue("de-txtCUPON").trim();
        beanTemp.SEQ = this.getValue("de-txtSEQ").trim();
        beanTemp.SEQRO = this.getValue("de-txtSEQROL").trim();
        beanTemp.DFLIGHT = this.getValue("de-txtDFLIGHT").trim();
        beanTemp.RFIC = this.getValue("de-txtRFIC").trim();
        beanTemp.RECODE = this.getValue("de-txtRECODE").trim();
        beanTemp.DESC_RECODE = this.getValue("de-txtFDESCRIP").trim();
        beanTemp.DVCR = this.getValue("de-txtDVCR").trim();
        beanTemp.SCOUNTRY = this.getValue("de-txtCOUNTRY").trim();
        beanTemp.AGENTE = this.getValue("de-txtAGENT").trim();
        beanTemp.FVTA = this.getValue("de-txtFVTA").trim();
        beanTemp.ORIG = this.getValue("de-txtORIG").trim();
        beanTemp.DEST = this.getValue("de-txtDEST").trim();
        beanTemp.FBASE = this.getValue("de-txtFBASE").trim();
        beanTemp.RBD = this.getValue("de-txtRBD").trim();
        beanTemp.QTYPAX = this.getValue("de-txtPAX").trim();
        if (beanTemp.QTYPAX === '') {
            beanTemp.QTYPAX = 0;
        }
        beanTemp.TPAX = this.getValue("de-txtPTYPE").trim();
        beanTemp.TOPUS = this.getValue("de-txtOPER").trim();
        beanTemp.CARR = this.getValue("de-txtCARRIER").trim();
        beanTemp.FCONTS = this.getValue("de-txtFCONTS").trim();
        beanTemp.CURRENCY = this.getValue("de-txtCURRENCY").trim();
        beanTemp.VCPN = this.getValue("de-txtTOTAL").trim();
        if (beanTemp.VCPN === '') {
            beanTemp.VCPN = 0;
        }
        beanTemp.TN16 = this.getValue("de-txtTN16").trim();
        beanTemp.TN00 = this.getValue("de-txtTN00").trim();
        
        beanTemp.FCONT = this.getValue("de-txtFCONT").trim();
        beanTemp.FECVAL = this.getValue("de-txtFECVAL").trim();
        beanTemp.IDCON = this.getValue("de-txtIDCON").trim();

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();
    },
    getData: function () {

        var IN_TICKET = meDE.bean.data.strTicket.substr(0, 3) + meDE.bean.data.strTicket.substr(4, 4) + meDE.bean.data.strTicket.substr(8, 6);
        var IN_TIPO = meDE.bean.data.IN_TIPO;
        var IN_DATE = '';
        var IN_STVAL = '';


        paramsDetailEMDs = {
            IN_TIPO: IN_TIPO,
            IN_DATE: IN_DATE,
            IN_STVAL: IN_STVAL,
            IN_TICKET: IN_TICKET
        };
        var beanString = JSON.stringify(paramsDetailEMDs);
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
        var msj = '';
        var RFIC = this.getValue("de-txtRFIC");
        var RECODE = this.getValue("de-txtRECODE");
//        var msj = '';

        paramsDetail = {
            RFIC: RFIC,
            RECODE: RECODE
        };
        var beanString = JSON.stringify(paramsDetail);
        Ext.Ajax.request({
            url: prototype.url + '/validateRFIC',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanResult = res.data[0];
                var total = res.total;
               
                if(total !== 0){
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
                                meDE.llenarData(beanTemp);
                                beanTemp.option = 'U';
                                beanTemp.beanString = JSON.stringify(beanTemp);
                                meDE.MaintenanceA4479(beanTemp);
                            }
                        }
                    });
                }else{
                    msj = 'RFIC or Reason Code do not exist';
                    global.Msg({msg: msj});
                }         
            }
        });
    },
    validateDates: function () {
        var RFIC = this.getValue("de-txtRFIC");
        var RECODE = this.getValue("de-txtRECODE");
        var msj = '';

        paramsDetail = {
            RFIC: RFIC,
            RECODE: RECODE
        };
        var beanString = JSON.stringify(paramsDetail);
        
        Ext.Ajax.request({
            url: prototype.url + '/validateRFIC',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanResult = res.data[0];
                console.log(meDE.beanResult);
                if (meDE.beanResult !== null) {
                    msj = 'A'
                }else{
                    msj = 'RFIC or Reason Code do not exist'
                }
                
                
            }
        });

        return msj;
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
        Ext.getCmp(prototype.id + '-de-txtTICKET').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCUPON').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtSEQ').setReadOnly(true);

        Ext.getCmp(prototype.id + '-de-txtFDESCRIP').setReadOnly(true);
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