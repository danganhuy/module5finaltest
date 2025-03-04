import axios from "axios";
import { useState } from "react";

export default function Form(props) {
    const type = props.type;
    const refresh = props.refresh;
    const [product, setProduct] = useState(props.product);
    const [productTypes, setProductTypes] = useState(props.productTypes);
    const [error, setError] = useState([]);

    const handleDateFormatLocal = () => {
        let arr = product.importDate.split("/");
        return `${arr[2]}-${arr[1]}-${arr[0]}`;
    }

    const handleDateFormatStandard = (date) => {
        let arr = date.split("-");
        console.log(`${arr[2]}/${arr[1]}/${arr[0]}`);
        return `${arr[2]}/${arr[1]}/${arr[0]}`;
    }

    const handleCloseForm = () => {
        props.setShow(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type === "add") {

        } else {
            axios.put("http://localhost:3001/products/" + product.id, product)
                .then(() => {
                    alert("Cập nhập dữ liệu thành công");
                    props.setShow(false);
                    refresh();
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {type === 'add' ? 'Thêm Sản Phẩm' : 'Sửa Sản Phẩm'}
                            </h5>
                            <button type="button" className="btn-close" onClick={handleCloseForm} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">ID</label>
                                <input type="text" className="form-control" defaultValue={product.id} required
                                    disabled={type === 'add' ? false : true}
                                    onChange={(e) => setProduct({ ...product, id: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tên Sản Phẩm</label>
                                <input type="text" className="form-control" defaultValue={product.name} required
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                />
                                {/* <div class="alert alert-danger" role="alert">
                                    Alert
                                </div> */}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ngày nhập</label>
                                <input type="date" className="form-control" defaultValue={handleDateFormatLocal()} required
                                    onChange={(e) => setProduct({ ...product, importDate: handleDateFormatStandard(e.target.value) })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Số lượng sản phẩm</label>
                                <input type="number" className="form-control" defaultValue={product.amount} required
                                    onChange={(e) => setProduct({ ...product, amount: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Loại sản phẩm</label>
                                <select className="form-control" defaultValue={product.typeId} required
                                    onChange={(e) => setProduct({ ...product, typeId: e.target.value })}>
                                    {productTypes.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">
                                {type === 'add' ? 'Thêm' : 'Cập Nhật'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={handleCloseForm}>
                                Đóng
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}