export interface ZeroConfigurationTableColumnsType{
    id:number
    name:string
    position:string
    office:string
    age:number
    startDate:string
    salery:string
    action:any
}

export interface StateSavingTableDataType{
    id:number
    name:string
    position:string
    color:string
    office:string
    age:string
    startDate:string
    salery:string
    action:any
  }
  export interface CustomCellInterFace {
    position:string ,color:string
  }

  export  interface ScrollVerticalType{
    name:JSX.Element
    position:string
    office:string
    age:string
    startDate:string
    salery:string
    action:any
  }