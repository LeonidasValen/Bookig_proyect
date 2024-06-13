import {RouterProvider, createBrowserRouter} from "react-router-dom"
import { Home } from "./pages/home/Home"
import { List } from "./pages/list/List"
import { Hotels } from "./pages/hotel/Hotels"
import { Layaout } from "./components/Layaout"
import { ErrorPage } from "./ErrorPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layaout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "hotels",
        element: <List/>
      },
      {
        path: "hotel/:id",
        element: <Hotels/>
      }
    ]
  }
])


function App() {


  return (

    <>
      <RouterProvider router={router}/>
    </>

  )
}

export default App
