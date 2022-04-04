import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

export default function Pagination({ current, pages, term }) {
  const router = useRouter();

  const paginationHandler = (page) => {
    router.push(
      `/search?q=${term}&page=${page.selected + 1}`
    );
  };

  return (
    <div className="paginationBox">
      <ReactPaginate
        previousLabel={"anterior"}
        nextLabel={"siguiente"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        activeClassName={"active"}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        initialPage={current - 1}
        pageCount={pages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={paginationHandler}
      />
    </div>
  );
}
