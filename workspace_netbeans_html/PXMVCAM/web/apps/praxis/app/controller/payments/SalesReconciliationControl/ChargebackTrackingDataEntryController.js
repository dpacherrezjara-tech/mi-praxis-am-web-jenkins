Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.ChargebackTrackingDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChargebackTrackingDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    init: function (view) {
    },
    afterRender: function (obj, e) {
        this.getData();
        this.loadInformationBrowser();
    },
    getData: function () {
        const me = this;
        const gridCHBK = Ext.getCmp(prototype.idCHBK + '-gridCHBKTracking');
        me.view.mask('Loading...');
        me.showButtons();
        fetch(`${me.url}/loadChargebackTrackingInfo?${new URLSearchParams(me.view.searchParams)}`)
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
                        gridCHBK.setStore(store);
                        gridCHBK.getSelectionModel().select(bean, true);
                        //console.log(data);
                    }
                }).then(() => me.view.unmask());
    },
    loadInformationBrowser: function () {
        const me = this;
        const form = Ext.getCmp(prototype.idCHBK + '-formCHBKBrowser').getForm();
        console.log(me.view.obj);
        form.setValues(me.view.obj);
    },
    showButtons: function () {
        const me = this;
        const match = ['1', '5', '6', '7'];
        if (match.some(x => me.view.obj.stval === x)) {
            Ext.getCmp(prototype.idCHBK + '-btn-update').hide();
            Ext.getCmp(prototype.idCHBK + '-chkChangeView').hide();
        } else {
            Ext.getCmp(prototype.idCHBK + '-btn-update').show();
            Ext.getCmp(prototype.idCHBK + '-chkChangeView').show();
        }
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onCancelClick: function () {
        const me = this;
        me.view.close();
    },
    onUpdateCHBK: async function (btn) {
        const me = this;
        const grid = Ext.getCmp(prototype.idCHBK + '-gridCHBKTracking');
        const seleccionados = grid.getSelectionModel().getSelection();
        if (seleccionados.length !== 2) {
            global.Msg({msg: 'Invalid Selected'});
            return;
        }
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.maintenanceCHBKTracking(grid, seleccionados);
                        }
                    }
                });
    },
    onChangeView: function (checkbox, newValue) {
        if (newValue) {
            Ext.getCmp(prototype.idCHBK + '-gridCHBKTracking').hide();
            Ext.getCmp(prototype.idCHBK + '-btn-update').hide();
            Ext.getCmp(prototype.idCHBK + '-panelCHBKBrowser').show();
            Ext.getCmp(prototype.idCHBK + '-btn-update-man').show();
        } else {
            Ext.getCmp(prototype.idCHBK + '-gridCHBKTracking').show();
            Ext.getCmp(prototype.idCHBK + '-btn-update').show();
            Ext.getCmp(prototype.idCHBK + '-panelCHBKBrowser').hide();
            Ext.getCmp(prototype.idCHBK + '-btn-update-man').hide();
        }
        this.view.center();
    },
    onSearchBrowser: function () {
        this.loadBrowserGrid();
    },
    onSelectBrowser: function (rowModel, record, index) {
        this.loadDesgloseGrid(record.data);
    },
    loadBrowserGrid: async function () {
        const me = this;
        const formParams = Ext.getCmp(prototype.idCHBK + '-formCHBKBrowser').getForm();
        const browserGrid = Ext.getCmp(prototype.idCHBK + '-gridCHBKBrowser');
        let params = {
            IN_CCUST: '139',
            IN_SCARDN: me.view.searchParams.IN_SCARDN,
            ...formParams.getValues()
        };
        browserGrid.getView().mask('Loading...');
        const res = await fetch(`${me.url}/loadChargebackTrackingBrowser?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            const store = Ext.create('Ext.data.Store', {
                data: data.response
            });
            browserGrid.setStore(store);
            browserGrid.bindStore(store);
        }
        browserGrid.getView().unmask();
    },
    loadDesgloseGrid: async function (obj) {
        let params = {
            IN_CCUST: '139',
            IN_TDOC: obj.tdoc,
            IN_PRDA: obj.prda,
            IN_AREFNBR: obj.arefnbr
        };
        const desgloseGrid = Ext.getCmp(prototype.idCHBK + '-gridDesgloseCHBK');
        desgloseGrid.getView().mask('Loading...');
        const res = await fetch(`${me.url}/loadErrorTransactionBPODesgloseCHBK?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            const store = Ext.create('Ext.data.Store', {
                data: data.response
            });
            desgloseGrid.setStore(store);
            desgloseGrid.bindStore(store);
        }
        desgloseGrid.getView().unmask();
    },
    onSelectDesglose: function (rowModel, record, index) {
        const obj = record.data;
        const desgloseGrid = Ext.getCmp(prototype.idCHBK + '-gridDesgloseCHBK');
        const registros = desgloseGrid.getSelectionModel().getSelection();
        //console.log(registros);
        let sum = registros.reduce(function (total, item) {
            return total + item.data['vfop'];
        }, 0);
        let formatSum = Ext.util.Format.number(sum, '0,000.00');
        Ext.getCmp(prototype.idCHBK + '-totTickets').setValue(registros.length);
        Ext.getCmp(prototype.idCHBK + '-totAmount').setValue(formatSum);
    },
    onDeselectDesglose: function (rowModel, record, index) {
        const obj = record.data;
        const desgloseGrid = Ext.getCmp(prototype.idCHBK + '-gridDesgloseCHBK');
        const registros = desgloseGrid.getSelectionModel().getSelection();
        let sum = registros.reduce(function (total, item) {
            return total + item.data['vfop'];
        }, 0);
        let formatSum = Ext.util.Format.number(sum, '0,000.00');
        Ext.getCmp(prototype.idCHBK + '-totTickets').setValue(registros.length);
        Ext.getCmp(prototype.idCHBK + '-totAmount').setValue(formatSum);
    },
    onUpdateCHBKMan: function () {
        const me = this;
        const browserGrid = Ext.getCmp(prototype.idCHBK + '-gridCHBKBrowser').getSelectionModel().getSelection();
        const desgloseGrid = Ext.getCmp(prototype.idCHBK + '-gridDesgloseCHBK').getSelectionModel().getSelection();
        if (browserGrid.length === 0){
            global.Msg({msg: 'Select transaction.'});
            return;
        }
        if (desgloseGrid.length === 0){
            global.Msg({msg: 'There are no tickets selected.'});
            return;
        }
        let params = me.formatUpdateManualParams();
        if (params.diff !== 0) {
            global.Msg({msg: 'There are differences in reconciliation.'});
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
                            me.maintenanceCHBKManual(params);
                        }
                    }
                });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Format Params">
    formatUpdateManualParams: function () {
        const me = this;
        const obj = me.view.obj;
        const browserGrid = Ext.getCmp(prototype.idCHBK + '-gridCHBKBrowser');
        const desgloseGrid = Ext.getCmp(prototype.idCHBK + '-gridDesgloseCHBK');

        const chargeback = browserGrid.getSelectionModel().getSelection().at(0).data;
        const registros = desgloseGrid.getSelectionModel().getSelection();
        let sum = registros.reduce(function (total, item) {
            return total + item.data['vfop'];
        }, 0);
        let difference = obj.tgrosamoun - sum;
        let detail = registros.map(x => me.requestObjectPX({...x.data}));
        const {CCIA, FORMA, SERIE, PNR} = detail.at(0);
        let ticket = CCIA + FORMA + SERIE;
        let params = {
            IN_CCUST: '139',
            IN_TDOC: chargeback.tdoc,
            IN_PRDA: chargeback.prda,
            IN_AREFNBR: chargeback.arefnbr,
            IN_RTDOC: obj.tdoc,
            IN_RPRDA: obj.prda,
            IN_RAREFNBR: obj.arefnbr,
            IN_TICKET: ticket,
            IN_SPNR: PNR,
            IN_QTYTKT: detail.length,
            detail: detail,
            diff: difference
        };
        console.log(params);
        return params;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Maintenance">
    maintenanceCHBKTracking: async function (grid, seleccionados) {
        const me = this;
        const dataEntry = Ext.getCmp(prototype.id + '-TransacErrorBPODataEntry-1');
        const gridDet = Ext.getCmp(prototype.id + '-ByPaymentDetailGrid-1');
        grid.getView().mask('Loading...');
        console.log(seleccionados);
        let normal = seleccionados.find(x => x.data.tgrosamoun < 0);
        let reverse = seleccionados.find(x => x.data.tgrosamoun > 0);
        if (normal && reverse) {
            let params = {
                IN_CCUST: '139',
                IN_PRDA: normal.data.prda,
                IN_TDOC: normal.data.tdoc,
                IN_AREFNBR: normal.data.arefnbr,
                IN_RPRDA: reverse.data.prda,
                IN_RTDOC: reverse.data.tdoc,
                IN_RAREFNBR: reverse.data.arefnbr
            };
            const res = await fetch(`${me.url}/maintenanceChargebackTracking`, {
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
                    html: `<b>${sqlmsg || 'Error in CHBK'}</b>`,
                    title: 'Notification',
                    align: 't',
                    closable: true,
                    width: 300,
                    timeout: 10000 // 10 segundos
                });
                me.getData();
                dataEntry.getController().afterRender();
                gridDet.getStore().load();
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
    maintenanceCHBKManual: async function (params) {
        const me = this;
        const dataEntry = Ext.getCmp(prototype.id + '-TransacErrorBPODataEntry-1');
        const gridDet = Ext.getCmp(prototype.id + '-ByPaymentDetailGrid-1');
        me.view.mask('Loading...');
        const res = await fetch(`${me.url}/maintenanceChargebackManual`, {
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
                html: `<b>${sqlmsg || 'Error in CHBK'}</b>`,
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
    requestObjectSP: function (jsonData) {
        const resultado = {};
        for (const clave in jsonData) {
            if (jsonData.hasOwnProperty(clave)) {
                // Convierte la clave a mayúsculas y añade "IN" como prefijo
                const nuevaClave = `IN_${clave.toUpperCase()}`;

                // Asigna el valor original a la nueva clave
                resultado[nuevaClave] = jsonData[clave];
            }
        }
        return resultado;
    },
    requestObjectPX: function (jsonData) {
        const resultado = {};
        for (const clave in jsonData) {
            if (jsonData.hasOwnProperty(clave)) {
                // Convierte la clave a mayúsculas y añade "IN" como prefijo
                const nuevaClave = `${clave.toUpperCase()}`;

                // Asigna el valor original a la nueva clave
                resultado[nuevaClave] = jsonData[clave];
            }
        }
        return resultado;
    }
    //</editor-fold>
});

