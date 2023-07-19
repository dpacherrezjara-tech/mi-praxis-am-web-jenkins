/* global fetch, global */

Ext.define('Ext.Praxis.controller.sales.SalesReport.DataEntryFOPVoidController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryFOPVoidController',
    urlWin01: CONTEXTPATH + '/SalesReport/loadVoidFop',
    //<editor-fold defaultstate="collapsed" desc="variables">
    objSt: '',
    objReq: {},
    //</editor-fold>
    init: function (view) {
        let me = this;
        me.objReq = me.view.params.objReq;
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        let me = this;
        me.view.mask('Loading...');
        me.setStoresGrid();
        me.getDataInputs();
    },
    setStoresGrid: function () {
        let grid = Ext.getCmp(prototype.idVoidFOP + '-det-gridDataVoidFOP');

        let store = Ext.create('Ext.data.Store', {
            storeId: prototype.idVoidFOP + '-store-gridVoidFOP'
        });

        grid.setStore(store);
    },
    getDataInputs: function () {
        let me = this;
        let store = Ext.StoreMgr.lookup(prototype.idVoidFOP + '-store-gridVoidFOP');
        fetch(me.urlWin01 + '?' + new URLSearchParams(me.objReq)).then(async res => {
            await res.json().then(data=>{
                //console.log(data);
                store.loadData(data);
                me.view.unmask();
            });
        }).catch(err=>{
            //console.error(err);
            global.Msg({
                msg:'Data not Found'
            });
            me.view.close();
        });
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onAmountRenderer: function (field, newValue, oldValue) {
        field.setValue(Ext.util.Format.number(newValue, '0,000.00'));
    },
    onClickCancel: function (btn) {
        this.view.close();
    }
});
