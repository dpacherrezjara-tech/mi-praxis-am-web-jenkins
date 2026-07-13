Ext.define('Ext.Praxis.controller.flown.FlightConciliation.DataEntryA3729Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryA3729Controller',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    oldCHAIR: '',
    oldTICKET: '',
    oldCoupon: '',
    // </editor-fold>
    init: function (view) {
        prototype.id = 'FlightConciliationForm';
        prototype.url = CONTEXTPATH + '/FlightConciliation';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        console.log(this.bean);
    },
    afterRender: function () {
        this.obtainData();
        switch (this.actionCode) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                this.DeshabilitarCampoClaveInsert();
                this.mostrarDataInsert(this.bean.data);
                break;
            case 'U':
                this.mostrarData(this.bean.data);
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    obtainData: function () {
        var cmbTPAX = Ext.getCmp(prototype.id + '-cmbTPAX');
        cmbTPAX.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "None"],
                ["A", "Adult"],
                ["C", "Children"],
                ["I", "Infant"]
            ]
        }));
        
         var cmbTPAXV = Ext.getCmp(prototype.id + '-cmbTPAXV');
        cmbTPAXV.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "None"],
                ["A", "Adult"],
                ["C", "Children"],
                ["I", "Infant"]
            ]
        }));

        var cmbSTVAL = Ext.getCmp(prototype.id + '-cmbSTVAL');
        cmbSTVAL.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["0", "Conciliado"],
                ["1", "No conciliado"],
                ["2", "Duplicado"]
            ]
        }));

        var cmbSTVCR = Ext.getCmp(prototype.id + '-cmbSTVCR');
        cmbSTVCR.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["Y", "Yes"],
                ["", "No"]
            ]
        }));

        var cmbFSALES = Ext.getCmp(prototype.id + '-cmbFSALES');
        cmbFSALES.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "None"],
                ["0", "Existe"],
                ["1", "No existe"]
            ]
        }));

        var cmbFSABRE = Ext.getCmp(prototype.id + '-cmbFSABRE');
        cmbFSABRE.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "None"],
                ["0", "Not Found"],
                ["1", "Found"],
                ["2", "Found but not matching coupon"],
                ["4", "No Revenue(Employes/Oth)"],
                ["5", "Manual"],
                ["6", "BPO Found"],
            ]
        }));

    },
    mostrarData: function (record) {
        meDE.oldCHAIR = record.CHAIR;
        meDE.oldTICKET = record.TKT_A1691;
        meDE.oldCoupon = record.CUPON_A1691;


        this.setValue('txtTICKET', record.TKT_A1691);
        this.setValue('txtCUPON', record.CUPON_A1691);
        this.setValue('txtSEQ', record.SEQ);

        this.setValue('txtDFLIGHT', record.DFLIGHT);
        this.setValue('txtNFLIGHT', record.NFLIGHT);

//        if(record.TPAX.trim() === 'A'){
//            this.setValue('cmbTPAX', 'Adult');
//        }else if(record.TPAX.trim() === 'C'){
//            this.setValue('cmbTPAX', 'Children');
//        }else if(record.TPAX.trim() === 'I'){
//            this.setValue('cmbTPAX', 'Infant');
//        }

        this.setValue('cmbTPAX', record.TPAX);
        this.setValue('cmbTPAXV', record.TPAX_V);

        this.setValue('txtCDEPART', record.CDEPART);
        this.setValue('txtCARRIVA', record.CARRIVA);
        this.setValue('txtCHAIR', record.CHAIR);


        this.setValue('txtLNAME', record.LNAME);
        this.setValue('txtFNAME', record.FNAME);

        this.setValue('cmbSTVAL', record.STVAL);
        this.setValue('cmbSTVCR', record.STVCR);
        this.setValue('cmbFSALES', record.FSALES);
        this.setValue('cmbFSABRE', record.FSABRE);
        this.setValue('txtSTASABR', record.STASABR);

        this.setValue('txtUSCR', record.USCR);
        this.setValue('txtFECR', record.FECR);
        this.setValue('txtHOCR', record.HOCR);
        this.setValue('txtUSUP', record.USUP);
        this.setValue('txtFEUP', record.FEUP);
        this.setValue('txtHOUP', record.HOUP);
    },
    mostrarDataInsert: function (record) {
        console.log(record, "TRAIGO ESTO DE LA GRILLA");

        this.setValue('txtDFLIGHT', record.DFLIGHT);
        this.setValue('txtNFLIGHT', record.NFLIGHT);
        this.setValue('txtCDEPART', record.CDEPART);
        this.setValue('txtCARRIVA', record.CARRIVA);

        var cmbTPAX = Ext.getCmp(prototype.id + '-cmbTPAX');
        cmbTPAX.setValue('');

        var cmbSTVAL = Ext.getCmp(prototype.id + '-cmbSTVAL');
        cmbSTVAL.setValue('1');

        var cmbSTVCR = Ext.getCmp(prototype.id + '-cmbSTVCR');
        cmbSTVCR.setValue('');

        var cmbFSALES = Ext.getCmp(prototype.id + '-cmbFSALES');
        cmbFSALES.setValue('');

        var cmbFSABRE = Ext.getCmp(prototype.id + '-cmbFSABRE');
        cmbFSABRE.setValue('');
    },
    DeshabilitarCampoClaveInsert: function () {
        Ext.getCmp(prototype.id + '-txtTICKET').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtCUPON').setReadOnly(false);
        Ext.getCmp(prototype.id + '-cmbTPAX').setReadOnly(false);

        Ext.getCmp(prototype.id + '-txtTICKET_2').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtCUPON_2').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtSEQ_2').setReadOnly(true);
        Ext.getCmp(prototype.id + '-chkClearTkt').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtSEQ').setReadOnly(true);

        Ext.getCmp(prototype.id + '-txtDFLIGHT').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtNFLIGHT').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtCDEPART').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtCARRIVA').setReadOnly(true);

        Ext.getCmp(prototype.id + '-cmbSTVAL').setReadOnly(false);
        Ext.getCmp(prototype.id + '-cmbSTVCR').setReadOnly(false);
        Ext.getCmp(prototype.id + '-cmbFSALES').setReadOnly(false);
        Ext.getCmp(prototype.id + '-cmbFSABRE').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtSTASABR').setReadOnly(false);
    },
    onSaveClick: function (btn) {

        if (!this.validarCamposObligatorios()) {
            return;
        }

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to create ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            animateTarget: btn,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarDataInsert(beanTemp);
                    beanTemp.option = 'I';
                    this.MaintenanceA3729INSERT(beanTemp);
                }
            }
        });
    },
    validarCamposObligatoriosUpdate: function () {
        var campos = [
            {id: 'txtCHAIR', nombre: 'Chair'}
        ];

        for (var i = 0; i < campos.length; i++) {
            var valor = this.getValue(campos[i].id);

            if (!valor || valor.trim() === '') {

                Ext.toast({
                    html: 'The field <b>' + campos[i].nombre + '</b> is required.',
                    title: '.:PRAXIS:.',
                    align: 't',
                    slideInDuration: 200,
                    minWidth: 250,
                    autoCloseDelay: 2500
                });

                this.focus(campos[i].id);
                return false;
            }

        }

        return true;
    },
    validarCamposObligatorios: function () {
        var campos = [
            {id: 'txtTICKET', nombre: 'Ticket'},
            {id: 'txtCUPON', nombre: 'Cupon'},
            {id: 'txtLNAME', nombre: 'Last Name'},
            {id: 'txtFNAME', nombre: 'First Name'},
            {id: 'txtCHAIR', nombre: 'Chair'}
        ];

        for (var i = 0; i < campos.length; i++) {
            var valor = this.getValue(campos[i].id);

            if (!valor || valor.trim() === '') {

                Ext.toast({
                    html: 'The field <b>' + campos[i].nombre + '</b> is required.',
                    title: '.:PRAXIS:.',
                    align: 't',
                    slideInDuration: 200,
                    minWidth: 250,
                    autoCloseDelay: 2500
                });

                this.focus(campos[i].id);
                return false;
            }

        }

        return true;
    },
    llenarDataInsert: function (beanTemp) {
        beanTemp.TICKET = this.getValue("txtTICKET");
        beanTemp.CUPON = this.getValue("txtCUPON");
        beanTemp.SEQ = this.getValue("txtSEQ");
        beanTemp.LNKMVLO = this.bean.data.LNKMVLO;
        beanTemp.DFLIGHT = this.getValue("txtDFLIGHT");
        beanTemp.NFLIGHT = this.getValue("txtNFLIGHT");
        beanTemp.TPAX = this.getValue("cmbTPAX");
        beanTemp.CDEPART = this.getValue("txtCDEPART");
        beanTemp.CARRIVA = this.getValue("txtCARRIVA");
        beanTemp.CHAIR = this.getValue("txtCHAIR");
        beanTemp.LNAME = this.getValue("txtLNAME").trim();
        beanTemp.FNAME = this.getValue("txtFNAME").trim();
        beanTemp.STVAL = this.getValue("cmbSTVAL");
        beanTemp.STVCR = this.getValue("cmbSTVCR");
        beanTemp.FSALES = this.getValue("cmbFSALES");
        if (beanTemp.FSALES === null) {
            beanTemp.FSALES = '';
        }
        beanTemp.FSABRE = this.getValue("cmbFSABRE");
        if (beanTemp.FSABRE === null) {
            beanTemp.FSABRE = '';
        }
        beanTemp.STASABR = this.getValue("txtSTASABR").trim();
        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();
        console.log(beanTemp, 'DATOS DEL INSERT');
    },
    MaintenanceA3729INSERT: function (beanTemp) {
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA3729INSERT',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-DataEntryA3729').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-DataEntryA3729').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-DataEntryA3729').unmask();
                    Ext.getCmp(prototype.id + '-DataEntryA3729').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                } else {
                    global.Msg({msg: ''});
                }
            }
        });
    },
//    AAAAAAAAAAAAAAAAAAAAA

    llenarData: function (beanTemp) {

        beanTemp.OLD_CHAIR = meDE.oldCHAIR;
        beanTemp.OLD_TICKET = meDE.oldTICKET;
        beanTemp.OLD_COUPON = meDE.oldCoupon;
        beanTemp.TICKET = this.getValue("txtTICKET");
        beanTemp.TICKET_2 = this.getValue("txtTICKET_2");
        beanTemp.CUPON = this.getValue("txtCUPON");
        beanTemp.CUPON_2 = this.getValue("txtCUPON_2");
        beanTemp.SEQ = this.getValue("txtSEQ");
        beanTemp.SEQ_2 = this.getValue("txtSEQ_2").padStart(5, '0');

        beanTemp.LNKMVLO = this.bean.data.LNKMVLO;

        beanTemp.DFLIGHT = this.getValue("txtDFLIGHT");
        beanTemp.NFLIGHT = this.getValue("txtNFLIGHT");
        beanTemp.TPAX = this.getValue("cmbTPAX");

        beanTemp.CDEPART = this.getValue("txtCDEPART");
        beanTemp.CARRIVA = this.getValue("txtCARRIVA");
        beanTemp.CHAIR = this.getValue("txtCHAIR");

        beanTemp.LNAME = this.getValue("txtLNAME").trim();
        ;
        beanTemp.FNAME = this.getValue("txtFNAME").trim();
        ;

        beanTemp.STVAL = this.getValue("cmbSTVAL");
        beanTemp.STVCR = this.getValue("cmbSTVCR");
        beanTemp.FSALES = this.getValue("cmbFSALES");
        if (beanTemp.FSALES === null) {
            beanTemp.FSALES = '';
        }

        beanTemp.FSABRE = this.getValue("cmbFSABRE");
        if (beanTemp.FSABRE === null) {
            beanTemp.FSABRE = '';
        }

        beanTemp.STASABR = this.getValue("txtSTASABR").trim();
        ;

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();

        console.log(beanTemp);

    },

    getData: function () {
        var beanString = JSON.stringify(meDE.bean.data);

        Ext.Ajax.request({
            url: prototype.url + '/searchCompleteDetail',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanResult = res.result;
                meDE.mostrarData();

            }
        });
    },

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        this.setValue('txtCODSOUR', '');
        this.setValue('txtDESSOU', '');
        this.setValue('txtGRUSOR', '');
        this.setValue('txtstrGRUSOR', '');
        Ext.getCmp(prototype.id + '-lblDescripcion').setText('');
        Ext.getCmp(prototype.id + '-lblDescripcion2').setText('');
        this.setValue('txtUSCR', '');
        this.setValue('txtFECR', '');
        this.setValue('txtHOCR', '');
        this.setValue('txtUSUP', '');
        this.setValue('txtFEUP', '');
        this.setValue('txtHOUP', '');
    },
    //</editor-fold>
    onUpperValue: function (field, newValue, oldValue) {
        if (newValue) {
            field.setValue(newValue.toUpperCase());
        }
    },
    onUpdateClick: function (btn) {
        if (!this.validarCamposObligatoriosUpdate()) {
            return;
        }
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update ?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            var beanTemp = {};
                            this.llenarData(beanTemp);

//                    if( Ext.getCmp(prototype.id + '-chkManifest').getValue()){
//                        beanTemp.option = '';
//                    }else{
                            beanTemp.option = 'U';
//                    }

                            this.validTktExists(beanTemp);
                        }
                    }
                });
    },

    validTktExists: function (beanTemp) {

        console.log(beanTemp, "ESTOY ENVIANDO ESTO RAAA");
        var beanString = JSON.stringify(beanTemp);

//        if(beanTemp.option === 'U'){
        Ext.Ajax.request({
            url: prototype.url + '/validTktExists',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-DataEntryA3729').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-DataEntryA3729').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);

                if (res.success) {
                    if (res.existeTKT) {
                        global.Msg({msg: 'Ticket Already Exists'});
                    } else {
                        // Si no existe el ticket se inserta en A3729
                        meDE.MaintenanceA3729(beanTemp);
                    }
                } else {
                    global.Msg({msg: 'Error validate'});
                }
            }
        });
//        }else{
//            console.log('Sin validar ticket existe');
//            meDE.MaintenanceA3729(beanTemp);
//        }
    },

    onCancelClick: function (btn) {
        this.view.close();
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
                    this.llenarData(beanTemp);
                    beanTemp.option = 'D';
                    // beanTemp.CCUST = this.p.bean.CCUST;

                    //  beanTemp.beanString = JSON.stringify(meDE.beanResult);
                    this.validTktExists(beanTemp);

                }
            }
        });
    },

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA3729">
    MaintenanceA3729: function (beanTemp) {

        console.log('ACTUALIZAR');

        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA3729',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-DataEntryA3729').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-DataEntryA3729').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
//
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-DataEntryA3729').unmask();
                    Ext.getCmp(prototype.id + '-DataEntryA3729').close();

//                    if( Ext.getCmp(prototype.id + '-chkManifest').getValue()){
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
//                    }
                } else
                    global.Msg({msg: ''});
            }
        });
    },
    //</editor-fold>

    validacionInsert: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtCODE") === '' || this.getValue("de-txtCODEBANK") === '' || this.getValue("de-txtCOUNTRY") === '' || this.getValue("de-txtCURRENC") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {

        Ext.getCmp(prototype.id + '-txtTICKET').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtCUPON').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtSEQ').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtCHAIR').setReadOnly(false);

        Ext.getCmp(prototype.id + '-txtTICKET_2').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtCUPON_2').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtSEQ_2').setReadOnly(true);
    },
    Habilitarlbl: function () {
        Ext.getCmp(prototype.id + '-lblDescripcion').show();
        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function () {
        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
            Ext.getCmp(prototype.id + '-lbldes').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes').show();
        }
    },
    Habilitarlbl1: function () {
        Ext.getCmp(prototype.id + '-lbldes').hide();
        if (this.getValue("txtCODSOUR") === '') {
            Ext.getCmp(prototype.id + '-lbldes2').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes2').show();
        }
    },
    onClearTicketAndCupon: function (chk, newValue, oldValue) {

        let txtTicket = Ext.getCmp(prototype.id + '-txtTICKET');
        let txtCupon = Ext.getCmp(prototype.id + '-txtCUPON');
        let txtTicket2 = Ext.getCmp(prototype.id + '-txtTICKET_2');
        let txtCupon2 = Ext.getCmp(prototype.id + '-txtCUPON_2');
        let txtSequence2 = Ext.getCmp(prototype.id + '-txtSEQ_2');

        // 1. Limpiar/restaurar valores
        if (newValue) {
            txtTicket.setValue('');
            txtCupon.setValue('');
            txtTicket2.setValue('');
            txtCupon2.setValue('');
            txtSequence2.setValue('');
        } else {
            txtTicket.setValue(meDE.oldTICKET || '');
            txtCupon.setValue(meDE.oldCoupon || '');
        }

        // 2. Bloquear / desbloquear campos
        var camposLock = [
            '-txtTICKET_2',
            '-txtCUPON_2',
            '-txtSEQ_2',
            '-txtNFLIGHT',
            '-txtCHAIR',
            '-txtLNAME',
            '-txtFNAME',
            '-cmbTPAX'
        ];

        camposLock.forEach(function (campoId) {
            var cmp = Ext.getCmp(prototype.id + campoId);
            if (cmp) {
                cmp.setReadOnly(newValue);
            }
        });

        console.log("Campos bloqueados:", newValue);
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