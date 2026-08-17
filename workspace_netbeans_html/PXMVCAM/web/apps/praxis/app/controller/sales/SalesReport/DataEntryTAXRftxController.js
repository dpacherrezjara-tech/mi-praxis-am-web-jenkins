/*
 * @Dvicente
 */
Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryTAXRftxController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryTAXRftxController',
    urlWin01: CONTEXTPATH + '/SalesReport',
    objSt: '',
    objReq: '',
    init: function (view) {
        var me = this;
        this.objReq = {CTAX: '', CORRL: '', ...this.view.params.requestParams};
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
                urlReq.url = this.urlWin01 + '/getRftxTax';
                urlReq.method = 'GET';
                break;
            case 'i':
                urlReq.url = this.urlWin01 + '/addEntryRftxTax';
                urlReq.method = 'POST';
                break;
            case 'u':
                urlReq.url = this.urlWin01 + '/updEntryRftxTax';
                urlReq.method = 'PUT';
                break;
            case 'd':
                urlReq.url = this.urlWin01 + '/delEntryRftxTax';
                urlReq.method = 'DELETE';
                break;
            default :
                urlReq = null;
        }
        return urlReq;
    },
    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.idRftxTAX + '-det-gridDataTktTAX');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRftxTAX + '-store-gridTktTAX'
        });

        grid01.setStore(store01);
    },
    getDataInputs: async function () {
        var me = this;
        var gridDataTktTAX = Ext.getCmp(prototype.idRftxTAX + '-det-gridDataTktTAX');
        var gridTAXADD = Ext.getCmp(prototype.idRftxTAX + '-gridTAXADD');
        var gridTAXSave = Ext.getCmp(prototype.idRftxTAX + '-gridTAXSave');
        switch (this.objSt) {
            case 'CLOSED':
                gridTAXSave.hide();
                gridTAXADD.hide();
                gridDataTktTAX.columns[7].setVisible(false);
                break;
            case 'OPEN':
                //mantenimiento en stnnd by
//                gridTAXSave.show();
//                gridTAXADD.show();
//                gridDataTktTAX.columns[7].setVisible(true);
                gridTAXSave.hide();
                gridTAXADD.hide();
                gridDataTktTAX.columns[7].setVisible(false);
                break;

        }
        Ext.getCmp(prototype.idRftxTAX + '-winDataEntryTAXRftx').mask('Loading...');
        let action = this.getUrlAction('l')||'l';
        let response = await this.getFetchAsync(action.url, this.objReq);
        if (response.success) {
            Ext.getCmp(prototype.idRftxTAX + '-det-gridDataTktTAX').getStore().loadData(response.data);
            Ext.getCmp(prototype.idRftxTAX + '-winDataEntryTAXRftx').unmask();
        }
    },
    OnTAXRemove: function (grid, rowIndex, colIndex) {
        let me=this;
        let rec = grid.getStore().getAt(rowIndex).data;
        let params = me.objReq;
        let action = this.getUrlAction('d');
        global.Msg({
            msg:'DELETE TAX?',
            icon:3,
            buttons:3,
            fn:async function(btn){
                if (btn === 'yes'){
                    params.CTAX = rec.a4375CTAX;
                    params.CORRL = rec.a4375CORRL;
                    await me.getFetchAsync(action.url,params,action.method);
                }
            }
        });
//        global.Msg({
//            msg: 'DELETE TAX?',
//            icon: 3,
//            buttons: 3,
//            fn: function (btn) {
//                if (btn === 'yes') {
//
//                    if (rec.data.A1732CORRL !== '') {
//                        paramsGuardarTAX.IN_OPTION = "2";
//                        paramsGuardarTAX.IN_CIA = p.IN_CIA;
//                        paramsGuardarTAX.A1731FORMA = p.IN_FORMA;
//                        paramsGuardarTAX.A1731SERIE = p.IN_SERIE;
//                        paramsGuardarTAX.A1731SEQ = p.A713SEQ;
//                        paramsGuardarTAX.A1731CORRL = rec.data.A1732CORRL;
//                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idRftxTAX + '-winDataEntryTAXRfnd'), {
//                            msg: 'Please Wait....'
//                        });
//                        mask.show();
//                        Ext.Ajax.request({
//                            url: me.urlWin01 + '/ProcesaDeleteEntryRfndCompleManual/',
//                            timeout: 60000000,
//                            method: 'POST',
//                            params: {beanString: JSON.stringify(paramsGuardarTAX)},
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
//
//                    //
//                }
//            }
//        });
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
    onAddTAXClick: function (rec) {
        //var paramsTAX: {},
        var paramsAddTAX = {};
        paramsAddTAX.A1732CTAX = "";
        paramsAddTAX.A1732MTAX = Ext.getCmp(prototype.idRfnd + '-det-lblLocalCur').getValue();
        paramsAddTAX.A1732VTAX = 0;
        paramsAddTAX.A1732APFC = "";
        paramsAddTAX.A1732PSTAX = "";
        paramsAddTAX.A1732TIPO = "";
        paramsAddTAX.A1732TCTR = "";
        paramsAddTAX.A1732CORRL = "";

        var grid01 = Ext.getCmp(prototype.idRftxTAX + '-det-gridDataTktTAX');
        grid01.getStore().add(paramsAddTAX);
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
    onSaveTAXClick: function (btn) {
        var me = this;
        var totalyq = 0;
        var lstTAXPrinci = {};
        var paramsGuardarTAX = {};
        var p = me.view.params.params;
        if (me.validaRequiredFields()) {
            var lstTAX = new Array();
            for (var i = 0; i < Ext.getCmp(prototype.idRftxTAX + '-det-gridDataTktTAX').getStore().data.length; i++) {
                var bean = Ext.getCmp(prototype.idRftxTAX + '-det-gridDataTktTAX').getStore().data.items[i].data;
                if (Ext.String.trim(bean.A1732CTAX).substr(0, 2) === 'YQ') {
                    totalyq += bean.A1732VTAX;
                }
                var BeanTAX = {};
                BeanTAX.A1732CTAX = bean.A1732CTAX;
                BeanTAX.A1732MTAX = bean.A1732MTAX;
                BeanTAX.A1732VTAX = bean.A1732VTAX;
                BeanTAX.A1732APFC = bean.A1732APFC;
                // BeanTAX.A1732PSTAX = bean.A1732PSTAX;
                //BeanTAX.A1732TIPO = bean.A1732TIPO;
                // BeanTAX.A1732TCTR = bean.A1732TCTR;
                BeanTAX.A1732CORRL = bean.A1732CORRL;
                //BeanTAX.A1732CABECERA = 'A1732';
                lstTAX.push(BeanTAX);


            }

            lstTAXPrinci.A1732 = lstTAX;
            paramsGuardarTAX.IN_CIA = p.IN_CIA;
            paramsGuardarTAX.A1732FORMA = p.IN_FORMA;
            paramsGuardarTAX.A1732SERIE = p.IN_SERIE;
            paramsGuardarTAX.A1732SEQ = p.A713SEQ;
            paramsGuardarTAX.A1732TOTALYQ = totalyq;
            paramsGuardarTAX.A1732FARE = Ext.getCmp(prototype.idRfnd + '-det-lblFARE2').getValue().replace(new RegExp(',', 'g'), '');
            paramsGuardarTAX.A1732TIDOC = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblDocType').getValue());
            paramsGuardarTAX.A1732GRUPO = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblGroup').getValue());
            paramsGuardarTAX.A1732IDFIL = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblFileId').getValue());
            paramsGuardarTAX.A1732RATE = Ext.String.trim(Ext.getCmp(prototype.idRfnd + '-det-lblExchangeRate').getValue());

            var mask = new Ext.LoadMask(Ext.getCmp(prototype.idRftxTAX + '-winDataEntryTAXRfnd'), {
                msg: 'Please Wait....'
            });
            mask.show();
            Ext.Ajax.request({
                url: me.urlWin01 + '/ProcesaInsertTAXManual/',
                timeout: 60000000,
                method: 'POST',
                params: {beanString: JSON.stringify(paramsGuardarTAX),
                    beanlstTAX: JSON.stringify(lstTAXPrinci)
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
        var grid03 = Ext.getCmp(prototype.idRftxTAX + '-det-gridDataTktTAX');
        var regs = grid03.getStore().getCount();
        if (regs === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter Tax');
            bvalida = false;
            return;
        } else {
            for (var o = 0; o < regs; o++) {
                if (Ext.String.trim(grid03.getStore().getAt(o).get('A1732CTAX')).length === 0) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter Code Tax');
                    bvalida = false;
                    return;
                }
                if (Ext.String.trim(grid03.getStore().getAt(o).get('A1732MTAX')).length === 0) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter Currency');
                    bvalida = false;
                    return;
                }
                if (grid03.getStore().getAt(o).get('A1732VTAX') === 0 || grid03.getStore().getAt(o).get('A1732VTAX') === 0.00) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter Tax Fee Amount');
                    bvalida = false;
                    return;
                }
                if ((global.FechaActual().replace(new RegExp('/', 'g'), '') < '20160208' && Ext.String.trim(grid03.getStore().getAt(o).get('A1732CTAX')) === 'F4') || (global.FechaActual().replace(new RegExp('/', 'g'), '') >= '20160208' && Ext.String.trim(grid03.getStore().getAt(o).get('A1732CTAX')) === 'F41')) {
                    Ext.Msg.alert('.: PRAXIS :.', 'Not enter F4');
                    bvalida = false;
                    return;
                }
                if (Ext.String.trim(grid03.getStore().getAt(o).get('A1732CTAX')) === 'XF' && Ext.String.trim(grid03.getStore().getAt(o).get('A1732APFC')).length < 3) {
                    Ext.Msg.alert('.: PRAXIS :.', 'Please, enter Airport for tax XF');
                    bvalida = false;
                    return;
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
                }else{
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

