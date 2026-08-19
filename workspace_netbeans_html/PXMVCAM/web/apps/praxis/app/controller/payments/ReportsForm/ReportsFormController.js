Ext.define('Ext.Praxis.controller.payments.ReportsForm.ReportsFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ReportsFormController',
    url2: CONTEXTPATH + '/BwrBSPLINKRFND',
    childs: '5',
    panelActual: '',
    bean: {},
    beanEXCEL: {},
    beanDownload: {},
    init: function (view) {
        me = this;
        prototype.id = 'ReportsForm';
        prototype.url = CONTEXTPATH + '/ReportsForm';
        this.childs = Ext.getCmp(prototype.id + '-panelMain').items.items;
        me.panelActual = '-panelGridDataMain';
        global.selectedChild(me.childs, prototype.id + me.panelActual);
        this.control({
//            //   -------------------Eventos Genericos --------------------
            '#ReportsForm-xpanel': {
                afterrender: me.xpanel_afterrender
            },
            '#ReportsForm-btnSearch': {
                click: this.onSearchClick
            },
            '#UserMaintenanceForm-btnClear': {
                click: this.btnClear_click
            },
            '#ReportsForm-btnExcel': {
                click: this.btnExcel_click
            },
            /* '#UserMaintenanceForm-btnFilter': {
             click: this.btnFilter_click
             },
             '#UserMaintenanceForm-btnAdd': {
             click: this.btnAdd_click
             },
             '#UserMaintenanceForm-btn-pag-first': {
             click: this.pagFirst
             },
             '#UserMaintenanceForm-btn-pag-previous': {
             click: this.pagPrevious
             },
             '#UserMaintenanceForm-btn-pag-next': {
             click: this.pagNext
             },
             '#UserMaintenanceForm-btn-pag-last': {
             click: this.pagLast
             },
             */
        });
    },

    xpanel_afterrender: function (obj, e) {
        this.setUser();
        this.setStoresFilters();
        this.setStoresGrids();
    },

    setUser: function () {
        var me = this;
        Ext.Ajax.request({
            url: me.url2 + '/getUser',
            timeout: 60000000,
            method: 'POST',
            //params: this.beanTMP,
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getCmp(prototype.id + '-txtUser').setValue(Ext.String.trim(res.user.USR));
                const allowedUsers = ['SAP26T', 'UAT227', 'XELIZABETH', 'LTIRADO', 'LTIRADOT'];
                const currentUser = Ext.String.trim(res.user.USR);

                if (allowedUsers.includes(currentUser)) {
                    Ext.getCmp(prototype.id + '-txtUser').setReadOnly(false);
                }
            }
        });
    },
    setStoresFilters: function () {
        var CmbTypeRfnd = Ext.getCmp(prototype.id + '-CmbTypeRfnd');
        CmbTypeRfnd.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "All"},
                {"code": "BYP", "name": "By Payment"},
                {"code": "SET", "name": "Settlement"},
                {"code": "BYT", "name": "By Ticket"}
            ]
        }));
        CmbTypeRfnd.setValue("");
    },
    setStoresGrids: function () {
        var grid00 = Ext.getCmp(prototype.id + '-gridDataMain');
        var store00 = Ext.create('Ext.data.Store', {
            storeId: prototype.id + '-store-grid00',
            pageSize: 20,
            proxy: {
                type: 'ajax',
                url: prototype.url + '/SearchQueryReports',
                timeout: 60000000,
                reader: {
                    type: 'json',
                    rootProperty: 'data',
                    totalProperty: 'total'
                }
            }
        });

        grid00.setStore(store00);

        Ext.getCmp(prototype.id + '-pagginator-01').setStore(store00);
    },
    eventKey: function (e, eOpts) {
        if (eOpts.getKey() === 13) {
            this.onSearchClick();
        }
    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }

    },
    onUpperValue: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onCmbSearchChange: function (obj, records, eOpts) {
        var txtFrom = Ext.getCmp(prototype.id + '-txtFrom');
        var txtTo = Ext.getCmp(prototype.id + '-txtTo');
        var txtCodReport = Ext.getCmp(prototype.id + '-txtCodReport');
        if (obj.getValue() === "1") {
            txtFrom.show();
            txtTo.show();
            txtCodReport.setValue('');
            txtCodReport.hide();
        } else if (obj.getValue() === "2") {
            txtFrom.hide();
            txtTo.hide();
            txtCodReport.show();
            txtFrom.setValue('');
            txtTo.setValue('');
        } else {
            txtFrom.show();
            txtTo.show();
            txtCodReport.hide();
            txtCodReport.setValue('');
        }
    },
    onSearchClick: function (btn) {
        var me = this;
        var cmbsearch = Ext.getCmp(prototype.id + '-cmbsearch').getValue();
        var txtFrom = Ext.getCmp(prototype.id + '-txtFrom').getRawValue();
        var txtTo = Ext.getCmp(prototype.id + '-txtTo').getRawValue();
        var txtCodReport = Ext.getCmp(prototype.id + '-txtCodReport').getValue();
        var CmbTypeRfnd = Ext.getCmp(prototype.id + '-CmbTypeRfnd').getValue();
        var txtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();

        if (cmbsearch === '2' && txtCodReport === '')
        {
            global.Msg({msg: 'Enter CodReport'});
            return;
        }
        if (cmbsearch === '1' && txtFrom === '')
        {
            global.Msg({msg: 'Enter Date From'});
            return;
        }
        if (cmbsearch === '1' && txtTo === '')
        {
            global.Msg({msg: 'Enter Date TO'});
            return;
        }

        me.bean.IN_OPTION = cmbsearch;
        me.bean.IN_DATEFROM = txtFrom;
        me.bean.IN_DATETO = txtTo;
        me.bean.IN_CODADJU = txtCodReport;
        me.bean.IN_PROCTYPE = CmbTypeRfnd;
        me.bean.IN_USER = txtUser;

        Ext.getCmp(prototype.id + '-gridDataMain').getStore().loadPage(1, {
            params: me.bean,
            callback: function (records, operation, success) {
                if (success) {
                } else {
                    global.Msg({msg: "Data not found.", icon: 2, fn: function () {
                        }});

                }

            }
        });


    },
    btnExcel_click: function (obj, e) {
        var me = this;
        var cmbsearch = Ext.getCmp(prototype.id + '-cmbsearch').getValue();
        var txtFrom = Ext.getCmp(prototype.id + '-txtFrom').getRawValue();
        var txtTo = Ext.getCmp(prototype.id + '-txtTo').getRawValue();
        var txtCodReport = Ext.getCmp(prototype.id + '-txtCodReport').getValue();
        var CmbTypeRfnd = Ext.getCmp(prototype.id + '-CmbTypeRfnd').getValue();
        var txtUser = Ext.getCmp(prototype.id + '-txtUser').getValue();

        if (cmbsearch === '2' && txtCodReport === '')
        {
            global.Msg({msg: 'Enter CodReport'});
            return;
        }
        if (cmbsearch === '1' && txtFrom === '')
        {
            global.Msg({msg: 'Enter Date From'});
            return;
        }
        if (cmbsearch === '1' && txtTo === '')
        {
            global.Msg({msg: 'Enter Date TO'});
            return;
        }

        me.beanEXCEL.IN_OPTION = cmbsearch;
        me.beanEXCEL.IN_DATEFROM = txtFrom;
        me.beanEXCEL.IN_DATETO = txtTo;
        me.beanEXCEL.IN_CODADJU = txtCodReport;
        me.beanEXCEL.IN_PROCTYPE = CmbTypeRfnd;
        me.beanEXCEL.IN_USER = txtUser;

        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Excel ?',
            buttons: Ext.MessageBox.OKCANCEL,
            scope: this,
            icon: Ext.MessageBox.QUESTION,
            modal: true,
            fn: function (btn) {
                if (btn === 'ok') {
                    global.getFile(prototype.url + '/getXLSX?beanString=' + encodeURI(JSON.stringify(me.beanEXCEL)));
                }
            }
        });
    },
    OnColumnIntRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.util.Format.number(value, '0,000');
    },
    onRendererColumnStatus: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var color = '#FFFFFF';
        switch (String(record.get('A4803FLAGDESC'))) {
            case 'PENDING':
                color = '#EFE41B';
                break; //value = 'PENDING'; break; 
            case 'COMPLETED':
                color = '#F5A9F2';
                value = 'COMPLETED';
                break;
            case 'NOTIFIED':
                color = '#81F7BE';
                value = 'NOTIFIED';
                break;
            case 'ERROR':
                color = '#F2A60D';
                value = 'ERROR';
                break;
            case 'ERROR':
                color = '#F2A60D';
                value = 'ERROR';
                break
            case 'PROCESSING':
                color = '#FF9966';
                value = 'PROCESSING';
                break;

                //{"code": "G", "name": "POST BILLING"},
        }

        //metaData.tdAttr = 'data-qtip="' + value + '"';
        metaData.style = "font-weight:bold !important; background:" + color + " !important";
        return value;
    },
    DownloadFiles_python: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        if (Ext.String.trim(rec.data.A4803FLAG) === 'T' || Ext.String.trim(rec.data.A4803FLAG) === 'N') {
            me.beanDownload.IN_OPTION = "3";
            me.beanDownload.A4803FPRO = Ext.String.trim(rec.data.A4803FPRO);
            me.beanDownload.A4803FCUL = Ext.String.trim(rec.data.A4803FCUL);
            me.beanDownload.A4803CODRE = Ext.String.trim(rec.data.A4803CODRE);
            me.beanDownload.A4803TYPEDES = Ext.String.trim(rec.data.A4803TYPEDES);
            me.exportFiles(prototype.url + '/DownloadFiles_python?beanString=' + encodeURI(JSON.stringify(me.beanDownload)));
        } else {
            Ext.Msg.alert('.: PRAXIS :.', 'To perform the download, the process status must be set to Completed, Notified, or Processing.');
            return;
        }

    },
    exportFiles: function (_path) {
        Ext.Msg.show({
            title: '.:PRAXIS:.',
            msg: 'Download Files zip ?',
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

    onClickFilterBtn: function (obj) {
        const panelFilter = Ext.getCmp(prototype.id + '-contentFilter');
        if (panelFilter.isVisible()) {
            panelFilter.hide();
        } else {
            panelFilter.show();
        }
    },
    onClickClearBtn: function (obj) {
        Ext.getCmp(prototype.id + '-panelFilters').getForm().reset();
    },

    onClickAddBtn: function (obj) {
        Ext.create('Ext.Praxis.view.payments.ReportsForm.DataEntrys.DataEntryReport', {
            //id: prototype.id01 + '-dataEntryUserMain',
            params: {
                panel: me.panelActual
            }
        }).show();
    },

    loadFilters: async function () {
        const filters = Ext.getCmp(prototype.id + '-contentFilter');
        filters.setLoading(true);
//        let store = global.callStoreGet('PRAXISMP', 'SQP05004', view.searchParams);
        const res = await global.callStoreGet('PRAXISMP', 'SQP05276', {IN_STATUS: '1'});
        
        const cmbProcessor = Ext.getCmp(prototype.id + '-cmbProctypef');
        const cmbCountry = Ext.getCmp(prototype.id + '-cmbPaisesfBP');
//         const cmbDocType = Ext.getCmp(prototype.idEntry + '-');
        const cmbStatus = Ext.getCmp(prototype.id + '-cmbStatus');
        const CmbCurrency = Ext.getCmp(prototype.id + '-cmbMonedafBP');
        const cmbAdjCode = Ext.getCmp(prototype.id + '-cmbCodadjub');
        const cmbeErrorCode = Ext.getCmp(prototype.id + '-cmbCerrorb');

        global.setComboStore(cmbCountry, res.lstRs.at(4), 'CODE', 'NAME', '');
        global.setComboStore(CmbCurrency, res.lstRs.at(5), 'CODE', 'NAME', '');
        global.setComboStore(cmbProcessor, res.lstRs.at(2), 'A4451KEY2', 'A4451DESC1', '');
        global.setComboStore(cmbAdjCode, res.lstRs.at(1), 'A4451KEY3', 'A4451DESC1', '');
        global.setComboStore(cmbeErrorCode, res.lstRs.at(0), 'CODE', 'A4451DESC1', '');
        global.setComboStore(cmbStatus, res.lstRs.at(8), 'A4451STS', 'A4451DESC1', '');
        filters.setLoading(false);

    }


});

