Ext.define('Ext.Praxis.controller.salesaudit.TaxesExceptions.TaxesExceptionsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaxesExceptionsController',
    taxes: [],
    paises:[],
    afterRender: async function () {
        await this.loadFilters();
        this.loadTickets();
    },
    loadFilters: async function () {
        const me = this;
        me.view.setLoading(true);
        try {
            const res = await global.callStoreGet('PXSAUDIT', 'SQP05586', {});
            me.paises = res.lstRs.at(0);
            me.taxes = res.lstRs.at(1);
            const cmbPaises = Ext.getCmp(prototype.id + '-cmbPaises');
            global.setComboStore(cmbPaises,me.paises,'CODE','NAME','');
        } catch (e) {
            console.error(e);
        } finally {
            me.view.setLoading(false);
        }
    },
    loadTickets: async function(){
        const me = this;
        const grid = Ext.getCmp(prototype.id + '-gridExceptionTickets');
        let params = me.formatParams();
        let store = global.callStorePaggin('PXSAUDIT','SQP05583',params);
        grid.setStore(store);
    },
    onClickSearchBtn:function(){
        this.loadTickets();
    },
    formatParams: function(){
        const form = Ext.getCmp(prototype.id + '-panelFilters').getForm();
        return form.getValues();
    },
    onClickAddBtn: function(){
        const me = this;
        
        const newWin = Ext.create('Ext.Praxis.view.salesaudit.TaxesExceptionsForm.DataEntrys.TaxesExceptionsDataEntry',{
            id:prototype.id + '-TaxesExceptionsDataEntry-1',
            option:'C',
            taxes:me.taxes
        });
        newWin.show();
    },
    loadTaxDetails: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const newWin = Ext.create('Ext.Praxis.view.salesaudit.TaxesExceptionsForm.DataEntrys.TaxesExceptionsDataEntry',{
            id:prototype.id + '-TaxesExceptionsDataEntry-1',
            option:'U',
            obj: record.data,
            taxes:me.taxes
        });
        newWin.show();
    },
    downloadMainGrid: async function(){
        let notifier = new AWN();
        let params = this.formatParams();
        const dwl = async () => {
            const res = await global.callStorePagginExcel('PXSAUDIT', 'SQP05583', params);
            if (res) {
                let data = res.map(x=>({
                       'Client':x.CCUST,
                       'Agent':x.CIATA,
                       'Agent Name':x.NIATA,
                       'Sale Country':x.PAISV,
                       'Sale Date':x.SDATE,
                       'Transaction':x.TRNCU,
                       'Doc. Type':x.TDOC,
                       'Ticket':x.CCIA + x.FORMA + x.SERIE,
                       'SEQ':x.SEQ,
                       'PNR':x.SPNR,
                       'Pax Name':x.PAXNAME,
                       'Itinerary':x.RUTABOL,
                       'Type Load':x.TIPOING
                    }));
                global.writeExcelFromJson(data, 'Tax Exceptions');
            }
        };
        notifier.async(dwl(),'Successfully Download', 'Error on Download', 'Downloading File');
    },
    onMassiveLoad: function(){
        const newWin = Ext.create('Ext.Praxis.view.salesaudit.TaxesExceptionsForm.DataEntrys.TaxesExceptionsMassiveLoad',{
            id:prototype.id + '-TaxesExceptionsMassiveLoad-1'
        });
        newWin.show();
    }
});

