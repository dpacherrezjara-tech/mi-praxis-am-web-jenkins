Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.SettlementDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SettlementDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    bean: {},
    init: function (view) {
    },
    afterRender: async function () {
        this.view.mask('Loading...');
        await this.getData();
        this.view.unmask();
    },
    getData: async function () {
        const me = this;
        let params = me.formatParametersInfo(me.view.obj);
        const res = await global.callStoreGet('PRAXISMP', 'SQP05052', params);
        const data = res?.lstRs?.[0]?.[0] || {};
        if (Object.keys(data).length) {
            const form = Ext.getCmp(prototype.idDE3 + '-mainForm').getForm();
            me.limpiaObjetoPX(data);
            me.bean = data;
            form.reset();
            form.setValues(me.bean);
            me.setExtraInformation(me.bean);
            me.setDesgloseGrid();
        }
    },
    setExtraInformation: function (bean) {
        let tipo = bean.TRANSTYPE;
        let monto = bean.TGROSAMOUN;
        let procesador = bean.PROCTYPE;
        const panelChbk = Ext.getCmp(prototype.idDE3 + '-panelChbk');
        const labelChbk = Ext.getCmp(prototype.idDE3 + '-typeChbk');
        const txtInvoirn = Ext.getCmp(prototype.idDE3 + '-txtInvoirn');
        if (tipo === 'CHBK') {
            panelChbk.show();
            if (monto > 0) {
                labelChbk.setValue('Rev. Chargeback');
            } else {
                labelChbk.setValue('Chargeback');
            }
        } else if (tipo === 'ADJU') {
            panelChbk.show();
            labelChbk.setValue('Adjustment');
        } else {
            panelChbk.hide();
        }
        
        if(procesador === 'BANORTE00'){
            txtInvoirn.setValue(bean.PWREF);
        }
    },
    setDesgloseGrid: async function () {
        const me = this;
        const panelDesglose = Ext.getCmp(prototype.idDE3 + '-panelDesglose');
        panelDesglose.mask('Loading..');
//        console.log('me.bean---',me.bean);
        let params = me.formatParametersDesglose(me.bean);
        let paramsChbk = me.formatParametersDesgloseChbk(me.bean);
        const gridDesglose = Ext.getCmp(prototype.idDE3 + '-gridDesglose');
        const gridDesgloseCHBK = Ext.getCmp(prototype.idDE3 + '-gridDesgloseCHBK');
        if (me.bean.TRANSTYPE === 'CHBK') {
            gridDesglose.hide();
            gridDesgloseCHBK.show();
            const res = await global.callStoreGet('PRAXISMP', 'SQP05072', paramsChbk);
            const data = res?.lstRs?.[0] || [];
            if (data.length) {
                const storeDesglose = Ext.create('Ext.data.Store', {
                    data: data
                });
                gridDesgloseCHBK.setStore(storeDesglose);
            }
        } else {
            gridDesglose.show();
            gridDesgloseCHBK.hide();
            const res = await global.callStoreGet('PRAXISMP', 'SQP05055', params);
            const data = res?.lstRs?.[0] || [];
            if (data.length) {
                const storeDesglose = Ext.create('Ext.data.Store', {
                    data: data
                });
                gridDesglose.setStore(storeDesglose);
                //debugger;
            }
        }
        panelDesglose.unmask();
    },
    onCancelClick: function () {
        this.view.close();
    },
    //<editor-fold defaultstate="collapsed" desc="Formateo de Parametros api">
    formatParametersInfo: function (obj) {
        let params = {
            IN_CCUST: obj.CCUST,
            IN_PRDA: obj.PRDA,
            IN_TDOC: obj.TDOC,
            IN_AREFNBR: obj.AREFNBR
        };
        return params;
    },
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Formateo de Parametros">
    formatParametersDesglose: function (obj) {
        let params = {
            IN_CCUST: obj.CCUST,
            IN_PRDA: obj.PRDA,
            IN_AREFNBR: obj.AREFNBR
        };
        return params;
    },
    formatParametersDesgloseChbk: function (obj) {
        let params = {
            IN_CCUST: obj.CCUST,
            IN_TDOC: obj.TDOC,
            IN_PRDA: obj.PRDA,
            IN_AREFNBR: obj.AREFNBR
        };
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


