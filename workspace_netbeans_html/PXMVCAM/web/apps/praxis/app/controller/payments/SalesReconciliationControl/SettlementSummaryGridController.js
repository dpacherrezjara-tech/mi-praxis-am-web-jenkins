Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.SettlementSummaryGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SettlementSummaryGridController',
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
        
        // build params additional use in detail summary settlement
        let searchParams = Object.assign({}, view.searchParams || {});
        searchParams.IN_MERCHANT = '';
        searchParams.IN_PROCTYPE = '';
        searchParams.IN_PCURRENCY = '';
        console.log("view.searchParams params object:", searchParams);

        // Use Paggin in view
        try {
            const res = await global.callStoreGet('PRAXISMP', 'SQP05133', searchParams);
            const data = res?.lstRs?.[0] || [];
            view.setStore({
                pageSize: 20,
                data,
                proxy: { type: 'memory', enablePaging: true },
                autoLoad: true
            });
        } finally {
            view.unmask();
        }
   
    },
    onClickDate: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const obj = record.data;
        console.log(me.formatDateParams(obj));
        const mainPanel = Ext.getCmp(prototype.id + '-mainContentSettl');
        const drillDown = mainPanel.items.items;
        drillDown.at(-1).hide();
        const panelMerch = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.SettlementMerchantGrid', {
            id: prototype.id + '-SettlementMerchantGrid-1',
            searchParams: me.formatDateParams(obj),
            url: me.view.url,
            backButton: true
        });
        mainPanel.add(panelMerch);
    },
    formatDateParams: function (obj) {
        const me = this;
        let params = Object.assign({}, me.view.searchParams);
        params.IN_MERCHANT = 'M';
        params.IN_DATEFROM = obj.PAYDATE ? obj.PAYDATE : obj.PRDA;
        params.IN_DATETO = obj.PAYDATE ? obj.PAYDATE : obj.PRDA;
        params.IN_PROCTYPE = '';
        params.IN_PROCTYPESQ = obj.PROCTYPESQ;
        params.IN_SCOUNTRY = obj.SCOUNTRY;
        params.IN_SCURRENCY = obj.SCURRENCY;
        params.IN_PCURRENCY = obj.PCURRENCY;
        return params;
    },
    downloadExcel: function () {
        const me = this;
        const view = me.view;
        const date = me.view.searchParams.IN_DATEFROM;
        const nameFile = 'Settlement Summary ' + date ;
        
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: async function (btn) {
                if (btn !== 'yes') {
                    return;
                }
                const store = view.getStore();
                let allRows = [];
                if (store) {
                    const proxy = store.getProxy ? store.getProxy() : null;
                    const proxyData = proxy ? (proxy.getData ? proxy.getData() : proxy.data) : null;

                    // When using memory + enablePaging, proxy.data keeps the full dataset.
                    if (Array.isArray(proxyData)) {
                        allRows = proxyData;
                    } else if (Array.isArray(store.getRange && store.getRange())) {
                        allRows = store.getRange();
                    } else if (store.getData && Array.isArray(store.getData().items)) {
                        allRows = store.getData().items;
                    }
                }

                const records = allRows.map(item => item && item.data ? item.data : item);
                if (!records.length) {
                    global.Msg({msg: 'No data to export'});
                    return;
                }

                const includeMerchant = Boolean(
                    (view.searchParams && view.searchParams.IN_MERCHANT)
                    || records.some(r => r && r.PMERCHID)
                );

                const colorAmounts = '#B2DAFA';
                const colorPaymentInfo = '#FCF6DC';
                let columns = [
                    {
                        title: 'Processing\nDate',
                        valueGetter: function (row) { return row.PRDA || row.PAYDATE || ''; }
                    },
                    {title: 'Processor', field: 'DESC_PROCTYPE'},
                    {title: 'Country', field: 'SCOUNTRY'},
                    {title: 'Qty\nTransactions', field: 'QTYTRN', dataAlign: 'right'},
                    {title: 'Currency', field: 'SCURRENCY'},
                    {title: 'Total\nAmount', field: 'TGROSAMOUN', dataBgColor: colorAmounts, dataAlign: 'right'},
                    {title: 'GROSS\nAmount', field: 'TGROSAMOUN_WCA', dataBgColor: colorAmounts, dataAlign: 'right'},
                    {title: 'Comm.\nAmount', field: 'DISCAMOUN', dataBgColor: colorAmounts, dataAlign: 'right'},
                    {title: 'Comm.\nVAT', field: 'DISCAMOUNI', dataBgColor: colorAmounts, dataAlign: 'right'},
                    {title: 'Serv. Fee', field: 'SERVICEFEE', dataBgColor: colorAmounts, dataAlign: 'right'},
                    {title: 'Serv. Fee\nVAT', field: 'OVERCOM12', dataBgColor: colorAmounts, dataAlign: 'right'},
                    {title: 'CHBK\nAmount', field: 'TGROSAMOUN_CB', dataBgColor: colorAmounts, dataAlign: 'right'},
                    {title: 'CHBK\nComm.', field: 'DISCAMOUN_CB', dataBgColor: colorAmounts, dataAlign: 'right'},
                    {title: 'CHBK\nVAT', field: 'DISCAMOUNI_CB', dataBgColor: colorAmounts, dataAlign: 'right'},
                    {title: 'ADJU\nAmount', field: 'ADJUSTMENT', dataBgColor: colorAmounts, dataAlign: 'right'},
                    {title: 'ADJU\nComm.', field: 'DISCAMOUN_ADJ', dataBgColor: colorAmounts, dataAlign: 'right'},
                    {title: 'ADJU\nVAT', field: 'DISCAMOUNI_ADJ', dataBgColor: colorAmounts, dataAlign: 'right'},
                    {title: 'TAX', field: 'TAX', dataBgColor: colorAmounts, dataAlign: 'right'},
                    {title: 'NET Amount', field: 'NETAMOUN', dataBgColor: colorAmounts, dataAlign: 'right'},
                    {title: 'Payment Info.\nCurrency', field: 'PCURRENCY', dataBgColor: colorPaymentInfo, dataAlign: 'right'},
                    {title: 'Payment Info.\nTotal Amount', field: 'TGROSAMPAY', dataBgColor: colorPaymentInfo, dataAlign: 'right'},
                    {title: 'Payment Info.\nGROSS Amount', field: 'TGROSAMPAY_WCA', dataBgColor: colorPaymentInfo, dataAlign: 'right'},
                    {title: 'Payment Info.\nComm. Amount', field: 'SFEEAMOU', dataBgColor: colorPaymentInfo, dataAlign: 'right'},
                    {title: 'Payment Info.\nComm. VAT', field: 'IVACOM12', dataBgColor: colorPaymentInfo, dataAlign: 'right'},
                    {title: 'Payment Info.\nServ. Fee\nAmount', field: 'SERVICFEEP', dataBgColor: colorPaymentInfo, dataAlign: 'right'},
                    {title: 'Payment Info.\nServ. Fee\nVAT', field: 'OVERCOM12P', dataBgColor: colorPaymentInfo, dataAlign: 'right'},
                    {title: 'Payment Info.\nTAX', field: 'TAXP', dataBgColor: colorPaymentInfo, dataAlign: 'right'},
                    {title: 'Payment Info.\nNET Amount\nTo receive AM', field: 'NETOPAY', dataBgColor: colorPaymentInfo, dataAlign: 'right'}
               
                ];

                if (includeMerchant) {
                    columns.splice(1, 0, {title: 'Merchant', field: 'PMERCHID'});
                }

                await global.writeExcelFromJsonWithStyle({
                    data: records,
                    name: nameFile,
                    columns: columns,
                    defaultHeaderBgColor: '7F98A8',
                    defaultHeaderFontColor: '000000',
                    defaultDataBgColor: 'FFFFFF',
                    defaultDataFontColor: '000000'
                });
            }
        });
    }
});


