Ext.define('Ext.Praxis.controller.payments.LoadDelivery.LoadDeliveryEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-deliveryEntryController',
    url: CONTEXTPATH + '/LoadDelivery',
    /**
     * Constructor
     */
    init:function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender:function () {
        this.searchDelivery();
    },
    getRowData: function () {
        let obj = this.view.params;
        return obj;
    },
    searchDelivery: async function () {
        let window = Ext.getCmp(prototype.id + '-LoadDeliveryEntry');
        let txa = Ext.getCmp(prototype.id + '-txaDelivery');
        window.mask('Loading...');
        let url = this.url + '/getDelivery';
        let body = this.getRowData().params;
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
                .then(async response => {
                    const isJson = response.headers.get('content-type').includes('application/json');
                    const data = isJson ? await response.json() : null;

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return await Promise.reject(error);
                    }
                    txa.setValue(data.long);
                    window.unmask('Loading...', '');
                    return;
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    window.unmask('Loading...', '');
                    global.Msg({
                        msg: 'Data not found'
                    });
                    Ext.getCmp(prototype.id + '-LoadDeliveryEntry').close();
                });
    },
    downloadDelivery: function () {
        let filename = this.getRowData().name + '.txt';
        let long = Ext.getCmp(prototype.id + '-txaDelivery').getValue();
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(long));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    },
    onDownloadClick:function(){
        this.downloadDelivery();
    },
    onCancelClick:function(){
        Ext.getCmp(prototype.id + '-LoadDeliveryEntry').close();
    }
});




