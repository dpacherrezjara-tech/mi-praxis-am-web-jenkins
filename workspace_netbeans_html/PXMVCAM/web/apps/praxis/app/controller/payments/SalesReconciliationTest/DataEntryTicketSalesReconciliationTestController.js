Ext.define('Ext.Praxis.controller.payments.SalesReconciliationTest.DataEntryTicketSalesReconciliationTestController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryTicketSalesReconciliationTestController',
    bean: {},
    lista: {},
    lstCards: [],
    actionCode: '',
    msj: '',
//    beanCons: {},
//    FUNCION: '',
//    recalculoVuelo: '',
    init: function(view) {
    },
    afterRender: function(){
        switch( this.actionCode ){
            case 'V':
                this.mostrarData();
                if (this.msj.trim() !== '') {
                    global.Msg({msg: this.msj});
                } else {
                }
                break;
            case 'I':
                this.limpiarData();
                break;
            case 'U':
                this.limpiarData();
                this.mostrarData();
                break;
            case 'S':
                this.limpiarData();
                this.mostrarData();
                break;
        }
    },
    limpiarData: function () {
    },
    
    //<editor-fold defaultstate="collapsed" desc="button">
    onPrevClick: function() {
    },
    onNextClick: function() {
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function() {
        var res = '';
        win.setValue('2-txtSCARCOD', this.bean.SCARCOD.trim()+" - "+this.bean.strSDescCard.trim());
        Ext.create('Ext.tip.ToolTip', {
            target: prototype.id+'-2-txtSCARCOD',
            html: this.bean.SCARCOD.trim()+" - "+this.bean.strSDescCard.trim()
        });
        
        win.setValue('2-txtACARCOD', this.bean.ACARCOD.trim()+" - "+this.bean.strADescCard.trim());
        Ext.create('Ext.tip.ToolTip', {
            target: prototype.id+'-2-txtACARCOD',
            html: this.bean.ACARCOD.trim()+" - "+this.bean.strADescCard.trim()
        });
        
        win.setValue('2-txtTicket', this.bean.strTicket.trim());
        win.setValue("2-txtSEQ", this.bean.SEQ.trim());
        win.setValue('2-cmbTDOC', this.bean.TDOC);
        win.setValue('2-cmbFTE', this.bean.FTE);
        win.setValue('2-cmbSTVAL', this.bean.STVAL);
        
        
        //SALES ===================================
        win.setValue('2-txtSCOUNTRY', this.bean.SCOUNTRY.trim());
        win.setValue("2-txtSAGENT", this.bean.SAGENT.trim());
        win.setValue("2-txtSAGNAME", this.bean.SAGNAME.trim());
        win.setValue('2-txtSDATE', this.bean.SDATE.trim());
        win.setValue("2-txtSTCNTR", this.bean.STCNTR.trim());
        win.setValue('2-txtSVFOP', win.formatDblNumber(this.bean.SVFOP));
        win.setValue('2-txtSCURRENCY', this.bean.SCURRENCY.trim());
        win.setValue('2-txtSCARDN', this.bean.strSCARDN.trim());
        win.setValue('2-txtSDATEXP', this.bean.SDATEXP.trim());
        win.setValue("2-txtSAUTHOC", this.bean.SAUTHOC.trim());
        win.setValue("2-txtSPNR", this.bean.SPNR.trim());
        win.setValue("2-txtTRNCU", this.bean.TRNCU.trim());
        //SALES ===================================
        win.setValue('2-txtACOUNTRY', this.bean.ACOUNTRY.trim());
        win.setValue("2-txtAAGENT", this.bean.AAGENT.trim());
        win.setValue("2-txtAAGNAME", this.bean.AAGNAME);
        win.setValue('2-txtADATE', this.bean.ADATE.trim());
        win.setValue("2-txtATCNTR", this.bean.ATCNTR.trim());
        win.setValue('2-txtAVFOP', win.formatDblNumber(this.bean.AVFOP));
        win.setValue('2-txtACURRENCY', this.bean.ACURRENCY.trim());
        win.setValue('2-txtACARDN', this.bean.strACARDN);
        win.setValue('2-txtADATEXP', this.bean.ADATEXP.trim());
        win.setValue("2-txtAAUTHOC", this.bean.AAUTHOC.trim());
        win.setValue("2-txtAPNR", this.bean.APNR.trim());
        win.setValue("2-txtTRNCU", this.bean.TRNCU.trim());
        
        
        
	if(this.bean.strDescMerchn.trim() !== ''){
            win.setValue('2-txtMERCHN', this.bean.MERCHN.trim()+' - '+this.bean.strDescMerchn.trim());
	}else{
            win.setValue('2-txtMERCHN', this.bean.MERCHN.trim());
	}
        if(this.bean.strDescMerchn.trim() !== ''){
            win.setValue('2-txtMERCHN1', this.bean.MERCHN.trim()+' - '+this.bean.strDescMerchn.trim());
	}else{
            win.setValue('2-txtMERCHN1', this.bean.MERCHN.trim());
	}
       
        win.setValue('2-txtUSCR', this.bean.USCR.trim());
        win.setValue('2-txtFECR', this.bean.FECR.trim());
        win.setValue('2-txtHOCR', this.bean.HOCR.trim());
        win.setValue('2-txtUSUP', this.bean.USUP.trim());
        win.setValue('2-txtFEUP', this.bean.FEUP.trim());
        win.setValue('2-txtHOUP', this.bean.HOUP.trim());
    },
    //</editor-fold>
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    }
});