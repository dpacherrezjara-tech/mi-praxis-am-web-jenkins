Ext.define('Ext.Praxis.controller.payments.SalesReconciliationDifferences.ProcessDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProcessDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationDiff',
    bean: {},
    init: function (view) {
    },
    afterRender: function (obj, e) {

    },
    onProcessClick: function (btn) {
        const me = this;
        const dateBtn = Ext.getCmp(prototype.id + '-processBatch').getValue();
        let date = Ext.Date.format(dateBtn, 'Ymd');
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
                            me.processDate(date);
                        }
                    }
                });
    },
    processDate: function (date) {
        const me = this;
        me.view.mask('Processing...');
        let params = {
            VP_CCUST: '139',
            VP_FPRO: date
        };
        fetch(`${me.url}/processSummary?${new URLSearchParams(params)}`).then(async res => {
            if (res.ok) {
                Ext.MessageBox.show({
                    title: '.:PRAXIS:.',
                    message: 'Date Processed',
                    icon: Ext.MessageBox.SUCCESS,
                    buttons: Ext.MessageBox.OK
                });
            } else {
                Ext.MessageBox.show({
                    title: 'Error',
                    message: 'Error in Process',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.MessageBox.OK
                });
            }
        }).catch(err => {
            console.error(err);
            Ext.MessageBox.show({
                title: 'Error',
                message: 'Error in Process',
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.MessageBox.OK
            });
        }).finally(() => {
            me.view.unmask();
        });
    },
    onCancelClick: function () {
        this.view.close();
    }
});
