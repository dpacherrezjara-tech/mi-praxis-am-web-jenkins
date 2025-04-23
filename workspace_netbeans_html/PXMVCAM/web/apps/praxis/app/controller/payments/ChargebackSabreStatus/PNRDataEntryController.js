Ext.define('Ext.Praxis.controller.payments.ChargebackSabreStatus.PNRDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PNRDataEntryController',
    init: function (view) {
    },
    afterRender: function (obj, e) {
        const view = this.view;
        this.fillData(view.searchParams);
        this.getData();
    },
    fillData:function(params){
        Ext.getCmp(prototype.idDE + '-txtPNR').setValue(params.pnr);
    },
    getData: async function () {
        const view = this.view;
        const grid = Ext.getCmp(prototype.idDE + '-PNRGrid');
        grid.setLoading(true);
        let params = this.formatParameters();
        const res = await global.callStoreGet('PRAXISMP','SQP05560',params);
        if(res.lstRs.length>0){
            let data = res.lstRs.at(0);
            if(data.length === 0) {
                global.Msg({msg:'No data'});
                this.view.close();
            }else{
                let store = new Ext.data.Store({
                    data: data
                });
                grid.setStore(store);
            }
            
        }else{
            global.Msg({msg:'Error on load'});
            this.view.close();
        }
        grid.setLoading(false);
    },
    formatParameters:function(){
        //const view = this.view;
        const filtersParams = Ext.getCmp(prototype.idDE + '-pnrDataEntryForm').getValues();
        let params = {
            IN_CCUST:'139',
                    ...filtersParams
        };
        console.log(params);
        return params;
    },
    onCancelClick:function(){
        this.view.close();
    },
    onViewTicket: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        if(record.data.TICKET.trim()===''){
            return;
        }
        const obj = record.data.TICKET;
        prototypeProgram.view = 'payments-chargeback-sabre-status-form';
        prototypeProgram.nprog = 'PX00000635';
        prototypeProgram.title = 'Chargeback Sabre Status';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = obj.substr(0, 3);
        beanProMasterTicket.IN_FORMA = obj.substr(3, 4);
        beanProMasterTicket.IN_SERIE = obj.substr(7, 6);

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
        this.view.close();
    }
});


