import {VillageModel} from './village.model';

export class AboutVillageModel {
  constructor(public name: string, public availableTroops: number[], public allVillageList: VillageModel[]) {}
}
