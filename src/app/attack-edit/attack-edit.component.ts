import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-attack-edit',
  templateUrl: './attack-edit.component.html',
  styleUrls: ['./attack-edit.component.css']
})
export class AttackEditComponent implements OnInit, OnDestroy {

  attackForm: FormGroup;
  componentSubs: Subscription[] = [];
  timeModel: NgbTimeStruct = {hour: 0, minute: 0, second: 0};
  seconds = true;
  date: Date;


  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {

    this.attackForm = new FormGroup({
      id: new FormControl(),
      time: new FormControl(this.timeModel),
      date: new FormControl(new Date()),
      x: new FormControl(0, Validators.required),
      y: new FormControl(0, Validators.required),
      kind: new FormControl(3),
      gridRadios: new FormControl('3'),
      playerId: new FormControl('mrlanu'),
      waves: new FormArray([
        new FormGroup({
          first: new FormControl(0),
          second: new FormControl(0),
          third: new FormControl(0),
        })
      ])
    });
  }

  onSubmit() {
    // tslint:disable-next-line:label-position
    this.date = this.attackForm.value.date;
    this.date.setHours(this.attackForm.value.time.hour, this.attackForm.value.time.minute, this.attackForm.value.time.second);
    console.log(this.attackForm.value);
  }


  getControls() {
    return (this.attackForm.get('breakingDetails') as FormArray).controls;
  }

  ngOnDestroy(): void {
    this.componentSubs.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
