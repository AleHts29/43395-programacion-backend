import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
export declare const dateToDateTimeString: (date: Date) => string;
export declare const dateToDateString: (date: Date | string) => string;
export declare const dateToTimeString: (date: Date | string) => string;
export declare const simpleArrayToString: (value: any[] | any) => string[] | any;
export declare const stringToSimpleArray: (value: string | any) => any[];
export declare const getDecimalCast: ({ precision, scale }: Pick<ColumnMetadata, 'scale' | 'precision'>) => string;
