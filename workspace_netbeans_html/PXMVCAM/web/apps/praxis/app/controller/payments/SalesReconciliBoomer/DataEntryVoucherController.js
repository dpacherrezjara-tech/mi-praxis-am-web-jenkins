Ext.define('Ext.Praxis.controller.payments.SalesReconciliBoomer.DataEntryVoucherController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryVoucherController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meDE: '',
    actionCode: '',
    bean: {},
    fecha: new Date(),
    beanResult: {},
    paramsExport: {},
    lstCountry: [],
    searchParams: {},
    lstA1852: {},
    dataObtain: {},
    // </editor-fold>
    init: function (view) {
        prototype.id = 'SalesReconciliBoomerForm';
        prototype.url = CONTEXTPATH + '/SalesReconciliBoomer';
        meDE = this;
        this.p = this.view.params;
        this.bean = this.p.rec;
    },
    afterRender: function () {
        this.getData();
    },
    getData: function () {
//        console.log('getData');
        var beanString = JSON.stringify(meDE.bean.data);

        Ext.Ajax.request({
            url: prototype.url + '/searchVoucherDetail',
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
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function (beanTemp) {
        //Llenar el voucher - monto
        beanTemp.IN_VOUCHER = Ext.getCmp(prototype.id + '-de-txtVoucher').getValue();
        beanTemp.IN_VAMOUNT = Ext.getCmp(prototype.id + '-de-txtVoucherAmount').getValue();
        beanTemp.DATSET = this.beanResult.DATSET;
        beanTemp.WEEKMO = this.beanResult.WEEKMO;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function () {
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function () {
        Ext.getCmp(prototype.id + '-de-txtVoucher').setValue(this.beanResult.VOUCHER);
        Ext.getCmp(prototype.id + '-de-txtVoucherAmount').setValue(this.beanResult.VAMOUNT);
    },
    //</editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onUpdateClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to update ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    console.log(beanTemp.beanString);
                    this.MaintenanceA2318(beanTemp);
                    //global.getFile(prototype.url + '/getXLSXSearchDetail?beanString=' + meDE.paramsExport.beanString);
                }
            }
        });
    },
    MaintenanceA2318: function (beanTemp) {
//        console.log(beanTemp);
        var beanString = JSON.stringify(beanTemp);
        Ext.Ajax.request({
            url: prototype.url + '/updateVoucher',
            method: 'POST',
            timeout: 60000000,
//            params: beanTemp,
            params: {beanString: beanString},
            beforerequest: Ext.getCmp(prototype.id + '-dataEntry').mask('Loading...'),
            success: function (response, opts) {
                Ext.getCmp(prototype.id + '-dataEntry').unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
//                console.log(res);
                if (res.success) {
                    global.Msg({msg: res.Mensaje});
                    Ext.getCmp(prototype.id + '-dataEntry').unmask();
                    Ext.getCmp(prototype.id + '-dataEntry').close();
                    Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                } else
                    global.Msg({msg: ''});
            }
        });
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    // </editor-fold>
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