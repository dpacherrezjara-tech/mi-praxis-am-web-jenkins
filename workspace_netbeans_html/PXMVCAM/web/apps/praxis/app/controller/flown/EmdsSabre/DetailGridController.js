Ext.define('Ext.Praxis.controller.flown.EmdsSabre.DetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailGridController',
    url: CONTEXTPATH + '/EmdsSabre',
    init: function (view) {
        if (!view.backButton) {
            Ext.getCmp(prototype.id + '-backButton').hide();
        }
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData({view: view});
    },
    getData: async function ( {view}) {
        const me = this;
        let res = await global.callStorePaggin('PRAXIS', 'SQP05425', view.searchParams);
        view.setStore(res);
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
//                            global.getFile(`${me.url}/downloadDetail?${new URLSearchParams(params)}`);
                            me.onDownloadExcel();
                        }
                    }
                });
    },

    onDownloadExcel: async function () {
        const me = this;
        const view = me.view;

        view.setLoading(true);
        try {
            let data = await global.callStorePagginExcel('PRAXIS', 'SQP05425', view.searchParams);

            if (data.length === 0) {
                global.Msg({msg: 'Data not Found'});
                view.setLoading(false);
                return;
            }

            let excel = data.map(x => ({
                    'Processing Date': x.FPROC,
                    'Ticket': x.CCIA + x.FORMA + x.SERIE,
                    'Seq': x.SEQ,
                    'Coupon': x.CUPON,
                    'Source': me.formatSource(x.FTE),
                    'Group': x.GRUPO,

                    'Process Information Status': me.formatStatus(x.STVAL),
                    'Process Information BATCH': x.LOTE,
                    'Process Information Status Changed': x.STUSE,

                    'Document Information Doc. Code': x.CDOC,
                    'Document Information RFIC': x.RFIC,
                    'Document Information RFISC': x.RFIS,
                    'Document Information Country': x.PSVVTA,
                    'Document Information IATA Code': x.AGTIA,
                    'Document Information Sale Date': x.FVTA,
                    'Document Information Pax Type': me.formatPaxTax(x.TPAX),

                    'Coupon Detail Carrier Mkt.': x.CARR,
                    'Coupon Detail Carrier Opered': x.CARROP,
                    'Coupon Detail Coupon Value': x.VCPN,
                    'Coupon Detail Commision': x.COMISI,
                    'Coupon Detail S. Commision': x.SCOMISI,
                    'Coupon Detail YQ': x.YQ,
                    'Coupon Detail Currency': x.MDACP,
                    'Coupon Detail Coupon Value Rev': x.VCPNRV,
                    'Coupon Detail Commision Rev': x.COMREV,
                    'Coupon Detail S. Commision Rev': x.SCOMREV,
                    'Coupon Detail YQ Rev': x.YQREV,

                    'Use Information Flag': x.TUSO,
                    'Use Information Flight Date': x.DFLIGHT,
                    'Use Information Flight Number': x.NFLIGHT,
                    'Use Information Dep. Airport': x.CDEPART,
                    'Use Information Arr. Airport': x.CARRIVA
                }));

            await global.writeExcelFromJson(excel, 'Detail EMDS Information');
            view.setLoading(false);

        } catch (e) {
            console.log(e);
            view.setLoading(false);

        }
    },

    formatSource: function (x) {
        let opts = {
            'B': 'BSP',
            'A': 'ARC',
            'M': 'MAN',
            'S': 'ASR'
        };
        return opts[x] || '';
    },
    formatStatus: function (x) {
        let opts = {
            '0': 'Pending',
            '1': 'Used',
            '2': 'No Used',
            '4': 'Status Changed'
        };
        return opts[x] || '';
    },
    formatPaxTax: function (x) {
        let opts = {
            'A': 'Adult',
            'C': 'Child',
            'I': 'Infant'
        };
        return opts[x] || '';
    }

});


