/**
 * @file src/components/Pages/homepage/HomeVoterSection/hooks/useHomeVoterSection.tsx
 *
 * @date 05-11-24 - 23:39:55
 * @author Richie Permana <richie.permana@gmail.com>
 */

import { useState, useRef, useCallback, useMemo } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";

import { ApiClient } from "@/common/api";
import { useDebounce } from "@/hooks";
import { VolunteerResponse, PaginationParams, Volunteer, VolunteerCategory } from "@/types";

type Props = {
  usersData: Volunteer[] | undefined;
};

const MAX_VOLUNTEERS_PER_PAGE = 10;

export const useHomeVoterSection = (props: Props) => {
  const { usersData } = props;

  const [search, setSearch] = useState("");
  const [volunteerCategory, setVolunteerCategory] = useState<VolunteerCategory>({
    id: 0,
    name: "",
    created_at: "",
    updated_at: "",
  });

  const observerRef = useRef<IntersectionObserver>();

  const debouncedSearch = useDebounce(search, 300);

  const {
    data,
    fetchNextPage,
    hasNextPage,

    isFetchingNextPage,
    isFetching,
    isError,
    isLoading,
  } = useInfiniteQuery({
    initialPageParam: 1,
    initialData: {
      pageParams: [1],
      pages: [usersData],
    },
    queryKey: ["volunteers", debouncedSearch, volunteerCategory.id],
    queryFn: async ({ pageParam }) => {
      const { data } = await ApiClient<VolunteerResponse, PaginationParams>("/api/v1/volunteers", {
        params: {
          search: debouncedSearch || undefined,
          category_id: volunteerCategory.id === 0 ? undefined : volunteerCategory.id,
          page: pageParam,
          page_size: MAX_VOLUNTEERS_PER_PAGE,
        },
      });

      return data || [];
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.length ? allPages.length + 1 : undefined;
    },
  });

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  const volunteers = useMemo(() => {
    return data?.pages.reduce<Volunteer[]>((acc, page) => {
      return [...acc, ...(page || [])];
    }, []);
  }, [data]);

  const resetVolunteerCategory = useCallback(() => {
    setVolunteerCategory({
      id: 0,
      name: "",
      created_at: "",
      updated_at: "",
    });
  }, []);

  return {
    data,
    search,
    volunteerCategory,

    volunteers,
    debouncedSearch,

    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isError,
    isLoading,

    setSearch,
    setVolunteerCategory,

    lastElementRef,
    fetchNextPage,
    resetVolunteerCategory,
  };
};
