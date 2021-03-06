import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import {AttackModel} from '../models/attack.model';
import {AttackService} from '../services/attack.service';
import {AboutVillageModel} from '../models/about-village.model';

declare var $: any;

@Component({
  selector: 'app-attack-edit',
  templateUrl: './attack-edit.component.html',
  styleUrls: ['./attack-edit.component.css']
})
export class AttackEditComponent implements OnInit, OnDestroy {

  showDate = false;
  loading = false;
  connected = false;

  aboutVillage: AboutVillageModel = new AboutVillageModel(
    null,
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    null
  );

  attack: AttackModel = new AttackModel(
    '', '', true, '',
    0, 0, 3, new Date(), [], 0
  );

  targets: string[] = ['Случайная цель', 'Случайная цель'];

  timeModel: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  seconds = true;

  attackForm: FormGroup;
  componentSubs: Subscription[] = [];
  @ViewChild('spam', {static: false}) spam;

  constructor(public attackService: AttackService) { }

  private static onOpenErrorModal() {
    $('#errorModal').modal('show');
  }

  private static onOpenSuccessModal() {
    $('#successModal').modal('show');
  }

  ngOnInit() {
    this.initForm();
    this.componentSubs.push(this.attackService.villagesChanged
      .subscribe((info: AboutVillageModel) => {
        if (info) {
          this.aboutVillage.allVillageList = info.allVillageList;
          this.attackService.connectedChanged.next(true);
          if (info.allVillageList.length < 1) {
            AttackEditComponent.onOpenErrorModal();
            this.attackService.connectedChanged.next(false);
          }
        } else {
          AttackEditComponent.onOpenErrorModal();
        }
        this.attackService.loadingChanged.next(false);
      }));
    this.componentSubs.push(this.attackService.availableTroopsChanged
      .subscribe((info: AboutVillageModel) => {
        if (info) {
          this.aboutVillage.availableTroops = info.availableTroops;
        }
        this.attackService.loadingChanged.next(false);
      }));
    this.componentSubs.push(this.attackService.loadingChanged
      .subscribe((status: boolean) => {
        this.loading = status;
      }));
    this.componentSubs.push(this.attackService.connectedChanged
      .subscribe((status: boolean) => {
        this.connected = status;
        if (status) {
          this.setEnable();
        }
      }));
  }

  private setEnable() {
    this.attackForm.controls.villageName.enable();
    this.attackForm.controls.immediately.enable();
    this.attackForm.controls.time.enable();
    this.attackForm.controls.date.enable();
    this.attackForm.controls.x.enable();
    this.attackForm.controls.y.enable();
    this.attackForm.controls.kind.enable();
    this.attackForm.controls.timeCorrection.enable();
    this.attackForm.controls.u21.enable();
    this.attackForm.controls.u22.enable();
    this.attackForm.controls.u23.enable();
    this.attackForm.controls.u24.enable();
    this.attackForm.controls.u25.enable();
    this.attackForm.controls.u26.enable();
    this.attackForm.controls.u27.enable();
    this.attackForm.controls.u28.enable();
    this.attackForm.controls.u29.enable();
    this.attackForm.controls.u30.enable();
    this.attackForm.controls.u31.enable();
  }

  onConnect() {
    this.attackService.loadingChanged.next(true);
    this.attackService.getAllVillages(this.attackForm.value.clientId);
  }

  initForm() {

    this.attackForm = new FormGroup({
      id: new FormControl(),
      villageName: new FormControl({value: '', disabled: true}),
      immediately: new FormControl({value: true, disabled: true}),
      time: new FormControl({value: this.timeModel, disabled: true}),
      date: new FormControl({value: new Date(), disabled: true}),
      x: new FormControl({value: '', disabled: true}, Validators.required),
      y: new FormControl({value: '', disabled: true}, Validators.required),
      kind: new FormControl({value: '3', disabled: true}),
      clientId: new FormControl(),
      timeCorrection: new FormControl({value: 0, disabled: true}),
      u21: new FormControl({value: 0, disabled: true}),
      u22: new FormControl({value: 0, disabled: true}),
      u23: new FormControl({value: 0, disabled: true}),
      u24: new FormControl({value: 0, disabled: true}),
      u25: new FormControl({value: 0, disabled: true}),
      u26: new FormControl({value: 0, disabled: true}),
      u27: new FormControl({value: 0, disabled: true}),
      u28: new FormControl({value: 0, disabled: true}),
      u29: new FormControl({value: 0, disabled: true}),
      u30: new FormControl({value: 0, disabled: true}),
      u31: new FormControl({value: 0, disabled: true}),
      firstTarget: new FormControl({value: '99', disabled: true}),
      secondTarget: new FormControl({value: '99', disabled: true}),
    });
  }

  onSpam(event: any) {
    if (event.target.checked) {
      this.attackForm.patchValue({x: 0, y: 0});
    } else {
      this.attackForm.patchValue({x: '', y: ''});
    }
  }

  onVillageChange(villageName: string) {
    this.attackService.loadingChanged.next(true);
    this.attackService.getAllTroops(this.attackForm.value.clientId, villageName);
  }

  onImmediatelyChange(value) {
    this.showDate = !value.target.checked;
  }

  onChangeTarget(targetNumber: number, event: any) {
    const value = event.target.options.selectedIndex.toString();
    this.targets[targetNumber - 1] = event.target.options[value].text;
  }

  onAddWave() {
    const troops = [+this.attackForm.value.u21, +this.attackForm.value.u22, +this.attackForm.value.u23, +this.attackForm.value.u24,
      +this.attackForm.value.u25, +this.attackForm.value.u26, +this.attackForm.value.u27, +this.attackForm.value.u28,
      +this.attackForm.value.u29, +this.attackForm.value.u30, +this.attackForm.value.u31];

    const summ = troops.reduce((a, b) => a + b, 0);
    if (summ === 0) {
      return;
    }

    this.attack.waves.push({
      troops,
      firstTarget: +this.attackForm.value.firstTarget, firstTargetText: this.targets[0],
      secondTarget: +this.attackForm.value.secondTarget, secondTargetText: this.targets[1]});

    this.aboutVillage.availableTroops[0] = +this.aboutVillage.availableTroops[0] - +this.attackForm.value.u21;
    this.aboutVillage.availableTroops[1] = +this.aboutVillage.availableTroops[1] - +this.attackForm.value.u22;
    this.aboutVillage.availableTroops[2] = +this.aboutVillage.availableTroops[2] - +this.attackForm.value.u23;
    this.aboutVillage.availableTroops[3] = +this.aboutVillage.availableTroops[3] - +this.attackForm.value.u24;
    this.aboutVillage.availableTroops[4] = +this.aboutVillage.availableTroops[4] - +this.attackForm.value.u25;
    this.aboutVillage.availableTroops[5] = +this.aboutVillage.availableTroops[5] - +this.attackForm.value.u26;
    this.aboutVillage.availableTroops[6] = +this.aboutVillage.availableTroops[6] - +this.attackForm.value.u27;
    this.aboutVillage.availableTroops[7] = +this.aboutVillage.availableTroops[7] - +this.attackForm.value.u28;
    this.aboutVillage.availableTroops[8] = +this.aboutVillage.availableTroops[8] - +this.attackForm.value.u29;
    this.aboutVillage.availableTroops[9] = +this.aboutVillage.availableTroops[9] - +this.attackForm.value.u30;
    this.aboutVillage.availableTroops[10] = +this.aboutVillage.availableTroops[10] - +this.attackForm.value.u31;

    this.attackForm.patchValue(
      {u21: 0, u22: 0, u23: 0, u24: 0, u25: 0, u26: 0, u27: 0, u28: 0, u29: 0, u30: 0, u31: 0,
        firstTarget: '99', secondTarget: '99'}
    );

    this.targets = ['Случайная цель', 'Случайная цель'];
  }

  onWaveDelete(i: number) {
    this.aboutVillage.availableTroops[0] = +this.aboutVillage.availableTroops[0] + this.attack.waves[i].troops[0];
    this.aboutVillage.availableTroops[1] = +this.aboutVillage.availableTroops[1] + this.attack.waves[i].troops[1];
    this.aboutVillage.availableTroops[2] = +this.aboutVillage.availableTroops[2] + this.attack.waves[i].troops[2];
    this.aboutVillage.availableTroops[3] = +this.aboutVillage.availableTroops[3] + this.attack.waves[i].troops[3];
    this.aboutVillage.availableTroops[4] = +this.aboutVillage.availableTroops[4] + this.attack.waves[i].troops[4];
    this.aboutVillage.availableTroops[5] = +this.aboutVillage.availableTroops[5] + this.attack.waves[i].troops[5];
    this.aboutVillage.availableTroops[6] = +this.aboutVillage.availableTroops[6] + this.attack.waves[i].troops[6];
    this.aboutVillage.availableTroops[7] = +this.aboutVillage.availableTroops[7] + this.attack.waves[i].troops[7];
    this.aboutVillage.availableTroops[8] = +this.aboutVillage.availableTroops[8] + this.attack.waves[i].troops[8];
    this.aboutVillage.availableTroops[9] = +this.aboutVillage.availableTroops[9] + this.attack.waves[i].troops[9];
    this.aboutVillage.availableTroops[10] = +this.aboutVillage.availableTroops[10] + this.attack.waves[i].troops[10];
    this.attack.waves.splice(i, 1);
  }

  onSubmit(isSpam: boolean) {
    this.attack = {
      ...this.attack,
      attackId: 'testAttack',
      clientId: this.attackForm.value.clientId,
      immediately: this.attackForm.value.immediately,
      villageName: this.attackForm.value.villageName,
      x: +this.attackForm.value.x,
      y: +this.attackForm.value.y,
      kindAttack: +this.attackForm.value.kind,
      time: this.attackForm.value.date,
      waves: this.attack.waves,
      timeCorrection: +this.attackForm.value.timeCorrection
    };

    if (this.showDate) {
    this.attack.time.setHours(
      this.attackForm.value.time.hour,
      this.attackForm.value.time.minute,
      this.attackForm.value.time.second);
    }

    if (isSpam) {
      this.attackService.sendSpam(this.attack);
    } else {
      this.attackService.sendAttack(this.attack);
    }
    this.attack.waves = [];
    this.aboutVillage.availableTroops = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.attackForm.reset({
      immediately: true,
      time: this.timeModel,
      date: new Date(),
      x: 0,
      y: 0,
      kind: '3',
      clientId: this.attackForm.value.clientId,
      timeCorrection: 0,
      u21: 0,
      u22: 0,
      u23: 0,
      u24: 0,
      u25: 0,
      u26: 0,
      u27: 0,
      u28: 0,
      u29: 0,
      u30: 0,
      u31: 0,
      firstTarget: '99',
      secondTarget: '99',
    });
    this.showDate = false;

    AttackEditComponent.onOpenSuccessModal();
  }

  checkAvailableTroops(id, itself, amountEvent) {
    const amount = +amountEvent.target.value;
    if (amount > this.aboutVillage.availableTroops[id]) {
      const input = itself as HTMLInputElement;
      this.attackForm.get(input.name).patchValue(this.aboutVillage.availableTroops[id]);
    }
    if (id === 7 && amount >= 1 && +this.attackForm.value.kind === 3) {
      this.attackForm.controls.firstTarget.enable();
    } else if ((id === 7 && amount < 1) || +this.attackForm.value.kind !== 3) {
      this.attackForm.controls.firstTarget.disable();
    }
    if (id === 7 && amount >= 20 && +this.attackForm.value.kind === 3) {
      this.attackForm.controls.secondTarget.enable();
    } else if ((id === 7 && amount < 20) || +this.attackForm.value.kind !== 3) {
      this.attackForm.controls.secondTarget.disable();
    }
  }

  onKindChange() {
    if (+this.attackForm.value.kind === 3) {
      this.attackForm.controls.firstTarget.enable();
      this.attackForm.controls.secondTarget.enable();
    } else if (+this.attackForm.value.kind !== 3) {
      this.attackForm.controls.firstTarget.disable();
      this.attackForm.controls.secondTarget.disable();
    }
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
