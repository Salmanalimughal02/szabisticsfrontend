export interface CompanyPropstype {
  activeTime: string;
}

export interface SocialMediaIconsPropsTypes {
  listClassName?: string;
}

export interface CompanyCardTypes {
  _id: any;
  avatar: string;
  icon: string;
  name: string;
  email: string;
  totalOperators: number;
  totalBugReports: number;
  packageExpirationDate: string;
  package?: any;
}
export interface CardType {
  item: CompanyCardTypes;
}
