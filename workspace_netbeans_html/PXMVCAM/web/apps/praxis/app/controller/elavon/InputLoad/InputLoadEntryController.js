Ext.define('Ext.Praxis.controller.elavon.InputLoad.InputLoadEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/Elavon',
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
        console.log("Ventana de Carga mostrado");
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
        console.log(file);
        if (file === '') {
            Ext.MessageBox.alert('PRAXIS', "Seleccionar archivo", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-file').focus();", 100);
            });
            return;
        }
         var form = Ext.getCmp(prototype.id + '-form01').getForm();
         console.log(prototype.url + '/uploadExcelRecon');
         form.submit({
            //url: prototype.url + '/uploadExcelRecon',
            url: prototype.url + '/uploadExcelReconAsync',
            method:'POST',
            waitMsg: 'Procesando archivo...',
            success: function (fp, o) {
                console.log(o);
                let response = o.result;
                if (response.success){
                    //Ext.Msg.alert('.:PRAXIS:.',response.response.toString());
                    global.Msg({
                        //msg: "Header: " + response.responseHeader.toString() + "<br>" + "Data: " + response.responseData.toString() ,
                        msg: "Header: " + response.response.toString(),
                        icon:1
                    });
                }
                console.log(o);
            },
            failure: function(res, opts) {
                console.log("Ha ocurrido un error: ");
                console.log(res);
                console.log(opts);
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
    }
});




