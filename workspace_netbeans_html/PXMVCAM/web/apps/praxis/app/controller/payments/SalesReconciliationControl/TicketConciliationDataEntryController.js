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
        const mainForm = Ext.getCmp(prototype.idDE2 + '-mainForm').getForm();
        const res = await fetch(`${me.url}/loadByTicketConciliationInfo?${new URLSearchParams(params)}`)
                .catch(err => {
                    console.error(err);
                    global.Msg({msg: 'Not found'});
                });
        if (res.ok) {
            const data = await res.json();
            me.limpiaObjetoPX(data.response);
            me.limpiaObjetoPX(data.desglose);
            me.bean = data.response;
            me.bean.desglose = data.desglose;
            console.log(me.bean);
            mainForm.reset();
            const {a4496CIA, a4496FORMA, a4496SERIE, a4501STVAL, a4501STADM,
                bpo_COMEN, bpo_COMEN2, adm_COMEN, a4496TKVOI, a4501PRTP, procdate} = data.response;
            Ext.getCmp(prototype.idDE2 + '-ticketNumber').setValue(a4496CIA + ' ' + a4496FORMA + a4496SERIE);
            Ext.getCmp(prototype.idDE2 + '-bpocoment').setValue(bpo_COMEN2 !== '' ? bpo_COMEN2 : bpo_COMEN);
            Ext.getCmp(prototype.idDE2 + '-ADM-BPOCOMEN').setValue(adm_COMEN);
            me.setADMInfo();
            mainForm.setValues(data.response);
            me.changePerspective(a4501STVAL, a4501STADM, a4496TKVOI, a4501PRTP, procdate);
        }
        me.view.unmask();
    },
    changePerspective: function (status, adm, fvoid, procesador, procdate) {
        const match = ['1', '5', '6', '7'];
        if (fvoid === 'V') {
            Ext.getCmp(prototype.idDE2 + '-panelVoid').show();
        } else {
            Ext.getCmp(prototype.idDE2 + '-panelVoid').hide();
        }
        const actualdate = Ext.Date.format(new Date(), 'Ymd');
        //console.log(actualdate,' ',procdate,' ',actualdate>procdate);

        if (match.some(x => status === x)) {
            if (status === '6' && fvoid === 'V' && procesador.trim() === '') {
                Ext.getCmp(prototype.idDE2 + '-liquiInfo').hide();
                Ext.getCmp(prototype.idDE2 + '-panelOptions').show();
                Ext.getCmp(prototype.idDE2 + '-revForcedMatchVoid').show();
                Ext.getCmp(prototype.idDE2 + '-forcedMatchVoid').hide();
                Ext.getCmp(prototype.idDE2 + '-addAdm').hide();
                Ext.getCmp(prototype.idDE2 + '-showStandBy').hide();
            } else {
                Ext.getCmp(prototype.idDE2 + '-liquiInfo').show();
                Ext.getCmp(prototype.idDE2 + '-panelOptions').hide();
            }
            Ext.getCmp(prototype.idDE2 + '-panelPending').hide();
            Ext.getCmp(prototype.idDE2 + '-panelStandBy').hide();
            this.setDesglose();
        } else if (status === '0') {
            Ext.getCmp(prototype.idDE2 + '-liquiInfo').hide();
            Ext.getCmp(prototype.idDE2 + '-panelPending').show();
            Ext.getCmp(prototype.idDE2 + '-panelOptions').hide();
            Ext.getCmp(prototype.idDE2 + '-panelStandBy').show();
            Ext.getCmp(prototype.idDE2 + '-hideStandBy').hide();
            Ext.getCmp(prototype.idDE2 + '-revStandBy').show();
        } else {
            Ext.getCmp(prototype.idDE2 + '-liquiInfo').hide();
            Ext.getCmp(prototype.idDE2 + '-addAdm').show();
            Ext.getCmp(prototype.idDE2 + '-showStandBy').show();
            if (adm === '') {
                Ext.getCmp(prototype.idDE2 + '-panelOptions').show();
                Ext.getCmp(prototype.idDE2 + '-panelADM').hide();
                Ext.getCmp(prototype.idDE2 + '-hideADM').show();
                Ext.getCmp(prototype.idDE2 + '-sendADM').show();
                Ext.getCmp(prototype.idDE2 + '-reverseADM').hide();
            } else {
                Ext.getCmp(prototype.idDE2 + '-panelOptions').hide();
                Ext.getCmp(prototype.idDE2 + '-panelADM').show();
                Ext.getCmp(prototype.idDE2 + '-hideADM').hide();
                Ext.getCmp(prototype.idDE2 + '-sendADM').hide();
                Ext.getCmp(prototype.idDE2 + '-reverseADM').show();
            }
            if (fvoid === 'V' && actualdate > procdate) {
                Ext.getCmp(prototype.idDE2 + '-forcedMatchVoid').show();
            } else {
                Ext.getCmp(prototype.idDE2 + '-forcedMatchVoid').hide();
            }
            Ext.getCmp(prototype.idDE2 + '-revForcedMatchVoid').hide();
            Ext.getCmp(prototype.idDE2 + '-panelPending').show();
            Ext.getCmp(prototype.idDE2 + '-panelStandBy').hide();
            Ext.getCmp(prototype.idDE2 + '-hideStandBy').show();
            Ext.getCmp(prototype.idDE2 + '-revStandBy').hide();
            Ext.getCmp(prototype.idDE2 + '-bpocoment').setValue('');
        }
        this.view.center();
    },
    setADMInfo: function () {
        const obj = this.bean;
        Ext.getCmp(prototype.idDE2 + '-ADM-TKT').setValue(obj.a4501CIA + obj.a4501FORMA + obj.a4501SERIE);
        let valor = Ext.util.Format.number(obj.a4501VFOP, '0,000.00');
        Ext.getCmp(prototype.idDE2 + '-ADM-AMT').setValue(valor);
        Ext.getCmp(prototype.idDE2 + '-ADM-MDA').setValue(obj.a4501MFOP);
    },
    setDesglose: function () {
        const desglose = this.bean.desglose;
        const {a4496CIA,a4496FORMA,a4496SERIE,a4496SEQ} = this.bean;
        let ticket = a4496CIA + a4496FORMA + a4496SERIE +a4496SEQ;
        //marca ticket activo
        desglose.forEach(x=>{
           let ticketDesglose = x.ccia + x.forma + x.serie + x.seq;
           if(ticketDesglose === ticket){
               x.main = true;
           }
        });
        console.log('Desglose Liq. : ', desglose);
        const gridDesglose = Ext.getCmp(prototype.idDE2 + '-gridDesglose');
        gridDesglose.view.mask('Loading...');
        gridDesglose.setStore(Ext.create('Ext.data.Store',{
            data : desglose
        }));
        gridDesglose.view.unmask();
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onOpenComments: function () {
        Ext.getCmp(prototype.idDE2 + '-panelOptions').hide();
        Ext.getCmp(prototype.idDE2 + '-panelStandBy').show();
    },
    onCancelStandBy: function () {
        Ext.getCmp(prototype.idDE2 + '-panelOptions').show();
        Ext.getCmp(prototype.idDE2 + '-panelStandBy').hide();
    },
    onChangeStandBy: async function () {
        const me = this;
        me.view.mask('Loading...');
        const comment = Ext.getCmp(prototype.idDE2 + '-bpocoment').getValue();
        let params = me.formatStandByParams(comment);
        const res = await fetch(`${me.url}/ticketConciliationStandBy?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            const {sqlres, sqlmsg} = data;
            if (sqlres === 1) {
                Ext.toast({
                    html: `<b>${sqlmsg}</b>`,
                    title: 'Notification',
                    align: 't',
                    closable: true,
                    width: 300,
                    timeout: 10000 // 10 segundos
                });
                me.afterRender();
                me.reloadTicketsGrid();
                //Ext.getCmp(prototype.id + '-ByTicketDetailGrid-1').getStore().load();
            }
        } else {
            global.Msg({msg: 'Error'});
            me.view.close();
            return;
        }
        me.view.unmask();
    },
    onReverseStandBy: async function () {
        const me = this;
        me.view.mask('Loading...');
        const comment = Ext.getCmp(prototype.idDE2 + '-bpocoment').getValue();
        let params = me.formatRevStandByParams();
        const res = await fetch(`${me.url}/ticketConciliationReverseStandBy?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            const {sqlres, sqlmsg} = data;
            if (sqlres === 1) {
                Ext.toast({
                    html: `<b>${sqlmsg}</b>`,
                    title: 'Notification',
                    align: 't',
                    closable: true,
                    width: 300,
                    timeout: 10000 // 10 segundos
                });
                me.afterRender();
                me.reloadTicketsGrid();
                //Ext.getCmp(prototype.id + '-ByTicketDetailGrid-1').getStore().load();
            }
        } else {
            global.Msg({msg: 'Error'});
            me.view.close();
            return;
        }
        me.view.unmask();
    },
    onADMClick: function () {
        Ext.getCmp(prototype.idDE2 + '-panelOptions').hide();
        Ext.getCmp(prototype.idDE2 + '-panelADM').show();
    },
    onCancelADM: function () {
        Ext.getCmp(prototype.idDE2 + '-panelOptions').show();
        Ext.getCmp(prototype.idDE2 + '-panelADM').hide();
    },
    onSendADM: function (btn) {
        const me = this;
        let params = me.formatAdmParams();
        console.log(params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure about sending ADM?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.generateADM(params);
                        }
                    }
                });
    },
    onReverseADM: function (btn) {
        const me = this;
        let params = me.formatRevAdmParams();
        console.log(params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to reverse ADM?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.reverseADM(params);
                        }
                    }
                });
    },
    generateADM: async function (params) {
        const me = this;
        me.view.mask('Loading...');
        const res = await fetch(`${me.url}/ticketConciliationGenerateAdm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        if (res.ok) {
            const data = await res.json();
            const {sqlres, sqlmsg} = data;
            if (sqlres === 1) {
                Ext.toast({
                    html: `<b>${sqlmsg}</b>`,
                    title: 'Notification',
                    align: 't',
                    closable: true,
                    width: 300,
                    timeout: 10000 // 10 segundos
                });
                me.afterRender();
                me.reloadTicketsGrid();
                //Ext.getCmp(prototype.id + '-ByTicketDetailGrid-1').getStore().load();
            } else {
                global.Msg({msg: 'Error'});
            }
        } else {
            global.Msg({msg: 'Error'});
        }
        me.view.unmask();
    },
    reverseADM: async function (params) {
        const me = this;
        me.view.mask('Loading...');
        const res = await fetch(`${me.url}/ticketConciliationReverseADM?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            const {sqlres, sqlmsg} = data;
            if (sqlres === 1) {
                Ext.toast({
                    html: `<b>${sqlmsg}</b>`,
                    title: 'Notification',
                    align: 't',
                    closable: true,
                    width: 300,
                    timeout: 10000 // 10 segundos
                });
                me.afterRender();
                me.reloadTicketsGrid();
                //Ext.getCmp(prototype.id + '-ByTicketDetailGrid-1').getStore().load();
            } else {
                global.Msg({msg: 'Error'});
            }
        } else {
            global.Msg({msg: 'Error'});
        }
        me.view.unmask();
    },
    onForceMatch: function (btn) {
        const me = this;
        let params = me.formatForcedMatchVoidParams();
        console.log(params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to Forced Match?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.forceMatchVoid(params);
                        }
                    }
                });
    },
    onReverseForceMatch: function (btn) {
        const me = this;
        let params = me.formatForcedMatchVoidParams();
        console.log(params);
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to reverse Forced Match?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.RevForceMatchVoid(params);
                        }
                    }
                });
    },
    forceMatchVoid: async function (params) {
        const me = this;
        me.view.mask('Loading...');
        const res = await fetch(`${me.url}/ticketConciliationForceMatch?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            const {sqlres, sqlmsg} = data;
            if (sqlres === 1) {
                Ext.toast({
                    html: `<b>${sqlmsg}</b>`,
                    title: 'Notification',
                    align: 't',
                    closable: true,
                    width: 300,
                    timeout: 10000 // 10 segundos
                });
                me.afterRender();
                me.reloadTicketsGrid();
                //Ext.getCmp(prototype.id + '-ByTicketDetailGrid-1').getStore().load();
            } else {
                global.Msg({msg: 'Error'});
            }
        } else {
            global.Msg({msg: 'Error'});
        }
        me.view.unmask();
    },
    RevForceMatchVoid: async function (params) {
        const me = this;
        me.view.mask('Loading...');
        const res = await fetch(`${me.url}/ticketConciliationRevForceMatch?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            const {sqlres, sqlmsg} = data;
            if (sqlres === 1) {
                Ext.toast({
                    html: `<b>${sqlmsg}</b>`,
                    title: 'Notification',
                    align: 't',
                    closable: true,
                    width: 300,
                    timeout: 10000 // 10 segundos
                });
                me.afterRender();
                me.reloadTicketsGrid();
                //Ext.getCmp(prototype.id + '-ByTicketDetailGrid-1').getStore().load();
            } else {
                global.Msg({msg: 'Error'});
            }
        } else {
            global.Msg({msg: 'Error'});
        }
        me.view.unmask();
    },
    onSearchUses: function () {
        const me = this;
        const {a4496CIA, a4496FORMA, a4496SERIE, a4496SEQ, a4496CPUI,
            a4496RUTA0, a4496RUTA1, a4496RUTA2, a4496RUTA3, a4496RUTA4, a4496TIPOD} = me.bean;
        let cpui = (a4496CPUI + '    ').slice(0, 4);
        let itin = (a4496RUTA0 + '   ').slice(0, 3) +
                (a4496RUTA1 + '   ').slice(0, 3) +
                (a4496RUTA2 + '   ').slice(0, 3) +
                (a4496RUTA3 + '   ').slice(0, 3) +
                (a4496RUTA4 + '   ').slice(0, 3);
        let params = {
            IN_CIA: a4496CIA,
            IN_FORMA: a4496FORMA,
            IN_SERIE: a4496SERIE,
            IN_SEQ: a4496SEQ,
            IN_CPUI: cpui,
            IN_ITIN: itin
        };
        console.log(params);
        const usageWin = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.CouponsUsagesDataEntry', {
            id: prototype.idDE2 + '-CouponsUsagesDataEntry-2',
            searchParams: params,
            doctype: a4496TIPOD
        });
        usageWin.show();
    },
    reloadTicketsGrid: function () {
        let callback = this.view.callback;
        if (callback) {
            callback();
        }
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
        console.log(params);
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
    formatAdmParams: function () {
        const obj = this.bean;
        const observ = Ext.getCmp(prototype.idDE2 + '-ADM-BPOCOMEN').getValue();
        let params = {
            IN_CCUST: obj.a4501CCUST,
            IN_CIA: obj.a4501CIA,
            IN_FORMA: obj.a4501FORMA,
            IN_SERIE: obj.a4501SERIE,
            IN_SEQ: obj.a4501SEQ,
            IN_TDOC: obj.a4501TDOC,
            IN_CORRL: obj.a4501CORRL,
            IN_TRNCU: obj.a4496TRNCU,
            IN_PRDA: obj.a4496FPROC,
            IN_FUENTE: obj.a4496FUENT,
            IN_CANAL: obj.a4496SFUEN,
            IN_AGENT: obj.a4496AGENT,
            IN_CURRENCY: obj.a4501MFOP,
            IN_FECVTA: obj.a4496FECVT,
            IN_COUNTRY: obj.a4496PAIS,
            IN_PAX: obj.a4496PAX,
            IN_PNR: obj.a4496PNR,
            IN_CODAG: obj.a4496CODAG,
            IN_CERROR: '03',
            IN_OBSERV: observ,
            IN_AMOUNT: obj.a4501VFOP
        };
        return params;
    },
    formatRevAdmParams: function () {
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
    formatForcedMatchVoidParams: function () {
        const obj = this.bean;
        let params = {
            IN_CCUST: obj.a4501CCUST,
            IN_CIA: obj.a4501CIA,
            IN_FORMA: obj.a4501FORMA,
            IN_SERIE: obj.a4501SERIE,
            IN_SEQ: obj.a4501SEQ,
            IN_TDOC: obj.a4501TDOC,
            IN_CORRL: obj.a4501CORRL
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


