import { template } from './template';

describe('template function', () => {
  it('returns a valid HTML string', () => {
    const html = template('<div>Hello, World!</div>');
    expect(html).toContain('<div id="root"><div>Hello, World!</div></div>');
    expect(html).toContain('<!DOCTYPE html>');
    expect(html).toContain('<html>');
    expect(html).toContain('<body>');
  });
});
