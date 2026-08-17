/* global fetch */

Ext.define('Ext.Praxis.controller.travelbank.DeliveryFiles.DeliveryEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-deliveryEntryController',
    url: CONTEXTPATH + '/DeliveryFiles',
    searchParams:{},
    /**
     * Constructor
     */
    init:function (view) {
        var me = this;
        this.formatParams(view);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender:function () {
        this.searchDelivery();
    },
    formatParams:function(view){
        const {A4275TYPE,A4275IDFIL} = view.params;
        searchParams = {
            CCUST: '139',
            TIPO: A4275TYPE,
            IDFIL: A4275IDFIL
        };
    },
    searchDelivery: function () {
        let me = this;
        let window = me.view;
        let txa = Ext.getCmp(prototype.id + '-txaDelivery');
        window.mask('Loading...');
        let url = this.url + '/getDeliveryRaw';
        fetch(url + '?' + new URLSearchParams(searchParams))
                .then(async res => {
                    const isJson = res.headers.get('content-type').includes('application/json');
                    const data = isJson ? await res.json() : null;

                    // check for error response
                    if (!res.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || res.status;
                        return Promise.reject(error);
                    }
                    let long = '';
                    data.forEach(x=>long+=(x.maxlong + '\n'));
                    txa.setValue(long);
                    window.unmask();
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    window.unmask('Loading...', '');
                    global.Msg({
                        msg: 'Data not found'
                    });
                    me.view.close();
                });
    },
    downloadDelivery: function () {
        let filename = searchParams.TIPO + '_' + searchParams.IDFIL + '.txt';
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
        this.view.close();
    }
});




