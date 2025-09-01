
Ext.define('Ext.Praxis.controller.salesaudit.DynamicFaresForm.DynamicFaresFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DynamicFaresFormController',
    taxes: [],
//    afterRender: async function () {
////        await this.loadFilters();
////        this.loadTickets();
//    },
    onClickClearBtn:function(){
        const panelFilters = Ext.getCmp(prototype.id + '-formFilters');
        panelFilters.reset();
    },
    onClickFilterBtn: function () {        
        const panelFilters = Ext.getCmp(prototype.id + '-formFilters');
       
        if (panelFilters.isVisible())
            panelFilters.hide();
        else
            panelFilters.show();
    },
    onClickSearchBtn: function() {
        this.searchDynamicFares();
    },
    searchDynamicFares: async function(){
        const me = this;
        let params = me.formatParams();
        
        console.log("params", params);
         
        const grid = Ext.getCmp(prototype.id + '-gridDynamicFares');
        
        let store = global.callStorePaggin('PXSAUDIT','SQP05643',params);
        
        grid.setStore(store);
                
    },
    formatParams: function(){
        const form = Ext.getCmp(prototype.id + '-formFilters').getForm();
        return form.getValues();
    },
    downloadMainGrid: async function(){
        let notifier = new AWN();
        let params = this.formatParams();
        const dwl = async () => {
            const res = await global.callStorePagginExcel('PXSAUDIT', 'SQP05643', params);
            if (res) {
                
                let data = res.map(x => ({
                    'Client': x.CCUST,
                    'PRDA': x.PRDA,
                    'Ticket': x.TICKET,
                    'DP ID': x.DPID,
                    'Origin': x.ORIGIN,
                    'Destination': x.DESTIN,
                    'POS': x.POS,
                    'Service': x.SERVIC,
                    'Departure Date': x.DEPDAT,
                    'Run Date': x.RUNDAT,
                    'Expiry Date': x.EXPDAT,
                    'Original Class': x.ORICLS,
                    'Original Class Value': x.ORICLV,
                    'Proposed Class': x.PROCLS,
                    'Proposed Class Value': x.PROCLV,
                    'Forced Upsell': x.FORCUP,
                    'Service Type': x.SERTYP,
                    'Cabin': x.CABIN,
                    'LOS Start': x.LOSTAR,
                    'LOS End': x.LOSEND,
                    'DP Adjustment Value': x.ADJVAL,
                    'Final Fare Value': x.FINFAV,
                    'Run Number': x.RUNNBR,
                    'User Created': x.USCR,
                    'Date Created': x.FECR,
                    'Hour Created': x.HOCR,
                    'User Updated': x.USUP,
                    'Date Updated': x.FEUP,
                    'Hour Updated': x.HOUP
                }));

                global.writeExcelFromJson(data, 'Dynamic Fares');
            }
        };
        notifier.async(dwl(),'Successfully Download', 'Error on Download', 'Downloading File');
    }
    
});