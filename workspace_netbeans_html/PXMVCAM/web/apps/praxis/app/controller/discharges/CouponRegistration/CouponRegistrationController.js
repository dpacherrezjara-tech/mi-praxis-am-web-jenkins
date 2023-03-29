/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.discharges.CouponRegistration.CouponRegistrationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CouponRegistrationController',
    fecha: new Date(),
    paginActual: '',
    drillDown: [],
    gridActual: '',
    me: '',
    searchParams: {},
    summaryParams: {},
    paramsDetail: {},
    panelAnterior:null,
    init: function (view) {
        prototype.id = 'CouponRegistrationForm';
        prototype.url = CONTEXTPATH + '/CouponRegistration';
        me = this;
        this.control({
            // -------------------Eventos Genericos --------------------
            '#CouponRegistrationForm-xpanel': {
                afterrender: this.xpanel_afterrender
            },
            '#CouponRegistrationForm-btnSearch': {
                click: this.btnSearch_click
            },
            '#CouponRegistrationForm-btnClear': {
                click: this.btnClear_click
            },
            '#CouponRegistrationForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#CouponRegistrationForm-btnBack': {
                click: this.btnBack_click
            },
            '#CouponRegistrationForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CouponRegistrationForm-btn-pag-first': {
                click: this.pagFirst
            },
            '#CouponRegistrationForm-btn-pag-previous': {
                click: this.pagPrevious
            },
            '#CouponRegistrationForm-btn-pag-next': {
                click: this.pagNext
            },
            '#CouponRegistrationForm-btn-pag-last': {
                click: this.pagLast
            },
            //-----------------Eventos Especificos -------------------            

            '#CouponRegistrationForm-cmbDate': {
                change: this.changeCmbDate
            },
            '#CouponRegistrationForm-txtTicket': {
                keyup: this.eventKey,
                change: this.onUpperValue
            }
        });
    },
    xpanel_afterrender: function (obj, e) {
        this.setStoreData();
//      this.btnSearch_click();
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    setStoreData: function () {
        var cmbDate = Ext.getCmp(prototype.id + '-cmbDate');
        cmbDate.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["1", "Accounting Date"],
                ["2", "Issue Date"],
                ["3", "Ticket"]
            ]
        }));
        cmbDate.setValue("");
    },
    changeCmbDate: function (obj, value) {
        this.clearFields();
        this.hideComponents();
        switch (value) {
            case '1':
            case '2':
                Ext.getCmp(prototype.id + '-txtFDesde').show();
                Ext.getCmp(prototype.id + '-txtFHasta').show();
                break;
            case '3':
                Ext.getCmp(prototype.id + '-txtTicket').show();
                break;
        }
    },
    hideComponents: function () {
        Ext.getCmp(prototype.id + '-txtFDesde').hide();
        Ext.getCmp(prototype.id + '-txtFHasta').hide();
        Ext.getCmp(prototype.id + '-txtTicket').hide();
    },
    btnSearch_click: function (obj, e) {
        //this.setFormatParameter();
        this.setGridData(obj, e);
    },
    setFormatParameter: function () {
        var IN_OPCION = Ext.getCmp(prototype.id + '-cmbDate').getValue();
        var IN_FECHAFROM = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFDesde').getValue(), 'Ymd');
        var IN_FECHATO = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFHasta').getValue(), 'Ymd');
        var IN_TKT = Ext.getCmp(prototype.id + '-txtTicket').getValue();

        summaryParams = {
            TFECHA: '0',
            TIPO: '',
            FINICIO: IN_FECHAFROM,
            FFIN: IN_FECHATO
        };
        searchParams = {
            IN_OPCION: IN_OPCION,
            IN_FECHAFROM: IN_FECHAFROM,
            IN_FECHATO: IN_FECHATO,
            IN_TKT: IN_TKT
        };
        //console.log(searchParams);
    },
    setGridData: function (obj, val) {
        let me = this;
        let option = me.getSelectecOption();
        win.lblUser_toolTip("Estructura: A1747");
        this.setFormatParameter();
        if (option !== '3' && option !== '') {
            me.getSummaryData();
            //me.ejemplo();
        }
//        var storeGridDatas = Ext.create('Ext.Praxis.store.discharges.GridData', {
//            proxy: {
//                url: prototype.url + '/search'
//            }, listeners: {
//                beforeload: function(obj) {
//                    obj.proxy.extraParams = searchParams;
//                },
//                load: function(obj) {
//                    var pag = Ext.getCmp(prototype.id + '-paggin');
//                    var pagData = pag.getPageData();
//                    Ext.getCmp(prototype.id + '-lbl-currentPage').setText(Ext.util.Format.number(pagData.currentPage, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-pageCount').setText(Ext.util.Format.number(pagData.pageCount, '0,000'));
//                    Ext.getCmp(prototype.id + '-lbl-total').setText(Ext.util.Format.number(pagData.total, '0,000'));
//                    if (obj.data.length === 0) {
//                        global.Msg({
//                            msg: 'Data not found.'
//                        });
//                    }
//                }
//            }
//        });
        global.clear();
//        Ext.getCmp(prototype.id + '-gridData').bindStore(storeGridDatas);
//        Ext.getCmp(prototype.id + '-paggin').bindStore(storeGridDatas);
    },
    getSummaryData: async function () {
        let panel = Ext.getCmp(prototype.id + '-regionCenterGrid01');
        panel.mask('Loading...');
        panel.removeAll();
        let data = await fetch(prototype.url + '/searchSummary?' + new URLSearchParams(summaryParams))
                .then(async res => await res.json())
                .catch(err => console.error(err));
        let summaryGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.create('Ext.data.Store', {
                storeId: prototype.id + '-summary-data',
                data: data
            }),
            id:prototype.id+'-summary-grid',
            height: 550,
            width: 650,
            //<editor-fold defaultstate="collapsed" desc="columnas">
            columns: [
                {text: 'Accounting Data', dataIndex: 'fvta',width:100},
                {text: 'Discharge Type', dataIndex: 'tipoc',width:100},
                {text: 'N° de Documentos', dataIndex: 'tdocs',width:100},
                {text: 'Fare Amount', dataIndex: 'tfare',width:100,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        metaData.style = 'text-align:center;';
                        return Ext.util.Format.number(value, '0,000.00');
                    }},
                {text: 'YQ Amount', dataIndex: 'tyq',width:100,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000.00');
                    }},
                {
                    xtype: 'actioncolumn',
                    sortable: false,
                    width: 60,
                    align: 'center', items: [
                        {
                            iconCls:'prx-icon-image-file',
                            tooltip: 'Show Details',
                            handler: 'onShowDetail'
                        }
                    ]
                },
                {
                    xtype: 'actioncolumn',
                    sortable: false,
                    width: 60,
                    align: 'center', items: [
                        {
                            iconCls:'prx-icon-excel',
                            tooltip: 'Download Details',
                            handler: 'onDownloadClick'
                        }
                    ]
                }
            ]
                    //</editor-fold>
        });
        panel.add(summaryGrid);
        panel.unmask();
    },
    getSummaryDetailData: async function (grid, record) {
        let me = this;
        let parentContainer = Ext.getCmp(prototype.id + '-regionCenterGrid01');
        me.panelAnterior = parentContainer.items.last();
        me.panelAnterior.setVisible(false);
        let data = await fetch(prototype.url + '/search?' + new URLSearchParams(searchParams))
                .then(async res => await res.json())
                .catch(err => console.error(err));
        let detailPanel = Ext.create('Ext.grid.Panel', {
            store: Ext.create('Ext.data.Store', {
                storeId: prototype.id + '-detail-summary-data',
                data: data.data
            }),
            id:prototype.id+'-detail-summary-grid',
            height: 550,
            width: 1480,
            //<editor-fold defaultstate="collapsed" desc="columnas">
            columns: [
                {text: 'Accounting <br>Date', dataIndex: 'FCONT', width: 80},
                {text: 'Issue <br>Date', dataIndex: 'FVTA', width: 80},
                {text: 'Air', dataIndex: 'CCIA', width: 55},
                {text: 'Document', dataIndex: 'FORMASERIE', width: 80},
                {text: 'Coupon', dataIndex: 'CUPON', width: 70},
                {text: 'Discharge <br>Type', dataIndex: 'TIPOC', width: 150},
                {text: 'Source', dataIndex: 'FTE', width: 65},
                {text: 'IATA', dataIndex: 'AGTIA', width: 80},
                {text: 'Country', dataIndex: 'PSVVTA', width: 60},
                {text: 'Zone', dataIndex: 'ZONA', width: 55},
                {text: 'Document <br>Type', dataIndex: 'CDOC', width: 70},
                {text: 'From', dataIndex: 'CDEPART', width: 60},
                {text: 'To', dataIndex: 'CARRIVA', width: 60},
                {text: 'Carrier', dataIndex: 'CARR', width: 60},
                {text: 'Flight <br>Date', dataIndex: 'DFLIGHT', width: 80},
                {text: 'Currency', dataIndex: 'MDACP', width: 65},
                {text: 'Fare <br>Amount', dataIndex: 'VCPNRV', width: 80,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000.00');
                    }
                },
                {text: 'Comm <br>Amount', dataIndex: 'COMREV', width: 80,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000.00');
                    }
                },
                {text: 'SComm <br>Amount', dataIndex: 'SCOMREV', width: 80,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000.00');
                    }
                },
                {text: 'YQ <br>Amount', dataIndex: 'YQREV', width: 80,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                        return Ext.util.Format.number(value, '0,000.00');
                    }
                }
            ],
                    //</editor-fold>
            dockedItems:[
                {
                    xtype:'button',
                    text: 'Atrás',
                    width:100,
                    maxWidth:100,
                    handler:function(){
                        this.up().up().remove(this.up());
                        me.panelAnterior.setVisible(true);
                    }
                }
            ]      
        });
        parentContainer.add(detailPanel);
        
    },
    getSelectecOption: function () {
        return Ext.getCmp(prototype.id + '-cmbDate').getValue();
    },
    onShowDetail: function(grid, record, action, rowIndex, colIndex, item, e){
        this.getSummaryDetailData(grid,record);
    },
    //<editor-fold defaultstate="collapsed" desc="botones">
    btnBack_click: function (obj, e) {
        global.showMenu();
    },
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cmbDate').setValue('');
        this.clearFields();
    },
    clearFields: function () {
        Ext.getCmp(prototype.id + '-txtFDesde').setValue('');
        Ext.getCmp(prototype.id + '-txtFHasta').setValue('');
        Ext.getCmp(prototype.id + '-txtTicket').setValue('');
    },
    btnExcel_click: function (obj, e) {
        //this.setFormatParameter();
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    this.exportExcel();
                }
            }
        });
    },
    exportExcel: function () {
        this.setFormatParameter();
        global.getFile(prototype.url + '/getXLSX?IN_OPCION=' + searchParams.IN_OPCION
                + '&IN_FECHAFROM=' + searchParams.IN_FECHAFROM
                + '&IN_FECHATO=' + searchParams.IN_FECHATO
                + '&IN_TKT=' + searchParams.IN_TKT
                );
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    //</editor-fold>
    /*     
     * Funciones para la paginacion     
     */
    //<editor-fold defaultstate="collapsed" desc="paginado">
    pagFirst: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveFirst();
    },
    pagPrevious: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.movePrevious();
    },
    pagNext: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveNext();
    },
    pagLast: function (obj, e) {
        var pag = Ext.getCmp(prototype.id + '-paggin');
        var pagData = pag.getPageData();
        pag.moveLast();
    }
    //</editor-fold>
});