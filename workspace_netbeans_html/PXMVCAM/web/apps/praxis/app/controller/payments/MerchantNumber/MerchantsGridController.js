Ext.define('Ext.Praxis.controller.payments.MerchantNumber.MerchantsGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MerchantsGridController',
    url: CONTEXTPATH + '/MerchantNumberTmz',
    init: function (view) {
    },
    afterRender: function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData({view: view});
    },
    getData: function ({view}) {
        let store = global.callStorePaggin('PRAXISMP', 'SQP05254', view.searchParams);
        view.setStore(store);
    },
    onEditClick: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.MerchantNumberForm.DataEntrys.MerchantMaintenanceDataEntry', {
            id: prototype.id + '-MerchantMaintenanceDataEntry-1',
            option: 'U',
            searchParams: me.formatEditParams(record.data),
            obj: record.data
        });
        dataEntry.show();
    },
    onDeleteClick: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const merchant = record.data.MERCHN;
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.deleteMerchantNumber(merchant);
                }
            }
        });
    },
    deleteMerchantNumber: async function (merchant) {
        let params = {
            IN_MERCHN: merchant,
            IN_CCUST: '139',
            IN_CHOPTION: 'D'
        };
        const expectedParams = [
            'IN_CHOPTION', 'IN_CCUST', 'IN_MERCHN', 'IN_DESCR', 'IN_RSOCIAL',
            'IN_CIATA', 'IN_CANAL', 'IN_SCOUNTRY', 'IN_UNIOPE', 'IN_CODCLIT1',
            'IN_DIRCLIT1', 'IN_CODCLIT2', 'IN_DIRCLIT2', 'IN_MERCHP', 'IN_STATUS',
            'IN_CODAGRUP', 'IN_DESCAGRUP', 'IN_FECHAINI', 'IN_FECHAFIN'
        ];
        expectedParams.forEach(param => {
            if (!(param in params)) {
                params[param] = '';
            }
        });
        try {
            const res = await global.callStorePost('PRAXISMP', 'SQP05256', params);
            const {INOUT_STATUS, INOUT_MESSAGE} = res.data.lstVals;
            if (INOUT_STATUS === 1) {
                global.Msg({msg: 'Deleted Successfull'});
                Ext.getCmp(prototype.id + '-MerchantsGrid-1').getStore().load();
            } else {
                Ext.MessageBox.show({
                    title: 'Error',
                    message: INOUT_MESSAGE || 'Error!<br>Check Console for more<br>Information.',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.MessageBox.OK
                });
            }
        } catch (e) {
            console.error('Error deleteMerchantNumber', e);
            Ext.MessageBox.show({
                title: 'Error',
                message: 'Error!<br>Check Console for more<br>Information.',
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.MessageBox.OK
            });
        }
    },
    formatEditParams: function (rec) {
        let params = {
            IN_CCUST: '139',
            IN_MERCHN: rec.MERCHN
        };
        return params;
    },
    onDownloadExcel: async function () {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: async function (btn) {
                if (btn === 'yes') {
                    this.downloadExcel();
                }
            }
        });
    },
    downloadExcel: async function () {
        const view = this.view;
        view.setLoading(true);
        try {
            const excelFields = [
                {title: 'Merchant Nbr.',          field: 'MERCHN',            order: 0},
                {title: 'Merchant Name',          field: 'DESCR',             order: 1},
                {title: 'Status',                 field: 'STATUS_DESCRIPTION',order: 2},
                {title: 'Operative Unit',         field: 'UNIOPE_DESCRIPTION',order: 3},
                {title: 'Channel',                field: 'CANAL',             order: 4},
                {title: 'Social Reason',          field: 'RSOCIAL',           order: 5},
                {title: 'Merchant Payment',       field: 'MERCHP',            order: 6},
                {title: 'Country',                field: 'SCOUNTRY',          order: 7},
                {title: 'IATA Code',              field: 'CIATA',             order: 8},
                {title: 'IATA Name',              field: 'NIATA',             order: 9},
                {title: 'Comm. Client Code',      field: 'CODCLIT1',          order: 10},
                {title: 'Comm. Client Address',   field: 'DIRCLIT1',          order: 11},
                {title: 'Chbk. Client Code',      field: 'CODCLIT2',          order: 12},
                {title: 'Chbk. Client Address',   field: 'DIRCLIT2',          order: 13}
            ];
            const dateStr = win.getFechaFormat();
            await global.callStoreDownloadExcel('PRAXISMP', 'SQP05254', view.searchParams, 'MerchantNumberTmz - ' + dateStr, excelFields);
        } catch (e) {
            console.error('Error downloadExcel', e);
            global.Msg({msg: 'Error downloading file'});
        } finally {
            view.setLoading(false);
        }
    }
});
