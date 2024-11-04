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
      page_size: number;
      total: number;
    };
  };
};

export type PaginationParams = {
  search?: string;
  page?: number;
  page_size?: number;
  category_id?: number;
};
