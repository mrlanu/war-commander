import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AboutVillageModel} from '../models/about-village.model';
import {Subject} from 'rxjs';
import {AttackModel} from '../models/attack.model';

@Injectable({
  providedIn: 'root'
})
export class AttackService {

  baseUrl = environment.baseUrl;
  aboutVillageChanged = new Subject<AboutVillageModel>();

  constructor(private httpClient: HttpClient) { }

  getAboutVillage(villageName: string) {
    console.log(villageName);
    const url = `${this.baseUrl}/villages/mrlanu/${villageName}`;
    this.httpClient.get<AboutVillageModel>(url)
      .subscribe(village => {
        console.log(village);
        this.aboutVillageChanged.next(village);
      });
  }

  sendAttack(attack: AttackModel) {
    const url = `${this.baseUrl}/attacks`;
    this.httpClient.post(url, attack, {responseType: 'text'})
      .subscribe(conf => {
        console.log(conf);
      }, error => {
        console.log(error);
      });
  }
}
