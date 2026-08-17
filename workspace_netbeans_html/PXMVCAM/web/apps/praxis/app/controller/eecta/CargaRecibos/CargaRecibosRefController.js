/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.CargaRecibos.CargaRecibosRefController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id04 + '-cargaRecibosRefController',    
    url: CONTEXTPATH + '/CargaRecibos', 
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
        var VP_ACTION = strOption;
        var VP_LOTE = Ext.getCmp(prototype.id04 + '-A4096LOTE').getValue().trim();         
        return {
            VP_ACTION: VP_ACTION,
            VP_LOTE: VP_LOTE
        };
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
                msg: '¿Este proceso podria tardar unos minutos, desea continuar?',
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
        Ext.Ajax.request({
            url: me.url + '/setCargaRecibosProcesarRef',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.getDataEntryValues(strOption))                
            },
            beforerequest: Ext.getCmp(prototype.id04 + '-CargaRecibosRef').mask('Procesando...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id04 + '-CargaRecibosRef').unmask('Procesando...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE,
                    fn: function () {                                                
                        //me.search_ref();
                    }
                });
            }
        });
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
        Ext.getCmp(prototype.id04 + '-CargaRecibosRef').close();
    }, 
    cmbfiltro_clickHandler03:function(){
        //this.search_det_loadbatch();
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
        var VP_LOTE = Ext.getCmp(prototype.id04 + '-A4096LOTE').getValue().trim();
        if (VP_LOTE === '') {
              global.Msg({
                msg: 'Ingresar el numero de lote'
            });
            Ext.getCmp(prototype.id04 + '-A4096LOTE').focus();
            return;
        } 
        return mensaje;
    },
    set_ClearField: function () {
        //Initialize data INPUTS
        //Ext.getCmp(prototype.id + '-A3953CDCLI').setValue('');        
    },
    onTxtFilterKeypress03: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.search_det_loadbatch();
        }
    }
    
    
});



