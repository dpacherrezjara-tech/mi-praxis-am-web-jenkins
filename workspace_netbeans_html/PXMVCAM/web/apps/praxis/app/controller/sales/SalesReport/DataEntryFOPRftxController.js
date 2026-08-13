Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryFOPRftxController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryFOPRftxController',
    urlWin01: CONTEXTPATH + '/SalesReport',
    urlWin02: CONTEXTPATH + '/SalesReport/manRftxFop',
    objSt: '',
    objReq: '',
    init: function (view) {
        var me = this;
        this.objReq = {CORRL: '', ...this.view.params.requestParams};
        this.objSt = this.view.params.stGroup;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStoresGrids();
        this.getDataInputs();
    },
    getUrlAction: function (action) {
        let urlReq = {
            url: '',
            method: ''
        };
        switch (action) {
            case 'l':
                urlReq.url = this.urlWin01 + '/getRftxFop';
                urlReq.method = 'GET';
                break;
            case 'i':
                urlReq.url = this.urlWin02;
                urlReq.method = 'POST';
                break;
            case 'u':
                urlReq.url = this.urlWin02;
                urlReq.method = 'PUT';
                break;
            case 'd':
                urlReq.url = this.urlWin02;
                urlReq.method = 'DELETE';
                break;
            default :
                urlReq = null;
        }
        return urlReq;
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.idRftxFOP + '-det-gridDataTktFOP');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRftxFOP + '-store-gridTktFOP'
        });

        grid01.setStore(store01);
    },
    getDataInputs: async function () {
        let me = this;
        let gridDataTktFOP = Ext.getCmp(prototype.idRftxFOP + '-det-gridDataTktFOP');
        let gridFOPADD = Ext.getCmp(prototype.idRftxFOP + '-gridFopADD');
        let gridFOPSave = Ext.getCmp(prototype.idRftxFOP + '-gridFopSave');
        switch (me.objSt) {
            case 'CLOSED':
                gridFOPSave.hide();
                gridFOPADD.hide();
                gridDataTktFOP.columns[7].setVisible(false);
                break;
            case 'OPEN':
                //mantenimiento en stand by
//                gridTAXSave.show();
//                gridTAXADD.show();
//                gridDataTktTAX.columns[7].setVisible(true);
                gridFOPSave.hide();
                gridFOPADD.hide();
                gridDataTktFOP.columns[7].setVisible(false);
                break;

        }
        Ext.getCmp(prototype.idRftxFOP + '-winDataEntryFOPRftx').mask('Loading...');
        let action = this.getUrlAction('l') || 'l';
        let response = await this.getFetchAsync(action.url, this.objReq);
        if (response.success) {
            Ext.getCmp(prototype.idRftxFOP + '-det-gridDataTktFOP').getStore().loadData(response.data);
        }
        Ext.getCmp(prototype.idRftxFOP + '-winDataEntryFOPRftx').unmask();
    },
    OnFopRemove: function (grid, rowIndex, colIndex) {
        let me = this;
        let rec = grid.getStore().getAt(rowIndex).data;
        let params = me.objReq;
        let action = this.getUrlAction('d');
        global.Msg({
            msg: 'DELETE FOP?',
            icon: 3,
            buttons: 3,
            fn: async function (btn) {
                if (btn === 'yes') {
                    params.CTAX = rec.a4375CTAX;
                    params.CORRL = rec.a4375CORRL;
                    await me.getFetchAsync(action.url, params, action.method);

//                    if (rec.data.a4374CORRL !== '') {
//                        paramsGuardarFOP.IN_OPTION = "1";
//                        paramsGuardarFOP.IN_CIA = p.IN_CIA;
//                        paramsGuardarFOP.a4374FORMA = p.IN_FORMA;
//                        paramsGuardarFOP.a4374SERIE = p.IN_SERIE;
//                        paramsGuardarFOP.a4374SEQ = p.A713SEQ;
//                        paramsGuardarFOP.a4374CORRL = rec.data.a4374CORRL;
//                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idRftxFOP + '-winDataEntryFOPRfnd'), {
//                            msg: 'Please Wait....'
//                        });
//                        mask.show();
//                        Ext.Ajax.request({
//                            url: me.urlWin01 + '/ProcesaDeleteEntryRfndCompleManual/',
//                            timeout: 60000000,
//                            method: 'POST',
//                            params: {beanString: JSON.stringify(paramsGuardarFOP)},
//                            success: function (response, options) {
//                                mask.hide();
//                                var res = Ext.JSON.decode(response.responseText);
//                                var vp_icon = 0;
//                                if (res.data === 'RECORD DELETED') {
//                                    vp_icon = 1;
//                                }
//                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
//                                        if (vp_icon === 1) {
//                                            me.getDataInputs();
//                                            Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').getController().cargarTotales();
//                                        }
//
//
//                                    }});
//                            }
//                        });
//                    } else {
//                        grid.getStore().removeAt(rowIndex);
//                    }
                }
            }
        });
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onAddFopClick: function (rec) {
        //var paramsFOP: {},
        var paramsAddFOP = {};
        paramsAddFOP.a4374CFOP = "";
        //paramsAddFOP.a4374TFOP = "";
        paramsAddFOP.a4374TTARJ = "";
        //paramsAddFOP.a4374TCNTR = ""; eliminado por jmmg
        paramsAddFOP.a4374VFOP = 0;
        paramsAddFOP.a4374MFOP = Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue();
        //paramsAddFOP.a4374VFOPR = 0; eliminado por jmmg
        //paramsAddFOP.a4374MFOPR = ""; eliminado por jmmg
        paramsAddFOP.a4374NREF = "";
        paramsAddFOP.a4374FEXP = "";
        paramsAddFOP.a4374CAPL = "";
        // paramsAddFOP.a4374NFAC = "";eliminado por jmmg
        //paramsAddFOP.a4374FFAC = ""; eliminado por jmmg
        //paramsAddFOP.a4374VFAC = 0; eliminado por jmmg
        //paramsAddFOP.a4374ECCB = ""; eliminado por jmmg
        paramsAddFOP.a4374EXPC = "";
        paramsAddFOP.a4374REFN = "";
        paramsAddFOP.a4374CORRL = "";

        //paramsAddFOP.a4374MNETR = "";
        //paramsAddFOP.a4374VNETR = 0;

        var grid01 = Ext.getCmp(prototype.idRftxFOP + '-det-gridDataTktFOP');
        grid01.getStore().add(paramsAddFOP);
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onAmountRenderer: function (field, newValue, oldValue) {
        field.setValue(Ext.util.Format.number(newValue, '0,000.00'));
    },
    onClickCancel: function (btn) {
        this.view.close();
    },
    onSaveFopClick: function (btn) {
        var me = this;
        var lstFopPrinci = {};
        var paramsGuardarFOP = {};
        var p = me.view.params.params;
        if (me.validaRequiredFields()) {
            var lstFop = new Array();
            for (var i = 0; i < Ext.getCmp(prototype.idRftxFOP + '-det-gridDataTktFOP').getStore().data.length; i++) {
                var bean = Ext.getCmp(prototype.idRftxFOP + '-det-gridDataTktFOP').getStore().data.items[i].data;
                var BeanFOP = {};
                BeanFOP.a4374CFOP = bean.a4374CFOP;
                BeanFOP.a4374TTARJ = bean.a4374TTARJ;
                //BeanFOP.a4374TCNTR = bean.a4374TCNTR;
                BeanFOP.a4374VFOP = bean.a4374VFOP;
                BeanFOP.a4374MFOP = bean.a4374MFOP;
                //BeanFOP.a4374VFOPR = bean.a4374VFOPR;
                //BeanFOP.a4374MFOPR = bean.a4374MFOPR;
                BeanFOP.a4374NREF = bean.a4374NREF;
                BeanFOP.a4374FEXP = bean.a4374FEXP;
                BeanFOP.a4374CAPL = bean.a4374CAPL;
                //BeanFOP.a4374NFAC = bean.a4374NFAC;
                //BeanFOP.a4374FFAC = bean.a4374FFAC;
                //BeanFOP.a4374VFAC = bean.a4374VFAC;
                //BeanFOP.a4374ECCB = bean.a4374ECCB;
                BeanFOP.a4374EXPC = bean.a4374EXPC;
                BeanFOP.a4374REFN = bean.a4374REFN;
                BeanFOP.a4374CORRL = bean.a4374CORRL;
                lstFop.push(BeanFOP);
            }


            lstFopPrinci.a4374 = lstFop;
            paramsGuardarFOP.IN_CIA = p.IN_CIA;
            paramsGuardarFOP.a4374FORMA = p.IN_FORMA;
            paramsGuardarFOP.a4374SERIE = p.IN_SERIE;
            paramsGuardarFOP.a4374SEQ = p.A713SEQ;
            paramsGuardarFOP.a4374GRUPO = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblGroup').getValue());
            paramsGuardarFOP.a4374IDFIL = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblFileId').getValue());
            paramsGuardarFOP.a4374TCAMB = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblExchangeRate').getValue());

            var mask = new Ext.LoadMask(Ext.getCmp(prototype.idRftxFOP + '-winDataEntryFOPRfnd'), {
                msg: 'Please Wait....'
            });
            mask.show();
            console.log(JSON.stringify(lstFopPrinci));
            Ext.Ajax.request({
                url: me.urlWin01 + '/ProcesaInsertFopManual/',
                timeout: 60000000,
                method: 'POST',
                params: {beanString: JSON.stringify(paramsGuardarFOP),
                    beanlstFop: JSON.stringify(lstFopPrinci)
                },
                success: function (response, options) {
                    mask.hide();
                    var res = Ext.JSON.decode(response.responseText);
                    var vp_icon = 0;
                    if (res.data === 'RECORD INSERTED') {
                        vp_icon = 1;
                    }
                    global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                            if (vp_icon === 1) {
                                me.getDataInputs();
                                Ext.getCmp(prototype.idRfnd + '-dataEntryRfnd').getController().cargarTotales();
                            }


                        }});
                }
            });


        }
    },
    validaRequiredFields: function () {
        var bvalida = true;
        var grid03 = Ext.getCmp(prototype.idRftxFOP + '-det-gridDataTktFOP');
        var regs = grid03.getStore().getCount();
        if (regs === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter payment method');
            bvalida = false;
            return;
        } else {
            for (var o = 0; o < regs; o++) {
                if (Ext.String.trim(grid03.getStore().getAt(o).get('a4374CFOP')) === '') {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter payment method');
                    bvalida = false;
                    return;
                }
                /*if (Ext.String.trim(grid03.getStore().getAt(o).get('a4374VNETR')) !== 0 && Ext.String.trim(grid03.getStore().getAt(o).get('a4374CFOP')) !== 'CA') {
                 Ext.Msg.alert('.: PRAXIS :.', 'You must enter when the payment is cash');
                 bvalida = false;
                 return;
                 }*/
                if (Ext.String.trim(grid03.getStore().getAt(o).get('a4374CFOP')) === 'CA') {
                    if (grid03.getStore().getAt(o).get('a4374TTARJ') !== '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, you not must enter the card type');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid03.getStore().getAt(o).get('a4374NREF')) !== '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, you not must enter the card number');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid03.getStore().getAt(o).get('a4374FEXP')) !== '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, younot  must enter the expiration date');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid03.getStore().getAt(o).get('a4374CAPL')) !== '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, you not must enter Approval Card');
                        bvalida = false;
                        return;
                    }
                }
                if (Ext.String.trim(grid03.getStore().getAt(o).get('a4374CFOP')) === 'CC') {
                    if (grid03.getStore().getAt(o).get('a4374TTARJ') === '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card you must enter the card type');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid03.getStore().getAt(o).get('a4374NREF')) === '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card, you must enter the card number');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid03.getStore().getAt(o).get('a4374NREF')).length < 15) {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card, you must enter the card number');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid03.getStore().getAt(o).get('a4374FEXP')) === '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card, you must enter the expiration date');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(grid03.getStore().getAt(o).get('a4374CAPL')) === '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card, you must enter Approval Card');
                        bvalida = false;
                        return;
                    }
                }
            }
        }
        return bvalida;
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
                        //console.log(resObj);
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

