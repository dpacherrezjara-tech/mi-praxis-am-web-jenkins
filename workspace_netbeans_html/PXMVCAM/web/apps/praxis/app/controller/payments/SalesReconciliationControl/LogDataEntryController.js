Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.LogDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LogDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    height: 1200,
    bean: {},
    init: function (view) {
    },
    afterRender: async function () {
        const me = this;
        me.view.setLoading(true);
        await this.getData();
        me.view.setLoading(false);
    },
    getData: async function () {
        const me = this;
//        console.log('me', me.view.obj)
        const data = me.view.obj;
        const params = {
            IN_CCUST: data.CCUST,
            IN_PRDA: data.PRDA,
            IN_AREFNBR: data.AREFNBR
        };

        me.dataNow = params;

        const grid = Ext.getCmp(prototype.idLog + '-grid-Log');
//        console.log('grid', grid)

        try {
            const res = await global.callStoreGet('PRAXISMP', 'SQP05700', params);
//            console.log('res', res);

            const response = res.lstRs?.at(0) || {};
//            console.log('response', response);

            if (!response || Object.keys(response).length === 0) {
                global.Msg({msg: 'Data not Found'});
                return;
            }


            let store = new Ext.data.Store({data: response});
            grid.setStore(store);

        } catch (e) {
            console.error(e);
        }

    },

    onCloseClick: function () {
        this.view.close();
    },

    downloadExcelLog: function () {  //modal confirmar descarga
        const me = this;
        const notifier = new AWN();
        notifier.confirm(
                'Download Excel',
                () => {
            me.onDownloadExcel();
        },
                null);
    },

    onDownloadExcel: async function () {
        const me = this;
        const view = me.view;

        view.setLoading(true);
        try {

            const statusMap = {
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

            let notifier = new AWN();
            const dwl = async () => {
                const res = await global.callStoreGet('PRAXISMP', 'SQP05700', me.dataNow);
                if (res.lstRs) {
                    let data = res.lstRs.at(0);
                    if (data.length === 0) {
                        global.Msg({msg: 'No data'});
                    }
                    let excel = data.map(x =>
                        ({
                            'Ref. Number': x.AREFNBR,
                            'Corrl': x.CORRL,
                            'Merchand ID': x.SMERCHID,
                            'Status': statusMap[x.STVAL] || 'Unknown Status',
                            'Created User': x.USCR,
                            'Created Date': x.FECR,
                            'Created Time': x.HOCR,
                        }));
                    global.writeExcelFromJson(excel, 'Log By Payment Information');
                    view.setLoading(false);
                }

            };
            notifier.async(dwl(), 'Successfully Download', 'Error on Download', 'Downloading File');

        } catch (e) {
            console.log(e)
            view.setLoading(false);

        }

    }
});
