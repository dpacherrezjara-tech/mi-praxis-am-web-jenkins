
Ext.define('Ext.Praxis.controller.payments.PaymentAnalytics.AnalyticsSettlementGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AnalyticsSettlementGridController',
    afterRender: async function (obj, e) {
        const me = this;
        me.view.setLoading(true);
        await this.getData();
        me.view.setLoading(false);
    },

    getData: async function () {
        const me = this;
        const view = me.view;

        let storeResponse = await global.callStoreGet('PRAXISMP', 'SQP05725', view.searchParams);
        
        // validacion si se tiene respuesta
        if (storeResponse.lstVals.OUT_RES === 0 ){
            global.Msg({msg: storeResponse.lstVals.OUT_MSG});
            return;
        }
        
        // data
        const data = storeResponse?.lstRs[0] || [] ;
        const firstRow = data[0] || [];
        if (data.length === 0) {
            const emptyStore = Ext.create('Ext.data.TreeStore', { 
                root: { text: '.', expanded: false, children: [] } 
            });
            view.setStore(emptyStore);
            return;
        }
        
        // Campos estáticos
        const staticFields = ['CCUST', 'PROCTYPE', 'PROCTYPESQ', 'STVAL', 'PROCESSOR', 'STATUS', 'CURRENCY'];
        
        // Obtener campos dinámicos (fechas) excluyendo los estáticos
        const dateFields = Object.keys(firstRow).filter(key => !staticFields.includes(key));

        console.log('Date fields found:', dateFields);
        console.log('Sample data First Row:', firstRow);

        // Generar estructura jerárquica similar a SummaryTree
        const tree = me.buildTreeStructure(data, dateFields);
        
        console.log("Tree structure:", tree);
        
        // Crear TreeStore
        const storeTree = Ext.create('Ext.data.TreeStore', {
            root: { text: '.', expanded: false, children: tree }
        });
        
        // Configurar columnas dinámicas
        me.configureDynamicColumns(dateFields);
        
        // Configurar el tree panel con store
        view.setStore(storeTree);
        
        return;
    },

    configureDynamicColumns: function(dateFields) {
        const me = this;
        const view = me.view;
        
        // Para TreePanel, necesitamos reconstruir las columnas completamente
        const baseColumns = [
            {
                xtype: 'treecolumn',
                text: 'Group',
                dataIndex: 'text',
                width: 240,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    switch (record.data.type) {
                        case 'header':
                            metaData.style = "text-align:left;font-weight:bold;color:#302CFF;";
                            break;
                        case 'detail':
                            metaData.style = "text-align:left;font-weight:bold;color:#008000;";
                            break;
                    }
                    return value;
                }
            },
            {
                text: 'Processor',
                dataIndex: 'PROCESSOR',
                width: 160,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    switch (record.data.type) {
                        case 'header':
                            metaData.style = "font-weight:bold;color:#302CFF;";
                            break;
                        case 'detail':
                            metaData.style = "font-weight:bold;color:#008000;";
                            break;
                    }
                    return value || '';
                }
            },
            {
                text: 'Status',
                dataIndex: 'STATUS',
                width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    switch (record.data.type) {
                        case 'header':
                            metaData.style = "font-weight:bold;color:#302CFF;";
                            break;
                        case 'detail':
                            metaData.style = "font-weight:bold;color:#008000;";
                            break;
                    }
                    return value || '';
                }
            },
            {
                text: 'Currency',
                dataIndex: 'CURRENCY',
                width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    switch (record.data.type) {
                        case 'header':
                            metaData.style = "font-weight:bold;color:#302CFF;";
                            break;
                        case 'detail':
                            metaData.style = "font-weight:bold;color:#008000;";
                            break;
                    }
                    return value || '';
                }
            }
        ];

        // Crear agrupamiento de columnas dinámicas (fechas) bajo "Amount"
        const amountGroupDynamicColumn = {
            text: 'Amount',
            columns: dateFields.map(field => ({
                text: field,
                dataIndex: field,
                width: 120,
                align: 'right',
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    if (value === null || value === undefined) return '';
                    
                    switch (record.data.type) {
                        case 'header':
                            metaData.style = "font-weight:bold;text-align:right"; //;background-color:#84AFCA
                            break;
                        case 'detail':
                            metaData.style = "text-align:right;background-color:#6FCA96";
                            break;
                    }
                    
                    return Ext.util.Format.number(value, '0,000.00');
                }
            }))
        };

        // Combinar todas las columnas
        const allColumns = [...baseColumns, amountGroupDynamicColumn];
        
        // Reconfigurar el grid con las nuevas columnas
        view.reconfigure(allColumns);
    },

    buildTreeStructure: function(data, dateFields) {
        const me = this;
        
        // Agrupar por Processor primero
        const processorGroups = me.groupBy({ data: data, key: 'PROCESSOR' });
        
        const tree = Object.entries(processorGroups).map(([processor, processorData]) => {
            // Calcular totales del procesador
            const processorTotals = {};
            dateFields.forEach(field => {
                processorTotals[field] = me.sumBy({ data: processorData, key: field });
            });
            
            // Agrupar por Currency dentro del procesador
            const currencyGroups = me.groupBy({ data: processorData, key: 'CURRENCY' });
            
            const currencyNodes = Object.entries(currencyGroups).map(([currency, currencyData]) => {
                // Calcular totales de la moneda
                const currencyTotals = {};
                dateFields.forEach(field => {
                    currencyTotals[field] = me.sumBy({ data: currencyData, key: field });
                });
                
                // Crear nodos hoja (registros individuales) directamente bajo Currency
                const leafNodes = currencyData.map(row => ({
                    text: `${row.PROCESSOR} - ${row.CURRENCY} - ${row.STATUS}`,
                    type: 'detail',
                    leaf: true,
                    PROCESSOR: row.PROCESSOR,
                    STATUS: row.STATUS,
                    CURRENCY: row.CURRENCY,
                    ...row
                }));
                
                return {
                    text: `${currency} (${currencyData.length} items)`,
                    type: 'header',
                    expanded: false,
                    leaf: false,
                    PROCESSOR: processor,
                    STATUS: '',
                    CURRENCY: currency,
                    ...currencyTotals,
                    children: leafNodes
                };
            });
            
            return {
                text: `${processor} (${processorData.length} items)`,
                type: 'header',
                expanded: true,
                leaf: false,
                PROCESSOR: processor,
                STATUS: '',
                CURRENCY: '',
                ...processorTotals,
                children: currencyNodes
            };
        });
        
        return tree;
    },

    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    groupBy: function({data, key}) {
        let grouped = data.reduce((groups, item) => {
            let obj = item[key];
            if (!groups[obj]) {
                groups[obj] = [];
            }
            groups[obj].push(item);
            return groups;
        }, {});
        return grouped;
    },
    
    sumBy: function({data, key}) {
        let sum = data.reduce(function (total, item) {
            return total + (parseFloat(item[key]) || 0);
        }, 0);
        return sum;
    },
    //</editor-fold>

    downloadExcel: function (btn) {
        const me = this;
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Download Excel?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            me.onDownloadExcel();
                        }
                    }
                });
    },
    onDownloadExcel: async function () {
        const me = this;
        const view = me.view;
        view.setLoading(true);
        
        try {
            let res = await global.callStoreGet('PRAXISMP', 'SQP05725', view.searchParams); 
            let data = res.lstRs.at(0);

            if (data.length === 0) {
                global.Msg({ msg: 'Data not Found' });
                view.setLoading(false);
                return;
            }
            
            const staticFields = ['CCUST', 'PROCTYPE', 'PROCTYPESQ', 'STVAL', 'PROCESSOR', 'STATUS', 'CURRENCY'];
            const firstRow = data[0] || {};
            // Obtener campos dinámicos (fechas) excluyendo los estáticos
            const dateFields = Object.keys(firstRow).filter(key => !staticFields.includes(key));

           
            let excel = data.map(row => {
                // armar objeto para excel
                let obj = {
                    'Processor': row.PROCESSOR,
                    'Status': row.STATUS,
                    'Currency': row.CURRENCY,
                };

                // Agregar campos dinámicos (fechas) al final
                dateFields.forEach(field => {
                    obj["Amount " + field] = row[field];
                });
                
                return obj;
            });

            // Generar Excel
            await global.writeExcelFromJson(excel, 'Summary Settlement Analytics');
            
        } catch (e) {
            console.log(e);
        }
        finally {
            view.setLoading(false);
        }
    }

});
