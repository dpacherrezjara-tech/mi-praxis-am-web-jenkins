Ext.define('Ext.Praxis.controller.interline.UomqReport.UomqReportGroupDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.UomqReportGroupDataEntryController',
    groups:[],
    tickets:[],
    init: function (view) {
    },
    afterRender: async function () {
        this.loadData();
    },
    loadData: async function () {
        const me = this;
        me.view.setLoading(true);

        const form = Ext.getCmp(prototype.idDE + '-mainForm').getForm();
        form.reset();
        form.setValues(me.view.obj);
        
        const groupsGrid = Ext.getCmp(prototype.idDE + '-gridGroups');
        const ticketsGrid = Ext.getCmp(prototype.idDE + '-gridDetail');
        
        const {IDFILE} = me.view.obj;
        
        let params = {
            IN_IDFILE: IDFILE
        };
        
        try{
            const resGr = await global.callStoreGet('PRAXIS', 'SQP06007', params);
            
            me.groups = resGr.lstRs.at(0);
            
            let storeGr = new Ext.data.Store({
                pageSize: 20,
                data: me.groups,
                proxy: {
                    type: 'memory', // Los datos están cargados en memoria
                    enablePaging: true // Habilitar la paginación en memoria
                }
            });
            groupsGrid.setStore(storeGr);
            
            const resTkt = await global.callStoreGet('PRAXIS', 'SQP06008', params);
            
            me.tickets = resTkt.lstRs.at(0);
            
            let storeTk = new Ext.data.Store({
                pageSize: 20,
                data: me.tickets,
                proxy: {
                    type: 'memory', // Los datos están cargados en memoria
                    enablePaging: true // Habilitar la paginación en memoria
                }
            });
            ticketsGrid.setStore(storeTk);
        }catch (e) {
            
        }finally {
            me.view.center();
            me.view.setLoading(false);
        }
    },
    loadDetail: async function (idcont, filesq) {
        const me = this;

        const form = Ext.getCmp(prototype.idDEsequence + '-interfaceForm').getForm();
        form.reset();
        const seqGrid = Ext.getCmp(prototype.idDEsequence + '-gridSequences');
        const rejGrid = Ext.getCmp(prototype.idDEsequence + '-gridRejections');
        const newFileGrid = Ext.getCmp(prototype.idDEsequence + '-newFileGrid');
        try {
            const res = await global.callStoreGet('PRAXISMP', 'MPS463', {
                'IN_IDCONT': idcont,
                'IN_FILESQ': filesq
            });
            const det = res.lstRs.at(0).at(0);
            me.dataAcc = res.lstRs.at(1);
            me.dataRej = res.lstRs.at(2) || [];
            const newFileDet = res.lstRs.at(3) || [];

            global.cleanPXobj(det);
            form.setValues(det);

            const { STSAP } = det;
            me.changeView(STSAP);

            let storeSeq = new Ext.data.Store({
                pageSize: 20,
                data: me.dataAcc,
                proxy: {
                    type: 'memory', // Los datos están cargados en memoria
                    enablePaging: true // Habilitar la paginación en memoria
                }
            });

            let storeRej = new Ext.data.Store({
                pageSize: 20,
                data: me.dataRej,
                proxy: {
                    type: 'memory', // Los datos están cargados en memoria
                    enablePaging: true // Habilitar la paginación en memoria
                }
            });

            let storeFile = new Ext.data.Store({
                data: newFileDet
            });

            seqGrid.setStore(storeSeq);
            rejGrid.setStore(storeRej);
            newFileGrid.setStore(storeFile);
        } catch (error) {
            console.error(error);
        }
    },
    onCancelClick: function () {
        this.view.close();
    },
});