Ext.define('Ext.Praxis.controller.payments.SalesComplement.PlusgradeReconciliationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PlusgradeReconciliationController',
    dataHeader: {},
    init: function (view) {
    },
    afterRender: async function () {
        const me = this;
        me.view.setLoading(true);
        await this.getData();
        me.view.setLoading(false);
    },
    getData: async function () {
        const me = this;
        let params = me.formatParameters(me.view.obj);
        
        me.view.setLoading(true);

        try{
                
            console.log('params',params);
            const res = await global.callStoreGet('PRAXISMP', 'SQP05746', params);
            
            const { lstVals, lstRs } = res;

            if (lstRs.length > 0) {

                const data = res.lstRs.at(0);
                const form = Ext.getCmp(prototype.idPlus + '-informationForm').getForm();
                me.dataHeader = me.cleanDataSpaces(data.at(0));
                form.setValues(me.dataHeader);
                
                const tabMain = Ext.getCmp(prototype.idPlus + '-tabMain');
                const tabBPO = Ext.getCmp(prototype.idPlus + '-tabBPO');
                const tabBlocked = Ext.getCmp(prototype.idPlus + '-tabBlocked');
                const tabMatch = Ext.getCmp(prototype.idPlus + '-tabMatch');
                const tabGroupPlusgrade = Ext.getCmp(prototype.idPlus + '-tabGroupPlusgrade');

                const gridBPO = Ext.getCmp(prototype.idPlus + '-gridBPO');            
                const gridBlocked = Ext.getCmp(prototype.idPlus + '-gridBlocked');
                const gridMatch = Ext.getCmp(prototype.idPlus + '-gridMatch');
                const gridGroupPlusgrade = Ext.getCmp(prototype.idPlus + '-gridGroupPlusgrade');
                
                const scannerInputs = Ext.getCmp(prototype.idPlus + '-scannerInputs');
                const buttonUpdate = Ext.getCmp(prototype.idPlus + '-btnUpdate');
                const buttonReverse = Ext.getCmp(prototype.idPlus + '-btnReverse');

                const dataBPO = lstRs.at(1) ;
                const dataBlocked = lstRs.at(2) ;
                const dataMatch = lstRs.at(3) ;
                const dataGroupPlusgrade = lstRs.at(4);

                
                // hidden and enable
                const { OUT_ACTIVE_ADD_BPO , OUT_ACTIVE_BLOCKED , OUT_ACTIVE_MATCH , OUT_ACTIVE_GROUP , OUT_ACTIVE_SCANNER, OUT_ACTIVE_UPDATE ,OUT_ACTIVE_REVERSE } = lstVals;

                tabBPO.setDisabled(!OUT_ACTIVE_ADD_BPO);            // 0 is false =>  setDiabled ( ! false )  -> setDiabled ( true ) 
                tabBlocked.setDisabled(!OUT_ACTIVE_BLOCKED);
                tabMatch.setDisabled(!OUT_ACTIVE_MATCH);
                tabGroupPlusgrade.setDisabled(!OUT_ACTIVE_GROUP);
                scannerInputs.setVisible(!!OUT_ACTIVE_SCANNER);     // 0 is false =>  setVisible ( !! false ) -> setVisible ( false )
                buttonUpdate.setVisible(!!OUT_ACTIVE_UPDATE);
                buttonReverse.setVisible(!!OUT_ACTIVE_REVERSE);
                

                // --- BPO ---
                if (OUT_ACTIVE_ADD_BPO == 1) {
                    tabMain.setActiveTab('A');
                    this.setGridAndSummary({
                        grid: gridBPO,
                        data: dataBPO,
                        quantityElementTktId: prototype.idPlus + '-totBPOTickets',
                        amountElementTktId: prototype.idPlus + '-totBPOAmount',
                        amountFieldOfSummary: 'A4501VFOP'
                    });
                }

                // --- BLOCKED ---
                if (OUT_ACTIVE_BLOCKED == 1) {
                    this.setGridAndSummary({
                        grid: gridBlocked,
                        data: dataBlocked,
                        quantityElementTktId: prototype.idPlus + '-totBlockedTickets',
                        amountElementTktId: prototype.idPlus + '-totBlockedAmount',
                        amountFieldOfSummary: 'A4501VFOP'
                    });
                }

                // --- MATCH ---
                if (OUT_ACTIVE_MATCH == 1) {
                    tabMain.setActiveTab('M');
                    this.setGridAndSummary({
                        grid: gridMatch,
                        data: dataMatch,
                        quantityElementTktId: prototype.idPlus + '-totalMatchTickets',
                        amountElementTktId: prototype.idPlus + '-totalMachAmount',
                        amountFieldOfSummary: 'SVFOP'
                    });
                }

                // --- GROUP PLUS ---
                if (OUT_ACTIVE_GROUP == 1) {
                    this.setGridAndSummary({
                        grid: gridGroupPlusgrade,
                        data: dataGroupPlusgrade,
                        quantityElementTktId: prototype.idPlus + '-totGroupPlusgradeTickets',
                        amountElementTktId: prototype.idPlus + '-totGroupPlusgradeAmount',
                        amountFieldOfSummary: 'SVFOPS'
                    });
                }

                
            }
            else {
                global.Msg({msg: 'Not found'});
            }
        } catch (e) {
            notifier.alert('System Error');
        } finally {
            me.view.setLoading(false);
        }
    },
    reverseTransaction: async function () {
        const me = this;
        let success = false;
        let message = "" ;
        let notifier = new AWN();

        me.view.setLoading(true);

        try{
                
            let params = {
                IN_CCUST: 139,
                IN_PLUSGRAID: me.view.obj.PLUSGRAID.trim(),
                IN_PRDA: me.view.obj.PRDA.trim()
            };
            
            console.log('params',params);
            const res = await global.callStoreGet('PRAXISMP', 'SQP05749', params);
            
            success = res.lstVals.IO_RESPONSE === 1 ;
            message = res.lstVals.IO_MESSAGE ;
                
            if ( success ) {
                notifier.success(message);

                // Load search
                await this.getData();

            }else{
                notifier.warning('Error: ' + message);        
            }

        } catch (e) {
            notifier.alert('System Error');
        } finally {
            me.view.setLoading(false);
        }

    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onCancelClick: function () {
        this.view.close();
    },
    onClickUpdate: async function () {

        const me = this;
        let success = false;
        let message = "" ;
        let notifier = new AWN();
        
        me.view.setLoading(true);

        try{
            // Obtener los valores del formulario/data entry
            const form = me.getView().down('form').getForm();
            const values = form.getValues();
            const cleanValues = me.cleanDataSpaces(values);

            // Obtener la grilla de tickets y los datos de los tickets
            const gridTickets = Ext.getCmp(prototype.idPlus + '-gridBPO');
            const storeTickets = gridTickets ? gridTickets.getStore().getData().items : null;
            const tickets = storeTickets ? storeTickets.map(x => ({
                            ...x.data
                        })) : [];

            // Validar que haya tickets para procesar
            if (tickets.length === 0 ) {
                Ext.Msg.alert('Advertencia', 'Debe agregar al menos un ticket para conciliar.');
                return;
            }

            const tmp = await global.loadRecordsOnTable('PRAXISMP', 'XTEMPO', tickets);
            console.log('tmp', tmp);

            // params para procesar match
            const params = {
                IN_CCUST: '139',
                IN_PLUSGRAID: cleanValues.PLUSGRAID || '',
                IN_PRDA: cleanValues.PRDA || '',
                IN_CUUID: tmp.cuuid || '',
                IN_FUUID: tmp.fuuid || ''
            };

            console.log('params',params);

            const res = await global.callStorePost('PRAXISMP', 'SQP05747', params);
            console.log(res);
            
            success = res.data.lstVals.IO_RESPONSE === 1 ;
            message = res.data.lstVals.IO_MESSAGE ;
            
            if ( success ) {
                notifier.success(message);
            }else{
                notifier.warning('Error: ' + message);        
            }
            
            // Load search
            await this.getData();

        } catch (e) {
            notifier.alert('System Error');
        } finally {
            me.view.setLoading(false);
        }

    },
    onClickReverseMatch: async function (btn) {
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
    onClickAddTicketsSearch: async function (){
        const me = this;
        const scannerInputs = Ext.getCmp(prototype.idPlus + '-scannerInputs');
        me.view.setLoading(true);
        const scannerForm = Ext.getCmp(prototype.idPlus + '-scannerForm').getForm();
        if (!scannerForm.isValid()) {
            global.Msg({msg: 'Invalid Parameters'});
            me.view.setLoading(false);
            return;
        }
        let params = {
            IN_CCUST: '139',
            ...scannerForm.getValues()
        };
        if (params.IN_TICKET === '' && params.IN_SPNR === '') {
            global.Msg({msg: 'Invalid Parameters'});
            me.view.setLoading(false);
            return;
        }

        // data BPO
        const gridBPO = Ext.getCmp(prototype.idPlus + '-gridBPO');
        const bpoStore = gridBPO.getStore();
        const dataStore = bpoStore.getData().getRange();
        let added = 0;
        let repeats = 0;
        
        // search
        const res = await global.callStoreGet('PRAXISMP', 'SQP05748', params);
         
        const { lstRs } = res;
        if ( lstRs.length > 0 ) {
            const data = lstRs.at(0);
            
            data.forEach(item => {
                const tkt = (item.TICKET || '').toString().trim();
                let isRepeat = dataStore.some( d => d.data.TICKET === tkt );
                if (isRepeat) {
                    console.log("repeat :",item);
                    repeats++;
                } else {
                    console.log("new :",item);
                    bpoStore.insert(0, item);
                    added++;
                }
            });
            console.log(`Tickets agregados: ${added}`);

            // Actualiza los totales de la grilla BPO después de agregar
            this.setGridAndSummary({
                grid: gridBPO,
                data: bpoStore, // bpoStore.getData().getRange(),
                quantityElementTktId: prototype.idPlus + '-totBPOTickets',
                amountElementTktId: prototype.idPlus + '-totBPOAmount',
                amountFieldOfSummary: 'A4501VFOP'
            });
        }
        
        global.Msg({msg: `Se agregaron ${added} ticket(s).`});

        me.view.setLoading(false);

    },
    onclickReloadGridSuggestAndBlocked: async function () {
        const me = this;
        const tabMain = Ext.getCmp(prototype.idPlus + '-tabMain');
        const gridBPO = Ext.getCmp(prototype.idPlus + '-gridBPO');
        const gridBlocked = Ext.getCmp(prototype.idPlus + '-gridBlocked');

        tabMain.mask('Scanning...');

        try {

            let params = me.formatParameters(me.view.obj);
            
            const res = await global.callStoreGet('PRAXISMP', 'SQP05750', params);
            
            const { lstRs } = res;

            if (lstRs.length > 0) {
                
                const dataBPO = lstRs.at(0) ;
                const dataBlocked = lstRs.at(1) ;
                
                // --- BPO ---
                this.setGridAndSummary({
                    grid: gridBPO,
                    data: dataBPO,
                    quantityElementTktId: prototype.idPlus + '-totBPOTickets',
                    amountElementTktId: prototype.idPlus + '-totBPOAmount',
                    amountFieldOfSummary: 'A4501VFOP'
                });

                // --- BLOCKED ---
                this.setGridAndSummary({
                    grid: gridBlocked,
                    data: dataBlocked,
                    quantityElementTktId: prototype.idPlus + '-totBlockedTickets',
                    amountElementTktId: prototype.idPlus + '-totBlockedAmount',
                    amountFieldOfSummary: 'A4501VFOP'
                });

            }
            else {
                global.Msg({msg: 'Not found'});
            }

        } catch (e) {
            notifier.alert('System Error');
        } finally {
            tabMain.unmask();
        }
    },
    onClickClearScannerInputs: async function (){
        const scannerForm = Ext.getCmp(prototype.idPlus + '-scannerForm').getForm();
        scannerForm.reset();
    },
    onDeleteRecordBPO: function (grid, rowIndex, colIndex) {
        let registro = grid.getStore().getAt(rowIndex);
        if (registro) {
            grid.getStore().remove(registro);
        }
        
        const gridBPO = Ext.getCmp(prototype.idPlus + '-gridBPO');
        const dataBPO = gridBPO.getStore().getData().getRange().map(record => record.getData());
        
        this.setGridAndSummary({
            grid: gridBPO,
            data: dataBPO,
            quantityElementTktId: prototype.idPlus + '-totBPOTickets',
            amountElementTktId: prototype.idPlus + '-totBPOAmount',
            amountFieldOfSummary: 'A4501VFOP'
        });
    },
    onClickcleanGridBPO: function (btn) {
        const gridBPO = Ext.getCmp(prototype.idPlus + '-gridBPO').getStore();
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
                            this.setGridAndSummary({
                                grid: gridBPO,
                                data: [],
                                quantityElementTktId: prototype.idPlus + '-totBPOTickets',
                                amountElementTktId: prototype.idPlus + '-totBPOAmount',
                                amountFieldOfSummary: 'A4501VFOP'
                            });
                        }
                    }
                });
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Utils">
    cleanDataSpaces: function (data) {
        let cleanData = {};
        Ext.Object.each(data, function (key, val) {
            cleanData[key] = Ext.isString(val) ? val.trim() : val;
        });
        return cleanData ;
    },
    // function to set grid data and totals
    setGridAndSummary(config) {
        const {
            grid,
            data,
            quantityElementTktId,
            amountElementTktId,
            amountFieldOfSummary,
            show = true,
            format = '0,000.00'
        } = config;

        if (grid && data && data.length > 0) {
            grid.setStore(data);
            if (show && typeof grid.show === 'function') grid.show();
        }

        const qtyCmp = Ext.getCmp(quantityElementTktId);
        const amtCmp = Ext.getCmp(amountElementTktId);
        
        console.log(config)
        console.log(qtyCmp)
        console.log(amtCmp)

        let totalTickets = Array.isArray(data) ? data.length : 0;
        let totalAmount = Array.isArray(data)
            ? data.reduce((acc, item) => acc + (parseFloat(item[amountFieldOfSummary]) || 0), 0)
            : 0;

        if (qtyCmp) qtyCmp.setValue(totalTickets);
        if (amtCmp) amtCmp.setValue(Ext.util.Format.number(totalAmount, format));
    },
    formatParameters : function (obj) {
        let params = {
            IN_CCUST: '139',
            IN_PLUSGRAID: obj.PLUSGRAID.trim(),
            IN_TICKET: obj.EMDNUMBER.trim(),
            IN_PNR: obj.PNR.trim(),
            IN_SDATE: obj.SDATE.trim()
        };
        return params;
    },
    //</editor-fold>
});