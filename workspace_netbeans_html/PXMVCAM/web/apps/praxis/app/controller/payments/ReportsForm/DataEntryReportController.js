Ext.define('Ext.Praxis.controller.payments.ReportsForm.DataEntryReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DataEntryReportController',
    beanReport: {},
    url: CONTEXTPATH + '/ReportsForm',
    url2: CONTEXTPATH + '/SalesReconciliationBPO',
    chekbox: 'P',
    init: function (view) {

    },
    afterRender: async function (obj, e) {
        await this.loadFilters();
    },

    loadFilters: async function () {
        const me = this;
        const filterPanel = Ext.getCmp(prototype.idEntry + '-panelFilters');
        //const filters = Ext.getCmp(prototype.idEntry + '-panelFilters');
        filterPanel.mask('Loading Filters...');
        const res = await fetch(`${me.url2}/loadFilters`);
        if (res.ok) {
            const data = await res.json();
            const procesadores = data.procesadores;
            const monedas = data.monedas.map(x => ({code: x.a006PAIS, name: `${x.a006PAIS}`}));
            const errores = data.cerror.map(x => ({name: `${x.a4451key3.trim()} - ${x.a4451desc1}`, code: x.a4451key3}));
            me.creditcards = data.creditcards;
            me.users = data.admins.map(x => x.a4451key3.trimEnd());
            //<editor-fold defaultstate="collapsed" desc="Combos">
            /*const cmbProcesadores = Ext.getCmp(prototype.idEntry + '-cmbProctype');
             me.setComboStore({cmp: cmbProcesadores, data: procesadores,
             valueField: 'a4451key2', displayField: 'a4451desc1', value: ''});*/

            const cmbProctypef = Ext.getCmp(prototype.idEntry + '-cmbProctypef');
            me.setComboStore({cmp: cmbProctypef, data: procesadores,
                valueField: 'a4451key2', displayField: 'a4451desc1', value: ''});

            const cmbProctypeSettl = Ext.getCmp(prototype.idEntry + '-cmbProctypeSettl');
            me.setComboStore({cmp: cmbProctypeSettl, data: procesadores,
                valueField: 'a4451key2', displayField: 'a4451desc1', value: ''});

            /*const cmbPaises = Ext.getCmp(prototype.idEntry + '-cmbPaisesBP');
             me.setComboStore({cmp: cmbPaises, data: data.paises,
             valueField: 'code', displayField: 'name', value: ''});*/

            const cmbPaisesf = Ext.getCmp(prototype.idEntry + '-cmbPaisesfBP');
            me.setComboStore({cmp: cmbPaisesf, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});

            /*const cmbPaisesBT = Ext.getCmp(prototype.idEntry + '-cmbPaisesBT');
             me.setComboStore({cmp: cmbPaisesBT, data: data.paises,
             valueField: 'code', displayField: 'name', value: ''});*/

            const cmbPaisesfBT = Ext.getCmp(prototype.idEntry + '-cmbPaisesfBT');
            me.setComboStore({cmp: cmbPaisesfBT, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbPaisesSettl = Ext.getCmp(prototype.idEntry + '-cmbPaisesSettl');
            me.setComboStore({cmp: cmbPaisesSettl, data: data.paises,
                valueField: 'code', displayField: 'name', value: ''});

            /*  const cmbCerror = Ext.getCmp(prototype.idEntry + '-cmbCerror');
             me.setComboStore({cmp: cmbCerror, data: errores,
             valueField: 'code', displayField: 'name', value: ''});*/

            /* const cmbCodadju = Ext.getCmp(prototype.idEntry + '-cmbCodadju');
             me.setComboStore({cmp: cmbCodadju, data: data.codadju,
             valueField: 'a4451key3', displayField: 'a4451desc1', value: ''});*/

            const cmbCerrorb = Ext.getCmp(prototype.idEntry + '-cmbCerrorb');
            me.setComboStore({cmp: cmbCerrorb, data: errores,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbCodadjub = Ext.getCmp(prototype.idEntry + '-cmbCodadjub');
            me.setComboStore({cmp: cmbCodadjub, data: data.codadju,
                valueField: 'a4451key3', displayField: 'a4451desc1', value: ''});

            const cmbMdasBT = Ext.getCmp(prototype.idEntry + '-cmbMonedaBT');
            me.setComboStore({cmp: cmbMdasBT, data: monedas,
                valueField: 'code', displayField: 'name', value: ''});

            /*const cmbMdasbBT = Ext.getCmp(prototype.idEntry + '-cmbMonedabBT');
             me.setComboStore({cmp: cmbMdasbBT, data: monedas,
             valueField: 'code', displayField: 'name', value: ''});*/

            /*const cmbMdasbBP = Ext.getCmp(prototype.idEntry + '-cmbMonedaBP');
             me.setComboStore({cmp: cmbMdasbBP, data: monedas,
             valueField: 'code', displayField: 'name', value: ''});*/

            const cmbMdasfBP = Ext.getCmp(prototype.idEntry + '-cmbMonedafBP');
            me.setComboStore({cmp: cmbMdasfBP, data: monedas,
                valueField: 'code', displayField: 'name', value: ''});

            const cmbMdasbST = Ext.getCmp(prototype.idEntry + '-cmbMonedabST');
            me.setComboStore({cmp: cmbMdasbST, data: monedas,
                valueField: 'code', displayField: 'name', value: ''});

            const dataAutoComments = data.autocomments.map(x => ({name: `${x.a4451key3.trim()} - ${x.a4451desc1}`, code: x.a4451key3}));
            const cmbAutoComments = Ext.getCmp(prototype.idEntry + '-cmbAutoComment');
            me.setComboStore({cmp: cmbAutoComments, data: dataAutoComments,
                valueField: 'code', displayField: 'name', value: ''});

            //</editor-fold>

        }
        filterPanel.unmask();
    },
    getCmp: function ( {id}){
        return Ext.getCmp(prototype.id + id);
    },
    setComboStore: function ( {cmp, data, valueField, displayField, value}){
        const me = this;
        cmp.suspendEvents(false);
        cmp.bindStore(me.createComboStore({data: data
            , valueField: valueField, displayField: displayField}));
        cmp.setValue(value);
        cmp.resumeEvents();
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
        let store = this.createStore({data: data});
        //inserta record vacio
        store.insert(0, allRecord);
        //console.log('store creado',store);
        return store;
    },
    createArrayStore: function ( {data}){
        const store = new Ext.data.SimpleStore({
            fields: ['code', 'name'],
            data: data.map(x => {
                return [x.code, x.name];
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
    },

    onCancelClick: function () {
        this.view.close();
    },
    onChangeModule: function (radiogroup, newValue, oldValue) {
        const me = this;
        const opt = newValue.opcion;
        me.chekbox = opt;
        //P BY PAYMENT
        var PanelByPayment1 = Ext.getCmp(prototype.idEntry + '-ByPayment1');
        var PanelByPayment2 = Ext.getCmp(prototype.idEntry + '-ByPayment2');
        var PanelByPayment3 = Ext.getCmp(prototype.idEntry + '-ByPayment3');
        var PanelByPayment4 = Ext.getCmp(prototype.idEntry + '-ByPayment4');
        //T BY TICKET
        var PanelByTicket1 = Ext.getCmp(prototype.idEntry + '-ByTicket1');
        var PanelByTicket2 = Ext.getCmp(prototype.idEntry + '-ByTicket2');
        var PanelByTicket3 = Ext.getCmp(prototype.idEntry + '-ByTicket3');
        var PanelByTicket4 = Ext.getCmp(prototype.idEntry + '-ByTicket4');
        //S SETTLEMENT  
        var PanelSettlement1 = Ext.getCmp(prototype.idEntry + '-Settlement1');
        var PanelSettlement2 = Ext.getCmp(prototype.idEntry + '-Settlement2');
        var PanelSettlement3 = Ext.getCmp(prototype.idEntry + '-Settlement3');

        if (opt === 'P') {
            //P BY PAYMENT
            PanelByPayment1.show();
            PanelByPayment2.show();
            PanelByPayment3.show();
            PanelByPayment4.show();
            //T BY TICKET
            PanelByTicket1.hide();
            PanelByTicket2.hide();
            PanelByTicket3.hide();
            PanelByTicket4.hide();

            //S SETTLEMENT
            PanelSettlement1.hide();
            PanelSettlement2.hide();
            PanelSettlement3.hide();
        } else if (opt === 'T') {
            //P BY PAYMENT
            PanelByPayment1.hide();
            PanelByPayment2.hide();
            PanelByPayment3.hide();
            PanelByPayment4.hide();
            //T BY TICKET
            PanelByTicket1.show();
            PanelByTicket2.show();
            PanelByTicket3.show();
            PanelByTicket4.show();
            //S SETTLEMENT
            PanelSettlement1.hide();
            PanelSettlement2.hide();
            PanelSettlement3.hide();
        } else if (opt === 'S') {
            //P BY PAYMENT
            PanelByPayment1.hide();
            PanelByPayment2.hide();
            PanelByPayment3.hide();
            PanelByPayment4.hide();
            //T BY TICKET
            PanelByTicket1.hide();
            PanelByTicket2.hide();
            PanelByTicket3.hide();
            PanelByTicket4.hide();
            //S SETTLEMENT
            PanelSettlement1.show();
            PanelSettlement2.show();
            PanelSettlement3.show();
        }
        //this.showAddTicketBtn(me.users);
        //this.showProcessBtn(me.users);
    },
    onProcessorSelect: function (combo, record) {

        const type = record.get('a4451key2');

        const credit1 = Ext.ComponentQuery.query('#creditcard1')[0];
        const credit2 = Ext.ComponentQuery.query('#creditcard2')[0];
        const label = Ext.ComponentQuery.query('#maskLabel')[0];

        if (credit1 && credit1.inputEl) {
            if (type === 'ATCAN00') {
                credit1.setWidth(200);
                credit1.maxLength = 19;
                credit1.inputEl.dom.maxLength = 10;

                if (credit2)
                    credit2.hide();
                if (label)
                    label.hide();
            } else {
                credit1.setWidth(150);
                credit1.maxLength = 6;
                credit1.inputEl.dom.maxLength = 6;

                if (credit2)
                    credit2.show();
                if (label)
                    label.show();
            }
        }
    },

    onSaveTicket: function (btn) {

        var me = this;
        var IN_AMOUNT = 0;
        if (me.chekbox === 'P')
        {
            //P BY PAYMENT
            me.beanReport.IN_NOMBREREPORT = 'BY PAYMENT';
            me.beanReport.IN_TYPEREPORT = "BYP";
            //
            me.beanReport.PAYDATE = Ext.getCmp(prototype.idEntry + '-cmbsearchPayment').getValue();
            me.beanReport.IN_DATEFROM = Ext.getCmp(prototype.idEntry + '-datefieldFromBP').getRawValue();
            me.beanReport.IN_DATETO = Ext.getCmp(prototype.idEntry + '-datefieldToBP').getRawValue();
            me.beanReport.IN_PROCTYPESQ = Ext.getCmp(prototype.idEntry + '-cmbProctypef').getValue();
            me.beanReport.IN_SCOUNTRY = Ext.getCmp(prototype.idEntry + '-cmbPaisesfBP').getValue();
            //me.beanReport.IN_NBRINSTA = Ext.getCmp(prototype.idEntry + '-checkboxMSI').getValue();
            if(Ext.getCmp(prototype.idEntry + '-checkboxMSI').getValue()){
                me.beanReport.IN_NBRINSTA ='0';
            }else{
                 me.beanReport.IN_NBRINSTA ='';
            }
            me.beanReport.IN_TRANSTYPE = Ext.getCmp(prototype.idEntry + '-cmbDocType').getValue();
            me.beanReport.IN_STVAL = Ext.getCmp(prototype.idEntry + '-cmbStatus').getValue();
            me.beanReport.IN_SCARDN = Ext.getCmp(prototype.idEntry + '-txtcreditcard').getValue() + "" + Ext.getCmp(prototype.idEntry + '-txtcreditcard2').getValue();
            me.beanReport.IN_SAUTHOC = Ext.getCmp(prototype.idEntry + '-txtAuth').getValue();
            me.beanReport.IN_SPNR = Ext.getCmp(prototype.idEntry + '-txtPNR').getValue();
            IN_AMOUNT = Ext.getCmp(prototype.idEntry + '-txtAmount').getValue().replace(new RegExp(',', 'g'), '');
            me.beanReport.IN_AMOUNT = IN_AMOUNT === '' ? 0 : IN_AMOUNT;
            me.beanReport.IN_SCURRENCY = Ext.getCmp(prototype.idEntry + '-cmbMonedafBP').getValue();
            me.beanReport.IN_TICKET = Ext.getCmp(prototype.idEntry + '-txtTicket').getValue();
            me.beanReport.IN_CERROR = Ext.getCmp(prototype.idEntry + '-cmbCerrorb').getValue();
            me.beanReport.IN_CODADJU = Ext.getCmp(prototype.idEntry + '-cmbCodadjub').getValue();
            // me.beanReport.IN_FVOID = Ext.getCmp(prototype.idEntry + '-checkboxVoid').getValue();
            if (Ext.getCmp(prototype.idEntry + '-checkboxVoid').getValue()) {
                me.beanReport.IN_FVOID = '0';
            } else {
                me.beanReport.IN_FVOID = '';
            }

            me.beanReport.IN_SMERCHID = Ext.getCmp(prototype.idEntry + '-txtSMerchant').getValue();
            me.beanReport.IN_AREFNBR = Ext.getCmp(prototype.idEntry + '-txtRefNumber').getValue();
            me.beanReport.IN_CODEAUTOCOMMENT = Ext.getCmp(prototype.idEntry + '-cmbAutoComment').getValue();
            //BYTICLKET
            me.beanReport.IN_TRNCU = "";
            me.beanReport.IN_SAGENT = "";
            me.beanReport.IN_FUENT = "";
            me.beanReport.IN_SFUEN = "";
            me.beanReport.IN_TCARD = "";
            me.beanReport.IN_PAX = "";


        } else if (me.chekbox === 'T') {
            //T BY TICKET
            me.beanReport.IN_NOMBREREPORT = 'By Ticket';
            me.beanReport.IN_TYPEREPORT = "BYT";
            //
            me.beanReport.PAYDATE = Ext.getCmp(prototype.idEntry + '-cmbsearchByTicket').getValue();
            me.beanReport.IN_DATEFROM = Ext.getCmp(prototype.idEntry + '-datefieldFromBT').getRawValue();
            me.beanReport.IN_DATETO = Ext.getCmp(prototype.idEntry + '-datefieldToBT').getRawValue();
            me.beanReport.IN_SCOUNTRY = Ext.getCmp(prototype.idEntry + '-cmbPaisesfBT').getValue();
            me.beanReport.IN_SCURRENCY = Ext.getCmp(prototype.idEntry + '-cmbMonedaBT').getValue();
            me.beanReport.IN_TRNCU = Ext.getCmp(prototype.idEntry + '-cmbDocument').getValue();
            me.beanReport.IN_FUENT = Ext.getCmp(prototype.idEntry + '-cmbSource').getValue();
            me.beanReport.IN_SFUEN = Ext.getCmp(prototype.idEntry + '-cmbChannel').getValue();
            me.beanReport.IN_TRANSTYPE = Ext.getCmp(prototype.idEntry + '-cmbDocTypeBYTKT').getValue();
            //me.beanReport.IN_FVOID = Ext.getCmp(prototype.idEntry + '-checkboxVoidTKT').getValue();
            if(Ext.getCmp(prototype.idEntry + '-checkboxVoidTKT').getValue()){
                me.beanReport.IN_FVOID ='0';
            }else{
                 me.beanReport.IN_FVOID ='';
            }
            me.beanReport.IN_SAGENT = Ext.getCmp(prototype.idEntry + '-TXTIATA').getValue();
            me.beanReport.IN_TICKET = Ext.getCmp(prototype.idEntry + '-txtTicketTKT').getValue();
            me.beanReport.IN_SPNR = Ext.getCmp(prototype.idEntry + '-txtPNRTKT').getValue();
            me.beanReport.IN_SCARDN = Ext.getCmp(prototype.idEntry + '-txtcreditcardTKT').getValue() + "" + Ext.getCmp(prototype.idEntry + '-txtcreditcard2TKT').getValue();
            me.beanReport.IN_SAUTHOC = Ext.getCmp(prototype.idEntry + '-txtAuthTKT').getValue();
            me.beanReport.IN_STVAL = Ext.getCmp(prototype.idEntry + '-cmbStatusTKT').getValue();
            me.beanReport.IN_TCARD = Ext.getCmp(prototype.idEntry + '-cmbCardTypeTKT').getValue();
            me.beanReport.IN_CCARD = Ext.getCmp(prototype.idEntry + '-cmbCreditCardBT').getValue();
            IN_AMOUNT = Ext.getCmp(prototype.idEntry + '-txtAmountTKT').getValue().replace(new RegExp(',', 'g'), '');
            me.beanReport.IN_AMOUNT = IN_AMOUNT === '' ? 0 : IN_AMOUNT;
            me.beanReport.IN_PAX = Ext.getCmp(prototype.idEntry + '-txtPaxName').getValue();

            //P BY PAYMENT
            me.beanReport.IN_PROCTYPESQ = "";
            me.beanReport.IN_NBRINSTA = "";
            me.beanReport.IN_CERROR = "";
            me.beanReport.IN_CODADJU = "";
            me.beanReport.IN_SMERCHID = "";
            me.beanReport.IN_AREFNBR = "";
            me.beanReport.IN_CODEAUTOCOMMENT = "";
        } else if (me.chekbox === 'S') {
            //S SETTLEMENT
            me.beanReport.IN_NOMBREREPORT = 'Settlement';
            me.beanReport.IN_TYPEREPORT = "SET";
            //
            me.beanReport.PAYDATE = Ext.getCmp(prototype.idEntry + '-cmbSettlsearch').getValue();
            me.beanReport.IN_DATEFROM = Ext.getCmp(prototype.idEntry + '-datefieldFromST').getRawValue();
            me.beanReport.IN_DATETO = Ext.getCmp(prototype.idEntry + '-datefieldToST').getRawValue();
            me.beanReport.IN_PROCTYPESQ = Ext.getCmp(prototype.idEntry + '-cmbProctypeSettl').getValue();
            me.beanReport.IN_SCOUNTRY = Ext.getCmp(prototype.idEntry + '-cmbPaisesSettl').getValue();
            me.beanReport.IN_SCURRENCY = Ext.getCmp(prototype.idEntry + '-cmbMonedabST').getValue();
            me.beanReport.IN_TRANSTYPE = Ext.getCmp(prototype.idEntry + '-cmbDocTypeST').getValue();
            me.beanReport.IN_SCARDN = Ext.getCmp(prototype.idEntry + '-txtcreditcardST').getValue() + "" + Ext.getCmp(prototype.idEntry + '-txtcreditcard2ST').getValue();
            me.beanReport.IN_SAUTHOC = Ext.getCmp(prototype.idEntry + '-txtAuthST').getValue();
            me.beanReport.IN_STVAL = Ext.getCmp(prototype.idEntry + '-cmbStatusST').getValue();
            me.beanReport.IN_SPNR = Ext.getCmp(prototype.idEntry + '-txtPNRST').getValue();
            me.beanReport.IN_SMERCHID = Ext.getCmp(prototype.idEntry + '-txtSMerchantST').getValue();

            //P BY PAYMENT
            me.beanReport.IN_NBRINSTA = "";
            me.beanReport.IN_AMOUNT = "0";
            me.beanReport.IN_TICKET = "";
            me.beanReport.IN_CERROR = "";
            me.beanReport.IN_CODADJU = "";
            me.beanReport.IN_FVOID = "";
            me.beanReport.IN_AREFNBR = "";
            me.beanReport.IN_CODEAUTOCOMMENT = "";
            //BYTICLKET
            me.beanReport.IN_TRNCU = "";
            me.beanReport.IN_SAGENT = "";
            me.beanReport.IN_FUENT = "";
            me.beanReport.IN_SFUEN = "";
            me.beanReport.IN_TCARD = "";
            me.beanReport.IN_PAX = "";
        }
        me.beanReport.IN_EMAIL = Ext.getCmp(prototype.idEntry + '-Email').getValue();


        if (me.beanReport.IN_EMAIL === '') {
            global.Msg({msg: 'You must enter the required field Email'});
            return;
        }
        if (me.beanReport.IN_DATEFROM === '') {
            global.Msg({msg: 'You must enter the required field Date From'});
            return;
        }
        if (me.beanReport.IN_DATETO === '') {
            global.Msg({msg: 'You must enter the required field Date To'});
            return;
        }

        //
        global.Msg({
            msg: 'Are you sure you want to report?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.id + '-Contenedor'), {
                        msg: 'Please Wait....'
                    });
                    mask.show();
                    Ext.Ajax.request({
                        url: me.url + '/generateReport/',
                        timeout: 60000000,
                        method: 'POST',
                        params: {beanString: JSON.stringify(me.beanReport)},

                        success: function (response, options) {
                            mask.hide();
                            var res = Ext.JSON.decode(response.responseText);
                            //var redta = res.data.substring(0, 1);
                            console.log(res.result);
                            var vp_icon = 0;
                            if (res.success) {
                                vp_icon = 1;
                            }
                            global.Msg({msg: res.result, icon: vp_icon, fn: function () {
                                    if (vp_icon === 1) {
                                        Ext.getCmp(prototype.id + '-btnSearch').fireEvent('click', {});
                                        Ext.getCmp(prototype.idEntry + '-win').close();
                                    }


                                }});
                        }
                    });
                }

            }
        });





    }


});

