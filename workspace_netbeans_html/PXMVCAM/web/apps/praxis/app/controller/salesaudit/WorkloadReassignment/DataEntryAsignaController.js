Ext.define('Ext.Praxis.controller.salesaudit.WorkloadReassignment.DataEntryAsignaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryAsignaController',

    beanGuardar: {},
    urlWin01: CONTEXTPATH + '/WorkloadReassignment',

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

                data.unshift({ A4886USER: 'ALL' });

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
            console.error('Error:', error);
        }
    },

    OnRendererPendinte: function () {
        var view = this.getView();
        var grid = Ext.getCmp(prototype.id + '-gridDETALLE');

        if (!grid) return;

        var store = grid.getStore();
        if (!store || store.getCount() === 0) return;

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
                default:
                    totalPending +=
                        (rec.get('PEDINMACH') || 0) +
                        (rec.get('PEDINADM') || 0) +
                        (rec.get('PEDINACM') || 0) +
                        (rec.get('PEDINERROR') || 0);
            }
        });

        var totalAsignado = this.getTotalAsignado();
        totalPending = totalPending - totalAsignado;

        if (totalPending < 0) totalPending = 0;

        view.totalPending = totalPending;

        var lbl = view.down('#lblPendientes');
        lbl.update('<b>Pendientes:</b> ' + totalPending);
    },

    getTotalAsignado: function () {
        var gridCarga = Ext.getCmp(prototype.id + 'gridCarga');
        var total = 0;

        if (!gridCarga) return 0;

        gridCarga.getStore().each(function (rec) {
            total += rec.get('PROCE') || 0;
        });

        return total;
    },

    OnChangeTipoPendiente: function () {
        this.OnRendererPendinte();
    },

    onCloseClick: function () {
        this.getView().close();
    },

    onClickAdd: function () {
        var auditor = Ext.getCmp(prototype.id + '-txtNewAuditor').getValue();
        var cantidad = Ext.getCmp(prototype.id + '-txtcantid').getValue();
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

        var gridCarga = Ext.getCmp(prototype.id + 'gridCarga');

        // validar duplicados
        var existe = gridCarga.getStore().findRecord('A1672UASIG', auditor);
        if (existe) {
            global.Msg({ msg: "Ya existe el Auditor Asignado!", icon: 2 });
            return;
        }

        gridCarga.getStore().add({
            A1672UASIG: auditor,
            PROCE: cantidad
        });

        this.OnRendererPendinte();
    },

    OnAsignaRemove: function (grid, rowIndex) {
        var me = this;
        var store = grid.getStore();
        var record = store.getAt(rowIndex);

        global.Msg({
            msg: '¿Eliminar la Asignación?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    store.remove(record);

                    me.OnRendererPendinte();
                }
            }
        });
    },

    onSaveClick: async function () {
        var me = this;
        var grid = Ext.getCmp(prototype.id + 'gridCarga');

        var lstCarga = [];

        grid.getStore().each(function (rec) {
            lstCarga.push({
                A1672UASIG: rec.get('A1672UASIG'),
                PROCE: rec.get('PROCE')
            });
        });

        let params = {
            IN_LISTASIGNA: JSON.stringify(lstCarga)
        };

        try {
            const res = await global.callStorePost('PRAXIS', 'SQP05877', params);

            if (res.status === 201) {
                notifier.success(res.data.lstVals.OUT_MSG);
                me.getView().close();
            } else {
                notifier.alert('Error en la operación');
            }

        } catch (e) {
            notifier.alert('Error al guardar');
        }
    }
});