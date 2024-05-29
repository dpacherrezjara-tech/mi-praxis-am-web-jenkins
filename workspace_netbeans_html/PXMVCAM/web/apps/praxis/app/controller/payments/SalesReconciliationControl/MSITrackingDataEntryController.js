Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.MSITrackingDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MSITrackingDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    init: function (view) {
    },
    afterRender: function (obj, e) {
        this.getData();
    },
    getData: function () {
        const me = this;
        const gridMSI = Ext.getCmp(prototype.idMSI + '-gridMSITracking');
        me.view.mask('Loading...');
        me.showButtons();
        fetch(`${me.url}/loadMSITrackingInfo?${new URLSearchParams(me.view.searchParams)}`)
                .then(async res => {
                    if (res.ok) {
                        const data = await res.json();
                        if (data.response.length === 0) {
                            global.Msg({msg: 'No data'});
                            me.view.close();
                        }
                        const store = Ext.create('Ext.data.Store', {
                            data: data.response.map(x => {
                                me.limpiaObjetoPX(x);
                                if (me.view.obj.arefnbr === x.arefnbr) {
                                    x.main = true;
                                }
                                return x;
                            })
                        });
                        let bean = store.findRecord('arefnbr', me.view.obj.arefnbr);
                        gridMSI.setStore(store);
                        gridMSI.getSelectionModel().select(bean, true);
                        //console.log(data);
                    }
                }).then(() => me.view.unmask());
    },
    showButtons: function () {
        const me = this;
        const match = ['1', '5', '6', '7'];
        if (match.some(x => me.view.obj.stval === x)) {
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
            if (match.some(b => b === x.data.stval)) {
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
            params.creditcard = me.view.obj.scardn.slice(0, 6);
            params.creditcard2 = me.view.obj.proctype.trim() === 'BANORTE00' ?
                    me.view.obj.scardn.slice(-2) : me.view.obj.scardn.slice(-4);
            params.IN_SPNR = me.view.obj.spnr.trim();
            formFilters.setValues(params);
            Ext.getCmp(prototype.idMSI + '-gridMSITracking').hide();
            Ext.getCmp(prototype.idMSI + '-gridVoidTracking').show();
            Ext.getCmp(prototype.idMSI + '-btn-update-msi').hide();
            Ext.getCmp(prototype.idMSI + '-btn-update-rmsi').hide();
            if (!match.some(x => me.view.obj.stval === x)) {
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
        grid.view.mask('Loading...');
        let trncs = [];
        let procesador = obj.proctype.trim();
        let scardn = new String(), spnr = new String();
        //banorte solo usa 2 digitos de autorizacion
        if (procesador === 'BANORTE00') {
            scardn = `${obj.scardn.slice(0, 6)}%${obj.scardn.slice(-2)}%`;
            //ADYEN solo busca con PNR
        } else if (procesador === 'ADYEN00') {
            spnr = obj.spnr.trim();
        } else {
            scardn = `${obj.scardn.slice(0, 6)}%${obj.scardn.slice(-4)}%`;
        }
        let ticket = obj.ticket.trim();
        let params = {
            IN_CCUST: '139',
            IN_PROCTYPE: obj.proctype,
            IN_PROCTYPESQ: obj.proctypesq,
            IN_FROM: me.sumDate(obj.prda, -15),
            IN_TO: me.sumDate(obj.prda, 15),
            IN_SCARDN: scardn,
            IN_SPNR: spnr,
            IN_TICKET: ticket
        };
        const res = await fetch(`${me.url}/loadMSITrackingManualInfo?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            if (data.response.length > 0) {
                trncs = data.response;
                trncs.forEach(x => {
                    if (x.arefnbr.trim() === obj.arefnbr.trim()) {
                        x.main = true;
                    }
                });
                const store = Ext.create('Ext.data.Store', {
                    data: trncs
                });
                grid.setStore(store);
                let bean = store.findRecord('arefnbr', obj.arefnbr);
                grid.getSelectionModel().select(bean, true);
            }
        }
        grid.view.unmask();

    },
    onAddTransaction: async function () {
        const me = this;
        const grid = Ext.getCmp(prototype.idMSI + '-gridVoidTracking');
        grid.view.mask('Loading...');
        const formFilter = Ext.getCmp(prototype.idMSI + '-filtersManual').getForm().getValues();
        const store = grid.getStore();
        let obj = Object.assign({}, me.view.obj);

        let trncs = [];
        let procesador = obj.proctype.trim();
        let scardn = new String();
        if (procesador === 'BANORTE00') {
            scardn = `${obj.scardn.slice(0, 6)}%${obj.scardn.slice(-2)}%`;
        } else {
            scardn = `${obj.scardn.slice(0, 6)}%${obj.scardn.slice(-4)}%`;
        }
        let params = {
            IN_CCUST: '139',
            IN_PROCTYPE: obj.proctype,
            IN_PROCTYPESQ: obj.proctypesq,
            IN_SCARDN: scardn,
            ...formFilter
        };

        const res = await fetch(`${me.url}/loadMSITrackingManualInfo?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            //debugger;
            if (data.response.length > 0) {
                trncs = data.response;
                trncs = trncs.filter(x => {
                    let index = store.find('arefnbr', x.arefnbr);
                    return index === -1;
                });
                store.add(trncs);
                global.Msg({msg: `${trncs.length} tickets added`});
            }
        }
        grid.view.unmask();
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
        if (data.length === 0) {
            global.Msg({msg: 'No data in Scanner'});
            grid.getView().unmask();
            return;
        }
        const existeAuth = data.some(x =>
            x.data.sauthoc.trim() === obj.IN_SAUTHOC);
        const existePnr = data.some(x =>
            x.data.spnr.trim() === obj.IN_SPNR);
        let foundRegis = {};
        if (existeAuth) {
            foundRegis = grid.getStore().queryBy(function (registro) {
                return registro.get('sauthoc').trim() === obj.IN_SAUTHOC;
            });
            grid.getStore().removeAll();
            foundRegis.items.forEach(x => {
                grid.getStore().add(x);
            });
        } else if (existePnr) {
            foundRegis = grid.getStore().queryBy(function (registro) {
                return registro.get('spnr').trim() === obj.IN_SPNR;
            });
            grid.getStore().removeAll();
            foundRegis.items.forEach(x => {
                grid.getStore().add(x);
            });
        }
        try {
            let bean = grid.getStore().findRecord('arefnbr', this.view.obj.arefnbr);
            grid.getSelectionModel().select(bean, true);
        } catch (err) {
            console.error('Obj no encontrado: ', err);
        }
        grid.getView().unmask();
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
            store.filter('stval', valorSeleccionado);
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
        if (match.some(x => record.data.stval === x)) {
            return false;
        }
    },
    multiTransacChangeSelect: function (selModel, seleccionados) {
        const sumaTotal = seleccionados.reduce((total, item) => {
            return total + item.data.tgrosamoun;
        }, 0);
        const totalFormat = Ext.util.Format.number(sumaTotal, '0,000.00');
        Ext.getCmp(prototype.idMSI + '-totalDiff').setValue(totalFormat);
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Format Parameters">
    formatManualParameters: function (sales, refunds) {
        let params = {};
        let bpocomment = Ext.getCmp(prototype.idMSI + '-bpo-comment').getValue();
        if (refunds.length >= 1 && sales.length === 1) {
            let sale = sales.at(0).data;
            let sumTgrosamounRef = refunds.reduce((total, x) => total + x.data.tgrosamoun, 0);
            let rfndChilds = refunds.map(x => ({
                    IN_CCUST: '139',
                    IN_PRDA: sale.prda,
                    IN_TDOC: sale.tdoc,
                    IN_AREFNBR: sale.arefnbr,
                    IN_HPRDA: x.data.prda,
                    IN_HTDOC: x.data.tdoc,
                    IN_HAREFNBR: x.data.arefnbr,
                    IN_TGROSAMOUN: sale.tgrosamoun,
                    IN_HTGROSAMOUN: sumTgrosamounRef,
                    IN_COMEN: bpocomment
                }));
            params = {
                IN_CCUST: '139',
                IN_PRDA: sale.prda,
                IN_TDOC: sale.tdoc,
                IN_AREFNBR: sale.arefnbr,
                IN_TGROSAMOUN: sale.tgrosamoun,
                IN_HTGROSAMOUN: sumTgrosamounRef,
                childs: rfndChilds
            };
            console.log('Sale Main: ', params);
        } else {
            let refund = refunds.at(0).data;
            let sumTgrosamounSal = sales.reduce((total, x) => total + x.data.tgrosamoun, 0);
            let saleChilds = sales.map(x => ({
                    IN_CCUST: '139',
                    IN_PRDA: refund.prda,
                    IN_TDOC: refund.tdoc,
                    IN_AREFNBR: refund.arefnbr,
                    IN_HPRDA: x.prda,
                    IN_HTDOC: x.tdoc,
                    IN_HAREFNBR: x.arefnbr,
                    IN_TGROSAMOUN: refund.tgrosamoun,
                    IN_HTGROSAMOUN: sumTgrosamounSal,
                    IN_COMENT: bpocomment
                }));
            params = {
                IN_CCUST: '139',
                IN_PRDA: refund.prda,
                IN_TDOC: refund.tdoc,
                IN_AREFNBR: refund.arefnbr,
                IN_TGROSAMOUN: refund.tgrosamoun,
                IN_HTGROSAMOUN: sumTgrosamounSal,
                childs: saleChilds
            };
            console.log('Refund Main: ', params);
        }
        return params;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Maintenance">
    maintenanceMSITracking: async function (grid, seleccionados) {
        const me = this;
        const dataEntry = Ext.getCmp(prototype.id + '-TransacErrorBPODataEntry-1');
        const gridDet = Ext.getCmp(prototype.id + '-ByPaymentDetailGrid-1');
        grid.getView().mask('Loading...');
        console.log(seleccionados);
        let sale = seleccionados.find(x => x.data.transtype.trim() === 'SALE');
        let refund = seleccionados.find(x => x.data.transtype.trim() === 'RFND');
        if (sale && refund) {
            let params = {
                IN_CCUST: '139',
                IN_PRDA1: sale.data.prda,
                IN_TDOC1: sale.data.tdoc,
                IN_AREFNBR1: sale.data.arefnbr,
                IN_PRDA2: refund.data.prda,
                IN_TDOC2: refund.data.tdoc,
                IN_AREFNBR2: refund.data.arefnbr
            };
            const res = await fetch(`${me.url}/maintenanceMSITracking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });
            if (res.ok) {
                const data = await res.json();
                const {sqlres, sqlmsg} = data;
                Ext.toast({
                    html: `<b>${sqlmsg || 'Error in MSI'}</b>`,
                    title: 'Notification',
                    align: 't',
                    closable: true,
                    width: 300,
                    timeout: 10000 // 10 segundos
                });
                dataEntry.getController().afterRender();
                gridDet.getStore().load();
                me.view.close();
            }
            grid.getView().unmask();
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
        let msi = seleccionados.find(x => x.data.transtype.trim() === 'SALE'
                    && x.data.instanbr > 0
                    && x.data.nbrinsta > 0
                    && x.data.stval === '1');
        let sale = seleccionados.find(x => x.data.transtype.trim() === 'SALE'
                    && x.data.instanbr === 0
                    && x.data.nbrinsta === 0);
        let refund = seleccionados.find(x => x.data.transtype.trim() === 'RFND'
                    && x.data.instanbr === 0
                    && x.data.nbrinsta === 0);
        if (msi && sale && refund) {
            let params = {
                IN_CCUST: '139',
                IN_PRDA1: msi.data.prda,
                IN_TDOC1: msi.data.tdoc,
                IN_AREFNBR1: msi.data.arefnbr,
                IN_PRDA2: sale.data.prda,
                IN_TDOC2: sale.data.tdoc,
                IN_AREFNBR2: sale.data.arefnbr,
                IN_PRDA3: refund.data.prda,
                IN_TDOC3: refund.data.tdoc,
                IN_AREFNBR3: refund.data.arefnbr
            };
            console.log(params);
            const res = await fetch(`${me.url}/maintenanceReverseMSITracking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });
            if (res.ok) {
                const data = await res.json();
                const {sqlres, sqlmsg} = data;
                Ext.toast({
                    html: `<b>${sqlmsg || 'Error in MSI'}</b>`,
                    title: 'Notification',
                    align: 't',
                    closable: true,
                    width: 300,
                    timeout: 10000 // 10 segundos
                });
                //dataEntry.getController().afterRender();
                //gridDet.getStore().load();
                me.reloadMainTransaction();
                me.reloadMainGrid();
                me.view.close();
            }
        } else {
            global.Msg({msg: 'Invalid Transactions'});
        }
        grid.getView().unmask();
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
        let sales = seleccionados.filter(x => x.data.transtype.trim() === 'SALE');
        if (sales.length === 0) {
            global.Msg({msg: 'You must select one or more sales'});
            return;
        }
        let refunds = seleccionados.filter(x => x.data.transtype.trim() === 'RFND');
        if (refunds.length === 0) {
            global.Msg({msg: 'You must select one or more refunds'});
            return;
        }
        if (sales.length > 1 && refunds.length > 1) {
            global.Msg({msg: 'You only need to select one main transaction'});
            return;
        }
        me.view.mask('Loading...');
        let params = me.formatManualParameters(sales, refunds);
        const res = await fetch(`${me.url}/maintenanceConcilTransacMan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        if (res.ok) {
            Ext.MessageBox.show({
                title: '.:PRAXIS:.',
                message: 'Updated Successfully',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
            //dataEntry.getController().afterRender();
            //gridDet.getStore().load();
            me.view.unmask();
            me.reloadMainTransaction();
            me.reloadMainGrid();
            me.view.close();
        } else {
            Ext.MessageBox.show({
                title: '.:PRAXIS:.',
                message: 'Error on Update',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
            this.loadMainTransaction();
            me.view.unmask();
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

