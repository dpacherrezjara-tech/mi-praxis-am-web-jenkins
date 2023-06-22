var valor = '0';
Ext.define('Ext.Praxis.view.payments.ReconciliationPaymentForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
    requires: [
        //<editor-fold defaultstate="collapsed" desc="Summary Requires">
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.MainSummary',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetSummary',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetTaxes',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetSubmission',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetTransaction',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DiffTransaction',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetPricing',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetChargeback',
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Settlement Requires">
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.MainSettlement',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.Settlement',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetSettlement',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetailTktSettlement',
        //</editor-fold>
        //<editor-fold defaultstate="collapsed" desc="Transaction Error Requires">
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.SummaryTransactionError',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.MainErrorTransaction',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetDay',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetMerchant',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetBankByS',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.MainAdjustment',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetDayByS',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetMerchant',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.DetMerchantByS',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.ByMerchant',
        'Ext.Praxis.view.payments.ReconciliationPaymentForm.DataGrids.MainChangePayment',
        //</editor-fold>
    ],
    layout: 'border',
    align: 'center',
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: 1850,
                height: 'auto',
                align: 'center'
            },
            items: [
                {
                    xtype: 'panel',
                    id: prototype.id + '-panelMain',
                    bodyStyle: 'background-color: #E3EAEF;',
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        //<editor-fold defaultstate="collapsed" desc="RB Summary">
                        {
                            xtype: prototype.id + '-DataGridMainSummary',
                            id: prototype.id + '-boxMainSummary'
                        },
                        {
                            xtype: prototype.id + '-DataGridDetSummary',
                            id: prototype.id + '-panelGridData'
                        },
                        {
                            xtype: prototype.id + '-DataGridDetTaxes',
                            id: prototype.id + '-boxDetTaxes'
                        },
                        {
                            xtype: prototype.id + '-DataGridDetSubmission',
                            id: prototype.id + '-boxDetSubmission'
                        },
                        {
                            xtype: prototype.id + '-DataGridDetTransaction',
                            id: prototype.id + '-boxDetTransaction'
                        },
                        {
                            xtype: prototype.id + '-DataGridDiffTransaction',
                            id: prototype.id + '-boxDiffTransaction'
                        },
                        {
                            xtype: prototype.id + '-DataGridDetPricing',
                            id: prototype.id + '-boxDetPricing'
                        },
                        {
                            xtype: prototype.id + '-DataGridDetChargeback',
                            id: prototype.id + '-boxDetChargeback'
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="RB Settlement">
                        {
                            xtype: prototype.id + '-DataGridMainSettlement',
                            id: prototype.id + '-boxMainSettlement'
                        },
                        {
                            xtype: prototype.id + '-DataGridSettlement',
                            id: prototype.id + '-boxSettlement'
                        },
                        {
                            xtype: prototype.id + '-DataGridDetSettlement',
                            id: prototype.id + '-boxDetSettlement'
                        },
                        {
                            xtype: prototype.id + '-DataGridDetailTktSettlement',
                            id: prototype.id + '-boxDetailTktSettlement'
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="RB Transaction Error">
                        {
                            xtype: prototype.id + '-DataGridSummaryTransactionError',
                            id: prototype.id + '-boxSummaryTransactionError'
                        },
                        {
                            xtype: prototype.id + '-DataGridMainErrorTransaction',
                            id: prototype.id + '-boxMainErrorTransaction'
                        },
                        {
                            xtype: prototype.id + '-DataGridDetDay',
                            id: prototype.id + '-boxDetDay',
                        },
                        {
                            xtype: prototype.id + '-DataGridDetMerchant',
                            id: prototype.id + '-boxDetMerchant',
                        },
                        {
                            xtype: prototype.id + '-DataGridDetBankByS',
                            id: prototype.id + '-boxDetBankByS',
                        },
                        {
                            xtype: prototype.id + '-DataGridMainAdjustment',
                            id: prototype.id + '-boxMainAdjustment'
                        },
                        {
                            xtype: prototype.id + '-DataGridDetDayByS',
                            id: prototype.id + '-boxDetDayByS',
                        },
                        {
                            xtype: prototype.id + '-DataGridDetMerchantByS',
                            id: prototype.id + '-boxDetMerchantByS',
                        },
                        {
                            xtype: prototype.id + '-DataGridByMerchant',
                            id: prototype.id + '-boxByMerchant',
                        },
                        {
                            xtype: prototype.id + '-DataGridMainChangePayment',
                            id: prototype.id + '-boxMainChangePayment',
                        },
                        //</editor-fold>
                        //<editor-fold defaultstate="collapsed" desc="pie">
                        {
                            xtype: 'panel',
                            id: prototype.id + '-pie',
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            border: true,
                            width: 1132,
                            hidden: true,
                            height: 25,
                            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                            items: [
                                {
                                    xtype: 'panel',
                                    width: 1132,
                                    height: 25,
                                    layout: {
                                        type: 'hbox',
                                        pack: 'center'
                                    },
                                    defaults: {
                                        xtype: 'label'
                                    },
                                    items: [
                                        {
                                            text: 'Page',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-currentPage',
                                            text: '1',
                                            width: 50
                                        },
                                        {
                                            text: 'Of',
                                            width: 50
                                        },
                                        {
                                            id: prototype.id + '-lbl-pageCount',
                                            text: '0',
                                            width: 50
                                        },
                                        {xtype: 'tbspacer', width: 100},
                                        {
                                            text: 'Total found',
                                            width: 80
                                        },
                                        {
                                            id: prototype.id + '-lbl-total',
                                            text: '0',
                                            width: 50
                                        }
                                    ]
                                }
                            ]
                        }
                        //</editor-fold>
                    ]
                },
                {
                    region: 'south',
                    layout: 'border',
                    height: 0,
                    defaults: {
                        style: 'margin: 1px;',
                        bodyStyle: 'background: transparent;',
                        border: false
                    }
                }
            ]
        }
    ]
}
);


