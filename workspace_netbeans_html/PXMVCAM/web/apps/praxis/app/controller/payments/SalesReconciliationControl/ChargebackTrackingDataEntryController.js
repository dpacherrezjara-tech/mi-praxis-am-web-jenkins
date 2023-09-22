Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.ChargebackTrackingDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ChargebackTrackingDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    init: function (view) {
    },
    afterRender: function (obj, e) {
        this.getData();
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
    showButtons: function () {
        const me = this;
        const match = ['1', '5', '6', '7'];
        if (match.some(x => me.view.obj.stval === x)) {
            Ext.getCmp(prototype.idCHBK + '-btn-update').hide();
        } else {
            Ext.getCmp(prototype.idCHBK + '-btn-update').show();
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
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Maintenance">
    maintenanceCHBKTracking: async function (grid, seleccionados) {
        const me = this;
        const dataEntry = Ext.getCmp(prototype.id + '-TransacErrorBPODataEntry-1');
        const gridDet = Ext.getCmp(prototype.id + '-ByPaymentDetailGrid-1');
        grid.getView().mask('Loading...');
        console.log(seleccionados);
        let normal = seleccionados.find(x => x.data.tgrosamoun<0);
        let reverse = seleccionados.find(x => x.data.tgrosamoun>0);
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

