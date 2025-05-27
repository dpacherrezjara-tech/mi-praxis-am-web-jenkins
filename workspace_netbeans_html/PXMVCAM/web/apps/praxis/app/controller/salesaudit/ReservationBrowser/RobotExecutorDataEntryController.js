Ext.define('Ext.Praxis.controller.salesaudit.ReservationBrowser.RobotExecutorDataEntryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RobotExecutorDataEntryController',
    url: CONTEXTPATH + '/ReservationBrowser',
    init: function (view) {
    },
    afterRender: async function () {

    },
    onProcessClick: async function () {
        const me = this;
        const tipo = Ext.getCmp(prototype.idDE2 + '-cmbTipo');
        const panelParams = Ext.getCmp(prototype.idDE2 + '-formParams').getForm();
        const panelFile = Ext.getCmp(prototype.idDE2 + '-formFile').getForm();
        if (tipo.value === 'P') {
            let params = Object.assign({}, {
                IN_CCUST: '139',
                IN_OPTION: 'T',
                ...panelParams.getValues()
            });
            const res = await fetch(`${me.url}/processRobotByParams`, {
                method: 'POST',
                body: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.ok) {
                let responseBody = await res.json(); 
                console.log("dp: RobotExecutorDataEntryController responseBody = ", responseBody);
                let sqlRes = parseInt(responseBody.SQLRES);
                let sqlMsg = responseBody.SQLMSG;

                if (sqlRes === 1) {
                    Ext.Msg.alert('Éxito', sqlMsg);
                    const searchBtn = Ext.getCmp(prototype.id + '-btnSearch');
                    if (searchBtn) {
                        searchBtn.fireEvent('click', searchBtn);
                    }
                    
                    Ext.getCmp(prototype.id + '-PnrsGrid-1').getStore().load();
                    me.view.close();
                } else {
                    Ext.Msg.alert('Atención', 'El proceso no se ejecutó correctamente: ' + sqlMsg);
                }
            } else {
                let errorBody = await res.text();
                Ext.Msg.alert('Error', `Error al procesar: ${res.status} - ${errorBody}`);
            }
        } else {
            if (panelFile.isValid()) {
                panelFile.submit({
                    url: `${me.url}/processRobotByExcel`, // URL del servidor donde se enviará el archivo
                    waitMsg: 'Subiendo archivo...',
                    success: function (fp, o) {
                        Ext.Msg.alert('Éxito', 'El archivo se ha subido correctamente.');
                    },
                    failure: function (fp, o) {
                        // Manejar diferentes códigos de estado HTTP
                        if (o.response.status === 200) {
                            Ext.Msg.alert('Éxito', 'El archivo se ha subido correctamente.');
                        } else {
                            Ext.Msg.alert('Error', 'Form submission failed!');
                        }
                    }
                });
            }
        }
    },
    onChangeType: function (btn) {
        const panelParams = Ext.getCmp(prototype.idDE2 + '-formParams');
        const panelFile = Ext.getCmp(prototype.idDE2 + '-formFile');
        if (btn.value === 'X') {
            panelFile.show();
            panelParams.hide();
        } else {
            panelFile.hide();
            panelParams.show();
        }
    },
    onCancelClick: function () {
        this.view.close();
    },
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
    }
    //</editor-fold>
});