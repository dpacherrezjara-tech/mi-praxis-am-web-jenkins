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
    drillDown: [],
    // </editor-fold>
    init: function(view) {
        me = this;
        me.panelActual = '-boxMainDataFA';
        me.drillDown.push(me.boxActual);
        console.log('2----------FlownAnalysisController - initt');

    },
    afterRender: function() {

        console.log('2---------FlownAnalysisController - after');

    },
    inicio: function() {
        this.setFormatParameter();
        this.loadFAMonth();
        console.log("Leer filter y realizar busqueda");
    },
    btnSearch_click: function(bean) {
        console.log(' 2--------FlownAnalysisController - btnSearch_click');

        this.bean = bean;
        console.log(this.bean);

    },
    setFormatParameter: function() {
        me.bean = {};
        me.bean.IN_FECHA_FROM = '202101';
        me.bean.IN_FECHA_TO = '202112';

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            beanString: beanString,
            bean: me.bean
        };
        console.log(searchParams);

    },
    loadFAMonth: function() {
        win.lblUser_toolTip("Estructura: A1972");

        this.showGrid('-gridFAmonth');
        Ext.Ajax.request({
            url: prototype.url + '/loadFAMonth',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: searchParams, dw_excel: false},
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                var data = res.data[0];

                var storeData = Ext.create('Ext.data.Store', {
                    data: res.data,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridFAmonth').bindStore(storeData);

            }
        });

//        me.dw_excel = false;

    },
    showGrid: function(nameGrid) {

        Ext.getCmp(prototype.id + meSales.boxActual).hide();

        meSales.boxActual = nameGrid;
        meSales.drillDown.push(meSales.boxActual);

        Ext.getCmp(prototype.id + meSales.boxActual).show();

//        console.log('showGrid == ' + me.drillDown);


    },
});
