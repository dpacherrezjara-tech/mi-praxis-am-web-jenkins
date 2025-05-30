Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.PagoDuplicadoDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PagoDuplicadoDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    codadju: '02', // 02 ajuste duplicado - 05 ajuste multiple
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        this.getTicketInfo();
    },
    getTicketInfo: async function () {
        const me = this;
        me.view.setLoading(true);
        const gridTkt = Ext.getCmp(prototype.idDE6 + '-gridTicket');
        const gridPending = Ext.getCmp(prototype.idDE6 + '-gridLiqPend');
        const gridConcil = Ext.getCmp(prototype.idDE6 + '-gridLiqConc');
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
        let notifier = new AWN();
        let params = me.formatParams();
        let onOk = () => {
            const rbOption = Ext.getCmp(prototype.idDE6 + '-viewOption').lastValue.opcion;
            if (rbOption === 'D') {
                me.duplicatedConciliation(params);
            } else {
                me.multiPaymentConciliation(params);
            }
        };
        notifier.confirm('Reconciliate?',onOk,null);
        
    },
    duplicatedConciliation: async function (params) {
        const me = this;
        me.view.setLoading(true);
        if (me.tkt.at(0).SVFOPS !== me.pending.at(0).TGROSAMOUN) {
            global.Msg({msg: 'Amount not match'});
            me.view.setLoading(false);
            return;
        }
        
        try {
            const {cuuid, fuuid} = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', [params]);
            const res = await global.callStorePost('PRAXISMP', 'SQP05603', {
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
    multiPaymentConciliation: async function (params) {
        const me = this;
        me.view.setLoading(true);

        let tktValue = me.tkt.at(0).SVFOPS;
        let stlConcValue = global.sumBy(me.concil, 'TGROSAMOUN');
        let stlPendValue = global.sumBy(me.pending, 'TGROSAMOUN');

        if (tktValue !== (stlConcValue + stlPendValue)) {
            global.Msg({msg: 'Amount not match'});
            me.view.setLoading(false);
            return;
        }
        
        try {
            const {cuuid, fuuid} = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', [params]);
            const res = await global.callStorePost('PRAXISMP', 'SQP05603', {
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
    formatParams: function(){
        const me = this;
        let liqConcil = me.pending.map(x => ({
                ...x,
                ADJTYPE: me.codadju
            }));

        let req = {
            tickets: me.tkt,
            liquidacion: liqConcil
        };
        console.log(req);
        return req;
    },
    onCancelClick: function () {
        this.view.close();
    },
    onChangeOption: function (obj) {
        const formParams = Ext.getCmp(prototype.idDE6 + '-liquiParams');
        if (obj.lastValue.opcion === 'D') {
            this.codadju = '02';
            formParams.hide();
        } else {
            this.codadju = '05';
            formParams.show();
        }
    }
});

