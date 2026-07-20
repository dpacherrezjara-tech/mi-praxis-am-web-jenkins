Ext.define('Ext.Praxis.controller.interline.UomqReport.UomqReportGroupDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.UomqReportGroupDataEntryController',
    groups: [],
    tickets: [],
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

        try {
            const resGr = await global.callStoreGet('PRAXIS', 'SQP06007', params);

            me.groups = resGr.lstRs.at(0);

            let storeGr = new Ext.data.Store({
                data: me.groups,
                pageSize: 25,
                proxy: {
                    type: 'memory', // Los datos están cargados en memoria
                    enablePaging: true // Habilitar la paginación en memoria
                }
            });
            groupsGrid.setStore(storeGr);

            const resTkt = await global.callStoreGet('PRAXIS', 'SQP06008', params);

            me.tickets = resTkt.lstRs.at(0);

            let storeTk = new Ext.data.Store({
                pageSize: 25,
                data: me.tickets,
                proxy: {
                    type: 'memory', // Los datos están cargados en memoria
                    enablePaging: true // Habilitar la paginación en memoria
                }
            });
            ticketsGrid.setStore(storeTk);
        } catch (e) {

        } finally {
            me.view.center();
            me.view.setLoading(false);
        }
    },
    onCancelClick: function () {
        this.view.close();
    },
    onSearchGroup: function () {
        const me = this;
        const grupo = Ext.getCmp(prototype.idDE + '-txtGroup').value;
        const gridGr = Ext.getCmp(prototype.idDE + '-gridGroups');

        if (grupo === '') {
            gridGr.setStore(new Ext.data.Store({data: me.groups,
                pageSize: 25,
                proxy: {
                    type: 'memory', // Los datos están cargados en memoria
                    enablePaging: true // Habilitar la paginación en memoria
                }
            }));
        } else {
            let newData = me.groups.filter(x => x.GRUPO.trim().includes(grupo));
            gridGr.setStore(new Ext.data.Store({data: newData}));
        }
    },
    exportGroups: async function () {

        const me = this;
        
        me.view.setLoading(true);

        let lst = me.groups;
        
        const optsStatus = {
          'Y':'Found',
          'N':'Not Found'
        };

        let lstJson = lst.map(x => {
            global.cleanPXobj(x);
            let obj = {
                'Group': x.GRUPO,
                'Status': optsStatus[x.GRSTS] || '',
                'Tickets': x.QTKTS,
                'Under': x.QUNDER,
                'Over': x.QOVER,
                'Match': x.QMATCH
            };
            return obj;
        });

        await global.writeExcelFromJson(lstJson, 'Group Summary Report');
        me.view.setLoading(false);
    },
    onSearchTicket: function () {
        const me = this;
        const ticket = Ext.getCmp(prototype.idDE + '-txtTicket').value;
        const gridGr = Ext.getCmp(prototype.idDE + '-gridDetail');

        if (ticket === '') {
            gridGr.setStore(new Ext.data.Store({data: me.tickets,
                pageSize: 25,
                proxy: {
                    type: 'memory', // Los datos están cargados en memoria
                    enablePaging: true // Habilitar la paginación en memoria
                }
            }));
        } else {
            let newData = me.tickets.filter(x => x.TICKET.trim().includes(ticket));
            gridGr.setStore(new Ext.data.Store({data: newData}));
        }
    },
    exportCoupons: async function () {

        const me = this;
        
        me.view.setLoading(true);

        let lst = me.tickets;
        
        const optsFlag = {
            'U': 'Under',
            'O': 'Over',
            'M': 'Match'
        };

        let lstJson = lst.map(x => {
        global.cleanPXobj(x);
        let obj = {
            'Group': x.GRUPO,
            'Class': x.CLASE,
            'Route': x.RUTA,
            'Debit': x.REDEBI,
            'Tax': x.TAX,
            'Net': x.NETO,
            'Comm.': x.COMISI,
            'Ticket': x.TICKET,
            'Coupon': x.CUPON,
            'Billing Gross': x.BILLGROSS,
            'Billing ISC': x.BILLISC,
            'Billing Porc %': x.BILLPORC,
            'Billing Tax': x.BILLTAX,
            'Miatech Gross': x.MIAGROSS,
            'Miatech ISC': x.MIAISC,
            'Miatech Porc %': x.MIAPORC,
            'Miatech Tax': x.MIATAX,
            'Codobs1': x.CODOBS1,
            'Codobs2': x.CODOBS2,
            'Codobs3': x.CODOBS3,
            'Codobs4': x.CODOBS4,
            'Codobs5': x.CODOBS5,
            'Commen1': x.COMMEN1,
            'Commen2': x.COMMEN2,
            'Commen3': x.COMMEN3,
            'Commen4': x.COMMEN4,
            'Commen5': x.COMMEN5,
            'Commen6': x.COMMEN6,
            'Botcrm': x.BOTCRM,
            'Buatrm': x.BUATRM,
            'Aotcrm': x.AOTCRM,
            'Auatrm': x.AUATRM,
            'Ahafrm': x.AHAFRM,
            'Avatrm': x.AVATRM,
            'Flag': optsFlag[x.FLAG] || 'Error'
        };
            return obj;
        });

        await global.writeExcelFromJson(lstJson, 'Coupons Report');
        me.view.setLoading(false);
    }
});