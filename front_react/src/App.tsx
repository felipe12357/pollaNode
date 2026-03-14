import { RouterProvider } from "react-router-dom"
import { routes } from "./routing"
import { ContextGlobalProvider } from "./contextGlobalProvider"

function App() {
  return (
    <>
      <ContextGlobalProvider>
        <RouterProvider router={routes}></RouterProvider>
      </ContextGlobalProvider>
    </>
  )
}

export default App
