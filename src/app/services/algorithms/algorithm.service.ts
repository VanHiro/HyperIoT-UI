import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {algorithmType} from "./algorithmType.mode";
import {AlgorithmsService, Algorithm} from "core";

export interface AlgorithmsState {
  state: string;
  algorithmToDelete: number;
  algorithmList: Algorithm[];
}

@Injectable({
  providedIn: 'root'
})
export class AlgorithmService {

  subAlgorithms = new Subject<AlgorithmsState>();

  nextAlgorithms: AlgorithmsState = {
    state: 'initial',
    algorithmToDelete: null,
    algorithmList: []
  };

  constructor(
    private algorithmService: AlgorithmsService
  ) { }

  updateAlgorithmList(type: algorithmType) {
    this.algorithmService.findAllAlgorithm(type).subscribe(
      res => {
        this.nextAlgorithms.state = 'update-success';
        this.nextAlgorithms.algorithmList = res;
        this.subAlgorithms.next(this.nextAlgorithms);
      },
      err => {
        this.nextAlgorithms.state = 'update-error';
        this.subAlgorithms.next(this.nextAlgorithms);
      }
    );
  }

  deleteAlgorithm(algorithmId: number) {
    this.nextAlgorithms.state = 'delete-loading';
    this.nextAlgorithms.algorithmToDelete = algorithmId;
    this.subAlgorithms.next(this.nextAlgorithms);
    this.algorithmService.deleteAlgorithm(algorithmId)
    .subscribe(
      (res) => {
        this.nextAlgorithms.state = 'delete-success';
        this.nextAlgorithms.algorithmList = this.nextAlgorithms.algorithmList.filter(value => value.id !== algorithmId );
        this.subAlgorithms.next(this.nextAlgorithms);
      },
      (err) => {
        this.nextAlgorithms.state = 'delete-error';
        this.subAlgorithms.next(this.nextAlgorithms);
      }
    );
  }
}
