import { useState, useEffect } from "react"
import "./EmployeeList.css"
import { useNavigate } from "react-router-dom"

export const EmployeeList = () => {

    const navigate = useNavigate()

    const [employees, setEmployees] = useState([])


    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const getAndSetAllEmployees = () => {
        fetch("http://localhost:8088/employees/?_expand=location&_expand=user")
            .then(response => response.json())
            .then((employeeArray) => {

                setEmployees(employeeArray)

            })
    }

    useEffect(() => {
        getAndSetAllEmployees();
    }, [])

    return <>
        {kandyUserObject.staff ?
            <button onClick={() => navigate("/employees/create")}>Add Employees</button> : ""
        }
        <h2>List of Employees</h2>
        <article className="employees">
            {
                employees.map(employee => {
                    return (
                        <section className="employee" key={`employee--${employee.id}`}>
                            <div className="employee__header">👨‍💼{employee?.user?.name}</div>
                            {kandyUserObject.id === employee.userId ?
                                <div>🗝️Logged In</div> : ""
                            }
                            <div>Start Date: {employee?.startDate}</div>
                            <div>Pay Rate: ${employee?.payRate}</div>
                            <div>Location: {employee?.location?.address}</div>
                        </section>
                    )
                })
            }
        </article>
    </>
}




