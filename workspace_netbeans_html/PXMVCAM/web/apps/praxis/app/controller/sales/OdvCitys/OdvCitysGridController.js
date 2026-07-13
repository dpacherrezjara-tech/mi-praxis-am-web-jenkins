Ext.define('Ext.Praxis.controller.sales.OdvCitys.OdvCitysGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.OdvCitysGridController',
    afterRender: function (obj, e) {
        const me = this;
        const view = me.view;
        this.getData(view);
    },
    getData: async function (view) {
        console.log('view', view);
        let store = global.callStorePaggin('PRAXISBI', 'SQP05813', view.searchParams);
        console.log('stores', store)
        this.view.setStore(store);

        /*
         * 
         *  const response = store.lstRs?.at(0) || {};
         if (!response || Object.keys(response).length === 0) {
         global.Msg({msg: 'Data not Found'});
         return;
         }
         view.setStore(response);
         */
    },

    downloadExcel: function () {  //modal confirmar descarga
        const me = this;
        const notifier = new AWN();
        notifier.confirm(
                'Download Excel',
                () => {
            me.onDownloadExcel();
        },
                null
                );
    },
    
    onDownloadExcel: async function () {
        const me = this;
        const view = me.view;
        view.setLoading(true);
        let res = await global.callStorePagginExcel('PRAXISBI', 'SQP05813', view.searchParams);  //trae toda la data completa

        const data = (res?.length > 0)
                ? res.map(x => ({
                        DestinationCode: x.A2936CATTO,
                        DestinationName: x.A2936NATTO,

                        CityCode: x.A2936CCITY,
                        CityName: x.A2936NCITY,

                        CountryCode: x.A2936CPAIS,
                        CountryName: x.A2936NPAIS,

                        ZoneCode: x.A2936IDZON,
                        ZoneName: x.A2936NZONE,

                        RegionCode: x.A2936CREGI,
                        RegionName: x.A2936NREGI,

                        SubRegionCode: x.A2936CSREG,
                        SubRegionName: x.A2936NCSRG,

                        Hub: x.A2936IDHUB,
                        Gateway: x.A2936GATTO,

                        CreatedUser: x.A2936INGRE,
                        CreatedDate: x.A2936FINGR,
                        CreatedTime: x.A2936HINGR,

                        UpdatedUser: x.A2936MODIF,
                        UpdatedDate: x.A2936FMODI,
                        UpdatedTime: x.A2936HMODI,
                    }))
                : [{
                        DestinationCode: "",
                        DestinationName: "",

                        CityCode: "",
                        CityName: "",

                        CountryCode: "",
                        CountryName: "",

                        ZoneCode: "",
                        ZoneName: "",

                        RegionCode: "",
                        RegionName: "",

                        SubRegionCode: "",
                        SubRegionName: "",

                        Hub: "",
                        Gateway: "",

                        CreatedUser: "",
                        CreatedDate: "",
                        CreatedTime: "",

                        UpdatedUser: "",
                        UpdatedDate: "",
                        UpdatedTime: "",
                    }];



        await global.writeExcelFromJson(data, 'OdvCitys Information'); // formatea la data para usarlo en la función de descarga
        view.setLoading(false);
    },

    onEditOdvCitys: function (grid, rowIndex, colIndex) {

        const record = grid.getStore().getAt(rowIndex);
        console.log('on Add');

        const cleanData = {};
        Ext.Object.each(record.data, function (key, value) {
            if (value != null) {
                cleanData[key] = String(value).trimEnd();
            } else {
                cleanData[key] = value; 
            }
        });

        const params = me.view;
        const dataEntry = Ext.create('Ext.Praxis.view.sales.OdvCitysForm.DataEntrys.DataEntryOdvCitys', {
            id: prototype.id + '-DataEntryOdvCitys',
            option: 'U',
            record: cleanData,
            gridId: grid
        });
        dataEntry.show();
    }
});


