/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id = 'FilesIssuesUsesForm';
prototype.url = CONTEXTPATH + '/FilesIssuesUses';
prototype.widthContenedor = 1300;
prototype.widthGrid = 980;
// </editor-fold>
  
Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.FilesIssuesUsesForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.FilesIssuesUsesForm',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FilesIssuesUsesController',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.FormFileIssue',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.FormFileUsed'
    ],
    controller: 'FilesIssuesUsesController',
    btnActive: 1,
    layout: {
        type: 'fit'
    },
    padding: 1,
    border: false,
    defaults: {
        border: false
    },
    items: [
        {
            id: prototype.id + '-main',
            border: false,
            bodyCls: 'colorFondo',
            layout: 'hbox',
            defaults: {
                border: false,
                autoScroll: true
            },
            items: [
                {
                    width: '10%',
                    height: '100%',
                    layout: 'vbox',
                    border: true,
                    padding: '2 1 1 1',
                    defaults: {
                        margin: '2 2 4 4'
                    },
                    items: [
                        {
                            html: '<h3>Files</h3>', border: false, margin: 4
                        },
                        {
                            xtype: 'button', width: '8rem', height: '2rem',
                            iconCls: 'prx-icon-polizas',
                            id: prototype.id + '-btn-issues',
                            style: 'background:#68A0EC',
                            text: 'Issues',
                            listeners: {
                                click: (e) => {
                                    this.btnActive = 1;
                                    setOnClickBtnActive(e.id, 1);
                                }
                            }
                        },
                        {
                            xtype: 'button', width: '8rem', height: '2rem',
                            text: 'Used', iconCls: 'prx-icon-image-facsimil',
                            id: prototype.id + '-btn-used',
                            listeners: {
                                click: (e) => {
                                    this.btnActive = 2;
                                    setOnClickBtnActive(e.id, 2);
                                }
                            }
                        },
                        {
                            xtype: 'button', width: '8rem', height: '2rem',
                            text: 'Expire', iconCls: 'prx-icon-incomplete',
                            id: prototype.id + '-btn-expire',
                            listeners: {
                                click: (e) => {
                                    this.btnActive = 3;
                                    setOnClickBtnActive(e.id, 3);
                                }
                            }
                        },
                        {
                            xtype: 'button', width: '8rem', height: '2rem',
                            text: 'Losses', iconCls: 'prx-icon-image-off',
                            id: prototype.id + '-btn-losses',
                            listeners: {
                                click: (e) => {
                                    this.btnActive = 4;
                                    setOnClickBtnActive(e.id, 4);
                                }
                            }
                        },
                        {
                            xtype: 'button', width: '8rem', height: '2rem',
                            text: 'Merge', iconCls: 'prx-icon-image-facsimil',
                            id: prototype.id + '-btn-merge',
                            listeners: {
                                click: (e) => {
                                    this.btnActive = 5;
                                    setOnClickBtnActive(e.id, 5);
                                }
                            }
                        },
                        {
                            xtype: 'button', width: '8rem', height: '2rem',
                            text: 'Airline Liability', iconCls: 'prx-icon-docum',
                            id: prototype.id + '-btn-liability',
                            listeners: {
                                click: (e) => {
                                    this.btnActive = 6;
                                    setOnClickBtnActive(e.id, 6);
                                }
                            }
                        }
                    ]
                },
                {
                    width: '90%',height: '100%',
                    padding: '2 1 1 1',
                    id: prototype.id + '-conten-panel',                    
                    border: false,                    
                    bodyStyle: 'background-color: white;',
                    items: [{}] //carga dinamica
                }
            ]
        }
    ]
});


getTypeForm = () => {
    switch (this.btnActive) {
        case 1:
            return prototype.id + '-formFileIssue';
            break;
        case 2:
            return prototype.id + '-formFileUsed';
            break;
        default:
            return '';
            break;
    }
};

setOnClickBtnActive = (btnId, index) => {
//    console.log(this.btnActive);
    Ext.getCmp(prototype.id + '-btn-issues').setStyle('background', '');
    Ext.getCmp(prototype.id + '-btn-used').setStyle('background', '');
    Ext.getCmp(prototype.id + '-btn-expire').setStyle('background', '');
    Ext.getCmp(prototype.id + '-btn-losses').setStyle('background', '');
    Ext.getCmp(prototype.id + '-btn-merge').setStyle('background', '');
    Ext.getCmp(prototype.id + '-btn-liability').setStyle('background', '');
    if (this.btnActive === index) {
        Ext.getCmp(btnId).setStyle('background', '#68A0EC'); //active
        //rednderizar objeto
        var panel = Ext.getCmp(prototype.id + '-conten-panel');
        panel.removeAll();
        if (getTypeForm() !== '') {
            var gridPanel = Ext.create({
                xtype: getTypeForm()
            });
            panel.add(gridPanel);
        }
    }

};