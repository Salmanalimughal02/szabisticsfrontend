export interface SearchBarPropsType {
    setSearchTerm: (data: string) => void;
    searchTerm: string;
  }

  export interface MyFiles {
    icons: string;
    title: string;
    details: string;
    color: string;
}[]