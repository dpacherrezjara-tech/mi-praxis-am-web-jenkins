Ext.define('Ext.Praxis.controller.payments.SabreTicketStatus.SabreTicketStatusController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SabreTicketStatusController',
    fecha: new Date(),
    // url: CONTEXTPATH + '/SabreTicketStatusForm',
     url: CONTEXTPATH + '/SalesReconciliationBPO',

    init: function (view) {
        prototype.id = 'SabreTicketStatusForm';
        prototype.url = CONTEXTPATH + '/SalesReconciliationBPO';
        prototype.width = 1850;
        prototype.height = 630;
    },

    dataFilters: [],

    afterRender: async function (obj, e) {
        const me = this;
        await me.fillFilters();
    },

    showProductionBtn: function (users) {
        const userName = $('#menuUser').text();
        const btnProduction = Ext.getCmp(prototype.id + '-btnProduction');
        if (userName.slice(0, 3) === 'SAP' || users.includes(userName)) {
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
            if (userName.slice(0, 3) === 'SAP' || users.includes(userName)) {
                btn.show();
            } else {
                btn.hide();
            }
        } else {
            btn.hide();
        }
    },

    changeAnalyzePending: function (quantity = 0) {
        const optionAnalyze = Ext.getCmp(prototype.id + '-btnAnalyzeReconciliationErrors');
        if (optionAnalyze) {
            const originalText = optionAnalyze.defaultText || optionAnalyze.getText() || '';
            if (!optionAnalyze.defaultText) {
                optionAnalyze.defaultText = originalText;
            }
            if (quantity > 0) {
                optionAnalyze.setText(
                    originalText + ` <span style="color: red; font-weight: bold;">(${quantity})</span>`
                );
            } else {
                optionAnalyze.setText(originalText);
            }
        }
    },

    formatByTicketDetailParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-panelFilters').getForm();


        const obj = formFilters.getValues();
        console.log('form values', obj);
        let params = {
            IN_CCUST: '139',
            ...obj
        };
        if (obj.creditcard && obj.creditcard.at(0) !== '') {
            params.IN_SCARDN = `${obj.creditcard.at(0) || ''}%${obj.creditcard.at(1) || ''}%`;
        } else if (obj.creditcard && obj.creditcard.at(1) !== '') {
            params.IN_SCARDN = `%${obj.creditcard.at(1) || ''}%`;
        }
        return params;
    },

    onClickSearchBtn: function () {
        const me = this;
        win.lblUser_toolTip('Estructura: A4496');
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const params = me.formatByTicketDetailParams();
        mainPanel.add(Ext.create(
            'Ext.Praxis.view.payments.SabreTicketStatusForm.Grids.SabreTicketStatusGrid', {
            id: prototype.id + '-SabreTicketStatusGrid-1',
            url: me.url,
            searchParams: params
        }
        ));
    },

    onChangeCreditCardBT: function (obj) {
        const me = this;
        const cmbCard = Ext.getCmp(prototype.id + '-cmbCreditCardBT');
        if (obj.getValue() === '') {
            cmbCard.hide();
        } else {
            const data = me.creditcards.filter(x => x.CODE_GROUP_CARD === obj.getValue());
            me.setComboStore({ cmp: cmbCard, data: data, valueField: 'CODE', displayField: 'NAME', value: '' });
            cmbCard.show();
        }
    },

    onClickFilterBtn: function () {
        const panelFilters = Ext.getCmp(prototype.id + '-contentFilter');
        if (panelFilters.isVisible()) {
            panelFilters.hide();
        } else {
            panelFilters.show();
        }
    },

    onClickClearBtn: function () {
        Ext.getCmp(prototype.id + '-formFiltersBT-2').getForm().reset();
    },

    onClickProduction: function () {
        const productionWin = Ext.create(
            'Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.BPOProductionDataEntry', {
            id: prototype.id + '-BPOProductionDataEntry-1'
        }
        );
        productionWin.show();
    },

    onClickAddTicketBtn: function () {
        const me = this;
        const addticketWin = Ext.create(
            'Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.AddTicketDataEntry', {
            id: prototype.id + '-AddTicketDataEntry-1',
            countries: me.countries,
            creditcards: me.creditcards,
            currencies: me.currencies
        }
        );
        addticketWin.show();
    },

    onClickBackBtn: function () {
        window.location.href = CONTEXTPATH;
    },

    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },

    onClickAnalyzeReconciliationErrors: function () {
        const me = this;
        const dataEntry = Ext.create(
            'Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.AnalyzeReconciliationErrorsDataEntry', {
            id: prototype.id + '-AnalyzeReconciliationErrorsDataEntry-1',
            processors: me.processors
        }
        );
        dataEntry.show();
    },

    onChangeDateBTBtn: function (obj) {
        const option = obj.id.split('-').at(-1);
        const from = Ext.getCmp(prototype.id + '-datefieldFromBT');
        const to = Ext.getCmp(prototype.id + '-datefieldToBT');
        const opts = {
            'datefieldFromBT': () => { to.setValue(from.getValue()); },
            'datefieldToBT': () => { if (to.getValue() < from.getValue()) from.setValue(to.getValue()); }
        };
        if (opts[option]) opts[option]();
    },

    validaFecha: function (value) {
        if (value === null || value === '') return 'Debe ingresar una fecha.';
        try {
            Ext.Date.format(value, 'Ymd');
            return true;
        } catch (err) {
            return 'Fecha no válida.';
        }
    },

    getCmp: function ({ id }) {
        return Ext.getCmp(prototype.id + id);
    },

    setComboStore: function ({ cmp, data, valueField, displayField, value }) {
        const me = this;
        cmp.suspendEvents(false);
        cmp.bindStore(me.createComboStore({ data, valueField, displayField }));
        cmp.setValue(value);
        cmp.resumeEvents();
    },

    createComboStore: function ({ data, valueField, displayField }) {
        let allRecord = {};
        allRecord[displayField] = 'All';
        allRecord[valueField] = '';
        data.forEach(obj => {
            for (let attr in obj) {
                if (typeof obj[attr] === 'string') obj[attr] = obj[attr].trimEnd();
            }
        });
        const store = this.createStore({ data });
        store.insert(0, allRecord);
        return store;
    },

    createStore: function ({ data }) {
        return Ext.create('Ext.data.Store', {
            autoLoad: true,
            data: data,
            pageSize: 20
        });
    },

    parseInt: function (number) {
        if (number && number !== '') return parseInt(number);
        return number;
    },

    getDistinct: function (lst, key) {
        const seen = {};
        return lst.filter(item => {
            if (seen[item[key]]) return false;
            seen[item[key]] = true;
            return true;
        });
    },

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
                if (credit2) credit2.hide();
                if (label) label.hide();
            } else {
                credit1.setWidth(150);
                credit1.maxLength = 6;
                credit1.inputEl.dom.maxLength = 6;
                if (credit2) credit2.show();
                if (label) label.show();
            }
        }
    },



    //  new
    onChangeDateFilter: function (combo, newValue) {
        var ticketField = Ext.getCmp(prototype.id + '-txtTicket');
        var dateFiltersContainer = Ext.getCmp(prototype.id + '-dateFiltersContainer');
        var rowFilters2 = Ext.getCmp(prototype.id + '-rowFilters2');

        if (newValue === 'TKT') {
            ticketField.show();
            dateFiltersContainer.hide();
            rowFilters2.hide();
        } else {
            ticketField.hide();
            ticketField.reset();
            dateFiltersContainer.show();
            rowFilters2.show();
        }
    },

    fillFilters: async function () {
        const me = this;
        const filterPanel = Ext.getCmp(prototype.id + '-contentFilter');
        filterPanel.mask('Loading Filters...');
        try {
            const response = await global.callStoreGet('PRAXISMP', 'SQP05276', { IN_STATUS: '1' });
            const { lstVals, lstRs } = response;

            const dataCreditcards = lstRs[3] || [];
            const dataPaises = lstRs[4] || [];
            const dataMonedas = lstRs[5] || [];
            const dataAdmins = lstRs[6] || [];
            const dataCcGrupos = lstRs[7] || [];
            const dataStvalTicket = lstRs[11] || [];

            const quantityAnalyzePending = lstVals.IO_QUANITY_ANALYZE_PENDING;

            me.creditcards = dataCreditcards;
            me.countries = dataPaises;
            me.currencies = dataMonedas;
            me.users = dataAdmins.map(x => (x.A4451KEY3 || x.a4451key3 || '').toString().trim());

            me.setComboStore({ cmp: Ext.getCmp(prototype.id + '-cmbPaisesfBT'), data: dataPaises, valueField: 'CODE', displayField: 'NAME', value: '' });
            me.setComboStore({ cmp: Ext.getCmp(prototype.id + '-cmbMonedaBT'), data: dataMonedas, valueField: 'CODE', displayField: 'NAME', value: '' });
            me.setComboStore({ cmp: Ext.getCmp(prototype.id + '-cmbStvalBTD'), data: dataStvalTicket, valueField: 'CODE', displayField: 'NAME', value: '' });
            me.setComboStore({ cmp: Ext.getCmp(prototype.id + '-cmbCardTypeBT'), data: dataCcGrupos, valueField: 'CODE', displayField: 'NAME', value: '' });

            // ── IDs corregidos según la vista real ──────────────────────────
            // '-filtersByTicket-1' no existe; el filtro ya está visible como '-contentFilter'
            // '-mainContent2' → el panel correcto es '-mainContent'
            Ext.getCmp(prototype.id + '-mainContent').show();
            // ────────────────────────────────────────────────────────────────

            me.changeAnalyzePending(quantityAnalyzePending);
            me.showProductionBtn(me.users);
            me.showAddTicketBtn(me.users);

        } catch (e) {
            console.log(e);
            global.Msg({ msg: 'Error loading filters' });
        } finally {
            filterPanel.unmask();
        }
    },

    showProductionBtn: function (users) {
        const userName = $('#menuUser').text();
        const btnProduction = Ext.getCmp(prototype.id + '-btnProduction');
        // ── Guardia: el botón puede no existir en esta vista ───────────────
        if (!btnProduction) return;
        // ──────────────────────────────────────────────────────────────────
        if (userName.slice(0, 3) === 'SAP' || users.includes(userName)) {
            btnProduction.show();
        } else {
            btnProduction.hide();
        }
    },

    showAddTicketBtn: function (users) {
        const userName = $('#menuUser').text();
        const btn = Ext.getCmp(prototype.id + '-btnAddTicket');
        // ── Guardia: el botón puede no existir en esta vista ───────────────
        if (!btn) return;
        // ──────────────────────────────────────────────────────────────────
        const activeFilter = Ext.getCmp(prototype.id + '-contentFilter'); // ID real del filtro
        if (activeFilter && activeFilter.isVisible()) {
            if (userName.slice(0, 3) === 'SAP' || users.includes(userName)) {
                btn.show();
            } else {
                btn.hide();
            }
        } else {
            btn.hide();
        }
    },

    downloadExcel: function (btn) {
        const me = this;

        let params = me.formatByTicketDetailParams();
        params.excel = true;
        console.log(params);

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            animateTarget: btn,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    global.getFile(`${me.url}/downloadByTicketDetail?${new URLSearchParams(params)}`);
                }
            }
        });
    },
});