    Ext.define('Ext.Praxis.controller.sales.AttosMasterFile.DataEntryAttosMasterFileController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAttosMasterFileController',
    lblA4290CTATO_OLD: '',
    lblA4290FINI_OLD: '',
    init: function(view){
    },
    afterRender: function(){
        this.p = this.view.params;
        switch( this.p.action ){
            case 'U':
                this.getDataInputs(this.p.rec);
                Ext.getCmp(prototype.id+'-btn-save').hide();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').show();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                break;
            case 'I':
                Ext.getCmp(prototype.id+'-btn-save').show();
                Ext.getCmp(prototype.id+'-btn-update').hide();
                Ext.getCmp(prototype.id+'-btn-delete').hide();
                Ext.getCmp(prototype.id+'-btn-cancel').show();
                Ext.getCmp(prototype.id + '-txtA4290CTATO').focus();
                break;
        }
        global.AccessControlMaganer();
    },
    getDataInputs: function(rec) {

        Ext.getCmp(prototype.id + '-txtA4290CTATO').setValue(rec.get('A4290CTATO'));
        Ext.getCmp(prototype.id + '-txtA4290NOMBR').setValue(rec.get('A4290NOMBR'));
        Ext.getCmp(prototype.id + '-txtA4290CATEG').setValue(rec.get('A4290CATEG'));
        Ext.getCmp(prototype.id + '-txtA4290TIMZ').setValue(rec.get('A4290TIMZ'));
        
        Ext.getCmp(prototype.id + '-txtA4290CIUD').setValue(rec.get('A4290CIUD'));
        Ext.getCmp(prototype.id + '-txtA4290NOMCD').setValue(rec.get('A4290NOMCD'));
        Ext.getCmp(prototype.id + '-txtA4290STATE').setValue(rec.get('A4290STATE'));
        Ext.getCmp(prototype.id + '-txtA4290STAT').setValue(rec.get('A4290STAT'));
        
        Ext.getCmp(prototype.id + '-txtA4290PAIS').setValue(rec.get('A4290PAIS'));
        Ext.getCmp(prototype.id + '-txtA4290nomPAIS').setValue(rec.get('strNomPais'));
        
        Ext.getCmp(prototype.id + '-txtA4290LONG').setValue(rec.get('A4290LONG'));
        Ext.getCmp(prototype.id + '-txtA4290LATI').setValue(rec.get('A4290LATI'));
        
        Ext.getCmp(prototype.id + '-txtStartDate').setValue(rec.get('A4290FINI'));        
        Ext.getCmp(prototype.id + '-txtEndDate').setValue(rec.get('A4290FFIN')==='9999/99/99' ? '' : rec.get('A4290FFIN'));
        
        Ext.getCmp(prototype.id + '-USCR').setValue(rec.get('A4290REGIS'));
        Ext.getCmp(prototype.id + '-FECR').setValue(rec.get('A4290FREGI'));
        Ext.getCmp(prototype.id + '-HOCR').setValue(rec.get('A4290HREGI'));
        Ext.getCmp(prototype.id + '-USUP').setValue(rec.get('A4290REVIS'));
        Ext.getCmp(prototype.id + '-FEUP').setValue(rec.get('A4290FREVI'));
        Ext.getCmp(prototype.id + '-HOUP').setValue(rec.get('A4290HREVI'));
        
        this.lblA4290CTATO_OLD = rec.get('A4290CTATO');
        this.lblA4290FINI_OLD = Ext.util.Format.date(rec.get('A4290FINI'), 'Ymd');
    },
    onCancelClick: function(btn){
        this.view.close();
    },
    onUpperValue: function(field, newValue, oldValue){
        field.setValue(newValue.toUpperCase());
    },
    onSaveClick: function(btn) {
        var p = this.view.params;
        
        var txtA4290CTATO = Ext.getCmp(prototype.id + '-txtA4290CTATO').getValue();
        var txtA4290PAIS = Ext.getCmp(prototype.id + '-txtA4290PAIS').getValue();
        var txtA4290CIUD = Ext.getCmp(prototype.id + '-txtA4290CIUD').getValue();
        var txtA4290NOMBR = Ext.getCmp(prototype.id + '-txtA4290NOMBR').getValue();
        var txtA4290NOMCD = Ext.getCmp(prototype.id + '-txtA4290NOMCD').getValue();
        var txtA4290STAT = Ext.getCmp(prototype.id + '-txtA4290STAT').getValue();
        
        var txtStartDate = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtStartDate').getValue(), 'Ymd');
        
        if (txtA4290CTATO === "" || txtA4290PAIS === "" || txtA4290CIUD === "" ||
                txtA4290NOMBR === "" || txtA4290NOMCD === "" || txtA4290STAT === "" || txtStartDate === "") {
            global.Msg({
                msg: 'You must enter all required fields.',
                fn: function() {}
            });
        } else { 
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to insert ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {txtA4290NOMBR
                    if (btn === 'yes') {
                        this.view.params.action = "I";
                        this.crud();
                    }
                }
            });
        }
    },
    onUpdateClick: function(btn) {
        var p = this.view.params;
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
                    console.log("LISTO PARA UPDATE");
                    this.view.params.action = "U";
                    this.crud();
                }
            }
        });
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
        console.log(this.getDataEntryValues());
        Ext.Ajax.request({
            url: prototype.url + '/cityReportMaintance',
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
                        Ext.getCmp('DataEntryAttosMasterFileForm').close(),
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });
    },
    getDataEntryValues: function() {
        var p = this.view.params;

        var strOption = p.action;
        var A4290CTATO = Ext.getCmp(prototype.id + '-txtA4290CTATO').getValue();
        var A4290NOMBR = Ext.getCmp(prototype.id + '-txtA4290NOMBR').getValue();
        var A4290CATEG = Ext.getCmp(prototype.id + '-txtA4290CATEG').getValue();
        var A4290CIUD = Ext.getCmp(prototype.id + '-txtA4290CIUD').getValue();
        var A4290NOMCD = Ext.getCmp(prototype.id + '-txtA4290NOMCD').getValue();
        var A4290STATE = Ext.getCmp(prototype.id + '-txtA4290STATE').getValue();
        
        var A4290PAIS = Ext.getCmp(prototype.id + '-txtA4290PAIS').getValue();
        var A4290TIMZ = Ext.getCmp(prototype.id + '-txtA4290TIMZ').getValue();
        var A4290STAT = Ext.getCmp(prototype.id + '-txtA4290STAT').getValue();
        var A4290LONG = Ext.getCmp(prototype.id + '-txtA4290LONG').getValue();
        var A4290LATI = Ext.getCmp(prototype.id + '-txtA4290LATI').getValue();
                	        
        var A4290FINI = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtStartDate').getValue(), 'Ymd');
        var A4290FFIN  = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtEndDate').getValue(), 'Ymd');  
                
        A4290FFIN  = A4290FFIN  === '' ? '99999999' : A4290FFIN ;
        
        return {
            strOption: strOption,
            A4290CTATO: A4290CTATO,
            A4290NOMBR: A4290NOMBR,
            A4290CATEG: A4290CATEG,
            A4290CIUD: A4290CIUD,
            A4290NOMCD: A4290NOMCD,
            A4290STATE: A4290STATE,
            A4290PAIS: A4290PAIS,
            A4290TIMZ: A4290TIMZ,
            A4290STAT: A4290STAT,
            A4290LONG: A4290LONG,
            A4290LATI: A4290LATI,            
            A4290FINI: A4290FINI,
            A4290FFIN: A4290FFIN,
            IN_A4290CTATO_OLD: this.lblA4290CTATO_OLD,
            IN_A4290FINI_OLD: this.lblA4290FINI_OLD
            
        };
    }
    
});