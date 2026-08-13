
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
        var ComboType = Ext.getCmp(prototype.idAmdsControl + '-CmbProcess');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "Selected"},
                {"code": "1", "name": "Memo Number"},
                {"code": "2", "name": "Sale Date"},
                {"code": "3", "name": "System Date"},
                {"code": "4", "name": "Settlement Date"},
                {"code": "5", "name": "Ticket"},
                {"code": "6", "name": "Ref.Number"},
                {"code": "7", "name": "Card Number"}


            ]
        }));

        CmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "A", "name": "Processed"},
                {"code": "P", "name": "Approved"},
                {"code": "O", "name": "Agency Disabled"},
                {"code": "Y", "name": "Pending"},
                {"code": "M", "name": "Below 5 USD"},
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

        ComboType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "BT", "name": "BY TICKET"},
                {"code": "BP", "name": "BY PAYMENT"}
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
        var txtA4497ARN = Ext.getCmp(prototype.idAmdsControl + '-txtA4497ARN');
        var txtA4497SCARD = Ext.getCmp(prototype.idAmdsControl + '-txtA4497SCARD');
        var txtA4497SCARD = Ext.getCmp(prototype.idAmdsControl + '-txtA4497SCARD');
        var CmbProcess = Ext.getCmp(prototype.idAmdsControl + '-CmbProcess');
        var txtAmount = Ext.getCmp(prototype.idAmdsControl + '-txtAmount');
        // {"code": "6", "name": "Ref.Number"},
        //{"code": "7", "name": "C.C.Number"}
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
            txtA4497SCARD.hide();
            txtA4497ARN.hide();
            txtAmount.hide();
            CmbProcess.hide();

            txtA4497SCARD.setValue("");
            txtA4497ARN.setValue("");
            //
            CmbStatus.setValue("");
            txtIATA.setValue("");
            txtFrmaSerie.setValue("");
            txtSeq.setValue("");
            txtAmount.setValue("");
            CmbProcess.setValue("");
            //
        } else if (obj.getValue() === "2" || obj.getValue() === "3" || obj.getValue() === "4") {

            txtFilterDateFrom.show();
            txtFilterDateTo.show();
            filter2.show();
            txtIATA.show();
            CmbStatus.show();
            txtAmount.show();
            CmbProcess.show();

            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();
            txtNumber.hide();
            txtcountry.hide();
            txtA4497SCARD.hide();
            txtA4497ARN.hide();

            txtA4497SCARD.setValue("");
            txtA4497ARN.setValue("");
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
            txtA4497SCARD.hide();
            txtA4497ARN.hide();
            txtAmount.hide();
            CmbProcess.hide();

            txtA4497SCARD.setValue("");
            txtA4497ARN.setValue("");
            //
            txtNumber.setValue("");
            txtIATA.setValue("");
            CmbStatus.setValue("");
            txtcountry.setValue("");
            txtA4497SCARD.setValue("");
            txtA4497ARN.setValue("");
            txtAmount.setValue("");
            CmbProcess.setValue("");

        } else if (obj.getValue() === "6") {

            txtA4497ARN.show();
            //
            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();
            txtAmount.hide();
            CmbProcess.hide();

            txtNumber.hide();
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            filter2.hide();
            txtIATA.hide();
            CmbStatus.hide();
            txtcountry.hide();
            txtA4497SCARD.hide();
            //
            txtNumber.setValue("");
            txtIATA.setValue("");
            CmbStatus.setValue("");
            txtcountry.setValue("");
            txtFrmaSerie.setValue("");
            txtSeq.setValue("");
            txtA4497SCARD.setValue("");
            txtAmount.setValue("");
            CmbProcess.setValue("");

        } else if (obj.getValue() === "7") {

            txtA4497SCARD.show();
            //
            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();
            txtAmount.hide();
            CmbProcess.hide();

            txtNumber.hide();
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            filter2.hide();
            txtIATA.hide();
            CmbStatus.hide();
            txtcountry.hide();
            txtA4497ARN.hide();
            //
            txtNumber.setValue("");
            txtIATA.setValue("");
            CmbStatus.setValue("");
            txtcountry.setValue("");
            txtFrmaSerie.setValue("");
            txtSeq.setValue("");
            txtA4497ARN.setValue("");
            txtAmount.setValue("");
            CmbProcess.setValue("");

        } else {
            txtCia.hide();
            txtFrmaSerie.hide();
            txtSeq.hide();
            txtNumber.hide();
            txtAmount.hide();
            CmbProcess.hide();

            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            filter2.hide();
            txtIATA.hide();
            CmbStatus.hide();
            txtcountry.hide();
            txtA4497SCARD.hide();
            txtA4497ARN.hide();

            txtA4497SCARD.setValue("");
            txtA4497ARN.setValue("");
            txtIATA.setValue("");
            CmbStatus.setValue("");
            txtcountry.setValue("");
            txtAmount.setValue("");
            CmbProcess.setValue("");
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
                value = 'Processed';
                break;
            case 'P':
                color = '#E3DAED';
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
            case 'M':
                color = '#F3EFB6';
                value = 'Below 5 USD';
                break;

        }

        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    onPaginationChkChange: function (obj, newValue, oldValue, eOpts) {
        Ext.getCmp(prototype.idAmdsControl + '-btn-search').fireEvent('click', {});
        if (!newValue) {
            Ext.getCmp(prototype.idAmdsControl + '-pagginator-01').disable();
        } else {
            Ext.getCmp(prototype.idAmdsControl + '-pagginator-01').enable();
        }
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

        var txtA4497ARN = Ext.getCmp(prototype.idAmdsControl + '-txtA4497ARN').getValue();
        var txtA4497SCARD = Ext.getCmp(prototype.idAmdsControl + '-txtA4497SCARD').getValue();
        var CmbProcess = Ext.getCmp(prototype.idAmdsControl + '-CmbProcess').getValue();
        var txtAmount = Ext.getCmp(prototype.idAmdsControl + '-txtAmount').getValue().replace(new RegExp(',', 'g'), '');
        //
        if (ComboBy === "6") {
            if (txtA4497ARN === '') {
                Ext.MessageBox.alert('PRAXIS', 'Enter Ref.Number', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idAmdsControl + '-txtA4497ARN').focus();", 100);
                });
                return;
            }
        }
        if (ComboBy === "7") {
            if (txtA4497SCARD === '') {
                Ext.MessageBox.alert('PRAXIS', 'Enter Card Number', function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idAmdsControl + '-txtA4497SCARD').focus();", 100);
                });
                return;
            }
        }

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
        //
        this.bean.IN_A4497TRSRC = CmbProcess;
        this.bean.IN_A4497SCARD = txtA4497SCARD;
        this.bean.IN_A4497ARN = txtA4497ARN;
        this.bean.IN_A4497NETO = txtAmount === '' ? 0 : txtAmount;

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
    },
    img_clickHandler_save_List: function () {
        var grid = Ext.getCmp(prototype.idAmdsControl + '-gridData');
        var selection = grid.getSelectionModel().getSelection();

        if (!selection || selection.length === 0) {
            return global.Msg({msg: 'You must select at least one record'});
        }

        var lstNew = [];
        // Validación de selección múltiple

        selection.forEach(function (row) {
            if (Ext.String.trim(row.get('A4497FLAG')) === 'Y') {
                lstNew.push({
                    IN_OPTION: '2',
                    A4497CIA: row.get('A4497CIA'),
                    A4497FORMA: row.get('A4497FORMA'),
                    A4497SERIE: row.get('A4497SERIE'),
                    A4497SEQ: row.get('A4497SEQ'),
                    A4497TRNCU: row.get('A4497TRNCU'),
                    A4497SEQTB: row.get('A4497SEQTB'),
                    A4497FTE: row.get('A4497FTE'),
                    A4497FLAG: row.get('A4497FLAG'),
                    A4497IATA: row.get('A4497IATA'),
                    A4497EPR: row.get('A4497EPR'),
                    A4497PAIS: row.get('A4497PAIS')
                });
            }
        });

        if (lstNew.length === 0) {
            return Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one record');
        }
        global.Msg({
            msg: 'Are you sure to update?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.idAmdsControl + '-Contenedor'), {
                        msg: 'Please Wait....'
                    });
                    mask.show();

                    Ext.Ajax.request({
                        url: prototype.url + '/VeriUpadaStatus/',
                        timeout: 60000000,
                        method: 'POST',
                        params: {beanlst: JSON.stringify(lstNew)},
                        success: function (response) {
                            mask.hide();
                            var res = Ext.JSON.decode(response.responseText);
                            var vp_icon = (res.data === 'RECORD INSERTED') ? 1 : 0;

                            global.Msg({
                                msg: res.data,
                                icon: vp_icon,
                                fn: function () {
                                    if (vp_icon === 1) {
                                        Ext.getCmp(prototype.id + '-Contenedor').getController().imgSearch_clickHandler();
                                    }
                                }
                            });
                        }
                    });
                }
            }
        });
    },
    img_clickHandler_save: function () {
        var grid = Ext.getCmp(prototype.idAmdsControl + '-gridData');
        var selection = grid.getSelectionModel().getSelection();

        if (!selection || selection.length === 0) {
            return global.Msg({msg: 'You must select at least one record'});
        }

        var lstNew = [];
        // Validación de selección múltiple

        selection.forEach(function (row) {
            if (Ext.String.trim(row.get('A4497FLAG')) === 'O' || Ext.String.trim(row.get('A4497FLAG')) === 'C' || Ext.String.trim(row.get('A4497FLAG')) === 'D') {
                lstNew.push({
                    IN_OPTION: '1',
                    A4497CIA: row.get('A4497CIA'),
                    A4497FORMA: row.get('A4497FORMA'),
                    A4497SERIE: row.get('A4497SERIE'),
                    A4497SEQ: row.get('A4497SEQ'),
                    A4497TRNCU: row.get('A4497TRNCU'),
                    A4497SEQTB: row.get('A4497SEQTB'),
                    A4497FTE: row.get('A4497FTE'),
                    A4497FLAG: row.get('A4497FLAG'),
                    A4497IATA: row.get('A4497IATA'),
                    A4497EPR: row.get('A4497EPR'),
                    A4497PAIS: row.get('A4497PAIS')
                });
            }
        });

        if (lstNew.length === 0) {
            return Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one record');
        }
        global.Msg({
            msg: 'Are you sure to update?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.idAmdsControl + '-Contenedor'), {
                        msg: 'Please Wait....'
                    });
                    mask.show();

                    Ext.Ajax.request({
                        url: prototype.url + '/VeriUpadaStatus/',
                        timeout: 60000000,
                        method: 'POST',
                        params: {beanlst: JSON.stringify(lstNew)},
                        success: function (response) {
                            mask.hide();
                            var res = Ext.JSON.decode(response.responseText);
                            var vp_icon = (res.data === 'RECORD INSERTED') ? 1 : 0;

                            global.Msg({
                                msg: res.data,
                                icon: vp_icon,
                                fn: function () {
                                    if (vp_icon === 1) {
                                        Ext.getCmp(prototype.id + '-Contenedor').getController().imgSearch_clickHandler();
                                    }
                                }
                            });
                        }
                    });
                }
            }
        });
    }

});

