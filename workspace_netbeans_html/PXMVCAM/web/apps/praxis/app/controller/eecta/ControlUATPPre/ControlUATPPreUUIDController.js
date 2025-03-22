/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.eecta.ControlUATPPre.ControlUATPPreUUIDController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id03 + '-controlUATPPreUUIDController',
    url: CONTEXTPATH + '/ControlUATPPre',
    requires: [
        'Ext.Praxis.view.eecta.ControlUATPPreForm.Info02'
    ],
    bean: {},
    recGrid01: {},
    init: function (view) {
        var me = this;
    },
    afterRender: function () {
        if (Ext.getCmp(prototype.id + '-FCONT').getValue() != '') {
            Ext.getCmp(prototype.id03 + '-FECHA1').setValue(Ext.getCmp(prototype.id + '-FCONT').getValue());
            Ext.getCmp(prototype.id03 + '-FECHA2').setValue(Ext.getCmp(prototype.id + '-FCONT').getValue());
        }
        this.Onsearch();
    },
    handlerEvent_setDisabled: function () {

    },
    getDataInputs: function () {

    },
    cmbfiltroSTSUUID_clickHandler: function () {
        this.Onsearch();
    },
    getDataEntryValues: function (strOption) {

        var VL_ACTION = strOption;
        var VL_FECHA1 = Ext.util.Format.date(Ext.getCmp(prototype.id03 + '-FECHA1').getValue(), 'Ymd');
        var VL_FECHA2 = Ext.util.Format.date(Ext.getCmp(prototype.id03 + '-FECHA2').getValue(), 'Ymd');
        return {
            VP_ACTION: VL_ACTION,
            VP_FDATE1: VL_FECHA1,
            VP_FDATE2: VL_FECHA2
        };
    },
    getDataParamFE: function (strOption) {
        //var VL_ACTION = strOption;  
        var VL_FECHA1 = Ext.util.Format.date(Ext.getCmp(prototype.id03 + '-FECHA1').getValue(), 'Ymd');
        var VL_FECHA2 = Ext.util.Format.date(Ext.getCmp(prototype.id03 + '-FECHA2').getValue(), 'Ymd');
        return {
            //VP_ACTION:VL_ACTION,
            vp_fdesde: VL_FECHA1,
            vp_fhasta: VL_FECHA2,
            vp_cdcli: ''
        };
    },
    Onsearch: function () {
        this.search00();
    },
    //CAB
    search00: function ()
    {
        Ext.getCmp(prototype.id03 + '-form01').show();
        Ext.getCmp(prototype.id03 + '-form02').hide();
        me = this;
        var bean = {};
        var VL_OPCION = '';
        var VL_FDATE1 = Ext.util.Format.date(Ext.getCmp(prototype.id03 + '-FECHA1').getValue(), 'Ymd');
        var VL_FDATE2 = Ext.util.Format.date(Ext.getCmp(prototype.id03 + '-FECHA2').getValue(), 'Ymd');
        var VL_STAT = Ext.getCmp(prototype.id03 + '-STSUUID').getValue();
        var VL_TICKET = ""; //Ext.util.Format.date(Ext.getCmp(prototype.id03 + '-FECHA2').getValue(), 'Ymd');
        bean.VP_OPCION = VL_OPCION;
        bean.VP_FDATE1 = VL_FDATE1;
        bean.VP_FDATE2 = VL_FDATE2;
        bean.VP_LOTE = "";
        bean.VP_STAT = VL_STAT;
        bean.VP_TICKET = VL_TICKET;
        bean.VP_CDCLI = "";
        bean.limit = "-1";
        bean.page = "-1";

        if (VL_FDATE1 === '' || VL_FDATE2 === '') {
//            console.log('return fecha null');
            return;
        }
        ;

        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.GridData', {
            proxy: {
                url: prototype.url + '/search_fac_cab'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, records, successful, operation, eOpts) {
                    //console.log(records);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
//        Ext.getCmp(prototype.id05 + '-gridData').setStore(storeGridDatas);
//        Ext.getCmp(prototype.id05 + '-paggin').setStore(storeGridDatas);
        var panel = Ext.getCmp(prototype.id03 + '-panel-contenedor-grid');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id05 + '-info04',
            id: prototype.id05 + '-contentInfo4'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id05 + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id05 + '-paggin').bindStore(storeGridDatas);
    },
    //DETALLE
    onDetailClick04: function (grid, rowIndex, colIndex)
    {
        me = this;
        var bean = {};
        Ext.getCmp(prototype.id03 + '-form01').hide();
        Ext.getCmp(prototype.id03 + '-form02').show();
        //console.log('grid: '||grid ||' rowIndex:' || rowIndex );

        if (Ext.getCmp(prototype.id05 + '-gridData')) {
            var grid = Ext.getCmp(prototype.id05 + '-gridData');
            var store = grid.getStore();
            var rec = store.getAt(rowIndex);
            this.recGrid01 = rec;
        }
        var VL_OPCION = '';
        var VL_FDATE1 = this.recGrid01.get('A4516FPROC');
        var VL_FDATE2 = this.recGrid01.get('A4516FPROC');
        var VL_STAT = "";
        var VL_TICKET = "";
        var VL_CDCLI = this.recGrid01.get('A4516CDCLI');
        var VL_NLOTE = this.recGrid01.get('A4516NLOTE');

        bean.VP_OPCION = VL_OPCION;
        bean.VP_FDATE1 = VL_FDATE1;
        bean.VP_FDATE2 = VL_FDATE2;
        bean.VP_STAT = VL_STAT;
        bean.VP_TICKET = VL_TICKET;
        bean.VP_CDCLI = VL_CDCLI;
        bean.VP_NLOTE = VL_NLOTE;
        bean.limit = "-1";
        bean.page = "-1";

        var storeGridDatas = Ext.create('Ext.Praxis.store.eecta.GridData', {
            proxy: {
                url: prototype.url + '/search_UUID'
            },
            listeners: {
                beforeload: function (obj) {
                    obj.proxy.extraParams = bean;
                },
                load: function (obj, records, successful, operation, eOpts) {
                    //console.log(records);
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found'
                        });
                    }
                    global.clear();
                }
            }
        });
        var panel = Ext.getCmp(prototype.id03 + '-panel-contenedor-grid');
        panel.removeAll();
        var gridPanel = Ext.create({
            region: 'center',
            xtype: prototype.id03 + '-info02',
            id: prototype.id03 + '-contentInfo2'
        });
        panel.add(gridPanel);
        Ext.getCmp(prototype.id03 + '-gridData').setStore(storeGridDatas);
        Ext.getCmp(prototype.id03 + '-paggin').bindStore(storeGridDatas);

    },
    onSaveClick: function (btn) {
        var p = this.view.params;
        var strOption = p.action;
        var params = this.getDataEntryValues(strOption);
        var strMsg = this.validateForm(params);
        var StrMsgConfirm = '¿Descargar datos facturación?';

        if (strMsg.trim() !== '') {
            global.Msg({
                msg: strMsg
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: StrMsgConfirm,
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
        var me = this;
        var params = this.getDataEntryValues(strOption);
        Ext.Ajax.request({
            url: this.url + '/set_procesarUUID',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(params)
            },
            beforerequest: Ext.getCmp(prototype.id03 + '-ControlUATPPreUUIDForm').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id03 + '-ControlUATPPreUUIDForm').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: 1,
                    fn: function () {
                        //culmino PROCESO                           
                        //Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});   
                        //var elem = document.getElementById('ControlUATPProcesarForm_Msg');
                        //elem.innerHTML = objRtn.dbException.MESSAGE;                        
                        //me.onCancelClick();   

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
    onSaveFacturacionClick: function (btn) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: '¿Seguro de procesar la facturacion?',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.view.params.action = "I";
                    this.set_procesarFE();
                }
            }
        });
    },
    set_procesarFE: function () {
        var p = this.view.params;
        var strOption = p.action;
        var me = this;
        var params = this.getDataParamFE(strOption);
        Ext.Ajax.request({
            url: this.url + '/set_procesarFE',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(params)
            },
            beforerequest: Ext.getCmp(prototype.id03 + '-ControlUATPPreUUIDForm').mask('Loading...', ''),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id03 + '-ControlUATPPreUUIDForm').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE,
                    fn: function () {
                        //culmino PROCESO                                               
                        me.search();
                    }
                });
            }
        });

    },
    onCancelClick: function (btn) {
        Ext.getCmp(prototype.id03 + '-ControlUATPPreUUIDForm').close();
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onFocusNumberfield: function (obj, error, eOpts) {
        obj.selectText();
    },
    onfocusleaveNumberfield: function (obj, error, eOpts) {
        var val = obj.getValue().replace(",", "").replace(",", "");
        obj.setValue(Ext.util.Format.number(val, '0,000.00'));

    },
    validateForm: function (params) {
        var mensaje = "";
        if (params.VP_FDATE1 === '' || params.VP_FDATE2 === '') {
            mensaje = 'INGRESAR RANGO DE FECHAS ';
            Ext.getCmp(prototype.id03 + '-FECHA1').focus();
            return mensaje;
        }
        return mensaje;
    },
    set_ClearField: function () {
        //Initialize data INPUTS
        //Ext.getCmp(prototype.id + '-A3953CDCLI').setValue('');        
    },
    onTxtFilterKeypress03: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.search_det_loadbatch();
        }
    },
    onPreDonwloadDocumentPDFClick: function (grid, rowIndex, colIndex)
    {
        //console.log(vp_document_id); 
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var document_path = rec.get('A4250PPDF');
        if (document_path === '') {
            global.Msg({msg: 'El documento no esta facturado'});
            return;
        }
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: '¿Descargar factura?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(prototype.url + '/getPreDonwloadInvoice?document_path=' + document_path);
                }
            }
        });
    },
    onPreDonwloadDocumentXMLClick: function (grid, rowIndex, colIndex)
    {
        //console.log(vp_document_id); 
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var document_path = rec.get('A4250PXML');
        if (document_path === '') {
            global.Msg({msg: 'El documento no esta facturado'});
            return;
        }
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: '¿Descargar archivo XML ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(prototype.url + '/getPreDonwloadInvoice?document_path=' + document_path);
                }
            }
        });
    },

    OnEnviarForm: function () {
        var grid = Ext.getCmp(prototype.id03 + '-gridData');
        // Obtener el modelo de seleccion
        var selectionModel = grid.getSelectionModel();
        // Obtener los registros seleccionados
        var selectedRecords = selectionModel.getSelection();
        // console.log(selectedRecords);
        if (selectedRecords.length > 0) {
            this.winDataEntry('E', selectedRecords);
        } else {
            global.Msg({
                msg: 'Seleccionar registros!'
            });
        }
    },
    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.eecta.ControlUATPPreForm.ControlUATPPreEnviarForm', {
            id: prototype.id06 + '-ControlUATPPreEnviarForm',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    }
});



