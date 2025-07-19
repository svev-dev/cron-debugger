import cronstrue from 'cronstrue';
import { CronExpressionParser } from 'cron-parser';

export enum Field {
    Minute = 'MINUTE',
    Hour = 'HOUR',
    DayOfTheMonth = 'DAYOFTHEMONTH',
    Month = 'MONTH',
    DayOfTheWeek = 'DAYOFTHEWEEK',
}

export type ParseResult = {
    isValid: boolean;
    invalidFields: Set<Field>;
    values: Record<Field, string>;
};

export function parseCronExpression(expression: string): ParseResult {
    const parts: (string | undefined)[] = splitCronExpressionIntoParts(expression);
    const values: Record<Field, string> = {
        [Field.Minute]: parts[0] ?? '',
        [Field.Hour]: parts[1] ?? '',
        [Field.DayOfTheMonth]: parts[2] ?? '',
        [Field.Month]: parts[3] ?? '',
        [Field.DayOfTheWeek]: parts[4] ?? '',
    };

    const rules: Record<Field, Rule> = {
        [Field.Minute]: {
            values: generateRange(0, 59),
        },
        [Field.Hour]: {
            values: generateRange(0, 23),
        },
        [Field.DayOfTheMonth]: {
            values: generateRange(1, 31),
            extraAsteriskSymbols: ['?'],
        },
        [Field.Month]: {
            values: [
                ...generateRange(1, 12),
                'JAN',
                'FEB',
                'MAR',
                'APR',
                'MAY',
                'JUN',
                'JUL',
                'AUG',
                'SEP',
                'OCT',
                'NOV',
                'DEC',
            ],
        },
        [Field.DayOfTheWeek]: {
            // Both 0 & 7 represents Sunday
            values: [...generateRange(0, 7), 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            extraAsteriskSymbols: ['?'],
        },
    };

    const invalidFields = new Set<Field>();
    for (const field of Object.values(Field)) {
        const value = values[field];
        const rule = rules[field];
        const isValid = testAgainstRule(rule, value);
        if (!isValid) {
            invalidFields.add(field);
        }
    }

    return {
        isValid: invalidFields.size === 0,
        invalidFields,
        values,
    };
}

export function getHumanReadableString(expression: string): string | null {
    try {
        return cronstrue.toString(expression);
    } catch {
        return null;
    }
}

export function getNextNSchedules(expression: string, count: number): Date[] {
    try {
        const interval = CronExpressionParser.parse(expression);
        return interval.take(count).map((date) => date.toDate());
    } catch {
        return [];
    }
}

function testAgainstRule(rule: Rule, value: string): boolean {
    const isAstriks = (str: string): boolean =>
        ['*', ...(rule.extraAsteriskSymbols ?? [])].includes(str);

    if (isAstriks(value)) {
        return true;
    }

    const normalizeValue = (value: string): string => {
        // If empty, return as is
        if (value === '') {
            return value;
        }

        // Check if it's a number with leading zeros
        if (/^0+\d+$/.test(value)) {
            const valueAsNumber = Number(value);
            return `${valueAsNumber}`;
        }

        return value;
    };

    const isValidRange = (range: string): boolean => {
        const rangeParts = range.split('-');
        if (rangeParts.length !== 2) {
            return false;
        }
        const [start, end] = rangeParts;
        const startValueIdx = rule.values.indexOf(normalizeValue(start));
        const endValueIdx = rule.values.indexOf(normalizeValue(end));
        return startValueIdx !== -1 && endValueIdx !== -1 && startValueIdx < endValueIdx;
    };

    const isValidStep = (step: string): boolean => {
        const stepParts = step.split('/');
        if (stepParts.length !== 2) {
            return false;
        }
        const [base, stepByStr] = stepParts;

        const stepBy = Number(stepByStr);
        // We only accept the step count to be a number (integer)
        if (isNaN(stepBy) || !Number.isInteger(stepBy)) {
            return false;
        }

        // We restrict the step value to be within the set of rule values
        if (!rule.values.includes(normalizeValue(stepByStr))) {
            return false;
        }

        return isAstriks(base) || rule.values.includes(normalizeValue(base)) || isValidRange(base);
    };

    const isPartValid = (part: string): boolean => {
        if (rule.values.includes(normalizeValue(part))) {
            return true;
        }

        if (isValidRange(part)) {
            return true;
        }

        if (isValidStep(part)) {
            return true;
        }

        return false;
    };

    const parts = value.split(',');
    return parts.every((part) => isPartValid(part));
}

function getFirstPart(value: string): string {
    const result = value.match(/^(\s|\S)[^\s]*/);
    return result ? result[0] : ' ';
}

function splitCronExpressionIntoParts(expression: string): string[] {
    const parts: string[] = [];
    for (let i = 0; i < 5; ++i) {
        const part = getFirstPart(expression);
        parts.push(part === ' ' ? '' : part);
        expression = expression.substring(part.length + 1);
    }
    return parts;
}

function generateRange(min: number, maxInclusive: number): string[] {
    const result: string[] = [];
    for (let i = min; i <= maxInclusive; i++) {
        result.push(`${i}`);
    }
    return result;
}

type Rule = {
    values: string[];
    extraAsteriskSymbols?: string[];
};
