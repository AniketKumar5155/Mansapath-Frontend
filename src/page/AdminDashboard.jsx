import AdminHeader from "../component/AdminHeader"
import SubmissionTable from "../component/submissionTable"

const AdminDashboard = () => {
  return (
    <>
    <div className="flex px-3">
    <div className="w-[20%]">
        <AdminHeader/>
    </div>
    <div className="w-[80%] flex justify-center items-center">
      <SubmissionTable />
    </div>
    </div>
    </>
  )
}

export default AdminDashboard
