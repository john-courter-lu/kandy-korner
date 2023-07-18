import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {

    /*
        TODO: Use the useNavigation() hook 
    */
    const navigate = useNavigate()

    /*
        TODO: Add correct initial state object
    */
    const [newProduct, updateNewProduct] = useState({
        name: '',
        productTypeId: 0,
        price: 0,
    })

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const productObjToSend = {
            name: newProduct.name,
            productTypeId: newProduct.productTypeId,
            price: Number(newProduct.price),//这可以保证JSON-server中保存为number

        }

        // TODO: Perform the fetch() to POST the object to the API
        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },//复数headers
            body: JSON.stringify(productObjToSend)
        })
            .then(res => res.json())//send back 完成的obj, via stringify()-json() 经历了obj-string/text-obj的过程
            .then(() => {
                navigate("/products")
            })

    }

    return (
        <form className="productForm">
            <h2 className="productForm__title">New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Product Name"
                        value={newProduct.name}//这里是做什么? 把初始value设置为{newProduct.name}?若没有会如何?
                        onChange={
                            (evt) => {
                                const copy = { ...newProduct }
                                copy.name = evt.target.value
                                updateNewProduct(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productTypeId">Product Type</label>
                    <input type="text"
                        placeholder="A number from 1 to 3"
                        value={newProduct.productTypeId}//
                        onChange={
                            (evt) => {
                                const copy = { ...newProduct }
                                copy.productTypeId = evt.target.value
                                updateNewProduct(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="text"
                        placeholder="A number from 0.49 to 1.99"
                        value={newProduct.price}//
                        onChange={
                            (evt) => {
                                const copy = { ...newProduct }
                                copy.price = evt.target.value
                                updateNewProduct(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button className="btn btn-primary"
                onClick={(evt) => {
                    handleSaveButtonClick(evt)//这里invoke函数,注意要有argument:e/evt/event; 
                }}
            >
                Submit New Product
            </button>
        </form>
    )
}