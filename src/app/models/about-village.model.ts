import {VillageModel} from './village.model';

export interface AboutVillageModel {
  name: string;
  availableTroops: number[];
  allVillageList: VillageModel[];
}
