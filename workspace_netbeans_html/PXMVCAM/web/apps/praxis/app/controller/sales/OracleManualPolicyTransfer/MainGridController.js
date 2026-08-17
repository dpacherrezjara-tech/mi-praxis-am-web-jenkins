Ext.define('Ext.Praxis.controller.sales.OracleManualPolicyTransfer.MainGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.OracleManualPolicyTransferMainGridController',

    onDownloadExcel: async function () {
        const me = this;
        const grid = me.getView();
        const filtro1 = Ext.getCmp(prototype.id + '-panelFilters');

        if (!filtro1) {
            global.Msg({msg: 'Filters panel not found. Please search first.'});
            return;
        }

        const params = filtro1.getForm().getValues();
        const spParams = {
            IN_CCUST: params.IN_CCUST || '139',
            IN_FPROC_FROM: params.IN_FPROC_FROM || '',
            IN_FPROC_TO: params.IN_FPROC_TO || '',
            IN_MODULE: params.IN_MODULE || '',
            IN_STATUS: params.IN_STATUS || ''
        };

        grid.setLoading(true);
        try {
            const res = await global.callStorePagginExcel('PRAXIS', 'SQP06143', spParams);
            if (!res || res.length === 0) {
                global.Msg({msg: 'No data to export'});
                return;
            }

            // Mismos campos visibles en la grilla, en el mismo orden
            const data = res.map(function (x, index) {
                return {
                    'RN': index + 1,
                    'Upload Number': x.ENVIO_JOB || '',
                    'Upload Date': x.DATE_UPLOAD || '',
                    'Upload Status': x.STATUS_DESCRIPTION_JOB || '',
                    'Module': x.MODULE_DESCRIPTION || '',
                    'File Name': x.NAMEZIP || '',
                    'Folders': x.TOTFOLDERS || 0,
                    'Files': x.TOTFILES || 0,
                    'Lines': x.TOTLINES || 0,
                    'Status': x.STATUS_DESCRIPTION || '',
                    'User': x.USCR || '',
                    'Create Date': x.FECR || '',
                    'Create Hour': x.HOCR || ''
                };
            });

            await global.writeExcelFromJson(data, 'OracleManualPolicyTransfer');
            Ext.toast({
                html: '<b>Excel file downloaded successfully</b>',
                title: 'Success',
                align: 't',
                closable: true,
                width: 280,
                timeout: 3000
            });
        } catch (e) {
            console.error('Error downloading Excel:', e);
            global.Msg({msg: 'Error downloading Excel: ' + (e.message || 'Unknown error')});
        } finally {
            grid.setLoading(false);
        }
    },

    onClickDrilldown: function (view, rowIndex, colIndex, item, e, record) {
        const ccust = (record.get('CCUST') || '').toString().trim();
        const envio = (record.get('ENVIO') || '').toString().trim();
        const module = (record.get('MODULE') || '').toString().trim();
        const namezip = (record.get('NAMEZIP') || '').toString().trim();

        if (!envio || !module || !namezip) {
            global.Msg({msg: 'Upload Number/Module/File not found in this row'});
            return;
        }

        const drilldown = Ext.create('Ext.Praxis.view.sales.OracleManualPolicyTransferForm.DataEntrys.PolicyLoadDrilldown', {
            id: prototype.id + '-PolicyLoadDrilldown-' + ccust + '-' + envio + '-' + module + '-' + namezip,
            ccust: ccust,
            envio: envio,
            module: module,
            namezip: namezip
        });
        drilldown.show();
    }
});
