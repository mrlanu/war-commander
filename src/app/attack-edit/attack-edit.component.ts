import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
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

  aboutVillage: AboutVillageModel = new AboutVillageModel(
    null,
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], null
  );

  attack: AttackModel = new AttackModel(
    '', '', true, '',
    0, 0, 3, new Date(), []
  );

  timeModel: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  seconds = true;

  attackForm: FormGroup;
  componentSubs: Subscription[] = [];

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
      x: new FormControl(0),
      y: new FormControl(0),
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
  }

  onSubmit() {
    this.attack = {
      ...this.attack,
      attackId: 'testAttack',
      playerId: this.attackForm.value.playerId,
      immediately: this.attackForm.value.immediately,
      villageName: this.attackForm.value.villageName,
      x: +this.attackForm.value.x,
      y: +this.attackForm.value.y,
      kindAttack: +this.attackForm.value.kind,
      time: this.attackForm.value.date,
      waves: this.attack.waves
    };

    if (this.showDate) {
    this.attack.time.setHours(
      this.attackForm.value.time.hour,
      this.attackForm.value.time.minute,
      this.attackForm.value.time.second);
    }

    console.log(this.attack);
    this.attackService.sendAttack(this.attack);
    this.attack.waves = [];
  }

  onImmediatelyChange(value) {
    this.showDate = !value.target.checked;
  }

  checkAvailableTroops(id, itself, amount) {
    if (+amount.target.value > this.aboutVillage.availableTroops[id]) {
      const input = itself as HTMLInputElement;
      this.attackForm.get(input.name).patchValue(this.aboutVillage.availableTroops[id]);
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
