export type ProjectListData = {
    id?: number;
    title: string;
    badge: string;
    img: string;
    sites: string;
    desc: string;
    issue: string;
    resolved: string;
    comment: string;
    like: string;
    progress: string;
    customers_img1: string;
    customers_img2: string;
    customers_img3: string;
    rate?:string
    progress_level?:string
    issues?:string
  };
  export interface ProjectListPropsType {
    allData: ProjectListData[];
  }
  
  export interface CommonProjectInterFace {
    item: ProjectListData;
  }
  
  export interface ProjectListNavPropsType {
    activeTab: string;
    setActiveTab: (value: string) => void;
  }

  export interface ProjectListTabContentType {
    activeTab: string;
  }

 export interface DataType{
    title:string;
    badge:number
}