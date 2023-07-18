import { useState, useEffect } from "react"
import "./ProductList.css"
import { useNavigate } from "react-router-dom"

export const ProductList = () => {

    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [topPricedBoolean, setTopPricedBoolean] = useState(false)

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const getAndSetAllProducts = () => {
        fetch("http://localhost:8088/products?_expand=productType&_sort=name&_order=asc")
            .then(response => response.json())
            .then((productArray) => {
                //productArray.sort((a, b) => a.price - b.price)
                //productArray.sort((a, b) => a.name.localeCompare(b.name))
                //替代方案: json-server的_sort&_order
                setProducts(productArray)
                setFilteredProducts(productArray)//接着上一行,与[products]监控一样
            })
    }

    useEffect(() => {
        getAndSetAllProducts();
    }, [])

    // useEffect(() => {
    //     setFilteredProducts(products)
    //  }, [products])

    useEffect(() => {
        if (topPricedBoolean) {
            const topPricedProducts = products.filter(obj => obj.price > 2)
            setFilteredProducts(topPricedProducts)
        } else {
            setFilteredProducts(products);
        }
    }, [topPricedBoolean])


    return <>
        <button onClick={() => { setTopPricedBoolean(true) }}>Top Priced</button>
        <button onClick={() => { setTopPricedBoolean(false) }}>Show All</button>

        {kandyUserObject.staff ?
        <button onClick={() => navigate("/products/create")}>Add Products</button> : ""
        }
        
        <h2>List of Products</h2>
        <article className="products">
            {
                filteredProducts.map(product => {
                    return (
                        <section className="product" key={`product--${product.id}`}>
                            <div className="product__header">{product.id} 🍬{product.name}🍬</div>

                            <div>Price: ${product.price}</div>
                            <div>Type: {product?.productType?.name}</div>
                        </section>
                    )
                })
            }
        </article>
    </>
}
