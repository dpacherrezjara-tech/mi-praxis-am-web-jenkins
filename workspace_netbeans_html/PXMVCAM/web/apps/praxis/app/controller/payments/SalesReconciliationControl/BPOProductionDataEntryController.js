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

        const excelFieldsByPayment = [
            {title: 'Worked Date',      field: 'FEUP',          order: 1  },
            {title: 'Worked Hour',      field: 'HOUP',          order: 2  },
            {title: 'Username',         field: 'USUP',          order: 3  },
            {title: 'Doc. Type',        field: 'TRANSTYPE',     order: 4  },
            {title: 'Processor',        field: 'DESC_PROCTYPE', order: 5  },
            {title: 'Country',          field: 'SCOUNTRY',      order: 6  },
            {title: 'Processing Date',  field: 'PRDA',          order: 7  },
            {title: 'Status',           field: 'STVAL_DESCRIPTION', order: 8  },
            {title: 'Card Number',      field: 'SCARDN',        order: 9  },
            {title: 'Auth Code',        field: 'SAUTHOC',       order: 10 },
            {title: 'Amount',           field: 'TGROSAMOUN',    order: 11 },
            {title: 'Currency',         field: 'SCURRENCY',     order: 12 },
            {title: 'PNR',              field: 'SPNR',          order: 13 },
            {title: 'Qty Tkts',         field: 'QTYTKT',        order: 14 },
            {title: 'Ticket',           field: 'TICKET',        order: 15 },
            {title: 'Reference Number', field: 'AREFNBR',       order: 16 },
            {title: 'Adjustment',       field: 'DESC_CODADJU',  order: 17 },
            {title: 'BPO Comment',      field: 'BPOCOMENT',     order: 18 }
        ];

        const excelFieldsByTicket = [
            {title: 'Worked Date', field: 'A4501FEUP',     order: 1  },
            {title: 'Worked Hour', field: 'A4501HOUP',     order: 2  },
            {title: 'Username',    field: 'A4501USUP',     order: 3  },
            {title: 'Doc. Type',   field: 'A4496TRNCU',    order: 4  },
            {title: 'Processor',   field: 'DESC_PROCTYPE', order: 5  },
            {title: 'Country',     field: 'A4496PAIS',     order: 6  },
            {title: 'Sale Date',   field: 'A4496FECVT',    order: 7  },
            {title: 'Status',      field: 'STVAL_DESCRIPTION',order: 8  },
            {title: 'Card Number', field: 'A4501NREF',     order: 9  },
            {title: 'Auth Code',   field: 'A4501CAPL',     order: 10 },
            {title: 'Amount',      field: 'A4501VFOP',     order: 11 },
            {title: 'Currency',    field: 'A4501MFOP',     order: 12 },
            {title: 'PNR',         field: 'A4496PNR',      order: 13 },
            {title: 'Card Type',   field: 'DESC_TARJ',     order: 14 },
            {title: 'Ticket',      field: 'TICKET',        order: 15 },
            {title: 'BPO Comment', field: 'BPO_COMEN',     order: 16 },
            {title: 'ADM Comment', field: 'ADM_COMEN',     order: 17 }
        ];

        const isPayment = params.IN_ORIG === 'P';
        const excelFields = isPayment ? excelFieldsByPayment : excelFieldsByTicket;
        const filename = isPayment ? 'BPO Production By Payment' : 'BPO Production By Ticket';

        try {
            await global.callStoreDownloadExcel('PRAXISMP', 'SQP05247', params, filename, excelFields);
        } catch (e) {
            global.Msg({msg: 'Error on Export'});
        }
    }
});

