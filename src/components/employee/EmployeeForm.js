import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const EmployeeForm = () => {

    /*
        TODO: Use the useNavigate() hook 
    */
    const navigate = useNavigate()

    /*
        TODO: Add correct initial state object
    */
    const [newUser, updateNewUser] = useState({
        name: '',
        email: 'to be added',
        isStaff: true
    })

    const [addedEmployeeUser, updateAddedEmployeeUser] = useState({})

    const [newEmployee, updateNewEmployee] = useState({
        startDate: '',
        payRate: 0,
        locationId: 0,
        userId: 0,
    })

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API
        const userObjToSend = {
            name: newUser.name,
            email: 'to be added',
            isStaff: true,
        };

        // TODO: Perform the fetch() to POST the object to the API
        fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userObjToSend)
        })
            .then(res => res.json())
            .then(() => { fetchNewlyAddedUserObj() })
            .then(() => { postEmployeeObj() })

        const fetchNewlyAddedUserObj = () => {
            //获得最新addedUser的obj,从而获得id
            fetch(`http://localhost:8088/users?name=${newUser.name}`) //url: users?name=Johh Doe
                .then(res => res.json())//需要nested 在这个then 里面
                .then((returnedArray) =>  {
                    const NewlyAddedUserObj = returnedArray[0]
                    updateAddedEmployeeUser(NewlyAddedUserObj)//分成两行做test,初始和上一行合二为一
                } )//注意: 这里只取array的第一个对象, 而不是只有一个对象的array. 
        }

        const postEmployeeObj = () => {

            const employeeObjToSend = {
                startDate: newEmployee.startDate,
                payRate: Number(newEmployee.payRate),//也可用parseFloat(newEmployee.payRate, 2)
                locationId: Number(newEmployee.locationId),//用户填写的是string,需要Number()
                userId: addedEmployeeUser.id,//json的id是数字,不需要Number()
            }

            fetch(`http://localhost:8088/employees`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employeeObjToSend)
            })
                .then(res => res.json())
                .then(() => {
                    navigate("/employees")
                })
        }


    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        required autoFocus
                        type="text"
                        //className="form-control"
                        placeholder="Employee Name"
                        value={newUser.name}//需要newUser关联
                        onChange={(evt) => {
                            const copy = { ...newUser }//需要newUser关联
                            copy.name = evt.target.value
                            updateNewUser(copy)//需要newUser关联
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        type="date"
                        value={newEmployee.startDate}
                        onChange={(evt) => {
                            const copy = { ...newEmployee }
                            copy.startDate = evt.target.value
                            updateNewEmployee(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="payRate">Pay Rate</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="99.99"
                        placeholder="A number from 0.00 to 99.99"
                        value={newEmployee.payRate}
                        onChange={(evt) => {
                            const copy = { ...newEmployee }
                            copy.payRate = evt.target.value
                            updateNewEmployee(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationId">Location ID</label>
                    <input
                        type="number"
                        placeholder="A number for Location ID"
                        value={newEmployee.locationId}
                        onChange={(evt) => {
                            const copy = { ...newEmployee }
                            copy.locationId = evt.target.value
                            updateNewEmployee(copy)
                        }}
                    />
                </div>
            </fieldset>

            <button
                className="btn btn-primary"
                onClick={(evt) => {
                    handleSaveButtonClick(evt)
                }}
            >
                Submit New Employee
            </button>
        </form>
    )
}
