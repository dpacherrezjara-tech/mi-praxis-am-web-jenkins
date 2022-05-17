Ext.define('Ext.Praxis.controller.payments.SalesReconciliAmex.DataGridMsiTrackingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataGridMsiTrackingController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    meGrid: '',
    bean: {},
    paramsMsiTracking: {},
    init: function (view) {
        prototype.id = 'SalesReconciliAmexForm';
        prototype.url = CONTEXTPATH + '/SalesReconciliAmex';
        meGrid = this;
        this.p = this.view.params;
        this.bean = this.p.rec;        
    },
    afterRender: function () {
        this.getData();
    },
    getData: function () {
        meGrid.paramsMsiTracking.beanString = JSON.stringify(this.bean);
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.payments.GridData', {
            proxy: {
                url: prototype.url + '/searchMsiTracking'
            }, listeners: {
                beforeload: function (obj) {
                    Ext.getCmp(prototype.id + '-gridMsiTracking').mask('Loading...');
                    obj.proxy.extraParams = meGrid.paramsMsiTracking;
                },
                load: function (obj) {
                    Ext.getCmp(prototype.id + '-gridMsiTracking').unmask();

                    if (obj.data.length === 0) {
                        global.Msg({msg: 'Data not found.'});
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridMsiTracking').bindStore(storeGridDatas);
    }
});