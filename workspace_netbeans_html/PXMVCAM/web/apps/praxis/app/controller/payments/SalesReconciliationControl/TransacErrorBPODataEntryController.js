Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.TransacErrorBPODataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TransacErrorBPODataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    bean: {},
    init: function (view) {
    },
    afterRender: async function () {
        const me = this;
        me.view.setLoading(true);
        await this.getCodeAdjustments();
        await this.getData();
        me.view.setLoading(false);
    },
    getData: async function () {
        const me = this;
        let params = me.formatParameters(me.view.obj);
        const res = await fetch(`${me.url}/loadErrorTransactionBPOInfo?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            const form = Ext.getCmp(prototype.idDE + '-informationForm').getForm();
            me.limpiaObjetoPX(data.response);
            me.bean = data.response;
            form.reset();
            form.setValues(me.bean);
            me.changePerspective();
        }
    },
    getCodeAdjustments: async function () {
        const me = this;
        const res = await fetch(`${me.url}/loadFilters`);
        if (res.ok) {
            const data = await res.json();
            me.users = data.admins.map(x => x.a4451key3.trimEnd());
        }
    },
    changePerspective: function () {
        const me = this;
        const userName = $('#menuUser').text();
        const match = ["1", "4", "5", "6", "7", "8", "9", "M", "C", "D", "E"];
        const matchComment = ["4", "M", "C", , "D", "E"];
        const status = me.bean.stval;
        const {tgrosamoun, svfops} = me.bean;
        let diff = tgrosamoun - svfops;
        if (me.bean.transtype === 'CHBK') {
            diff = tgrosamoun + svfops;
        }
        Ext.getCmp(prototype.idDE + '-txtDifference').setValue(diff);

        const bpo = Ext.getCmp(prototype.idDE + '-tabBPO');
        const blocked = Ext.getCmp(prototype.idDE + '-tabBlocked');
        const desglose = Ext.getCmp(prototype.idDE + '-tabDesglose');
        const scanner = Ext.getCmp(prototype.idDE + '-scannerInputs');
        let adj = me.bean.codadju.trim() === '' ? false : true;
        const adjucoment = Ext.getCmp(prototype.idDE + '-bpoComments2');
        const commentTransaction = Ext.getCmp(prototype.idDE + '-CommentTransaction');
        commentTransaction.hide();

        Ext.getCmp(prototype.idDE + '-panelAdjustments').hide();
        const gridAdju = Ext.getCmp(prototype.idDE + '-gridAdjustments').getStore();
        gridAdju.removeAll();
        Ext.getCmp(prototype.idDE + '-codAdjustment').setValue('');
        Ext.getCmp(prototype.idDE + '-observAdjustment').setValue('');

        const btnUpdate = Ext.getCmp(prototype.idDE + '-btn-update');
        const btnReverse = Ext.getCmp(prototype.idDE + '-reverseTrnx');
        const btnMSI = Ext.getCmp(prototype.idDE + '-MatchMSITracking');

        const gridPanel1 = Ext.getCmp(prototype.idDE + '-panelGrids1');
        const gridPanel2 = Ext.getCmp(prototype.idDE + '-panelGrids2');
        const balanceScan = Ext.getCmp(prototype.idDE + '-balanceScannerForm');
        const updateBalance = Ext.getCmp(prototype.idDE + '-btn-update-balance');
        Ext.getCmp(prototype.idDE + '-gridBalances').getStore().removeAll();
        gridPanel1.show();
        gridPanel2.hide();
        balanceScan.hide();
        updateBalance.hide();
        scanner.show();

        //transacciones match
        if (match.includes(status)) {

            bpo.setDisabled(true);
            blocked.setDisabled(true);
            desglose.setDisabled(false);
            scanner.hide();
            me.showStandBy(false);
            if (userName.slice(0, 3) === 'SAP') {
                btnReverse.show();
            } else if (me.users.includes(userName)) {
                btnReverse.show();
            } else {
                btnReverse.hide();
            }
            btnUpdate.hide();
            btnMSI.show();
            me.setDesgloseGrid();
            if (adj) {
                if (me.bean.adjucoment.trim() !== '') {
                    Ext.getCmp(prototype.idDE + '-adjucoment').setValue(me.bean.adjucoment);
                    adjucoment.show();
                }
            }
//            // Comentarios automaticos
//            if (matchComment.includes(status)) {
//                Ext.getCmp(prototype.idDE + '-InputCommentTransaction').setValue(me.bean.autocoment);
//                commentTransaction.show();
//            }
        //transacciones stand by    
        } else if (status === '0') {
            bpo.setDisabled(false);
            blocked.setDisabled(false);
            desglose.setDisabled(true);
            scanner.hide();
            me.showStandBy(true);
            btnReverse.hide();
            btnUpdate.hide();
            btnMSI.show();
            adjucoment.hide();
            me.scanStandBy(me.bean);

            //transacciones pendientes
        } else {
            bpo.setDisabled(false);
            blocked.setDisabled(false);
            desglose.setDisabled(true);
            scanner.show();
            me.showStandBy(false);
            btnReverse.hide();
            btnUpdate.show();
            btnMSI.hide();
            adjucoment.hide();
            me.scanCreditCard(me.bean);
        }

        // Comentarios automaticos
        if (matchComment.includes(status)) {
            Ext.getCmp(prototype.idDE + '-InputCommentTransaction').setValue(me.bean.autocoment);
            commentTransaction.show();
        }
//            console.log('me.bean.autocoment',me.bean.autocoment)
        me.changeTrnxView(me.bean.transtype);
        //me.setUserInformation(me.bean);
    },
    changeTrnxView: function (trnx) {
        const me = this;
        const smerchid = Ext.getCmp(prototype.idDE + '-txtSMERCHID');
        const trnxInfo = Ext.getCmp(prototype.idDE + '-fsSaleInfo');
        const saleDate = Ext.getCmp(prototype.idDE + '-txtSDATE');
        const salesAmt = Ext.getCmp(prototype.idDE + '-txtSVFOPS');
        if (trnx === 'RFND') {
            smerchid.setFieldLabel('Refund Merchant');
            trnxInfo.setTitle('<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Refund Information</span>');
            saleDate.setFieldLabel('Refund Date');
            salesAmt.setFieldLabel('Refund Amount');
        } else {
            smerchid.setFieldLabel('Sale Merchant');
            trnxInfo.setTitle('<span style="font-weight: bold; text-decoration-line: underline;font-size:13px;">Sale Information</span>');
            saleDate.setFieldLabel('Sale Date');
            salesAmt.setFieldLabel('Sale Amount');
        }

        Ext.getCmp(prototype.idDE + '-ChargebackTracking').hide();
        if (trnx === 'CHBK') {
            let texto = me.bean.tgrosamoun >= 0 ? 'REVERSE CHARGEBACK' : 'CHARGEBACK';
            Ext.getCmp(prototype.idDE + '-specialPanel').show();
            Ext.getCmp(prototype.idDE + '-specialTitle').setText(texto);
            Ext.getCmp(prototype.idDE + '-ChargebackTracking').show();
        } else if (trnx === 'ADJU') {
            Ext.getCmp(prototype.idDE + '-specialPanel').show();
            Ext.getCmp(prototype.idDE + '-specialTitle').setText('ADJUSTMENT');
        }
    },
//    setUserInformation: function (bean) {
//        const {uscr, fecr, hocr, usup, feup, houp} = bean;
//        Ext.getCmp(prototype.idDE + '-txtUSCR').setValue(uscr);
//        Ext.getCmp(prototype.idDE + '-txtFECR').setValue(fecr);
//        Ext.getCmp(prototype.idDE + '-txtHOCR').setValue(hocr);
//        Ext.getCmp(prototype.idDE + '-txtUSUP').setValue(usup);
//        Ext.getCmp(prototype.idDE + '-txtFEUP').setValue(feup);
//        Ext.getCmp(prototype.idDE + '-txtHOUP').setValue(houp);
//    },
    showStandBy: function (show) {
        const standByBpo = Ext.getCmp(prototype.idDE + '-bpoComments');
        const txtBpo = Ext.getCmp(prototype.idDE + '-bpocoment');
        const addStandBy = Ext.getCmp(prototype.idDE + '-addStandBy');
        const revStandBy = Ext.getCmp(prototype.idDE + '-revStandBy');
        const hideStandBy = Ext.getCmp(prototype.idDE + '-hideStandBy');
        const adju = Ext.getCmp(prototype.idDE + '-addStandByAdju');

        if (show) {
            addStandBy.show();
            revStandBy.show();
            hideStandBy.hide();
            standByBpo.show();
            
            if ((this.bean.cerror === '18' || this.bean.cerror === '19'  ) && this.bean.stval === '0') {
                txtBpo.setReadOnly(true);
                adju.setValue(true);
                adju.setReadOnly(true);
            }
            // stand by autocoment type SB
            else if ( this.bean.bpocoment.length > 0 && this.bean.stval === '0' ){
                txtBpo.setReadOnly(true);
                adju.setValue(false);
                adju.hide();
                addStandBy.hide();
            }
            else {
                txtBpo.setReadOnly(false);
                adju.setValue(false);
                adju.setReadOnly(false);
            }
            
        } else {
            adju.setReadOnly(false);
            addStandBy.hide();
            revStandBy.hide();
            hideStandBy.show();
            standByBpo.hide();
        }
        Ext.getCmp(prototype.idDE + '-bpocoment').setValue(this.bean.bpocoment);
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
            console.log(data);
            me.setBPOGrid(data.response);
            me.setBlockedGrid(data.response);
        } else {
            global.Msg({msg: 'Error on scan'});
        }
        panelScan.unmask();
        me.view.center();
    },
    scanStandBy: async function (obj) {
        const me = this;
        const panelScan = Ext.getCmp(prototype.idDE + '-tabMain');
        panelScan.mask('Scanning...');
        let scanParams = me.formatScanSbParams(obj);
        panelScan.setActiveTab('A');
        const res = await fetch(`${me.url}/loadErrorTransactionStandByScanner?${new URLSearchParams(scanParams)}`);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            me.setBPOGrid(data.response);
            me.setBlockedGrid(data.response);
        } else {
            global.Msg({msg: 'Error on scan'});
        }
        panelScan.unmask();
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
        let registro = grid.getStore().getAt(rowIndex).data;

        let transacType = this.bean.transtype;
        let transacAmt = this.bean.tgrosamoun;
        const gridAmt = Ext.getCmp(prototype.idDE + '-totAmount').getValue().replace(/,/g, "");
        console.log(transacAmt, '-', gridAmt);
        const objClon = Object.assign({}, registro);
        if (transacType.trim() === 'CHBK') {
            objClon.svfops = Math.abs(parseFloat(transacAmt)) - parseFloat(gridAmt);
        } else {
            objClon.svfops = parseFloat(transacAmt) - parseFloat(gridAmt);
        }
        objClon.trnco = objClon.trncu;
        objClon.trncu = 'ADJU';
        const newCorrl = parseInt(objClon.corrl, 10) + 1;
        objClon.corrl = newCorrl.toString().padStart(2, '0');
        if (objClon.svfops === 0) {
            global.Msg({msg: 'Adjustment not required'});
            return;
        }
        const panelAdju = Ext.getCmp(prototype.idDE + '-panelAdjustments');
        //debugger;
        panelAdju.show();

        const gridAdju = Ext.getCmp(prototype.idDE + '-gridAdjustments');
        gridAdju.setStore(Ext.create('Ext.data.Store', {
            data: [objClon]
        }));

        this.view.center();
    },
    onDeleteAdjustment: function () {
        const panelAdju = Ext.getCmp(prototype.idDE + '-panelAdjustments');
        panelAdju.hide();
        const gridAdju = Ext.getCmp(prototype.idDE + '-gridAdjustments');
        gridAdju.getStore().removeAll();
        gridAdju.getView().refresh();
        const cmbAdju = Ext.getCmp(prototype.idDE + '-codAdjustment');
        cmbAdju.setValue('');
        Ext.getCmp(prototype.idDE + '-observAdjustment').setValue('');
        this.view.center();
    },
    onChangeStandBy: async function () {
        const me = this;
        const bpoComent = Ext.getCmp(prototype.idDE + '-bpocoment');
        //console.log(mainForm.getValues());
        let params = me.formatStandByParams(me.bean, bpoComent.getValue());
        console.log(params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to set Stand By?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.saveStandBy(params);
                        }
                    }
                });
    },
    saveStandBy: async function (params) {
        const me = this;
        me.view.mask('Loading...');
        const res = await fetch(`${me.url}/errorTransactionBPOsetStandBy`, {
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
                html: `<b>${sqlmsg}</b>`,
                title: 'Notification',
                align: 't',
                closable: true,
                width: 300,
                timeout: 10000 // 10 segundos
            });
            me.view.unmask();
            me.afterRender();
        } else {
            global.Msg({msg: 'Error.'});
        }
    },
    onChangeStandyByAdju: function (btn) {
        const txtBpo = Ext.getCmp(prototype.idDE + '-bpocoment');
        txtBpo.setValue('');
        if (btn.value) {
            txtBpo.setReadOnly(true);
        } else {
            txtBpo.setReadOnly(false);
        }
    },
    onReverseStandBy: function () {
        const me = this;
        me.view.mask('Loading...');
        const bpoComent = Ext.getCmp(prototype.idDE + '-bpocoment');
        let params = me.formatStandByParams(me.bean, bpoComent.getValue());
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
//    onOpenComments: function () {
//        Ext.getCmp(prototype.idDE + '-bpoComments').show();
//        Ext.getCmp(prototype.idDE + '-addStandBy').show();
//        Ext.getCmp(prototype.idDE + '-hideStandBy').show();
//        Ext.getCmp(prototype.idDE + '-scannerInputs').hide();
//    },
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
        let msgAdd = "";
        if (params.detail.filter(x => x.SCURRENCY !== params.IN_SCURRENCY).length > 0) {
            global.Msg({msg: 'One or more tickets have differents currency!'});
            return;
        }
        if (params.detail.length === 0) {
//            global.Msg({msg: 'You must have at least one ticket.'});  
            msgAdd = "You haven't any ticket. The status will be changed to Stand By. ";

        } else if (params.difference !== 0) {
//            global.Msg({msg: 'There are differences in reconciliation.'});
//            return;
            msgAdd = 'There are differences in reconciliation. ';
        }
        if (params.ajustes > 0 && params.IN_CODADJU === '') {
            global.Msg({msg: 'Unidentified Adjustment.'});
            return;
        }
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: msgAdd + 'Are you sure to update?',
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
    MaintenanceA4331: async function (params) {
        const me = this;
        me.view.mask('Loading...');
        const res = await fetch(me.url + '/maintenanceErrorTransactionBPO', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        if (res.ok) {
            const data = await res.json();
            const {status, response} = data;
            console.log('status', status);
            console.log('response', response);
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
                    message: response || 'Error in Update',
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.MessageBox.OK
                });
            }
        } else {
            global.Msg({msg: 'Error'});
            me.view.close();
            return;
        }
        me.reloadErrorGrid();
        me.view.unmask();
        me.afterRender();

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
                    } else {
                        global.Msg({msg: 'Error'});
                        me.view.close();
                    }
                    me.reloadErrorGrid();
                    me.view.unmask();
                    me.afterRender();
                });
    },
    onClearScannerInputs: function () {
        const scannerForm = Ext.getCmp(prototype.idDE + '-scannerForm').getForm();
        scannerForm.reset();
    },
    onAddCreditCardClick: async function () {
        const me = this;
        const scannerInputs = Ext.getCmp(prototype.idDE + '-scannerInputs');
        scannerInputs.mask('Loading...');
        const scannerForm = Ext.getCmp(prototype.idDE + '-scannerForm').getForm();
        if (!scannerForm.isValid()) {
            global.Msg({msg: 'Invalid Parameters'});
            scannerInputs.unmask();
            return;
        }
        let params = {
            IN_CCUST: '139',
            IN_TRANSTYPE: me.bean.transtype,
            IN_TDOC: me.bean.tdoc,
            IN_SMERCHID: me.bean.smerchid,
            ...scannerForm.getValues()
        };
        if (params.creditcard.at(0) !== '' && params.creditcard.at(1) !== '') {
            params.IN_SCARDN = `${params.creditcard.at(0)}%${params.creditcard.at(1)}%`;
        }
        console.log(params);
        if (!params.hasOwnProperty("IN_SCARDN") && (params.IN_TICKET === '' && params.IN_SPNR === '')) {
            global.Msg({msg: 'Invalid Parameters'});
            scannerInputs.unmask();
            return;
        }
        const forceScan = Ext.getCmp(prototype.idDE + '-chkForceBlock').getValue();
        const bpoStore = Ext.getCmp(prototype.idDE + '-gridBPO').getStore();
        const dataStore = bpoStore.getData().getRange();
        const res = await fetch(`${me.url}/loadScannerManual?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            let added = 0;
            let repeats = 0;
            data.response.forEach(obj => {
                let repetido = dataStore.some(d =>
                    d.data.ccia === obj.ccia &&
                            d.data.forma === obj.forma &&
                            d.data.serie === obj.serie
                );
                if (!repetido) {
                    if (obj.duplicates === 0) {
                        bpoStore.insert(0, obj);
                        added++;
                    } else if (obj.duplicates > 0 && forceScan) {
                        bpoStore.insert(0, obj);
                        added++;
                    } else {
                        repeats++;
                    }
                } else {
                    repeats++;
                }
            });
            Ext.getCmp(prototype.idDE + '-totTickets').setValue(bpoStore.getCount());
            Ext.getCmp(prototype.idDE + '-totAmount')
                    .setValue(Ext.util.Format.number(bpoStore.sum('svfops'), '0,000.00'));

            Ext.toast({
                html: `<b>${added} Tickets were added.<br> ${repeats} Repeated or blocked.</b>`,
                title: 'Notification',
                align: 't',
                closable: true,
                width: 300,
                timeout: 10000 // 10 segundos
            });
        }
        scannerInputs.unmask();
    },
    onAddDuplicated: async function () {
        /*
         const me = this;
         const scannerInputs = Ext.getCmp(prototype.idDE + '-scannerInputs');
         scannerInputs.setLoading(true);
         const scannerForm = Ext.getCmp(prototype.idDE + '-scannerForm').getForm();
         if (!scannerForm.isValid()) {
         global.Msg({msg: 'Invalid Parameters'});
         scannerInputs.setLoading(false);
         return;
         }
         let params = {
         IN_CCUST: '139',
         IN_TDOC: me.bean.tdoc,
         IN_TRANSTYPE: me.bean.transtype,
         IN_SMERCHID: me.bean.smerchid,
         IN_SCARDN: '',
         ...scannerForm.getValues()
         };
         console.log(params);
         
         if (!scannerForm.isValid()) {
         global.Msg({msg: 'Invalid Parameters'});
         scannerInputs.setLoading(false);
         return;
         }
         
         if (params.IN_TICKET === '' || params.IN_SDATE === '') {
         global.Msg({msg: 'Invalid Parameters'});
         scannerInputs.setLoading(false);
         return;
         }
         
         try {
         const res = await global.callStoreGet('PRAXISMP', 'SQP05062', params);
         
         if (res.lstRs.length > 0) {
         let tkt = res.lstRs.at(0).at(0);
         const {CCIA, FORMA, SERIE, TDOC, SEQ, TCORR} = tkt;
         const newWin = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.PagoDuplicadoDataEntry', {
         id: prototype.id + '-PagoDuplicadoDataEntry-2',
         ticket: {
         IN_CCUST: '139',
         IN_CIA: CCIA,
         IN_FORMA: FORMA,
         IN_SERIE: SERIE,
         IN_SEQ: SEQ,
         IN_CORRL: TCORR,
         IN_TDOCVTA: TDOC,
         IN_PRDA: me.bean.prda,
         IN_TDOC: me.bean.tdoc,
         IN_AREFNBR: me.bean.arefnbr
         },
         status: me.bean.stval,
         resetDataEntry: () => {
         me.afterRender();
         }
         });
         newWin.show();
         } else {
         global.Msg({msg: 'Not Found'});
         }
         } catch (e) {
         global.Msg({msg: 'Error'});
         } finally {
         scannerInputs.setLoading(false);
         }
         
         */
        const me = this;

        const newWin = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.PagoDuplicadoDataEntry', {
            id: prototype.id + '-PagoDuplicadoDataEntry-1',
            obj: me.bean,
            resetDataEntry: () => {
                me.afterRender();
            }
        });
        newWin.show();

    },
    onClickMSITracking: function () {
        const me = this;
        let params = {
            IN_CCUST: '139',
            IN_PRDA: me.bean.prda,
            IN_PROCTYPE: me.bean.proctype,
            IN_PROCTYPESQ: me.bean.proctypesq,
            IN_TGROSAMOUN: me.bean.tgrosamoun
        };
        if (me.bean.proctype === 'BANORTE00') {
            params.IN_SCARDN = `${me.bean.scardn.slice(0, 6)}%${me.bean.scardn.slice(-2)}%`;
        } else {
            params.IN_SCARDN = `${me.bean.scardn.slice(0, 6)}%${me.bean.scardn.slice(-4)}%`;
        }
        const dataEntryMSI = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.MSITrackingDataEntry', {
            id: prototype.idDE + '-MSITrackingDataEntry',
            searchParams: params,
            obj: me.bean,
            callback: () => {
                me.reloadErrorGrid();
            },
            reRender: () => {
                me.afterRender();
            }
        });
        dataEntryMSI.show();
    },
    onClickChbkTracking: function () {
        const me = this;
        let params = {
            IN_CCUST: '139',
            IN_TGROSAMOUN: me.bean.tgrosamoun
        };
        if (me.bean.proctype === 'BANORTE00') {
            params.IN_SCARDN = `${me.bean.scardn.slice(0, 6)}%${me.bean.scardn.slice(-2)}%`;
        } else {
            params.IN_SCARDN = `${me.bean.scardn.slice(0, 6)}%${me.bean.scardn.slice(-4)}%`;
        }
        const dataEntryCHBK = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.ChargebackTrackingDataEntry', {
            id: prototype.idDE + '-CHBKTrackingDataEntry',
            searchParams: params,
            obj: me.bean,
            callback: me.reloadErrorGrid,
            reRender: me.afterRender
        });
        dataEntryCHBK.show();
    },
    onShowUsages: function (grid, rowIndex, colIndex) {
        let obj = grid.getStore().getAt(rowIndex);
        const {ccia, forma, serie, seq, cpui,
            ruta0, ruta1, ruta2, ruta3, ruta4, stdoc} = obj.data;
        let fcpui = (cpui + '    ').slice(0, 4);
        let itin = (ruta0 + '   ').slice(0, 3) +
                (ruta1 + '   ').slice(0, 3) +
                (ruta2 + '   ').slice(0, 3) +
                (ruta3 + '   ').slice(0, 3) +
                (ruta4 + '   ').slice(0, 3);
        let params = {
            IN_CIA: ccia,
            IN_FORMA: forma,
            IN_SERIE: serie,
            IN_SEQ: seq,
            IN_CPUI: fcpui,
            IN_ITIN: itin
        };
        console.log(params);
        const usageWin = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.CouponsUsagesDataEntry', {
            id: prototype.idDE + '-CouponsUsagesDataEntry-1',
            searchParams: params,
            doctype: stdoc
        });
        usageWin.show();
    },
    onCenterDataEntry: function () {
        this.view.center();
    },
    onShowTransactionMatch: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const obj = record.data;
        const {tdoc} = this.bean;
        let params = {
            IN_CCUST: obj.ccust,
            IN_CIA: obj.ccia,
            IN_FORMA: obj.forma,
            IN_SERIE: obj.serie,
            IN_SEQ: obj.seq,
            IN_TDOC: tdoc,
            IN_CORRL: obj.tcorr
        };
        console.log('By Ticket Params: ', params);
        const dataEntry = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.TicketConciliationDataEntry', {
            id: prototype.id + '-TicketConciliationDataEntry-2',
            searchParams: params,
            obj: obj
        });
        dataEntry.show();
    },

    onChangeBalance: function () {
        const upd1 = Ext.getCmp(prototype.idDE + '-btn-update');
        const upd2 = Ext.getCmp(prototype.idDE + '-btn-update-balance');
        const scan1 = Ext.getCmp(prototype.idDE + '-scannerForm');
        const scan2 = Ext.getCmp(prototype.idDE + '-balanceScannerForm');
        const grid1 = Ext.getCmp(prototype.idDE + '-panelGrids1');
        const grid2 = Ext.getCmp(prototype.idDE + '-panelGrids2');
        if (grid2.isVisible()) {
            upd1.show();
            upd2.hide();
            scan1.show();
            scan2.hide();
            grid1.show();
            grid2.hide();
        } else {
            upd1.hide();
            upd2.show();
            scan1.hide();
            scan2.show();
            grid1.hide();
            grid2.show();
        }
    },
    onAddBalanceClick: async function () {
        const grid2 = Ext.getCmp(prototype.idDE + '-panelGrids2');
        const balances = Ext.getCmp(prototype.idDE + '-gridBalances');
        grid2.setLoading(true);
        const scan2 = Ext.getCmp(prototype.idDE + '-balanceScannerForm').getForm();
        try {
            const res = await global.callStoreGet('PRAXISMP', 'SQP05630', scan2.getValues());
            balances.setStore(new Ext.data.Store({data: res.lstRs.at(0)}));
        } catch (e) {
        } finally {
            grid2.setLoading(false);
        }
    },
    onUpdateBalanceClick: function () {

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
                            this.reconciliateBalance();
                        }
                    }
                });

    },
    reconciliateBalance: async function () {
        const me = this;
        me.view.setLoading(true);
        const balances = Ext.getCmp(prototype.idDE + '-gridBalances');
        let stval = Ext.getCmp(prototype.idDE + '-balanceConcilType').value;
        try {
            let data = balances.getStore().getData().items.map(x => ({...x.data}));
            const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', data);
            let params = {
                IN_CCUST: me.bean.ccust,
                IN_PRDA: me.bean.prda,
                IN_TDOC: me.bean.tdoc,
                IN_AREFNBR: me.bean.arefnbr,
                IN_STVAL: stval,
                IN_CUUID: tmp.cuuid,
                IN_FUUID: tmp.fuuid
            };
            await global.callStorePost('PRAXISMP', 'SQP05627', params);

        } catch (e) {
            console.error(e);
            global.Msg({msg: 'Error on Reconcile'});
        } finally {
            me.view.setLoading(false);
            me.reloadErrorGrid();
            me.getData();
        }

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
        const gridDesglose = Ext.getCmp(prototype.idDE + '-gridDesglose');
        const gridDesgloseCHBK = Ext.getCmp(prototype.idDE + '-gridDesgloseCHBK');
        if (me.bean.transtype === 'CHBK') {
            gridDesglose.hide();
            gridDesgloseCHBK.show();
            const res = await fetch(`${me.url}/loadErrorTransactionBPODesgloseCHBK?${new URLSearchParams(params)}`);
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                const storeDesglose = Ext.create('Ext.data.Store', {
                    data: data.response
                });
                gridDesgloseCHBK.setStore(storeDesglose);
                const qtyc = Ext.getCmp(prototype.idDE + '-totDCTickets');
                const amtc = Ext.getCmp(prototype.idDE + '-totDCAmount');
                qtyc.setValue(data.response.length);
                amtc.setValue(Ext.util.Format.number(storeDesglose.sum('vfop'), '0,000.00'));
            }
        } else {
            gridDesglose.show();
            gridDesgloseCHBK.hide();
            const res = await fetch(`${me.url}/loadErrorTransactionBPODesglose?${new URLSearchParams(params)}`);
            if (res.ok) {
                const data = await res.json();
                const storeDesglose = Ext.create('Ext.data.Store', {
                    data: data.response
                });
                gridDesglose.setStore(storeDesglose);
                const qty = Ext.getCmp(prototype.idDE + '-totDTickets');
                const amt = Ext.getCmp(prototype.idDE + '-totDAmount');
                qty.setValue(data.response.length);
                amt.setValue(Ext.util.Format.number(storeDesglose.sum('svfops'), '0,000.00'));
            }
        }
        panelScan.unmask();
    },
    reloadErrorGrid: function () {
        let callback = this.view.callback;
        if (callback) {
            callback();
        }
    },
    cleanGridBPO: function (btn) {
        const gridBPO = Ext.getCmp(prototype.idDE + '-gridBPO').getStore();
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to remove all records?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            gridBPO.removeAll();
                            Ext.getCmp(prototype.idDE + '-totTickets').setValue('0');
                            Ext.getCmp(prototype.idDE + '-totAmount').setValue('0.00');
                        }
                    }
                });
    },
    onFilterBPOGrid: async function () {
        const obj = this.bean;
        const grid = Ext.getCmp(prototype.idDE + '-gridBPO');
        grid.getView().mask('Loading...');
        const data = grid.getStore().getData().items;
        if (data.length === 0) {
            global.Msg({msg: 'No data in Scanner'});
            grid.getView().unmask();
            return;
        }
        const existeMonto = data.some(x =>
            x.data.tgrosamoun === obj.tgrosamoun);
        const existeAutorizacion = data.some(x =>
            x.data.sauthoc === obj.sauthoc);

        let foundRegis = {};

        if (existeMonto) {
            foundRegis = grid.getStore().queryBy(function (registro) {
                return registro.get('tgrosamoun') === obj.tgrosamoun;
            });
            grid.getStore().removeAll();
            foundRegis.items.forEach(x => {
                grid.getStore().add(x);
            });
            let amt = grid.getStore().sum('svfops');
            Ext.getCmp(prototype.idDE + '-totTickets').setValue(foundRegis.items.length);
            Ext.getCmp(prototype.idDE + '-totAmount').setValue(Ext.util.Format.number(amt, '0,000.00'));
        } else if (existeAutorizacion && !existeMonto) {
            foundRegis = grid.getStore().queryBy(function (registro) {
                return registro.get('sauthoc') === obj.sauthoc;
            });
            grid.getStore().removeAll();
            foundRegis.items.forEach(x => {
                grid.getStore().add(x);
            });
            let amt = grid.getStore().sum('svfops');
            Ext.getCmp(prototype.idDE + '-totTickets').setValue(foundRegis.items.length);
            Ext.getCmp(prototype.idDE + '-totAmount').setValue(Ext.util.Format.number(amt, '0,000.00'));
        } else {
            global.Msg({msg: 'Not found'});
        }
        grid.getView().unmask();
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Formateo de Parametros">
    formatParameters: function (obj) {
        let params = {
            IN_CCUST: '139',
            IN_PRDA: obj.prda,
            IN_TDOC: obj.tdoc,
            IN_AREFNBR: obj.arefnbr
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
        //Se agrego fecha de pago como opcional si no existe fecha de venta
        let fecha = obj.sdate.trim() === '' ? obj.paydate : obj.sdate;
        const [inicio, fin] = me.getFechaRango(fecha);
        let params = {
            IN_CCUST: obj.ccust,
            IN_SCARDN: scardn,
            IN_DATE: fecha,
            IN_DATE_F: inicio,
            IN_DATE_T: fin,
            IN_SMERCHID: obj.smerchid,
            IN_SPNR: obj.spnr,
            IN_TDOC: obj.tdoc,
            IN_TRANSTYPE: obj.transtype,
            IN_PROCTYPE: obj.proctype,
            IN_PROCTYPESQ: obj.proctypesq,
            IN_TICKET: obj.ticket
        };
        return params;
    },
    formatScanSbParams: function (obj) {
        let params = {
            IN_CCUST: obj.ccust,
            IN_PRDA: obj.prda,
            IN_AREFNBR: obj.arefnbr,
            IN_TDOC: obj.tdoc,
            IN_TRANSTYPE: obj.transtype
        };
        return params;
    },
    formatDesgloseParams: function (obj) {
        let params = {
            IN_CCUST: obj.ccust,
            IN_TDOC: obj.tdoc,
            IN_PRDA: obj.prda,
            IN_AREFNBR: obj.arefnbr
        };
        console.log('Desglose: ', params);
        return params;
    },
    formatStandByParams: function (obj, comment) {
        const me = this;
        const gridBPO = Ext.getCmp(prototype.idDE + '-gridBPO').getStore();
        const adju = Ext.getCmp(prototype.idDE + '-addStandByAdju').getValue();
        const details = [...gridBPO.data.items.map(x => me.requestObjectPX(x.data))]
                .map(x => ({
                        CCUST: 139,
                        AREFNBR: obj.arefnbr,
                        PRDA: obj.prda,
                        TDOC: obj.tdoc,
                        ...x
                    }));
        let params = {
            IN_CCUST: obj.ccust,
            IN_PRDA: obj.prda,
            IN_TDOC: obj.tdoc,
            IN_AREFNBR: obj.arefnbr,
            IN_PROCTYPE: obj.proctype,
            IN_PROCTYPESQ: obj.proctypesq,
            IN_OBSERV: comment,
            IN_ADJU: adju ? 'Y' : '',
            detail: details
        };
        return params;
    },
    formatUpdateParams: function () {
        const me = this;
        const obj = me.bean;
        //grillas conciliacion
        const gridBPO = Ext.getCmp(prototype.idDE + '-gridBPO').getStore();
        const gridADJU = Ext.getCmp(prototype.idDE + '-gridAdjustments').getStore();

        const codADJU = (Ext.getCmp(prototype.idDE + '-codAdjustment').getValue() || '').trim();
        const observADJU = Ext.getCmp(prototype.idDE + '-observAdjustment').getValue();
        //diferencia conciliacion manual
        const sumScanner = parseFloat(gridBPO.sum('svfops').toFixed(2));
        const sumAdju = parseFloat(gridADJU.sum('svfops').toFixed(2));
        const sumDesglose = parseFloat((sumScanner + sumAdju).toFixed(2));
        const totalGross = parseFloat(obj.tgrosamoun.toFixed(2));
        console.log('Suma Desglose BPO: ', sumDesglose);
        let difference = 0;
        if (me.bean.transtype === 'CHBK') {
            //suma en caso de ser Chargeback
            difference = totalGross + sumDesglose;
        } else {
            difference = totalGross - sumDesglose;
        }
        console.log('Total Difference: ', difference);

        let cerror = '';
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
                        AREFNBR: obj.arefnbr,
                        PROCTYPE: obj.proctype,
                        PROCTYPESQ: obj.proctypesq,
                        FORCESCAN: '0',
                        FREGLA: '4',
                        OBSERV: observADJU,
                        CERROR: x.STMANUAL === 'Adjustment' ? codADJU : obj.cerror,
                        NBRLIQUID: obj.nbrliquid,
                        CODCHGBACK: obj.codchgback,
                        CHGBNUM: obj.chgbnum,
                        ...x
                    })).map(o => {
            //nueva validacion de fuente
            o.FUENTE = o.FUENTE === 'ASR' ? 'S' : o.FUENTE.slice(0, 1);
            if (o.STMANUAL === 'Adjustment' && o.CERROR === '03') {
                o.TRNCU = o.TRNCO || '';
            }
            o.TDOC = obj.tdoc;
            if (o.STMANUAL !== 'Adjustment' && o.TDOC !== o.TDOCO) {
                o.CERROR === '79';
                cerror = '79';
            }
            return o;
        });
        const conteo_void = details.filter(x => x.FVOID === 'V').length;
        //console.log(conteo_void);

        const params = me.requestObjectSP(me.bean);
        params.IN_CERROR = cerror;
        params.difference = difference;
        params.ajustes = gridADJU.data.items.length;
        params.detail = details;
        //clona ticket
        if (details.length > 0) {
            const first = details.at(0);
            if (params.IN_TICKET === '' || params.IN_SPNR === '') {
                params.IN_TICKET = first.CCIA + first.FORMA + first.SERIE;
                params.IN_SPNR = first.SPNR;
                params.IN_SEQ = first.CORRL;
            } else if (params.IN_TICKET.substring(0, 3) === '000') {
                params.IN_TICKET = first.CCIA + first.FORMA + first.SERIE;
                params.IN_SPNR = first.SPNR;
                params.IN_SEQ = first.CORRL;
            }
        }
        console.log('Datos de PNR y Ticket: ', params.IN_SPNR, '-', params.IN_TICKET);
        params.IN_CODADJU = codADJU;
        params.IN_FVOID = conteo_void > 0 ? 'V' : '';
        params.IN_QTYTKT = details.length;
        params.IN_SVFOPS = sumDesglose;
        params.IN_FDESGLOSE = 'M';
        params.IN_FADM = codADJU === '03' ? 'Y' : '';
        console.log(params);
        return params;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    onCancelClick: function () {
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


