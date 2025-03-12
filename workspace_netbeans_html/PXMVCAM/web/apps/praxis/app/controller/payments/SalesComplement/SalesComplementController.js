Ext.define('Ext.Praxis.controller.payments.SalesComplement.SalesComplementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalesComplementController',
    fecha: new Date(),
    url: CONTEXTPATH + '/SalesComplement',
    searchParams: null,
    searchUrl: null,
    gridType: 'P',
    init: function (view) {
        prototype.id = 'SalesComplementForm';
        prototype.url = CONTEXTPATH + '/SalesComplement';
    },
    afterRender: async function (obj, e) {
        const me = this;
        await me.fillStoreCombos();
        me.rbChangeFilter(me.gridType);
        me.onClickSearchBtn();
    },
    fillStoreCombos: async function () {
        const me = this;
        const panel = me.getCmp({id: '-panelFilters'});
        panel.mask('Loading Filters...');
        var month = this.fecha.getMonth() + 1;

        if (month < 10) {
            month = '0' + month;
        }

        var storeComboDataYear = win.getStoreYear(false);
        var storeComboDataMonth = win.getStoreMonth(true);
        var storeComboDataDay = win.getStoreDays(true);

        const dataCmb = await this.getMasterTableInfo();
        const dataPaises = await fetch(`${me.url}/loadPaises`)
                .then(async res => {
                    return await res.json();
                })
                .catch(err => {
                    console.error('Error en Load Paises: ', err);
                    return [];
                });

        //<editor-fold defaultstate="collapsed" desc="Funciones Store">
        const setComboArrayStore = ({id, value, data, key}) => {
            const cmb = me.getCmp({id: id});
            cmb.suspendEvents(false);
            cmb.bindStore(me.createArrayStore({data: data.filter(x => x.a4451key2.trim() === key)}));
            cmb.setValue(value);
            cmb.resumeEvents();
        };
        const setComboStore = ({id, value, data, key, display}) => {
            const cmb = me.getCmp({id: id});
            let store = me.createComboStore({data: data.filter(x => x.a4451key2.trim() === key),
                valueField: 'a4451key3',
                displayField: display});
            cmb.suspendEvents(false);
            cmb.bindStore(store);
            cmb.setValue(value);
            cmb.resumeEvents();
        };
        //</editor-fold>

        //<editor-fold defaultstate="collapsed" desc="Combos Fechas">
        Ext.getCmp(prototype.id + '-cmbDateFromYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateFromDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateFromYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateFromMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateFromDay').setValue('');

        Ext.getCmp(prototype.id + '-cmbDateToYear').bindStore(storeComboDataYear);
        Ext.getCmp(prototype.id + '-cmbDateToMonth').bindStore(storeComboDataMonth);
        Ext.getCmp(prototype.id + '-cmbDateToDay').bindStore(storeComboDataDay);

        Ext.getCmp(prototype.id + '-cmbDateToYear').setValue(this.fecha.getFullYear());
        Ext.getCmp(prototype.id + '-cmbDateToMonth').setValue('');
        Ext.getCmp(prototype.id + '-cmbDateToDay').setValue('');
        //</editor-fold>

        setComboArrayStore({id: '-cmbFecFiltro', value: 'SDATE', data: dataCmb, key: 'CMBDATE'});
        setComboArrayStore({id: '-cmbFindByFAMEX', value: 'X', data: dataCmb, key: 'CMBCVA'});
        setComboArrayStore({id: '-cmbFindBySTVAL', value: 'X', data: dataCmb, key: 'CMBCVS'});
        setComboStore({id: '-cmbFindByCreditCard', value: '', data: dataCmb, key: 'CMBTARJ', display: 'a4451desc1'});

        setComboStore({id: '-cmbFindByPlusgrade', value: '', data: dataCmb, key: 'MERCHPLUS', display: 'a4451desc2'});
        setComboStore({id: '-cmbFindByLigas', value: '', data: dataCmb, key: 'MERCHLIG', display: 'a4451desc2'});
        setComboStore({id: '-cmbFindByTablet', value: '', data: dataCmb, key: 'MERCHTAB', display: 'a4451desc2'});


        const cmbPaises = me.getCmp({id: '-cmbFindByCountry'});
        cmbPaises.suspendEvents(false);
        cmbPaises.bindStore(me.createComboStore({data: dataPaises, valueField: 'code', displayField: 'name'}));
        cmbPaises.setValue('');
        cmbPaises.resumeEvents();

        Ext.getCmp(prototype.id + '-txtTKT').setValue('');
        Ext.getCmp(prototype.id + '-txtOPERATNBR').setValue('');
        Ext.getCmp(prototype.id + '-txtAuth').setValue('');
        Ext.getCmp(prototype.id + '-txtCC1').setValue('');
        Ext.getCmp(prototype.id + '-txtCC2').setValue('');

        panel.unmask();

    },
    getMasterTableInfo: async function () {
        const me = this;
        const params = {
            KEY1: 'SC'
        };
        const data = await fetch(`${me.url}/loadMasterInfo?${new URLSearchParams(params)}`)
                .then(async res => {
                    return await res.json();
                }).catch(err => {
            console.error('getMasterTableInfo => ', err);
        });
        return data.lst;

    },
    setSearchParameters: function () {
        const me = this;
        //opcion principal
        const opt = Ext.getCmp(prototype.id + '-radiogroupTypeX').getValue().rbgTypeX;

        //botones constantes
        const btnOpenbr = me.getCmp({id: '-txtOPERATNBR'}),
                cmbLigas = me.getCmp({id: '-cmbFindByLigas'}),
                cmbTablet = me.getCmp({id: '-cmbFindByTablet'}),
                cmbPlusgrade = me.getCmp({id: '-cmbFindByPlusgrade'}),
                cmbPais = me.getCmp({id: '-cmbFindByCountry'}),
                cmbCardt = me.getCmp({id: '-cmbFindByCreditCard'});

        //filters value
        let ccust = '139',
                date = Ext.getCmp(prototype.id + '-cmbFecFiltro').getValue(),
                datefrom = Ext.getCmp(prototype.id + '-cmbDateFromYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateFromDay').getValue(),
                dateto = Ext.getCmp(prototype.id + '-cmbDateToYear').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToMonth').getValue() +
                Ext.getCmp(prototype.id + '-cmbDateToDay').getValue(),
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
                ftablet = cmbTablet.getValue(),
                fplusgrade = cmbPlusgrade.getValue(),
                pais = cmbPais.getValue(),
                ttarjeta = cmbCardt.getValue();
        if (cc1 !== '' && cc2 !== '') {
            cc = `${cc1}%${cc2}%`;
        }
        //<editor-fold defaultstate="collapsed" desc="Radio Button Opts">
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
                    IN_SAUTHOC: auth,
                    IN_MERCHID: fplusgrade,
                    IN_COUNTRY: pais,
                    IN_TCARD: ttarjeta
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
                    IN_OPERATNBR: openbr,
                    IN_COUNTRY: pais,
                    IN_TCARD: ttarjeta
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
                    IN_OPERATNBR: openbr,
                    IN_COUNTRY: pais,
                    IN_TCARD: ttarjeta
                };
                console.log(me.searchParams);
                me.searchUrl = me.url + '/getTabletsInfo';
                me.gridType = opt;
            },
        };
        //</editor-fold>
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
                cmbTablet = Ext.getCmp(prototype.id + '-cmbFindByTablet'),
                cmbPlusg = Ext.getCmp(prototype.id + '-cmbFindByPlusgrade');
        const opts = {
            'P': () => {
                cmbPlusg.show();
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
                cmbPlusg.hide();
            },
            'T': () => {
                lblOpenbr.show();
                btnOpenbr.show();
                cmbLigas.hide();
                cmbTablet.show();
                cmbPlusg.hide();
            }
        };
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
        console.log(data);
        let strTkt = data.emdnumber || data.tkt;
        let strSeq = data.seq || '00';
        if (!strTkt) {
            return;
        }
        prototypeProgram.view = 'payments-sales-complement-form';
        prototypeProgram.nprog = 'PX00000627';
        prototypeProgram.title = 'Sales Complement';
        prototypeProgram.modulo = '';

        let beanProMasterTicket = {};

        beanProMasterTicket.IN_CIA = strTkt.substr(0, 3);
        beanProMasterTicket.IN_FORMA = strTkt.substr(3, 4);
        beanProMasterTicket.IN_SERIE = strTkt.substr(7, 6);
        beanProMasterTicket.IN_SEQ = win.stringPad(strSeq, '0', 2);

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
    onChangeFechaBtn: function (obj) {
        const me = this;
        let combo2 = null;
        let valor1 = me.parseInt(obj.getValue());
        const opts = {
            'cmbDateFromMonth': () => {
                combo2 = me.getCmp({id: '-cmbDateToMonth'});
                combo2.setValue(obj.getValue());
            },
            'cmbDateToMonth': () => {
                combo2 = me.getCmp({id: '-cmbDateFromMonth'});
                let valor2 = me.parseInt(combo2.getValue());
                if (valor1 >= valor2 && valor2 !== '') {
                    return;
                }
                combo2.setValue(obj.getValue());
            },
            'cmbDateFromYear': () => {
                combo2 = me.getCmp({id: '-cmbDateToYear'});
                combo2.setValue(obj.getValue());
            },
            'cmbDateToYear': () => {
                combo2 = me.getCmp({id: '-cmbDateFromYear'});
                let valor2 = me.parseInt(combo2.getValue());
                if (valor1 >= valor2 && valor2 !== '') {
                    return;
                }
                combo2.setValue(obj.getValue());
            },
            'cmbDateFromDay': () => {
                combo2 = me.getCmp({id: '-cmbDateToDay'});
                combo2.setValue(obj.getValue());
            },
            'cmbDateToDay': () => {
                combo2 = me.getCmp({id: '-cmbDateFromDay'});
                let valor2 = me.parseInt(combo2.getValue());
                if (valor1 >= valor2 && valor2 !== '') {
                    return;
                }
                combo2.setValue(obj.getValue());
            }
        };

        opts[obj.id.split('-').at(-1)]();
        //console.log(obj.getValue());
    },
    onClickExcelBtn: function () {
        const me = this;
        let params = Object.assign({}, me.searchParams);
        params.excel = true;
        const opts = {
            'P': () => {
                global.getFile(`${me.url}/downloadPlusgradeInfo?${new URLSearchParams(params)}`);
            },
            'L': () => {
                global.getFile(`${me.url}/downloadLigasInfo?${new URLSearchParams(params)}`);
            },
            'T': () => {
                global.getFile(`${me.url}/downloadTabletInfo?${new URLSearchParams(params)}`);
            }
        };
        if (opts[me.gridType]) {
            opts[me.gridType]();
        }
    },
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    getCmp: function ( {id}){
        return Ext.getCmp(prototype.id + id);
    },
    createComboStore: function ( {data, valueField, displayField}) {
        //crea record vacio
        let allRecord = {};
        allRecord[displayField] = 'All';
        allRecord[valueField] = '';
        //limpia record de data
        data.forEach(obj => {
            for (let attr in obj) {
                if (typeof obj[attr] === 'string') {
                    obj[attr] = obj[attr].trimEnd();
                }
            }
        });
        //crea Store
        let store = me.createStore({data: data});
        //inserta record vacio
        store.insert(0, allRecord);
        return store;
    },
    createArrayStore: function ( {data}){
        const store = new Ext.data.SimpleStore({
            fields: ['code', 'name'],
            data: data.map(x => {
                return [x.a4451key3.trim(), x.a4451desc1.trimEnd()]
            })
        });
        return store;
    },
    createStore: function ( {data}){
        return Ext.create('Ext.data.Store', {
            autoLoad: true,
            data: data,
            pageSize: 20
        });
    },
    parseInt: function (number) {
        if (number && number !== '') {
            return parseInt(number);
        }
        ;
        return number;
    }
    //</editor-fold>

});


