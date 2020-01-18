import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {AttackModel} from '../models/attack.model';
import {AttackService} from '../services/attack.service';
import {AboutVillageModel} from '../models/about-village.model';

@Component({
  selector: 'app-attack-edit',
  templateUrl: './attack-edit.component.html',
  styleUrls: ['./attack-edit.component.css']
})
export class AttackEditComponent implements OnInit, OnDestroy {

  showDate = false;

  aboutVillage: AboutVillageModel = {
    name: null,
    availableTroops: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    allVillageList: null
  };

  attackForm: FormGroup;
  componentSubs: Subscription[] = [];
  timeModel: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  seconds = true;
  date: Date;

  attack: AttackModel = {
    playerId: '',
    attackId: '',
    immediately: true,
    villageName: '',
    x: 0,
    y: 0,
    kindAttack: 3,
    time: new Date(),
    waves: []
  };


  constructor(private attackService: AttackService) { }

  ngOnInit() {
    this.initForm();
    this.componentSubs.push(this.attackService.aboutVillageChanged
      .subscribe((village: AboutVillageModel) => {
        this.aboutVillage = village;
      }));
    this.attackService.getAboutVillage('03uiKT73dYMsa7Z');
  }

  initForm() {

    this.attackForm = new FormGroup({
      id: new FormControl(),
      villageName: new FormControl(),
      immediately: new FormControl(true),
      time: new FormControl(this.timeModel),
      date: new FormControl(new Date()),
      x: new FormControl(0, Validators.required),
      y: new FormControl(0, Validators.required),
      kind: new FormControl('3'),
      playerId: new FormControl('mrlanu'),
      u21: new FormControl(0),
      u22: new FormControl(0),
      u23: new FormControl(0),
      u24: new FormControl(0),
      u25: new FormControl(0),
      u26: new FormControl(0),
      u27: new FormControl(0),
      u28: new FormControl(0),
      u29: new FormControl(0),
      u30: new FormControl(0),
      u31: new FormControl(0),
      firstTarget: new FormControl('99'),
      secondTarget: new FormControl('99'),
    });
    this.attackForm.controls.date.disable();
    this.attackForm.controls.time.disable();
  }

  onSubmit() {
    // tslint:disable-next-line:label-position
    this.date = this.attackForm.value.date;
    this.date.setHours(this.attackForm.value.time.hour, this.attackForm.value.time.minute, this.attackForm.value.time.second);

    this.attack = {
      playerId: this.attackForm.value.playerId,
      attackId: 'testAttack',
      immediately: this.attackForm.value.immediately,
      villageName: this.attackForm.value.villageName,
      x: +this.attackForm.value.x,
      y: +this.attackForm.value.y,
      kindAttack: +this.attackForm.value.kind,
      time: this.attackForm.value.date,
      waves: this.attack.waves
    };

    console.log(this.attack);

    /*this.attackService.sendAttack(this.attack);*/
  }


  getControls() {
    return (this.attackForm.get('breakingDetails') as FormArray).controls;
  }

  onImmediatelyChange(value) {
    if (value.target.checked) {
      this.attackForm.controls.date.disable();
      this.attackForm.controls.time.disable();
      this.showDate = false;
    } else {
      this.attackForm.controls.date.enable();
      this.attackForm.controls.time.enable();
      this.showDate = true;
    }
  }

  onAddWave() {
    this.attack.waves.push({
      troops: [+this.attackForm.value.u21, +this.attackForm.value.u22, +this.attackForm.value.u23, +this.attackForm.value.u24,
        +this.attackForm.value.u25, +this.attackForm.value.u26, +this.attackForm.value.u27, +this.attackForm.value.u28,
        +this.attackForm.value.u29, +this.attackForm.value.u30, +this.attackForm.value.u31],
      firstTarget: +this.attackForm.value.firstTarget,
      secondTarget: +this.attackForm.value.secondTarget});
    this.attackForm.patchValue(
      {u21: 0, u22: 0, u23: 0, u24: 0, u25: 0, u26: 0, u27: 0, u28: 0, u29: 0, u30: 0, u31: 0,
        firstTarget: '99', secondTarget: '99'}
      );
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
