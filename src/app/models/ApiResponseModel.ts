export class ApiResponseModel {
  public StatusCode: number;
  public ErrorMessage: string;
  public Result: any;
}
export class MessageModel {
  message: string;
}

export class MessagesModel {
  From: string;
  Subject:string;
  Date:string;
  Status:string;
}