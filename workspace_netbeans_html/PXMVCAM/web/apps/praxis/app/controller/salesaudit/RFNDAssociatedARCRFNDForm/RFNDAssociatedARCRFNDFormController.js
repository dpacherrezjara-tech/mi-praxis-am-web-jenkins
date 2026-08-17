
Ext.define('Ext.Praxis.controller.salesaudit.RFNDAssociatedARCRFNDForm.RFNDAssociatedARCRFNDFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RFNDAssociatedARCRFNDFormController',

    /**
     * Constructor
     */
    bean: {},
    bean2: {},
    init: function (view) {
        var me = this;

    },
    OnBeforeShow: function () {
        prototype.idRFNDAssociatedARCR = 'RFNDAssociatedARCRFNDForm';
        prototype.idARCDetailTicket = 'ARCRFNDAssociatedTicketForm';
        prototype.idRFNDARCFormRazones = 'FNDARCFormRazones',
                prototype.url = CONTEXTPATH + '/RFNDAssociatedARCRFNDForm';
        prototype.widthWindow = 1366;
        prototype.heightWindow = 768;

    },

    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStoresFilters();
        me.setStoresGrids();
        me.setUser();
        Ext.getCmp(prototype.idRFNDAssociatedARCR + '-pagginator-01').getCmpPaginator().on('beforechange', me.onPagingBeforeChange01, me);
    },
    onPagingBeforeChange01: function (obj, page, opts) {
        var me = this;
        obj.store.proxy.extraParams = me.bean;
    },
    setStoresFilters: function () {
        var cmbSearch = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-search-type');
        var cmbStatus = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-CmbStatus');
        var CmbStatusBPO = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-CmbStatusBPO');
        var cmbOptionTKT = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-de-cmbOptionTKT');

        cmbSearch.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "FOLIO"},
                {"code": "2", "name": "SYSTEM DATE"},
                {"code": "3", "name": "TICKET"}
                //{"code": "4", "name": "AUTHORISED - REJECTED / DATE"}
            ]
        }));

        cmbStatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "A", "name": "IN PROCESS"},
                {"code": "E", "name": "ERROR PROCESS"},
                {"code": "F", "name": "AUTHORISED"},
                {"code": "Y", "name": "PENDING"},
                {"code": "R", "name": "REJECT"},
                {"code": "B", "name": "GIVE USE IN PRAXIS"}

            ]
        }));

        CmbStatusBPO.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "ALL"},
                {"code": "Y", "name": "PENDING"},
                {"code": "A", "name": "ASSIGNED TO AUDITOR"},
                {"code": "C", "name": "USES CPN"},
                //
                //{"code": "D", "name": "RETURNED FROM SABRE"},
                //{"code": "L", "name": "CAPTURED BPO"},
                //{"code": "R", "name": "SENT TO BPO"},
                {"code": "F", "name": "SENT TO TO THE E-MAIL"},
                {"code": "G", "name": "PENDING TO THE E-MAIL"},
                {"code": "I", "name": "SENT TO QUOTATION"},
                {"code": "E", "name": "RETURNED TO QUOTATION"}

            ]
        }));

        cmbOptionTKT.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "1", "name": "TICKET"},
                {"code": "2", "name": "IATA RFND"}
            ]
        }));


    },
    setUser: function () {
        var me = this;
        Ext.Ajax.request({
            url: prototype.url + '/getUser',
            timeout: 60000000,
            method: 'POST',
            //params: this.beanTMP,
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtUser').setValue(Ext.String.trim(res.user.USR));
                if (Ext.String.trim(res.user.USR) === 'XEILIANA' || Ext.String.trim(res.user.USR) === 'XSTEPHANYC' || Ext.String.trim(res.user.USR) === 'XDINORAHG') {
                    Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtUser').setReadOnly(false);
                }
                me.onSearchClickInitial();

            }
        });
    },
    setStoresGrids: function () {
        var gridData = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-grid');
        var gridCabe = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-gridCabe');
        //
        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRFNDAssociatedARCR + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchRfndCabece',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });
        //
        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idRFNDAssociatedARCR + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/searchDetail',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        gridCabe.setStore(store00);
        gridData.setStore(store01);

        Ext.getCmp(prototype.idRFNDAssociatedARCR + '-pagginator-01').setStore(store00);
    },
    onCmbSearchAfterRender: function (obj) {
        obj.setValue('2');
    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var txtFilterDateFrom = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFilterDateFrom');
        var txtFilterDateTo = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFilterDateTo');
        var txtCia = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtCia');
        var txtFrmaSerie = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFrmaSerie');
        var txtfolio = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFrmaFolio');
        if (obj.getValue() === "2" || obj.getValue() === "4") {
            txtFilterDateFrom.show();
            txtFilterDateTo.show();
            txtCia.hide();
            txtFrmaSerie.hide();
            txtfolio.hide();
            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFrmaSerie').setValue("");
            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtCia').setValue("");
            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFrmaFolio').setValue("");
        } else if (obj.getValue() === "1") {
            txtfolio.show();
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            txtCia.hide();
            txtFrmaSerie.hide();
            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtCia').setValue("");
            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFilterDateFrom').setValue("");
            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFilterDateTo').setValue("");
        } else if (obj.getValue() === "3") {
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            txtCia.show();
            txtFrmaSerie.show();
            txtfolio.hide();
            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtCia').setValue("139");
            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFilterDateFrom').setValue("");
            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFilterDateTo').setValue("");
            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFrmaFolio').setValue("");
        } else {
            txtFilterDateFrom.hide();
            txtFilterDateTo.hide();
            txtCia.hide();
            txtFrmaSerie.hide();
            txtfolio.hide();
            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFrmaSerie').setValue("");
            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtCia').setValue("");
            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFrmaFolio').setValue("");
        }
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onChangeComboTkt: function (obj, val) {
        switch (val) {
            case '1':
                Ext.getCmp(prototype.idRFNDAssociatedARCR + '-de-txtTKT').show();
                Ext.getCmp(prototype.idRFNDAssociatedARCR + '-de-txtIata').hide();
                Ext.getCmp(prototype.idRFNDAssociatedARCR + '-de-txtIata').setValue("");
                setTimeout("Ext.getCmp(prototype.idRFNDAssociatedARCR + '-de-txtTKT').focus();", 100);
                break;
            case '2':
                Ext.getCmp(prototype.idRFNDAssociatedARCR + '-de-txtIata').show();
                Ext.getCmp(prototype.idRFNDAssociatedARCR + '-de-txtTKT').hide();
                Ext.getCmp(prototype.idRFNDAssociatedARCR + '-de-txtTKT').setValue("");
                setTimeout("Ext.getCmp(prototype.idRFNDAssociatedARCR + '-de-txtIata').focus();", 100);
                break;
        }
    },
    onSearchClickInitial: function (btn) {
        var me = this;
        me.bean.IN_OPTION = '';
        me.bean.IN_DATEFROM = '';
        me.bean.IN_DATETO = '';
        me.bean.IN_TICKET = '';
        me.bean.IN_IATA = '';
        me.bean.IN_FLAG = '';
        me.bean.IN_STATUSBPO = '';
        me.bean.IN_USER = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtUser').getValue();
        me.bean.IN_FOLIO = '';
        if (me.bean.IN_USER === 'ALL') {
            me.bean.IN_USER = '';
        }
        me.bean.pexcel = 0;
        me.SearchReport(me.bean, false);
    },
    onSearchClick: function (obj, e) {
        var me = this;
        me.bean.IN_OPTION = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-search-type').getValue();
        me.bean.IN_DATEFROM = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFilterDateFrom').getRawValue();
        me.bean.IN_DATETO = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFilterDateTo').getRawValue();
        me.bean.IN_TICKET = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtCia').getValue() + '' + Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFrmaSerie').getValue();
        me.bean.IN_IATA = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtIATA').getValue();
        me.bean.IN_FLAG = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-CmbStatus').getValue();
        me.bean.IN_STATUSBPO = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-CmbStatusBPO').getValue();
        me.bean.IN_USER = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtUser').getValue();
        me.bean.IN_FOLIO = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFrmaFolio').getValue();
        if (me.bean.IN_USER === 'ALL') {
            me.bean.IN_USER = '';
        }
        me.bean.pexcel = 0;
        if (me.bean.IN_OPTION === '') {
            Ext.MessageBox.alert('PRAXIS', "Select search type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idRFNDAssociatedARCR + '-search-type').focus();", 100);
            });
            return;

        }
        if (me.bean.IN_OPTION === '') {
            Ext.MessageBox.alert('PRAXIS', "Select search type", function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.idRFNDAssociatedARCR + '-search-type').focus();", 100);
            });
            return;

        }
        if (me.bean.IN_OPTION === "1") {
            if (me.bean.IN_FOLIO === '') {
                Ext.MessageBox.alert('PRAXIS', "Insert Folio", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFrmaFolio').focus();", 100);
                });
                return;
            }
        }
        if (me.bean.IN_OPTION === "3") {
            if (Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtCia').getValue() === '') {
                Ext.MessageBox.alert('PRAXIS', "Select search type", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtCia').focus();", 100);
                });
                return;
            }
            if (Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFrmaSerie').getValue() === '') {
                Ext.MessageBox.alert('PRAXIS', "Select search type", function (btn, text) {
                    if (btn === 'ok' || btn === 'cancel')
                        setTimeout("Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFrmaSerie').focus();", 100);
                });
                return;
            }
        }

        if (me.bean.IN_OPTION === "2" || me.bean.IN_OPTION === "4") {
            if (me.bean.IN_DATEFROM !== '') {
                if (me.bean.IN_DATETO === '') {
                    global.Msg({msg: 'Enter Date To'});
                    return;
                }
            }
            if (me.bean.IN_DATETO !== '') {
                if (me.bean.IN_DATEFROM === '') {
                    global.Msg({msg: 'Enter Date From'});
                    return;
                }
            }
            if (me.bean.IN_DATEFROM !== '' && me.bean.IN_DATETO !== '') {

                if (global.existeFecha(me.bean.IN_DATEFROM) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(me.bean.IN_DATEFROM), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFilterDateFrom').focus();", 100);
                    });
                    return;
                }

                if (global.existeFecha(me.bean.IN_DATETO) !== '') {
                    Ext.MessageBox.alert('PRAXIS', global.existeFecha(me.bean.IN_DATETO), function (btn, text) {
                        if (btn === 'ok' || btn === 'cancel')
                            setTimeout("Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFilterDateTo').focus();", 100);
                    });
                    return;
                }
            }
        }

        me.SearchReport(me.bean, obj === true ? obj : false);
    },
    SearchReport: function (bean, bExcel) {
        var me = this;
        if (bExcel) {
            me.exportExcel(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(bean)));
        } else {
            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-lbl-total2').setText('0');
            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-grid').getStore().removeAll();
            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-gridCabe').getStore().removeAll();
            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-gridCabe').getStore().loadPage(1, {
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
    onDetailClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.RFNDAssociatedARCRFNDForm.ARCRFNDAssociatedTicketForm({
            params: {
                rec: rec,
                action: 'FORMPENDIRFND'
            }
        });
        win.show();
    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(record.get('A4361ESTADO'))) {
            case 'A':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    onExcelClick: function (obj, e) {
        this.onSearchClick(true);
    },
    onExcelClick2: function (obj, e) {
        var me = this;
        me.exportExcel(prototype.url + '/getXLSX2?beanString=' + encodeURI(JSON.stringify(me.bean2)));

    },
    onRendererColumnOnPreme: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "font-weight:bold !important; color:#244066 !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.idRFNDAssociatedARCR + \'-Contenedor\').getController().searchform_detalle(' + rowIndex + ');">' + value + '</span>'
    },
    searchform_detalle: function (rowIndex) {
        var me = this;
        var grid = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-gridCabe');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        me.bean2.IN_PREME = rec.data.A4361PREME;
        me.bean2.IN_ANIO = rec.data.A4361ANIO;
        me.bean2.IN_DATEFROM = rec.data.A4361FREGI;
        me.bean2.IN_USER = rec.data.A4361REGAS;
        if (Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFrmaSerie').getValue() !== '') {
            me.bean2.IN_TICKET = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtCia').getValue() + "" + Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtFrmaSerie').getValue();
        } else {
            me.bean2.IN_TICKET = '';
        }

        me.bean2.IN_IATA = Ext.getCmp(prototype.idRFNDAssociatedARCR + '-txtIATA').getValue();
        //
        Ext.getCmp(prototype.idRFNDAssociatedARCR + '-grid').getStore().removeAll();
        Ext.getCmp(prototype.idRFNDAssociatedARCR + '-grid').getStore().loadPage(1, {
            params: {
                beanString: JSON.stringify(me.bean2)

            }, callback: function (records, operation, success) {
                if (records.length !== 0) {
                    Ext.getCmp(prototype.idRFNDAssociatedARCR + '-lbl-total2').setText(records.length);
                } else {
                    Ext.getCmp(prototype.idRFNDAssociatedARCR + '-lbl-total2').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }

            }
        });

    },
    OnAmountInteger: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000');
    },
    onColumnIntegerRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.util.Format.number(value, '0,000');
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onRendererColumnOnCab: function (value, metaData, record, rowIndex, colIndex, store, view) {
        if (record.get('A4361DIAS') <= 3) {
            value = 'green';
        } else if (record.get('A4361DIAS') > 3 || record.get('A4361DIAS') <= 5) {
            value = 'orange';
        } else {
            value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    onRendererColumnAttr: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        return value;
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A4363FLAG'))) {
            case 'E':
                color = '#F78181';
                value = 'ERROR PROCESS';
                break;
            case 'A':
                color = '#81BEF7';
                value = 'IN PROCESS';
                break;
            case 'R':
                color = '#F78181';
                value = 'REJECTED';
                break;
            case 'F':
                color = '#81F781';
                value = 'AUTHORISED';
                break;
            case 'C':
                color = '#F781D8';
                value = 'REACTIVATION';
                break;
            case 'Y':
                color = '#CCFF00';
                value = 'PENDING';
                break;
            case 'B':
                color = '#E3DAED';
                value = 'GIVE USE IN PRAXIS';
                break;
        }
        metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    searchform_detalle2: function () {
        var me = this;
        //
        Ext.getCmp(prototype.idRFNDAssociatedARCR + '-grid').getStore().removeAll();
        Ext.getCmp(prototype.idRFNDAssociatedARCR + '-grid').getStore().loadPage(1, {
            params: {
                beanString: JSON.stringify(me.bean2)

            }, callback: function (records, operation, success) {
                if (records.length !== 0) {
                    Ext.getCmp(prototype.idRFNDAssociatedARCR + '-lbl-total2').setText(records.length);
                } else {
                    Ext.getCmp(prototype.idRFNDAssociatedARCR + '-lbl-total2').setText('0');
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }

            }
        });

    }
});

