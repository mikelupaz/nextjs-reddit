import useSWR from "swr";
import { useRouter } from "next/router";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.redditUrl,
});

const axiosFetcher = (url) => {
  return api
    .get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((resp) => resp.data);
};

export function getHotPost() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    `${process.env.redditUrl}/r/${id}/hot.json`,
    axiosFetcher
  );

  return {
    id,
    hotPost: data,
    isLoading: !error && !data,
    isError: error,
  };
}
