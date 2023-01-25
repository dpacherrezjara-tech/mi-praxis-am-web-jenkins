/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryRftxController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.idRftx + '-dataEntryRftxController',
    url: CONTEXTPATH + '/SalesReport',
    meDET: '',
    paramsProrrate: {},
    //<editor-fold defaultstate="collapsed" desc="View Vars">
    groupInfo: '',
    objRftx: {
        info: [],
        taxes: {},
        fop: {},
        totales: {},
        ref: {},
        obs: {}
    },
    objInfo: '',
    objTax: '',
    objFop: '',
    objTot: '',
    //</editor-fold>
    /**
     * Constructor
     */
    init: function (view) {
        meDET = this;
        prototype.ProrrateoNew = {
            id: 'ScrProrrateoNewForm',
            url: CONTEXTPATH + '/ScrProrrateoNew'
        };
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: async function () {
        //dvt
        Ext.getCmp(prototype.idRftx + '-dataEntryRftx').mask('Loading...');
        let dataStatus = false;
        dataStatus = await this.getRftxInfo();
        dataStatus = await this.getRftxFop();
        dataStatus = await this.getRftxTax();
        dataStatus = await this.getRftxTot();
        if (dataStatus) {
            this.setValues();
        } else {
            global.Msg({msg: 'Not found'});
        }
        Ext.getCmp(prototype.idRftx + '-dataEntryRftx').unmask();
    },
    getRequestParams: function () {
        let p = this.view.params;
        this.groupInfo = p.groupData;
        let bean = p.rec.data;
        let body = {
            AIRLINE: bean.A4373AIRLI,
            CIA: bean.A4373CIA,
            FORMA: bean.DOCUMENTO.substring(0, 4),
            SERIE: bean.DOCUMENTO.substring(4, 10),
            SEQ: '00'
        };
        return body;
    },
    setValues: function () {
        this.setInfoValues();
        this.setFopValues();
        this.setTaxValues();
        this.setTotalValues();
        this.setFacsimil();
    },
    //<editor-fold defaultstate="collapsed" desc="Obteniendo Valores">
    getRftxInfo: async function () {
        let body = this.getRequestParams();
        let response = await this.getFetchAsync(this.url + '/getRftxInfo', body);
        let refs = await this.getFetchAsync(this.url + '/getRftxRefs', body);
        if (response.success) {
            this.objRftx.info = response.data;
            if (refs.success) {
                this.objRftx.ref = refs.data.ref;
                this.objRftx.obs = refs.data.obs;
            }
        }
        return response.success;
    },
    getRftxFop: async function () {
        let body = this.getRequestParams();
        let response = await this.getFetchAsync(this.url + '/getRftxFop', body);
        if (response.success) {
            this.objRftx.fop = response.data;
        }
        return response.success;
    },
    getRftxTax: async function () {
        let body = this.getRequestParams();
        let response = await this.getFetchAsync(this.url + '/getRftxTax', body);
        if (response.success) {
            this.objRftx.taxes = response.data;
        }
        return response.success;
    },
    getRftxTot: async function () {
        let body = this.getRequestParams();
        let response = await this.getFetchAsync(this.url + '/getRftxTot', body);
        if (response.success) {
            this.objRftx.totales = response.data;
        }
        return response.success;
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Seteando Valores">
    setInfoValues: function () {
        let obj = this.objRftx.info[0];
        let objRef = this.objRftx.ref;
        let objObs = this.objRftx.obs;
        let objLst = this.objRftx.info;
        let objGrupo = this.groupInfo;
        if (obj && objGrupo) {
            //console.log('obj data', obj);
            //panel 1
            Ext.getCmp(prototype.idRftx + '-det-lblCia').setValue(obj.a4373CIA);
            Ext.getCmp(prototype.idRftx + '-det-lblDocumento').setValue(obj.a4373FORMA + obj.a4373SERIE);
            Ext.getCmp(prototype.idRftx + '-det-lblTransaction').setValue(obj.a4373TRNCU);
            Ext.getCmp(prototype.idRftx + '-det-lblConjuction').setValue(obj.a4373FLAG);
            Ext.getCmp(prototype.idRftx + '-det-lblBoleto').setValue(Ext.util.Format.number(obj.a4373NSEQ, '0,000'));
            Ext.getCmp(prototype.idRftx + '-det-lblTotBoleto').setValue(Ext.util.Format.number(obj.a4373CTKTC, '0,000'));
            Ext.getCmp(prototype.idRftx + '-det-lblTransactionNbr').setValue(obj.a4373TRNN);
            Ext.getCmp(prototype.idRftx + '-det-lblIata').setValue(obj.a4373AGENT);
            Ext.getCmp(prototype.idRftx + '-det-lblMdtx').setValue(obj.a4373MDTX.trim());
            Ext.getCmp(prototype.idRftx + '-det-lblCurr').setValue(Ext.util.Format.number(obj.a4373TTAX, '0,000.00'));
            Ext.getCmp(prototype.idRftx + '-det-lblExchangeRate').setValue(objGrupo.A1530TCAMB);
            Ext.getCmp(prototype.idRftx + '-det-lblLocalCur').setValue(objGrupo.A1530MDA);
            //panel 2
            Ext.getCmp(prototype.idRftx + '-det-lblDigito').setValue(obj.a4373DCHEQ);
            Ext.getCmp(prototype.idRftx + '-det-lblDocType').setValue(obj.a4373TDOC);
            Ext.getCmp(prototype.idRftx + '-det-lblSeq').setValue(obj.a4373SEQ);
            //panel 2.1
            Ext.getCmp(prototype.idRftx + '-det-lblGroup').setValue(obj.a4373GRUPO);
            Ext.getCmp(prototype.idRftx + '-det-lblSource').setValue(objGrupo.A1530FUENT + '-' + objGrupo.A1530PSVTA);
            Ext.getCmp(prototype.idRftx + '-det-lblFileId').setValue(objGrupo.A1530IDFIL);
            Ext.getCmp(prototype.idRftx + '-det-lblIssueDate').setValue(obj.a4373FECVT);
            Ext.getCmp(prototype.idRftx + '-det-lblAuthorityNumber').setValue(obj.a4373CIAS + obj.a4373FORMS + obj.a4373SERIS);

            //cupones
            if (objLst.length > 0) {
                objLst.forEach((element, index) => {
                    if (index < 4) {
                        let indexCmp = index + 1;
                        let lblTkt = Ext.getCmp(prototype.idRftx + `-det-lblTicket${indexCmp}`);
                        let c1 = Ext.getCmp(prototype.idRftx + `-det-lblCup01-${indexCmp}`);
                        let c2= Ext.getCmp(prototype.idRftx + `-det-lblCup02-${indexCmp}`);
                        let c3= Ext.getCmp(prototype.idRftx + `-det-lblCup03-${indexCmp}`);
                        let c4= Ext.getCmp(prototype.idRftx + `-det-lblCup04-${indexCmp}`);
                        lblTkt.getEl().update(element.a4373FORMI + element.a4373SERII);
                        c1.setValue(element.a4373CUPN1);
                        c2.setValue(element.a4373CUPN2);
                        c3.setValue(element.a4373CUPN3);
                        c4.setValue(element.a4373CUPN4);
                        if (indexCmp>1) {
                            lblTkt.show();
                            c1.show();
                            c2.show();
                            c3.show();
                            c4.show();
                        }
                    }
                    //console.log(`objeto ${index}`, element);
                });
            }

            if (objRef.length > 0) {
                let ref = '';
                objRef.forEach(r => ref = ref + r);
                Ext.getCmp(prototype.idRftx + '-det-lblReference').setValue(ref);
            }
            if (objObs.length > 0) {
                let obs = '';
                objObs.forEach(o => obs = obs + o);
                Ext.getCmp(prototype.idRftx + '-det-lblObservation').setValue(obs);
            }

            //datos de auditoria
            Ext.getCmp(prototype.idRftx + '-usr-userCreated').setValue(obj.a4373REGIS || 'SAP51');
            Ext.getCmp(prototype.idRftx + '-usr-dateCreated').setValue(obj.a4373FREGI || '20221229');
            Ext.getCmp(prototype.idRftx + '-usr-userUpdated').setValue(obj.a4373REVIS || 'SAP51');
            Ext.getCmp(prototype.idRftx + '-usr-dateUpdated').setValue(obj.a4373FREVI || '20221229');

        }

    },
    setFopValues: function () {
        let obj = this.objRftx.fop;
        if (obj.length > 0) {
            let fopother = 0;
            let fopShow = 0;
            let mdaother = '';
            for (let i = 0; i < 2; i++) {
                let fop = obj[i];
                if (fop) {
                    Ext.getCmp(prototype.idRftx + '-det-lblFOPCode' + (i + 1)).setValue(fop.a4374CFOP || '');
                    Ext.getCmp(prototype.idRftx + '-det-lblCardType' + (i + 1)).setValue(fop.a4374TTARJ || '');
                    Ext.getCmp(prototype.idRftx + '-det-lblRefNumber' + (i + 1)).setValue(fop.a4374NREF || '');
                    Ext.getCmp(prototype.idRftx + '-det-lblFOPCur' + (i + 1)).setValue(fop.a4374MFOP || '');
                    Ext.getCmp(prototype.idRftx + '-det-lblFOP' + (i + 1)).setValue(Ext.util.Format.number(fop.a4374VFOP, '0,000.00') || '');
                    fopShow += fop.a4374VFOP;
                    Ext.getCmp(prototype.idRftx + '-det-lblFEXP' + (i + 1)).setValue(fop.a4374FEXP || '');
                    Ext.getCmp(prototype.idRftx + '-det-lblCAPL' + (i + 1)).setValue(fop.a4374CAPL || '');
                    Ext.getCmp(prototype.idRftx + '-det-lblCORRLFOP' + (i + 1)).setValue(fop.a4374CORRL || '');
                }
            }
            obj.forEach(x => {
                fopother += (x.a4374VFOP || 0);
                mdaother = x.a4374MFOP || '';
            });
            Ext.getCmp(prototype.idRftx + '-det-lblFOPOther').setValue(Ext.util.Format.number(fopother - fopShow, '0,000.00') || 0);
            Ext.getCmp(prototype.idRftx + '-det-lblFopOtherCur').setValue(mdaother);

        }
    },
    setTaxValues: function () {
        let obj = this.objRftx.taxes;
        if (obj.length > 0) {
            let taxother = 0;
            let taxShow = 0;
            let mdaother = '';
            for (let i = 0; i < 4; i++) {
                let tax = obj[i];
                if (tax) {
                    Ext.getCmp(prototype.idRftx + '-det-lblTAXCode' + (i + 1)).setValue(tax.a4375CTAX || '');
                    Ext.getCmp(prototype.idRftx + '-det-lblTAXCur' + (i + 1)).setValue(tax.a4375MTAX || '');
                    Ext.getCmp(prototype.idRftx + '-det-lblTAX' + (i + 1)).setValue(Ext.util.Format.number(tax.a4375VTAX, '0,000.00') || '0.00');
                    taxShow += tax.a4375VTAX;
                    Ext.getCmp(prototype.idRftx + '-det-lblPFC' + (i + 1)).setValue(tax.a4375APFC || '');
                }
            }
            obj.forEach(x => {
                taxother += (x.a4375VTAX || 0);
                mdaother = x.a4375MTAX || '';
            });
            Ext.getCmp(prototype.idRftx + '-det-lblTAXOther').setValue(Ext.util.Format.number(taxother - taxShow, '0,000.00') || 0);
            Ext.getCmp(prototype.idRftx + '-det-lblTAXOtherCur').setValue(mdaother);
        }
    },
    setTotalValues: function () {
        let obj = this.objRftx.totales;
        if (obj) {
            //fop totals
            Ext.getCmp(prototype.idRftx + '-det-lblFOP').setValue(Ext.util.Format.number(obj.fop, '0,000.00') || 0);
            Ext.getCmp(prototype.idRftx + '-det-lblFOPCur').setValue(obj.fopcur);

            //tax totals
            Ext.getCmp(prototype.idRftx + '-det-lblTAX').setValue(Ext.util.Format.number(obj.tax, '0,000.00') || 0);
            Ext.getCmp(prototype.idRftx + '-det-lblTAXCur').setValue(obj.taxcur);
        }
    },
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="delivery">
    onDelivery: function () {
        let bean = {};
        bean.TDNR = Ext.getCmp(prototype.idRftx + '-det-lblCia').getValue().trim() + Ext.getCmp(prototype.idRftx + '-det-lblDocumento').getValue().trim();
        bean.FUENTE = Ext.getCmp(prototype.idRftx + '-det-lblSource').getValue().trim().substr(0, 3);
        bean.SEQTKT = this.view.params.rec.data.A4373SEQ;
        bean.IDFILE = Ext.getCmp(prototype.idRftx + '-det-lblFileId').getValue().trim();
        console.log(bean);
        if (bean.TDNR !== '' && bean.FUENTE !== '') {
            bean.A720TKVOID = '';//this.gloA720TKVOID;
            this.searchDelivery(bean);
        }
    },
    searchDelivery: function (bean) {
        Ext.Ajax.request({
            url: prototype.ProrrateoNew.url + '/searchDeliveryRFND',
            method: 'POST',
            timeout: 60000000,
            params: {beanString: JSON.stringify(bean)},
            success: function (response, opts) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var texto = res.strTextoBSP;
                    if (texto !== '') {
                        Ext.create('Ext.Praxis.view.screens.CtrlDeliveryOrigForm', {
                            id: 'CtrlDeliveryOrigForm',
                            params: {
                                strTexto: texto,
                                strVoid: ''//me1.gloA720TKVOID
                            }
                        }).show();
                    } else {
                        if (Ext.getCmp(prototype.idRftx + '-det-lblConjuction').getValue() === 'C') {
                            var ticket = '';
                            var inttkt = Ext.getCmp(prototype.idRftx + '-det-lblDocumento').getValue().substr(2, 8);
                            ticket = parseInt(inttkt) + 1;
                            var valueValid = '00000000';
                            var resultado = valueValid + ticket;
                            resultado = resultado.substring(resultado.length - valueValid.length);
                            ticket = Ext.getCmp(prototype.idRftx + '-det-lblDocumento').getValue().substr(0, 2) + resultado;
                            bean.TDNR = Ext.getCmp(prototype.idRftx + '-det-lblCia').getValue().trim() + ticket;
                            Ext.Ajax.request({
                                url: prototype.ProrrateoNew.url + '/searchDeliveryRFND',
                                method: 'POST',
                                timeout: 60000000,
                                params: {beanString: JSON.stringify(bean)},
                                success: function (response, opts) {
                                    var res = Ext.JSON.decode(response.responseText);
                                    if (res.success) {
                                        var texto = res.strTextoBSP;
                                        if (texto !== '') {
                                            Ext.create('Ext.Praxis.view.screens.CtrlDeliveryOrigForm', {
                                                id: 'CtrlDeliveryOrigForm',
                                                params: {
                                                    strTexto: texto,
                                                    strVoid: ''//me1.gloA720TKVOID
                                                }
                                            }).show();
                                        }
                                    } else
                                        global.Msg({msg: res.sesion});
                                },
                                failure: function (response, opts) {
                                    console.log('server-side failure with status code ' + response.status);
                                }
                            });
                        }
                    }
                } else
                    global.Msg({msg: res.sesion});
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },
    //</editor-fold>

    onFareCalc: async function (obj) {
        let lblDocumento = Ext.getCmp(prototype.idRftx + '-det-lblDocumento').getValue().trim();
        if (lblDocumento !== '') {
            let win = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryFareCalcRftx', {
                params: {
                    body: this.getRequestParams()
                }
            });
            win.show();
        }
    },
    onFocus: function (id) {
        Ext.getCmp(prototype.idRftx + id).focus();
    },
    onClickSearchTAX: function (obj) {
        let lblTAX = Ext.getCmp(prototype.idRftx + '-det-lblTAX').getValue().trim();
        let lblDocumento = Ext.getCmp(prototype.idRftx + '-det-lblDocumento').getValue().trim();
        if (Ext.getCmp(prototype.idRftx + '-det-lblCia').getValue().length !== 3) {
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Cia', function (btn, text) {
                if (btn === 'ok') {
                    this.onFocus('-det-lblCia');
                }
            });
            return;
        }
        if (Ext.getCmp(prototype.idRftx + '-det-lblDocumento').getValue().length !== 10) {
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Document', function (btn, text) {
                if (btn === 'ok') {
                    this.onFocus('-det-lblDocumento');
                }
            });
            return;
        }
        let statusGrupo = (this.groupInfo.A1530STPRO || 'CLOSED').trim();
        if (lblTAX !== '' && lblTAX.text !== '0.00' && lblDocumento !== '') {
            var win = new Ext.Praxis.view.sales.SalesReportForm.DataEntryTAXRftx({
                params: {
                    stGroup: statusGrupo,
                    requestParams: this.getRequestParams()
                }
            });
            win.show();
        }
    },
    onClickSearchFOP: function (obj) {
        let lblFOP = Ext.getCmp(prototype.idRftx + '-det-lblFOP').getValue().trim();
        let lblDocumento = Ext.getCmp(prototype.idRftx + '-det-lblDocumento').getValue().trim();
        if (Ext.getCmp(prototype.idRftx + '-det-lblCia').getValue().length !== 3) {
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Cia', function (btn, text) {
                if (btn === 'ok') {
                    this.onFocus('-det-lblCia');
                }
            });
            return;
        }
        if (Ext.getCmp(prototype.idRftx + '-det-lblDocumento').getValue().length !== 10) {
            Ext.Msg.alert('.: PRAXIS :.', 'Invalid Document', function (btn, text) {
                if (btn === 'ok') {
                    this.onFocus('-det-lblDocumento');
                }
            });
            return;
        }
        let statusGrupo = (this.groupInfo.A1530STPRO || 'CLOSED').trim();
        if (lblFOP !== '' && lblFOP.text !== '0.00' && lblDocumento !== '') {
            var win = new Ext.Praxis.view.sales.SalesReportForm.DataEntryFOPRftx({
                params: {
                    stGroup: statusGrupo,
                    requestParams: this.getRequestParams()
                }
            });
            win.show();
        }
    },
    setFacsimil: function () {
        var p = this.view.params;
        var bean = p.rec.data;
        //console.log(bean);
        paramsProrrate = {
            IN_TIPOCAP: 'A',
            IN_AIRLIN: bean.A4373AIRLI,
            IN_GRUPO: bean.A4373GRUPO,
            IN_CIA: Ext.String.trim(Ext.getCmp(prototype.idRftx + '-det-lblCia').getValue()), //bean.A4373CIAI,
            IN_FORMA: Ext.String.trim(Ext.getCmp(prototype.idRftx + '-det-lblDocumento').getValue()).substr(0, 4), //bean.A4373FORMI,
            IN_SERIE: Ext.String.trim(Ext.getCmp(prototype.idRftx + '-det-lblDocumento').getValue()).substr(4, 6), //bean.A4373SERII,
            IN_SEQ: bean.A4373SEQ,
            IN_FTE: Ext.getCmp(prototype.idRftx + '-det-lblSource').getValue().substr(0, 3), //bean.A4373ORIG,
            IN_TRX: 'RFND', //bean.A4373TRNCU,
            IN_EDITABLE: false,
            IN_TCAMB: p.exchrate,
            IN_REVENUE: '',
            IN_STATUS: 'CLOSED',
            IN_ERROR: '',
            IN_TDOC: Ext.String.trim(Ext.getCmp(prototype.idRftx + '-det-lblDocType').getValue()),
            IN_ISSUEDATE: bean.A4373FECVT,
            IN_CUPON1: '',
            IN_CUPON2: '',
            IN_CUPON3: '',
            IN_CUPON4: '',
            IN_FORCE: '',
            IN_IDFIL: Ext.String.trim(Ext.getCmp(prototype.idRftx + '-det-lblFileId').getValue())//bean.A4373IDFIL
        };
        //console.log(paramsProrrate);
        Ext.getCmp(prototype.idRftx + '-widget-facsimil').setParam(paramsProrrate);
        },
    //<editor-fold defaultstate="collapsed" desc="FETCH">
    getFetchAsync: async function (url, params, method = 'GET') {
        let reqUrl = '';
        let options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let ready = true;
        switch (method) {
            case 'GET':
                reqUrl = url;
                if (params !== null && params !== undefined) {
                    reqUrl = reqUrl + '?' + new URLSearchParams(params);
                }
                break;
            case 'DELETE':
                reqUrl = url;
                if (params !== null && params !== undefined) {
                    reqUrl = reqUrl + '?' + new URLSearchParams(params);
                } else {
                    ready = false;
                }
                break;
            case 'POST':
            case 'PUT':
                reqUrl = url;
                if (params === null && params === undefined) {
                    console.log('Method POST or PUT without Body');
                    ready = false;
                }
                options = {
                    body: JSON.stringify(params),
                    ...options
                };
                break;
            default :
                ready = false;
        }

        if (url !== '' && ready) {
            return await fetch(reqUrl, options).then(async res => {
                let resObj;
                switch (res.status) {
                    case 200:
                        resObj = await res.json();
                        return {success: true, data: resObj};
                        break;
                    case 204:
                        console.log(await res.json().msg);
                        return {success: false};
                        break;
                    default:
                        console.error('Error en endpoint =>' + url);
                        return {success: false};
                }
            }).catch(err => {
                console.log('Error en request. ', err);
                return {success: false};
            });
        }
        return {success: false};
    }
    //</editor-fold>


});


