/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.sales.PercentCommissionContract.PercentCommissionContractController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PercentCommissionContractController',
    fecha: new Date(),
    paginTem: '',
    paginActual: '',
    drillDown: [],
    gridActual: '',
    strTipo: '',
    me: '',
    searchParams: {},
    paramsDetail: {},
    init: function(view) {
        prototype.id = 'PercentCommissionContractForm';
        prototype.url = CONTEXTPATH + '/PercentCommissionContract';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#PercentCommissionContractForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#PercentCommissionContractForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#PercentCommissionContractForm-btnClear': {
                click: this.btnClear_click
            },
            '#PercentCommissionContractForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#PercentCommissionContractForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#PercentCommissionContractForm-btnAdd': {
                click: this.btnAdd_click
            },
            '#PercentCommissionContractForm-btnBack': {
                click: this.btnBack_click
            },
            '#PercentCommissionContractForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#PercentCommissionContractForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#PercentCommissionContractForm-btn-pag-next': {
                click: this.pagNext
            },
            '#PercentCommissionContractForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            
            '#PercentCommissionContractForm-cmbDate': {
                change: this.onChangeSearch
            },
            '#PercentCommissionContractForm-txtA1874CODEA': {
                keyup: this.eventKey,
                change: this.onUpperValue
            },
            '#PercentCommissionContractForm-txtA1874IATA': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }
        });
    },
    xpanel_afterrender: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtA1874CODEA').hide();
        Ext.getCmp(prototype.id + '-txtA1874IATA').hide();
        this.setStoreData();
        this.btnSearch_click();
    },
    eventKey: function(e, eOpts) {

        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function(field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    }
    ,
    setStoreData: function() {
        var cmbDate = Ext.getCmp(prototype.id + '-cmbDate');
        cmbDate.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["1", "Agreement"],
                ["2", "IATA"]
            ]
        }));
        cmbDate.setValue("");
    },
    onChangeSearch: function(obj, value) {

        switch (value) {
            case '1':
                Ext.getCmp(prototype.id + '-txtA1874CODEA').show();
                Ext.getCmp(prototype.id + '-txtA1874IATA').hide();
                break;
            case '2':
                Ext.getCmp(prototype.id + '-txtA1874CODEA').hide();
                Ext.getCmp(prototype.id + '-txtA1874IATA').show();
                break;
            default:
                Ext.getCmp(prototype.id + '-txtA1874CODEA').hide();
                Ext.getCmp(prototype.id + '-txtA1874IATA').hide();
                break;
        }
    },
    btnSearch_click: function(obj, e) {
        this.setFormatParameter();
        this.setGridData(obj, e);

    },
    setFormatParameter: function() {

        var VP_A2448CCUST = '139';
        var VP_A2448CODEA = Ext.getCmp(prototype.id + '-txtA1874CODEA').getValue();
        var VP_A2448IATA = Ext.getCmp(prototype.id + '-txtA1874IATA').getValue();

        searchParams = {
            VP_A2448CCUST: VP_A2448CCUST,
            VP_A2448CODEA: VP_A2448CODEA,
            VP_A2448IATA: VP_A2448IATA
        };

    },
    setGridData: function(obj, val) {
        var storeGridDatas = Ext.create('Ext.Praxis.store.sales.PercentCommissionContract.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
                    if (obj.data.length === 0) {
                        global.Msg({
                            msg: 'Data not found.'
                        });
                    }
                }
            }
        });
        global.clear();
        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    btnAdd_click: function() {
        this.winDataEntry('I');
    },
    onEditClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.winDataEntry('U', rec);
    },
    winDataEntry: function(action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
        Ext.create('Ext.Praxis.view.sales.PercentCommissionContractForm.DataEntry', {
            id: prototype.id + '-DataEntryPercentCommissionContractForm',
            params: {
                action: action,
                rec: rec
            }
        }).show();
    },
    btnBack_click: function(obj, e) {
        global.showMenu();
    },
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtA1874IATA').setValue("");
        Ext.getCmp(prototype.id + '-txtA1874CODEA').setValue("");
    },
    btnExcel_click: function(obj, e) {
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
    },
    exportExcel: function() {
        global.getFile(prototype.url + '/getXLSX?VP_A2448CCUST=' + searchParams.VP_A2448CCUST
                + '&VP_A2448CODEA=' + searchParams.VP_A2448CODEA
                + '&VP_A2448IATA=' + searchParams.VP_A2448IATA);
    }
    ,
    btnFilter_click: function(obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    /*     
     * Funciones para la paginacion     
     */
    pagFirst: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();

    },
    pagLast: function(obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    }



});
