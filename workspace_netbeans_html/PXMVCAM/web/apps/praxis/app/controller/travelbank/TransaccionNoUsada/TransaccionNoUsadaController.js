/* global fetch, global, searchParams */

Ext.define('Ext.Praxis.controller.travelbank.TransaccionNoUsada.TransaccionNoUsadaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TransaccionNoUsadaController',
    searchParams: {},
    init: function (view) {
        prototype.id = 'TransaccionNoUsadaForm';
        prototype.url = CONTEXTPATH + '/TransaccionNoUsada';
//        prototype.widthContenedor = 1500;
//        prototype.widthGrid = 1459;
//        console.log(prototype.id);
        var me = this;
        this.control({
            '#TransaccionNoUsadaForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#TransaccionNoUsadaForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#TransaccionNoUsadaForm-btn-pag-next': {
                click: this.pagNext
            },
            '#TransaccionNoUsadaForm-btn-pag-last': {
                click: this.pagLast
            },
            '#TransaccionNoUsadaForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#TransaccionNoUsadaForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#TransaccionNoUsadaForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#TransaccionNoUsadaForm-btnClear': {
                click: this.btnClear_click
            },
            '#TransaccionNoUsadaForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#TransaccionNoUsadaForm-btnBack': {
                click: this.btnBack_click
            }
        });
    },
    afterRender: function () {
        this.btnSearch_click();
    },
    setFormatParameter: function () {
        let vl_periodo = Ext.getCmp(prototype.id + '-periodo').getValue(),
//                VL_DESDE = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtDateFrom').getValue(), 'Ymd'),
//                VL_HASTA = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtDateTo').getValue(), 'Ymd'),
//                VL_NCTA = Ext.getCmp(prototype.id + '-txtAccountNumber').getValue(),
                vl_moneda = Ext.getCmp(prototype.id + '-txtAccountNumberCurr').getValue();
        var me = this;
        me.searchParams = {
            PERIODO: vl_periodo,
            MONEDA: vl_moneda
        };
    },
//    btnDisplay_click: function() {
//        global.Msg({
//            msg: 'Option not available.'
//        });
//    },
    btnSearch_click: function (obj, e) {
        
        this.setGridData();
    },
    setGridData: function () {
        
        var me = this;
        this.setFormatParameter();
        var storeGridDatas = Ext.create('Ext.Praxis.store.travelbank.AccountingMasterTravelbank.GridData', {
            proxy: {
                url: prototype.url + '/search'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = me.searchParams;
                },
                load: function (obj) {
                    // Ext.getCmp(prototype.id02 + '-gridMainContem').unmask('Loading...', '');
                    win.lblUser_toolTip("Estructura: A4430");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id02 + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id02 + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id02 + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id02 + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        Ext.Msg.show({title: '.:PRAXIS:.', msg: 'Data not found', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING, fn: false});
                    }
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridData').getStore().reload();
//        Ext.getCmp(prototype.id02 + '-paggin').setStore(storeGridDatas);
    },
    setGridData_x: function (obj, val) {
        let url = prototype.url + '/search',
                store = Ext.StoreMgr.lookup(prototype.id + "storeInfo"),
                grilla = Ext.getCmp(prototype.id + '-gridData').getView();

//        let store = grilla.getStore();
        grilla.getStore().removeAll();

        grilla.mask('Loading...');
        fetch(url + '?' + new URLSearchParams(searchParams)).then(async res => {
            await res.json().then(obj => {
                //console.log('data',obj);
                if (obj.data.length === 0) {
                    global.Msg({
                        msg: 'Data not found.'
                    });
                } else {
                    //total saldo
//                    let VL_A4417SALDO = 0;
//                     obj.data.forEach(
//                        function (currentValue) {
//                            VL_A4417SALDO = VL_A4417SALDO + parseFloat(currentValue.A4417TOTTR);
//                        }
//                    );                    
//                    Ext.getCmp(prototype.id + '-A4417SALDO').setValue(Ext.util.Format.number(VL_A4417SALDO, '0,000.00'));

//                    let item = obj.data[0];
                    store.getProxy().data = obj.data;
//                    store.page = {
//                        start: 0,
//                        limit: 20,
//                        curpag: item.page.PAGNUM === 0 ? 1 : item.page.PAGNUM,
//                        totpag: item.page.TOTPAG
//                    };
//
//                    let currentPage = Ext.util.Format.number(item.page.PAGNUM, '0,000');
//                    let pageCount = Ext.util.Format.number(item.page.TOTPAG, '0,000');
//                    let total = Ext.util.Format.number(item.page.TOTROW, '0,000');
//                    //console.log('paginado', store.page);
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    store.load();
                }
            }).catch(err => console.error('Error al consultar', err)).finally(() => {
                grilla.unmask();
            });
        });
    },
    btnClear_click: function (obj, e) {

        Ext.getCmp(prototype.id + '-txtDateFrom').setValue(new Date());
        Ext.getCmp(prototype.id + '-txtDateTo').setValue(new Date());
        Ext.getCmp(prototype.id + '-txtAccountNumber').setValue("");
        Ext.getCmp(prototype.id + '-txtAccountNumberCurr').setValue("");
        Ext.getCmp(prototype.id + '-cboFileType').setValue("");

    },
    btnExcel_click: function (obj, e) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    exportExcel: function () {
        this.setFormatParameter();
        global.getFile(prototype.url + '/getXLSX?IN_A1740TITRA=' + searchParams.IN_A1740TITRA +
                '&IN_A1740TIPO=' + searchParams.IN_A1740TIPO +
                '&A1740SUBTI=' + searchParams.A1740SUBTI +
                '&A1740CATEG=' + searchParams.A1740CATEG +
                '&A1740CTA=' + searchParams.A1740CTA +
                '&A1740SCTA=' + searchParams.A1740SCTA);
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible())
            option.setVisible(false);
        else
            option.setVisible(true);
    },
    btnBack_click: function () {
        var heightMenu = 400;
        Ext.getCmp('App-main-region-content-north').setHeight(heightMenu);
    },
    onEditClick: function (grid, rowIndex, colIndex) {
        let rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry(rec);
    },
    winDataEntry: function (rec) {
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.travelbank.DeliveryFilesForm.DeliveryFilesEntry', {
            id: prototype.id + 'DeliveryFilesEntryForm',
            params: rec.data
        }).show();

    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.btnSearch_click();
        }
    },
    //<editor-fold defaultstate="collapsed" desc="paginado">
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function (obj, e) {
        let store = Ext.StoreMgr.lookup(prototype.id + "storeInfo");
        this.changePageRequest(obj.id, store);
    },
    pagPrevious: function (obj, e) {
        let store = Ext.StoreMgr.lookup(prototype.id + "storeInfo");
        this.changePageRequest(obj.id, store);
    },
    pagNext: function (obj, e) {
        let store = Ext.StoreMgr.lookup(prototype.id + "storeInfo");
        this.changePageRequest(obj.id, store);
    },
    pagLast: function (obj, e) {
        let store = Ext.StoreMgr.lookup(prototype.id + "storeInfo");
        this.changePageRequest(obj.id, store);
    },
    changePageRequest: function (id, store) {
        let me = this;
        let page = store.page;
        let reqPage = 0;
        switch (id) {
            case prototype.id + '-btn-pag-first':
                reqPage = 1;
                break;
            case prototype.id + '-btn-pag-previous':
                reqPage = page.curpag === 1 ? 1 : page.curpag - 1;
                break;
            case prototype.id + '-btn-pag-next':
                reqPage = page.curpag === page.totpag ? page.curpag : page.curpag + 1;
                break;
            case prototype.id + '-btn-pag-last':
                reqPage = page.totpag;
                break;
        }
        searchParams.start = (reqPage - 1) * 20;
        me.btnSearch_click();
    }
    //</editor-fold>
});
