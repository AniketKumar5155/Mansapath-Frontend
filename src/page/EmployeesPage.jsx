import AdminSidebar from "../component/AdminSidebar"
import EmployeesTable from "../component/EmployeesTable"

const EmployeesPage = () => {
  return (
    <>
    <div className="flex">

      <div className="w-[20%]">
        <AdminSidebar/>
      </div>
      <div className="w-[80%]">
         <EmployeesTable/>
      </div>
    </div>
     
    </>
  )
}

export default EmployeesPage
