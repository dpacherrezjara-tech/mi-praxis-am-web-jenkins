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
            const form = Ext.getCmp(prototype.idP1 + '-informationForm').getForm();
            me.dataHeader = me.cleanDataSpaces(data.at(0));
            form.setValues(me.dataHeader);

        }
        else {
            global.Msg({msg: 'Not found'});
        }

//            const data = await res.json();
//            const form = Ext.getCmp(prototype.idDE + '-informationForm').getForm();
//            me.limpiaObjetoPX(data.response);
//            me.bean = data.response;
//            me.dataInfo = data.response;
//            form.reset();
//            form.setValues(me.bean);
//            me.changePerspective();
        
    },
    formatParameters : function (obj) {
        let params = {
            IN_CCUST: '139',
            IN_PLUSGRAID: obj.PLUSGRAID.trim(),
            IN_TICKET: obj.EMDNUMBER.trim()
        };
        return params;
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onCancelClick: function () {
        this.view.close();
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Utils">
    cleanDataSpaces: function (data) {
        let cleanData = {};
        Ext.Object.each(data, function (key, val) {
            cleanData[key] = Ext.isString(val) ? val.trim() : val;
        });
        return cleanData ;
    }
    //</editor-fold>
});