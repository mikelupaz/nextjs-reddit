import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function searchKeyword({ keyword }) {
  const { data, error } = useSWR(
    `${process.env.redditUrl}/subreddits/search.json?q=${keyword}&include_over_18=on`,
    fetcher
  );

  return {
    searchResult: data,
    isLoading: !error && !data,
    isError: error,
  };
}
