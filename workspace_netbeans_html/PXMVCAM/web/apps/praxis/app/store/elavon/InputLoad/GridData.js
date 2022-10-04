Ext.define('Ext.Praxis.store.elavon.InputLoad.GridData', {
    extend: 'Ext.data.Store',
    model: 'Ext.Praxis.model.elavon.InputLoad.GridData',   
    autoLoad: true,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'GET'
        },
        timeout: 60000000,
        reader: {
            keepRawData: true,
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'total'
        }
    }
});
