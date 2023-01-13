Ext.define('Ext.Praxis.controller.flown.FlightConciliation.DataEntryA3729Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryA3729Controller',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanEdit: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function(view) {
        prototype.id = 'FlightConciliationForm';
        prototype.url = CONTEXTPATH + '/FlightConciliation';
        meDE = this;
        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec;
        
        console.log(this.bean);
        
    },
    afterRender: function() {
        
        this.obtainData();
        switch (this.actionCode) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
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
    mostrarData: function(record) {
        console.log(record);

        this.setValue('txtTICKET', record.strTicket.substring(0,13));
        this.setValue('txtCUPON', record.strTicket.substring(14));
//        this.setValue('txtSEQ', record.SEQ);
        
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
    obtainData: function() {

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
//        cmbTPAX.setValue('');

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
//        cmbSTVAL.setValue('2');

        var cmbSTVCR = Ext.getCmp(prototype.id + '-cmbSTVCR');
        cmbSTVCR.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["Y", "Yes"],
                ["", "No"]
            ]
        }));
//        cmbSTVCR.setValue('Y');
        
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
//        cmbFSALES.setValue('1');
        
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
//        cmbFSABRE.setValue('0');

    },
    
    llenarData: function(beanTemp, chk) {
        
        beanTemp.TICKET = this.getValue("txtTICKET");
        beanTemp.CUPON = this.getValue("txtCUPON");
        
        if(chk){
            beanTemp.TICKET_2 = '';
            beanTemp.CUPON_2 = '';
            beanTemp.LNKMVLO = 'EDIT';
        }else{
            beanTemp.TICKET_2 = this.getValue("txtTICKET_2");
            beanTemp.CUPON_2 = this.getValue("txtCUPON_2");
            beanTemp.LNKMVLO = this.bean.data.LNKMVLO;
        }
        
        beanTemp.SEQ = this.bean.data.SEQ;
        
        beanTemp.DFLIGHT = this.getValue("txtDFLIGHT");
        beanTemp.NFLIGHT = this.getValue("txtNFLIGHT");
        beanTemp.TPAX = this.getValue("cmbTPAX");
        
        beanTemp.CDEPART = this.getValue("txtCDEPART");
        beanTemp.CARRIVA = this.getValue("txtCARRIVA");
        beanTemp.CHAIR = this.getValue("txtCHAIR");

        beanTemp.LNAME = this.getValue("txtLNAME").trim();;
        beanTemp.FNAME = this.getValue("txtFNAME").trim();;
        
        beanTemp.STVAL = this.getValue("cmbSTVAL");
        beanTemp.STVCR = this.getValue("cmbSTVCR");
        beanTemp.FSALES = this.getValue("cmbFSALES");
        if(beanTemp.FSALES === null){
            beanTemp.FSALES = '';
        }
        
        beanTemp.FSABRE = this.getValue("cmbFSABRE");
        if(beanTemp.FSABRE === null){
            beanTemp.FSABRE = '';
        }
        
        beanTemp.STASABR = this.getValue("txtSTASABR").trim();;

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();

        console.log(beanTemp);

    },
    
    llenarData_edit: function(beanTemp) {

        beanTemp.TICKET = this.bean.data.strTicket.substring(0,13);
        beanTemp.TICKET_2 = '';
        beanTemp.CUPON = this.bean.data.strTicket.substring(14,15);
        beanTemp.CUPON_2 = '';
        
        beanTemp.SEQ = this.bean.data.SEQ;
        beanTemp.LNKMVLO = 'EDIT';
        
        beanTemp.DFLIGHT = this.bean.data.DFLIGHT;
        beanTemp.NFLIGHT = this.bean.data.NFLIGHT;
        beanTemp.TPAX =this.bean.data.TPAX;
        
        beanTemp.CDEPART = this.bean.data.CDEPART;
        beanTemp.CARRIVA = this.bean.data.CARRIVA;
        beanTemp.CHAIR = this.bean.data.CHAIR;

        beanTemp.LNAME = this.bean.data.LNAME;
        beanTemp.FNAME = this.bean.data.FNAME;
        
        beanTemp.STVAL = this.bean.data.STVAL;
        beanTemp.STVCR = this.bean.data.STVCR;
        beanTemp.FSALES = this.bean.data.FSALES;
        if(beanTemp.FSALES === null){
            beanTemp.FSALES = '';
        }
        
        beanTemp.FSABRE = this.bean.data.FSABRE;
        if(beanTemp.FSABRE === null){
            beanTemp.FSABRE = '';
        }
        
        beanTemp.STASABR = this.bean.data.STASABR;

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();

        console.log(beanTemp);

    },
    
    getData: function() {
        var beanString = JSON.stringify(meDE.bean.data);

        Ext.Ajax.request({
            url: prototype.url + '/searchCompleteDetail',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            params: {beanString: beanString},
            success: function(response, options) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanResult = res.result;
                meDE.mostrarData();

            }
        });
    },

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {
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
    toUpperCase: function(obj, value, opts) {
//        console.log(obj);
//        console.log(value);
//        console.log(opts);
    },

    onUpdateClick: function(btn) {
        Ext.Msg.show(
        {
            title: '.:PRAXIS:.',
            msg: 'Are you sure to update ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            animateTarget: btn,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var chk = Ext.getCmp(prototype.id + '-chkDetail').getValue();
                    var beanTemp = {};
//                    if(chk){
//                        this.llenarData_edit(beanTemp);
//                    }else{
                        this.llenarData(beanTemp, chk);
//                    }
                    beanTemp.option = 'U';
                    
                    this.validTktExists(beanTemp);
                }
            }
        });
    },
    
    validTktExists: function(beanTemp) {
        
        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
        
//        if(beanTemp.option === 'U'){
            Ext.Ajax.request({
                url: prototype.url + '/validTktExists',
                method: 'POST',
                timeout: 60000000,
                params: {beanString: beanString},
                beforerequest: Ext.getCmp(prototype.id + '-DataEntryA3729').mask('Loading...'),
                success: function(response, opts) {
                    Ext.getCmp(prototype.id + '-DataEntryA3729').unmask('Loading...');
                    var res = Ext.JSON.decode(response.responseText);
                    console.log(res);

                    if (res.success) {
                        if(res.existeTKT){
                            global.Msg({msg: 'Ticket Already Exists'});
                        }else{
                            // Si no existe el ticket se inserta en A3729
                            meDE.MaintenanceA3729(beanTemp);
                        }
                    }else{
                        global.Msg({msg: 'Error validate'});
                    }
                }
            });
//        }else{
//            console.log('Sin validar ticket existe');
//            meDE.MaintenanceA3729(beanTemp);
//        }
    },
    
    
    onCancelClick: function(btn) {
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
    MaintenanceA3729: function(beanTemp) {
                
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA3729',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-DataEntryA3729').mask('Loading...'),
            success: function(response, opts) {
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

    validacionInsert: function(beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtCODE") === '' || this.getValue("de-txtCODEBANK") === '' || this.getValue("de-txtCOUNTRY") === '' || this.getValue("de-txtCURRENC") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function() {

        Ext.getCmp(prototype.id + '-txtTICKET').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtCUPON').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtTICKET_2').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtCUPON_2').setReadOnly(true);
        
        Ext.getCmp(prototype.id + '-txtDFLIGHT').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtNFLIGHT').setReadOnly(true);
        Ext.getCmp(prototype.id + '-cmbTPAX').setReadOnly(true);
        
        Ext.getCmp(prototype.id + '-txtCDEPART').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtCARRIVA').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtCHAIR').setReadOnly(true);
        
        Ext.getCmp(prototype.id + '-txtLNAME').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtFNAME').setReadOnly(true);
        
        
        Ext.getCmp(prototype.id + '-cmbSTVAL').setReadOnly(true);
        Ext.getCmp(prototype.id + '-cmbSTVCR').setReadOnly(true);
        Ext.getCmp(prototype.id + '-cmbFSALES').setReadOnly(true);
        
        Ext.getCmp(prototype.id + '-cmbFSABRE').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtSTASABR').setReadOnly(true);
    },
    
    HabilitarCampoClave: function() {

        Ext.getCmp(prototype.id + '-txtTICKET_2').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtCUPON_2').setReadOnly(false);
        
        Ext.getCmp(prototype.id + '-txtNFLIGHT').setReadOnly(false);
        Ext.getCmp(prototype.id + '-cmbTPAX').setReadOnly(false);
        
        Ext.getCmp(prototype.id + '-txtCDEPART').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtCARRIVA').setReadOnly(false);
        
        Ext.getCmp(prototype.id + '-txtLNAME').setReadOnly(true);
        Ext.getCmp(prototype.id + '-txtFNAME').setReadOnly(true);
        
        
        Ext.getCmp(prototype.id + '-cmbSTVAL').setReadOnly(false);
        Ext.getCmp(prototype.id + '-cmbSTVCR').setReadOnly(false);
        Ext.getCmp(prototype.id + '-cmbFSALES').setReadOnly(false);
        
        Ext.getCmp(prototype.id + '-cmbFSABRE').setReadOnly(false);
        Ext.getCmp(prototype.id + '-txtSTASABR').setReadOnly(false);
    },
    Habilitarlbl: function() {
        Ext.getCmp(prototype.id + '-lblDescripcion').show();
        Ext.getCmp(prototype.id + '-txtDESSOU').hide();
        Ext.getCmp(prototype.id + '-lbldes2').show();
    },
    desHabilitartxt: function() {
        if (this.getValue("txtGRUSOR") !== this.bean.GRUSOR) {
            Ext.getCmp(prototype.id + '-lbldes').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes').show();
        }
    },
    Habilitarlbl1: function() {
        Ext.getCmp(prototype.id + '-lbldes').hide();
        if (this.getValue("txtCODSOUR") === '') {
            Ext.getCmp(prototype.id + '-lbldes2').hide();
        } else {
            Ext.getCmp(prototype.id + '-lbldes2').show();
        }
    },
    
    chkDetail_ChangeValue: function() {
        
        var opc = Ext.getCmp(prototype.id + '-chkDetail').getValue();
        
        if(opc){
            this.DeshabilitarCampoClave();
        }else{
            this.HabilitarCampoClave();
        }
        
    },
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id + '-' + id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id + '-' + id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
//            this.btnSearch_click();
        }
    }
// </editor-fold>
});