import {WaveModels} from './wave.models';

export class AttackModel {

  constructor(public playerId: string, public attackId: string, public immediately: boolean,
              public villageName: string, public x: number, public y: number, public kindAttack: number,
              public time: Date, public waves: WaveModels[]) {}
}
