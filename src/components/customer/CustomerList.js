import { useState, useEffect } from "react"
import "./CustomerList.css"
import { Link, Navigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const CustomerList = () => {

    const [customers, setCustomers] = useState([])

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(() => {
        fetch("http://localhost:8088/customers")
            .then(response => response.json())
            .then((customerArray) => {
                setCustomers(customerArray)
            })
    }, [])

    return (
        <article className="customers">
            {
                customers.map(customer => {
                    return (
                        <section className="customer" key={`customer--${customer.id}`}>
                            <div className="customer__header">
                                <Link to={`/customers/${customer.id}`}>Customer No.{customer.id}</Link>
                                {kandyUserObject.id === customer.userId ? "🗝️" : ""}
                            </div>
                            <div>Loyalty Number: {customer.loyaltyNumber}</div>
                            <div>User ID: {customer.userId}</div>
                        </section>
                    )
                })
            }
        </article>
    )
}

export const CustomerDetails = () => {

    const { customerId } = useParams()
    const [customer, setCustomer] = useState({})
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&id=${customerId}`)
                .then(response => response.json())
                .then((data) => {
                    const singlecustomer = data[0]
                    setCustomer(singlecustomer)

                })
        },
        [customerId]
    )
    const handleDeleteButtonClick = () => {
        fetch(`http://localhost:8088/customers/${customerId}`, {
            method: "DELETE"
        })
            // .then(response => response.json()) <--- dont need it since we arent sending anything
            .then(() => {
                navigate(`/customers`)
            })
    }

    return (
        <section className="customer" key={`customer--${customer.id}`}>
            <div className="customer__header">
                {customer.id}. {customer?.user?.name}
            </div>
            <div> Loyalty Number:
                <Link to={`/customers/${customer.id}/edit-loyalty-number`}>
                    {customer.loyaltyNumber}
                </Link>
            </div>
            {kandyUserObject.staff ?
                <div><button
                    onClick={handleDeleteButtonClick}>
                    Delete This Customer</button></div>
                : ""
            }
        </section>
    )
}

export const EditLoyalityNumber = () => {

    const { customerId } = useParams()
    const [customer, updateCustomer] = useState({})
    // 这里留空, 初始render时就会填满
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&id=${customerId}`)
                .then(response => response.json())
                .then((data) => {
                    const singlecustomer = data[0]
                    updateCustomer(singlecustomer)

                })
        },
        []// 修改为初始状态
    )

    const handleSaveButtonClick = (event) => {

        event.preventDefault()

        //仅仅是一个PUT fetch,就这么简单
        return fetch(`http://localhost:8088/customers/${customer.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(response => response.json())
            .then(() => {
                //setFeedback("Customer Loyality Number successfully saved")
            })
            .then(() => {
                navigate(`/customers/${customer.id}`)
                //第一个斜线关键, 否则会带你到customers/1/customers/1, 追加的
            })
    }

    return (
        <>
            <form className="customer">
                <h2 className="customer__title">Edit Loyality Number</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="address">New Loyality Number:</label>
                        <input
                            required autoFocus
                            type="text"
                            //className="form-control"
                            value={customer.loyaltyNumber}
                            onChange={
                                (evt) => {
                                    // TODO: Update specialty property
                                    const copy = { ...customer }
                                    copy.loyaltyNumber = Number(evt.target.value)//因为没有ObjToSend, 就在这里改string为数字了
                                    updateCustomer(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Update
                </button>
            </form>

        </>

    )




}