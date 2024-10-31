import { count, DrizzleError } from "drizzle-orm";
import { MySqlSelect } from "drizzle-orm/mysql-core";

type PaginationOption = {
  page: number;
  pageSize: number;
};

const validatePagination = (page: number, pageSize: number) => {
  if (page < 1) {
    throw new DrizzleError({
      message: "Invalid pagination: 'page' must be greater than or equal to 1.",
    });
  }
  if (pageSize < 1 || pageSize > 1000) {
    throw new DrizzleError({
      message: "Invalid pagination: 'pageSize' must be between 1 and 1000.",
    });
  }
};

export const withPagination = <T extends MySqlSelect>(qb: T, opts: PaginationOption) => {
  const { page = 1, pageSize = 10 } = opts;

  validatePagination(page, pageSize);

  return qb.limit(pageSize).offset((page - 1) * pageSize);
};

export const queryWithCount = async <T extends MySqlSelect>(qb: T): Promise<[Awaited<T>, number]> => {
  const result = await qb;

  // @ts-expect-error hack to override internals (not the ideal way)
  qb.config.fields = { count: count() };
  // @ts-expect-error set orderBy to empty array
  qb.config.orderBy = [];

  const [total] = await qb;

  return [result, total?.count || 0];
};
