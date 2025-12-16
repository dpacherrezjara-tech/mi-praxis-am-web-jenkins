Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.TransactionProcessDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TransactionProcessDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    bean: {},
    init: function (view) {
    },
    afterRender: function (obj, e) {
        const me = this;
        const processors = me.view.processors ;
        
        // combo
        const cmbProcessProcessor = Ext.getCmp(prototype.id + '-ProcessProcessor');
        // set combo
        global.setComboStoreWithoutAll(cmbProcessProcessor, processors, 'A4451KEY2', 'A4451DESC1', 'AMEX02');
        
    },
    onProcessClick: function (btn) {
        const me = this;
        const dateBtn = Ext.getCmp(prototype.id + '-processTransactionBatch').getValue();
        let date = Ext.Date.format(dateBtn, 'Ymd');
        let processor = Ext.getCmp(prototype.id + '-ProcessProcessor').getValue();
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
                            me.processDate(date, processor);
                        }
                    }
                });
    },
    processDate: async function (date, processor) {
        const me = this;
        me.view.setLoading(true);
        let params = {
            VP_CCUST: '139',
            VP_FPROC: date,
            VP_PROCESADOR: processor
        };
        console.log(params);
        try {
//            res = global.callStorePostAsync('PRAXISMP','SQP05074',params);
            const res = await global.callStorePost('PRAXISMP','SQP05074',params);
            
            const {lstVals, lstRs} = res.data;
            console.log(lstVals);
//            if (lstVals.VP_CANT > 0) {
//                new AWN().success('Process Succefully, ' + lstVals.VP_CANT );
//            }
//            else {
//                new AWN().warning('Nothing Data');
//            }
//            new AWN().success('Process Running' );
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: `Process successfully completed.<br/>Total records: <b>${lstVals.VP_CANT}</b>`,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });
            
        } catch (e) {
            Ext.Msg.show({
                title: 'Error',
                msg: 'An unexpected error occurred while processing.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
        finally {
            me.view.setLoading(false);
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
