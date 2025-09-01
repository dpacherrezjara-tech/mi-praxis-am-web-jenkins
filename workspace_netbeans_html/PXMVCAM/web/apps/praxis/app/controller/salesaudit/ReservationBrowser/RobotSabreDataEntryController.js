Ext.define('Ext.Praxis.controller.salesaudit.ReservationBrowser.RobotSabreDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RobotSabreDataEntryController',
    url: CONTEXTPATH + '/ReservationBrowser',
    init: function (view) {
    },
    afterRender: async function () {
        this.getData();
    },
    getData: async function () {
        let me = this;
        let grid = Ext.getCmp(prototype.idDE + '-gridLog');
        grid.mask('Loading...');
        let params = me.formatParameters();
        let res = await fetch(`${me.url}/loadRobotLog?${new URLSearchParams(params)}`);
        
        if (res.ok) {
            const data = await res.json();
            let store = new Ext.data.Store({
                data: data.response,
                autoLoad: true
            });
            grid.setStore(store);
        }
        grid.unmask();
    },
    onClickSearchBtn: function () {
        this.getData();
    },
    formatParameters: function () {
        const formFilters = Ext.getCmp(prototype.idDE + '-filtersForm').getForm();
        let params = Object.assign({}, formFilters.getValues());
        params.IN_CCUST = '139';
        return params;
    },
    onExecuteRobotClick: async function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let me = this;
        
        let params = {
            OPTION: 'P',
            CCUST: '139',
            FECR : record.data.FECR,
            CUUID: record.data.CUUID
        };
        me.view.mask('Loading...');
        let res = await fetch(`${me.url}/executeRobot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        });
        
        me.view.unmask();
        if (res.ok) {
            const data = await res.json();
            console.log("dp: RobotSabreDataEntryController data = ", data);
            let status = parseInt(data.status);
            let message = data.message;
            
            if (status === 200) {
                Ext.Msg.alert('Éxito', message, function () {
                    me.getData(); // Recarga la grilla luego del OK
                });
            } else {
                Ext.Msg.alert('Atención', 'El proceso no se ejecutó correctamente: ' + message);
            }
        }
    },
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    getCmp: function ( {id}){
        return Ext.getCmp(prototype.id + id);
    },
    setComboStore: function ( {cmp, data, valueField, displayField, value}){
        const me = this;
        cmp.suspendEvents(false);
        cmp.bindStore(me.createComboStore({data: data
            , valueField: valueField, displayField: displayField}));
        cmp.setValue(value);
        cmp.resumeEvents();
    },
    createComboStore: function ( {data, valueField, displayField}) {
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
        let store = this.createStore({data: data});
        //inserta record vacio
        store.insert(0, allRecord);
        //console.log('store creado',store);
        return store;
    },
    createArrayStore: function ( {data}){
        const store = new Ext.data.SimpleStore({
            fields: ['code', 'name'],
            data: data.map(x => {
                return [x.code, x.name];
            })
        });
        return store;
    },
    createStore: function ( {data}){
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
    }
    //</editor-fold>
});