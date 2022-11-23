Ext.define('Ext.Praxis.controller.payments.LoadDelivery.LoadDeliveryEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-deliveryEntryController',
    url: CONTEXTPATH + '/LoadDelivery',
    /**
     * Constructor
     */
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        console.log("Ventana de Carga mostrado");
        this.showDeliveryRaw();
    },
    getRowData:function(){
        let obj = this.view.params;
        return obj;
    },
    showDeliveryRaw:function(){
        this.searchDelivery();
    },
    searchDelivery: async function(){
        let txa = Ext.getCmp(prototype.id + '-txaDelivery');
        txa.mask('Loading...');
        let url = this.url + '/getDelivery';
        console.log(url);
        let body = this.getRowData();
        let data = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
                .then(data => {
                    txa.setValue(data.long);
                    txa.unmask('Loading...','');
        });
    }
});




