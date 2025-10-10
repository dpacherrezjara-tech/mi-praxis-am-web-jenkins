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
            const tabGroupPlus = Ext.getCmp(prototype.idPlus + '-tabBlocked');

            const gridBPO = Ext.getCmp(prototype.idPlus + '-gridBPO');            
            const gridBlocked = Ext.getCmp(prototype.idPlus + '-gridBlocked');
            const gridMatch = Ext.getCmp(prototype.idPlus + '-gridMatch');
            const gridGroupPlus = Ext.getCmp(prototype.idPlus + '-gridBlocked');
            
            tabMain.mask('Scanning...');

            const dataBPO = lstRs.at(1) ;
            const dataBlocked = lstRs.at(2) ;
            const dataMatch = lstRs.at(3) ;
            const dataGroupPlus = lstRs.at(4);

            
            // Procesar y mostrar datos en todas las grillas y totales
            
            // --- BPO ---
            if (lstVals.OUT_ADD_BPO == 1) {
                this.setGridAndSummary({
                    grid: gridBPO,
                    data: dataBPO,
                    quantityElementTktId: prototype.idPlus + '-totBPOTickets',
                    amountElementTktId: prototype.idPlus + '-totBPOAmount',
                    amountFieldOfSummary: 'A4501VFOP'
                });
            }

            // --- BLOCKED ---
            if (lstVals.OUT_BLOCKED == 1) {
                this.setGridAndSummary({
                    grid: gridBlocked,
                    data: dataBlocked,
                    quantityElementTktId: prototype.idPlus + '-totBlockedTickets',
                    amountElementTktId: prototype.idPlus + '-totBlockedAmount',
                    amountFieldOfSummary: 'A4501VFOP'
                });
            }

            // --- MATCH ---
            if (lstVals.OUT_MATCH == 1) {
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
            if (lstVals.OUT_GROUP == 1) {
                this.setGridAndSummary({
                    grid: gridGroupPlus,
                    data: dataGroupPlus,
                    quantityElementTktId: prototype.idPlus + '-totGroupPlusTickets',
                    amountElementTktId: prototype.idPlus + '-totGroupPlusAmount',
                    amountFieldOfSummary: 'AMOUNTOFF'
                });
            }

            tabMain.unmask();
            
// OUT_ADD_BPO
// OUT_BLOCKED
// OUT_MATCH
// OUT_GROUP
            
            
        }
        else {
            global.Msg({msg: 'Not found'});
        }

//            const data = await res.json();
//            const form = Ext.getCmp(prototype.idPlus + '-informationForm').getForm();
//            me.limpiaObjetoPX(data.response);
//            me.bean = data.response;
//            me.dataInfo = data.response;
//            form.reset();
//            form.setValues(me.bean);
//            me.changePerspective();
        
    },
    
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onCancelClick: function () {
        this.view.close();
    },
    onUpdateClick: async function () {

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
        const addedCount = 0 ;

        console.log('params',params);
        // search
        const res = await global.callStoreGet('PRAXISMP', 'SQP05748', params);
         
        const { lstRs } = res;
        if ( lstRs.length > 0 ) {
            const data = lstRs.at(0);
            // Añadir la data que no esta en la grilla de dataStore, diferenciando por el número de ticket (campo 'TICKET')
            // data: la data nueva (objeto), dataStore: array de los existentes en la grilla

            // Primero, obtener todos los números de ticket que ya existen en la grilla
            const existingTickets = new Set(dataStore.map(item => item.TICKET));
             
            // Filtrar solo los tickets que no están en la grilla
            // Filtrar solo los tickets que no están en la grilla (por TICKET)
            const toAdd = data.filter(item => {
                // Normalizar el ticket a string y trim
                const tkt = (item.TICKET || '').toString().trim();
                return !existingTickets.has(tkt);
            });
            
            // Agregar al store solo los nuevos elementos
            if (toAdd.length > 0) {
                bpoStore.add(toAdd);
            }

            // Puedes contar cuantos se agregan así:
            addedCount = toAdd.length;
            console.log(`Tickets agregados: ${addedCount}`, toAdd);

            // Actualiza los totales de la grilla BPO después de agregar
            this.setGridAndSummary({
                grid: gridBPO,
                data: bpoStore, // bpoStore.getData().getRange(),
                quantityElementTktId: prototype.idPlus + '-totBPOTickets',
                amountElementTktId: prototype.idPlus + '-totBPOAmount',
                amountFieldOfSummary: 'A4501VFOP'
            });
        }
        
        global.Msg({msg: `Se agregaron ${addedCount} ticket(s).`});

        me.view.setLoading(false);

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
        const dataBPO = gridBPO.getStore().getData().getRange();
        this.setGridAndSummary({
            grid: gridBPO,
            data: dataBPO,
            quantityElementTktId: prototype.idPlus + '-totBPOTickets',
            amountElementTktId: prototype.idPlus + '-totBPOAmount',
            amountFieldOfSummary: 'A4501VFOP'
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

        if (grid && data) {
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