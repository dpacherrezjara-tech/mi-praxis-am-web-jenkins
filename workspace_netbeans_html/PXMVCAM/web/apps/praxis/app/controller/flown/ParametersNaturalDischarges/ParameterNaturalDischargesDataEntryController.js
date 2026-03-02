Ext.define('Ext.Praxis.controller.flown.ParametersNaturalDischarges.ParameterNaturalDischargesDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ParameterNaturalDischargesDataEntryController',
    dataDetail: {},
    afterRender: function () {
        this.loadForm();
    },
    loadForm: async function(){
        const me = this;
        me.authorization = me.view.authorization;
        const buttonSave = Ext.getCmp(prototype.idPND + '-btn-save');
        const buttonUpdate = Ext.getCmp(prototype.idPND + '-btn-update');
//        const codeParameter = Ext.getCmp(prototype.idPND + '-A4807CPARM');

        const formControlData = Ext.getCmp(prototype.idPND + '-fsControlData');
        buttonSave.disable();
        buttonUpdate.disable();
        if(me.view.option === 'U'){
//            codeParameter.disable();
            buttonSave.hide();
            buttonUpdate.show();
            formControlData.show();
            me.loadInformation();
        }else{
            me.dataDetail = {A4807CCUST: '139',A4807CORRL: 0};
            buttonSave.show();
            buttonUpdate.hide();
            formControlData.hide();
        }
        if(me.authorization.create === 'Y'){
            buttonSave.enable();
        }
        if(me.authorization.update === 'Y'){
            buttonUpdate.enable();
        }
        me.cmb_tipo1_clickHandler();
        me.cmb_tipo2_clickHandler();
    },
    loadInformation: async function(){
        const me = this; 
        
        const formDataDetail = Ext.getCmp(prototype.idPND + '-formDataDetail');
        const formControlData = Ext.getCmp(prototype.idPND + '-formControlData');
        formDataDetail.setLoading(true);
        formControlData.setLoading(true);
        
        const {A4807CCUST,A4807CPARM,A4807CORRL} = me.view.obj;
        
        let params = {
            IN_CCUST: A4807CCUST,
            IN_CPARM: A4807CPARM,
            IN_CORRL: A4807CORRL
        };
        try {
            const res = await global.callStoreGet('PRAXIS', 'SQP05713', params);
            console.log(res);
            if (res.lstRs.length > 0) {
                me.dataDetail = res.lstRs.at(0).at(0);

                Ext.Object.each(me.dataDetail, function (key, value) {
                    if (Ext.isString(value)) {
                        me.dataDetail[key] = value.trim();
                    }
                });
                
                formDataDetail.getForm().setValues(me.dataDetail);
                formControlData.getForm().setValues(me.dataDetail);
                
            }
        } catch (e) {
            console.error(e);
        } finally {
            formDataDetail.setLoading(false);
            formControlData.setLoading(false);
        }
    },
    onSyncClick: async function(){
        const me = this;
        const formDataDetail = Ext.getCmp(prototype.idPND + '-formDataDetail');
        
        const valuesForm = formDataDetail.getForm().getValues();
        console.log('valuesForm', valuesForm);
        
        const {A4807CCUST, A4807CORRL} = me.dataDetail ;
        const { A4807CPARM, 
            A4807DESCR, 
            A4807APLIC, 
            A4807ORDEN, 
            A4807TIPO1, 
            A4807TIPO2, 
            A4807ARCHI, 
            A4807ESTAD,
            A4807PARM1_D, A4807PARM1_I, A4807PARM1_N, A4807PARM1_S, //A4807PARM1_C,
            A4807PARM2_D, A4807PARM2_I, A4807PARM2_N, A4807PARM2_S, //A4807PARM2_C,
        } = valuesForm;
        
        let A4807PARM1 = "" ;
        let A4807PARM2 = "" ;
        let Archivo = "" ;
        switch (A4807TIPO1) {
            case 'X': //NO_APLICA
                A4807PARM1 = "" ;
                break;
            case 'S': //ALFANUMERICO
                A4807PARM1 = A4807PARM1_S ;
                break;
            case 'D': //DATE
                A4807PARM1 = A4807PARM1_D ;
                break;
            case 'N': //NUMERICO
                A4807PARM1 = A4807PARM1_N ;
                break;
            case 'I': //ENTERO
                A4807PARM1 = A4807PARM1_I ;
                break;
            case 'C': //CATALOGO
                A4807PARM1 = A4807PARM1_S ;
                Archivo = A4807ARCHI;
                break;
        } ;
        switch (A4807TIPO2) {
            case 'X': //NO_APLICA
                A4807PARM2 = "" ;
                break;
            case 'S': //ALFANUMERICO
                A4807PARM2 = A4807PARM2_S ;
                break;
            case 'D': //DATE
                A4807PARM2 = A4807PARM2_D ;
                break;
            case 'N': //NUMERICO
                A4807PARM2 = A4807PARM2_N ;
                break;
            case 'I': //ENTERO
                A4807PARM2 = A4807PARM2_I ;
                break;
            case 'C': //CATALOGO
                A4807PARM2 = A4807PARM2_S ;
                Archivo = A4807ARCHI;
                break;
        } ;
        
        let params = {
            IN_CCUST : A4807CCUST ,
            IN_CPARM : A4807CPARM ,
            IN_CORRL : A4807CORRL ,
            IN_DESCR : A4807DESCR ,
            IN_ORDEN : A4807ORDEN ,
            IN_APLIC : A4807APLIC ,
            IN_TIPO1 : A4807TIPO1 ,
            IN_PARM1 : A4807PARM1 ,
            IN_TIPO2 : A4807TIPO2 ,
            IN_PARM2 : A4807PARM2 ,
            IN_ARCHI : Archivo ,
            IN_ESTAD : A4807ESTAD ,
            IN_OPTION : me.view.option
        };
        
        console.log('params', params);
        console.log('me.dataDetail', me.dataDetail);
        
        
        let notifier = new AWN();
        let OUT_MSG = "" ;
        let OUT_RES = 0 ;
        me.view.setLoading(true);
        try {
            const res = await global.callStorePost('PRAXIS','SQP05696',params);
            console.log(res);
            if(res.status === 201){
                
                OUT_RES = res.data.lstVals.OUT_RES ;
                OUT_MSG = res.data.lstVals.OUT_MSG ;
                me.view.reloadGrid();
                
            }else{
                OUT_MSG = 'Bad Request';
            }
        } catch (e) {
//            console.error(e);
            OUT_MSG = 'Update Failed';
        }
        finally {
            me.view.setLoading(false);
            if (OUT_RES === 1) {
                me.view.close();
                notifier.success(OUT_MSG);
            }
            else {
                notifier.alert(OUT_MSG);
            }
        }
    },
    onCancelClick: async function () {
        this.view.close();
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    cmb_tipo1_clickHandler: function () {
        var selectedValue = Ext.getCmp(prototype.idPND + '-A4807TIPO1').getValue();
        
        Ext.getCmp(prototype.idPND + '-A4807PARM1_S').hide();
        Ext.getCmp(prototype.idPND + '-A4807PARM1_D').hide();
        Ext.getCmp(prototype.idPND + '-A4807PARM1_N').hide();
        Ext.getCmp(prototype.idPND + '-A4807PARM1_I').hide();
        Ext.getCmp(prototype.idPND + '-A4807ARCHI').hide();
        
        switch (selectedValue) {
            case 'X': //NO_APLICA
                break;
            case 'S': //ALFANUMERICO
                Ext.getCmp(prototype.idPND + '-A4807PARM1_S').show();
                Ext.getCmp(prototype.idPND + '-A4807PARM1_S').focus();
                break;
            case 'D': //DATE
                Ext.getCmp(prototype.idPND + '-A4807PARM1_D').show();
                Ext.getCmp(prototype.idPND + '-A4807PARM1_D').focus();
                break;
            case 'N': //NUMERICO
                Ext.getCmp(prototype.idPND + '-A4807PARM1_N').show();
                Ext.getCmp(prototype.idPND + '-A4807PARM1_N').focus();
                break;
            case 'I': //ENTERO
                Ext.getCmp(prototype.idPND + '-A4807PARM1_I').show();
                Ext.getCmp(prototype.idPND + '-A4807PARM1_I').focus();
                break;
            case 'C': //CATALOGO
                Ext.getCmp(prototype.idPND + '-A4807PARM1_S').show();
                Ext.getCmp(prototype.idPND + '-A4807PARM1_S').focus();
                break;
        }
        this.toogleFieldArchive();
    },
    cmb_tipo2_clickHandler: function () {
        var selectedValue = Ext.getCmp(prototype.idPND + '-A4807TIPO2').getValue();
        
        Ext.getCmp(prototype.idPND + '-A4807PARM2_S').hide();
        Ext.getCmp(prototype.idPND + '-A4807PARM2_D').hide();
        Ext.getCmp(prototype.idPND + '-A4807PARM2_N').hide();
        Ext.getCmp(prototype.idPND + '-A4807PARM2_I').hide();
        Ext.getCmp(prototype.idPND + '-A4807ARCHI').hide();        
        
        switch (selectedValue) {
            case 'X': //NO_APLICA
                break;
            case 'S': //ALFANUMERICO
                Ext.getCmp(prototype.idPND + '-A4807PARM2_S').show();
                Ext.getCmp(prototype.idPND + '-A4807PARM2_S').focus();
                break;
            case 'D': //DATE
                Ext.getCmp(prototype.idPND + '-A4807PARM2_D').show();
                Ext.getCmp(prototype.idPND + '-A4807PARM2_D').focus();
                break;
            case 'N': //NUMERICO
                Ext.getCmp(prototype.idPND + '-A4807PARM2_N').show();
                Ext.getCmp(prototype.idPND + '-A4807PARM2_N').focus();
                break;
            case 'I': //ENTERO
                Ext.getCmp(prototype.idPND + '-A4807PARM2_I').show();
                Ext.getCmp(prototype.idPND + '-A4807PARM2_I').focus();
                break;
            case 'C': //CATALOGO
                Ext.getCmp(prototype.idPND + '-A4807PARM2_S').show();
                Ext.getCmp(prototype.idPND + '-A4807PARM2_S').focus();
                break;
        }
        this.toogleFieldArchive();
    },
    toogleFieldArchive: function(){
        var selectedValue1 = Ext.getCmp(prototype.idPND + '-A4807TIPO1').getValue();
        var selectedValue2 = Ext.getCmp(prototype.idPND + '-A4807TIPO2').getValue();
        if (selectedValue1 === 'C' || selectedValue2 === 'C') {
            Ext.getCmp(prototype.idPND + '-A4807ARCHI').show();
        }
    }

});


        