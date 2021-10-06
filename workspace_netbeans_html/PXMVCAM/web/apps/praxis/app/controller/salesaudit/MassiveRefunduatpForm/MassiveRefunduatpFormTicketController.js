/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.controller.salesaudit.MassiveRefunduatpForm.MassiveRefunduatpFormTicketController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.MassiveRefunduatpFormTicketController',
    beanINI: {},
    beanIniTem: {},
    beanHistorical: {},
    totalcpn: 0,
    totalcpnuse: 0,
    beanTMP: {},
    urlWin01: CONTEXTPATH + '/MassiveRefunduatpForm',
    init: function (view) {
        var me = this;
        //this.urlWin01 = Ext.String.trim(this.view.params.url01);
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {
        var me = this;
        me.setStores();
        me.onLoadDataGrid();

    },
    setStores: function () {
        var grid01 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT');
        var grid02 = Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes');

        var store01 = Ext.create('Ext.data.Store', {
            storeId: prototype.idMassiveRefunduatpFormTicket + '-store-grid01'
        });
        var store02 = Ext.create('Ext.data.Store', {
            storeId: prototype.idMassiveRefunduatpFormTicket + '-store-grid02'
        });

        grid01.setStore(store01);
        grid02.setStore(store02);

    },
    onLoadDataGrid: function () {
        var me = this;
        rec = me.view.params.rec;
        var vl_flag = '';
        var vl_stato = '';
        switch (Ext.String.trim(rec.get('A4076STAT'))) {
            case 'Y':
                vl_stato = 'PENDING';
                break;
            case 'E':
                vl_stato = 'SEND BPO';
                break;
            case 'F':
                vl_stato = 'CAPTURED BPO';
                break;
        }
        switch (Ext.String.trim(rec.get('A4076FLAG'))) {
            case 'A':
                vl_flag = 'APPROVED';
                break;
            case 'D':
                vl_flag = 'DUPLICATE TICKET';
                break;
            case 'Y':
                vl_flag = 'PENDING';
                break;
            case 'E':
                vl_flag = 'SALES DATE ERROR';
                break;
            case 'U':
                vl_flag = 'WITH USES';
                break;
            case 'T':
                vl_flag = 'ATO ERROR';
                break;
                
        }

        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txttkt').setValue(rec.get('IN_TICKET'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtcpn').setValue(rec.get('A4076CPN'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txttrnc').setValue(rec.get('A4076TRNCO'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txttdoc').setValue(rec.get('A4076TDOC'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtIssdate').setValue(rec.get('A4076FVTA'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtiata').setValue(rec.get('A4076IATA'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtcurre').setValue(rec.get('A4076MDA'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtrefe').setValue(rec.get('A4076REFE'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtStatus').setValue(vl_flag);
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtStatusBPO').setValue(vl_stato);

        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtFare').setValue(rec.get('A4076TARTK'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotalFareEqv').setValue(rec.get('A4076EQVTK'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotalTaxAm').setValue(rec.get('A4076TTAX'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtTotal').setValue(rec.get('A4076NETO'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtCommission').setValue(rec.get('A4076COMI'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtRate').setValue(rec.get('A4076TCMBC'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtCommission2').setValue(rec.get('A4076TAXCO'));
        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-txtRate2').setValue(rec.get('A4076TCMBT'));

        Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-win').mask('Please Wait....');
        Ext.Ajax.request({
            url: me.urlWin01 + '/SearchUATPRFNDetail/',
            method: 'POST',
            timeout: '300000',
            params: {
                IN_PREME: Ext.String.trim(rec.get('A4076PREME')),
                IN_ANIO: Ext.String.trim(rec.get('A4076ANIO')),
                IN_CORR: rec.get('A4076CORR')
            },
            success: function (response, options) {
                Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-win').unmask();
                var res = Ext.JSON.decode(response.responseText);

                Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT').getStore().removeAll();
                Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridPAYMENT').getStore().loadData(res.lst_FOP);
                Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes').getStore().removeAll();
                Ext.getCmp(prototype.idMassiveRefunduatpFormTicket + '-gridListTaxes').getStore().loadData(res.lst_TAXES);
            }
        });
    },
    OnAirlineSummary: function (value, summaryData, dataIndex) {
        return Ext.util.Format.number(parseFloat(value), '0,000.00');
    },
    onColumnAmountRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.style = "background:#D5F4D5 !important";
        return Ext.util.Format.number(value, '0,000.00');
    },
    onClickCancel: function (btn) {
        this.view.close();
    },
    onColumnAirlineRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var me = this;
        metaData.style = "background:#D5F4D5 !important";
        // me.onSumaTaxGrid();
        return Ext.util.Format.number(value, '0,000.00');
    },
    

});

