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
        /*
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
         */
        const res = await global.callStoreGet('PRAXISMP', 'SQP05126', params);
        me.bean = res.lstRs.at(0).at(0);
        me.bean.desglose = res.lstRs.at(1);
        console.log(me.bean);
        mainForm.reset();
        const {A4496CIA, A4496FORMA, A4496SERIE, A4501STVAL, A4501STADM,
            BPO_COMEN, BPO_COMEN2, ADM_COMEN, A4496TKVOI, A4501PRTP, PROCDATE} = me.bean;
        Ext.getCmp(prototype.idDE2 + '-ticketNumber').setValue(A4496CIA + ' ' + A4496FORMA + A4496SERIE);
        Ext.getCmp(prototype.idDE2 + '-bpocoment').setValue(BPO_COMEN2 !== '' ? BPO_COMEN2 : BPO_COMEN);
        Ext.getCmp(prototype.idDE2 + '-ADM-BPOCOMEN').setValue(ADM_COMEN);
        me.setADMInfo();
        mainForm.setValues(me.bean);
        me.changePerspective(A4501STVAL, A4501STADM, A4496TKVOI, A4501PRTP, PROCDATE);
        me.view.unmask();
    },
    changePerspective: function (status, adm, fvoid, procesador, procdate) {
        const match = ['0', '1', '4', '5', '6', '7', '8', '9', 'A', 'M', 'C'];
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
            } else {
                if(status!=='A'){
                    Ext.getCmp(prototype.idDE2 + '-liquiInfo').show();
                }else{
                    Ext.getCmp(prototype.idDE2 + '-liquiInfo').hide();
                }
                Ext.getCmp(prototype.idDE2 + '-panelOptions').hide();
            }
            this.setDesglose();
        } else if (status === '0') {
            Ext.getCmp(prototype.idDE2 + '-liquiInfo').hide();
            Ext.getCmp(prototype.idDE2 + '-panelPending').show();
            Ext.getCmp(prototype.idDE2 + '-panelOptions').hide();
        } else {
            Ext.getCmp(prototype.idDE2 + '-liquiInfo').hide();
            Ext.getCmp(prototype.idDE2 + '-addAdm').show();
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
        }
        this.view.center();
    },
    setADMInfo: function () {
        const obj = this.bean;
        Ext.getCmp(prototype.idDE2 + '-ADM-TKT').setValue(obj.A4501CIA + obj.A4501FORMA + obj.A4501SERIE);
        let valor = Ext.util.Format.number(obj.A4501VFOP, '0,000.00');
        Ext.getCmp(prototype.idDE2 + '-ADM-AMT').setValue(valor);
        Ext.getCmp(prototype.idDE2 + '-ADM-MDA').setValue(obj.A4501MFOP);
    },
    setDesglose: function () {
        const desglose = this.bean.desglose;
        const gridDesglose = Ext.getCmp(prototype.idDE2 + '-gridDesglose');
        const {A4496CIA, A4496FORMA, A4496SERIE, A4496SEQ} = this.bean;
        let ticket = A4496CIA + A4496FORMA + A4496SERIE + A4496SEQ;
        //marca ticket activo
        if (desglose) {
            desglose.forEach(x => {
                let ticketDesglose = x.CCIA + x.FORMA + x.SERIE + x.SEQ;
                if (ticketDesglose === ticket) {
                    x.main = true;
                }
            });
            gridDesglose.view.mask('Loading...');
            gridDesglose.setStore(Ext.create('Ext.data.Store', {
                data: desglose
            }));
        } else {
            gridDesglose.hide();
        }
        console.log('Desglose Liq. : ', desglose);


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
        const {A4496CIA, A4496FORMA, A4496SERIE, A4496SEQ, A4496CPUI,
            A4496RUTA0, A4496RUTA1, A4496RUTA2, A4496RUTA3, A4496RUTA4, A4496TIPOD} = me.bean;
        let cpui = (A4496CPUI + '    ').slice(0, 4);
        let itin = (A4496RUTA0 + '   ').slice(0, 3) +
                (A4496RUTA1 + '   ').slice(0, 3) +
                (A4496RUTA2 + '   ').slice(0, 3) +
                (A4496RUTA3 + '   ').slice(0, 3) +
                (A4496RUTA4 + '   ').slice(0, 3);
        let params = {
            IN_CIA: A4496CIA,
            IN_FORMA: A4496FORMA,
            IN_SERIE: A4496SERIE,
            IN_SEQ: A4496SEQ,
            IN_CPUI: cpui,
            IN_ITIN: itin
        };
        console.log(params);
        const usageWin = Ext.create('Ext.Praxis.view.payments.SalesReconciliationControlForm.DataEntrys.CouponsUsagesDataEntry', {
            id: prototype.idDE2 + '-CouponsUsagesDataEntry-2',
            searchParams: params,
            doctype: A4496TIPOD
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

    formatAdmParams: function () {
        const obj = this.bean;
        const observ = Ext.getCmp(prototype.idDE2 + '-ADM-BPOCOMEN').getValue();
        let params = {
            IN_CCUST: obj.A4501CCUST,
            IN_CIA: obj.A4501CIA,
            IN_FORMA: obj.A4501FORMA,
            IN_SERIE: obj.A4501SERIE,
            IN_SEQ: obj.A4501SEQ,
            IN_TDOC: obj.A4501TDOC,
            IN_CORRL: obj.A4501CORRL,
            IN_TRNCU: obj.A4496TRNCU,
            IN_PRDA: obj.A4496FPROC,
            IN_FUENTE: obj.A4496FUENT,
            IN_CANAL: obj.A4496SFUEN,
            IN_AGENT: obj.A4496AGENT,
            IN_CURRENCY: obj.A4501MFOP,
            IN_FECVTA: obj.A4496FECVT,
            IN_COUNTRY: obj.A4496PAIS,
            IN_PAX: obj.A4496PAX,
            IN_PNR: obj.A4496PNR,
            IN_CODAG: obj.A4496CODAG,
            IN_CERROR: '03',
            IN_OBSERV: observ,
            IN_AMOUNT: obj.A4501VFOP
        };
        return params;
    },
    formatRevAdmParams: function () {
        const obj = this.bean;
        let params = {
            IN_CCUST: obj.A4501CCUST,
            IN_CIA: obj.A4501CIA,
            IN_FORMA: obj.A4501FORMA,
            IN_SERIE: obj.A4501SERIE,
            IN_SEQ: obj.A4501SEQ,
            IN_TDOC: obj.A4501TDOC,
            IN_CORRL: obj.A4501CORRL,
            IN_PRDA: obj.A4496FPROC
        };
        return params;
    },
    formatForcedMatchVoidParams: function () {
        const obj = this.bean;
        let params = {
            IN_CCUST: obj.A4501CCUST,
            IN_CIA: obj.A4501CIA,
            IN_FORMA: obj.A4501FORMA,
            IN_SERIE: obj.A4501SERIE,
            IN_SEQ: obj.A4501SEQ,
            IN_TDOC: obj.A4501TDOC,
            IN_CORRL: obj.A4501CORRL
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


