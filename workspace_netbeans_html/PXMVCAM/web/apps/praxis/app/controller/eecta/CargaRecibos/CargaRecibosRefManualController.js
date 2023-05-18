/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.CargaRecibos.CargaRecibosRefManualController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id09 + '-cargaRecibosRefManualController',    
    url: CONTEXTPATH + '/CargaRecibos', 
    url01: CONTEXTPATH + '/CatalogoCliente', 
    bean: {},
    init: function (view) {
        var me = this;
    },    
    afterRender: function () {   
        Ext.getCmp(prototype.id09 + '-A4097CDCLI').focus();
        this.getDataInputs();
    },
    handlerEvent_setDisabled: function () {
        
    },                
    getDataInputs: function () {  
        this.get_selectedRows();
    },
    get_selectedRows: function () {
        var p = this.view.params;        
        //console.log(p.rec_selected);        
        Ext.getCmp(prototype.id09 + '-infoGridSeleccionados').setStore(p.rec_selected);
        Ext.getCmp(prototype.id09 + '-infoGridSeleccionados').getStore().reload();
    },
    get_SelectedRecords:function(){        
        var arrayRows = new Array();
        var grid = Ext.getCmp(prototype.id09 + '-infoGridSeleccionados').getStore();      
        //console.log(grid.data);
        grid.data.items.forEach(function (row) {
              //console.log(row.data);
              var rec_obj = {
                    A4096CCUST:row.get('A4096CCUST'),
                    A4096LOTE:row.get('A4096LOTE'),
                    A4096SQCG:row.get('A4096SQCG'), 
                    A4096NRO:row.get('A4096NRO'), 
                    A4096TRXOR:row.get('A4096TRXOR'),
                    A4096DESCR:row.get('A4096DESCR'), 
                    A4096REFER:row.get('A4096REFER')                   
                };
                arrayRows.push( rec_obj );
        });
//        console.log(arrayRows);
        return arrayRows;
    },
    getDataEntryValues: function (strOption) {
        var VP_ACTION = strOption;
        var VP_CDCLI = Ext.getCmp(prototype.id09 + '-A4097CDCLI').getValue().trim();         
        return {
            VP_ACTION: VP_ACTION,
            VP_CDCLI: VP_CDCLI
        };
    },    
    onGrabaReferenciaManualClick: function (btn) {
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
                msg: '¿Asignar cliente a los recibos seleccionados?',
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
        
        var VL_json_detail = this.get_SelectedRecords();
        
        //return;
        
        Ext.Ajax.request({
            url: me.url + '/setReciboAsignarCliente',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.getDataEntryValues(strOption)),
                json_detail: JSON.stringify(VL_json_detail)
            },
            beforerequest: Ext.getCmp(prototype.id09 + '-CargaRecibosRefManual').mask('Procesando...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id09 + '-CargaRecibosRefManual').unmask('Procesando...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE,
                    fn: function () {    
                        me.onCancelClick();
                        Ext.getCmp(prototype.id02 + '-btnSearch').fireEvent('click', {});
                    }
                });
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
        Ext.getCmp(prototype.id09 + '-CargaRecibosRefManual').close();
    }, 
    OnEventbuscarCliente: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.onBuscarCliente();
        }
    },
    onBuscarCliente:function(){
        var me = this;
        var bean = {};        
        bean.VP_OPCION = "1";
        bean.VP_CDCLI = Ext.getCmp(prototype.id09+'-A4097CDCLI-filt').getValue();
        bean.VP_PARAM1 = "";  
        if (bean.VP_CDCLI === ""){
            global.Msg({msg: 'Ingrese Código de Cliente'});
            return;
        }
        Ext.Ajax.request({
            url: me.url01 + '/search',
            timeout: 60000000,
            method: 'POST',
            params: bean,
            beforerequest: Ext.getCmp(prototype.id09 + '-CargaRecibosRefManual').mask('Buscando cliente...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);                
                Ext.getCmp(prototype.id09 + '-CargaRecibosRefManual').unmask('Loading...', '');
                if (res.total === 0) {
                        global.Msg({
                            msg: 'No se econtro cliente'
                        });
                    return;
                }                                
                //console.log(res.data[0].A3953RSOCI);
                Ext.getCmp(prototype.id09 + '-A4097CDCLI').setValue(res.data[0].A3953CDCLI);
                Ext.getCmp(prototype.id09 + '-A3953RSOCI').setValue(res.data[0].A3953RSOCI);
            }
        });   
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
        if (params.VP_CDCLI === '') {
            mensaje = 'No hay cliente asignado';            
            Ext.getCmp(prototype.id09 + '-A4097CDCLI-filt').focus();            
        } 
        return mensaje;
    },
    set_ClearField: function () {
        //Initialize data INPUTS
        //Ext.getCmp(prototype.id + '-A3953CDCLI').setValue('');        
    },
    onTxtFilterKeypress03: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
           // this.search_det_loadbatch();
        }
    }
    
    
});



