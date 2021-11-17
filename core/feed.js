import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function getHotPost() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    `${process.env.redditUrl}/r/${id}/hot.json`,
    fetcher
  );

  return {
    id,
    hotPost: data,
    isLoading: !error && !data,
    isError: error,
  };
}
