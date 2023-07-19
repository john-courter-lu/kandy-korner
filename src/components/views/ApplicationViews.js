import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../location/LocationList.js"
import { ProductList } from "../product/ProductList.js"
import { ProductForm } from "../form/ProductForm.js"
import { SearchContainer } from "../search/SearchContainer.js"
import { EmployeeList } from "../employee/EmployeeList.js"
import { EmployeeForm } from "../employee/EmployeeForm.js"
import { CustomerDetails, CustomerList, EditLoyalityNumber } from "../customer/CustomerList.js"


export const ApplicationViews = () => {
	return <Routes>
		<Route path="/" element={
			<>
				<h1>Kandy Korner Shop</h1>
				<h4>🍬Let Candies Bring You Joy🍬</h4>

				<Outlet />
			</>
		}>

			<Route path="locations" element={<LocationList />} />
			<Route path="products" element={<ProductList />} />
			<Route path="products/create" element={<ProductForm />} />
			<Route path="products/search" element={<SearchContainer />} />
			<Route path="employees" element={<EmployeeList />} />
			<Route path="employees/create" element={<EmployeeForm />} />
			<Route path="customers" element={<CustomerList />} />
			<Route path="customers/:customerId" element={<CustomerDetails />} />
			<Route path="customers/:customerId/edit-loyalty-number" element={<EditLoyalityNumber />} />


		</Route>
	</Routes>
}

