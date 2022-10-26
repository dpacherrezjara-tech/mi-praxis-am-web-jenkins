Ext.define('Ext.Praxis.controller.payments.SalesReconciliationTest.DataEntryTicketSalesReconciliationTestController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryTicketSalesReconciliationTestController',
    bean: {},
    lista: {},
    lstCards: [],
    actionCode: '',
    msj: '',
    adjust: {},
    adjust_amount: 0,
    dataObtain: {},
//    beanCons: {},
//    FUNCION: '',
//    recalculoVuelo: '',
    init: function (view) {
    },
    afterRender: function () {
        switch (this.actionCode) {
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
                if (this.bean.STVAL === '2') { //Venta sin liquidación
                    this.configurarAjuste();
                }
        }
    },
    limpiarData: function () {
    },
    //<editor-fold defaultstate="collapsed" desc="button">
    onPrevClick: function () {
    },
    onNextClick: function () {
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function () {
        win.setValue('2-txtSCARCOD', this.bean.SCARCOD.trim() + " - " + this.bean.strSDescCard.trim());
        Ext.create('Ext.tip.ToolTip', {
            target: prototype.id + '-2-txtSCARCOD',
            html: this.bean.SCARCOD.trim() + " - " + this.bean.strSDescCard.trim()
        });

        win.setValue('2-txtACARCOD', this.bean.ACARCOD.trim() + " - " + this.bean.strADescCard.trim());
        Ext.create('Ext.tip.ToolTip', {
            target: prototype.id + '-2-txtACARCOD',
            html: this.bean.ACARCOD.trim() + " - " + this.bean.strADescCard.trim()
        });

        win.setValue('2-txtTicket', this.bean.strTicket.trim());
        win.setValue("2-txtSEQ", this.bean.SEQ.trim());
        win.setValue('2-cmbTDOC', this.bean.TDOC);
        if (this.bean.TDOC === 'R') {
            console.log('refund ' + this.bean.TDOC);
            Ext.getCmp(prototype.id + '-2-cmbSTVALR').setVisible(true);
            Ext.getCmp(prototype.id + '-2-cmbSTVALS').setVisible(false);
        }
        if (this.bean.TDOC === 'S') {
            console.log('sales ' + this.bean.TDOC);
            Ext.getCmp(prototype.id + '-2-cmbSTVALS').setVisible(true);
            Ext.getCmp(prototype.id + '-2-cmbSTVALR').setVisible(false);
        }
        win.setValue('2-cmbFTE', this.bean.FTE);
        win.setValue('2-cmbSTVALS', this.bean.STVAL);
        win.setValue('2-cmbSTVALR', this.bean.STVAL);

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
        win.setValue("2-txtFLVOID", this.bean.strFlagStat.trim());
        //SALES ===================================
        win.setValue('2-txtACOUNTRY', this.bean.ACOUNTRY.trim());
        win.setValue("2-txtAAGENT", this.bean.AAGENT.trim());
        win.setValue("2-txtAAGNAME", this.bean.AAGNAME);
        win.setValue('2-txtADATE', this.bean.ADATE.trim());
        win.setValue("2-txtATCNTR", this.bean.ATCNTR.trim());
        win.setValue('2-txtAVFOP', win.formatDblNumber(this.bean.AVFOP));
        win.setValue('2-txtACURRENCY', this.bean.ACURRENCY.trim());
        win.setValue('2-txtACARDN', this.bean.strSCARDN);
        win.setValue('2-txtADATEXP', this.bean.ADATEXP.trim());
        win.setValue("2-txtAAUTHOC", this.bean.AAUTHOC.trim());
        win.setValue("2-txtAPNR", this.bean.APNR.trim());
        win.setValue("2-txtTRNCU", this.bean.TRNCU.trim());



        if (this.bean.strDescMerchn.trim() !== '') {
            win.setValue('2-txtMERCHN', this.bean.MERCHN.trim() + ' - ' + this.bean.strDescMerchn.trim());
        } else {
            win.setValue('2-txtMERCHN', this.bean.MERCHN.trim());
        }
        if (this.bean.strDescMerchn.trim() !== '') {
            win.setValue('2-txtMERCHN1', this.bean.MERCHN.trim() + ' - ' + this.bean.strDescMerchn.trim());
        } else {
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
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    configurarAjuste: function () {
        console.log('configurarAjuste');
        this.adjust = Object.create(this.bean); //Crea una copia del objeto this.bean en this.adjust

        this.adjust_amount = this.adjust.SVFOP - this.adjust.AVFOP;
        this.adjust.SVFOP = this.adjust_amount;

        var storeGridData = Ext.create('Ext.data.Store', {
            data: this.adjust,
            autoLoad: true
        });
        console.log(this.adjust);
        Ext.getCmp(prototype.id + '-gridDataInfoConci').bindStore(storeGridData);
        this.obtainGetAdjustmentCode();
    },
    obtainGetAdjustmentCode: function () {
        Ext.Ajax.request({
            url: CONTEXTPATH + '/SalesReconciliAmex' + '/getAdjustmentCodes',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(this.dataObtain)},
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    Ext.getCmp(prototype.id + '-cmbADJTYPE').bindStore(
                            Ext.create('Ext.data.Store', {data: res.data, autoLoad: true})
                            );
                    Ext.getCmp(prototype.id + '-cmbADJTYPE').setValue('');
                    Ext.getCmp(prototype.id + '-panelAdjustment').setVisible(true);
                } else
                    global.Msg({msg: res.sesion});
            }
        });
    },
});