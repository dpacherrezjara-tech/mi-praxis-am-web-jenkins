/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('Ext.Praxis.view.travelbank.FilesIssuesUsesForm.FormFileUsed', {
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-formFileUsed',
    border: false,
    layout: {
        type: 'hbox',
        //pack: 'end',
        padding: 1
    },
    items: [
        {
           xtype:'panel', 
           width:'100%',
           title:'U S E D'
        }
    ]
});
