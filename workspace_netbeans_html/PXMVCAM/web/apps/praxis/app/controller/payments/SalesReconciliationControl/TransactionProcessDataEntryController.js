Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.TransactionProcessDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TransactionProcessDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    bean: {},
    init: function (view) {
    },
    afterRender: function (obj, e) {
        const me = this;
        const data = me.view.dataFilters ;
        const procesadores = data.procesadores;
        
        // combo
        const cmbProcessProctype = Ext.getCmp(prototype.id + '-processProctype');
        // set combo
        global.setComboStoreWithoutAll(cmbProcessProctype, procesadores, 'a4451key2', 'a4451desc1', '');
        
    },
    onProcessClick: function (btn) {
        const me = this;
        const dateBtn = Ext.getCmp(prototype.id + '-processTransactionBatch').getValue();
        let date = Ext.Date.format(dateBtn, 'Ymd');
        let proctype = Ext.getCmp(prototype.id + '-processProctype').getValue();
        //console.log(date);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to process?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.processDate(date, proctype);
                        }
                    }
                });
    },
    processDate: async function (date, proctype) {
        const me = this;
        me.view.setLoading(true);
        let params = {
            VP_CCUST: '139',
            VP_FPROC: date,
            VP_PROCESADOR: proctype
        };
        console.log(params);
        try {
//            res = global.callStorePostAsync('PRAXISMP','SQP05074',params);
            const res = await global.callStorePost('PRAXISMP','SQP05074',params);
            
            const {lstVals, lstRs} = res.data;
            console.log(lstVals);
            if (lstVals.VP_CANT > 0) {
                new AWN().success('Process Succefully, ' + lstVals.VP_CANT );
            }
            else {
                new AWN().warning('Nothing Data');
            }
//            new AWN().success('Process Running' );
            
            me.view.setLoading(false);
            this.view.close();
        } catch (e) {
            
        }

        
//        fetch(`${me.url}/processTransactionsBatch`, {
//            method: 'POST',
//            headers: {
//                'Content-Type': 'application/json'
//            },
//            body: JSON.stringify(params)
//        }).then(async res => {
//            if (res.ok) {
//                const data = await res.json();
//                const {vp_CANT} = data;
//                Ext.toast({
//                    html: `<b>Process Success<br>Total Affected: ${vp_CANT}</b>`,
//                    title: 'Notification',
//                    align: 't',
//                    closable: true,
//                    width: 300,
//                    timeout: 10000 // 10 segundos
//                });
//                Ext.getCmp(prototype.id + '-processDownloadResult').show();
//            } else {
//                Ext.MessageBox.show({
//                    title: 'Error',
//                    message: 'Error in Process',
//                    icon: Ext.MessageBox.ERROR,
//                    buttons: Ext.MessageBox.OK
//                });
//            }
//        }).catch(err => {
//            console.error(err);
//            Ext.MessageBox.show({
//                title: 'Error',
//                message: 'Error in Process',
//                icon: Ext.MessageBox.ERROR,
//                buttons: Ext.MessageBox.OK
//            });
//        }).finally(() => {
//            me.view.unmask();
//        });
    },
    onCancelClick: function () {
        this.view.close();
    },
    downloadExcel: function (btn) {
        const me = this;
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Download Excel?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.downloadResultBatch();
                        }
                    }
                });
    },
    downloadResultBatch:async function(){
        global.getFile(`${prototype.url}/downloadTransactionsBatch`);
    }
});
