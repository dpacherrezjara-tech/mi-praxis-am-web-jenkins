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
    gridActual: '',
    me: '',
    searchParams: {},
    summaryParams: {},
    paramsDetail: {},
    panelAnterior: null,
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
            '#CouponRegistrationForm-btnExcel': {
                click: this.btnExcel_click
            },
            '#CouponRegistrationForm-btnFilter': {
                click: this.btnFilter_click
            },
            '#CouponRegistrationForm-btnBack': {
                click: this.btnBack_click
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
    //<editor-fold defaultstate="collapsed" desc="utils">
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.btnSearch_click();
        }
    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    getSelectecOption: function () {
        return Ext.getCmp(prototype.id + '-cmbDate').getValue();
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="set vars">
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
        var cmbType = Ext.getCmp(prototype.id + '-cmbType');
        cmbType.bindStore(Ext.create('Ext.data.ArrayStore', {
            autoLoad: false,
            fields: ['code', 'name'],
            data: [
                ["", "Select"],
                ["1", "1. NATURAL"],
                ["2", "2. ETHNIC"],
                ["3", "3. NON REFUNDABLE"],
                ["6", "4. NO SHOW"],
                ["7", "5. RAC474"],
                ["8", "6. RFTX"],
                ["9", "7. ANCILLARIE NATURAL"],
                ["10", "8. ANCILLARIE NO SHOW"],
                ["11", "9. ANCILLARIE RAC474"],
            ]
        }));
        cmbType.setValue("");
    },
    changeCmbDate: function (obj, value) {
        Ext.getCmp(prototype.id + '-regionCenterGrid01').removeAll();
        this.clearFields();
        this.hideComponents();
        switch (value) {
            case '1':
            case '2':
                Ext.getCmp(prototype.id + '-txtFDesde').show();
                Ext.getCmp(prototype.id + '-txtFHasta').show();
                Ext.getCmp(prototype.id + '-cmbType').show();
                Ext.getCmp(prototype.id + '-btnExcel').show();
                break;
            case '3':
                Ext.getCmp(prototype.id + '-txtTicket').show();
                Ext.getCmp(prototype.id + '-txtCia').show();
                Ext.getCmp(prototype.id + '-btnExcel').hide();
                break;
        }
    },
    hideComponents: function () {
        Ext.getCmp(prototype.id + '-txtFDesde').hide();
        Ext.getCmp(prototype.id + '-txtFHasta').hide();
        Ext.getCmp(prototype.id + '-txtTicket').hide();
        Ext.getCmp(prototype.id + '-txtCia').hide();
        Ext.getCmp(prototype.id + '-cmbType').hide();
    },
    setSummaryParameter: function () {
        var IN_OPCION = Ext.getCmp(prototype.id + '-cmbDate').getValue();
        var IN_FECHAFROM = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFDesde').getValue(), 'Ymd');
        var IN_FECHATO = Ext.util.Format.date(Ext.getCmp(prototype.id + '-txtFHasta').getValue(), 'Ymd');
        var IN_TIPOC = Ext.getCmp(prototype.id + '-cmbType').getValue();
        summaryParams = {
            TFECHA: IN_OPCION,
            TIPO: IN_TIPOC,
            FINICIO: IN_FECHAFROM,
            FFIN: IN_FECHATO
        };

    },
    setDetailParameter: function (opcion, from, to, tipoc, tkt = '') {
        searchParams = {
            IN_OPCION: opcion,
            IN_FECHAFROM: from,
            IN_FECHATO: to,
            IN_TIPOC: tipoc,
            IN_TKT: tkt
        };
    },
    //</editor-fold>
    setGridData: function (obj, val) {
        let me = this;
        let option = me.getSelectecOption();
        win.lblUser_toolTip("Estructura: A1747");
        const actions = {
            '': () => {
                global.Msg({msg: 'Seleccione una Opcion'});
            },
            '1': () => me.getSummaryData(option),
            '2': () => me.getSummaryData(option),
            '3': () => me.getTktDetailData(option)
        };
        const selectedAction = actions[option];
        if (selectedAction) {
            selectedAction();
        }
        global.clear();
    },
    getSummaryData: async function (tfecha) {
        this.setSummaryParameter();
        let panel = Ext.getCmp(prototype.id + '-regionCenterGrid01');
        panel.mask('Loading...');
        panel.removeAll();
        let data = await fetch(prototype.url + '/searchSummary?' + new URLSearchParams(summaryParams))
                .then(async res => await res.json())
                .catch(() => {
                    global.Msg({msg: 'Data not Found'});
                });
        //console.log(data);
        let summaryStore = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-summary-data',
            pageSize: 20,
            proxy: {
                type: 'memory',
                enablePaging: true
            },
            autoLoad: true,
            autoSync: true,
            data: data
        });
        let summaryGrid = Ext.create('Ext.grid.Panel', {
            store: summaryStore,
            id: prototype.id + '-summary-grid',
            title: 'Coupon Registration Summary',
            height: 590,
            width: 750,
            features: [
                {
                    dock: 'bottom',
                    ftype: 'summary',
                }
            ],
            resizable: false,
            columnLines: true,
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true,
                markDirty: false,
            },
            //<editor-fold defaultstate="collapsed" desc="columnas">
            columns: {
                items: [
                    {
                        text: tfecha === '1' ? 'Accounting Date' : 'Emission Date',
                        dataIndex: tfecha === '1' ? 'fcont' : 'fvta',
                        width: 150
                    },
                    {text: 'Discharge Type', dataIndex: 'tipoc', width: 150,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            let newVal = '';
                            switch (value) {
                                case '1':
                                    newVal = 'NATURAL';
                                    metaData.style = 'background:#DAE570;';
                                    break;
                                case '2':
                                    newVal = 'ETNICO';
                                    metaData.style = 'background:#9EE570;';
                                    break;
                                case '3':
                                    newVal = 'NO REEMBOLSABLE';
                                    metaData.style = 'background:#E59570;';
                                    break;
                                case '6':
                                    newVal = 'NO-SHOW';
                                    metaData.style = 'background:#7087E5;';
                                    break;
                                case '7':
                                    newVal = 'RAC474';
                                    metaData.style = 'background:#9E70E5;';
                                    break;
                                case '8':
                                    newVal = 'RFTX';
                                    metaData.style = 'background:#E570C7;';
                                    break;
                                case '9':
                                    newVal = 'ANCILLARIE NATURAL';
                                    metaData.style = 'background:#70E5A3;';
                                    break;
                                case '10':
                                    newVal = 'ANCILLARIE NO SHOW';
                                    metaData.style = 'background:#70E5D1;';
                                    break;
                                case '11':
                                    newVal = 'ANCILLARIE RAC474';
                                    metaData.style = 'background:#8EB4A2;';
                                    break;
                                default:
                                    newVal = 'DESCONOCIDO';
                                    metaData.style = 'background:#E83636;';
                            }
                            metaData.style += 'text-align:center;font-weight: bold;';
                            return newVal;
                        }},
                    {text: 'N° de <br>Documentos', dataIndex: 'tdocs', width: 120,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            return Ext.util.Format.number(value, '0,000');
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData) {
                            metaData.style = 'font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000');
                        }, },
                    {text: 'Fare Amount', dataIndex: 'tfare', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = 'text-align:right;';
                            return Ext.util.Format.number(value, '0,000.00');
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData) {
                            metaData.style = 'text-align:right;font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000.00');
                        },
                    },
                    {text: 'YQ Amount', dataIndex: 'tyq', width: 100,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = 'text-align:right;';
                            return Ext.util.Format.number(value, '0,000.00');
                        },
                        summaryType: 'sum',
                        summaryRenderer: function (value, summaryData, dataIndex, metaData) {
                            metaData.style = 'text-align:right;font-weight:bold;';
                            return Ext.util.Format.number(value, '0,000.00');
                        },
                    },
                    {
                        xtype: 'actioncolumn',
                        sortable: false,
                        width: 60,
                        align: 'center', items: [
                            {
                                iconCls: 'prx-icon-image-file',
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
                                iconCls: 'prx-icon-download',
                                tooltip: 'Download Details',
                                handler: 'btnGridExcel'
                            }
                        ]
                    }
                ],
                defaults: {
                    align: 'center'
                }
            },
            //</editor-fold>
            bbar: Ext.create('Ext.toolbar.Paging', {
                id: prototype.id + '-summary-paggin',
                store: summaryStore,
                displayInfo: true, // display additional information like "Displaying x of y items"
            })
        });
        panel.add(summaryGrid);
        panel.unmask();
    },
    getTktDetailData: function (opcion) {
        let me = this;
        let cia = Ext.getCmp(prototype.id + '-txtCia').getValue();
        let tkt = Ext.getCmp(prototype.id + '-txtTicket').getValue();
        me.setDetailParameter(opcion, '', '', '', cia + tkt);
        me.getSummaryDetailData();
    },
    getSummaryDetailData: async function () {
        let me = this;
        let parentContainer = Ext.getCmp(prototype.id + '-regionCenterGrid01');
        parentContainer.mask('Loading Details...');
        let opcion = me.getSelectecOption() !== '3';
        if (opcion) {
            me.panelAnterior = parentContainer.items.last();
            me.panelAnterior.setVisible(false);
        } else {
            parentContainer.removeAll();
        }

        let detailStore = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-detail-summary-data',
            loadMask: true,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: prototype.url + '/search',
                extraParams: searchParams,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (store, records, successful, operation) {
                    if (successful) {
                        let rec = records[0].data.page;
                        Ext.getCmp(prototype.id + '-lbl-det-currentPage').setText(rec.PAGNUM);
                        Ext.getCmp(prototype.id + '-lbl-det-pageCount').setText(rec.TOTPAG);
                        Ext.getCmp(prototype.id + '-lbl-det-total').setText(rec.TOTROW);
                        //Ext.getCmp().setText();
                    } else {
                        global.Msg({msg: 'Data not Found'});
                    }
                }
            }
        });

        let detailPanel = Ext.create('Ext.grid.Panel', {
            store: detailStore,
            id: prototype.id + '-detail-summary-grid',
            title: 'Coupon Registration Detail',
            height: 590,
            width: 1490,
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true,
                markDirty: false,
            },
            columnLines: true,
            //<editor-fold defaultstate="collapsed" desc="columnas">
            columns: {
                defaults: {
                    align: 'center'
                },
                items: [
                    {text: 'Accounting <br>Date', dataIndex: 'FCONT', width: 80},
                    {text: 'Issue <br>Date', dataIndex: 'FVTA', width: 80},
                    {text: 'Air', dataIndex: 'CCIA', width: 55},
                    {text: 'Document', dataIndex: 'FORMASERIE', width: 80},
                    {text: 'Coupon', dataIndex: 'CUPON', width: 70,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = 'font-weight:bold;';
                            return value;
                        }},
                    {text: 'Discharge <br>Type', dataIndex: 'TIPOC', width: 150,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                            metaData.style = 'background:#84DAA8;font-weight:bold;';
                            return value;
                        }},
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
                ]},
            //</editor-fold>
            dockedItems: [
                {
                    xtype: 'panel',
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    items: [
                        opcion ?
                                {
                                    xtype: 'button',
                                    text: 'Atrás',
                                    tooltip: 'Volver a Summary',
                                    width: 100,
                                    maxWidth: 100,
                                    handler: function () {
                                        parentContainer.remove(this.up().up(), true);
                                        me.panelAnterior.setVisible(true);
                                    }
                                } : null,
                        //<editor-fold defaultstate="collapsed" desc="paginado">
                        {
                            xtype: 'panel',
                            width: 100,
                            border: false,
                            items: [
                                {
                                    xtype: 'toolbar',
                                    cls: 'x-toolbar-pag',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-det-first',
                                            iconCls: 'prx-icon-pagination-first',
                                            tooltip: 'First Page',
                                            listeners: {click: 'paginMove'}

                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-det-previous',
                                            iconCls: 'prx-icon-pagination-previous',
                                            tooltip: 'Previous Page',
                                            listeners: {click: 'paginMove'}

                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-det-next',
                                            iconCls: 'prx-icon-pagination-next',
                                            tooltip: 'Next Page',
                                            listeners: {click: 'paginMove'}

                                        },
                                        {
                                            xtype: 'button',
                                            id: prototype.id + '-det-last',
                                            iconCls: 'prx-icon-pagination-last',
                                            tooltip: 'Last Page',
                                            listeners: {click: 'paginMove'}

                                        }
                                        , {
                                            xtype: 'pagingtoolbar',
                                            id: prototype.id + '-det-paggin',
                                            store: detailStore,
                                            border: false,
                                            displayInfo: false,
                                            hidden: true
                                        }
                                    ]
                                }
                            ]
                        }
                        //</editor-fold>
                    ]
                },
                //<editor-fold defaultstate="collapsed" desc="info paginado">
                {
                    xtype: 'panel',
                    border: true,
                    width: '100%',
                    height: 30,
                    dock: 'bottom',
                    layout: {
                        type: 'hbox',
                        align: 'center',
                        pack: 'center'
                    },
                    defaults: {
                        xtype: 'label',
                        margin: '3px 0px 0px 5px'
                    },
                    items: [
                        {
                            text: 'Page',
                            width: 50
                        },
                        {
                            id: prototype.id + '-lbl-det-currentPage',
                            text: '1',
                            width: 50
                        },
                        {
                            text: 'Of',
                            width: 50
                        },
                        {
                            id: prototype.id + '-lbl-det-pageCount',
                            text: '0',
                            width: 50
                        },
                        {xtype: 'tbspacer', width: 100},
                        {
                            text: 'Total Records',
                            width: 80
                        },
                        {
                            id: prototype.id + '-lbl-det-total',
                            text: '0',
                            width: 50
                        }
                    ]
                }
                //</editor-fold>
            ],
        });
        parentContainer.add(detailPanel);
        parentContainer.unmask();
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
        this.setSummaryParameter();
        global.getFile(prototype.url + '/getXLSX?TFECHA=' + summaryParams.TFECHA
                        + '&TIPO=' + summaryParams.TIPO
                        + '&FINICIO=' + summaryParams.FINICIO
                        + '&FFIN=' + summaryParams.FFIN);
        //global.getFile(prototype.url + '/searchSummaryXLSX?' + new URLSearchParams(summaryParams));
    },
    //<editor-fold defaultstate="collapsed" desc="botones">
    btnSearch_click: function (obj, e) {
        this.setGridData(obj, e);
    },
    btnBack_click: function (obj, e) {
        global.showMenu();
    },
    btnClear_click: function (obj, e) {
        Ext.getCmp(prototype.id + '-cmbDate').setValue('');
        Ext.getCmp(prototype.id + '-cmbType').setValue('');
        Ext.getCmp(prototype.id + '-regionCenterGrid01').removeAll();
        this.clearFields();
    },
    clearFields: function () {
        Ext.getCmp(prototype.id + '-txtFDesde').setValue('');
        Ext.getCmp(prototype.id + '-txtFHasta').setValue('');
        Ext.getCmp(prototype.id + '-txtTicket').setValue('');
        Ext.getCmp(prototype.id + '-txtCia').setValue('139');
    },
    btnFilter_click: function (obj) {
        var option = Ext.getCmp(prototype.id + '-contentFilter');
        if (option.isVisible()) {
            option.setVisible(false);
        } else {
            option.setVisible(true);
        }
    },
    onShowDetail: function (grid, record) {
        let me = this;
        const rec = grid.getStore().getAt(record);
        let fecha = rec.get('fcont') ? rec.get('fcont') : rec.get('fvta');
        me.setDetailParameter(me.getSelectecOption(), fecha, fecha, rec.get('tipoc'));
        //console.log(searchParams);
        me.getSummaryDetailData();
    },
    btnGridExcel: function (grid, record) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Choose your download format.',
            width: 280,
            buttons: Ext.MessageBox.YESNOCANCEL,
            buttonText: {
                yes: 'Excel',
                no: 'Text File',
                cancel: 'Cancel'
            },
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                switch (btn) {
                    case 'yes':
                        this.onDownloadDetail(grid, record, 'xlsx');
                        break;
                    case 'no':
                        this.onDownloadDetail(grid, record, 'txt');
                        break;
                    default:
                }
            }
        });
    },
    onDownloadDetail: function (grid, record, type) {
        let me = this;
        me.onProgressBar(true);
        const rec = grid.getStore().getAt(record);
        let fecha = (rec.get('fcont') ? rec.get('fcont') : rec.get('fvta')).trim();
        me.setDetailParameter(me.getSelectecOption(), fecha, fecha, rec.get('tipoc'));
        let filename = 'T' + rec.get('tipoc') + '_' + fecha;
        searchParams.nameFile = filename;
        //console.log(searchParams);
        let curl = prototype.url + (type === 'xlsx' ? '/downloadExcel' : '/downloadText') + '?';
        curl = curl + new URLSearchParams(searchParams);
        //console.log(curl);
        fetch(curl)
                .then(async response => {
                    if (!response.ok) {
                        throw new Error('Error ' + response.status + ': ' + response.statusText);
                    }
                    const arch = await response.blob();
                    return arch;
                })
                .then(blob => {
                    const url = URL.createObjectURL(blob);

                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `CouponRegistration - ${filename}.zip`;
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    me.onProgressBar(false);
                    global.Msg({msg: 'Descarga Exitosa.'});
                })
                .catch(err => {
                    global.Msg({msg: 'Error al Descargar.'})
                    me.onProgressBar(false);
                    console.error(err);
                });
    },
    onProgressBar: function (enable) {
        let pb = Ext.getCmp(prototype.id + '-progressBar');
        if (enable) {
            pb.setVisible(true);
            pb.wait({
                text: 'Descargando...',
                interval: 500
            });
        } else {
            pb.reset();
            pb.setVisible(false);
        }
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="paginacion detail">
    paginMove: function (button) {
        let buttonId = button.getId().split('-').at(-1);
        let pag = Ext.getCmp(prototype.id + '-det-paggin');
        const actions = {
            'first': () => pag.moveFirst(),
            'previous': () => pag.movePrevious(),
            'next': () => pag.moveNext(),
            'last': () => pag.moveLast()
        };
        const selectedAction = actions[buttonId];
        if (selectedAction) {
            selectedAction();
        }
    },
    //</editor-fold>
});