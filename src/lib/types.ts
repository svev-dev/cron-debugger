export type CronFieldType = 'minute' | 'hour' | 'dayOfMonth' | 'month' | 'dayOfWeek';

export interface CronFieldConfig {
    min: number;
    max: number;
    label: string;
    placeholder: string;
}

export interface CronExpression {
    minute: string;
    hour: string;
    dayOfMonth: string;
    month: string;
    dayOfWeek: string;
}

export interface CronFieldChangeEvent {
    value: string;
    fieldType: CronFieldType;
}
