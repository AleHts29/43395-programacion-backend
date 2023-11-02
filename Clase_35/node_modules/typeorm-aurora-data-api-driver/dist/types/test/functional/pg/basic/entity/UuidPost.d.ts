import { Category } from './Category';
export declare class UuidPost {
    id: string;
    title: string;
    text: string;
    likesCount: number;
    publishedAt: Date;
    updatedAt?: Date;
    categories: Category[];
}
