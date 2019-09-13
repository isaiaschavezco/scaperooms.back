import { Article.Entity } from './article.entity';

describe('Article.Entity', () => {
  it('should be defined', () => {
    expect(new Article.Entity()).toBeDefined();
  });
});
