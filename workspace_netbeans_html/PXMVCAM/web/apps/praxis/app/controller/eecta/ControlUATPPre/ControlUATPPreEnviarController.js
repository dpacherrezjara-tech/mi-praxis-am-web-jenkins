
Ext.define('Ext.Praxis.controller.eecta.ControlUATPPre.ControlUATPPreEnviarController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.' + prototype.id06 + '-controlUATPPreEnviarController',
    url: CONTEXTPATH + '/ControlUATPPre',
    bean: {},
    afterRender: function () {
        this.loadGridData();
    },
    loadGridData: function () {
//        console.log(this.view.params.rec);
        Ext.getCmp(prototype.id06 + '-gridData').getStore().removeAll();
        var selectedRecords = this.view.params.rec;
        var grid = Ext.getCmp(prototype.id06 + '-gridData');
        var store = grid.getStore();
//        console.log(store);
        // Agregar los registros seleccionados al store del segundo grid
        store.add(selectedRecords);

        // Escribir datos de cabecera
        if (selectedRecords.length > 0) {
            Ext.getCmp(prototype.id06 + '-IdCliente').setValue(selectedRecords[0].data.A4250CDCLI);
            Ext.getCmp(prototype.id06 + '-NombreCliente').setValue(selectedRecords[0].data.RSOCI);
            Ext.getCmp(prototype.id06 + '-Email').setValue(selectedRecords[0].data.REFER);
        } else {
            Ext.getCmp(prototype.id06 + '-IdCliente').setValue('');
            Ext.getCmp(prototype.id06 + '-NombreCliente').setValue('');
            Ext.getCmp(prototype.id06 + '-Email').setValue('');
            Ext.getCmp(prototype.id06 + '-gridData').getStore().removeAll();
        }
    },
    onClickRemove_uuid: function (grid, rowIndex) {
        Ext.Msg.confirm('Confirmación', '¿Quitar registro?', function (btn) {
            if (btn === 'yes') {
                let store = grid.getStore();
                if (store) {
                    let record = store.getAt(rowIndex);
                    if (record) {
                        store.remove(record); // Eliminar el registro
                        // Verificar si el grid tiene un método refresh()
                        if (typeof grid.refresh === 'function') {
                            grid.refresh(); // Si el grid tiene refresh()
                        } else if (typeof grid.getView === 'function') {
                            grid.getView().refresh(); // Método alternativo
                        } else {
                            store.loadData(store.getRange()); // Recarga el store como fallback
                        }
                    }
                }
            }
        });
    },
    onSaveClick: function () {
        var grid = Ext.getCmp(prototype.id06 + '-gridData');
        var store = grid.getStore();
        //console.log(store.data.items);
        if (store.data.items.length <= 0) {
            global.Msg({
                msg: "No hay documentos seleccionados"
            });
            return;
        };

        var StrMsg = '¿Enviar los documentos seleccionados?';
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: StrMsg,
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'yes') {
                    this.send();
                }
            }
        });
    },
    getDataEntryValues: function () {
        return {
            VP_CCUST: "",
            VP_EMAILS: Ext.getCmp(prototype.id06 + '-Email').getValue()
        };
    },
    send: function () {
        var p = this.view.params;
        var grid = Ext.getCmp(prototype.id06 + '-gridData');
        var store = grid.getStore();
        // Extraer solo los datos de los registros, sin incluir metadatos innecesarios
        var data = store.getRange().map(record => record.getData());
//        console.log(JSON.stringify(data)); 
        Ext.Ajax.request({
            url: this.url + '/setSendMail',
            method: 'POST',
            timeout: 60000000,
            params: {
                beanString: JSON.stringify(this.getDataEntryValues()),
                data: JSON.stringify(data)
            },
            beforerequest: Ext.getCmp(prototype.id06 + '-ControlUATPPreEnviarForm').mask('Loading...', ''),
            success: function (response) {
                var res = Ext.JSON.decode(response.responseText);
                var objRtn = res.objRtn;
                Ext.getCmp(prototype.id06 + '-ControlUATPPreEnviarForm').unmask('Loading...', '');
                global.Msg({
                    msg: objRtn.dbException.MESSAGE,
                    icon: objRtn.dbException.SQLCODE,
                    fn: function () {
                        // Culmino PROCESO, cierra la ventana 
                        Ext.getCmp(prototype.id06 + '-ControlUATPPreEnviarForm').close();
                        Ext.getCmp(prototype.id03 + '-ControlUATPPreUUIDForm').close();
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
        Ext.getCmp(prototype.id06 + '-ControlUATPPreEnviarForm').close();
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
        if (params.VP_PROCESO === 'UATP') {
            if (params.VP_FDATE1 === '')
                mensaje = 'INGRESAR RANGO DE FECHAS ';
            Ext.getCmp(prototype.id06 + '-FECHA1').focus();
            return mensaje;
        }
        if (params.VP_PROCESO === 'REPT') {
            if (params.VP_FEJEC === '')
                mensaje = 'INGRESAR FECHA DE EMISION ';
            Ext.getCmp(prototype.id06 + '-FECHEJE01').focus();
            return mensaje;
        }
        if (params.VP_PROCESO === 'EECC') {
            if (params.VP_FEJEC === '')
                mensaje = 'INGRESAR FECHA DE EMISION ';
            Ext.getCmp(prototype.id06 + '-FECHEJE02').focus();
            return mensaje;
        }
        return mensaje;
    },
    onTxtFilterKeypress03: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.search_det_loadbatch();
        }
    }
});

