/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.CatalogoCliente.CatalogoClienteRefController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id03 + '-dataEntryRefController',
    url: CONTEXTPATH + '/CatalogoCliente',   
    init: function () {
        //var me = this;
    },    
    afterRender: function () {
        //SET store Grid
        var p = this.view.params;        
        var grid01 = Ext.getCmp(prototype.id03 + '-gridData');
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.GridData', {});
        grid01.setStore(storeGridDatas);
        this.getDataInputs();        
        //Ext.getCmp(prototype.id03 + '-btn-delete').hide();
        Ext.getCmp(prototype.id03 + '-btn-update').hide();
        Ext.getCmp(prototype.id03 + '-btn-save').hide();
        Ext.getCmp(prototype.id03 + '-btn-new').show();
        Ext.getCmp(prototype.id03 + '-btn-cancel').hide();
        Ext.getCmp(prototype.id03 + '-btn-edit').hide();                
    },
    onNewClick_id03: function () {        
        this.get_ClearField();
        //Ext.getCmp(prototype.id03 + '-btn-delete').hide();
        Ext.getCmp(prototype.id03 + '-btn-update').hide();
        Ext.getCmp(prototype.id03 + '-btn-new').hide();
        Ext.getCmp(prototype.id03 + '-btn-save').show();
        Ext.getCmp(prototype.id03 + '-btn-cancel').show(); 
        Ext.getCmp(prototype.id03 + '-A4097CDCLI').setReadOnly(false); 
        Ext.getCmp(prototype.id03 + '-A4097CDCLI').focus();
    },
    onCancelClick_id03:function(){
        //Ext.getCmp(prototype.id03 + '-btn-delete').hide();
        Ext.getCmp(prototype.id03 + '-btn-update').hide();
        Ext.getCmp(prototype.id03 + '-btn-save').hide();
        Ext.getCmp(prototype.id03 + '-btn-new').show();
        Ext.getCmp(prototype.id03 + '-btn-cancel').hide();
        //enable
        Ext.getCmp(prototype.id03 + '-A4097REF1').setReadOnly(true);
        Ext.getCmp(prototype.id03 + '-A4097REF2').setReadOnly(true);
        Ext.getCmp(prototype.id03 + '-A4097REF3').setReadOnly(true);
        Ext.getCmp(prototype.id03 + '-A4097REF4').setReadOnly(true);
        Ext.getCmp(prototype.id03 + '-A4097STAT').setReadOnly(true);        
    },
    onEditClick_id03:function(){
        //Ext.getCmp(prototype.id03 + '-btn-delete').show();
        Ext.getCmp(prototype.id03 + '-btn-update').show();
        Ext.getCmp(prototype.id03 + '-btn-cancel').show();
        Ext.getCmp(prototype.id03 + '-btn-save').hide();
        Ext.getCmp(prototype.id03 + '-btn-new').hide();
        Ext.getCmp(prototype.id03 + '-btn-edit').hide();
        //enable
        Ext.getCmp(prototype.id03 + '-A4097REF1').setReadOnly(false);
        Ext.getCmp(prototype.id03 + '-A4097REF2').setReadOnly(false);
        Ext.getCmp(prototype.id03 + '-A4097REF3').setReadOnly(false);
        Ext.getCmp(prototype.id03 + '-A4097REF4').setReadOnly(false);
        Ext.getCmp(prototype.id03 + '-A4097STAT').setReadOnly(false);
        Ext.getCmp(prototype.id03 + '-A4097REF4').focus();
    },
    getDataInputs: function () {      
        this.search_ref();
    },
    getDataEntryValues: function (strOption) {
        var VP_ACTION = strOption;
        var VL_A4097CDCLI = Ext.getCmp(prototype.id03 + '-A4097CDCLI').getValue();
        var VL_A4097SEQ = Ext.getCmp(prototype.id03 + '-A4097SEQ').getValue();
        var VL_A4097REF1 = Ext.getCmp(prototype.id03 + '-A4097REF1').getValue();
        var VL_A4097REF2 = Ext.getCmp(prototype.id03 + '-A4097REF2').getValue(); 
        var VL_A4097REF3 = Ext.getCmp(prototype.id03 + '-A4097REF3').getValue(); 
        var VL_A4097REF4 = Ext.getCmp(prototype.id03 + '-A4097REF4').getValue(); 
        var VL_A4097STAT = Ext.getCmp(prototype.id03 + '-A4097STAT').getValue();         
        return {
            VP_ACTION: VP_ACTION,
            A4097CDCLI: VL_A4097CDCLI,
            A4097SEQ: VL_A4097SEQ,
            A4097NCLIO: '',
            A4097CTABC: '',
            A4097REF1: VL_A4097REF1,
            A4097REF2: VL_A4097REF2,            
            A4097REF3: VL_A4097REF3,
            A4097REF4: VL_A4097REF4,
            A4097STAT: VL_A4097STAT
        };
    },
    onSaveClick_id03: function (btn) {
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
        var p = this.view.params;
        var strOption = p.action;        
        var me = this;
        
        Ext.Ajax.request({
            url: me.url + '/ref_bancaria_crud',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.getDataEntryValues(strOption))                
            },
            beforerequest: Ext.getCmp(prototype.id03 + '-CatalogoClienteRef').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id03 + '-CatalogoClienteRef').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE,
                    fn: function () {                                                
                        me.search_ref();
                        me.onCancelClick_id03();
                        me.get_ClearField();
                    }
                });
            }
        });

    },
    onUpdateClick_id03: function (btn) {
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
    onDeleteClick_id03: function (btn) {
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
//    onCancelClick: function (btn) {
//        Ext.getCmp(prototype.id + '-CatalogoClienteEntry').close();
//    },
    onTxtFilterKeypress: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.search_ref();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onFocusNumberfield: function (obj, error, eOpts) {
        obj.selectText();
    },
    validateForm: function (params) {
//        console.log(params);
        var mensaje = "";
        if (params.A4097REF1 === '' && params.A4097REF2 === '' ) {
            mensaje = 'Ingresar al menos un campo de Referencia';
            Ext.getCmp(prototype.id03 + '-A4097REF1').focus();
            return mensaje;
        }
//        if (params.A4007DESCR === '') {
//            mensaje = 'INGRESE DESCRIPCION DE CONTRATO';
//            Ext.getCmp(prototype.id03 + '-A4007DESCR').focus();
//            return mensaje;
//        }
//        if (params.A4007TCTR === '' || params.A4007TCTR === null ) {
//            mensaje = 'SELECCIONE TIPO';
//            Ext.getCmp(prototype.id03 + '-A4007TCTR').focus();
//            return mensaje;
//        }
//        if (params.A4007FALTA === '' ) {
//            mensaje = 'SELECCIONE FECHA DE ALTA';
//            Ext.getCmp(prototype.id03 + '-A4007FALTA').focus();
//            return mensaje;
//        }       
        return mensaje;
    },
    get_ClearField: function () {
        //Initialize data INPUTS                                
        Ext.getCmp(prototype.id03 + '-A4097CDCLI').setValue('');
        Ext.getCmp(prototype.id03 + '-A3953RSOCI').setValue('');
        Ext.getCmp(prototype.id03 + '-A4097SEQ').setValue();
        Ext.getCmp(prototype.id03 + '-A4097REF4').setValue('*');
        Ext.getCmp(prototype.id03 + '-A4097REF3').setValue('0');
        Ext.getCmp(prototype.id03 + '-A4097REF1').setValue('');
        Ext.getCmp(prototype.id03 + '-A4097REF2').setValue('');
        Ext.getCmp(prototype.id03 + '-A4097STAT').setValue('1');
        Ext.getCmp(prototype.id03 + '-A4097REGIS').setValue('');        
        Ext.getCmp(prototype.id03 + '-A4097FREGI').setValue('');
        Ext.getCmp(prototype.id03 + '-A4097HREGI').setValue('');
        Ext.getCmp(prototype.id03 + '-A4097REVIS').setValue('');    
        Ext.getCmp(prototype.id03 + '-A4097FREVI').setValue('');    
        Ext.getCmp(prototype.id03 + '-A4097HREVI').setValue(''); 
    },    
    search_ref: function ( ) {
        var me = this;
        var bean = {};        
        bean.VP_CDCLI = Ext.getCmp(prototype.id03 + '-CDCLI').getValue();
        bean.VP_RSOCI = Ext.getCmp(prototype.id03 + '-RSOCI').getValue();
        bean.limit = "-1";
        bean.page = "-1";
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.GridData', {
            proxy: {
                url:  me.url + '/search_ref'
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
                            msg: 'No hay registro'
                        });
                    }
                    global.clear();
                }
            }
        });
        var panel = Ext.getCmp(prototype.id03 + '-contenedor-grid-ref');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id03 + '-info-ref',
            id: prototype.id03 + '-content-info-ref'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id03 + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id03 + '-paggin').bindStore(storeGridDatas);        
    },
    PadLeft: function (number, width) {
        width -= number.toString().length;
        if (width > 0){
            return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
        }
        return number + ""; // siempre devuelve tipo cadena
    },
    onEditClickRef:function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        //console.log(rec); 
        Ext.getCmp(prototype.id03 + '-A4097CDCLI').setValue(rec.data.A4097CDCLI);
        Ext.getCmp(prototype.id03 + '-A3953RSOCI').setValue(rec.data.A3953RSOCI );
        Ext.getCmp(prototype.id03 + '-A4097SEQ').setValue(rec.data.A4097SEQ);
        Ext.getCmp(prototype.id03 + '-A4097REF1').setValue(rec.data.A4097REF1.trim());
        Ext.getCmp(prototype.id03 + '-A4097REF2').setValue(rec.data.A4097REF2.trim());
        Ext.getCmp(prototype.id03 + '-A4097REF3').setValue(rec.data.A4097REF3);
        Ext.getCmp(prototype.id03 + '-A4097REF4').setValue(rec.data.A4097REF4.trim()); 
        Ext.getCmp(prototype.id03 + '-A4097STAT').setValue(rec.data.A4097STAT);         
        //datos audit
        Ext.getCmp(prototype.id03 + '-A4097REGIS').setValue(rec.data.A4097REGIS);
        Ext.getCmp(prototype.id03 + '-A4097FREGI').setValue(rec.data.A4097FREGI);
        Ext.getCmp(prototype.id03 + '-A4097HREGI').setValue(rec.data.A4097HREGI);
        Ext.getCmp(prototype.id03 + '-A4097REVIS').setValue(rec.data.A4097REVIS);
        Ext.getCmp(prototype.id03 + '-A4097FREVI').setValue(rec.data.A4097FREVI);
        Ext.getCmp(prototype.id03 + '-A4097HREVI').setValue(rec.data.A4097HREVI);        
        Ext.getCmp(prototype.id03 + '-btn-edit').show();                
    },
    event_buscarCliente: function(obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.buscarCliente();
        }
    },
    buscarCliente:function(){
        var me = this;
        var bean = {};        
        bean.VP_OPCION = "1";
        bean.VP_CDCLI = Ext.getCmp(prototype.id03+'-A4097CDCLI').getValue();
        bean.VP_PARAM1 = "";        
        Ext.Ajax.request({
            url: me.url + '/search',
            timeout: 60000000,
            method: 'POST',
            params: bean,
            beforerequest: Ext.getCmp(prototype.id03 + '-CatalogoClienteRef').mask('Buscando cliente...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);                
                Ext.getCmp(prototype.id03 + '-CatalogoClienteRef').unmask('Loading...', '');
                if (res.total === 0) {
                        global.Msg({
                            msg: 'No se econtro cliente'
                        });
                    return;
                }                                
                //console.log(res.data[0].A3953RSOCI);
                Ext.getCmp(prototype.id03 + '-A3953RSOCI').setValue(res.data[0].A3953RSOCI);
                Ext.getCmp(prototype.id03 + '-A4097CDCLI').setValue(res.data[0].A3953CDCLI);
                Ext.getCmp(prototype.id03 + '-A4097SEQ').setValue('0');
                Ext.getCmp(prototype.id03 + '-A4097REF1').setReadOnly(false);
                Ext.getCmp(prototype.id03 + '-A4097REF2').setReadOnly(false);
                Ext.getCmp(prototype.id03 + '-A4097REF3').setReadOnly(false);
                Ext.getCmp(prototype.id03 + '-A4097REF4').setReadOnly(false);
                Ext.getCmp(prototype.id03 + '-A4097REF1').focus();
            }
        });   
    }

});



