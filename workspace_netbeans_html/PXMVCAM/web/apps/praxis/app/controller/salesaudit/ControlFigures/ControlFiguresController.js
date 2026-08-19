/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.ControlFigures.ControlFiguresController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ControlFiguresController',
    fecha: new Date(),
    childs: '5',
    bean: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    panelActual: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        me = this;
        prototype.id = 'ControlFiguresForm';
        prototype.url = CONTEXTPATH + '/ControlFiguresSa';
        prototype.urlMaster = CONTEXTPATH + '/MasterController';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);

        this.control({
            // -------------------Eventos Genericos --------------------
            '#ControlFiguresForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#ControlFiguresForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ControlFiguresForm-btnClear': {
                click: this.btnClear_click
            },
            '#ControlFiguresForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ControlFiguresForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ControlFiguresForm-btnBack': {
                click: this.btnBack_click
            },
            '#ControlFiguresForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ControlFiguresForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ControlFiguresForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ControlFiguresForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#ControlFiguresForm-btnLoad0': {
                click: this.onClickBtnLoad0
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        this.setStoreData();
        //this.btnSearch_click();
    },
    eventKey: function(e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function() {

        var ComboBy = Ext.getCmp(prototype.id + '-ComboBy');
        ComboBy.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["1", "Processing Date"]
                        //["2", "System Date"]
            ]
        }));

    },
    setFormatParameter: function() {

        me.bean = {};
        me.bean.OPCIONTYPE = Ext.getCmp(prototype.id + '-ComboBy').getValue();
        me.bean.DATEFROM = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFilterDateFrom').getValue(), 'Ymd');
        me.bean.DATETO = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFilterDateTo').getValue(), 'Ymd');
        if (me.bean.OPCIONTYPE === '2') {
            me.bean.COMBOBY = '0';
            me.bean.DATEFROM = '';
            me.bean.DATETO = '';
        } else {
            me.bean.CIA = '';
            me.bean.NUMBERADM = '';
        }

        var beanString = JSON.stringify(me.bean);
        searchParams = {
            bean: me.bean,
            beanString: beanString
        };
        console.log(me.bean);
    },
    btnSearch_click: function(obj, e) {
        this.hideResumen();
        this.setFormatParameter();
        this.setGridData();
    },
    // <editor-fold defaultstate="collapsed" desc="setGridData">

    setGridData: function() {
        win.lblUser_toolTip("Estructura: search");

        me.panelActual = '-panelGridData';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        me.setWidthPie();
        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            var storeGridDatas = Ext.create('Ext.Praxis.store.salesAudit.GridData', {
                proxy: {
                    url: prototype.url + '/search'
                }, listeners: {

                    beforeload: function (obj) {
                        obj.proxy.extraParams = searchParams;
//                        const panelResumen = Ext.getCmp(prototype.id + '-panelResumen');
//                        panelResumen.getEl().mask('Loading...', 'x-mask-loading');
                    },
                    load: function (store, records, successful) {

                        var pag = Ext.getCmp(prototype.id + '-paggin');
                        var pagData = pag.getPageData();

                        Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                        Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));

                        // Verificar si existen registros
                        if (!records || records.length === 0) {
//                            const panelResumen = Ext.getCmp(prototype.id + '-panelResumen');
//                            panelResumen.getEl().unmask();
                            return global.Msg({msg: 'Data not found.'});
                        }

                        const raw = store.getProxy().getReader().rawData || {};
                        const first = records[0];

                        Ext.getCmp(prototype.id + '-txaReference').setValue(first.get('DESCR'));
                        me.getDataResumen(raw);


                    }}
            });
            global.clear();

            console.log('storeGridDatas', storeGridDatas)
            Ext.getCmp(prototype.id + '-gridData').setStore(storeGridDatas);
            Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
        }
    },
    // </editor-fold>



    validateFields: function() {
        var msj = '';
        var bean = searchParams.bean;

        if (bean.DATEFROM !== '') {
            if (bean.DATETO === '') {
                msj = 'Enter Date To';
            }
        }
        if (bean.DATETO !== '') {
            if (bean.DATEFROM === '') {
                msj = 'Enter Date From';
            }
        }
        return msj;
    },
    onClickBtnLoad0: function() {
        Ext.create('Ext.Praxis.view.salesaudit.ControlFiguresForm.DataEntry', {
            id: prototype.id + '-dataEntry',
            params: {
//                action: action,
//                rec: rec
            }
        }).show();

    },
    btnBack_click: function(obj, e) {

        if (me.drillDown.length > 0) {
            me.panelActual = me.drillDown.pop();
            global.selectedChild(me.childs, prototype.id + me.panelActual);
            me.setWidthPie();

            this.getPaggin();
            if (me.pagginActual !== '') {
                var pag = Ext.getCmp(prototype.id + me.pagginActual);
                var pagData = pag.getPageData();
                Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
            }
        } else {
            global.showMenu();
        }
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtFilterDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtFilterDateTo').setValue('');
        //Ext.getCmp(prototype.id + '-ComboType').setValue('');
        //Ext.getCmp(prototype.id + '-txtPais').setValue('');
        //Ext.getCmp(prototype.id + '-ComboStatus').setValue('A');

    },
    btnExcel_click: function(obj, e) {

        this.setFormatParameter();
        var msj = this.validateFields();
        if (msj !== '') {
            global.Msg({msg: msj
            });
        } else {
            Ext.Msg.show({
                title: '.:PRAXIS:.',
                msg: 'Download Excel ?',
                buttons: Ext.MessageBox.OKCANCEL,
                scope: this,
                icon: Ext.MessageBox.QUESTION,
                modal: true,
                fn: function(btn) {
                    if (btn === 'ok') {
                        this.exportExcel();
                    }
                }
            });
        }
    },
    exportExcel: function() {
        this.setFormatParameter();
        switch (me.panelActual) {
            case  '-panelGridData':
                global.getFile(prototype.url + '/getXLSX?beanString=' + searchParams.beanString);
                break;
            default:
                global.Msg(
                        {msg: 'Under Construction'
                        });
        }

    },
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-panelFilters1');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    setWidthPie: function() {
        var ancho = Ext.getCmp(prototype.id + me.panelActual).getWidth();
        Ext.getCmp(prototype.id + '-panelPie').setWidth(ancho);
    },
    getPaggin: function() {
        me.pagginActual = '';
        switch (me.panelActual) {
            case  '-panelGridData':
                me.pagginActual = '-paggin';
                break;
        }
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveFirst();
    }, pagPrevious: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveNext();
    },
    pagLast: function(obj, e) {
        this.getPaggin();
        var pag = Ext.getCmp(prototype.id + me.pagginActual);
        pag.moveLast();
    },
    getInt: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000');
    },
    getDouble: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getText: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:left';
        return value;
    },
    getDoubleColor1: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#F2FAFC';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor2: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#DFF0ED';
        return Ext.util.Format.number(value, '0,000.00');
    },
    getDoubleColor3: function(value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = 'text-align:right;background:#FCF5F2';
        return Ext.util.Format.number(value, '0,000.00');
    },

    getDataResumen: function (raw) {
//        console.log('getDataResumen', raw);

        const mapData = (arr) => {
            return (arr || []).map(item => ({
                    TRX: item.TRX || '',
                    BSP: item.CANTBSP || 0,
                    ARC: item.CANTARC || 0,
                    ASR: item.TRX === 'EXONERATED' ? (item.DIF + item.CANTASR) : (item.CANTASR || 0),
                    MANUAL: item.CANTMAN || 0,
                    DIF: item.DIF || 0
                }));
        };

        const pintarGrid = (panelId, data) => {
            const panel = Ext.getCmp(prototype.id + panelId);

//            const panelResumen = Ext.getCmp(prototype.id + '-panelResumen');
//            
//            panelResumen.getEl().mask('Loading...', 'x-mask-loading');

            if (!panel) return;

            const grid = panel.down('grid');
            if (!grid)
                return;


            if (!data || data.length === 0) {
                panel.hide();
                return;
            }

            panel.show();

            const mapped = mapData(data);
            const store = grid.getStore() || Ext.create('Ext.data.Store', {
                fields: ['TRX', 'BSP', 'ARC', 'ASR', 'MANUAL', 'DIF']
            });
            store.loadData(mapped);
            grid.bindStore(store);

            const firstColumn = grid.columns[0];
            if (firstColumn) {
                firstColumn.renderer = function (value, meta, record) {
                    meta.style = "background-color:#F0F0F0; font-weight:bold;";
                    return record.get('TRX');
                };
            }
        };

        const calcularTotal = (arr) => {
            const data = mapData(arr);
            return data.reduce((acc, rec) => acc + rec.BSP + rec.ARC + rec.ASR + rec.MANUAL, 0);
        };

        const setValorTotal = (id, valor) => {
            const cmp = Ext.getCmp(prototype.id + id);
            if (cmp)
                cmp.setValue(Ext.util.Format.number(valor, '0,000.00'));
        };
        
//        panelResumen.getEl().unmask();


        setValorTotal('-TOTALVENTAS', calcularTotal(raw.ventas || []));
        setValorTotal('-TOTALAUDITORIA', calcularTotal(raw.auditoria || []));
        setValorTotal('-TOTALRESTANTE', calcularTotal(raw.restante || []));

        pintarGrid('-gridVentas', raw.ventas || []);
        pintarGrid('-gridAuditoria', raw.auditoria || []);
        pintarGrid('-gridRestante', raw.restante || []);

        

    },

    hideResumen: function () {
        const panelRestante = Ext.getCmp(prototype.id + '-gridRestante');
        const panelVentas = Ext.getCmp(prototype.id + '-gridVentas');
        const panelAuditoria = Ext.getCmp(prototype.id + '-gridAuditoria');
        panelRestante.hide();
        panelVentas.hide();
        panelAuditoria.hide();

    }


});
