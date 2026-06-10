Ext.define('Ext.Praxis.controller.payments.MerchantNumber.MerchantNumberController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MerchantNumberController',
    url: CONTEXTPATH + '/MerchantNumberTmz',
    init: function (view) {
        prototype.id = 'MerchantNumberForm';
        prototype.url = CONTEXTPATH + '/MerchantNumberTmz';
    },
    afterRender: async function () {
        await this.fillFilters();
        await this.loadMerchants();
    },
    fillFilters: async function () {
        const me = this;
        const filterPanel = Ext.getCmp(prototype.id + '-contentFilter');
        filterPanel.mask('Loading Filters...');
        try {
            const res = await global.callStoreGet('PRAXISMP', 'SQP05745', {});
            const paises = (res && res.lstRs && res.lstRs.length > 0) ? res.lstRs[0] : [];
            prototype.filterPaises = paises;
            const cmbPaises = Ext.getCmp(prototype.id + '-cmbPaises');
            global.setComboStore(cmbPaises, paises, 'CODE', 'NAME', '');
        } catch (e) {
            console.error('Error fillFilters', e);
        }
        filterPanel.unmask();
    },
    loadMerchants: async function () {
        const me = this;
        let params = me.formatParams();
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const panelDetail = Ext.create('Ext.Praxis.view.payments.MerchantNumberForm.Grids.MerchantsGrid', {
            id: prototype.id + '-MerchantsGrid-1',
            url: me.url,
            searchParams: params
        });
        mainPanel.add(panelDetail);
    },
    formatParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        let params = {
            IN_CCUST: '139',
            ...formFilters.getValues()
        };
        console.log('Search Params: ', params);
        return params;
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onClickSearchBtn: function () {
        this.loadMerchants();
    },
    onAddMerchantBtn: function () {
        const dataEntry = Ext.create('Ext.Praxis.view.payments.MerchantNumberForm.DataEntrys.MerchantMaintenanceDataEntry', {
            id: prototype.id + '-MerchantMaintenanceDataEntry-1',
            option: 'C'
        });
        dataEntry.show();
    },
    onDisplayFilterBtn: function () {
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        if (filters.isVisible()) {
            filters.hide();
        } else {
            filters.show();
        }
    },
    onClearOptionsBtn: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters').getForm();
        formFilters.reset();
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    getCmp: function ({id}) {
        return Ext.getCmp(prototype.id + id);
    },
    parseInt: function (number) {
        if (number && number !== '') {
            return parseInt(number);
        }
        return number;
    },
    getDistinct: function (lst, key) {
        let valoresVistos = {};
        let resultado = lst.filter(function (item) {
            if (valoresVistos[item[key]]) {
                return false;
            }
            valoresVistos[item[key]] = true;
            return true;
        });
        return resultado;
    }
    //</editor-fold>
});
