import { Dispatch, SetStateAction } from "react";

export interface ContactNavPropsType {
    callbackActive: (val: string) => void;
  }
  
export interface ContactSliceType {
    users: [] | ContactusersType[];
    contactFilter: boolean;
    contactValidation: boolean;
    modal: boolean;
    categoryModal: boolean;
    tempId: number;
    history: boolean;
}

  export interface ContactusersType {
    id: number;
    avatar: string;
    name: string;
    surename: string;
    email: string;
    mobile: string;
  }
  
  export interface ContactSidebarCallbackProp {
    callback: (tab: string) => void
  }
  
  export interface ContactNavProps {
    activeTab: string;
  }
  
  export interface PersonalTabPropsType {
    users: [] | ContactusersType[];
  }
  
  export interface UserCallbackUser {
    id?: number;
    name?: string;
    surename?: string;
    mobile?: string;
    avatar?: string;
    email?: string;
  }
  
  export interface UserUpdateType {
    name: string;
    surename: string;
    email: string;
    mobile: string;
  }
  
  export interface ListNewContactPropsType{
    users:[] | ContactusersType[], 
    userCallback: (user: UserCallbackUser) => void
  }
  
  export interface UpdateUserPropsType{
    editdata:UserCallbackUser
    userEditCallback:(edit: boolean, usersData: UserCallbackUser)=>void,
  }
  
  export interface ContactDetailsPropsType {
    selectedUser: UserCallbackUser;
    userEditCallback: (edit: boolean, usersData: UserCallbackUser) => void;
    setSelectedUser:Dispatch<SetStateAction<UserCallbackUser | UserUpdateType | undefined>>
  }
  
  export interface PrintModalPropsTypes {
    printModal: boolean;
    selectedUser: UserCallbackUser;
    toggleCallback: (result: boolean) => void;
  }
  
  export  interface PrintPreviewPropsType{
    selectedUser:UserCallbackUser
  }
  
  export interface NavOrgPropType {
    callback: (tab:string)=>void;
  }
  
  export interface NoDataFoundPropsType {
    title: string;
  }