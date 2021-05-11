sap.ui.define([
		"sap/ui/core/mvc/Controller"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller) {
		"use strict";

		return Controller.extend("ns.HTML5Module.controller.View1", {
			onInit: function () {

                this.giStudentId = 0;

                this.student = {
                    id:this.giStudentId,
                    firstName:"Joao",
                    middleName:"",
                    lastName:"",
                    gender:0,
                    genderText:"Feminino",
                    dateOfBirth:"",
                    fatherName:"",
                    contactNumber:"",
                    alternativeNumber:""
                };

             this.data =  {
                 students:[],
                 student:this.student
             }

            },
            
            onAfterRendering: function() {
                var oModel = new sap.ui.model.json.JSONModel(this.data);
                this.getView().setModel(oModel);
            },

            handleAddStudent: function (oEvent) {
                if (!this.newStudentDialog) {
                    this.newStudentDialog = sap.ui.xmlfragment("ns.HTML5Module.view.register", this);
                    var oModel = new sap.ui.model.json.JSONModel();
                    this.newStudentDialog.setModel(oModel); 
                }

                this.student.id = this.giStudentId;
                //       this.newStudentDialog.getModel().setData(this.student);
                var data = JSON.parse(JSON.stringify(this.student));
                this.newStudentDialog.getModel().setData(data);
                this.newStudentDialog.open();
            },

            handleSaveBtn: function(oEvt) {
 
               var oDialog = oEvt.getSource();

               var oModel = oEvt.getSource().getModel();
               var oDialogData = oModel.getData();

               var oViewData = this.getView().getModel().getData();
               
               if (this.gbEditing) {
                   for (var i=0; i < oViewData.students.length ; i++ ) {
                        var temp = oViewData.students[i];
                        if (temp.id ===  oDialogData.id ) {
                            temp = oDialogData;
                            temp.genderText=(temp.gender)?"Male":"Female";
                            oViewData.students[i] = temp;
                            break;
                        }
                   }
                   this.gbEditing = false;
                   this.getView().getModel().setData(oViewData);
                   this.newStudentDialog.close();   
                   return;                                   
               }

               oDialogData.genderText = (oDialogData.gender)?"Masculino":"Feminino";

               oViewData.students.push(oDialogData);

               // Set the Data back to the Model
               this.getView().getModel().setData(oViewData);

                this.giStudentId++;

               this.newStudentDialog.close();                   
               
            },

            handleCancelBtn: function() {
                this.newStudentDialog.close();                
            },

            handleEditStudent: function(oEvt) {
               var oStudent =   oEvt.getSource().getBindingContext().getObject();
                this.newStudentDialog.getModel().setData(oStudent);
                this.newStudentDialog.open();

                this.gbEditing = true;
            },

            handleDeleteStudent: function(oEvt) {
                   var oCurrentStudent = oEvt.getSource().getBindingContext().getObject();
                   var oViewData = this.getView().getModel().getData();

                    for (var i=0; i < oViewData.students.length ; i++ ) {
                        var temp = oViewData.students[i];             
                        if (temp.id === oCurrentStudent.id) {
                           oViewData.students.splice(i, 1);
                           break;
                        }           
                    }                   
                    this.getView().getModel().setData(oViewData);

            }


		});
	});
