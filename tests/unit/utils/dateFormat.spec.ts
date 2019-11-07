import { dateFormat } from '@/utils/dateFormat.ts';

describe('test date format function', () => {
  test('format timestamp(number)', () => {
    expect(dateFormat(1555494971754)).toBe('2019-04-17 17:56:11');
  });

  test('format timestamp(string)', () => {
    expect(dateFormat(1555494971754 + '')).toBe('');
  });

  test('format timestamp(date)', () => {
    expect(dateFormat(new Date(1555494971754))).toBe('2019-04-17 17:56:11');
  });

  test('format date string', () => {
    expect(dateFormat('2019/04/17 17:56:11')).toBe('2019-04-17 17:56:11');
  });

  test('format timestamp(number) with format option', () => {
    expect(dateFormat(1555494971754, 'YYYY/MM/DD')).toBe('2019/04/17');
  });

  test('format date string with format option', () => {
    expect(dateFormat('2019/04/17 17:56:11', 'YYYY-MM-DD')).toBe('2019-04-17');
  });
});
