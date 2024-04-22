export class ResponseModel<T> {
    succeeded!: boolean;
    message!: string;
    exception: any;
    data?: T;
  }
  