import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getEmployee, updateEmployee } from '../../utils/api'
import Admin from '../Admin'

const Edit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
  })
  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState('')
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployee(id)
        setFormData(response.data)
        setPreviewImage(`${import.meta.env.VITE_BASE_URL}${response.data.imageUrl}`)
        setLoading(false)
      } catch (err) {
        setApiError('Failed to fetch employee data')
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        setImage(file)
        setPreviewImage(URL.createObjectURL(file))
        setErrors(prevErrors => ({ ...prevErrors, image: '' }))
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          image: 'Please upload only JPG or PNG images.'
        }))
      }
    }
  }

  const validateForm = () => {
    let newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required'
    } else if (!/^\d+$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number should contain only digits'
    }
    
    if (!formData.designation) newErrors.designation = 'Designation is required'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    if (!formData.course) newErrors.course = 'Course is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      try {
        const formDataToSend = new FormData()
        Object.keys(formData).forEach(key => {
          formDataToSend.append(key, formData[key])
        })
        if (image) {
          formDataToSend.append('image', image)
        }

        await updateEmployee(id, formDataToSend)
        navigate('/admin/list')
      } catch (err) {
        if (err.response && err.response.data) {
          setApiError(err.response.data.message)
        } else {
          setApiError('An error occurred while updating the employee')
        }
      }
    }
  }

  const inputClasses = "mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"

  if (loading) return <div>Loading...</div>
  if (apiError) return <div>Error: {apiError}</div>

  return (
    <>
      <Admin />
      <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Employee</h1>
        {apiError && <div className="mb-4 text-red-500">{apiError}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputClasses}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={inputClasses}
            />
            {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
            <select
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
            {errors.designation && <p className="mt-1 text-sm text-red-600">{errors.designation}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="mt-2 space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === 'Male'}
                  onChange={handleChange}
                  className="form-radio text-indigo-600 border-2 border-gray-300"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === 'Female'}
                  onChange={handleChange}
                  className="form-radio text-indigo-600 border-2 border-gray-300"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
            {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="">Select Course</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="BSC">BSC</option>
            </select>
            {errors.course && <p className="mt-1 text-sm text-red-600">{errors.course}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image Upload</label>
            <input
              type="file"
              id="image"
              name="image"
              accept=".jpg,.jpeg,.png"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-2 file:border-gray-300
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
            {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
            {previewImage && (
              <img src={previewImage} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border-2 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Edit