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
                            // todo ! cambiar por microservicio de descarga excel o en su defecto una descarga por proceso en cola
                            global.getFile(`${me.view.url}/downloadSettlementDetail?${new URLSearchParams(params)}`);
                        //    me.onDownloadExcel();
                        }
                    }
                });
    },
    onDownloadExcel: async function () {
        const me = this;
        const view = me.view;

        view.setLoading(true);
        try {
            const excelFields = [
                { title: 'Proccessing Date',          field: 'PRDA',                 order: 1  },
                { title: 'Payment Date',               field: 'PAYDATE',              order: 2  },
                { title: 'Sales Date',                 field: 'TRANSDATE',            order: 3  },
                { title: 'Settlement vs Sales',        field: 'STVAL_DESCRIPTION',    order: 4  },
                { title: 'Update Status',              field: 'FEUP',                 order: 5  },
                { title: 'Sale Merchant',              field: 'SMERCHID',             order: 6  },
                { title: 'Payment Merchant',           field: 'PMERCHID',             order: 7  },
                { title: 'Processor',                  field: 'DESC_PROCTYPE',        order: 8  },
                { title: 'Country',                    field: 'SCOUNTRY',             order: 9  },
                { title: 'Qty Tkts',                   field: 'QTYTKT',               order: 10 },
                { title: 'Invoice Refer. Number PNR',  field: 'PWREF',                order: 11 },
                { title: 'ARN',                        field: 'ARN',                  order: 12 },
                { title: 'Ref. Number',                field: 'AREFNBR',              order: 13 },
                { title: 'PNR',                        field: 'SPNR',                 order: 14 },
                { title: 'Document Type',              field: 'TRANSTYPE',            order: 15 },
                { title: 'Indust.Speci. Ref.Nbr',      field: 'ISREFNBR',             order: 16 },
                { title: 'Card Number',                field: 'SCARDN',               order: 17 },
                { title: 'Auth.',                      field: 'SAUTHOC',              order: 18 },
                { title: 'Installment Plan',           field: 'NBRINSTA',             order: 19 },
                { title: 'Installment Number',         field: 'INSTANBR',             order: 20 },
                { title: 'Currency',                   field: 'SCURRENCY',            order: 21 },
                { title: 'Sales Amount',               field: 'SVFOPS',               order: 22 },
                { title: 'Transaction Amount',         field: 'TGROSAMOUN',           order: 23 },
                { title: 'Rate Comm.',                 field: 'SFEERATE',             order: 24 },
                { title: 'Serv. Fee',                  field: 'SERVICEFEE',           order: 25 },
                { title: 'VAT COMM 1 2',               field: 'OVERCOM12',            order: 26 },
                { title: 'Discount Rate',              field: 'DISCRATEI',            order: 27 },
                { title: 'Discount Amount',            field: 'DISCAMOUN',            order: 28 },
                { title: 'Discount Rate VAT',          field: 'DISCRATEI',            order: 29 },
                { title: 'Discount Amount VAT',        field: 'IVACOM12',             order: 30 },
                { title: 'Number (Chargeback)',        field: 'CHGBNUM',              order: 31 },
                { title: 'Reason Code (Chargeback)',   field: 'CODCHGBACK',           order: 32 },
                { title: 'Amount (Chargeback)',        field: 'TGROSAMOUN',           order: 33 },
                { title: 'Commission (Chargeback)',    field: 'DISCAMOUN',            order: 34 },
                { title: 'VAT (Chargeback)',           field: 'DISCAMOUNI',           order: 35 },
                { title: 'Amount (Adjustment)',        field: 'ADJUSMENT',            order: 36 },
                { title: 'Commission (Adjustment)',    field: 'DISCAMOUN',            order: 37 },
                { title: 'VAT (Adjustment)',           field: 'DISCAMOUNI',           order: 38 },
                { title: 'TAX',                        field: 'f_TAX',                order: 39 },
                { title: 'Net Amount',                 field: 'NETO',                 order: 40 },
                { title: 'Net Amount to Receive AM',   field: 'NETOPAY',              order: 41 },
                { title: 'Currency Settlement',        field: 'PCURRENCY',            order: 42 },
                { title: 'Code (Rule)',                field: 'FREGLA',               order: 43 },
                { title: 'Description (Rule)',         field: 'FREGLA_DESCRIPTION',   order: 44 },
                { title: 'Flag Complement',            field: 'FCOMPL_DESCRIPTION',   order: 45 },
                { title: 'Praxis ID',                  field: 'IDCONL',               order: 46 },
                { title: 'Accounting Date',            field: 'FCONTL',               order: 47 }
            ];
            
            await global.callStoreDownloadExcel('PRAXISMP', 'SQP05134', view.searchParams, 'PaymentsReconciliation - Settlement Detail', excelFields);
        } catch (e) {
            console.log(e);
            global.Msg({ msg: 'Error descargando archivo' });
        } finally {
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


