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
        me.view.setLoading(true);
        await me.getData(me.view);
        me.view.setLoading(false);

    },

    getData: async function ( view) {
        
        let res = await global.callStoreGet('PRAXIS','SQP05424',view.searchParams);
        let data = res.lstRs.at(0);
        console.log('store', data);
        
        if (data.length === 0) {
            global.Msg({msg: 'Data not Found'});
            return;
        }
        this.view.setStore(data);
        
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
            IN_TICKET: me.view.searchParams.IN_TICKET,
            IN_STNOTUSED:''
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
            IN_TICKET: me.view.searchParams.IN_TICKET,
            IN_STNOTUSED:''
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
    
    
    loadStatusChanged: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        const {FPROC} = record.data;
        
        if (record.data.CSTS === 0){
            global.Msg({msg: 'Data not Found'});
            return;
        };
        
        let params = {
            IN_CCUST: '139',
            IN_FPROCF:FPROC,
            IN_FPROCT:'',
            IN_STVAL: '4',
            IN_TPAX: me.view.searchParams.IN_TPAX,
            IN_FTE: me.view.searchParams.IN_FTE,
            IN_TICKET: me.view.searchParams.IN_TICKET,
            // nuevo campo
            IN_STNOTUSED:''
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
    
    loadNotUsedUsed: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        const {FPROC,STATUSED} = record.data;
        let params = {
            IN_CCUST: '139',
            IN_FPROCF:FPROC,
            IN_FPROCT:'',
            IN_STVAL: '4',
            IN_TPAX: me.view.searchParams.IN_TPAX,
            IN_FTE: me.view.searchParams.IN_FTE,
            IN_TICKET: me.view.searchParams.IN_TICKET,
            IN_STNOTUSED:"USED"
        };
        
        if (record.data.STATUSED === 0){
            global.Msg({msg: 'Data not Found'});
            return;
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
    
    loadNotUsedDiffUsed: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        const {FPROC,STATOTHER} = record.data;
        let params = {
            IN_CCUST: '139',
            IN_FPROCF:FPROC,
            IN_FPROCT:'',
            IN_STVAL: '4',
            IN_TPAX: me.view.searchParams.IN_TPAX,
            IN_FTE: me.view.searchParams.IN_FTE,
            IN_TICKET: me.view.searchParams.IN_TICKET,
            IN_STNOTUSED:"NOTUSED"
        };
        
         if (record.data.STATOTHER === 0){
            global.Msg({msg: 'Data not Found'});
            return;
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
    
    loadNotUsedOk: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        const {FPROC,STATPEND} = record.data;
        let params = {
            IN_CCUST: '139',
            IN_FPROCF:FPROC,
            IN_FPROCT:'',
            IN_STVAL: '4',
            IN_TPAX: me.view.searchParams.IN_TPAX,
            IN_FTE: me.view.searchParams.IN_FTE,
            IN_TICKET: me.view.searchParams.IN_TICKET,
            IN_STNOTUSED:"OK"
        };
        
        if (record.data.STATPEND === 0){
            global.Msg({msg: 'Data not Found'});
            return;
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
    
    downloadExcel: function (btn) {
        const me = this;
        let params = Object.assign({}, me.view.searchParams);
        params.excel = true;
        console.log(params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Download Excel?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.onDownloadExcel();
                        }
                    }
                });
    },
    onDownloadExcel: async function () {
        const me = this;
        const view = me.view;

        view.setLoading(true);
        try {
            let res = await global.callStoreGet('PRAXIS', 'SQP05424', view.searchParams); 
            let data = res.lstRs.at(0);

            if (data.length === 0) {
                global.Msg({ msg: 'Data not Found' });
                view.setLoading(false);
                return;
            }
           
            let excel = data.map(x => ({
                'Processing Date': x.FPROC,
                'Total EMDs': x.TOTEMD,
                'Curr.': x.RMDA,
                'Fare Rev.': x.TARIF,
                'Used Total': x.USED,
                'Used Fare': x.UTARIF,
                'No Used Total': x.PENDIENTE,
                'No Used Fare': x.PTARIF,
                'Status Changed All': x.CSTS,
                'Status Changed Used': x.STATUSED,
                'Status Changed Diff Used': x.STATOTHER,
                'Status Changed Pending': x.STATPEND,
                'Fare St. Chg': x.CSTTARIF

            }));

            await global.writeExcelFromJson(excel, 'Summary EMDS Information');
            view.setLoading(false);
           
        } catch (e) {
            console.log(e);
            view.setLoading(false);

        }},
    
    
    

});


