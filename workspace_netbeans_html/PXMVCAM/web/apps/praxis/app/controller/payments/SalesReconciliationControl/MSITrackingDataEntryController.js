Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.MSITrackingDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MSITrackingDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    init: function (view) {
    },
    afterRender: function (obj, e) {
        this.getData();
    },
    getData: async function () {
        const me = this;
        const gridMSI = Ext.getCmp(prototype.idMSI + '-gridMSITracking');
        me.view.mask('Loading...');
        me.showButtons();
        try {
            const res = await global.callStoreGet('PRAXISMP', 'SQP05061', me.view.searchParams);
            const data = res?.lstRs?.[0] || [];
            if (data.length === 0) {
                global.Msg({msg: 'No data'});
                me.view.close();
                return;
            }
            const store = Ext.create('Ext.data.Store', {
                data: data.map(x => {
                    me.limpiaObjetoPX(x);
                    if (me.view.obj.AREFNBR === x.AREFNBR) {
                        x.main = true;
                    }
                    return x;
                })
            });
            let bean = store.findRecord('AREFNBR', me.view.obj.AREFNBR);
            gridMSI.setStore(store);
            gridMSI.getSelectionModel().select(bean, true);
        } catch (e) {
            global.Msg({msg: 'Error loading data'});
        } finally {
            me.view.unmask();
        }
    },
    showButtons: function () {
        const me = this;
        const match = ['1', '5', '6', '7'];
        if (match.some(x => me.view.obj.STVAL === x)) {
            Ext.getCmp(prototype.idMSI + '-btn-update-msi').hide();
            Ext.getCmp(prototype.idMSI + '-btn-update-rmsi').hide();
            Ext.getCmp(prototype.idMSI + '-btn-update-man').hide();
        } else {
            Ext.getCmp(prototype.idMSI + '-btn-update-msi').show();
            Ext.getCmp(prototype.idMSI + '-btn-update-rmsi').show();
        }
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onCancelClick: function () {
        const me = this;
        me.view.close();
    },
    onUpdateMSI: async function (btn) {
        const me = this;
        const grid = Ext.getCmp(prototype.idMSI + '-gridMSITracking');
        const seleccionados = grid.getSelectionModel().getSelection();
        if (seleccionados.length !== 2) {
            global.Msg({msg: 'Invalid Selected'});
            return;
        }
        const match = ['1', '5', '6', '7'];
        let pendiente = true;
        seleccionados.forEach(x => {
            if (match.some(b => b === x.data.STVAL)) {
                pendiente = false;
            }
        });
        if (!pendiente) {
            global.Msg({msg: 'Transactions must be pending'});
            return;
        }

        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.maintenanceMSITracking(grid, seleccionados);
                        }
                    }
                });
    },
    onUpdateReverseMSI: async function (btn) {
        const me = this;
        const grid = Ext.getCmp(prototype.idMSI + '-gridMSITracking');
        const seleccionados = grid.getSelectionModel().getSelection();
        if (seleccionados.length !== 3) {
            global.Msg({msg: 'Invalid Selected'});
            return;
        }
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.maintenanceReverseMSITracking(grid, seleccionados);
                        }
                    }
                });
    },
    onChangeView: function (checkbox, newValue) {
        const me = this;
        const match = ['1', '5', '6', '7'];
        if (newValue) {
            const formFilters = Ext.getCmp(prototype.idMSI + '-filtersManual').getForm();
            let params = formFilters.getValues();
            params.creditcard = me.view.obj.SCARDN.slice(0, 6);
            params.creditcard2 = me.view.obj.PROCTYPE.trim() === 'BANORTE00' ?
                    me.view.obj.SCARDN.slice(-2) : me.view.obj.SCARDN.slice(-4);
            params.IN_SPNR = me.view.obj.SPNR.trim();
            formFilters.setValues(params);
            Ext.getCmp(prototype.idMSI + '-gridMSITracking').hide();
            Ext.getCmp(prototype.idMSI + '-gridVoidTracking').show();
            Ext.getCmp(prototype.idMSI + '-btn-update-msi').hide();
            Ext.getCmp(prototype.idMSI + '-btn-update-rmsi').hide();
            if (!match.some(x => me.view.obj.STVAL === x)) {
                Ext.getCmp(prototype.idMSI + '-btn-update-man').show();
            }
            this.loadMainTransaction();
        } else {
            Ext.getCmp(prototype.idMSI + '-gridMSITracking').show();
            Ext.getCmp(prototype.idMSI + '-gridVoidTracking').hide();
            Ext.getCmp(prototype.idMSI + '-btn-update-msi').show();
            Ext.getCmp(prototype.idMSI + '-btn-update-rmsi').show();
            Ext.getCmp(prototype.idMSI + '-btn-update-man').hide();
        }

    },
    loadMainTransaction: async function () {
        const me = this;
        let obj = Object.assign({}, me.view.obj);
        const grid = Ext.getCmp(prototype.idMSI + '-gridVoidTracking');
        grid.setLoading(true);
        let trncs = [];
        let procesador = obj.PROCTYPE.trim();
        let scardn = new String(), spnr = new String();
        //banorte solo usa 2 digitos de autorizacion
        if (procesador === 'BANORTE00') {
            scardn = `${obj.SCARDN.slice(0, 6)}%${obj.SCARDN.slice(-2)}%`;
            //ADYEN solo busca con PNR
        } else if (procesador === 'ADYEN00') {
            spnr = obj.SPNR.trim();
        } else {
            scardn = `${obj.SCARDN.slice(0, 6)}%${obj.SCARDN.slice(-4)}%`;
        }
        let ticket = obj.TICKET.trim();
        let params = {
            IN_CCUST: '139',
            IN_PROCTYPE: obj.PROCTYPE,
            IN_PROCTYPESQ: obj.PROCTYPESQ,
            IN_FROM: me.sumDate(obj.PRDA, -15),
            IN_TO: me.sumDate(obj.PRDA, 15),
            IN_SCARDN: scardn,
            IN_SAUTHOC: '',
            IN_SPNR: spnr,
            IN_TICKET: ticket
        };
        try {
            const res = await global.callStoreGet('PRAXISMP', 'SQP05259', params);
            trncs = res.lstRs.at(0);
            trncs.forEach(x => {
                if (x.AREFNBR.trim() === obj.AREFNBR.trim()) {
                    x.main = true;
                }
            });
            const store = Ext.create('Ext.data.Store', {
                data: trncs
            });
            grid.setStore(store);
            let bean = store.findRecord('AREFNBR', obj.AREFNBR);
            grid.getSelectionModel().select(bean, true);
        } catch (e) {
            console.error(e);
        }
        grid.setLoading(false);

    },
    onAddTransaction: async function () {
        const me = this;
        const grid = Ext.getCmp(prototype.idMSI + '-gridVoidTracking');
        grid.setLoading(true);
        
        const formFilter = Ext.getCmp(prototype.idMSI + '-filtersManual').getForm().getValues();
        const store = grid.getStore();
        let obj = Object.assign({}, me.view.obj);

        let trncs = [];
        let procesador = obj.PROCTYPE.trim();
        let scardn = new String();

        if (procesador === 'BANORTE00') {
            scardn = `${obj.SCARDN.slice(0, 6)}%${obj.SCARDN.slice(-2)}%`;
        } else {
            scardn = `${obj.SCARDN.slice(0, 6)}%${obj.SCARDN.slice(-4)}%`;
        }
        let params = {
            IN_CCUST: '139',
            IN_PROCTYPE: obj.PROCTYPE,
            IN_PROCTYPESQ: obj.PROCTYPESQ,
            IN_SCARDN: scardn,
            ...formFilter
        };
        
//        grid.getStore().removeAll();

        try {
            const res = await global.callStoreGet('PRAXISMP', 'SQP05259', params);
            trncs = res.lstRs.at(0);
            trncs = trncs.filter(x => {
                let index = store.find('AREFNBR', x.AREFNBR);
                return index === -1;
            });
            store.add(trncs);
            global.Msg({msg: `${trncs.length} tickets added`});
        } catch (e) {
            console.error(e);
        }

        grid.setLoading(false);
    },
    onUpdateManual: function () {
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to Update?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.maintenanceManualMatch();
                        }
                    }
                });
    },
    onSearchTransaction: function () {
        const obj = Ext.getCmp(prototype.idMSI + '-filtersManual').getForm().getValues();
        const grid = Ext.getCmp(prototype.idMSI + '-gridVoidTracking');
        grid.getView().mask('Loading...');
        const data = grid.getStore().getData().items;
        try {
            if (data.length === 0) {
                global.Msg({msg: 'No data in Scanner'});
                grid.getView().unmask();
                return;
            }
            const existeAuth = data.some(x =>
                x.data.SAUTHOC.trim() === obj.IN_SAUTHOC);
            const existePnr = data.some(x =>
                x.data.SPNR.trim() === obj.IN_SPNR);
            let foundRegis = {};
            if (existeAuth) {
                foundRegis = grid.getStore().queryBy(function (registro) {
                    return registro.get('SAUTHOC').trim() === obj.IN_SAUTHOC;
                });
                grid.getStore().removeAll();
                foundRegis.items.forEach(x => {
                    grid.getStore().add(x);
                });
            } else if (existePnr) {
                foundRegis = grid.getStore().queryBy(function (registro) {
                    return registro.get('SPNR').trim() === obj.IN_SPNR;
                });
                grid.getStore().removeAll();
                foundRegis.items.forEach(x => {
                    grid.getStore().add(x);
                });
            }

            let bean = grid.getStore().findRecord('AREFNBR', this.view.obj.AREFNBR);
            grid.getSelectionModel().select(bean, true);
            
        } catch (err) {
            console.error('Obj no encontrado: ', err);
        }
        finally {
            grid.getView().unmask();
        }
    },
    reloadGrid: function () {
        this.loadMainTransaction();
    },
    reloadMainGrid: function () {
        let callback = this.view.callback;
        if (callback) {
            callback();
        }
    },
    reloadMainTransaction: function () {
        let callback = this.view.reRender;
        if (callback) {
            callback();
        }
    },
    onSelectStatus: function (combo, record) {
        let valorSeleccionado = record.data.code;
        const store = Ext.getCmp(prototype.idMSI + '-gridVoidTracking').getStore();
        store.clearFilter();
        if (valorSeleccionado !== '') {
            store.filter('STVAL', valorSeleccionado);
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="SelModel">
    multiTransacBeforeDeselect: function (selModel, record, index) {
        if (record.data.main) {
            return false;
        }
    },
    multiTransacBeforeSelect: function (selModel, record, index) {
        const match = ['6'];
        if (match.some(x => record.data.STVAL === x)) {
            return false;
        }
    },
    multiTransacChangeSelect: function (selModel, seleccionados) {
        const sumaTotal = seleccionados.reduce((total, item) => {
            return total + item.data.TGROSAMOUN;
        }, 0);
        const totalFormat = Ext.util.Format.number(sumaTotal, '0,000.00');
        Ext.getCmp(prototype.idMSI + '-totalDiff').setValue(totalFormat);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Maintenance">
    maintenanceMSITracking: async function (grid, seleccionados) {
        const me = this;
        const dataEntry = Ext.getCmp(prototype.id + '-TransacErrorBPODataEntry-1');
        const gridDet = Ext.getCmp(prototype.id + '-ByPaymentDetailGrid-1');
        grid.getView().mask('Loading...');
        console.log(seleccionados);
        let sale = seleccionados.find(x => x.data.TRANSTYPE.trim() === 'SALE');
        let refund = seleccionados.find(x => x.data.TRANSTYPE.trim() === 'RFND');
        if (sale && refund) {
            let params = {
                IN_CCUST: '139',
                IN_PRDA1: sale.data.PRDA,
                IN_TDOC1: sale.data.TDOC,
                IN_AREFNBR1: sale.data.AREFNBR,
                IN_PRDA2: refund.data.PRDA,
                IN_TDOC2: refund.data.TDOC,
                IN_AREFNBR2: refund.data.AREFNBR
            };
            try {
                const res = await global.callStorePost('PRAXISMP', 'SQP05065', params);
                const {SQLMSG} = res.data.lstVals;
                Ext.toast({
                    html: `<b>${SQLMSG || 'Error in MSI'}</b>`,
                    title: 'Notification',
                    align: 't',
                    closable: true,
                    width: 300,
                    timeout: 10000
                });
                dataEntry.getController().afterRender();
                gridDet.getStore().load();
                me.view.close();
            } catch (e) {
                global.Msg({msg: 'Error in MSI'});
            } finally {
                grid.getView().unmask();
            }
        } else {
            Ext.toast({
                html: `<b>Invalid Transactions</b>`,
                title: 'Notification',
                align: 't',
                closable: true,
                iconCls: 'prx-icon-image-log',
                width: 300,
                timeout: 10000 // 10 segundos
            });
            grid.getView().unmask();
        }
    },
    maintenanceReverseMSITracking: async function (grid, seleccionados) {
        const me = this;
        //const dataEntry = Ext.getCmp(prototype.id + '-TransacErrorBPODataEntry-1');
        //const gridDet = Ext.getCmp(prototype.id + '-ByPaymentDetailGrid-1');
        grid.getView().mask('Loading...');
        console.log(seleccionados);
        let msi = seleccionados.find(x => x.data.TRANSTYPE.trim() === 'SALE'
                    && x.data.INSTANBR > 0
                    && x.data.NBRINSTA > 0
                    && x.data.STVAL === '1');
        let sale = seleccionados.find(x => x.data.TRANSTYPE.trim() === 'SALE'
                    && x.data.INSTANBR === 0
                    && x.data.NBRINSTA === 0);
        let refund = seleccionados.find(x => x.data.TRANSTYPE.trim() === 'RFND'
                    && x.data.INSTANBR === 0
                    && x.data.NBRINSTA === 0);
        if (msi && sale && refund) {
            let params = {
                IN_CCUST: '139',
                IN_PRDA1: msi.data.PRDA,
                IN_TDOC1: msi.data.TDOC,
                IN_AREFNBR1: msi.data.AREFNBR,
                IN_PRDA2: sale.data.PRDA,
                IN_TDOC2: sale.data.TDOC,
                IN_AREFNBR2: sale.data.AREFNBR,
                IN_PRDA3: refund.data.PRDA,
                IN_TDOC3: refund.data.TDOC,
                IN_AREFNBR3: refund.data.AREFNBR
            };
            try {
                const res = await global.callStorePost('PRAXISMP', 'SQP05063', params);
                const {SQLMSG} = res.data.lstVals;
                Ext.toast({
                    html: `<b>${SQLMSG || 'Error in MSI'}</b>`,
                    title: 'Notification',
                    align: 't',
                    closable: true,
                    width: 300,
                    timeout: 10000
                });
                me.reloadMainTransaction();
                me.reloadMainGrid();
                me.view.close();
            } catch (e) {
                global.Msg({msg: 'Error in MSI'});
            } finally {
                grid.getView().unmask();
            }
        } else {
            global.Msg({msg: 'Invalid Transactions'});
            grid.getView().unmask();
        }
    },
    maintenanceManualMatch: async function () {
        const me = this;

        const grid = Ext.getCmp(prototype.idMSI + '-gridVoidTracking');
        //const dataEntry = Ext.getCmp(prototype.id + '-TransacErrorBPODataEntry-1');
        //const gridDet = Ext.getCmp(prototype.id + '-ByPaymentDetailGrid-1');
        const seleccionados = grid.getSelectionModel().getSelection();
        //console.log(seleccionados);
        if (seleccionados.length < 2) {
            global.Msg({msg: 'You must select two or more transactions'});
            return;
        }
        let sales = seleccionados.filter(x => x.data.TRANSTYPE.trim() === 'SALE');
        if (sales.length === 0) {
            global.Msg({msg: 'You must select one or more sales'});
            return;
        }
        let refunds = seleccionados.filter(x => x.data.TRANSTYPE.trim() === 'RFND');
        if (refunds.length === 0) {
            global.Msg({msg: 'You must select one or more refunds'});
            return;
        }
        if (sales.length > 1 && refunds.length > 1) {
            global.Msg({msg: 'You only need to select one main transaction'});
            return;
        }
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to reconcile?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.callManualMatch(seleccionados);
                        }
                    }
                });
        
    },
    callManualMatch: async function(seleccionados){
        const me = this;
        me.view.setLoading(true);
        try {
            let recs = seleccionados.map(x => ({
                    ...x.data
                }));
            const tmp = await global.loadRecordsOnTable('PRAXISMP','XTEMPO',recs);
            
            let params = {
                IN_CUUID: tmp.cuuid,
                IN_FUUID: tmp.fuuid
            };
            
            const res = await global.callStorePost('PRAXISMP','SQP05625',params);
            console.log(res);
            global.Msg({
                msg:res.data.lstVals.OUT_MSG
            });
            me.view.setLoading(false);
            me.reloadMainGrid();
            me.reloadMainTransaction();
            me.view.close();
        } catch (e) {
            global.Msg({msg:'System Error'});
            me.view.setLoading(false);
        }
    },
    
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    limpiaObjetoPX: function (obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key].trimEnd();
            }
        }
    },
    sumDate: function (fecha, dias) {
        let fechaDate = new Date(
                parseInt(fecha.substring(0, 4)),
                parseInt(fecha.substring(4, 6)) - 1,
                parseInt(fecha.substring(6, 8))
                );
        // Sumar o restar días a la fecha
        fechaDate.setDate(fechaDate.getDate() + dias);
        let fechaFormateada = Ext.Date.format(fechaDate, 'Ymd');
        return fechaFormateada;
    }
    //</editor-fold>
});

