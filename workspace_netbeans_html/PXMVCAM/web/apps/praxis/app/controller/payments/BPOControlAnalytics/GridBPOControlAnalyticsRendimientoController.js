Ext.define('Ext.Praxis.controller.payments.BPOControlAnalytics.GridBPOControlAnalyticsRendimientoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.GridBPOControlAnalyticsRendimientoController',

    afterRender: function (obj, e) {
        const me = this;
        const view = me.view;

        this.getData(view);
        
        
    },

    getData: async function (view) {
        // console.log('view', view);
        view.setLoading(true);
        
        view.searchParams.IN_USER =  view.searchParams.IN_USER === 'All' ? '' : view.searchParams.IN_USER;

        let store = await global.callStoreGet('PRAXISMP', 'SQP05743', view.searchParams);
        console.log('stores', store);

        let data = store?.lstRs?.[0] || [];

        // console.log('data', data);

        if (data.length === 0) {
            view.setLoading(false);
            global.Msg({ msg: 'Data not found' });
            return;
        }
        
        view.setStore(data);
        this.addLegend(view);

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

     //legend 
     addLegend: function (view) {

        // Si ya existe, no lo volvemos a agregar
        if (view.down('#analytics-legend')) return;
    
        const legend = {
            xtype: 'container',
            itemId: 'analytics-legend',
            layout: 'hbox',
            margin: '0 10 0 0',
            style: {
                background: '#ffffff',
                padding: '8px 14px',
                borderRadius: '6px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
            },
            items: [
                {
                    xtype: 'component',
                    html: `
                        <div style="display:flex; gap:18px; align-items:center; font-size:12px; color:#374151;">
                            
                            
                            <div style="display:flex; align-items:center; gap:4px;">
                                <div style="width:14px;height:14px;background:#d1fae5;border-radius:4px;"></div>
                                <span>Fast ≤ 3 min</span>
                            </div>
        
                            <div style="display:flex; align-items:center; gap:4px;">
                                <div style="width:14px;height:14px;background:#fef3c7;border-radius:4px;"></div>
                                <span>Normal 3–6 min</span>
                            </div>
        
                            <div style="display:flex; align-items:center; gap:4px;">
                                <div style="width:14px;height:14px;background:#fee2e2;border-radius:4px;"></div>
                                <span>Low ≥ 6 min</span>
                            </div>
        
                        </div>
                    `
                }
            ]
        };
        
    
        // Insertamos en el TBar (AL INICIO)
        view.getDockedItems('toolbar[dock="top"]')[0].insert(0, legend);
    }


});
