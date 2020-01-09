import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from '../Service/common.service';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/Service/http.service';
import { ContentService } from '../Service/content.service';
// declare var $: any;

@Component({
  selector: 'app-left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.css']
})
export class LeftPanelComponent implements OnInit {
  @ViewChild('relationDetail') relationDetail: ElementRef;
  @ViewChild('relSuccess') relSuccess: ElementRef;
  @ViewChild('annoRelDeleteConfirm') annoRelDeleteConfirm: ElementRef;

  entityType: string;
  isDisabled: boolean;
  issaveDisabled: boolean;
  toolTip: string;
  toolTip1: string;
  check: boolean;
  checkuser: boolean;
  deleteEntityFound: boolean;
  relationType: string[];
  directions: string[];
  relationname: string;
  direction: string;
  entities: string[];
  modalpop: string;
  entity2: string;
  entitymenu: boolean;
  type: string;
  label: string;
  storeentitydoc: any = [];
  uniquevalue: string;
  choosenproject: any;
  saveentitylist: Array<object> = [];
  entitytext: any;
  startindex: number;
  lastannotated: Object;
  endindex: number;
  annotateline: string;
  namedentitytypelist: any;
  alltypes: any;
  projecttypes: any;
  namedentitylabellist: any;
  errormsg: string;
  addentity: Object;
  entitychoosenprivilge: boolean;
  savechangespopup: boolean;
  deleteentitydata: Object;
  labels: Array<string>;
  highlight: string;
  edittype: string;
  editlabel: string;
  edituniquevalue: string;
  Entitytypedropdown: Array<any>;
  filename: any;
  prevannotationlist: any;
  selectedProjectData: any;
  selectedProjectLabelTypeList: Array<any> = [];
  alllabels: any;
  projectfound: boolean;
  isUpdated: boolean;
  msgboolean: boolean;
  additionaltype: boolean;
  dataSet: any;
  saveentitylistlength: number;
  deleteentityid: string;
  displaymenusubscription: Subscription;
  entitysubscription: Subscription;
  projectsubscription: Subscription;
  startindexentitysubscription: Subscription;
  endindexentitysubscription: Subscription;
  entitylinesubscription: Subscription;
  filenamesubscription: Subscription;
  projectdatasubscription: Subscription;
  subscription: Subscription;
  randomIdSubscription: Subscription;
  annotateddatasetsubscription: Subscription;
  notAcceptedData: Subscription;
  selectedText: any;
  randomId: any;
  level_compliance: any;
  data_accept: string;
  display_pending_entities: String;
  pending_entities: any;
  uniqueEntityId: string;
  showDefineNewEntity: boolean;
  deleteentitydisabled: boolean; 

  // Relations
  errorMsgSelected: Subscription;
  closeRelFlowSubscription: Subscription;

  relationTypes: string[];
  createRel: boolean;
  relatedRelationRandomId: any;
  rel_left_entitytext: any;
  rel_right_entitytext: any;
  relations: Array<object>;
  rel_name: string;
  rel_type: string;

  from_entityText: any;
  to_entityText: any;
  text: any;

  from_type: any;
  to_type: any;

  from_entityType: any;
  to_entityType: any;

  from_entityLabel: any;
  to_entityLabel: any;

  from_uniqueValue: any;
  to_uniqueValue: any;

  from_randomId: any;
  to_randomId: any;
  showLeftArrow: boolean;
  showRightArrow: boolean;
  projRelationships: any;
  showNewRelMsgModal: boolean;
  showEditRelMsgModal: boolean;
  editRel: boolean;
  warningMsg: any;
  modaleditpop: string;
  deleteRel: boolean;
  reqRelations_right: any;
  reqRelations_left: any;
  relation: string;
  existedRel: any;
  rejectAnnotationsList: any;
  disableRelCreOrEdit: boolean;
  hasAllowedRelations: boolean;
  datasetComp: any;

  constructor(private commonservice: CommonService, private httpservice: HttpService, private contentService: ContentService, private modalService: NgbModal) {

  }
  ngOnInit() {
    this.additionaltype = false;
    this.checkuser = true;
    this.check = false;
    //this.entityType = "Named Entity";
    this.isDisabled = false;
    this.issaveDisabled = false;
    this.entitymenu = false;
    this.savechangespopup = false;
    this.toolTip = "";
    // this.relationType = ["means", "refers to", "supports", "enhances", "relType1", "label5", "label6", "label7", "label8"];
    this.directions = ["right", "left"];
    // this.relationname = this.relationType[0];
    // this.direction = "right";
    this.toolTip1 = "Save is disabled because entries are not implemented";
    this.type = "";
    this.uniquevalue = "";
    this.level_compliance = "";
    this.data_accept = "";
    this.deleteEntityFound = false;
    this.entitychoosenprivilge = false;
    this.addentity = {};
    this.deleteentitydata = {};
    this.projectfound = false;
    this.namedentitylabellist = [];
    this.Entitytypedropdown = [];
    this.projecttypes = [];
    this.msgboolean = false;
    this.display_pending_entities = "";

    this.showDefineNewEntity = true;
    this.entitychoosenprivilge = true;
    this.highlight = 'tag';
    this.rejectAnnotationsList = [];
    this.disableRelCreOrEdit = true;
    this.deleteentitydisabled = true;
    this.showNewRelMsgModal = false; 
    this.showEditRelMsgModal = false;

    this.subscription = this.commonservice.getErrorMsgSelected().subscribe(isErrorMsgShowed => {
      if (isErrorMsgShowed) {
        this.editRel = false;
        this.deleteRel = false;
        this.createRel = false;
      }
    })

    this.subscription = this.contentService.getMessage().subscribe(message => {
      if (message) {
        this.msgboolean = true;
        this.savechangespopup = false;
        this.showDefineNewEntity = true;
        this.commonservice.sendDefineNewEntityNotification(this.showDefineNewEntity);
      }
    })
    this.displaymenusubscription = this.commonservice.getannotateselected().subscribe((annotateSelected) => {
      this.deleteentitydisabled = true;
      if (this.createRel || this.editRel) {
        this.entitymenu = false;
        let msg = {
          showAlert: true,
          text: "Relation cannot be created or edited for not annotated text."
        }
        this.commonservice.sendAlertMsg(msg);
      } else {
        this.entitymenu = annotateSelected;
      }

      if (!this.showDefineNewEntity) {
        this.entitymenu = false;
      }
      // this.entitymenu = annotateSelected;      
      this.selectedText = window.getSelection();
      this.onEntitytypeChange('Named Entity');
      this.uniquevalue = "";
      this.label = "";
      this.level_compliance = "";
      this.data_accept = "";
      this.display_pending_entities = "";
      if (this.selectedProjectData) {
        let labelstofilter = this.httpservice.labelFilter(this.selectedProjectData, this.type);
        this.namedentitylabellist = this.removeDuplicates(labelstofilter, "dataEntityLabel");
        // this.namedentitylabellist = filteredLabels.filter(item => item.dataEntityLabel !== "");

        if (this.namedentitylabellist[0]) {
          if (this.namedentitylabellist[0].extensible === "yes" || this.namedentitylabellist[0].extensible === true) {
            // this.namedentitylabellist.filter(x => { 
            //   if(x.dataEntityLabel === "") { 
            //     x.dataEntityLabel = "No label";
            //   } 
            // });
            // this.label = this.namedentitylabellist[0].dataEntityLabel;
            if (!(this.namedentitylabellist[0].dataEntityLabel)) {
              this.namedentitylabellist = this.removeDuplicates(this.selectedProjectData, "dataEntityLabel");
            }
          } else {
            // let filteredPrjSpecificLabels = this.selectedProjectData.filter(item => item.dataEntityLabel !== "");
            this.namedentitylabellist = this.removeDuplicates(this.selectedProjectData, "dataEntityLabel");
            // this.label = this.namedentitylabellist[0].dataEntityLabel;
          }
        } else {
          // this.namedentitylabellist = this.alllabels;
          this.namedentitylabellist = this.removeDuplicates(this.alllabels, "dataEntityLabel");
        }

      }
      // if (this.selectedProjectData) {
      //   this.namedentitylabellist = this.httpservice.labelFilter(this.selectedProjectData, this.type);
      //   if (this.namedentitylabellist[0]) {
      //     if (this.namedentitylabellist[0].extensible === "yes" || this.namedentitylabellist[0].extensible === true) {
      //      this.label = this.namedentitylabellist[0].dataEntityLabel;
      //     } else {
      //       let filteredPrjSpecificLabels = this.selectedProjectData.filter(function (el) {
      //         return el.dataEntityLabel != "";
      //       });

      //       var prjSpecificLabels = this.removeDuplicates(filteredPrjSpecificLabels, "dataEntityLabel");
      //       console.log("prjSpecificLabels", prjSpecificLabels);
      //       this.namedentitylabellist = prjSpecificLabels;
      //       this.label = this.namedentitylabellist[0].dataEntityLabel;
      //     }
      //   } else {
      //     this.namedentitylabellist = this.alllabels;
      //   }
      // }
      this.label = "";
      this.disableRelCreOrEdit = true;
      this.datasetComp = "";
      this.dataSet = "";
    })
    this.projectsubscription = this.commonservice.getprojectselected().subscribe((selectedproject) => {
      this.choosenproject = selectedproject;
      this.saveentitylist = [];
      this.rejectAnnotationsList = [];
      // Get project relationships
      this.httpservice.getAllProjectRelationships(this.choosenproject).subscribe((response) => {
        this.projRelationships = response['data'];
        // console.log("this.projRelationships", this.projRelationships);
      },
        error => {
          this.errormsg = error;
        });

    })
    this.randomIdSubscription = this.commonservice.getselectedrandomId().subscribe((randomId) => {
      this.randomId = randomId;
      if (this.createRel || this.editRel) {
        this.to_randomId = this.randomId;
      }
    });
    this.projectdatasubscription = this.commonservice.getselectedProjectData().subscribe((result) => {
      this.selectedProjectData = result.data;
      if (this.selectedProjectData) {
        this.projecttypes = [];
        this.selectedProjectData.forEach(Projectdata => {
          this.projecttypes.push(Projectdata.dataEntityType);
        })
        this.namedentitytypelist = this.projecttypes;
      }
    });
    this.entitysubscription = this.commonservice.getselectedannotatetext().subscribe((selecttext) => {
      this.entitytext = selecttext.selectedentityline;
      this.deleteentityid = selecttext.id;
      this.namedentitytypelist = this.projecttypes;
    })
    this.annotateddatasetsubscription = this.commonservice.getannotateddataset().subscribe((dataset) => {
      this.disableRelCreOrEdit = false;
      this.deleteentitydisabled = false;
      let msg = {
        showAlert: false,
        text: ""
      }
      this.commonservice.sendAlertMsg(msg);
      this.entitymenu = true;
      this.datasetComp = dataset;

      let dataSet = dataset;
      this.dataSet = dataset;
      this.type = dataSet.entityType ? dataSet.entityType : "";
      this.label = dataSet.entityLabel !== "undefined" ? dataSet.entityLabel : "";
      // this.uniquevalue = dataSet.entityValue ? dataSet.entityValue : "";
      this.entityType = (this.type == "entity" || this.type == "Entity") ? "entity" : "Named Entity";
      this.text = document.querySelector('[data-entity-value="' + dataSet.entityValue + '"]').textContent;

      if (this.entityType == "entity") {
        this.uniqueEntityId = dataSet.entityValue;
      } else {
        // this.uniquevalue = dataSet.entityValue ? dataSet.entityValue.toLowerCase() : "";
        this.uniquevalue = dataSet.entityValue ? dataSet.entityValue : "";
      }

      this.data_accept = dataSet.accept ? dataSet.accept : "";
      this.level_compliance = dataSet.score ? dataSet.score : "";
      if (this.type != "entity") {
        if (this.namedentitytypelist.indexOf(this.type) == -1) {
          this.additionaltype = true;
          this.selectedProjectData.push({ "projectId": this.choosenproject, "dataEntityType": this.type, "dataEntityLabel": this.label, "description": "Type added as annotation exists in the open file" });
          this.projecttypes.push(this.type);
          this.namedentitytypelist = this.projecttypes;
        }
      }

      if (this.selectedProjectData) {
        this.namedentitylabellist = this.httpservice.labelFilter(this.selectedProjectData, this.type);
        this.namedentitylabellist.forEach(eachItem => {
          if (eachItem.dataEntityType == this.type) {
            if (eachItem.extensible === "no" || eachItem.extensible === false) {
              // let filteredPrjSpecificLabels = this.selectedProjectData.filter(function (el) {
              //   return el.dataEntityLabel != "";
              // });
              var prjSpecificLabels = this.removeDuplicates(this.selectedProjectData, "dataEntityLabel");
              this.namedentitylabellist = prjSpecificLabels;
              // this.namedentitylabellist = prjSpecificLabels.filter(item => item.dataEntityLabel !== "");
            }
          }
        });
      }

      // Relations  
      if (this.createRel) {
        this.hasAllowedRelations = true;
        this.rel_name = "";
        this.to_entityText = document.querySelector('[data-entity-value="' + dataSet.entityValue + '"]').textContent;

        this.to_type = dataSet.entityType;
        this.to_entityLabel = dataSet.entityLabel;
        this.to_uniqueValue = dataSet.entityValue;
        this.to_entityType = (this.type == "Entity") ? "Entity" : "Named Entity";
        this.reqRelations_right = this.projRelationships.filter(rel => rel.entityName === this.from_type && rel.toEntityName === this.to_type);
        this.reqRelations_left = this.projRelationships.filter(rel => rel.entityName === this.to_type && rel.toEntityName === this.from_type);

        // Check for possible relationships
        let prjEntityNames = this.projRelationships.map(rel => rel.entityName);
        let prjToEntityNames = this.projRelationships.map(rel => rel.toEntityName);
        let projAllEntityNames = [...prjEntityNames, ...prjToEntityNames];

        if (localStorage.getItem('storeentitydoc')) { 
          this.storeentitydoc = JSON.parse(localStorage.getItem('storeentitydoc'));
          let file_index = this.storeentitydoc.findIndex((element) => {
            return element.documentselected == this.filename && element.projectselected == this.choosenproject;
          });
          if (file_index != -1) {
            let localRelations = this.storeentitydoc[file_index]["localrelations"];

            if (localRelations) {
              //Check for existing relation in local storage 
              this.existedRel = localRelations.filter(rel =>
                (rel.dataEntityValue === this.from_uniqueValue && rel.toDataEntityValue === this.to_uniqueValue
                  && rel.entityType === this.from_type && rel.toEntityType === this.to_type) ||
                (rel.dataEntityValue === this.to_uniqueValue && rel.toDataEntityValue === this.from_uniqueValue
                  && rel.entityType === this.to_type && rel.toEntityType === this.from_type)
              );  

              // if (this.existedRel != undefined && (this.existedRel.length > 0)) {
              //   let msg = {
              //     showAlert: true,
              //     text: "Relation alredy existed. You can modify relation using 'Edit' option."
              //   }
              //   this.commonservice.sendAlertMsg(msg);
              //   this.exit();  
              // }
            }
          }
        }

        if (projAllEntityNames.indexOf(this.from_type) === -1) {
          this.createRel = false;
          // this.warningMsg = "Relation cannot be created for non existing relation types";
          // $('#warningMsg').modal('show');
          let msg = {
            showAlert: true,
            text: "Relation cannot be created for non existing relation types."
          }
          this.commonservice.sendAlertMsg(msg);
          this.exit();
        } else {
          if (projAllEntityNames.indexOf(this.to_type) === -1) {
            this.createRel = false;
            // this.warningMsg = "No possible relation is existed for the selected annotation type for the project";
            // $('#warningMsg').modal('show');
            let msg = {
              showAlert: true,
              text: "No possible relation is existed for the selected annotation type for the project."
            }
            this.commonservice.sendAlertMsg(msg);
            this.exit();
          } else if (this.existedRel != undefined && (this.existedRel.length > 0)) {
            let msg = {
              showAlert: true,
              text: "Relation alredy existed. You can modify relation using 'Edit' option."
            }
            this.commonservice.sendAlertMsg(msg);
            this.exit();
          } else if ((this.reqRelations_right.length > 0) || (this.reqRelations_left.length > 0)) {
            if (this.reqRelations_right.length > 0) {
              this.direction = "right";
              this.showRightArrow = true;
              this.showLeftArrow = false;
              this.relationTypes = this.reqRelations_right.map(rel => rel.relationType);
              this.rel_type = this.relationTypes[0];
              // this.relation = this.relationTypes[0]; 

            } else if (this.reqRelations_left.length > 0) {
              this.direction = "left";
              this.showLeftArrow = true;
              this.showRightArrow = false;
              this.relationTypes = this.reqRelations_left.map(rel => rel.relationType);
              this.rel_type = this.relationTypes[0];
              // this.relation = this.relationTypes[0]; 
            }
            // $('#relationDetail').modal('show');
            this.modalService.open(this.relationDetail, { centered: true });

          } else {
            this.createRel = false;
            // this.warningMsg = "No possible relation is existed for the project with the selected annotation types";
            // $('#warningMsg').modal('show');
            let msg = {
              showAlert: true,
              text: "No possible relation is existed for the project with the selected annotation types."
            }
            this.commonservice.sendAlertMsg(msg);
            this.exit();
          }
        }
      } //Create Relation 

      if (this.editRel) {
        this.hasAllowedRelations = true;
        // this.rel_name = "";
        this.to_entityText = document.querySelector('[data-entity-value="' + dataSet.entityValue + '"]').textContent;
        this.to_type = dataSet.entityType;
        this.to_entityLabel = dataSet.entityLabel;
        this.to_uniqueValue = dataSet.entityValue;
        this.to_entityType = (this.type == "Entity") ? "Entity" : "Named Entity";
        this.reqRelations_right = this.projRelationships.filter(rel => rel.entityName === this.from_type && rel.toEntityName === this.to_type);
        this.reqRelations_left = this.projRelationships.filter(rel => rel.entityName === this.to_type && rel.toEntityName === this.from_type);

        // Get relations from local storage
        if (localStorage.getItem('storeentitydoc')) {
          this.storeentitydoc = JSON.parse(localStorage.getItem('storeentitydoc'));
          let file_index = this.storeentitydoc.findIndex((element) => {
            return element.documentselected == this.filename && element.projectselected == this.choosenproject;
          });
          if (file_index != -1) {
            let localRelations = this.storeentitydoc[file_index]["localrelations"];

            if (localRelations) {
              //Check for existing relation in local storage 
              this.existedRel = localRelations.filter(rel =>
                (rel.dataEntityValue === this.from_uniqueValue && rel.toDataEntityValue === this.to_uniqueValue
                  && rel.entityType === this.from_type && rel.toEntityType === this.to_type) ||
                (rel.dataEntityValue === this.to_uniqueValue && rel.toDataEntityValue === this.from_uniqueValue
                  && rel.entityType === this.to_type && rel.toEntityType === this.from_type)
              ); 

              // this.existedRel = localRelations.filter(rel => rel.dataEntityValue === this.from_uniqueValue && rel.toDataEntityValue === this.to_uniqueValue
              //   && rel.entityType === this.from_type && rel.toEntityType === this.to_type);
              
              if (this.existedRel != undefined && (this.existedRel.length > 0)) {
                this.rel_type = this.existedRel[0].relationType;
                this.direction = this.existedRel[0].relationDirection;
                if (this.direction === "right") {
                  this.showLeftArrow = false;
                  this.showRightArrow = true;
                  this.relationTypes = this.reqRelations_right.map(rel => rel.relationType);
                  this.rel_type = this.relationTypes[0];
                } else {
                  this.showRightArrow = false;
                  this.showLeftArrow = true;
                  this.relationTypes = this.reqRelations_left.map(rel => rel.relationType);
                  this.rel_type = this.relationTypes[0];
                }
                // $('#relationDetail').modal('show');
                this.modalService.open(this.relationDetail, { centered: true });
              } else {
                this.editRel = false;
                // this.warningMsg = "No relation existed to edit for the selected annotation types";
                // $('#warningMsg').modal('show');

                let msg = {
                  showAlert: true,
                  text: "No relation existed to edit for the selected annotation types."
                }
                this.commonservice.sendAlertMsg(msg);
                this.exit();

              }
            }
          }
        }
      } //Edit Relation 

    })
    this.startindexentitysubscription = this.commonservice.getstartindexannotate().subscribe((startindex) => {
      this.startindex = startindex;
    })
    this.filenamesubscription = this.commonservice.getfilename().subscribe(namefile => {
      this.filename = namefile;
    })
    this.endindexentitysubscription = this.commonservice.getendindexannotate().subscribe((endindex) => {
      this.endindex = endindex;
    })
    this.entitylinesubscription = this.commonservice.getselectedannotatetextline().subscribe((annotateline) => {
      this.annotateline = annotateline;
    })
    this.notAcceptedData = this.commonservice.getNotAcceptedData().subscribe((data) => {
      this.entitymenu = false;
      this.display_pending_entities = data["isClicked"];
      this.pending_entities = data["not_accepted_arr"];
    });
    this.httpservice.getNamedEntityTypes().subscribe((response) => {
      this.alltypes = response['data'];
    },
      (error) => {
        this.errormsg = error;
      }
    )

    // Get all labels 
    this.httpservice.getAllLabels().subscribe((response) => {
      this.alllabels = response['data'];
    },
      error => {
        this.errormsg = error;
      });
    this.closeRelFlowSubscription = this.commonservice.getAlertMsg().subscribe(isRelFlow => {
      if (!isRelFlow) {
        this.createRel = this.editRel = isRelFlow;
      }
    });
  } //ngOnInit

  ngOnDestroy() {
    this.displaymenusubscription.unsubscribe();
    this.projectsubscription.unsubscribe();
    this.entitysubscription.unsubscribe();
    this.startindexentitysubscription.unsubscribe();
    this.endindexentitysubscription.unsubscribe();
    this.entitylinesubscription.unsubscribe();
    this.randomIdSubscription.unsubscribe();
  }
  defineNewEntity() {
    this.showDefineNewEntity = !this.showDefineNewEntity;
    this.commonservice.sendDefineNewEntityNotification(this.showDefineNewEntity);
    // this.entityprivilage('tag');

    this.highlight = "tag";
    this.commonservice.sendentityhighlight(this.highlight);
    this.entitychoosenprivilge = true;
    this.commonservice.sendchoosenentityprivilge(this.entitychoosenprivilge);

    // if (this.showDefineNewEntity) {
    //   this.entityprivilage('tag');
    // } else {
    //   this.entityprivilage('word');
    // }
  }
  entityprivilage(highlight) {
    this.showDefineNewEntity = true;
    this.commonservice.sendDefineNewEntityNotification(this.showDefineNewEntity);

    this.entitychoosenprivilge = true;
    if (highlight == "tag") {
      this.highlight = highlight;
    }
    else if (highlight == "word") {
      this.highlight = highlight;
    }
    this.commonservice.sendchoosenentityprivilge(this.entitychoosenprivilge);
    this.commonservice.sendentityhighlight(this.highlight);
  }
  randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
  onEntitytypeChange(entry: string) {
    this.edituniquevalue = "";
    this.uniquevalue = "";
    this.entityType = entry;
    this.type = "";
    this.level_compliance = "";
    this.data_accept = "";
    this.display_pending_entities = "";
    if (this.entityType == "entity" || this.entityType == "Entity") {
      this.isDisabled = true;
      this.Entitytypedropdown.push("entity");
      this.namedentitytypelist = this.Entitytypedropdown;
      this.type = this.namedentitytypelist[0];
      this.uniqueEntityId = this.randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'); //oct
    }
    else {
      this.isDisabled = false;
      if (this.selectedProjectData) {
        this.namedentitytypelist = this.projecttypes;
      }
      else {
        this.namedentitytypelist = this.alltypes;
      }
    }
    this.savedisabled();
  }
  cancelMessage() {
    this.createRel = false;
    this.editRel = false;
    this.deleteRel = false;
    this.entitymenu = false;
  }

  createRelation() {
    // alert("Ok popup is clicked");
  }
  cancelrelation() {
    this.createRel = false;
    this.editRel = false;
    this.deleteRel = false;
    this.entitymenu = false;
    this.modalService.dismissAll();
  }

  swapRelations() { 
    let obj;
    return obj = {
      "projectId": this.choosenproject ? this.choosenproject : "",

      "entityType": this.to_type,
      "entityId": this.to_randomId,
      "dataEntityLabel": this.to_entityLabel,
      "dataEntityValue": this.to_uniqueValue,
      "entityText": this.to_entityText,

      "relationId": this.editRel ? this.existedRel[0].relationId : this.randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
      "relationType": this.rel_type,
      "relationDirection": "right",
      "relationName": this.rel_name,

      "toEntityType": this.from_type,
      "toEntityId": this.from_randomId,
      "toEntityLabel": this.from_entityLabel,
      "toDataEntityValue": this.from_uniqueValue,
      "toEntityText": this.from_entityText,

      "workflowStatus": "Pending"
    };
  }

  acceptRelation() {
    this.relationTypes = [];

    if (this.rel_type) {
      this.entitymenu = false;
      var relationObj = {
        "projectId": this.choosenproject ? this.choosenproject : "",
        // "project_name": this.choosenproject ? this.choosenproject : "",

        "entityType": this.from_type,
        "entityId": this.from_randomId,
        "dataEntityLabel": this.from_entityLabel,
        "dataEntityValue": this.from_uniqueValue,
        "entityText": this.from_entityText,

        // "relationId": this.randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
        "relationId": this.editRel ? this.existedRel[0].relationId : this.randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
        "relationType": this.rel_type,
        "relationDirection": this.direction,
        "relationName": this.rel_name,

        "toEntityType": this.to_type,
        "toEntityId": this.to_randomId,
        "toEntityLabel": this.to_entityLabel,
        "toDataEntityValue": this.to_uniqueValue,
        "toEntityText": this.to_entityText,
        "workflowStatus": "Pending"
        // "from_text": this.from_entityText,    
        // "to_text": this.to_entityText,
      }

      if (this.createRel) {
        // this.createRel = false;
        this.editRel = false;
        this.handleStoringRelationsToLocalStorage(relationObj);
      }

      if (this.editRel) {
        this.createRel = false;
        // this.editRel = false;
        //this.handleStoringRelationsToLocalStorage(relationObj);
        let relationIdToEdit = this.existedRel[0].relationId;

        if (localStorage.getItem('storeentitydoc')) {
          this.storeentitydoc = JSON.parse(localStorage.getItem('storeentitydoc'));
          let file_index = this.storeentitydoc.findIndex((element) => {
            return element.documentselected == this.filename && element.projectselected == this.choosenproject;
          });
          if (file_index != -1) {
            let localRelations = this.storeentitydoc[file_index]["localrelations"];

            if (localRelations) {
              let exist_id_index = localRelations.findIndex(ele => ele.relationId == relationIdToEdit);
              if (exist_id_index != -1) {

                // Swap relation if direction is LEFT 
                var modifiedRelObj;
                if (relationObj.relationDirection == "left") {
                  modifiedRelObj = this.swapRelations();
                  localRelations[exist_id_index] = modifiedRelObj;
                } else {
                  localRelations[exist_id_index] = relationObj;
                }
                // localRelations[exist_id_index] = relationObj;
                
                this.storeentitydoc[file_index]["localrelations"] = localRelations;
                localStorage.setItem('storeentitydoc', JSON.stringify(this.storeentitydoc));
              }
            }
          }

          // $('#relSuccess').modal('show');
          this.modalService.dismissAll();
          this.modalService.open(this.relSuccess, { centered: true });
          // localStorage.setItem('storeentitydoc', JSON.stringify(this.storeentitydoc));
        }
        this.commonservice.sendUpdateNotification(true);
      }
    } else {
      this.editRel = false;
      this.createRel = false;
      // this.warningMsg = "Relation cannot be created with empty relation type.";
      // $('#warningMsg').modal('show');
      let msg = {
        showAlert: true,
        text: "Relation cannot be created with empty relation type."
      }
      this.commonservice.sendAlertMsg(msg);
      this.exit();
    }

  }

  handleStoringRelationsToLocalStorage(relationObj) {
    let isDuplicate = false;
    // Store relations to local storage
    if (localStorage.getItem('storeentitydoc')) {
      this.storeentitydoc = JSON.parse(localStorage.getItem('storeentitydoc'));
      let file_index = this.storeentitydoc.findIndex((element) => {
        return element.documentselected == this.filename && element.projectselected == this.choosenproject;
      });
      if (file_index != -1) {
        let localRelations = this.storeentitydoc[file_index]["localrelations"];

        if (localRelations) {
          //Check for duplicate Relations 
          this.existedRel = localRelations.filter(rel => rel.dataEntityValue === this.from_uniqueValue && rel.toDataEntityValue === this.to_uniqueValue
            && rel.entityType === this.from_type && rel.toEntityType === this.to_type && rel.relationType === this.rel_type);
          // console.log("this.existedRel", this.existedRel);

          if (this.existedRel != undefined && (this.existedRel.length > 0)) {
            this.createRel = false;
            // this.warningMsg = "Duplicate Relation";
            // $('#warningMsg').modal('show');
            let msg = {
              showAlert: true,
              text: "Duplicate Relation."
            }
            this.commonservice.sendAlertMsg(msg);
            this.exit();
            isDuplicate = true;
          } else {
            //Swap relation if direction is LEFT
            var modifiedRelObj;
            if (relationObj.relationDirection == "left") {
              modifiedRelObj = this.swapRelations();
              localRelations.push(modifiedRelObj);
            } else {
              localRelations.push(relationObj);
            }

            // localRelations.push(relationObj);
            // let exist_id_index = localRelations.findIndex(ele => ele.id == this.randomId);
            // if (exist_id_index != -1) {
            //   localRelations[exist_id_index] = relationObj;
            // } else {
            //   localRelations.push(relationObj);
            // }
          }
        } else {
          localRelations = [];
          //Swap relation if direction is LEFT
          var modifiedRelObj;
          if (relationObj.relationDirection == "left") {
            modifiedRelObj = this.swapRelations();
            localRelations.push(modifiedRelObj);
          } else {
            localRelations.push(relationObj);
          }

          // localRelations.push(relationObj);
        }

        this.storeentitydoc[file_index]["localrelations"] = localRelations;
      }
      else {
        let newrelationsarray: Array<object> = [];

        //Swap relation if direction is LEFT
        var modifiedRelObj;
        if (relationObj.relationDirection == "left") {
          modifiedRelObj = this.swapRelations();
          newrelationsarray.push(modifiedRelObj);
        } else {
          newrelationsarray.push(relationObj);
        }

        // newrelationsarray.push(relationObj);
        let latestentityobj = {
          'projectselected': this.choosenproject,
          'documentselected': this.filename,
          'localrelations': newrelationsarray,
        }
        this.storeentitydoc.push(latestentityobj);
      }
      if (!isDuplicate) {
        // $('#relSuccess').modal('show');
        this.modalService.dismissAll();
        this.modalService.open(this.relSuccess, { centered: true });
      }

      localStorage.setItem('storeentitydoc', JSON.stringify(this.storeentitydoc));

    }
    else {
      let storeentity = [];
      let localrelationsarray: Array<object> = [];

      //Swap relation if direction is LEFT
      var modifiedRelObj;
      if (relationObj.relationDirection == "left") {
        modifiedRelObj = this.swapRelations();
        localrelationsarray.push(modifiedRelObj);
      } else {
        localrelationsarray.push(relationObj);
      }
      // localrelationsarray.push(relationObj);
      
      storeentity[0] = {
        'projectselected': this.choosenproject,
        'documentselected': this.filename,
        'localrelations': localrelationsarray,
      }
      if (!isDuplicate) {
        // $('#relSuccess').modal('show');
        this.modalService.dismissAll();
        this.modalService.open(this.relSuccess, { centered: true });
        // this.createRel = false;
        // this.editRel = false;
      }

      localStorage.setItem('storeentitydoc', JSON.stringify(storeentity));
    }
    this.commonservice.sendUpdateNotification(true);
  }

  deleteRelConfirm(uniqueValue, type, toUniqueValue) {
    this.modalService.dismissAll();
  }

  deleteRelation() {
    // this.modalService.dismissAll(); 

    this.deleteRel = true;
    this.editRel = false;
    let relationIdToDelete = this.existedRel[0].relationId;

    if (localStorage.getItem('storeentitydoc')) {
      this.storeentitydoc = JSON.parse(localStorage.getItem('storeentitydoc'));
      let file_index = this.storeentitydoc.findIndex((element) => {
        return element.documentselected == this.filename && element.projectselected == this.choosenproject;
      });
      if (file_index != -1) {
        let localRelations = this.storeentitydoc[file_index]["localrelations"];

        if (localRelations) {

          for (let i = 0; i < localRelations.length; i++) {
            if (localRelations[i]["relationId"] == relationIdToDelete) {
              localRelations.splice(i, 1);
            }
          }
          this.storeentitydoc[file_index]["localrelations"] = localRelations;

        }
      }
      this.modalService.open(this.relSuccess, { centered: true });
      localStorage.setItem('storeentitydoc', JSON.stringify(this.storeentitydoc));
    }
    this.commonservice.sendUpdateNotification(true);
  }

  chooseRelationType() {
    // this.rel_type = this.relation;
    // this.rel_type = $event.target.value;
  }
  chooseDirection() {
    this.hasAllowedRelations = true;
    // this.direction = $event.target.value;
    this.rel_type = "";
    if (this.direction === "right") {
      this.showLeftArrow = false;
      this.showRightArrow = true;
      if (this.reqRelations_right.length > 0) {
        this.relationTypes = this.reqRelations_right.map(rel => rel.relationType);
        this.rel_type = this.relationTypes[0];
      } else {
        this.relationTypes = ["No relation"];
        this.rel_type = this.relationTypes[0];
        this.hasAllowedRelations = false;
      }
    } else {
      this.showRightArrow = false;
      this.showLeftArrow = true;
      if (this.reqRelations_left.length > 0) {
        this.relationTypes = this.reqRelations_left.map(rel => rel.relationType);
        this.rel_type = this.relationTypes[0];
      } else {
        this.relationTypes = ["No relation"];
        this.rel_type = this.relationTypes[0];
        this.hasAllowedRelations = false;
      }
    }
  }

  exit() {
    this.createRel = false;
    this.editRel = false;
    this.deleteRel = false;
    this.entitymenu = false;
    this.modalService.dismissAll();
    this.modalpop = ""; 

  }
  relationDetailModal() {
    this.modalService.open(this.relationDetail, { centered: true });
  }

  addNewRelation() {
    this.createRel = false;
    this.deleteRel = false;
    this.editRel = false;
    this.modalpop = "";
    var prjEntityNames = this.projRelationships.map(rel => rel.entityName);
    var prjToEntityNames = this.projRelationships.map(rel => rel.toEntityName);
    let projAllEntityNames = [...prjEntityNames, ...prjToEntityNames];
    if (projAllEntityNames.indexOf(this.type) === -1) {
      // this.warningMsg = "Relation cannot be created for this entity type as there is no allowed relationships existed.";
      // $('#warningMsg').modal('show'); 
      let msg = {
        showAlert: true,
        text: "Relation cannot be created for this entity type as there is no allowed relations existed."
      }
      this.commonservice.sendAlertMsg(msg);
      this.exit();
    } else {
      if (!this.showNewRelMsgModal) {
        this.modalpop = "NewOrEditRelationInfo";
      }
      this.createRel = true;
      this.from_entityText = this.text; 
      // this.from_entityText = this.entitytext;
      this.from_type = this.type;
      this.from_entityLabel = this.label;
      // this.from_uniqueValue = this.uniquevalue;
      this.from_uniqueValue = (this.type == "entity") ? this.uniqueEntityId : this.uniquevalue;
      this.from_entityType = this.entityType;
      this.from_randomId = this.randomId;
    }
  }
  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    // return newArray;

    var result = newArray.filter(obj => {
      return obj.dataEntityLabel !== ""
    })
    return result;
  }
  editRelation() {
    this.editRel = true;
    this.deleteRel = false;
    this.createRel = false;
    this.modalpop = "";

    var prjEntityNames = this.projRelationships.map(rel => rel.entityName);
    var prjToEntityNames = this.projRelationships.map(rel => rel.toEntityName);
    let projAllEntityNames = [...prjEntityNames, ...prjToEntityNames];
    if (projAllEntityNames.indexOf(this.type) === -1) {
      // this.warningMsg = "Relation cannot be created for this entity type as there is no allowed relationships existed.";
      // $('#warningMsg').modal('show');
      let msg = {
        showAlert: true,
        text: "Relation is not possible for this entity type as there is no allowed relations existed."
      }
      this.commonservice.sendAlertMsg(msg);
      this.exit();
    } else {
      if (!this.showEditRelMsgModal) {
        this.modalpop = "NewOrEditRelationInfo";
      }
      // this.from_entityText = this.entitytext;
      this.from_entityText = this.text; 
      this.from_type = this.type;
      this.from_entityLabel = this.label;
      // this.from_uniqueValue = this.uniquevalue;
      this.from_uniqueValue = (this.type == "entity") ? this.uniqueEntityId : this.uniquevalue;
      this.from_entityType = this.entityType;
      this.from_randomId = this.randomId;
      // console.log("left", this.from_entityText + "  " + this.from_entityType + "  " + this.from_type + "  " + this.from_entityLabel + " " + this.from_uniqueValue);
    }
  }

  chooseentity($event) {
    this.entity2 = $event.target.value;
    alert(this.entity2);
  }
  closeclose() {
    this.entitymenu = false;
    var elements = document.getElementsByClassName('textSelected') as HTMLCollectionOf<HTMLElement>;
    console.log(this.highlight);
    // for (let j = elements.length - 1; j >= 0; j--) {
    //    //elements[j].classList.remove('textSelected');
    //   elements[j].className = "annotate"; 
    // } 
    for (let j = elements.length - 1; j >= 0; j--) {
      if (elements[j].dataset.entityType) {
        elements[j].className = "annotate";
      }
      else {
        let text_id = elements[j].getAttribute("id");
        let element = document.getElementById(text_id);
        if (element.nodeName && ((element.nodeName.toLowerCase() == 'span') || (element.nodeName.toLowerCase() == 'ph'))) {
          element.insertAdjacentHTML("afterend", element.innerHTML);
        }
        else {
          if (element.className) {
            element.classList.remove('textSelected');
            if (!element.classList.length) {
              element.removeAttribute("class");
            }
          }
          let tag_id = element.getAttribute("id");
          if (tag_id) {
            let tag_id_index = -1;
            tag_id_index = tag_id.search("uniqueId_");
            if (tag_id_index != -1) {
              element.removeAttribute("id");
            }
          }
          element.insertAdjacentHTML("afterend", element.outerHTML);
        }
        element.remove();
        //elements[j].classList.remove("textSelected");
      }
    }
  }

  accept_annotation(type) {
    if (localStorage.getItem("storeentitydoc")) {
      let local_annotations = JSON.parse(localStorage.getItem("storeentitydoc"));
      if (local_annotations !== null) {
        var file_index = -1;
        file_index = local_annotations.findIndex((element) => {
          return element.documentselected == this.filename && element.projectselected == this.choosenproject;
        });
        if (file_index != -1) {
          var annotattions = local_annotations[file_index].localannotations;
          let row_index = -1;
          row_index = annotattions.findIndex(ele => ele.id == this.randomId);
          if (row_index != -1 && type == 'accept') {            
            document.getElementById(this.randomId).removeAttribute("data-score");
            document.getElementById(this.randomId).removeAttribute("data-accept");
            delete annotattions[row_index]["dataAccept"];
            delete annotattions[row_index]["dataScore"];
            annotattions[row_index]["dataEntityCertainty"] = "Y";
            local_annotations[file_index].localannotations = annotattions;
            localStorage.setItem('storeentitydoc', JSON.stringify(local_annotations));
            document.getElementById(this.randomId).setAttribute("data-entity-certainty", "Y");
            this.level_compliance = "";
            this.data_accept = "";
            //this.commonservice.sendUpdateNotification(true);
          } else if (row_index != -1 && type == 'reject') {
            var element_un_highlight = document.getElementById(this.randomId);
            if (element_un_highlight.nodeName == "SPAN" || element_un_highlight.nodeName == "PH") {
              element_un_highlight.outerHTML = element_un_highlight.innerHTML;
            }
            else {
              element_un_highlight.removeAttribute('data-entity-type');
              element_un_highlight.removeAttribute('data-entity-value');
              element_un_highlight.removeAttribute('data-entity-label');
              element_un_highlight.removeAttribute('data-entity-certainty');

              if (element_un_highlight.classList.contains("annotate")) {
                if (element_un_highlight.className) {
                  element_un_highlight.classList.remove('annotate');
                  if (!element_un_highlight.classList.length) {
                    element_un_highlight.removeAttribute("class");
                  }
                }
              } else if (element_un_highlight.classList.contains("over")) {
                if (element_un_highlight.className) {
                  element_un_highlight.classList.remove('over');
                  if (!element_un_highlight.classList.length) {
                    element_un_highlight.removeAttribute("class");
                  }
                }
              }
              else if (element_un_highlight.classList.contains("textSelected")) {
                if (element_un_highlight.className) {
                  element_un_highlight.classList.remove('textSelected');
                  if (!element_un_highlight.classList.length) {
                    element_un_highlight.removeAttribute("class");
                  }
                }
              }
            }
            annotattions[row_index]["dataEntityCertainty"] = "N";
            annotattions[row_index]["workflowStatus"] = "NERRejection";
            this.rejectAnnotationsList.push(annotattions[row_index]);            
            if (!local_annotations[file_index]["rejectAnnotationsList"]) {
              local_annotations[file_index]["rejectAnnotationsList"] = [];
            }
            local_annotations[file_index]["rejectAnnotationsList"].push(annotattions[row_index]);
            annotattions.splice(row_index, 1);
            local_annotations[file_index].localannotations = annotattions;
            localStorage.setItem('storeentitydoc', JSON.stringify(local_annotations));
            this.level_compliance = "";
            this.data_accept = "";
            this.commonservice.sendUpdateNotification(true);
            this.entitymenu = false;
          }
        }
      }
    }
  }
  accept_all_annotation(type) {
    if (localStorage.getItem("storeentitydoc")) {
      this.rejectAnnotationsList = [];
      let local_annotations = JSON.parse(localStorage.getItem("storeentitydoc"));
      if (local_annotations !== null) {
        var file_index = -1;
        file_index = local_annotations.findIndex((element) => {
          return element.documentselected == this.filename && element.projectselected == this.choosenproject;
        });
        if (file_index != -1 && this.pending_entities && this.pending_entities.length) {
          var annotattions = local_annotations[file_index].localannotations;
          for (var i = 0; i < this.pending_entities.length; i++) {
            let row_index = -1;
            row_index = annotattions.findIndex(ele => ele.id == this.pending_entities[i].id);
            if (row_index != -1 && type == 'accept') {
              document.getElementById(this.pending_entities[i].id).setAttribute("data-entity-certainty", "Y");
              document.getElementById(this.pending_entities[i].id).removeAttribute("data-score");
              document.getElementById(this.pending_entities[i].id).removeAttribute("data-accept");
              annotattions[row_index]["dataEntityCertainty"] = "Y";
              delete annotattions[row_index]["dataAccept"];
              delete annotattions[row_index]["dataScore"];
              //local_annotations[file_index].localannotations = annotattions;
            }
            else if (row_index != -1 && type == 'reject') {
              var element_un_highlight = document.getElementById(this.pending_entities[i].id);
              if (element_un_highlight.nodeName == "SPAN" || element_un_highlight.nodeName == "PH") {
                element_un_highlight.outerHTML = element_un_highlight.innerHTML;
              }
              else {
                element_un_highlight.removeAttribute('data-entity-type');
                element_un_highlight.removeAttribute('data-entity-value');
                element_un_highlight.removeAttribute('data-entity-label');
                element_un_highlight.removeAttribute('data-entity-certainty');

                if (element_un_highlight.classList.contains("annotate" || "over" || "textSelected")) {
                  element_un_highlight.removeAttribute('class');
                }
              }
              annotattions[row_index]["dataEntityCertainty"] = "N";
              annotattions[row_index]["workflowStatus"] = "NERRejection";
              this.rejectAnnotationsList.push(annotattions[row_index]);
              annotattions.splice(row_index, 1);

            }
          }
          local_annotations[file_index].localannotations = annotattions;
          if (!local_annotations[file_index]["rejectAnnotationsList"]) {
            local_annotations[file_index]["rejectAnnotationsList"] = [];
          }
          if (this.rejectAnnotationsList.length) {
            this.rejectAnnotationsList.forEach((item) => {
              local_annotations[file_index]["rejectAnnotationsList"].push(item);
            });            
          } 
          localStorage.setItem('storeentitydoc', JSON.stringify(local_annotations));
          this.display_pending_entities = "false";
          this.commonservice.sendUpdateNotification(true);

        }
      }
    }
  }
  deleteentity() {
    this.entitymenu = false;
    let entityToDelete;
    if (localStorage.getItem("storeentitydoc")) {
      let annotationlist = JSON.parse(localStorage.getItem("storeentitydoc"));
      for (let i = 0; i < annotationlist.length; i++) {
        if (annotationlist[i]["projectselected"] == this.choosenproject && annotationlist[i]["documentselected"] == this.filename) {
          this.prevannotationlist = annotationlist[i]["localannotations"];
          for (let j = 0; j < this.prevannotationlist.length; j++) {
            if (this.prevannotationlist[j].id == this.deleteentityid) {
              entityToDelete = this.prevannotationlist[j];
              this.deleteEntityFound = true;
              this.prevannotationlist.splice(j, 1);
              annotationlist[i]["localannotations"] = this.prevannotationlist;
              localStorage.setItem('storeentitydoc', JSON.stringify(annotationlist));
            }
          }
        }
      }
    }
    this.commonservice.senddeleteentity({ "entityId": this.deleteentityid });
    // this.commonservice.senddeleteentity({ "entityId": this.deleteentityid, "entityType": entityToDelete.dataEntityType, "uniqueValue": entityToDelete.uniqueValue });
    this.savechangespopup = true;    
    this.commonservice.sendsavechangespopup(this.savechangespopup);
  }
  // editentity() {
  //   this.entitymenu = false;
  //   if (localStorage.getItem("storeentitydoc")) {
  //     let annotationlist = JSON.parse(localStorage.getItem("storeentitydoc"));
  //     for (let i = 0; i < annotationlist.length; i++) {
  //       if (annotationlist[i]["projectselected"] == this.choosenproject && annotationlist[i]["documentselected"] == this.filename) {
  //         this.prevannotationlist = annotationlist[i]["localannotations"];
  //         for (let j = 0; j < this.prevannotationlist.length; j++) {
  //           if (this.prevannotationlist[j].dataEntityValue == this.entitytext) {
  //             this.prevannotationlist[j].dataEntityType = this.type;
  //             this.prevannotationlist[j].dataEntityLabel = this.label;
  //             this.prevannotationlist[j].uniqueValue = this.uniquevalue;
  //             this.prevannotationlist[j].type = this.entityType;
  //           }
  //           annotationlist[i]["localannotations"] = this.prevannotationlist;
  //           localStorage.setItem("storeentitydoc", JSON.stringify(annotationlist));
  //         }
  //       }
  //     }
  //   }
  //   this.commonservice.sendeditentity(this.entitytext);
  // }
  getUnique(array) {
    const uniqueArray = [];
    // Loop through array values
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  }

  ontypeChange() {
    this.edituniquevalue = "";
    //this.type = $event.target.value;
    if (this.entityType === 'Named Entity') {
      if (this.selectedProjectData) {
        this.namedentitylabellist = this.httpservice.labelFilter(this.selectedProjectData, this.type);

        if (this.namedentitylabellist[0]) {
          this.label = this.namedentitylabellist[0].dataEntityLabel;

          if (this.namedentitylabellist[0].extensible === "yes" || this.namedentitylabellist[0].extensible === true) {
            // this.namedentitylabellist.filter(x => { 
            //   if(x.dataEntityLabel === "") { 
            //     x.dataEntityLabel = "No label";
            //   } 
            // });
            // this.label = this.namedentitylabellist[0].dataEntityLabel;
            if (!(this.namedentitylabellist[0].dataEntityLabel)) {
              this.namedentitylabellist = this.removeDuplicates(this.selectedProjectData, "dataEntityLabel");
              this.label = this.namedentitylabellist[0].dataEntityLabel; // jan8
            }
          } else {
            // let filteredPrjSpecificLabels = this.selectedProjectData.filter(function (el) {
            //   return el.dataEntityLabel != "";
            // });
            var prjSpecificLabels = this.removeDuplicates(this.selectedProjectData, "dataEntityLabel");
            this.namedentitylabellist = prjSpecificLabels;
            this.label = this.namedentitylabellist[0].dataEntityLabel; // jan8
          }
        } else {
          // this.namedentitylabellist = this.alllabels;
          this.namedentitylabellist = this.removeDuplicates(this.alllabels, "dataEntityLabel");
          this.label = this.namedentitylabellist[0].dataEntityLabel;
        }
      }

      // if (this.selectedProjectData) {
      //   this.namedentitylabellist = this.httpservice.labelFilter(this.selectedProjectData, this.type);
      //   if (this.namedentitylabellist[0]) {
      //     if (this.namedentitylabellist[0].extensible === "yes" || this.namedentitylabellist[0].extensible === true) {
      //       this.label = this.namedentitylabellist[0].dataEntityLabel;
      //     } else {
      //       let filteredPrjSpecificLabels = this.selectedProjectData.filter(function (el) {
      //         return el.dataEntityLabel != "";
      //       });
      //       var prjSpecificLabels = this.removeDuplicates(filteredPrjSpecificLabels, "dataEntityLabel");
      //       // console.log("uniqueArray is: " + JSON.stringify(prjSpecificLabels));
      //       this.namedentitylabellist = prjSpecificLabels;
      //       this.label = this.namedentitylabellist[0].dataEntityLabel;

      //       // Previous Code
      //       // this.namedentitylabellist = this.alllabels;
      //       // this.label = this.namedentitylabellist[0].dataEntityLabel;
      //     }
      //   } else {
      //     this.namedentitylabellist = this.alllabels;
      //   }
      // }
    }
    this.savedisabled();
    this.disableRelCreOrEdit = true;

  }
  onlabelChange() {
    //this.label = $event.target.value;
    this.savedisabled();
    this.disableRelCreOrEdit = true;
  }
  onlabeladd() {
    //this.label = $event.target.value;
    this.savedisabled();
    this.disableRelCreOrEdit = true;
  }
  onuniquevalueadd() {
    // this.uniquevalue = this.uniquevalue.toLowerCase();
    //this.uniquevalue = $event.target.value;
    this.savedisabled();
    this.disableRelCreOrEdit = true;
  }
  savedisabled() {

    if (this.entityType == "entity") {
      this.issaveDisabled = true;
      this.toolTip1 = "";
    } else {
      if (this.type == "" || this.uniquevalue == "") {
        this.issaveDisabled = false;
        this.toolTip1 = "Save is disabled because entries are not implemented";
      } else {
        this.issaveDisabled = true;
        this.toolTip1 = "";
      }
    }


    // if (this.type == "" || this.uniquevalue == "") {
    //   this.issaveDisabled = false;
    //   this.toolTip1 = "Save is disabled because entries are not implemented";
    // }
    // else {
    //   this.issaveDisabled = true;
    //   this.toolTip1 = "";
    // }
  }
  highlightRange(range) {
    var newNode = document.createElement("div");
    newNode.setAttribute(
      "style",
      "background-color: yellow; display: inline;"
    );
    range.surroundContents(newNode);
  }

  cancelAnnotationEdit() {
    this.entitymenu = false;
  }

  saveentity() {
    this.isUpdated = true;
    this.entitymenu = false;
    this.isDisabled = false;
    this.issaveDisabled = false;

    var obj = {
      "projectId": this.choosenproject ? this.choosenproject : "",
      "project_name": this.choosenproject ? this.choosenproject : "",
      "type": this.entityType ? this.entityType : "",
      "dataEntityValue": this.entitytext ? this.entitytext : "",
      //"dataEntityType": this.entityType === "entity" ? "entity" : this.type,
      "dataEntityType": (this.entityType === "entity" || this.entityType === "Entity") ? "entity" : this.type,
      "dataEntityLabel": this.label ? this.label : "",
      // "uniqueValue": this.uniquevalue ? this.uniquevalue : "",
      "uniqueValue": this.entityType === "entity" ? this.uniqueEntityId : this.uniquevalue, // oct
      "startIndex": this.startindex ? this.startindex : 0,
      "endIndex": this.endindex ? this.endindex : 0,
      "context": this.annotateline ? this.annotateline : "",
      "workflowStatus": "Pending",
      "id": this.randomId ? this.randomId : "",
      "dataEntityCertainty": "N"
    };

    if (localStorage.getItem('storeentitydoc')) {
      this.storeentitydoc = JSON.parse(localStorage.getItem('storeentitydoc'));
      let file_index = this.storeentitydoc.findIndex((element) => {
        return element.documentselected == this.filename && element.projectselected == this.choosenproject;
      });
      if (file_index != -1) {
        let localAnnotations = this.storeentitydoc[file_index]["localannotations"];
        var localrelations = this.storeentitydoc[file_index]["localrelations"];
        let exist_id_index = localAnnotations.findIndex(ele => ele.id == this.randomId);
        if (exist_id_index != -1) {
          localAnnotations[exist_id_index] = obj;
        } else {
          localAnnotations.push(obj);
        }
        this.storeentitydoc[file_index]["localannotations"] = localAnnotations;

        // On type change delete relation 
        if (this.datasetComp && this.datasetComp.entityType != this.type && localrelations && localrelations.length) {
          for (let i = 0; i < localrelations.length; i++) {
            if (((localrelations[i]["entityType"] == this.datasetComp.entityType) && (localrelations[i]["dataEntityLabel"] == this.datasetComp.entityLabel)
              && (localrelations[i]["dataEntityValue"] == this.datasetComp.entityValue)) ||
              (((localrelations[i]["toEntityType"] == this.datasetComp.entityType) && (localrelations[i]["toEntityLabel"] == this.datasetComp.entityLabel)
                && (localrelations[i]["toDataEntityValue"] == this.datasetComp.entityValue)))
            ) {
              localrelations.splice(i, 1);
            }
          }
        }

        // for values change in relations   
        if (this.dataSet && this.dataSet.entityLabel != this.label && localrelations && localrelations.length) {
          localrelations.forEach(relation => {
            if (relation.entityType == this.dataSet.entityType && relation.dataEntityLabel == this.dataSet.entityLabel && relation.dataEntityValue == this.dataSet.entityValue) {
              relation.dataEntityLabel = this.label;
            }
            else if (relation.toEntityType == this.dataSet.entityType && relation.toEntityLabel == this.dataSet.entityLabel && relation.toDataEntityValue == this.dataSet.entityValue) {
              relation.toEntityLabel = this.label;
            }
          });
        }

        if ((this.dataSet && this.dataSet.entityType == "entity") || (this.dataSet && this.dataSet.entityType == "Entity")) {
          if (this.dataSet && this.dataSet.entityValue != this.uniqueEntityId && localrelations && localrelations.length) {
            localrelations.forEach(relation => {
              if (relation.entityType == this.dataSet.entityType && relation.dataEntityLabel == this.dataSet.entityLabel && relation.dataEntityValue == this.dataSet.entityValue) {
                relation.dataEntityValue = this.uniqueEntityId;
              }
              else if (relation.toEntityType == this.dataSet.entityType && relation.toEntityLabel == this.dataSet.entityLabel && relation.toDataEntityValue == this.dataSet.entityValue) {
                relation.toDataEntityValue = this.uniqueEntityId;
              }
            })
          }
        }
        else {
          if (this.dataSet && this.dataSet.entityValue != this.uniquevalue) {
            if (localrelations && localrelations.length) {
              localrelations.forEach(relation => {
                if (relation.entityType == this.dataSet.entityType && relation.dataEntityLabel == this.label && relation.dataEntityValue == this.dataSet.entityValue) {
                  relation.dataEntityValue = this.uniquevalue;
                }
                else if (relation.toEntityType == this.dataSet.entityType && relation.toEntityLabel == this.label && relation.toDataEntityValue == this.dataSet.entityValue) {
                  relation.toDataEntityValue = this.uniquevalue;
                }
              })
            }
          }
        }
        this.storeentitydoc[file_index]["localrelations"] = localrelations;
      }
      else {
        let newannotationsarray: Array<object> = [];
        newannotationsarray.push(obj);
        let latestentityobj = {
          'projectselected': this.choosenproject,
          'documentselected': this.filename,
          'localannotations': newannotationsarray,
        }
        this.storeentitydoc.push(latestentityobj);
      }
      localStorage.setItem('storeentitydoc', JSON.stringify(this.storeentitydoc));

    }
    else {
      let storeentity = [];
      let localannotationsarray: Array<object> = [];
      localannotationsarray.push(obj);
      storeentity[0] = {
        'projectselected': this.choosenproject,
        'documentselected': this.filename,
        'localannotations': localannotationsarray,
      }
      localStorage.setItem('storeentitydoc', JSON.stringify(storeentity));
    }
    //this.commonservice.sendannotatedata(this.saveentitylist);
    this.commonservice.sendUpdateNotification(this.isUpdated);
    this.savechangespopup = true;
    this.commonservice.sendsavechangespopup(this.savechangespopup);
  }

}
