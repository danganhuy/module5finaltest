import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./Form";
// import PageButton from "./PageButton";

export default function Table() {
    const productTemplate = { id: '', name: '', importDate: '', amount: '', typeId: '' };
    // const productTypeTemplate = {id: '', name: ''};

    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [error, setError] = useState("");

    const [search, setSearch] = useState({ name: "", typeId: "" });

    // const pageLimit = 5;
    // const [pages, setPages] = useState(0);
    // const [pagedData, setPagedData] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);

    const [show, setShow] = useState(false);
    const [type, setType] = useState("");
    const [product, setProduct] = useState(productTemplate);

    const getProductTypeName = (typeId) => {
        for (let type of productTypes) {
            if (type.id === typeId)
                return type.name;
        }
        return "Unknown";
    }

    const refresh = () => {
        axios.get("http://localhost:3001/productTypes")
            .then((res) => {
                setProductTypes(res.data);
            })
            .catch((err) => {
                setError(err);
                console.log(error);
            })
        axios.get("http://localhost:3001/products")
            .then((res) => {
                let sorted = res.data.sort((a, b) => a.amount - b.amount);
                setProducts(sorted);
                searchProduct(sorted);

                // setPages(Math.ceil(res.data.length / pageLimit));
                // let temp = (currentPage - 1) * 5;
                // setPagedData(res.data.slice(temp, temp + 5));
            })
            .then(() => {
            })
            .catch((err) => {
                setError(err);
                console.log(error);
            })
    };

    useEffect(() => {
        refresh();
    }, []);

    const handleAddClick = () => {
        setType('add');
        setProduct(productTemplate);
        setShow(true);
    };

    const handleEditClick = (prod) => {
        setType('edit');
        setProduct(prod);
        setShow(true);
    };

    const searchProduct = (data) => {
        let sorted = data ? data : products;
        if (search.name !== "") {
            sorted = sorted.filter((product) => product.name === search.name);
        }
        if (search.typeId !== "") {
            sorted = sorted.filter((product) => product.typeId === search.typeId);
        }
        if (sorted.length === 0) alert("Không tìm thấy sản phẩm");
        setSortedProducts(sorted);
    }

    // const changePage = (num) => {
    //     setCurrentPage(1);
    //     let temp = (currentPage - 1) * 5;
    //     setPagedData(data.slice(temp, temp + 5));
    // };

    // const disablePreviousPage = () => {
    //     return currentPage === 1 ? "disabled" : "";
    // };

    // const disableNextPage = () => {
    //     return currentPage === pages ? "disabled" : "";
    // }

    // const activatePageNumber = (num) => {
    //     return num === currentPage ? "active" : "";
    // }

    return (
        <div className="container my-5">
            <div className="row align-items-center mb-3">
                <div className="col text-center">
                    <h1 className="h3 mb-0">Danh Sách Sản Phẩm</h1>
                </div>
            </div>
            <div className="row align-items-center mb-3">
                <div className="col-auto">
                    <button type="button" className="btn btn-primary" onClick={refresh}>
                        <i className="bi bi-arrow-counterclockwise"></i>
                    </button>
                </div>
                <div className="col-auto">
                    <button type="button" className="btn btn-primary" onClick={handleAddClick}>Thêm Sản Phẩm</button>
                </div>
                <div className="col-auto">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Tên sản phẩm" aria-label="Search"
                            onChange={(e) => setSearch({ ...search, name: e.target.value })} />
                        <select className="form-control me-2" defaultValue=""
                            onChange={(e) => setSearch({ ...search, typeId: e.target.value })}>
                            <option value="">Loại sản phẩm</option>
                            {productTypes.map((item) => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        <button className="btn btn-outline-success" type="button" onClick={() => {searchProduct()}}>Tìm</button>
                    </form>
                </div>
            </div>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr className='table-info'>
                        <th scope="col">ID</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Ngày nhập</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Loại</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map((item) => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.importDate}</td>
                            <td>{item.amount}</td>
                            <td>{getProductTypeName(item.typeId)}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-1" onClick={() => {
                                    handleEditClick(item);
                                }}>
                                    Sửa
                                </button>
                                <button className="btn btn-danger btn-sm">Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* <nav aria-label="Phân trang">
                <ul className="pagination justify-content-center">
                    <li className={"page-item " + disablePreviousPage()}><button className="page-link">Trước</button></li>
                    <li className="page-item active"><button className="page-link">1</button></li>
                    <li className="page-item"><button className="page-link">2</button></li>
                    <li className="page-item"><button className="page-link">3</button></li>
                    <li className={"page-item " + disableNextPage()}><button className="page-link">Sau</button></li>
                </ul>
            </nav> */}
            {/* <PageButton currentPage={currentPage} pages={pages} setCurrentPage={setCurrentPage}/> */}

            {show && <Form type={type} refresh={refresh} setShow={setShow} product={product} productTypes={productTypes} />}
        </div>
    );
}