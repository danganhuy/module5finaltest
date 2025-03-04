
export default function PageButton(props) {
    const currentPage = props.currentPage;
    const pages = props.pages;
    const setCurrentPage = props.setCurrentPage;
    const values = [];

    {
        let start = currentPage > 2 ? currentPage - 2 : 1;
        let end = currentPage < pages - 2 ? currentPage + 2 : pages;

        for (let i = start; i <= end; i++) values.push(i);

        console.log(values);
    }

    const disablePreviousPage = () => {
        return currentPage === 1 ? "disabled" : "";
    };

    const disableNextPage = () => {
        return currentPage === pages ? "disabled" : "";
    }

    return (
        <nav aria-label="Phân trang">
            <ul className="pagination justify-content-center">
                <li className={"page-item " + disablePreviousPage()}><button className="page-link">Trước</button></li>
                {values.map((item) => {
                    <li className={"page-item " + item === currentPage ? "active" : ""}>
                        <button className="page-link">item</button>
                    </li>
                })}
                {/* <li className="page-item active"><button className="page-link">1</button></li>
                <li className="page-item"><button className="page-link">2</button></li>
                <li className="page-item"><button className="page-link">3</button></li> */}
                <li className={"page-item " + disableNextPage()}><button className="page-link">Sau</button></li>
            </ul>
        </nav>
    )
}