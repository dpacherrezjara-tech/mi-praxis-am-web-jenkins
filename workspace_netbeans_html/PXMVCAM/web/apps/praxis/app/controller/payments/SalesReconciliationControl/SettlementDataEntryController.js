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
        let params = me.formatParametersapi(me.view.obj);
//        console.log('params data entry',params)
        const res = await fetch(`${me.url}/loadErrorTransactionBPOInfo?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            const form = Ext.getCmp(prototype.idDE3 + '-mainForm').getForm();
            me.limpiaObjetoPX(data.response);
            me.bean = data.response;
            form.reset();
            form.setValues(me.bean);
            me.setExtraInformation(me.bean);
            me.setDesgloseGrid();
        }
    },
    setExtraInformation: function (bean) {
        let tipo = bean.transtype;
        let monto = bean.tgrosamoun;
        let procesador = bean.proctype;
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
            txtInvoirn.setValue(bean.pwref);
        }
    },
    setDesgloseGrid: async function () {
        const me = this;
        const panelDesglose = Ext.getCmp(prototype.idDE3 + '-panelDesglose');
        panelDesglose.mask('Loading..');
//        console.log('me.bean---',me.bean);
        let params = me.formatParameters(me.bean);
        const gridDesglose = Ext.getCmp(prototype.idDE3 + '-gridDesglose');
        const gridDesgloseCHBK = Ext.getCmp(prototype.idDE3 + '-gridDesgloseCHBK');
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
                //debugger;
            }
        }
        panelDesglose.unmask();
    },
    onCancelClick: function () {
        this.view.close();
    },
    //<editor-fold defaultstate="collapsed" desc="Formateo de Parametros api">
    formatParametersapi: function (obj) {
//        console.log('obj----',obj)
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
    formatParameters: function (obj) {
//        console.log('obj----',obj)
        let params = {
            IN_CCUST: obj.ccust,
            IN_PRDA: obj.prda,
            IN_TDOC: obj.tdoc,
            IN_AREFNBR: obj.arefnbr
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


