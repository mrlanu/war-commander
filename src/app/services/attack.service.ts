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
  villagesChanged = new Subject<AboutVillageModel>();
  availableTroopsChanged = new Subject<AboutVillageModel>();
  loadingChanged = new Subject<boolean>();
  connectedChanged = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { }

  getAllTroops(clientId: string, villageName: string) {
    const url = `${this.baseUrl}/villages/${clientId}/${villageName}`;
    this.httpClient.get<AboutVillageModel>(url)
      .subscribe(info => {
        this.availableTroopsChanged.next(info);
      });
  }

  getAllVillages(clientId: string) {
    const url = `${this.baseUrl}/villages/${clientId}`;
    this.httpClient.get<AboutVillageModel>(url)
      .subscribe(info => {
        console.log(info);
        this.villagesChanged.next(info);
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

  sendSpam(spam: AttackModel) {
    const url = `${this.baseUrl}/spams`;
    this.httpClient.post(url, spam, {responseType: 'text'})
      .subscribe(conf => {
        console.log(conf);
      }, error => {
        console.log(error);
      });
  }
}
