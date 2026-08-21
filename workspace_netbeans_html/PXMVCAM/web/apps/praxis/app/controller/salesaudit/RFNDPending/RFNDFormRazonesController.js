/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.RFNDPending.RFNDFormRazonesController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RFNDFormRazonesController',
    beanTMP: {},
    beanGrid: [],
    urlWin01: CONTEXTPATH + '/RFNDPending',
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
        var grid01 = Ext.getCmp(prototype.id04 + '-gridControlRazon');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id04 + '-store-grid01',
            groupField: 'A3651FAMIL',
            groupDir: 'DESC',
            fields: [
                {name: 'A3651CODRZ', type: 'string'},
                {name: 'A3651FAMIL', type: 'string'},
                {name: 'A3651COMES', type: 'string'}
            ],
            sorters: [
                {property: 'A3651FAMIL', direction: 'DESC'}
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

        var grid01 = Ext.getCmp(prototype.id04 + '-gridControlRazon');

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
        if (this.view.params.type === '2') {
            var me = this;
             //console.log(me.view.params.params);
            var grid03 = Ext.getCmp(prototype.id2 + '-gridRazonesTkt');
            var regs = grid03.getStore().getCount();
            var beanDatos = {};
            var rec = record;
            if (rec.get('IN_COMENT') === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Select Language !');
                return;
            }
            if (rec.get('IN_COMENT') === 'SP') {
                beanDatos.A3649ERROR = rec.get('A3651COMES');
            }
            if (rec.get('IN_COMENT') === 'EN') {
                beanDatos.A3649ERROR = rec.get('A3651COMEN');
            }
            if (rec.get('IN_COMENT') === 'PO') {
                beanDatos.A3649ERROR = rec.get('A3651COMPO');
            }
            if (rec.get('IN_COMENT') === 'FR') {
                beanDatos.A3649ERROR = rec.get('A3651COMFR');
            }
            beanDatos.A3649CODE = rec.get('A3651CODRZ');
            beanDatos.A3649TYPE = 'AM';
             beanDatos.A3649CORRL = '';
             beanDatos.A3649PREME=me.view.params.params.A3648PREME;
             beanDatos.A3649ANIO=me.view.params.params.A3648ANIO;
            // alert(this.beanDatos.A3403CODE);
            beanDatos.A3649FAMIL = rec.get('A3651FAMIL');
            for (var i = 0; i < regs; i++) {
                if (grid03.getStore().getAt(i).get('A3649CODE') === beanDatos.A3649CODE) {
                    global.Msg({msg: "EXISTS RECORD !", icon: 2, fn: function () {
                        }});
                    return;
                }
            }
            grid03.getStore().add(beanDatos);
        } else {
            var grid03 = Ext.getCmp(prototype.id01 + '-gridRazones');
            var regs = grid03.getStore().getCount();
            var beanDatos = {};
            var rec = record;
            if (rec.get('IN_COMENT') === '') {
                Ext.Msg.alert('.: PRAXIS :.', 'Select Language !');
                return;
            }
            Ext.getCmp(prototype.id01 + '-txtIdioma').setValue(rec.get('IN_COMENT'));
            if (rec.get('IN_COMENT') === 'SP') {
                beanDatos.A3649ERROR = rec.get('A3651COMES');
            }
            if (rec.get('IN_COMENT') === 'EN') {
                beanDatos.A3649ERROR = rec.get('A3651COMEN');
            }
            if (rec.get('IN_COMENT') === 'PO') {
                beanDatos.A3649ERROR = rec.get('A3651COMPO');
            }
            if (rec.get('IN_COMENT') === 'FR') {
                beanDatos.A3649ERROR = rec.get('A3651COMFR');
            }
            beanDatos.A3649CODE = rec.get('A3651CODRZ');
            beanDatos.A3649TYPE = 'AM';
            // alert(this.beanDatos.A3403CODE);
            beanDatos.A3649FAMIL = rec.get('A3651FAMIL');
            for (var i = 0; i < regs; i++) {
                if (grid03.getStore().getAt(i).get('A3649CODE') === beanDatos.A3649CODE && grid03.getStore().getAt(i).get('A3649TYPE')==='AM') {
                    global.Msg({msg: "EXISTS RECORD !", icon: 2, fn: function () {
                        }});
                    return;
                }
            }
            grid03.getStore().add(beanDatos);
        }

        //var rec = grid.getStore().getAt(rowIndex);






    },
    OnChkRFNDIsDisabled: function (view, rowindex, colIndex, item, record) {
        var status = false;
        if (record.get('A3651CCUST') !== '139') {
            status = true;
        }
        return status;
    }

});