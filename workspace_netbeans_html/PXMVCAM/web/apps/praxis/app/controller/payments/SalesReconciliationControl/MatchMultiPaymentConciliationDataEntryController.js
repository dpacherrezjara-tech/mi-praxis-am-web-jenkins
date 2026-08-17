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
        await this.fillIni();
    },

    fillIni: async function () {
        const me = this;
        const gridLiquidation = Ext.getCmp(prototype.idMP + '-grid-liquidation');
        const gridTicket = Ext.getCmp(prototype.idMP + '-grid-ticket');

        gridLiquidation.setLoading(true);
        gridTicket.setLoading(true);

        try {
            me.initialInfo = me.view.info || [];

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

            const res = await global.callStoreGet('PRAXISMP', 'SQP05693', params);

            // Validar que lstRs[0] tenga datos
            const liquidacion = res?.lstRs?.[0] || [];
            const tickets = res?.lstRs?.[1] || [];

            if (!Array.isArray(liquidacion) || liquidacion.length === 0) {
                global.Msg({msg: 'Data not found.'});
                return;
            }

            // Marcar registros como EXIST
            liquidacion.forEach(item => item.EXIST = 'YES');
            tickets.forEach(item => item.EXIST = 'YES');

            let liquidationIni = Ext.create('Ext.data.Store', {
                model: 'LiquidationRecord',
                data: liquidacion.map(item => ({
                        ...item,
                        TGROSAMOUN: parseFloat(item.TGROSAMOUN) || 0
                    }))
            });

            let ticketIni = Ext.create('Ext.data.Store', {
                model: 'TicketRecord',
                data: tickets.map(item => ({
                        ...item,
                        SVFOPS: parseFloat(item.SVFOPS) || 0
                    }))
            });


            gridLiquidation.setStore(liquidationIni);
            gridTicket.setStore(ticketIni);

            gridTicket.getStore().loadData(tickets.map(item => ({
                    ...item,
                    SVFOPS: parseFloat(item.SVFOPS) || 0
                })));

            gridLiquidation.getStore().loadData(liquidacion.map(item => ({
                    ...item,
                    TGROSAMOUN: parseFloat(item.TGROSAMOUN) || 0
                })));


            gridLiquidation.setStore(liquidationIni);
            gridTicket.setStore(ticketIni);

        } catch (err) {
            console.error('Error en fillIni:', err);
            global.Msg({msg: 'Data not found.'});
        } finally {
            gridLiquidation.setLoading(false);
            gridTicket.setLoading(false);
        }
    },

    onSearchTransaction: async function (view) {

        const me = this;

        const gridLiquidation = Ext.getCmp(prototype.idMP + '-grid-liquidation');
        const gridTicket = Ext.getCmp(prototype.idMP + '-grid-ticket');
        const buttonSave = Ext.getCmp(prototype.idMP + '-saveTicketBtn');

        try {
            gridLiquidation.setLoading(true);
            gridTicket.setLoading(true);

            const form = Ext.getCmp(prototype.idMP + '-viewOption');
            const values = form.getForm().getValues();

            const res = await global.callStoreGet('PRAXISMP', 'SQP05693', values);

            if (
                    !res.lstRs ||
                    (Array.isArray(res.lstRs) &&
                            res.lstRs.every(arr => Array.isArray(arr) && arr.length === 0))
                    ) {
                gridLiquidation.setLoading(false);
                gridTicket.setLoading(false);
                global.Msg({msg: 'Data not found'})
            }

            const liquidacion = res.lstRs?.[0] || [];
            const tickets = res.lstRs?.[1] || [];

            let nuevosLiquidacion = [];
            let nuevoTicket = [];

            if (Array.isArray(liquidacion)) {
                nuevosLiquidacion = liquidacion.map(item => ({...item, EXIST: 'NO'}));
            } else if (liquidacion && typeof liquidacion === 'object') {
                nuevosLiquidacion = [{...liquidacion, EXIST: 'NO'}];
            }

            if (Array.isArray(tickets)) {
                nuevoTicket = tickets.map(item => ({...item, EXIST: 'NO'}));
            } else if (tickets && typeof tickets === 'object') {
                nuevoTicket = [{...tickets, EXIST: 'NO'}];
            }

            me.view.info = me.view.info || {};
            me.view.info.tickets = nuevoTicket;

            const storeLiquidation = gridLiquidation.getStore();
            const storeTicket = gridTicket.getStore();

            // Guardar data inicial si no existe
            me.initialLiquidations = me.initialLiquidations || storeLiquidation.getRange().map(rec => ({
                    AREFNBR: rec.get('AREFNBR')?.trim() || '',
                    TKT: (rec.get('CCIA') || '') + (rec.get('FORMA') || '') + (rec.get('SERIE') || '')
                }));

            me.initialTickets = me.initialTickets || storeTicket.getRange().map(rec => ({
                    AREFNBR: rec.get('AREFNBR')?.trim() || '',
                    TKT: (rec.get('CCIA') || '') + (rec.get('FORMA') || '') + (rec.get('SERIE') || '')
                }));

            // Funciones para obtener TKT
            const getTktFromRecord = rec =>
                (rec.get('CCIA') || '') + (rec.get('FORMA') || '') + (rec.get('SERIE') || '');

            const getTktFromItem = item =>
                (item.CCIA || '') + (item.FORMA || '') + (item.SERIE || '');

            // Verifica si es duplicado en el store actual
            const isDuplicateInStore = (store, item) => {
                return store.getRange().some(rec =>
                    (rec.get('AREFNBR')?.trim() || '') === (item.AREFNBR?.trim() || '') &&
                            getTktFromRecord(rec) === getTktFromItem(item)
                );
            };

            // Verifica si estaba en la data inicial
            const isInInitialData = (initialData, item) => {
                return initialData.some(data =>
                    data.AREFNBR === (item.AREFNBR?.trim() || '') &&
                            data.TKT === getTktFromItem(item)
                );
            };

            // Contadores
            let liquidationAdded = 0;
            let liquidationSkipped = 0;

            // Agregar liquidaciones
            nuevosLiquidacion.forEach(item => {
                if (isDuplicateInStore(storeLiquidation, item)) {
                    if (!isInInitialData(me.initialLiquidations, item)) {
                        liquidationSkipped++; // solo contamos si NO estaba en la data inicial
                    }
                } else {
                    storeLiquidation.add(item);
                    liquidationAdded++;
                }
            });

            // Agregar tickets
            const nuevosTicketsAgregados = nuevoTicket.filter(item => !isDuplicateInStore(storeTicket, item));
            nuevosTicketsAgregados.forEach(item => storeTicket.add(item));

            // Mostrar botón guardar solo si se agregó algo nuevo
            if (liquidationAdded > 0 || nuevosTicketsAgregados.length > 0) {
                buttonSave.show();
            }

            // Mensaje final solo de liquidaciones
            if (liquidationAdded > 0 || liquidationSkipped > 0) {
                const msgParts = [];
                if (liquidationAdded > 0) {
                    msgParts.push(`${liquidationAdded} liquidation record${liquidationAdded > 1 ? 's' : ''} added`);
                }
                if (liquidationSkipped > 0) {
                    msgParts.push(`${liquidationSkipped} skipped (duplicate)`);
                }
                global.Msg({msg: 'Liquidation: ' + msgParts.join(', ')});
            }

            gridLiquidation.setLoading(false);
            gridTicket.setLoading(false);

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

    onSaveTicket: async function () {
        const me = this;
        me.view.setLoading(true);
//        console.log('save');
        const gridLiquidation = Ext.getCmp(prototype.idMP + '-grid-liquidation');
//        console.log('grid', gridLiquidation.getStore().getData().items);

        const gridTicket = Ext.getCmp(prototype.idMP + '-grid-ticket');

        const storeDataLiquidation = gridLiquidation.getStore().getData().items;
        const storeDataTicket = gridTicket.getStore().getData().items;

        // --- Calcular totales ---
        const totalLiquidation = storeDataLiquidation.reduce((sum, rec) => {
            return sum + (parseFloat(rec.data.TGROSAMOUN) || 0);
        }, 0);

        const totalTicket = storeDataTicket.reduce((sum, rec) => {
            return sum + (parseFloat(rec.data.SVFOPS) || 0);
        }, 0);

//        console.log('Total TGROSAMOUN:', totalLiquidation);
//        console.log('Total SVFOPS:', totalTicket);

        // --- Validación ---
        if (totalLiquidation !== totalTicket) {
            global.Msg({
                msg: 'The totals for liquidation and tickets do not match.'
            });
            return; 
        }

        try {

            let recs = storeDataLiquidation.map(x => ({
                    ...x.data
                }));

            console.log('recs', recs);


            const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', recs);
            console.log('tmp', tmp);

            let params = {
                IN_CUUID: tmp.cuuid,
                IN_FUUID: tmp.fuuid
            };

            const res = await global.callStorePost('PRAXISMP', 'SQP05671 ', params);
            console.log(res);
            global.Msg({
                msg: res.data.lstVals.OUT_MSG
            });

            const view = me.getView();
            const callback = view.callbackFn;
            const parentCtrl = view.parentController;

            me.view.setLoading(false);
            me.view.close(); 
            
            if (typeof callback === 'function') {
                callback(parentCtrl);
            }



        } catch (e) {
            console.log(e)
            me.view.setLoading(false);
        }

    },

    onChangeMonthBPBtn: function (obj) {
        let option = obj.id.split('-').at(-1);
        const from = Ext.getCmp(prototype.id + '-monthfieldFromMatch');
        const to = Ext.getCmp(prototype.id + '-monthfieldToMatch');

        const opts = {
            'monthfieldFromMatch': () => {
                to.setValue(from.getValue());
            },
            'monthfieldToMatch': () => {
                if (to.getValue() < from.getValue()) {
                    from.setValue(to.getValue());
                }
            }
        };

        if (opts[option]) {
            opts[option]();
        }
    }

});
