Ext.define('Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrDBIataControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrDBIataControlController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    columns2: {},
    bean: {},
    beanDet: {},
    meIataCtr: '',
    dw_excel: false,
    boxActual: '-boxMainDataIataControl',
    drillDown: [],
    _path: '',
    // </editor-fold>
    init: function(view) {
        meIataCtr = this;
        console.log('ScrDBIataControlController - initt');
        meIataCtr.drillDown.push(meIataCtr.boxActual);
        console.log(meIataCtr.drillDown);

    },
    afterRender: function() {

        console.log('ScrDBIataControlController - after');

    },
    btnSearch_click: function(bean) {
        console.log(' ScrDBIataControlController - btnSearch_click');

        this.bean = bean;
        console.log(this.bean);
        this.btnSearchDifference_click();
    },
    btnSearchDifference_click: function() {

        console.log(' ScrDBIataControlController - btnSearchDifference_click');

        this.setFormatParameter();
        win.lblUser_toolTip("Estructura: IMF078");
        Ext.Ajax.request({
            url: prototype.url + '/loadTotalControlTotal_Abnormal_Country_ONE',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: this.searchParams, dw_excel: false},
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                console.log(response);

                var res = Ext.JSON.decode(response.responseText);
                console.log('if');
                var lstData = res.lstData_Abnormal_CS;
                //console.log(lstData);
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstData,
                    autoLoad: true
                });
                console.log(storeData);
                Ext.getCmp(prototype.id + '-gridMainDataByValues').bindStore(storeData);
            }
        });

//        meIataCtr.dw_excel = false;

    },
    setFormatParameter: function() {
//        meIataCtr.bean = {};
        var beanString = JSON.stringify(meIataCtr.bean);
        this.searchParams = beanString;
//        console.log(meIataCtr.bean);
    },
});
