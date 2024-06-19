export class GuidModel {
    id!: number;
    name!: string;
    isActive!: boolean;
    subTopics!: Subtopics[];
}
export class Subtopics {
    id!: number;
    name!: string;
    description!: string;
    content!: string;
    isActive!: boolean;
}
