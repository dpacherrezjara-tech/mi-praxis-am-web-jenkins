/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.VouchersIssuedVersusClaims.VouchersIssuedVersusClaimsCrudController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id01 + '-dataEntryController',
    url: CONTEXTPATH + '/VouchersIssuedVersusClaims',
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
        //SET store Grid edit        
        var grid01 = Ext.getCmp(prototype.id01 + '-gridData-TKT');
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {});
        grid01.setStore(storeGridDatas);
        
        this.get_ClearField();
        var p = this.view.params;
        switch (p.action) {
            case 'I':
                Ext.getCmp(prototype.id01 + '-btn-delete').hide();
                Ext.getCmp(prototype.id01 + '-btn-update').hide();
                Ext.getCmp(prototype.id01 + '-btn-save').show();

                //this.handlerEvent_setDisabled(true);
                Ext.getCmp(prototype.id01 + '-A4213TKTVO').focus();
                break;
            case 'U':
                this.getDataInputs();
                Ext.getCmp(prototype.id01 + '-btn-save').hide();
                Ext.getCmp(prototype.id01 + '-btn-update').show();
                //Ext.getCmp(prototype.id01 + '-btn-delete').show(); (no hay opcion de quitar cliente) ??
                //this.handlerEvent_setDisabled(false);
                break;
        }
    },
    handlerEvent_setDisabled: function (bflag) {
        //boton logo
        //Ext.getCmp(prototype.id01 + '-file').setDisabled(bflag);
        //Ext.getCmp(prototype.id01 + '-btn-upload').setDisabled(bflag);
    },
    getDataInputs: function () {
        var p = this.view.params;
        var data = p.rec.data;
        console.log(data);
        Ext.getCmp(prototype.id01 + '-A4213FECVT').setValue(data.A4213FECVT);
        Ext.getCmp(prototype.id01 + '-A4213TKTVO-CIA').setValue(data.A4213CIA);
        Ext.getCmp(prototype.id01 + '-A4213TKTVO').setValue(data.A4213FORMA+data.A4213SERIE);
        Ext.getCmp(prototype.id01 + '-A4213SEQVO').setValue(data.A4213SEQVO);
        
        Ext.getCmp(prototype.id01 + '-A4213AMOUN').setValue(Ext.util.Format.number(data.A4213AMOUN, '0,000.00'));
        Ext.getCmp(prototype.id01 + '-A4213MONED').setValue(data.A4213MONED);
        Ext.getCmp(prototype.id01 + '-A4213AGENT').setValue(data.A4213AGENT);
          
        Ext.getCmp(prototype.id01 + '-A4213USRIN').setValue(data.A4213USRIN);
        Ext.getCmp(prototype.id01 + '-A4213FECIN').setValue(data.A4213FECIN);
        Ext.getCmp(prototype.id01 + '-A4213HORIN').setValue(data.A4213HORIN);
        Ext.getCmp(prototype.id01 + '-A4213USRAC').setValue(data.A4213USRAC);
        Ext.getCmp(prototype.id01 + '-A4213FECAC').setValue(data.A4213FECAC);
        Ext.getCmp(prototype.id01 + '-A4213HORAC').setValue(data.A4213HORAC);        
        this.search_routing();

    },
    getDataEntryValues: function (strOption) {
        var VP_ACTION = strOption;
        var VL_A4069CIA = Ext.getCmp(prototype.id01 + '-A4213TKTVO-CIA').getValue();
        var VL_A4213TICKET = Ext.getCmp(prototype.id01 + '-A4213TKTVO').getValue();        
        var VL_A4213FORMA = VL_A4213TICKET.substring(0, 4);
        var VL_A4213SERIE = VL_A4213TICKET.substring(4, 10);
        var VL_A4213FECVT = Ext.util.Format.date(Ext.getCmp(prototype.id01 + '-A4213FECVT').getValue(), 'Ymd');        
        var VL_A4213SEQVO = Ext.getCmp(prototype.id01 + '-A4213SEQVO').getValue(); //en insert va vacio ...
        var VL_A4213MONED = Ext.getCmp(prototype.id01 + '-A4213MONED').getValue();
        var VL_A4213AMOUN = Ext.Number.parseFloat(Ext.getCmp(prototype.id01 + '-A4213AMOUN').getValue().replace(",", "").replace(",", ""));
        var VL_A4213AGENT = Ext.getCmp(prototype.id01 + '-A4213AGENT').getValue();
        var VL_A4213ITEMC = ""; //Ext.getCmp(prototype.id01 + '-A4213ITEMC').getValue() ;
        
        return {
            VP_ACTION: VP_ACTION,
            A4213CIA: VL_A4069CIA,
            A4213FORMA: VL_A4213FORMA,
            A4213SERIE: VL_A4213SERIE,
            A4213FECVT: VL_A4213FECVT,
            A4213SEQVO: VL_A4213SEQVO,
            A4213MONED: VL_A4213MONED,
            A4213AMOUN: VL_A4213AMOUN,
            A4213AGENT: VL_A4213AGENT,
            A4213ITEMC: VL_A4213ITEMC
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
        var bFlag = false;
        var lstrouting = new Array();
                    
        var RemovedRecords = this.getRemovedRecords(prototype.id01 + '-gridData-TKT');
        console.log('RemovedRecords:');
        console.log(RemovedRecords);        
        RemovedRecords.forEach(function (rec) {
            if (rec.data.A4213TICKET.trim() === '') bFlag = true;
            lstrouting.push({
                "crudState": "D", //rec.crudState,
                "A4213TICKET": rec.data.A4213TICKET,
                "A4213CUPON": rec.data.A4213CUPON,
                "A4213FEMIS": rec.data.A4213FEMIS,
                "A4213SEQV": rec.data.A4213SEQV,
                "A4213AMOTK": rec.data.A4213AMOTK,
                "A4213MDATK": rec.data.A4213MDATK,
                "A4213TARIF": rec.data.A4213TARIF,
                "A4213PAX": rec.data.A4213PAX,
                "A4213TDOC": rec.data.A4213TDOC,
                "A4213FLG": rec.data.A4213FLG,
                "A4213ITEMC": rec.data.A4213ITEMC
                // "A4069FVLO": Ext.util.Format.date(rec.data.A4069FVLO, 'Ymd')
            });
        });

        var NewRecords = this.getNewRecords(prototype.id01 + '-gridData-TKT');
        console.log('NewRecords:');
        console.log(NewRecords);
        NewRecords.forEach(function (rec) {
            if (rec.data.A4213TICKET.trim() === '') bFlag = true;
            lstrouting.push({
                "crudState": "I", //rec.crudState,
                "A4213TICKET": rec.data.A4213TICKET,
                "A4213CUPON": rec.data.A4213CUPON,
                "A4213FEMIS": rec.data.A4213FEMIS,
                "A4213SEQV": rec.data.A4213SEQV,
                "A4213AMOTK": rec.data.A4213AMOTK,
                "A4213MDATK": rec.data.A4213MDATK,
                "A4213TARIF": rec.data.A4213TARIF,
                "A4213PAX": rec.data.A4213PAX,
                "A4213TDOC": rec.data.A4213TDOC,
                "A4213FLG": rec.data.A4213FLG,
                "A4213ITEMC": rec.data.A4213ITEMC
            });
        });

        var ModifiedRecords = this.getModifiedRecords(prototype.id01 + '-gridData-TKT');
        console.log('UPDATE:');
        console.log(ModifiedRecords); 
        ModifiedRecords.forEach(function (rec) {
            if (rec.data.A4213TICKET.trim() === '') bFlag = true;
            lstrouting.push({
                "crudState": "U", //rec.crudState,
                "A4213TICKET": rec.data.A4213TICKET,
                "A4213CUPON": rec.data.A4213CUPON,
                "A4213FEMIS": rec.data.A4213FEMIS,
                "A4213SEQV": rec.data.A4213SEQV,
                "A4213AMOTK": rec.data.A4213AMOTK,
                "A4213MDATK": rec.data.A4213MDATK,
                "A4213TARIF": rec.data.A4213TARIF,
                "A4213PAX": rec.data.A4213PAX,
                "A4213TDOC": rec.data.A4213TDOC,
                "A4213FLG": rec.data.A4213FLG,
                "A4213ITEMC": rec.data.A4213ITEMC
            });
        });

        // valida registro UATP
        if (bFlag) {
            global.Msg({
                msg: 'Add Ticket/Ancillaries!'
            });
            return;
        }
        console.log( this.getDataEntryValues(strOption) );
        console.log('*******************');
        console.log(lstrouting);
        // <return;
        
        var me = this;
        Ext.Ajax.request({
            url: this.url + '/VouchersIssuedVersusClaimsCrud',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.getDataEntryValues(strOption)),
                VP_JSON_LIST_TICKET: JSON.stringify(lstrouting)
            },
            beforerequest: Ext.getCmp(prototype.id01 + '-VouchersIssuedVersusClaimsCrud').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
//                console.log(objRtn);
                Ext.getCmp(prototype.id01 + '-VouchersIssuedVersusClaimsCrud').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE,
                    fn: function () {
                        //culmino PROCESO
                        if (objRtn.dbException.SQLCODE !== '1')
                            return;
                        
                        //revisar...
                        //Ext.getCmp(prototype.id01 + '-INTERNAL-NUMBER').setValue(objRtn.OU_INTERNAL_NUMBER);
                        //me.search_routing(); //cagar desde la base de datos para generar STORE.
                        
                        me.handlerEvent_setDisabled(false);
                        //PARA ACTUALIZAR DESPUES DE INSERTAR
//                        if (strOption === "I") {
//                            Ext.getCmp(prototype.id01 + '-btn-save').hide();
//                            Ext.getCmp(prototype.id01 + '-btn-update').show();
//                            me.view.params.action = "U";
//                        }

                        me.onCancelClick();
                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
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
        Ext.getCmp(prototype.id01 + '-VouchersIssuedVersusClaimsCrud').close();
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onFocusNumberfield: function (obj, error, eOpts) {
        obj.selectText();
    },
    onfocusleaveNumberfield: function (obj, error, eOpts) {
        obj.setValue(Ext.util.Format.number(Ext.Number.parseFloat(obj.getValue()), '0,000.00'));
        //console.log(obj.id); //"RegistroVentaOALCrud-A4069FARE"
        
//        if (obj.id === prototype.id01 + '-A4069FARE' || obj.id === prototype.id01 + '-A4069IVAP')
//        this.calcular_iva();
//        this.calcula_total();

    },
//    calcular_iva:function(){
//        var fare =  Ext.Number.parseFloat( Ext.getCmp(prototype.id01 + '-A4069FARE').getValue().replace(",", "").replace(",", "") );
//        var piva = Ext.Number.parseFloat( Ext.getCmp(prototype.id01 + '-A4069IVAP').getValue().replace("%","") );        
//        var iva = fare * piva / 100;
//        Ext.getCmp(prototype.id01 + '-A4069IVA').setValue( Ext.util.Format.number(iva, '0,000.00') );
//    },
//    calcula_total:function(){
//        var fare =  Ext.Number.parseFloat( Ext.getCmp(prototype.id01 + '-A4069FARE').getValue().replace(",", "").replace(",", "") );
//        var iva =  Ext.Number.parseFloat( Ext.getCmp(prototype.id01 + '-A4069IVA').getValue().replace(",", "").replace(",", "") );
//        var tua =  Ext.Number.parseFloat( Ext.getCmp(prototype.id01 + '-A4069TUA').getValue().replace(",", "").replace(",", "") );
//        var yq =  Ext.Number.parseFloat( Ext.getCmp(prototype.id01 + '-A4069YQ').getValue().replace(",", "").replace(",", "") );
//        var yr =  Ext.Number.parseFloat( Ext.getCmp(prototype.id01 + '-A4069YR').getValue().replace(",", "").replace(",", "") );
//        var otr =  Ext.Number.parseFloat( Ext.getCmp(prototype.id01 + '-A4069OTR').getValue().replace(",", "").replace(",", "") );
//        var total = (fare+iva+tua+yq+yr+otr);
//        Ext.getCmp(prototype.id01 + '-A4069TOTAL').setValue( Ext.util.Format.number(total, '0,000.00') );
//    },
    IsNumeric: function (input) {
        var RE = /^-{0,1}\d*\.{0,1}\d+$/;
        return (RE.test(input));
    },
    fn_completar_cia: function (obj, error, eOpts) {
        var vl_cia = obj.getValue().substring(0, 3);
        if (this.IsNumeric(vl_cia))
            Ext.getCmp(prototype.id01 + '-A4069CIA').setValue(vl_cia);
    },
    validateForm: function (params) {
//        console.log(params);
        var mensaje = "";
        if (params.A4069TKTOR === '') {
            mensaje = 'INGRESE TICKET NUMBER';
            Ext.getCmp(prototype.id01 + '-A4069TKTOR').focus();
            return mensaje;
        }
        if (params.A4069CIA === '') {
            mensaje = 'INGRESE AIRLINE CODE';
            Ext.getCmp(prototype.id01 + '-A4069CIA').focus();
            return mensaje;
        }
        if (params.A4069FEVTA === '') {
            mensaje = 'INGRESE FECHA DE VENTA';
            Ext.getCmp(prototype.id01 + '-A4069FEVTA').focus();
            return mensaje;
        }
        if (params.A4069PAX === '' || params.A4069PAX === null) {
            mensaje = 'INGRESE NOMBRE PAX';
            Ext.getCmp(prototype.id01 + '-A4069PAX1').focus();
            return mensaje;
        }
        return mensaje;
    },
    get_ClearField: function () {
        //Initialize data INPUTS
//        Ext.getCmp(prototype.id01 + '-A3953CDCLI').setValue('');
//        Ext.getCmp(prototype.id01 + '-A3953RSOCI').setValue('');
//        Ext.getCmp(prototype.id01 + '-A3953NCOME').setValue('');
//        Ext.getCmp(prototype.id01 + '-A3953RFC').setValue('');
//        Ext.getCmp(prototype.id01 + '-A3953DIRE1').setValue('');      
    },

    /*
     * lista ROUTING
     */
    search_routing: function () {
        
        var bean = {};
        var VP_ticket_voucher = Ext.getCmp(prototype.id01 + '-A4213TKTVO').getValue();
        bean.VP_A4213CIA = Ext.getCmp(prototype.id01 + '-A4213TKTVO-CIA').getValue();
        bean.VP_A4213FORMA = VP_ticket_voucher.substring(0, 4);
        bean.VP_A4213SERIE = VP_ticket_voucher.substring(4, 10);
        bean.VP_A4213SEQVO = Ext.getCmp(prototype.id01 + '-A4213SEQVO').getValue();;

        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.GridData', {
            proxy: {
                url: prototype.url + '/search_tkt_saved'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, obj2, success, obj4, obj5) {
                    //win.lblUser_toolTip("Estructura: A3009");
                    // <editor-fold defaultstate="collapsed" desc="paggin">
//                    var pag = Ext.getCmp(prototype.id01 + '-paggin');
//                    var pagData = pag.getPageData();
//                    var currentPage = Ext.util.Format.number(pagData.currentPage, '0,000');
//                    var pageCount = Ext.util.Format.number(pagData.pageCount, '0,000');
//                    var total = Ext.util.Format.number(pagData.total, '0,000');
//                    Ext.getCmp(prototype.id01 + '-lbl-currentPage').setText(currentPage);
//                    Ext.getCmp(prototype.id01 + '-lbl-pageCount').setText(pageCount);
//                    Ext.getCmp(prototype.id01 + '-lbl-total').setText(total);
                    // </editor-fold>
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found '
                        });
                    }
                    global.clear();
                }
            }
        });      
        Ext.getCmp(prototype.id01 + '-gridData-TKT').setStore(storeGridDatas);        
    },

    get_ticket_ancillarie: async function (in_param) {
        
        var request = await Ext.Ajax.request({
            url: this.url + '/search_tkt',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getCmp(prototype.id01 + '-VouchersIssuedVersusClaimsCrud').mask('Loading...', ''),
            params: {
                VP_A720CIA: in_param.A720CIA,
                VP_A720FORMA: in_param.A720FORMA,
                VP_A720SERIE: in_param.A720SERIE,
                VP_A720FECVTA: in_param.A720FECVTA,
                VP_A720CUPONES: in_param.A720CUPONES
            },
            success: function (response, options) {
                Ext.getCmp(prototype.id01 + '-VouchersIssuedVersusClaimsCrud').unmask('Loading...', '');
                //var res = Ext.JSON.decode(response.responseText);               
            }
        });
        //console.log(request.responseText);
        return Ext.JSON.decode(request.responseText);

    },

    onClickAdd: async function () {
        
        var VL_A4213TICKET_CIA = Ext.getCmp(prototype.id01 + '-A4213TICKET-CIA').getValue();
        var VL_A4213TICKET = Ext.getCmp(prototype.id01 + '-A4213TICKET').getValue();
        var VL_A4213CUPON = Ext.getCmp(prototype.id01 + '-A4213CUPON').getValue();
        //var VL_A4213FEMIS = Ext.getCmp(prototype.id01 + '-A4213FEMIS').getValue();
        var VL_A4213FEMIS = Ext.util.Format.date(Ext.getCmp(prototype.id01 + '-A4213FEMIS').getValue(), 'Ymd');
        var me = this;
        var param = [];
        
        param.A720CIA = VL_A4213TICKET_CIA; //1392140123456 
        param.A720FORMA = VL_A4213TICKET.substring(0,4);
        param.A720SERIE = VL_A4213TICKET.substring(4,10);
        param.A720FECVTA = VL_A4213FEMIS;
        param.A720CUPONES = VL_A4213CUPON;
        
        if (VL_A4213TICKET_CIA.length === 0 || VL_A4213TICKET_CIA.length !== 3  ){
            global.Msg({msg: "Invalid Cia number" });
            return;
        }        
        if (VL_A4213TICKET.length === 0 || VL_A4213TICKET.length !== 10  ){
            global.Msg({msg: "Invalid ticket number" });
            return;
        }
        if (VL_A4213CUPON.length === 0 ){
            global.Msg({msg: "Invalid coupons" });
            return;
        }
        
        if (VL_A4213FEMIS.length === 0 ){
            global.Msg({msg: "Invalid issue date" });
            return;
        }
        
        var idx = VL_A4213CUPON.indexOf(",");
        //console.log(idx);
        if( idx === -1  && VL_A4213CUPON.length > 1 ){
            global.Msg({msg: "Coupon values must be separated by a comma(,)"});
            return;
        }
        
        
        var resp = await me.get_ticket_ancillarie(param);
        console.log(resp);        
        if ((resp.success) && resp.total > 0 ){
            var grid01 = Ext.getCmp(prototype.id01 + '-gridData-TKT');
            var beanGrid = {};
            beanGrid.A4213TICKET = VL_A4213TICKET_CIA +''+ VL_A4213TICKET;
            beanGrid.A4213CUPON = VL_A4213CUPON;
            beanGrid.A4213FEMIS = resp.data[0].A720FECVTA;
            beanGrid.A4213SEQV = resp.data[0].A720SEQ;
            beanGrid.A4213AMOTK = '0';
            beanGrid.A4213MDATK = resp.data[0].A720MONEDA;
            beanGrid.A4213TARIF = resp.data[0].A720TARIFA;
            beanGrid.A4213PAX = resp.data[0].A720PAX;
            beanGrid.A4213TDOC = resp.data[0].A720TDOC;
            beanGrid.A4213FLG = resp.data[0].A720FLAG;
            beanGrid.A4213ITEMC = resp.data[0].A4213ITEMC;
            grid01.getStore().add(beanGrid);
        }else{
            if(resp.total===0){
                global.Msg({msg:'Ticket number not found' });
            }else{
                global.Msg({msg: resp.sesion});
            }
            
        }
        

    },
    onClickRemove: function (grid, rowIndex, colIndex) {
        //var me = this;
        global.Msg({
            msg: '¿Quitar registro?',
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
    getAllRecords: function (objGrid) {
        var allRecords = Ext.getCmp(objGrid).getStore();
        return allRecords;
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
        //var RemovedTrack = Ext.getCmp(prototype.id01 + '-gridData-uatp').getStore().getTrackRemoved(); //si existe REC removed R
        var Removed = Ext.getCmp(objGrid).getStore().getRemovedRecords();
        //console.log(Removed);
        return Removed;
    }
});



