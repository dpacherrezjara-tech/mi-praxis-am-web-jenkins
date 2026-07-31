Ext.define('Ext.Praxis.controller.salesaudit.Compensation0425Form.Compensation0425DataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Compensation0425DataEntryController',
    taxes: [],
    exTaxes: [],
    activeChanges: false,
    isNewTicket: false,
    afterRender: function () {
        this.loadForm();
    },
    loadForm: async function () {
        const me = this;

        var grid03 = Ext.getCmp(prototype.idDE0425 + '-gridBoletos');
        var store03 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDE0425 + '-store-gridBoleto'
        });
        grid03.setStore(store03);

        var gridRazones = Ext.getCmp(prototype.idDE0425 + '-gridRazones');
        var storeRazones = Ext.create('Ext.data.Store', {
            storeId: prototype.idDE0425 + '-store-gridRazones'
        });
        gridRazones.setStore(storeRazones);
        Ext.getCmp(prototype.idDE0425 + '-CmbEstatus').setValue(me.view.params.obj.A4961FLADM);
        //
        Ext.getCmp(prototype.idDE0425 + '-fsControlUSCR').setValue(me.view.params.obj.A4961REGIS);
        Ext.getCmp(prototype.idDE0425 + '-fsControlFECR').setValue(me.view.params.obj.A4961FREGI);
        Ext.getCmp(prototype.idDE0425 + '-fsControlHOCR').setValue(me.view.params.obj.A4961HREGI);
        //
        Ext.getCmp(prototype.idDE0425 + '-fsControlUSUP').setValue(me.view.params.obj.A4961REVIS);
        Ext.getCmp(prototype.idDE0425 + '-fsControlFEUP').setValue(me.view.params.obj.A4961FREVI);
        Ext.getCmp(prototype.idDE0425 + '-fsControlHOUP').setValue(me.view.params.obj.A4961HREVI);
        //
        if (Ext.String.trim(me.view.params.obj.A4961PREME) === '') {
            Ext.getCmp(prototype.idDE0425 + '-CmbEstatus').enable();
            Ext.getCmp(prototype.idDE0425 + '-CmbAddRazon').show();
            Ext.getCmp(prototype.idDE0425 + '-btn-update').show();
            Ext.getCmp(prototype.idDE0425 + '-colRazonRemove').hide();
        } else {
            Ext.getCmp(prototype.idDE0425 + '-CmbEstatus').disable();
            Ext.getCmp(prototype.idDE0425 + '-CmbAddRazon').hidden();
            Ext.getCmp(prototype.idDE0425 + '-btn-update').hidden();
            Ext.getCmp(prototype.idDE0425 + '-colRazonRemove').show();
        }
        me.loadTicketInformation();
        me.isNewTicket = false;
    },
    loadTicketInformation: async function () {
        const me = this;
        const gridTkt = Ext.getCmp(prototype.idDE0425 + '-gridBoletos');
        const gridRazones = Ext.getCmp(prototype.idDE0425 + '-gridRazones');
        gridTkt.setLoading(true);
        let params = {
            IN_CCUST: me.view.params.obj.A4961CCUST,
            IN_OPTION: "2",
            IN_CCIA: me.view.params.obj.A4961CIA,
            IN_FORMA: me.view.params.obj.A4961FORMA,
            IN_SERIE: me.view.params.obj.A4961SERIE,
            IN_SEQ: me.view.params.obj.A4961SEQ,
            IN_TRNCU: me.view.params.obj.A4961TRNCU,
            IN_PNR: me.view.params.obj.A4961PNR,
            IN_COUNTRY: ''
        };
        try {
            const res = await global.callStoreGet('PXSAUDIT', 'SQP06087', params);
            console.log('Novo ', res)
            if (res.lstRs.length > 0) {
                let store = new Ext.data.Store({
                    data: res.lstRs.at(0)
                });
                gridTkt.setStore(store);
                //
                let stores = new Ext.data.Store({
                    data: res.lstRs.at(1)
                });
                gridRazones.setStore(stores);
                // me.loadActiveChangesCompensation0425Data();

            }
        } catch (e) {
            console.error(e);
        } finally {
            gridTkt.setLoading(false);
        }
    },
    onFilterDescripChange: function (field, newValue) {
        const grid = Ext.getCmp(prototype.idDE0425 + '-gridBoletos');
        const store = grid.getStore();
        const value = Ext.String.trim(newValue || '');
        if (value !== '') {
            store.clearFilter(true);
            store.filter({
                property: 'DESCRIP',
                value: value,
                anyMatch: true,
                caseSensitive: false
            });
        } else {
            store.clearFilter();
        }
    },
    onExportBoletosExcel: function () {
        const grid = Ext.getCmp(prototype.idDE0425 + '-gridBoletos');
        const store = grid.getStore();
        if (!store || store.getCount() === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'No data to export.');
            return;
        }
        let data = [];
        store.each(function (rec) {
            data.push({
                'Processing Date': rec.get('PRDA'),
                'PNR': rec.get('PNR'),
                'Sequence': rec.get('CORREL'),
                'SRCODE': rec.get('SRCODE'),
                'SRTYPE': rec.get('SRTYPE'),
                'TYPE': rec.get('TYPE'),
                'Description': rec.get('DESCRIP')
            });
        });
        global.writeExcelFromJson(data, 'Tickets');
    },
    onAddRazonClick: async function () {
        const me = this;
        const winId = prototype.id + '-CompensationReason';
        const existingWin = Ext.getCmp(winId);
        if (existingWin) {
            existingWin.destroy();
        }
        var win = new Ext.Praxis.view.salesaudit.Compensation0425Form.DataEntrys.CompensationReason({
            id: winId,
            params: {
                obj: me.view.params.obj,
                onAddReason: me.onReasonAdded.bind(me)
            }
        });
        win.show();
    },
    onReasonAdded: function (beanDatos) {
        const me = this;
        const grid03 = Ext.getCmp(prototype.idDE0425 + '-gridRazones');
        if (!grid03) {
            return;
        }
        const store03 = grid03.getStore();
        const regs = store03.getCount();
        for (var i = 0; i < regs; i++) {
            if (Ext.String.trim(store03.getAt(i).get('A3404CODRZ')) === beanDatos.A3404CODRZ) {
                global.Msg({msg: "EXISTS RECORD !", icon: 2, fn: function () {}});
                return;
            }
        }
        store03.add(beanDatos);
    },

    onAddTicket: async function () {
        const form = Ext.getCmp(prototype.idDE0425 + '-ticketFilters').getForm();
        const tabTickets = Ext.getCmp(prototype.idDE0425 + '-tabTickets');
        const gridPending = Ext.getCmp(prototype.idDE0425 + '-gridTickets');
        const gridLoaded = Ext.getCmp(prototype.idDE0425 + '-gridTicketsLoaded');
        let notifier = new AWN();
        let params = form.getValues();
        const me = this;
        me.activeChanges = false;

        if (params.IN_TICKET === '' && params.IN_SPNR === '') {
            global.Msg({msg: 'Parameters Error'});
            return;
        }

        tabTickets.show();
        tabTickets.setLoading(true);
        try {
            const res = await global.callStoreGet('PXSAUDIT', 'SQP05585', params);
            if (res.lstRs.length > 0) {
                const data = res.lstRs.at(0);
                const pending = data.filter(x => x.QTYLOADS === 0);
                let storePending = new Ext.data.Store({
                    data: pending
                });
                gridPending.setStore(storePending);
                const loaded = data.filter(x => x.QTYLOADS > 0);
                let storeLoaded = new Ext.data.Store({
                    data: loaded
                });
                gridLoaded.setStore(storeLoaded);
                //                notifier.success('Tickets to Add: ' + pending.length);

                if (pending.length > 0) {
                    const btnUpdate = Ext.getCmp(prototype.idDE0425 + '-btn-update');
                    btnUpdate.show();
                    me.activeChanges = true;
                    notifier.success('Tickets added succesfly: ' + pending.length);

                    // ===>> Disparar manualmente onExceptTax con la primera fila
                    const firstRecord = storePending.getAt(0);
                    const view = gridPending.getView();
                    const rowEl = view.getRow(0);
                    me.onExceptTax(gridPending, null, 0, null, null, firstRecord, rowEl, null);

                }
                if (loaded.length > 0) {
                    notifier.warning('Tickets are already added: ' + loaded.length);
                }

                if (pending.length === 0 && loaded.length === 0) {
                    notifier.alert('Tickets not found');
                }

                this.selectedTickets = pending;
            } else {
                notifier.alert('Tickets not found');
            }
        } catch (e) {
            console.error(e);
            notifier.alert('Error on load Tickets');
        } finally {
            tabTickets.setLoading(false);
            me.loadActiveChangesCompensation0425Data();
        }
    },
    OnChkRFNDRemove: function (grid, rowIndex, colIndex) {

        global.Msg({
            msg: 'DELETE RAZON?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    grid.getStore().removeAt(rowIndex);
                }
            }
        });

    },
    onSaveClick: async function () {
        const me = this;
        var CmbEstatus = Ext.getCmp(prototype.idDE0425 + '-CmbEstatus').getValue();
        var lstRazones = new Array();
        var gridRazones = Ext.getCmp(prototype.idDE0425 + '-gridRazones');
        var regs = gridRazones.getStore().getCount();
        var IN_AMOUNT = Ext.getCmp(prototype.idDE0425 + '-MontoDebit').getValue();
        // VALIDA
        if (CmbEstatus === 'SU') {
            if (regs === 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'Please enter the issue reason to be debited');
                return;
            }
            if(IN_AMOUNT===0){
                Ext.Msg.alert('.: PRAXIS :.', 'Please enter the amount to be debited');
                return;
            }
        }
        gridRazones.store.data.each(function (rec) {
            lstRazones.push({
                "A3404CODRZ": rec.data.A3404CODRZ,
                "A4964FAMIL": rec.data.A3404FAMIL,
                "A4964COMRE": rec.data.A3404COMRE,
                "A3404ERROR": rec.data.A3404ERROR
            });
        });
        let params = {
            IN_CCUST: '139',
            IN_CCIA: me.view.params.obj.A4961CIA,
            IN_FORMA: me.view.params.obj.A4961FORMA,
            IN_SERIE: me.view.params.obj.A4961SERIE,
            IN_SEQ: me.view.params.obj.A4961SEQ,
            IN_TRNCU: me.view.params.obj.A4961TRNCU,
            IN_STATUS: CmbEstatus,
            IN_JSON_DET: JSON.stringify(lstRazones),
            IN_AMOUNT: IN_AMOUNT
        };
        let notifier = new AWN();
        me.view.setLoading(true);
        try {
            const res = await global.callStorePost('PXSAUDIT', 'SQP06088', params);
            const data = res && res.data;
            const result = data && data.lstRs && data.lstRs[0] && data.lstRs[0][0];
            if (!result) {
                throw new Error('Invalid response format');
            }

            const success = result.VL_SQLCODE === 0;

            global.Msg({
                msg: result.VL_MESSAGE,
                icon: success ? 1 : 0,
                fn: function () {
                    if (success) {
                        notifier.warning('Update Successfully');
                        if (me.view.params && typeof me.view.params.reloadGrid === 'function') {
                            me.view.params.reloadGrid();
                        }
                        me.view.close();
                    } else {
                        notifier.alert('Error on Update');
                    }
                }
            });
        } catch (e) {
            console.error(e);
            notifier.alert('Error on Update');
        } finally {
            me.view.setLoading(false);
        }
    },
    onCancelClick: function () {
        this.view.close();
    },
    onViewCompensation0425FormLog: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const newWin = Ext.create('Ext.Praxis.view.salesaudit.Compensation0425Form.DataEntrys.Compensation0425Log', {
            id: prototype.id + '-Compensation0425Log-1',
            obj: me.view.params.obj
        });
        newWin.show();

    }
});

