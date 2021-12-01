
Ext.define('Ext.Praxis.controller.salesaudit.DisputemanagementMyarcForm.DisputemanagementMyarcFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DisputemanagementMyarcFormController',

    bean: {},
    bean2: {},
    beanINI: {},
    /**
     * Constructor
     */

    init: function (view) {
        var me = this;


    },

    afterRender: function () {
        this.setReasons();
        this.setStores();
        this.setUser();
        this.setStoresFilters();
        this.onLoadUsers();
        Ext.getCmp(prototype.idDisputemanageMyarc + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
        this.oninitSearch();

    },
    OnBeforeShow: function () {
        prototype.idDisputemanageMyarc = 'DisputeGestionBsplink';
        prototype.idDisputemanageMyarc1 = 'DetailDisputeGestionBsplink';
        prototype.idDisputemanageMyarc3 = 'DisputeFileViewer';
        prototype.url = CONTEXTPATH + '/DisputeGestionBsplink';
        prototype.url02 = CONTEXTPATH + '/BwrBSPLINKRFND';
    },
    setReasons: function () {
        var cmbError = Ext.getCmp(prototype.idDisputemanageMyarc + '-cmbError');
        var store = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/loadDataInit',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalPorperty: 'total'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (obj, records, successful, operation, eOpts) {
                    cmbError.setValue('');
                }
            }
        });
        cmbError.setStore(store);
    },
    setUser: function () {
        Ext.Ajax.request({
            url: prototype.url02 + '/getUser',
            timeout: 60000000,
            method: 'POST',
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.idDisputemanageMyarc + '-Audit').setValue(Ext.String.trim(res.user.USR));
                me.imgSearch_clickHandler();
            }
        });
    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.idDisputemanageMyarc + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.idDisputemanageMyarc + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.idDisputemanageMyarc + '-pagginator-01').enable();
        }
    },
    oninitSearch: function () {
        Ext.getCmp(prototype.idDisputemanageMyarc + '-search-type').setValue('1');
        Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateFrom').setVisible(true);
        Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo').setVisible(true);
        Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboOrigin').setVisible(true);
        Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboArea').setVisible(true);
        Ext.getCmp(prototype.idDisputemanageMyarc + '-box-filter-02').setVisible(true);

        Ext.getCmp(prototype.idDisputemanageMyarc + '-iata').setVisible(false);
        Ext.getCmp(prototype.idDisputemanageMyarc + '-nmemo').setVisible(false);

        Ext.getCmp(prototype.idDisputemanageMyarc + '-iata').setValue('');
        Ext.getCmp(prototype.idDisputemanageMyarc + '-nmemo').setValue('');



    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A2548SEMAFORO'))) {
            case 'ORANGE':
                value = 'orange';
                break;
            case 'GREEN':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */

    onPagingBeforeChange01: function (obj, page, opts) {
        var store = obj.getStore();
        var totRow = store.getCount() != 0 ? store.totalCount : 0;
        obj.store.proxy.extraParams = {
            beanString: JSON.stringify(this.bean),
            totRow: totRow
        };
    },
    setStores: function () {
        var grid00 = Ext.getCmp(prototype.idDisputemanageMyarc + '-gridData');

        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idDisputemanageMyarc + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchReportADM/',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);

        Ext.getCmp(prototype.idDisputemanageMyarc + '-pagginator-01').setStore(store00);
    },
    /*setStores: function() {
     alert(Ext.getCmp(prototype.idDisputemanageMyarc + '-Audit').getValue());
     var grid01 = Ext.getCmp(prototype.idDisputemanageMyarc + '-gridData');
     this.beanINI.OPCIONTYPE = '1';
     this.beanINI.STATUS = "D";
     this.beanINI.VP_USER =  Ext.getCmp(prototype.idDisputemanageMyarc + '-Audit').getValue();
     
     var store01 = Ext.create('Ext.data.Store', {
     proxy: {
     type: 'ajax',
     url: prototype.url + '/SearchReportADM/',
     timeout: '300000',
     reader: {
     type: 'json',
     rootProperty: 'data',
     totalProperty: 'total'
     }
     },
     //autoLoad: true,
     pageSize: 20
     });
     store01.load({
     params: {beanString: JSON.stringify(this.beanINI)}
     });
     //store01.load();
     grid01.setStore(store01);
     
     Ext.getCmp(prototype.idDisputemanageMyarc + '-pagginator-01').setStore(store01);
     
     },*/
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idDisputemanageMyarc + '-search-type');
        var cmbOrigin = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboOrigin');
        var cmbArea = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboArea');

        var cmbSource = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboSource');
        var cmbChannel = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboChannel');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECTED"},
                {"code": "3", "name": "ACCOUNTING DATE"},
                {"code": "5", "name": "AGENCY"},
                {"code": "2", "name": "MEMO NUMBER"},
                {"code": "4", "name": "PROCESSING DATE"},
                {"code": "1", "name": "SYSTEM DATE"}
            ]
        }));

        cmbOrigin.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "PR", "name": "AUTOMATIC"},
                {"code": "BK", "name": "BACKEND"},
                {"code": "MA", "name": "MANUAL"},
                {"code": "MS", "name": "MASSIVE"},
                {"code": "QR", "name": "QUERYS"},
                {"code": "UP", "name": "UPFRONT"}

            ]
        }));

        cmbArea.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "FR", "name": "FRANQUICIAS"},
                {"code": "CR", "name": "CREDITO Y COBRANZAS"},
                {"code": "QR", "name": "QUERYS"},
                {"code": "VI", "name": "VENTA INDIRECTA"},
                {"code": "CM", "name": "COMMISIONES"},
                {"code": "UP", "name": "UPFRONT"}
            ]
        }));

        cmbSource.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "BSP", "name": "BSP"},
                {"code": "ASR", "name": "ASR"},
                {"code": "ARC", "name": "ARC"}
            ]
        }));

        cmbChannel.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "ATO", "name": "ATO"},
                {"code": "CCT", "name": "CCT"},
                {"code": "CTO", "name": "CTO"},
                {"code": "WEB", "name": "WEB"},
                {"code": "FRA", "name": "FRA"}
            ]
        }));



    },
    onLoadUsers: function () {
        // var cmbUser = Ext.getCmp(prototype.idDisputemanageMyarc + '-txtUser');
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('1');
    },
    onCmbOriginAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbSourceAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbChannelAfterRender: function (obj) {
        obj.setValue('');
    },
    onCmbAreaAfterRender: function (obj) {
        obj.setValue('');
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onCmbSearchSelect: function (obj, records, eOpts) {
        var txtFilterDateFrom = Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo');
        var CmbOrigin = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboOrigin');
        var CmbArea = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboArea');
        var filter = Ext.getCmp(prototype.idDisputemanageMyarc + '-box-filter-02');

        var txtiata = Ext.getCmp(prototype.idDisputemanageMyarc + '-iata');
        var txtnmemo = Ext.getCmp(prototype.idDisputemanageMyarc + '-nmemo');

        switch (String(obj.getValue())) {
            case '1':
            case '3':
            case '4':


                txtFilterDateFrom.show();
                txtFilterDateTo.show();
                CmbOrigin.show();
                CmbArea.show();
                filter.show();

                txtiata.hide();
                txtnmemo.hide();

                Ext.getCmp(prototype.idDisputemanageMyarc + '-iata').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-nmemo').setValue('');
                break;
            case '2':
                txtnmemo.show();
                
                txtFilterDateFrom.hide();
                txtFilterDateTo.hide();
                CmbOrigin.hide();
                CmbArea.hide();
                filter.hide();
                txtiata.hide();

                Ext.getCmp(prototype.idDisputemanageMyarc + '-iata').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateFrom').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboOrigin').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboArea').setValue('');
                break;
            case '5':

                txtiata.show();
                CmbOrigin.show();
                CmbArea.show();

                txtnmemo.hide();
                txtFilterDateFrom.hide();
                txtFilterDateTo.hide();
                CmbArea.hide();
                filter.hide();

                Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateFrom').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-nmemo').setValue('');
                break;
            case '':
                txtiata.hide();
                CmbOrigin.hide();
                CmbArea.hide();

                txtnmemo.hide();
                txtFilterDateFrom.hide();
                txtFilterDateTo.hide();
                CmbArea.hide();
                filter.hide();

                Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateFrom').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboOrigin').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboArea').setValue('');
                Ext.getCmp(prototype.idDisputemanageMyarc + '-nmemo').setValue('');
                break;
                // boxFilter02.hide();
                // boxFilter02.setBorder(false)
        }
    },
    onCmbSourceSelect: function (obj, records, eOpts) {

        switch (String(obj.getValue())) {
            case 'ASR':
                Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboChannel').setVisible(true);
                break;
            case 'BSP':
            case 'ARC':
                Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboChannel').setVisible(false);
                break;
                // boxFilter02.hide();
                // boxFilter02.setBorder(false)
        }

    },
    onSearchkey: function (f, e) {
        if (e.getKey() == e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    imgSearch_clickHandler: function (obj, records, eOpts) {

        var cmbsearch = Ext.getCmp(prototype.idDisputemanageMyarc + '-search-type').getValue();
        var txtDateFrom = Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateFrom').getRawValue();
        var txtDateTo = Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo').getRawValue();
        var txtIata = Ext.getCmp(prototype.idDisputemanageMyarc + '-iata').getValue();
        var cmbOrigin = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboOrigin').getValue();
        var CombArea = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboArea').getValue();
        var txtnmemo = Ext.getCmp(prototype.idDisputemanageMyarc + '-nmemo').getValue();
        var CombSource = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboSource').getValue();
        var CombChannel = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboChannel').getValue();
        var txtCurrency = Ext.getCmp(prototype.idDisputemanageMyarc + '-Currency').getValue();
        var txtTourCode = Ext.getCmp(prototype.idDisputemanageMyarc + '-TourCode').getValue();
        var txtAudit = Ext.getCmp(prototype.idDisputemanageMyarc + '-Audit').getValue();
        if (cmbsearch == '') {
            Ext.MessageBox.alert('PRAXIS', "Select Search Type", function (btn, text) {
                if (btn == 'ok' || btn == 'cancel')
                    setTimeout("Ext.getCmp(prototype.idDisputemanageMyarc + '-search-type').focus();", 100);
            });
            return;
        }
        if (txtDateFrom != '' && txtDateTo != '') {

            if (global.existeFecha(txtDateFrom) != '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtDateFrom), function (btn, text) {
                    if (btn == 'ok' || btn == 'cancel')
                        setTimeout("Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateFrom').focus();", 100);
                });
                return;
            }

            if (global.existeFecha(txtDateTo) != '') {
                Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtDateTo), function (btn, text) {
                    if (btn == 'ok' || btn == 'cancel')
                        setTimeout("Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }
            if (Date.parse(Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateFrom').getValue()) > Date.parse(Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo').getValue())) {
                Ext.MessageBox.alert('PRAXIS', "the starting date must be less than the end date", function (btn, text) {
                    if (btn == 'ok' || btn == 'cancel')
                        setTimeout("Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo').focus();", 100);
                });
                return;
            }
        }

        var cmbsearch = Ext.getCmp(prototype.idDisputemanageMyarc + '-search-type').getValue();
        var txtDateFrom = Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateFrom').getRawValue();
        var txtDateTo = Ext.getCmp(prototype.idDisputemanageMyarc + '-txtFilterDateTo').getRawValue();
        var txtIata = Ext.getCmp(prototype.idDisputemanageMyarc + '-iata').getValue();
        var cmbOrigin = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboOrigin').getValue();
        var CombArea = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboArea').getValue();
        var txtnmemo = Ext.getCmp(prototype.idDisputemanageMyarc + '-nmemo').getValue();
        var CombSource = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboSource').getValue();
        var CombChannel = Ext.getCmp(prototype.idDisputemanageMyarc + '-ComboChannel').getValue();
        var txtCurrency = Ext.getCmp(prototype.idDisputemanageMyarc + '-Currency').getValue();
        var txtTourCode = Ext.getCmp(prototype.idDisputemanageMyarc + '-TourCode').getValue();
        var txtAudit = Ext.getCmp(prototype.idDisputemanageMyarc + '-Audit').getValue();
        var cmbError = Ext.getCmp(prototype.idDisputemanageMyarc + '-cmbError').getValue();
        if (cmbError === null) {
            cmbError = '';
        }


        if (cmbsearch === "2") {

            this.bean.COMBOBY = "";
            this.bean.OPCIONTYPE = cmbsearch;
            this.bean.NUMBERADM = txtnmemo;
            this.bean.DATEFROM = '';
            this.bean.DATETO = '';
            this.bean.CURRENCY = '';
            this.bean.COMBOCHANNEL = '';
            this.bean.CHANNEL = '';
            this.bean.AUTMAN = '';
            this.bean.STATUS = 'D';
            this.bean.VP_TUORCODE = '';
            this.bean.VP_IATA = '';
        } else if (cmbsearch === "1" || cmbsearch === "3" || cmbsearch === "4") {

            this.bean.OPCIONTYPE = cmbsearch;
            this.bean.DATEFROM = txtDateFrom;
            this.bean.DATETO = txtDateTo;
            this.bean.COMBOBY = "";
            this.bean.AUTMAN = cmbOrigin;
            this.bean.STATUS = "D";
            this.bean.COMBOCHANNEL = CombSource;
            this.bean.CHANNEL = CombChannel;
            this.bean.CURRENCY = txtCurrency;
            this.bean.VP_TUORCODE = txtTourCode;
            this.bean.VP_IATA = '';
            this.bean.NUMBERADM = '';

        } else if (cmbsearch === "5") {
            this.bean.NUMBERADM = '';
            this.bean.OPCIONTYPE = cmbsearch;
            this.bean.VP_IATA = txtIata;
            this.bean.COMBOBY = "";
            this.bean.AUTMAN = cmbOrigin;
            this.bean.STATUS = "D";//String(CmbStatus.selectedItem.data);
            this.bean.COMBOCHANNEL = CombSource;
            this.bean.CHANNEL = CombChannel;
            this.bean.CURRENCY = txtCurrency;

            this.bean.DATEFROM = '';
            this.bean.DATETO = '';
            this.bean.VP_TUORCODE = '';

        }
        this.bean.pexcel = Ext.getCmp(prototype.idDisputemanageMyarc + '-pagination').getValue() ? 0 : 1;
        this.bean.VP_USER = txtAudit;
        this.bean.VP_TYPE = '';
        this.bean.VP_AREA = CombArea;
        this.bean.VP_EROOR = cmbError;
        this.SearchReportDispute(this.bean, obj === true ? obj : false);



    },
    SearchReportDispute: function (bean, bExcel) {
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idDisputemanageMyarc + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.idDisputemanageMyarc + '-gridData').getStore().loadPage(1, {
                params: {
                    beanString: JSON.stringify(bean)
                            //beanString: bean

                }, callback: function (records, operation, success) {
                    if (records.length != 0) {
                        Ext.getCmp(prototype.idDisputemanageMyarc + '-lblRowsTotalADM').setText(records[0].data.page.TOTROW);
                    } else {
                        Ext.getCmp(prototype.idDisputemanageMyarc + '-lblRowsTotalADM').setText('0');
                        global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                            }});

                    }

                }
            });
        }



    },
    exportExcel: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(_path);
                }
            }
        });
    },
    onExcelClick: function (obj, e) {
        this.imgSearch_clickHandler(true);
    },
    onFilterClick: function () {
        var option = Ext.getCmp(prototype.idDisputemanageMyarc + '-contentFilter');
        if (option.isVisible())
            option.hide();
        else
            option.show();
    },

    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.DisputeGestionBsplink.DetailDisputeGestionBsplink({
            params: {
                rec: rec
            }
        });
        win.show();
    }
});



