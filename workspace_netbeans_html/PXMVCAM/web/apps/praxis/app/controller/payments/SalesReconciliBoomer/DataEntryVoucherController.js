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
    init: function(view) {
        prototype.id = 'SalesReconciliBoomerForm';
        prototype.url = CONTEXTPATH + '/SalesReconciliBoomer';
        meDE = this;
    },
    afterRender: function() {
        //Llamado a base de datos para traer el recibo y monto
    },
    //<editor-fold defaultstate="collapsed" desc="llenarData">
    llenarData: function(beanTemp) {
        //Llenar el voucher - monto
        
        //beanTemp.IN_TDOC = '';
        
        meDE.paramsExport.beanString = JSON.stringify(beanTemp);
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="limpiarData">
    limpiarData: function() {

    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(){
        var p = this.view.params;
        rec = p.rec;
        Ext.getCmp(prototype.id+'-de-txtVoucher').setValue(rec.get('SVFOP'));
        Ext.getCmp(prototype.id+'-de-txtVoucherAmount').setValue(rec.get('VOUCHER'));
    },
    //</editor-fold>
    // <editor-fold defaultstate="collapsed" desc="Botones">
    onUpdateClick: function(btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to update ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'yes') {
                    var beanTemp = {};
                    this.llenarData(beanTemp);
                    console.log(beanTemp.beanString);
                    //global.getFile(prototype.url + '/getXLSXSearchDetail?beanString=' + meDE.paramsExport.beanString);
                }
            }
        });
    },
    onCancelClick: function(btn) {
        this.view.close();
    },
    // </editor-fold>
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