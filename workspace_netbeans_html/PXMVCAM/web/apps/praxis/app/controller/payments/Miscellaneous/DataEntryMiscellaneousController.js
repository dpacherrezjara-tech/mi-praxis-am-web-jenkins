Ext.define('Ext.Praxis.controller.payments.Miscellaneous.DataEntryMiscellaneousController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryMiscellaneousController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    beanResult: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function (view) {
        prototype.id = 'MiscellaneousForm';
        prototype.url = CONTEXTPATH + '/MiscellaneousPayment';
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
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
            case 'U':
                this.getData();
                this.DeshabilitarCampoClave();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                Ext.getCmp(prototype.id + '-btn-delete').show();
                Ext.getCmp(prototype.id + '-btn-cancel').show();
                break;
        }
    },
    mostrarData: function () {
        console.log(meDE.beanResult);
        this.setValue('de-txtCodeTable', this.beanResult.TTABLA);
        this.setValue('de-txtDescTable', this.beanResult.DESCR_TTABLA);
        this.setValue('de-txtCTable', this.beanResult.CODETB);
        this.setValue('de-txtCDesc', this.beanResult.DESCRE1);
       // this.setValue('de-txtStval', this.beanResult.STVAL);

        this.setValue('txtUSCR', this.beanResult.USCR);
        this.setValue('txtFECR', this.beanResult.FECR);
        this.setValue('txtHOCR', this.beanResult.HOCR);
        this.setValue('txtUSUP', this.beanResult.USUP);
        this.setValue('txtFEUP', this.beanResult.FEUP);
        this.setValue('txtHOUP', this.beanResult.HOUP);
    },
    obtainData: function () {


    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {
        beanTemp.TTABLA = this.getValue("de-txtCodeTable");
        beanTemp.DESCR_TTABLA = this.getValue("de-txtDescTable");
        beanTemp.CODETB = this.getValue("de-txtCTable");
        beanTemp.DESCRE1 = this.getValue("de-txtCDesc");
       // beanTemp.IN_STVAL = this.getValue("de-txtStval");
      

        beanTemp.USCR = this.getValue("txtUSCR").trim();
        beanTemp.FECR = this.getValue("txtFECR").trim();
        beanTemp.HOCR = this.getValue("txtHOCR").trim();
        beanTemp.USUP = this.getValue("txtUSUP").trim();
        beanTemp.FEUP = this.getValue("txtFEUP").trim();
        beanTemp.HOUP = this.getValue("txtHOUP").trim();
//        console.log(beanTemp);
    },
    getData: function () {
        var beanString = JSON.stringify(meDE.bean.data);
        console.log(beanString);
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
                console.log(meDE.mostrarData());

            }
        });
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
//        this.setValue('txtCODSOUR', '');
//        this.setValue('txtDESSOU', '');
//        this.setValue('txtGRUSOR', '');
//        this.setValue('txtstrGRUSOR', '');
//        Ext.getCmp(prototype.id + '-lblDescripcion').setText('');
//        Ext.getCmp(prototype.id + '-lblDescripcion2').setText('');
//        this.setValue('txtUSCR', '');
//        this.setValue('txtFECR', '');
//        this.setValue('txtHOCR', '');
//        this.setValue('txtUSUP', '');
//        this.setValue('txtFEUP', '');
//        this.setValue('txtHOUP', '');
    },
    //</editor-fold>
    toUpperCase: function (obj, value, opts) {
//        console.log(obj);
//        console.log(value);
//        console.log(opts);
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
                        this.MaintenanceA4169(beanTemp);
                    } else {
                        global.Msg({msg: msjResult});
                    }
                }
            }
        });
    },
    onUpdateClick: function (btn) {
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
                            beanTemp.option = 'U';
                            beanTemp.beanString = JSON.stringify(beanTemp);
                            ;
                            this.MaintenanceA4169(beanTemp);
                        }
                    }
                });
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
                    this.MaintenanceA4169(beanTemp);
                }
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>

    //<editor-fold defaultstate="collapsed" desc="MaintenanceA1852">
    MaintenanceA4169: function (beanTemp) {
//        console.log(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/MaintenanceA4169',
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
    },
    //</editor-fold>

    validacionInsert: function (beanTemp) {
        var msjResult = '';
        if (this.getValue("de-txtCodeTable") === '' || this.getValue("de-txtDescTable") === '' || this.getValue("de-txtCTable") === '' || this.getValue("de-txtCDesc") === '' ) {
            msjResult = "You must enter the required field.";
        }
        return msjResult;
    },
    DeshabilitarCampoClave: function () {
        Ext.getCmp(prototype.id + '-de-txtCodeTable').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtDescTable').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtCTable').setReadOnly(true);
    },
    setearCamposClave: function(){
        Ext.getCmp(prototype.id + '-de-txtCodeTable').setValue('89');
        Ext.getCmp(prototype.id + '-de-txtDescTable').setValue('Tabla Adjustment');
        
        Ext.getCmp(prototype.id + '-de-txtCodeTable').setReadOnly(true);
        Ext.getCmp(prototype.id + '-de-txtDescTable').setReadOnly(true);
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