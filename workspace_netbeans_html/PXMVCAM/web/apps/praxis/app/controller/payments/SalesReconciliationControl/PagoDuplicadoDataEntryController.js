Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.PagoDuplicadoDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PagoDuplicadoDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        this.getTicketInfo();
    },
    getTicketInfo: async function () {
        const me = this;
        me.view.setLoading(true);
        const gridTkt = Ext.getCmp(prototype.idDE2 + '-gridTicket');
        const gridPending = Ext.getCmp(prototype.idDE2 + '-gridLiqPend');
        const gridConcil = Ext.getCmp(prototype.idDE2 + '-gridLiqConc');
        try {
            const res = await global.callStoreGet('PRAXISMP', 'SQP05602', me.view.ticket);
            me.tkt = res.lstRs.at(0);
            me.pending = res.lstRs.at(1);
            me.concil = res.lstRs.at(2);

            gridTkt.setStore(new Ext.data.Store({data: me.tkt}));
            gridPending.setStore(new Ext.data.Store({data: me.pending}));
            gridConcil.setStore(new Ext.data.Store({data: me.concil}));

        } catch (e) {
            new AWN().alert('Error');
            me.view.close();
        } finally {
            me.view.setLoading(false);
        }
    },
    onConciliateClick: async function () {
        const me = this;
        me.view.setLoading(true);
        if(me.tkt.at(0).SVFOPS !== me.pending.at(0).TGROSAMOUN){
            global.Msg({msg:'Amount not match'});
            me.view.setLoading(false);
            return;
        }
        
        let req = {
            tickets: me.tkt,
            liquidacion: me.pending
        };
        console.log(req);
        try {
            const {cuuid, fuuid} = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', [req]);
            const res = await global.callStorePost('PRAXISMP','SQP05603',{
               IN_CUUID: cuuid,
               IN_FUUID: fuuid
            });
            const {lstVals} = res.data;
            new AWN().success(lstVals.OUT_MSG);
        } catch (e) {
            console.error(e);
            new AWN().alert('Error');
        } finally {
            me.view.setLoading(false);
            me.view.resetDataEntry();
            me.view.close();
        }
    },
    onCancelClick: function(){
        this.view.close();
    }
});

