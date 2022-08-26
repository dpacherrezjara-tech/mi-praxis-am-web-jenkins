Ext.define('Ext.Praxis.controller.eecta.UATPSales.UATPSalesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.UATPSalesController',
    //alias: 'controller.' + prototype.id + '-uatpsalescontroller',
    // url: CONTEXTPATH + '/CargaRecibos',     
    requires: [
        // 'Ext.Praxis.view.eecta.CargaRecibosForm.InfoGridComplDet'
    ],
    init: function (view) {
        var me = this;
    },
    afterRender: function () {
        // this.search_complemento();
        //alert('1');
    },
    btnSearch_click: function () {
        this.OnSearch();
    },
    OnSearch: function () {
        this.search();
    },
    search: function () {
        //alert(prototype.url+'/hola');
        var bean = {};
        Ext.getCmp(prototype.id + '-boxPaginacion').show();
        bean.IN_FROMDATE = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha1').getValue(), 'Ymd');
        bean.IN_TODATE = Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha2').getValue(), 'Ymd');
        bean.IN_IDFILE = Ext.getCmp(prototype.id + '-IDFILE').getValue();

        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.UATPSales.GridData', {
            proxy: {
                url: prototype.url + '/getA4264'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    win.lblUser_toolTip("Estructura: A4264");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
                    var total = Ext.util.Format.number(pagData.total, '0,000');
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    console.log(pagData);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
        console.log(Ext.getCmp(prototype.id + '-paggin'));
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnAdd_click: function () {
        this.winDataEntry();
    },
    winDataEntry: function () {
           alert("Ingreso de datos");
//        Ext.create('Ext.Praxis.view.eecta.CatalogoClienteForm.CatalogoClienteEntry', {
//            id: prototype.id + '-CatalogoClienteEntry'
//        }).show();
    },
    //here

    // <editor-fold defaultstate="collapsed" desc="Funciones para la paginación">
    pagFirst: function (obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveFirst();
        }
    },
    pagPrevious: function (obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').movePrevious();
        }
    },
    pagNext: function (obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveNext();
        }
    },
    pagLast: function (obj, e) {
        if (Ext.getCmp(prototype.id + '-boxMainData').isVisible()) {
            Ext.getCmp(prototype.id + '-paggin').moveLast();
        }
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
        return Ext.getCmp(prototype.id + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    }
    // </editor-fold>
});