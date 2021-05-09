Ext.define('Ext.Praxis.controller.screens.AbnormalValues.tabs.ScrDBIataControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ScrDBIataControlController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meIataCtr: '',
    bean: {},
    _path: '',
    // </editor-fold>
    init: function(view) {
        meIataCtr = this;
        console.log('ScrDBIataControlController - initt');
        
    },
    afterRender: function () {
        
        console.log('ScrDBIataControlController - after');
        
    },
    btnSearch_click: function(bean) {
        console.log(' ScrDBIataControlController - btnSearch_click');
        
        this.bean = bean;
        console.log(this.bean);
        
    }
    
    
});
