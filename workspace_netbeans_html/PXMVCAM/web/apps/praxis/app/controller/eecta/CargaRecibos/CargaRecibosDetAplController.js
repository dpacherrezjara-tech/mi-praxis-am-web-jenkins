/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//console.log('xxxxx');

Ext.define('Ext.Praxis.controller.eecta.CargaRecibos.CargaRecibosDetAplController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id05 + '-cargaRecibosDetAplController',
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
        //Ext.getCmp(prototype.id05 + '-file').setDisabled(bflag);
        //Ext.getCmp(prototype.id05 + '-btn-upload').setDisabled(bflag);        
    },
    getDataInputs: function () {
        var p = this.view.params;
        var data = p.rec.data;
        //console.log(data);
        //var vtitle = Ext.getCmp(prototype.id05 + '-AplPaymentBoletoEntry').getTitle();
        //Ext.getCmp(prototype.id05 + '-AplPaymentBoletoEntry').setTitle( vtitle + ' Nº: ' + data.A3957NRRPT );        
        Ext.getCmp(prototype.id05 + '-A4102IDRCB').setValue(data.A4102IDRCB);
        Ext.getCmp(prototype.id05 + '-A4102CDCLI').setValue(data.A4102CDCLI);        
        Ext.getCmp(prototype.id05 + '-A3953RSOCI').setValue(data.A3953RSOCI.trim()); 
        Ext.getCmp(prototype.id05 + '-A4102FECRC').setValue(data.A4102FECRC);    
        Ext.getCmp(prototype.id05 + '-A4102QTYRC').setValue(Ext.util.Format.number( data.A4102QTYRC , '0,000'));
        Ext.getCmp(prototype.id05 + '-A4102TOTRC').setValue(Ext.util.Format.number( data.A4102TOTRC , '0,000.00'));
        Ext.getCmp(prototype.id05 + '-A4102MDARC').setValue(data.A4102MDARC);
        Ext.getCmp(prototype.id05 + '-A4102TOTAP').setValue(Ext.util.Format.number( data.A4102TOTAP , '0,000.00'));
        Ext.getCmp(prototype.id05 + '-A4102SALDO').setValue(Ext.util.Format.number( data.A4102SALDO , '0,000.00'));               
        this.get_apl_recibo();        
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
        Ext.getCmp(prototype.id05 + '-CargaRecibosDetAplForm').close();
    },           
    get_apl_recibo: function () {        
        var p = this.view.params;        
        //console.log(p);                 
        var bean = {};        
        bean.VP_IDRCB = p.rec.data.A4102IDRCB;
        
        //bean.limit = "-1";
        //bean.page = "-1";
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.GridData', {        
            proxy: {
                url: prototype.url + '/get_apl_recibo'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");                                        
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id05 + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id05 + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id05 + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id05 + '-lbl-total').setText(total);
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
        Ext.getCmp(prototype.id05 + '-infoGridCab').setStore(storeGridDatas);
        Ext.getCmp(prototype.id05 + '-infoGridCab').getStore().reload();
    },
    get_apl_recibo_det: function ( grid, rowIndex, colIndex ) { 
        var rec = [];
        Ext.getCmp(prototype.id05 + '-infoGridDet').setTitle( '' );
        var VL_IDPG = '';
        //console.log('rowIndex: '  + rowIndex);
        if(rowIndex >= 0){
            rec = grid.getStore().getAt(rowIndex); 
            //console.log('rec: '  + rec.data);
            VL_IDPG = rec.data.A4105IDAPL;              
            Ext.getCmp(prototype.id05 + '-infoGridDet').setTitle( 'Detalle Id pago nº: ' + rec.data.A4105IDAPL ); 
            Ext.getCmp(prototype.id05 + '-A4106NUMRC').setValue("");
        }
        var bean = {};        
        bean.VP_IDPG = VL_IDPG;                
        bean.VP_RECIBO = Ext.getCmp(prototype.id05 + '-A4106NUMRC').getValue();
                        
        bean.limit = "-1";
        bean.page = "-1";
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.GridData', {        
            proxy: {
                url: prototype.url + '/get_apl_recibo_det'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id05 + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id05 + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id05 + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id05 + '-lbl-total').setText(total);
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
        Ext.getCmp(prototype.id05 + '-infoGridDet').setStore(storeGridDatas);
        Ext.getCmp(prototype.id05 + '-infoGridDet').getStore().reload();
    },
    onTxtFilterKeypress01: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.get_apl_recibo_det();
        }
    }
    
});



