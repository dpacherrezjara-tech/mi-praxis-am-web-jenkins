
Ext.define('Ext.Praxis.view.flown.ParametersNaturalDischargesForm.Grids.ParametersNaturalDischargesGrids', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-ParametersNaturalDischargesGrids',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    padding: '0 0 0 0',
    border: false,
    bodyStyle: 'background-color: #E3EAF9;',
    margin: '50 0 0 0',
    width: '100%',
    defaults: {
        border: false
    },
    items: [
        {
            xtype: 'grid',
            border: false,
            width: '98%',
            minHeight: 150,
            maxHeight: 600,
            scrollable: true,
            id: prototype.id + '-gridParametersNaturalDischarges',
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true,
                markDirty: false
            },
            columnLines: true,
            columns: {
                defaults: {
                    align: 'center',
                    menuDisabled: true,
                    sortable: true
                },
                items: [
                    {
                        text: 'RN',
                        xtype: 'rownumberer',
                        width: 40
                    },
                    {text: '', dataIndex: 'A4807CORRL', width: 100, hidden : true},
                    {text: 'Code', dataIndex: 'A4807CPARM', width: 100 , align: 'left'},
                    {text: 'Description', dataIndex: 'A4807DESCR', flex: 1, align: 'left'},
                    {text: 'Apply', dataIndex: 'A4807APLIC2', width: 60 , align: 'center'},
                    {text: 'Order', dataIndex: 'A4807ORDEN', width: 60 , align: 'center'},
                    {
                        text: 'Parameters',
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        columns: [
                            {text: '1º Value', dataIndex: 'A4807PARM1', width: 100},
                            {text: '2º Value', dataIndex: 'A4807PARM2', width: 100}
                        ]
                    },
                    {text: 'File', dataIndex: 'A4807ARCHI', width: 80 , align: 'center'},
                    {
                        text: 'Status', dataIndex: 'A4807ESTAD', width: 60, align: 'center',
                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                            //metaData.style = "text-align:center;font-weight:bold;";
                            //value = '<b>'+value+'</b>';                                            
                            var html = '<img src="resources/img/semaforo/Circle_Green.png" title="Parametro activo" >';
                            if ( value === 'D' )
                            var html = '<img src="resources/img/semaforo/Circle_Silver.png" title="Parametro desactivado" >';                                                
                            return html;
                        }
                    },
                    {
                        text: 'Detail',
                        xtype: 'actioncolumn',
                        sortable: false,
                        width: 50,
                        align: 'center',
                        items: [
                            {
                                getClass: function (value, metadata, record) {
                                    return 'prx-icon-detail';
                                },
                                tooltip: 'Detail',
                                handler: 'openParameter'
                            }
                        ]
                    }
                    
                ]
            }
        }
    ]
});