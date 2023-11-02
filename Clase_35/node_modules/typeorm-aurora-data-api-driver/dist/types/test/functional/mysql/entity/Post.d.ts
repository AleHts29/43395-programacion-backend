import { Category } from './Category';
export declare class Post {
    id: string;
    title: string;
    text: string;
    likesCount: number;
    publishedAt: Date;
    updatedAt?: Date;
    categories: Category[];
}
