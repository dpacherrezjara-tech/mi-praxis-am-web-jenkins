Ext.define('Ext.Praxis.controller.payments.ErrorControl.ErrorControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ErrorControlController',
    fecha: new Date(),
    url: CONTEXTPATH + '/ErrorControl',
    loadParams: null,
    formatParams: null,
    init: function (view) {
        prototype.id = 'ErrorControlForm';
        prototype.url = CONTEXTPATH + '/ErrorControl';
    },
    afterRender: async function (obj, e) {
        await this.loadFilters();
        this.onClickSearchBtn();
    },
    loadFilters: async function () {
        const panelFilters = Ext.getCmp(prototype.id + '-contentFilter');
        const errorCmb = Ext.getCmp(prototype.id + '-cmbError');
        const procsCmb = Ext.getCmp(prototype.id + '-cmbProcessor');
        //prototype.id + '-cmbProcessor'
        panelFilters.setLoading(true);
        const res = await global.callStoreGet('PRAXISMP', 'SQP05019', {});
        let errores = res.lstRs.at(0);
        let procesadores = res.lstRs.at(1);
        global.setComboStore(errorCmb, errores, 'CODE', 'NAME', '');
        global.setComboStore(procsCmb, procesadores, 'CODE', 'NAME', '');
        panelFilters.setLoading(false);
    },
    onClickSearchBtn: function () {
        const radioBtn = Ext.getCmp(prototype.id + '-viewOption').lastValue;
        this.onChangeModule(null, radioBtn);
        switch (radioBtn.opcion) {
            case 'L':
                this.searchLoadErrors();
                break;
            case 'F':
                this.searchFormatErrors();
                break;
        }
    },
    onChangeModule: function (btn, value) {
        const loadFilters = Ext.getCmp(prototype.id + '-panelFilters');
        const formatFilters = Ext.getCmp(prototype.id + '-panelFilters2');
        const loadContent = Ext.getCmp(prototype.id + '-contentLoad');
        const formatContent = Ext.getCmp(prototype.id + '-contentFormat');
        loadFilters.hide();
        formatFilters.hide();
        loadContent.hide();
        formatContent.hide();
        switch (value.opcion) {
            case 'L':
                loadFilters.show();
                loadContent.show();
                break;
            case 'F':
                formatFilters.show();
                formatContent.show();
                break;
        }
    },
    searchLoadErrors: async function () {
        const grid = Ext.getCmp(prototype.id + '-loadErrorGrid');
        let params = this.formatLoadParams();
        console.log(params);
        let store = await global.callStorePaggin('PRAXISMP', 'SQP05559', params);
        grid.setStore(store);
    },
    searchFormatErrors: async function () {
        const grid = Ext.getCmp(prototype.id + '-formatErrorGrid');
        grid.setLoading(true);
        let params = this.formatFormatParams();
        console.log(params);
        const res = await global.callStoreGet('PRAXISMP', 'SQP05020', params);
        if (res.lstRs) {
            let store = new Ext.data.Store({
                data: res.lstRs.at(0),
                pageSize: 20,
                proxy: {
                    type: 'memory',
                    enablePaging: true
                }
            });
            grid.setStore(store);
        }
        grid.setLoading(false);
    },
    loadFormatErrors: async function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const {A4481FPROC, A4481TYPEP} = record.data;
        const gridSumm = Ext.getCmp(prototype.id + '-formatErrorGrid');
        const gridDet = Ext.getCmp(prototype.id + '-formatErrorDetGrid');
        gridSumm.hide();
        gridDet.show();
        let params = {
            DATE_FROM: A4481FPROC,
            ARCHIVO: A4481TYPEP.trim(),
            CERROR: this.formatParams.CERROR,
            STS_ERROR: this.formatParams.STS_ERROR,
            TIPO_CORRECCION: this.formatParams.TIPO_CORRECCION
        };
        console.log(params);
        let store = global.callStorePaggin('PRAXISMP', 'SQP05021', params);
        gridDet.setStore(store);
    },
    openAuditDataEntry: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let rec = record.data;
        let url = CONTEXTPATH + '/ErrorControl';
        let params = {
            IN_CCUST: rec.A4481CCUST,
            IN_PROCTYPE: rec.A4481TYPEP.trim(),
            IN_TKT: rec.A4481CIA + rec.A4481FORMA + rec.A4481SERIE,
            IN_IDREF: rec.A4481IDREF.trim()
        };
        console.log(params);
        const opts = {
            'VN0002': () => {
                const VN0002dataEntry = Ext.create('Ext.Praxis.view.payments.ErrorControlForm.DataEntrys.FormatDataEntry', {
                    id: prototype.id + '-formatDataEntry',
                    searchParams: params,
                    searchUrl: url + '/loadVN0002Info'
                });
                VN0002dataEntry.show();
            }
        };
        if (opts[rec.A4481CODER]) {
            opts[rec.A4481CODER]();
        } else {
            global.Msg({
                msg: 'Function not implemented'
            });
        }
    },
    backFormatErrorSumm: function () {
        const gridSumm = Ext.getCmp(prototype.id + '-formatErrorGrid');
        const gridDet = Ext.getCmp(prototype.id + '-formatErrorDetGrid');
        gridDet.hide();
        gridSumm.show();
    },
    formatLoadParams: function () {
        this.loadParams = Ext.getCmp(prototype.id + '-panelFilters').getForm().getValues();
        return this.loadParams;
    },
    formatFormatParams: function () {
        this.formatParams = Ext.getCmp(prototype.id + '-panelFilters2').getForm().getValues();
        return this.formatParams;
    },
    downloadLoadErrors: async function () {
        const me = this;
        let notifier = new AWN();
        let params = this.formatLoadParams();
        
        console.log("params = ",params);
        
        let onOk = async () => {
            let loadExcel = async () => {
                const res = await global.callStorePagginExcel('PRAXISMP', 'SQP05559', params);
                const opts = {
                    'Y': 'OK',
                    'N': 'Error',
                    'P': 'Process'
                };
                let data = res.map(x => ({
                        'Processing Date': x.A4701PRDA,
                        'Process': x.A4701PROCE,
                        'File': x.A4701TFILE,
                        'File Name': x.A4701NFILE,
                        'File Path': x.A4701PATH,
                        'Transfer': opts[x.A4701UPLOA],
                        'Delivery': opts[x.A4701DELIV],
                        'Format': opts[x.A4701FORMA],
                        'Status': x.A4701STAT === 'OK' ? 'OK' : 'ERROR',
                        'Error Code': x.A4701CDERR,
                        'Message': x.A4701MSN
                    }));
                global.writeExcelFromJson(data, 'MDP Load Control');
            };
            notifier.async(loadExcel());
        };
        notifier.confirm('Download Excel?', onOk, null);

    },
    downloadFormatErrors: function () {
        let notifier = new AWN();
        let params = this.formatFormatParams();
        
        console.log("params = ",params);
        
        let onOk = async () => {
            let loadExcel = async () => {
                const res = await global.callStorePagginExcel('PRAXISMP', 'SQP05021', params);
                let opts = {
                    '0': 'Pending',
                    '1': 'Audited',
                    '2': 'Pending System'
                };
                let opts2 = {
                    'A': 'Automatic',
                    'F': 'Forced Match'
                };
                console.log("opts = ",opts);
                console.log("opts2 = ",opts2);
                console.log("res = ",res);
                
                let data = res.map(x => ({
                        'Processing Date': x.A4481FPROC,
                        'ID File': x.A4481IDFIL,
                        'Procesador': x.A4451DESC1,
                        'Pais de Venta': x.A4481PSVTA,
                        'ID Reference': x.A4481IDREF,
                        'Ticket Number': x.A4481CIA + x.A4481FORMA + x.A4481SERIE,
                        'Status Error': opts[x.A4481STSER],
                        'Tipo de Correccion': opts2[x.A4481TIPCO],
                        'Program': x.A4481PROG,
                        'Error Code': x.A4481CODER,
                        'Error Description': x.A4481DATA,
                        'Audited By': x.A4481USRFZ,
                        'Audited Date': x.A4481FECFZ
                    }));
                global.writeExcelFromJson(data, 'MDP Format Errors');
            };
            notifier.async(loadExcel());
        };
        notifier.confirm('Download Excel?', onOk, null);
    }

});


