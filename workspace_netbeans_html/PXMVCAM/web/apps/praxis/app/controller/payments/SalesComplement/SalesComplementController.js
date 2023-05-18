Ext.define('Ext.Praxis.controller.payments.SalesComplement.SalesComplementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesComplementController',
    fecha: new Date(),
    url: CONTEXTPATH + '/SalesComplement',
    searchParams: null,
    searchUrl: null,
    gridType: 'P',
    init: function (view) {
    },
    afterRender: function (obj, e) {
        const me = this;
        me.fillStoreCombos();
        me.rbChangeFilter(me.gridType);
        me.onClickSearchBtn();
    },
    fillStoreCombos: function () {
        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');


        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');

        Ext.getCmp(prototype.id + '-cmbFindByFAMEX').setValue('X');
        Ext.getCmp(prototype.id + '-cmbFindBySTVAL').setValue('X');

        Ext.getCmp(prototype.id + '-txtTKT').setValue('');
        Ext.getCmp(prototype.id + '-txtOPERATNBR').setValue('');
        Ext.getCmp(prototype.id + '-txtAuth').setValue('');
        Ext.getCmp(prototype.id + '-txtCC1').setValue('');
        Ext.getCmp(prototype.id + '-txtCC2').setValue('');


    },
    setSearchParameters: function () {
        const me = this;
        //opcion principal
        const opt = Ext.getCmp(prototype.id + '-radiogroupTypeX').getValue().rbgTypeX;

        //botones constantes
        const btnOpenbr = Ext.getCmp(prototype.id + '-txtOPERATNBR'),
                cmbLigas = Ext.getCmp(prototype.id + '-cmbFindByLigas'),
                cmbTablet = Ext.getCmp(prototype.id + '-cmbFindByTablet');

        //filters value
        let ccust = '139',
                date = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue(),
                datefrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue(),
                dateto = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue(),
                famex = Ext.getCmp(prototype.id + '-cmbFindByFAMEX').getValue(),
                stval = Ext.getCmp(prototype.id + '-cmbFindBySTVAL').getValue(),
                tkt = Ext.getCmp(prototype.id + '-txtTKT').getValue(),
                pnr = Ext.getCmp(prototype.id + '-txtPNR').getValue(),
                openbr = btnOpenbr.getValue(),
                cc = '',
                cc1 = (Ext.getCmp(prototype.id + '-txtCC1').getValue() || '').trim(),
                cc2 = (Ext.getCmp(prototype.id + '-txtCC2').getValue() || '').trim(),
                auth = Ext.getCmp(prototype.id + '-txtAuth').getValue(),
                fligas = cmbLigas.getValue(),
                ftablet = cmbTablet.getValue();
        if (cc1 !== '' && cc2 !== '') {
            cc = `${cc1}%${cc2}%`;
        }
        //switch
        const opts = {
            'P': () => {
                me.searchParams = {
                    IN_CCUST: ccust,
                    IN_DATE: date,
                    IN_DATEFROM: datefrom,
                    IN_DATETO: dateto,
                    IN_FAMEX: famex,
                    IN_STVAL: stval,
                    IN_TKT: tkt,
                    IN_PNR: pnr,
                    IN_SCARDN: cc,
                    IN_SAUTHOC: auth
                };
                console.log(me.searchParams);
                me.searchUrl = me.url + '/getPlusgradeInfo';
                me.gridType = opt;
            },
            'L': () => {
                me.searchParams = {
                    IN_CCUST: ccust,
                    IN_DATE: date,
                    IN_DATEFROM: datefrom,
                    IN_DATETO: dateto,
                    IN_FAMEX: famex,
                    IN_STCON: stval,
                    IN_PNR: pnr,
                    IN_SCARDN: cc,
                    IN_SAUTHOC: auth,
                    IN_MERCHID: fligas,
                    IN_OPERATNBR: openbr
                };
                console.log(me.searchParams);
                me.searchUrl = me.url + '/getLigasInfo';
                me.gridType = opt;
            },
            'T': () => {
                me.searchParams = {
                    IN_CCUST: ccust,
                    IN_DATE: date,
                    IN_DATEFROM: datefrom,
                    IN_DATETO: dateto,
                    IN_FAMEX: famex,
                    IN_STCON: stval,
                    IN_PNR: pnr,
                    IN_SCARDN: cc,
                    IN_SAUTHOC: auth,
                    IN_MERCHID: ftablet,
                    IN_OPERATNBR: openbr
                };
                console.log(me.searchParams);
                me.searchUrl = me.url + '/getTabletsInfo';
                me.gridType = opt;
            },
        };
        opts[opt]();
    },
    rbChangeType: function (obj) {
        this.rbChangeFilter(obj.getValue().rbgTypeX);
        this.onClickSearchBtn();
    },
    rbChangeFilter: function (option) {
        const btnOpenbr = Ext.getCmp(prototype.id + '-txtOPERATNBR'),
                lblOpenbr = Ext.getCmp(prototype.id + '-lblOPERATNBR'),
                cmbLigas = Ext.getCmp(prototype.id + '-cmbFindByLigas'),
                cmbTablet = Ext.getCmp(prototype.id + '-cmbFindByTablet');
        const opts = {
            'P': () => {
                lblOpenbr.hide();
                btnOpenbr.hide();
                cmbLigas.hide();
                cmbTablet.hide();
            },
            'L': () => {
                lblOpenbr.show();
                btnOpenbr.show();
                cmbLigas.show();
                cmbTablet.hide();
            },
            'T': () => {
                lblOpenbr.show();
                btnOpenbr.show();
                cmbLigas.hide();
                cmbTablet.show();
            },
        }
        opts[option]();
    },
    renderGridData: function () {
        const me = this;
        const panel = Ext.getCmp(prototype.id + '-centerC-panel01');
        panel.removeAll();
        me.setSearchParameters();
        let gridData = Ext.create('Ext.Praxis.view.payments.SalesComplementForm.GridData', {
            id: prototype.id + '-gridData-01',
            searchParams: me.searchParams,
            searchUrl: me.searchUrl,
            gridType: me.gridType
        });
        panel.add(gridData);
    },
    onClickSearchBtn: function () {
        this.renderGridData();
    },
    onClickTktDetail: function (grid, html, rowIndex, colIndex, obj) {
        //console.log(obj.record.data);
        const me = this;
        const record = obj.record.data;
        const url = this.url + '/getTicketsPg';
        const panel = Ext.getCmp(prototype.id + '-centerC-panel01');
        let panelActual = panel.items.items.at(-1);
        panelActual.hide();
        let tktParams = {
            IN_CCUST: '139',
            IN_SDATES: record.sdate,
            IN_SPNR: record.pnr,
            IN_PLUSGRADE: record.plusgraid
        };
        let tktPanel = Ext.create('Ext.Praxis.view.payments.SalesComplementForm.GridDataTicket',
                {
                    id: prototype.id + '-grid-tkt-detail',
                    backButton: me.backDrillDownButton,
                    searchParams: tktParams,
                    searchUrl: url
                });
        panel.add(tktPanel);
    },
    onViewPNR: function (grid, html, rowIndex, colIndex, obj) {
        const record = obj.record.data;
        let winPnrDataEntry = Ext.create('Ext.Praxis.view.payments.SalesComplementForm.PnrDataEntry', {
            id: prototype.id + '-dataEntry-searchPnr',
            params: record
        });
        winPnrDataEntry.show();
    },
    backDrillDownButton: function () {
        const panel = Ext.getCmp(prototype.id + '-centerC-panel01');
        let panelActual = panel.items.items.at(-1);
        let panelAnterior = panel.items.items.at(-2);
        panelActual.destroy();
        panelAnterior.show();
    },
    copySPNR: function (obj, metaData, rowNum, columnNum, obj2, rowData) {
        navigator.clipboard.writeText(rowData.data.pnr.trim());
        global.Msg({
            msg: 'SPNR Copied to clipboard!: ' + rowData.data.pnr.trim()
        });
    },
    onClickSearchTicket: function (grid, html, rowIndex, colIndex, obj) {
        let data = obj.record.data;
        //console.log(data);
        let strTkt = data.emdnumber;
        if (!strTkt) {
            return;
        }
        prototypeProgram.view = 'payments-sales-complement-form';
        prototypeProgram.nprog = 'PX00000627'
        prototypeProgram.title = 'Sales Complement';
        prototypeProgram.modulo = '';

        let beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
        beanProMasterTicket.IN_SEQ = win.stringPad(data.seq, '0', 2);

        console.log(beanProMasterTicket);

        win.displayProMasterTicket(this, 'ViewFlightConciliation', beanProMasterTicket);
    },
    onClickBackBtn: function (obj) {
        window.location.href = CONTEXTPATH;
    },
    onClickClearBtn: function (obj) {
        this.fillStoreCombos();
    },
    onClickFilterBtn: function (obj) {
        const panelFilter = Ext.getCmp(prototype.id + '-contentFilter');
        if (panelFilter.isVisible()) {
            panelFilter.hide();
        } else {
            panelFilter.show();
        }
    },
    onClickExcelBtn: function (obj) {
        alert('Funcion en Construccion');
    }
});


