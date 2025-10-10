Ext.define('Ext.Praxis.controller.payments.SalesComplement.PlusgradeGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PlusgradeGridController',
    afterRender: function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData(view);
    },
    getData: async function ( view) {
        let store = global.callStorePaggin('PRAXISMP','SQP04979',view.searchParams);
        //view.bindStore(store);
        this.view.setStore(store);
    },
    
    onViewPNR: function (grid, html, rowIndex, colIndex, obj) {
        const record = obj.record.data;
        let winPnrDataEntry = Ext.create('Ext.Praxis.view.payments.SalesComplementForm.PnrDataEntry', {
            id: prototype.id + '-dataEntry-searchPnr',
            params: record
        });
        winPnrDataEntry.show();
    },
    copyEMDTKT: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        navigator.clipboard.writeText(rowData.data.EMDNUMBER.trim());
        global.Msg({
            msg: 'EMD NUMBER Copied to clipboard!: ' + rowData.data.EMDNUMBER.trim()
        });
    },
    onClickSearchTicket: function (grid, html, rowIndex, colIndex, obj) {
        let data = obj.record.data;
        console.log(data);
        let strTkt = data.EMDNUMBER || data.TKT;
        let strSeq = data.SEQ || '00';
        if (!strTkt) {
            return;
        }
        prototypeProgram.view = 'payments-sales-complement-form';
        prototypeProgram.nprog = 'PX00000627';
        prototypeProgram.title = 'Sales Complement';
        prototypeProgram.modulo = '';

        let beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
        beanProMasterTicket.IN_SEQ = win.stringPad(strSeq, '0', 2);

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    onClickOpenReconciliation: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const obj = record.data;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesComplementForm.DataEntrys.PlusgradeReconciliationDataEntry', {
            id: prototype.id + '-PlusgradeReconciliationDataEntry-1',
            obj: obj,
//            callback: () => {
//                grid.getStore().load();
//            }
        });
        dataEntry.show();
    },
    
    downloadExcelPlusgrade: function (){  //modal confirmar descarga
        const me = this;
        const notifier = new AWN();
        notifier.confirm(
            'Download Excel',
            ()=>{
                me.onDownloadExcel();
            },
            null
        );
    },
    onDownloadExcel: async function(){
        const me = this;
        const view = me.view;
        view.setLoading(true);
        let res = await global.callStorePagginExcel('PRAXISMP','SQP04979',view.searchParams);  //trae toda la data completa
        
        let data = res.map(x=>({
           'Plusgrade ID': x.PLUSGRAID ,
           'Merchant': x.MERCHID,
           'Processing Date': x.PRDA,
           'Diff Days': x.PASSED_DAYS,
           'Plusgrade VS AMEX': x.DESCFAMEX,
           'Match Date (Plusgrade VS Amex)': x.AMEXFECSELEC,
           'Plusgrade VS Sales': x.DESCSTVAL,
           'Match Date (Plusgrade VS Sales)': x.DESCVSSALES,
           'Sales Country': x.COUNTRY,
           'Sales Date': x.SDATE,
           'Credit Card Code': x.SCARCOD,
           'Credit Card Number': x.SCARDN,
           'Credit Card Auth.': x.SAUTHOC,
           'Qty Pax': x.NBROFPAX,
           'Currency Offer': x.CUROFFER,
           'Total Amount': x.SVFOP,
           'Total Amount Off': x.AMOUNTOFF,
           'Sales Amount': x.SVFOPS,
           'Sales Difference': x.DIFF_AMOUNT,
           'Sales Country Praxis': x.SCOUNTRY,
           'Sales Date Praxis': x.SDATES,
           'Qty Tickets': x.QTYTKT,
           'Plusgrade VS Chargeback': x.DESCFAMEXCHG,
           'PNR': x.PNR,
           'EMD Number': x.EMDNUMBER,
           'Accounting Status': x.STCON_DESCRIPTION,
           'Accounting Date': x.FCONT,
           'Accounting Praxis ID': x.IDCON,
           'Accounting ID FLEX': x.IDCONFLE,
           
           'Error Code': x.CERROR,
           'Error Description': x.DES_CERROR,
           'Add Pax EMD Number': x.ADDPAXEMD,
           'Add Pax Ticket Number': x.ADDPAXTKT,
           'Token': x.PAYTOKEN,
           'User Updated': x.USUP,
           'Updated ': x.FEUP
           
        }));
        await global.writeExcelFromJson(data,'Plusgrade Information'); 
        view.setLoading(false);
    }
});

