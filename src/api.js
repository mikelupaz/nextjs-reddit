import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const getHotPost = ({ id }) => {
  const { data, error } = useSWR(
    `${process.env.redditUrl}/r/${id}/hot.json`,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
