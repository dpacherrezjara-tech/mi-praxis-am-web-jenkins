// <editor-fold defaultstate="collapsed" desc="prototype">
prototype.id01 = 'FilesIssuesUsesForm';
//ISSUES
prototype.id02 = 'FormFileIssue';
prototype.id03 = 'FormFileIssueDataEntry';
prototype.id04 = 'FormFileIssueDataEntryHeader'; // pendiente
prototype.id05 = 'FormFileIssueDataEntryDetail';
//USED
prototype.id06 = 'FormFileUsed';
prototype.id07 = 'FormFileUsedDataEntry';
prototype.id08 = 'FormFileUsedDataEntryHeader';
prototype.id09 = 'FormFileUsedDataEntryDetail';
prototype.id10 = 'FormFileUsedDataEntryDetailN2';
//EXPIERE
prototype.id11 = 'FormFileExpire';
prototype.id12 = 'FormFileExpireDataEntry';
prototype.id13 = 'FormFileExpireDataEntryHeader';
prototype.id14 = 'FormFileExpireDataEntryDetail';
//LOSSES
prototype.id15 = 'FormFileLosses';
prototype.id16 = 'FormFileLossesDataEntry';
//MERGE
prototype.id17 = 'FormFileMerge';
prototype.id18 = 'FormFileMergeDataEntry';
prototype.id19 = 'FormFileMergeDataEntryDetail';
//LIABILITY
prototype.id20 = 'FormFileLiability';
prototype.id21 = 'FormFileLiabilityDataEntry';
//consulta transaction ID
prototype.id22 = 'FormTransactions';
prototype.id23 = 'FormTransactionsDataEntry';

prototype.url = CONTEXTPATH + '/FilesIssuesUses';
prototype.widthContenedor = 1300;
prototype.widthGrid = 990;
// </editor-fold>

Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.FilesIssuesUsesForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.FilesIssuesUsesForm',
    requires: [
        'Ext.Praxis.controller.travelbank.FilesIssuesUses.FilesIssuesUsesController',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.IssueForm.FormFileIssue',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.UsedForm.FileUsedForm',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.ExpireForm.FileExpireForm',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.LossesForm.FileLossesForm',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.MergeForm.FileMergeForm',
        'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.LiabilityForm.FileLiabilityForm'
        //'Ext.Praxis.view.travelbank.FilesIssuesUsesForm.TransactionsForm.TransactionsForm'        
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
            id: prototype.id01 + '-main',
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
                            id: prototype.id01 + '-btn-issues',
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
                            id: prototype.id01 + '-btn-used',
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
                            id: prototype.id01 + '-btn-expire',
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
                            id: prototype.id01 + '-btn-losses',
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
                            id: prototype.id01 + '-btn-merge',
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
                            id: prototype.id01 + '-btn-liability',
                            listeners: {
                                click: (e) => {
                                    this.btnActive = 6;
                                    setOnClickBtnActive(e.id, 6);
                                }
                            }
                        }
//                        {
//                            xtype: 'button', width: '8rem', height: '2rem',
//                            text: 'Transactions', iconCls: 'prx-icon-docum',
//                            id: prototype.id01 + '-btn-transaction',
//                            listeners: {
//                                click: (e) => {
//                                    this.btnActive = 7;
//                                    setOnClickBtnActive(e.id, 7);
//                                }
//                            }
//                        }
                    ]
                },
                {
                    width: '90%', height: '100%',
                    padding: '2 1 1 1',
                    id: prototype.id01 + '-conten-panel',
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
            return prototype.id02 + '-formFileIssue';
            break;
        case 2:
            return prototype.id06 + '-fileUsedForm';
            break;
        case 3:
            return prototype.id11 + '-fileExpireForm';
            break;
        case 4:
            return prototype.id15 + '-fileLossesForm';
            break;
        case 5:
            return prototype.id17 + '-fileMergeForm';
            break;
        case 6:
            return prototype.id19 + '-fileLiabilityForm';
            break;
//        case 7:
//            return prototype.id + '-transactionsForm';   
//            break;
        default:
            return '';
            break;
    }
};

setOnClickBtnActive = (btnId, index) => {
//    console.log(this.btnActive);
    Ext.getCmp(prototype.id01 + '-btn-issues').setStyle('background', '');
    Ext.getCmp(prototype.id01 + '-btn-used').setStyle('background', '');
    Ext.getCmp(prototype.id01 + '-btn-expire').setStyle('background', '');
    Ext.getCmp(prototype.id01 + '-btn-losses').setStyle('background', '');
    Ext.getCmp(prototype.id01 + '-btn-merge').setStyle('background', '');
    Ext.getCmp(prototype.id01 + '-btn-liability').setStyle('background', '');
//    Ext.getCmp(prototype.id01 + '-btn-transaction').setStyle('background', '');
    if (this.btnActive === index) {
        Ext.getCmp(btnId).setStyle('background', '#68A0EC'); //active
        //rednderizar objeto
        var panel = Ext.getCmp(prototype.id01 + '-conten-panel');
        panel.removeAll();
        if (getTypeForm() !== '') {
            var gridPanel = Ext.create({
                xtype: getTypeForm()
            });
            panel.add(gridPanel);
        }
    }

};