
Ext.define('Ext.Praxis.controller.salesaudit.Waiver.WaiverRecordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.WaiverRecordController',

    afterRender: function () {
        var p = this.view.params || {};

        if (p.action === 'U' && p.rec) {
            this.fillForm(p.rec);
            this.view.setTitle('Edit Waiver');
        } else {
            this.view.setTitle('Create Waiver');
        }
    },

    fillForm: function (rec) {
        var d = rec.data || rec;
        var fmt = Ext.util.Format.date;

        var parseDate = function (val) {
            if (!val || val.trim() === '') return null;
            // formato YYYYMMDD
            var s = val.trim();
            if (s.length === 8) {
                return Ext.Date.parse(s, 'Ymd');
            }
            return null;
        };

        Ext.getCmp(prototype.id + '-rec-txtNcaso').setValue(d.A2537NCASO || '');
        Ext.getCmp(prototype.id + '-rec-txtEstad').setValue(d.A2537ESTAD || '');
        Ext.getCmp(prototype.id + '-rec-txtPnr').setValue(d.A2537PNR || '');
        Ext.getCmp(prototype.id + '-rec-txtNpax').setValue(d.A2537NPAX || '');
        Ext.getCmp(prototype.id + '-rec-txtPcaso').setValue(d.A2537PCASO || '');
        Ext.getCmp(prototype.id + '-rec-txtTcaso').setValue(d.A2537TCASO || '');
        Ext.getCmp(prototype.id + '-rec-dtFcrre').setValue(parseDate(d.A2537FCRRE));
        Ext.getCmp(prototype.id + '-rec-txtHcrre').setValue(d.A2537HCRRE || '');
        Ext.getCmp(prototype.id + '-rec-dtFveto').setValue(parseDate(d.A2537FVETO));
        Ext.getCmp(prototype.id + '-rec-txtHveto').setValue(d.A2537HVETO || '');
        Ext.getCmp(prototype.id + '-rec-txtTkts').setValue((d.A2537TKTS || '').trim());
        Ext.getCmp(prototype.id + '-rec-txtCodit').setValue(d.A2537CODIT || '');
        Ext.getCmp(prototype.id + '-rec-txtIatae').setValue(d.A2537IATAE || '');
        Ext.getCmp(prototype.id + '-rec-txtSeq').setValue(d.A2537SEQ || '');
        Ext.getCmp(prototype.id + '-rec-txtAgene').setValue(d.A2537AGENE || '');
        Ext.getCmp(prototype.id + '-rec-txtCcpto').setValue(d.A2537CCPTO || '');
        Ext.getCmp(prototype.id + '-rec-txtScpto').setValue(d.A2537SCPTO || '');
        Ext.getCmp(prototype.id + '-rec-txtCurrw').setValue(d.A2537CURRW || '');
        Ext.getCmp(prototype.id + '-rec-txtAmouw').setValue(d.A2537AMOUW || '');
        Ext.getCmp(prototype.id + '-rec-txtEjecb').setValue(d.A2537EJECB || '');
        Ext.getCmp(prototype.id + '-rec-txtNvlo').setValue(d.A2537NVLO || '');
        Ext.getCmp(prototype.id + '-rec-txtFvlo').setValue(d.A2537FVLO || '');
        Ext.getCmp(prototype.id + '-rec-txtHvlo').setValue(d.A2537HVLO || '');
        Ext.getCmp(prototype.id + '-rec-txtItin').setValue(d.A2537ITIN || '');
        Ext.getCmp(prototype.id + '-rec-txtDescr').setValue(d.A2537DESCR || '');
    },

    onSaveClick: async function () {
        var p = this.view.params || {};
        var action = p.action || 'C';

        var getVal = function (id) {
            return (Ext.getCmp(prototype.id + id).getValue() || '');
        };
        var getDateVal = function (id) {
            var dt = Ext.getCmp(prototype.id + id).getValue();
            return dt ? Ext.util.Format.date(dt, 'Ymd') : '';
        };

        var ncaso = getVal('-rec-txtNcaso').toString().trim();
        var pcaso = getVal('-rec-txtPcaso').trim();
        if (!ncaso) { global.Msg({ msg: 'Case No is required.' }); return; }
        if (!pcaso) { global.Msg({ msg: 'Name is required.' }); return; }

        var ccust = Ext.getCmp(prototype.id + '-Ccust').getValue() || '';

        var params = {
            V_ACTION:  action,
            V_CCUST:   ccust,
            V_NCASO:   ncaso,
            V_ESTAD:   getVal('-rec-txtEstad').trim(),
            V_PNR:     getVal('-rec-txtPnr').trim(),
            V_NPAX:    getVal('-rec-txtNpax').trim(),
            V_PCASO:   pcaso,
            V_TCASO:   getVal('-rec-txtTcaso').trim(),
            V_FCRRE:   getDateVal('-rec-dtFcrre'),
            V_HCRRE:   getVal('-rec-txtHcrre').trim(),
            V_FVETO:   getDateVal('-rec-dtFveto'),
            V_HVETO:   getVal('-rec-txtHveto').trim(),
            V_TKTS:    getVal('-rec-txtTkts').trim(),
            V_CODIT:   getVal('-rec-txtCodit').trim(),
            V_IATAE:   getVal('-rec-txtIatae').trim(),
            V_SEQ:     getVal('-rec-txtSeq').trim(),
            V_AGENE:   getVal('-rec-txtAgene').trim(),
            V_CCPTO:   getVal('-rec-txtCcpto').trim(),
            V_SCPTO:   getVal('-rec-txtScpto').trim(),
            V_CURRW:   getVal('-rec-txtCurrw').trim(),
            V_AMOUW:   getVal('-rec-txtAmouw').trim(),
            V_EJECB:   getVal('-rec-txtEjecb').trim(),
            V_NVLO:    getVal('-rec-txtNvlo').trim(),
            V_FVLO:    getVal('-rec-txtFvlo').trim(),
            V_HVLO:    getVal('-rec-txtHvlo').trim(),
            V_ITIN:    getVal('-rec-txtItin').trim(),
            V_DESCR:   getVal('-rec-txtDescr').trim()
        };

        if (action === 'U' && p.rec) {
            params.V_RUTAA = (p.rec.data || p.rec).A2537RUTAA || '';
        }

        var winRef = this.view;
        winRef.mask('Saving...');
        try {
            await global.callStoreGet('PXSAUDIT', 'SQP01444', params);
            winRef.unmask();
            winRef.close();
            if (p.onSuccess) p.onSuccess();
        } catch (e) {
            winRef.unmask();
            global.Msg({ msg: 'Error saving record.' });
        }
    },

    onCancelClick: function () {
        this.view.close();
    }
});
