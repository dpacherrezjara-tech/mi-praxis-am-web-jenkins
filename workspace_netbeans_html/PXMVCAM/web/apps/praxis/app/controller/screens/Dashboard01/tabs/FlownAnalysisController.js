Ext.define('Ext.Praxis.controller.screens.Dashboard01.tabs.FlownAnalysisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FlownAnalysisController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meIataCtr: '',
    bean: {},
    searchParams: {},
    beanDetail: {},
    beanDetail: {},
    paramsFAFlight: {},
    paramsDetail: {},
    meFlown: '',
    _path: '',
    dw_excel: false,
    boxActual: '-boxMainDataFA',
    meFA: '',
    drillDown: [],
    // </editor-fold>
    init: function(view) {
        meFlown = this;
        meFA = this;
        
        meFlown.panelActual = '-boxMainDataFA';
        meFlown.drillDown.push(meFlown.boxActual);

    },
    afterRender: function() {

        console.log('2---------FlownAnalysisController - after');

    },
    inicio: function() {
        
        Ext.getCmp(prototype.id + '-filterMain').hide();
//        Ext.getCmp(prototype.id + '-panelFlownRadios').hide();
        this.setFormatParameter();
        var chkWP = Ext.getCmp(prototype.id + '-chkWP_FA').getValue();
        if (chkWP) {
            Ext.getCmp(prototype.id + '-filterMain').show();
            this.searchWK();
            Ext.getCmp(prototype.id + '-btnSwap_FA').setVisible(false);
            Ext.getCmp(prototype.id + '-panelGridSearchWK').setVisible(true);
            Ext.getCmp(prototype.id + '-boxMainDataFA').setVisible(false);
        } else {
            Ext.getCmp(prototype.id + '-filterMain').show();
            this.loadFAMonth();
            Ext.getCmp(prototype.id + '-btnSwap_FA').setVisible(true);
            Ext.getCmp(prototype.id + '-panelGridSearchWK').setVisible(false);
            Ext.getCmp(prototype.id + '-boxMainDataFA').setVisible(true);
        }
        console.log("Leer filter y realizar busqueda");
    },
    btnSearch_click: function(bean) {
        console.log(' 2--------FlownAnalysisController - btnSearch_click');
        
        Ext.getCmp(prototype.id + '-filterMain').hide();
        
        this.bean = bean;
        console.log(this.bean);

    },
    setFormatParameter: function() {
        meFA.bean = {};

        meFA.bean.IN_FECHA_FROM = Ext.getCmp(prototype.id + '-cmbFADateFromYear').getValue() + Ext.getCmp(prototype.id + '-cmbFADateFromMonth').getValue();
        meFA.bean.IN_FECHA_TO = Ext.getCmp(prototype.id + '-cmbFADateToYear').getValue() + Ext.getCmp(prototype.id + '-cmbFADateToMonth').getValue();

        meFA.searchParams = JSON.stringify(meFA.bean);

        console.log(meFA.bean)
    },
    loadFAMonth: function() {
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/loadFAMonth'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-boxMainDataFA').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meFA.searchParams};
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-boxMainDataFA').unmask();
                    win.lblUser_toolTip("Estructura: A1972");

                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridFAmonth').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridFAmonth').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridFAmonth2').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridFAmonth2').setStore(storeGridDatas);
    },
    searchWK: function() {
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchWK'
            },
            listeners: {
                beforeload: function(obj) {
                    Ext.getCmp(prototype.id + '-panelGridSearchWK').mask('Loading...');
                    obj.proxy.extraParams = {beanString: meFA.searchParams};
                },
                load: function(obj, obj2, success, response, obj5) {
                    Ext.getCmp(prototype.id + '-panelGridSearchWK').unmask();
                    win.lblUser_toolTip("Estructura: A1972");

                    var res = Ext.JSON.decode(response._response.responseText);
                    console.log(res);
                    if (res.success) {
                        if (obj.data.length > 0) {
                            var obj = obj.data.items[0].data;
                        } else {
                            global.Msg({msg: 'Data not found'});
                        }
                    } else
                        global.Msg({msg: res.sesion});
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id + '-gridSearchWK').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-displayChart01').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridSearchWK').setStore(storeGridDatas);
    },
    btnSwap_FA_click: function() {
        if (Ext.getCmp(prototype.id + '-gridFAmonth').isVisible()) {
            Ext.getCmp(prototype.id + '-gridFAmonth').setVisible(false);
            Ext.getCmp(prototype.id + '-gridFAmonth2').setVisible(true);
        } else {
            Ext.getCmp(prototype.id + '-gridFAmonth').setVisible(true);
            Ext.getCmp(prototype.id + '-gridFAmonth2').setVisible(false);
        }
    },
    chkWP_FA_click: function() {
        
        this.setFormatParameter;
        var chkWP = Ext.getCmp(prototype.id + '-chkWP_FA').getValue();
        if (chkWP) {
            this.searchWK();
            Ext.getCmp(prototype.id + '-btnSwap_FA').setVisible(false);
            Ext.getCmp(prototype.id + '-panelGridSearchWK').setVisible(true);
            Ext.getCmp(prototype.id + '-boxMainDataFA').setVisible(false);
        } else {
            this.loadFAMonth();
            Ext.getCmp(prototype.id + '-btnSwap_FA').setVisible(true);
            Ext.getCmp(prototype.id + '-panelGridSearchWK').setVisible(false);
            Ext.getCmp(prototype.id + '-boxMainDataFA').setVisible(true);
        }
        
    },
    viewDetFAFlight: function(param,column, e, row, column, x, rowData) {   
        
        this.beanDetail = x.record.data;
        
        this.beanDetail.FLAG_VNR = param;
        meFA.paramsFAFlight.beanString = JSON.stringify(this.beanDetail);

        console.log(this.beanDetail);
        this.searchFlownFlight();
        
    },
    searchFlownFlight: function () {
        
        Ext.getCmp(prototype.id + '-panelRadio').show();
        
        win.lblUser_toolTip("Estructura: A1971");
        this.showGrid('-boxFlownAnalysis');

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchFlownFlight'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = meFA.paramsFAFlight;
                },
                load: function (obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin6');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                        var data = obj.data.items[0].data;
                        console.log(obj.data);
                    }
//                    meFA.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridFlownAnalysis').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridFlownAnalysis').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
        
    },
    
    ChangueFlown_clickHandler: function (a,value ,c,d,e,f) {
        
        console.log(Ext.getCmp(prototype.id + '-panelRadio').show());
        
        switch (value.rbgpDetail) {
            case 'Z':
                                
                this.beanDetail.ZONA = '';
		this.beanDetail.NPLANE = '';
		this.beanDetail.CDEPART = '';
		this.beanDetail.CARRIVA = '';
                                
                this.searchByZone(this.beanDetail);
                break;
            case 'C':
                this.beanDetail.ZONA = '';
		this.beanDetail.NPLANE = '';
		this.beanDetail.CDEPART = '';
		this.beanDetail.CARRIVA = '';
                
                this.searchByCityPair(this.beanDetail);
                break;
            case 'P':
                this.beanDetail.ZONA = '';
		this.beanDetail.NPLANE = '';
		this.beanDetail.CDEPART = '';
		this.beanDetail.CARRIVA = '';
                
                this.searchByNPlane(this.beanDetail);
                break;
            case 'MXN':
                this.beanDetail.ZONA = '';
		this.beanDetail.NPLANE = '';
		this.beanDetail.CDEPART = '';
		this.beanDetail.CARRIVA = '';
                
                this.searchFlownFlight(this.beanDetail);
                break; 
        }
        
        meFA.paramsDetail.beanString = JSON.stringify(this.beanDetail);
        
    },
    searchByZone: function (byBean) {
        win.lblUser_toolTip("Estructura: A1971");
        this.showGrid('-boxByZone');

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchByZone'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = meFA.paramsDetail;
                },
                load: function (obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin6');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                        var data = obj.data.items[0].data;
                        console.log(obj.data);
                    }
//                    meFA.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataByZone').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataByZone').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
        
    },
    searchByCityPair: function (byBean) {
        win.lblUser_toolTip("Estructura: A1971");
        this.showGrid('-boxByCityPair');

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchByCityPair'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = meFA.paramsDetail;
                },
                load: function (obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin6');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                        var data = obj.data.items[0].data;
                        console.log(obj.data);
                    }
//                    meFA.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataByCityPair').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataByCityPair').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
        
    },
    searchByNPlane: function (byBean) {
        win.lblUser_toolTip("Estructura: A1971");
        this.showGrid('-boxByNPlane');

        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchByNPlane'
            }, listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = meFA.paramsDetail;
                },
                load: function (obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin6');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    } else {
//                        var data = obj.data.items[0].data;
                        console.log(obj.data);
                    }
//                    meFA.setWidthPie();
                }
            }
        });

        global.clear();
        Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-gridDataByNPlane_OC').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin6').bindStore(storeGridDatas);
        
    },
    
    showGrid: function(nameGrid) {

        Ext.getCmp(prototype.id + meFlown.boxActual).hide();

        meFlown.boxActual = nameGrid;
        
        if(meFlown.boxActual === '-boxMainDataFA' || meFlown.boxActual === '-panelGridSearchWK'){
            Ext.getCmp(prototype.id + '-filterMain').show();
        }else{
            Ext.getCmp(prototype.id + '-filterMain').hide();
        }
        meFlown.drillDown.push(meFlown.boxActual);

        Ext.getCmp(prototype.id + meFlown.boxActual).show();


    },
    
    imgBack_clickHandler: function () {

        if (meFlown.drillDown.length > 1) {
            Ext.getCmp(prototype.id + meFlown.boxActual).hide();
            meFlown.drillDown.pop();
            meFlown.boxActual = meFlown.drillDown[meFlown.drillDown.length - 1];
            Ext.getCmp(prototype.id + meFlown.boxActual).show();

            console.log(meFlown.boxActual);
            
            if(meFlown.boxActual === '-boxMainDataFA' || meFlown.boxActual === '-panelGridSearchWK'){
                Ext.getCmp(prototype.id + '-filterMain').show();
            }else{
                Ext.getCmp(prototype.id + '-filterMain').hide();
            }
            
//            if (meFlown.boxActual === '-boxMainData' || meFlown.boxActual === '-BoxDDTMCountryofSale' || meFlown.boxActual === '-BoxCityOfSale' || meFlown.boxActual === '-BoxDetGDS' || meFlown.boxActual === '-BoxDetPaisAlliances') {
//                this.hidePagination_clickHandler();
//            } else if (meFlown.boxActual === '-BoxDetGDSAgte') {
//                me.panelActual = '-BoxDetGDSAgte';
//                var pag = Ext.getCmp(prototype.id + '-pagginGDS');
//                var pagData = pag.getPageData();
//
//                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//            } else if (meFlown.boxActual === '-BoxCabin') {
//                me.panelActual = '-BoxCabin';
//                var pag = Ext.getCmp(prototype.id + '-pagginCabin');
//                var pagData = pag.getPageData();
//                this.showPagination_clickHandler();
//                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//            }
        }
//        console.log('imgBack_clickHandler == ' + me.drillDown);

    },
});
