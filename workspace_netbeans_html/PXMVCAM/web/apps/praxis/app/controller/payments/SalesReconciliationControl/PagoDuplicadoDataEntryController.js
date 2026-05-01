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
        const gridTkt = Ext.getCmp(prototype.idDE6 + '-gridLiq');
        const gridPending = Ext.getCmp(prototype.idDE6 + '-gridLiqPend');
        
        let obj = me.view.obj;
        
        let pos = obj.PROCTYPE === 'BANORTE00' ? -2 : -4;
        
        let params = {
            IN_PAYDATE : obj.PAYDATE,
            IN_TDOC: obj.TDOC,
            IN_SCARDN1: obj.SCARDN.slice(0,6),
            IN_SCARDN2: obj.SCARDN.trim().slice(pos)
        };
        
        // console.log(params);

        try {
            me.tkt = [me.view.obj];
            gridTkt.setStore(new Ext.data.Store({data: me.tkt}));
            
            const res = await global.callStoreGet('PRAXISMP', 'SQP05655', params);
            
            me.pending = res.lstRs.at(0);
            me.concil = res.lstRs.at(1);
            
            gridPending.setStore(new Ext.data.Store({data: me.pending}));

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
        
        let onOk = () => {
            me.duplicatedConciliation();
        };
        notifier.confirm('Reconciliate?',onOk,null);
        
    },
    duplicatedConciliation: async function () {
        const me = this;
        me.view.setLoading(true);
        
        const grid = Ext.getCmp(prototype.idDE6 + '-gridLiqPend');
        const seleccionados = grid.getSelectionModel().getSelection();
        
        if (seleccionados.length === 0) {
            global.Msg({msg: 'Select one Settlement'});
            me.view.setLoading(false);
            return;
        }
        
        let objSel = seleccionados.at(0).data;
        
        if (me.view.obj.TGROSAMOUN !== objSel.TGROSAMOUN) {
            global.Msg({msg: 'Amount not match'});
            me.view.setLoading(false);
            return;
        }
        
        let params = {
            IN_CCUST: '139',
            IN_PRDA: me.view.obj.PRDA,
            IN_TDOC: me.view.obj.TDOC,
            IN_AREFNBR: me.view.obj.AREFNBR,
            IN_PRDA2: objSel.PRDA,
            IN_TDOC2: objSel.TDOC,
            IN_AREFNBR2: objSel.AREFNBR
        };
        
        let status_res = 0 ;
        let message = "" ;
        
        try {
            //const {cuuid, fuuid} = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', [params]);
            const res = await global.callStorePost('PRAXISMP', 'SQP05653', params);
            
            // console.log("result", res);
            status_res = parseInt( res.data.lstVals.OUT_RES ) ;
            message = res.data.lstVals.OUT_MSG ;
            
        } catch (e) {
            status_res = 0 ;
            message = e ;
        } finally {
            
            if ( status_res === 1) {
                
                new AWN().success(message);  
                me.view.setLoading(false);
                me.view.resetDataEntry();
                me.view.close();
            }
            else {
                new AWN().alert(message);
            }
        }
    },
    onCancelClick: function () {
        this.view.close();
    },
    onChangeOption: function (obj) {
        const formParams = Ext.getCmp(prototype.idDE6 + '-liquiParams');
        if (obj.lastValue.OPCION === 'D') {
            this.codadju = '02';
            formParams.hide();
        } else {
            this.codadju = '05';
            formParams.show();
        }
    }
});
