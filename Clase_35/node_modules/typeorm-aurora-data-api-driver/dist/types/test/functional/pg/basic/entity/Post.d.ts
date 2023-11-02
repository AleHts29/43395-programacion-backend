import { Category } from './Category';
export declare class Post {
    id: number;
    title: string;
    text: string;
    likesCount: number;
    publishedAt: Date;
    updatedAt?: Date;
    categories: Category[];
}
