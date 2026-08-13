/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.RFNDARCReasonsForm.DataEntryRFNDARCReasonMaintenanceController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryRFNDARCReasonMaintenanceController',

    beanTMP: {},
    urlWin01: '',
    
    A3406FALTA: '',

    init: function(view){
        var me = this;
        this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function(){
        switch(String(this.view.params.action)){
            case 'U':
                var rec = this.view.params.rec;
                
                Ext.getCmp(prototype.idDataEntryRFNDARCRea+'-btn-save').hide();
                Ext.getCmp(prototype.idDataEntryRFNDARCRea+'-btn-update').show();
                Ext.getCmp(prototype.idDataEntryRFNDARCRea+'-btn-delete').show();
                
                Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtReason').setValue(Ext.String.trim(rec.get('A4360CODRZ')));
                Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtCRelation').setValue(Ext.String.trim(rec.get('A4360COMRE')));
                Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtCEs').setValue(Ext.String.trim(rec.get('A4360COMES')));
                Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtCEng').setValue(Ext.String.trim(rec.get('A4360COMEN')));
                Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtCPor').setValue(Ext.String.trim(rec.get('A4360COMPO')));
                Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtCFre').setValue(Ext.String.trim(rec.get('A4360COMFR')));
                
                Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtREGIS').setValue(rec.get('A4360REGIS'));
                Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtFREGI').setValue(rec.get('A4360FREGI'));
                Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtHREGI').setValue(rec.get('A4360HREGI'));
                Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtREVIS').setValue(rec.get('A4360REVIS'));
                Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtFREVI').setValue(rec.get('A4360FREVI'));
                Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtHREVI').setValue(rec.get('A4360HREVI'));
                
                this.OnLoadCmbFamily(rec.get('A4360FAMIL'));
                
                break;
            case 'I':
                Ext.getCmp(prototype.idDataEntryRFNDARCRea+'-btn-save').show();
                Ext.getCmp(prototype.idDataEntryRFNDARCRea+'-btn-update').hide();
                Ext.getCmp(prototype.idDataEntryRFNDARCRea+'-btn-delete').hide();
                
                this.OnLoadCmbFamily('');
                
                break;
            default:
                Ext.getCmp(prototype.idDataEntryRFNDARCRea+'-btn-save').hide();
                Ext.getCmp(prototype.idDataEntryRFNDARCRea+'-btn-update').hide();
                Ext.getCmp(prototype.idDataEntryRFNDARCRea+'-btn-delete').hide();
        }
    },
    
    OnLoadCmbFamily: function(id){
        var cmbFamily = Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-ComboBy');

        cmbFamily.bindStore(Ext.create('Ext.data.Store',{
            data: [
                { "code": "", "name": "SELECTED"},
                {"code": "Authorise", "name": "AUTHORISE"},
                {"code": "Rejected", "name": "REJECTED"}
            ]
        }));
        
        cmbFamily.setValue(id);
    },
    onCloseClick: function(obj){
        Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-win').close();
    },
    onSaveClick: function(obj){
         var me = this;
         var action = String(me.view.params.action);
         if (action === 'I'){
            me.beanTMP.IN_OPTION = action;
            
            me.beanTMP.IN_CODRAZ =  Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtReason').getValue();
            me.beanTMP.A4360CODRZ= Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtReason').getValue();
            me.beanTMP.A4360FAMIL = Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-ComboBy').getValue();
           
            me.beanTMP.A4360COMRE = Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtCRelation').getValue();
            me.beanTMP.A4360COMES =  Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtCEs').getValue();
            me.beanTMP.A4360COMEN =  Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtCEng').getValue();
            me.beanTMP.A4360COMPO = Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtCPor').getValue();
            me.beanTMP.A4360COMFR =Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtCFre').getValue();
            
            if(me.beanTMP.A4360FAMIL===''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Family');
                return;
            }
            
            if (me.beanTMP.A4360COMES === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Comment Description');
                return;
            }
            if (me.beanTMP.A4360COMEN === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Comment Description');
                return;
            }
            if (me.beanTMP.A4360COMFR === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Comment Description');
                return;
            }
            if (me.beanTMP.A4360COMPO === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Comment Description');
                return;
            }
            
            Ext.Msg.show({
                title: '.: PRAXIS :.',
                message: 'SAVE RECORD?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(btn) {
                    if ( btn === 'yes' ){
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-win'), {
                                msg: 'Please Wait....'
                            });
                        mask.show();
                        
                        Ext.Ajax.request({
                            url: me.urlWin01 + '/MantRFNDReasaons/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanTMP)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD INSERTED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function() {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.id + '-Contenedor').getController().onSearchClick();
                                            Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-win').close();

                                        }


                                    }});
                            }
                        });
                        
                    }
                }
            });
        }else if (action === 'U' || action === 'D'){
            
            me.beanTMP.IN_OPTION = action;
            me.beanTMP.IN_CODRAZ =  Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtReason').getValue();
            me.beanTMP.A4360CODRZ= Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtReason').getValue();
            me.beanTMP.A4360FAMIL = Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-ComboBy').getValue();
           
            me.beanTMP.A4360COMRE = Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtCRelation').getValue();
            me.beanTMP.A4360COMES =  Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtCEs').getValue();
            me.beanTMP.A4360COMEN =  Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtCEng').getValue();
            me.beanTMP.A4360COMPO = Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtCPor').getValue();
            me.beanTMP.A4360COMFR =Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-txtCFre').getValue();
            
             if(me.beanTMP.A4360FAMIL===''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Family');
                return;
            }
            if (me.beanTMP.A3406USER === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field');
                return;
            }
            if (me.beanTMP.A3406PAIS === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Country');
                return;
            }
            if (me.beanTMP.A3406FLAG === ''){
                Ext.Msg.alert('.: PRAXIS :.', 'Required Field, Status');
                return;
            }
            
            Ext.Msg.show({
                title: '.: PRAXIS :.',
                message: 'UPDATE RECORD?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function(btn) {
                    if ( btn === 'yes' ){
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-win'), {
                                msg: 'Please Wait....'
                            });
                        mask.show();
                        
                        Ext.Ajax.request({
                            url: me.urlWin01 + '/MantRFNDReasaons/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanTMP)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD INSERTED' || res.data === 'RECORD UPDATE' || res.data === 'RECORD DISABLED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function() {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.id + '-Contenedor').getController().onSearchClick();
                                            Ext.getCmp(prototype.idDataEntryRFNDARCRea + '-win').close();

                                        }


                                    }});
                            }
                        });
                        
                    }
                }
            });
        }
    }

});