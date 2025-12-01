
Ext.define('Ext.Praxis.controller.salesaudit.BPOControlAnalytics.DataEntryLogRankingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryLogRankingController',
    init: function (view) {
    },
    afterRender: async function () {
        const me = this;
        me.view.setLoading(true);

        if (me.view.rowData && me.view.rowData.USUARIO) {
            me.view.setTitle(`Detail User - ${me.view.rowData.USUARIO}`);
        }

        await this.getData();
        me.view.setLoading(false);
    },
    getData: async function () {
        const me = this;
        // console.log('me get data', me.view.rowData);
        
        const data = me.view.rowData ;
        const params = {
            IN_CCUST : '139' ,
            IN_DATEFROM : data.FECHA_INICIO.replace(/-/g, ''),
            IN_DATETO:data.FECHA_FIN.replace(/-/g, ''),
            IN_USER: data.USUARIO,
        };


        me.dataDetail =  params;

        const gridDet = Ext.getCmp(prototype.idRanking + '-grid-Detail');
        const paggin = Ext.getCmp(prototype.idRanking + '-pagginLog');


        try {
            const res = await global.callStorePaggin('PRAXISMP', 'SQP05744', params);
        //    console.log('res', res);

           gridDet.setStore(res);
           paggin.setStore(res)

        } catch (e) {
            console.error(e);
        }

    },

    onCloseClick: function () {
        this.view.close();
    },

    downloadExcelLog: function () {
        const me = this;
        const notifier = new AWN();
        notifier.confirm('Download Excel', () => me.onDownloadExcel(), null);
    },

    onDownloadExcel: async function () {
        const me = this;
        const view = me.view;
        view.setLoading(true);
        const res = await global.callStorePagginExcel('PRAXISMP', 'SQP05744', me.dataDetail);


        if (res) {
            let data = res.map(x=>({
                "Date": x.PRDA,
                "Country": x.SCOUNTRY,
                "Processor": x.PROCTYPE_DESC,
                "Merchant ID": x.PMERCHID,
            
                "Card Number": x.SCARDN,
                "Auth": x.SAUTHOC,
            
                "PNR": x.SPNR,
                "Ticket": x.TKT,
                "Qty Tkt": x.QTYTKT,
                "Currency": x.SCURRENCY,
                "Transaction Type": x.TRANSTYPE,
                "Code Chbk": x.CODCHGBACK,
            
                "Auth Date": x.FEAUT,
                "Auth Time": x.HOAUT,
                "Auth User": x.AUASI,
                "Asig Date": x.FEASI,
                "Asig Time": x.HOASI,
            }));

            const userName = me.view.rowData.USUARIO.replace(/\s+/g, '_');

            global.writeExcelFromJson(data, `Detail_${userName}`);
        }
        notifier.async(dwl(),'Successfully Download', 'Error on Download', 'Downloading File');
    },
});
