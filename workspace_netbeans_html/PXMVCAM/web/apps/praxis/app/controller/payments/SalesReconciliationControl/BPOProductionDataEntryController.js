Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.BPOProductionDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BPOProductionDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    init: function (view) {
        prototype.idDeProd = prototype.id + '-BPOProductionDataEntry';
    },
    afterRender: async function (obj, e) {
        await this.getSummary();
    },
    onClickSearchBtn: async function () {
        await this.getSummary();
    },
    getSummary: async function () {
        const me = this;
        const formFilter = Ext.getCmp(prototype.idDeProd + '-formFilters').getForm();
        let params = me.formatParams(formFilter);
        
        const gridSumm = Ext.getCmp(prototype.idDeProd + '-gridSummary');
        let gridDetail = {};
        
        if(params.IN_ORIG==='P'){
            gridDetail = Ext.getCmp(prototype.idDeProd + '-gridDetail');
            Ext.getCmp(prototype.idDeProd + '-gridDetail2').hide();
        }else{
            gridDetail = Ext.getCmp(prototype.idDeProd + '-gridDetail2');
            Ext.getCmp(prototype.idDeProd + '-gridDetail').hide();
        }
        gridDetail.show();
        gridSumm.getView().mask('Loading...');
        const res = await fetch(`${me.url}/loadProductionBp?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            let summStore = Ext.create('Ext.data.Store', {
                data: data.response
            });
            gridSumm.setStore(summStore);
            gridSumm.bindStore(summStore);
            gridDetail.setTitle('Detail');
            gridDetail.getStore().removeAll();
        }
        gridSumm.getView().unmask();
    },
    getDetail: async function (rec) {
        const me = this;
        let params = me.formatDetailParams(rec);
        let gridDetail = {};
        let title = '';
        if(params.IN_ORIG==='P'){
            title = 'By Payment';
            gridDetail = Ext.getCmp(prototype.idDeProd + '-gridDetail');
            Ext.getCmp(prototype.idDeProd + '-gridDetail2').hide();
        }else{
            title = 'By Ticket';
            gridDetail = Ext.getCmp(prototype.idDeProd + '-gridDetail2');
            Ext.getCmp(prototype.idDeProd + '-gridDetail').hide();
        }
        gridDetail.show();
        gridDetail.getView().mask('Loading...');
        const res = await fetch(`${me.url}/loadProductionBpDetail?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            let detStore = Ext.create('Ext.data.Store', {
                data: data.response
            });
            gridDetail.setTitle(`Detail ${title} - ${params.IN_USUP} - ${params.IN_FEUP}`);
            gridDetail.setStore(detStore);
            gridDetail.bindStore(detStore);
        }
        gridDetail.getView().unmask();
    },
    onClickUser:function(grid, record, item, index, e, eOpts){
        this.getDetail(record);
    },
    formatParams: function (form) {
        let params = {
            IN_CCUST: '139',
            ...form.getValues()
        };
        return params;
    },
    formatDetailParams: function (obj) {
        const filterVal = Ext.getCmp(prototype.idDeProd + '-formFilters').getForm().getValues();
        let params = {
            IN_CCUST: '139',
            IN_USUP: obj.get('usup'),
            IN_FEUP: obj.get('feup'),
            IN_TRANSTYPE: filterVal.IN_TRANSTYPE,
            IN_STVAL: filterVal.IN_STVAL,
            IN_ORIG: filterVal.IN_ORIG
        };
        return params;
    },
    onChangeOrigin:function(){
        this.getSummary();
    },
    onExportExcelBtn:function(){
        const formFilter = Ext.getCmp(prototype.idDeProd + '-formFilters').getForm();
        let params = this.formatParams(formFilter);
        global.getFile(`${this.url}/downloadProduction?${new URLSearchParams(params)}`);
    }
});

