import useSWR from "swr";
import { api } from "./api";

const axiosFetcher = (url, serializedParams) => {
  const params = JSON.parse(serializedParams);
  return api
    .get(url, {
      params: {
        ...params,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((resp) => resp.data);
};

export function searchKeyword(keyword) {
  const {
    data,
    error,
    mutate: mutateSearch,
  } = useSWR(
    ["/subreddits/search.json", JSON.stringify(keyword)],
    axiosFetcher
  );

  return {
    searchResult: data,
    isLoading: !error && !data,
    isError: error,
    mutateSearch,
  };
}

export const searchUpdater = (params) => {
  const result = api
    .get("/subreddits/search.json", {
      params: {
        ...params,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((resp) => resp.data);

  return result;
};
