import { City } from '../../users/city/city.entity';
import { Chain } from '../../users/chain/chain.entity';
import { Position } from '../../users/position/position.entity';
import { Type } from '../../users/type/type.entity';
import { Campaing } from '../campaing/campaing.entity';
export declare class Target {
    id: number;
    initAge: number;
    finalAge: number;
    gender: boolean;
    allUsers: boolean;
    city: City;
    chain: Chain;
    position: Position;
    type: Type;
    campaing: Campaing[];
}
