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
  rules!: Rules;
}

export class Rules {
  id!: number;
  topicId!: number | null;
  subTopicId!: number | null;
  isReligious!: boolean | null;
  maxOrderOcupational!: number;
  minOrderOcupational!: number;
  functionalPropertyName!: [string];
}
