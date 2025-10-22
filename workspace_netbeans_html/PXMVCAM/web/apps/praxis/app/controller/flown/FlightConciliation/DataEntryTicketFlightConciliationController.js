Ext.define('Ext.Praxis.controller.flown.FlightConciliation.DataEntryTicketFlightConciliationController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryTicketFlightConciliationController',
    meEntryTick: '',
    p: {},
    statusCont: '',
    bean: {},
    beanCons: {},
    oldSEQ:'',
    FUNCION: '',
    NPROG: 'PX00000095',
    recalculoVuelo: '',
    apagar: '',
    init: function(view) {
        meEntryTick = this;
        this.p = this.view.params;
        console.log(this.p);
    },
    afterRender: function(){
        prototype.idDET = 'FlightConciliationForm';
        console.log(prototype.idDET);
        this.statusCont = (this.p && 
                  this.p.lista && 
                  this.p.lista.data && 
                  this.p.lista.data.items && 
                  this.p.lista.data.items[this.p.rowIndex] && 
                  this.p.lista.data.items[this.p.rowIndex].data && 
                  this.p.lista.data.items[this.p.rowIndex].data.strDescSTCON) || '';
        console.log(this.p.actionCode,'ACTION CODE')
        switch( this.p.actionCode ){
            case 'V':
                this.mostrarData(this.p.bean);
                if (this.p.msj !== '') {
                    global.Msg({msg: this.p.msj});
                } else {
                    if (this.p.soloValidar === 'false') {
                        if(this.FUNCION === 'UPDATE'){
                            Ext.Msg.show({
                                title: '.:PRAXIS:.',
                                msg: 'Are you sure to update?',
                                buttons: Ext.MessageBox.OKCANCEL,
                                scope: this,
                                icon: Ext.MessageBox.QUESTION,
                                modal: true,
                                fn: function(btn) {
                                    if (btn === 'ok') {
                                        me.executeOptionTkt(this.p.bean, 'U', this.recalculoVuelo);
                                    }
                                }
                            });
                        }else if(this.FUNCION === 'INSERT'){
                            Ext.Msg.show({
                                title: '.:PRAXIS:.',
                                msg: 'Are you sure to insert?',
                                buttons: Ext.MessageBox.OKCANCEL,
                                scope: this,
                                icon: Ext.MessageBox.QUESTION,
                                modal: true,
                                fn: function(btn) {
                                    if (btn === 'ok') {
                                        me.executeOptionTkt(this.p.bean, 'I', '');
                                    }
                                }
                            });
                        }
                    }
                }
                break;
            case 'I':
                this.limpiarData();
                me.validateProgram(Ext.getCmp(prototype.idDET+'-btn-save'), meEntryTick.NPROG, 'C');
                Ext.getCmp(prototype.idDET+'-btn-update').hide();
                Ext.getCmp(prototype.idDET+'-btn-delete').hide();
                this.cambiarEstadoDatosClave('Habilitar');
                break;
            case 'U':
                this.limpiarData();
                this.mostrarData(this.p.bean);
                Ext.getCmp(prototype.idDET+'-btn-save').hide();
                
                var menuUser = document.getElementById('menuUser').innerText;
                if (menuUser !== "LAGREDA") {
                    console.log(this.statusCont,'this.statusCont')
                    if (this.statusCont === 'Contabilizado.' || this.statusCont === 'Contabilizado') {
                        Ext.getCmp(prototype.idDET+'-btn-update').hide();
                    } else {
                        Ext.getCmp(prototype.idDET+'-btn-update').show();
    //                    me.validateProgram(Ext.getCmp(prototype.idDET+'-btn-update'), meEntryTick.NPROG, 'M');
                    }
    //                me.validateProgram(Ext.getCmp(prototype.idDET+'-btn-delete'), meEntryTick.NPROG, 'E');
                    this.cambiarEstadoDatosClave('Deshabilitar');
                }
                
                
                break;
            case 'S':
                this.limpiarData();
                this.mostrarData(this.p.bean);
                let showOptions = (this.p.bean.strDescSTCON || '').toString().trim();
                
                var menuUser = document.getElementById('menuUser').innerText;

                if (menuUser !== "LAGREDA") {
                    if (this.statusCont === 'Contabilizado.'  || this.statusCont === 'Contabilizado') {
                    Ext.getCmp(prototype.idDET+'-btn-update').hide();
                    } else {
                        Ext.getCmp(prototype.idDET+'-btn-update').show();
                    }
                    
                }
                
                
                

                Ext.getCmp(prototype.idDET+'-btn-save').hide();
                Ext.getCmp(prototype.idDET+'-btn-delete').hide();
                break;
        }
    },
    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        Ext.getCmp(prototype.idDET + '-txtTicket').setValue("");
        Ext.getCmp(prototype.idDET + '-txtDCHEQ').setValue("");
        Ext.getCmp(prototype.idDET + '-txtSEQ').setValue("");
        Ext.getCmp(prototype.idDET + '-txtSEQRO').setValue("");
        Ext.getCmp(prototype.idDET + '-txtFCONT').setValue("");
        Ext.getCmp(prototype.idDET + '-txtID').setValue("");
        Ext.getCmp(prototype.idDET + '-txtCDEPART').setValue("");
        Ext.getCmp(prototype.idDET + '-txtCARRIVA').setValue("");
        Ext.getCmp(prototype.idDET + '-txtZONE').setValue("");
        Ext.getCmp(prototype.idDET + '-txtNFLIGHT').setValue("");
        Ext.getCmp(prototype.idDET + '-txtDFLIGHT').setValue("");
        Ext.getCmp(prototype.idDET + '-txtFOPERZUL').setValue("");
        Ext.getCmp(prototype.idDET + '-txtNPLANE').setValue("");
        Ext.getCmp(prototype.idDET + '-txtLEGSEQ').setValue("");
        Ext.getCmp(prototype.idDET + '-txtFDUP').setValue("");
        Ext.getCmp(prototype.idDET + '-cmbFTE').setValue("");
        Ext.getCmp(prototype.idDET + '-cmbSTORG').setValue("");
        Ext.getCmp(prototype.idDET + '-cmbSTVAL').setValue("");
        Ext.getCmp(prototype.idDET + '-cmbFVAL').setValue("");
        Ext.getCmp(prototype.idDET + '-cmbSTCON').setValue("");
        Ext.getCmp(prototype.idDET + '-cmbFINVO').setValue("");
        Ext.getCmp(prototype.idDET + '-cmbFload').setValue("");
        Ext.getCmp(prototype.idDET + '-txtCDOC').setValue("");
        Ext.getCmp(prototype.idDET + '-cmbTDOC').setValue("");
        Ext.getCmp(prototype.idDET + '-txtPSVVTA').setValue("");
        Ext.getCmp(prototype.idDET + '-txtAGTIA').setValue("");
        Ext.getCmp(prototype.idDET + '-txtFVTA').setValue("");
        Ext.getCmp(prototype.idDET + '-cmbTVTA').setValue("");
        Ext.getCmp(prototype.idDET + '-cmbTPAX').setValue("");
        Ext.getCmp(prototype.idDET + '-cmbTOPUS').setValue("");
        Ext.getCmp(prototype.idDET + '-txtCARR').setValue("");
        Ext.getCmp(prototype.idDET + '-txtCABI').setValue("");
        Ext.getCmp(prototype.idDET + '-txtCLAS').setValue("");
        Ext.getCmp(prototype.idDET + '-txtFBASE').setValue("");
        Ext.getCmp(prototype.idDET + '-txtVCPN').setValue("0");
        Ext.getCmp(prototype.idDET + '-txtVCPN0').setValue("0");
        Ext.getCmp(prototype.idDET + '-txtVCPN16').setValue("0");
        Ext.getCmp(prototype.idDET + '-cmbMDACP').setValue("");
        Ext.getCmp(prototype.idDET + '-txtCOMISI').setValue("0");
        Ext.getCmp(prototype.idDET + '-txtVTAX').setValue("0");
        Ext.getCmp(prototype.idDET + '-txtVCPMX').setValue("0");
        Ext.getCmp(prototype.idDET + '-txtUSCR').setValue("");
        Ext.getCmp(prototype.idDET + '-txtFECR').setValue("");
        Ext.getCmp(prototype.idDET + '-txtHOCR').setValue("");
        Ext.getCmp(prototype.idDET + '-txtUSUP').setValue("");
        Ext.getCmp(prototype.idDET + '-txtFEUP').setValue("");
        Ext.getCmp(prototype.idDET + '-txtHOUP').setValue("");
        this.recalculoVuelo = "";
        Ext.getCmp(prototype.idDET + '-txtFECVAL').setValue("");
        Ext.getCmp(prototype.idDET + '-txtVYQ').setValue("0");
        Ext.getCmp(prototype.idDET + '-txtVYQ0').setValue("0");
        Ext.getCmp(prototype.idDET + '-txtVYQ16').setValue("0");
    },
    //</editor-fold>
    btnFacsimil_clickHandler: function() {
        var bean104 = {};
        bean104.FUENTE = this.p.bean.strFuente;
        if(this.p.bean.CPN_Billed>1){
            bean104.TDNR =this.p.bean.CCIA + this.p.bean.FORMA + this.p.bean.SERIE+'                  '+this.p.bean.monthTo;
	}else{
            bean104.TDNR = this.p.bean.CCIA + this.p.bean.FORMA + this.p.bean.SERIE;
	}
        bean104.CPUI = this.p.bean.CUPON;
	bean104.COUNTRY = this.p.bean.PSVVTA;
	bean104.HRED = this.p.bean.FVTA;
	bean104.DPROCE = this.p.bean.DFLIGHT;
        console.log(bean104);
        if(this.p.bean.CCIA === '139'){
            var params = {};
            params.bean = bean104;
            if(this.p.bean.FVAL==='3'){
                params.strVTR = 'OLD';
            }else{
                params.strVTR = 'VTR';
            }
            Ext.create('Ext.Praxis.view.screens.ScrProrrateoNewForm', {
                id: 'ScrProrrateoNewForm',
                params: params
            }).show();
        } else {
            this.viewProrate(bean104);
//            Ext.create('Ext.Praxis.view.program.ProFacsimilForm.ProFacsimilForm', {
//                id: 'ProFacsimilForm',
//                params: {
//                    data: bean104
//                }
//            }).show();
//            me.post_to_url(CONTEXTPATH + '/Home?'
//                + 'data=' + JSON.stringify(bean104) + '&'
//                + 'backBox=' + this.p.boxActual + '&'
//                + 'ticket=' + Ext.getCmp(prototype.idDET+'-txtTicket').getValue()+ '&'
//                + 'back=FlightConciliation&'
////                + 'lblTitleReporte="Facsimil Information"'
//                + '#program-pro-facsimil-form', {}, 'post', 'ProFacsimilForm');
        }
    },
    viewProrate: function(bean104) {
           
        prototypeProgram.view = 'flown-flight-conciliation-form';
        prototypeProgram.nprog = 'PX00000095';
        prototypeProgram.title = 'Flight Conciliation';
        prototypeProgram.modulo = '';
        
        win.displayProFacsimilSearch(me, bean104,'FlightConciliation');
        this.view.close();
    },
    buscarDatosVenta: function(textfield, newValue, oldValue) {
        if (this.p.actionCode === 'I') {
            this.onValidarChange();
            var txtTicket = Ext.getCmp(prototype.idDET + '-txtTicket').getValue();
            if (txtTicket.length === 14) {
                var beanOption = {};
                this.llenarData(beanOption);
                beanOption.CCIA = txtTicket.substring(0, 3);
                beanOption.FORMA = txtTicket.substring(3, 7);
                beanOption.SERIE = txtTicket.substring(7, 13);
                beanOption.CUPON = txtTicket.substring(13, 14);
                me.buscarDatosVenta(beanOption);
            }
        }
    },
    onValidarChange: function() {
        var list = Ext.getCmp(prototype.idDET + '-txtTicket').getValue().replace(/\s/g, "").split("");
        var txtTicket = '';
        for (var i = 0; i < list.length; i++) {
            if (this.esNumero(list[i])) {
                txtTicket += list[i];
            }
        }
        Ext.getCmp(prototype.idDET + '-txtTicket').setValue(txtTicket.substring(0, 14));
    },
    esNumero: function(valor) {
        return valor.toLowerCase() === valor.toUpperCase();
    },
    
    //<editor-fold defaultstate="collapsed" desc="button">
    onSaveClick: function(btn) {
        this.FUNCION = 'INSERT';
        var beanOption = {};
        this.llenarData(beanOption);
        this.recalculoVuelo = '';
        
        if(beanOption.strTicket.length === 14){
            beanOption.CCIA = Ext.getCmp(prototype.idDET + '-txtTicket').getValue().trim().substring(0, 3);
            beanOption.FORMA = Ext.getCmp(prototype.idDET + '-txtTicket').getValue().trim().substring(3, 7);
            beanOption.SERIE = Ext.getCmp(prototype.idDET + '-txtTicket').getValue().trim().substring(7, 13);
            beanOption.CUPON = Ext.getCmp(prototype.idDET + '-txtTicket').getValue().trim().substring(13, 14);

            var msjResult = this.validacionUpdate(beanOption);
            if(msjResult === ''){
                me.validTicket(beanOption, 'false');//false(VALIDA E INSERTA)
            }else{
                global.Msg({msg: msjResult});
            }
	}else{
            global.Msg({msg: 'Airline tickets have 14-digit identification numbers. [CCIA(3)FORM(4)SERIE(6)COUPON(1)]'});
	}
    },
    onUpdateClick: function(btn) {
        this.FUNCION = 'UPDATE';
        var beanOption = {};
        this.llenarData(beanOption);
        beanOption.strTicket = this.p.bean.strTicket;
	beanOption.CCIA = this.p.bean.CCIA;
	beanOption.FORMA = this.p.bean.FORMA;
	beanOption.SERIE = this.p.bean.SERIE;
	beanOption.CUPON = this.p.bean.CUPON;
        
        var msjResult = this.validacionUpdate(beanOption);
        if(msjResult === ''){
            //Valida si se cambió el vuelo 
            if(this.p.bean.NFLIGHT !== beanOption.NFLIGHT || this.p.bean.CDEPART !== beanOption.CDEPART
                     || this.p.bean.CARRIVA !== beanOption.CARRIVA){
                this.recalculoVuelo = 'Y' + this.p.bean.DFLIGHT + this.p.bean.NFLIGHT + this.p.bean.CDEPART + this.p.bean.CARRIVA;
            }
            me.validTicket(beanOption, 'false');//false(VALIDA Y MODIFICA)
        }else{
            this.recalculoVuelo = '';
            global.Msg({msg: msjResult});
        }
    },
    onDeleteClick: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    
                    var beanOption = {};
                    
                    //Llenando los valores ingresados por el usuario =======
                    beanOption.CCUST = this.p.bean.CCUST;
                    beanOption.strTicket = this.p.bean.strTicket;
                    beanOption.CCIA = this.p.bean.CCIA;
                    beanOption.FORMA = this.p.bean.FORMA;
                    beanOption.SERIE = this.p.bean.SERIE;
                    beanOption.CUPON = this.p.bean.CUPON;
                    beanOption.SEQ = this.p.bean.SEQ;
                    beanOption.DFLIGHT = this.p.bean.DFLIGHT;
                    beanOption.NFLIGHT = this.p.bean.NFLIGHT;
                    beanOption.CDEPART = this.p.bean.CDEPART;
                    beanOption.CARRIVA = this.p.bean.CARRIVA;

                    if(beanOption.strTicket !== ''){
                        me.executeOptionTkt(beanOption, 'D', '');
                    }else{
                        global.Msg({msg: 'An error has ocurred. Please contact our System Department'});
                    }
                    this.recalculoVuelo = '';
                }
            }
        });
    },
    onPrevClick: function() {
        var rowIndex = this.p.rowIndex;
        if (rowIndex > 0) {
            var data = this.p.lista.getAt(rowIndex - 1).data;
            me.searchBeanTkt(data.strTicket.replace(' ', '').replace(' ', ''), data.SEQ, rowIndex - 1, this.p.lista, "DataEntryTicketFlightConciliationForm", false);
        }
    },
    onNextClick: function() {
        var rowIndex = this.p.rowIndex;
        if (rowIndex < this.p.lista.data.length - 1) {
            var data = this.p.lista.getAt(rowIndex + 1).data;
            me.searchBeanTkt(data.strTicket.replace(' ', '').replace(' ', ''), data.SEQ, rowIndex + 1, this.p.lista, "DataEntryTicketFlightConciliationForm", false);
        }
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(bean) {
        
        console.log(bean,'beanWAAAA')
        this.setValue("txtTicket", bean.strTicket.replace(' ', '').replace(' ', ''));
        this.setValue("txtDCHEQ", bean.DCHEQ);
        if (bean.SEQ === '') {
            this.setValue("txtSEQ", '00');
        } else {
            this.setValue("txtSEQ", bean.SEQ);
        }
        this.oldSEQ = bean.SEQ;
        console.log(this.oldSEQ);
//        if (bean.SEQRO === '') {
//            this.setValue("txtSEQRO", '00');
//        } else {
            this.setValue("txtSEQRO", bean.SEQRO);
//        }
        this.setValue("txtFCONT", bean.FCONT);
        this.setValue("txtID", bean.IDCON);
        this.setValue("txtCDEPART", bean.CDEPART);
        Ext.create('Ext.tip.ToolTip', {
            target: prototype.idDET+'-txtCDEPART',
            html: bean.strDescCDEPART
        });
        this.setValue("txtCARRIVA", bean.CARRIVA);
        Ext.create('Ext.tip.ToolTip', {
            target: prototype.idDET+'-txtCARRIVA',
            html: bean.strDescCARRIVA
        });
        this.setValue("txtZONE", bean.ZONA);
        this.setValue("txtNFLIGHT", bean.NFLIGHT);
        this.setValue("txtCodeErrorVo", bean.CODER_EXTRA);
        
        Ext.tip.QuickTipManager.register({
            target: prototype.idDET + '-txtCodeErrorVo',
            text: bean.DESC_ERROR_EXTRA
        });
        
        
        this.setValue("txtDFLIGHT", bean.DFLIGHT);
        this.setValue("txtFOPERZUL", bean.FOPERZUL);
        this.setValue("txtNPLANE", bean.NPLANE);
        this.setValue("txtLEGSEQ", bean.LEGSEQ);
        this.setValue("txtFDUP", bean.FDUP);
        if (bean.CCIA !== '139') {
            this.setValue("cmbSTORG", "1");
        } else if(bean.CCIA === '139') {
            this.setValue("cmbSTORG", "2");
        }
        this.setValue("cmbSTVAL", bean.STVAL);
        this.setValue("cmbFload", bean.FLOAD);
        this.setValue("cmbFINVO", bean.FINVO);
        this.setValue("cmbFVAL", bean.FVAL);
        this.setValue("cmbSTCON", bean.STCON);
        this.setValue("cmbFTE", bean.FTE);
        //Sales Information ==============================
        this.setValue("txtCDOC", bean.CDOC);
        this.setValue("cmbTDOC", bean.TDOC);
        this.setValue("txtPSVVTA", bean.PSVVTA);
        Ext.create('Ext.tip.ToolTip', {
            target: prototype.idDET+'-txtPSVVTA',
            html: bean.strDescPSVVTA
        });
        this.setValue("txtAGTIA", bean.AGTIA);
        this.setValue("txtFVTA", bean.FVTA);
        this.setValue("cmbTVTA", bean.TVTA);
        this.setValue("cmbTPAX", bean.TPAX);
        this.setValue("cmbTOPUS", bean.TOPUS);
        this.setValue("txtCARR", bean.CARR);
        this.setValue("txtCABI", bean.CABI);
        this.setValue("txtCLAS", bean.CLAS);
        this.setValue("txtFBASE", bean.FBASE);
        this.setValue("txtVCPN", this.getFormatNumber(bean.VCPN));
        this.setValue("txtVCPN0", this.getFormatNumber(bean.VCPN0));
        this.setValue("txtVCPN16", this.getFormatNumber(bean.VCPN16));
        this.setValue("cmbMDACP", bean.MDACP);
        this.setValue("txtCOMISI", this.getFormatNumber(bean.COMISI));
        this.setValue("txtVTAX", this.getFormatNumber(bean.VTAX));
        this.setValue("txtVCPMX", this.getFormatNumber(bean.VCPMX));
        this.setValue("txtQTYPAX", bean.QTYPAX);
        
        this.setValue("txtUSCR", bean.USCR);
        this.setValue("txtFECR", bean.FECR);
        this.setValue("txtHOCR", bean.HOCR);
        this.setValue("txtUSUP", bean.USUP);
        this.setValue("txtFEUP", bean.FEUP);
        this.setValue("txtHOUP", bean.HOUP);
        
        this.setValue("txtFECVAL", bean.FECVAL);
        this.setValue("txtVYQ", this.getFormatNumber(bean.VYQ));
        this.setValue("txtVYQ0", this.getFormatNumber(bean.VYQ0));
        this.setValue("txtVYQ16", this.getFormatNumber(bean.VYQ16));
        
        //Sólo son editables si la información que viene es vacía (A pedido de Javier Toledo)
        if(bean.CDOC === '' && bean.TDOC === '' && bean.PSVVTA === ''
		&& bean.AGTIA === '' && bean.FVTA === '' && bean.TVTA === '' 
		&& bean.TPAX === ''){
            console.log('HERE ONE')
            Ext.getCmp(prototype.idDET+'-txtCDOC').setReadOnly(false);
            Ext.getCmp(prototype.idDET+'-cmbTDOC').enable(true);
            Ext.getCmp(prototype.idDET+'-txtPSVVTA').setReadOnly(false);
            Ext.getCmp(prototype.idDET+'-txtAGTIA').setReadOnly(false);
            Ext.getCmp(prototype.idDET+'-txtFVTA').setReadOnly(false);
            Ext.getCmp(prototype.idDET+'-cmbTVTA').enable(true);
            Ext.getCmp(prototype.idDET+'-cmbTPAX').enable(true);
            if(bean.USERK === 'KEYLAV' || bean.USERK === 'UAT182'|| bean.USERK === 'SAP52T'){
                Ext.getCmp(prototype.idDET+'-txtSEQRO').setReadOnly(false);
                Ext.getCmp(prototype.idDET+'-txtFVTA').setReadOnly(false);
                Ext.getCmp(prototype.idDET+'-txtSEQ').setReadOnly(false);
            }
        } else {
            console.log('HERE TWO')
            Ext.getCmp(prototype.idDET+'-txtCDOC').setReadOnly(true);
            Ext.getCmp(prototype.idDET+'-cmbTDOC').disable(true);
            Ext.getCmp(prototype.idDET+'-txtPSVVTA').setReadOnly(true);
            Ext.getCmp(prototype.idDET+'-txtAGTIA').setReadOnly(true);
            if(bean.USERK === 'KEYLAV' || bean.USERK === 'UAT182'|| bean.USERK === 'SAP52T'){
                Ext.getCmp(prototype.idDET+'-txtSEQRO').setReadOnly(false);
                Ext.getCmp(prototype.idDET+'-txtFVTA').setReadOnly(false);
                Ext.getCmp(prototype.idDET+'-txtSEQ').setReadOnly(false);
            }
            else{
                var menuUser = document.getElementById('menuUser').innerText;

                if (menuUser !== "LAGREDA") {
                    // CAMBIADO A PEDIDO LUIS FERNANDO AGREDA
                    if (this.statusCont === 'Contabilizado.'  || this.statusCont === 'Contabilizado') {
                        Ext.getCmp(prototype.idDET+'-txtFVTA').setReadOnly(true);
                    } else {
                        Ext.getCmp(prototype.idDET+'-txtFVTA').setReadOnly(false);
                    }
                    console.log(this.statusCont,'this.statusCont')
                }

                Ext.getCmp(prototype.idDET+'-txtSEQRO').setReadOnly(true);
                Ext.getCmp(prototype.idDET+'-txtSEQ').setReadOnly(true);
            }
            Ext.getCmp(prototype.idDET+'-cmbTVTA').disable(true);
            Ext.getCmp(prototype.idDET+'-cmbTPAX').disable(true);
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanOption) {
        //Llenando los valores ingresados por el usuario =======
        beanOption.strTicket = this.getValue("txtTicket");
	//Status
        if (this.p.actionCode==='I') {
            beanOption.STVAL = '1';
            this.setValue("cmbSTVAL", "1");
            beanOption.FVAL = '';
            beanOption.STCON = '';
        } else {
            beanOption.STVAL = this.getValue("cmbSTVAL");
            beanOption.FVAL = this.getValue("cmbFVAL");
            beanOption.STCON = this.getValue("cmbSTCON");
        }
        beanOption.FCONT = this.getValue('txtFCONT');
        beanOption.IDCON = this.getValue('txtID');
	//Valida el origen según la CIA.
        var cia = beanOption.strTicket.substring(0, 3);
        if(cia === '139'){
            beanOption.STORG = '2';
            this.setValue("cmbSTORG", "2");
	}else{
            beanOption.STORG = '1';
            this.setValue("cmbSTORG", "1");
	}
	//Si la secuencia está en blanco (Insert), coloca x defecto '00'
        if(this.getValue("txtSEQ") === ''){
            beanOption.SEQ = '00';
	}else{
            beanOption.SEQ = this.getValue("txtSEQ");
	}
        beanOption.oldSEQ = this.oldSEQ;
        beanOption.SEQRO = this.getValue("txtSEQRO");
        beanOption.DCHEQ = this.getValue("txtDCHEQ");
        beanOption.CDEPART = this.getValue("txtCDEPART");
        beanOption.CARRIVA = this.getValue("txtCARRIVA");
        beanOption.ZONA = this.getValue("txtZONE");
        beanOption.NFLIGHT = this.fillZeros(4, this.getValue("txtNFLIGHT"));
        beanOption.DCHEQ = this.getValue("txtDCHEQ");
        beanOption.DFLIGHT = Ext.util.Format.date(this.getValue("txtDFLIGHT"), 'Ymd');
        beanOption.FOPERZUL = Ext.util.Format.date(this.getValue("txtFOPERZUL"), 'Ymd');
        beanOption.NPLANE = this.getValue("txtNPLANE");
        beanOption.LEGSEQ = this.getValue("txtLEGSEQ");
        beanOption.FDUP = this.getValue("txtFDUP");
        beanOption.FTE = this.getValue("cmbFTE");
        beanOption.CDOC = this.getValue("txtCDOC");
        beanOption.TDOC = this.getValue("cmbTDOC");
        beanOption.FINVO = this.getValue("cmbFINVO");
        if (this.getValue("cmbTDOC")==='F') {
            if (this.getValue("txtQTYPAX")!=='') {
                beanOption.QTYPAX = this.getValue("txtQTYPAX").replace(',', '');
            } else {
                beanOption.QTYPAX = 0;
            }
        }
        beanOption.PSVVTA = this.getValue("txtPSVVTA");
        beanOption.AGTIA = this.getValue("txtAGTIA");
        beanOption.FVTA = Ext.util.Format.date(this.getValue("txtFVTA"), 'Ymd');
        beanOption.TVTA = this.getValue("cmbTVTA");
        beanOption.TPAX = this.getValue("cmbTPAX");
        beanOption.TOPUS = this.getValue("cmbTOPUS")===null?"":this.getValue("cmbTOPUS");
        beanOption.CARR = this.getValue("txtCARR");
        beanOption.CABI = this.getValue("txtCABI");
        beanOption.CLAS = this.getValue("txtCLAS");
        beanOption.FBASE = this.getValue("txtFBASE");
        if (this.getValue("txtVCPN")!=='') {
            beanOption.VCPN = this.getValue("txtVCPN").replace(',', '');
        } else {
            beanOption.VCPN = 0;
        }
        if (this.getValue("txtVCPN0")!=='') {
            beanOption.VCPN0 = this.getValue("txtVCPN0").replace(',', '');
        } else {
            beanOption.VCPN0 = 0;
        }
        if (this.getValue("txtVCPN16")!=='') {
            beanOption.VCPN16 = this.getValue("txtVCPN16").replace(',', '');
        } else {
            beanOption.VCPN16 = 0;
        }
        beanOption.MDACP = this.getValue("cmbMDACP");
        if (this.getValue("txtCOMISI")!=='') {
            beanOption.COMISI = this.getValue("txtCOMISI").replace(',', '');
        } else {
            beanOption.COMISI = 0;
        }
        if (this.getValue("txtVTAX")!=='') {
            beanOption.VTAX = this.getValue("txtVTAX").replace(',', '');
        } else {
            beanOption.VTAX = 0;
        }
        if (this.getValue("txtVCPMX")!=='') {
            beanOption.VCPMX = this.getValue("txtVCPMX").replace(',', '');
        } else {
            beanOption.VCPMX = 0;
        }
        if (this.getValue("txtVYQ")!=='') {
            beanOption.VYQ = this.getValue("txtVYQ").replace(',', '');
        } else {
            beanOption.VYQ = 0;
        }
        if (this.getValue("txtVYQ0")!=='') {
            beanOption.VYQ0 = this.getValue("txtVYQ0").replace(',', '');
        } else {
            beanOption.VYQ0 = 0;
        }
        if (this.getValue("txtVYQ16")!=='') {
            beanOption.VYQ16 = this.getValue("txtVYQ16").replace(',', '');
        } else {
            beanOption.VYQ16 = 0;
        }
        beanOption.FECVAL = this.getValue("txtFECVAL");
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="cambiarEstadoDatosClave">
    cambiarEstadoDatosClave: function (accion) {
        if(accion === 'Habilitar'){
            Ext.getCmp(prototype.idDET + '-txtTicket').setReadOnly(false);
            //Sales Information
            Ext.getCmp(prototype.idDET + '-txtCDOC').setReadOnly(false);
            Ext.getCmp(prototype.idDET + '-cmbTDOC').enable(true);
            Ext.getCmp(prototype.idDET + '-txtPSVVTA').setReadOnly(false);
            Ext.getCmp(prototype.idDET + '-txtAGTIA').setReadOnly(false);
            Ext.getCmp(prototype.idDET + '-txtFVTA').enable(true);
            Ext.getCmp(prototype.idDET + '-txtFVTA').setReadOnly(false);
            Ext.getCmp(prototype.idDET + '-cmbTVTA').enable(true);
            Ext.getCmp(prototype.idDET + '-cmbTPAX').enable(true);
            
            Ext.getCmp(prototype.idDET + '-txtVCPN').setReadOnly(true);
            Ext.getCmp(prototype.idDET + '-cmbMDACP').disable(true);
            Ext.getCmp(prototype.idDET + '-txtCOMISI').setReadOnly(true);
            Ext.getCmp(prototype.idDET + '-txtVTAX').setReadOnly(true);
            Ext.getCmp(prototype.idDET + '-txtFECVAL').setReadOnly(true);
            Ext.getCmp(prototype.idDET + '-txtVYQ').setReadOnly(true);
            Ext.getCmp(prototype.idDET + '-txtVYQ0').setReadOnly(true);
            Ext.getCmp(prototype.idDET + '-txtVYQ16').setReadOnly(true);
            
            Ext.getCmp(prototype.idDET + '-txtVCPN0').setReadOnly(true);
            Ext.getCmp(prototype.idDET + '-txtVCPN16').setReadOnly(true);
        } else {
            Ext.getCmp(prototype.idDET + '-txtTicket').setReadOnly(true);
            
            Ext.getCmp(prototype.idDET + '-txtVCPN').setReadOnly(false);
            Ext.getCmp(prototype.idDET + '-cmbMDACP').enable(true);
            Ext.getCmp(prototype.idDET + '-txtCOMISI').setReadOnly(false);
            Ext.getCmp(prototype.idDET + '-txtVTAX').setReadOnly(false);
            Ext.getCmp(prototype.idDET + '-txtFECVAL').setReadOnly(false);
            Ext.getCmp(prototype.idDET + '-txtVYQ').setReadOnly(false);
            Ext.getCmp(prototype.idDET + '-txtVYQ0').setReadOnly(false);
            Ext.getCmp(prototype.idDET + '-txtVYQ16').setReadOnly(false);
            
            Ext.getCmp(prototype.idDET + '-txtVCPN0').setReadOnly(false);
            Ext.getCmp(prototype.idDET + '-txtVCPN16').setReadOnly(false);
        }
    },
    //</editor-fold>
    validacionUpdate: function(beanOption) {
        var msjResult = '';
        //================== VALIDACIÓN =========================================
        //=======================================================================
        //Comprobando que los campos obligatorios sean ingresados
	if(beanOption.strTicket !== '' && beanOption.DCHEQ !== ''
            && beanOption.CDEPART !== '' && beanOption.CARRIVA !== ''
            && beanOption.NFLIGHT !== '' && beanOption.DFLIGHT !== ''
            && beanOption.CABI !== '' && beanOption.CLAS !== ''
            && beanOption.FBASE !== ''){
            // <editor-fold defaultstate="collapsed" desc="Errores">
            var errors = Ext.getCmp(prototype.idDET+'-txtTicket').getErrors();//Devuelve un arreglo
            if (errors.length>0) {
                msjResult = 'Invalid Ticket Number.';
            }
            if (Ext.getCmp(prototype.idDET+'-txtDCHEQ').getErrors().length>0) {
                msjResult = 'Invalid Check Digit.';
            }
            if (Ext.getCmp(prototype.idDET+'-txtCDEPART').getErrors().length>0) {
                msjResult = 'Invalid Departure City.';
            }
            if (Ext.getCmp(prototype.idDET+'-txtCARRIVA').getErrors().length>0) {
                msjResult = 'Invalid Arrival City.';
            }
            if (Ext.getCmp(prototype.idDET+'-txtDFLIGHT').getErrors().length>0) {
                msjResult = 'Invalid Flight Date.';
            }
            if (Ext.getCmp(prototype.idDET+'-txtNFLIGHT').getErrors().length>0) {
                msjResult = 'Invalid Flight Number.';
            }
            if (Ext.getCmp(prototype.idDET+'-txtCABI').getErrors().length>0) {
                msjResult = 'Invalid Cabin.';
            }
            if (Ext.getCmp(prototype.idDET+'-txtCLAS').getErrors().length>0) {
                msjResult = 'Invalid Class.';
            }
            if (Ext.getCmp(prototype.idDET+'-txtFBASE').getErrors().length>0) {
                msjResult = 'Invalid Fare Basis.';
            }
            if (Ext.getCmp(prototype.idDET+'-txtVCPN').getErrors().length>0) {
                msjResult = 'Invalid Amount value.';
            }
            if (Ext.getCmp(prototype.idDET+'-txtCOMISI').getErrors().length>0) {
                msjResult = 'Invalid Commission value.';
            }
            if (Ext.getCmp(prototype.idDET+'-txtVTAX').getErrors().length>0) {
                msjResult = 'Invalid TAX value.';
            }
            if (Ext.getCmp(prototype.idDET+'-txtFVTA').getErrors().length>0) {
                msjResult = 'Invalid Sales Date.';
            }
            if (Ext.getCmp(prototype.idDET+'-txtFOPERZUL').getErrors().length>0) {
                msjResult = 'Invalid ZULU Date.';
            }
            
            var menuUser = document.getElementById('menuUser').innerText;
            
            // </editor-fold>
            if (msjResult === "") {
                try {
                    if(this.getValue("txtFVTA").getTime() > this.getValue("txtDFLIGHT").getTime()){
                        msjResult= "Sales Date cannot be higher than Flight Date";
                    }else{
                        var fechaHoy = new Date().getTime();
                        if (menuUser !== "LAGREDA") {
                            if(this.getValue("txtFVTA").getTime() > fechaHoy){
                                msjResult= "Sales Date cannot be higher than Current Date";						
                            }
                            if(this.getValue("txtDFLIGHT").getTime() > fechaHoy){
                                msjResult= "Flight Date cannot be higher than Current Date";						
                            }
                        }
                        if(beanOption.TDOC === 'F' && beanOption.QTYPAX === 0){
                            msjResult= "You must enter a Qty Pax.";
                        }
                    }
                } catch(e) {
                    if (e instanceof TypeError) {
                        var fechaHoy = new Date().getTime();
                        
                        if (menuUser !== "LAGREDA") {
                            if(this.getValue("txtDFLIGHT").getTime() > fechaHoy){
                                msjResult= "Flight Date cannot be higher than Current Date";						
                            }
                            if(beanOption.TDOC === 'F' && beanOption.QTYPAX === 0){
                                msjResult= "You must enter a Qty Pax.";
                            }
                        }
                    }
                }
            }
        } else {
            // <editor-fold defaultstate="collapsed" desc="Campos vacíos">
            if (beanOption.strTicket==="") {
                msjResult= 'A Ticket number is required.';
            }
            if (beanOption.DCHEQ==="") {
                msjResult= 'A Check Digit is required.';
            }
            if (beanOption.CDEPART==="") {
                msjResult= 'A Departure City is required.';
            }
            if (beanOption.CARRIVA==="") {
                msjResult= 'An Arrival City is required.';
            }
            if (beanOption.NFLIGHT==="") {
                msjResult= 'A Flight Number is required.';
            }
            if (beanOption.DFLIGHT==="") {
                msjResult= 'A Flight Date is required.';
            }
            if (beanOption.CABI==="") {
                msjResult= 'Cabin field is required.';
            }
            if (beanOption.CLAS==="") {
                msjResult= 'Class field is required.';
            }
            if (beanOption.FBASE==="") {
                msjResult= 'Fare Basis field is required.';
            }
            // </editor-fold>
        }
        return msjResult;
    },
    getFormatNumber: function(txt) {
        return Ext.util.Format.number(txt, '0,000.00');
    },
    fillZeros: function(size, value) {
        for(var i = value.length; i < size; i++){
            value = '0' + value;
        }
        return value;
    },
    setEditable: function(id, b) {
        Ext.getCmp(prototype.idDET+'-'+id).setReadOnly(!b);
    },
    setEnabled: function(id, b) {
        if(b) Ext.getCmp(prototype.idDET+'-'+id).enable(true);
        else Ext.getCmp(prototype.idDET+'-'+id).disable(true);
    },
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.idDET+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.idDET+'-'+id).focus();
    },
    setValue: function(id, txt) {
        return Ext.getCmp(prototype.idDET+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    }
    // </editor-fold>
});