Ext.define('Ext.Praxis.controller.payments.ReconciliationPayment.MSITrackingDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MSITrackingDataEntryController2',
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
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.maintenanceReverseMSITracking(grid, seleccionados);
                        }
                    }
                });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Maintenance">
    maintenanceMSITracking: async function (grid, seleccionados) {
        const me = this;
        const dataEntry = Ext.getCmp(prototype.id + '-ByPaymentDetailGrid-1');
        const gridDet = Ext.getCmp(prototype.id + '-gridMainErrorTransaction');
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
                me.getData();
                dataEntry.getController().afterRender();
                gridDet.getStore().load();
            } else {
                global.Msg({msg: 'Error'});
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
        const dataEntry = Ext.getCmp(prototype.id + '-ByPaymentDetailGrid-1');
        const gridDet = Ext.getCmp(prototype.id + '-gridMainErrorTransaction');
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
                me.getData();
                dataEntry.getController().afterRender();
                gridDet.getStore().load();
            } else {
                global.Msg({msg: 'Error'});
                me.view.close();
            }
        } else {
            global.Msg({msg: 'Invalid Transactions'});
        }
        grid.getView().unmask();
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    limpiaObjetoPX: function (obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key].trimEnd();
            }
        }
    }
    //</editor-fold>
});

