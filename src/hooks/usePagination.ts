export function usePagination<T>(data: T[], pageSize: number, page: number) {
  const total = data.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), pageCount);

  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(total, startIndex + pageSize);

  return {
    pageCount,
    safePage,
    paginated: data.slice(startIndex, endIndex),
    startIndex,
    endIndex,
    total,
  };
}
