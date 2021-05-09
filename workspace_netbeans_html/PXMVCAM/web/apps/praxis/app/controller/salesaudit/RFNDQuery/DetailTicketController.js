/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.RFNDQuery.DetailTicketController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailTicketController',
    beanINI: {},
    beanIniTem: {},
    beanHistorical: {},
    totalcpn: 0,
    totalcpnuse: 0,
    beanTMP: {},
    urlWin01: CONTEXTPATH + '/RFNDPending',
    urlWin02: CONTEXTPATH + '/RFNDQuery',
    //prototype.url02 = CONTEXTPATH + '/RFNDPending';
    //prototype.url01 = CONTEXTPATH + '/RFNDQuery';
    init: function (view) {
        var me = this;
        //this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var txtadd = Ext.getCmp(prototype.id2 + '-txtadd');
        var gridRazonesTkt = Ext.getCmp(prototype.id2 + '-gridRazonesTkt');
        var txtCpn1 = Ext.getCmp(prototype.id2 + '-txtCpn1');
        var txtCpn2 = Ext.getCmp(prototype.id2 + '-txtCpn2');
        var txtCpn3 = Ext.getCmp(prototype.id2 + '-txtCpn3');
        var txtCpn4 = Ext.getCmp(prototype.id2 + '-txtCpn4');
        var CbtStatus = Ext.getCmp(prototype.id2 + '-ComboStatus');
        var save = Ext.getCmp(prototype.id2 + '-btn-save');
        switch (String(this.view.params.action)) {
            case 'FORMQUERYRFND':
                txtadd.hide();
                gridRazonesTkt.hide();
                txtCpn1.disable();
                txtCpn2.disable();
                txtCpn3.disable();
                txtCpn4.disable();
                CbtStatus.hide();
                save.hide();
                //Ext.getCmp(prototype.id2 + '-win').setHeight(Ext.getCmp(prototype.id2 + '-win').getHeight() - 200);
                break;
            case 'FORMASSOCIATEDRFND':

                if (String(this.view.params.qtytkt) > 1) {
                    txtadd.show();
                    gridRazonesTkt.show();
                    CbtStatus.show();
                } else {
                    //txtadd.hide();
                    gridRazonesTkt.hide();
                    //CbtStatus.hide();
                    //Ext.getCmp(prototype.id2 + '-win').setHeight(Ext.getCmp(prototype.id2 + '-win').getHeight() - 150);
                }

                txtadd.show();
                txtCpn1.enable();
                txtCpn2.enable();
                txtCpn3.enable();
                txtCpn4.enable();
                save.show();
                break;

        }
        this.CleanFields();
        this.setStores();
        this.setStoresFilters();
        this.onLoadDataGrid();
        switch (String(this.view.params.action)) {
            case 'FORMQUERYRFND':
                this.onLoadDataQuery();
                break;
            case 'FORMASSOCIATEDRFND':
                this.onLoadData();
                break;

        }

    },
    onLoadDataGrid: function () {
        Ext.getCmp(prototype.id2 + '-gridTaxesADD').show();
        var me = this;
        rec = me.view.params.rec;
        Ext.getCmp(prototype.id2 + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: this.urlWin02 + '/SearchQueryRFNDetailTCKT',
            method: 'POST',
            timeout: '300000',
            params: {
                IN_PREME: rec.get('A3648PREME'),
                IN_TICKET: rec.get('A3648TKT'),
                IN_ANIO: Ext.String.trim(rec.get('A3648ANIO'))
            },
            success: function (response, options) {
                Ext.getCmp(prototype.id2 + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);

                Ext.getCmp(prototype.id2 + '-gridListTaxes').getStore().removeAll();
                Ext.getCmp(prototype.id2 + '-gridListTaxes').getStore().loadData(res.lsta_TAXESAGEN);
                Ext.getCmp(prototype.id2 + '-gridTaxes').getStore().removeAll();
                if (res.lsta_TAXESAM.length > 0) {
                    Ext.getCmp(prototype.id2 + '-gridTaxes').getStore().loadData(res.lsta_TAXESAM);
                    //var grid05 = Ext.getCmp(prototype.id2 + '-gridTaxes');
                    //grid05.columns[3].setVisible(false);
                } else {
                    Ext.getCmp(prototype.id2 + '-gridTaxes').getStore().loadData(res.lsta_TAXESAGEN);
                    //var grid05 = Ext.getCmp(prototype.id2 + '-gridTaxes');
                    //grid05.columns[3].setVisible(true);
                }

                Ext.getCmp(prototype.id2 + '-gridPAYMENT').getStore().removeAll();
                Ext.getCmp(prototype.id2 + '-gridPAYMENT').getStore().loadData(res.lsta_Card);
                Ext.getCmp(prototype.id2 + '-gridCPN').getStore().removeAll();
                Ext.getCmp(prototype.id2 + '-gridCPN').getStore().loadData(res.lsta_COUPNS);
                Ext.getCmp(prototype.id2 + '-gridRazonesTkt').getStore().removeAll();
                Ext.getCmp(prototype.id2 + '-gridRazonesTkt').getStore().loadData(res.lst_RAZON);
                me.beanHistorical = res.lsta_HISTORY;
                if (res.lst_RAZON.length > 0) {
                    Ext.getCmp(prototype.id2 + '-gridRazonesTkt').show();
                } else {
                    Ext.getCmp(prototype.id2 + '-gridRazonesTkt').hide();
                    Ext.getCmp(prototype.id2 + '-win').setHeight(Ext.getCmp(prototype.id2 + '-win').getHeight() - 150);
                }
                switch (String(me.view.params.action)) {
                    case 'FORMQUERYRFND':
                        Ext.getCmp(prototype.id2 + '-txtCpn1').hide();
                        Ext.getCmp(prototype.id2 + '-txtCpn2').hide();
                        Ext.getCmp(prototype.id2 + '-txtCpn3').hide();
                        Ext.getCmp(prototype.id2 + '-txtCpn4').hide();
                        if (Ext.String.trim(rec.get('A3648CPN1')) !== '') {
                            Ext.getCmp(prototype.id2 + '-txtCpn1').show();
                            Ext.getCmp(prototype.id2 + '-txtCpn1').setValue(true);
                        }
                        if (Ext.String.trim(rec.get('A3648CPN2')) !== '') {
                            Ext.getCmp(prototype.id2 + '-txtCpn2').show();
                            Ext.getCmp(prototype.id2 + '-txtCpn2').setValue(true);
                        }
                        if (Ext.String.trim(rec.get('A3648CPN3')) !== '') {
                            Ext.getCmp(prototype.id2 + '-txtCpn3').show();
                            Ext.getCmp(prototype.id2 + '-txtCpn3').setValue(true);
                        }
                        if (Ext.String.trim(rec.get('A3648CPN4')) !== '') {
                            Ext.getCmp(prototype.id2 + '-txtCpn4').show();
                            Ext.getCmp(prototype.id2 + '-txtCpn4').setValue(true);
                        }
                        break;
                    case 'FORMASSOCIATEDRFND':

                        if (res.lsta_COUPNS.length > 0) {
                            Ext.getCmp(prototype.id2 + '-txtCpn1').hide();
                            Ext.getCmp(prototype.id2 + '-txtCpn2').hide();
                            Ext.getCmp(prototype.id2 + '-txtCpn3').hide();
                            Ext.getCmp(prototype.id2 + '-txtCpn4').hide();

                            for (var i = 0; i < res.lsta_COUPNS.length; i++) {
                                if (Ext.String.trim(res.lsta_COUPNS[i].A3654CPN) === '1') {
                                    Ext.getCmp(prototype.id2 + '-txtCpn1').show();
                                    me.totalcpn += 1;
                                }
                                if (Ext.String.trim(res.lsta_COUPNS[i].A3654CPN) === '2') {
                                    Ext.getCmp(prototype.id2 + '-txtCpn2').show();
                                    me.totalcpn += 1;
                                }
                                if (Ext.String.trim(res.lsta_COUPNS[i].A3654CPN) === '3') {
                                    Ext.getCmp(prototype.id2 + '-txtCpn3').show();
                                    me.totalcpn += 1;
                                }
                                if (Ext.String.trim(res.lsta_COUPNS[i].A3654CPN) === '4') {
                                    Ext.getCmp(prototype.id2 + '-txtCpn4').show();
                                    me.totalcpn += 1;
                                }
                            }
                        } else {
                            Ext.getCmp(prototype.id2 + '-txtCpn1').show();
                            Ext.getCmp(prototype.id2 + '-txtCpn2').show();
                            Ext.getCmp(prototype.id2 + '-txtCpn3').show();
                            Ext.getCmp(prototype.id2 + '-txtCpn4').show();
                        }
                        //
                        for (var i = 0; i < res.lsta_COUPNS.length; i++) {
                            if (Ext.String.trim(res.lsta_COUPNS[i].A3654CPN) === '1') {
                                if (Ext.String.trim(res.lsta_COUPNS[i].A3654CURS1) === 'RFND' || Ext.String.trim(res.lsta_COUPNS[i].A3654CURS1) === 'USED') {
                                    Ext.getCmp(prototype.id2 + '-txtCpn1').hide();
                                    me.totalcpn = (me.totalcpn - 1);
                                }
                            }
                            if (Ext.String.trim(res.lsta_COUPNS[i].A3654CPN) === '2') {
                                if (Ext.String.trim(res.lsta_COUPNS[i].A3654CURS1) === 'RFND' || Ext.String.trim(res.lsta_COUPNS[i].A3654CURS1) === 'USED') {
                                    Ext.getCmp(prototype.id2 + '-txtCpn2').hide();
                                    me.totalcpn = (me.totalcpn - 1);
                                }
                            }
                            if (Ext.String.trim(res.lsta_COUPNS[i].A3654CPN) === '3') {
                                if (Ext.String.trim(res.lsta_COUPNS[i].A3654CURS1) === 'RFND' || Ext.String.trim(res.lsta_COUPNS[i].A3654CURS1) === 'USED') {
                                    Ext.getCmp(prototype.id2 + '-txtCpn3').hide();
                                    me.totalcpn = (me.totalcpn - 1);
                                }
                            }
                            if (Ext.String.trim(res.lsta_COUPNS[i].A3654CPN) === '4') {
                                if (Ext.String.trim(res.lsta_COUPNS[i].A3654CURS1) === 'RFND' || Ext.String.trim(res.lsta_COUPNS[i].A3654CURS1) === 'USED') {
                                    Ext.getCmp(prototype.id2 + '-txtCpn4').hide();
                                    me.totalcpn = (me.totalcpn - 1);
                                }
                            }
                        }
                        if (res.lsta_COUPNS.length > 0) {
                            if (me.totalcpn === 0) {
                                Ext.getCmp(prototype.id2 + '-txtusoCpn').show();
                            }
                        } else {
                            Ext.getCmp(prototype.id2 + '-txtusoCpn').hide();
                        }

                        ///para habilitar los cupones
                        var tidoc = Ext.getCmp(prototype.id2 + '-txttidoc').getValue();
                        if (tidoc !== '') {
                            if (tidoc.substring(0, 3) === 'EMD') {
                                Ext.getCmp(prototype.id2 + '-txtShowcoupons').show();
                            }
                        } else {
                            Ext.getCmp(prototype.id2 + '-txtShowcoupons').hide();
                        }
                        break;

                }

            }
        });
    },
    onRendererColumnOnTime: function (value, metaData, record, rowIndex, colIndex, store, view) {
        switch (String(Ext.String.trim(record.get('A3653FLAG')))) {
            case 'I':
                value = 'silver';
                break;
            case 'A':
                value = 'green';
                break;
            default:
                value = 'red';
        }
        return '<i class="fas fa-circle" style="font-size: 16px; color:' + value + ';"></i>';
    },
    onLoadDataQuery: function () {
        var me = this;
        rec = me.view.params.rec;
        var gridTaxes = Ext.getCmp(prototype.id2 + '-gridTaxes');
        var gridPAYMENT = Ext.getCmp(prototype.id2 + '-gridPAYMENT');
        var gridRazonesTkt = Ext.getCmp(prototype.id2 + '-gridRazonesTkt');
        gridTaxes.columns[4].setVisible(false);
        gridPAYMENT.columns[7].setVisible(false);
        gridPAYMENT.columns[8].setVisible(false);
        gridRazonesTkt.columns[3].setVisible(false);
        gridPAYMENT.on('beforeedit', function (event) {
            return false;
        }, gridPAYMENT);
        gridTaxes.on('beforeedit', function (event) {
            return false;
        }, gridTaxes);
        gridRazonesTkt.on('beforeedit', function (event) {
            return false;
        }, gridRazonesTkt);


        /*gridPAYMENT.on('beforeedit', function (editor, e) {
         gridPAYMENT.getPlugin('rowEditing').editor.form.findField('fieldToDisable').disable();
         });*/
        /*
         grid.on('beforeedit', function(editor, e) {
         if (e.record.get('status') === 4 ){
         grid.getPlugin('rowEditing').editor.form.findField('fieldToDisable').disable();
         }
         else{
         grid.getPlugin('rowEditing').editor.form.findField('fieldToDisable').enable();
         });
         */
        //gridPAYMENT.getColumnModel().setEditable(2, false);
        //gridPAYMENT.columns[3].editor(false);
        Ext.getCmp(prototype.id2 + '-txtShowcoupons').hide();
        Ext.getCmp(prototype.id2 + '-gridTaxesADD').hide();
        Ext.getCmp(prototype.id2 + '-gridFopADD').hide();
        Ext.getCmp(prototype.id2 + '-txtfolio').setValue(String(this.view.params.folio));
        Ext.getCmp(prototype.id2 + '-txttkt').setValue(rec.get('A3648TKT'));
        Ext.getCmp(prototype.id2 + '-txttidoc').setValue(rec.get('A3648TIDOC'));
        Ext.getCmp(prototype.id2 + '-txtcpn').setValue(rec.get('A3648CUPON'));
        Ext.getCmp(prototype.id2 + '-txttrnc').setValue(rec.get('A3648TRNCU'));
        Ext.getCmp(prototype.id2 + '-txtIssdate').setValue(rec.get('A3648FVNTA'));
        Ext.getCmp(prototype.id2 + '-txtpnr').setValue(rec.get('A3648PNR'));
        Ext.getCmp(prototype.id2 + '-txtpax').setValue(rec.get('A3648PAX'));
        Ext.getCmp(prototype.id2 + '-txtEndorse').setValue(rec.get('A3648ENDOR'));
        Ext.getCmp(prototype.id2 + '-txtrefundable').setValue(rec.get('A3648RFNDB'));
        Ext.getCmp(prototype.id2 + '-txtRfndFee').setValue(rec.get('A3648FEE'));
        Ext.getCmp(prototype.id2 + '-checkApplyBPO').setReadOnly(true);
        Ext.getCmp(prototype.id2 + '-checkApplyrobot').setReadOnly(true);
        if (rec.get('A3648MARCA') === 'Y') {
            Ext.getCmp(prototype.id2 + '-checkApplyBPO').setValue(true);
            Ext.getCmp(prototype.id2 + '-checkApplyrobot').setValue(false);
        }
        if (rec.get('A3648MARCA') === 'N') {
            Ext.getCmp(prototype.id2 + '-checkApplyBPO').setValue(false);
            Ext.getCmp(prototype.id2 + '-checkApplyrobot').setValue(true);
        }

        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.id2 + '-txtEndorse',
            html: '' + Ext.String.trim(rec.get('A3648ENDOR'))
        });
        Ext.getCmp(prototype.id2 + '-txtFareCal').setValue(rec.get('A3648FAREC'));
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.id2 + '-txtFareCal',
            html: '' + Ext.String.trim(rec.get('A3648FAREC'))
        });
        Ext.getCmp(prototype.id2 + '-txtiata').setValue(rec.get('A3648IATA'));
        Ext.getCmp(prototype.id2 + '-txtmda').setValue(rec.get('A3648MDA'));
        //Ext.getCmp(prototype.id2 + '-txtCOUNTRY').setValue();
        Ext.getCmp(prototype.id2 + '-txtpreme').setValue(rec.get('A3648PREME'));
        Ext.getCmp(prototype.id2 + '-txtCrrl').setValue(rec.get('A3648CORRL'));

        // suma
        Ext.getCmp(prototype.id2 + '-txtFare').setValue(Ext.util.Format.number(rec.get('A3648TARIF'), '0,000.00'));
        Ext.getCmp(prototype.id2 + '-txtTotalTax').setValue(Ext.util.Format.number(rec.get('A3648TTAX'), '0,000.00'));
        Ext.getCmp(prototype.id2 + '-txtCommission').setValue(Ext.util.Format.number(rec.get('A3648COMIS'), '0,000.00'));
        Ext.getCmp(prototype.id2 + '-txtTotal').setValue(Ext.util.Format.number(rec.get('A3648TOTAL'), '0,000.00'));
        //diferenciaas
        //A3648CPN1,A3648CPN2,A3648CPN3,A3648CPN4,A3648TRFND,A3648TARID,A3648TTAXD,A3648COMID,A3648SCOMD,A3648TOTAD,
        Ext.getCmp(prototype.id2 + '-txtTotalFareAm').setValue(Ext.util.Format.number(rec.get('A3648TARID'), '0,000.00'));
        Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').setValue(Ext.util.Format.number(rec.get('A3648TTAXD'), '0,000.00'));
        Ext.getCmp(prototype.id2 + '-txtTotalram').setValue(Ext.util.Format.number(rec.get('A3648TOTAD'), '0,000.00'));
        Ext.getCmp(prototype.id2 + '-txtTotalFareAm').setReadOnly(true);



    },
    onLoadData: function () {
        var me = this;
        rec = me.view.params.rec;
        ////
        Ext.getCmp(prototype.id2 + '-txttidoc').setValue(rec.get('A3648TIDOC'));
        Ext.getCmp(prototype.id2 + '-txtfolio').setValue(String(this.view.params.folio));
        Ext.getCmp(prototype.id2 + '-txtRfndFee').setValue(rec.get('A3648FEE'));
        Ext.getCmp(prototype.id2 + '-txttkt').setValue(rec.get('A3648TKT'));
        Ext.getCmp(prototype.id2 + '-txtcpn').setValue(rec.get('A3648CUPON'));
        Ext.getCmp(prototype.id2 + '-txttrnc').setValue(rec.get('A3648TRNCU'));
        Ext.getCmp(prototype.id2 + '-txtIssdate').setValue(rec.get('A3648FVNTA'));
        Ext.getCmp(prototype.id2 + '-txtpnr').setValue(rec.get('A3648PNR'));
        Ext.getCmp(prototype.id2 + '-txtpax').setValue(rec.get('A3648PAX'));
        Ext.getCmp(prototype.id2 + '-txtEndorse').setValue(rec.get('A3648ENDOR'));
        Ext.getCmp(prototype.id2 + '-txtrefundable').setValue(rec.get('A3648RFNDB'));
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.id2 + '-txtEndorse',
            html: '' + Ext.String.trim(rec.get('A3648ENDOR'))
        });
        Ext.getCmp(prototype.id2 + '-txtFareCal').setValue(rec.get('A3648FAREC'));
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.id2 + '-txtFareCal',
            html: '' + Ext.String.trim(rec.get('A3648FAREC'))
        });
        Ext.getCmp(prototype.id2 + '-txtiata').setValue(rec.get('A3648IATA'));
        Ext.getCmp(prototype.id2 + '-txtmda').setValue(rec.get('A3648MDA'));
        Ext.getCmp(prototype.id2 + '-txtCOUNTRY').setValue(rec.get('A3648PAIVTA'));
        Ext.getCmp(prototype.id2 + '-txtpreme').setValue(rec.get('A3648PREME'));
        Ext.getCmp(prototype.id2 + '-txtCrrl').setValue(rec.get('A3648CORRL'));

        // suma
        Ext.getCmp(prototype.id2 + '-txtFare').setValue(Ext.util.Format.number(rec.get('A3648TARIF'), '0,000.00'));
        Ext.getCmp(prototype.id2 + '-txtTotalTax').setValue(Ext.util.Format.number(rec.get('A3648TTAX'), '0,000.00'));
        Ext.getCmp(prototype.id2 + '-txtCommission').setValue(Ext.util.Format.number(rec.get('A3648COMIS'), '0,000.00'));
        Ext.getCmp(prototype.id2 + '-txtTotal').setValue(Ext.util.Format.number(rec.get('A3648TOTAL'), '0,000.00'));
        //diferenciaas
        //A3648CPN1,A3648CPN2,A3648CPN3,A3648CPN4,A3648TRFND,A3648TARID,A3648TTAXD,A3648COMID,A3648SCOMD,A3648TOTAD,
        if (rec.get('A3648TARID') !== 0) {
            Ext.getCmp(prototype.id2 + '-txtTotalFareAm').setValue(Ext.util.Format.number(rec.get('A3648TARID'), '0,000.00'));
            Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').setValue(Ext.util.Format.number(rec.get('A3648TTAXD'), '0,000.00'));
            Ext.getCmp(prototype.id2 + '-txtTotalram').setValue(Ext.util.Format.number(rec.get('A3648TOTAD'), '0,000.00'));
        } else {
            Ext.getCmp(prototype.id2 + '-txtTotalFareAm').setValue(Ext.util.Format.number(rec.get('A3648TARIF'), '0,000.00'));
            Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').setValue(Ext.util.Format.number(rec.get('A3648TTAX'), '0,000.00'));
            Ext.getCmp(prototype.id2 + '-txtTotalram').setValue(Ext.util.Format.number(rec.get('A3648TOTAL'), '0,000.00'));
        }


        Ext.getCmp(prototype.id2 + '-txtTotalFareAm').setReadOnly(false);
        Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').setReadOnly(true);
        Ext.getCmp(prototype.id2 + '-txtTotalram').setReadOnly(true);
        var gridRazonesTkt = Ext.getCmp(prototype.id2 + '-gridRazonesTkt');
        gridRazonesTkt.on('beforeedit', function (event, e) {
            if (e.record.get('A3649CODE') === '00001' && e.record.get('A3649TYPE') === 'AM') {
                return true;
            } else {
                return false;
            }

        }, gridRazonesTkt);


    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.id2 + '-gridCPN');
        var grid02 = Ext.getCmp(prototype.id2 + '-gridPAYMENT');
        var grid03 = Ext.getCmp(prototype.id2 + '-gridListTaxes');
        var grid04 = Ext.getCmp(prototype.id2 + '-gridRazonesTkt');
        var grid05 = Ext.getCmp(prototype.id2 + '-gridTaxes');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.id2 + '-store-grid01'
        });
        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.id2 + '-store-grid02'
        });
        var store03 = Ext.create('Ext.data.Store', {
            storeId: prototype.id2 + '-store-grid03'
        });
        var store04 = Ext.create('Ext.data.Store', {
            storeId: prototype.id2 + '-store-grid04'
        });
        var store05 = Ext.create('Ext.data.Store', {
            storeId: prototype.id2 + '-store-grid05'
        });

        grid01.setStore(store01);
        grid02.setStore(store02);
        grid03.setStore(store03);
        grid04.setStore(store04);
        grid05.setStore(store05);

    },
    onAddFopClick: function (rec) {
        var me = this;
        var grid01 = Ext.getCmp(prototype.id2 + '-gridPAYMENT');
        var beanDatos = {};
        beanDatos.A3653CFOP = '';
        beanDatos.A3653TYCAR = '';
        beanDatos.A3653NTARJ = '';
        beanDatos.A3653FEXP = '';
        beanDatos.A3653CAPL = '';
        beanDatos.A3653TOTAL = 0;
        beanDatos.A3653TYPE = 'AE';
        beanDatos.A3653CORRL = '';
        beanDatos.A3653FLAG = 'A';
        grid01.getStore().add(beanDatos);
    },
    OnAddTaxRenderer: function (rec) {
        var me = this;
        var grid01 = Ext.getCmp(prototype.id2 + '-gridTaxes');
        var beanDatos = {};
        beanDatos.A3652CDTAX = '';
        beanDatos.A3652CORRL = '';
        beanDatos.A3652TXDIF = 0;
        beanDatos.A3652APFC='';
        beanDatos.A3652MONED = Ext.getCmp(prototype.id2 + '-txtmda').getValue();
        grid01.getStore().add(beanDatos);
        me.onSumaTaxGrid();

        /*var me = this;
         var win = new Ext.Praxis.view.salesaudit.RFNDQuery.RFNDAddTax({
         vl_mda: Ext.getCmp(prototype.id2 + '-txtmda').getValue()
         });
         win.show();*/
    },
    cargaDatos: function (rec) {
        var me = this;
        me.beanINI.IN_OPTION = '1';
        me.beanINI.IN_SEQ = '';
        me.beanINI.IN_CNXPA = rec.get('A3537CNXPA');
        if (Ext.String.trim(rec.get('A3537TRNCU')).substring(0, 3) === 'RFND') {
            me.beanINI.IN_OPTION = '3';
            me.beanINI.IN_CNXPA = rec.get('A3537NMEMO');
        }
        if (Ext.String.trim(rec.get('A3537TRNCU')).substring(0, 3) === 'TKT' || Ext.String.trim(rec.get('A3537TRNCU')).substring(0, 3) === 'EXCH' || Ext.String.trim(rec.get('A3537TRNCU')).substring(0, 3) === 'EMD') {
            me.beanINI.IN_OPTION = '2';
            me.beanINI.IN_SEQ = '00';
            me.beanINI.IN_CNXPA = rec.get('A3537NMEMO');
        }
        me.beanINI.IN_CIA = rec.get('A3537CCUST');
        me.beanINI.IN_PREME = rec.get('A3537PREME');

        Ext.getCmp(prototype.id2 + '-win').mask('Please Wait....');


        /* cargar data*/
        Ext.Ajax.request({
            url: this.urlWin01 + '/SearchPostbillingDetail/',
            method: 'POST',
            timeout: '300000',
            params: me.beanINI,
            success: function (response, options) {
                Ext.getCmp(prototype.id2 + '-win').unmask();
                var res = Ext.decode(response.responseText);
                Ext.getCmp(prototype.id2 + '-gridRazon').getStore().removeAll();
                Ext.getCmp(prototype.id2 + '-gridRazon').getStore().loadData(res.lst_DispuHisto);

                Ext.getCmp(prototype.id2 + '-gridTKT').getStore().removeAll();
                Ext.getCmp(prototype.id2 + '-gridTKT').getStore().loadData(res.lst_Tkts);

                Ext.getCmp(prototype.id2 + '-gridDispuRazon').getStore().removeAll();
                Ext.getCmp(prototype.id2 + '-gridDispuRazon').getStore().loadData(res.lst_DispuPostbi);
            }
        });
        /*finde la carga*/
    },
    OnAmountSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(value, '0,000.00');
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    setStoresFilters: function () {
        var ComboEstatus = Ext.getCmp(prototype.id2 + '-ComboStatus');

        ComboEstatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "R", "name": "REJECT"}
            ]
        }));

    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
    },
    OnInactive: function (grid, rowIndex, colIndex) {
        var me = this;
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var paramsGuardarTAX = {};

        if (rec.data.A3653CORRL !== '' || rec.data.A3653CORRL !== undefined) {
            if (Ext.String.trim(rec.data.A3653FLAG) === 'D') {
                Ext.Msg.alert('.: PRAXIS :.', 'The payment method is deleted');
                return;
            }
            if (Ext.String.trim(rec.data.A3653FLAG) === 'I') {
                Ext.Msg.alert('.: PRAXIS :.', 'The payment method is inactive');
                return;
            }

        }

        global.Msg({
            msg: 'Inactive FOP?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    if (rec.data.A3653CORRL !== '' || rec.data.A3653CORRL !== undefined) {
                        paramsGuardarTAX.IN_OPTION = "4";
                        paramsGuardarTAX.A3652CCUST = Ext.String.trim(rec.data.A3653CCUST);
                        paramsGuardarTAX.A3652PREME = Ext.String.trim(rec.data.A3653PREME);
                        paramsGuardarTAX.A3652ANIO = Ext.String.trim(rec.data.A3653ANIO);
                        paramsGuardarTAX.A3652CIA = Ext.String.trim(rec.data.A3653CIA);
                        paramsGuardarTAX.A3652FORMA = Ext.String.trim(rec.data.A3653FORMA);
                        paramsGuardarTAX.A3652SERIE = Ext.String.trim(rec.data.A3653SERIE);
                        paramsGuardarTAX.A3652SEQ = Ext.String.trim(rec.data.A3653SEQ);
                        paramsGuardarTAX.A3652CORRL = Ext.String.trim(rec.data.A3653CORRL);

                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id2 + '-form'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin02 + '/ProcesaDeleteTAXManual/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(paramsGuardarTAX)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD DELETED' || res.data === 'RECORD INACTIVE') {
                                    vp_icon = 1;
                                    grid.getStore().removeAt(rowIndex);
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                    }});
                            }
                        });
                    } else {
                        grid.getStore().removeAt(rowIndex);
                    }
                }
            }
        });

    },
    OnFopRemove: function (grid, rowIndex, colIndex) {
        var me = this;
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var paramsGuardarTAX = {};
        global.Msg({
            msg: 'DELETE FOP?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    if (rec.data.A3653CORRL !== '' || rec.data.A3653CORRL !== undefined) {
                        paramsGuardarTAX.IN_OPTION = "3";
                        paramsGuardarTAX.A3652CCUST = Ext.String.trim(rec.data.A3653CCUST);
                        paramsGuardarTAX.A3652PREME = Ext.String.trim(rec.data.A3653PREME);
                        paramsGuardarTAX.A3652ANIO = Ext.String.trim(rec.data.A3653ANIO);
                        paramsGuardarTAX.A3652CIA = Ext.String.trim(rec.data.A3653CIA);
                        paramsGuardarTAX.A3652FORMA = Ext.String.trim(rec.data.A3653FORMA);
                        paramsGuardarTAX.A3652SERIE = Ext.String.trim(rec.data.A3653SERIE);
                        paramsGuardarTAX.A3652SEQ = Ext.String.trim(rec.data.A3653SEQ);
                        paramsGuardarTAX.A3652CORRL = Ext.String.trim(rec.data.A3653CORRL);

                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id2 + '-form'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin02 + '/ProcesaDeleteTAXManual/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(paramsGuardarTAX)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD DELETED') {
                                    vp_icon = 1;
                                    grid.getStore().removeAt(rowIndex);
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                    }});
                            }
                        });
                    } else {
                        grid.getStore().removeAt(rowIndex);
                    }
                }
            }
        });

    },
    OnTaxRFNDRemove: function (grid, rowIndex, colIndex) {
        var me = this;
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var paramsGuardarTAX = {};
        global.Msg({
            msg: 'DELETE TAX?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    if (rec.data.A3652CORRL !== '' || rec.data.A3652CORRL !== undefined) {
                        paramsGuardarTAX.IN_OPTION = "1";
                        paramsGuardarTAX.A3652CIA = Ext.String.trim(rec.data.A3652CIA);
                        paramsGuardarTAX.A3652FORMA = Ext.String.trim(rec.data.A3652FORMA);
                        paramsGuardarTAX.A3652SERIE = Ext.String.trim(rec.data.A3652SERIE);
                        paramsGuardarTAX.A3652SEQ = Ext.String.trim(rec.data.A3652SEQ);
                        paramsGuardarTAX.A3652CORRL = Ext.String.trim(rec.data.A3652CORRL);
                        paramsGuardarTAX.A3652PREME = Ext.String.trim(rec.data.A3652PREME);
                        paramsGuardarTAX.A3652ANIO = Ext.String.trim(rec.data.A3652ANIO);

                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id2 + '-form'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin02 + '/ProcesaDeleteTAXManual/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(paramsGuardarTAX)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD DELETED') {
                                    vp_icon = 1;
                                    grid.getStore().removeAt(rowIndex);
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                    }});
                            }
                        });
                    } else {
                        grid.getStore().removeAt(rowIndex);
                    }
                    me.onSumaTaxGrid();
                }
            }
        });

    },
    OnRazonRFNDRemove: function (grid, rowIndex, colIndex) {
        var me = this;
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var paramsGuardarRazon = {};
        global.Msg({
            msg: 'DELETE Razon?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    if (rec.data.A3656CORRL !== '' || rec.data.A3656CORRL !== undefined) {
                        paramsGuardarRazon.IN_OPTION = "2";
                        paramsGuardarRazon.A3652CIA = "";
                        paramsGuardarRazon.A3652FORMA = "";
                        paramsGuardarRazon.A3652SERIE = "";
                        paramsGuardarRazon.A3652SEQ = "";
                        paramsGuardarRazon.A3652CORRL = Ext.String.trim(rec.data.A3649CORRL);
                        paramsGuardarRazon.A3652PREME = Ext.String.trim(rec.data.A3649PREME);
                        paramsGuardarRazon.A3652ANIO = Ext.String.trim(rec.data.A3649ANIO);

                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id2 + '-form'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin02 + '/ProcesaDeleteTAXManual/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(paramsGuardarRazon)},
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                var vp_icon = 0;
                                if (res.data === 'RECORD DELETED') {
                                    vp_icon = 1;
                                    grid.getStore().removeAt(rowIndex);
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                    }});
                            }
                        });
                    } else {
                        grid.getStore().removeAt(rowIndex);
                    }
                    // grid.getStore().removeAt(rowIndex);
                }
            }
        });

    },
    CleanFields: function () {
        /* Ext.getCmp(prototype.id2 + '-gridRazon').getStore().removeAll();
         Ext.getCmp(prototype.id2 + '-gridTKT').getStore().removeAll();
         Ext.getCmp(prototype.id2 + '-gridDispuRazon').getStore().removeAll();
         Ext.getCmp(prototype.id2 + '-nmemo').setValue('');
         Ext.getCmp(prototype.id2 + '-ComboStatus').setValue('');
         Ext.getCmp(prototype.id2 + '-disputable').setValue('');
         Ext.getCmp(prototype.id2 + '-Argument').setValue('');
         Ext.getCmp(prototype.id2 + '-File').setValue('');
         Ext.getCmp(prototype.id2 + '-File2').setValue('');
         Ext.getCmp(prototype.id2 + '-File3').setValue('');
         Ext.getCmp(prototype.id2 + '-trnc').setValue('');
         Ext.getCmp(prototype.id2 + '-disputable').setValue('0.00');
         Ext.getCmp(prototype.id2 + '-dias').setValue('');
         Ext.getCmp(prototype.id2 + '-mda').setValue('');
         Ext.getCmp(prototype.id2 + '-pbda').setValue('');
         Ext.getCmp(prototype.id2 + '-PBDate').setValue('');
         Ext.getCmp(prototype.id2 + '-ResoDate').setValue('');
         Ext.getCmp(prototype.id2 + '-txtStatus').setValue('');
         Ext.getCmp(prototype.id2 + '-pbdadif').setValue('0.00');*/


    },
    metadata_detalle: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        Ext.getCmp(prototype.id2 + '-Disputa').setValue(data.A2553DESCR);
    },
    metadata_razon: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        Ext.getCmp(prototype.id2 + '-Disputa').setValue(data.A3537NCONX);
    },

    onClickCancel: function (btn) {
        this.view.close();
    },
    onColumnAirlineRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var me = this;
        metaData.style = "background:#D5F4D5 !important";
        me.onSumaTaxGrid();
        return Ext.util.Format.number(value, '0,000.00');
    },
    OnAirlineSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(parseFloat(value), '0,000.00');
    },
    onChkChangeCPN: function (obj, newValue, oldValue, eOpts) {
        var me = this;
        var grid03 = Ext.getCmp(prototype.id2 + '-gridCPN');
        var regs = grid03.getStore().getCount();
        if (!newValue) {
            //Ext.getCmp(prototype.id2 + '-txtShowcoupons').hide();Ext.getCmp(prototype.id2 + '-txtShowcoupons').show();
            me.totalcpn = 0;
            Ext.getCmp(prototype.id2 + '-txtCpn1').hide();
            Ext.getCmp(prototype.id2 + '-txtCpn2').hide();
            Ext.getCmp(prototype.id2 + '-txtCpn3').hide();
            Ext.getCmp(prototype.id2 + '-txtCpn4').hide();
            for (var i = 0; i < regs; i++) {
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '1') {
                    me.totalcpn += 1;
                    Ext.getCmp(prototype.id2 + '-txtCpn1').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '2') {
                    me.totalcpn += 1;
                    Ext.getCmp(prototype.id2 + '-txtCpn2').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '3') {
                    me.totalcpn += 1;
                    Ext.getCmp(prototype.id2 + '-txtCpn3').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '4') {
                    me.totalcpn += 1;
                    Ext.getCmp(prototype.id2 + '-txtCpn4').show();
                }

            }
            //para verificar cupones
            for (var e = 0; e < regs; e++) {
                if (Ext.String.trim(grid03.getStore().getAt(e).get('A3654CPN')) === '1') {
                    if (Ext.String.trim(grid03.getStore().getAt(e).get('A3654CURS1')) === 'RFND' || Ext.String.trim(grid03.getStore().getAt(e).get('A3654CURS1')) === 'USED') {
                        Ext.getCmp(prototype.id2 + '-txtCpn1').hide();
                        me.totalcpn = (me.totalcpn - 1);
                    }
                }
                if (Ext.String.trim(grid03.getStore().getAt(e).get('A3654CPN')) === '2') {
                    if (Ext.String.trim(grid03.getStore().getAt(e).get('A3654CURS1')) === 'RFND' || Ext.String.trim(grid03.getStore().getAt(e).get('A3654CURS1')) === 'USED') {
                        Ext.getCmp(prototype.id2 + '-txtCpn1').hide();
                        me.totalcpn = (me.totalcpn - 1);
                    }
                }
                if (Ext.String.trim(grid03.getStore().getAt(e).get('A3654CPN')) === '3') {
                    if (Ext.String.trim(grid03.getStore().getAt(e).get('A3654CURS1')) === 'RFND' || Ext.String.trim(grid03.getStore().getAt(e).get('A3654CURS1')) === 'USED') {
                        Ext.getCmp(prototype.id2 + '-txtCpn1').hide();
                        me.totalcpn = (me.totalcpn - 1);
                    }
                }
                if (Ext.String.trim(grid03.getStore().getAt(e).get('A3654CPN')) === '4') {
                    if (Ext.String.trim(grid03.getStore().getAt(e).get('A3654CURS1')) === 'RFND' || Ext.String.trim(grid03.getStore().getAt(e).get('A3654CURS1')) === 'USED') {
                        Ext.getCmp(prototype.id2 + '-txtCpn1').hide();
                        me.totalcpn = (me.totalcpn - 1);
                    }
                }

            }
        } else {
            for (var i = 0; i < regs; i++) {
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '1') {
                    Ext.getCmp(prototype.id2 + '-txtCpn1').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '2') {
                    Ext.getCmp(prototype.id2 + '-txtCpn2').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '3') {
                    Ext.getCmp(prototype.id2 + '-txtCpn3').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '4') {
                    Ext.getCmp(prototype.id2 + '-txtCpn4').show();
                }

            }
        }
    },
    validaRequiredFields: function () {
        var bvalida = true;
        var vl_razon = '';
        var Stat1 = '';
        var Stat2 = '';
        var Stat3 = '';
        var Stat4 = '';
        var vl_razon2 = 0;
        var totaldif = 0;
        var faredif = 0;
        var vl_netofop = 0;
        var vl_STATUS = Ext.getCmp(prototype.id2 + '-ComboStatus').getValue();
        var grid03 = Ext.getCmp(prototype.id2 + '-gridRazonesTkt');
        var regs = grid03.getStore().getCount();
        var cbox1 = Ext.getCmp(prototype.id2 + '-txtCpn1').getValue();
        var cbox2 = Ext.getCmp(prototype.id2 + '-txtCpn2').getValue();
        var cbox3 = Ext.getCmp(prototype.id2 + '-txtCpn3').getValue();
        var cbox4 = Ext.getCmp(prototype.id2 + '-txtCpn4').getValue();
        var vl_type = Ext.getCmp(prototype.id2 + '-txttidoc').getValue();
        var vl_Showcoupons = Ext.getCmp(prototype.id2 + '-txtShowcoupons').getValue();
        var grid04 = Ext.getCmp(prototype.id2 + '-gridTaxes');
        var reg4 = grid04.getStore().getCount();
        var gridPAYMENT = Ext.getCmp(prototype.id2 + '-gridPAYMENT');
        var reg5 = gridPAYMENT.getStore().getCount();
        //diferencia tarifa

        if (Ext.getCmp(prototype.id2 + '-txtTotalFareAm').getValue() === '') {
            Ext.getCmp(prototype.id2 + '-txtTotalFareAm').setValue('0.00');
        }
        if (Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').getValue() === '') {
            Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').setValue('0.00');
        }
        if (Ext.getCmp(prototype.id2 + '-txtFare').getValue() === '') {
            Ext.getCmp(prototype.id2 + '-txtFare').setValue('0.00');
        }
        if (Ext.getCmp(prototype.id2 + '-txtTotalram').getValue() === '') {
            Ext.getCmp(prototype.id2 + '-txtTotalram').setValue('0.00');
        }
        if (Ext.getCmp(prototype.id2 + '-txtTotal').getValue() === '') {
            Ext.getCmp(prototype.id2 + '-txtTotal').setValue('0.00');
        }

        var tarifaAm = Ext.getCmp(prototype.id2 + '-txtTotalFareAm').getValue().replace(',', '');
        var TotalTaxAm = Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').getValue().replace(',', '');
        var totalam = Ext.getCmp(prototype.id2 + '-txtTotalram').getValue().replace(',', '');
        //agencia
        var tarifaTkt = Ext.getCmp(prototype.id2 + '-txtFare').getValue().replace(',', '');
        var totaltkt = Ext.getCmp(prototype.id2 + '-txtTotal').getValue().replace(',', '');
        // diferencia de total a rfnd
       if (totaltkt !== 0 && totaltkt !== '0.00') {
            totaldif = (totaltkt - totalam);
        }
        if (faredif !== 0 && faredif !== '0.00') {
            faredif = (tarifaTkt - tarifaAm);
        }


        if (vl_STATUS === 'R') {
            if (regs === 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter issue reason');
                bvalida = false;
            }

            if (regs !== 0) {
                for (var o = 0; o < regs; o++) {
                    if (grid03.getStore().getAt(o).get('A3649CODE') !== '00002') {
                        vl_razon2 = vl_razon2 + 1;
                    }
                }
                if (vl_razon2.length === 0) {
                    Ext.Msg.alert('.: PRAXIS :.', 'The free text must be used with another answer');
                    bvalida = false;
                }
            }

            if (regs !== 0) {
                for (var i = 0; i < regs; i++) {
                    vl_razon = vl_razon + grid03.getStore().getAt(i).get('A3649ERROR');
                    if (grid03.getStore().getAt(i).get('A3649ERROR').length > 250) {
                        Ext.Msg.alert('.: PRAXIS :.', 'The description must not exceed 250 characters');
                        bvalida = false;
                        return;
                    }
                }
                if (vl_razon.length > 1000) {
                    Ext.Msg.alert('.: PRAXIS :.', 'The description total must not exceed 1000 characters');
                    bvalida = false;
                }
            }
            for (var e = 0; e < regs; e++) {
                if (grid03.getStore().getAt(e).get('A3649FAMIL') === 'Authorise' && vl_STATUS === 'R') {
                    Ext.Msg.alert('.: PRAXIS :.', 'Check the answer, the rejected status cannot be used with authorise answer');
                    bvalida = false;
                    return;
                }
            }
        }
        if (vl_STATUS !== 'R') {
            if (!Ext.getCmp(prototype.id2 + '-checkApplyBPO').getValue() && !Ext.getCmp(prototype.id2 + '-checkApplyrobot').getValue()) {
                Ext.Msg.alert('.: PRAXIS :.', 'Select Apply change status / BPO  O Apply robot sabre');
                bvalida = false;
                return;
            }

            for (var o = 0; o < reg4; o++) {
                if (Ext.String.trim(grid04.getStore().getAt(o).get('A3652CDTAX')).length === 0) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter Code Tax');
                    bvalida = false;
                    return;
                }
                if (Ext.String.trim(grid04.getStore().getAt(o).get('A3652MONED')).length === 0) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter Currency');
                    bvalida = false;
                    return;
                }
                if (grid04.getStore().getAt(o).get('A3652TXDIF') === 0 || grid04.getStore().getAt(o).get('A3652TXDIF') === 0.00) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter Tax  Amount');
                    bvalida = false;
                    return;
                }
                if (Ext.String.trim(grid04.getStore().getAt(o).get('A3652CDTAX')) === 'XF' && Ext.String.trim(grid04.getStore().getAt(o).get('A3652APFC')).length < 3) {
                    Ext.Msg.alert('.: PRAXIS :.', 'Please, enter Airport for tax XF');
                    bvalida = false;
                    return;
                }


            }
        }


        if (vl_STATUS !== 'R') {
            if (Ext.getCmp(prototype.id2 + '-txttrnc').getValue() !== 'EXCH' && Ext.getCmp(prototype.id2 + '-txttrnc').getValue() !== '') {
                if (faredif < 0) {
                    Ext.Msg.alert('.: PRAXIS :.', 'The fare must not be higher than the ticket');
                    bvalida = false;
                    return;
                }
            }
            if (totaldif < 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'The amount of the RFND must not be greater than the Ticket');
                bvalida = false;
                return;
            }
            if (totalam === '0.00') {
                Ext.Msg.alert('.: PRAXIS :.', 'You must enter the amount to RFND');
                bvalida = false;
                return;
            }
            if (!vl_Showcoupons) {
                if (!cbox1 && !cbox2 && !cbox3 && !cbox4) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one coupon');
                    bvalida = false;
                    return;
                }
                var grid03 = Ext.getCmp(prototype.id2 + '-gridCPN');
                var regs = grid03.getStore().getCount();
                for (var i = 0; i < regs; i++) {
                    if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '1') {
                        Stat1 = Ext.String.trim(grid03.getStore().getAt(i).get('A3654CURS1'));
                    }
                    if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '2') {
                        Stat2 = Ext.String.trim(grid03.getStore().getAt(i).get('A3654CURS1'));
                    }
                    if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '3') {
                        Stat3 = Ext.String.trim(grid03.getStore().getAt(i).get('A3654CURS1'));
                    }
                    if (Ext.String.trim(grid03.getStore().getAt(i).get('A3654CPN')) === '4') {
                        Stat4 = Ext.String.trim(grid03.getStore().getAt(i).get('A3654CURS1'));
                    }

                }
                if (cbox1 && Stat1 === 'RFND') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 1 is already REFUNDED');
                    bvalida = false;
                    return;
                }
                if (cbox1 && Stat1 === 'USED') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 1 is already USED');
                    bvalida = false;
                    return;
                }
                if (cbox1 && Stat1 === 'EXCH') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 1 is already EXCH');
                    bvalida = false;
                    return;
                }
                ///////
                if (cbox2 && Stat2 === 'RFND') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 2 is already REFUNDED');
                    bvalida = false;
                    return;
                }
                if (cbox2 && Stat2 === 'USED') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 2 is already USED');
                    bvalida = false;
                    return;
                }
                if (cbox2 && Stat2 === 'EXCH') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 2 is already EXCH');
                    bvalida = false;
                    return;
                }
                /////
                if (cbox3 && Stat3 === 'RFND') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 3 is already REFUNDED');
                    bvalida = false;
                    return;
                }
                if (cbox3 && Stat3 === 'USED') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 3 is already USED');
                    bvalida = false;
                    return;
                }
                if (cbox3 && Stat3 === 'EXCH') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 3 is already EXCH');
                    bvalida = false;
                    return;
                }
                ///

                if (cbox4 && Stat4 === 'RFND') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 4 is already REFUNDED');
                    bvalida = false;
                    return;
                }
                if (cbox4 && Stat4 === 'USED') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 4 is already USED');
                    bvalida = false;
                    return;
                }
                if (cbox4 && Stat4 === 'EXCH') {
                    Ext.Msg.alert('.: PRAXIS :.', 'The selected coupon 4 is already EXCH');
                    bvalida = false;
                    return;
                }
            }

            //Validar las FOP
            if (reg5 === 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter payment method');
                bvalida = false;
                return;
            } else {
                for (var p = 0; p < reg5; p++) {

                    if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653CFOP')) === '') {
                        Ext.Msg.alert('.: PRAXIS :.', 'You must enter payment method');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653CFOP')) === 'CA') {
                        if (gridPAYMENT.getStore().getAt(p).get('A3653TYCAR') !== '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, you not must enter the card type');
                            bvalida = false;
                            return;
                        }
                        if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653NTARJ')) !== '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, you not must enter the card number');
                            bvalida = false;
                            return;
                        }
                        if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653FEXP')) !== '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, younot  must enter the expiration date');
                            bvalida = false;
                            return;
                        }
                        if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653CAPL')) !== '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, you not must enter Approval Card');
                            bvalida = false;
                            return;
                        }
                        if (parseFloat(gridPAYMENT.getStore().getAt(p).get('A3653TOTAL')) === 0) {
                            Ext.Msg.alert('.: PRAXIS :.', 'Enter Net.');
                            bvalida = false;
                            return;
                        }
                        alert(parseFloat(gridPAYMENT.getStore().getAt(p).get('A3653TOTAL')));
                        if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653FLAG')) === 'A') {
                            vl_netofop = (vl_netofop + parseFloat(gridPAYMENT.getStore().getAt(p).get('A3653TOTAL')));
                        }

                    }
                    if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653CFOP')) === 'CC' || Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653CFOP')) === 'ET') {
                        
                        if (gridPAYMENT.getStore().getAt(p).get('A3653TYCAR') === '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card you must enter the card type');
                            bvalida = false;
                            return;
                        }
                        if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653NTARJ')) === '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card, you must enter the card number');
                            bvalida = false;
                            return;
                        }
                        if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653NTARJ')).length < 15) {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card, you must enter the card number');
                            bvalida = false;
                            return;
                        }
                        if (parseFloat(gridPAYMENT.getStore().getAt(p).get('A3653TOTAL')) === 0) {
                            Ext.Msg.alert('.: PRAXIS :.', 'Enter Net.');
                            bvalida = false;
                            return;
                        }
                        if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A3653FLAG')) === 'A') {
                            vl_netofop = (vl_netofop + parseFloat(gridPAYMENT.getStore().getAt(p).get('A3653TOTAL')));
                        }

                    }
                    



                }
            }
            vl_netofop = (totalam - vl_netofop);
            if (vl_netofop !== 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'the total fop must be equal to the total refund');
                bvalida = false;
                return;
            }
        }
        return bvalida;
    },
    onClickSave: function (btn) {
        var me = this;
        var checkApply = '';
        if (me.validaRequiredFields()) {
            rec = me.view.params.rec;
            var vl_pais = Ext.getCmp(prototype.id2 + '-txtCOUNTRY').getValue();
            global.Msg({
                msg: 'Insert Data?',
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {
                        if (Ext.getCmp(prototype.id2 + '-checkApplyBPO').getValue()) {
                            checkApply = 'Y';
                        }
                        if (Ext.getCmp(prototype.id2 + '-checkApplyrobot').getValue()) {
                            checkApply = 'N';
                        }
                        me.beanTMP.IN_FOLIO = Ext.String.trim(String(me.view.params.folio));
                        me.beanTMP.IN_TKT = Ext.String.trim(rec.get('A3648TKT'));
                        me.beanTMP.IN_CORRL = Ext.String.trim(rec.get('A3648CORRL'));
                        me.beanTMP.IN_PREME = Ext.String.trim(rec.get('A3648PREME'));
                        me.beanTMP.IN_SEQ = Ext.String.trim(rec.get('A3648SEQ'));
                        me.beanTMP.IN_COUNTRY = vl_pais;
                        me.beanTMP.IN_MDA = Ext.getCmp(prototype.id2 + '-txtmda').getValue();
                        me.beanTMP.IN_STATUS = Ext.getCmp(prototype.id2 + '-ComboStatus').getValue();
                        me.beanTMP.IN_TARIF = Ext.getCmp(prototype.id2 + '-txtTotalFareAm').getValue().replace(',', '');
                        me.beanTMP.IN_TTAX = Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').getValue().replace(',', '');
                        me.beanTMP.IN_TOTALRFND = Ext.getCmp(prototype.id2 + '-txtTotalram').getValue().replace(',', '');
                        me.beanTMP.IN_TOTALRFND = Ext.getCmp(prototype.id2 + '-txtTotalram').getValue().replace(',', '');
                        me.beanTMP.IN_ANIO = Ext.String.trim(rec.get('A3648ANIO'));
                        me.beanTMP.IN_MARCA = checkApply;
                        //me.beanTMP.IN_MARCA = Ext.getCmp(prototype.id2 + '-Combochangestatus').getValue();
                        var cbox1 = Ext.getCmp(prototype.id2 + '-txtCpn1').getValue();
                        var cbox2 = Ext.getCmp(prototype.id2 + '-txtCpn2').getValue();
                        var cbox3 = Ext.getCmp(prototype.id2 + '-txtCpn3').getValue();
                        var cbox4 = Ext.getCmp(prototype.id2 + '-txtCpn4').getValue();
                        if (cbox1) {
                            me.beanTMP.IN_CPN1 = '1';
                        } else {
                            me.beanTMP.IN_CPN1 = '';
                        }
                        if (cbox2) {
                            me.beanTMP.IN_CPN2 = '2';
                        } else {
                            me.beanTMP.IN_CPN2 = '';
                        }
                        if (cbox3) {
                            me.beanTMP.IN_CPN3 = '3';
                        } else {
                            me.beanTMP.IN_CPN3 = '';
                        }
                        if (cbox4) {
                            me.beanTMP.IN_CPN4 = '4';
                        } else {
                            me.beanTMP.IN_CPN4 = '';
                        }
                        var lstRazones = new Array();
                        var lstTaxes = new Array();
                        var lstFop = new Array();
                        for (var i = 0; i < Ext.getCmp(prototype.id2 + '-gridRazonesTkt').getStore().data.length; i++) {
                            var bean = Ext.getCmp(prototype.id2 + '-gridRazonesTkt').getStore().data.items[i].data;
                            lstRazones.push(bean);
                        }
                        for (var i = 0; i < Ext.getCmp(prototype.id2 + '-gridTaxes').getStore().data.length; i++) {
                            var bean = Ext.getCmp(prototype.id2 + '-gridTaxes').getStore().data.items[i].data;
                            lstTaxes.push(bean);
                        }

                        for (var i = 0; i < Ext.getCmp(prototype.id2 + '-gridPAYMENT').getStore().data.length; i++) {
                            var bean = Ext.getCmp(prototype.id2 + '-gridPAYMENT').getStore().data.items[i].data;
                            lstFop.push(bean);
                        }
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.id2 + '-win'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin02 + '/ProcesaManualRFNDTCKT/',
                            timeout: 60000000,
                            method: 'POST',
                            params: {beanString: JSON.stringify(me.beanTMP),
                                beanlstRazones: JSON.stringify(lstRazones),
                                beanlstTaxes: JSON.stringify(lstTaxes),
                                beanlstlstFop: JSON.stringify(lstFop)
                            },
                            success: function (response, options) {
                                mask.hide();
                                var res = Ext.JSON.decode(response.responseText);
                                //console.log(res.data);
                                var vp_icon = 0;
                                if (res.data === 'RECORD INSERTED') {
                                    vp_icon = 1;
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.id2 + '-win').close();
                                            Ext.getCmp(prototype.id01 + '-win').getController().onLoaDatosTicket();
                                        }


                                    }});
                            }
                        });
                    }

                }
            });
        }


    },
    OnColumnHistoRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var archivo = '';
        if (Ext.String.trim(value) !== '') {
            archivo = 'Download';
        }//'DetailBsplinkRefundQueryRFND'
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id2 + \'-win\').getController().onWinFileHistoViewerClick(' + rowIndex + ');">' + archivo + '</span>'
    },
    onWinFileHistoViewerClick: function (rowIndex) {
        var grid = Ext.getCmp(prototype.id2 + '-gridRazon');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var nmemo = '';
        if (rec.data.A2553TYPO === 'AM') {
            nmemo = Ext.getCmp(prototype.id2 + '-txtconxp').getValue();
        } else {
            nmemo = Ext.getCmp(prototype.id2 + '-nmemo').getValue();
        }
        var DisputeFileViewer = Ext.create('Ext.Praxis.view.salesaudit.QueryPostbilling.PostbillingFileViewer', {id: 'PostbillingFileViewer'});
        var controller = DisputeFileViewer.getController();
        controller.getFilesDirectory2(rec.data, nmemo, Ext.getCmp(prototype.id2 + '-country').getValue(''), this.urlWin01);
        DisputeFileViewer.show();
    },
    OnColumnAuditorRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var archivo = '';
        if (Ext.String.trim(value) !== '') {
            archivo = 'Download';
        }//'DetailBsplinkRefundQueryRFND'
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp(prototype.id2 + \'-win\').getController().onWinFileViewerClick(' + rowIndex + ');">' + archivo + '</span>'
    },
    onWinFileViewerClick: function (rowIndex) {
        var grid = Ext.getCmp(prototype.id2 + '-gridDispuRazon');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var nmemo = '';
        if (rec.data.A3537TYPE === 'AM') {
            if (Ext.getCmp(prototype.id2 + '-txtconxp').getValue() !== '') {
                nmemo = Ext.getCmp(prototype.id2 + '-txtconxp').getValue();
            } else {
                nmemo = Ext.getCmp(prototype.id2 + '-txtpreme').getValue();
            }
        } else {
            nmemo = Ext.getCmp(prototype.id2 + '-nmemo').getValue();
        }
        var DisputeFileViewer = Ext.create('Ext.Praxis.view.salesaudit.QueryPostbilling.PostbillingFileViewer', {id: 'PostbillingFileViewer'});
        var controller = DisputeFileViewer.getController();
        controller.getFilesDirectory(rec.data, nmemo, Ext.getCmp(prototype.id2 + '-country').getValue(''), this.urlWin01);
        DisputeFileViewer.show();
    },
    onWinFormRazonesClick: function () {
        var me = this;
        rec = me.view.params.rec;
        var win = new Ext.Praxis.view.salesaudit.RFNDPending.RFNDFormRazones({
            params: {
                vl_pais: Ext.getCmp(prototype.id01 + '-txtCOUNTRY').getValue(),
                params: rec.data,
                url01: this.urlWin02,
                type: '2'
            }
        });
        win.show();
    },
    onTotaFare: function (o, e, eOpts) {
        if (o.getValue() === '') {
            o.setValue('0.00');
        }
        if (Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').getValue() === '') {
            Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').setValue('0.00');
        }
        var tarifaAm = o.getValue().replace(',', '');
        var TotalTaxAm = Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').getValue().replace(',', '');
        var total = (parseFloat(tarifaAm) + parseFloat(TotalTaxAm));
        Ext.getCmp(prototype.id2 + '-txtTotalram').setValue(Ext.util.Format.number((total), '0,000.00'));
        Ext.getCmp(prototype.id2 + '-txtTotalFareAm').setValue(Ext.util.Format.number(tarifaAm, '0,000.00'));
        Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').setValue(Ext.util.Format.number(TotalTaxAm, '0,000.00'));

    },
    onSearchkey: function (f, e) {
        //alert(e.getKey());
        if (e.getKey() === e.ENTER || e.getKey() === e.TAB) {

            if (Ext.getCmp(prototype.id2 + '-txtTotalFareAm').getValue() === '') {
                Ext.getCmp(prototype.id2 + '-txtTotalFareAm').setValue('0.00');
            }
            if (Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').getValue() === '') {
                Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').setValue('0.00');
            }
            var tarifaAm = Ext.getCmp(prototype.id2 + '-txtTotalFareAm').getValue().replace(',', '');
            var TotalTaxAm = Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').getValue().replace(',', '');
            var total = (parseFloat(tarifaAm) + parseFloat(TotalTaxAm));
            Ext.getCmp(prototype.id2 + '-txtTotalram').setValue(Ext.util.Format.number((total), '0,000.00'));
            Ext.getCmp(prototype.id2 + '-txtTotalFareAm').setValue(Ext.util.Format.number(tarifaAm, '0,000.00'));
            Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').setValue(Ext.util.Format.number(TotalTaxAm, '0,000.00'));
        }

    },

    onSumaTaxGrid: function () {
        var me = this;
        var grid01 = Ext.getCmp(prototype.id2 + '-gridTaxes');
        var regs = grid01.getStore().getCount();
        var Total = 0;
        var monto = 0;
        for (var i = 0; i < regs; i++) {
            monto = grid01.getStore().getAt(i).get('A3652TXDIF');
            Total += parseFloat(monto);
        }
        Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').setValue(Ext.util.Format.number(Total, '0,000.00'));
        me.onTotalRFND();
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTotalRFND: function () {
        if (Ext.getCmp(prototype.id2 + '-txtTotalFareAm').getValue() === '') {
            Ext.getCmp(prototype.id2 + '-txtTotalFareAm').setValue('0.00');
        }
        if (Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').getValue() === '') {
            Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').setValue('0.00');
        }
        var tarifaAm = Ext.getCmp(prototype.id2 + '-txtTotalFareAm').getValue().replace(',', '');
        var TotalTaxAm = Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').getValue().replace(',', '');
        var total = (parseFloat(tarifaAm) + parseFloat(TotalTaxAm));
        Ext.getCmp(prototype.id2 + '-txtTotalram').setValue(Ext.util.Format.number((total), '0,000.00'));
        Ext.getCmp(prototype.id2 + '-txtTotalFareAm').setValue(Ext.util.Format.number(tarifaAm, '0,000.00'));
        Ext.getCmp(prototype.id2 + '-txtTotalTaxAm').setValue(Ext.util.Format.number(TotalTaxAm, '0,000.00'));
    },
    OnListHistoryRenderer: function () {
        var me = this;
        var win = new Ext.Praxis.view.salesaudit.RFNDQuery.DetailTicketHistory({
            params: {
                rec: me.beanHistorical
            }
        });
        win.show();
    }




});

