Ext.define('Ext.Praxis.controller.panel.ProfilesManagement.DataEntryProfilesManagementController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryProfilesManagementController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    msjAlert: '',
    beanOption: '',
    dataentryParams: {},
    // </editor-fold>
    init: function(view) {
        this.setStoreData();
    },
    afterRender: function(){
        this.p = this.view.params;
        
        switch( this.p.action ){
            case 'U':
                this.mostrarData(this.p.rec);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').show();
                Ext.getCmp(prototype.id+'-btn-delete').show();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                Ext.getCmp(prototype.id+'-ID_PROFILE').setReadOnly(true);
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
//                Ext.getCmp(prototype.id + '-obj').setValue("X");
//                Ext.getCmp(prototype.id + '-obj').focus();
                break;                
        }
        // global.AccessControlMaganer();
    },
    onMostrarCampoChange: function(cmp, newValue, oldValue, eOpts) {
//        this.limpiarCampos();
        
    },        
    
    // <editor-fold defaultstate="collapsed" desc="Combo Date">
    setStoreData: function() {
    },
    // </editor-fold>
    
    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function(rec) {
        console.log('log rec');
        console.log(rec);
        this.setValue('DESC1', rec.get('DESC1'));
        this.setValue('ID_PROFILE', rec.get('ID_PROFILE'));
        this.setValue('CCUST', rec.get('CCUST'));
        Ext.getCmp(prototype.id+'-chkStatus').setValue(rec.get('STAT') === 'A' ? true : false);
        // <editor-fold defaultstate="collapsed" desc="ControlData">
        this.setValue('USCR', rec.get('USCR'));
        this.setValue('FECR', rec.get('DTCR'));
        //this.setValue('HOCR', rec.get('HOCR'));
        this.setValue('USUP', rec.get('USUP'));
        this.setValue('FEUP', rec.get('DTUP'));
        //this.setValue('HOUP', rec.get('HOUP'));
        // </editor-fold>
    },
    // </editor-fold>   
    
    // <editor-fold defaultstate="collapsed" desc="CRUD">
    onSaveClick: function(btn) {
        if (this.validaRequiredFields()) {
                Ext.Msg.show({
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to insert ?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function(btn) {
                        if (btn === 'yes') {
                            this.view.params.action = "I";
                            this.llenarData();
                            this.crud();
                        }
                    }
                });
        } else {
            var msg = this.msjAlert;
            if (msg==='') msg = 'You must enter all required fields.';
            global.Msg({
                msg: msg
            });
        }
    },
    onUpdateClick: function(btn) {
        if (this.validaRequiredFields()) {
                Ext.Msg.show({
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to update ?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function(btn) {
                        if (btn === 'yes') {
                            this.view.params.action = "U";
                            this.llenarData();
                            this.crud();
                        }
                    }
                });
        } else {
            var msg = this.msjAlert;
            if (msg==='') msg = 'You must enter all required fields.';
            global.Msg({
                msg: msg
            });
        }
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onDeleteClick: function(btn){        
        Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to delete ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "D";
                        this.llenarData();
                        //console.log(this.beanOption);
                        this.crud();
                    }
                }
            });                       
    },
    // </editor-fold>
    
    validaRequiredFields: function() {
        return true;
    },
    
    crud: function() {
        var mod = this;
        Ext.Ajax.request({
            url: prototype.url + '/crud',
            method: 'POST',
            timeout: 60000000,
            params: this.beanOption,
            
            beforerequest: Ext.getCmp('DataEntryProfilesManagementForm').mask('Loading...'),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.success) {
                    var msg = res.response;                    
                    var icon=1;
                    global.Msg({
                        msg: msg,
                        icon: icon,
                        fn: function() {
                            if (msg==='Operation was successful') {
                                Ext.getCmp('DataEntryProfilesManagementForm').unmask();
//                                Ext.getCmp('DataEntryProfilesManagementForm').close(),
//                                Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                            }
                        }
                    });
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                Ext.getCmp('DataEntryProfilesManagementForm').unmask();
            },
            failure: function(response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp('DataEntryProfilesManagementForm').unmask();
            }
        });
    },
    
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function(id) {
        return Ext.getCmp(prototype.id+'-'+id).getValue();
    },
    focus: function(id) {
        Ext.getCmp(prototype.id+'-'+id).focus();
    },
    setValue: function(id, txt) {
        Ext.getCmp(prototype.id+'-'+id).setValue(txt);
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    // </editor-fold>
    
    llenarData: function() {
        this.beanOption = {};
        
        var ID_PROFILE = this.getValue('ID_PROFILE')===""? "0" : this.getValue('ID_PROFILE');
        var CCUST = this.getValue('CCUST');
        var DESC1 = this.getValue('DESC1');
        var STAT =  Ext.getCmp(prototype.id+'-chkStatus').getValue() ? 'A' : 'L';
        console.log(this.beanOption);
        this.beanOption = {
            CCUST: CCUST,
            ID_PROFILE: ID_PROFILE,
            DESC1: DESC1,
            STAT: STAT,
            strOption: this.view.params.action
        };
        console.log('beanOption');
        console.log(this.beanOption);        
    },
    limpiarCampos: function() {
                     
        //this.setValue("txtProcessDate", "");
    }      
});