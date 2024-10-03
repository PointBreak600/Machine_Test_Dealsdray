import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getEmployees, deleteEmployee } from '../../utils/api'
import Admin from '../Admin'

const List = () => {
  const [employees, setEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const response = await getEmployees()
      setEmployees(response.data)
      setTotal(response.data.length)
      setError(null)
    } catch (err) {
      setError('Failed to fetch employees')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id)
        setEmployees(employees.filter(employee => employee._id !== id))
        setTotal((prevTotal) => prevTotal - 1);
      } catch (err) {
        setError('Failed to delete employee')
      }
    }
  }

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <Admin />
      <div className="container mx-auto px-4 py-8 mt-14">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Employee List</h1>
          <Link
            to="/admin/create"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Employee
          </Link>
        </div>

        <div className="flex justify-end items-center mb-4">
          <span className="text-sm text-gray-600 mr-5">Total Employees: {total}</span>
          
          <div className="w-full max-w-xs">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border-2 border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-2 border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Mobile</th>
                <th className="px-4 py-2 text-left">Designation</th>
                <th className="px-4 py-2 text-left">Gender</th>
                <th className="px-4 py-2 text-left">Course</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Created At</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee._id} className="border-t border-gray-300">
                  <td className="px-4 py-2">{employee.name}</td>
                  <td className="px-4 py-2">{employee.email}</td>
                  <td className="px-4 py-2">{employee.mobile}</td>
                  <td className="px-4 py-2">{employee.designation}</td>
                  <td className="px-4 py-2">{employee.gender}</td>
                  <td className="px-4 py-2">{employee.course}</td>
                  <td className="px-4 py-2">
                    <img 
                      src={`${import.meta.env.VITE_BASE_URL}${employee.imageUrl}`} 
                      alt={employee.name} 
                      className="w-10 h-10 rounded-full object-cover" 
                    />
                  </td>
                  <td className="px-4 py-2">{new Date(employee.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/admin/edit/${employee._id}`}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default List