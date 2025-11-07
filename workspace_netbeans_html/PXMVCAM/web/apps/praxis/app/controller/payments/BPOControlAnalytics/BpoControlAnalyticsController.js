Ext.define('Ext.Praxis.controller.payments.BPOControlAnalytics.BPOControlAnalyticsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.BPOControlAnalyticsController',
    // url3: CONTEXTPATH + '/MaintenanceAnalysts',

    
    OnBeforeShow: function () {},
    init: function (view) {},

    afterRender: async function (obj, e) {
        console.log('after render');
        await this.loadFilters();
    },

    onSearchClickBtn: function () {
        const mainPanel = Ext.getCmp(prototype.id + '-mainContent');
        mainPanel.removeAll();
        const filtro1 = Ext.getCmp(prototype.id + '-panelFilters');
        let params = filtro1.getForm().getValues();
        if (params.IN_USER === 'ALL') params.IN_USER = '';

        let grid = ''
        let idName = ''

        if(params.IN_TYPE==='AU'){
            grid = 'Ext.Praxis.view.payments.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsAnalisisGrid'
            idName = 'BPOControlAnalyticsAnalisisGrid'
        }else if(params.IN_TYPE==='RP'){
            grid = 'Ext.Praxis.view.payments.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsRankingGrid'
            idName = 'BPOControlAnalyticsRankingGrid'
        }else if(params.IN_TYPE==='RU'){
            grid = 'Ext.Praxis.view.payments.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsRendimientoGrid'
            idName = 'BPOControlAnalyticsRendimientoGrid'
        }else{
            grid = 'Ext.Praxis.view.payments.BPOControlAnalyticsForm.Grids.BPOControlAnalyticsAnalisisGrid'
            idName = 'BPOControlAnalyticsAnalisisGrid'
        }

        let orderedParams = {
            IN_OPTION: params.IN_OPTION,
            IN_CCUST: params.IN_CCUST,
            IN_DATEFROM: params.IN_DATEFROM,
            IN_DATETO: params.IN_DATETO,
            IN_USER: params.IN_USER,
            IN_PROCESADOR: params.IN_PROCESADOR,
            IN_TYPE: params.IN_TYPE
        };
        
        console.log('params', params);

        const newGrid = Ext.create(grid, {
            id: prototype.id + idName,
            searchParams: orderedParams
        });

        mainPanel.add(newGrid);

    },


    onClickFilterBtn: function (obj) {
        const panelFilter = Ext.getCmp(prototype.id + '-contentFilter');
        if (panelFilter.isVisible()) {
            panelFilter.hide();
        } else {
            panelFilter.show();
        }
    },

    onClickClearBtn: function (obj) {
        Ext.getCmp(prototype.id + '-panelFilters').getForm().reset();
    },


loadFilters: async function () {
    const filters = Ext.getCmp(prototype.id + '-contentFilter');
    filters.setLoading(true);

    const res = await global.callStoreGet('PRAXISMP', 'SQP05276', { IN_STATUS: '1' });
    const res2 = await global.callStoreGet('PXSAUDIT', 'SQP02745', { IN_CCUST: '139', IN_OPTION: '4' });

    console.log('res2', res2);

    const cmbProcessor = Ext.getCmp(prototype.id + '-cmbProctypef');
    const cmbUser = Ext.getCmp(prototype.id + '-txtUser');

    // global.setComboStore(cmbProcessor, res.lstRs.at(2), 'A4451KEY2', 'A4451DESC1', '');

    let procesor = res.lstRs?.[2] || [];
    procesor.unshift({ A4451KEY2: '', A4451DESC1: 'All' });

    const procesorStore = Ext.create('Ext.data.Store', {
        fields: ['A4451KEY2', 'A4451DESC1'],
        data: procesor
    });

    cmbProcessor.setStore(procesorStore);
    cmbProcessor.setValue(''); 


    let usuarios = res2.lstRs?.[0] || [];
    usuarios.unshift({ A4836USER: 'All', VALUE: '' });

    const userStore = Ext.create('Ext.data.Store', {
        fields: ['A4836USER', 'VALUE'],
        data: usuarios
    });

    cmbUser.setStore(userStore);
    cmbUser.setValue(''); 

    filters.setLoading(false);
},



    


    onSearchkey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.onSearchClick();
        }
    },

  

});


