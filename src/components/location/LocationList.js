import { useState, useEffect } from "react"
import "./LocationList.css"

export const LocationList = () => {
    
    const [locations, setLocations] = useState([])

    useEffect(
         () => {
            fetch(`http://localhost:8088/locations`) 
                .then(response => response.json())
                .then((locationArray) => {
                    setLocations(locationArray)
                }
                )
         },
        []
    )
    

    return<article className="locations">
    {
        locations.map(location => {return <section className="location" key={`location--${location.id}`} >
                
                <div className="location__header">Store No.{location.id}</div>
                <div>Address: {location.address}</div>
                <div>Square Footage: {location.squareFootage}</div>
               
        </section> })
    }
</article>
}