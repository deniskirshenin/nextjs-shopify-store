import { ReadonlyURLSearchParams } from "next/navigation";

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
    const paramString = params.toString();
    const queryString = `${paramString.length ? '? ': ''}${paramString}`;

    return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) => 
    stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;