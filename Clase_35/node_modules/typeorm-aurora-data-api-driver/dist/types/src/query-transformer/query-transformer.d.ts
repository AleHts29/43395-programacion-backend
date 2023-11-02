import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';
export interface QueryTransformationResult {
    queryString: string;
    parameters: any[];
}
export declare abstract class QueryTransformer {
    protected transformOptions?: any;
    constructor(transformOptions?: any);
    transformQueryAndParameters(query: string, srcParameters?: any[]): {
        queryString: string;
        parameters: any[] | undefined;
    };
    abstract preparePersistentValue(value: any, metadata: ColumnMetadata): any;
    abstract prepareHydratedValue(value: any, metadata: ColumnMetadata): any;
    protected abstract transformQuery(query: string, srcParameters: any[]): string;
    protected abstract transformParameters(srcParameters?: any[]): any[] | undefined;
}
