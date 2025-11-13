Ext.define('Ext.Praxis.controller.payments.BPOControlAnalytics.GridBPOControlAnalyticsRendimientoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GridBPOControlAnalyticsRendimientoController',

    afterRender: function (obj, e) {
        const me = this;
        const view = me.view;

        this.getData(view);
        
        
    },

    getData: async function (view) {
        console.log('view', view);
        view.setLoading(true);
        
        view.searchParams.IN_USER =  view.searchParams.IN_USER === 'All' ? '' : view.searchParams.IN_USER;

        let store = await global.callStoreGet('PRAXISMP', 'SQP05743', view.searchParams);
        console.log('stores', store);

        let data = store?.lstRs?.[0] || [];

        console.log('data', data);

        if (data.length === 0) {
            view.setLoading(false);
            global.Msg({ msg: 'Data not found' });
            return;
        }
        view.setStore(data);

        view.setLoading(false);
    },



    downloadExcel: function () {
        const me = this;
        const notifier = new AWN();
        notifier.confirm('Download Excel', () => me.onDownloadExcel(), null);
    },

    onDownloadExcel: async function () {
        const me = this;
        const view = me.view;
        view.setLoading(true);
        let res = await global.callStorePagginExcel('', '', view.searchParams);

        const data = (res?.length > 0)
            ? res.map(x => ({ ID: x.A2439ID }))
            : [{ ID: "" }];

        await global.writeExcelFromJson(data, 'TaxLoadLog Information');
        view.setLoading(false);
    },

});
