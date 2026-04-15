import { useRef } from "react";

export const useTableScrollDate = () => {
  const rowRefsA = useRef<HTMLDivElement[]>([]);
  const setRef = (val: HTMLDivElement) => rowRefsA.current.push(val);

  const scroll = (dateToSearch: Date, matchList: {date: string}[], paddingConsideration = 0): void => {
    const dateSearch = dateToSearch.getTime();
    const closestDate = matchList.map((list) => list.date).reduce((prev, curr) => {
      const prevDate = new Date(prev).getTime();
      const currDate = new Date(curr).getTime();

      return  Math.abs(currDate - dateSearch) <= Math.abs(prevDate - dateSearch)
        ? curr
        : prev;
    });

    const matchPosition = matchList.findIndex((list) => list.date === closestDate);
    rowRefsA.current[matchPosition-paddingConsideration]?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
  }

  return { setRef, scroll }
}