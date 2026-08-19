
Ext.define('Ext.Praxis.controller.salesaudit.ADMManualForm.AccountingCTAController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.AccountingCTAController',
    BeanSearch: {},
    beanTMP: {},
    beanClose: {},
    urlGeneral: '',
    urlWin01: CONTEXTPATH + '/DataEntryADMManual',
    urlWin02: CONTEXTPATH + '/AccountingMasterSales',
    urlWin03: CONTEXTPATH + '/AccountingMasterTAX',
    urlWin04: CONTEXTPATH + '/AccountingMasterClient',
    urlWin05: CONTEXTPATH + '/AccountingMasterUATP',
    urlWin06: CONTEXTPATH + '/AccountingMasterPagaTodo',

    init: function (view) {
        var me = this;

        //console.log(this.view.params);
    },

    afterRender: function () {

        //Ext.getCmp(prototype.idAccountingCTA01 + '-win').setHeight(Ext.getCmp(prototype.idAccountingCTA01 + '-win').getHeight() + 30);
        this.setStoresFilters();
        this.cargarComboTax();
        this.cargarComboClient();
//        this.onLoadData();
        this.setStoresGrid();
        Ext.getCmp(prototype.idAccountingCTA + '-btn-close').show();
    },

    /*Para los combos Tax*/
    cargarComboTax: function () {
        var country = new Array(), tax = new Array(), currency = new Array();
        var store;
        Ext.Ajax.request({
            url: this.urlWin03 + '/loadCombo',
            method: 'POST',
            timeout: 60000000,
//            params: searchParams,
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                var lstCountry = res.lstCountry;
                var lstTax = res.lstTax;
                var lstCurrency = res.lstCurrency;

                country.push(['', 'All']);
                lstCountry.forEach(function callback(currentValue, index, array) {
                    country.push([currentValue.A051KEY2, currentValue.A051DESCR1]);
                });
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'country', autoLoad: true, data: country, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.idAccountingCTA + '-cmbCountry1').bindStore(store);

                tax.push(['', 'All']);
                lstTax.forEach(function callback(currentValue, index, array) {
                    tax.push([currentValue.A051DESCR1, currentValue.A051DESCR1]);
                });
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'tax', autoLoad: true, data: tax, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.idAccountingCTA + '-cmbTAX1').bindStore(store);

                currency.push(['', 'All']);
                lstCurrency.forEach(function callback(currentValue, index, array) {
                    currency.push([currentValue.A006MONEDA, currentValue.A006MONEDA]);
                });
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'currency', autoLoad: true, data: currency, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.idAccountingCTA + '-cmbCurrency1').bindStore(store);
            }
        });
    },
    /*Para los combos Client*/

    cargarComboClient: function () {
        Ext.Ajax.request({
            url: this.urlWin04 + '/loadCombo',
            method: 'POST',
            timeout: 60000000,
            beforerequest: Ext.getBody().mask(),
            success: function (response, options) {
                var res = Ext.JSON.decode(response.responseText);
                Ext.getBody().unmask();

                var lstCountry = res.lstCountry;
                //<editor-fold defaultstate="collapsed" desc="cboCountry">
                var country = new Array();
                country.push(['', 'All']);
                lstCountry.forEach(function callback(currentValue, index, array) {
                    country.push([currentValue.A051KEY2, currentValue.A051DESCR1]);
                });
                var store1 = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'country', autoLoad: true, data: country, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.idAccountingCTA + '-cmbCountry2').bindStore(store1);
                //</editor-fold>

                var lstTypeCC = res.lstTypeCC;
                //<editor-fold defaultstate="collapsed" desc="cboType">
                var type = new Array();
                type.push(['', 'All']);
                lstTypeCC.forEach(function callback(currentValue, index, array) {
                    type.push([currentValue.A051KEY2, currentValue.A051KEY2]);
                });
                var store2 = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'type', autoLoad: true, data: type, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.idAccountingCTA + '-cmbType2').bindStore(store2);
                //</editor-fold>

                var lstCurrency = res.lstCurrency;
                //<editor-fold defaultstate="collapsed" desc="cboCurrency">
                var currency = new Array();
                currency.push(['', 'All']);
                lstCurrency.forEach(function callback(currentValue, index, array) {
                    if (currentValue.A006MONEDA.trim().length === 0) {
                        currency.push([null, '&nbsp;']);
                    } else {
                        currency.push([currentValue.A006MONEDA, currentValue.A006MONEDA]);
                    }
                });
                var store3 = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'currency', autoLoad: true, data: currency, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.idAccountingCTA + '-cmbCurrency2').bindStore(store3);
                //</editor-fold>

                var lstSubFu = res.lstSubFu;
                //<editor-fold defaultstate="collapsed" desc="cboSubFu">
                var subfu = new Array();
                subfu.push(['', 'All']);
                lstSubFu.forEach(function callback(currentValue, index, array) {
                    if (array[index].trim().length === 0) {
                        subfu.push([null, '&nbsp;']);
                    } else {
                        subfu.push([array[index], array[index]]);
                    }
                });
                var store4 = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'subfu', autoLoad: true, data: subfu, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.idAccountingCTA + '-cmbSubSource2').bindStore(store4);
                //</editor-fold>

                var lstFP = res.lstFP;
                //<editor-fold defaultstate="collapsed" desc="cboFP">
                var fp = new Array();
                fp.push(['', 'All']);
                lstFP.forEach(function callback(currentValue, index, array) {
                    fp.push([array[index], array[index]]);
                });
                var store5 = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'fp', autoLoad: true, data: fp, fields: ['code', 'name']
                });
                Ext.getCmp(prototype.idAccountingCTA + '-cmbPayForm2').bindStore(store5);
                //</editor-fold>
            }
        });
    },
    /*Para los combos*/
    setStoresFilters: function () {
        var cmbTypeCta = Ext.getCmp(prototype.idAccountingCTA + '-cmbTypeCta');
        var cmbCtaType = Ext.getCmp(prototype.idAccountingCTA + '-cmbCtaType');

        var cmbType1 = Ext.getCmp(prototype.idAccountingCTA + '-cmbType1');
        var cmbControlled1 = Ext.getCmp(prototype.idAccountingCTA + '-cmbControlled1');

        var cmbSource2 = Ext.getCmp(prototype.idAccountingCTA + '-cmbSource2');

        var cmbType3 = Ext.getCmp(prototype.idAccountingCTA + '-cmbType3');
        var cmbMode3 = Ext.getCmp(prototype.idAccountingCTA + '-cmbMode3');

        var cmbSource4 = Ext.getCmp(prototype.idAccountingCTA + '-cmbSource4');
        var cboFOPCode = Ext.getCmp(prototype.idAccountingCTA + '-cboFOPCode');

        /*CmbTypeCta*/
        cmbTypeCta.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "AMS", "name": "Accounting Master Sales"},
                {"code": "AMT", "name": "Accounting Master Tax"},
                {"code": "AMC", "name": "Accounting Master Client"},
                {"code": "AMU", "name": "Accounting Master UATP"},
                {"code": "AMP", "name": "Accounting Master PAGA"}
            ]
        }));

        /*CmboAccountType*/
        cmbCtaType.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "All"},
                {"code": "A", "name": "Associate"},
                {"code": "C", "name": "Comission"},
                {"code": "CH", "name": "Charge"},
                {"code": "F", "name": "Fare"}
            ]
        }));

        /*cmbType1*/
        cmbType1.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "All"},
                {"code": "M", "name": "Multicurrency"},
                {"code": "O", "name": "Origin"},
                {"code": "C", "name": "Expired"},
                {"code": "R", "name": "RAC"},
                {"code": "N", "name": "No Show"}
            ]
        }));

        /*cmbControlled1*/
        cmbControlled1.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "All"},
                {"code": "Y", "name": "Yes"},
                {"code": "N", "name": "No"}
            ]
        }));

        /*cmbSource2*/
        cmbSource2.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "All"},
                {"code": "ARC", "name": "ARC"},
                {"code": "BSP", "name": "BSP"},
                {"code": "ASR", "name": "ASR"},
                {"code": "MAN", "name": "MAN"}
            ]
        }));

        /*cmbType3*/
        cmbType3.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "All"},
                {"code": "CCAM", "name": "CCAM"},
                {"code": "UATP", "name": "UATP"},
                {"code": "BOOM", "name": "BOOM"}
            ]
        }));

        /*cmbMode3*/
        cmbMode3.bindStore(Ext.create('Ext.data.Store', {
            data: [
//                {"code": "", "name": "All"},
                {"code": "", "name": "Counted"},
                {"code": "C", "name": "Credit"}
            ]
        }));

        /*cmbSource4*/
        cmbSource4.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "1", "name": "FOP Code"},
                {"code": "2", "name": "PT Card Number"}
            ]
        }));

        /*cboFOPCode*/
        cboFOPCode.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "All"},
                {"code": "CCPT", "name": "CCPT"}
            ]
        }));


    },
    onCmbAfterRender: function (obj) {
        obj.setValue('');
    },
    setStoresGrid: function () {
        var grid01 = Ext.getCmp(prototype.idAccountingCTA + '-gridData');
        var grid02 = Ext.getCmp(prototype.idAccountingCTA + '-gridDataTax');
        var grid03 = Ext.getCmp(prototype.idAccountingCTA + '-gridDataClien');
        var grid04 = Ext.getCmp(prototype.idAccountingCTA + '-gridDataUATP');
        var grid05 = Ext.getCmp(prototype.idAccountingCTA + '-gridDataPAGA');


        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idAccountingCTA + '-store-grid'
        });
        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.idAccountingCTA + '-store-grid2'
        });
        var store03 = Ext.create('Ext.data.Store', {
            storeId: prototype.idAccountingCTA + '-store-grid3'
        });
        var store04 = Ext.create('Ext.data.Store', {
            storeId: prototype.idAccountingCTA + '-store-grid4'
        });
        var store05 = Ext.create('Ext.data.Store', {
            storeId: prototype.idAccountingCTA + '-store-grid5'
        });

        grid01.setStore(store01);
        grid02.setStore(store02);
        grid03.setStore(store03);
        grid04.setStore(store04);
        grid05.setStore(store05);

    },
    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.imgSearch_clickHandler();
        }

    },
    imgSerech_clickHandler: function () {
        this.imgSearch_clickHandler(false);
    },
    imgSearch_clickHandler: function (rec) {
        var me = this;

        /*llama las etiquetas y la almacena en una variable*/
        var IN_cmbTypeCta = Ext.getCmp(prototype.idAccountingCTA + '-cmbTypeCta').getValue();
        //AMS
        var IN_A1740TITRA = Ext.getCmp(prototype.idAccountingCTA + '-txtDocumentType').getValue();
        var IN_A1740TIPO = Ext.getCmp(prototype.idAccountingCTA + '-cmbCtaType').getValue();
        var A1740SUBTI = Ext.getCmp(prototype.idAccountingCTA + '-txtSubType').getValue();
        var A1740CATEG = Ext.getCmp(prototype.idAccountingCTA + '-txtCategory').getValue();
        var A1740CTA = Ext.getCmp(prototype.idAccountingCTA + '-txtCta').getValue();
        var A1740SCTA = Ext.getCmp(prototype.idAccountingCTA + '-txtSubCta').getValue();
        //AMT
        var IN_A1741PAIS = Ext.getCmp(prototype.idAccountingCTA + '-cmbCountry1').getValue();
        var IN_A1741MONED = Ext.getCmp(prototype.idAccountingCTA + '-cmbCurrency1').getValue();
        var IN_A1741CODE = Ext.getCmp(prototype.idAccountingCTA + '-cmbTAX1').getValue();
        var IN_A1741TIPO = Ext.getCmp(prototype.idAccountingCTA + '-cmbType1').getValue();
        var A1741CTA = Ext.getCmp(prototype.idAccountingCTA + '-txtAccount1').getValue();
        var A1741SCTA = Ext.getCmp(prototype.idAccountingCTA + '-txtSubAccount1').getValue();
        var A1741CTRL = Ext.getCmp(prototype.idAccountingCTA + '-cmbControlled1').getValue();
        //AMC
        var IN_A1736FUENTE = Ext.getCmp(prototype.idAccountingCTA + '-cmbSource2').getValue();
        var IN_A1736PAIS = Ext.getCmp(prototype.idAccountingCTA + '-cmbCountry2').getValue();
        var IN_A1736MONEDA = Ext.getCmp(prototype.idAccountingCTA + '-cmbCurrency2').getValue();
        var IN_A1736TIPO = Ext.getCmp(prototype.idAccountingCTA + '-cmbType2').getValue();
        var IN_A1736SUBFU = Ext.getCmp(prototype.idAccountingCTA + '-cmbSubSource2').getValue();
        var IN_A1736FP = Ext.getCmp(prototype.idAccountingCTA + '-cmbPayForm2').getValue();
        var A1736CLIEN = Ext.getCmp(prototype.idAccountingCTA + '-txtClient2').getValue();
        var A1736IATA = Ext.getCmp(prototype.idAccountingCTA + '-txtIATA2').getValue();
        //AMU
        var A1820CCUST = '139';
        var IN_FILTRO = Ext.getCmp(prototype.idAccountingCTA + '-cmbType3').getValue();
        var A1820CLIEN = Ext.getCmp(prototype.idAccountingCTA + '-txtClient3').getValue();
        var A1820TCUAT = Ext.getCmp(prototype.idAccountingCTA + '-txtUATPCard3').getValue();
        var A1820CTA = Ext.getCmp(prototype.idAccountingCTA + '-txtAccount3').getValue();
        var A1820SCTA = Ext.getCmp(prototype.idAccountingCTA + '-txtSubAccount3').getValue();
        var A1820MODO = Ext.getCmp(prototype.idAccountingCTA + '-cmbMode3').getValue();
        //AMP
        var IN_FILTRO = Ext.getCmp(prototype.idAccountingCTA + '-cmbSource4').getValue();
        var IN_A1835FOPID = Ext.getCmp(prototype.idAccountingCTA + '-cboFOPCode').getValue();
        var IN_A1835TARPT = Ext.getCmp(prototype.idAccountingCTA + '-txtPTCardNumber').getValue();
        var A1835CUENT = Ext.getCmp(prototype.idAccountingCTA + '-txtAccount4').getValue();
        var A1835SUBCT = Ext.getCmp(prototype.idAccountingCTA + '-txtSubAccount4').getValue();

        if (IN_cmbTypeCta === '') {
            global.Msg({msg: 'Select Of By'});
            return;
        }
        if (IN_cmbTypeCta === 'AMS') {
            me.beanTMP.IN_A1740TITRA = IN_A1740TITRA;
            me.beanTMP.IN_A1740TIPO = IN_A1740TIPO;
            me.beanTMP.A1740SUBTI = A1740SUBTI;
            me.beanTMP.A1740CATEG = A1740CATEG;
            me.beanTMP.A1740CTA = A1740CTA;
            me.beanTMP.A1740SCTA = A1740SCTA;
            me.urlGeneral = me.urlWin02 + '/search';

        } else if (IN_cmbTypeCta === 'AMT') {
            me.beanTMP.IN_A1741PAIS = IN_A1741PAIS;
            me.beanTMP.IN_A1741MONED = IN_A1741MONED;
            me.beanTMP.IN_A1741CODE = IN_A1741CODE;
            me.beanTMP.IN_A1741TIPO = IN_A1741TIPO;
            me.beanTMP.A1741CTA = A1741CTA;
            me.beanTMP.A1741SCTA = A1741SCTA;
            me.beanTMP.A1741CTRL = A1741CTRL;
            me.urlGeneral = me.urlWin03 + '/search';

        } else if (IN_cmbTypeCta === 'AMC') {
            me.beanTMP.IN_A1736CCUST = '139';
            if (IN_A1736FUENTE === null) {
                me.beanTMP.IN_A1736FUENTE = '';
            } else {
                me.beanTMP.IN_A1736FUENTE = IN_A1736FUENTE;
            }
            if (IN_A1736PAIS === null) {
                me.beanTMP.IN_A1736PAIS = '';
            } else {
                me.beanTMP.IN_A1736PAIS = IN_A1736PAIS;
            }
            if (IN_A1736TIPO === null) {
                me.beanTMP.IN_A1736TIPO = '';
            } else {
                me.beanTMP.IN_A1736TIPO = IN_A1736TIPO;
            }
            if (IN_A1736MONEDA === null) {
                me.beanTMP.IN_A1736MONEDA = '';
            } else {
                me.beanTMP.IN_A1736MONEDA = IN_A1736MONEDA;
            }
            if (IN_A1736SUBFU === null) {
                me.beanTMP.IN_A1736SUBFU = '';
            } else {
                me.beanTMP.IN_A1736SUBFU = IN_A1736SUBFU;
            }
            if (IN_A1736FP === null) {
                me.beanTMP.IN_A1736FP = '';
            } else {
                me.beanTMP.IN_A1736FP = IN_A1736FP;
            }
            if (A1736CLIEN === null) {
                me.beanTMP.A1736CLIEN = '';
            } else {
                me.beanTMP.A1736CLIEN = A1736CLIEN;
            }
            if (A1736CLIEN === null) {
                me.beanTMP.A1736CLIEN = '';
            } else {
                me.beanTMP.A1736IATA = A1736IATA;
            }

            me.urlGeneral = me.urlWin04 + '/search';

        } else if (IN_cmbTypeCta === 'AMU') {
            me.beanTMP.A1820CCUST = A1820CCUST;
            me.beanTMP.IN_FILTRO = IN_FILTRO;
            me.beanTMP.A1820CLIEN = A1820CLIEN;
            me.beanTMP.A1820TCUAT = A1820TCUAT;
            me.beanTMP.A1820CTA = A1820CTA;
            me.beanTMP.A1820SCTA = A1820SCTA;
            me.beanTMP.A1820MODO = A1820MODO;
            me.urlGeneral = me.urlWin05 + '/search';

        } else if (IN_cmbTypeCta === 'AMP') {
            if (IN_FILTRO === '' || IN_FILTRO === null) {
                global.Msg({msg: 'Select an Source'});
                return;
            }
            if (IN_A1835FOPID === null) {
                IN_A1835FOPID = '';
            }
            
            me.beanTMP.IN_FILTRO = IN_FILTRO;
            me.beanTMP.IN_A1835FOPID = IN_A1835FOPID;
            me.beanTMP.IN_A1835TARPT = IN_A1835TARPT;
            me.beanTMP.A1835CUENT = A1835CUENT;
            me.beanTMP.A1835SUBCT = A1835SUBCT;
            me.urlGeneral = me.urlWin06 + '/search';
        }

        Ext.getCmp(prototype.idAccountingCTA + '-viewAccountingCTA').mask('Please Wait....');
        if (IN_cmbTypeCta !== 'AMC') {
            Ext.Ajax.request({
                url: me.urlGeneral,
                method: 'POST',
                timeout: '300000',
                params: me.beanTMP,
                success: function (response, options) {
                    Ext.getCmp(prototype.idAccountingCTA + '-viewAccountingCTA').unmask();
                    var res = Ext.JSON.decode(response.responseText);
                    Ext.getCmp(prototype.idAccountingCTA + '-gridData').getStore().removeAll();
                    Ext.getCmp(prototype.idAccountingCTA + '-gridDataTax').getStore().removeAll();
                    Ext.getCmp(prototype.idAccountingCTA + '-gridDataClien').getStore().removeAll();
                    Ext.getCmp(prototype.idAccountingCTA + '-gridDataUATP').getStore().removeAll();
                    Ext.getCmp(prototype.idAccountingCTA + '-gridDataPAGA').getStore().removeAll();

                    if (IN_cmbTypeCta === 'AMS') {
                        Ext.getCmp(prototype.idAccountingCTA + '-gridData').getStore().loadData(res.data);
                    } else if (IN_cmbTypeCta === 'AMT') {
                        Ext.getCmp(prototype.idAccountingCTA + '-gridDataTax').getStore().loadData(res.data);
                    } else if (IN_cmbTypeCta === 'AMC') {
                        Ext.getCmp(prototype.idAccountingCTA + '-gridDataClien').getStore().loadData(res.data);
                    } else if (IN_cmbTypeCta === 'AMU') {
                        Ext.getCmp(prototype.idAccountingCTA + '-gridDataUATP').getStore().loadData(res.data);
                    } else if (IN_cmbTypeCta === 'AMP') {
                        Ext.getCmp(prototype.idAccountingCTA + '-gridDataPAGA').getStore().loadData(res.data);
                    }

                    //console.log(res);
                }
            });
        } else {
            Ext.Ajax.request({
                url: me.urlGeneral,
                method: 'POST',
                timeout: '300000',
                params: {beanString: JSON.stringify(me.beanTMP)},
                success: function (response, options) {
                    Ext.getCmp(prototype.idAccountingCTA + '-viewAccountingCTA').unmask();
                    var res = Ext.JSON.decode(response.responseText);
                    Ext.getCmp(prototype.idAccountingCTA + '-gridData').getStore().removeAll();
                    Ext.getCmp(prototype.idAccountingCTA + '-gridDataTax').getStore().removeAll();
                    Ext.getCmp(prototype.idAccountingCTA + '-gridDataClien').getStore().removeAll();
                    Ext.getCmp(prototype.idAccountingCTA + '-gridDataUATP').getStore().removeAll();
                    Ext.getCmp(prototype.idAccountingCTA + '-gridDataPAGA').getStore().removeAll();

                    if (IN_cmbTypeCta === 'AMS') {
                        Ext.getCmp(prototype.idAccountingCTA + '-gridData').getStore().loadData(res.data);
                    } else if (IN_cmbTypeCta === 'AMT') {
                        Ext.getCmp(prototype.idAccountingCTA + '-gridDataTax').getStore().loadData(res.data);
                    } else if (IN_cmbTypeCta === 'AMC') {
                        Ext.getCmp(prototype.idAccountingCTA + '-gridDataClien').getStore().loadData(res.data);
                    } else if (IN_cmbTypeCta === 'AMU') {
                        Ext.getCmp(prototype.idAccountingCTA + '-gridDataUATP').getStore().loadData(res.data);
                    } else if (IN_cmbTypeCta === 'AMP') {
                        Ext.getCmp(prototype.idAccountingCTA + '-gridDataPAGA').getStore().loadData(res.data);
                    }

                    //console.log(res);
                }
            });
        }

    },

    onCloseClick: function (obj) {
        Ext.getCmp(prototype.idAccountingCTA + '-viewAccountingCTA').close();
    },

    /*Captura el record para mostrar la informacion*/
    OnChkRFNDHandlerMasterSales: function (grid, rowIndex, colIndex, item, e, record) {
//        var rec = record;
        var rec = grid.getStore().getAt(rowIndex);
        Ext.getCmp(prototype.id01 + '-txtA1740CIA').setValue(Ext.String.trim(rec.get('A1740CIA')));
        Ext.getCmp(prototype.id01 + '-txtA1740UNIDA').setValue(Ext.String.trim(rec.get('A1740UNIDA')));
        Ext.getCmp(prototype.id01 + '-txtA1740CECOS').setValue(Ext.String.trim(rec.get('A1740CECOS')));
        Ext.getCmp(prototype.id01 + '-txtA1740UBICA').setValue(Ext.String.trim(rec.get('A1740UBICA')));
        Ext.getCmp(prototype.id01 + '-txtA1740CTA').setValue(Ext.String.trim(rec.get('A1740CTA')));
        Ext.getCmp(prototype.id01 + '-txtA1740SCTA').setValue(Ext.String.trim(rec.get('A1740SCTA')));
        Ext.getCmp(prototype.id01 + '-txtA1740EQUI').setValue(Ext.String.trim(rec.get('A1740EQUI')));
        Ext.getCmp(prototype.id01 + '-txtA1740ICIA').setValue(Ext.String.trim(rec.get('A1740ICIA')));
        Ext.getCmp(prototype.id01 + '-txtClient').setValue(Ext.String.trim(rec.get('A1740CLIE')));
    },
    OnChkRFNDHandlerTax: function (grid, rowIndex, colIndex, item, e, record) {
//        var rec = record;
        var rec = grid.getStore().getAt(rowIndex);
        Ext.getCmp(prototype.id01 + '-txtA1740CIA').setValue(Ext.String.trim(rec.get('A1741CIA')));
        Ext.getCmp(prototype.id01 + '-txtA1740UNIDA').setValue(Ext.String.trim(rec.get('A1741UNIDA')));
        Ext.getCmp(prototype.id01 + '-txtA1740CECOS').setValue(Ext.String.trim(rec.get('A1741CECOS')));
        Ext.getCmp(prototype.id01 + '-txtA1740UBICA').setValue(Ext.String.trim(rec.get('A1741UBICA')));
        Ext.getCmp(prototype.id01 + '-txtA1740CTA').setValue(Ext.String.trim(rec.get('A1741CTA')));
        Ext.getCmp(prototype.id01 + '-txtA1740SCTA').setValue(Ext.String.trim(rec.get('A1741SCTA')));
        Ext.getCmp(prototype.id01 + '-txtA1740EQUI').setValue(Ext.String.trim(rec.get('A1741EQUI')));
        Ext.getCmp(prototype.id01 + '-txtA1740ICIA').setValue(Ext.String.trim(rec.get('A1741ICIA')));
        Ext.getCmp(prototype.id01 + '-txtClient').setValue(Ext.String.trim(rec.get('A1741CONCE')));
    },
    OnChkRFNDHandlerClient: function (grid, rowIndex, colIndex, item, e, record) {
//        var rec = record;
        var rec = grid.getStore().getAt(rowIndex);
        Ext.getCmp(prototype.id01 + '-txtA1740CIA').setValue(Ext.String.trim(rec.get('A1736CIA')));
        Ext.getCmp(prototype.id01 + '-txtA1740UNIDA').setValue(Ext.String.trim(rec.get('A1736UNID')));
        Ext.getCmp(prototype.id01 + '-txtA1740CECOS').setValue(Ext.String.trim(rec.get('A1736CECO')));
        Ext.getCmp(prototype.id01 + '-txtA1740UBICA').setValue(Ext.String.trim(rec.get('A1736UBI')));
        Ext.getCmp(prototype.id01 + '-txtA1740CTA').setValue(Ext.String.trim(rec.get('A1736CTAC')));
        Ext.getCmp(prototype.id01 + '-txtA1740SCTA').setValue(Ext.String.trim(rec.get('A1736SCTA')));
        Ext.getCmp(prototype.id01 + '-txtA1740EQUI').setValue(Ext.String.trim(rec.get('A1736EQUI')));
        Ext.getCmp(prototype.id01 + '-txtA1740ICIA').setValue(Ext.String.trim(rec.get('A1736ICIA')));
        Ext.getCmp(prototype.id01 + '-txtClient').setValue(Ext.String.trim(rec.get('A1736NOMBR')));
    },
    OnChkRFNDHandlUATP: function (grid, rowIndex, colIndex, item, e, record) {
//        var rec = record;
        var rec = grid.getStore().getAt(rowIndex);
        Ext.getCmp(prototype.id01 + '-txtA1740CIA').setValue(Ext.String.trim(rec.get('A1820CIA')));
        Ext.getCmp(prototype.id01 + '-txtA1740UNIDA').setValue(Ext.String.trim(rec.get('A1820UNID')));
        Ext.getCmp(prototype.id01 + '-txtA1740CECOS').setValue(Ext.String.trim(rec.get('A1820CECO')));
        Ext.getCmp(prototype.id01 + '-txtA1740UBICA').setValue(Ext.String.trim(rec.get('A1820UBI')));
        Ext.getCmp(prototype.id01 + '-txtA1740CTA').setValue(Ext.String.trim(rec.get('A1820CTA')));
        Ext.getCmp(prototype.id01 + '-txtA1740SCTA').setValue(Ext.String.trim(rec.get('A1820SCTA')));
        Ext.getCmp(prototype.id01 + '-txtA1740EQUI').setValue(Ext.String.trim(rec.get('A1820EQUI')));
        Ext.getCmp(prototype.id01 + '-txtA1740ICIA').setValue(Ext.String.trim(rec.get('A1820ICIA')));
        Ext.getCmp(prototype.id01 + '-txtClient').setValue(Ext.String.trim(rec.get('A1820DESCR')));
    },
    OnChkRFNDHandlerPAGA: function (grid, rowIndex, colIndex, item, e, record) {
//        var rec = record;
        var rec = grid.getStore().getAt(rowIndex);
        Ext.getCmp(prototype.id01 + '-txtA1740CIA').setValue(Ext.String.trim(rec.get('A1835CIA')));
        Ext.getCmp(prototype.id01 + '-txtA1740UNIDA').setValue(Ext.String.trim(rec.get('A1835UNIDA')));
        Ext.getCmp(prototype.id01 + '-txtA1740CECOS').setValue(Ext.String.trim(rec.get('A1835CENCO')));
        Ext.getCmp(prototype.id01 + '-txtA1740UBICA').setValue(Ext.String.trim(rec.get('A1835UBICA')));
        Ext.getCmp(prototype.id01 + '-txtA1740CTA').setValue(Ext.String.trim(rec.get('A1835CUENT')));
        Ext.getCmp(prototype.id01 + '-txtA1740SCTA').setValue(Ext.String.trim(rec.get('A1835SUBCT')));
        Ext.getCmp(prototype.id01 + '-txtA1740EQUI').setValue(Ext.String.trim(rec.get('A1835EQUI')));
        Ext.getCmp(prototype.id01 + '-txtA1740ICIA').setValue(Ext.String.trim(rec.get('A1835INCIA')));
        Ext.getCmp(prototype.id01 + '-txtClient').setValue(Ext.String.trim(rec.get('A1835CONC')));
    },

    winDataEntry: function (action, rec) {
        action = action === null || action === undefined ? 'U' : action;
        rec = rec === null || rec === undefined ? {} : rec;
//        Ext.create('Ext.Praxis.view.sales.AccountingMasterClientForm.DataEntry', { '
//            id: 'DataEntryAccountingMasterClientForm',
        Ext.create('Ext.Praxis.view.salesaudit.ADMManualForm.', {
            id: prototype.id01 + '-win',
            params: {
                action: action,
                rec: rec
            }
        }).show();

    },

    onCmbSearchChange: function (obj, records, eOpts) {
        /*Almacena las etiquetas en variables*/
        //AMS
        var lblDocumentType = Ext.getCmp(prototype.idAccountingCTA + '-lblDocumentType');
        var txtDocumentType = Ext.getCmp(prototype.idAccountingCTA + '-txtDocumentType');
        var cmbCtaType = Ext.getCmp(prototype.idAccountingCTA + '-cmbCtaType');
        var lblSubType = Ext.getCmp(prototype.idAccountingCTA + '-lblSubType');
        var txtSubType = Ext.getCmp(prototype.idAccountingCTA + '-txtSubType');
        var lblCategory = Ext.getCmp(prototype.idAccountingCTA + '-lblCategory');
        var txtCategory = Ext.getCmp(prototype.idAccountingCTA + '-txtCategory');
        var lblCta = Ext.getCmp(prototype.idAccountingCTA + '-lblCta');
        var txtCta = Ext.getCmp(prototype.idAccountingCTA + '-txtCta');
        var lblSubCta = Ext.getCmp(prototype.idAccountingCTA + '-lblSubCta');
        var txtSubCta = Ext.getCmp(prototype.idAccountingCTA + '-txtSubCta');
        var gridData = Ext.getCmp(prototype.idAccountingCTA + '-gridData');
        //AMT
        var cmbCountry1 = Ext.getCmp(prototype.idAccountingCTA + '-cmbCountry1');
        var cmbTAX1 = Ext.getCmp(prototype.idAccountingCTA + '-cmbTAX1');
        var cmbCurrency1 = Ext.getCmp(prototype.idAccountingCTA + '-cmbCurrency1');
        var cmbType1 = Ext.getCmp(prototype.idAccountingCTA + '-cmbType1');
        var lblAccount1 = Ext.getCmp(prototype.idAccountingCTA + '-lblAccount1');
        var txtAccount1 = Ext.getCmp(prototype.idAccountingCTA + '-txtAccount1');
        var lblSubAccount1 = Ext.getCmp(prototype.idAccountingCTA + '-lblSubAccount1');
        var txtSubAccount1 = Ext.getCmp(prototype.idAccountingCTA + '-txtSubAccount1');
        var cmbControlled1 = Ext.getCmp(prototype.idAccountingCTA + '-cmbControlled1');
        var gridDataTax = Ext.getCmp(prototype.idAccountingCTA + '-gridDataTax');
        //AMC
        var cmbSource2 = Ext.getCmp(prototype.idAccountingCTA + '-cmbSource2');
        var cmbCountry2 = Ext.getCmp(prototype.idAccountingCTA + '-cmbCountry2');
        var cmbType2 = Ext.getCmp(prototype.idAccountingCTA + '-cmbType2');
        var cmbCurrency2 = Ext.getCmp(prototype.idAccountingCTA + '-cmbCurrency2');
        var cmbSubSource2 = Ext.getCmp(prototype.idAccountingCTA + '-cmbSubSource2');
        var cmbPayForm2 = Ext.getCmp(prototype.idAccountingCTA + '-cmbPayForm2');
        var lblClient2 = Ext.getCmp(prototype.idAccountingCTA + '-lblClient2');
        var txtClient2 = Ext.getCmp(prototype.idAccountingCTA + '-txtClient2');
        var lblIATA2 = Ext.getCmp(prototype.idAccountingCTA + '-lblIATA2');
        var txtIATA2 = Ext.getCmp(prototype.idAccountingCTA + '-txtIATA2');
        var gridDataClien = Ext.getCmp(prototype.idAccountingCTA + '-gridDataClien');
        //AMU
        var cmbType3 = Ext.getCmp(prototype.idAccountingCTA + '-cmbType3');
        var lblClient3 = Ext.getCmp(prototype.idAccountingCTA + '-lblClient3');
        var txtCliente3 = Ext.getCmp(prototype.idAccountingCTA + '-txtClient3');
        var lblUATPCard3 = Ext.getCmp(prototype.idAccountingCTA + '-lblUATPCard3');
        var txtUATPCard3 = Ext.getCmp(prototype.idAccountingCTA + '-txtUATPCard3');
        var lblAccount3 = Ext.getCmp(prototype.idAccountingCTA + '-lblAccount3');
        var txtAccount3 = Ext.getCmp(prototype.idAccountingCTA + '-txtAccount3');
        var lblSubAccount3 = Ext.getCmp(prototype.idAccountingCTA + '-lblSubAccount3');
        var txtSubAccount3 = Ext.getCmp(prototype.idAccountingCTA + '-txtSubAccount3');
        var cmbMode3 = Ext.getCmp(prototype.idAccountingCTA + '-cmbMode3');
        var gridDataUATP = Ext.getCmp(prototype.idAccountingCTA + '-gridDataUATP');
        //AMP
//        var bvalida = true;
        var cmbSource4 = Ext.getCmp(prototype.idAccountingCTA + '-cmbSource4');
        var cboFOPCode = Ext.getCmp(prototype.idAccountingCTA + '-cboFOPCode');
        var txtPTCardNumber = Ext.getCmp(prototype.idAccountingCTA + '-txtPTCardNumber');
        var lblAccount4 = Ext.getCmp(prototype.idAccountingCTA + '-lblAccount4');
        var txtAccount4 = Ext.getCmp(prototype.idAccountingCTA + '-txtAccount4');
        var lblSubAccount4 = Ext.getCmp(prototype.idAccountingCTA + '-lblSubAccount4');
        var txtSubAccount4 = Ext.getCmp(prototype.idAccountingCTA + '-txtSubAccount4');
        var gridDataPAGA = Ext.getCmp(prototype.idAccountingCTA + '-gridDataPAGA');



        /*Condicional para mostrar las etiquetas*/
        if (obj.getValue() === "AMS") {
            lblDocumentType.show();
            txtDocumentType.show();
            cmbCtaType.show();
            lblSubType.show();
            txtSubType.show();
            lblCategory.show();
            txtCategory.show();
            lblCta.show();
            txtCta.show();
            lblSubCta.show();
            txtSubCta.show();
            gridData.show();

            //AMT
            cmbCountry1.hide();
            cmbTAX1.hide();
            cmbCurrency1.hide();
            cmbType1.hide();
            lblAccount1.hide();
            txtAccount1.hide();
            lblSubAccount1.hide();
            txtSubAccount1.hide();
            cmbControlled1.hide();
            gridDataTax.hide();

            //AMC
            cmbSource2.hide();
            cmbCountry2.hide();
            cmbType2.hide();
            cmbCurrency2.hide();
            cmbSubSource2.hide();
            cmbPayForm2.hide();
            lblClient2.hide();
            txtClient2.hide();
            lblIATA2.hide();
            txtIATA2.hide();
            gridDataClien.hide();

            //AMU
            cmbType3.hide();
            lblClient3.hide();
            txtCliente3.hide();
            lblUATPCard3.hide();
            txtUATPCard3.hide();
            lblAccount3.hide();
            txtAccount3.hide();
            lblSubAccount3.hide();
            txtSubAccount3.hide();
            cmbMode3.hide();
            gridDataUATP.hide();

            //AMP
            cmbSource4.hide();
            cboFOPCode.hide();
            txtPTCardNumber.hide();
            lblAccount4.hide();
            txtAccount4.hide();
            lblSubAccount4.hide();
            txtSubAccount4.hide();
            gridDataPAGA.hide();

        } else if (obj.getValue() === "AMT") {
            cmbCountry1.show();
            cmbTAX1.show();
            cmbCurrency1.show();
            cmbType1.show();
            lblAccount1.show();
            txtAccount1.show();
            lblSubAccount1.show();
            txtSubAccount1.show();
            cmbControlled1.show();
            gridDataTax.show();

            //AMS
            lblDocumentType.hide();
            txtDocumentType.hide();
            cmbCtaType.hide();
            lblSubType.hide();
            txtSubType.hide();
            lblCategory.hide();
            txtCategory.hide();
            lblCta.hide();
            txtCta.hide();
            lblSubCta.hide();
            txtSubCta.hide();
            gridData.hide();

            //AMC
            cmbSource2.hide();
            cmbCountry2.hide();
            cmbType2.hide();
            cmbCurrency2.hide();
            cmbSubSource2.hide();
            cmbPayForm2.hide();
            lblClient2.hide();
            txtClient2.hide();
            lblIATA2.hide();
            txtIATA2.hide();
            gridDataClien.hide();

            //AMU
            cmbType3.hide();
            lblClient3.hide();
            txtCliente3.hide();
            lblUATPCard3.hide();
            txtUATPCard3.hide();
            lblAccount3.hide();
            txtAccount3.hide();
            lblSubAccount3.hide();
            txtSubAccount3.hide();
            cmbMode3.hide();
            gridDataUATP.hide();

            //AMP
            cmbSource4.hide();
            cboFOPCode.hide();
            txtPTCardNumber.hide();
            lblAccount4.hide();
            txtAccount4.hide();
            lblSubAccount4.hide();
            txtSubAccount4.hide();
            gridDataPAGA.hide();

        } else if (obj.getValue() === "AMC") {
            cmbSource2.show();
            cmbCountry2.show();
            cmbType2.show();
            cmbCurrency2.show();
            cmbSubSource2.show();
            cmbPayForm2.show();
            lblClient2.show();
            txtClient2.show();
            lblIATA2.show();
            txtIATA2.show();
            gridDataClien.show();

            //AMS
            lblDocumentType.hide();
            txtDocumentType.hide();
            cmbCtaType.hide();
            lblSubType.hide();
            txtSubType.hide();
            lblCategory.hide();
            txtCategory.hide();
            lblCta.hide();
            txtCta.hide();
            lblSubCta.hide();
            txtSubCta.hide();
            gridData.hide();

            //AMT
            cmbCountry1.hide();
            cmbTAX1.hide();
            cmbCurrency1.hide();
            cmbType1.hide();
            lblAccount1.hide();
            txtAccount1.hide();
            lblSubAccount1.hide();
            txtSubAccount1.hide();
            cmbControlled1.hide();
            gridDataTax.hide();

            //AMU
            cmbType3.hide();
            lblClient3.hide();
            txtCliente3.hide();
            lblUATPCard3.hide();
            txtUATPCard3.hide();
            lblAccount3.hide();
            txtAccount3.hide();
            lblSubAccount3.hide();
            txtSubAccount3.hide();
            cmbMode3.hide();
            gridDataUATP.hide();

            //AMP
            cmbSource4.hide();
            cboFOPCode.hide();
            txtPTCardNumber.hide();
            lblAccount4.hide();
            txtAccount4.hide();
            lblSubAccount4.hide();
            txtSubAccount4.hide();
            gridDataPAGA.hide();

        } else if (obj.getValue() === "AMU") {
            cmbType3.show();
            lblClient3.show();
            txtCliente3.show();
            lblUATPCard3.show();
            txtUATPCard3.show();
            lblAccount3.show();
            txtAccount3.show();
            lblSubAccount3.show();
            txtSubAccount3.show();
            cmbMode3.show();
            gridDataUATP.show();

            //AMS
            lblDocumentType.hide();
            txtDocumentType.hide();
            cmbCtaType.hide();
            lblSubType.hide();
            txtSubType.hide();
            lblCategory.hide();
            txtCategory.hide();
            lblCta.hide();
            txtCta.hide();
            lblSubCta.hide();
            txtSubCta.hide();
            gridData.hide();

            //AMT
            cmbCountry1.hide();
            cmbTAX1.hide();
            cmbCurrency1.hide();
            cmbType1.hide();
            lblAccount1.hide();
            txtAccount1.hide();
            lblSubAccount1.hide();
            txtSubAccount1.hide();
            cmbControlled1.hide();
            gridDataTax.hide();

            //AMC
            cmbSource2.hide();
            cmbCountry2.hide();
            cmbType2.hide();
            cmbCurrency2.hide();
            cmbSubSource2.hide();
            cmbPayForm2.hide();
            lblClient2.hide();
            txtClient2.hide();
            lblIATA2.hide();
            txtIATA2.hide();
            gridDataClien.hide();

            //AMP
            cmbSource4.hide();
            cboFOPCode.hide();
            txtPTCardNumber.hide();
            lblAccount4.hide();
            txtAccount4.hide();
            lblSubAccount4.hide();
            txtSubAccount4.hide();
            gridDataPAGA.hide();
        } else if (obj.getValue() === "AMP") {
//            if (cmbSource4 === '') {
//                Ext.MessageBox.alert('PRAXIS', 'Select an option', function (btn, text) {
//                    if (btn === 'ok' || btn === 'cancel')
//                        setTimeout("Ext.getCmp(prototype.idAccountingCTA + '-cmbSource4).focus();", 100);
//                });
//            }
            cmbSource4.show();
            cboFOPCode.show();
            txtPTCardNumber.show();
            lblAccount4.show();
            txtAccount4.show();
            lblSubAccount4.show();
            txtSubAccount4.show();
            gridDataPAGA.show();

            //AMS
            lblDocumentType.hide();
            txtDocumentType.hide();
            cmbCtaType.hide();
            lblSubType.hide();
            txtSubType.hide();
            lblCategory.hide();
            txtCategory.hide();
            lblCta.hide();
            txtCta.hide();
            lblSubCta.hide();
            txtSubCta.hide();
            gridData.hide();

            //AMT
            cmbCountry1.hide();
            cmbTAX1.hide();
            cmbCurrency1.hide();
            cmbType1.hide();
            lblAccount1.hide();
            txtAccount1.hide();
            lblSubAccount1.hide();
            txtSubAccount1.hide();
            cmbControlled1.hide();
            gridDataTax.hide();

            //AMC
            cmbSource2.hide();
            cmbCountry2.hide();
            cmbType2.hide();
            cmbCurrency2.hide();
            cmbSubSource2.hide();
            cmbPayForm2.hide();
            lblClient2.hide();
            txtClient2.hide();
            lblIATA2.hide();
            txtIATA2.hide();
            gridDataClien.hide();

            //AMU
            cmbType3.hide();
            lblClient3.hide();
            txtCliente3.hide();
            lblUATPCard3.hide();
            txtUATPCard3.hide();
            lblAccount3.hide();
            txtAccount3.hide();
            lblSubAccount3.hide();
            txtSubAccount3.hide();
            cmbMode3.hide();
            gridDataUATP.hide();

        }
    }


});