Ext.define('Ext.Praxis.controller.screens.Dashboard01.tabs.FlownAnalysisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FlownAnalysisController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meIataCtr: '',
    bean: {},
    searchParams: {},
    _path: '',
    dw_excel: false,
    boxActual: '-boxMainDataFA',
    meFA: '',
    drillDown: [],
    // </editor-fold>
    init: function(view) {
        meFA = this;
        //meFA.panelActual = '-boxMainDataFA';
        meFA.drillDown.push(meFA.boxActual);
        console.log('2----------FlownAnalysisController - initt');

    },
    afterRender: function() {

        console.log('2---------FlownAnalysisController - after');

    },
    inicio: function() {
        this.setFormatParameter();
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
        console.log("Leer filter y realizar busqueda");
    },
    btnSearch_click: function(bean) {
        console.log(' 2--------FlownAnalysisController - btnSearch_click');

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
        //meFA.panelActual = '-panelGridSearchWK';
        //global.selectedChild(meFA.childs, prototype.id + meFA.panelActual);
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
    showGrid: function(nameGrid) {

        Ext.getCmp(prototype.id + meSales.boxActual).hide();

        meSales.boxActual = nameGrid;
        meSales.drillDown.push(meSales.boxActual);

        Ext.getCmp(prototype.id + meSales.boxActual).show();

        console.log('showGrid == ' + meSales.drillDown);


    },
});
