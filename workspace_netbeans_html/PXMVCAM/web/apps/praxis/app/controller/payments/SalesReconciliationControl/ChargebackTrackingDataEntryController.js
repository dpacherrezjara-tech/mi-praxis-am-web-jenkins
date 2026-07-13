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
    getData: async function () {
        const me = this;
        const gridCHBK = Ext.getCmp(prototype.idCHBK + '-gridCHBKTracking');
        me.view.mask('Loading...');
        me.showButtons();
        console.log("me.view.searchParams", me.view.searchParams);
        const { IN_CCUST, IN_SCARDN, IN_TGROSAMOUN } = me.view.searchParams;
        const res = await global.callStoreGet('PRAXISMP', 'SQP05081', { IN_CCUST, IN_SCARDN, IN_TGROSAMOUN });
        const data = res?.lstRs?.[0] || [];
        if (data.length === 0) {
            global.Msg({msg: 'No data'});
            me.view.close();
        } else {
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
            gridCHBK.setStore(store);
            gridCHBK.getSelectionModel().select(bean, true);
        }
        me.view.unmask();
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
        if (match.some(x => me.view.obj.STVAL === x)) {
            Ext.getCmp(prototype.idCHBK + '-btn-update').hide();
            Ext.getCmp(prototype.idCHBK + '-rbOpcion').hide();
        } else {
            Ext.getCmp(prototype.idCHBK + '-btn-update').show();
            Ext.getCmp(prototype.idCHBK + '-rbOpcion').show();
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
//    onChangeView: function (checkbox, newValue) {
//        if (newValue) {
//            Ext.getCmp(prototype.idCHBK + '-gridCHBKTracking').hide();
//            Ext.getCmp(prototype.idCHBK + '-btn-update').hide();
//            Ext.getCmp(prototype.idCHBK + '-panelCHBKBrowser').show();
//            Ext.getCmp(prototype.idCHBK + '-btn-update-man').show();
//        } else {
//            Ext.getCmp(prototype.idCHBK + '-gridCHBKTracking').show();
//            Ext.getCmp(prototype.idCHBK + '-btn-update').show();
//            Ext.getCmp(prototype.idCHBK + '-panelCHBKBrowser').hide();
//            Ext.getCmp(prototype.idCHBK + '-btn-update-man').hide();
//        }
//        this.view.center();
//    },
    onRadioGroupChange: function (field, newValue, oldValue) {
        const me = this;
        let selectedValue = newValue.rb;
        //<editor-fold defaultstate="collapsed" desc="Hide All Btns">
        Ext.getCmp(prototype.idCHBK + '-gridCHBKTracking').hide();
        Ext.getCmp(prototype.idCHBK + '-btn-update').hide();
        Ext.getCmp(prototype.idCHBK + '-panelCHBKBrowser').hide();
        Ext.getCmp(prototype.idCHBK + '-btn-update-man').hide();
        Ext.getCmp(prototype.idCHBK + '-gridSaleTracking').hide();
        Ext.getCmp(prototype.idCHBK + '-btn-update-sale').hide();
        //</editor-fold>
        const opt = {
            '1': () => {
                Ext.getCmp(prototype.idCHBK + '-gridCHBKTracking').show();
                Ext.getCmp(prototype.idCHBK + '-btn-update').show();
            },
            '2': () => {
                Ext.getCmp(prototype.idCHBK + '-gridSaleTracking').show();
                Ext.getCmp(prototype.idCHBK + '-btn-update-sale').show();
                me.loadSaleChbkGrid();
            },
            '3': () => {
                Ext.getCmp(prototype.idCHBK + '-panelCHBKBrowser').show();
                Ext.getCmp(prototype.idCHBK + '-btn-update-man').show();
            }
        };
        opt[selectedValue]();
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
        const formValues = formParams.getValues();
        let params = {
            IN_CCUST: '139',
            IN_SCARDN: me.view.searchParams.IN_SCARDN,
            IN_DATEFROM: formValues.IN_DATEFROM,
            IN_DATETO: formValues.IN_DATETO
        };
        browserGrid.getView().mask('Loading...');
        const res = await global.callStoreGet('PRAXISMP', 'SQP05182', params);
        const data = res?.lstRs?.[0] || [];
        const store = Ext.create('Ext.data.Store', {
            data: data
        });
        browserGrid.setStore(store);
        browserGrid.bindStore(store);
        browserGrid.getView().unmask();
    },
    loadDesgloseGrid: async function (obj) {
        let params = {
            IN_CCUST: '139',
            IN_TDOC: obj.TDOC,
            IN_PRDA: obj.PRDA,
            IN_AREFNBR: obj.AREFNBR
        };
        const desgloseGrid = Ext.getCmp(prototype.idCHBK + '-gridDesgloseCHBK');
        desgloseGrid.getView().mask('Loading...');
        const res = await global.callStoreGet('PRAXISMP', 'SQP05072', params);
        const data = res?.lstRs?.[0] || [];
        const store = Ext.create('Ext.data.Store', {
            data: data
        });
        desgloseGrid.setStore(store);
        desgloseGrid.bindStore(store);
        desgloseGrid.getView().unmask();
    },
    loadSaleChbkGrid: async function () {
        const me = this;
        const gridCHBK = Ext.getCmp(prototype.idCHBK + '-gridSaleTracking');
        let params = me.formatSaleCHBKParams();
        me.view.mask('Loading...');
        const res = await global.callStoreGet('PRAXISMP', 'SQP05312', params);
        const data = res?.lstRs?.[0] || [];
        let store = new Ext.data.Store({
            autoLoad: true,
            data: data
        });
        gridCHBK.setStore(store);
        me.view.unmask();
    },
    storeChangeSale: function (grid, newStore, oldStore) {
        let records = newStore.getData().items;
        let selModel = grid.getSelectionModel();
        records.forEach(i => {
            if (i.data.STMAIN === '1') {
                selModel.select(i, true);
            }
        });
    },
    onSelectDesglose: function (rowModel, record, index) {
        const desgloseGrid = Ext.getCmp(prototype.idCHBK + '-gridDesgloseCHBK');
        const registros = desgloseGrid.getSelectionModel().getSelection();
        let sum = registros.reduce(function (total, item) {
            return total + item.data['VFOP'];
        }, 0);
        let formatSum = Ext.util.Format.number(sum, '0,000.00');
        Ext.getCmp(prototype.idCHBK + '-totTickets').setValue(registros.length);
        Ext.getCmp(prototype.idCHBK + '-totAmount').setValue(formatSum);
    },
    onDeselectDesglose: function (rowModel, record, index) {
        const desgloseGrid = Ext.getCmp(prototype.idCHBK + '-gridDesgloseCHBK');
        const registros = desgloseGrid.getSelectionModel().getSelection();
        let sum = registros.reduce(function (total, item) {
            return total + item.data['VFOP'];
        }, 0);
        let formatSum = Ext.util.Format.number(sum, '0,000.00');
        Ext.getCmp(prototype.idCHBK + '-totTickets').setValue(registros.length);
        Ext.getCmp(prototype.idCHBK + '-totAmount').setValue(formatSum);
    },
    onUpdateCHBKMan: function () {
        const me = this;
        const browserGrid = Ext.getCmp(prototype.idCHBK + '-gridCHBKBrowser').getSelectionModel().getSelection();
        const desgloseGrid = Ext.getCmp(prototype.idCHBK + '-gridDesgloseCHBK').getSelectionModel().getSelection();
        if (browserGrid.length === 0) {
            global.Msg({msg: 'Select transaction.'});
            return;
        }
        if (desgloseGrid.length === 0) {
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
    onUpdateCHBKSale: function () {
        const me = this;
        const grid = Ext.getCmp(prototype.idCHBK + '-gridSaleTracking');
        let selected = grid.getSelectionModel().getSelected();
        let selectedItems = selected.items || selected;
        let sale = selectedItems.filter(x => x.data.TRANSTYPE.trim() === 'SALE');
        let chbk = selectedItems.filter(x => x.data.TRANSTYPE.trim() === 'CHBK');

        if (sale.length === 0 || sale.length > 1) {
            global.Msg({msg: 'You must select one sale'});
            return;
        }
        if (chbk.length === 0 || chbk.length > 1) {
            global.Msg({msg: 'You must select one chargeback'});
            return;
        }

        let params = me.formatUpdateSaleChbk(sale[0].data,chbk[0].data);
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
                            me.maintenanceChbkSale(params);
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
            return total + item.data['VFOP'];
        }, 0);
        let difference = obj.TGROSAMOUN - sum;
        let detail = registros.map(x => me.requestObjectPX({...x.data}));
        const {CCIA, FORMA, SERIE, PNR} = detail.at(0);
        let ticket = CCIA + FORMA + SERIE;
        let params = {
            IN_CCUST: '139',
            IN_TDOC: chargeback.TDOC,
            IN_PRDA: chargeback.PRDA,
            IN_AREFNBR: chargeback.AREFNBR,
            IN_RTDOC: obj.TDOC,
            IN_RPRDA: obj.PRDA,
            IN_RAREFNBR: obj.AREFNBR,
            IN_TICKET: ticket,
            IN_SPNR: PNR,
            IN_QTYTKT: detail.length,
            detail: detail,
            diff: difference
        };
        console.log(params);
        return params;
    },
    formatSaleCHBKParams: function () {
        const me = this;
        const obj = me.view.obj;
        let cc1 = obj.SCARDN.trim().slice(0, 6);
        let cc2 = obj.SCARDN.trim().slice(-4);
        if (obj.PROCTYPE === 'BANORTE00') {
            cc2 = obj.SCARDN.trim().slice(-2);
        }
        let scardn = `${cc1}%${cc2}%`;
        let params = {
            IN_CCUST: obj.CCUST,
            IN_TDOC: obj.TDOC,
            IN_PRDA: obj.PRDA,
            IN_AREFNBR: obj.AREFNBR,
            IN_SCARDN: scardn,
            IN_TGROSAMOUN: obj.TGROSAMOUN
        };
        console.log('Parametros Sale/CHBK: ', params);
        return params;
    },
    formatUpdateSaleChbk: function (sale,chbk) {
        let params = {
            IN_CCUST : chbk.CCUST,
            IN_PRDA: chbk.PRDA,
            IN_TDOC: chbk.TDOC,
            IN_AREFNBR: chbk.AREFNBR,
            IN_PRDAS: sale.PRDA,
            IN_TDOCS: sale.TDOC,
            IN_AREFNBRS: sale.AREFNBR
        };
        console.log('Parameters Update Sale/CHBK: ',params);
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
        let normal = seleccionados.find(x => x.data.TGROSAMOUN < 0);
        let reverse = seleccionados.find(x => x.data.TGROSAMOUN > 0);
        if (normal && reverse) {
            let params = {
                IN_CCUST: '139',
                IN_PRDA: normal.data.PRDA,
                IN_TDOC: normal.data.TDOC,
                IN_AREFNBR: normal.data.AREFNBR,
                IN_RPRDA: reverse.data.PRDA,
                IN_RTDOC: reverse.data.TDOC,
                IN_RAREFNBR: reverse.data.AREFNBR
            };
            const res = await global.callStorePost('PRAXISMP', 'SQP05077', params);
            const { SQLMSG } = res.data.lstVals;
            Ext.toast({
                html: `<b>${SQLMSG || 'Error in CHBK'}</b>`,
                title: 'Notification',
                align: 't',
                closable: true,
                width: 300,
                timeout: 10000 // 10 segundos
            });
            me.getData();
            dataEntry.getController().afterRender();
            gridDet.getStore().load();
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
        const res = await global.callStorePost('PRAXISMP', 'SQP05183', params);
        const { SQLMSG } = res.data.lstVals;
        Ext.toast({
            html: `<b>${SQLMSG || 'Error in CHBK'}</b>`,
            title: 'Notification',
            align: 't',
            closable: true,
            width: 300,
            timeout: 10000 // 10 segundos
        });
        dataEntry.getController().afterRender();
        gridDet.getStore().load();
        me.view.close();
    },
    maintenanceChbkSale:async function(params){
        const me = this;
        const dataEntry = Ext.getCmp(prototype.id + '-TransacErrorBPODataEntry-1');
        let notifier = new AWN();
        let success = false;
        let message = "" ;
        me.view.mask('Loading...');
        try{
            const res = await global.callStorePost('PRAXISMP', 'SQP05313', params);
                // console.log(res);
            
            success = res.data.lstVals.IO_RESPONSE === 1 ;
            message = res.data.lstVals.IO_MESSAGE ;
            
            if ( success ) {
                notifier.success(message);
            }else{
                notifier.warning('Error: ' + message);
            }
        } catch (e) {
            console.error('Error of process: ', e);
            notifier.alert('System Error');
        } finally {
            me.view.unmask();
        }
        if ( success ) {
            dataEntry.getController().afterRender();
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
