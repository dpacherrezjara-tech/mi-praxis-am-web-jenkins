Ext.define('Ext.Praxis.view.flown.IvaReportForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-info',
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
            id: prototype.id + '-boxMainData',
            hidden: false,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                border: false,
                width: prototype.widthGrid,
                height: 510,
                align: 'center'
            },
            items: [
                {
                    xtype: 'grid',
                    id: prototype.id + '-gridData',
                    width: prototype.widthGrid,
                    height: 510,
                    hidden: false,
                    columnLines: true,
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: true,
                            align: 'center'
                        },
                        items: [
                            {text: 'Nbr', width: 50, dataIndex: 'RN'},
                            {text: 'AIRCODE', width: 75, dataIndex: 'AIRCODE'},
                            {text: 'AIRNAME', width: 100, dataIndex: 'AIRNAME'},
                            {text: 'AUDIT',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    columnLines: true
                                },
                                columns: [
                                    {text: 'TICKET', width: 100, dataIndex: 'TICKET'},
                                    {text: 'CUPON', width: 75, dataIndex: 'CUPON'},
                                    {text: 'SEQ', width: 75, dataIndex: 'SEQ'},
                                    {text: 'DFLIGHT', width: 75, dataIndex: 'DFLIGHT'},
                                    {text: 'NFLIGHT', width: 75, dataIndex: 'NFLIGHT'},
                                    {text: 'CARR', width: 75, dataIndex: 'CARR'},
                                    {text: 'ORI', width: 75, dataIndex: 'ORI'},
                                    {text: 'DES', width: 75, dataIndex: 'DES'},
                                    {text: 'AMOUREV', width: 75, dataIndex: 'AMOUREV'},
                                    {text: 'TCREV', width: 75, dataIndex: 'TCREV'},
                                    {text: 'AMOULOC', width: 150, dataIndex: 'AMOULOC'},
                                    {text: 'CTACONT', width: 320, dataIndex: 'CTACONT'},
                                    {text: 'CTA', width: 75, dataIndex: 'CTA'},
                                    {text: 'SUBCTA', width: 75, dataIndex: 'SUBCTA'},
                                    {text: 'PERIODO', width: 75, dataIndex: 'PERIODO'},
                                    {text: 'TITULO', width: 220, dataIndex: 'TITULO'},
                                ]
                            },
                            {text: 'TIPOING', width: 150, dataIndex: 'TIPOING'},
                            {text: 'ITEM', width: 75, dataIndex: 'ITEM'},
                            {text: 'CLASOD', width: 75, dataIndex: 'CLASOD'},
                            {text: 'TIDOCOD', width: 75, dataIndex: 'TIDOCOD'},
                            {text: 'TITRANOD', width: 75, dataIndex: 'TITRANOD'},
                            {text: 'VOLINVOL', width: 75, dataIndex: 'VOLINVOL'},
                            {text: 'RUTAOD', width: 150, dataIndex: 'RUTAOD'},
                            {text: 'SEGUN OD',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    columnLines: true
                                },
                                columns: [
                                    {text: 'BASEGRAOD', width: 150, dataIndex: 'BASEGRAOD'},
                                    {text: 'IVAOD', width: 75, dataIndex: 'IVAOD'},
                                    {text: 'OD', width: 75, dataIndex: 'OD'},
                                    {text: 'CNXOD', width: 75, dataIndex: 'CNXOD'},
                                    {text: 'TASAOD', width: 75, dataIndex: 'TASAOD'}
                                ]
                            },
                            {text: 'SEGUN CALCULO VTA',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    columnLines: true
                                },
                                columns: [
                                    {text: 'CURRLOCVT', width: 150, dataIndex: 'CURRLOCVT'},
                                    {text: 'RUTFCALVT', width: 150, dataIndex: 'RUTFCALVT'},
                                    {text: 'TARIFALOC', width: 150, dataIndex: 'TARIFALOC'},
                                    {text: 'YQLOCVT', width: 75, dataIndex: 'YQLOCVT'},
                                    {text: 'IVALOCVT', width: 75, dataIndex: 'IVALOCVT'},
                                    {text: 'IVAVTA', width: 75, dataIndex: 'IVAVTA'},
                                    {text: 'BASEGRAVT', width: 150, dataIndex: 'BASEGRAVT'},
                                    {text: 'TASAIVAVT', width: 150, dataIndex: 'TASAIVAVT'}
                                ]
                            },
                            {text: 'SEGUN OD FARE CALC',
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center',
                                    columnLines: true
                                },
                                columns: [
                                    {text: 'BASEGRAOD2', width: 150, dataIndex: 'BASEGRAOD2'},
                                    {text: 'IVAOD2', width: 75, dataIndex: 'IVAOD2'},
                                    {text: 'ODFCALVT', width: 75, dataIndex: 'ODFCALVT'},
                                    {text: 'RUTFCALOD', width: 150, dataIndex: 'RUTFCALOD'},
                                    {text: 'CNXIR', width: 75, dataIndex: 'CNXIR'},
                                    {text: 'TASAOD2', width: 75, dataIndex: 'TASAOD2'}
                                ]
                            }
                        ]
                    }
                },
                {
                    xtype: 'panel',
                    id: prototype.id + '-pie',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    border: true,
                    height: 25,
                    bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
                    defaults: {
                        border: true
                    },
                    padding: '1px 0px 1px 0px',
                    items: [
                        {
                            xtype: 'panel',
                            width: prototype.widthGrid,
                            height: 25,
                            layout: {
                                type: 'hbox',
                                pack: 'center'
                            },
                            defaults: {
                                xtype: 'label',
                                margin: '3px 0px 0px 5px'
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
            ]
        },
        {
            region: 'south',
            layout: 'border',
            height: 0,
            defaults: {
                style: 'margin: 2px;',
                bodyStyle: 'background: transparent;',
                border: false
            },
            items: [
            ]
        }
    ]
});
