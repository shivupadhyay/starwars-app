const Pagination = ({ page, totalPages, setPage }) => (
  <div className="center">
    <button disabled={page === 1} onClick={() => setPage(page - 1)}>
      Prev
    </button>
    <span>
      {" "}
      Page {page} of {totalPages}{" "}
    </span>

    <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
      Next
    </button>
  </div>
);

export default Pagination;
