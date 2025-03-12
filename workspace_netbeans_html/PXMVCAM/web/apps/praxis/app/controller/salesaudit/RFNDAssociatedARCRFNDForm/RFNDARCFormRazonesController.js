/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.RFNDAssociatedARCRFNDForm.RFNDARCFormRazonesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RFNDARCFormRazonesController',
    beanTMP: {},
    beanGrid: [],
    urlWin01: CONTEXTPATH + '/RFNDAssociatedARCRFNDForm',
    urlWin02: '',
    init: function (view) {
        var me = this;
        //console.log(this.view.params);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        // console.log(this.view.params)

        //this.urlWin01 = Ext.String.trim(this.view.params.url01);

        this.setStoresGrid();
    },
    setStoresGrid: function () {
        var grid01 = Ext.getCmp(prototype.idRFNDARCFormRazones + '-gridControlRazon');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRFNDARCFormRazones + '-store-grid01',
            groupField: 'A4360FAMIL',
            groupDir: 'DESC',
            fields: [
                {name: 'A4360CODRZ', type: 'string'},
                {name: 'A4360FAMIL', type: 'string'},
                {name: 'A4360COMES', type: 'string'}
            ],
            sorters: [
                {property: 'A4360FAMIL', direction: 'DESC'}
            ],
            proxy: {
                type: 'ajax',
                url: this.urlWin01 + '/SearchRFNDRazon',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid01.setStore(store01);

        this.OnLoadDataAfterRender();
    },
    OnLoadDataAfterRender: function () {
        this.beanTMP.IN_PAIS = this.view.params.vl_pais;

        var grid01 = Ext.getCmp(prototype.idRFNDARCFormRazones + '-gridControlRazon');

        grid01.getStore().loadPage(1, {
            params: this.beanTMP,
            callback: function () {

            }
        });
    },
    OnRendererColumnDescription: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return value;
    },
    OnChkRFNDHandler: function (grid, rowIndex, colIndex, item, e, record) {

        var me = this;
        //console.log(me.view.params.params);
        var grid03 = Ext.getCmp(prototype.idARCDetailTicket + '-gridRazonesTkt');
        var regs = grid03.getStore().getCount();
        var beanDatos = {};
        var rec = record;



        beanDatos.A4362CODE = rec.get('A4360CODRZ');
        beanDatos.A4362ERROR = rec.get('A4360COMEN');
        beanDatos.A4362TYPE = 'AM';
        beanDatos.A4362CORRL = '';
        beanDatos.A4362PREME = me.view.params.params.A4363PREME;
        beanDatos.A4362ANIO = me.view.params.params.A4363ANIO;
        // alert(this.beanDatos.A3403CODE);
        beanDatos.A4362FAMIL = rec.get('A4360FAMIL');
        for (var i = 0; i < regs; i++) {
            if (grid03.getStore().getAt(i).get('A4362CODE') === beanDatos.A4362CODE) {
                global.Msg({msg: "EXISTS RECORD !", icon: 2, fn: function () {
                    }});
                return;
            }
        }
        grid03.getStore().add(beanDatos);






    },
    OnChkRFNDIsDisabled: function (view, rowindex, colIndex, item, record) {
        var status = false;
        if (record.get('A4360CCUST') !== '139') {
            status = true;
        }
        return status;
    }

});