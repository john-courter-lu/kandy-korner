import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../location/LocationList.js"

export const ApplicationViews = () => {
	return <Routes>
		<Route path="/" element={
			<>
				<h1>Kandy Korner Shop</h1>
				<h2>Let Candies Bring You Joy</h2>

				<Outlet />
			</>
		}>

			<Route path="locations" element={<LocationList />} />


		</Route>
	</Routes>
}

