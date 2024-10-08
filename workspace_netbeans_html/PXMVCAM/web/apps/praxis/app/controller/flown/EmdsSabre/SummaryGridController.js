Ext.define('Ext.Praxis.controller.flown.EmdsSabre.SummaryGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SummaryGridController',
    request: axios.create({
        baseURL: CONTEXTPATH + '/EmdsSabre',
        timeout: 20000
    }),
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        const me = this;
        me.view.mask('Loading...');
        let params = me.view.searchParams;
        try {
            const res = await me.request.get('/loadSummary', {
                params: params
            });
            const {data} = res;
            if (data.response.length === 0) {
                global.Msg({msg: 'No Data'});
            }
            let store = new Ext.data.Store({
                data: data.response
            });
            me.view.setStore(store);
        } catch (e) {
            console.error(e);
            global.Msg({msg: 'Error'});
        } finally {
            me.view.unmask();
        }

    }

});


