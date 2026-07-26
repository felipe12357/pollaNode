import type { InputTypeSearch } from "./components/searchSelect.component";

export function InputTypeSearchAdapter (elements: any[], valProperty:string, keyProperty: string): InputTypeSearch[] {
  return elements.map(element => ({value: element[valProperty], key: element[keyProperty]})) 
}
