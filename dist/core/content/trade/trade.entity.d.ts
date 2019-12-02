import { Product } from '../product/product.entity';
import { User } from '../../users/user/user.entity';
export declare class Trade {
    id: number;
    createdAt: Date;
    isActive: boolean;
    product: Product;
    user: User;
}
