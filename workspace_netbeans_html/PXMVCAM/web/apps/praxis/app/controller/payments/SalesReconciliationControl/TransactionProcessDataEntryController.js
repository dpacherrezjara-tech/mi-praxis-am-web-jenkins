Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.TransactionProcessDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TransactionProcessDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    bean: {},
    init: function (view) {
    },
    afterRender: function (obj, e) {
        const me = this;
        const processors = me.view.processors;
        const freglasForProcessMasiveTransactional = me.view.freglasForProcessMasiveTransactional || [];
        
        // combo processor
        const cmbProcessProcessor = Ext.getCmp(prototype.id + '-ProcessProcessor');
        // set combo processor
        global.setComboStoreWithoutAll(cmbProcessProcessor, processors, 'A4451KEY2', 'A4451DESC1', 'AMEX02');
        
        // combo reglas - similar a dataFreglas con CODE y NAME
        const cmbProcessReglas = Ext.getCmp(prototype.id + '-ProcessReglas');
        if (cmbProcessReglas && freglasForProcessMasiveTransactional.length > 0) {
            global.setComboStore(cmbProcessReglas, freglasForProcessMasiveTransactional, 'CODE', 'NAME', '');
        }
    },
    onProcessClick: function (btn) {
        const me = this;
        const dateFromBtn = Ext.getCmp(prototype.id + '-processTransactionBatchFrom').getValue();
        const dateToBtn = Ext.getCmp(prototype.id + '-processTransactionBatchTo').getValue();
        let dateIni = Ext.Date.format(dateFromBtn, 'Ymd');
        let dateFin = Ext.Date.format(dateToBtn, 'Ymd');
        let processor = Ext.getCmp(prototype.id + '-ProcessProcessor').getValue();
        let regla = Ext.getCmp(prototype.id + '-ProcessReglas').getValue();
        
        // Si la regla es "All" (vacío), establecer como cadena vacía
        let prioridad = (regla === '' || regla === null || regla === undefined) ? '' : regla;
        
        //console.log(dateIni, dateFin, processor, prioridad);
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
                            me.processDate(dateIni, dateFin, processor, prioridad);
                        }
                    }
                });
    },
    processDate: async function (dateIni, dateFin, processor, prioridad) {
        const me = this;
        me.view.setLoading(true);
        let params = {
            VP_CCUST: '139',
            VP_FPROC_INI: dateIni,
            VP_FPROC_FIN: dateFin,
            VP_PROCESADOR: processor,
            VP_PRIORIDAD: prioridad || ''
        };
        // console.log('params', params);
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
    onChangeDateProcessTransaction: function (obj) {
        let option = obj.id.split('-').at(-1);
        
        const from = Ext.getCmp(prototype.id + '-processTransactionBatchFrom');
        const to = Ext.getCmp(prototype.id + '-processTransactionBatchTo');
        
        const opts = {
            'processTransactionBatchFrom': () => {
                // Si cambia From, establecer To al mismo valor si To es menor
                if (to.getValue() && from.getValue() && to.getValue() < from.getValue()) {
                    to.setValue(from.getValue());
                }
            },
            'processTransactionBatchTo': () => {
                // Si cambia To y es menor que From, establecer From al valor de To
                if (to.getValue() && from.getValue() && to.getValue() < from.getValue()) {
                    from.setValue(to.getValue());
                }
            }
        };
        opts[option]();
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
