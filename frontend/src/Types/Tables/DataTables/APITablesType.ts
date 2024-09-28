import { ChangeEvent } from "react";

export  interface AddRowsTable {
    column1: number;
    column2: number;
    column3: number;
    column4: number;
    column5: number;
  }

  export interface DeleteRowData {
    name: string;
    id:number,
    job: string;
    companyName: string;
    invoiceNumber: string;
    credit: any;
    date: string;
    priority: any;
    budget: string;
    action: any;
  }

  export interface TableSearchBarpropsType{
    filteredData:(event:ChangeEvent<HTMLInputElement>)=>void;
  }

  export interface DeleteRowDatas {
    name: string;
    position: string;
    office: string;
    age: number;
    startDate: string;
    salary: string;
  }