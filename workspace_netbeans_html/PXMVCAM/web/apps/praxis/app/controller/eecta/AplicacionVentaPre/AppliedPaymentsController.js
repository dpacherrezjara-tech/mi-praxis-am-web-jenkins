/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.AplicacionVentaPre.AppliedPaymentsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-appliedPaymentsFormController',
    url: CONTEXTPATH + '/AplicacionVentaPre',
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
        //Ext.getCmp(prototype.id + '-file').setDisabled(bflag);
        //Ext.getCmp(prototype.id + '-btn-upload').setDisabled(bflag);        
    },
    getDataInputs: function () {
        var p = this.view.params;
        var data = p.rec.data;
        //console.log(data);
        //var vtitle = Ext.getCmp(prototype.id + '-AplPaymentBoletoEntry').getTitle();
        //Ext.getCmp(prototype.id + '-AplPaymentBoletoEntry').setTitle( vtitle + ' Nº: ' + data.A4245NRRPT );
        Ext.getCmp(prototype.id + '-A3958NRRPT').setValue(data.A4245NRRPT);
        Ext.getCmp(prototype.id + '-A3958CDCLI').setValue(data.A4245CDCLI);        
        Ext.getCmp(prototype.id + '-A3953RSOCI').setValue(data.A3953RSOCI.trim()); 
        Ext.getCmp(prototype.id + '-A4245INIPR').setValue(data.A4245INIPR); //Ext.util.Format.date(data.A4245INIPR, 'Y/m/d')
        Ext.getCmp(prototype.id + '-A4245FINPR').setValue(data.A4245FINPR);        
        Ext.getCmp(prototype.id + '-A4245TOT').setValue(Ext.util.Format.number( data.A4245TOT , '0,000.00'));
        Ext.getCmp(prototype.id + '-A4245MDLOC').setValue(data.A4245MDLOC);
        Ext.getCmp(prototype.id + '-A4245TOTAP').setValue(Ext.util.Format.number( data.A4245TOTAP , '0,000.00'));
        Ext.getCmp(prototype.id + '-A4245SALDP').setValue(Ext.util.Format.number( data.A4245SALDP , '0,000.00'));       
        
        this.get_aplpago();        
    },
    getDataEntryValues: function (strOption) {        
    },    
    onSaveClick: function (btn) {
        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);
        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "I";
                        this.crud();
                    }
                }
            });
        }
    },
    crud: function () {        
    },
    onUpdateClick: function (btn) {
        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);
        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to update ?',
                scope: this,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "U";
                        this.crud();
                    }
                }
            });
        }
    },
    onDeleteClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.view.params.action = "D";
                    this.crud();
                }
            }
        });
    },
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.id + '-AppliedPaymentsForm').close();
    },           
    get_aplpago: function () {        
        var p = this.view.params;        
        //console.log(p);                 
        var bean = {};        
        bean.VP_NRRPT = p.rec.data.A4245NRRPT;
        bean.VP_CDCLI = p.rec.data.A4245CDCLI;
        //bean.limit = "-1";
        //bean.page = "-1";
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.AplPayment.GridData', {        
            proxy: {
                url: prototype.url + '/get_aplpago'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");                                        
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
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
        Ext.getCmp(prototype.id + '-infoGridAppliedPaymentCab').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-infoGridAppliedPaymentCab').getStore().reload();
    },
    get_aplpago_detalle: function ( grid, rowIndex, colIndex ) { 
        var rec = [];
        Ext.getCmp(prototype.id + '-infoGridAppliedPaymentDet').setTitle( '' );
        var VL_IDPG = '';
        //console.log('rowIndex: '  + rowIndex);
        if(rowIndex>=0){
            rec = grid.getStore().getAt(rowIndex); 
            VL_IDPG = rec.data.A4252IDPG;              
            Ext.getCmp(prototype.id + '-infoGridAppliedPaymentDet').setTitle( 'Detalle Id Apl. nº: ' + rec.data.A4252IDPG ); 
            Ext.getCmp(prototype.id + '-TICKET-NUMB').setValue("");
        }
        var bean = {};        
        bean.VP_IDPG = VL_IDPG;        
        var vl_ticket_cia = Ext.getCmp(prototype.id + '-TICKET-CIA').getValue();
        var vl_ticket_num = Ext.getCmp(prototype.id + '-TICKET-NUMB').getValue();
        var vl_ticket_seq = Ext.getCmp(prototype.id + '-TICKET-SEQ').getValue();
        bean.VP_TICKET =  "";
        if (vl_ticket_num !== ""){
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
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
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
        Ext.getCmp(prototype.id + '-infoGridAppliedPaymentDet').setStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-infoGridAppliedPaymentDet').getStore().reload();
    },
    onTxtFilterKeypress01: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.get_aplpago_detalle();
        }
    }
    
});



