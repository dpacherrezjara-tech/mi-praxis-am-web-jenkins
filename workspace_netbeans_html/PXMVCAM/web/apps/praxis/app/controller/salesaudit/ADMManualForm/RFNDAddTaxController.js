/*
 * Desarrollado por: Zenobio Perez
 * -------------------------------
 */
Ext.define('Ext.Praxis.controller.salesaudit.ADMManualForm.RFNDAddTaxController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RFNDAddTaxController',
    init: function (view) {
        var me = this;
        //console.log(this.view.params.vl_mda); 
    },
    /**
     * Se ejecuta luego de haber cargado todos los componentes
     */
    afterRender: function () {

    },
    onClickAdd: function () {
        var grid01 = Ext.getCmp(prototype.id01 + '-gridtaxAGENT');
        var regs = grid01.getStore().getCount();
        var beanDatos = {};
        if (Ext.getCmp( prototype.id02 + '-txttax').getValue() === '') {
            Ext.MessageBox.alert('.: PRAXIS :.', 'You must enter the tax code', function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp( prototype.id02 + '-txttax').focus();", 100);
            });
            return;
        }
        if (Ext.getCmp(prototype.id02 + '-txttaxamount').getValue() === 0 || Ext.getCmp(prototype.id02 + '-txttaxamount').getValue() === '0.00') {
            Ext.MessageBox.alert('.: PRAXIS :.', 'You must enter the amount of the tax', function (btn, text) {
                if (btn === 'ok' || btn === 'cancel')
                    setTimeout("Ext.getCmp(prototype.id02 + '-txttaxamount').focus();", 100);
            });
            return;
        }
        beanDatos.A1673CDTAX = Ext.getCmp(prototype.id02 + '-txttax').getValue();
        beanDatos.A1673TXMIA = Ext.getCmp(prototype.id02 + '-txttaxamount').getValue();
        beanDatos.A1673MONED = Ext.getCmp(prototype.id01 + '-ComboCurrency').getValue();
        grid01.getStore().add(beanDatos);
        Ext.getCmp(prototype.id01 + '-win').getController().onSumaTaxGrid();
    },
    onchange: function (field, newValue, oldValue) {
        field.setValue(newValue.toUpperCase());
    },
    onAmountRenderer: function (field, newValue, oldValue) {
        field.setValue(Ext.util.Format.number(newValue, '0,000.00'));
    },
    onClickCancel: function (btn) {
        this.view.close();
    }

});