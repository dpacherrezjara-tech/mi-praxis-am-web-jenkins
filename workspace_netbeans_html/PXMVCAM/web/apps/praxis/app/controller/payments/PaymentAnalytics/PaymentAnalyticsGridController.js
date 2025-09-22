Ext.define('Ext.Praxis.controller.payments.PaymentAnalytics.PaymentAnalyticsGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PaymentAnalyticsGridController',
    afterRender: async function (obj, e) {
        const me = this;
        me.view.setLoading(true);
        await this.getData();
        me.view.setLoading(false);
    },
//    getData: async function () {
//        const me = this;
//        const view = me.view;
//        console.log('view', view);
//
//        let store = await global.callStoreGet('PRAXISMP', 'SQP05725', view.searchParams);
//        console.log('stores', store);
//
//        const response = store.lstRs?.at(0) || {};
//        if (!response || Object.keys(response).length === 0) {
//            global.Msg({msg: 'Data not Found'});
//            return;
//        }
//        view.setStore(response);
//    },


//    getData: async function () {
//        const me = this;
//        const view = me.view;
//
//        let storeResponse = await global.callStoreGet('PRAXISMP', 'SQP05725', view.searchParams);
//        
//        // validacion si se tiene respuesta
//        if (storeResponse.lstVals.OUT_RES === 0 ){
//            global.Msg({msg: storeResponse.lstVals.OUT_MSG});
//            return;
//        }
//        
//        // data
//        const data = storeResponse?.lstRs[0] || [] ;
//        const firstRow = data[0] || [];
//        if (data.length === 0) {
//            view.reconfigure(Ext.create('Ext.data.Store', { fields: [], data: [] }), []); // limpiar grid
//            return;
//        }
//        
//        // Campos estáticos que siempre están presentes
//        const staticFields = ['CCUST', 'PROCTYPE', 'PROCTYPESQ', 'STVAL', 'PROCESSOR', 'STATUS'];
//        
//        // Obtener campos dinámicos (monedas) excluyendo los estáticos
//        const currencyFields = Object.keys(firstRow).filter(key => !staticFields.includes(key));
//
//        console.log('Currency fields found:', currencyFields);
//        console.log('Sample data First Row:', firstRow);
//
//
//        // Construir columnas estáticas que siempre quiero mostrar ---
//        const staticColumns = [
//            { 
//                text: 'Processor', dataIndex: 'PROCESSOR', width: 160, locked: true },
//            {
//                text: 'Status', dataIndex: 'STVAL', width: 150, locked: true,
//                renderer: function (value, meta, rec) {
//                    return rec.data.STATUS || value; 
//                }
//            }
//        ];
//
//
//        // Crear las columnas dinámicas
//        const dynamicCurrencyColumns = currencyFields.map(field => ({
//            text: field,
//            dataIndex: field,
//            width: 120,
//            align: 'right',
//            renderer: function (v) {
//                if (v === null || v === undefined) return '';
//                return Ext.util.Format.number(v, '0,000.00');
//            }
////            renderer: Ext.util.Format.numberRenderer('0,0.00') // ejemplo: formato numérico
//        }));
//        
//        console.log("dynamicCurrencyColumns", dynamicCurrencyColumns) ;
//        
//        // --- Agrupar las columnas dinámicas dentro de Amount ---
//        const amountGroupColumn = {
//            text: 'Amount',
//            // usa itemId para buscar más tarde si necesitas
//            itemId: prototype.id + '-Amount',
//            // id si lo quieres en el ComponentManager: id: prototype.id + '-Amount'
//            columns: dynamicCurrencyColumns
//        };
//
//        // --- Columnas finales para el grid ---
//        const finalColumns = [...staticColumns, amountGroupColumn];
//        
//        
//        // --- Crear store dinámico con los campos correctos ---
//        const storeFields = [...staticFields, ...currencyFields];
//        
//        const treeData = data.map(row => {
//            const children = currencyFields.map(field => ({
//                text: field,   // nombre moneda
//                value: row[field],
//                leaf: true
//            }));
//
//            return {
//                text: row.PROCESSOR,  // nodo padre
//                STVAL: row.STVAL,
//                children: children
//            };
//        });
//
//        const newStore = Ext.create('Ext.data.TreeStore', {
//            root: {
//                expanded: true,
//                children: treeData
//            }
//        });
//        
//        console.log("newStore", newStore) ;
//        
//        // Reconfigurar el grid con store + columnas 
//        view.reconfigure(newStore, finalColumns);
//        
//        // opcional: forzar refresco de vista
////        view.getView().refresh();
//    
//        return;
//        
//    },


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
            view.reconfigure(Ext.create('Ext.data.Store', { fields: [], data: [] }), []); // limpiar grid
            return;
        }
        
        // Campos estáticos
        const staticFields = ['CCUST', 'PROCTYPE', 'PROCTYPESQ', 'STVAL', 'PROCESSOR', 'STATUS'];
        
        // Obtener campos dinámicos (monedas) excluyendo los estáticos
        const currencyFields = Object.keys(firstRow).filter(key => !staticFields.includes(key));

        console.log('Currency fields found:', currencyFields);
        console.log('Sample data First Row:', firstRow);


        // Construir columnas estáticas que siempre quiero mostrar ---
        const staticColumns = [
            { 
                 text: 'Processor', dataIndex: 'PROCESSOR', width: 160, locked: true },
            {
                text: 'Status', dataIndex: 'STVAL', width: 150, locked: true,
                renderer: function (value, meta, rec) {
                    return rec.data.STATUS || value; 
                }
            }
        ];


        // Crear las columnas dinámicas
        const dynamicCurrencyColumns = currencyFields.map(field => ({
            text: field,
            dataIndex: field,
            width: 120,
            align: 'right',
            renderer: function (v) {
                if (v === null || v === undefined) return '';
                return Ext.util.Format.number(v, '0,000.00');
            }
//            renderer: Ext.util.Format.numberRenderer('0,0.00') // ejemplo: formato numérico
        }));
        
        console.log("dynamicCurrencyColumns", dynamicCurrencyColumns) ;
        
        // --- Agrupar las columnas dinámicas dentro de Amount ---
        const amountGroupColumn = {
            text: 'Amount',
            // usa itemId para buscar más tarde si necesitas
            itemId: prototype.id + '-Amount',
            // id si lo quieres en el ComponentManager: id: prototype.id + '-Amount'
            columns: dynamicCurrencyColumns
        };

        // --- Columnas finales para el grid ---
        const finalColumns = [...staticColumns, amountGroupColumn];
        
        
        // --- Crear store dinámico con los campos correctos ---
        const storeFields = [...staticFields, ...currencyFields];
        const newStore = Ext.create('Ext.data.Store', {
            fields: storeFields,
            data: data
        });
        
        console.log("newStore", newStore) ;
        
        // Reconfigurar el grid con store + columnas 
        view.reconfigure(newStore, finalColumns);
        
        // opcional: forzar refresco de vista
//        view.getView().refresh();
    
        return;
        
    },

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
            
            const staticFields = ['CCUST', 'PROCTYPE', 'PROCTYPESQ', 'STVAL', 'PROCESSOR', 'STATUS'];
            const firstRow = data[0] || {};
            const currencyFields = Object.keys(firstRow).filter(key => !staticFields.includes(key));

           
            let excel = data.map(row => {
                // armar objeto para excel
                let obj = {
                    'Processor': row.PROCESSOR,
                    'Status': row.STATUS
                };

                // añadir dinámicos (monedas)
                currencyFields.forEach(field => {
                    obj[field] = row[field];
                });

                return obj;
            });

            // Generar Excel
            await global.writeExcelFromJson(excel, 'Summary Analytics Payments');
            
        } catch (e) {
            console.log(e);
        }
        finally {
            view.setLoading(false);
        }
    }

});

