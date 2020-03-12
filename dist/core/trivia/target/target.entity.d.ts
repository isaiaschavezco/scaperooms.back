import { City } from '../../users/city/city.entity';
import { Delegation } from '../../users/delegation/delegation.entity';
import { Chain } from '../../users/chain/chain.entity';
import { Position } from '../../users/position/position.entity';
import { Type } from '../../users/type/type.entity';
import { Campaing } from '../campaing/campaing.entity';
import { Role } from '../../users/role/role.entity';
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
    role: Role;
    campaing: Campaing[];
    delegation: Delegation;
}
