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
        let fecha1 = new Date();
        let fecha2 = new Date();
        fecha2.setDate(fecha1.getDate() - 30)
        Ext.getCmp(prototype.id + '-fecha1').setValue(fecha2);
        Ext.getCmp(prototype.id + '-fecha2').setValue(fecha1);
        this.OnSearch();
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
        let idFile = Ext.getCmp(prototype.id + '-IDFILE').getValue();
        if (idFile.length < 9 && idFile !== '') {
            idFile = '000000000' + idFile;
            idFile = idFile.slice(-9);
        }
        bean.IN_IDFILE = idFile;

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
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnAdd_click: function () {
        this.winDataEntry();
    },
    winDataEntry: function () {
        Ext.create('Ext.Praxis.view.eecta.UATPSalesForm.UATPSalesEntry', {
            id: prototype.id + '-UATPSalesEntry'
        }).show();

    },
    btnProcess_click: function () {
        this.winDataProcess();
    },
    winDataProcess: function () {
        //let selectedRows = [];
        let selObj = null;
        let grid = Ext.getCmp(prototype.id + '-gridData');
        if (grid.getSelectionModel().hasSelection()) {
//            let gridSelRows = grid.getSelectionModel().getSelected().items;
            let gridSelRow = grid.getSelectionModel().getSelected().items[0].data;
            if (gridSelRow.A4264STCAR === 'P' && gridSelRow.A4264STREC === '0') {
                selObj = {
                    CCUST: gridSelRow.A4264CCUST,
                    IDFILE: gridSelRow.A4264IDFIL,
                    PRDA: gridSelRow.A4264PRDA
                };
            } else {
                global.Msg({
                    msg: 'Registro debe estar Pendiente'
                });
                return;
            }
//            for (let obj of gridSelRows) {
//                console.log(obj);
//                if (obj.data.A4264STCAR === 'P'&&obj.data.A4264STREC==='0') {
//                    let selObj = {CCUST: obj.data.A4264CCUST, IDFILE: obj.data.A4264IDFIL};
//                    selectedRows.push(selObj);
//                }
//            }
        } else {
            global.Msg({
                msg: 'Debe seleccionar un registro'
            });
            return;
        }

        if (selObj !== null) {
            Ext.create('Ext.Praxis.view.eecta.UATPSalesForm.UATPSalesProcess', {
                id: prototype.id + '-UATPSaleProcessEntry',
                params: {
                    obj:selObj
                }
            }).show();
        }
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