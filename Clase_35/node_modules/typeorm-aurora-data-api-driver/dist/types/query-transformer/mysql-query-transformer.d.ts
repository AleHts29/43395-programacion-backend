import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
import { QueryTransformer } from './query-transformer';
export declare class MysqlQueryTransformer extends QueryTransformer {
    preparePersistentValue(value: any, metadata: ColumnMetadata): any;
    prepareHydratedValue(value: any, metadata: ColumnMetadata): any;
    protected transformQuery(query: string, parameters: any[]): string;
    protected transformParameters(parameters?: any[]): any[] | undefined;
    protected expandArrayParameters(parameters: any[]): any[];
}
