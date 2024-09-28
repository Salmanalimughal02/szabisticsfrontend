import { ChangeEvent } from "react";

export type StepperHorizontalPropsType = { level: number };

interface BasicInputFormValueInterFace {
    email: string;
    firstName: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
    placeHolderName: string;
    cardNumber: string;
    expiration: string;
    cvvNumber: string;
    uploadDocumentation: string;
    informationCheckBox: boolean;
    linkedInLink: string;
    gitHubLink: string;
    giveFeedBack: string;
    state: string;
    agreeConditions: boolean;
  }
  

export type NumberingWizardPropsType = {
    getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
    basicInputFormValue: BasicInputFormValueInterFace;
    level?: number;
  };


  interface StudentValidationFormInterFace {
    password:string;
    name:string;
    email:string;
    confirmPassWord:string;
    portfolioURL:string;
    projectDescription:string;
    twitterUrl:string;
    gitHubUrl:string;
  }
  export interface StudentFormPropsType {
    handleImageLabelClick:()=>void;
    imageUrl:string | null;
    getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
    studentValidationForm: StudentValidationFormInterFace;
    level:number;
    handleNextButton:()=>void;
    fileInputRef:any
    handleBackButton:()=>void;
  }

  export  interface VerticalFormPropsType {
    callbackActive: (val: number) => void;
    activeTab:number
  }

  export interface VerticalValidationWizardFormPropsType {
    activeCallBack: (val: number) => void;
    activeTab?: number;
  }

  export interface ShippingFormTabContentPropsType {
    activeTab: number | undefined;
    callbackActive: (val: number | undefined) => void;
  }

  export interface CommonPropsTypes {
    callbackActive: (val: number | undefined) => void;
  }


  export interface NewAddressModalPropsTypes {
    toggle: () => void;
    showModal: boolean;
  }

  interface RadioBoxValuesInterFace {
    address: string;
    shippingMethod: string;
  }

  export interface ShippingInformationCommonProps {
    handleNextButton?: () => void;
    radioBoxValues: RadioBoxValuesInterFace;
    getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
  }

  export interface PaymentMethodOptionPropsType {
    paymentMethodName: string;
    getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
  }

  export  interface ModalOnePropsType{ 
    toggle:()=>void
    modalOne:boolean
  }

  export interface ModalTwoPropsType {
    toggleTwo: () => void;
    modalTwo: boolean;
  }

  export interface CustomWizardFormPropsType  {
    heading: string
    horizontalWizardWrapperClassName?:string
    xs?:number
    firstXl?:number
    secondXl?:number
  }

  export  interface BusinessFormCommonProps {
    activeTab?: number | undefined;
    callbackActive: (val: number | undefined) => void;
  }

  export  interface BusinessFormCommonProps {
    activeTab?: number | undefined;
    callbackActive: (val: number | undefined) => void;
  }

  export interface BusinessFormpropsType {
    horizontalWizardWrapperClassName?:string
    heading:string
    firstXl?:number
    secondXl?:number
    xs?:number
  }