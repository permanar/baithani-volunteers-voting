export type BaseAPIResponse<T> = {
  message: string;
  success: boolean;
  data?: T;
};

export type PaginationMeta<T> = BaseAPIResponse<T[]> & {
  meta: {
    pagination: {
      page: number;
      total_pages: number;
      pageSize: number;
      total: number;
    };
  };
};
