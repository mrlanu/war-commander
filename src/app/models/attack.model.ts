import {WaveModels} from './wave.models';

export interface AttackModel {
  playerId: string;
  attackId: string;
  immediately: boolean;
  villageName: string;
  x: number;
  y: number;
  kindAttack: number;
  time: Date;
  waves: WaveModels[];
}
