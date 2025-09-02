Ext.define('Ext.Praxis.controller.payments.SalesComplement.MitGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MitGridController',
    afterRender: function (obj, e) {
        const me = this; //call controller
        const view = me.view; // call view design
        this.getData(view);
    },
    
    
    getData: async function (view) {
        let store = global.callStorePaggin('PRAXISMP', 'SQP05642', view.searchParams);
        console.log(' data entry', store)
        view.bindStore(store);
        this.view.setStore(store);
    },
    
    
    downloadExcelMit: function (){  //modal confirmar descarga
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
        let res = await global.callStorePagginExcel('PRAXISMP','SQP05642',view.searchParams);  //trae toda la data completa
        
        let data = res.map(x=>({
           'Processor': x.A4775PROCE ,
           'Proccesing Date': x.A4775PRDA,
           'Merchand':x.A4775MERID,
           'Iata':x.A4775MERPG,
           'Transaction Date':x.A4775FECTR,
           'Transaction Time':x.A4775HORTR,
           'Credit Card Number': x.A4775NUMTJ,
           'Credit Card Auth': x.A4775NUMAT,
           'Credit Card Type': x.A4775PRICD,
           'Credit Card Pyment Type': x.A4775PLANP,
           'Issuer': x.A4775EMISO,
           'PNR': x.A4775PNR,
           'Currency': x.A4775MONED,
           'Amount': x.A4775IMPOR,
           'Type Transaction': x.A4775TRXTP,
           'Number Operation': x.A4775NROOP,
           'Status': x.A4775STATU,
           'Status Transaction': x.A4775STVAL,
           'User':x.A4775USUAR,
           'User Transaction':x.A4775USUAT
           
        }));
        await global.writeExcelFromJson(data,'Mit Information'); // formatea la data para usarlo en la función de descarga
        view.setLoading(false);
    }
});


