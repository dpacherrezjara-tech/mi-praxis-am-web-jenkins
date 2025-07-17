Ext.define('Ext.Praxis.controller.payments.SettlBalancesCtrl.DataEntryBalanceConciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryBalanceConciliationController',
    url: CONTEXTPATH + '/DataEntryBalanceConciliation',
    afterRender: function (obj, e) {
        const me = this; //call controller
        const view = me.view; // call view design
//        console.log('view--', view.searchParams);
        me.onGetForm();
        this.onLoadGrid(view);
        this.bindData();
    },

    onGetForm: function () {
        const me = this;
        const formObject = Ext.getCmp(prototype.idDE2 + 'BalanceConciliationForm').getForm();
        formObject.setValues(me.view.searchParams);
        me.loadedData = me.view.searchParams;
//        const old = formObject
    },
    onLoadGrid: async function () {
        const me = this;
        const view = me.view;
        const a = view.searchParams;
        console.log('onLoadGrid--', view.searchParams);
        const scardn = a.SCARDN.trim();
        const scardn1 = scardn.split('*')[0];
        const scardn2 = scardn.split('*').pop().trim();
        const card2 = a.PROCTYPESQ === "BANORTE00" ? scardn2.slice(-2) : scardn2;
        const ajuste = a.AJUSTE === 'A' ? 'J'
                : a.AJUSTE === 'J' ? 'A'
                : a.AJUSTE;
         
        const grid = Ext.getCmp(prototype.idDE2 + '-BalanceConciliationGrid');
        try {
             console.log('ALL GRID DATA',a)
//            console.log('MONTO',a.SALDO)
            grid.setLoading(true);
            let params = {
                "IN_PROCTYPESQ": a.PROCTYPESQ.trim(),
                "IN_SDATE": a.SDATE,
                "IN_SCARDN1": scardn1,
                "IN_SCARDN2": card2,
//                "IN_AJUSTE": ajuste,
                "IN_AJUSTE": a.AJUSTE,
                "IN_DAYS": 15,
                "IN_TDOC":a.TDOC,
//                "IN_SALDO":a.SALDO
            };
            const res = await global.callStoreGet('PRAXISMP', 'SQP05652', params);
            let data = res.lstRs[0];

            if (data.length === 0) {
                global.Msg({msg: 'Data not Found'});
                grid.setLoading(false);
                return;
            }

            let store = new Ext.data.Store({data: data});
            grid.setStore(store);
            grid.setLoading(false);
        } catch (e) {
            console.error(e);
            grid.setLoading(false);
        }
    },

    onUpdateClick: async function () {
        const me = this;
        me.view.setLoading(true);
        try {
            const grid = Ext.getCmp(prototype.idDE2 + '-BalanceConciliationGrid');

            const selected = grid.getSelectionModel().getSelection();

            if (selected.length === 0) {
                new AWN().alert('Select a row first.');
                me.view.setLoading(false);
                return;
            }
            const loadedData2 = selected[0].data;

            const saldo1 = Math.abs(loadedData2.SALDO);
            const saldo2 = Math.abs(me.loadedData.SALDO);


            if (saldo1 === saldo2) {
                const params = {
                    IN_CCUST: loadedData2.CCUST.trim(),
                    IN_AREFNBR: me.loadedData.AREFNBR,
                    IN_PRDA: me.loadedData.PRDA,
                    IN_TDOC: me.loadedData.TDOC,
                    IN_AREFNBR2: loadedData2.AREFNBR,
                    IN_PRDA2: loadedData2.PRDA,
                    IN_TDOC2: loadedData2.TDOC,
                };
                const res = await global.callStorePost('PRAXISMP', 'SQP05651', params);
                const {lstVals} = res.data;
                new AWN().success(lstVals.OUT_MSG);
                await me.onLoadGrid();
            } else {
//                new AWN().alert('The selected amounts do not match. Reconciliation is not possible.');
                Ext.Msg.show({
                    title: '.:PRAXIS:.',
                    msg: 'The selected amounts do not match. Reconciliation is not possible',
                    buttons: Ext.MessageBox.OK,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                });
            }



        } catch (e) {
            console.error(e);
            new AWN().alert('Error');
        } finally {
            me.view.setLoading(false);
        }
    },

    onCancelClick: function () {
        this.view.close();
    },
    bindData: function () {
        const me = this;
        const updBtn = Ext.getCmp(prototype.idDE2 + '-btn-update');
        if (me.view.stval === '4') {
            updBtn.show();
            updBtn.setDisabled(false);
        } else {
            updBtn.hide();
            updBtn.setDisabled(true);
        }
    }
});


