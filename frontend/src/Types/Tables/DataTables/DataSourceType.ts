export interface HtmlColumnsInterface {
    id: number;
    cv: string | React.ReactNode;
    name: string;
    position: string;
    office: string;
    badge: string;
    color: string;
    email: string;
    salary: string;
    action: any;
  }

 export interface CustomCellInterFace {
    position: string;
    color: string;
  }

  export interface AjaxSourcedColumnsInterface {
    name: string;
    position: string;
    office: string;
    date: string;
    extends: string;
    salary: string;
  }

 export interface ServerSideProcessingColumnsType {
    name: string;
    position: string;
    office: string;
    lastName: string;
    date: string;
    salary: string;
  }