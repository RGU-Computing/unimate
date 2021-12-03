export interface ThanxMessage {
    _id: string; // recirver ID
    text: string;
    createdAt: Date;
    user: ThanxUser;// from USER
    image?: string;
    video?: string;
    audio?: string;
    system?: boolean;
    sent?: boolean;
    received?: boolean;
    pending?: boolean;

    // quickReplies?: QuickReplies;
}

export interface ThanxUser {
    _id: string;
    name: string;
    avatar: string;
}

export interface StoredThanxMessage {
    form: string,
    text: string,
    timeStamp: string
}