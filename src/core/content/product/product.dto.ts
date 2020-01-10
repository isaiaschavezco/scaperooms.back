export class CreateProductDTO {
    readonly title: string;
    readonly image: string;
    readonly description: string;
    readonly points: number;
}

export class UpdateProductDTO {
    readonly productId: number;
    readonly title: string;
    readonly image: string;
    readonly description: string;
    readonly points: number;
}

export class ShopCartProducts {
    readonly email: string;
    readonly products: number[];
}
