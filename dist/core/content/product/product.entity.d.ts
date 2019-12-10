import { Trade } from '../trade/trade.entity';
import { Pointsbyuser } from '../../trivia/pointsbyuser/pointsbyuser.entity';
export declare class Product {
    id: number;
    title: string;
    image: string;
    description: string;
    points: number;
    isActive: boolean;
    trade: Trade[];
    pointsbyuser: Pointsbyuser[];
}
