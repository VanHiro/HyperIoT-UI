import { Component, OnInit, ViewChild, Injectable, AfterViewInit } from '@angular/core';
import { HProject, HDevice, HPacket, Rule } from '@hyperiot/core';
import { Router, CanDeactivate } from '@angular/router';
import { Subject } from 'rxjs';
import { ProjectWizardService } from 'src/app/services/projectWizard/project-wizard.service';
import { ProjectFormEntity } from '../project-forms/project-form-entity';
import { ProjectFormComponent } from '../project-forms/project-form/project-form.component';
import { DeviceFormComponent } from '../project-forms/device-form/device-form.component';
import { PacketFormComponent } from '../project-forms/packet-form/packet-form.component';
import { DeviceSelectComponent } from './device-select/device-select.component';
import { PacketFieldsFormComponent } from '../project-forms/packet-fields-form/packet-fields-form.component';
import { SummaryListItem } from '../project-detail/generic-summary-list/generic-summary-list.component';

@Injectable({
  providedIn: 'root',
})
export class ProjectWizardCanDeactivate implements CanDeactivate<ProjectWizardComponent>{
  canDeactivate(com: ProjectWizardComponent) {
    if (com.currentProject == null || com.finishOpen)
      return true;
    else {
      com.deactivateModal = true;
      return com.canDeactivate$;
    }
  }
}

@Component({
  selector: 'hyt-project-wizard',
  templateUrl: './project-wizard.component.html',
  styleUrls: ['./project-wizard.component.scss']
})
export class ProjectWizardComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper', { static: false }) stepper;

  currentForm: ProjectFormEntity;

  @ViewChild('projectData', { static: false })
  projectData: ProjectFormComponent;

  @ViewChild('devicesData', { static: false })
  devicesData: DeviceFormComponent;

  @ViewChild('packetsData', { static: false })
  packetsData: PacketFormComponent;

  @ViewChild('deviceSelect', { static: false })
  deviceSelect: DeviceSelectComponent;

  @ViewChild('fieldsData', { static: false })
  fieldsData: PacketFieldsFormComponent;

  currentProject: HProject;
  currentDevice: HDevice;
  hDevices: HDevice[] = [];
  hPackets: HPacket[] = [];
  enrichmentRules: Rule[] = [];
  eventRules: Rule[] = [];

  projectValidated: boolean = false;
  devicesValidated: boolean = false;
  packetsValidated: boolean = false;
  fieldsValidated: boolean = false;
  enrichmentValidated: boolean = false;
  statisticsValidated: boolean = false;
  eventsValidated: boolean = false;

  ovpOpen: boolean = false;
  finishOpen: boolean = false;

  constructor(
    private router: Router,
    private wizardService: ProjectWizardService
  ) { }

  ngOnInit() {
    this.wizardService.hDevices$.subscribe(
      (res: HDevice[]) => {
        this.hDevices = [...res];
        if (res && res.length != 0)
          this.devicesValidated = true;
        else
          this.devicesValidated = false;
      }
    );
    this.wizardService.hPackets$.subscribe(
      (res: HPacket[]) => {
        this.hPackets = [...res];
        if (res && res.length != 0) {
          this.packetsValidated = true;
          this.fieldsValidated = true;
        }
        else {
          this.packetsValidated = false;
          this.fieldsValidated = false;
        }
      }
    );
    this.wizardService.enrichmentRules$.subscribe(
      (res: Rule[]) => {
        this.enrichmentRules = [...res];
      }
    );
    this.wizardService.eventRules$.subscribe(
      (res: Rule[]) => {
        this.eventRules = [...res];
      }
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {//TODO...setimeout 0 to avoid 'expression changed after view checked'
      this.currentForm = this.projectData;
    }, 0);
  }

  hintMessage = '';
  hintVisible = false;

  stepChanged(event) {
    console.log(event);

    //setting current form...
    switch (event.selectedIndex) {
      case 0: {
        this.currentForm = this.projectData;
        break;
      }
      case 1: {
        this.currentForm = this.devicesData;
        break;
      }
      case 2: {
        this.currentForm = this.packetsData;
        break;
      }
      case 3: {
        // this.currentForm = this.fieldsData;
        break;
      }
      case 4: {
        break;
      }
      case 5: {
        break;
      }
      case 6: {
        break;
      }
      default: {
        console.log("error");
      }
    }

    // this.wizardService.stepChanged(event.selectedIndex);
  }

  updateList(ent: any, entityList: any[]): any[] {
    let fin = entityList.find(x => x.id == ent.id);
    if (fin) {
      const en = this.hDevices.find(x => x.id == ent.id);
      entityList[this.hDevices.indexOf(en)] = ent;
    }
    else
      entityList.push(ent);
    return entityList;
  }

  deleteFromList(entId: number, entityList: any[]) {
    for (let k = 0; k < entityList.length; k++) {
      if (entityList[k].id == entId)
        entityList.splice(k, 1);
    }
    return entityList;
  }

  onSaveClick(e) {
    this.currentForm.save((ent, isNew) => {

      if (this.currentForm == this.projectData) {
        this.currentProject = ent;
      }

      else if (this.currentForm == this.devicesData) {
        this.currentForm.entity = {};
        this.currentForm.cleanForm();
        this.hDevices = [...this.updateList(ent, this.hDevices)];
        this.currentForm.summaryList = {
          title: 'Devices',
          list: this.hDevices.map((d) => {
            return { name: d.deviceName, description: d.description, data: d };
          }) as SummaryListItem[]
        };
      }

      else if (this.currentForm == this.packetsData) {
        this.currentForm.entity = {};
        this.currentForm.cleanForm();
        this.hPackets = [...this.updateList(ent, this.hPackets)];
        this.currentForm.summaryList = {
          title: 'Packets',
          list: this.hPackets.map((p) => {
            return { name: p.name, description: p.trafficPlan, data: p };
          }) as SummaryListItem[]
        };

      }

      // this.currentForm.entity.id = null;

    }, (error) => {
      // TODO: ...
    });
  }
  onEntityEvent(data: any) {
    switch (data.event) {
      case 'hint:show':
        this.showHintMessage(data.message);
        break;
      case 'hint:hide':
        this.hideHintMessage();
        break;
    }
  }

  showHintMessage(message: string): void {
    this.hintMessage = message;
    this.hintVisible = true;
  }
  hideHintMessage(): void {
    this.hintVisible = false;
  }


  onSummaryItemClick(event): void {
  }

  menuAction(event): void {
    console.log(event.item)
    switch (event.action) {
      case 'edit':
        if (this.currentForm == this.packetsData)
          this.deviceSelect.selectSpecific(event.item.data.device.id);
        this.currentForm.entity.id = event.item.data.id;
        this.currentForm.edit(event.item.data);
        break;
      case 'duplicate':
        if (this.currentForm == this.packetsData)
          this.deviceSelect.selectSpecific(event.item.data.device.id);
        this.currentForm.clone(event.item.data);
        break;
      case 'delete':
        console.log(this.currentForm.entity);
        this.currentForm.entity = event.item.data;
        this.currentForm.delete((del) => {

          if (this.currentForm == this.devicesData) {
            this.hDevices = [...this.deleteFromList(event.item.data.id, this.hDevices)];
            this.currentForm.summaryList = {
              title: 'Devices',
              list: this.hDevices.map((d) => {
                return { name: d.deviceName, description: d.description, data: d };
              }) as SummaryListItem[]
            };
          }

          else if (this.currentForm == this.packetsData) {
            this.hPackets = [...this.deleteFromList(event.item.data.id, this.hPackets)];
            this.currentForm.summaryList = {
              title: 'Packets',
              list: this.hPackets.map((p) => {
                return { name: p.name, description: p.trafficPlan, data: p };
              }) as SummaryListItem[]
            };
          }

          this.currentForm.entity = {};

        }, (err) => {
          // TODO: ...
        });
        break;
    }
  }

  deviceChanged(event): void {
    this.currentDevice = event;
  }

  fieldCurrentPacket: HPacket;
  fieldPacketChanged(event): void {
    this.fieldCurrentPacket = event.id;
    if (this.fieldsData.packetId) {
      console.log("asdfasdf")
      //this.fieldsData.loadData();
    }
  }

  enrichmentCurrentPacket: HPacket;
  enrichmentPacketChanged(event): void {
    this.enrichmentCurrentPacket = event;
  }

  eventCurrentPacket: HPacket;
  eventPacketChanged(event): void {
    this.eventCurrentPacket = event;
  }

  updateProject(proj: HProject) {
    if (proj) {
      this.currentProject = proj;
      this.projectValidated = true;
    }
    setTimeout(() => {
      this.stepper.next();
    }, 0);
  }

  openOptionModal() {
    this.ovpOpen = true;
    this.enrichmentValidated = true;
    this.statisticsValidated = true;
    this.eventsValidated = true;
  }

  closeOptionModal() {
    this.ovpOpen = false;
  }

  openFinishModal() {
    this.ovpOpen = false;
    this.finishOpen = true;
  }

  closeFinishModal() {
    this.finishOpen = false;
  }

  goToStepByIndex(index: number) {
    this.stepper.changeStep(index);
    this.closeOptionModal();
  }

  goToDashboard() {
    this.router.navigate(['/dashboards']);
  }

  goToProjectWizard() {
    this.router.navigate(['/projects']);
  }

  //Deactivation logic

  canDeactivate$: Subject<boolean> = new Subject<boolean>();

  deactivateModal: boolean = false;

  deactivate(cd: boolean): void {
    this.deactivateModal = false;
    this.canDeactivate$.next(cd);
  }

}
