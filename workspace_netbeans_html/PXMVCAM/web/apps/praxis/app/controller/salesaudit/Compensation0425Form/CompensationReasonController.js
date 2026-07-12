Ext.define('Ext.Praxis.controller.salesaudit.Compensation0425Form.CompensationReasonController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CompensationReasonController',
    init: function (view) {
        this.onAddReason = (view.params && view.params.onAddReason) || null;
    },
    afterRender: function () {
        this.loadForm();
    },
    loadForm: async function(){
        const me = this;
        const gridLog = Ext.getCmp(prototype.idDE3 + '-gridListReason'); 
        try {
            gridLog.setLoading(true);
            let params = {
                IN_CCUST:me.view.params.obj.A4961CCUST,
                IN_OPTION:"3",
                IN_CCIA: me.view.params.obj.A4961CIA,
                IN_FORMA: me.view.params.obj.A4961FORMA,
                IN_SERIE: me.view.params.obj.A4961SERIE,
                IN_SEQ: me.view.params.obj.A4961SEQ,
                IN_TRNCU: me.view.params.obj.A4961TRNCU,
                IN_PNR:'',
                IN_COUNTRY: me.view.params.obj.A4961PAIS
            };
            const res = await global.callStoreGet('PXSAUDIT', 'SQP06087', params);
            if (res.lstRs.length > 0) {
                  
                let storeLog = new Ext.data.Store({
                    data: res.lstRs.at(0)
                });
                
                gridLog.setStore(storeLog);
                
            }
        } catch (e) {
            console.error(e);
        } finally {
            gridLog.setLoading(false);
        }
        
    },
    onFilterDescripChange: function (field, newValue) {
        const grid = Ext.getCmp(prototype.idDE3 + '-gridListReason');
        const store = grid.getStore();
        store.clearFilter(true);
        const value = Ext.String.trim(newValue || '');
        if (value !== '') {
            store.filter({
                property: 'A2560COMES',
                value: value,
                anyMatch: true,
                caseSensitive: false
            });
        }
    },
    OnChkRFNDHandler: function(grid, rowIndex, colIndex,item,e,record) {
        if (typeof this.onAddReason !== 'function') {
            Ext.Msg.alert('.: PRAXIS :.', 'Unable to add the reason: no callback was registered by the caller window.');
            return;
        }

        var beanDatos = {};
        var rec = record || grid.getStore().getAt(rowIndex);
        if (!rec) {
            return;
        }
        var idioma = Ext.String.trim(rec.data.A2560LENG || '');
        if (idioma === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'Select Language !');
            return;
        }
        if (idioma === 'SP') {
            beanDatos.A3404ERROR = Ext.String.trim(rec.data.A2560COMES);
        }
        if (idioma === 'EN') {
            beanDatos.A3404ERROR = Ext.String.trim(rec.data.A2560COMEN);
        }
        if (idioma === 'PO') {
            beanDatos.A3404ERROR = Ext.String.trim(rec.data.A2560COMPO);
        }
        if (idioma === 'FR') {
            beanDatos.A3404ERROR = Ext.String.trim(rec.data.A2560COMFR);
        }
        beanDatos.A3404CODRZ = Ext.String.trim(rec.data.A2560CODRZ);
        beanDatos.A3404FAMIL = Ext.String.trim(rec.data.A2560FAMIL);
        beanDatos.A3404COMRE = Ext.String.trim(rec.data.A2560COMRE);

        this.onAddReason(beanDatos);
    }
});
