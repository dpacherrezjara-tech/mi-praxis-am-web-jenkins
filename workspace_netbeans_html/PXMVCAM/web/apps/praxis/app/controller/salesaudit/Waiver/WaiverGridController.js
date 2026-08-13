/**
 * WaiverGridController
 * ---------------------
 * customController delegado del storeprocgrid de WaiverForm.
 * Maneja la acción de fila 'viewDetail': recupera el registro actualizado
 * vía SQP06126 (IN_CCUST, IN_SEQ) y lo muestra en WaiverRecordForm — el
 * formulario "header" con los mismos campos de la grilla, en modo edición.
 */
Ext.define('Ext.Praxis.controller.salesaudit.Waiver.WaiverGridController', {
    extend: 'Ext.Base',
    baseCtrl: null,
    widgetView: null,

    onRowAction: async function (action, record, rowIndex, grid) {
        if (action !== 'viewDetail') {
            return;
        }

        var self = this;
        var d = record.data || record;
        var ccust = (d.A2537CCUST || '').trim();
        var seq = (d.A2537SEQ || '').trim();

        var maskTarget = grid.up('window') || Ext.getBody();
        maskTarget.mask('Loading...');
        try {
            var res = await global.callStoreGet('PXSAUDIT', 'SQP06126', {
                IN_CCUST: ccust,
                IN_SEQ: seq
            });
            var row = (res.lstRs && res.lstRs[0] && res.lstRs[0][0]) || null;
            if (!row) {
                global.Msg({ msg: 'Data not found.' });
                return;
            }

            var existing = Ext.getCmp(prototype.id + '-recordFormWin');
            if (existing) { existing.close(); }
            Ext.create('Ext.Praxis.view.salesaudit.WaiverForm.WaiverRecordForm', {
                id: prototype.id + '-recordFormWin',
                params: {
                    action: 'U',
                    rec: { data: row },
                    onSuccess: function () { self.baseCtrl.reload(); }
                }
            }).show();
        } catch (e) {
            global.Msg({ msg: 'Error loading waiver.' });
        } finally {
            maskTarget.unmask();
        }
    },

    onWidgetReady: function (widgetView) {}
});
