export interface AllMembersType {
    id: number;
    name: string;
    thumb: string;
    status: string;
    lastSeenDate: string;
    online?: boolean;
    typing?: boolean;
    time: string;
    reply: string;
  }
  
  export interface ChatReducerType {
    toggleSideBar: boolean;
    allMembers: [] | AllMembersType[];
    members: AllMembersType[] | [] | AllMembersType | undefined | any;
    currentUser: AllMembersType;
    activeChat: any;
    selectedUser: AllMembersType;
    chats: any;
  }
  
  export interface ChatAppTypes {
    ChatData: ChatReducerType;
  }
  
  interface Message {
    sender: number;
    time: string;
    text: string;
  }
  
  export interface ChatProp {
    id: number;
    users: number[];
    lastMessageTime: string;
    messages: Message[];
  }
  
  export interface MessageType {
    sender: number;
    text: string;
    time: string;
  }
  
  export interface ChatMenuTabContentProp {
    activeTab: number;
  }