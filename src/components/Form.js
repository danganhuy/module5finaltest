import { useState } from "react";

export default function Form(props) {
    const type = props.type;
    const [product, setProduct] = useState(props.product);

    const handleCloseForm = () => {
        props.setShow(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (type = "add") {

        } else {

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
                                <input type="text" className="form-control" value={product.id} required
                                    disabled={type === 'add' ? false : true}
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tên Sản Phẩm</label>
                                <input type="text" className="form-control" value={product.name} required
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Loại Sản Phẩm</label>
                                <input type="text" className="form-control" value={product.type} required
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Giá</label>
                                <input type="text" className="form-control" value={product.price} required
                                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                                />
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