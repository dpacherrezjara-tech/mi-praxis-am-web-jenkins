Ext.define('Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrOALParticipationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrOALParticipationController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    searchParams: {},
    columns2: {},
    bean: {},
    beanDet: {},
    meOAL: '',
    dw_excel: false,
    boxActual: '-boxMainDataOAL',
    drillDown: [],
    _path: '',
    // </editor-fold>
    init: function(view) {
        meOAL = this;
        console.log('ScrOALParticipationController - initt');
        meOAL.drillDown.push(meOAL.boxActual);
        console.log(meOAL.drillDown);
    },
    afterRender: function() {

        console.log('ScrOALParticipationController - after');

    },
    btnSearch_click: function(bean) {
        console.log(' ScrOALParticipationController - btnSearch_click');

        this.bean = bean;
        console.log(this.bean);
        this.btnSearchOALParticipation_click();
    },
    btnSearchOALParticipation_click: function() {

        console.log(' ScrOALParticipationController - btnSearchOALParticipation_click');

        this.setFormatParameter();
        win.lblUser_toolTip("Estructura: IMF116");
        Ext.Ajax.request({
            url: prototype.url + '/searchOAL',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: this.searchParams, dw_excel: false},
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                console.log(response);

                var res = Ext.JSON.decode(response.responseText);
                console.log('if');
                var lstData = res.lstData;
                console.log(lstData);
                var storeData = Ext.create('Ext.data.Store', {
                    data: lstData,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridMainDataOAL').bindStore(storeData);
                Ext.getCmp(prototype.id + '-gridMainDataOAL').setStore(storeData);
            }
        });

//        meOAL.dw_excel = false;

    },
    setFormatParameter: function() {
//        meOAL.bean = {};
        var beanString = JSON.stringify(meOAL.bean);
        this.searchParams = beanString;
//        console.log(meOAL.bean);
    },
    clickgridDetWeek_colHandler: function(column, e, row, column, x, rowData) {
        this.beanDet = x.record.data;
        this.showGrid('-boxWeek');

        console.log(this.beanDet);
        this.viewgridDetWeek_colHandler();
    },
    viewgridDetWeek_colHandler: function() {

        win.lblUser_toolTip("Estructura: IMF121");

        Ext.Ajax.request({
            url: prototype.url + '/searchDifferenceByWeek',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask('Loading...'),
            params: {beanString: JSON.stringify(meOAL.beanDet), dw_excel: false},
            success: function(response, options) {
                Ext.getBody().unmask('Loading...');
                console.log(response);

                var res = Ext.JSON.decode(response.responseText);
                console.log('if');
                var lstData = res.lstData;
                console.log(lstData);
                Ext.getCmp(prototype.id + '-titgridDetWeekS').setText(lstData[0].strTitulo);

                var storeData = Ext.create('Ext.data.Store', {
                    data: lstData,
                    autoLoad: true
                });
                Ext.getCmp(prototype.id + '-gridDetWeek').bindStore(storeData);
                Ext.getCmp(prototype.id + '-gridDetWeek').setStore(storeData);
                Ext.getCmp(prototype.id + '-gridDetWeek').getStore().reload();
            }
        });
    },
    showGrid: function(nameGrid) {

        Ext.getCmp(prototype.id + meOAL.boxActual).hide();

        meOAL.boxActual = nameGrid;
        meOAL.drillDown.push(meOAL.boxActual);

        Ext.getCmp(prototype.id + meOAL.boxActual).show();

//        console.log('showGrid == ' + meOAL.drillDown);


    },
    imgBack_clickHandler: function() {

        if (meOAL.drillDown.length > 0) {
            Ext.getCmp(prototype.id + meOAL.boxActual).hide();
            meOAL.drillDown.pop();
            meOAL.boxActual = meOAL.drillDown[meOAL.drillDown.length - 1];
            Ext.getCmp(prototype.id + meOAL.boxActual).show();
        }
//        console.log('imgBack_clickHandler == ' + meOAL.drillDown);

    },
});