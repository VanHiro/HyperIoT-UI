import { Component, ViewChild, ElementRef, Injector, ChangeDetectorRef, ViewEncapsulation, Input, AfterViewInit, OnInit } from '@angular/core';

import { Subject, PartialObserver } from 'rxjs';

import { AlgorithmsService, Algorithm } from '@hyperiot/core';

import { AlgorithmFormEntity, LoadingStatusEnum } from '../algorithm-form-entity';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'hyt-algorithm-jar-form',
  templateUrl: './algorithm-jar-form.component.html',
  styleUrls: ['./algorithm-jar-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlgorithmJarFormComponent extends AlgorithmFormEntity implements AfterViewInit, OnInit {

  algorithm: Algorithm;

  algorithmObserver: PartialObserver<Algorithm> = {
    next: res => {
      this.algorithm = res;
      this.load();
    }
  };

  divHeight: number;
  entity = {} as Algorithm;

  entityFormMap = {
    'algorithm-jarName': {
      field: 'jarName',
      default: null
    },
    'algorithm-mainclassname': {
      field: 'mainClassname',
      default: null
    }
  };

  jarToUpload: File = null;

  showPreloader: boolean;

  nameOfJarFile: string = '';
  
  /**
   * Variable used to prevent multiple click on choose file button 
   */
  btnChooseIsDisabled: boolean = false;

  @Input() currentAlgorithmSubject: Subject<Algorithm>;

  private overlayHeight: ElementRef;

  @ViewChild('overlayHeight') set content(content: ElementRef) {
    
    if (!content) {

      this.showPreloader = false;
      return;

    } else {

      this.showPreloader = true;
      this.overlayHeight = content;

    }

  }

  form = new FormGroup({
    jarName: new FormControl('')
  });

  constructor(
    private algorithmsService: AlgorithmsService,
    injector: Injector,
    private cdr: ChangeDetectorRef
  ) {
    super(injector);
    this.formTemplateId = 'container-algorithm-jar';
    this.longDefinition = this.entitiesService.algorithm.longDefinition;
    this.formTitle = this.entitiesService.algorithm.formTitle;
    this.icon = this.entitiesService.algorithm.icon;
    this.loadingStatus = LoadingStatusEnum.Loading;
  }

  ngOnInit() {

    this.currentAlgorithmSubject.subscribe(this.algorithmObserver);
    
    this.form.controls.jarName.valueChanges.subscribe(
      (change: string) => {

        if(change){

          console.log('CHANGE:', change);
          let fakeStr = change.includes('fake');

          if(fakeStr) {

            let splitStr = change.split("\\");
            console.log('SPLIT', splitStr);
            let controlFileName = splitStr[splitStr.length - 1].split('.');
            if(controlFileName[controlFileName.length - 1].toLowerCase() == 'jar') {
              // JAR extension
            } else {
              // NOT JAR extension
            }
            // this.form.controls.jarName.setValue(splitStr[splitStr.length - 1]);
            // this.form.controls.jarName.updateValueAndValidity();

          } else {

            

          }

        }
        
      }
    );
    
  }

  ngAfterViewInit() {
    this.loadEmpty();
    this.cdr.detectChanges();
  }

  getCustomClass() {
    if (this.showPreloader) {
      if (this.divHeight > 353) { /* BIG */
        return 'loading-logo display-logo big-bg';
      }
      if (this.divHeight >= 293 && this.divHeight <= 352) { /* MEDIUM */
        return 'loading-logo display-logo medium-bg';
      }
      if (this.divHeight >= 233 && this.divHeight <= 292) { /* SMALL */
        return 'loading-logo display-logo small-bg';
      }
      if (this.divHeight >= 182 && this.divHeight <= 232) { /* X-SMALL */
        return 'loading-logo display-logo x-small-bg';
      }
      if (this.divHeight < 182) { /* X-SMALL */
        return '';
      }
    } else {
      return '';
    }
  }

  handleFileInput(files: FileList) {
    console.log("files:", files.length);
    console.log("files2:", files);
    if(files.length > 0) { 
  
      this.jarToUpload = files.item(0);
      this.form.value['jarName'] = files[0].name;
      console.log("JAR:",this.jarToUpload);

    }else{
      this.form.value['jarName'] = '';
    }
    
    this.cdr.detectChanges();
    
  }

  load() {
    this.loadingStatus = LoadingStatusEnum.Loading;

    /******* VALUE LOADING OVERLAY *******/

    setTimeout(() => {

      this.divHeight = this.overlayHeight.nativeElement.clientHeight;

    }, 0);

    this.cdr.detectChanges();

    /******* END VALUE LOADING OVERLAY *******/

    this.entity = this.algorithm;
    this.edit();
    this.loadingStatus = LoadingStatusEnum.Ready;
  }

  loadEmpty() {
    this.form.reset();
    this.entity = { ...this.entitiesService.algorithm.emptyModel };
    this.edit();
  }

  private updateJar(successCallback?, errorCallback?) {
    this.loadingStatus = LoadingStatusEnum.Saving;
    this.resetErrors();
    let p = this.entity;
    p.mainClassname = this.form.get('algorithm-mainclassname').value;
    const responseHandler = (res) => {
      this.entity = p = res;
      this.resetForm();
      this.entityEvent.emit({
        event: 'pw:algorithm-updated',
        algorithm: res
      });
      this.loadingStatus = LoadingStatusEnum.Ready;
      successCallback && successCallback(res);
    };
    p.entityVersion = 1;
    this.algorithmsService.updateJar(p.id, p.mainClassname, this.jarToUpload).subscribe(responseHandler, (err) => {
      this.setErrors(err);
      errorCallback && errorCallback(err);
    });
  }

  setErrors(err) {
    if (err.error && err.error.type) {
      switch (err.error.type) {
        case 'it.acsoftware.hyperiot.base.exception.HyperIoTValidationException': {
          super.setErrors(err);
          break;
        }
        default: {
          this.loadingStatus = LoadingStatusEnum.Error;
        }
      }
    } else {
      this.loadingStatus = LoadingStatusEnum.Error;
    }
  }

  // AlgorithmDetailEntity interface
  save(successCallback, errorCallback) {
    this.updateJar(successCallback, errorCallback);
  }
  
  /**
   * Function used to simulate click on choose file
   */
  clickChooseLabel(){

    this.btnChooseIsDisabled = true;
    const inputChooseFile = document.getElementById('jarName');
    inputChooseFile.click();
    setTimeout(() => this.btnChooseIsDisabled = false, 600);

  }

  isJarName(): string {
    if(this.jarToUpload && this.jarToUpload != null){
      return this.jarToUpload.name;
    }else{
      return "";
    }
  }

  resetTitleSelected() {
    this.jarToUpload = null;
    this.form.controls.jarName.setValue('');
    this.form.controls.jarName.updateValueAndValidity();
    console.log('RESET UPLOAD:', this.jarToUpload)
    this.cdr.detectChanges();
  }

}