Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.CreditCardFilterDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CreditCardFilterDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    init: function (view) {
        prototype.idCcardf = prototype.id + '-CreditCardFilterDataEntry';
    },
    afterRender: async function () {
        const me = this;
        let params = me.formatInitParams(me.view.searchParams);
        await this.getData(params);
        me.view.center();
    },
    onClickSearchBtn: function () {
        this.getData(null);
    },
    getData: function (obj) {
        const me = this;
        const gridSumm = Ext.getCmp(prototype.idCcardf + '-gridSummary');
        const formFilter = Ext.getCmp(prototype.idCcardf + '-formFilters').getForm();
        let params = obj ? { ...obj } : me.formatParams(formFilter);
        params.IN_PROCTYPE = params.IN_PROCTYPE || '';
        params.IN_SCARDN = params.IN_SCARDN || '';
        params.IN_STVAL = params.IN_STVAL || '';
        
        const store = global.callStorePaggin('PRAXISMP', 'SQP05206', params);
        store.on('load', function(s, records, successful) {
            if (successful && records.length === 0) {
                global.Msg({msg: 'Data not Found'});
            } else if (!successful) {
                global.Msg({msg: 'Error in Load'});
            }
        });
   
        gridSumm.setStore(store);
        
    },
    onSearchCreditCard: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const obj = Object.assign({}, record.data);
        obj.fvoid = '';
        obj.cellIndex = cellIndex;
        Ext.getCmp(prototype.id + '-cmbFiltersBP').setValue('F');
        const detailFilter = Ext.getCmp(prototype.id + '-formFiltersBP-2').getForm();
        detailFilter.reset();
        let params = this.formatBrowserParams(obj);
        console.log('Parametros: ', params);
        detailFilter.setValues(params);
        const btnSearch = Ext.getCmp(prototype.id + '-btnSearch');
        btnSearch.fireEvent('click');
        this.view.close();
    },
    onSearchTranstypeCC: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const obj = Object.assign({}, record.data);
        obj.fvoid = '';
        obj.cellIndex = cellIndex;
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        Ext.getCmp(prototype.id + '-cmbFiltersBP').setValue('F');
        const detailFilter = Ext.getCmp(prototype.id + '-formFiltersBP-2').getForm();
        detailFilter.reset();
        let params = this.formatBrowserParams(obj);
        console.log('Parametros: ', params);
        detailFilter.setValues(params);
        const btnSearch = Ext.getCmp(prototype.id + '-btnSearch');
        btnSearch.fireEvent('click');
        this.view.close();
    },
    onSearchVoidCC: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const obj = Object.assign({}, record.data);
        obj.fvoid = 'V';
        obj.cellIndex = cellIndex;
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        Ext.getCmp(prototype.id + '-cmbFiltersBP').setValue('F');
        const detailFilter = Ext.getCmp(prototype.id + '-formFiltersBP-2').getForm();
        detailFilter.reset();
        let params = this.formatBrowserParams(obj);
        console.log('Parametros: ', params);
        detailFilter.setValues(params);
        const btnSearch = Ext.getCmp(prototype.id + '-btnSearch');
        btnSearch.fireEvent('click');
        this.view.close();
    },
    formatBrowserParams: function (obj) {
        const opts = {
            5: 'SALE',
            6: 'RFND',
            7: 'CHBK',
            8: 'ADJU'
        };
        const stval = Ext.getCmp(prototype.idCcardf + '-formFilters')
                .getForm().getValues().IN_STVAL;
        let params = {
            IN_DATE: 'PRDA',
            IN_DATEFROM: obj.PRDA,
            IN_DATETO: obj.PRDA,
            IN_PROCTYPE: obj.PROCTYPE.trim(),
            IN_SCOUNTRY: obj.SCOUNTRY.trim(),
            IN_TRANSTYPE: opts[obj.cellIndex] ? opts[obj.cellIndex] : '',
            IN_FVOID: obj.fvoid,
            IN_STVAL: stval,
            creditcard: obj.SCARDN.slice(0, 6),
            creditcard2: obj.PROCTYPE.trim() === 'BANORTE00' ?
                    obj.SCARDN.trim().slice(-2) :
                    obj.SCARDN.trim().slice(-4)
        };
        return params;
    },
    formatParams: function (form) {
        const initParams = this.view.searchParams;
        let obj = form.getValues();
        let creditcard = `${obj.creditcard.at(0)}%${obj.creditcard.at(1)}%`;
        let params = {
            IN_CCUST: '139',
            IN_FROM: obj.IN_FROM,
            IN_TO: obj.IN_TO,
            IN_PROCTYPE: initParams.IN_PROCTYPE || '',
            IN_SCOUNTRY: initParams.IN_SCOUNTRY || '',
            IN_SCARDN: creditcard,
            IN_STVAL: obj.IN_STVAL
        };
        return params;
    },
    formatInitParams: function (obj) {
        let params = {
            IN_CCUST: '139',
            IN_FROM: obj.IN_DATEFROM,
            IN_TO: obj.IN_DATETO,
            IN_PROCTYPE: obj.IN_PROCTYPE,
            IN_SCOUNTRY: obj.IN_SCOUNTRY
        };
        Ext.getCmp(prototype.idCcardf + '-formFilters').getForm().setValues(params);
        return params;
    }
});
