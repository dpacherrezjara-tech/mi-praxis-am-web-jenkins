Ext.define('Ext.Praxis.controller.payments.BPOControlAnalytics.GridBPOControlAnalyticsRendimientoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GridBPOControlAnalyticsRendimientoController',

    afterRender: function (obj, e) {
        const me = this;
        const view = me.view;

        this.getData(view);
        
        
    },

    getData: async function (view) {
        console.log('view', view);
        view.setLoading(true);
        
        view.searchParams.IN_USER =  view.searchParams.IN_USER === 'All' ? '' : view.searchParams.IN_USER;

        let store = await global.callStoreGet('PRAXISMP', 'SQP05743', view.searchParams);
        console.log('stores', store);

        let data = store?.lstRs?.[0] || [];

        console.log('data', data);

        if (data.length === 0) {
            view.setLoading(false);
            global.Msg({ msg: 'Data not found' });
            return;
        }
        view.setStore(data);

        view.setLoading(false);
    },



    downloadExcel: function () {
        const me = this;
        const notifier = new AWN();
        notifier.confirm('Download Excel', () => me.onDownloadExcel(), null);
    },

    onDownloadExcel: async function () {
        const me = this;
        const view = me.view;
        view.setLoading(true);
        let res = await global.callStoreGet('PRAXISMP', 'SQP05743', view.searchParams);

        if (res.lstRs) {
            let data = res.lstRs.at(0);
            if (data.length === 0) {
                global.Msg({msg: 'No data'});
                return;
            }

            // console.log('dataaa',data);

            const formatSeconds = (value) => {
                if (value == null || isNaN(parseFloat(value))) return value;
        
                const num = parseFloat(value);
                const h = Math.floor(num / 3600);
                const m = Math.floor((num % 3600) / 60);
                const s = num % 60;
        
                return (h > 0 ? h + 'h ' : '') +
                       (m > 0 ? m + 'm ' : '') +
                       (s > 0 ? s + 's' : '');
            };

            const formatDate = (ymd) => {
                if (!ymd) return "";
                const y = ymd.substring(0, 4);
                const m = ymd.substring(4, 6);
                const d = ymd.substring(6, 8);
                return `${d}/${m}/${y}`;
            };

            let excel = data.map((x, index) => {


                const row = {
                    "#": index + 1,
                    User: x.USUARIO,
                    Date: formatDate(x.FECHA),
                    Time: x.HORA || "",
                    Performance: formatSeconds(x.TIEMPO_SEG)
                };
            
                return row;
            });
            
            global.writeExcelFromJson(excel, 'User Performance');
        }
        view.setLoading(false);
    },


});
