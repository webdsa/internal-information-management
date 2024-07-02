export class GuidModel {
    id!: number;
    name!: string;
    isActive!: boolean;
    subTopics!: Subtopics[];
    rules!: Rules[];
}

export class Subtopics {
    id!: number;
    name!: string;
    description!: string;
    content!: string;
    isActive!: boolean;
    topicId!: number;
    topic!: string;
    rules!: Rules[];
}

export class Rules {
    id!: number;
    ruleFactor!: string;
    ruleTypeId!: number;
    topicId!: number;
    subTopicId!: number;
    ruleType!: any;
    topic!: string;
    subTopic!: string;
}