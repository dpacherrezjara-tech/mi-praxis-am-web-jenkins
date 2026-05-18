
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

        const data = me.view.rowData;
        const params = {
            IN_CCUST: '139',
            IN_DATEFROM: data.FECHA_INICIO.replace(/-/g, ''),
            IN_DATETO: data.FECHA_FIN.replace(/-/g, ''),
            IN_USER: data.USUARIO,
            IN_FLADM: Ext.isEmpty(data.IN_FLADM) ? '' : data.IN_FLADM,
            IN_TRNCU: Ext.isEmpty(data.IN_TRNCU) ? '' : data.IN_TRNCU
        };


        me.dataDetail = params;

        const gridDet = Ext.getCmp(prototype.idRanking + '-grid-Detail');
        const paggin = Ext.getCmp(prototype.idRanking + '-pagginLog');


        try {
            const res = await global.callStorePaggin('PXSAUDIT', 'SQP06039', params);
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

        try {

            const res = await global.callStorePagginExcel(
                    'PXSAUDIT',
                    'SQP06039',
                    me.dataDetail
                    );

            if (res) {

                let data = res.map(x => ({

                        "Ticket Nbr": x.A1672TICKET,
                        "Source": x.A1672FUENT,
                        "Channel": x.A1672CANAL,
                        "Country": x.A1672PAIVT,
                        "IATA": x.A1672AGENT,
                        "Trans.": x.A1672TRNCU,
                        "Doc. Type": x.A1672TDOC,
                        "Issue Date": x.A1672FVENT,
                        "Processing Date": x.A1672FPROC,
                        "Working Date": x.A1672FAASI,
                        "Working Hour": x.A1672HAASI,
                        "Suggested Date": x.A1672FREVI,
                        "Status": x.A1672FLADM

                    }));

                const userName =
                        me.view.rowData.USUARIO.replace(/\s+/g, '_');

                global.writeExcelFromJson(
                        data,
                        `Detail_${userName}`
                        );
            }

        } catch (e) {

            console.error(e);

            Ext.Msg.alert(
                    'Error',
                    'Error downloading Excel'
                    );

        } finally {

            // SIEMPRE se ejecuta
            view.setLoading(false);
        }
    }
});
