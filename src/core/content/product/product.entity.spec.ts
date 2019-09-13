import { Product.Entity } from './product.entity';

describe('Product.Entity', () => {
  it('should be defined', () => {
    expect(new Product.Entity()).toBeDefined();
  });
});
