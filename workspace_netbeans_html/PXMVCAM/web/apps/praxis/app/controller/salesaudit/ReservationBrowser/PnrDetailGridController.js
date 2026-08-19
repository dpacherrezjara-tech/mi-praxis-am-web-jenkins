Ext.define('Ext.Praxis.controller.salesaudit.ReservationBrowser.PnrDetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PnrDetailGridController',
    url: CONTEXTPATH + '/ReservationBrowser',
    init: function (view) {
        if (view.backButton) {
            Ext.getCmp(prototype.id + '-backButton-1').show();
        }
    },
    afterRender: async function () {
        this.getData();
    },
    getData: async function () {
        const me = this;
        const view = me.view;
        me.view.setLoading(true);
        try {
            let res = await global.callStorePaggin('PXSAUDIT', 'SQP05832', view.searchParams);
            const data = res;
            console.log("data store", data);

            if (data && data.length > 0) {
                console.log("Datos encontrados:", data.length);
            }
            view.setStore(data);
        } catch (e) {
            console.error(e);
        } finally {
            me.view.setLoading(false);
        }

    },
    onClickBackButton: function () {
        const me = this.view;
        if (me.backButton) {
            me.backButton();
        }
    },
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    getCmp: function ({ id }) {
        return Ext.getCmp(prototype.id + id);
    },
    setComboStore: function ({ cmp, data, valueField, displayField, value }) {
        const me = this;
        cmp.suspendEvents(false);
        cmp.bindStore(me.createComboStore({
            data: data
            , valueField: valueField, displayField: displayField
        }));
        cmp.setValue(value);
        cmp.resumeEvents();
    },
    createComboStore: function ({ data, valueField, displayField }) {
        //crea record vacio
        let allRecord = {};
        allRecord[displayField] = 'All';
        allRecord[valueField] = '';
        //limpia record de data
        data.forEach(obj => {
            for (let attr in obj) {
                if (typeof obj[attr] === 'string') {
                    obj[attr] = obj[attr].trimEnd();
                }
            }
        });
        //crea Store
        let store = this.createStore({ data: data });
        //inserta record vacio
        store.insert(0, allRecord);
        //console.log('store creado',store);
        return store;
    },
    createArrayStore: function ({ data }) {
        const store = new Ext.data.SimpleStore({
            fields: ['code', 'name'],
            data: data.map(x => {
                return [x.code, x.name];
            })
        });
        return store;
    },
    createStore: function ({ data }) {
        return Ext.create('Ext.data.Store', {
            autoLoad: true,
            data: data,
            pageSize: 20
        });
    },
    parseInt: function (number) {
        if (number && number !== '') {
            return parseInt(number);
        }
        ;
        return number;
    },
    getDistinct: function (lst, key) {
        let valoresVistos = {};
        // Filtra el array para eliminar duplicados según la columna "nombre"
        let resultado = lst.filter(function (item) {
            if (valoresVistos[item[key]]) {
                // Si el valor ya se ha visto, exclúyelo
                return false;
            }
            // Si es la primera vez que se ve, márcalo como visto y manténlo en el resultado
            valoresVistos[item[key]] = true;
            return true;
        });
        return resultado;
    },
    downloadExcel: async function () {
        const me = this;
        const view = me.view;

        view.setLoading(true);
        try {
            let data = await global.callStorePagginExcel('PXSAUDIT', 'SQP05832', view.searchParams);

            if (data.length === 0) {
                global.Msg({ msg: 'Data not Found' });
                view.setLoading(false);
                return;
            }

            let excel = data.map(x => ({
                'Id': x.ID,
                'Processing Date': x.PRDA,
                'PNR': x.PNR,
                'PNR Sabre': x.PNRAA,
                'Source': x.FUENTE,
                'Sabre Code': x.SRCODE,
                'Process': x.SRTYPE,
                'Sequence': x.RPH,
                'Type': x.TYPE,
                'Description': x.DESCRIP
            }));

            await global.writeExcelFromJson(excel, 'Tickets Sabre Information');
            view.setLoading(false);

        } catch (e) {
            console.log(e);
            view.setLoading(false);

        }
    },
    //</editor-fold>
});