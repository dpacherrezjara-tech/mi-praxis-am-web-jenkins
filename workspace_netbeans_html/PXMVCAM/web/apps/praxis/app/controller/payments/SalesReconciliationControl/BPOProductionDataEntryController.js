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
        try {
            const res = await global.callStoreGet('PRAXISMP', 'SQP05202', params);
            const data = res?.lstRs?.[0] || [];
            let summStore = Ext.create('Ext.data.Store', {
                data: data
            });
            gridSumm.setStore(summStore);
            gridSumm.bindStore(summStore);
            gridDetail.setTitle('Detail');
            gridDetail.getStore().removeAll();
        } catch (e) {
            global.Msg({msg: 'Error loading production'});
        } finally {
            gridSumm.getView().unmask();
        }
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
        try {
            const res = await global.callStoreGet('PRAXISMP', 'SQP05203', params);
            const data = res?.lstRs?.[0] || [];
            let detStore = Ext.create('Ext.data.Store', {
                data: data
            });
            gridDetail.setTitle(`Detail ${title} - ${params.IN_USUP} - ${params.IN_FEUP}`);
            gridDetail.setStore(detStore);
            gridDetail.bindStore(detStore);
        } catch (e) {
            global.Msg({msg: 'Error loading detail'});
        } finally {
            gridDetail.getView().unmask();
        }
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
            IN_USUP: obj.get('USUP'),
            IN_FEUP: obj.get('FEUP'),
            IN_TRANSTYPE: filterVal.IN_TRANSTYPE,
            IN_STVAL: filterVal.IN_STVAL,
            IN_ORIG: filterVal.IN_ORIG
        };
        return params;
    },
    onChangeOrigin:function(){
        this.getSummary();
    },
    onExportExcelBtn: async function () {
        const me = this;
        const formFilter = Ext.getCmp(prototype.idDeProd + '-formFilters').getForm();
        let params = me.formatParams(formFilter);
        try {
            const res = await global.callStoreGet('PRAXISMP', 'SQP05247', params);
            const data = res?.lstRs?.[0] || [];
            await global.writeExcelFromJsonWithStyle({
                data: data,
                name: 'BPO_Production',
                sheetName: 'Production',
                columns: [
                    {field: 'FEUP',         title: 'Worked Date',   dataAlign: 'center'},
                    {field: 'USUP',         title: 'Username',      dataAlign: 'center'},
                    {field: 'TRANSTYPE',    title: 'Doc. Type',     dataAlign: 'center'},
                    {field: 'STVAL',        title: 'Status',        dataAlign: 'center'},
                    {field: 'SCOUNTRY',     title: 'Country',       dataAlign: 'center'},
                    {field: 'DESC_PROCTYPE',title: 'Processor',     dataAlign: 'left'},
                    {field: 'QTRN',         title: 'Qty Trnx',      dataAlign: 'center'}
                ]
            });
        } catch (e) {
            global.Msg({msg: 'Error on Export'});
        }
    }
});

