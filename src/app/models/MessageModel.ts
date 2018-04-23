export class MessageModel{
    FromUser:string;
    Subject:string;
    CreatedDate:string; 
    Status:string; 
    DepartmentName:string; 
    Comment:string;
    messagecomment:any;
}

export class InsertMessageCommentRequestModel{
      BuyerMessageId:number;
      Comment:string;
      CommentFrom:string;
      CreatedUserID:number; 
}

export class InsertMessageRequestModel
{
    BuyerMessageId:number; 
    Subject:string; 
    CommunityLotID:number; 
    BuyerId:number; 
    DepartmentId :number;
    CreatedUserID :number;
    MessageForm:string; 
    Comment:string;
}