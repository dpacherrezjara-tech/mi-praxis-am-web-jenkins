Ext.define('Ext.Praxis.controller.salesaudit.ReservationBrowser.ReservationBrowserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ReservationBrowserController',
    url: CONTEXTPATH + '/ReservationBrowser',
    init: function (view) {
        prototype.id = 'ReservationBrowserForm';
        prototype.url = CONTEXTPATH + '/ReservationBrowser';
    },
    afterRender: async function () {
        this.onClickSearchBtn();
    },
    formatSearchParams: function () {
        const formFilters = Ext.getCmp(prototype.id + '-formFilters')
                .getForm();
        let params = Object.assign({}, formFilters.getValues());
        params.IN_CCUST = '139';
        console.log('Parametros: ', params);
        return params;
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onClickSearchBtn: function () {
        this.searchReservations();
    },
    onChangeType: function (obj) {
        const txtTicket = Ext.getCmp(prototype.id + '-txtTicket');
        const txtPaxname = Ext.getCmp(prototype.id + '-txtPaxname');
        if (obj.value === 'T') {
            txtTicket.show();
            txtPaxname.show();
        } else {
            txtTicket.hide();
            txtPaxname.hide();
        }
    },
    onClickRobot: function () {
        const robotWin = Ext.create('Ext.Praxis.view.salesaudit.ReservationBrowserForm.DataEntrys.RobotSabreDataEntry', {
            id: prototype.id + '-RobotSabreDataEntry-1'
        });
        robotWin.show();
    },
    onClickLoadRobot: function () {
        const robotWin = Ext.create('Ext.Praxis.view.salesaudit.ReservationBrowserForm.DataEntrys.RobotExecutorDataEntry', {
            id: prototype.id + '-RobotExecutorDataEntry-1'
        });
        robotWin.show();
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
    onClickFilterBtn: function () {
        const panelFilters = Ext.getCmp(prototype.id + '-formFilters');
        if (panelFilters.isVisible())
            panelFilters.hide();
        else
            panelFilters.show();
    },
    onClearOptionsBtn:function(){
        const panelFilters = Ext.getCmp(prototype.id + '-formFilters');
        panelFilters.reset();
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Functions">
    searchReservations: function () {
        const me = this;
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        let params = me.formatSearchParams();
        if (params.IN_OPTION === 'P') {
            const pnrsGrid = Ext.create('Ext.Praxis.view.salesaudit.ReservationBrowserForm.Grids.PnrsGrid', {
                id: prototype.id + '-PnrsGrid-1',
                searchParams: params
            });
            mainPanel.add(pnrsGrid);
        } else {
            const ticketsGrid = Ext.create('Ext.Praxis.view.salesaudit.ReservationBrowserForm.Grids.TicketsGrid', {
                id: prototype.id + '-TicketsGrid-1',
                searchParams: params
            });
            mainPanel.add(ticketsGrid);
        }
    },
    //</editor-fold>
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