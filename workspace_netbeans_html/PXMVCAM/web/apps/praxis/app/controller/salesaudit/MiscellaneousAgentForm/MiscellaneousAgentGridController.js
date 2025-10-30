Ext.define('Ext.Praxis.controller.salesaudit.MiscellaneousAgentForm.MiscellaneousAgentGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MiscellaneousAgentGridController',
    afterRender: function (obj, e) {
        const me = this; //call controller
        const view = me.view; // call view design
//        console.log('busqueda-----', view);
        this.getData(view);
    },
    getData: async function (view) {
//        console.log('getdata');
//        console.log('into new  view.searchParams', view.searchParams);
        let store = global.callStorePaggin('PXSAUDIT', 'SQP05649', view.searchParams);
        console.log('store MiscellaneousAgentGridController', store);

        this.view.setStore(store);
    },

    downloadExcelSetrlBalancesCntl: function () {  //modal confirmar descarga
        const me = this;
        const notifier = new AWN();
        notifier.confirm(
                'Download Excel',
                () => {
            me.onDownloadExcel();
        },
                null
                );
    },
    onDownloadExcel: async function () {
        const me = this;
        const view = me.view;
        view.setLoading(true);
        let res = await global.callStorePagginExcel('PXSAUDIT', 'SQP05649', view.searchParams);  //trae toda la data completa

        console.log('res excel', res)
        const data = (res?.length > 0)
                ? res.map(x => ({
                        'Key1': x.A4593KEY1,
                        'Key2': x.A4593KEY2,
                        'Key3': x.A4593KEY3,
                        'Description1': x.SEQROLL,
                        'Description2': x.A4593DESC1,
                        'Status': x.A4593DESC2,
                        'Comment': x.A4593COMEN,
                        'User Created': x.A4593USCR,
                        'Created DateTime': x.A4593TSCR,
                        'User Update': x.A4593USUP,
                        'User DateTime': x.A4593TSUP,
                    }))
                : [{
                        'Key1': "",
                        'Key2': "",
                        'Key3': "",
                        'Description1': "",
                        'Description2': "",
                        'Status': "",
                        'Comment': "",
                        'User Created': "",
                        'Created DateTime': "",
                        'User Update': "",
                        'User DateTime': "",
                    }];


        await global.writeExcelFromJson(data, 'Miscellaneous Agent'); // formatea la data para usarlo en la función de descarga
        view.setLoading(false);
    },

    detailDataEntryMiscellaneousAgent: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
//        console.log('click edit', this);
        console.log('record.data', record.data)
        //const obj = record.data;
        const me = this;


        const  {A4593CCUST, A4593COMEN, A4593DESC1, A4593DESC2, A4593KEY1, A4593KEY2, A4593KEY3, A4593STS, A4593USCR, A4593USUP} = record.data;



        let params = {
            "IN_A4593CCUST": "139",
            "IN_A4593KEY1": A4593KEY1,
            "IN_A4593KEY2": A4593KEY2,
            "IN_A4593KEY3": A4593KEY3,
        };

        const dataEntry = Ext.create('Ext.Praxis.view.salesaudit.MiscellaneousAgentForm.DataEntrys.DataEntryMiscellaneousAgentForm', {
            id: prototype.id + '-DataEntryMiscellaneousAgentForm',
            searchParams: params,
            option: 'U',

            callback: () => {
                grid.getStore().load();
            }
        });
        dataEntry.show();
    },

    onDeleteClick: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        console.log('delete');

        console.log('data delete', record.data);


        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to delete?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.deleteIATA(record.data);
                        }
                    }
                });

    },

    deleteIATA: async function (dataI) {
        const me = this;
        const view = me.getView(); // Asegúrate de que 'me.getView()' funciona en tu contexto

        const {
            A4593KEY1, A4593KEY2, A4593KEY3,
            A4593DESC1, A4593DESC2, A4593STS,
            A4593COMEN, A4593USCR, A4593TSCR,
            A4593USUP, A4593TSUP
        } = dataI;

        const params = {
            IN_A4593KEY1: A4593KEY1,
            IN_A4593KEY2: A4593KEY2,
            IN_A4593KEY3: A4593KEY3,
            IN_A4593DESC1: A4593DESC1,
            IN_A4593DESC2: A4593DESC2,
            IN_A4593STS: A4593STS,
            IN_A4593COMEN: A4593COMEN,
            IN_A4593USCR: A4593USCR,
            IN_A4593TSCR: A4593TSCR,
            IN_A4593USUP: A4593USUP,
            IN_A4593TSUP: A4593TSUP,
            IN_A4593CCUST: '139',
            IN_OPTION: 'D'
        };

        try {
            view.setLoading(true);
            const res = await global.callStorePost('PXSAUDIT', 'SQP05402', params);
            const {lstVals} = res.data;
            new AWN().success(lstVals.OUT_MSG);
//            view.close();
        } catch (e) {
            console.error(e);
            new AWN().alert('Error while deleting');
        } finally {
            view.setLoading(false);
            me.getData(view);
        }
    },

});


