Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.MatchMultiPaymentConciliationDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MatchMultiPaymentConciliationDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    info: {},
    desglose: {},
    init: function (view) {
        // Por ahora vacío
        const me = this;
    },

    afterRender: async function () {
        const me = this;
        console.log('meeee', me)
        await this.fillIni();
    },

    fillIni: async function () {
        console.log('fillIni', )
        const me = this;

        const gridLiquidation = Ext.getCmp(prototype.idMP + '-grid-liquidation');
        const gridTicket = Ext.getCmp(prototype.idMP + '-grid-ticket');

        gridLiquidation.setLoading(true);
        gridTicket.setLoading(true);

        me.initialInfo = me.view.info || [];

//        prda , transtype, arefnbr

        const params = {
            IN_CCUST: '139',
            IN_PRDA_FROM: me.view.info.prda,
            IN_PNR: '',
            IN_PRDA_TO: me.view.info.prda,
            IN_AREFNBR: me.view.info.arefnbr,
            IN_TDOC: me.view.info.tdoc,
            IN_SCARDN1: '',
            IN_SCARDN2: '',
            IN_SAUTHOC: '',
            IN_TICKET: '',
            IN_AMOUNT: '',

        };




        const res = await global.callStoreGet('PRAXISMP', 'SQP05693 ', params);

        console.log('res', res);
        const data = res.lstRs?.at(0)?.at(0) || {};
        const liquidacion = res.lstRs?.[0] || {};
        const tickets = res.lstRs?.[1] || {};
        const monto = res.lstRs?.[2] || {};  //diferencias


        me.dataIni = liquidacion;
        
        if (Array.isArray(liquidacion)) {
            liquidacion.forEach((item, index) => {
                item.exist = 'yes';
            });
        } else if (typeof liquidacion === 'object' && liquidacion !== null) {
            liquidacion.exist = 'yes';
        }

        if (Array.isArray(tickets)) {
            tickets.forEach((item, index) => {
                item.exist = 'yes';
            });
        } else if (typeof tickets === 'object' && tickets !== null) {
            tickets.exist = 'yes';
        }

        let liquidationIni = new Ext.data.Store({data: liquidacion});
        let ticketIni = new Ext.data.Store({data: tickets});


        gridLiquidation.setStore(liquidationIni);
        gridTicket.setStore(ticketIni);
        gridLiquidation.setLoading(false);
        gridTicket.setLoading(false);

        this.updateDisplaySum(prototype.idMP + '-grid-liquidation', 'TGROSAMOUN', 'TGROSAMOUN_LIQUIDATION');
        this.updateDisplaySum(prototype.idMP + '-grid-liquidation', 'SVFOPS', 'SVFOPS_LIQUIDATION');

        this.updateDisplaySum(prototype.idMP + '-grid-ticket', 'TGROSAMOUN', 'TGROSAMOUN_TICKET');
        this.updateDisplaySum(prototype.idMP + '-grid-ticket', 'SVFOPS', 'SVFOPS_TICKET');

    },

    onSearchTransaction: async function (view) {
        console.log('get data', view);

        const me = this;

        console.log('me.bean', me);

        const gridLiquidation = Ext.getCmp(prototype.idMP + '-grid-liquidation');
        const gridTicket = Ext.getCmp(prototype.idMP + '-grid-ticket');

        const buttonSave = Ext.getCmp(prototype.idMP + '-saveTicketBtn');

        try {



            gridLiquidation.setLoading(true);
            gridTicket.setLoading(true);

            const form = Ext.getCmp(prototype.idMP + '-viewOption');
            const values = form.getForm().getValues();  //obtiene datos del form para la busqeuda

            const res = await global.callStoreGet('PRAXISMP', 'SQP05693 ', values);

            console.log('res', res);
            const data = res.lstRs?.at(0)?.at(0) || {};
            const liquidacion = res.lstRs?.[0] || {};
            const tickets = res.lstRs?.[1] || {};
            const monto = res.lstRs?.[2] || {};

            console.log('data store', data);
            console.log('data store', liquidacion);
            console.log('data tickets', tickets);
            console.log('data monto', monto);



            let nuevosLiquidacion;
            let nuevoTicket;

            if (Array.isArray(liquidacion)) {
                nuevosLiquidacion = liquidacion.map(item => ({
                        ...item,
                        exist: 'no'
                    }));
            } else if (typeof liquidacion === 'object' && liquidacion !== null && liquidacion !== null) {
                nuevosLiquidacion = {
                    ...liquidacion,
                    exist: 'no'
                };
            }


            if (Array.isArray(tickets)) {
                nuevoTicket = tickets.map(item => ({
                        ...item,
                        exist: 'no'
                    }));
            } else if (typeof tickets === 'object' && tickets !== null && tickets !== null) {
                nuevoTicket = {
                    ...tickets,
                    exist: 'no'
                };
            }


            console.log('nuevosLiquidacion:', nuevosLiquidacion);
            console.log('nuevoTicket:', nuevoTicket);


//            const store = Ext.getCmp(prototype.idMP + '-grid-liquidation').getStore();


            const store = gridLiquidation.getStore();
            console.log('store', store);
            const arefnbrsExistentes = store.getRange().map(rec => rec.get('AREFNBR'));
            console.log('existennnn', arefnbrsExistentes);

            const nuevoAreFnbr = nuevosLiquidacion[0].AREFNBR;
            console.log('nuevoAreFnbr', nuevoAreFnbr);


            if (arefnbrsExistentes.includes(nuevoAreFnbr)) {
                global.Msg({msg: 'Este registro ya fue agregado.'});
            } else {
                console.log('Se agrega nuevo');
                gridLiquidation.getStore().add(nuevosLiquidacion);
                gridTicket.getStore().add(nuevoTicket);
                buttonSave.show();
            }

            console.log('getTODO', gridLiquidation.getStore());

            gridLiquidation.setLoading(false);
            gridTicket.setLoading(false);

            this.updateDisplaySum(prototype.idMP + '-grid-liquidation', 'TGROSAMOUN', 'TGROSAMOUN_LIQUIDATION');
            this.updateDisplaySum(prototype.idMP + '-grid-liquidation', 'SVFOPS', 'SVFOPS_LIQUIDATION');

            this.updateDisplaySum(prototype.idMP + '-grid-ticket', 'TGROSAMOUN', 'TGROSAMOUN_TICKET');
            this.updateDisplaySum(prototype.idMP + '-grid-ticket', 'SVFOPS', 'SVFOPS_TICKET');



        } catch (e) {
            console.error(e);
            gridLiquidation.setLoading(false);
            gridTicket.setLoading(false);
        }
    },

    
    onCancelClick: function () {
        this.view.close();
    },

    onClickDelete: function (grid, rowIndex) {
        const me = this;
        const liquidationGrid = grid;
        const liquidationStore = liquidationGrid.getStore();
        const liquidationRecord = liquidationStore.getAt(rowIndex);

        if (!liquidationRecord)
            return;

        const refToDelete = liquidationRecord.get('AREFNBR');

        const liquidationToRemove = liquidationStore.getRange().filter(record => {
            return record.get('AREFNBR') === refToDelete;
        });
        liquidationStore.remove(liquidationToRemove);

        const gridTicket = Ext.getCmp(prototype.idMP + '-grid-ticket');
        const ticketStore = gridTicket.getStore();

        const ticketToRemove = ticketStore.getRange().filter(record => {
            return record.get('AREFNBR') === refToDelete;
        });
        ticketStore.remove(ticketToRemove);

        this.updateDisplaySum(prototype.idMP + '-grid-liquidation', 'TGROSAMOUN', 'TGROSAMOUN_LIQUIDATION');
        this.updateDisplaySum(prototype.idMP + '-grid-liquidation', 'SVFOPS', 'SVFOPS_LIQUIDATION');
        this.updateDisplaySum(prototype.idMP + '-grid-ticket', 'TGROSAMOUN', 'TGROSAMOUN_TICKET');
        this.updateDisplaySum(prototype.idMP + '-grid-ticket', 'SVFOPS', 'SVFOPS_TICKET');

        // Verificar si quedan solo registros originales
        const dataIniAREFNBR = (me.dataIni || []).map(item => item.AREFNBR?.trim());
        const currentAREFNBRs = liquidationStore.getRange().map(rec => rec.get('AREFNBR')?.trim());

        const tieneExtras = currentAREFNBRs.some(ref => !dataIniAREFNBR.includes(ref));

        const buttonSave = Ext.getCmp(prototype.idMP + '-saveTicketBtn');
        if (!tieneExtras) {
            buttonSave.hide();
        } else {
            buttonSave.show();
        }

    },

    onSaveTicket: function () {
        console.log('save');

    },

    updateDisplaySum: function (gridId, dataFieldName, displayFieldItemId) {
        const store = Ext.getCmp(gridId)?.getStore();

        if (!store) {
            console.warn(`[updateDisplaySum] Store no encontrado para grid: ${gridId}`);
            return;
        }

        const values = store.getRange().map(rec => Number(rec.get(dataFieldName)) || 0);
        console.log('values', values);
        const total = values.reduce((acc, val) => acc + val, 0);
        console.log('total', total);

        const field = Ext.ComponentQuery.query('#' + displayFieldItemId)[0];
        console.log('field', field);

        if (field && typeof field.setValue === 'function') {
            field.setValue(Ext.util.Format.number(total, '0,000.00'));
        } else {
            console.warn(`[updateDisplaySum] Displayfield con itemId "${displayFieldItemId}" no encontrado o inválido`);
        }
    }
});
