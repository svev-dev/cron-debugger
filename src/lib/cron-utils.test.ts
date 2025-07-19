import { describe, expect, test } from 'vitest';
import { Field, parseCronExpression, type ParseResult } from './cron-utils';

describe('parseCronExpression', () => {
    test('should fail on empty string', () => {
        expect(parseCronExpression('')).toEqual<ParseResult>({
            isValid: false,
            invalidFields: new Set(Object.values(Field)),
            values: {
                [Field.Minute]: '',
                [Field.Hour]: '',
                [Field.DayOfTheMonth]: '',
                [Field.Month]: '',
                [Field.DayOfTheWeek]: '',
            },
        });
    });

    test('should support whitespace for an empty field', () => {
        expect(parseCronExpression('  *   * *')).toEqual<ParseResult>({
            isValid: false,
            invalidFields: new Set([Field.Minute, Field.DayOfTheMonth]),
            values: {
                [Field.Minute]: '',
                [Field.Hour]: '*',
                [Field.DayOfTheMonth]: '',
                [Field.Month]: '*',
                [Field.DayOfTheWeek]: '*',
            },
        });
    });

    test('should succeed with asterisks', () => {
        expect(parseCronExpression('* * * * *')).toEqual<ParseResult>({
            isValid: true,
            invalidFields: new Set(),
            values: {
                [Field.Minute]: '*',
                [Field.Hour]: '*',
                [Field.DayOfTheMonth]: '*',
                [Field.Month]: '*',
                [Field.DayOfTheWeek]: '*',
            },
        });
    });

    test('should succeed with question marks', () => {
        expect(parseCronExpression('* * ? * ?')).toEqual<ParseResult>({
            isValid: true,
            invalidFields: new Set(),
            values: {
                [Field.Minute]: '*',
                [Field.Hour]: '*',
                [Field.DayOfTheMonth]: '?',
                [Field.Month]: '*',
                [Field.DayOfTheWeek]: '?',
            },
        });
    });

    test('should support explicit value', () => {
        expect(parseCronExpression('34 7 31 5 3')).toEqual<ParseResult>({
            isValid: true,
            invalidFields: new Set(),
            values: {
                [Field.Minute]: '34',
                [Field.Hour]: '7',
                [Field.DayOfTheMonth]: '31',
                [Field.Month]: '5',
                [Field.DayOfTheWeek]: '3',
            },
        });
    });

    test('should support 0-padding', () => {
        expect(parseCronExpression('034-058/02 07-09 031 005 03')).toEqual<ParseResult>({
            isValid: true,
            invalidFields: new Set(),
            values: {
                [Field.Minute]: '034-058/02',
                [Field.Hour]: '07-09',
                [Field.DayOfTheMonth]: '031',
                [Field.Month]: '005',
                [Field.DayOfTheWeek]: '03',
            },
        });
    });

    test('should support a list of values', () => {
        expect(parseCronExpression('1,4,59 0,5,23 1,4,31 1,2,12 0,5,7')).toEqual<ParseResult>({
            isValid: true,
            invalidFields: new Set(),
            values: {
                [Field.Minute]: '1,4,59',
                [Field.Hour]: '0,5,23',
                [Field.DayOfTheMonth]: '1,4,31',
                [Field.Month]: '1,2,12',
                [Field.DayOfTheWeek]: '0,5,7',
            },
        });
    });

    test('should support ranges', () => {
        expect(parseCronExpression('0-59 0-23 1-31 1-12 0-7')).toEqual<ParseResult>({
            isValid: true,
            invalidFields: new Set(),
            values: {
                [Field.Minute]: '0-59',
                [Field.Hour]: '0-23',
                [Field.DayOfTheMonth]: '1-31',
                [Field.Month]: '1-12',
                [Field.DayOfTheWeek]: '0-7',
            },
        });
    });

    test('should fail on ranges in descending direction', () => {
        expect(parseCronExpression('59-0 23-0 31-1 DEC-JAN SAT-MON')).toEqual<ParseResult>({
            isValid: false,
            invalidFields: new Set(Object.values(Field)),
            values: {
                [Field.Minute]: '59-0',
                [Field.Hour]: '23-0',
                [Field.DayOfTheMonth]: '31-1',
                [Field.Month]: 'DEC-JAN',
                [Field.DayOfTheWeek]: 'SAT-MON',
            },
        });
    });

    test('should support a mix of list & range', () => {
        expect(
            parseCronExpression('1,2-4,7 * * 1,APR-JUN,12 SUN-SAT,TUE,2-4')
        ).toEqual<ParseResult>({
            isValid: true,
            invalidFields: new Set(),
            values: {
                [Field.Minute]: '1,2-4,7',
                [Field.Hour]: '*',
                [Field.DayOfTheMonth]: '*',
                [Field.Month]: '1,APR-JUN,12',
                [Field.DayOfTheWeek]: 'SUN-SAT,TUE,2-4',
            },
        });
    });

    test('should support steps', () => {
        expect(parseCronExpression('*/2 */4 1-15/3 */5 MON-FRI/2')).toEqual<ParseResult>({
            isValid: true,
            invalidFields: new Set(),
            values: {
                [Field.Minute]: '*/2',
                [Field.Hour]: '*/4',
                [Field.DayOfTheMonth]: '1-15/3',
                [Field.Month]: '*/5',
                [Field.DayOfTheWeek]: 'MON-FRI/2',
            },
        });
    });
});
