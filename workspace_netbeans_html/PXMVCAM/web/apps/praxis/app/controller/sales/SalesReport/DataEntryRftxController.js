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
    //<editor-fold defaultstate="collapsed" desc="View Vars">
    groupInfo: {},
    objInfo: {},
    objTax: [],
    objFop: [],
    objTot: {},
    objFC:[],
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
        await this.getRftxInfo();
        await this.getRftxFop();
        await this.getRftxTax();
        await this.getRftxTot();
        this.setValues();
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
    },
    getRftxInfo: async function () {
        let body = this.getRequestParams();
        this.objInfo = await fetch(this.url + '/getRftxInfo', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            let resObj;
            switch (res.status) {
                case 200:
                    resObj = res.json();
                    break;
                case 204:
                    console.log("Sin contenido");
                    resObj = null;
                    break;
                default :
                    resObj = undefined;
                    break;
            }
            return resObj;
        }).catch(err => {
            console.error('Error en fetch', err);
            return null;
        });
    },
    getRftxFop: async function () {
        let body = this.getRequestParams();
        this.objFop = await fetch(this.url + '/getRftxFop', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            let resObj;
            switch (res.status) {
                case 200:
                    resObj = res.json();
                    break;
                case 204:
                    console.log("Sin contenido");
                    resObj = [];
                    break;
                default :
                    resObj = [];
                    break;
            }
            return resObj;
        }).catch(err => {
            console.error('Error en fetch', err);
            return null;
        });
        console.log(this.objFop);
    },
    getRftxTax: async function () {
        let body = this.getRequestParams();
        this.objTax = await fetch(this.url + '/getRftxTax', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            let resObj;
            switch (res.status) {
                case 200:
                    resObj = res.json();
                    break;
                case 204:
                    console.log("Sin contenido");
                    resObj = [];
                    break;
                default :
                    resObj = [];
                    break;
            }
            return resObj;
        }).catch(err => {
            console.error('Error en fetch', err);
            return null;
        });
    },
    getRftxTot: async function () {
        let body = this.getRequestParams();
        this.objTot = await fetch(this.url + '/getRftxTot', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            let resObj;
            switch (res.status) {
                case 200:
                    resObj = res.json();
                    break;
                case 204:
                    console.log("Sin contenido");
                    resObj = [];
                    break;
                default :
                    resObj = [];
                    break;
            }
            return resObj;
        }).catch(err => {
            console.error('Error en fetch', err);
            return null;
        });
        console.log(this.objTot);
    },
    setInfoValues: function () {
        let obj = this.objInfo;
        let objGrupo = this.groupInfo;
        if (obj && objGrupo) {
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
            Ext.getCmp(prototype.idRftx + '-det-lblCurr').setValue(obj.a4373TTAX);
            Ext.getCmp(prototype.idRftx + '-det-lblExchangeRate').setValue(objGrupo.A1530TCAMB);
            Ext.getCmp(prototype.idRftx + '-det-lblLocalCur').setValue(objGrupo.A1530MDA);
            //panel 2
            Ext.getCmp(prototype.idRftx + '-det-lblDigito').setValue(obj.a4373DCHEQ);
            Ext.getCmp(prototype.idRftx + '-det-lblDocType').setValue(obj.a4373TDOC);
            Ext.getCmp(prototype.idRftx + '-det-lblSeq').setValue(obj.a4373SEQ);
            //panel 2.1
            Ext.getCmp(prototype.idRftx + '-det-lblGroup').setValue(obj.a4373GRUPO);
            Ext.getCmp(prototype.idRftx + '-det-lblSource').setValue(objGrupo.A1530FUENT);
            Ext.getCmp(prototype.idRftx + '-det-lblFileId').setValue(objGrupo.A1530IDFIL);
            Ext.getCmp(prototype.idRftx + '-det-lblIssueDate').setValue(obj.a4373FECVT);
        }

    },
    setFopValues: function () {
        let obj = this.objFop;
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
        let obj = this.objTax;
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
        let obj = this.objTot;
        if (obj) {
            //fop totals
            Ext.getCmp(prototype.idRftx + '-det-lblFOP').setValue(Ext.util.Format.number(obj.fop, '0,000.00') || 0);
            Ext.getCmp(prototype.idRftx + '-det-lblFOPCur').setValue(obj.fopcur);

            //tax totals
            Ext.getCmp(prototype.idRftx + '-det-lblTAX').setValue(Ext.util.Format.number(obj.tax, '0,000.00') || 0);
            Ext.getCmp(prototype.idRftx + '-det-lblTAXCur').setValue(obj.taxcur);
        }
    },
    //<editor-fold defaultstate="collapsed" desc="delivery">
    onDelivery: function () {
        let bean = {};
        bean.TDNR = Ext.getCmp(prototype.idRftx + '-det-lblCia').getValue().trim() + Ext.getCmp(prototype.idRftx + '-det-lblDocumento').getValue().trim();
        bean.FUENTE = Ext.getCmp(prototype.idRftx + '-det-lblSource').getValue().trim().substr(0, 3);
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
            this.objFC = await fetch(this.url + '/getRftxFc', {
                method: 'POST',
                body: this.getRequestParams(),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                let resObj;
                switch (res.status) {
                    case 200:
                        resObj = res.json();
                        break;
                    case 204:
                        console.log("Sin contenido");
                        resObj = [];
                        break;
                    default :
                        resObj = [];
                        break;
                }
                return resObj;
            }).catch(err => {
                console.error('Error en fetch', err);
                return null;
            });
            console.log(this.objFC);
            let win = Ext.create('Ext.Praxis.view.sales.SalesReportForm.DataEntryFareCalcRftx', {
                params: {
                    fareCalc: this.objFC
                }
            });
            win.show();
        }
    }
});


