Ext.define('Ext.Praxis.controller.payments.AccountingMasterProcess.ErrorAccountingDetailDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ErrorAccountingDetailDataEntryController',

    afterRender: async function () {
        const me = this;
        const view = me.view;

        view.setLoading(true);
        try {
            await me.loadData();
        } catch (e) {
            console.error('Error loading accounting detail data:', e);
            global.Msg({msg: 'Error loading accounting detail: ' + (e.message || 'Unknown error')});
        } finally {
            view.setLoading(false);
        }
    },

    loadData: async function () {
        const me = this;
        const view = me.view;

        const obj = view.obj || {};
        const processId = view.processId || obj.PROCESS_ID || '';
        const ccust = view.ccust || obj.CCUST || '139';

        const params = {
            IN_CCUST: (ccust || '139').toString().trim(),
            IN_PROCESS_ID: (processId || '').toString().trim(),
            IN_PRDA: (obj.PRDA || '').toString().trim(),
            IN_TDOC: (obj.TDOC || '').toString().trim(),
            IN_AREFNBR: (obj.AREFNBR || '').toString().trim(),
            IN_TRANSACTID: (obj.TRANSACTID || '').toString().trim(),
            IN_CCIA: (obj.CCIA || '').toString().trim(),
            IN_FORMA: (obj.FORMA || '').toString().trim(),
            IN_SERIE: (obj.SERIE || '').toString().trim(),
            IN_SEQ: (obj.SEQ || '').toString().trim(),
            IN_TERROR: (obj.TYPE_ERROR_PROCESS || obj.TERROR || '').toString().trim(),
            IN_CERROR: (obj.CERROR || '').toString().trim()
        };

        const res = await global.callStoreGet('PRAXISMP', 'SQP05925', params);

        if (!res || !res.lstRs) {
            global.Msg({msg: 'No data returned from accounting detail'});
            me.clearAllGrids();
            return;
        }

        const accountingDetail = res.lstRs[0] || [];
        const settlementDetail = res.lstRs[1] || [];
        const settlementDesglose = res.lstRs[2] || [];
        const complementDetail = res.lstRs[3] || [];

        me.setGridStore(prototype.idEAD + '-gridAccounting', accountingDetail);
        me.setGridStore(prototype.idEAD + '-gridSettlementDetail', settlementDetail);
        me.setGridStore(prototype.idEAD + '-gridSettlementDesglose', settlementDesglose);
        me.setGridStore(prototype.idEAD + '-gridComplementDetail', complementDetail);

        // Colapsar/expandir secciones según tengan datos
        me.updateSectionVisibility(prototype.idEAD + '-tabAccounting', accountingDetail);
        me.updateSectionVisibility(prototype.idEAD + '-tabSettlementDetail', settlementDetail);
        me.updateSectionVisibility(prototype.idEAD + '-tabSettlementDesglose', settlementDesglose);
        me.updateSectionVisibility(prototype.idEAD + '-tabComplementDetail', complementDetail);
    },

    setGridStore: function (gridId, data) {
        const grid = Ext.getCmp(gridId);
        if (!grid) return;

        const arrayData = Array.isArray(data) ? data : (data ? [data] : []);

        // Definimos el Store con tipos de datos explícitos
        // const store = Ext.create('Ext.data.Store', {
        //     fields: [
        //         { name: 'TICKET', type: 'string' },
        //         { name: 'A4183ACTIV', type: 'float' }, // IMPORTANTE: Para que sume decimales
        //         { name: 'A4183PASIV', type: 'float' },  // IMPORTANTE: Para que sume decimales
        //         // Agrega otros campos si necesitas que tengan un tipo específico
        //     ],
        //     data: arrayData,
        //     // sorters: [{
        //     //     property: 'TICKET',
        //     //     direction: 'ASC'
        //     // }]
        // });
        const store = Ext.create('Ext.data.Store', {
            data: arrayData
        });

        // Usar reconfigure para que las features (summary, etc.) se sincronicen con el nuevo store
        if (grid.reconfigure) {
            grid.reconfigure(store);
        } else {
            grid.setStore(store);
        }

        grid.getView().refresh();
        
        // Forzar Orden para el recalculo de summary y count
        grid.getStore().sort([
            {
                property: 'TICKET',
                direction: 'ASC'
            },
            {
                property: 'A4183SEQ',
                direction: 'ASC'
            }
        ]);

        // 2. Si el summary sigue en 0, forzamos al feature a recalcular:
        const summaryFeature = grid.getView().getFeature(0); // El ID o índice del summary
        if (summaryFeature && summaryFeature.updateSummaryRow) {
            summaryFeature.updateSummaryRow();
        }
        
    },

    // Registrar la última sección expandida para saber qué grid exportar
    onSectionExpand: function (panel) {
        const grid = panel.down('gridpanel') || panel.down('grid');
        if (grid) {
            this.activeGridId = grid.getId();
        }
    },

    clearAllGrids: function () {
        this.setGridStore(prototype.idEAD + '-gridAccounting', []);
        this.setGridStore(prototype.idEAD + '-gridSettlementDetail', []);
        this.setGridStore(prototype.idEAD + '-gridSettlementDesglose', []);
        this.setGridStore(prototype.idEAD + '-gridComplementDetail', []);

        this.updateSectionVisibility(prototype.idEAD + '-tabAccounting', []);
        this.updateSectionVisibility(prototype.idEAD + '-tabSettlementDetail', []);
        this.updateSectionVisibility(prototype.idEAD + '-tabSettlementDesglose', []);
        this.updateSectionVisibility(prototype.idEAD + '-tabComplementDetail', []);
    },

    updateSectionVisibility: function (panelId, data) {
        const panel = Ext.getCmp(panelId);
        if (!panel) {
            return;
        }
        const count = Ext.isArray(data) ? data.length : (data ? 1 : 0);
        if (count > 0) {
            panel.setDisabled(false);
            panel.expand();
        } else {
            panel.collapse();
            panel.setDisabled(true);
        }
    },

    // Se va a exportar la grilla de la sección actualmente expandida (o Accounting por defecto)
    onDownloadExcelActiveTab: function () {
        const me = this;

        let grid = null;

        // Priorizar la sección que tenga el foco (última expandida)
        if (me.activeGridId) {
            grid = Ext.getCmp(me.activeGridId);
        }

        // Si no hay una sección activa registrada, usar Accounting Detail por defecto
        if (!grid) {
            grid = Ext.getCmp(prototype.idEAD + '-gridAccounting');
        }

        if (!grid || !grid.getStore()) {
            global.Msg({msg: 'No data to export'});
            return;
        }

        const store = grid.getStore();
        const records = store.getData().items;

        if (!records || records.length === 0) {
            global.Msg({msg: 'No data to export'});
            return;
        }

        // 1. Obtener solo las columnas que están visibles y tienen un dataIndex o son rownumberer
        const visibleColumns = grid.getColumns().filter(col => {
            // Excluimos columnas ocultas y aquellas sin dataIndex (como acciones o check columns si no las quieres)
            return !col.hidden && (col.dataIndex || col.xtype === 'rownumberer');
        });

        // 2. Mapear los datos basándonos únicamente en esas columnas
        const dataToExport = records.map(function (rec, index) {
            const row = {};
            
            visibleColumns.forEach(col => {
                // Limpiar el texto del header de etiquetas HTML (como <br>)
                let headerText = (col.text || col.dataIndex || 'Field').replace(/<\/?[^>]+(>|$)/g, "").trim();
                
                // Si es un rownumberer, generamos el índice
                if (col.xtype === 'rownumberer' || col.dataIndex === 'RN') {
                    row[headerText] = index + 1;
                } else {
                    // Obtener el valor del record
                    let value = rec.get(col.dataIndex);
                    
                    // OPCIONAL: Si la columna tiene un renderer, podrías querer el valor transformado.
                    // Si prefieres el dato crudo, deja solo: row[headerText] = value;
                    row[headerText] = value;
                }
            });
            
            return row;
        });
        
        const panel = grid.up('panel');
        const tabTitle = (panel && panel.title ? panel.title : 'Data').replace(/<\/?[^>]+(>|$)/g, '');
        const processId = (me.view.processId || 'Detail').toString().trim();

        // const data = records.map(function (rec, index) {
        //     const base = Object.assign({}, rec.data);
        //     base.RN = index + 1;
        //     return base;
        // });

        const fileName = 'ErrorAccounting_' + tabTitle.replace(/\s+/g, '') + '_' + processId;
        global.writeExcelFromJson(dataToExport, fileName);

        Ext.toast({
            html: '<b>Excel file downloaded successfully</b>',
            title: 'Success',
            align: 't',
            closable: true,
            width: 280,
            timeout: 3000
        });
    },

    onCloseClick: function () {
        this.view.close();
    }
});

