
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
            width: '50%',
            minHeight: 150,
            maxHeight: 570,
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
                        width: 40,
                        dataIndex: 'A4807POSIT'
                    },
                    {text: 'Detalle', dataIndex: 'A4807DETAL', width: 750 , align: 'left'}
                    
                ]
            }
        }
    ]
});