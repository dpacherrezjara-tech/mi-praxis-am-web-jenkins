Ext.define('Ext.Praxis.controller.salesaudit.BPOControlAnalytics.GridBPOControlAnalyticsAnalisisController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GridBPOControlAnalyticsAnalisisController',

    afterRender: function (obj, e) {
        const me = this;
        const view = me.view;
        
        this.getData(view);
        
    },

    getData: async function (view) {
        view.setLoading(true);
    
        view.searchParams.IN_USER = view.searchParams.IN_USER === 'All' ? '' : view.searchParams.IN_USER;
    
        let store = await global.callStoreGet('PRAXISMP', 'SQP05743', view.searchParams);
    
        let data = store?.lstRs?.[0] || [];
    
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

            let excel = data.map(x => {
                const rawMin = x.MIN_SEG;
                const rawMax = x.MAX_SEG;
            
                const fmtMin = me.formtTime(rawMin);
                const fmtMax = me.formtTime(rawMax);

                const avgTime = (x.PROM_MIN !== undefined && x.PROM_MIN !== null)? x.PROM_MIN + ' min' : '';

                const row = {
                    "User": x.AUASI,
                    "Date Authorization": x.FEAUT,
                    "Total": x.TOTAL_SOL,
                    "Fast": x.RAPIDAS,
                    "Normal": x.NORMALES,
                    "Critical": x.CRITICAS,
                    "Avg Time": avgTime,
                    "Min Time": fmtMin,
                    "Max Time": fmtMax
                };
            
                return row;
            });
            
            global.writeExcelFromJson(excel, 'User Time Analysis');
        }
        view.setLoading(false);
    },

    formtTime: function (value) {
        if (value == null) return '';
    
        const h = Math.floor(value / 3600);
        const m = Math.floor((value % 3600) / 60);
        const s = value % 60;
    
        const timeStr =
            (h > 0 ? h + 'h ' : '') +
            (m > 0 ? m + 'm ' : '') +
            (s > 0 ? s + 's' : '');
    
        return timeStr.trim();
    },

});
