Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.MatchMultiPaymentConciliationDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MatchMultiPaymentConciliationDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    info: {},
    desglose: {},
    init: function (view) {
        // Por ahora vacío
        const me = this;
        console.log('me', me);
        console.log('info desde la vista:', me.view.info);
        console.log('desglose desde la vista:', me.view.desglose);
    },

    afterRender: async function () {
        const me = this;
        console.log('meeee', me)
        this.fillIni();
//        me.view.setLoading(true);
//        await me.getData(me.view);
//        this.getData();
//        me.view.setLoading(false);
//         console.log('info render',info)
    },

    fillIni: function () {
        console.log('fillIni', )
        const me = this;

        const gridLiquidation = Ext.getCmp(prototype.idMP + '-grid-liquidation');
        const gridTicket = Ext.getCmp(prototype.idMP + '-grid-ticket');

        gridLiquidation.setLoading(true);
        gridTicket.setLoading(true);

//        

        if (Array.isArray(me.view.info)) {
            me.view.info.forEach((item, index) => {item.exist = 'yes';});
        } else if (typeof me.view.info === 'object' && me.view.info !== null) {
            me.view.info.exist = 'yes';
        }


        if (Array.isArray(me.view.desglose)) {
            me.view.desglose.forEach((item, index) => {item.exist = 'yes';});
        } else if (typeof me.view.desglose === 'object' && me.view.desglose !== null) {
            me.view.desglose.exist = 'yes';
        }
        
        
        let info = new Ext.data.Store({data: me.view.info});
        let desglose = new Ext.data.Store({data: me.view.desglose});

//        me.view.info.forEach(item => item.exist = 'yes');
//        me.view.info.exist = 'yes';

        gridLiquidation.setStore(info);
        gridTicket.setStore(desglose);
        gridLiquidation.setLoading(false);
        gridTicket.setLoading(false);



    },

    getData: function (view) {
        console.log('get data')
        try {
//            const res = await global.callStoreGet('PRAXISMP', 'SQP05645', view.searchParams);
//            const data = res.lstRs?.at(0)?.at(0) || {};
//            console.log('data', data);
//
//            // Guarda para el update
//            this.ticketData = data;
//
////            const form = Ext.getCmp(prototype.idDE + '-informationForm').getForm();
//            const form = this.lookupReference('informationForm').getForm();
//            form.setValues({
//                ...data,
//                TGROSAMOUN: Ext.util.Format.number(data.TGROSAMOUN, '0,000.00'),
//                SALDO: Ext.util.Format.number(data.SALDO, '0,000.00'),
//                proceedStatus: data.STPROCEDE
//            });
//            this.bindData();

            const me = this;

            const nuevos = 'llamada servicio'

            const nuevosInfo = nuevos.info.map(item => ({
                    ...item,
                    exist: 'no'
                }));

            const nuevosDesglose = nuevos.desglose.map(item => ({
                    ...item,
                    exist: 'no'
                }));

            // Agregarlos al final del store actual
            const gridLiquidation = Ext.getCmp(prototype.idMP + '-grid-liquidation');
            const gridTicket = Ext.getCmp(prototype.idMP + '-grid-ticket');

            gridLiquidation.getStore().add(nuevosInfo);
            gridTicket.getStore().add(nuevosDesglose);


        } catch (e) {
            console.error(e);
        }
    },

    onUpdateClick: async function () {
        const me = this;
        me.view.setLoading(true);

        try {
//            const form = Ext.getCmp(prototype.idDE + '-informationForm').getForm();
            const form = this.lookupReference('informationForm').getForm();
            const selectedStatus = form.getValues().proceedStatus;

            const params = {
                IN_CCUST: me.ticketData.CCUST,
                IN_CCIA: me.ticketData.CCIA,
                IN_FORMA: me.ticketData.FORMA,
                IN_SERIE: me.ticketData.SERIE,
                IN_SEQ: me.ticketData.SEQ,
                IN_CORRL: me.ticketData.CORRL,
                IN_TDOCVTA: me.ticketData.TDOCVTA,
                IN_SEQROLL: me.ticketData.SEQROLL,
                IN_TDOC: me.ticketData.TDOC,
                IN_PRDA: me.ticketData.PRDA,
                IN_AREFNBR: me.ticketData.AREFNBR,
                IN_STPROCEDE: selectedStatus
            };

//            console.log('Params para guardar:', params);
            const res = await global.callStorePost('PRAXISMP', 'SQP05650', params);
            const {lstVals} = res.data;
            new AWN().success(lstVals.OUT_MSG);
            this.view.close();
        } catch (e) {
            console.error(e);
            new AWN().alert('Error');
        } finally {
            me.view.setLoading(false);
            me.getData(me.view);
        }
    },

    onCancelClick: function () {
        this.view.close();
    },

});
