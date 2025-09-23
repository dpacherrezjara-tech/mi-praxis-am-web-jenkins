Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.SettlementDetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SettlementDetailGridController',
    init: function (view) {
        if (view.backButton) {
            let tbar = view.getDockedItems('toolbar[dock="top"]')[0];
            tbar.items.items[1].show();
        }
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        console.log('after', view);
        this.getData({view: view});
    },
    getData: async function ( {view}) {
        //const tdate = view.searchParams.IN_DATE === 'PRDA' ? 'Processing<br>Date' : 'Payment<br>Date';
        //view.columns[0].setText(tdate);
        const res = await global.callStorePaggin('PRAXISMP', 'SQP05134', view.searchParams);
        console.log('res', res);

        view.setStore(res);
    },
    onClickDate: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const obj = record.data;
        console.log(me.formatDateParams(obj));
//        const panelMerch = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.Grids.SettlementSummaryGrid', {
//            id: prototype.id + '-SettlementSummaryGrid-2',
//            searchParams: me.formatDateParams(obj)
//        });
//        panelMerch.show();
    },
    formatMerchantParams: function (obj) {
        const me = this;
        let params = Object.assign({}, me.view.searchParams);
        params.IN_MERCHANT = 'M';
        params.IN_DATEFROM = obj.paydate ? obj.paydate : obj.prda;
        params.IN_DATETO = obj.paydate ? obj.paydate : obj.prda;
        params.IN_PROCTYPE = obj.proctype;
        params.IN_SCOUNTRY = obj.scountry;
        return params;
    },
    downloadExcel: function (btn) {
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
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            global.getFile(`${me.view.url}/downloadSettlementDetail?${new URLSearchParams(params)}`);
//                            me.onDownloadExcel();
                        }
                    }
                });
    },
    onDownloadExcel: async function () {
        const me = this;
        const view = me.view;

        view.setLoading(true);
        try {

            let res = await global.callStorePagginExcel('PRAXISMP', 'SQP05134', view.searchParams); 
            let data = res || [];

            if (data.length === 0) {
                global.Msg({ msg: 'No Data' });
                view.setLoading(false);
                return;
            }
           
            let excel = data.map(x => ({
                'Proccessing Date' : x.PRDA,
                'Payment Date' : x.PAYDATE,
                'Sales Date' : x.TRANSDATE,
                'Settlement vs Sales' : me.formatSettlementVsSales(x.STVAL),
                'Update Status': x.FEUP,
                'Sale Merchant' : x.SMERCHID,
                'Payment Merchant' : x.PMERCHID,
                'Processor' : x.DESC_PROCTYPE,
                'Country' : x.SCOUNTRY,
                'Qty Tkts' : x.QTYTKT,
                'Invoice Refer. Number PNR' : me.formatInvRefNumber(x),
                'Ref. Number' : x.AREFNBR,
                'PNR' : x.SPNR,
                'Document Type' : x.TRANSTYPE,
                'Indust.Speci. Ref.Nbr' : x.ISREFNBR,
                'Card Number' : x.SCARDN,
                'Auth.' : x.SAUTHOC,
                'Installment Plan' : x.NBRINSTA,
                'Installment Number' : x.INSTANBR,
                'Currency' : x.SCURRENCY,
                'Sales Amount' : x.SVFOPS,
                'Transaction Amount' : x.TGROSAMOUN,
                'Rate Comm.' : me.formatPorcentaje(x.SFEERATE),
                'Serv. Fee' : x.SERVICEFEE,
                'VAT COMM 1 2' : x.OVERCOM12,
                'Discount Rate' : me.formatPorcentaje(x.DISCRATEI),
                'Discount Amount' : x.DISCAMOUN,
                'Discount Rate VAT' :  me.formatPorcentaje(x.DISCRATEI),
                'Discount Amount VAT' : me.formatDiscountAmountVAT(x),
                'Number (Chargeback)' : x.CHGBNUM,
                'Reason Code (Chargeback)' : x.CODCHGBACK,
                'Amount (Chargeback)' : me.formatCHBAmount(x),
                'Commission (Chargeback)' : me.formatCHBCom(x),
                'VAT (Chargeback)' : me.formatCHBVAT(x),
                'Amount (Adjustment)' : x.ADJUSMENT,
                'Commission (Adjustment)' : me.formatAdjCom(x),
                'VAT (Adjustment)' : me.formatAdjVAT(x),
                'TAX' : x.f_TAX,
                'Net Amount' : x.NETO,
                'Net Amount to Receive AM' :x.NETOPAY,
                'Currency Settlement' : x.PCURRENCY,
                'Code (Rule)' : x.FREGLA,
                'Description (Rule)' : me.formatRule(x.FREGLA),
                'Flag Complement' : me.formatFlag(x.FCOMPL),
                'Praxis ID' : x.IDCONL,
                'Accounting Date' : x.FCONTL
            }));

            await global.writeExcelFromJson(excel, 'Settlement Detail Information');
            view.setLoading(false);
           
        } catch (e) {
            console.log(e);
            view.setLoading(false);
        }
    },
    formatSettlementVsSales: function (status) {
        let opts = {
             'A': 'Match OC/Camepa',
             'C': 'Match Complement',
             'E': 'Duplicate Payment',
             'M': 'Match Multi-Payment',
             '0': 'Stand By',
             '1': 'Match',
             '2': 'Sales Without Settl.',
             '3': 'Settl. Without Sales',
             '4': 'Match Partial',
             '5': 'Match Manual',
             '8': 'Match Transactional',
             '9': 'Match Void'
        };
        return opts[status] || '';
    },
    
    formatInvRefNumber: function(x){
        console.log('x',x);
        const {PROCTYPESQ, PWREF} = x;
            if (PROCTYPESQ === 'BANORTE00') {
                value = PWREF;
            }
    },
    
    formatMoneda: function(x) {
        return Ext.util.Format.number(x, '0,000.00');
    },
    formatPorcentaje: function(x) {
        return Ext.util.Format.number(x, '0,000.00 %');
    },
    
    formatDiscountAmountVAT: function(x) {
    const { TRANSTYPE, IVACOM12 } = x;
        let value = 0;

        if (TRANSTYPE && TRANSTYPE.trim() !== 'CHBK') {
            value = IVACOM12 || 0;
        }

        return Ext.util.Format.number(value, '0,000.00');
    },
    
    formatCHBAmount: function(x) {
    const { TRANSTYPE, TGROSAMOUN } = x;
        let value = 0;

        if (TRANSTYPE && TRANSTYPE.trim() !== 'CHBK') {
            value = TGROSAMOUN || 0;
        }

        return Ext.util.Format.number(value, '0,000.00');
    },
    formatCHBCom: function(x) {
    const { TRANSTYPE, DISCAMOUN } = x;
        let value = 0;

        if (TRANSTYPE && TRANSTYPE.trim() !== 'CHBK') {
            value = DISCAMOUN || 0;
        }

        return Ext.util.Format.number(value, '0,000.00');
    },
    
    formatCHBVAT:function(x) {
    const { TRANSTYPE, DISCAMOUNI } = x;
        let value = 0;

        if (TRANSTYPE && TRANSTYPE.trim() !== 'CHBK') {
            value = DISCAMOUNI || 0;
        }

        return Ext.util.Format.number(value, '0,000.00');
    },
    formatAdjCom:function(x) {
    const { TRANSTYPE, DISCAMOUN } = x;
        let value = 0;

        if (TRANSTYPE && TRANSTYPE.trim() !== 'ADJU') {
            value = DISCAMOUN || 0;
        }

        return Ext.util.Format.number(value, '0,000.00');
    },
    formatAdjVAT:function(x) {
    const { TRANSTYPE, DISCAMOUNI } = x;
        let value = 0;

        if (TRANSTYPE && TRANSTYPE.trim() !== 'ADJU') {
            value = DISCAMOUNI || 0;
        }

        return Ext.util.Format.number(value, '0,000.00');
    },
    formatRule:function(x){
        let opts = {
            '0': 'TKT+PNR+IATA+FE+I+T+A',
            '1': 'TKT+IATA+FE+I+T+A',
            '2': 'TKT+PNR+FE+I+T+A',
            '3': 'TKT+FE+I+T+A',
            '4': 'PNR+IATA+FE+I+T+A',
            '5': 'IATA+FE+I+T+A',
            '6': 'PNR+FE+I+T+A',
            '7': 'FE+I+T+A',
            '8': 'TKT+PNR+FE+I+T',
            '9': 'TKT+PNR+FE+ID+T+A',
            'A': 'PNR+FE+I+T',
            'B': 'PNR+FE+ID+T+A',
            'C': 'TKT+FE+I+T',
            'D': 'FE+I+T',
            'E': 'FE+I+PNR'
        };
        return opts[x] || '';
        
    },
    formatFlag:function(x){
        let opts = {
            '1': 'Plusgrade',
            '2': 'Ligas',
            '3': 'Tablet',
            '4': 'BPO'
        };
        return opts[x] || '';
        
    },
    
    onClickBPO: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const obj = record.data;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.SettlementDataEntry', {
            id: prototype.id + '-SettlementDataEntry-1',
            obj: obj
        });
        dataEntry.show();
    }
});


