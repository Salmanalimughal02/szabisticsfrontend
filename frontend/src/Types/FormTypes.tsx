export interface CommonCustomSwitchType {
    cardWrapperClassName?: string;
    formCheckSizeClassName?: string;
    disabled?: boolean;
  }

  interface SwitchDataInterFace {
    color: string;
    header: string;
  }

  export interface CommonIconsSwitchType {
    switchData: SwitchDataInterFace[];
    mediaBodyClassName?: string;
    defaultUnChecked?: boolean;
  }

  export  interface SwitchSizePropsType{
    icons?:boolean
}