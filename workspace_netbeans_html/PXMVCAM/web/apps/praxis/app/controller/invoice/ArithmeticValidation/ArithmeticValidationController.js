Ext.define('Ext.Praxis.controller.invoice.ArithmeticValidation.ArithmeticValidationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ArithmeticValidationController',
    url: CONTEXTPATH + '/ArithmeticValidation',
    ticketParams: null,
    deletedRecords: [],
    init: function (view) {
        win.lblUser_toolTip("Estructura: A1946VALID|A1924NZ");
        prototype.id = 'ArithmeticValidationForm';
        prototype.url = CONTEXTPATH + '/ArithmeticValidation';
    },
    afterRender: async function () {
        this.onClickSearchBtn();
    },
    //<editor-fold defaultstate="collapsed" desc="Handlers">
    onClickSearchBtn: function () {
        this.searchTicketGrid();
    },
    onDisplayFilterBtn: function () {
        const panelFilters = Ext.getCmp(prototype.id + '-formFilters');
        if (panelFilters.isVisible())
            panelFilters.hide();
        else
            panelFilters.show();
    },
    onClearOptionsBtn: function () {
        const filters = Ext.getCmp(prototype.id + '-formFilters');
        filters.getForm().reset();
    },
    onEnterKeyPress: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.onClickSearchBtn();
        }
    },
    onClickTicket: async function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        const {A1946FPROC, A1946TRNCU, A1946TRNCO, A1946TIPO, A1946CIA, A1946FORMA, A1946SERIE} = record.data;
        let params = {
            IN_FPROC: A1946FPROC,
            IN_TRNCU: A1946TRNCU,
            IN_TRNCO: A1946TRNCO,
            IN_TIPO: A1946TIPO,
            IN_CIA: A1946CIA,
            IN_FORMA: A1946FORMA,
            IN_SERIE: A1946SERIE
        };
        this.ticketParams = params;
        this.searchInformation(params);
    },
    onDeleteRecord: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to delete?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.deleteDetailRecord(grid, record);
                        }
                    }
                });
    },
    onSaveClick: function () {
        Ext.Msg.show(
                {
                    title: '.:PRAXIS:.',
                    msg: 'Are you sure to save?',
                    buttons: Ext.MessageBox.YESNO,
                    scope: this,
                    icon: Ext.MessageBox.QUESTION,
                    modal: true,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            this.saveArithmetics();
                        }
                    }
                });
    },
    onDuplicateRecord: function (grid, td, rowIndex, cellIndex, e, record, tr, eOpts) {
        let newObj = Object.assign({}, record.data);
        newObj.A1924SEQ = null;
        newObj.A1924TOTLO = 0;
        newObj.A1924TOTRV = 0;
        newObj.A1924IVALO = 0;
        newObj.A1924IVARV = 0;
        newObj.OPTION = 'C';
        delete newObj.id;
        const newRecord = grid.getStore().add(newObj);
        Ext.defer(function () {
            let row = grid.getRow(newRecord[0]);
            if (row) {
                row.style.backgroundColor = '#BEF395';
            }
        }, 50);

        
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Functions">
    searchTicketGrid: async function () {
        let params = Ext.getCmp(prototype.id + '-formFilters')
                .getForm().getValues();
        const ticketGrid = Ext.getCmp(prototype.id + '-ticketsGrid');
        let store = Ext.create('Ext.data.Store', {
            loadMask: true,
            pageSize: 20,
            proxy: {
                type: 'ajax',
                enablePaging: true,
                url: `${me.url}/loadErrors`,
                extraParams: params,
                timeout: 600000,
                reader: {
                    type: 'json',
                    rootProperty: 'response'
                }
            },
            autoLoad: true,
            listeners: {
                load: function (store, records, successful, operation) {
                    if (!successful) {
                        global.Msg({msg: 'Data not Found'});
                    } else {
                        //console.log(records);
                        if (records.length === 0) {
                            global.Msg({msg: 'Data not Found'});
                        }
                    }
                }
            }
        });
        ticketGrid.setStore(store);
    },
    searchInformation: async function (params) {
        const me = this;
        me.deletedRecords = [];
        const panel = Ext.getCmp(prototype.id + '-panelInfo');
        panel.mask('Loading...');
        const gridTotals = Ext.getCmp(prototype.id + '-ticketTotals');
        gridTotals.getStore().removeAll();
        const gridDetails = Ext.getCmp(prototype.id + '-ticketDetails');
        gridDetails.getStore().removeAll();
        const res = await fetch(`${me.url}/loadInformation?${new URLSearchParams(params)}`);
        if (res.ok) {
            const data = await res.json();
            const response = data.response;
            console.log("Response: ", data);
            if (response.length > 0) {
                let totalsRecs = ['T', 'P', 'L'];
                let totals = response.filter(x => totalsRecs.includes(x.A1924TREGI));
                let storeTotals = new Ext.data.Store({
                    data: totals
                });
                gridTotals.setStore(storeTotals);
                let excludedValues = ['T', 'P', 'L', 'Z'];
                let details = response.filter(x => !excludedValues.includes(x.A1924TREGI));
                let fields = Object.keys(details.at(0));
                let storeDetails = new Ext.data.Store({
                    fields: fields, //Deben añadirse la columnas para el RowEditing
                    data: details,
                    autoLoad: true
                });
                gridDetails.setStore(storeDetails);
                me.changeDifferences();
                await me.searchInformationChild(params);
            } else {
                global.Msg({msg: 'Data not Found'});
            }
        }
        panel.unmask();
    },
    searchInformationChild: async function (params) {
        const me = this;
        let childParams = Object.assign({}, params);
        const gridTotals = Ext.getCmp(prototype.id + '-ticketTotals2');
        gridTotals.getStore().removeAll();
        const gridDetails = Ext.getCmp(prototype.id + '-ticketDetails2');
        gridDetails.getStore().removeAll();
        if (childParams.IN_TRNCO.trim().length === 5) {

            const opts = {
                'SALE1': 'SALE2',
                'SALE2': 'SALE1',
                'EXCA1': 'EXCA2',
                'EXCA2': 'EXCA1'
            };
            childParams.IN_TRNCO = opts[childParams.IN_TRNCO.trim()];
            const res = await fetch(`${me.url}/loadInformation?${new URLSearchParams(childParams)}`);
            if (res.ok) {
                const data = await res.json();
                const response = data.response;
                console.log("Response Child: ", data);
                if (response.length > 0) {
                    gridTotals.show();
                    gridDetails.show();
                    let totalsRecs = ['T', 'P', 'L'];
                    let totals = response.filter(x => totalsRecs.includes(x.A1924TREGI));
                    let storeTotals = new Ext.data.Store({
                        data: totals
                    });
                    gridTotals.setStore(storeTotals);
                    let excludedValues = ['T', 'P', 'L', 'Z'];
                    let details = response.filter(x => !excludedValues.includes(x.A1924TREGI));
                    let storeDetails = new Ext.data.Store({
                        data: details,
                        autoLoad: true
                    });
                    gridDetails.setStore(storeDetails);
                } else {
                    gridTotals.hide();
                    gridDetails.hide();
                }
            }
        } else {
            gridTotals.hide();
            gridDetails.hide();
        }
    },
    enableSaveButton: function (differences) {
        const btnSave = Ext.getCmp(prototype.id + '-btn-save');
        const errMsg = Ext.getCmp(prototype.id + '-calculationError');
        const okMsg = Ext.getCmp(prototype.id + '-calculationMatch');
        const {A1924TOTLO, A1924TOTRV, A1924IVALO, A1924IVARV} = differences;
        if (A1924TOTLO === 0 && A1924TOTRV === 0 & A1924IVALO === 0 && A1924IVARV === 0) {
            btnSave.setDisabled(false);
            okMsg.show();
            errMsg.hide();
        } else {
            btnSave.setDisabled(true);
            okMsg.hide();
            errMsg.show();
        }
    },
    changeDifferences: function () {
        const me = this;
        const gridDiff = Ext.getCmp(prototype.id + '-ticketDiffs');
        const storeTotals = Ext.getCmp(prototype.id + '-ticketTotals').getStore();
        const storeDetails = Ext.getCmp(prototype.id + '-ticketDetails').getStore();
        try {
            let totalRecord = storeTotals.query('A1924TREGI', 'T').items.at(0);
            let totalTotlo = totalRecord.get('A1924TOTLO');
            let totalTotre = totalRecord.get('A1924TOTRV');

            let ivaRecords = storeDetails.query('A1924TREGI', 'I');
            let totalIvalo = ivaRecords.items.reduce((total, record) => {
                return total + record.get('A1924TOTLO');
            }, 0);
            let totalIvarv = ivaRecords.items.reduce((total, record) => {
                return total + record.get('A1924TOTRV');
            }, 0);

            let detailRecords = storeDetails.queryBy((record) => {
                return record.get('A1924TREGI') !== 'I';
            });

            let detailTotlo = detailRecords.items.reduce((total, record) => {
                return total + record.get('A1924TOTLO');
            }, 0);
            let detailTotrv = detailRecords.items.reduce((total, record) => {
                return total + record.get('A1924TOTRV');
            }, 0);
            let detailIvalo = detailRecords.items.reduce((total, record) => {
                return total + record.get('A1924IVALO');
            }, 0);
            let detailIvarv = detailRecords.items.reduce((total, record) => {
                return total + record.get('A1924IVARV');
            }, 0);

            let differences = {
                A1924CIA: totalRecord.get('A1924CIA'),
                A1924FORMA: totalRecord.get('A1924FORMA'),
                A1924SERIE: totalRecord.get('A1924SERIE'),
                A1924AGRUP: 'Differences',
                A1924TOTLO: me.redondea05Decimales(totalTotlo - (detailTotlo + totalIvalo)),
                A1924TOTRV: me.redondea05Decimales(totalTotre - (detailTotrv + totalIvarv)),
                A1924IVALO: me.redondea05Decimales(totalIvalo - detailIvalo),
                A1924IVARV: me.redondea05Decimales(totalIvarv - detailIvarv)
            };
            console.table(differences);
            gridDiff.setStore(new Ext.data.Store({
                data: [differences]
            }));
            me.enableSaveButton(differences);
        } catch (e) {
            console.error(e);
        }

    },
    deleteDetailRecord: function (grid, record) {
        if (record.get('OPTION') !== 'C') {
            record.set('OPTION', 'D');
            this.deletedRecords.push(record);
        }
        grid.getStore().remove(record);
        this.changeDifferences();
    },
    saveArithmetics: async function () {
        const me = this;
        const gridDetails = Ext.getCmp(prototype.id + '-ticketDetails')
                .getStore();
        let crudItems = [];
        let crudOptions = ['C', 'U'];
        let crudRecords = gridDetails.queryBy((record) => {
            return crudOptions.includes(record.get('OPTION'));
        });
        crudRecords.items.forEach(x => {
            crudItems.push(me.requestObjectSP(x.data));
        });
        me.deletedRecords.forEach(x => {
            crudItems.push(me.requestObjectSP(x.data));
        });
        console.log(crudItems);
        if (crudItems.length > 0) {
            me.arithmeticsMaintenance(crudItems);
        } else {
            global.Msg({msg: 'Invalid Arguments'});
        }
    },
    arithmeticsMaintenance: async function (crudItems) {
        const me = this;
        const panelInfo = Ext.getCmp(prototype.id + '-panelInfo');
        panelInfo.mask('Loading...');
        const res = await fetch(`${me.url}/arithmeticsMaintenance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(crudItems)
        });
        if (res.ok) {
            const data = await res.json();
            data.forEach((obj, i) => {
                me.showToast(obj.SQLMSG, i * 100, 't');
            });
            me.searchInformation(me.ticketParams);
        }
        panelInfo.unmask();
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Listeners">
    onBeforeEditDetailCell: function (editor, context, eOpts) {
        // Verificar el valor de la columna 'A1924TREGI'
        if (context.record.get('A1924TREGI') === 'I') {
            // Si el status es 'inactive', cancelar la edición
            return false;
        }
    },
    onEditDetailCell: function (editor, context, eOpts) {
        const me = this;
        // Restaurar el color de fondo original cuando se completa la edición
        /*
         let grid = context.grid,
         view = grid.getView(),
         cell = view.getCell(context.rowIdx, context.colIdx);*/
        let record = context.record;
        const {A1924TOTLO, A1924TOTRV, A1924IVA} = record.data;
        let percent = Number(A1924IVA) / 100;
        if (context.field === 'A1924TOTLO') {
            let ivalo = me.redondea05Decimales(A1924TOTLO * percent);
            record.set('A1924IVALO', ivalo);
        } else if (context.field === 'A1924TOTRV') {
            let ivarv = me.redondea05Decimales(A1924TOTRV * percent);
            record.set('A1924IVARV', ivarv);
        }

        if (record.get('OPTION') !== 'C') {
            record.set('OPTION', 'U');
            // Cambiar el color de la celda editada
            //Ext.fly(cell).setStyle('background-color', 'yellow');
            Ext.fly(context.row).setStyle('background-color', 'yellow');
        }
        //CALCULA DIFERENCIAS
        me.changeDifferences();
    },
    //</editor-fold>
    //<editor-fold defaultstate="collapsed" desc="Utilitarios">
    getCmp: function ( {id}){
        return Ext.getCmp(prototype.id + id);
    },
    setComboStore: function ( {cmp, data, valueField, displayField, value}){
        const me = this;
        cmp.suspendEvents(false);
        cmp.bindStore(me.createComboStore({data: data
            , valueField: valueField, displayField: displayField}));
        cmp.setValue(value);
        cmp.resumeEvents();
    },
    createComboStore: function ( {data, valueField, displayField}) {
        //crea record vacio
        let allRecord = {};
        allRecord[displayField] = 'All';
        allRecord[valueField] = '';
        //limpia record de data
        data.forEach(obj => {
            for (let attr in obj) {
                if (typeof obj[attr] === 'string') {
                    obj[attr] = obj[attr].trimEnd();
                }
            }
        });
        //crea Store
        let store = this.createStore({data: data});
        //inserta record vacio
        store.insert(0, allRecord);
        //console.log('store creado',store);
        return store;
    },
    createArrayStore: function ( {data}){
        const store = new Ext.data.SimpleStore({
            fields: ['code', 'name'],
            data: data.map(x => {
                return [x.code, x.name];
            })
        });
        return store;
    },
    createStore: function ( {data}){
        return Ext.create('Ext.data.Store', {
            autoLoad: true,
            data: data,
            pageSize: 20
        });
    },
    parseInt: function (number) {
        if (number && number !== '') {
            return parseInt(number);
        }
        ;
        return number;
    },
    getDistinct: function (lst, key) {
        let valoresVistos = {};
        // Filtra el array para eliminar duplicados según la columna "nombre"
        let resultado = lst.filter(function (item) {
            if (valoresVistos[item[key]]) {
                // Si el valor ya se ha visto, exclúyelo
                return false;
            }
            // Si es la primera vez que se ve, márcalo como visto y manténlo en el resultado
            valoresVistos[item[key]] = true;
            return true;
        });
        return resultado;
    },
    limpiaObjetoPX: function (obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key].trimEnd();
            }
        }
    },
    requestObjectSP: function (jsonData) {
        const resultado = {};
        for (const clave in jsonData) {
            if (jsonData.hasOwnProperty(clave)) {
                // Convierte la clave a mayúsculas y añade "IN" como prefijo
                const nuevaClave = `IN_${clave.toUpperCase()}`;

                // Asigna el valor original a la nueva clave
                resultado[nuevaClave] = jsonData[clave];
            }
        }
        return resultado;
    },
    requestObjectPX: function (jsonData) {
        const resultado = {};
        for (const clave in jsonData) {
            if (jsonData.hasOwnProperty(clave)) {
                // Convierte la clave a mayúsculas y añade "IN" como prefijo
                const nuevaClave = `${clave.toUpperCase()}`;

                // Asigna el valor original a la nueva clave
                resultado[nuevaClave] = jsonData[clave];
            }
        }
        return resultado;
    },
    redondea05Decimales: function (num) {
        let rounded = Math.round(num * 100) / 100; // Redondear a dos decimales
        // Si el decimal es exactamente 0.5, redondear hacia arriba
        if (rounded % 1 === 0.5) {
            rounded = Math.ceil(rounded); // Redondear hacia arriba
        }
        return Number(rounded.toFixed(2)); // Devolver el número redondeado con dos decimales como cadena
    },
    showToast: function (message, delay, align) {
        Ext.defer(function () {
            Ext.toast({
                html: `<b>${message}</b>`,
                title: 'Notification',
                closable: true,
                align: align || 't', // Default to top if align not provided
                slideInDuration: 400,
                minWidth: 200
            });
        }, delay);
    }
    //</editor-fold>
});