Ext.define('Ext.Praxis.controller.payments.SalesReconciliAmex.DataEntryErrorTransactionSalesReconciliAmexController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryErrorTransactionSalesReconciliAmexController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    msjValidate: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function (view) {
        prototype.id = 'SalesReconciliAmexForm';
        prototype.url = CONTEXTPATH + '/SalesReconciliAmex';
        meDE = this;

        this.p = this.view.params;
        this.actionCode = this.p.action;
        this.bean = this.p.rec.data;

    },
    afterRender: function () {
//        console.log('afterRender');
        this.obtainData();
        switch (this.actionCode) {
            case 'I':
//                console.log('dd');
                Ext.getCmp(prototype.id + '-btn-save').show();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.getData();
//                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {
//        console.log(meDE.beanResult);
//        console.log(this.beanResult.CODEREJ);
        this.setValue('de-txtPAYDATE', this.beanResult.PAYDATE);
        this.setValue('de-txtPRDA', this.beanResult.PRDA);
        this.setValue('de-txtBSUMDATE', this.beanResult.BSUMDATE);
        this.setValue('de-txtMERCHID', this.beanResult.MERCHID);
        this.setValue('de-txtSMERCHID', this.beanResult.SMERCHID);
        this.setValue('de-txtAXPAYNBR', this.beanResult.AXPAYNBR);
        this.setValue('de-txtPCURRENCY', this.beanResult.PCURRENCY);
        this.setValue('de-txtSCARDN', this.beanResult.SCARDN);
        this.setValue('de-txtSAUTHOC', this.beanResult.SAUTHOC);
        this.setValue('de-txtIDITEMS', this.beanResult.IDITEMS);
        this.setValue('de-txtIDITEMT', this.beanResult.IDITEMT);
        this.setValue('de-txtISREFNBR', this.beanResult.ISREFNBR);
        this.setValue('de-txtSPNR', this.beanResult.SPNR);
        this.setValue('de-txtTRANSDATE', this.beanResult.TRANSDATE);
        this.setValue('txtCERROR', this.beanResult.CERROR);
        this.setValue('txtDES_CERROR', this.beanResult.DES_CERROR);
        this.setValue('txtFLAG', this.beanResult.FSELEC);

        this.setValue('de-txtTGROSAMOUN', Ext.util.Format.number(this.beanResult.TGROSAMOUN, '0,000.00'));
        this.setValue('de-txtTGROSAMOUC', Ext.util.Format.number(this.beanResult.TGROSAMOUC, '0,000.00'));
        this.setValue('de-txtFINSAMOUC', Ext.util.Format.number(this.beanResult.FINSAMOUC, '0,000.00'));
        this.setValue('de-txtSINSAMOUC', Ext.util.Format.number(this.beanResult.SINSAMOUC, '0,000.00'));

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },
    obtainData: function () {
//        console.log('obtainData');

    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {
//        console.log('llenarData');

        beanTemp.PAYDATE = this.getValue("de-txtPAYDATE");      
        beanTemp.PRDA = this.getValue("de-txtPRDA");      
        beanTemp.BSUMDATE = this.getValue("de-txtBSUMDATE");      
        beanTemp.MERCHID = this.getValue("de-txtMERCHID");      
        beanTemp.SMERCHID = this.getValue("de-txtSMERCHID");      
        beanTemp.AXPAYNBR = this.getValue("de-txtAXPAYNBR");      
        beanTemp.PCURRENCY = this.getValue("de-txtPCURRENCY");      
        beanTemp.SCARDN = this.getValue("de-txtSCARDN");      
        beanTemp.SAUTHOC = this.getValue("de-txtSAUTHOC");      
        beanTemp.IDITEMS = this.getValue("de-txtIDITEMS");      
        beanTemp.IDITEMT = this.getValue("de-txtIDITEMT");
        
        if (this.getValue("de-txtTGROSAMOUN").trim() !== '') {
            beanTemp.TGROSAMOUN = Number(this.getValue("de-txtTGROSAMOUN").trim().replace(',', ''));
        } else {
            beanTemp.TGROSAMOUN = 0;
        }      
     
        beanTemp.SPNR = this.getValue("de-txtSPNR");      
        beanTemp.ISREFNBR = this.getValue("de-txtISREFNBR");      
        beanTemp.TRANSDATE = this.getValue("de-txtTRANSDATE");           
        console.log(beanTemp);

    },
    getData: function () {
//        console.log('getData');
        var beanString = JSON.stringify(meDE.bean);

        Ext.Ajax.request({
            url: prototype.url + '/searchTransactionErrorDetail',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryError').mask('Loading...'),
            params: {beanString: beanString},
            success: function (response, options) {
                Ext.getCmp(prototype.id + '-dataEntryError').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                meDE.beanResult = res.result;
                meDE.mostrarData();

            }
        });
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
        //this.setValue('txtCODSOUR', '');        
    },
    //</editor-fold>
    toUpperCase: function (obj, value, opts) {
//        console.log(obj);
//        console.log(value);
//        console.log(opts);
    },
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onSaveClick: function (btn) {

    },
    onUpdateClick: function (btn) {
//        console.log('onUpdateClick');
        var txtMsj = this.validacionInsert();
        if (txtMsj === '') {
            var beanTemp = {};
            this.llenarData(beanTemp);
            beanTemp.option = 'U';
            this.ValidateTicketPNR(beanTemp, btn);                                   
        } else {
            global.Msg({msg: txtMsj});
        }

    },
    onDeleteClick: function (btn) {
        
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceA4116: function (beanTemp) {
//        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
//        console.log(beanString);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceErrorTransaction',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryError').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryError').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);

                if (res.success) {
                    //global.Msg({msg: res.msjOption});
                    Ext.getCmp(prototype.id + '-dataEntryError').unmask();
                    Ext.getCmp(prototype.id + '-dataEntryError').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});

                } else {
                    global.Msg({msg: res.msjOption});
                    //global.Msg({msg: 'Failed to Update Transaction'});
                }
                    
            }
        });
    },
    ValidateTicketPNR: function (beanTemp, btn) {
//        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
//        console.log(beanString);
        meDE.msjValidate = 'Failed to Validate Transaction';
        Ext.Ajax.request({
            url: prototype.url + '/ValidateTransaction',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntryError').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntryError').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    
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
                                meDE.MaintenanceA4116(beanTemp);
                            }
                        }
                    });
                    
                } else {
                    global.Msg({msg: res.msjOption});
                }                    
            }
        });        
    },
    //</editor-fold>

    validacionInsert: function () {
        var msjResult = '';
        if (this.getValue("de-txtSPNR") === '' || this.getValue("de-txtISREFNBR") === '') {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {

        Ext.getCmp(prototype.id + '-de-cmbCOUNTRY').setReadOnly(true);
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