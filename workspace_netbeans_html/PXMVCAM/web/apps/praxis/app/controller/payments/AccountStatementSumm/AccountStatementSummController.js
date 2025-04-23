Ext.define('Ext.Praxis.controller.payments.AccountStatementSumm.AccountStatementSummController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountStatementSummController',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
    },
    //<editor-fold defaultstate="collapsed" desc="Summary">
    formatSummaryParams: function () {
        return Ext.getCmp(prototype.id + '-panelFilters').getForm().getValues();
    },
    searchSummary: async function () {
        let params = this.formatSummaryParams();
        const tree = Ext.getCmp(prototype.id + '-treeSummary');
        tree.show();
        const opts = {
            '1': 'Sale Date',
            '2': 'Processing Date',
            '3': 'File Date'
        };
        tree.setTitle(`${opts[params.IN_TDATE]}-${params.IN_DATE}`);
        tree.setLoading(true);

        const res = await global.callStoreGet('PRAXISMP', 'SQP05552', params);

        if (res.lstRs) {
            let rawData = res.lstRs.at(0);

            const grouped = {};
            rawData.forEach(item => {
                if (!grouped[item.A4700IDCON]) {
                    grouped[item.A4700IDCON] = [];
                }
                grouped[item.A4700IDCON].push({
                    leaf: true,
                    INDEX: item.A4700FOP !== 'CA' ? `${item.A4700FOP}-${item.A4700TARJ}` : 'CASH',
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
                    COLOR: 'D'
                });
            });

            const treeData = Object.keys(grouped).map(key => ({
                    text: key,
                    expanded: true,
                    CONTEO: global.sumBy(grouped[key], 'CONTEO'),
                    CONCIL: global.sumBy(grouped[key], 'CONCIL'),
                    PENDING: global.sumBy(grouped[key], 'PENDING'),
                    INDEX: grouped[key].at(0).IDCON.trim() === '' ? 'Blank ID' : grouped[key].at(0).IDCON,
                    IDCON: grouped[key].at(0).IDCON.trim(),
                    TDATE: params.IN_TDATE,
                    DATE: params.IN_DATE,
                    children: grouped[key],
                    COLOR: 'H'
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
    loadQty: async function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const tree = Ext.getCmp(prototype.id + '-treeSummary');
        tree.hide();
        const detail = Ext.getCmp(prototype.id + '-detailSummary');
        detail.show();
        let params = this.formatDetailParams(record.data, '');
        console.log(params);
        let store = await global.callStorePaggin('PRAXISMP', 'SQP05553', params);
        detail.setStore(store);
    },
    loadConcil: async function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const tree = Ext.getCmp(prototype.id + '-treeSummary');
        tree.hide();
        const detail = Ext.getCmp(prototype.id + '-detailSummary');
        detail.show();
        let params = this.formatDetailParams(record.data, 'M');
        console.log(params);
        let store = await global.callStorePaggin('PRAXISMP', 'SQP05553', params);
        detail.setStore(store);
    },
    loadPending: async function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const tree = Ext.getCmp(prototype.id + '-treeSummary');
        tree.hide();
        const detail = Ext.getCmp(prototype.id + '-detailSummary');
        detail.show();
        let params = this.formatDetailParams(record.data, 'P');
        console.log(params);
        let store = await global.callStorePaggin('PRAXISMP', 'SQP05553', params);
        detail.setStore(store);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Client">
    formatClienParams: function () {
        return Ext.getCmp(prototype.id + '-panelFilters2').getForm().getValues();
    },
    searchClien: async function () {
        let params = this.formatClienParams();
        const tree = Ext.getCmp(prototype.id + '-treeClient');
        tree.show();
        const opts = {
            '1': 'Sale Date',
            '2': 'Processing Date',
            '3': 'File Date'
        };
        tree.setTitle(`${opts[params.IN_TDATE]}- From ${params.IN_DATEF} to ${params.IN_DATET}`);
        tree.setLoading(true);

        const res = await global.callStoreGet('PRAXISMP', 'SQP05554', params);

        if (res.lstRs) {
            let rawData = res.lstRs.at(0);

            const grouped = {};
            rawData.forEach(item => {

                let key = `${item.A4700CLIEN.trim()} - ${item.A4700TITU.trim()} - ${item.A4700MDA.trim()}`;
                if (!grouped[key]) {
                    grouped[key] = [];
                }
                grouped[key].push({
                    leaf: true,
                    INDEX: item.FECHA,
                    TOTAL: item.TOTAL,
                    MONTO: item.MONTO,
                    TMATCH: item.TMATCH,
                    VMATCH: item.VMATCH,
                    TPEND: item.TPEND,
                    VPEND: item.VPEND,
                    MDA: item.A4700MDA,
                    TDATE: params.IN_TDATE,
                    DATE: item.FECHA,
                    CLIEN: item.A4700CLIEN,
                    TITU: item.A4700TITU,
                    COLOR: 'D'
                });
            });

            const treeData = Object.keys(grouped).map(key => ({
                    text: key,
                    expanded: false,
                    INDEX: key,
                    TOTAL: global.sumBy(grouped[key], 'TOTAL'),
                    MONTO: global.sumBy(grouped[key], 'MONTO'),
                    TMATCH: global.sumBy(grouped[key], 'TMATCH'),
                    VMATCH: global.sumBy(grouped[key], 'VMATCH'),
                    TPEND: global.sumBy(grouped[key], 'TPEND'),
                    VPEND: global.sumBy(grouped[key], 'VPEND'),
                    TDATE: params.IN_TDATE,
                    DATEF: params.IN_DATEF,
                    DATET: params.IN_DATET,
                    CLIEN: grouped[key].at(0).CLIEN,
                    TITU: grouped[key].at(0).TITU,
                    MDA: grouped[key].at(0).MDA,
                    children: grouped[key],
                    COLOR: 'H'
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
    loadTotalClien: async function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const tree = Ext.getCmp(prototype.id + '-treeClient');
        tree.hide();
        const detail = Ext.getCmp(prototype.id + '-detailSummary');
        detail.show();
        let params = this.formatDetailClienParams(record.data, '');
        console.log(params);
        let store = await global.callStorePaggin('PRAXISMP', 'SQP05553', params);
        detail.setStore(store);
    },
    loadConcilClien: async function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const tree = Ext.getCmp(prototype.id + '-treeClient');
        tree.hide();
        const detail = Ext.getCmp(prototype.id + '-detailSummary');
        detail.show();
        let params = this.formatDetailClienParams(record.data, 'M');
        console.log(params);
        let store = await global.callStorePaggin('PRAXISMP', 'SQP05553', params);
        detail.setStore(store);
    },
    loadPendingClien: async function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const tree = Ext.getCmp(prototype.id + '-treeClient');
        tree.hide();
        const detail = Ext.getCmp(prototype.id + '-detailSummary');
        detail.show();
        let params = this.formatDetailClienParams(record.data, 'P');
        console.log(params);
        let store = await global.callStorePaggin('PRAXISMP', 'SQP05553', params);
        detail.setStore(store);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Detail">
    backDetailSummary: function () {
        const detail = Ext.getCmp(prototype.id + '-detailSummary');
        detail.getStore().removeAll();
        detail.hide();
        
        let opt = Ext.getCmp(prototype.id + '-cmbReport').value;
        switch (opt) {
            case '1':
                Ext.getCmp(prototype.id + '-treeSummary').show();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-treeClient').show();
                break;
            case '3':
                Ext.getCmp(prototype.id + '-ageSummary').show();
                break;
        }
    },
    formatDetailParams: function (data, status) {
        let res = {
            IN_CCUST: '139',
            IN_TDATE: data.TDATE,
            IN_DATEF: data.DATE,
            IN_DATET: data.DATE,
            IN_FOP: data.FOP || '',
            IN_TARJ: data.TARJ || '',
            IN_PAIS: data.PAIS || '',
            IN_FUENT: data.FUENT || '',
            IN_SFUEN: data.SFUEN || '',
            IN_IDCON: (data.IDCON || '').trim() === '' ? 'NONE' : data.IDCON,
            IN_STATUS: status,
            IN_CLIENTE: '',
            IN_TITU: '',
            IN_MDA:''
        };
        return res;
    },
    formatDetailClienParams: function (data, status) {
        let res = {
            IN_CCUST: '139',
            IN_TDATE: data.TDATE,
            IN_DATEF: data.DATE?data.DATE: data.DATEF ,
            IN_DATET: data.DATE?data.DATE: data.DATET ,
            IN_FOP: '',
            IN_TARJ: '',
            IN_PAIS: '',
            IN_FUENT: '',
            IN_SFUEN: '',
            IN_IDCON: '',
            IN_STATUS: status,
            IN_CLIENTE: data.CLIEN,
            IN_TITU: data.TITU,
            IN_MDA:data.MDA
        };
        return res;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Age">
    formatAgeParams: function () {
        return Ext.getCmp(prototype.id + '-panelFilters3').getForm().getValues();
    },
    searchAge: async function(){
        const grilla = Ext.getCmp(prototype.id + '-ageSummary');
        grilla.show();
        grilla.setLoading(true);
        let params = this.formatAgeParams();
        let res = await global.callStoreGet('PRAXISMP', 'SQP05556', params);
        if(res.lstRs){
            const data = res.lstRs.at(0);
            let store = new Ext.data.Store({
                data: data,
                pageSize: 20,
                proxy:{
                    type:'memory',
                     enablePaging: true
                }
            });
            grilla.setStore(store);
        }
        grilla.setLoading(false);
    },
    formatDetailAgeParams: function (data, status) {
        let res = {
            IN_CCUST: '139',
            IN_DATE: data.A4700FECVT ,
            IN_STATUS: status,
            IN_CLIENTE: data.A4700CLIEN,
            IN_TITU: data.A4700TITU,
            IN_MONEDA:data.A4700MDA
        };
        return res;
    },
    load1D: async function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const tree = Ext.getCmp(prototype.id + '-ageSummary');
        tree.hide();
        const detail = Ext.getCmp(prototype.id + '-detailSummary');
        detail.show();
        let params = this.formatDetailAgeParams(record.data, '1');
        console.log(params);
        let store = await global.callStorePaggin('PRAXISMP', 'SQP05557', params);
        detail.setStore(store);
    },
    load2D: async function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const tree = Ext.getCmp(prototype.id + '-ageSummary');
        tree.hide();
        const detail = Ext.getCmp(prototype.id + '-detailSummary');
        detail.show();
        let params = this.formatDetailAgeParams(record.data, '2');
        console.log(params);
        let store = await global.callStorePaggin('PRAXISMP', 'SQP05557', params);
        detail.setStore(store);
    },
    load3D: async function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const tree = Ext.getCmp(prototype.id + '-ageSummary');
        tree.hide();
        const detail = Ext.getCmp(prototype.id + '-detailSummary');
        detail.show();
        let params = this.formatDetailAgeParams(record.data, '3');
        console.log(params);
        let store = await global.callStorePaggin('PRAXISMP', 'SQP05557', params);
        detail.setStore(store);
    },
    load4D: async function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let valorCelda = td.textContent || td.innerText;
        if (valorCelda === '0') {
            global.Msg({msg: 'No data'});
            return;
        }
        const tree = Ext.getCmp(prototype.id + '-ageSummary');
        tree.hide();
        const detail = Ext.getCmp(prototype.id + '-detailSummary');
        detail.show();
        let params = this.formatDetailAgeParams(record.data, '4');
        console.log(params);
        let store = await global.callStorePaggin('PRAXISMP', 'SQP05557', params);
        detail.setStore(store);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onSearchClickBtn: function () {
        let opt = Ext.getCmp(prototype.id + '-cmbReport').value;
        switch (opt) {
            case '1':
                this.searchSummary();
                break;
            case '2':
                this.searchClien();
                break;
            case '3':
                this.searchAge();
                break;
        }

    },
    onChangeByTicketReport: function (btn) {
        const filterSumm = Ext.getCmp(prototype.id + '-panelFilters');
        const filterClien = Ext.getCmp(prototype.id + '-panelFilters2');
        const filterAge = Ext.getCmp(prototype.id + '-panelFilters3');

        const treeSumm = Ext.getCmp(prototype.id + '-treeSummary');
        const detailSumm = Ext.getCmp(prototype.id + '-detailSummary');
        const treeClient = Ext.getCmp(prototype.id + '-treeClient');
        const ageSummary = Ext.getCmp(prototype.id + '-ageSummary');

        filterSumm.hide();
        filterClien.hide();
        filterAge.hide();
        treeSumm.hide();
        treeSumm.hide();
        treeClient.hide();
        ageSummary.hide();
        detailSumm.hide();
        switch (btn.value) {
            case '1':
                filterSumm.show();
                treeSumm.show();
                treeSumm.show();
                break;
            case '2':
                filterClien.show();
                treeClient.show();
                break;
            case '3':
                filterAge.show();
                ageSummary.show();
                break;
        }
    },
    //</editor-fold>
});


