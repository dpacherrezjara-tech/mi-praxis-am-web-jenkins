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

    },
    loadStatusChanged: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        const {FPROC} = record.data;
        let params = {
            IN_CCUST: '139',
            IN_FPROCF:FPROC,
            IN_FPROCT:'',
            IN_STVAL: '4',
            IN_TPAX: me.view.searchParams.IN_TPAX,
            IN_FTE: me.view.searchParams.IN_FTE,
            IN_TICKET: me.view.searchParams.IN_TICKET
        };
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const newPanel = Ext.create('Ext.Praxis.view.flown.EmdsSabreForm.Grids.DetailGrid',{
            id: prototype.id + '-DetailGrid-1',
            searchParams: params,
            backButton: ()=> {
                mainPanel.items.items.at(-1).destroy();
                mainPanel.items.items.at(-1).show();
            }
        });
        mainPanel.add(newPanel);
    },
    loadUsed: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        const {FPROC} = record.data;
        let params = {
            IN_CCUST: '139',
            IN_FPROCF:FPROC,
            IN_FPROCT:'',
            IN_STVAL: '1',
            IN_TPAX: me.view.searchParams.IN_TPAX,
            IN_FTE: me.view.searchParams.IN_FTE,
            IN_TICKET: me.view.searchParams.IN_TICKET
        };
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const newPanel = Ext.create('Ext.Praxis.view.flown.EmdsSabreForm.Grids.DetailGrid',{
            id: prototype.id + '-DetailGrid-1',
            searchParams: params,
            backButton: ()=> {
                mainPanel.items.items.at(-1).destroy();
                mainPanel.items.items.at(-1).show();
            }
        });
        mainPanel.add(newPanel);
    },
    loadNotUsed: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        const {FPROC} = record.data;
        let params = {
            IN_CCUST: '139',
            IN_FPROCF:FPROC,
            IN_FPROCT:'',
            IN_STVAL: 'X',
            IN_TPAX: me.view.searchParams.IN_TPAX,
            IN_FTE: me.view.searchParams.IN_FTE,
            IN_TICKET: me.view.searchParams.IN_TICKET
        };
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.items.items.at(-1).hide();
        const newPanel = Ext.create('Ext.Praxis.view.flown.EmdsSabreForm.Grids.DetailGrid',{
            id: prototype.id + '-DetailGrid-1',
            searchParams: params,
            backButton: ()=> {
                mainPanel.items.items.at(-1).destroy();
                mainPanel.items.items.at(-1).show();
            }
        });
        mainPanel.add(newPanel);
    }

});


