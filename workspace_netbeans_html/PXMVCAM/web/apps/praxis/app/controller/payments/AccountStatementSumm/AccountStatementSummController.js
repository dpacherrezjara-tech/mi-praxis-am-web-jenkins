Ext.define('Ext.Praxis.controller.payments.AccountStatementSumm.AccountStatementSummController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountStatementSummController',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
    },
    onSearchClickBtn: function(){
        this.searchSummary();
    },
    searchSummary: async function(){
        let params = this.formatSummaryParams();
        const tree = Ext.getCmp(prototype.id + '-treeSummary');
        const opts = {
          '1':'Sale Date',
          '2':'Processing Date',
          '3':'File Date'
        };
        tree.setTitle(`${opts[params.IN_TDATE]}-${params.IN_DATE}`);
        tree.setLoading(true);
        
        const res = await global.callStoreGet('PRAXISMP','SQP05552',params);
        
        if(res.lstRs){
            let rawData = res.lstRs.at(0);
        
            const grouped = {};
            rawData.forEach(item => {
                if (!grouped[item.A4700IDCON]) {
                    grouped[item.A4700IDCON] = [];
                }
                grouped[item.A4700IDCON].push({
                    leaf: true,
                    INDEX: item.A4700FOP !== 'CA'? `${item.A4700FOP}-${item.A4700TARJ}`: 'CASH',
                    TARJ: item.A4700TARJ,
                    PAIS: item.A4700PAIS,
                    TDATE: params.IN_TDATE,
                    DATE: params.IN_DATE,
                    CONTEO: item.CONTEO,
                    CONCIL: item.CONCIL,
                    PENDING: item.PENDING,
                    IDCON: item.A4700IDCON,
                    FUENT: item.A4700FUENT,
                    SFUEN: item.A4700SFUEN,
                    GRUPO: item.A4700FOPAG,
                    FOP: item.A4700FOP,
                    COLOR:'D'
                });
            });

            const treeData = Object.keys(grouped).map(key => ({
                text: key,
                expanded: true,
                CONTEO:global.sumBy(grouped[key],'CONTEO'),
                CONCIL:global.sumBy(grouped[key],'CONCIL'),
                PENDING:global.sumBy(grouped[key],'PENDING'),
                INDEX: grouped[key].at(0).IDCON.trim() === '' ? 'Blank ID' :grouped[key].at(0).IDCON,
                IDCON: grouped[key].at(0).IDCON.trim(),
                TDATE: params.IN_TDATE,
                DATE: params.IN_DATE,
                children: grouped[key],
                COLOR:'H'
            }));
            
            

            const store = Ext.create('Ext.data.TreeStore', {
                root: {
                    expanded: true,
                    children: treeData
                }
            });
            
            tree.setStore(store);
        }
        
        tree.setLoading(false);
    },
    backDetailSummary: function(){
        const detail = Ext.getCmp(prototype.id + '-detailSummary');
        detail.getStore().removeAll();
        detail.hide();
        const tree = Ext.getCmp(prototype.id + '-treeSummary');
        tree.show();
    },
    loadQty:async function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const tree = Ext.getCmp(prototype.id + '-treeSummary');
        tree.hide();
        const detail = Ext.getCmp(prototype.id + '-detailSummary');
        detail.show();
        let params = this.formatDetailParams(record.data,'');
        console.log(params);
        let store = await global.callStorePaggin('PRAXISMP','SQP05553',params);
        detail.setStore(store);
    },
    loadConcil:async function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const tree = Ext.getCmp(prototype.id + '-treeSummary');
        tree.hide();
        const detail = Ext.getCmp(prototype.id + '-detailSummary');
        detail.show();
        let params = this.formatDetailParams(record.data,'M');
        console.log(params);
        let store = await global.callStorePaggin('PRAXISMP','SQP05553',params);
        detail.setStore(store);
    },
    loadPending:async function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const tree = Ext.getCmp(prototype.id + '-treeSummary');
        tree.hide();
        const detail = Ext.getCmp(prototype.id + '-detailSummary');
        detail.show();
        let params = this.formatDetailParams(record.data,'P');
        console.log(params);
        let store = await global.callStorePaggin('PRAXISMP','SQP05553',params);
        detail.setStore(store);
    },
    formatSummaryParams: function(){
        return Ext.getCmp(prototype.id + '-panelFilters').getForm().getValues();
    },
    formatDetailParams: function(data,status){
        let res = {
            IN_CCUST: '139',
            IN_TDATE: data.TDATE,
            IN_DATE: data.DATE,
            IN_FOP:data.FOP,
            IN_TARJ: data.TARJ,
            IN_PAIS:data.PAIS,
            IN_FUENT: data.FUENT,
            IN_SFUEN:data.SFUEN,
            IN_IDCON:(data.IDCON||'') .trim() === '' ? 'NONE': data.IDCON,
            IN_STATUS:status
        };
        return res;
    }

});


