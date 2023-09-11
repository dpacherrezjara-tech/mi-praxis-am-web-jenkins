Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.MSITrackingDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MSITrackingDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        this.getData();
    },
    getData: function () {
        const me = this;
        const gridMSI = Ext.getCmp(prototype.idMSI + '-gridMSITracking');
        me.view.mask('Loading...');
        fetch(`${me.url}/loadMSITrackingInfo?${new URLSearchParams(me.view.searchParams)}`)
                .then(async res => {
                    if (res.ok) {
                        const data = await res.json();
                        const store = Ext.create('Ext.data.Store', {
                            data: data.response
                        });
                        gridMSI.setStore(store);
                        //console.log(data);
                    }
                }).then(()=>me.view.unmask());
    },
    onCancelClick:function(){
        const me = this;
        me.view.close();
    },
    onUpdateClick:function(){
        alert('Funcion en construccion');
    }
});

