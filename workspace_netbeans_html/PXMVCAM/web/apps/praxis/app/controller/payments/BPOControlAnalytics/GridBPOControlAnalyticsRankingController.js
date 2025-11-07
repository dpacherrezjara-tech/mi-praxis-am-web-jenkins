Ext.define('Ext.Praxis.controller.payments.BPOControlAnalytics.GridBPOControlAnalyticsRankingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GridBPOControlAnalyticsRankingController',

    afterRender: function (obj, e) {
        const me = this;
        const view = me.view;
        
        this.getData(view);
        
    },

    getData: async function (view) {
        console.log('view', view);
        view.setLoading(true);

        let store = await global.callStoreGet('PRAXISMP', 'SQP05743', view.searchParams);
        console.log('stores', store);

        let data = store?.lstRs?.[0] || [];

        console.log('data', data);

        if (data.length === 0) {
            global.Msg({ msg: 'Data not found' });
            return;
        }

        const gridStore = Ext.create('Ext.data.Store', {
            fields: Object.keys(data[0] || {}), // genera los campos dinámicamente
            data: data
        });

        view.setStore(gridStore);
        // view.setStore(data);

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

    renderRanking: function(value) {
        var medal = '';
        if (value === 1) medal = '🥇';
        else if (value === 2) medal = '🥈';
        else if (value === 3) medal = '🥉';
        
        return '<div style="text-align:center;font-size:20px;">' +
               medal + ' <span style="font-weight:700;">' + value + '</span></div>';
    },


});
