Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.ByPaymentDetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ByPaymentDetailGridController',
    init: function (view) {
        if (!view.backButton) {
            Ext.getCmp(prototype.id + '-backButtonDetail-1').hide();
        }
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData({view: view});
    },
    getData: async function ( {view}) {
        const me = this;
        
        // Ensure all required parameters are present in view.searchParams, set to '' if missing
        const expectedParams = [
            'IN_CCUST',
            'IN_DATE',
            'IN_MONTH',
            'IN_DATEFROM',
            'IN_DATETO',
            'IN_PROCTYPE',
            'IN_PROCTYPESQ',
            'IN_SMERCHID',
            'IN_TRANSTYPE',
            'IN_SCOUNTRY',
            'IN_FVOID',
            'IN_TICKET',
            'IN_SCARDN',
            'IN_SAUTHOC',
            'IN_SPNR',
            'IN_TYPE',
            'IN_STVAL',
            'IN_CERROR',
            'IN_CODADJU',
            'IN_AREFNBR',
            'IN_AMOUNT',
            'IN_SCURRENCY',
            'IN_NBRINSTA',
            'IN_CODEAUTOCOMMENT',
            'IN_FREGLA',
            'IN_ARN',
            'IN_USER_ASSIGNED'
        ];
        expectedParams.forEach(param => {
            if (!(param in view.searchParams)) {
                view.searchParams[param] = '';
            }
        });

        const res = await global.callStorePaggin('PRAXISMP', 'SQP05060', view.searchParams);
        view.setStore(res);
        me.showButtonCreditCard();
    },
    onClickBPO: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const obj = record.data;
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TransacErrorBPODataEntry', {
            id: prototype.id + '-TransacErrorBPODataEntry-1',
            obj: obj,
            standByComment: me.standByComment,
            users: me.users,
            callback: () => {
                grid.getStore().load();
            }
        });
        dataEntry.show();
    },
    
     onClickLog: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const obj = record.data;
//        console.log('obj',obj);
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.LogDataEntry', {
            id: prototype.id + '-LogDataEntry-1',
            obj: obj,
            callback: () => {
                grid.getStore().load();
            }
        });
        dataEntry.show();
    },
    
    downloadExcel: function (btn) {
        const me = this;
        let params = Object.assign({}, me.view.searchParams);
        params.excel = true;
        console.log(params);
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
                            global.getFile(`${me.view.url}/downloadByPaymentDetail?${new URLSearchParams(params)}`);
                        }
                    }
                });
    },
    showButtonCreditCard: function () {
        const filter = Ext.getCmp(prototype.id + '-cmbFiltersBP');
        const btnCreditCard = Ext.getCmp(prototype.id + '-groupCreditCard-1');
        if (filter.getValue() === 'F') {
            btnCreditCard.show();
        } else {
            btnCreditCard.hide();
        }
    },
    groupByCreditCard: function () {
        const formFilter = Ext.getCmp(prototype.id + '-formFiltersBP-2').getForm();
        console.log('Parametros', formFilter.getValues());
        const winCreditCard = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.CreditCardFilterDataEntry', {
            id: prototype.id + '-CreditCardFilterDataEntry-1',
            searchParams: formFilter.getValues()
        });
        winCreditCard.show();
        winCreditCard.center(); 
    }
});


