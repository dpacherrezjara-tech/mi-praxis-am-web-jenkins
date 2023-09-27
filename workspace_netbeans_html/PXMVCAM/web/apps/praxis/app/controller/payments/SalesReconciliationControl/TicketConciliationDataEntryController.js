Ext.define('Ext.Praxis.controller.payments.SalesReconciliationControl.TicketConciliationDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TicketConciliationDataEntryController',
    url: CONTEXTPATH + '/SalesReconciliationBPO',
    bean: {},
    init: function (view) {
    },
    afterRender: async function () {
        await this.getData();
    },
    getData: async function () {
        const me = this;
        me.view.mask('Loading...');
        const params = me.view.searchParams;
        const mainForm = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
        const res = await fetch(`${me.url}/loadByTicketConciliationInfo?${new URLSearchParams(params)}`)
                .catch(err => {
                    console.error(err);
                    global.Msg({msg: 'Not found'});
                });
        if (res.ok) {
            const data = await res.json();
            me.limpiaObjetoPX(data.response);
            me.bean = data.response;
            mainForm.reset();
            const {a4496CIA, a4496FORMA, a4496SERIE} = data.response;
            Ext.getCmp(prototype.idDE + '-ticketNumber').setValue(a4496CIA + ' ' + a4496FORMA + a4496SERIE);
            mainForm.setValues(data.response);
            me.changePerspective(me.bean.a4501STVAL);
        }
        me.view.unmask();
    },
    changePerspective: function (status) {
        const match = ['1', '5', '6', '7'];
        if (match.some(x => status === x)) {
            Ext.getCmp(prototype.idDE + '-liquiInfo').show();
            Ext.getCmp(prototype.idDE + '-panelOptions').hide();
            Ext.getCmp(prototype.idDE + '-panelPending').hide();
            Ext.getCmp(prototype.idDE + '-panelStandBy').hide();
        } else if(status ==='0'){
            Ext.getCmp(prototype.idDE + '-liquiInfo').hide();
            Ext.getCmp(prototype.idDE + '-panelPending').show();
            Ext.getCmp(prototype.idDE + '-panelOptions').hide();
            Ext.getCmp(prototype.idDE + '-panelStandBy').show();
            Ext.getCmp(prototype.idDE + '-hideStandBy').hide();
            Ext.getCmp(prototype.idDE + '-revStandBy').show();
        } 
        else {
            Ext.getCmp(prototype.idDE + '-liquiInfo').hide();
            Ext.getCmp(prototype.idDE + '-panelPending').show();
            Ext.getCmp(prototype.idDE + '-panelOptions').show();
            Ext.getCmp(prototype.idDE + '-panelStandBy').hide();
            Ext.getCmp(prototype.idDE + '-hideStandBy').show();
            Ext.getCmp(prototype.idDE + '-revStandBy').hide();
        }
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onOpenComments:function(){
        Ext.getCmp(prototype.idDE + '-panelOptions').hide();
        Ext.getCmp(prototype.idDE + '-panelStandBy').show();
    },
    onCancelStandBy:function(){
        Ext.getCmp(prototype.idDE + '-panelOptions').show();
        Ext.getCmp(prototype.idDE + '-panelStandBy').hide();
    },
    onChangeStandBy:function(){
        
    },
    onReverseStandBy:function(){
        
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Format Parameters">
    formatStandByParams: function (comment) {
        const obj = this.bean;
        let params = {
            IN_CCUST: obj.a4501CCUST,
            IN_CIA: obj.a4501CIA,
            IN_FORMA: obj.a4501FORMA,
            IN_SERIE: obj.a4501SERIE,
            IN_SEQ: obj.a4501SEQ,
            IN_TDOC: obj.a4501TDOC,
            IN_CORRL: obj.a4501CORRL,
            IN_PRDA: obj.a4496FPROC,
            IN_OBSERV: comment
        };
        return params;
    },
    formatRevStandByParams: function () {
        const obj = this.bean;
        let params = {
            IN_CCUST: obj.a4501CCUST,
            IN_CIA: obj.a4501CIA,
            IN_FORMA: obj.a4501FORMA,
            IN_SERIE: obj.a4501SERIE,
            IN_SEQ: obj.a4501SEQ,
            IN_TDOC: obj.a4501TDOC,
            IN_CORRL: obj.a4501CORRL,
            IN_PRDA: obj.a4496FPROC
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


