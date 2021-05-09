Ext.define('Ext.Praxis.controller.screens.Dashboard01.tabs.FlownAnalysisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FlownAnalysisController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meIataCtr: '',
    bean: {},
    _path: '',
    // </editor-fold>
    init: function (view) {
        meIataCtr = this;
        console.log('2----------FlownAnalysisController - initt');

    },
    afterRender: function () {

        console.log('2---------FlownAnalysisController - after');

    },
    inicio: function () {
        console.log("Leer filter y realizar busqueda");
    },
    btnSearch_click: function (bean) {
        console.log(' 2--------FlownAnalysisController - btnSearch_click');

        this.bean = bean;
        console.log(this.bean);

    }


});
