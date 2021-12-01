/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('Ext.Praxis.controller.eecta.CargaRecibos.CargaRecibosDetRecController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id06 + '-cargaRecibosDetRecController',
    url: CONTEXTPATH + '/CargaRecibos',
    /**
     * Constructor
     */
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.getDataInputs();
    },
    handlerEvent_setDisabled: function (bflag) {
        //boton logo
        //Ext.getCmp(prototype.id06 + '-file').setDisabled(bflag);
        //Ext.getCmp(prototype.id06 + '-btn-upload').setDisabled(bflag);        
    },
    getDataInputs: function () {
        var p = this.view.params;
        var data = p.rec.data;
        //console.log(data);
        //var vtitle = Ext.getCmp(prototype.id06 + '-AplPaymentBoletoEntry').getTitle();
        //Ext.getCmp(prototype.id06 + '-AplPaymentBoletoEntry').setTitle( vtitle + ' Nº: ' + data.A3957NRRPT );

        Ext.getCmp(prototype.id06 + '-A4102IDRCB').setValue(data.A4102IDRCB);
        Ext.getCmp(prototype.id06 + '-A4102CDCLI').setValue(data.A4102CDCLI);
        Ext.getCmp(prototype.id06 + '-A3953RSOCI').setValue(data.A3953RSOCI.trim());
        Ext.getCmp(prototype.id06 + '-A4102FECRC').setValue(data.A4102FECRC); //Ext.util.Format.date(data.A3957INIPR, 'Y/m/d')                
        Ext.getCmp(prototype.id06 + '-A4102QTYRC').setValue(Ext.util.Format.number(data.A4102QTYRC, '0,000'));
        Ext.getCmp(prototype.id06 + '-A4102TOTRC').setValue(Ext.util.Format.number(data.A4102TOTRC, '0,000.00'));
        Ext.getCmp(prototype.id06 + '-A4102MDARC').setValue(data.A4102MDARC);
        Ext.getCmp(prototype.id06 + '-A4102TOTAP').setValue(Ext.util.Format.number(data.A4102TOTAP, '0,000.00'));
        Ext.getCmp(prototype.id06 + '-A4102SALDO').setValue(Ext.util.Format.number(data.A4102SALDO, '0,000.00'));

        this.get_detalleRecibos();
    },
//    getDataEntryValues: function (strOption) {        
//    },    
//    onSaveClick: function (btn) {
//        var p = this.view.params;
//        var strOption = p.action;
//        var params = this.getDataEntryValues(strOption);
//        var strMsg = this.validateForm(params);
//        if (strMsg.trim() !== '') {
//            global.Msg({
//                msg: strMsg
//            });
//        } else {
//            Ext.Msg.show({
//                title: '.:PRAXIS:.',
//                msg: 'Are you sure to insert?',
//                buttons: Ext.MessageBox.YESNO,
//                scope: this,
//                icon: Ext.MessageBox.QUESTION,
//                modal: true,
//                fn: function (btn) {
//                    if (btn === 'yes') {
//                        this.view.params.action = "I";
//                        this.crud();
//                    }
//                }
//            });
//        }
//    },
//    crud: function () {        
//    },
//    onUpdateClick: function (btn) {
//        var p = this.view.params;
//        var strOption = p.action;
//        var params = this.getDataEntryValues(strOption);
//        var strMsg = this.validateForm(params);
//        if (strMsg.trim() !== '') {
//            global.Msg({
//                msg: strMsg
//            });
//        } else {
//            Ext.Msg.show({
//                title: '.:PRAXIS:.',
//                msg: 'Are you sure to update ?',
//                scope: this,
//                buttons: Ext.MessageBox.YESNO,
//                icon: Ext.MessageBox.QUESTION,
//                modal: true,
//                fn: function (btn) {
//                    if (btn === 'yes') {
//                        this.view.params.action = "U";
//                        this.crud();
//                    }
//                }
//            });
//        }
//    },
//    onDeleteClick: function (btn) {
//        Ext.Msg.show({
//            title: '.:PRAXIS:.',
//            msg: 'Are you sure to delete ?',
//            buttons: Ext.MessageBox.YESNO,
//            scope: this,
//            icon: Ext.MessageBox.QUESTION,
//            modal: true,
//            fn: function (btn) {
//                if (btn === 'yes') {
//                    this.view.params.action = "D";
//                    this.crud();
//                }
//            }
//        });
//    },
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.id06 + '-CargaRecibosDetRecForm').close();
    },
    get_detalleRecibos: function () {
        var p = this.view.params;
        //console.log(p);                 
        var bean = {};

        bean.VP_FDATE1 = "";
        bean.VP_FDATE2 = "";
        bean.VP_LOTE = "";
        bean.VP_STAT = "";
        bean.VP_TRXOR = "";
        bean.VP_IDRCB = p.rec.data.A4102IDRCB;

        //bean.limit = "-1";
        //bean.page = "-1";
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.GridData', {
            proxy: {
                url: prototype.url + '/searchDet'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");                                        
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id06 + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id06 + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id06 + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id06 + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id06 + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id06 + '-gridData').getStore().reload();
        Ext.getCmp(prototype.id06 + '-paggin').setStore(storeGridDatas);
    },

    get_aplpago_detalle: function (grid, rowIndex, colIndex) {
        var rec = [];
        Ext.getCmp(prototype.id06 + '-infoGridAppliedPaymentDet').setTitle('');
        var VL_IDPG = '';
        console.log('rowIndex: ' + rowIndex);
        if (rowIndex > 0) {
            rec = grid.getStore().getAt(rowIndex);
            VL_IDPG = rec.data.A3959IDPG;
            Ext.getCmp(prototype.id06 + '-infoGridAppliedPaymentDet').setTitle('Detalle Id pago nº: ' + rec.data.A3959IDPG);
            Ext.getCmp(prototype.id06 + '-TICKET-NUMB').setValue("");
        }
        var bean = {};
        bean.VP_IDPG = VL_IDPG;
        var vl_ticket_cia = Ext.getCmp(prototype.id06 + '-TICKET-CIA').getValue();
        var vl_ticket_num = Ext.getCmp(prototype.id06 + '-TICKET-NUMB').getValue();
        var vl_ticket_seq = Ext.getCmp(prototype.id06 + '-TICKET-SEQ').getValue();
        bean.VP_TICKET = "";
        if (vl_ticket_num !== "") {
            bean.VP_TICKET = vl_ticket_cia + vl_ticket_num + vl_ticket_seq;
        }

        bean.limit = "-1";
        bean.page = "-1";
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.AplPayment.GridData', {
            proxy: {
                url: prototype.url + '/get_aplpago_detalle'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id06 + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id06 + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id06 + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id06 + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found detail'
                        });
                    }
                    global.clear();
                }
            }
        });
        Ext.getCmp(prototype.id06 + '-infoGridAppliedPaymentDet').setStore(storeGridDatas);
        Ext.getCmp(prototype.id06 + '-infoGridAppliedPaymentDet').getStore().reload();
    },
    onTxtFilterKeypress01: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.get_aplpago_detalle();
        }
    },

    get_anular_recibo: function (grid, rowIndex) {
        var me = this;
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var bean = {};
        bean.VP_A4103IDRCB = rec.data.A4103IDRCB;
        bean.VP_A4103SQRCB = rec.data.A4103SQRCB;
        bean.VP_A4103NRO = rec.data.A4103NRO;
        bean.VP_A4103LOTE = rec.data.A4103LOTE;

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: '¿ANULAR RECIBO ' + rec.data.A4103NUMRC + ' ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    Ext.Ajax.request({
                        url: me.url + '/setAnulaReciboAsignadoCliente',
                        timeout: 60000000,
                        method: 'POST',
                        params: {
                            beanString: JSON.stringify(bean)
                        },
                        beforerequest: Ext.getCmp(prototype.id06 + '-CargaRecibosDetRecForm').mask('Procesando...', ''),
                        success: function (response, options) {
                            var res = Ext.JSON.decode(response.responseText);
                            var objRtn = res.objRtn;
                            Ext.getCmp(prototype.id06 + '-CargaRecibosDetRecForm').unmask('Loading...', '');
                            global.Msg({
                                msg: objRtn.dbException.MESSAGE,
                                icon: objRtn.dbException.SQLCODE, //var icons = [Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
                                fn: function () {
                                    //culmino PROCESO                                                            
                                    me.getDataInputs();
                                }
                            });
                        }
                    });
                }
            }
        });

    }

});



