export const Pagination = ({ totalPages, currentPage, handlePagination }) => {
  const createPagination = (page) => {
    let liTags = [];
    let beforePage = page - 1;
    let afterPage = page + 1;
    if (page > 1) {
      liTags.push(
        <li
          key='prev'
          className='btn prev'
          onClick={() => handlePagination(page - 1)}>
          <span>
            <i className='fas fa-angle-left'></i> Prev
          </span>
        </li>
      );
    }
    if (page > 2) {
      liTags.push(
        <li
          key='first'
          className='first numb'
          onClick={() => handlePagination(1)}>
          <span>1</span>
        </li>
      );
      if (page > 3) {
        liTags.push(
          <li
            key='dots1'
            className='dots'>
            <span>...</span>
          </li>
        );
      }
    }
    for (let plength = beforePage; plength <= afterPage; plength++) {
      if (plength > totalPages) {
        continue;
      }
      if (plength === 0) {
        plength += 1;
      }
      let active = currentPage === plength ? 'active' : '';
      liTags.push(
        <li
          key={`page-${plength}`}
          className={`numb ${active}`}
          onClick={() => handlePagination(plength)}>
          <span>{plength}</span>
        </li>
      );
    }
    if (page < totalPages - 1) {
      if (page < totalPages - 2) {
        liTags.push(
          <li
            key='dots2'
            className='dots'>
            <span>...</span>
          </li>
        );
      }
      liTags.push(
        <li
          key='last'
          className='last numb'
          onClick={() => handlePagination(totalPages)}>
          <span>{totalPages}</span>
        </li>
      );
    }
    if (page < totalPages) {
      liTags.push(
        <li
          key='next'
          className='btn next'
          onClick={() => handlePagination(page + 1)}>
          <span>
            Next <i className='fas fa-angle-right'></i>
          </span>
        </li>
      );
    }
    return liTags;
  };
  return (
    <div className='pagination'>
      <ul>{createPagination(currentPage)}</ul>
    </div>
  );
};
