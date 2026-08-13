
Ext.define('Ext.Praxis.controller.salesaudit.Waiver.WaiverRecordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.WaiverRecordController',

    afterRender: function () {
        var p = this.view.params || {};
        var headerSub = Ext.get(prototype.id + '-rec-headerSub');

        this.view.query('textfield, datefield, textarea').forEach(function (f) {
            f.setReadOnly(true);
        });

        if (p.action === 'U' && p.rec) {
            this.fillForm(p.rec);
            var d = p.rec.data || p.rec;
            if (headerSub) {
                headerSub.update('&middot; Case ' + (d.A2537NCASO || '').trim());
            }
            this.loadDetailGrid(d);
        }
    },

    /**
     * @private Carga la grilla de tickets asociados (SQP06127, no paginado)
     * para el CCUST/SEQ del registro que se está viendo.
     * Requiere el fix null-safe en CallStorePaggin.setPageOut() (BEANS) para
     * SPs que no declaran los 4 parámetros INOUT de paginación.
     */
    loadDetailGrid: function (d) {
        var grid = Ext.getCmp(prototype.id + '-rec-detailGrid');
        if (!grid) { return; }
        grid.getController().reload({
            IN_CCUST: (d.A2537CCUST || '').trim(),
            IN_SEQ: (d.A2537SEQ || '').trim()
        });
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
        Ext.getCmp(prototype.id + '-rec-txtAmouw').setValue(Ext.util.Format.number(parseFloat(d.A2537AMOUW) || 0, '0,000.00'));
        Ext.getCmp(prototype.id + '-rec-txtEjecb').setValue(d.A2537EJECB || '');
        Ext.getCmp(prototype.id + '-rec-txtNvlo').setValue(d.A2537NVLO || '');
        Ext.getCmp(prototype.id + '-rec-txtFvlo').setValue(d.A2537FVLO || '');
        Ext.getCmp(prototype.id + '-rec-txtHvlo').setValue(d.A2537HVLO || '');
        Ext.getCmp(prototype.id + '-rec-txtItin').setValue(d.A2537ITIN || '');
        Ext.getCmp(prototype.id + '-rec-txtDescr').setValue(d.A2537DESCR || '');
    },

    onCancelClick: function () {
        this.view.close();
    },

    /**
     * Descarga el archivo original asociado al caso (A2537RUTAA), vía el
     * mismo endpoint que usaba la grilla principal.
     */
    onDownloadOriginalFile: function () {
        var p = this.view.params || {};
        var d = (p.rec && (p.rec.data || p.rec)) || {};
        var rutaa = (d.A2537RUTAA || '').trim();

        if (!rutaa) {
            global.Msg({ msg: 'This case has no file attached.' });
            return;
        }

        var fileName = rutaa.split('\\').pop() || 'download.csv';
        var winRef = this.view;

        winRef.mask('Downloading...');
        Ext.Ajax.request({
            // URL fija (no depender de prototype.url, que es global y otras
            // pantallas lo reescriben en su propio init()).
            url: CONTEXTPATH + '/Waiver/download',
            method: 'POST',
            timeout: 60000000,
            params: { beanString: JSON.stringify(d) },
            success: function (response) {
                winRef.unmask();
                var res = Ext.JSON.decode(response.responseText);
                if (!res || !res.bytes) {
                    global.Msg({ msg: (res && res.mensaje) || 'The file cannot be found on the server.' });
                    return;
                }
                var bytes = new Uint8Array(res.bytes);
                var blob = new Blob([bytes], { type: 'application/png' });

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = fileName;
                link.click();
            },
            failure: function (response) {
                winRef.unmask();
                console.error('Download failed:', response.status, response.responseText);
                global.Msg({ msg: 'Error downloading file.' });
            }
        });
    }
});
