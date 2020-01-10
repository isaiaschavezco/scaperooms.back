export declare class CreateProductDTO {
    readonly title: string;
    readonly image: string;
    readonly description: string;
    readonly points: number;
}
export declare class UpdateProductDTO {
    readonly productId: number;
    readonly title: string;
    readonly image: string;
    readonly description: string;
    readonly points: number;
}
export declare class ShopCartProducts {
    readonly email: string;
    readonly products: number[];
}
