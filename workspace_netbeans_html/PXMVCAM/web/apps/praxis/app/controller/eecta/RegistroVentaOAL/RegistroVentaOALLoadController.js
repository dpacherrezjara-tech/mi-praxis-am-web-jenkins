/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.RegistroVentaOAL.RegistroVentaOALLoadController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id02 + '-registroVentaOALLoadController',
    url: CONTEXTPATH + '/RegistroVentaOAL', 
    bean: {},
    init: function (view) {
        var me = this;
    },    
    afterRender: function () {            
        //this.search_det_loadbatch('2021062311');
    },
    handlerEvent_setDisabled: function () {
        
    },                
    getDataInputs: function () {      
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
                msg: '¿Cargar archivo?',
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
        var p = this.view.params;
        var strOption = p.action;
        
        var me = this;
        var file = Ext.getCmp(prototype.id02 + '-file').getValue().trim();
        if (file === '') {
            Ext.MessageBox.alert('PRAXIS', "Seleccionar archivo", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id02 + '-file').focus();", 100);
            });
            return;
        }            
        me.bean.VP_ACTION = strOption;        
        me.bean.fileName = file;
        var form = Ext.getCmp(prototype.id02 + '-form01').getForm();
        form.submit({
            url: prototype.url + '/setCargaVENTAUATPBatch',
            waitMsg: 'Procesando archivo...',
            params: {
                beanString:JSON.stringify(me.bean)
            },
            success: function (fp, o) {
                //var res = Ext.JSON.decode(response.responseText);
                var res = Ext.decode(o.response.responseText);                 
                //console.log(res);
                var objRtn = res.objRtn;
                //Ext.getCmp(prototype.id + '-RegistroVentaOALBoletoEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE, //var icons = [Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
                    fn: function () {
                        //culmino PROCESO 
                        if(objRtn.OU_A4135IDFIL !== ""){
                            //Ext.getCmp(prototype.id02 + '-A4096LOTE').setValue(objRtn.OU_A4096LOTE);
                            //me.search_det_loadbatch();
                            Ext.getCmp(prototype.id02 + '-RegistroVentaOALLoad').close();
                            Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        }                        
                    }
                });
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
        
    },
    onUpdateClick: function (btn) {
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
    },
    onDeleteClick: function (btn) {

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
    },
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.id02 + '-RegistroVentaOALLoad').close();
    }, 
    cmbfiltro_clickHandler03:function(){
        //this.search_det_loadbatch();
    },
    search_det_loadbatch:function( ){
//        me = this;
//        var bean = {};        
//        bean.VP_FDATE1 = ""; //Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha1').getValue(), 'Ymd');
//        bean.VP_FDATE2 = ""; //Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha2').getValue(), 'Ymd');
//        bean.VP_LOTE = Ext.getCmp(prototype.id02 + '-A4096LOTE').getValue();
//        bean.VP_STAT = ""; //Ext.getCmp(prototype.id + '-ESTAD').getValue();
//        bean.VP_TRXOR = Ext.getCmp(prototype.id02 + '-A4096TRXOR').getValue();
//        bean.VP_STREF = Ext.getCmp(prototype.id02 + '-A4096STREF').getValue();
//        bean.VP_CUENT = Ext.getCmp(prototype.id02 + '-A4096CUENT').getValue();
//        bean.VP_MDATX = Ext.getCmp(prototype.id02 + '-A4096MDATX').getValue();
//                
//        if (bean.VP_STREF !== '' ){
//            if (bean.VP_TRXOR === '' && bean.VP_LOTE === '' && bean.VP_CUENT ==='' && bean.VP_MDATX === ''  ){
//                global.Msg({msg: 'Ingrese Nº Lote, Recibo o Cuenta'});
//                return;
//            }
//        };
//        if (bean.VP_STREF === '' ){
//            if (bean.VP_TRXOR === '' && bean.VP_LOTE === '' && bean.VP_CUENT ==='' && bean.VP_MDATX === '' ){
//                global.Msg({msg: 'Ingrese Nº lote, Recibo o cuenta **'});
//                return;
//            }
//        };
//        Ext.Ajax.request({
//            url: prototype.url + '/search_det_loadbatch',
//            timeout: 60000000,
//            method: 'POST',
//            params: bean,
//            beforerequest: Ext.getCmp(prototype.id02 + '-RegistroVentaOALBatch').mask('Cargando...', ''),
//            success: function (response, options) {
//                var res = Ext.JSON.decode(response.responseText); 
//                Ext.getCmp(prototype.id02 + '-RegistroVentaOALBatch').unmask('Loading...', '');
//                if (res.total === 0) {
//                        global.Msg({
//                            msg: 'No hay registros'
//                        });
//                    //return;
//                }  
//                Ext.getCmp(prototype.id02 + '-infoGridRegistroVentaOALBatch').setStore(res.data);
//                Ext.getCmp(prototype.id02 + '-infoGridRegistroVentaOALBatch').getStore().reload();           
//            }
//        }); 
    },
//    onfrmReferenciaManualClick:function(){
//        this.winDataEntry();
//    },
//    winDataEntry: function (action, rec) {
//        action = action === null || action === undefined ? 'U' : action;
//        rec = rec === null || rec === undefined ? {} : rec;
//        var rec_selected = new Array();
//        var grid = Ext.getCmp(prototype.id02 + '-infoGridRegistroVentaOALBatch');
//        if (grid.getSelectionModel().hasSelection()) {
//            var selection = grid.getSelectionModel().getSelected();
//            for (var i = 0; i < selection.length; i++) {
//                var row = grid.getSelectionModel().getSelection()[i];
//                //console.log(row.get('A3957CDCLI'));
//                rec_selected.push(row.data);
//            }
//        }else{
//            global.Msg({
//                msg: 'Debe seleccionar al menos un registro'
//            });
//            return;
//        }
//        // console.log(rec_selected);
//        Ext.create('Ext.Praxis.view.eecta.RegistroVentaOALForm.RegistroVentaOALRefManual', {
//            id: prototype.id09 + '-RegistroVentaOALRefManual',
//            params: {
//                action: action,
//                rec: rec,
//                rec_selected: rec_selected
//            }
//        }).show();
//    },
    onExportXlsClick: function(){
//        var bean = {};         
//        bean.VP_A4021LOTE = Ext.getCmp(prototype.id02 + '-A4021LOTE').getValue();
//        bean.VP_BOLETO  = Ext.getCmp(prototype.id02 + '-A4021BOLETO').getValue();
//        bean.VP_A4021STAT  = Ext.getCmp(prototype.id02 + '-A4021STAT').getValue();        
//        if (bean.VP_A4021STAT !== '' ){
//            if (bean.VP_BOLETO === '' || bean.VP_A4021LOTE === '' ){
//                global.Msg({msg: 'Ingrese Nº lote y/o Boleto'});
//                return;
//            }
//        };
//        
//        Ext.Msg.show({
//            title: '.:PRAXIS:.',
//            msg: 'Download Excel File ?',            
//            buttons: Ext.MessageBox.OKCANCEL,
//            scope: this,
//            icon: Ext.MessageBox.QUESTION,
//            modal: true,
//            fn: function(btn) {
//                if (btn === 'ok') {                                            
//                    global.getFile(prototype.url + '/det_loadbatchExcel?beanString='+encodeURI(JSON.stringify(bean)));
//                }
//            }
//        });
    },    
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onFocusNumberfield: function (obj, error, eOpts) {
        obj.selectText();
    },
    onfocusleaveNumberfield:function(obj, error, eOpts){        
        var val =  obj.getValue().replace(",", "").replace(",", "");
        obj.setValue( Ext.util.Format.number( val , '0,000.00'));
       
    },
    validateForm: function (params) {
        var mensaje = "";               
        return mensaje;
    },
    set_ClearField: function () {
        //Initialize data INPUTS
        //Ext.getCmp(prototype.id + '-A3953CDCLI').setValue('');        
    },
    onTxtFilterKeypress03: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            //this.search_det_loadbatch();
        }
    }    
});



