//search
  
  export interface EmpltyClassType {
    searchIcon: boolean;
  }
  
  export interface MenuItemChildMenu {
    title: string;
    url: string;
    type?: string;
    bookmark?: boolean;
    icon1?: string;
    subMenu?: MenuItemChildMenu[];
  }
  
  export interface MenuItemMenuType {
    title: string;
    svgIcon: string;
    subMenu?: MenuItemChildMenu[];
    url?: string;
    type?: string;
    bookmark?: boolean;
  }
  
  export interface MenuItemType {
    title: string;
    title1?:string;
    subMenu: MenuItemMenuType[];
    bookmark?: boolean;
    type?: string;
    svgIcon?: string;
  }
  
  export interface ListOfMenuProp{
    removeFix: (searchVal: any) => void
    bookmarkItems: any
    setCallbackBookmark: (valueAdd: string) => void
    searchValue: string
    setBookmarkItems: React.Dispatch<any>
    searchResult: MenuItemType[]
    setSearchResult: React.Dispatch<React.SetStateAction<MenuItemType[]>>
    searchBar?:boolean
    searchToggle?:boolean
  }
  
  interface SubMenuInterface2 {
    title: string;
    url?: string;
  }
  
  export  interface SubMenuInterface {
    title: string;
      url?: string;
    menu?: SubMenuInterface2[];
    icon?: string
    icon1?: string
  }
  
  export interface MenuInterface {
    title: string;
    icon: string
    mainTitle?:string;
    badge?: boolean;
    url?: string;
    menu?: SubMenuInterface[];
    icon1?: string;
  }
  
  export interface SearchSuggestionListProp {
    setSuggestionOpen: (key:boolean)=>void;
    suggestion: MenuInterface[] | SubMenuInterface[] | [];
    setSearchValue:(key:string)=> void
  }
  
