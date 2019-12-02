import { User } from '../../users/user/user.entity';
import { PointsType } from '../points-type/points-type.entity';
import { Quizz } from '../quizz/quizz.entity';
import { Product } from '../../content/product/product.entity';
export declare class Pointsbyuser {
    id: number;
    points: number;
    isAdded: boolean;
    createdAt: Date;
    isDeleted: boolean;
    user: User;
    pointsType: PointsType;
    quizz: Quizz;
    product: Product;
}
