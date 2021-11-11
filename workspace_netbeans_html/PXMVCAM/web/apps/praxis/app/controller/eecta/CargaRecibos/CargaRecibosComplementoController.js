/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.CargaRecibos.CargaRecibosComplementoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id07 + '-cargaRecibosComplementoController',
    url: CONTEXTPATH + '/CargaRecibos',     
    requires: [        
        'Ext.Praxis.view.eecta.CargaRecibosForm.InfoGridComplDet'
    ],
    bean: {},
    init: function (view) {
        var me = this;
    },    
    afterRender: function () {            
        this.search_complemento();
    },
    handlerEvent_setDisabled: function () {
        
    },                
    getDataInputs: function () {      
    },
    getDataEntryValues: function (strOption) {
        
       var vl_fproc = Ext.util.Format.date(Ext.getCmp(prototype.id07 + '-A4107FPROC').getValue(), 'Ymd');        
       var vl_cdcli = '';       
       return {
            vp_fproc:vl_fproc,
            vp_cdcli:vl_cdcli
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
                msg: '¿Facturar complemento?',
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
            url: this.url + '/setFacturarComplemento',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.getDataEntryValues(strOption))                
            },
            beforerequest: Ext.getCmp(prototype.id07 + '-CargaRecibosComplemento').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;                
                Ext.getCmp(prototype.id07 + '-CargaRecibosComplemento').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE, //var icons = [Ext.Msg.ERROR, Ext.Msg.INFO, Ext.Msg.WARNING, Ext.Msg.QUESTION];
                    fn: function () {
                        //culmino PROCESO  
                        if(objRtn.dbException.SQLCODE === '1')
                            me.search_complemento();                        
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
    onDonwloadDocumentPDFClick: function( grid, rowIndex, colIndex )
    {  
        //console.log(vp_document_id); 
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);                   
        var document_path = rec.get('A4107PTPDF');
        if(document_path === ''){
            global.Msg({msg: 'El documento no esta facturado'});
            return;
        }
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: '¿ Descargar achivo factura ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {                        
                    global.getFile(prototype.url + '/getDonwloadDocumentInvoice?document_path='+document_path);                        
                }
            }
        });
    },
    onDonwloadDocumentXMLClick: function( grid, rowIndex, colIndex )
    {  
        //console.log(vp_document_id); 
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);                   
        var document_path = rec.get('A4107PTXML');
         if(document_path === ''){
            global.Msg({msg: 'El documento no esta facturado'});
            return;
        }
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: '¿Descargar archivo XML ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {                        
                    global.getFile(prototype.url + '/getDonwloadDocumentInvoice?document_path='+document_path);                        
                }
            }
        });
    },
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.id07 + '-CargaRecibosComplemento').close();
    }, 
    cmbfiltro_clickHandler03:function(){
        this.search_complemento();
    },
    search_complemento:function( ){
        me = this;
        var bean = {};              
        bean.VP_CDCLI = ""; //Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha1').getValue(), 'Ymd');
        bean.VP_RSOCI = ""; //Ext.util.Format.date(Ext.getCmp(prototype.id + '-fecha2').getValue(), 'Ymd');
        bean.VP_LOTE = Ext.getCmp(prototype.id07 + '-A4107NLOTE').getValue();        
        bean.VP_NUMRC = Ext.getCmp(prototype.id07 + '-A4107NUMRC').getValue();
        bean.VP_ESTAD = Ext.getCmp(prototype.id07 + '-A4107ESTAD').getValue();
        
        Ext.getCmp(prototype.id07 + '-form01').show();
        Ext.getCmp(prototype.id07 + '-form02').hide();
        
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.GridData', {
        proxy: {
            url: prototype.url + '/get_complemento_cab'
        },
        listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, records, successful, operation, eOpts) {
                    //console.log(records);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'No hay registros'
                        });
                    }
                    global.clear();
                }
            }
        });
        var panel = Ext.getCmp(prototype.id07 + '-contenedor-info');       
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id07 + '-infoGridCompl',
            id: prototype.id07 + '-contentInfo2'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id07 + '-infoGridCargaRecibosCompl').setStore(storeGridDatas);
        //Ext.getCmp(prototype.id07 + '-paggin').bindStore(storeGridDatas);
    },
    onDetailClickDocRelacionado: function ( grid, rowIndex, colIndex ){
        me = this;
        var bean = {};
        Ext.getCmp(prototype.id07 + '-form01').hide();
        Ext.getCmp(prototype.id07 + '-form02').show();
        var store = grid.getStore();
        var rec = store.getAt(rowIndex); 
        bean.VP_FPROC = rec.get('A4107FPROC');
        bean.VP_CDCLI = rec.get('A4107CDCLI');
        bean.VP_NLOTE = rec.get('A4107NLOTE');
        bean.VP_SQRCB = rec.get('A4107SQRCB');
        bean.limit = "-1";
        bean.page = "-1";

        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.GridData', {
            proxy: {
                url: prototype.url + '/get_complemento_det'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, records, successful, operation, eOpts) {
                    //console.log(records);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        
        var panel = Ext.getCmp(prototype.id07 + '-contenedor-info');       
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id08 + '-infoGridComplDet',
            id: prototype.id08 + '-contentInfoDet'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id08 + '-infoGridCargaRecibosComplDet').setStore(storeGridDatas);
        
    },
    onExportXlsClick: function(){
//        var bean = {};         
//        bean.VP_A4021LOTE = Ext.getCmp(prototype.id07 + '-A4021LOTE').getValue();
//        bean.VP_BOLETO  = Ext.getCmp(prototype.id07 + '-A4021BOLETO').getValue();
//        bean.VP_A4021STAT  = Ext.getCmp(prototype.id07 + '-A4021STAT').getValue();        
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
        
        if (params.vp_fproc === '') {
            mensaje = 'Seleccionar la fecha de procesamiento'; 
            Ext.getCmp(prototype.id07 + '-A4107FPROC').focus();
        } 
        return mensaje;
    },
    set_ClearField: function () {
        //Initialize data INPUTS
        //Ext.getCmp(prototype.id + '-A3953CDCLI').setValue('');        
    },
    onTxtFilterKeypress03: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.search_complemento();
        }
    }
    
    
});



