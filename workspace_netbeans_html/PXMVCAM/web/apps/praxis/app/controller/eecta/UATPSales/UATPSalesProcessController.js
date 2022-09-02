/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.UATPSales.UATPSalesProcessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataProcessController',
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
        this.getDataInputs();
    },
    getDataInputs: function () {
        let obj = this.view.params.obj;
        Ext.getCmp(prototype.id + '-A4264PRDA').setValue(obj.PRDA);
        Ext.getCmp(prototype.id + '-A4264IDFIL').setValue(obj.IDFILE);
    },
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.id + '-UATPSaleProcessEntry').close();
    },
    onSaveClick: function (btn) {
        let params = this.view.params.obj;
        let val = this.validateForm(params);
        if (val) {
            global.Msg({
                msg: 'Debe ingresar datos Correctos'
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to process file?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.callFormatFile(params);
                    }
                }
            });
        }
    },
    validateForm: function (obj) {
        if (obj !== null && obj !== undefined) {
            return false;
        }
        return true;
    },
    callFormatFile:function (oparam) {
        console.log(JSON.stringify(oparam));
        let form = Ext.getCmp(prototype.id + '-formProcess').getForm();
        form.submit({
            url: prototype.url + '/formatDelivery',
            waitMsg: 'Procesando archivo...',
            method:'POST',
            params:{
                beanString:JSON.stringify(oparam)
            },
            success: function (fp, o) {
//                let response = o.result;
//                if (response.success){
//                    //Ext.Msg.alert('.:PRAXIS:.',response.response.toString());
//                    global.Msg({
//                        msg: response.response.toString(),
//                        icon:1
//                    });
//                }
                console.log(o);
            },
            failure: function(res, opts) {
//                let response = opts.result;
//                if (!response.success){
//                    //Ext.Msg.alert('.:PRAXIS:.',response.response.toString());
//                    global.Msg({
//                        msg: response.response.toString(),
//                        icon:0
//                    });
//                }
                console.log('server-side failure with status code ' + opts.response.status);
            }
        });
        //alert('Formateando');
        //Ext.getCmp(prototype.id + '-UATPSaleProcessEntry').close();
        //Ext.getCmp(prototype.id + '-btnSearch').click();
    }

});



