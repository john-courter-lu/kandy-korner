import { useState } from "react";
import { ProductList } from "../product/ProductList.js";
import { SearchForm } from "./SearchForm.js";

export const SearchContainer = () => {
    const [searchTerms, setSearchTerms] = useState("") 
    
    return <>
    <SearchForm setSearchTerms={setSearchTerms} />
    <ProductList searchTerms={searchTerms} /> 
</>
}