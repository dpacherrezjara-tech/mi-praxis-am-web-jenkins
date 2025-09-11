Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.SalesReconciliationControlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesReconciliationControlController',
    fecha: new Date(),
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    init: function (view) {
        prototype.id = 'SalesReconciliationControlForm';
        prototype.url = CONTEXTPATH + '/SalesReconciliationBPO';
        prototype.width = 1850;
        prototype.height = 630;
    },
    dataFilters:[],
    afterRender: async function (obj, e) {
        const me = this;
        await me.fillFilters();
    },
    fillFilters: async function () {
        const me = this;
        const filterPanel = Ext.getCmp(prototype.id + '-contentFilter');
        filterPanel.mask('Loading Filters...');
        const res = await fetch(`${me.url}/loadFilters`);
        if (res.ok) {
            const data = await res.json();
            console.log('Filtros: ', data);
            me.dataFilters = data ;
            const procesadores = data.procesadores;
            const monedas = data.monedas.map(x => ({code: x.a006PAIS, name: `${x.a006PAIS}`}));
            const errores = data.cerror.map(x => ({name: `${x.a4451key3.trim()} - ${x.a4451desc1}`, code: x.a4451key3}));

            me.creditcards = data.creditcards;
            me.users = data.admins.map(x => x.a4451key3.trimEnd());
            //<editor-fold defaultstate="collapsed" desc="Combos">
            const cmbProcesadores = Ext.getCmp(prototype.id + '-cmbProctype');
            me.setComboStore({cmp: cmbProcesadores, data: procesadores,
                valueField: 'a4451key2', displayField: 'a4451desc1', value: ''});

            const cmbProcesadoresf = Ext.getCmp(prototype.id + '-cmbProctypef');
            me.setComboStore({cmp: cmbProcesadoresf, data: procesadores,
                valueField: 'a4451key2', displayField: 'a4451desc1', value: ''});

            const cmbProctypeSettl = Ext.getCmp(prototype.id + '-cmbProctypeSettl');
            me.setComboStore({cmp: cmbProctypeSettl, data: procesadores,
                valueField: 'a4451key2', displayField: 'a4451desc1', value: ''});

            const cmbProctypeSettl2 = Ext.getCmp(prototype.id + '-cmbProctypeSettl2');
            me.setComboStore({cmp: cmbProctypeSettl2, data: procesadores,
                valueField: 'a4451key2', displayField: 'a4451desc1', value: ''});


            const cmbPaisesSettl2 = Ext.getCmp(prototype.id + '-cmbPaisesSettl2');
            me.setComboStore({cmp: cmbPaisesSettl2, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbPaises = Ext.getCmp(prototype.id + '-cmbPaisesBP');
            me.setComboStore({cmp: cmbPaises, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbPaisesf = Ext.getCmp(prototype.id + '-cmbPaisesfBP');
            me.setComboStore({cmp: cmbPaisesf, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbPaisesBT = Ext.getCmp(prototype.id + '-cmbPaisesBT');
            me.setComboStore({cmp: cmbPaisesBT, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbPaisesfBT = Ext.getCmp(prototype.id + '-cmbPaisesfBT');
            me.setComboStore({cmp: cmbPaisesfBT, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbPaisesSettl = Ext.getCmp(prototype.id + '-cmbPaisesSettl');
            me.setComboStore({cmp: cmbPaisesSettl, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbCerror = Ext.getCmp(prototype.id + '-cmbCerror');
            me.setComboStore({cmp: cmbCerror, data: errores,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbCodadju = Ext.getCmp(prototype.id + '-cmbCodadju');
            me.setComboStore({cmp: cmbCodadju, data: data.codadju,
                valueField: 'a4451key3', displayField: 'a4451desc1', value: ''});

            const cmbCerrorb = Ext.getCmp(prototype.id + '-cmbCerrorb');
            me.setComboStore({cmp: cmbCerrorb, data: errores,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbCodadjub = Ext.getCmp(prototype.id + '-cmbCodadjub');
            me.setComboStore({cmp: cmbCodadjub, data: data.codadju,
                valueField: 'a4451key3', displayField: 'a4451desc1', value: ''});

            const cmbMonedabST2 = Ext.getCmp(prototype.id + '-cmbMonedabST2');
            me.setComboStore({cmp: cmbMonedabST2, data: monedas,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbMdasBT = Ext.getCmp(prototype.id + '-cmbMonedaBT');
            me.setComboStore({cmp: cmbMdasBT, data: monedas,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbMdasbBT = Ext.getCmp(prototype.id + '-cmbMonedabBT');
            me.setComboStore({cmp: cmbMdasbBT, data: monedas,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbMdasbBP = Ext.getCmp(prototype.id + '-cmbMonedaBP');
            me.setComboStore({cmp: cmbMdasbBP, data: monedas,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbMdasfBP = Ext.getCmp(prototype.id + '-cmbMonedafBP');
            me.setComboStore({cmp: cmbMdasfBP, data: monedas,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbMdasbST = Ext.getCmp(prototype.id + '-cmbMonedabST');
            me.setComboStore({cmp: cmbMdasbST, data: monedas,
                valueField: 'code', displayField: 'name', value: ''});

            const dataAutoComments = data.autocomments.map(x => ({name: `${x.a4451key3.trim()} - ${x.a4451desc1}`, code: x.a4451key3}));
            const cmbAutoComments = Ext.getCmp(prototype.id + '-cmbAutoComment');
            me.setComboStore({cmp: cmbAutoComments, data: dataAutoComments,
                valueField: 'code', displayField: 'name', value: ''});

            
            const dataReglas = data.reglas.map(x => ({name: `${x.a4451key3.trim()}:  ${x.a4451desc1}`, code: x.a4451key3, comment: x.a4451comen }));
            console.log('data.reglas', data.reglas[0] );
            console.log('dataReglas', dataReglas );
            
            const cmbReglas = Ext.getCmp(prototype.id + '-cmbReglas');
            me.setComboStore({cmp: cmbReglas, data: dataReglas,
                valueField: 'code', displayField: 'name',
                fields: ['code', 'name', 'comment'],
                value: ''});

            //</editor-fold>
            me.showProcessBtn(me.users);
            me.showProductionBtn(me.users);
            me.showAddTicketBtn(me.users);

        }
        
        // Catalogs in session Storage
        
        // End Catalogs
        
        filterPanel.unmask();
    },
    //<editor-fold defaultstate="collapsed" desc="Option Buttons">
    showProcessBtn: function (users) {
        const userName = $('#menuUser').text();
        const lstBtns = [];
        lstBtns.push(Ext.getCmp(prototype.id + '-btnProcess'));
        lstBtns.push(Ext.getCmp(prototype.id + '-btnBatchAdju'));
        lstBtns.push(Ext.getCmp(prototype.id + '-btnBatchLog'));
        lstBtns.push(Ext.getCmp(prototype.id + '-btnConciliation'));
        const activeFilter = Ext.getCmp(prototype.id + '-filtersByPayment-1');
        if (activeFilter.isVisible()) {
            if (userName.slice(0, 3) === 'SAP') {
                lstBtns.forEach(btn => {
                    btn.show();
                });
            } else if (users.includes(userName)) {
                lstBtns.forEach(btn => {
                    btn.show();
                });
            } else {
                lstBtns.forEach(btn => {
                    btn.hide();
                });
            }
        } else {
            lstBtns.forEach(btn => {
                btn.hide();
            });
        }
    },
    showProductionBtn: function (users) {
        const userName = $('#menuUser').text();
        const btnProduction = Ext.getCmp(prototype.id + '-btnProduction');
        if (userName.slice(0, 3) === 'SAP') {
            btnProduction.show();
        } else if (users.includes(userName)) {
            btnProduction.show();
        } else {
            btnProduction.hide();
        }
    },
    showAddTicketBtn: function (users) {
        const userName = $('#menuUser').text();
        const btn = Ext.getCmp(prototype.id + '-btnAddTicket');
        const activeFilter = Ext.getCmp(prototype.id + '-filtersByTicket-1');
        if (activeFilter.isVisible()) {
            if (userName.slice(0, 3) === 'SAP') {
                btn.show();
            } else if (users.includes(userName)) {
                btn.show();
            } else {
                btn.hide();
            }
        } else {
            btn.hide();
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Format Params">
    formatByPaymentSummaryParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFiltersBP-1').getForm();
        const obj = formFilters.getValues();
        let params = {
            IN_CCUST: '139',
            IN_TDATE: 'M',
            IN_DATEFROM: obj.month.at(0),
            IN_DATETO: obj.month.at(1),
            ...obj
        };
        return params;
    },
    formatByPaymentDetailParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFiltersBP-2').getForm();
        const obj = formFilters.getValues();
        let params = {
            IN_CCUST: '139',
            ...obj
        };
        if (obj.creditcard !== '') {
            params.IN_SCARDN = `${obj.creditcard || ''}%${obj.creditcard2 || ''}%`;
        } else if (obj.creditcard2 !== '') {
            params.IN_SCARDN = `%${obj.creditcard2 || ''}%`;
        }
        return params;
    },
    formatByTicketSummaryParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFiltersBT-1').getForm();
        const obj = formFilters.getValues();
        let params = {
            IN_CCUST: '139',
            IN_TDATE: 'M',
            ...obj
        };
        return params;
    },
    formatByTicketDetailParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFiltersBT-2').getForm();
        const obj = formFilters.getValues();
        let params = {
            IN_CCUST: '139',
            ...obj
        };
        if (obj.creditcard.at(0) !== '') {
            params.IN_SCARDN = `${obj.creditcard.at(0) || ''}%${obj.creditcard.at(1) || ''}%`;
        } else if (obj.creditcard.at(1) !== '') {
            params.IN_SCARDN = `%${obj.creditcard.at(1) || ''}%`;
        }
        return params;
    },
    formatSettlementParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-filtersSettlement-1').getForm();
        const obj = formFilters.getValues();
        let params = {
            IN_CCUST: '139',
            ...obj
        };
        if (obj.creditcard.at(0) !== '' && obj.creditcard.at(1) !== '') {
            params.IN_SCARDN = `${obj.creditcard.at(0)}%${obj.creditcard.at(1)}%`;
        }else {
            params.IN_SCARDN = '';
        }
        return params;
    },
    formatSettlementBrowserParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-filtersSettlement-2').getForm();
        const obj = formFilters.getValues();
        console.log('obj browser settlement', obj);

        const {creditcard, ...rest} = obj;

        let params = {
            IN_CCUST: '139',
            IN_PCURRENCY: '',
            IN_PROCTYPE: '',
            IN_MERCHANT: '',
            IN_DATEFROM: obj.IN_DATEFROM,
            IN_DATETO: obj.IN_DATETO,
            ...rest
//            ...obj
        };

        if (creditcard?.at(0) !== '' && creditcard?.at(1) !== '') {
            params.IN_SCARDN = `${creditcard.at(0)}%${creditcard.at(1)}%`;
        } else {
            params.IN_SCARDN = '';
        }

        return params;
    },
    formatSummaryParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-filtersSumm-1').getForm();
        const obj = formFilters.getValues();
        let params = {
            IN_CCUST: '139',
            ...obj
        };
        return params;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onClickSearchBtn: function () {
        const me = this;
        const rb = Ext.getCmp(prototype.id + '-viewOption').getValue().opcion;
        if (rb === 'P') {
            win.lblUser_toolTip('Estructura: A4331');
            const tfilter = Ext.getCmp(prototype.id + '-cmbFiltersBP').getValue();
            const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
            mainPanel.removeAll();
            if (tfilter === 'S') {
                let params = me.formatByPaymentSummaryParams();
                console.log(params);
                const panelTree = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByPaymentMonthSummaryGrid', {
                    id: prototype.id + '-ByPaymentMonthSummaryGrid-1',
                    url: me.url,
                    searchParams: params
                });
                mainPanel.add(panelTree);
            } else {
                let params = me.formatByPaymentDetailParams();
                console.log(params);
                const panelDetail = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByPaymentDetailGrid', {
                    id: prototype.id + '-ByPaymentDetailGrid-1',
                    url: me.url,
                    searchParams: params
                });
                mainPanel.add(panelDetail);
            }
        } else if (rb === 'T') {
            win.lblUser_toolTip('Estructura: A4496');
            const tfilter = Ext.getCmp(prototype.id + '-cmbFiltersBT').getValue();
            const mainPanel = Ext.getCmp(prototype.id + '-mainContent2');
            mainPanel.removeAll();
            if (tfilter === 'S') {
                let params = me.formatByTicketSummaryParams();
                const panelTree = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByTicketMonthSummaryGrid', {
                    id: prototype.id + '-ByTicketMonthSummaryGrid-1',
                    url: me.url,
                    searchParams: params
                });
                mainPanel.add(panelTree);
            } else {
                let params = me.formatByTicketDetailParams();
                console.log(params);
                const panelDetail = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.ByTicketDetailGrid', {
                    id: prototype.id + '-ByTicketDetailGrid-1',
                    url: me.url,
                    searchParams: params
                });
                mainPanel.add(panelDetail);
            }
        } else if (rb === 'S') {
            win.lblUser_toolTip('Estructura: A4331');
            const tfilter = Ext.getCmp(prototype.id + '-cmbFiltersST').getValue();
            const mainPanel = Ext.getCmp(prototype.id + '-mainContentSettl');
            mainPanel.removeAll();

            if (tfilter === 'S') {
                let params = me.formatSettlementParams();
                const panelSettl = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.SettlementSummaryGrid', {
                    id: prototype.id + '-SettlementSummaryGrid-1',
                    url: me.url,
                    searchParams: params
                });
                mainPanel.add(panelSettl);
            } else {
                let params = me.formatSettlementBrowserParams();
                console.log(params);
                const panelDetail = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.SettlementDetailGrid', {
                    id: prototype.id + '-SettlementDetailGrid-1',
                    url: me.url,
                    searchParams: params
                });
                mainPanel.add(panelDetail);
            }



        }
    },
    onChangeModule: function (radiogroup, newValue, oldValue) {
        const me = this;
        const opt = newValue.opcion;
        if (opt === 'P') {
            Ext.getCmp(prototype.id + '-filtersByPayment-1').show();
            Ext.getCmp(prototype.id + '-filtersByTicket-1').hide();
            Ext.getCmp(prototype.id + '-filtersSettl-1').hide();
            Ext.getCmp(prototype.id + '-mainContent').show();
            Ext.getCmp(prototype.id + '-mainContent2').hide();
            Ext.getCmp(prototype.id + '-mainContentSettl').hide();
        } else if (opt === 'T') {
            Ext.getCmp(prototype.id + '-filtersByTicket-1').show();
            Ext.getCmp(prototype.id + '-filtersByPayment-1').hide();
            Ext.getCmp(prototype.id + '-filtersSettl-1').hide();
            Ext.getCmp(prototype.id + '-mainContent2').show();
            Ext.getCmp(prototype.id + '-mainContent').hide();
            Ext.getCmp(prototype.id + '-mainContentSettl').hide();
        } else if (opt === 'S') {
            Ext.getCmp(prototype.id + '-filtersSettl-1').show();
            Ext.getCmp(prototype.id + '-mainContentSettl').show();
            Ext.getCmp(prototype.id + '-filtersByPayment-1').hide();
            Ext.getCmp(prototype.id + '-mainContent').hide();
            Ext.getCmp(prototype.id + '-filtersByTicket-1').hide();
            Ext.getCmp(prototype.id + '-mainContent2').hide();

            Ext.getCmp(prototype.id + '-filtersSettlement-1').show();
            Ext.getCmp(prototype.id + '-filtersSettlement-2').hide();
        }
        this.showAddTicketBtn(me.users);
        this.showProcessBtn(me.users);
    },
    onChangeCreditCardBT: function (obj) {
        const me = this;
        const cmbCard = Ext.getCmp(prototype.id + '-cmbCreditCardBT');
        if (obj.getValue() === '') {
            cmbCard.hide();
        } else {
            const data = me.creditcards.filter(x => x.a4451cant1 === parseInt(obj.getValue()));
            me.setComboStore({cmp: cmbCard, data: data,
                valueField: 'a4451key3', displayField: 'a4451desc1', value: ''});
            cmbCard.show();
        }
    },
    onChangeCreditCardBTSum: function (obj) {
        const me = this;
        const cmbCard = Ext.getCmp(prototype.id + '-cmbCreditCardBTSum');
        if (obj.getValue() === '') {
            cmbCard.hide();
        } else {
            const data = me.creditcards.filter(x => x.a4451cant1 === parseInt(obj.getValue()));
            me.setComboStore({cmp: cmbCard, data: data,
                valueField: 'a4451key3', displayField: 'a4451desc1', value: ''});
            cmbCard.show();
        }
    },
    onClickProcessBtn: function () {
        const processWin = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TransactionProcessDataEntry', {
            id: prototype.id + '-TransactionProcessDataEntry-1',
            dataFilters: this.dataFilters
        });
        processWin.show();
    },
    onChangeFiltersBP: function (obj) {
        const filtroSumm = Ext.getCmp(prototype.id + '-formFiltersBP-1');
        const filtroFil = Ext.getCmp(prototype.id + '-formFiltersBP-2');
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        if (obj.getValue() === 'S') {
            filtroSumm.show();
            filtroFil.hide();
        } else {
            filtroFil.show();
            filtroSumm.hide();
        }
    },
    onChangeFiltersBT: function (obj) {
        const filtroSumm = Ext.getCmp(prototype.id + '-formFiltersBT-1');
        const filtroFil = Ext.getCmp(prototype.id + '-formFiltersBT-2');
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent2');
        mainPanel.removeAll();
        if (obj.getValue() === 'S') {
            filtroSumm.show();
            filtroFil.hide();
        } else {
            filtroFil.show();
            filtroSumm.hide();
        }
    },
    onChangeFiltersST: function (obj) {
        const filtroSumm = Ext.getCmp(prototype.id + '-filtersSettlement-1');
        const filtroFil = Ext.getCmp(prototype.id + '-filtersSettlement-2');
        const mainPanel = Ext.getCmp(prototype.id + '-mainContentSettl');
        mainPanel.removeAll();
        if (obj.getValue() === 'S') {
            filtroSumm.show();
            filtroFil.hide();
        } else {
            filtroFil.show();
            filtroSumm.hide();
        }
    },
    onClickFilterBtn: function () {
        const panelFilters = Ext.getCmp(prototype.id + '-contentFilter');
        if (panelFilters.isVisible())
            panelFilters.hide();
        else
            panelFilters.show();
    },
    onClickClearBtn: function () {
        const filterBP = Ext.getCmp(prototype.id + '-filtersByPayment-1');
        const filterBT = Ext.getCmp(prototype.id + '-filtersByTicket-1');
        const filterST = Ext.getCmp(prototype.id + '-filtersSettl-1');
        if (filterBP.isVisible()) {
            Ext.getCmp(prototype.id + '-formFiltersBP-1').getForm().reset();
            Ext.getCmp(prototype.id + '-formFiltersBP-2').getForm().reset();
        } else if (filterBT.isVisible()) {
            Ext.getCmp(prototype.id + '-formFiltersBT-1').getForm().reset();
            Ext.getCmp(prototype.id + '-formFiltersBT-2').getForm().reset();
        } else if (filterST.isVisible()) {
            Ext.getCmp(prototype.id + '-filtersSettlement-1').getForm().reset();
            Ext.getCmp(prototype.id + '-filtersSettlement-2').getForm().reset();
        }
    },
    onClickProduction: function () {
        const productionWin = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.BPOProductionDataEntry', {
            id: prototype.id + '-BPOProductionDataEntry-1'
        });
        productionWin.show();
    },
    onClickAddTicketBtn: function () {
        const addticketWin = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.AddTicketDataEntry', {
            id: prototype.id + '-AddTicketDataEntry-1'
        });
        addticketWin.show();
    },
    onClickBackBtn: function (obj) {
        window.location.href = CONTEXTPATH;
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
    onClickBatchAdjuBtn: function () {
        const manualBatch = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.ManualBatchDataEntry', {
            id: prototype.id + '-ManualBatchDataEntry-1'
        });
        manualBatch.show();
    },
    onClickBatchLogBtn: function () {
        const logBatch = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.BatchLogDataEntry', {
            id: prototype.id + '-BatchLogDataEntry-1'
        });
        logBatch.show();
    },
    onClickConciliationBtn: function () {
        const me = this;
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to run Conciliation?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.runConciliation();
                        }
                    }
                });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Procesos">
    runConciliation: async function () {
        const me = this;
        let params = {
            VP_CCUST: '139',
            VP_PROCESO: 'CONCILIA'
        };
        const res = await fetch(`${me.url}/runAutomaticConciliation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        if (res.ok) {
            const data = await res.json();
            if (data.result === 'P') {
                global.Msg({msg: 'Starting Process'});
            } else {
                global.Msg({msg: 'Process is already running'});
            }
        } else {
            global.Msg({msg: 'Error on Process'});
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Fechas Func">
    onChangeMonthBPBtn: function (obj) {
        let option = obj.id.split('-').at(-1);
        const from = Ext.getCmp(prototype.id + '-monthfieldFromBP');
        const to = Ext.getCmp(prototype.id + '-monthfieldToBP');
        const opts = {
            'monthfieldFromBP': () => {
                to.setValue(from.getValue());
            },
            'monthfieldToBP': () => {
                if (to.getValue() < from.getValue()) {
                    from.setValue(to.getValue());
                }
            }
        };
        opts[option]();
    },
    onChangeMonthBTBtn: function (obj) {
        let option = obj.id.split('-').at(-1);
        const from = Ext.getCmp(prototype.id + '-monthfieldFromBT');
        const to = Ext.getCmp(prototype.id + '-monthfieldToBT');
        const opts = {
            'monthfieldFromBT': () => {
                to.setValue(from.getValue());
            },
            'monthfieldToBT': () => {
                if (to.getValue() < from.getValue()) {
                    from.setValue(to.getValue());
                }
            }
        };
        opts[option]();
    },
    onChangeMonthBTBtn: function (obj) {
        let option = obj.id.split('-').at(-1);
        const from = Ext.getCmp(prototype.id + '-monthfieldFromBT');
        const to = Ext.getCmp(prototype.id + '-monthfieldToBT');
        const opts = {
            'monthfieldFromBT': () => {
                to.setValue(from.getValue());
            },
            'monthfieldToBT': () => {
                if (to.getValue() < from.getValue()) {
                    from.setValue(to.getValue());
                }
            }
        };
        opts[option]();
    },
    onChangeMonthSTBtn: function (obj) {
        let option = obj.id.split('-').at(-1);
        const from = Ext.getCmp(prototype.id + '-datefieldFromST');
        const to = Ext.getCmp(prototype.id + '-datefieldToST');
        const opts = {
            'datefieldFromST': () => {
                to.setValue(from.getValue());
            },
            'datefieldToST': () => {
                if (to.getValue() < from.getValue()) {
                    from.setValue(to.getValue());
                }
            }
        };
        opts[option]();
    },
    onChangeDateBTBtn: function (obj) {
        let option = obj.id.split('-').at(-1);
        const from = Ext.getCmp(prototype.id + '-datefieldFromBT');
        const to = Ext.getCmp(prototype.id + '-datefieldToBT');
        const opts = {
            'datefieldFromBT': () => {
                to.setValue(from.getValue());
            },
            'datefieldToBT': () => {
                if (to.getValue() < from.getValue()) {
                    from.setValue(to.getValue());
                }
            }
        };
        opts[option]();
    },
    onChangeDateSTBtn: function (obj) {
        let option = obj.id.split('-').at(-1);

        const from = Ext.getCmp(prototype.id + '-datefieldFromST');
        const to = Ext.getCmp(prototype.id + '-datefieldToST');

        const from2 = Ext.getCmp(prototype.id + '-datefieldFromST2');
        const to2 = Ext.getCmp(prototype.id + '-datefieldToST2');
        const opts = {
            'datefieldFromST': () => {
                to.setValue(from.getValue());
            },
            'datefieldToST': () => {
                if (to.getValue() < from.getValue()) {
                    from.setValue(to.getValue());
                }
            },
            'datefieldFromST2': () => {
                to2.setValue(from2.getValue());
            },
            'datefieldToST2': () => {
                if (to.getValue() < from2.getValue()) {
                    from2.setValue(to2.getValue());
                }
            }
        };
        opts[option]();
    },
    validaFecha: function (value) {
        // Validar la fecha aquí
        // Devolver true si es válida, o un mensaje de error si no lo es
        if (value === null || value === '') {
            return 'Debe ingresar una fecha.';
        }
        try {
            const selectedDate = Ext.Date.format(value, 'Ymd');
            return true;
        } catch (err) {
            return 'Fecha no válida.';
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    getCmp: function ( {id}){
        return Ext.getCmp(prototype.id + id);
    },
    setComboStore: function ( {cmp, data, valueField, displayField, value}){
        const me = this;
        cmp.suspendEvents(false);
        cmp.bindStore(me.createComboStore({data: data
            , valueField: valueField, displayField: displayField}));
        cmp.setValue(value);
        cmp.resumeEvents();
    },
    createComboStore: function ( {data, valueField, displayField}) {
        //crea record vacio
        let allRecord = {};
        allRecord[displayField] = 'All';
        allRecord[valueField] = '';
        //limpia record de data
        data.forEach(obj => {
            for (let attr in obj) {
                if (typeof obj[attr] === 'string') {
                    obj[attr] = obj[attr].trimEnd();
                }
            }
        });
        //crea Store
        let store = this.createStore({data: data});
        //inserta record vacio
        store.insert(0, allRecord);
        //console.log('store creado',store);
        return store;
    },
    createArrayStore: function ( {data}){
        const store = new Ext.data.SimpleStore({
            fields: ['code', 'name'],
            data: data.map(x => {
                return [x.code, x.name];
            })
        });
        return store;
    },
    createStore: function ( {data}){
        return Ext.create('Ext.data.Store', {
            autoLoad: true,
            data: data,
            pageSize: 20
        });
    },
    parseInt: function (number) {
        if (number && number !== '') {
            return parseInt(number);
        }
        ;
        return number;
    },
    getDistinct: function (lst, key) {
        let valoresVistos = {};
        // Filtra el array para eliminar duplicados según la columna "nombre"
        let resultado = lst.filter(function (item) {
            if (valoresVistos[item[key]]) {
                // Si el valor ya se ha visto, exclúyelo
                return false;
            }
            // Si es la primera vez que se ve, márcalo como visto y manténlo en el resultado
            valoresVistos[item[key]] = true;
            return true;
        });
        return resultado;
    },
    //</editor-fold>


    onProcessorSelect: function (combo, record) {

        const type = record.get('a4451key2');

        const credit1 = Ext.ComponentQuery.query('#creditcard1')[0];
        const credit2 = Ext.ComponentQuery.query('#creditcard2')[0];
        const label = Ext.ComponentQuery.query('#maskLabel')[0];

        if (credit1 && credit1.inputEl) {
            if (type === 'ATCAN00') {
                credit1.setWidth(200);
                credit1.maxLength = 19;
                credit1.inputEl.dom.maxLength = 10;

                if (credit2)
                    credit2.hide();
                if (label)
                    label.hide();
            } else {
                credit1.setWidth(150);
                credit1.maxLength = 6;
                credit1.inputEl.dom.maxLength = 6;

                if (credit2)
                    credit2.show();
                if (label)
                    label.show();
            }
        }
    }

});


