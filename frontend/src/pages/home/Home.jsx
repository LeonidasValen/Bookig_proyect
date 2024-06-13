import { Featured } from "../../components/featured/Featured"
import { FeaturedPropierties } from "../../components/featuredProperties/FeaturedPropierties"
import { PropertyList } from "../../components/propertyList/PropertyList"
import { PropertyType } from "../../components/propertyType/PropertyType"
import "./home.css"

export function Home() {
  return (
    <div className="homeContainer">
      <Featured/>
      <PropertyList/>
      <PropertyType/>
      <FeaturedPropierties/>
    </div>
  )
}
