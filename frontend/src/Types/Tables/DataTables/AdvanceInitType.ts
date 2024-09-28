export interface StockResultTableData {
    name: string;
    symbol: string;
    price: string;
    difference: JSX.Element;
    last: any;
  }

export interface RowCreateCallBackData {
    name: string;
    email: string;
    experience: string;
    sex: string;
    contactNumber: string;
    salary: number;
  }

export interface CustomCellInterFace {
    value: number;
  }