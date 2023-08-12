Ext.define('Ext.Praxis.controller.travelbank.AccountMasterTravelBank.DataEntryAccountMasterTravelBankController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAccountMasterTravelBankController',
    lblA4405TITRA: '',
    lblA4405TIPO: '',
    lblA4405SUBTI: '',
    lblA4405CATEG: '',
    init: function(view){
    },
    afterRender: function(){ 
        this.p = this.view.params;
        switch( this.p.action ){
            case 'U':
                this.getDataInputs(this.p.rec);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').show();
                Ext.getCmp(prototype.id+'-btn-delete').show();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                Ext.getCmp(prototype.id + '-txtA4405TITRA').focus();
                Ext.getCmp(prototype.id + '-cmbCtaType2').setValue("");
                Ext.getCmp(prototype.id + '-cmbINTNU').setValue("");
                break;
        }
        Ext.getCmp(prototype.id + '-label_required01').show();
        Ext.getCmp(prototype.id + '-label_required02').hide();
        Ext.getCmp(prototype.id + '-label_required03').hide();
        Ext.getCmp(prototype.id + '-label_CtaSubType').setWidth(110);
        Ext.getCmp(prototype.id + '-label_Category').setWidth(95);
        global.AccessControlMaganer();
    },
    getDataInputs: function(rec) {
//        this.setComboBoxItemData(rec.get('A4405TIPO'));
        Ext.getCmp(prototype.id + '-cmbCtaType2').setValue(rec.get('A4405TIPO'));
        Ext.getCmp(prototype.id + '-cmbINTNU').setValue(rec.get('A4405INTNU')=== 'YES' ? 'Y' : 'N');
        Ext.getCmp(prototype.id + '-txtA4405TITRA').setValue(rec.get('A4405TITRA'));
        Ext.getCmp(prototype.id + '-txtA4405SUBTI').setValue(rec.get('A4405SUBTI'));
        Ext.getCmp(prototype.id + '-txtA4405CATEG').setValue(rec.get('A4405CATEG'));
        Ext.getCmp(prototype.id + '-txtA4405CIA').setValue(rec.get('A4405CIA'));
        Ext.getCmp(prototype.id + '-txtA4405UNIDA').setValue(rec.get('A4405UNIDA'));
        Ext.getCmp(prototype.id + '-txtA4405CECOS').setValue(rec.get('A4405CECOS'));
        Ext.getCmp(prototype.id + '-txtA4405UBICA').setValue(rec.get('A4405UBICA'));
        Ext.getCmp(prototype.id + '-txtA4405CTA').setValue(rec.get('A4405CTA'));
        
        Ext.getCmp(prototype.id + '-txtA4405SCTA').setValue(rec.get('A4405SCTA'));
        Ext.getCmp(prototype.id + '-txtA4405EQUI').setValue(rec.get('A4405EQUI'));
        Ext.getCmp(prototype.id + '-txtA4405ICIA').setValue(rec.get('A4405ICIA'));
        Ext.getCmp(prototype.id + '-txtA4405CLIE').setValue(rec.get('A4405CLIE'));
        Ext.getCmp(prototype.id + '-txtA4405FINI2').setValue(rec.get('A4405FINI'));
        Ext.getCmp(prototype.id + '-txtA4405FFIN2').setValue(rec.get('A4405FFIN')==='9999/99/99' ? '' : rec.get('A4405FFIN'));
        
        this.lblA4405TITRA = rec.get('A4405TITRA');
        this.lblA4405TIPO = rec.get('A4405TIPO');
        this.lblA4405SUBTI = rec.get('A4405SUBTI');
        this.lblA4405CATEG = rec.get('A4405CATEG');
        
        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A4405REGIS'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A4405FREGI'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A4405HREGI'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A4405REGVI'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A4405FREVI'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A4405HREVI'));
    },
    setComboBoxItemData: function(data) {
        var index = this.getIndexData(data);
        console.log("index: " + index);
        if (index !== -1) {
            Ext.getCmp(prototype.id + '-cmbCtaType2').setValue(index);
        }
    },
    getIndexData: function(data) {
        console.info("data: " + data);
        var store = Ext.getCmp(prototype.id + '-cmbCtaType2').getStore();
        store.each(function(record,id){
            console.info(record.data.name);
            if (record.data.name === data) {
                return record.data.code;
            }
        });
        return -1;
    },
    onTITRABlur: function() {
        var TypeDocument = Ext.getCmp(prototype.id + '-txtA4405TITRA').getValue();
        Ext.getCmp(prototype.id + '-label_required01').show();
        
        switch (TypeDocument) {
            case "EMD":
                Ext.getCmp(prototype.id + '-label_required02').show();
                Ext.getCmp(prototype.id + '-label_required03').show();
                Ext.getCmp(prototype.id + '-label_CtaSubType').setWidth(90);
                Ext.getCmp(prototype.id + '-label_Category').setWidth(75);
                break;
            case "MPD":
                Ext.getCmp(prototype.id + '-label_required02').show();
                Ext.getCmp(prototype.id + '-label_required03').hide();
                Ext.getCmp(prototype.id + '-label_CtaSubType').setWidth(90);
                Ext.getCmp(prototype.id + '-label_Category').setWidth(95);
                break;
            default:
                Ext.getCmp(prototype.id + '-label_required02').hide();
                Ext.getCmp(prototype.id + '-label_required03').hide();
                Ext.getCmp(prototype.id + '-label_CtaSubType').setWidth(110);
                Ext.getCmp(prototype.id + '-label_Category').setWidth(95);
        }
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    validaRequiredFields: function() {
        var bvalida = true;
        var TypeDocument = Ext.getCmp(prototype.id + '-txtA4405TITRA').getValue();
        var cmbCtaType2 = Ext.getCmp(prototype.id + '-cmbCtaType2').getValue();
        var cmbINTNU = Ext.getCmp(prototype.id + '-cmbINTNU').getValue();
        var txtA4405SUBTI = Ext.getCmp(prototype.id + '-txtA4405SUBTI').getValue();
        var txtA4405CATEG = Ext.getCmp(prototype.id + '-txtA4405CATEG').getValue();
        
        switch (TypeDocument) {
            case "EMD":
                if( cmbINTNU ==="" || cmbCtaType2 ==="" || txtA4405SUBTI === "" || txtA4405CATEG ===""){
                    bvalida = false;
                }
                break;
            case "MPD":
                if( cmbINTNU ==="" || cmbCtaType2 ==="" || txtA4405SUBTI === ""){
                    bvalida = false;
                }
                break;
            default:
                if(TypeDocument.length === 0 || cmbCtaType2 ==="" || cmbINTNU ===""){//cmbDocumentType.selectedIndex
                    bvalida = false;
                }
        }
        return bvalida;
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        
        if (!this.validaRequiredFields()) {
            global.Msg({
                msg: 'You must enter all required fields.',
                fn: function() {}
            });
        } else {
            var txtA4405FINI2 = Ext.getCmp(prototype.id + '-txtA4405FINI2').getValue();
            var txtA4405FFIN2 = Ext.getCmp(prototype.id + '-txtA4405FFIN2').getValue();
            
            console.log(txtA4405FINI2 + '-' + txtA4405FFIN2);
            if(txtA4405FFIN2 !== null)
            {
                if ( txtA4405FINI2 !== null && txtA4405FFIN2 !== null && txtA4405FINI2 <= txtA4405FFIN2){
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
                            this.crud();
                        }
                    }
                    }); 
                }else{
                    global.Msg({
                    msg: 'End date must be greater than start date.',
                    fn: function() {}
                    });
                }
            }
            else
            {
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
                            this.crud();
                        }
                    }
                    }); 
            }
            
        }
    },
    onUpdateClick: function(btn) {
        var p = this.view.params;
        
        if (!this.validaRequiredFields()) {
            global.Msg({
                msg: 'You must enter all required fields.',
                fn: function() {}
            });
        } else { 
            var txtA4405FINI2 = Ext.getCmp(prototype.id + '-txtA4405FINI2').getValue();
            var txtA4405FFIN2 = Ext.getCmp(prototype.id + '-txtA4405FFIN2').getValue();
            
            console.log(txtA4405FINI2 + '-' + txtA4405FFIN2);
            if(txtA4405FFIN2 !== null)
            {
                if ( txtA4405FINI2 !== null && txtA4405FFIN2 !== null && txtA4405FINI2 <= txtA4405FFIN2){
                Ext.Msg.show({
                    title:'.:PRAXIS:.',
                    msg: 'Are you sure to update ?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function(btn){
                        if (btn === 'yes'){
                            this.view.params.action = "U";
                            this.crud();
                        }
                    }
                });
                }else{
                    global.Msg({
                    msg: 'End date must be greater than start date.',
                    fn: function() {}
                    });
                }
            }
            else
            {
                Ext.Msg.show({
                    title:'.:PRAXIS:.',
                    msg: 'Are you sure to update ?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function(btn){
                        if (btn === 'yes'){
                            this.view.params.action = "U";
                            this.crud();
                        }
                    }
                });
            }


        }
    },
    onDeleteClick: function(btn) {
        var p = this.view.params;
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
                    this.crud();
                }
            }
        });
    },
    crud: function() {
        Ext.Ajax.request({
            url: prototype.url + '/Maintance',
            method: 'POST',
            timeout: 60000000,
            params: this.getDataEntryValues(),
            success: function(response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var msg = res.intResult;
                var icon=1;
                if(msg==='DUPLICATE KEY, VERIFY!'){
                    icon=2;
                }

                global.Msg({
                    msg: msg,
                    icon: icon,
                    fn: function() {
                        //exito
                        Ext.getCmp('DataEntryAccountMasterTravelBankForm').close(),
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    getDataEntryValues: function() {
        var p = this.view.params;

        var strOption = p.action;
        
        var A4405TITRA = Ext.getCmp(prototype.id + '-txtA4405TITRA').getValue();
        var A4405TIPO = Ext.getCmp(prototype.id + '-cmbCtaType2').getValue();
        var A4405INTNU = Ext.getCmp(prototype.id + '-cmbINTNU').getValue();
        var A4405SUBTI = Ext.getCmp(prototype.id + '-txtA4405SUBTI').getValue();
        var A4405CATEG = Ext.getCmp(prototype.id + '-txtA4405CATEG').getValue();
        var A4405CIA = Ext.getCmp(prototype.id + '-txtA4405CIA').getValue();
        var A4405UNIDA = Ext.getCmp(prototype.id + '-txtA4405UNIDA').getValue();
        var A4405CECOS = Ext.getCmp(prototype.id + '-txtA4405CECOS').getValue();
        var A4405UBICA = Ext.getCmp(prototype.id + '-txtA4405UBICA').getValue();
        var A4405CTA = Ext.getCmp(prototype.id + '-txtA4405CTA').getValue();
        var A4405SCTA = Ext.getCmp(prototype.id + '-txtA4405SCTA').getValue();
        var A4405EQUI = Ext.getCmp(prototype.id + '-txtA4405EQUI').getValue();
        var A4405ICIA = Ext.getCmp(prototype.id + '-txtA4405ICIA').getValue();
        var A4405CLIE = Ext.getCmp(prototype.id + '-txtA4405CLIE').getValue();
        var A4405FINI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA4405FINI2').getValue(), 'Ymd');
        var A4405FFIN = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtA4405FFIN2').getValue(), 'Ymd');
        A4405FFIN = A4405FFIN === '' ? '99999999' : A4405FFIN;
        
        return {
            strOption: strOption,
            A4405TITRA: A4405TITRA,
            A4405TIPO: A4405TIPO,
            A4405INTNU: A4405INTNU,
            A4405SUBTI: A4405SUBTI,
            A4405CATEG: A4405CATEG,
            A4405CIA: A4405CIA,
            A4405UNIDA: A4405UNIDA,
            A4405CECOS: A4405CECOS,
            A4405UBICA: A4405UBICA,
            A4405CTA: A4405CTA,
            A4405SCTA: A4405SCTA,
            A4405EQUI: A4405EQUI,
            A4405ICIA: A4405ICIA,
            A4405CLIE: A4405CLIE,
            A4405FINI: A4405FINI,
            A4405FFIN: A4405FFIN,
            IN_A4405TITRA_OLD: this.lblA4405TITRA,
            IN_A4405TIPO_OLD: this.lblA4405TIPO,
            IN_A4405SUBTI_OLD: this.lblA4405SUBTI,
            IN_A4405CATEG_OLD: this.lblA4405CATEG
        };
    }
    
});