export type paginateProps = {
  previousPage: number | null;
  nextPage: number | null;
  total: number;
  totalPages: number;
  items: Array<any>;
};

export const paginate = (
  items: any,
  page: number = 1,
  perPage: number = 10
): paginateProps => {
  const offset: number = perPage * (page - 1);
  const totalPages: number = Math.ceil(items.length / perPage);
  const paginatedItems: Array<any> = items.slice(offset, perPage * page);

  return {
    previousPage: page - 1 ? page - 1 : null,
    nextPage: totalPages > page ? page + 1 : null,
    total: items.length,
    totalPages: totalPages,
    items: paginatedItems,
  } as paginateProps;
};
