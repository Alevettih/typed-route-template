import { describe, it, expect } from 'vitest';

import { RouteTemplate } from './route-template';

describe('RouteTemplate', () => {
  describe('from', () => {
    it('should return full route when segmentIndex is 0', () => {
      const route = new RouteTemplate(`/user/:userId/post/:postId`);
      const result = route.get(0);
      expect(result).toBe('/user/:userId/post/:postId');
    });
    it('should return full route when segmentIndex is not defined', () => {
      const route = new RouteTemplate(`/user/:userId/post/:postId`);
      const result = route.get();
      expect(result).toBe('/user/:userId/post/:postId');
    });
    it('should return route part from segmentIndex', () => {
      const route = new RouteTemplate(`/user/:userId/post/:postId`);
      const result = route.get(3);
      expect(result).toBe('post/:postId');
    });
  });

  describe('interpolate', () => {
    it('should correctly replace single parameter', () => {
      const route = new RouteTemplate(`/user/:userId`);
      const result = route.interpolate({ userId: '123' });
      expect(result).toBe('/user/123');
    });
    it('should correctly replace multiple parameters', () => {
      const route = new RouteTemplate(`/shop/:category/:productId`);
      const result = route.interpolate({ category: 'books', productId: '45' });
      expect(result).toBe('/shop/books/45');
    });
    it('should URI-encode parameter values', () => {
      const route = new RouteTemplate(`/search/:query`);
      const result = route.interpolate({ query: 'angular router' });
      expect(result).toBe('/search/angular%20router');
    });
    it('should handle duplicate parameters', () => {
      const route = new RouteTemplate(`/user/:id/avatar/:id`);
      const result = route.interpolate({ id: '123' });
      expect(result).toBe('/user/123/avatar/123');
    });
    it('should throw error when missing parameters', () => {
      const route = new RouteTemplate(`/user/:userId/post/:postId`);
      // @ts-expect-error missing parameters
      expect(() => route.interpolate({})).toThrow();
    });
    it('should handle empty parameters for routes without parameters', () => {
      const route = new RouteTemplate(`/user/create`);
      const result = route.interpolate({});
      expect(result).toBe('/user/create');
    });
  });
});
