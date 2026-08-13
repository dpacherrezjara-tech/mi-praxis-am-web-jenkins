/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('Ext.Praxis.controller.salesaudit.RFNDAssociatedARCRFNDForm.ARCRFNDAssociatedTicketFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ARCRFNDAssociatedTicketFormController',
    beanINI: {},
    beanIniTem: {},
    lsta_Documents: 0,
    totalcpn: 0,
    totalcpnuse: 0,
    beanTMP: {},
    urlWin01: CONTEXTPATH + '/RFNDAssociatedARCRFNDForm',
    init: function (view) {
        var me = this;
        //this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        //var txtadd = Ext.getCmp( prototype.idARCDetailTicket + '-txtadd');
        var txtCpn1 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn1');
        var txtCpn2 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn2');
        var txtCpn3 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn3');
        var txtCpn4 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn4');
        var CbtStatus = Ext.getCmp(prototype.idARCDetailTicket + '-ComboStatus');
        var save = Ext.getCmp(prototype.idARCDetailTicket + '-btn-save');
        switch (String(this.view.params.action)) {
            case 'FORMQUERYRFND':
                // txtadd.hide();
                txtCpn1.disable();
                txtCpn2.disable();
                txtCpn3.disable();
                txtCpn4.disable();
                CbtStatus.hide();
                save.hide();
                Ext.getCmp(prototype.idARCDetailTicket + '-CmbConto').setReadOnly(true);
                Ext.getCmp(prototype.idARCDetailTicket + '-checkApplyBPO').setReadOnly(true);
                Ext.getCmp(prototype.idARCDetailTicket + '-checkApplyrobot').setReadOnly(true);
                Ext.getCmp(prototype.idARCDetailTicket + '-CmbTRFND').setReadOnly(true);
                Ext.getCmp(prototype.idARCDetailTicket + '-txtPenalty').setReadOnly(true);
                //Ext.getCmp( prototype.idARCDetailTicket + '-win').setHeight(Ext.getCmp( prototype.idARCDetailTicket + '-win').getHeight() - 200);
                break;
            case 'FORMPENDIRFND':
                Ext.getCmp(prototype.idARCDetailTicket + '-checkApplyBPO').setReadOnly(false);
                Ext.getCmp(prototype.idARCDetailTicket + '-checkApplyrobot').setReadOnly(false);
                if (String(this.view.params.qtytkt) > 1) {
                    //txtadd.show();
                    CbtStatus.show();
                }

                //txtadd.show();
                txtCpn1.enable();
                txtCpn2.enable();
                txtCpn3.enable();
                txtCpn4.enable();
                Ext.getCmp(prototype.idARCDetailTicket + '-CmbConto').setReadOnly(false);
                Ext.getCmp(prototype.idARCDetailTicket + '-CmbTRFND').setReadOnly(false);
                save.show();
                break;

        }
        this.setStores();
        this.setStoresFilters();
        this.onLoadDataGrid();
        this.onLoadDataQuery();


    },
    onLoadDataGrid: function () {
        Ext.getCmp(prototype.idARCDetailTicket + '-gridTaxesADD').show();
        var me = this;
        rec = me.view.params.rec;
        Ext.getCmp(prototype.idARCDetailTicket + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: me.urlWin01 + '/SearchRFNDetailTCKT',
            method: 'POST',
            timeout: '300000',
            params: {
                IN_PREME: rec.get('A4363PREME'),
                IN_ANIO: rec.get('A4363ANIO'),
                IN_CIA: Ext.String.trim(rec.get('A4363CIA')),
                IN_FORMA: Ext.String.trim(rec.get('A4363FORMA')),
                IN_SERIE: Ext.String.trim(rec.get('A4363SERIE')),
                IN_SEQ: Ext.String.trim(rec.get('A4363SEQ')),
                IN_CORRL: Ext.String.trim(rec.get('A4363CORRL'))
            },
            success: function (response, options) {
                Ext.getCmp(prototype.idARCDetailTicket + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);

                Ext.getCmp(prototype.idARCDetailTicket + '-gridCPN').getStore().removeAll();
                Ext.getCmp(prototype.idARCDetailTicket + '-gridCPN').getStore().loadData(res.lsta_COUPNS);

                Ext.getCmp(prototype.idARCDetailTicket + '-gridPAYMENTQUERY').getStore().removeAll();
                Ext.getCmp(prototype.idARCDetailTicket + '-gridRazonesTkt').getStore().removeAll();
                Ext.getCmp(prototype.idARCDetailTicket + '-gridRazonesTkt').getStore().loadData(res.lst_RAZON);
                //usos cupon
                Ext.getCmp(prototype.idARCDetailTicket + '-gridDataStatus').getStore().removeAll();
                Ext.getCmp(prototype.idARCDetailTicket + '-gridDataStatus').getStore().loadData(res.lsta_USOS);
                if (me.view.params.action === 'FORMQUERYRFND') {
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridPAYMENT').hide();
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridPAYMENTQUERY').show();
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridPAYMENTQUERY').getStore().loadData(res.lsta_Card);
                    //taxes
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridTaxes').hide();
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridListTaxes').show();
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridListTaxes').getStore().removeAll();
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridListTaxes').getStore().loadData(res.lsta_TAXAUDI);
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridListTaxesXML').getStore().removeAll();
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridListTaxesXML').getStore().loadData(res.lsta_TAXES);
                } else {
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridPAYMENTQUERY').hide();
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridPAYMENT').show();
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridPAYMENT').getStore().loadData(res.lsta_Card);
                    //taxes
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridListTaxes').hide();
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridTaxes').show();
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridTaxes').getStore().removeAll();
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridTaxes').getStore().loadData(res.lsta_TAXAUDI);
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridListTaxesXML').getStore().removeAll();
                    Ext.getCmp(prototype.idARCDetailTicket + '-gridListTaxesXML').getStore().loadData(res.lsta_TAXES);

                }
                me.lsta_Documents = res.lsta_DOCUMENTS.length;

                switch (String(me.view.params.action)) {
                    case 'FORMQUERYRFND':
                        Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn1').hide();
                        Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn2').hide();
                        Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn3').hide();
                        Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn4').hide();
                        if (Ext.String.trim(rec.get('A4363CPN1D')) !== '') {
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn1').show();
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn1').setValue(true);
                        }
                        if (Ext.String.trim(rec.get('A4363CPN2D')) !== '') {
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn2').show();
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn2').setValue(true);
                        }
                        if (Ext.String.trim(rec.get('A4363CPN3D')) !== '') {
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn3').show();
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn3').setValue(true);
                        }
                        if (Ext.String.trim(rec.get('A4363CPN4D')) !== '') {
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn4').show();
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn4').setValue(true);
                        }
                        break;
                    case 'FORMPENDIRFND':

                        if (res.lsta_COUPNS.length > 0) {
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn1').hide();
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn2').hide();
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn3').hide();
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn4').hide();

                            for (var i = 0; i < res.lsta_COUPNS.length; i++) {
                                if (Ext.String.trim(res.lsta_COUPNS[i].A4366CPN) === '1') {
                                    Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn1').show();
                                    me.totalcpn += 1;
                                }
                                if (Ext.String.trim(res.lsta_COUPNS[i].A4366CPN) === '2') {
                                    Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn2').show();
                                    me.totalcpn += 1;
                                }
                                if (Ext.String.trim(res.lsta_COUPNS[i].A4366CPN) === '3') {
                                    Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn3').show();
                                    me.totalcpn += 1;
                                }
                                if (Ext.String.trim(res.lsta_COUPNS[i].A4366CPN) === '4') {
                                    Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn4').show();
                                    me.totalcpn += 1;
                                }
                            }
                        } else {
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn1').show();
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn2').show();
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn3').show();
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn4').show();
                        }
                        //
                        for (var i = 0; i < res.lsta_COUPNS.length; i++) {
                            if (Ext.String.trim(res.lsta_COUPNS[i].A4366CPN) === '1') {
                                if (Ext.String.trim(res.lsta_COUPNS[i].A4366CURS1) === 'RFND' || Ext.String.trim(res.lsta_COUPNS[i].A4366CURS1) === 'USED') {
                                    Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn1').hide();
                                    me.totalcpn = (me.totalcpn - 1);
                                }
                            }
                            if (Ext.String.trim(res.lsta_COUPNS[i].A4366CPN) === '2') {
                                if (Ext.String.trim(res.lsta_COUPNS[i].A4366CURS1) === 'RFND' || Ext.String.trim(res.lsta_COUPNS[i].A4366CURS1) === 'USED') {
                                    Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn2').hide();
                                    me.totalcpn = (me.totalcpn - 1);
                                }
                            }
                            if (Ext.String.trim(res.lsta_COUPNS[i].A4366CPN) === '3') {
                                if (Ext.String.trim(res.lsta_COUPNS[i].A4366CURS1) === 'RFND' || Ext.String.trim(res.lsta_COUPNS[i].A4366CURS1) === 'USED') {
                                    Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn3').hide();
                                    me.totalcpn = (me.totalcpn - 1);
                                }
                            }
                            if (Ext.String.trim(res.lsta_COUPNS[i].A4366CPN) === '4') {
                                if (Ext.String.trim(res.lsta_COUPNS[i].A4366CURS1) === 'RFND' || Ext.String.trim(res.lsta_COUPNS[i].A4366CURS1) === 'USED') {
                                    Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn4').hide();
                                    me.totalcpn = (me.totalcpn - 1);
                                }
                            }
                        }
                        /* if (res.lsta_COUPNS.length > 0) {
                         if (me.totalcpn === 0) {
                         Ext.getCmp( prototype.idARCDetailTicket + '-txtusoCpn').show();
                         }
                         } else {
                         Ext.getCmp( prototype.idARCDetailTicket + '-txtusoCpn').hide();
                         }*/

                        ///para habilitar los cupones
                        var tidoc = Ext.getCmp(prototype.idARCDetailTicket + '-txttidoc').getValue();
                        if (tidoc !== '') {
                            if (tidoc.substring(0, 3) === 'EMD') {
                                Ext.getCmp(prototype.idARCDetailTicket + '-txtShowcoupons').show();
                                //
                                Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn5').hide();
                                Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn6').hide();
                                Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn7').hide();
                                Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn8').hide();
                            }
                        } else {
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtShowcoupons').hide();
                            //
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn5').show();
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn6').show();
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn7').show();
                            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn8').show();
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
        var gridRazonesTkt = Ext.getCmp(prototype.idARCDetailTicket + '-gridRazonesTkt');
        if (me.view.params.action === 'FORMQUERYRFND') {
            gridRazonesTkt.columns[2].setVisible(false);
            gridRazonesTkt.on('beforeedit', function (event) {
                return false;
            }, gridRazonesTkt);
            Ext.getCmp(prototype.idARCDetailTicket + '-txtRazonesadd').hide();
            Ext.getCmp(prototype.idARCDetailTicket + '-txtShowcoupons').hide();
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalFareAm').setReadOnly(true);
            Ext.getCmp(prototype.idARCDetailTicket + '-txtEqmda').setReadOnly(true);
            Ext.getCmp(prototype.idARCDetailTicket + '-txtmda').setReadOnly(true);
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalEqFareAm').setReadOnly(true);
            Ext.getCmp(prototype.idARCDetailTicket + '-txtCorreo').setReadOnly(true);

        } else {
            Ext.getCmp(prototype.idARCDetailTicket + '-txtRazonesadd').show();
            Ext.getCmp(prototype.idARCDetailTicket + '-txtShowcoupons').show();
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalFareAm').setReadOnly(false);
            Ext.getCmp(prototype.idARCDetailTicket + '-txtEqmda').setReadOnly(false);
            Ext.getCmp(prototype.idARCDetailTicket + '-txtmda').setReadOnly(false);
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalEqFareAm').setReadOnly(false);
            Ext.getCmp(prototype.idARCDetailTicket + '-txtCorreo').setReadOnly(false);
        }

        Ext.getCmp(prototype.idARCDetailTicket + '-txtiata').setValue(rec.get('A4361IATA'));
        Ext.getCmp(prototype.idARCDetailTicket + '-txtiataIss').setValue(rec.get('A4363SIATA'));
        Ext.getCmp(prototype.idARCDetailTicket + '-txtfolio').setValue(rec.get('A4363FOLIO'));
        Ext.getCmp(prototype.idARCDetailTicket + '-txttkt').setValue(rec.get('A4363TICKET'));
        Ext.getCmp(prototype.idARCDetailTicket + '-txttidoc').setValue(rec.get('A4363STDOC'));
        Ext.getCmp(prototype.idARCDetailTicket + '-txtcpn').setValue(rec.get('A4363CUPON'));
        Ext.getCmp(prototype.idARCDetailTicket + '-txttrnc').setValue(rec.get('A4363STRCU'));
        Ext.getCmp(prototype.idARCDetailTicket + '-txtIssdate').setValue(rec.get('A4363XFSAL'));
        Ext.getCmp(prototype.idARCDetailTicket + '-txtpnr').setValue(rec.get('A4363XPNR'));
        Ext.getCmp(prototype.idARCDetailTicket + '-CmbConto').setValue(Ext.String.trim(rec.get('A4363CONJT')));
        Ext.getCmp(prototype.idARCDetailTicket + '-CmbTRFND').setValue(Ext.String.trim(rec.get('A4363TRFND')));
        Ext.getCmp(prototype.idARCDetailTicket + '-txtAplicable').setValue(Ext.String.trim(rec.get('A3401STATU')));
        Ext.getCmp(prototype.idARCDetailTicket + '-txtRazon').setValue(Ext.String.trim(rec.get('A3401RAAG')));
        Ext.getCmp(prototype.idARCDetailTicket + '-txtCorreo').setValue(Ext.String.trim(rec.get('A4363EMAIL')));
        Ext.getCmp(prototype.idARCDetailTicket + '-txtEndorse').setValue(rec.get('A4363XENDR'));
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.idARCDetailTicket + '-txtEndorse',
            html: '' + Ext.String.trim(rec.get('A4363XENDR'))
        });

        Ext.getCmp(prototype.idARCDetailTicket + '-txtReqReason').setValue(rec.get('A4362ERROR'));
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.idARCDetailTicket + '-txtReqReason',
            html: '' + Ext.String.trim(rec.get('A4362ERROR'))
        });
        Ext.getCmp(prototype.idARCDetailTicket + '-txtRemarks').setValue(rec.get('A4363RAAG'));
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.idARCDetailTicket + '-txtRemarks',
            html: '' + Ext.String.trim(rec.get('A4363RAAG'))
        });
        Ext.getCmp(prototype.idARCDetailTicket + '-txtpax').setValue(rec.get('A4363SPAX'));
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.idARCDetailTicket + '-txtpax',
            html: '' + Ext.String.trim(rec.get('A4363SPAX'))
        });

        Ext.getCmp(prototype.idARCDetailTicket + '-txtrefundable').setValue(rec.get('A4363XRDBE'));
        Ext.getCmp(prototype.idARCDetailTicket + '-txtRfndFee').setValue(rec.get('A4363XFEE'));

        Ext.getCmp(prototype.idARCDetailTicket + '-txtiata').setValue(rec.get('A4363SIATA'));
        var vl_A4363FLAG = '';
        switch (Ext.String.trim(rec.get('A4363FLAG'))) {
            case 'E':
                vl_A4363FLAG = 'ERROR PROCESS';
                break;
            case 'A':
                vl_A4363FLAG = 'IN PROCESS';
                break;
            case 'R':
                vl_A4363FLAG = 'REJECTED';
                break;
            case 'F':
                vl_A4363FLAG = 'AUTHORISED';
                break;
            case 'C':
                vl_A4363FLAG = 'REACTIVATION';
                break;
            case 'B':
                vl_A4363FLAG = 'GIVE USE IN PRAXIS';
                break;
            case 'Y':
                vl_A4363FLAG = 'PENDING';
                break;
        }
        Ext.getCmp(prototype.idARCDetailTicket + '-txtStatus').setValue(rec.get('A4363STATO'));
        Ext.getCmp(prototype.idARCDetailTicket + '-txtFlag').setValue(vl_A4363FLAG);
        if ((Ext.String.trim(rec.get('A4363FLAG')) === 'F' || Ext.String.trim(rec.get('A4363FLAG')) === 'R' || Ext.String.trim(rec.get('A4363FLAG')) === 'B') && Ext.String.trim(rec.get('A3647REGAS')) === 'AUTOPR') {
            Ext.getCmp(prototype.idARCDetailTicket + '-btn-save').hide();
        }
        if (Ext.String.trim(rec.get('A4363FLAG')) === 'F' || Ext.String.trim(rec.get('A4363FLAG')) === 'B') {
            if (rec.get('A4363MARCA') === 'Y') {
                Ext.getCmp(prototype.idARCDetailTicket + '-checkApplyBPO').setValue(true);
                Ext.getCmp(prototype.idARCDetailTicket + '-checkApplyrobot').setValue(false);
            }
            if (rec.get('A4363MARCA') === 'N') {
                Ext.getCmp(prototype.idARCDetailTicket + '-checkApplyBPO').setValue(false);
                Ext.getCmp(prototype.idARCDetailTicket + '-checkApplyrobot').setValue(true);
            }
        }

        Ext.getCmp(prototype.idARCDetailTicket + '-txtFareCal').setValue(rec.get('A4363XFARC'));
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: prototype.idARCDetailTicket + '-txtFareCal',
            html: '' + Ext.String.trim(rec.get('A4363XFARC'))
        });
        // suma
        //fare 
        Ext.getCmp(prototype.idARCDetailTicket + '-txtFare').setValue(Ext.util.Format.number(rec.get('A4363STARF'), '0,000.00'));
        Ext.getCmp(prototype.idARCDetailTicket + '-txtFareXml').setValue(Ext.util.Format.number(rec.get('A4363XTARF'), '0,000.00'));
        //fare  equi
        Ext.getCmp(prototype.idARCDetailTicket + '-txtFareEq').setValue(Ext.util.Format.number(rec.get('A4363STARQ'), '0,000.00'));
        Ext.getCmp(prototype.idARCDetailTicket + '-txtFareEqXml').setValue(Ext.util.Format.number(rec.get('A4363XTARQ'), '0,000.00'));
        //tax
        Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTax').setValue(Ext.util.Format.number(rec.get('A4363STTAX'), '0,000.00'));
        Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxXml').setValue(Ext.util.Format.number(rec.get('A4363XTTAX'), '0,000.00'));
        //comi
        Ext.getCmp(prototype.idARCDetailTicket + '-txtCommission').setValue(Ext.util.Format.number(rec.get('A4363SCOMI'), '0,000.00'));
        Ext.getCmp(prototype.idARCDetailTicket + '-txtCommissionXml').setValue(Ext.util.Format.number(rec.get('A4363XCOMI'), '0,000.00'));
        //penalidad
        Ext.getCmp(prototype.idARCDetailTicket + '-txtPenaltyXML').setValue(Ext.util.Format.number(rec.get('A4363PENCT'), '0,000.00'));
        Ext.getCmp(prototype.idARCDetailTicket + '-txtPenalty').setValue(Ext.util.Format.number(rec.get('A4363PENAD'), '0,000.00'));
        // total
        Ext.getCmp(prototype.idARCDetailTicket + '-txtTotal').setValue(Ext.util.Format.number(rec.get('A4363STOTL'), '0,000.00'));
        Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalXml').setValue(Ext.util.Format.number(rec.get('A4363XTOTL'), '0,000.00'));
        if (Ext.String.trim(rec.get('A4363FLAG')) === 'F' || Ext.String.trim(rec.get('A4363FLAG')) === 'R' || Ext.String.trim(rec.get('A4363FLAG')) === 'B') {
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalFareAm').setValue(rec.get('A4363TARID'));
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalEqFareAm').setValue(rec.get('A4363STAQD'));
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').setValue(Ext.util.Format.number(rec.get('A4363TTAXD'), '0,000.00'));
            Ext.getCmp(prototype.idARCDetailTicket + '-txtCommissionAm').setValue(Ext.util.Format.number(rec.get('A4363COMID'), '0,000.00'));
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalram').setValue(Ext.util.Format.number(rec.get('A4363TOTAD'), '0,000.00'));
            Ext.getCmp(prototype.idARCDetailTicket + '-txtEqmda').setValue(rec.get('A4363MDAQD'));
            Ext.getCmp(prototype.idARCDetailTicket + '-txtmda').setValue(rec.get('A4363MDAD'));
        } else {
            var VL_A4363STARF = 0;
            var VL_A4363XTARQ = 0;
            var VL_A4363STTAX = 0;
            var VL_A4363SCOMI = 0;
            var VL_A4363STOTL = 0;
            var VL_A4363XMDA = '';
            var VL_A4363XMDAQ = '';
            //
            if (rec.get('A4363STARF') > 0) {
                VL_A4363STARF = rec.get('A4363STARF');
            } else {
                VL_A4363STARF = rec.get('A4363XTARF');
            }
            if (rec.get('A4363STARQ') > 0) {
                VL_A4363XTARQ = rec.get('A4363STARQ');
            } else {
                VL_A4363XTARQ = rec.get('A4363XTARQ');
            }
            if (rec.get('A4363STTAX') > 0) {
                VL_A4363STTAX = rec.get('A4363STTAX');
            } else {
                VL_A4363STTAX = rec.get('A4363XTTAX');
            }
            if (rec.get('A4363STOTL') > 0) {
                // VL_A4363XMDA = rec.get('A4363SMDA');
                // VL_A4363XMDAQ = rec.get('A4363SMDAQ');
                VL_A4363STOTL = rec.get('A4363STOTL');
            } else {
                // VL_A4363XMDA = rec.get('A4363XMDA');
                // VL_A4363XMDAQ = rec.get('A4363XMDAQ');
                VL_A4363STOTL = rec.get('A4363XTOTL');
            }
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalFareAm').setValue(VL_A4363STARF);
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalEqFareAm').setValue(VL_A4363XTARQ);
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').setValue(Ext.util.Format.number(VL_A4363STTAX, '0,000.00'));
            //Ext.getCmp( prototype.idARCDetailTicket + '-txtCommissionAm').setValue(Ext.util.Format.number(rec.get('A4363SCOMI'), '0,000.00'));
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalram').setValue(Ext.util.Format.number(VL_A4363STOTL, '0,000.00'));
            Ext.getCmp(prototype.idARCDetailTicket + '-txtEqmda').setValue(rec.get('A4363MDAQD'));
            Ext.getCmp(prototype.idARCDetailTicket + '-txtmda').setValue(rec.get('A4363MDAD'));
            //Ext.getCmp( prototype.idARCDetailTicket + '-txtEqmda').setValue(VL_A4363XMDAQ);
            //Ext.getCmp( prototype.idARCDetailTicket + '-txtmda').setValue(VL_A4363XMDA);

        }




    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.idARCDetailTicket + '-gridCPN');
        var grid02 = Ext.getCmp(prototype.idARCDetailTicket + '-gridPAYMENT');
        var grid03 = Ext.getCmp(prototype.idARCDetailTicket + '-gridListTaxes');
        var grid04 = Ext.getCmp(prototype.idARCDetailTicket + '-gridRazonesTkt');
        var grid05 = Ext.getCmp(prototype.idARCDetailTicket + '-gridTaxes');
        var grid06 = Ext.getCmp(prototype.idARCDetailTicket + '-gridPAYMENTQUERY');
        var grid07 = Ext.getCmp(prototype.idARCDetailTicket + '-gridDataStatus');
        var grid08 = Ext.getCmp(prototype.idARCDetailTicket + '-gridListTaxesXML');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idARCDetailTicket + '-store-grid01'
        });
        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.idARCDetailTicket + '-store-grid02'
        });
        var store03 = Ext.create('Ext.data.Store', {
            storeId: prototype.idARCDetailTicket + '-store-grid03'
        });
        var store04 = Ext.create('Ext.data.Store', {
            storeId: prototype.idARCDetailTicket + '-store-grid04'
        });
        var store05 = Ext.create('Ext.data.Store', {
            storeId: prototype.idARCDetailTicket + '-store-grid05'
        });
        var store06 = Ext.create('Ext.data.Store', {
            storeId: prototype.idARCDetailTicket + '-store-grid06'
        });
        var store07 = Ext.create('Ext.data.Store', {
            storeId: prototype.idARCDetailTicket + '-store-grid07'
        });
        var store08 = Ext.create('Ext.data.Store', {
            storeId: prototype.idARCDetailTicket + '-store-grid08'
        });

        grid01.setStore(store01);
        grid02.setStore(store02);
        grid03.setStore(store03);
        grid04.setStore(store04);
        grid05.setStore(store05);
        grid06.setStore(store06);
        grid07.setStore(store07);
        grid08.setStore(store08);

    },
    onAddFopClick: function (rec) {
        var me = this;
        var txtmdatax = '';
        var txtmda = (Ext.getCmp(prototype.idARCDetailTicket + '-txtmda').getValue().trim());
        var txtEqmda = (Ext.getCmp(prototype.idARCDetailTicket + '-txtEqmda').getValue().trim());
        if (txtEqmda !== '') {
            txtmdatax = txtEqmda;
        } else {
            txtmdatax = txtmda;
        }
        if (txtmdatax === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must enter the currency');
            return;
        }
        rec = me.view.params.rec;

        var grid01 = Ext.getCmp(prototype.idARCDetailTicket + '-gridPAYMENT');
        var beanDatos = {};
        beanDatos.A4365PREME = rec.get('A4363PREME');
        beanDatos.A4365ANIO = rec.get('A4363ANIO');
        beanDatos.A4365CIA = Ext.String.trim(rec.get('A4363CIA'));
        beanDatos.A4365FORMA = Ext.String.trim(rec.get('A4363FORMA'));
        beanDatos.A4365SERIE = Ext.String.trim(rec.get('A4363SERIE'));
        beanDatos.A4365SEQ = Ext.String.trim(rec.get('A4363SEQ'));
        beanDatos.A4365CORRL = '';
        beanDatos.A4365CFOP = '';
        beanDatos.A4365TYCAR = '';
        beanDatos.A4365NTARJ = '';
        beanDatos.A4365FEXP = '';
        beanDatos.A4365CAPL = '';
        beanDatos.A4365TOTAL = 0;
        beanDatos.A4365TYPE = 'AE';
        grid01.getStore().add(beanDatos);
    },
    OnAddTaxRenderer: function (rec) {
        var me = this;
        var txtmdatax = '';
        var txtmda = (Ext.getCmp(prototype.idARCDetailTicket + '-txtmda').getValue().trim());
        var txtEqmda = Ext.getCmp(prototype.idARCDetailTicket + '-txtEqmda').getValue().trim();
        if (txtEqmda !== '') {
            txtmdatax = txtEqmda;
        } else {
            txtmdatax = txtmda;
        }
        if (txtmdatax === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must enter the currency');
            return;
        }
        rec = me.view.params.rec;

        var grid01 = Ext.getCmp(prototype.idARCDetailTicket + '-gridTaxes');
        var beanDatos = {};
        beanDatos.A4364PREME = rec.get('A4363PREME');
        beanDatos.A4364ANIO = rec.get('A4363ANIO');
        beanDatos.A4364CIA = Ext.String.trim(rec.get('A4363CIA'));
        beanDatos.A4364FORMA = Ext.String.trim(rec.get('A4363FORMA'));
        beanDatos.A4364SERIE = Ext.String.trim(rec.get('A4363SERIE'));
        beanDatos.A4364SEQ = Ext.String.trim(rec.get('A4363SEQ'));
        beanDatos.A4364CDTAX = '';
        beanDatos.A4364CORRL = '';
        beanDatos.A4364TXMIA = 0;
        beanDatos.A4364TXAGE = 0;
        beanDatos.A4364TXDIF = 0;
        beanDatos.A4364APFC = '';
        beanDatos.A4364MONED = txtmdatax;
        grid01.getStore().add(beanDatos);
        me.onSumaTaxGrid();
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

        Ext.getCmp(prototype.idARCDetailTicket + '-win').mask('Please Wait....');


        /* cargar data*/
        Ext.Ajax.request({
            url: this.urlWin01 + '/SearchPostbillingDetail/',
            method: 'POST',
            timeout: '300000',
            params: me.beanINI,
            success: function (response, options) {
                Ext.getCmp(prototype.idARCDetailTicket + '-win').unmask();
                var res = Ext.decode(response.responseText);
                Ext.getCmp(prototype.idARCDetailTicket + '-gridRazon').getStore().removeAll();
                Ext.getCmp(prototype.idARCDetailTicket + '-gridRazon').getStore().loadData(res.lst_DispuHisto);

                Ext.getCmp(prototype.idARCDetailTicket + '-gridTKT').getStore().removeAll();
                Ext.getCmp(prototype.idARCDetailTicket + '-gridTKT').getStore().loadData(res.lst_Tkts);

                Ext.getCmp(prototype.idARCDetailTicket + '-gridDispuRazon').getStore().removeAll();
                Ext.getCmp(prototype.idARCDetailTicket + '-gridDispuRazon').getStore().loadData(res.lst_DispuPostbi);
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
        var ComboEstatus = Ext.getCmp(prototype.idARCDetailTicket + '-ComboStatus');
        var CmbConto = Ext.getCmp(prototype.idARCDetailTicket + '-CmbConto');
        var CmbTRFND = Ext.getCmp(prototype.idARCDetailTicket + '-CmbTRFND');
        ComboEstatus.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "R", "name": "REJECT"},
                {"code": "F", "name": "AUTHORISED"}
                //{"code": "C", "name": "REACTIVATION"}
            ]
        }));
        CmbConto.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "I", "name": "START"},
                {"code": "C", "name": "CONTINUATION"}
            ]
        }));
        CmbTRFND.bindStore(Ext.create('Ext.data.Store', {
            data: [
                {"code": "", "name": "SELECT"},
                {"code": "P", "name": "PARTIAL"},
                {"code": "T", "name": "TOTAL"}
            ]
        }));

    },
    onCmbStatusAfterRender: function (obj) {
        obj.setValue('');
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
                    if (Ext.String.trim(rec.data.A4365CORRL) !== '') {
                        paramsGuardarTAX.IN_OPTION = "3";
                        paramsGuardarTAX.A4363CCUST = Ext.String.trim(rec.data.A4365CCUST);
                        paramsGuardarTAX.A4363PREME = Ext.String.trim(rec.data.A4365PREME);
                        paramsGuardarTAX.A4363ANIO = Ext.String.trim(rec.data.A4365ANIO);
                        paramsGuardarTAX.A4363CIA = Ext.String.trim(rec.data.A4365CIA);
                        paramsGuardarTAX.A4363FORMA = Ext.String.trim(rec.data.A4365FORMA);
                        paramsGuardarTAX.A4363SERIE = Ext.String.trim(rec.data.A4365SERIE);
                        paramsGuardarTAX.A4363SEQ = Ext.String.trim(rec.data.A4365SEQ);
                        paramsGuardarTAX.A4363CORRL = Ext.String.trim(rec.data.A4365CORRL);

                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idARCDetailTicket + '-form'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin01 + '/ProcesaDeleteManual/',
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
                    if (Ext.String.trim(rec.data.A4364CORRL) !== '') {
                        paramsGuardarTAX.IN_OPTION = "1";
                        paramsGuardarTAX.A4363CIA = Ext.String.trim(rec.data.A4364CIA);
                        paramsGuardarTAX.A4363FORMA = Ext.String.trim(rec.data.A4364FORMA);
                        paramsGuardarTAX.A4363SERIE = Ext.String.trim(rec.data.A4364SERIE);
                        paramsGuardarTAX.A4363SEQ = Ext.String.trim(rec.data.A4364SEQ);
                        paramsGuardarTAX.A4363CORRL = Ext.String.trim(rec.data.A4364CORRL);
                        paramsGuardarTAX.A4363PREME = Ext.String.trim(rec.data.A4364PREME);
                        paramsGuardarTAX.A4363ANIO = Ext.String.trim(rec.data.A4364ANIO);

                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idARCDetailTicket + '-form'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin01 + '/ProcesaDeleteManual/',
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
                                    me.onSumaTaxGrid();
                                }
                                global.Msg({msg: res.data, icon: vp_icon, fn: function () {
                                    }});
                            }
                        });
                    } else {
                        grid.getStore().removeAt(rowIndex);
                        me.onSumaTaxGrid();
                    }

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
                    if (Ext.String.trim(rec.data.A4362CORRL) !== '') {
                        paramsGuardarRazon.IN_OPTION = "2";
                        paramsGuardarRazon.A4363CIA = Ext.String.trim(rec.data.A3659CIA);
                        paramsGuardarRazon.A4363FORMA = Ext.String.trim(rec.data.A3659FORMA);
                        paramsGuardarRazon.A4363SERIE = Ext.String.trim(rec.data.A3659SERIE);
                        paramsGuardarRazon.A4363SEQ = Ext.String.trim(rec.data.A3659SEQ);
                        paramsGuardarRazon.A4363CORRL = Ext.String.trim(rec.data.A4362CORRL);
                        paramsGuardarRazon.A4363PREME = Ext.String.trim(rec.data.A4362PREME);
                        paramsGuardarRazon.A4363ANIO = Ext.String.trim(rec.data.A4362ANIO);

                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idARCDetailTicket + '-form'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin01 + '/ProcesaDeleteManual/',
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
    OnUpdateUsosCPN: function () {
        var me = this;
        rec = me.view.params.rec;

        global.Msg({
            msg: 'Update Usos?',
            icon: 3,
            buttons: 3,
            fn: function (btn) {
                if (btn === 'yes') {
                    var mask = new Ext.LoadMask(Ext.getCmp(prototype.idARCDetailTicket + '-form'), {
                        msg: 'Please Wait....'
                    });
                    mask.show();
                    Ext.Ajax.request({
                        url: me.urlWin01 + '/ProcesaUpdateUsosCPN/',
                        timeout: 60000000,
                        method: 'POST',
                        params: {
                            IN_PREME: rec.get('A4363PREME'),
                            IN_ANIO: rec.get('A4363ANIO'),
                            IN_CIA: Ext.String.trim(rec.get('A4363CIA')),
                            IN_FORMA: Ext.String.trim(rec.get('A4363FORMA')),
                            IN_SERIE: Ext.String.trim(rec.get('A4363SERIE')),
                            IN_SEQ: Ext.String.trim(rec.get('A4363SEQ')),
                            IN_CORRL: Ext.String.trim(rec.get('A4363CORRL'))
                        },
                        success: function (response, options) {
                            mask.hide();
                            var res = Ext.JSON.decode(response.responseText);
                            //usos cupon
                            Ext.getCmp(prototype.idARCDetailTicket + '-gridDataStatus').getStore().removeAll();
                            Ext.getCmp(prototype.idARCDetailTicket + '-gridDataStatus').getStore().loadData(res.lsta_USOS);
                        }
                    });

                }
            }
        });

    },
    CleanFields: function () {
        /* Ext.getCmp( prototype.idARCDetailTicket + '-gridRazon').getStore().removeAll();
         Ext.getCmp( prototype.idARCDetailTicket + '-gridTKT').getStore().removeAll();
         Ext.getCmp( prototype.idARCDetailTicket + '-gridDispuRazon').getStore().removeAll();
         Ext.getCmp( prototype.idARCDetailTicket + '-nmemo').setValue('');
         Ext.getCmp( prototype.idARCDetailTicket + '-ComboStatus').setValue('');
         Ext.getCmp( prototype.idARCDetailTicket + '-disputable').setValue('');
         Ext.getCmp( prototype.idARCDetailTicket + '-Argument').setValue('');
         Ext.getCmp( prototype.idARCDetailTicket + '-File').setValue('');
         Ext.getCmp( prototype.idARCDetailTicket + '-File2').setValue('');
         Ext.getCmp( prototype.idARCDetailTicket + '-File3').setValue('');
         Ext.getCmp( prototype.idARCDetailTicket + '-trnc').setValue('');
         Ext.getCmp( prototype.idARCDetailTicket + '-disputable').setValue('0.00');
         Ext.getCmp( prototype.idARCDetailTicket + '-dias').setValue('');
         Ext.getCmp( prototype.idARCDetailTicket + '-mda').setValue('');
         Ext.getCmp( prototype.idARCDetailTicket + '-pbda').setValue('');
         Ext.getCmp( prototype.idARCDetailTicket + '-PBDate').setValue('');
         Ext.getCmp( prototype.idARCDetailTicket + '-ResoDate').setValue('');
         Ext.getCmp( prototype.idARCDetailTicket + '-txtStatus').setValue('');
         Ext.getCmp( prototype.idARCDetailTicket + '-pbdadif').setValue('0.00');*/


    },
    metadata_detalle: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        Ext.getCmp(prototype.idARCDetailTicket + '-Disputa').setValue(data.A2553DESCR);
    },
    metadata_razon: function (column, e, row, column, x, rowData) {
        var data = x.record.data;
        Ext.getCmp(prototype.idARCDetailTicket + '-Disputa').setValue(data.A3537NCONX);
    },

    onClickCancel: function (btn) {
        this.view.close();
    },
    onColumnAirlineRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var me = this;
        metaData.style = "background:#D5F4D5 !important";
        if (me.view.params.action === 'FORMPENDIRFND') {
            me.onSumaTaxGrid();
        }

        return Ext.util.Format.number(value, '0,000.00');
    },
    OnAirlineSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(parseFloat(value), '0,000.00');
    },
    onChkChangeCPN: function (checkbox, newValue, oldValue, eOpts) {
        var me = this;
        var grid03 = Ext.getCmp(prototype.idARCDetailTicket + '-gridCPN');
        var regs = grid03.getStore().getCount();
        //
        Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn5').hide();
        Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn6').hide();
        Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn7').hide();
        Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn8').hide();
        var txtConto = Ext.getCmp(prototype.idARCDetailTicket + '-CmbConto').getValue();
        if (txtConto === 'C') {
            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn5').show();
            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn6').show();
            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn7').show();
            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn8').show();
        } else {
            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn5').hide();
            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn6').hide();
            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn7').hide();
            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn8').hide();
        }
        if (!newValue) {
            //Ext.getCmp( prototype.idARCDetailTicket + '-txtShowcoupons').hide();Ext.getCmp( prototype.idARCDetailTicket + '-txtShowcoupons').show();
            me.totalcpn = 0;
            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn1').hide();
            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn2').hide();
            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn3').hide();
            Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn4').hide();
            //
            for (var i = 0; i < regs; i++) {
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A4366CPN')) === '1') {
                    me.totalcpn += 1;
                    Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn1').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A4366CPN')) === '2') {
                    me.totalcpn += 1;
                    Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn2').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A4366CPN')) === '3') {
                    me.totalcpn += 1;
                    Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn3').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A4366CPN')) === '4') {
                    me.totalcpn += 1;
                    Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn4').show();
                }

            }
            //para verificar cupones
            for (var e = 0; e < regs; e++) {
                if (Ext.String.trim(grid03.getStore().getAt(e).get('A4366CPN')) === '1') {
                    if (Ext.String.trim(grid03.getStore().getAt(e).get('A4366CURS1')) === 'RFND' || Ext.String.trim(grid03.getStore().getAt(e).get('A4366CURS1')) === 'USED') {
                        Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn1').hide();
                        me.totalcpn = (me.totalcpn - 1);
                    }
                }
                if (Ext.String.trim(grid03.getStore().getAt(e).get('A4366CPN')) === '2') {
                    if (Ext.String.trim(grid03.getStore().getAt(e).get('A4366CURS1')) === 'RFND' || Ext.String.trim(grid03.getStore().getAt(e).get('A4366CURS1')) === 'USED') {
                        Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn1').hide();
                        me.totalcpn = (me.totalcpn - 1);
                    }
                }
                if (Ext.String.trim(grid03.getStore().getAt(e).get('A4366CPN')) === '3') {
                    if (Ext.String.trim(grid03.getStore().getAt(e).get('A4366CURS1')) === 'RFND' || Ext.String.trim(grid03.getStore().getAt(e).get('A4366CURS1')) === 'USED') {
                        Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn1').hide();
                        me.totalcpn = (me.totalcpn - 1);
                    }
                }
                if (Ext.String.trim(grid03.getStore().getAt(e).get('A4366CPN')) === '4') {
                    if (Ext.String.trim(grid03.getStore().getAt(e).get('A4366CURS1')) === 'RFND' || Ext.String.trim(grid03.getStore().getAt(e).get('A4366CURS1')) === 'USED') {
                        Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn1').hide();
                        me.totalcpn = (me.totalcpn - 1);
                    }
                }

            }
        } else {
            for (var i = 0; i < regs; i++) {
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A4366CPN')) === '1') {
                    Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn1').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A4366CPN')) === '2') {
                    Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn2').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A4366CPN')) === '3') {
                    Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn3').show();
                }
                if (Ext.String.trim(grid03.getStore().getAt(i).get('A4366CPN')) === '4') {
                    Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn4').show();
                }

            }
        }
    },
    validaRequiredFields: function () {
        var bvalida = true;
        var me = this;
        var vl_razon = '';
        var Stat1 = '';
        var Stat2 = '';
        var Stat3 = '';
        var Stat4 = '';
        var vl_razon2 = 0;
        var totaldif = 0;
        var vl_netofop = 0;
        var vl_STATUS = Ext.getCmp(prototype.idARCDetailTicket + '-ComboStatus').getValue();
        var grid03 = Ext.getCmp(prototype.idARCDetailTicket + '-gridRazonesTkt');
        var regs = grid03.getStore().getCount();
        var cbox1 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn1').getValue();
        var cbox2 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn2').getValue();
        var cbox3 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn3').getValue();
        var cbox4 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn4').getValue();
        var cbox5 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn5').getValue();
        var cbox6 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn6').getValue();
        var cbox7 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn7').getValue();
        var cbox8 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn8').getValue();
        var vl_type = Ext.getCmp(prototype.idARCDetailTicket + '-txttidoc').getValue();
        var txtConto = Ext.getCmp(prototype.idARCDetailTicket + '-CmbConto').getValue();
        var CmbTRFND = Ext.getCmp(prototype.idARCDetailTicket + '-CmbTRFND').getValue();
        var txtCorreo = Ext.getCmp(prototype.idARCDetailTicket + '-txtCorreo').getValue();
        var vl_Showcoupons = Ext.getCmp(prototype.idARCDetailTicket + '-txtShowcoupons').getValue();
        var grid04 = Ext.getCmp(prototype.idARCDetailTicket + '-gridTaxes');
        var reg4 = grid04.getStore().getCount();
        var gridPAYMENT = Ext.getCmp(prototype.idARCDetailTicket + '-gridPAYMENT');
        var reg5 = gridPAYMENT.getStore().getCount();
        //diferencia tarifa
        if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalFareAm').getValue() === null) {
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalFareAm').setValue(0);
        }
        if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalEqFareAm').getValue() === null) {
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalEqFareAm').setValue(0);
        }
        if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').getValue() === '') {
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').setValue('0');
        }
        if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalram').getValue() === '') {
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalram').setValue('0');
        }
        if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotal').getValue() === '') {
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotal').setValue('0');
        }
        if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalXml').getValue() === '') {
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalXml').setValue('0');
        }

        var txtTotal = Ext.getCmp(prototype.idARCDetailTicket + '-txtTotal').getValue().replace(new RegExp(',', 'g'), '');
        var txtTotalXml = Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalXml').getValue().replace(new RegExp(',', 'g'), '');
        var txtTotalram = Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalram').getValue().replace(new RegExp(',', 'g'), '');
        // diferencia de total a rfnd
        if (parseFloat(txtTotal) !== 0) {
            if (parseFloat(txtTotal) !== 0 && parseFloat(txtTotalram) !== 0) {
                totaldif = (txtTotalram - txtTotal);
            }
            if (totaldif !== 0) {
                if (parseFloat(txtTotalXml) !== 0 && parseFloat(txtTotalram) !== 0) {
                    totaldif = (txtTotalram - txtTotalXml);
                }
            }
        } else {
            if (parseFloat(txtTotalXml) !== 0 && parseFloat(txtTotalram) !== 0) {
                totaldif = (txtTotalram - txtTotalXml);
            }
        }

        if (vl_STATUS === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must select the status');
            bvalida = false;
            return;
        }
        if (txtCorreo === '') {
            Ext.Msg.alert('.: PRAXIS :.', 'You must enter the E-mail');
            bvalida = false;
            return;
        }
        if (vl_STATUS === 'F') {
            if (totaldif > 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'The amount of the RFND must not be greater than the Ticket');
                bvalida = false;
                return;
            }
            if (CmbTRFND > 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'You must select the type of RFND');
                bvalida = false;
                return;
            }
            if (txtTotalram === '0') {
                Ext.Msg.alert('.: PRAXIS :.', 'You must enter the amount to RFND');
                bvalida = false;
                return;
            }
            if (Ext.String.trim(txtConto).length === 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter if the ticket is a C set or is a Start I');
                bvalida = false;
                return;
            }
            if (Ext.String.trim(txtConto) !== 'C' && Ext.String.trim(txtConto) !== 'I') {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter if the ticket is a C set or is a Start I');
                bvalida = false;
                return;
            }
            if (Ext.String.trim(txtConto) === 'C') {
                if (!cbox5 && !cbox6 && !cbox7 && !cbox8) {
                    Ext.Msg.alert('.: PRAXIS :.', 'When the ticket is Start you cannot select coupons from 5 to 8');
                    bvalida = false;
                    return;
                }
            }
            if (txtConto === 'I') {
                if (cbox1 || cbox2 || cbox3 || cbox4) {
                    var vl_cant = 0;
                    var vl_cantcpn = 0;
                    var vl_total = 0;
                    var grid08 = Ext.getCmp(prototype.idARCDetailTicket + '-gridCPN');
                    var regscpn = grid08.getStore().getCount();
                    for (var x = 0; x < regscpn; x++) {
                        if (CmbTRFND === 'T') {
                            if (!cbox1 && Ext.String.trim(grid08.getStore().getAt(x).get('A4366CPN')) === '1') {
                                Ext.Msg.alert('.: PRAXIS :.', 'You must select the type of partial refund');
                                bvalida = false;
                                return;
                            }
                            if (!cbox2 && Ext.String.trim(grid08.getStore().getAt(x).get('A4366CPN')) === '2') {
                                Ext.Msg.alert('.: PRAXIS :.', 'You must select the type of partial refund');
                                bvalida = false;
                                return;
                            }
                            if (!cbox3 && Ext.String.trim(grid08.getStore().getAt(x).get('A4366CPN')) === '3') {
                                Ext.Msg.alert('.: PRAXIS :.', 'You must select the type of partial refund');
                                bvalida = false;
                                return;
                            }
                            if (!cbox4 && Ext.String.trim(grid08.getStore().getAt(x).get('A4366CPN')) === '4') {
                                Ext.Msg.alert('.: PRAXIS :.', 'You must select the type of partial refund');
                                bvalida = false;
                                return;
                            }
                        } else {

                            if (Ext.String.trim(grid08.getStore().getAt(x).get('A4366CPN')) === '1') {
                                vl_cant = (vl_cant + 1);
                                if (cbox1) {
                                    vl_cantcpn = (vl_cantcpn + 1);
                                }
                            }
                            if (Ext.String.trim(grid08.getStore().getAt(x).get('A4366CPN')) === '2') {
                                vl_cant = (vl_cant + 1);
                                if (cbox2) {
                                    vl_cantcpn = (vl_cantcpn + 1);
                                }
                            }

                            if (Ext.String.trim(grid08.getStore().getAt(x).get('A4366CPN')) === '3') {
                                vl_cant = (vl_cant + 1);
                                if (cbox3) {
                                    vl_cantcpn = (vl_cantcpn + 1);
                                }
                            }
                            if (Ext.String.trim(grid08.getStore().getAt(x).get('A4366CPN')) === '4') {
                                vl_cant = (vl_cant + 1);
                                if (cbox4) {
                                    vl_cantcpn = (vl_cantcpn + 1);
                                }
                            }


                        }

                    }
                    if (CmbTRFND !== 'T') {
                        vl_total = (vl_cant - vl_cantcpn);
                        if (vl_total === 0) {
                            Ext.Msg.alert('.: PRAXIS :.', 'You must select the type of total refund');
                            bvalida = false;
                            return;
                        }
                    }


                }

            }
            if (!vl_Showcoupons) {
                if (!cbox1 && !cbox2 && !cbox3 && !cbox4 && !cbox5 && !cbox6 && !cbox7 && !cbox8) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one coupon');
                    bvalida = false;
                    return;
                }
                var grid05 = Ext.getCmp(prototype.idARCDetailTicket + '-gridCPN');
                var regscpn = grid05.getStore().getCount();
                for (var i = 0; i < regscpn; i++) {
                    if (Ext.String.trim(grid05.getStore().getAt(i).get('A4366CPN')) === '1') {
                        Stat1 = Ext.String.trim(grid05.getStore().getAt(i).get('A4366CURS1'));
                    }
                    if (Ext.String.trim(grid05.getStore().getAt(i).get('A4366CPN')) === '2') {
                        Stat2 = Ext.String.trim(grid05.getStore().getAt(i).get('A4366CURS1'));
                    }
                    if (Ext.String.trim(grid05.getStore().getAt(i).get('A4366CPN')) === '3') {
                        Stat3 = Ext.String.trim(grid05.getStore().getAt(i).get('A4366CURS1'));
                    }
                    if (Ext.String.trim(grid05.getStore().getAt(i).get('A4366CPN')) === '4') {
                        Stat4 = Ext.String.trim(grid05.getStore().getAt(i).get('A4366CURS1'));
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
            } else {
                if (vl_STATUS === 'F') {
                    if (!cbox1 && !cbox2 && !cbox3 && !cbox4 && !cbox5 && !cbox6 && !cbox7 && !cbox8) {
                        Ext.Msg.alert('.: PRAXIS :.', 'You must select at least one coupon');
                        bvalida = false;
                        return;
                    }
                }
            }
            //Validar las FOP
            if (reg5 === 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'Enter payment method');
                bvalida = false;
                return;
            } else {
                for (var p = 0; p < reg5; p++) {

                    if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A4365CFOP')) === '' && Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A4365TYPE')) === 'AE') {
                        Ext.Msg.alert('.: PRAXIS :.', 'You must enter payment method');
                        bvalida = false;
                        return;
                    }
                    if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A4365CFOP')) === 'CA') {
                        if (gridPAYMENT.getStore().getAt(p).get('A4365TYCAR') !== '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, you not must enter the card type');
                            bvalida = false;
                            return;
                        }
                        if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A4365NTARJ')) !== '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, you not must enter the card number');
                            bvalida = false;
                            return;
                        }
                        if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A4365FEXP')) !== '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, younot  must enter the expiration date');
                            bvalida = false;
                            return;
                        }
                        if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A4365CAPL')) !== '') {
                            Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is cash, you not must enter Approval Card');
                            bvalida = false;
                            return;
                        }
                        if (parseFloat(gridPAYMENT.getStore().getAt(p).get('A4365TOTAL')) === 0) {
                            Ext.Msg.alert('.: PRAXIS :.', 'Enter Net.');
                            bvalida = false;
                            return;
                        }

                    }
                    if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A4365CFOP')) === 'CC' || Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A4365CFOP')) === 'ET') {
                        if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A4365TYPE')) === 'AE') {
                            if (gridPAYMENT.getStore().getAt(p).get('A4365TYCAR') === '') {
                                Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card you must enter the card type');
                                bvalida = false;
                                return;
                            }
                            if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A4365NTARJ')) === '') {
                                Ext.Msg.alert('.: PRAXIS :.', 'If the payment type is credit card, you must enter the card number');
                                bvalida = false;
                                return;
                            }
                            if (gridPAYMENT.getStore().getAt(p).get('A4365TYCAR') === 'CA' || gridPAYMENT.getStore().getAt(p).get('A4365TYCAR') === 'VI' || gridPAYMENT.getStore().getAt(p).get('A4365TYCAR') === 'JC' || gridPAYMENT.getStore().getAt(p).get('A4365TYCAR') === 'DS' || gridPAYMENT.getStore().getAt(p).get('A4365TYCAR') === 'IK' || gridPAYMENT.getStore().getAt(p).get('A4365TYCAR') === 'BA') {
                                if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A4365NTARJ')).length !== 16) {
                                    Ext.Msg.alert('.: PRAXIS :.', 'The Fop CA,VI,JC,DS,IK,BA must have 16 characters');
                                    bvalida = false;
                                    return;
                                }
                            } else {
                                if (gridPAYMENT.getStore().getAt(p).get('A4365TYCAR') === 'PP' || gridPAYMENT.getStore().getAt(p).get('A4365TYCAR') === 'AX' || gridPAYMENT.getStore().getAt(p).get('A4365TYCAR') === 'TP') {
                                    if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A4365NTARJ')).length !== 15) {
                                        Ext.Msg.alert('.: PRAXIS :.', 'The Fop PP,AX,TP must have 15 characters');
                                        bvalida = false;
                                        return;
                                    }
                                } else {
                                    if (gridPAYMENT.getStore().getAt(p).get('A4365TYCAR') === 'DC') {
                                        if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A4365NTARJ')).length !== 14) {
                                            Ext.Msg.alert('.: PRAXIS :.', 'The Fop DC must have 14 characters');
                                            bvalida = false;
                                            return;
                                        }
                                    } else {
                                        if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A4365NTARJ')).length > 16 || Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A4365NTARJ')).length > 14) {
                                            Ext.Msg.alert('.: PRAXIS :.', 'The Fop must have 14 or 16 characters');
                                            bvalida = false;
                                            return;
                                        }
                                    }

                                }
                            }

                        }
                    }
                    if (Ext.String.trim(gridPAYMENT.getStore().getAt(p).get('A4365TYPE')) === 'AE') {
                        if (parseFloat(gridPAYMENT.getStore().getAt(p).get('A4365TOTAL')) === 0) {
                            Ext.Msg.alert('.: PRAXIS :.', 'Enter Net.');
                            bvalida = false;
                            return;
                        }
                        vl_netofop = (vl_netofop + parseFloat(gridPAYMENT.getStore().getAt(p).get('A4365TOTAL')));
                    }

                }
            }
            vl_netofop = (txtTotalram - vl_netofop);
            if (vl_netofop !== 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'the total fop must be equal to the total refund');
                bvalida = false;
                return;
            }
            /*if (!Ext.getCmp(prototype.idARCDetailTicket + '-checkApplyBPO').getValue() && !Ext.getCmp(prototype.idARCDetailTicket + '-checkApplyrobot').getValue()) {
             Ext.Msg.alert('.: PRAXIS :.', 'Select Apply change status / BPO  O Apply robot sabre');
             bvalida = false;
             return;
             }*/
            //validar taxes
            for (var o = 0; o < reg4; o++) {
                if (Ext.String.trim(grid04.getStore().getAt(o).get('A4364CDTAX')).length === 0) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter Code Tax');
                    bvalida = false;
                    return;
                }
                if (Ext.String.trim(grid04.getStore().getAt(o).get('A4364MONED')).length === 0) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter Currency');
                    bvalida = false;
                    return;
                }
                if (grid04.getStore().getAt(o).get('A4364TXMIA') === 0 || grid04.getStore().getAt(o).get('A4364TXMIA') === 0.00) {
                    Ext.Msg.alert('.: PRAXIS :.', 'You must enter Tax  Amount');
                    bvalida = false;
                    return;
                }
                if (Ext.String.trim(grid04.getStore().getAt(o).get('A4364CDTAX')) === 'XF' && Ext.String.trim(grid04.getStore().getAt(o).get('A4364APFC')).length < 3) {
                    Ext.Msg.alert('.: PRAXIS :.', 'Please, enter Airport for tax XF');
                    bvalida = false;
                    return;
                }


            }
        }
        // validacion general
        if (regs === 0) {
            Ext.Msg.alert('.: PRAXIS :.', 'Enter issue reason');
            bvalida = false;
        }
        if (regs !== 0) {
            for (var o = 0; o < regs; o++) {
                vl_razon2 = vl_razon2 + 1;
            }
            if (vl_razon2.length === 0) {
                Ext.Msg.alert('.: PRAXIS :.', 'The free text must be used with another answer');
                bvalida = false;
            }
        }
        if (regs !== 0) {
            for (var t = 0; t < regs; t++) {
                vl_razon = vl_razon + grid03.getStore().getAt(t).get('A4362ERROR');
                if (grid03.getStore().getAt(t).get('A4362ERROR').length > 250) {
                    Ext.Msg.alert('.: PRAXIS :.', 'The description must not exceed 250 characters');
                    bvalida = false;
                    return;
                }
                if (vl_STATUS === 'F') {
                    if (grid03.getStore().getAt(t).get('A4362CODE') === '00019' || grid03.getStore().getAt(t).get('A4362CODE') === '00019' || grid03.getStore().getAt(t).get('A4362CODE') === '00020' || grid03.getStore().getAt(t).get('A4362CODE') === '00022') {
                        var txtPenalty = Ext.getCmp(prototype.idARCDetailTicket + '-txtPenalty').getValue();
                        if (txtPenalty === 0) {
                            Ext.Msg.alert('.: PRAXIS :.', 'You must enter the penalty to be able to authorize since you chose a reason with a penalty');
                            bvalida = false;
                        }

                    }
                    if (grid03.getStore().getAt(t).get('A4362CODE') === '00018' || grid03.getStore().getAt(t).get('A4362CODE') === '00020') {
                        if (CmbTRFND !== 'P') {
                            Ext.Msg.alert('.: PRAXIS :.', 'You must select the type of partial refund');
                            bvalida = false;
                        }
                    }
                }

            }
            if (vl_razon.length > 1000) {
                Ext.Msg.alert('.: PRAXIS :.', 'The description total must not exceed 1000 characters');
                bvalida = false;
            }
        }
        for (var w = 0; w < regs; w++) {
            if ((grid03.getStore().getAt(w).get('A4362FAMIL') === 'Authorise') && vl_STATUS === 'R') {
                Ext.Msg.alert('.: PRAXIS :.', 'Check the answer, the rejected status cannot be used with authorise answer');
                bvalida = false;
                return;
            }
            if ((grid03.getStore().getAt(w).get('A4362FAMIL') !== 'Authorise') && vl_STATUS === 'F') {
                Ext.Msg.alert('.: PRAXIS :.', 'Check the answer, the Authorise status cannot be used with rejected answer');
                bvalida = false;
                return;
            }

        }

        return bvalida;
    },
    onClickSave: function (btn) {
        var me = this;
        var checkApply = '';
        var vl_mensaje = 'Insert Data?';
        if (me.validaRequiredFields()) {
            rec = me.view.params.rec;
            if (me.lsta_Documents > 0 && Ext.getCmp(prototype.idARCDetailTicket + '-ComboStatus').getValue() === 'F') {
                vl_mensaje = 'The ticket has more than one document, do you want to continue?';
            }
            global.Msg({
                msg: vl_mensaje,
                icon: 3,
                buttons: 3,
                fn: function (btn) {
                    if (btn === 'yes') {
                        checkApply = 'N';
                        /*if (Ext.getCmp(prototype.idARCDetailTicket + '-checkApplyBPO').getValue()) {
                         checkApply = 'Y';
                         }
                         if (Ext.getCmp(prototype.idARCDetailTicket + '-checkApplyrobot').getValue()) {
                         checkApply = 'N';
                         }*/
                        me.beanTMP.IN_FOLIO = '';
                        me.beanTMP.IN_COUNTRY = '';

                        me.beanTMP.IN_CORRL = Ext.String.trim(rec.get('A4363CORRL'));
                        me.beanTMP.IN_PREME = Ext.String.trim(rec.get('A4363PREME'));
                        me.beanTMP.IN_ANIO = Ext.String.trim(rec.get('A4363ANIO'));
                        me.beanTMP.IN_CIA = Ext.String.trim(rec.get('A4363CIA'));
                        me.beanTMP.IN_FORMA = Ext.String.trim(rec.get('A4363FORMA'));
                        me.beanTMP.IN_SERIE = Ext.String.trim(rec.get('A4363SERIE'));
                        me.beanTMP.IN_SEQ = Ext.String.trim(rec.get('A4363SEQ'));
                        //
                        me.beanTMP.IN_TARIF = Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalFareAm').getValue();
                        me.beanTMP.IN_MDA = Ext.getCmp(prototype.idARCDetailTicket + '-txtmda').getValue();
                        me.beanTMP.IN_TARIFEQUI = Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalEqFareAm').getValue();
                        me.beanTMP.IN_MDAEQUI = Ext.getCmp(prototype.idARCDetailTicket + '-txtEqmda').getValue();
                        me.beanTMP.IN_TTAX = Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').getValue().replace(new RegExp(',', 'g'), '');
                        me.beanTMP.IN_COMMI = Ext.getCmp(prototype.idARCDetailTicket + '-txtCommissionAm').getValue().replace(new RegExp(',', 'g'), '');
                        me.beanTMP.IN_TOTALRFND = Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalram').getValue().replace(new RegExp(',', 'g'), '');
                        me.beanTMP.IN_PENALTY = Ext.getCmp(prototype.idARCDetailTicket + '-txtPenalty').getValue();
                        me.beanTMP.IN_STATUS = Ext.getCmp(prototype.idARCDetailTicket + '-ComboStatus').getValue();
                        me.beanTMP.IN_CONJU = Ext.getCmp(prototype.idARCDetailTicket + '-CmbConto').getValue();
                        me.beanTMP.IN_TRFND = Ext.getCmp(prototype.idARCDetailTicket + '-CmbTRFND').getValue();
                        me.beanTMP.IN_MARCA = checkApply;
                        me.beanTMP.IN_EMAIL = Ext.getCmp(prototype.idARCDetailTicket + '-txtCorreo').getValue();
                        //me.beanTMP.IN_MARCA = Ext.getCmp( prototype.idARCDetailTicket + '-Combochangestatus').getValue();
                        var cbox1 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn1').getValue();
                        var cbox2 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn2').getValue();
                        var cbox3 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn3').getValue();
                        var cbox4 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn4').getValue();
                        var cbox5 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn5').getValue();
                        var cbox6 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn6').getValue();
                        var cbox7 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn7').getValue();
                        var cbox8 = Ext.getCmp(prototype.idARCDetailTicket + '-txtCpn8').getValue();
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

                        if (cbox5) {
                            me.beanTMP.IN_CPN5 = '5';
                        } else {
                            me.beanTMP.IN_CPN5 = '';
                        }
                        if (cbox6) {
                            me.beanTMP.IN_CPN6 = '6';
                        } else {
                            me.beanTMP.IN_CPN6 = '';
                        }
                        if (cbox7) {
                            me.beanTMP.IN_CPN7 = '7';
                        } else {
                            me.beanTMP.IN_CPN7 = '';
                        }
                        if (cbox8) {
                            me.beanTMP.IN_CPN8 = '8';
                        } else {
                            me.beanTMP.IN_CPN8 = '';
                        }


                        var lstRazones = new Array();
                        var lstTaxes = new Array();
                        var lstFop = new Array();
                        for (var i = 0; i < Ext.getCmp(prototype.idARCDetailTicket + '-gridRazonesTkt').getStore().data.length; i++) {
                            var bean = Ext.getCmp(prototype.idARCDetailTicket + '-gridRazonesTkt').getStore().data.items[i].data;
                            lstRazones.push(bean);
                        }
                        for (var i = 0; i < Ext.getCmp(prototype.idARCDetailTicket + '-gridTaxes').getStore().data.length; i++) {
                            var bean = Ext.getCmp(prototype.idARCDetailTicket + '-gridTaxes').getStore().data.items[i].data;
                            lstTaxes.push(bean);
                        }

                        for (var i = 0; i < Ext.getCmp(prototype.idARCDetailTicket + '-gridPAYMENT').getStore().data.length; i++) {
                            var bean = Ext.getCmp(prototype.idARCDetailTicket + '-gridPAYMENT').getStore().data.items[i].data;
                            lstFop.push(bean);
                        }
                        var mask = new Ext.LoadMask(Ext.getCmp(prototype.idARCDetailTicket + '-win'), {
                            msg: 'Please Wait....'
                        });
                        mask.show();
                        Ext.Ajax.request({
                            url: me.urlWin01 + '/ProcesaManualRFNDARCTCKT/',
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
                                var vpmjse = '';
                                if (res.data === 'RECORD INSERTED' || res.data === 'Proceso Culminado') {
                                    vp_icon = 1;
                                    vpmjse = 'RECORD INSERTED';
                                } else {
                                    vpmjse = res.data;
                                }
                                global.Msg({msg: vpmjse, icon: vp_icon, fn: function () {
                                        if (vp_icon === 1) {
                                            Ext.getCmp(prototype.idARCDetailTicket + '-win').close();
                                            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-Contenedor').getController().onSearchClick();
                                            Ext.getCmp(prototype.idRFNDAssociatedARCR + '-Contenedor').getController().searchform_detalle2();
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
        return '<span onclick="Ext.getCmp( prototype.idARCDetailTicket + \'-win\').getController().onWinFileHistoViewerClick(' + rowIndex + ');">' + archivo + '</span>'
    },
    onWinFileHistoViewerClick: function (rowIndex) {
        var grid = Ext.getCmp(prototype.idARCDetailTicket + '-gridRazon');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var nmemo = '';
        if (rec.data.A2553TYPO === 'AM') {
            nmemo = Ext.getCmp(prototype.idARCDetailTicket + '-txtconxp').getValue();
        } else {
            nmemo = Ext.getCmp(prototype.idARCDetailTicket + '-nmemo').getValue();
        }
        var DisputeFileViewer = Ext.create('Ext.Praxis.view.salesaudit.QueryPostbilling.PostbillingFileViewer', {id: 'PostbillingFileViewer'});
        var controller = DisputeFileViewer.getController();
        controller.getFilesDirectory2(rec.data, nmemo, Ext.getCmp(prototype.idARCDetailTicket + '-country').getValue(''), this.urlWin01);
        DisputeFileViewer.show();
    },
    OnColumnAuditorRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var archivo = '';
        if (Ext.String.trim(value) !== '') {
            archivo = 'Download';
        }//'DetailBsplinkRefundQueryRFND'
        metaData.style = "font-weight:bold !important; color:blue !important; cursor: pointer !important; text-decoration: underline;";
        return '<span onclick="Ext.getCmp( prototype.idARCDetailTicket + \'-win\').getController().onWinFileViewerClick(' + rowIndex + ');">' + archivo + '</span>'
    },
    onWinFileViewerClick: function (rowIndex) {
        var grid = Ext.getCmp(prototype.idARCDetailTicket + '-gridDispuRazon');
        var store = grid.getStore();
        var rec = store.getAt(rowIndex);
        var nmemo = '';
        if (rec.data.A3537TYPE === 'AM') {
            if (Ext.getCmp(prototype.idARCDetailTicket + '-txtconxp').getValue() !== '') {
                nmemo = Ext.getCmp(prototype.idARCDetailTicket + '-txtconxp').getValue();
            } else {
                nmemo = Ext.getCmp(prototype.idARCDetailTicket + '-txtpreme').getValue();
            }
        } else {
            nmemo = Ext.getCmp(prototype.idARCDetailTicket + '-nmemo').getValue();
        }
        var DisputeFileViewer = Ext.create('Ext.Praxis.view.salesaudit.QueryPostbilling.PostbillingFileViewer', {id: 'PostbillingFileViewer'});
        var controller = DisputeFileViewer.getController();
        controller.getFilesDirectory(rec.data, nmemo, Ext.getCmp(prototype.idARCDetailTicket + '-country').getValue(''), this.urlWin01);
        DisputeFileViewer.show();
    },
    onWinFormRazonesClick: function () {
        var me = this;
        rec = me.view.params.rec;
        var win = new Ext.Praxis.view.salesaudit.RFNDAssociatedARCRFNDForm.RFNDARCFormRazones({
            params: {
                params: rec.data
            }
        });
        win.show();
    },
    onTotaFare: function (o, e, eOpts) {
        var me = this;
        if (me.view.params.action === 'FORMPENDIRFND') {
            if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalEqFareAm').getValue() === null) {
                Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalEqFareAm').setValue(0);
            }
            if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalFareAm').getValue() === null) {
                Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalFareAm').setValue(0);
            }
            if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').getValue() === '') {
                Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').setValue('0');
            }
            var tarifaAm = 0;
            var penal = 0;
            if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalEqFareAm').getValue() !== 0) {
                tarifaAm = Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalEqFareAm').getValue();
            } else {
                tarifaAm = Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalFareAm').getValue();
            }
            if (Ext.getCmp(prototype.idARCDetailTicket + '-txtPenalty').getValue() !== 0) {
                penal = Ext.getCmp(prototype.idARCDetailTicket + '-txtPenalty').getValue();
            }

            var TotalTaxAm = Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').getValue().replace(new RegExp(',', 'g'), '');
            var total = ((tarifaAm + parseFloat(TotalTaxAm)) - penal);
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalram').setValue(Ext.util.Format.number((total), '0,000.00'));
            //Ext.getCmp( prototype.idARCDetailTicket + '-txtTotalFareAm').setValue(Ext.util.Format.number(tarifaAm, '0,000.00'));
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').setValue(Ext.util.Format.number(TotalTaxAm, '0,000.00'));
        }


    },
    onSearchkey: function (f, e) {
        //alert(e.getKey());
        var me = this;
        if (me.view.params.action === 'FORMPENDIRFND') {
            if (e.getKey() === e.ENTER || e.getKey() === e.TAB) {

                if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalEqFareAm').getValue() === null) {
                    Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalEqFareAm').setValue(0);
                }
                if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalFareAm').getValue() === null) {
                    Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalFareAm').setValue(0);
                }
                if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').getValue() === '') {
                    Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').setValue('0');
                }
                if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').getValue() === '') {
                    Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').setValue('0');
                }
                var tarifaAm = 0;
                var penal = 0;
                if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalEqFareAm').getValue() !== 0) {
                    tarifaAm = Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalEqFareAm').getValue();
                } else {
                    tarifaAm = Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalFareAm').getValue();
                }
                if (Ext.getCmp(prototype.idARCDetailTicket + '-txtPenalty').getValue() !== 0) {
                    penal = Ext.getCmp(prototype.idARCDetailTicket + '-txtPenalty').getValue();
                }
                var TotalTaxAm = Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').getValue().replace(new RegExp(',', 'g'), '');
                var total = (parseFloat(tarifaAm) + parseFloat(TotalTaxAm) - parseFloat(penal));
                Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalram').setValue(Ext.util.Format.number((total), '0,000.00'));
                //Ext.getCmp( prototype.idARCDetailTicket + '-txtTotalFareAm').setValue(Ext.util.Format.number(tarifaAm, '0,000.00'));
                Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').setValue(Ext.util.Format.number(TotalTaxAm, '0,000.00'));
            }
        }


    },

    onSumaTaxGrid: function () {
        var me = this;
        if (me.view.params.action === 'FORMPENDIRFND') {
            var grid01 = Ext.getCmp(prototype.idARCDetailTicket + '-gridTaxes');
            var regs = grid01.getStore().getCount();
            var Total = 0;
            var monto = 0;
            for (var i = 0; i < regs; i++) {
                monto = grid01.getStore().getAt(i).get('A4364TXMIA');
                Total += parseFloat(monto);
            }
            //console.log(Total);
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').setValue(Ext.util.Format.number(Total, '0,000.00'));
            me.onTotalRFND();
        }

    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onTotalRFND: function () {
        if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalFareAm').getValue() === '') {
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalFareAm').setValue(0);
        }
        if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').getValue() === '') {
            Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').setValue('0');
        }
        var tarifaAm = 0;
        var penal = 0;
        if (Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalEqFareAm').getValue() !== 0) {
            tarifaAm = Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalEqFareAm').getValue();
        } else {
            tarifaAm = Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalFareAm').getValue();
        }
        if (Ext.getCmp(prototype.idARCDetailTicket + '-txtPenalty').getValue() !== 0) {
            penal = Ext.getCmp(prototype.idARCDetailTicket + '-txtPenalty').getValue();
        }

        var TotalTaxAm = Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalTaxAm').getValue().replace(new RegExp(',', 'g'), '');
        var total = ((parseFloat(tarifaAm) + parseFloat(TotalTaxAm)) - parseFloat(penal));

        Ext.getCmp(prototype.idARCDetailTicket + '-txtTotalram').setValue(Ext.util.Format.number((total), '0,000.00'));
        //Ext.getCmp( prototype.idARCDetailTicket + '-txtTotalFareAm').setValue(tarifaAm);
        //Ext.getCmp( prototype.idARCDetailTicket + '-txtTotalTaxAm').setValue(Ext.util.Format.number(TotalTaxAm, '0,000.00'));
    },
    onSeguimietoClick: function (grid, rowIndex, colIndex) {
        var me = this;
        rec = me.view.params.rec;
        rec = rec === null || rec === undefined ? {} : rec;
        var win = new Ext.Praxis.view.salesaudit.RFNDQuery.RFNDFormErrorBPO({
            params: {
                rec: rec
            }
        });
        win.show();
    }




});

