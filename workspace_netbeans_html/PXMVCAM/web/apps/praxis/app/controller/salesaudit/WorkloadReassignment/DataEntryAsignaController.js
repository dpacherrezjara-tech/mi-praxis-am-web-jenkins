Ext.define('Ext.Praxis.controller.salesaudit.WorkloadReassignment.DataEntryAsignaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAsignaController',
    beanGuardar: {},
    // ✅ FIX #2: afterRender ahora sí se ejecuta porque la vista lo conecta
    //    via listeners: { afterrender: 'afterRender' }
    afterRender: function () {
        this.onLoadUsers();
        this.OnRendererPendinte();
    },

    onLoadUsers: async function () {
        try {
            let params = {
                IN_OPTION: '5',
                IN_CCUST: '139'
            };

            const res = await global.callStoreGet('PXSAUDIT', 'SQP02745', params);

            if (res.lstRs) {
                const data = res.lstRs?.[0] || [];

                data.unshift({A4886USER: 'ALL'});

                const cmb = Ext.getCmp(prototype.id + '-txtNewAuditor');

                const store = Ext.create('Ext.data.Store', {
                    fields: ['A4886USER'],
                    data: data
                });

                cmb.setStore(store);

                if (!cmb.getValue()) {
                    cmb.setValue('ALL');
                }
            }

        } catch (error) {
            console.error('Error cargando usuarios:', error);
        }
    },

    OnChangeTipoPendiente: function () {
        this.OnRendererPendinte();
    },

    OnRendererPendinte: function () {
        var view = this.getView();

        // gridDETALLE es el grid de la ventana PADRE que contiene los registros
        // originales a reasignar. Debe existir antes de abrir esta ventana.
        var grid = Ext.getCmp(prototype.id + '-gridDETALLE');

        if (!grid) {
            return;
        }

        var store = grid.getStore();

        if (!store || store.getCount() === 0) {
            return;
        }

        var tipo = Ext.getCmp(prototype.id + '-txtPending').getValue();
        var totalPending = 0;

        store.each(function (rec) {
            switch (tipo) {
                case 'MACH':
                    totalPending += rec.get('PEDINMACH') || 0;
                    break;
                case 'ADM':
                    totalPending += rec.get('PEDINADM') || 0;
                    break;
                case 'ACM':
                    totalPending += rec.get('PEDINACM') || 0;
                    break;
                case 'ERROR':
                    totalPending += rec.get('PEDINERROR') || 0;
                    break;
                default: // 'ALL'
                    totalPending +=
                            (rec.get('PEDINMACH') || 0) +
                            (rec.get('PEDINADM') || 0) +
                            (rec.get('PEDINACM') || 0) +
                            (rec.get('PEDINERROR') || 0);
            }
        });

        // Restar solo lo asignado en gridCarga que coincida con el tipo actual.
        var totalAsignado = this.getTotalAsignado(tipo);
        totalPending = totalPending - totalAsignado;

        if (totalPending < 0) {
            totalPending = 0;
        }

        // Guardar en la vista para usarlo en onClickAdd
        view.totalPending = totalPending;

        // Actualizar el label
        var lbl = view.down('#lblPendientes');
        if (lbl) {
            lbl.update('<b>Pendientes:</b> ' + totalPending);
        }
    },

    // tipo: valor del combo Pendientes ('ALL','MACH','ADM','ACM','ERROR')
    getTotalAsignado: function (tipo) {
        var gridCarga = Ext.getCmp(prototype.id + 'gridCarga');
        var total = 0;

        if (!gridCarga) {
            return 0;
        }

        gridCarga.getStore().each(function (rec) {
            var pendingFila = rec.get('PENDING');
            var descuenta = false;

            if (tipo === 'ALL') {
                // Viendo Todos: descuentan absolutamente todas las filas
                descuenta = true;
            } else if (pendingFila === tipo) {
                // Tipo específico: solo descuenta si la fila coincide exactamente
                descuenta = true;
            }
            // PENDING=null (asignado como ALL) NO descuenta en vista de tipo específico

            if (descuenta) {
                total += rec.get('PROCE') || 0;
            }
        });

        return total;
    },

    onClickAdd: function () {
        var auditor = Ext.getCmp(prototype.id + '-txtNewAuditor').getValue();
        var cantidad = Ext.getCmp(prototype.id + '-txtcantid').getValue();
        var pending = Ext.getCmp(prototype.id + '-txtPending').getValue();
        var total = this.getView().totalPending || 0;

        if (total === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'No hay pendientes disponibles');
            return;
        }

        if (cantidad > total) {
            Ext.Msg.alert('.: PRAXIS :.', 'No puedes asignar más de lo disponible');
            return;
        }

        if (auditor === 'ALL') {
            Ext.Msg.alert('.: PRAXIS :.', 'Debe seleccionar un auditor');
            return;
        }

        var grid = Ext.getCmp(prototype.id + 'gridCarga');
        var existe = grid.getStore().findRecord('A1672UASIG', auditor);

        if (existe) {
            Ext.Msg.alert('.: PRAXIS :.', 'Ya existe el Auditor');
            return;
        }

        grid.getStore().add({
            A1672UASIG: auditor,
            PROCE: cantidad,
            PENDING: pending === 'ALL' ? null : pending
        });

        this.OnRendererPendinte();
    },

    OnAsignaRemove: function (grid, rowIndex) {
        grid.getStore().removeAt(rowIndex);
        this.OnRendererPendinte();
    },

    onSaveClick: function () {
        var me = this;
        let notifier = new AWN();
        let OUT_MSG = "";
        let OUT_RES = 0;
        var txtNewAuditor = Ext.getCmp(prototype.id + '-cmbUser').getValue();
        //
        var cmbTrans = Ext.getCmp(prototype.id + '-cmbTrans').getValue();
        var txtFcmi = Ext.getCmp(prototype.id + '-txtFcmi').getValue();

        if (txtNewAuditor === 'ALL')
            txtNewAuditor = '';
        var grid = Ext.getCmp(prototype.id + 'gridCarga');
        var lstCarga = [];
        //
        grid.getStore().each(function (rec) {
            lstCarga.push({
                A1672UASIG: rec.get('A1672UASIG'),
                A1672PROCE: rec.get('PROCE'),
                A1672PENDI: rec.get('PENDING') ?? ''
            });
        });
        var jsonCarga = JSON.stringify(lstCarga);
        //
        let params = {
            IN_CCUST: '139',
            IN_AUASI: txtNewAuditor,
            IN_DATE: this.getView().params.IN_DATE,
            IN_SOURCE: this.getView().params.IN_SOURCE,
            IN_COUNTRY: this.getView().params.IN_COUNTRY,
            IN_LISTASIGNA: jsonCarga,
            IN_TRANS: cmbTrans,
            IN_FCMI: txtFcmi

        };
        // 
        global.Msg({
            msg: 'Are you sure Data ?',
            icon: 3,
            buttons: 3,
            fn: async function (btn) {      // ← async aquí es el fix
                if (btn === 'yes') {
                    me.getView().setLoading(true);
                    try {
                        const res = await global.callStorePost('PXSAUDIT', 'SQP05877', params);
                        if (res.status === 201) {
                            OUT_RES = res.data.lstVals.OUT_RES;
                            OUT_MSG = res.data.lstVals.OUT_MSG;
                            Ext.getCmp(prototype.id + '-Contenedor').getController().OnDetail02();
                            me.getView().reloadGrid();

                        } else {
                            OUT_MSG = 'Bad Request';
                        }
                    } catch (e) {
                        OUT_MSG = 'Update Failed';
                    } finally {
                        me.getView().setLoading(false);
                        if (OUT_RES === 1) {
                            me.getView().close();
                            notifier.success(OUT_MSG);
                        } else {
                            notifier.alert(OUT_MSG);
                        }
                    }
                }
            }
        });
    },

    onCloseClick: function () {
        this.getView().close();
    }
});
