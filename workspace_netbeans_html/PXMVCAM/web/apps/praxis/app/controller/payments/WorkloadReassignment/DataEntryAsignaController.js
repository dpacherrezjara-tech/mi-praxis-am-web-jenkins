/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.payments.WorkloadReassignment.DataEntryAsignaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAsignaController',
    beanTMP: {},
    beanGuardar: {},
    beanGrid: [],
    urlWin01: CONTEXTPATH + '/WorkloadReassignment',
    init: function (view) {
        var me = this;
        //console.log(this.view.params);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        this.setStoresGrid();
    },
    setStoresGrid: function () {
        var me = this;
        var grid = Ext.getCmp(prototype.id + 'gridCarga');
        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchReportADM/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            pageSize: 25
        });
        grid.setStore(store01);
        //
        var comboAuditor = Ext.getCmp(prototype.id + '-txtNewAuditor');
        var storeAuditor = Ext.create('Ext.data.Store', {
            fields: ['A4836USER'],
            data: me.view.params.beanUser
        });
        comboAuditor.setStore(storeAuditor);
        Ext.getCmp(prototype.id + '-txtNewAuditor').setValue('ALL');

        me.OnRendererPendinte();

    },
    OnRendererPendinte: function () {

        // Vista actual (DataEntryAsigna window)
        var view = this.getView();
        if (!view)
            return;

        // Grid origen de los pendientes (otra vista)
        var grid03 = Ext.getCmp(prototype.id + '-gridDETALLE');
        if (!grid03)
            return;

        var store = grid03.getStore();
        if (!store)
            return;

        // Calcular total de pendientes
        var totalPending = 0;
        store.each(function (rec) {
            totalPending += rec.get('PEDIEN') || 0;
        });

        // Iconos y colores UX (usuario final)
        var icon = totalPending > 0
                ? 'fa-triangle-exclamation'   // ⚠️ Atención
                : 'fa-circle-check';          // ✅ Todo OK

        var color = totalPending > 0 ? '#f39c12' : '#2ecc71';

        // Caso especial: carga alta
        if (totalPending > 50) {
            icon = 'fa-fire';            // 🔥 Alta carga
            color = '#c0392b';
        }

        // Label dentro de la ventana
        var lbl = view.down('#lblPendientes');
        if (!lbl)
            return;

        // Render final
        lbl.setHtml(
                '<i class="x-fa ' + icon + '" style="color:' + color + '; font-size:16px;"></i> ' +
                '<b>Pendientes:</b> ' + totalPending
                );
    },
    OnRendererColumnDescription: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return value;
    },
    OnChkRFNDIsDisabled: function (view, rowindex, colIndex, item, record) {
        var status = false;
        if (record.get('A2560CODRZ') === '') {
            status = true;
        }
        return status;
    },
    onCloseClick: function (btn) {
        this.view.close();
    },
    onClickAdd: function (btn) {
        var auditor = Ext.getCmp(prototype.id + '-txtNewAuditor').getValue();
        var txtcantid = Ext.getCmp(prototype.id + '-txtcantid').getValue();
        var lblPendientes = Ext.getCmp(prototype.id + '-txtlblPendientes');
        var html = lblPendientes.getEl().dom.innerText || '';
        var total = parseInt(html.replace(/\D/g, ''), 10) || 0;

        if (total === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'El monto de los pendientes tiene que se mayor a Cero !');
            return;
        }
        if (txtcantid > total) {
            Ext.Msg.alert('.: PRAXIS :.', 'La cantidad Asignar no puede ser mayor a los pendintes !');
            return;
        }

        if (auditor === 'ALL') {
            Ext.Msg.alert('.: PRAXIS :.', 'Debe de seleccionar un auditor !');
            return;
        }
        var gridCarga = Ext.getCmp(prototype.id + 'gridCarga');
        var regs = gridCarga.getStore().getCount();
        var beanDatos = {};
        for (var i = 0; i < regs; i++) { // 'PROCE',AUASI
            if (gridCarga.getStore().getAt(i).get('AUASI') === auditor) {
                global.Msg({msg: "Ya existe el Auditor Asignado !", icon: 2, fn: function () {
                    }});
                return;
            }
        }
        beanDatos.AUASI = auditor;
        beanDatos.PROCE = txtcantid;
        gridCarga.getStore().add(beanDatos);
        this.updateOnRendererDescontar(-txtcantid);
    },
    updateOnRendererDescontar: function (cantidad) {
        var lblPendientes = Ext.getCmp(prototype.id + '-txtlblPendientes');
        var html = lblPendientes.getEl().dom.innerText || '';
        var total = parseInt(html.replace(/\D/g, ''), 10) || 0;
        var view = this.getView();
        if (!view)
            return;

        var lbl = view.down('#lblPendientes');
        if (!lbl)
            return;

        // Asegurar número
        cantidad = parseInt(cantidad, 10) || 0;

        // Ajustar total
        view.totalPending = (total + cantidad);

        // No permitir negativos
        if (view.totalPending < 0) {
            view.totalPending = 0;
        }

        var totalPending = view.totalPending;

        // UX: iconos y colores
        var icon = totalPending > 0
                ? 'fa-triangle-exclamation'
                : 'fa-circle-check';

        var color = totalPending > 0 ? '#f39c12' : '#2ecc71';

        if (totalPending > 50) {
            icon = 'fa-fire';
            color = '#c0392b';
        }

        // Render final
        lbl.update(
                '<i class="x-fa ' + icon + '" style="color:' + color + '; font-size:16px;"></i> ' +
                '<b>Pendientes:</b> ' + totalPending
                );
    },
    OnAsignaRemove: function (grid, rowIndex, colIndex) {
        var me = this;

        var store = grid.getStore();
        var record = store.getAt(rowIndex);

        // 👉 AQUÍ obtienes PROCE
        var proce = record.get('PROCE');

        global.Msg({
            msg: '¿Eliminar la Asignación?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    store.remove(record);

                    // Ejemplo: usar PROCE después de eliminar
                    me.updateOnRendererDescontar(proce);
                }
            }
        });
    },
    onSaveClick: function (obj) {
        var me = this;
        var lstCarga = new Array();
        var gridcarga = Ext.getCmp(prototype.id + 'gridCarga');
        gridcarga.store.data.each(function (rec) {
            lstCarga.push({"AUASI": rec.data.AUASI, "PROCE": rec.data.PROCE});
        });
        //
        me.beanGuardar.PROCTYPE1 = me.view.params.PROCTYPE1;
        me.beanGuardar.PROCTYPESQ1 = me.view.params.PROCTYPESQ1;
        me.beanGuardar.PRDA1 = me.view.params.PRDA1;
        //
        global.Msg({
            msg: 'Are you sure Data ?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.id + '-DataEntryAsigna'), {
                        msg: 'Please Wait....'
                    });
                    mask.show();
                    Ext.Ajax.request({
                        url: me.urlWin01 + '/ProcesaAsignacion/',
                        timeout: 60000000,
                        method: 'POST',
                        params:
                                {
                                    beanString: JSON.stringify(me.beanGuardar),
                                    beanlstCarga: JSON.stringify(lstCarga)
                                },
                        success: function (response, options) {
                            mask.hide();
                            var res = Ext.JSON.decode(response.responseText);
                            //console.log(res.data);
                            var vp_icon = 0;
                            if (res.data === 'RECORD INSERTED') {
                                vp_icon = 1;
                            }
                            global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                    if (vp_icon === 1) {
                                        Ext.getCmp(prototype.id + '-Contenedor').getController().OnDetail02();
                                        Ext.getCmp(prototype.id + '-DataEntryAsigna').close();
                                    }


                                }});
                        }
                    });
                }
            }
        });

    }



});