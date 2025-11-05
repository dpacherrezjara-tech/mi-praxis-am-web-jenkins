Ext.define('Ext.Praxis.controller.payments.BPOControlAnalytics.GridBPOControlAnalyticsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GridBPOControlAnalyticsController',
    afterRender: function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData(view);
    },
    getData: async function (view) {
        console.log('view', view);
        let store = global.callStorePaggin('PXFARES', '', view.searchParams);
        console.log('stores', store)
        this.view.setStore(store);
    },

    downloadExcel: function () {
        const me = this;
        const notifier = new AWN();
        notifier.confirm(
                'Download Excel',
                () => {
            me.onDownloadExcel();
        },
                null
                );
    },

    onDownloadExcel: async function () {
        const me = this;
        const view = me.view;
        view.setLoading(true);
        let res = await global.callStorePagginExcel('', '', view.searchParams);  //trae toda la data completa

        const data = (res?.length > 0)
                ? res.map(x => ({
                        ID: x.A2439ID,
                    }))
                : [{
                        ID: "",
                    }];



        await global.writeExcelFromJson(data, 'TaxLoadLog Information'); // formatea la data para usarlo en la función de descarga
        view.setLoading(false);
    },

});


