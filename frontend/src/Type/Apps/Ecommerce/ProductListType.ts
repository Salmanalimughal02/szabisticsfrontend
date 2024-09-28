export interface DataTableType {
    Image: any;
    Details: any;
    Amount: string;
    Stock: JSX.Element;
    Start_date: string;
    Action: JSX.Element;
}[]

export interface ProjectInitialValue{
    title:string;
    client:string
    progress: number;
    type:string
    priority: string
    size: string
    description: string
  
  }