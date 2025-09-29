Ext.define('Ext.Praxis.controller.sales.AccountingMasterProcess2.DataEntryLogsSalesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryLogsSalesController',
    url: CONTEXTPATH + '/AccountingReport',
    afterRender: function () {
        this.loadLogger();
    },
    loadLogger: async function () {
        const me = this;
        const grid = Ext.getCmp(prototype.idDESales + '-gridLogger');
        try {
            grid.setLoading(true);
            const res = await global.callStoreGet('PRAXIS', 'SQP05726', me.view.searchParams);
            if (res.lstRs.length) {
                let data = res.lstRs.at(0);
                if (data.length > 0) {
                    grid.setStore(new Ext.data.Store({data: data}));
                } else {
                    global.Msg({msg: 'No data'});
                }
            } else {
                global.Msg({msg: 'No data'});
            }
        } catch (e) {
            console.error(e);
        } finally {
            grid.setLoading(false);
            me.view.center();
        }

    },
    onCancelClick: function () {
        this.view.close();
    },
    onReloadGrid: function () {
        this.loadLogger();
    }
});


