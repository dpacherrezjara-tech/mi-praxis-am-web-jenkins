Ext.define('Ext.Praxis.controller.payments.ReconciliationDoublePayment.DetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DetailGridController',
    fecha: new Date(),
    url: CONTEXTPATH + '/SalesReconciliationDoublePay',
    init: function (view) {
        if (view.backButton) {
            let tbar = view.getDockedItems('toolbar[dock="top"]')[0];
            tbar.items.items[1].show();
        }
    },
    afterRender: async function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData({view: view});
    },
    getData: async function ( {view}) {
        view.mask('Loading...');
        const res = await fetch(`${view.url}/loadTrnxDesglose?${new URLSearchParams(view.searchParams)}`);
        if (res.ok) {
            const data = await res.json();
            if (data.response.length === 0) {
                global.Msg({msg: 'No Data'});
            }
            console.log(data.response);
            const store = Ext.create('Ext.data.Store', {
                data: data.response,
                pageSize: 20,
                proxy: {
                    type: 'memory',
                    enablePaging: true
                }
            });
            view.setStore(store);
        }
        view.unmask();
    },
    downloadExcel: function (btn) {
        const me = this;
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to download?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    animateTarget: btn,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            global.getFile(`${me.url}/downloadTrnxDesglose?${new URLSearchParams(me.view.searchParams)}`);
                        }
                    }
                });
    }
});


