Ext.define('Ext.Praxis.controller.travelbank.TransaccionError.Crud.IssueDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.IssueDataEntryController',
    // <editor-fold defaultstate="collapsed" desc="Variables Globales">
    msjAlert: '',
    beanOption: '',
    dataentryParams: {},
    detalleSearchParams: {},
    // </editor-fold>
    init: function () {
        //console.log('init');
    },
    afterRender: function () {
        this.p = this.view.params;
        switch (this.p.action) {
            case 'U':
                this.mostrarData(this.p.rec);
                Ext.getCmp(prototype.id3 + '-btn-save').show();                
//                Ext.getCmp(prototype.id3+'-btn-update').hide();                                           
//                Ext.getCmp(prototype.id3+'-btn-cancel').show();
                break;
//            case 'I':
//                Ext.getCmp(prototype.id3+'-btn-save').show();
//                Ext.getCmp(prototype.id3+'-btn-update').hide();
//                Ext.getCmp(prototype.id3+'-btn-delete').hide();
//                Ext.getCmp(prototype.id3+'-btn-cancel').show();
//                break;

        }
//        global.AccessControlMaganer();

    },

    // <editor-fold defaultstate="collapsed" desc="mostrarData">
    mostrarData: function (rec) {
        //console.log(rec);
        //obtiene informacion de la tabla ISSUE
        this.getData(rec);

    },
    // </editor-fold>   

    // <editor-fold defaultstate="collapsed" desc="setFormatParameter">
    setFormatParameter: function (rec) {
        var me = this;
        //console.log(rec);        
        me.detalleSearchParams = {
            VP_PRDA: rec.get('A4280PRDA'),
            VP_MDA: rec.get('A4280MDA'),
            VP_SQDIA: rec.get('A4280SQDIA'),
            VP_IDISS: '',
            VP_Document: '',
            VP_IDISR: ''
        };
        // <editor-fold defaultstate="collapsed" desc="llenarData">
        var cmbfiltro = this.getValue('cmbfiltroDataEntry');
        me.detalleSearchParams.VP_OPCION = cmbfiltro;
        switch (cmbfiltro) {
            case "1" :
                me.detalleSearchParams.VP_IDISS = Ext.getCmp(prototype.id3 + '-A4281IDISS-Filter').getValue();
                break;
            case '2':
                me.detalleSearchParams.VP_Document = Ext.getCmp(prototype.id3 + '-DocumentTKT-Filter').getValue();
                break;
            case '3':
                me.detalleSearchParams.VP_IDISS = Ext.getCmp(prototype.id3 + '-A4281IDISR-Filter').getValue();
                break;
        }
        // </editor-fold>

        // <editor-fold defaultstate="collapsed" desc="asignación">
//        _path = prototype.url + '/getXLSX?' +
//                'IN_MODULO=' + searchParams.IN_MODULO + '&' +
//                'IN_FECHA_PROCESO=' + searchParams.IN_FECHA_PROCESO + '&' +
//                'IN_FECHA_ACUSE=' + searchParams.IN_FECHA_ACUSE + '&' +
//                'A1955STATU=' + searchParams.A1955STATU;
        // </editor-fold>
    },
    // </editor-fold>

    // <editor-fold defaultstate="collapsed" desc="CRUD">
    onSaveClick: function (btn) {
        if (this.validaRequiredFields()) {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Are you sure to save ?',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        // this.view.params.action = "U";
                        this.llenarData();
                        this.crud();
                    }
                }
            });
        } else {
            var msg = this.msjAlert;
            if (msg === '')
                msg = 'You must enter all required fields.';
            global.Msg({
                msg: msg
            });
        }
    },
    onCancelClick: function (btn) {
        this.view.close();
    },
    onDeleteClick: function (btn) {
//        switch (this.getValue('cbxModulo')) {
//            case "PSALES" :
//                dataentryParams = {};
//                dataentryParams.IN_MODULO = 'SALES';
//                dataentryParams.IN_FECHA_PROCESO = this.p.rec.get('A1955FPROC');
//                this.setReverse(this.p.rec);
//                break;
//
//        }
    },
    // </editor-fold>

    validaRequiredFields: function () {
//        if (this.getValue('A4281IDISR') === '' || this.getValue('A4281IDISR') === null) {
//            this.msjAlert = 'Enter correct data';
//            return false;
//        }
        return true;
    },

    crud: function () {
        //var mod = this;
        Ext.Ajax.request({
            url: prototype.url + '/setIssueCrud',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.beanOption)
            },
            beforerequest: Ext.getCmp(prototype.id3 + '-formDataEntry').mask('Loading...'),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                console.log(res);
                if (res.success) {
                    var msg = res.objRtn.dbException.MESSAGE;
                    global.Msg({
                        msg: msg,
                        icon: res.objRtn.dbException.SQLCODE==='1'?1:2,
                        fn: function () {
                            if(res.objRtn.dbException.SQLCODE==='1'){
                                Ext.getCmp('CrudIssueDataEntry').close();
                                // Ext.getCmp(prototype.id3 + '-btnSearch').fireEvent('click', {});
                            }                           
                        }
                    });
                } else {
                    global.Msg({
                        msg: res.objRtn.dbException.MESSAGE
                    });
                }
                Ext.getCmp(prototype.id3 + '-formDataEntry').unmask();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id3 + '-formDataEntry').unmask();
            }
        });
    },

    getData: function (rec) {
        var me = this;
        var beanOption = {
            VP_A4281IDISS: rec.get('A4435IDISS'),
            VP_A4281SQISS: rec.get('A4435SQ')
        };

        Ext.Ajax.request({
            url: prototype.url1 + '/searchIDISS',
            method: 'POST',
            timeout: 60000000,
            params: beanOption,
            beforerequest: Ext.getCmp(prototype.id3 + '-formDataEntry').mask('Loading...'),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                if (res.total > 0) {
                    var rec1 = res.data[0];
                    //console.log(rec1);                    
                    me.setValue('A4281IDISS', rec1.A4281IDISS);
                    me.setValue('A4281SQISS', rec1.A4281SQISS);
                    me.setValue('A4281TRNCU', rec1.A4281TRNCU);
                    me.setValue('A4281NCTA', rec1.A4281NCTA);
                    me.setValue('A4281SERV', rec1.A4281SERV);
                    me.setValue('A4281VALOR', Ext.util.Format.number(rec1.A4281VALOR, '0,000.00'));
                    me.setValue('A4281MDA', rec1.A4281MDA);
                    me.setValue('A4281MOT', rec1.A4281MOT);
                    me.setValue('A4281TIPD', rec1.A4281TIPD);
                    me.setValue('A4281FEMI', rec1.A4281FEMI);
                    me.setValue('A4281FEXP', rec1.A4281FEXP);
                    me.setValue('ticket-number', rec1.A4281CIA + rec1.A4281FORMA + rec1.A4281SERIE);
                    me.setValue('A4281IDISR', rec1.A4281IDISR.trim());
                    me.setValue('A4281SQISR', rec1.A4281SQISR.trim());
                    me.setValue('A4281REGIS', rec1.A4281REGIS);
                    me.setValue('A4281FREGI', rec1.A4281FREGI);
                    me.setValue('A4281HREGI', rec1.A4281HREGI);
                    me.setValue('A4281REVIS', rec1.A4281REVIS);
                    me.setValue('A4281FREVI', rec1.A4281FREVI);
                    me.setValue('A4281HREVI', rec1.A4281HREVI);
                    Ext.getCmp(prototype.id3 + '-A4281IDISR').focus();
                } else {
                    global.Msg({
                        msg: res.sesion
                    });
                }
                Ext.getCmp(prototype.id3 + '-formDataEntry').unmask();
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
                Ext.getCmp(prototype.id3 + '-formDataEntry').unmask();
            }
        });

    },
    llenarData: function () {
        this.beanOption = {};
        this.beanOption = {
            VP_ACTION: this.view.params.action,
            A4281IDISS: Ext.getCmp(prototype.id3 + '-A4281IDISS').getValue(),
            A4281SQISS: Ext.getCmp(prototype.id3 + '-A4281SQISS').getValue(),
            A4281NCTA: Ext.getCmp(prototype.id3 + '-A4281NCTA').getValue(),
            A4281SERV: Ext.getCmp(prototype.id3 + '-A4281SERV').getValue(),
            A4281PRDA: '',
            A4281MDA: '',
            A4281SQDIA: '',
            A4281DEC: '',
            A4281VALOR: 00,
            A4281REF: '',
            A4281CIU: '',
            A4281MOT: '',
            A4281TIPD: '',
            A4281FEMI: '',
            A4281FEXP: '',
            A4281NMC: '',
            A4281CIA: '',
            A4281FORMA: '',
            A4281SERIE: '',
            A4281STS: '',
            A4281ERR: '',
            A4281IDFIL: '',
            A4281TYPE: '',
            A4281TRNCU: '',
            A4281IDISR: Ext.getCmp(prototype.id3 + '-A4281IDISR').getValue(),
            A4281SQISR: Ext.getCmp(prototype.id3 + '-A4281SQISR').getValue(),
            A4281TCUS: 0,
            A4281TCMX: 0,
            A4281VALUS: 0,
            A4281VALMX: 0
        };
    },
    // <editor-fold defaultstate="collapsed" desc="Utilitarios">
    getValue: function (id) {
        return Ext.getCmp(prototype.id3 + '-' + id).getValue();
    },
    focus: function (id) {
        Ext.getCmp(prototype.id3 + '-' + id).focus();
    },
    setValue: function (id, txt) {
        Ext.getCmp(prototype.id3 + '-' + id).setValue(txt);
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }
    // </editor-fold>
});




