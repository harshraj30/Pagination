import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Pagination = () => {
    const [tableData, setTableData] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerpage, setRowsPerpage] = useState(10)
    const indexOfLastitem = currentPage * rowsPerpage
    const indexOfFirstitem = indexOfLastitem - rowsPerpage
    const currentItem = tableData?.users.slice(indexOfFirstitem, indexOfLastitem)
    const totalPage = Math.ceil(tableData?.total / rowsPerpage)

    useEffect(() => {
        axios.get('https://dummyjson.com/users/?limit=0')
            .then((response) => {
                setTableData(response?.data)
            })
    }, [])

    const handlePrev = () => {
        setCurrentPage((e) => Math.max(e - 1, 1))
    }
    const handleNext = () => {
        setCurrentPage((e) => Math.min(e + 1, totalPage))
    }
    const handlePageClick = (page) => {
        setCurrentPage(page)
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center">

            <h1 className='text-3xl font-bold text-stone-600 my-10'>Pagination</h1>

            <table className='w-full'>
                <thead className=''>
                    <tr className='bg-gray-400 border border-gray-600 h-16 text-xl font-bold'>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItem?.map((value, index) => (
                        <tr key={index} className={`border border-gray-600 text-xl ${value.id % 2 === 0 ? "bg-gray-200" : ""} hover:bg-rose-200 cursor-pointer duration-300`}>
                            <td className='text-center h-14'>{value.firstName}</td>
                            <td className='text-center h-14'>{value.email}</td>
                            <td className='text-center h-14'>{value.gender}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-end h-full pb-20">
                <div className="flex gap-3 text-lg font-semibold">
                    <button onClick={handlePrev} className={`border px-5 py-2  rounded-lg text-white ${currentPage === 1 ? "bg-gray-300" : "bg-sky-500"}`}>Prev</button>
                    {
                        Array.from({ length: totalPage }, (_, index) => (
                            <button onClick={() => handlePageClick(index + 1)} className={`${currentPage === index + 1 ? "bg-teal-700" : "bg-sky-500"} border px-5 py-2 rounded-lg text-white`} key={index}>{index + 1}</button>
                        ))
                    }
                    <button onClick={handleNext} className={`border px-5 py-2 ${currentPage === totalPage ? "bg-gray-300" : "bg-sky-500"} rounded-lg text-white `}>Next</button>
                </div>
            </div>
        </div>
    )
}

export default Pagination