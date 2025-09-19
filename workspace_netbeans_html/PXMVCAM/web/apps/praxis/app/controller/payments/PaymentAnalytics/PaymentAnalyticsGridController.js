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


    getData: async function () {
        const me = this;
        const view = me.view;

        let storeResponse = await global.callStoreGet('PRAXISMP', 'SQP05725', view.searchParams);
        let data = storeResponse?.lstRs || [];

        if (!data.length) {
            global.Msg({msg: 'Data not Found'});
            return;
        }

        const sample = data[0];

        // Campos estáticos que siempre están presentes
        const staticFields = ['CCUST', 'PROCTYPE', 'PROCTYPESQ', 'STVAL', 'PROCESSOR', 'STATUS'];

        // Obtener campos dinámicos (monedas) excluyendo los estáticos
        const currencyFields = Object.keys(sample).filter(key => !staticFields.includes(key));

        console.log('Currency fields found:', currencyFields);
        console.log('Sample data:', sample);


        // Crear un nuevo store con la configuración correcta
        const newStore = Ext.create('Ext.data.Store', {
            fields: [...staticFields, ...currencyFields],
            data: data
        });

        // Reconfigurar las columnas del grid dinámicamente
        if (currencyFields.length > 0) {
            // Crear columnas dinámicas para cada moneda
            const currencyColumns = currencyFields.map(currency => ({
                    text: currency,
                    dataIndex: currency,
                    width: 80,
                    align: 'right',
                    menuDisabled: true,
                    sortable: false,
                    renderer: function (value) {
                        // Formatear números con decimales
                        if (value === null || value === undefined || value === 0)
                            return '0.00';
                        return parseFloat(value).toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        });
                    }
                }));

            // Crear la configuración completa de columnas
            const newColumns = [
                {
                    text: 'Processor',
                    dataIndex: 'PROCESSOR',
                    width: 200,
                    align: 'left',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value) {
                        return value ? value.trim() : '';
                    }
                },
                {
                    text: 'Status',
                    dataIndex: 'STVAL',
                    width: 150,
                    align: 'left',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value, metaData, record) {
                        const status = record.data.STATUS;
                        return status ? status.trim() : value;
                    }
                },
                {
                    text: 'Amount',
                    columns: currencyColumns
                }
            ];

            // Reconfigurar el grid con el nuevo store y columnas
            view.reconfigure(newStore, newColumns);

        } else {
            // Si no hay campos de monedas, solo configurar las columnas básicas
            const basicColumns = [
                {
                    text: 'Processor',
                    dataIndex: 'PROCESSOR',
                    width: 200,
                    align: 'left',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value) {
                        return value ? value.trim() : '';
                    }
                },
                {
                    text: 'Status',
                    dataIndex: 'STVAL',
                    width: 150,
                    align: 'left',
                    menuDisabled: true,
                    sortable: true,
                    renderer: function (value, metaData, record) {
                        const status = record.data.STATUS;
                        return status ? status.trim() : value;
                    }
                }
            ];

            view.reconfigure(newStore, basicColumns);
        }
    },

    downloadExcel: function (btn) {
        const me = this;
        let params = Object.assign({}, me.view.searchParams);
        params.excel = true;
        console.log(params);
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
        let res = await global.callStorePagginExcel('PRAXISMP', 'SQP05725', view.searchParams); //trae toda la data completa

        const data = (res?.length > 0)
                ? res.map(x => ({
                        Ticket: x.TICKET
                    }))
                : [{
                        Ticket: ""
                    }];
        await global.writeExcelFromJson(data, 'SettlBalances Information'); // formatea la data para usarlo en la función de descarga
        view.setLoading(false);
    }


});


