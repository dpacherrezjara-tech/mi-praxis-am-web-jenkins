Ext.define('Ext.Praxis.controller.salesaudit.TaxesExceptions.TaxesExceptionsDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaxesExceptionsDataEntryController',
    taxes: [],
    exTaxes: [],
    selectedTickets: [],
    activeChanges: false,
    isNewTicket: false,
    afterRender: function () {
        this.loadForm();
    },
    loadForm: async function(){
        const me = this;
        const panelTktFilter = Ext.getCmp(prototype.idDE + 'panelTicketFilter');
        const gridTickets =  Ext.getCmp(prototype.idDE + '-tabTickets');
        const tabPending = Ext.getCmp(prototype.idDE + '-tabPending');
        const tabLoaded = Ext.getCmp(prototype.idDE + '-tabLoaded');
        const taxFilters =  Ext.getCmp(prototype.idDE + '-taxFilters');
        const gridTaxes =  Ext.getCmp(prototype.idDE + '-gridTaxes');
//        const btnUpdate = Ext.getCmp(prototype.idDE + '-btn-update');
//        const btnDelete = Ext.getCmp(prototype.idDE + '-btn-delete');
        const btnExceptTkt = Ext.getCmp(prototype.idDE + '-exceptTkt');
        const btnDeleteTkt = Ext.getCmp(prototype.idDE + '-deleteTkt');
        const controlData = Ext.getCmp(prototype.idDE + '-fsControlData');
        if(me.view.option==='U'){
            tabPending.setTitle('Loaded Tickets');
            tabLoaded.tab.hide();
            panelTktFilter.hide();
            gridTickets.show();
            taxFilters.show();
            gridTaxes.show();
//            btnUpdate.show();
//            btnDelete.show();
            btnExceptTkt.hide();
            btnDeleteTkt.hide();
            controlData.show();
            me.loadTicketInformation();
            me.isNewTicket = false;
        }else{
            panelTktFilter.show();
            gridTickets.hide();
            taxFilters.hide();
            gridTaxes.hide();
//            btnUpdate.hide();
//            btnDelete.hide();
            btnExceptTkt.show();
            btnDeleteTkt.show();
            controlData.hide();
            me.isNewTicket = true;
        }
        me.loadActiveChangesTaxException();
    },
    loadTicketInformation: async function(){
        const me = this;
        const gridTkt = Ext.getCmp(prototype.idDE + '-gridTickets');
        const gridTax = Ext.getCmp(prototype.idDE + '-gridTaxes');
        const controlData = Ext.getCmp(prototype.idDE + '-formControlData');
        gridTkt.setLoading(true);
        gridTax.setLoading(true);
        const {CCUST,CCIA,FORMA,SERIE,SEQ,TRNCU} = me.view.obj;
        let params = {
            IN_CCUST:CCUST,
            IN_CCIA: CCIA,
            IN_FORMA: FORMA,
            IN_SERIE: SERIE,
            IN_SEQ: SEQ,
            IN_TRNCU: TRNCU
        };
        try {
            const res = await global.callStoreGet('PXSAUDIT', 'SQP05584', params);
            console.log(res);
            if (res.lstRs.length > 0) {
                me.selectedTickets = res.lstRs.at(0);
                let store = new Ext.data.Store({
                    data: res.lstRs.at(0)
                });
                gridTkt.setStore(store);
                controlData.getForm().setValues(me.selectedTickets.at(0));
                
                me.exTaxes = res.lstRs.at(1);
                let storeTax = new Ext.data.Store({
                    data: res.lstRs.at(1)
                });
                gridTax.setStore(storeTax);
                
                me.activeChanges = res.lstRs[0]?.[0].ACTIVE_CHANGE === 1;
                me.loadActiveChangesTaxException();
                
            }
        } catch (e) {
            console.error(e);
        } finally {
            gridTkt.setLoading(false);
            gridTax.setLoading(false);
        }
    },
    onAddTicket: async function () {
        const form = Ext.getCmp(prototype.idDE + '-ticketFilters').getForm();
        const tabTickets = Ext.getCmp(prototype.idDE + '-tabTickets');
        const gridPending = Ext.getCmp(prototype.idDE + '-gridTickets');
        const gridLoaded = Ext.getCmp(prototype.idDE + '-gridTicketsLoaded');
        let notifier = new AWN();
        let params = form.getValues();
        const me = this;
        me.activeChanges = false;

        if (params.IN_TICKET === '' && params.IN_SPNR === '') {
            global.Msg({msg: 'Parameters Error'});
            return;
        }

        tabTickets.show();
        tabTickets.setLoading(true);
        try {
            const res = await global.callStoreGet('PXSAUDIT', 'SQP05585', params);
            if (res.lstRs.length > 0) {
                const data = res.lstRs.at(0);
                const pending = data.filter(x=>x.QTYLOADS === 0);
                let storePending = new Ext.data.Store({
                    data: pending
                });
                gridPending.setStore(storePending);
                const loaded = data.filter(x=>x.QTYLOADS > 0);
                let storeLoaded = new Ext.data.Store({
                    data: loaded
                });
                gridLoaded.setStore(storeLoaded);
//                notifier.success('Tickets to Add: ' + pending.length);
                
                if (pending.length > 0 ){
                    const btnUpdate = Ext.getCmp(prototype.idDE + '-btn-update');
                    btnUpdate.show();
                    me.activeChanges = true ;
                    notifier.success('Tickets added succesfly: ' + pending.length);
                }
                if (loaded.length > 0) {
                    notifier.warning('Tickets are already added: ' + loaded.length);
                }
                
                if ( pending.length === 0 && loaded.length === 0 ){
                    notifier.alert('Tickets not found');
                }
                
                this.selectedTickets = pending;
            }else{
                notifier.alert('Tickets not found');
            }
        } catch (e) {
            console.error(e);
            notifier.alert('Error on load Tickets');
        } finally {
            tabTickets.setLoading(false);
            me.loadActiveChangesTaxException();
        }
    },
    onExceptTax: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const filters = Ext.getCmp(prototype.idDE + '-taxFilters');
        filters.getForm().reset();
        filters.show();
        /*
        let lst = Ext.getCmp(prototype.idDE + '-gridTickets').getStore().getData().items;
        this.selectedTickets = lst.map(x => ({...x.data}));*/
        console.log(this.selectedTickets);
        this.exTaxes = [];
    },
    onChangeTax: function (field, newValue, oldValue, eOpts) {
        const upper = newValue.toUpperCase();
        field.setValue(upper);
        const me = this;
        const taxName = Ext.getCmp(prototype.idDE + '-taxName');
        let lstTaxes = me.view.taxes.filter(x => x.CODE === upper);
        if (lstTaxes.length > 0) {
            taxName.setValue(lstTaxes.at(0).NAME);
            taxName.setFieldStyle('text-align:center;background:#95cf6f;');
        } else {
            taxName.setValue('Tax Not Found');
            taxName.setFieldStyle('text-align:center;background:#e75a5a;');
        }
    },
    onAddTax: function () {
        const me = this;
        const form = Ext.getCmp(prototype.idDE + '-taxFilters').getForm();
        const grid = Ext.getCmp(prototype.idDE + '-gridTaxes');
        const btnUpdate = Ext.getCmp(prototype.idDE + '-btn-update');
        if (form.isValid()) {

            let params = form.getValues();
            if (params.IN_TAXNAME === 'Tax Not Found') {
                global.Msg({msg: 'Invalid Tax'});
                return;
            }
            if (me.exTaxes.filter(x => x.CTAX === params.IN_CTAX).length > 0) {
                global.Msg({msg: 'Repeated Tax'});
                return;
            }

            grid.show();

            let obj = {
                CTAX: params.IN_CTAX,
                SECTOR: params.IN_SECTOR,
                COMMENT: params.IN_COMMENT
            };

            me.exTaxes.push(obj);

            let store = new Ext.data.Store({
                data: me.exTaxes
            });
            grid.setStore(store);
            
            me.loadActiveChangesTaxException();
            
            form.findField('IN_CTAX').reset();
            form.findField('IN_COMMENT').reset();
        }else{
            global.Msg({msg: 'Invalid Parameters'});
        }
    },
    onDeleteTicket: function(grid, td, rowIndex, cellIndex, e, record, tr, eOpts){
        const me = this;
        const {TICKET,SEQ} = record.data;
        const gridTickets = Ext.getCmp(prototype.idDE + '-gridTickets');
        const btnUpdate = Ext.getCmp(prototype.idDE + '-btn-update');
        me.selectedTickets = me.selectedTickets.filter(x => x.TICKET+x.SEQ !== TICKET+SEQ);
        let store = new Ext.data.Store({
            data: me.selectedTickets
        });
        gridTickets.setStore(store);
    },
    onDeleteTax: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const me = this;
        const {CTAX} = record.data;
        const gridTax = Ext.getCmp(prototype.idDE + '-gridTaxes');
        const btnUpdate = Ext.getCmp(prototype.idDE + '-btn-update');
        me.exTaxes = me.exTaxes.filter(x => x.CTAX !== CTAX);
        let store = new Ext.data.Store({
            data: me.exTaxes
        });
        gridTax.setStore(store);

        if (me.exTaxes.length === 0) {
            gridTax.hide();
            btnUpdate.hide();
        }
    },
    onChangeFilter: function (btn) {
        const form = Ext.getCmp(prototype.idDE + '-ticketFilters').getForm();
        const tkt = Ext.getCmp(prototype.id + '-tktFilter');
        const pnr = Ext.getCmp(prototype.id + '-pnrFilter');
        if (btn.value === 'T') {
            tkt.show();
            pnr.hide();
        } else {
            tkt.hide();
            pnr.show();
        }
        form.reset();
    },
    onUpdateClick: async function () {
        const me = this;
        let params = me.maintenanceParams(me.view.option);
        
        let notifier = new AWN();
        me.view.setLoading(true);
        try {
            const res = await global.callStorePost('PXSAUDIT','SQP05587',params);
            console.log(res);
            if(res.status===201){
                notifier.info('Updated Successfully');
                me.view.reloadGrid();
                me.view.close();
            }else{
                throw new Error('Update Failed');
            }
        } catch (e) {
            console.error(e);
            notifier.alert('Update Failed');
        }
    },
    maintenanceParams: function (option) {
        const me = this;
        let params = {
            IN_OPTION: option,
            IN_JSON: JSON.stringify(me.selectedTickets),
            IN_JSON_DET: JSON.stringify(me.exTaxes) 
        };
        console.log(params);
        return params;
    },
    onCancelClick: function(){
        this.view.close();
    },
    onDeleteClick: async function(){
        const me = this;
        let params = me.maintenanceParams('D');
        let notifier = new AWN();
        me.view.setLoading(true);
        try {
            const res = await global.callStorePost('PXSAUDIT','SQP05587',params);
            console.log(res);
            if(res.status===201){
                notifier.warning('Deleted Successfully');
                me.view.reloadGrid();
                me.view.close();
            }else{
                notifier.alert('Error on Delete');
            }
        } catch (e) {
            console.error(e);
        }
    },
    onClearFilter:function(){
        Ext.getCmp(prototype.idDE + '-ticketFilters').getForm().reset();
        Ext.getCmp(prototype.idDE + '-gridTickets').setStore([]);
        Ext.getCmp(prototype.idDE + '-gridTicketsLoaded').setStore([]);
        Ext.getCmp(prototype.idDE + '-tabTickets').hide();
        Ext.getCmp(prototype.idDE + '-taxFilters').hide();
        Ext.getCmp(prototype.idDE + '-gridTaxes').setStore([]);
        Ext.getCmp(prototype.idDE + '-gridTaxes').hide();
    },
    loadActiveChangesTaxException:function(){
        const me = this;
        const btnUpdate = Ext.getCmp(prototype.idDE + '-btn-update');
        const btnDelete = Ext.getCmp(prototype.idDE + '-btn-delete');
        btnUpdate.hide();
        btnDelete.hide();
        if (me.isNewTicket){
            if (me.activeChanges) {
                btnUpdate.show();
            }
        }
        else{
            if (me.activeChanges) {
                btnUpdate.show();
                btnDelete.show();
            }
        }
    }
});

