/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.flown.ErrorReport.ErrorReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ErrorReportController',
    flightNumber: '',
    carrier: '',
    searchParams: {},
    me: '',
    setContext: function () {
        me = this;
    },
    init: function(view) {
        prototype.id = 'ErrorReportForm';
        prototype.url = CONTEXTPATH + '/ErrorReport';
        var me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#ErrorReportForm-xpanel': {
                afterrender: this.xpanel_afterrender
            }
            ,
            '#ErrorReportForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#ErrorReportForm-btnClear': {
                click: this.btnClear_click
            },
            '#ErrorReportForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#ErrorReportForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#ErrorReportForm-btnBack': {
                click: this.btnBack_click
            },
            '#ErrorReportForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#ErrorReportForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#ErrorReportForm-btn-pag-next': {
                click: this.pagNext
            },
            '#ErrorReportForm-btn-pag-last': {
                click: this.pagLast
            }

        });
    },
    xpanel_afterrender: function(obj, e) {
        //this.btnSearch_click();
    },
    btnSearch_click: function(obj, e) {
        this.setGridData(obj, e);
    },
    setParams: function() {
        var IN_CCUST = '139';
        var IN_FINI = Ext.getCmp(prototype.id + '-txtDateFrom').getValue();
        var IN_FFIN = Ext.getCmp(prototype.id + '-txtDateTo').getValue();
        IN_FFIN = Ext.util.Format.date(IN_FFIN, 'Ymd');
        IN_FINI = Ext.util.Format.date(IN_FINI, 'Ymd');
        searchParams = {
            IN_CCUST: IN_CCUST,
            IN_FINI: IN_FINI,
            IN_FFIN: IN_FFIN
        };
        console.log("-------------Parametros enviados-----------");
        console.log("IN_CCUST : " + searchParams.IN_CCUST);
        console.log("IN_FINI : " + searchParams.IN_FINI);
        console.log("IN_FFIN : " + searchParams.IN_FFIN);
        console.log("-------------------------------------------");
    },
    setGridData: function(obj, val) {
        this.setParams();
        console.log("URL : " + prototype.url + '/search');
        var storeGridDatas = Ext.create('Ext.Praxis.store.flown.ErrorReport.GridData', {
            proxy: {
                url: prototype.url + '/search'
            }, listeners: {
                beforeload: function(obj) {
                    obj.proxy.extraParams = searchParams;
                },
                load: function(obj) {
                    var pag = Ext.getCmp(prototype.id + '-paggin');
                    var pagData = pag.getPageData();
                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(pagData.currentPage);
                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(pagData.pageCount);
                    Ext.getCmp(prototype.id + '-lbl-total').setText(pagData.total);
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
    btnClear_click: function(obj, e) {
        Ext.getCmp(prototype.id + '-txtDateFrom').setValue('');
        Ext.getCmp(prototype.id + '-txtDateTo').setValue('');
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
        this.setParams();
        global.getFile(prototype.url + '/getXLSX?IN_CCUST=' + searchParams.IN_CCUST
                + '&IN_FINI=' + searchParams.IN_FINI
                + '&IN_FFIN=' + searchParams.IN_FFIN
                );
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
    btnBack_click: function(obj, e) {
        global.showMenu();
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
