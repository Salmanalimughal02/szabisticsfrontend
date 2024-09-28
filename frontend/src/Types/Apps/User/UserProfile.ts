export interface UserPropstype {
    activeTime: string
}

export  interface SocialMediaIconsPropsTypes {
    listClassName?: string;
  }

  export interface UserCardTypes {
    id: number;
    avatar: string;
    icon: string;
    name: string;
    email: string;
    totalPost: string;
    follower: string;
    following: string;
}
  export interface CardType {
    item: UserCardTypes;
  }