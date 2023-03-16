/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.UATPSales.UATPSalesEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/UATPSales',
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
        //console.log("Ventana de Carga mostrado");
    },
    onSaveClick:function(btn){
        var  file = Ext.getCmp(prototype.id + '-file').getValue().trim();
        var validate = this.validateFileUri(file);
        if (validate) {
            global.Msg({
                msg:'Elija un arhivo para procesar!'
            });
        }else{
            Ext.Msg.show({
                title:'.:PRAXIS:.',
                msg:'¿Cargar Archivo?',
                buttons:Ext.MessageBox.YESNO,
                scope:this,
                icon:Ext.MessageBox.QUESTION,
                modal:true,
                fn:function(btn){
                    if (btn==='yes') {
                       this.callLoadFile();
                    }
                }
            });
        }
    },
    validateFileUri:function(uri){
        let error = false;
        if (uri.toString().trim().length===0) {
            error = true;
        };
        return error;
    },
    callLoadFile:function(){
        var file = Ext.getCmp(prototype.id + '-file').getValue().trim();
        if (file === '') {
            Ext.MessageBox.alert('PRAXIS', "Seleccionar archivo", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-file').focus();", 100);
            });
            return;
        }
         var form = Ext.getCmp(prototype.id + '-form01').getForm();
         form.submit({
            url: prototype.url + '/postFile',
            method:'POST',
            waitMsg: 'Procesando archivo...',
            success: function (fp, o) {
                let response = o.result;
                if (response.success){
                    //Ext.Msg.alert('.:PRAXIS:.',response.response.toString());
                    global.Msg({
                        msg: response.response.toString(),
                        icon:1
                    });
                }
                console.log(o);
            },
            failure: function(res, opts) {
                let response = opts.result;
                if (!response.success){
                    //Ext.Msg.alert('.:PRAXIS:.',response.response.toString());
                    global.Msg({
                        msg: response.response.toString(),
                        icon:0
                    });
                }
                console.log('server-side failure with status code ' + opts.response.status);
            }
        });
    },
    onCancelClick:function(){
        this.view.close();
    }
});



