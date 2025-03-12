
Ext.define('Ext.Praxis.controller.payments.AmdsControlForm.AmdsControlFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AmdsControlFormController',

    /**
     * Constructor
     */
    stack: [],
    bean: {},
    init: function (view) {
        var me = this;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        this.setStoresGrids();

        Ext.getCmp(prototype.idAmdsControl + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, this);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idAmdsControl + '-search-type');
        var CmbStatus = Ext.getCmp(prototype.idAmdsControl + '-CmbStatus');
        var CmbSource = Ext.getCmp(prototype.idAmdsControl + '-ComboSource');
        var CmbChannel = Ext.getCmp(prototype.idAmdsControl + '-ComboChannel');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Selected"},
                {"code": "1", "name": "Memo Number"},
                {"code": "2", "name": "Sale Date"},
                {"code": "3", "name": "System Date"},
                {"code": "4", "name": "Settlement Date"},
                {"code": "5", "name": "Ticket"}


            ]
        }));

        CmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "A", "name": "Approved"},
                {"code": "O", "name": "Agency Disabled"},
                {"code": "Y", "name": "Pending"},
                {"code": "C", "name": "Unregistered Client"},
                {"code": "D", "name": "Unregistered E-mail"}
            ]
        }));

        CmbSource.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "BSP", "name": "BSP"},
                {"code": "ASR", "name": "ASR"},
                {"code": "ARC", "name": "ARC"},
                {"code": "MAN", "name": "MAN"}
            ]
        }));

        CmbChannel.bindStore(Ext.create('Ext.data.Store', {
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
    onCmbSourceSelect: function (obj, records, eOpts) {

        switch (String(obj.getValue())) {
            case 'ASR':
                Ext.getCmp(prototype.idAmdsControl + '-ComboChannel').setVisible(true);
                break;
            case 'BSP':
            case 'ARC':
            case 'MAN':
                Ext.getCmp(prototype.idAmdsControl + '-ComboChannel').setVisible(false);
                break;
        }

    },
    imgExcel_clickHandler: function (obj, e) {
        this.imgSearch_clickHandler(true);
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('');
    },
    OnBeforeShow: function () {
        prototype.idAmdsControl = 'AmdsControlForm';
        prototype.widthContenedor = 1395;
        prototype.heightContenedor = 605;
        prototype.url = CONTEXTPATH + '/AmdsControlForm';

    },

    onCmbSearchChange: function (obj, records, eOpts) {
        var txtIATA = Ext.getCmp(prototype.idAmdsControl + '-txtIATA');
        var txtFilterDateFrom = Ext.getCmp(prototype.idAmdsControl + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.idAmdsControl + '-txtFilterDateTo');
        var txtCia = Ext.getCmp(prototype.idAmdsControl + '-txtCia');
        var txtFrmaSerie = Ext.getCmp(prototype.idAmdsControl + '-txtFrmaSerie');
        var txtSeq = Ext.getCmp(prototype.idAmdsControl + '-txtSeq');
        var txtNumber = Ext.getCmp(prototype.idAmdsControl + '-txtNumber');
        var CmbStatus = Ext.getCmp(prototype.idAmdsControl + '-CmbStatus');
        var txtcountry = Ext.getCmp(prototype.idAmdsControl + '-country');
        var filter2 = Ext.getCmp(prototype.idAmdsControl + '-box-filter-02');

        //campo_cantidad.hide();
        if (obj.getValue() === "1") {
            txtNumber.show();
            txtcountry.show();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            CmbStatus.hide();
            filter2.hide();
            txtIATA.hide();
            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();
            //
            CmbStatus.setValue("");
            txtIATA.setValue("");
            txtFrmaSerie.setValue("");
            txtSeq.setValue("");
        } else if (obj.getValue() === "2" || obj.getValue() === "3" || obj.getValue() === "4") {

            txtFilterDateFrom.show();
            txtFilterDateTo.show();
            filter2.show();
            txtIATA.show();
            CmbStatus.show();


            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();
            txtNumber.hide();
            txtcountry.hide();
            //
            txtFrmaSerie.setValue("");
            txtSeq.setValue("");
            txtNumber.setValue("");
            txtcountry.setValue("");
        } else if (obj.getValue() === "5") {

            txtCia.show();
            txtFrmaSerie.show();
            txtSeq.show();

            txtNumber.hide();
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            filter2.hide();
            txtIATA.hide();
            CmbStatus.hide();
            txtcountry.hide();
            //
            txtNumber.setValue("");
            txtIATA.setValue("");
            CmbStatus.setValue("");
            txtcountry.setValue("");

        } else {
            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();
            txtNumber.hide();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            filter2.hide();
            txtIATA.hide();
            CmbStatus.hide();
            txtcountry.hide();

            txtIATA.setValue("");
            CmbStatus.setValue("");
            txtcountry.setValue("");
        }
    },

    setStoresGrids: function () {
        var grid01 = Ext.getCmp(prototype.idAmdsControl + '-gridData');
        var store01 = Ext.create('Ext.data.Store', {
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchReport/',
                timeout: '300000',
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            },
            //autoLoad: true,
            pageSize: 25
        });
        grid01.setStore(store01);
        Ext.getCmp(prototype.idAmdsControl + '-pagginator-01').setStore(store01);
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';

        switch (String(record.get('A4497FLAG'))) {
            case 'A':
                color = '#F5A9F2';
                value = 'Approved';
                break;
            case 'O':
                color = '#B791EF';
                value = 'Agency Disabled';
                break;
            case 'Y':
                color = '#EFE41B';
                value = 'Pending';
                break;
            case 'C':
                color = '#DC7633';
                value = 'Unregistered Client';
                break;
            case 'D':
                color = '#FF9966';
                value = 'Unregistered E-mail';
                break;
        }

        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    imgSearch_clickHandler: function (obj, e) {

        if (obj !== true) {
            Ext.getCmp(prototype.idAmdsControl + '-gridData').getStore().removeAll();
        }

        var ComboBy = Ext.getCmp(prototype.idAmdsControl + '-search-type').getValue();
        var txtIATA = Ext.getCmp(prototype.idAmdsControl + '-txtIATA').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.idAmdsControl + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.idAmdsControl + '-txtFilterDateTo').getRawValue();
        var txtCia = Ext.getCmp(prototype.idAmdsControl + '-txtCia').getValue();
        var txtFrmaSerie = Ext.getCmp(prototype.idAmdsControl + '-txtFrmaSerie').getValue();
        var txtSeq = Ext.getCmp(prototype.idAmdsControl + '-txtSeq').getValue();
        var txtNumber = Ext.getCmp(prototype.idAmdsControl + '-txtNumber').getValue();
        var txtcountry = Ext.getCmp(prototype.idAmdsControl + '-country').getValue();
        var CmbStatus = Ext.getCmp(prototype.idAmdsControl + '-CmbStatus').getValue();
        var CombSource = Ext.getCmp(prototype.idAmdsControl + '-ComboSource').getValue();
        var CombChannel = Ext.getCmp(prototype.idAmdsControl + '-ComboChannel').getValue();
        if (ComboBy === '') {
            global.Msg({msg: 'Select Of By'});
            return;
        }
        if (ComboBy === "2" || ComboBy === "3" || ComboBy === "4") {
            if (txtFilterDateFrom !== '') {
                if (txtFilterDateTo === '') {
                    global.Msg({msg: 'Enter Date To'});
                    return;
                }
            }
            if (txtFilterDateTo !== '') {
                if (txtFilterDateFrom === '') {
                    global.Msg({msg: 'Enter Date From'});
                    return;
                }
            }
            if (txtFilterDateFrom !== '' && txtFilterDateTo !== '') {

                if (global.existeFecha(txtFilterDateFrom) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateFrom), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idAmdsControl + '-txtFilterDateFrom').focus();", 100);
                    });
                    return;
                }

                if (global.existeFecha(txtFilterDateTo) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(txtFilterDateTo), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idAmdsControl + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
            }
        }
        if (ComboBy === "1") {
            if (txtNumber === '') {
                Ext.MessageBox.alert('PRAXIS', 'Enter the debit number', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idAmdsControl + '-txtNumber').focus();", 100);
                });
                return;
            }
        }
        if (ComboBy === "5") {
            if (txtFrmaSerie === '') {
                Ext.MessageBox.alert('PRAXIS', 'Enter the ticket number', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idAmdsControl + '-txtNumber').focus();", 100);
                });
                return;
            }
        }

        var ComboBy = Ext.getCmp(prototype.idAmdsControl + '-search-type').getValue();
        var txtIATA = Ext.getCmp(prototype.idAmdsControl + '-txtIATA').getValue();
        var txtFilterDateFrom = Ext.getCmp(prototype.idAmdsControl + '-txtFilterDateFrom').getRawValue();
        var txtFilterDateTo = Ext.getCmp(prototype.idAmdsControl + '-txtFilterDateTo').getRawValue();
        var txtCia = Ext.getCmp(prototype.idAmdsControl + '-txtCia').getValue();
        var txtFrmaSerie = Ext.getCmp(prototype.idAmdsControl + '-txtFrmaSerie').getValue();
        var txtSeq = Ext.getCmp(prototype.idAmdsControl + '-txtSeq').getValue();
        var txtNumber = Ext.getCmp(prototype.idAmdsControl + '-txtNumber').getValue();
        var txtcountry = Ext.getCmp(prototype.idAmdsControl + '-country').getValue();
        var CmbStatus = Ext.getCmp(prototype.idAmdsControl + '-CmbStatus').getValue();
        var CombSource = Ext.getCmp(prototype.idAmdsControl + '-ComboSource').getValue();
        var CombChannel = Ext.getCmp(prototype.idAmdsControl + '-ComboChannel').getValue();

        this.bean.IN_OPTION = ComboBy;
        this.bean.IN_IATA = txtIATA;
        this.bean.IN_DATEFROM = txtFilterDateFrom;
        this.bean.IN_DATETO = txtFilterDateTo;
        this.bean.IN_CIA = txtCia;
        this.bean.IN_FORMASERIE = txtFrmaSerie;
        this.bean.IN_SEQ = txtSeq;
        this.bean.IN_NUMBER = txtNumber;
        this.bean.IN_COUTRY = txtcountry;
        this.bean.IN_STATUS = CmbStatus;
        this.bean.IN_SOURCE = CombSource;
        this.bean.IN_CHANNEL = CombChannel;

        this.bean.pexcel = 1;
        this.SearchReport(this.bean, obj === true ? obj : false);
    },
    SearchReport: function (bean, bExcel) {
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            console.log(prototype.url);
            Ext.getCmp(prototype.idAmdsControl + '-gridData').getStore().removeAll();
            Ext.getCmp(prototype.idAmdsControl + '-gridData').getStore().loadPage(1, {
                params: bean,
                callback: function (records, operation, success) {
                    if (records.length === 0) {
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
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTextKeypress: function (obj, e, eOpts) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }
    },
    imgSerech_clickHandler: function () {
        this.imgSearch_clickHandler(false);
    },
    onClearClick: function (obj, e) {
        var txtIATA = Ext.getCmp(prototype.idAmdsControl + '-txtIATA');
        var txtFilterDateFrom = Ext.getCmp(prototype.idAmdsControl + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.idAmdsControl + '-txtFilterDateTo');
        var txtCia = Ext.getCmp(prototype.idAmdsControl + '-txtCia');
        var txtFrmaSerie = Ext.getCmp(prototype.idAmdsControl + '-txtFrmaSerie');
        var txtSeq = Ext.getCmp(prototype.idAmdsControl + '-txtSeq');
        var txtNumber = Ext.getCmp(prototype.idAmdsControl + '-txtNumber');
        var CmbStatus = Ext.getCmp(prototype.idAmdsControl + '-CmbStatus');
        var txtcountry = Ext.getCmp(prototype.idAmdsControl + '-country');
        var filter2 = Ext.getCmp(prototype.idAmdsControl + '-box-filter-02');

        Ext.getCmp(prototype.idAmdsControl + '-gridData').getStore().removeAll();

        txtCia.hide();
        txtFrmaSerie.hide();
        txtSeq.hide();
        txtNumber.hide();

        txtFilterDateFrom.hide();
        txtFilterDateTo.hide();
        filter2.hide();
        txtIATA.hide();
        CmbStatus.hide();
        txtcountry.hide();

        txtIATA.setValue("");
        CmbStatus.setValue("");
        txtcountry.setValue("");
    }
});

