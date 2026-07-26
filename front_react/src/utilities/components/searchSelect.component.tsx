import { useState } from "react";
import './searchSelect.scss';

export type InputTypeSearch = {
  key: string | number;
  value: string;
};

export type SearchSelectProps = {
  inputTypeSearch?: InputTypeSearch[];
  nameProperty: string;
  isRequired: boolean;
};

const SearchSelectComponent = ({ inputTypeSearch, nameProperty, isRequired }: SearchSelectProps) => {

  let timeoutRef:number;
  const [foundElements, setFoundElements] = useState<InputTypeSearch[]>([])
  const [searchValue, setSearchValue] = useState<string>('');

  const search =(val:string) =>{
    if(timeoutRef)
      clearTimeout(timeoutRef);

    const timeout = setTimeout(()=>{
      const filtered = inputTypeSearch?.filter(element => element.value.toLowerCase().includes(val.toLowerCase()));

      val && filtered ? setFoundElements(filtered) : setFoundElements([])
    }, 1500);

    timeoutRef=timeout;
  }

  const selectElement = (val: InputTypeSearch): void =>{
    setSearchValue(val.value);
    setFoundElements([]);
  }

  return (
    <>
      <input type="text" value={searchValue} name={nameProperty}
        required = {isRequired}
        onKeyUp={(e) => search(e.currentTarget.value)}
        onChange={(e) => {setSearchValue(e.target.value)}}
      >
      </input>
      { foundElements!.length > 0 && <div className="search-select-list">
        { foundElements?.map(element => 
            <div key={element.key} className="search-select-list-element" onClick={()=> selectElement(element)}> 
              {element.value} 
            </div>
        )}
        </div>
      }
    </>
  )
}

export default SearchSelectComponent;