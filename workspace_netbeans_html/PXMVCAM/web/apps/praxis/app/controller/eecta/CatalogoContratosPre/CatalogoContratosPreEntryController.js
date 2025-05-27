/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.CatalogoContratosPre.CatalogoContratosPreEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id + '-dataEntryController',
    url: CONTEXTPATH + '/CatalogoContratosPre',
    url01: CONTEXTPATH + '/CatalogoCliente',
    init: function (view) {
        var me = this;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        //SET store Grid
        var grid01 = Ext.getCmp(prototype.id + '-gridData-uatp');
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.CatalogoCliente.GridDataUatp', {});
        grid01.setStore(storeGridDatas);


        this.get_ClearField();
        var p = this.view.params;
        switch (p.action) {
            case 'I':
                Ext.getCmp(prototype.id + '-btn-delete').hide();
                Ext.getCmp(prototype.id + '-btn-update').hide();
                //Ext.getCmp(prototype.id + '-btnDet-contrato').hide();
                Ext.getCmp(prototype.id + '-btn-save').show();
                //this.handlerEvent_setDisabled(true);
                Ext.getCmp(prototype.id + '-A4241CDCLI').focus();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id + '-btn-save').hide();
                Ext.getCmp(prototype.id + '-btn-update').show();
                // Ext.getCmp(prototype.id + '-btnDet-contrato').show();                
                this.handlerEvent_setDisabled(false);
                break;
        }
    },
    handlerEvent_setDisabled: function (bflag) {
        //boton logo
        //Ext.getCmp(prototype.id + '-file').setDisabled(bflag);
        //Ext.getCmp(prototype.id + '-btn-upload').setDisabled(bflag);
    },
    set_calcular_beneficio: function () {
        var A4241TOTBF = 0;
        var A4241TOT = 0;
        var A4241TOTAN = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-A4241TOTAN').getValue().replace(",", "").replace(",", ""));
        var A4241PORBF = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-A4241PORBF').getValue().replace(",", "").replace(",", ""));
        if (Ext.Number.parseFloat(A4241PORBF) > 0)
            A4241TOTBF = Ext.Number.parseFloat(A4241TOTAN * A4241PORBF) / 100;
        
        A4241TOT = Ext.Number.parseFloat(A4241TOTAN + A4241TOTBF);
        Ext.getCmp(prototype.id + '-A4241TOTBF').setValue(Ext.util.Format.number(A4241TOTBF, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4241TOT').setValue(Ext.util.Format.number(A4241TOT, '0,000.00'));
    },
    getDataInputs: function () {
        var p = this.view.params;
        var data = p.rec.data;
        console.log(data);
        Ext.getCmp(prototype.id + '-A4241IDANT').setValue(data.A4241IDANT);
        Ext.getCmp(prototype.id + '-A4241CDCLI').setValue(data.A4241CDCLI);
        Ext.getCmp(prototype.id + '-A3953RSOCI').setValue(data.A3953RSOCI.trim());
        Ext.getCmp(prototype.id + '-A4241FEC').setValue(data.A4241FEC);
        Ext.getCmp(prototype.id + '-A4241TOTAN').setValue(Ext.util.Format.number(data.A4241TOTAN, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4241PORBF').setValue(Ext.util.Format.number(data.A4241PORBF, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4241TOTBF').setValue(Ext.util.Format.number(data.A4241TOTBF, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4241TOT').setValue(Ext.util.Format.number(data.A4241TOT, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4241MDA').setValue(data.A4241MDA);
        Ext.getCmp(prototype.id + '-A4241CONTR').setValue(data.A4241CONTR);
        Ext.getCmp(prototype.id + '-A4241REF').setValue(data.A4241REF);
        Ext.getCmp(prototype.id + '-A4241ORDN').setValue(data.A4241ORDN);
        //saldos
        Ext.getCmp(prototype.id + '-A4242TOTAN').setValue(Ext.util.Format.number(data.A4242TOTAN, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4242TOTBF').setValue(Ext.util.Format.number(data.A4242TOTBF, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4242TOT').setValue(Ext.util.Format.number(data.A4242TOT, '0,000.00'));

        Ext.getCmp(prototype.id + '-A4242VTAAN').setValue(Ext.util.Format.number(data.A4242VTAAN, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4242VTABF').setValue(Ext.util.Format.number(data.A4242VTABF, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4242TOTAP').setValue(Ext.util.Format.number(data.A4242TOTAP, '0,000.00'));

        Ext.getCmp(prototype.id + '-A4242SALAN').setValue(Ext.util.Format.number(data.A4242SALAN, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4242SALBF').setValue(Ext.util.Format.number(data.A4242SALBF, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4242SALDO').setValue(Ext.util.Format.number(data.A4242SALDO, '0,000.00'));

        //control data

        Ext.getCmp(prototype.id + '-A4241USRIN').setValue(data.A4241USRIN);
        Ext.getCmp(prototype.id + '-A4241FECIN').setValue(data.A4241FECIN);
        Ext.getCmp(prototype.id + '-A4241HORIN').setValue(data.A4241HORIN);
        //--
        Ext.getCmp(prototype.id + '-A4241USRAC').setValue(data.A4241USRAC);
        Ext.getCmp(prototype.id + '-A4241FECAC').setValue(data.A4241FECAC);
        Ext.getCmp(prototype.id + '-A4241HORAC').setValue(data.A4241HORAC);

        Ext.getCmp(prototype.id + '-A4241FECDE').setValue(data.A4241FECDE);
        Ext.getCmp(prototype.id + '-A4241FECHA').setValue(data.A4241FECHA);
        Ext.getCmp(prototype.id + '-A4241FECRC').setValue(data.A4241FECRC);
        Ext.getCmp(prototype.id + '-A4241NUMRC').setValue(data.A4241NUMRC);
        Ext.getCmp(prototype.id + '-A4241IDRCB').setValue(data.A4241IDRCB);
        //datos de facturacion
        Ext.getCmp(prototype.id + '-A4241UIDAN').setValue(data.A4241UIDAN); 
        Ext.getCmp(prototype.id + '-A4241UIDBF').setValue(data.A4241UIDBF); 
//        if (data.A4241STATB === '1' ){
//            Ext.getCmp(prototype.id + '-btn-facturar').setDisabled(true);
//        }      
        this.search_uatp();
        this.searchAttachFile();

    },
    getDataEntryValues: function (strOption) {
        var VP_ACTION = strOption;
        var VL_A4241IDANT = Ext.getCmp(prototype.id + '-A4241IDANT').getValue();
        var VL_A4241FEC = Ext.util.Format.date(Ext.getCmp(prototype.id + '-A4241FEC').getValue(), 'Ymd');
        var VL_A4241TOTAN = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-A4241TOTAN').getValue().replace(",", "").replace(",", ""));
        var VL_A4241MDA = Ext.getCmp(prototype.id + '-A4241MDA').getValue();
        var VL_A4241PORBF = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-A4241PORBF').getValue().replace(",", "").replace(",", ""));
        var VL_A4241TOTBF = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-A4241TOTBF').getValue().replace(",", "").replace(",", ""));
        var VL_A4241TOT = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-A4241TOT').getValue().replace(",", "").replace(",", ""));
        var VL_A4241ORDN = Ext.getCmp(prototype.id + '-A4241ORDN').getValue();
        var VL_A4241CONTR = Ext.getCmp(prototype.id + '-A4241CONTR').getValue();
        var VL_A4241REF = Ext.getCmp(prototype.id + '-A4241REF').getValue();
        var VL_A4241FECDE = Ext.util.Format.date(Ext.getCmp(prototype.id + '-A4241FECDE').getValue(), 'Ymd');
        var VL_A4241FECHA = Ext.util.Format.date(Ext.getCmp(prototype.id + '-A4241FECHA').getValue(), 'Ymd');
        var VL_A4241STSPG = Ext.getCmp(prototype.id + '-A4241STSPG').getValue();
        var VL_A4241IDRCB = Ext.getCmp(prototype.id + '-A4241IDRCB').getValue();
        var VL_A4241FECRC = Ext.util.Format.date(Ext.getCmp(prototype.id + '-A4241FECRC').getValue(), 'Ymd');
        var VL_A4241NUMRC = Ext.getCmp(prototype.id + '-A4241NUMRC').getValue();
        var VL_A4241CDCLI = Ext.getCmp(prototype.id + '-A4241CDCLI').getValue();

        return {
            VP_ACTION: VP_ACTION,
            A4241IDANT: VL_A4241IDANT,
            A4241FEC: VL_A4241FEC,
            A4241TOTAN: VL_A4241TOTAN,
            A4241MDA: VL_A4241MDA,
            A4241PORBF: VL_A4241PORBF,
            A4241TOTBF: VL_A4241TOTBF,
            A4241TOT: VL_A4241TOT,
            A4241ORDN: VL_A4241ORDN,
            A4241CONTR: VL_A4241CONTR,
            A4241REF: VL_A4241REF,
            A4241FECDE: VL_A4241FECDE,
            A4241FECHA: VL_A4241FECHA,
            A4241STSPG: VL_A4241STSPG,
            A4241IDRCB: VL_A4241IDRCB,
            A4241FECRC: VL_A4241FECRC,
            A4241NUMRC: VL_A4241NUMRC,
            A4241CDCLI: VL_A4241CDCLI
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
                msg: 'Are you sure to insert?',
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
        //Detalle UATP
        var lstuatp = new Array();
        var RemovedRecords = this.getRemovedRecords(prototype.id + '-gridData-uatp');
        //console.log('REMOVED:');
        //console.log(RemovedRecords); 
        var bFlag_Nbr_uatp = false;
        RemovedRecords.forEach(function (rec) {
            if (rec.data.A4244UATP.trim() === '')
                bFlag_Nbr_uatp = true;
            lstuatp.push({
                "crudState": "D", //rec.crudState,
                //"A4244CCUST": rec.data.A4244CCUST,
                //"A4244CDCLI": rec.data.A4244CDCLI,
                "A4244UATP": rec.data.A4244UATP,
                "A4244TIPO": rec.data.A4244TIPO,
                "A4244ITEM": rec.data.A4244ITEM
                        //"A4244MDA": rec.data.A4244MDA,
                        //"A4244VENTA": rec.data.A4244VENTA                
            });
        });

        var NewRecords = this.getNewRecords(prototype.id + '-gridData-uatp');
        //console.log('NewRecords:');
        //console.log(NewRecords);
        NewRecords.forEach(function (rec) {
            if (rec.data.A4244UATP.trim() === '')
                bFlag_Nbr_uatp = true;
            lstuatp.push({
                "crudState": "I", //rec.crudState,
                //"A4244CCUST": rec.data.A4244CCUST,
                //"A4244CDCLI": rec.data.A4244CDCLI,
                "A4244UATP": rec.data.A4244UATP,
                "A4244TIPO": rec.data.A4244TIPO,
                "A4244ITEM": rec.data.A4244ITEM
                        //"A4244MDA": rec.data.A4244MDA,
                        //"A4244VENTA": rec.data.A4244VENTA  
            });
        });

        var ModifiedRecords = this.getModifiedRecords(prototype.id + '-gridData-uatp');
        //console.log('UPDATE:');
        //console.log(ModifiedRecords); 
        ModifiedRecords.forEach(function (rec) {
            if (rec.data.A4244UATP.trim() === '')
                bFlag_Nbr_uatp = true;
            lstuatp.push({
                "crudState": "U", //rec.crudState,
                // "A4244CCUST": rec.data.A4244CCUST,
                // "A4244CDCLI": rec.data.A4244CDCLI,
                "A4244UATP": rec.data.A4244UATP,
                "A4244TIPO": rec.data.A4244TIPO,
                "A4244ITEM": rec.data.A4244ITEM
                        // "A4244MDA": rec.data.A4244MDA,
                        // "A4244VENTA": rec.data.A4244VENTA  
            });
        });

        // valida registro UATP
        if (bFlag_Nbr_uatp) {
            global.Msg({
                msg: 'Ingresar tarjetas UATP'
            });
            return;
        }
        //Detalle identif.
        //var lst_identif = this.getDataEntry_det_identif();

        var me = this;
        Ext.Ajax.request({
            url: this.url + '/setContratosCrud',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.getDataEntryValues(strOption)),
                beanuatp: JSON.stringify(lstuatp)
            },
            beforerequest: Ext.getCmp(prototype.id + '-CatalogoContratosPreEntry').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
//                console.log(objRtn);
                Ext.getCmp(prototype.id + '-CatalogoContratosPreEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE,
                    fn: function () {
                        //culmino PROCESO
                        //console.log(objRtn.dbException.SQLCODE);
                        if (objRtn.dbException.SQLCODE === '0')
                            return;
                        Ext.getCmp(prototype.id + '-A4241IDANT').setValue(objRtn.OU_A4241ID);
                        //carga logo(pendiente)
                        me.search_uatp(); //cargar desde la base de datos para generar STORE.                        
                        me.handlerEvent_setDisabled(false);
                        //PARA ACTUALIZAR DESPUES DE INSERTAR
                        if (strOption === "I") {
                            Ext.getCmp(prototype.id + '-btn-save').hide();
                            Ext.getCmp(prototype.id + '-btn-update').show();
                            //Ext.getCmp(prototype.id + '-btnDet-contrato').show();
                            me.view.params.action = "U";
                        }
                        //Ext.getCmp(prototype.id + '-CatalogoClienteEntry').close();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                    }
                });
            }
        });

    },
    onInvoice: function () {
        var me = this;
        var VL_A4241IDANT = Ext.getCmp(prototype.id + '-A4241IDANT').getValue();
        var VL_FDESDE = '';
        var VP_FHASTA = '';
        var VP_CDCLI = '';

        Ext.Ajax.request({
            url: this.url + '/setPreCompraInvoice',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify({
                    VP_IDANT: VL_A4241IDANT,
                    VP_FDESDE: VL_FDESDE,
                    VP_FHASTA: VP_FHASTA,
                    VP_CDCLI: VP_CDCLI
                })
            },
            beforerequest: Ext.getCmp(prototype.id + '-CatalogoContratosPreEntry').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id + '-CatalogoContratosPreEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE,
                    fn: function () {
                        //culmino PROCESO
                        console.log(objRtn.dbException);
                        if (objRtn.dbException.SQLCODE === '0')
                            return;
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        Ext.getCmp(prototype.id + '-CatalogoContratosPreEntry').close();
                    }
                });
            }
        });
    },
    onInvoiceNCBeneficio: function () {
        var me = this;
        var VL_A4241IDANT = Ext.getCmp(prototype.id + '-A4241IDANT').getValue();
        var VL_FDESDE = '';
        var VP_FHASTA = '';
        var VP_CDCLI = '';

        Ext.Ajax.request({
            url: this.url + '/setInvoiceNCBeneficio',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify({
                    VP_IDANT: VL_A4241IDANT,
                    VP_FDESDE: VL_FDESDE,
                    VP_FHASTA: VP_FHASTA,
                    VP_CDCLI: VP_CDCLI
                })
            },
            beforerequest: Ext.getCmp(prototype.id + '-CatalogoContratosPreEntry').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id + '-CatalogoContratosPreEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE,
                    fn: function () {
                        //culmino PROCESO
                        console.log(objRtn.dbException);
                        if (objRtn.dbException.SQLCODE === '0')
                            return;
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        Ext.getCmp(prototype.id + '-CatalogoContratosPreEntry').close();
                    }
                });
            }
        });
    },
    
    onInvoiceNCTicket: function () {        
        var VL_A4241IDANT = Ext.getCmp(prototype.id + '-A4241IDANT').getValue();
        var VL_FDESDE = '';
        var VP_FHASTA = '';
        var VP_CDCLI = '';

        Ext.Ajax.request({
            url: this.url + '/setInvoiceNCTicket',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify({
                    VP_IDANT: VL_A4241IDANT,
                    VP_FDESDE: VL_FDESDE,
                    VP_FHASTA: VP_FHASTA,
                    VP_CDCLI: VP_CDCLI
                })
            },
            beforerequest: Ext.getCmp(prototype.id + '-CatalogoContratosPreEntry').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id + '-CatalogoContratosPreEntry').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE,
                    fn: function () {
                        //culmino PROCESO
                        console.log(objRtn.dbException);
                        if (objRtn.dbException.SQLCODE === '0')
                            return;
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                        Ext.getCmp(prototype.id + '-CatalogoContratosPreEntry').close();
                    }
                });
            }
        });
    },
    
    onUpdateClick: function (btn) {
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
                msg: 'Are you sure to update ?',
                scope: this,
                buttons: Ext.MessageBox.YESNO,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function (btn) {
                    if (btn === 'yes') {
                        this.view.params.action = "U";
                        this.crud();
                    }
                }
            });
        }
    },
    onDeleteClick: function (btn) {

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to delete ?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.view.params.action = "D";
                    this.crud();
                }
            }
        });
    },
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.id + '-CatalogoContratosPreEntry').close();
    },
    onFacturarClick: function () {

        var VL_A4241IDANT = Ext.getCmp(prototype.id + '-A4241IDANT').getValue();
        console.log(VL_A4241IDANT);
        if ( parseInt(VL_A4241IDANT) === 0) {
            global.Msg({
                msg: 'No se puede facturar'
            });
            return;
        }
        var p = this.view.params;
        var data = p.rec.data;
        //console.log(data);        
        if ( data.A4241STATB === '1') {
            global.Msg({
                msg: 'El anticipo ya esta facturado'
            });
            return;
        }
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to send to invoice?',
            scope: this,
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.onInvoice();
                }
            }
        });
    },
    
    onFacturarNCBeneficioClick: function () {

        var VL_A4241IDANT = Ext.getCmp(prototype.id + '-A4241IDANT').getValue();
        var VL_A4421TOTBF = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-A4241TOTBF').getValue().replace(",", "").replace(",", ""));
        
        if ( parseInt(VL_A4241IDANT) === 0) {
            global.Msg({
                msg: 'No se puede facturar'
            });
            return;
        }
         if ( parseInt(VL_A4421TOTBF) === 0) {
            global.Msg({
                msg: 'No se puede facturar no hay importe de beneficio'
            });
            return;
        }
        
        if ( Ext.getCmp(prototype.id + '-A4241UIDBF').getValue().trim() !== '') {
            global.Msg({
                msg: 'El beneficio ya esta facturado'
            });
            return;
        }
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to send to invoice NC?',
            scope: this,
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.onInvoiceNCBeneficio();
                }
            }
        });
    },
    onFacturarNCTicketClick: function () {

        var VL_A4241IDANT = Ext.getCmp(prototype.id + '-A4241IDANT').getValue();
        
        if ( parseInt(VL_A4241IDANT) === 0) {
            global.Msg({
                msg: 'No se puede facturar'
            });
            return;
        }
//        console.log(Ext.getCmp(prototype.id + '-A4242SALBF').getValue());
        var VL_A4242SALBF = Ext.Number.parseFloat(Ext.getCmp(prototype.id + '-A4242SALBF').getValue().replace(",", "").replace(",", ""));
        if ( VL_A4242SALBF !== 0 ) {
            global.Msg({
                msg: 'No puede facturar, saldo de anticipo debe ser cero(0)'
            });
            return;
        }
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Are you sure to send to invoice NC TKT?',
            scope: this,
            buttons: Ext.MessageBox.YESNO,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.onInvoiceNCTicket();
                }
            }
        });
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onFocusNumberfield: function (obj, error, eOpts) {
        obj.selectText();
    },
    validateForm: function (params) {
//        console.log(params);
        var mensaje = "";

        if (params.A4241CDCLI === '') {
            mensaje = 'INGRESAR EL CLIENTE';
            Ext.getCmp(prototype.id + '-A4241CDCLI').focus();
            return mensaje;
        }
        if (params.A4241FEC === '') {
            mensaje = 'INGRESAR FECHA DE CONTRATO';
            Ext.getCmp(prototype.id + '-A4241FEC').focus();
            return mensaje;
        }
        if (parseFloat(params.A4241TOTAN) === 0) {
            mensaje = 'INGRESAR MONTO ANTICIPO';
            Ext.getCmp(prototype.id + '-A4241TOTAN').focus();
            return mensaje;
        }
        if (params.A4241MDA === '') {
            mensaje = 'INGRESAR MONEDA DE ANTICIPO ';
            Ext.getCmp(prototype.id + '-A4241MDA').focus();
            return mensaje;
        }
        
        // No validar, puede haber contratos sin BENEFICIO
        if (parseFloat(params.A4241PORBF) === 0 || params.A4241PORBF === null) {
//            mensaje = 'INGRESAR % BENEFICIO';
//            Ext.getCmp(prototype.id + '-A4241PORBF').focus();
//            return mensaje;
            params.A4241PORBF = 0;
        }
        var Count = Ext.getCmp(prototype.id + '-gridData-uatp').getStore().getCount();
        if (Count === 0) {
            mensaje = 'INGRESAR DETALLE TARJETA UATP';
            return mensaje;
        }
        return mensaje;
    },
    get_ClearField: function () {
        //Initialize data INPUTS
        Ext.getCmp(prototype.id + '-A4241IDANT').setValue('0');
        Ext.getCmp(prototype.id + '-A4241CDCLI').setValue('');
        Ext.getCmp(prototype.id + '-A3953RSOCI').setValue('');
        Ext.getCmp(prototype.id + '-A4241FEC').setValue('');
        Ext.getCmp(prototype.id + '-A4241TOTAN').setValue(Ext.util.Format.number(0, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4241PORBF').setValue(Ext.util.Format.number(0, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4241TOTBF').setValue(Ext.util.Format.number(0, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4241TOT').setValue(Ext.util.Format.number(0, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4241MDA').setValue('');
        Ext.getCmp(prototype.id + '-A4241CONTR').setValue('');
        Ext.getCmp(prototype.id + '-A4241REF').setValue('');
        Ext.getCmp(prototype.id + '-A4241ORDN').setValue('');
        Ext.getCmp(prototype.id + '-A4241IDRCB').setValue('0');
        //saldos
        Ext.getCmp(prototype.id + '-A4242TOTAN').setValue(Ext.util.Format.number(0, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4242TOTBF').setValue(Ext.util.Format.number(0, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4242TOT').setValue(Ext.util.Format.number(0, '0,000.00'));

        Ext.getCmp(prototype.id + '-A4242VTAAN').setValue(Ext.util.Format.number(0, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4242VTABF').setValue(Ext.util.Format.number(0, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4242TOTAP').setValue(Ext.util.Format.number(0, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4242SALAN').setValue(Ext.util.Format.number(0, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4242SALBF').setValue(Ext.util.Format.number(0, '0,000.00'));
        Ext.getCmp(prototype.id + '-A4242SALDO').setValue(Ext.util.Format.number(0, '0,000.00'));
        //control data        
        Ext.getCmp(prototype.id + '-A4241USRIN').setValue('');
        Ext.getCmp(prototype.id + '-A4241FECIN').setValue('');
        Ext.getCmp(prototype.id + '-A4241HORIN').setValue('');
        Ext.getCmp(prototype.id + '-A4241USRAC').setValue('');
        Ext.getCmp(prototype.id + '-A4241FECAC').setValue('');
        Ext.getCmp(prototype.id + '-A4241HORAC').setValue('');
    },

    /*
     * lista UATP's
     */
    searchUATPCliente: function () {
        var bean = {};
        bean.VP_CDCLI = Ext.getCmp(prototype.id + '-A4241CDCLI').getValue();
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.CatalogoCliente.GridDataUatp', {
            proxy: {
                url: prototype.url + '/searchUATPCliente'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found uatp'
                        });
                    }
                    global.clear();
                }
            }
        });
        var panel = Ext.getCmp(prototype.id + '-contenedor-grid-uatp');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id + '-info-uatp',
            id: prototype.id + '-content-info-uatp'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData-uatp').setStore(storeGridDatas);
    },
    search_uatp: function () {
        var bean = {};
        bean.VP_IDANT = Ext.getCmp(prototype.id + '-A4241IDANT').getValue();
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.CatalogoCliente.GridDataUatp', {
            proxy: {
                url: prototype.url + '/searchDet'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found uatp'
                        });
                    }
                    global.clear();
                }
            }
        });
        var panel = Ext.getCmp(prototype.id + '-contenedor-grid-uatp');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id + '-info-uatp',
            id: prototype.id + '-content-info-uatp'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData-uatp').setStore(storeGridDatas);
    },

    onClickAdd_uatp: function () {
        var grid01 = Ext.getCmp(prototype.id + '-gridData-uatp');
//        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.CatalogoCliente.GridDataUatp',{});
//        grid01.setStore(storeGridDatas);        
        var beanGrid = {};
        //beanGrid.A4244CCUST = '139';
        //beanGrid.A4244CDCLI = '';
        beanGrid.A4244UATP = '';
        beanGrid.A4244TIPO = '';
        beanGrid.A4244ITEM = '0';
        //beanGrid.A4244MDA = '';
        //beanGrid.A4244VENTA = '0';
        grid01.getStore().add(beanGrid);

    },
    onClickRemove_uatp: function (grid, rowIndex, colIndex) {
        //var me = this;
        global.Msg({
            msg: 'Quitar registro?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    grid.getStore().removeAt(rowIndex);
                    //me.onSumaTaxGrid();
                }
            }
        });
    },
    onBuscarCliente: function () {
        var me = this;
        var bean = {};
        bean.VP_OPCION = "3";
        bean.VP_CDCLI = Ext.getCmp(prototype.id + '-A4241CDCLI').getValue();
        bean.VP_PARAM1 = "P";
        if (bean.VP_CDCLI === "") {
            global.Msg({msg: 'Ingrese Código de Cliente'});
            return;
        }
        Ext.Ajax.request({
            url: me.url01 + '/search',
            timeout: 60000000,
            method: 'POST',
            params: bean,
            beforerequest: Ext.getCmp(prototype.id + '-CatalogoContratosPreEntry').mask('Buscando cliente...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.id + '-CatalogoContratosPreEntry').unmask('Loading...', '');
                if (res.total === 0) {
                    Ext.getCmp(prototype.id + '-A4241CDCLI').setValue('');
                    Ext.getCmp(prototype.id + '-A3953RSOCI').setValue('');
                    global.Msg({
                        msg: 'No se econtro cliente'
                    });
                    return;
                }
                //console.log(res.data[0].A3953RSOCI);
                Ext.getCmp(prototype.id + '-A4241CDCLI').setValue(res.data[0].A3953CDCLI);
                Ext.getCmp(prototype.id + '-A3953RSOCI').setValue(res.data[0].A3953RSOCI);
                // me.searchUATPCliente(); REVISAR
            }
        });
    },
    /*
     * Upload file contrato 
     */
    onbtn_uploadClick: function () {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: '¿Cargar archivo seleccionado?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.getCmp(prototype.id + '-btn-upload').disable(true);
                    this.setuploadContrato();
                }
            }
        });
    },
    setuploadContrato: function () {
        var me = this;
        var file = Ext.getCmp(prototype.id + '-file').getValue();
        //console.log('file>' + file);
        if (file === '') {
            Ext.MessageBox.alert('PRAXIS', "Seleccionar archivo", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id + '-file').focus();", 100);
            });
            return;
        }
        var VL_OPCION = 'I';
//        if (Ext.getCmp(prototype.id + '-A3953LOGO').getValue().trim())
//            VP_ACTION = 'U';

        var lparams = {
            VP_ACTION: VL_OPCION,
            VP_A4549CDCLI: Ext.getCmp(prototype.id + '-A4241CDCLI').getValue(),
            VP_A4549IDANT: Ext.getCmp(prototype.id + '-A4241IDANT').getValue(),
            VP_A4549ITEM: 0,
            VP_A4549COMEN: '',
            VP_A4549NCONT: '',
            VP_A4549PATHF: ''
        };
        var form = Ext.getCmp(prototype.id + '-form01').getForm();
        form.submit({
            url: prototype.url + '/uploadContrato',
            waitMsg: 'Uploading your sure to upload the file...',
            params: {beanString: JSON.stringify(lparams)},
            success: function (fp, o) {
                var res = Ext.decode(o.response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id + '-btn-upload').enable(true);
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: 1,
                    fn: function () {
//                      Ext.getCmp(prototype.id + '-A3953LOGO_chk').setValue(true);
                        me.searchAttachFile();
                    }
                });
            },
            failure: function (response, opts) {
                console.log('server-side failure with status code ' + response.status);
            }
        });
    },    
    searchAttachFile: function () {
        var bean = {};
        bean.VP_IDANT = Ext.getCmp(prototype.id + '-A4241IDANT').getValue();
        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.CatalogoCliente.GridDataUatp', {
            proxy: {
                url: prototype.url + '/searchAttachFile'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(total);
                    // </editor-fold>
//                    if (obj.data.length === 0) {
//                        global.Msg({
//                            msg: 'Data not found'
//                        });
//                    }
                    global.clear();
                }
            }
        });         
        var panel = Ext.getCmp(prototype.id + '-contenedor-grid-doc-adjuntos');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id + '-info-adjuntos',
            id: prototype.id + '-content-info-adjuntos'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id + '-gridData-adjuntos').setStore(storeGridDatas);
    },
    btnPdf_click: function( obj, metaData, rowNum, columnNum, obj2, rowData ) {
        var params ={
            'PATHF': rowData.data.A4549PATHF.trim(),
            'fileName':rowData.data.A4549NCONT.trim()
        };  
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Pdf ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function(btn) {
                if (btn === 'ok') {
                    this.exportPdf(params);
                }
            }
        });
    },
    exportPdf: function(params) {
              
        var bean = {};
        bean.path = params.PATHF;
        bean.fileName = params.fileName;                
        bean.beanString = JSON.stringify(bean);
        global.getFile(prototype.url + '/donwloadFile?beanString=' +encodeURI(bean.beanString));                
        
    },
    OnEventbuscarCliente: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.onBuscarCliente();
        }
    },    
    PadLeft: function (number, width) {
        width -= number.toString().length;
        if (width > 0) {
            return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
        }
        return number + ""; // siempre devuelve tipo cadena
    },
    /*
     * 
     * @param {type} objGrid
     * @returns {Returns all phantom records in this store.}
     */
    getNewRecords: function (objGrid) {
        var newRecords = Ext.getCmp(objGrid).getStore().getNewRecords();
        return newRecords;
    },
    /*
     * @param {type} objGrid
     * @returns { Returns all valid, non-phantom Model instances that have been
     *  updated in the Store but not yet synchronized with the Proxy }
     */
    getModifiedRecords: function (objGrid) {
        var modified = Ext.getCmp(objGrid).getStore().getUpdatedRecords();
        //console.log(modified);        
        return modified;
    },
    /*
     * @param {type} objGrid
     * @returns {Returns any records that have been removed from the store but not yet destroyed on the proxy.}
     */
    getRemovedRecords: function (objGrid) {
        //var RemovedTrack = Ext.getCmp(prototype.id + '-gridData-uatp').getStore().getTrackRemoved(); //si existe REC removed R
        var Removed = Ext.getCmp(objGrid).getStore().getRemovedRecords();
        //console.log(Removed);
        return Removed;
    }
});



