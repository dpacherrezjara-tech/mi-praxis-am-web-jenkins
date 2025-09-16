Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.SettlementMerchantGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SettlementMerchantGridController',
    filters: {},
    init: function (view) {
        if (view.backButton) {
            let tbar = view.getDockedItems('toolbar[dock="top"]')[0];
            tbar.items.items[1].show();
        }
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData({view: view});
    },
    getData: async function ( {view}) {
        view.mask('Loading...');
        const tdate = view.searchParams.IN_DATE === 'PRDA' ? 'Processing<br>Date' : 'Payment<br>Date';
        view.columns[0].setText(tdate);
        this.filters = view.searchParams ;
        const res = await fetch(`${view.url}/loadSettlementSummary?${new URLSearchParams(view.searchParams)}`);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            let store = Ext.create('Ext.data.Store', {
                data: data.response,
                autoLoad: true
            });
            view.setStore(store);
        }
        view.unmask();
    },
    onClickMerchant: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const obj = record.data;
        const params = me.formatMerchantParams(obj);
        console.log("params",params);
        
        const mainPanel = Ext.getCmp(prototype.id + '-mainContentSettl');
        const drillDown = mainPanel.items.items;
        drillDown.at(-1).hide();
        
        const panelDet = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.SettlementDetailGrid', {
            id: prototype.id + '-SettlementDetailGrid-1',
            searchParams: params,
            url: me.view.url,
            backButton: true
        });
        mainPanel.add(panelDet);
    },
    formatMerchantParams: function (obj) {
        const me = this;
        let params = Object.assign({}, me.view.searchParams);
        params.IN_MERCHANT = obj.pmerchid;
        params.IN_DATEFROM = obj.paydate ? obj.paydate : obj.prda;
        params.IN_DATETO = obj.paydate ? obj.paydate : obj.prda;
        params.IN_PROCTYPE = obj.proctype;
        params.IN_PROCTYPESQ = obj.proctypesq;
        params.IN_SCOUNTRY = obj.scountry;
        params.IN_SCURRENCY = obj.scurrency;
        params.IN_PCURRENCY = obj.pcurrency;
        params.IN_SCARDN = this.filters.IN_SCARDN ?? '';
        params.IN_AREFNBR = this.filters.IN_AREFNBR ?? '';
        params.IN_TICKET = this.filters.IN_TICKET ?? '';
        return params;
    },
    downloadExcel:function(){
        const me = this;
        let params = Object.assign({}, me.view.searchParams);
        params.excel = true;
        console.log(params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Download Excel?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            global.getFile(`${me.view.url}/downloadSettlementSummary?${new URLSearchParams(params)}`);
                        }
                    }
                });
    }
});


