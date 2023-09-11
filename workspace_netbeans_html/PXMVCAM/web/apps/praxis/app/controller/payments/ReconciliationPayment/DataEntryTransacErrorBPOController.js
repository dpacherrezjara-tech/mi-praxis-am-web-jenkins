Ext.define('Ext.Praxis.controller.payments.ReconciliationPayment.DataEntryTransacErrorBPOController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryTransacErrorBPOController',
    url: CONTEXTPATH + '/ReconciliationPayment',
    bean: {},
    init: function (view) {
    },
    afterRender: async function (obj, e) {
        //console.log(this.view.obj);
        this.view.mask('Loading...');
        await this.getCodeAdjustments();
        await this.getData();
        this.view.unmask();
    },
    getData: async function () {
        const me = this;
        let params = me.formatParameters(me.view.obj);
        const res = await fetch(`${me.url}/loadErrorTransactionBPOInfo?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
            me.limpiaObjetoPX(data.response);
            me.bean = data.response;
            form.reset();
            form.setValues(me.bean);
            const difference = Ext.getCmp(prototype.idDE + '-amtDifference');
            let diff = me.bean.tgrosamoun - me.bean.svfops;
            difference.setValue(Ext.util.Format.number(diff, '0,000.00'));
            me.changePerspective();
            //console.log('Objecto: ', me.bean);
        }
    },
    getCodeAdjustments: async function () {
        const me = this;
        let params = {
            KEY1: 'PK',
            KEY2: '89'
        };
        const res = await fetch(`${me.url}/getMasterTableInfo?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            const cmbAdju = Ext.getCmp(prototype.idDE + '-codAdjustment');
            const storeAdju = Ext.create('Ext.data.Store', {
                data: data.lst
            });
            cmbAdju.setStore(storeAdju);
        }
    },
    changePerspective: function () {
        const me = this;
        const match = ["1", "5", "6", "7"];
        const status = me.bean.stval;
        //console.log('Status', status);
        const bpo = Ext.getCmp(prototype.idDE + '-tabBPO');
        const blocked = Ext.getCmp(prototype.idDE + '-tabBlocked');
        const desglose = Ext.getCmp(prototype.idDE + '-tabDesglose');

        const scannerInputs = Ext.getCmp(prototype.idDE + '-scannerInputs');
        const standByBpo = Ext.getCmp(prototype.idDE + '-bpoComments');
        const addStandBy = Ext.getCmp(prototype.idDE + '-addStandBy');
        const revStandBy = Ext.getCmp(prototype.idDE + '-revStandBy');
        const hideStandBy = Ext.getCmp(prototype.idDE + '-hideStandBy');
        const reverseTrnx = Ext.getCmp(prototype.idDE + '-reverseTrnx');

        Ext.getCmp(prototype.idDE + '-panelAdjustments').hide();
        Ext.getCmp(prototype.idDE + '-gridAdjustments').getStore().removeAll();

        const btnUpdate = Ext.getCmp(prototype.idDE + '-btn-update');

        //transacciones match
        if (match.includes(status)) {
            bpo.setDisabled(true);
            blocked.setDisabled(true);
            desglose.setDisabled(false);
            standByBpo.hide();
            revStandBy.hide();
            scannerInputs.hide();
            reverseTrnx.show();
            btnUpdate.hide();
            me.setDesgloseGrid();

            //transacciones stand by    
        } else if (status === '0') {
            addStandBy.show();
            revStandBy.show();
            bpo.setDisabled(false);
            blocked.setDisabled(false);
            scannerInputs.hide();
            standByBpo.show();
            hideStandBy.hide();
            desglose.setDisabled(true);
            reverseTrnx.hide();
            btnUpdate.hide();
            me.scanCreditCard(me.bean);

            //transacciones pendientes
        } else {
            bpo.setDisabled(false);
            blocked.setDisabled(false);
            desglose.setDisabled(true);
            scannerInputs.show();
            standByBpo.hide();
            reverseTrnx.hide();
            btnUpdate.show();
            me.scanCreditCard(me.bean);
        }
    },
    scanCreditCard: async function (obj) {
        const me = this;
        const panelScan = Ext.getCmp(prototype.idDE + '-tabMain');
        panelScan.mask('Scanning...');
        let scanParams = me.formatScanParams(obj);
        panelScan.setActiveTab('A');
        const res = await fetch(`${me.url}/loadErrorTransactionBPOScanner?${new URLSearchParams(scanParams)}`);
        if (res.ok) {
            const data = await res.json();
            me.setBPOGrid(data.response);
            me.setBlockedGrid(data.response);
            //console.log(data);
            panelScan.unmask();
        }
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    reloadGridBPO: function () {
        const me = this;
        me.scanCreditCard(me.bean);
    },
    onDeleteRecordBPO: function (grid, rowIndex, colIndex) {
        let registro = grid.getStore().getAt(rowIndex);
        if (registro) {
            grid.getStore().remove(registro);
        }
    },
    onAddAdjustment: function (grid, rowIndex, colIndex) {
        let registro = grid.getStore().getAt(0).data;

        const transacAmt = Ext.getCmp(prototype.idDE + '-amtTransac').getValue().replace(',', '');
        const gridAmt = Ext.getCmp(prototype.idDE + '-totAmount').getValue().replace(',', '');
        const objClon = Object.assign({}, registro);
        objClon.svfops = parseFloat(transacAmt) - parseFloat(gridAmt);
        objClon.trncu = 'ADJU';
        const newCorrl = parseInt(objClon.corrl, 10) + 1;
        objClon.corrl = newCorrl.toString().padStart(2, '0');
        if (objClon.svfops === 0) {
            global.Msg({msg: 'Adjustment not required'});
            return;
        }
        const panelAdju = Ext.getCmp(prototype.idDE + '-panelAdjustments');
        panelAdju.show();

        const gridAdju = Ext.getCmp(prototype.idDE + '-gridAdjustments');
        gridAdju.setStore(Ext.create('Ext.data.Store', {
            data: [objClon]
        }));
    },
    onDeleteAdjustment: function () {
        const panelAdju = Ext.getCmp(prototype.idDE + '-panelAdjustments');
        panelAdju.hide();
        const gridAdju = Ext.getCmp(prototype.idDE + '-gridAdjustments');
        gridAdju.getStore().removeAll();
        const cmbAdju = Ext.getCmp(prototype.idDE + '-codAdjustment');
        cmbAdju.setValue('');
        Ext.getCmp(prototype.idDE + '-observAdjustment').setValue('');
    },
    onChangeStandBy: function () {
        const me = this;
        me.view.mask('Loading...');
        const mainForm = Ext.getCmp(prototype.idDE + '-mainForm');
        //console.log(mainForm.getValues());
        let params = me.formatStandByParams(me.bean, mainForm.getValues().bpocoment);
        fetch(`${me.url}/errorTransactionBPOsetStandBy?${new URLSearchParams(params)}`)
                .then(async res => {
                    if (res.ok) {
                        const data = await res.json();
                        const {sqlres, sqlmsg} = data;
                        Ext.toast({
                            html: `<b>${sqlmsg}</b>`,
                            title: 'Notification',
                            align: 't',
                            closable: true,
                            width: 300,
                            timeout: 10000 // 10 segundos
                        });
                        me.view.unmask();
                    } else {
                        global.Msg({msg: 'Error.'});
                    }
                }).then(() => me.afterRender());
    },
    onReverseStandBy: function () {
        const me = this;
        me.view.mask('Loading...');
        const mainForm = Ext.getCmp(prototype.idDE + '-mainForm');
        //console.log(mainForm.getValues());
        let params = me.formatStandByParams(me.bean, mainForm.getValues().bpocoment);
        fetch(`${me.url}/errorTransactionBPOreverseStandBy?${new URLSearchParams(params)}`)
                .then(async res => {
                    if (res.ok) {
                        const data = await res.json();
                        const {sqlres, sqlmsg} = data;
                        Ext.toast({
                            html: `<b>${sqlmsg}</b>`,
                            title: 'Notification',
                            align: 't',
                            closable: true,
                            width: 300,
                            timeout: 10000 // 10 segundos
                        });
                        me.view.unmask();
                    } else {
                        global.Msg({msg: 'Error.'});
                    }
                }).then(() => me.afterRender());
    },
    onCancelStandBy: function () {
        Ext.getCmp(prototype.idDE + '-bpoComments').hide();
        Ext.getCmp(prototype.idDE + '-scannerInputs').show();
        Ext.getCmp(prototype.idDE + '-hideStandBy').hide();
    },
    onOpenComments: function () {
        Ext.getCmp(prototype.idDE + '-bpoComments').show();
        Ext.getCmp(prototype.idDE + '-addStandBy').show();
        Ext.getCmp(prototype.idDE + '-hideStandBy').show();
        Ext.getCmp(prototype.idDE + '-scannerInputs').hide();
    },
    onReverseTransaction: function (btn) {
        const me = this;
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to reverse?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.reverseTransaction();
                        }
                    }
                });
    },
    onUpdateClick: function (btn) {
        const me = this;
        let params = me.formatUpdateParams();
        if (params.detail.length === 0) {
            global.Msg({msg: 'You must have at least one ticket.'});
            return;
        }
        if (params.difference !== 0) {
            global.Msg({msg: 'There are differences in reconciliation.'});
            return;
        }
        if(params.ajustes>0&&params.IN_CODADJU===''){
            global.Msg({msg: 'Unidentified Adjustment.'});
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
                            me.MaintenanceA4331(params);
                        }
                    }
                });
    },
    MaintenanceA4331: function (params) {
        const me = this;
        me.view.mask('Loading...');
        fetch(me.url + '/maintenanceErrorTransactionBPO', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(async res => {
            if (res.ok) {
                const data = await res.json();
                const {status, response} = data;
                if (status === 1) {
                    Ext.toast({
                        html: `<b>${response}</b>`,
                        title: 'Notification',
                        align: 't',
                        closable: true,
                        width: 300,
                        timeout: 10000 // 10 segundos
                    });
                } else {
                    Ext.MessageBox.show({
                        title: 'Error',
                        message: response,
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.MessageBox.OK
                    });
                }
            } else {
                Ext.MessageBox.show({
                    title: 'Error',
                    message: 'Transaction not saved',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.MessageBox.OK
                });
            }
            Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().load();
            me.view.unmask();
            me.afterRender();
        });
    },
    reverseTransaction: function () {
        const me = this;
        me.view.mask('Loading...');
        let params = {
            IN_CCUST: 139,
            IN_AREFNBR: me.bean.arefnbr,
            IN_TDOC: me.bean.tdoc,
            IN_PRDA: me.bean.prda
        };
        fetch(`${me.url}/ReverseTransaction?${new URLSearchParams(params)}`)
                .then(async res => {
                    if (res.ok) {
                        const data = await res.json();
                        const {status, response} = data;
                        if (status === 1) {
                            Ext.toast({
                                html: `<b>${response}</b>`,
                                title: 'Notification',
                                align: 't',
                                closable: true,
                                width: 300,
                                timeout: 10000 // 10 segundos
                            });
                        } else {
                            Ext.MessageBox.show({
                                title: 'Error',
                                message: 'Error in reverse',
                                icon: Ext.MessageBox.ERROR,
                                buttons: Ext.MessageBox.OK
                            });
                        }
                    }
                    Ext.getCmp(prototype.id + '-gridMainErrorTransaction').getStore().load();
                    me.view.unmask();
                    me.afterRender();
                });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Grillas Scaneo">
    setBPOGrid: function (data) {
        //const me = this;
        const gridAdd = Ext.getCmp(prototype.idDE + '-gridBPO');
        const pending = data.filter(x => x.duplicates === 0);
        const storePending = Ext.create('Ext.data.Store', {
            data: pending,
            listeners: {
                remove: function (store) {
                    const qty = Ext.getCmp(prototype.idDE + '-totTickets');
                    const amt = Ext.getCmp(prototype.idDE + '-totAmount');
                    qty.setValue(store.data.length);
                    amt.setValue(Ext.util.Format.number(store.sum('svfops'), '0,000.00'));
                }
            }
        });
        gridAdd.setStore(storePending);
        const qty = Ext.getCmp(prototype.idDE + '-totTickets');
        const amt = Ext.getCmp(prototype.idDE + '-totAmount');
        qty.setValue(storePending.data.length);
        amt.setValue(Ext.util.Format.number(storePending.sum('svfops'), '0,000.00'));
    },
    setBlockedGrid: function (data) {
        const me = this;
        const gridBlock = Ext.getCmp(prototype.idDE + '-gridBlocked');
        const blocked = data.filter(x => x.duplicates !== 0);
        const storeBlocked = Ext.create('Ext.data.Store', {
            data: blocked
        });
        gridBlock.setStore(storeBlocked);
        const qty = Ext.getCmp(prototype.idDE + '-totBTickets');
        qty.setValue(blocked.length);
        const amt = Ext.getCmp(prototype.idDE + '-totBAmount');
        let amtVal = me.sumBy({data: blocked, key: 'svfops'});
        amt.setValue(Ext.util.Format.number(amtVal, '0,000.00'));
    },
    setDesgloseGrid: async function () {
        const me = this;
        let params = me.formatDesgloseParams(me.bean);
        const panelScan = Ext.getCmp(prototype.idDE + '-tabMain');
        panelScan.setActiveTab('M');
        panelScan.mask('Scanning...');
        const res = await fetch(`${me.url}/loadErrorTransactionBPODesglose?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            //console.log(data);
            const gridDesglose = Ext.getCmp(prototype.idDE + '-gridDesglose');
            const storeDesglose = Ext.create('Ext.data.Store', {
                data: data.response
            });
            gridDesglose.setStore(storeDesglose);
            const qty = Ext.getCmp(prototype.idDE + '-totDTickets');
            const amt = Ext.getCmp(prototype.idDE + '-totDAmount');
            qty.setValue(data.response.length);
            amt.setValue(Ext.util.Format.number(storeDesglose.sum('svfops'), '0,000.00'));
            panelScan.unmask();
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Formateo de Parametros">
    formatParameters: function (obj) {
        let params = {
            IN_CCUST: '139',
            IN_PRDA: obj.PRDA,
            IN_TDOC: obj.TDOC,
            IN_AREFNBR: obj.AREFNBR
        };
        return params;
    },
    formatScanParams: function (obj) {
        const me = this;
        let cc1 = obj.scardn.trim().slice(0, 6);
        let cc2 = obj.scardn.trim().slice(-4);
        if (obj.proctype === 'BANORTE00') {
            cc2 = obj.scardn.trim().slice(-2);
        }
        let scardn = `${cc1}%${cc2}%`;
        const [inicio, fin] = me.getFechaRango(obj.sdate);
        let params = {
            IN_CCUST: obj.ccust,
            IN_SCARDN: scardn,
            IN_SAUTHOC: obj.sauthoc,
            IN_DATE: obj.sdate,
            IN_DATE_F: inicio,
            IN_DATE_T: fin,
            IN_SMERCHID: obj.smerchid,
            IN_SPNR: obj.spnr,
            IN_FCOMPL: obj.fcompl,
            IN_TDOC: obj.tdoc,
            IN_TRANSTYPE: obj.transtype
        };
        return params;
    },
    formatDesgloseParams: function (obj) {
        let params = {
            IN_CCUST: obj.ccust,
            IN_PRDA: obj.prda,
            IN_AREFNBR: obj.arefnbr
        };
        return params;
    },
    formatStandByParams: function (obj, comment) {
        let params = {
            IN_CCUST: obj.ccust,
            IN_PRDA: obj.prda,
            IN_TDOC: obj.tdoc,
            IN_AREFNBR: obj.arefnbr,
            IN_PROCTYPE: obj.proctype,
            IN_PROCTYPESQ: obj.proctypesq,
            IN_OBSERV: comment
        };
        return params;
    },
    formatUpdateParams: function () {
        const me = this;
        const obj = me.bean;
        //grillas conciliacion
        const gridBPO = Ext.getCmp(prototype.idDE + '-gridBPO').getStore();
        const gridADJU = Ext.getCmp(prototype.idDE + '-gridAdjustments').getStore();

        const codADJU = (Ext.getCmp(prototype.idDE + '-codAdjustment').getValue()||'').trim();
        const observADJU = Ext.getCmp(prototype.idDE + '-observAdjustment').getValue();

        //diferencia conciliacion manual
        const difference = obj.tgrosamoun - (gridBPO.sum('svfops') + gridADJU.sum('svfops'));

        //obtiene detalle para desglosado
        const details = [
            ...gridBPO.data.items.map(x => ({STMANUAL: 'Sales', ...x.data})),
            ...gridADJU.data.items.map(x => ({STMANUAL: 'Adjustment', ...x.data}))
        ].map(det => me.requestObjectPX(det))
                .map(x => ({
                        CCUST: 139,
                        STVAL: '5',
                        SCOUNTRY: obj.scountry,
                        PMERCHID: obj.pmerchid,
                        SMERCHID: obj.smerchid,
                        PAYDATE: obj.paydate,
                        PRDA: obj.prda,
                        TDOC: obj.tdoc,
                        AREFNBR: obj.arefnbr,
                        PROCTYPE: obj.proctype,
                        PROCTYPESQ: obj.proctypesq,
                        FORCESCAN: '0',
                        FREGLA: '4',
                        OBSERV: observADJU,
                        CERROR: x.STMANUAL === 'Adjustment' ? codADJU : obj.cerror,
                        ...x
                    }));
        const conteo_void = details.filter(x=>x.FVOID==='V').length;
        //console.log(conteo_void);

        const params = me.requestObjectSP(me.bean);
        params.difference = difference;
        params.ajustes = gridADJU.data.items.length;
        params.detail = details;
        //clona ticket
        if (details.length > 0) {
            const first = details.at(0);
            if (params.IN_TICKET === '' && params.IN_SPNR === '') {
                params.IN_TICKET = first.CCIA + first.FORMA + first.SERIE;
                params.IN_SPNR = first.SPNR;
            } else if (params.IN_TICKET.substring(0, 3) === '000') {
                params.IN_TICKET = first.CCIA + first.FORMA + first.SERIE;
                params.IN_SPNR = first.SPNR;
            }
        }
        console.log('Datos de PNR y Ticket: ', params.IN_SPNR, '-', params.IN_TICKET);
        params.IN_CODADJU = codADJU;
        params.IN_FVOID = conteo_void>0?'V':'';
        params.IN_QTYTKT = details.length;
        params.IN_SVFOPS = gridBPO.sum('svfops') + gridADJU.sum('svfops');
        console.log(params);
        return params;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    onCancelClick: function () {
        this.view.close();
    },
    onViewTicket: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        if (record.data.ticket.trim() === '') {
            return;
        }
        const obj = record.data.ticket;
        prototypeProgram.view = 'payments-chargeback-sabre-status-form';
        prototypeProgram.nprog = 'PX00000635';
        prototypeProgram.title = 'Chargeback Sabre Status';
        prototypeProgram.modulo = '';

        var beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = obj.substr(0, 3);
        beanProMasterTicket.IN_FORMA = obj.substr(3, 4);
        beanProMasterTicket.IN_SERIE = obj.substr(7, 6);

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
        this.view.close();
    },
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
    },
    getFechaRango: function (fechaString) {
        // Convertir la cadena en un objeto Date
        const fecha = new Date(
                fechaString.substring(0, 4),
                fechaString.substring(4, 6) - 1,
                fechaString.substring(6, 8)
                );

        // Obtener la fecha +1 día
        const fechaMasUnDia = new Date(fecha);
        fechaMasUnDia.setDate(fecha.getDate() + 1);
        // Obtener la fecha -1 día
        const fechaMenosUnDia = new Date(fecha);
        fechaMenosUnDia.setDate(fecha.getDate() - 1);
        // Formatear las nuevas fechas como cadenas
        const fechaMasUnDiaString = fechaMasUnDia.toISOString().slice(0, 10).replace(/-/g, '');
        const fechaMenosUnDiaString = fechaMenosUnDia.toISOString().slice(0, 10).replace(/-/g, '');

        return [fechaMenosUnDiaString, fechaMasUnDiaString];
    },
    sumBy: function ( {data, key}){
        let sum = data.reduce(function (total, item) {
            return total + item[key];
        }, 0);
        return sum;
    }
    //</editor-fold>
});


