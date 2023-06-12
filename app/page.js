'use client'
import Image from 'next/image'
import { useState } from 'react'
import { BsArrowDown } from 'react-icons/bs'
import  dateDiff  from './dateDifference'

export default function Home() {
    const [year, setYear] = useState(1940)
    const [month, setMonth] = useState(4)
    const [day, setDay] = useState(12)
    const [result, setResult] = useState({years: "--", months: "--", days: "--"})
    const [yearError, setYearError] = useState(false)
    const [monthError, setMonthError] = useState(false)
    const [dayError, setDayError] = useState(false)

    const handleCalculate = () => {
        if (yearError || monthError || dayError) return
        const date = new Date(`${year}-${month}-${day}`) 
        const today = new Date()
        const [years, months, days] = dateDiff(date, today)
        setResult({years : years, months: months, days: days})
    }

    const handleYear = (year) => {
        const yearNow = new Date().getFullYear()
        setYear(year)
        yearNow < year ?
            setYearError(true) :
            year.length == 0 ?
            setYearError(true) :
            year.length < 4 ?
            setYearError(true) :
            setYearError(false)
    }

    const handleMonth = (month) => {
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day > daysInMonth) setDay(daysInMonth)
        setMonth(month)
        month > 12 ? 
            setMonthError(true) :
            month.length == 0 ? 
            setMonthError(true) :
            month == 0 ?
            setMonthError(true) :
            setMonthError(false)
    }

    const handleDay = (day) => {
        const daysInMonth = new Date(year, month, 0).getDate();
        day > daysInMonth ? setDay(daysInMonth) : setDay(day)
        day.length == 0 ? 
            setDayError(true) : 
            day == 0 ? 
            setDayError(true) : 
            setDayError(false)
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="bg-white px-6 py-8 rounded-xl rounded-br-[100px] [&>*]:mb-8 shadow lg:w-1/2 lg:p-10">

                <div className="flex gap-4 [&>*]:w-20 [&>*]:lg:w-32">
                    <div className="relative flex flex-col"> 
                        <label className={`mb-2 text-sm font-semibold ${dayError ? "text-red-400" : "text-black/50"} tracking-widest`}>DAY</label>
                        <input 
                            className="p-2 border border-gray-200 rounded font-bold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                            type="number" 
                            onChange={(e) => handleDay(e.target.value)}
                            value={day}
                        />
                        {dayError && <p className="absolute inset-y-full text-xs text-red-500">Must be a valid day</p>}
                    </div>
                    <div className="relative flex flex-col"> 
                        <label className={`mb-2 text-sm font-semibold ${monthError ? "text-red-400" : "text-black/50"} tracking-widest`}>MONTH</label>
                        <input 
                            className="p-2 border border-gray-200 rounded font-bold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            type="number" 
                            onChange={(e) => handleMonth(e.target.value)}
                            value={month}
                        />
                        {monthError && <p className="absolute inset-y-full text-xs text-red-500">Must be a valid month</p>}
                    </div>
                    <div className="relative flex flex-col">
                        <label 
                            className={`mb-2 text-sm font-semibold ${yearError ? "text-red-400" : "text-black/50"} tracking-widest`} 
                        >YEAR</label>
                        <input 
                            className="p-2 border border-gray-200 rounded font-bold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                            type="number" 
                            onChange={(e) => handleYear(e.target.value)}
                            value={year}
                        />
                        {yearError && <p className="absolute inset-y-full text-xs text-red-500">Must be a valid year</p>}
                    </div>
                </div>

                <div className="relative h-12 flex flex-col justify-center">
                    <div className="border-t-2 border-black/10" />
                    <div 
                        className={`absolute -translate-y-2/4 inset-y-2/4 -translate-x-2/4 inset-x-2/4 w-12 h-12 
                        flex justify-center items-center text-white text-2xl 
                        ${yearError || monthError || dayError ? "bg-purple-200" : "bg-purple-500 cursor-pointer"}
                        rounded-full 
                        lg:-translate-y-1/4 lg:inset-y-1/4 lg:inset-x-3/4 lg:inset-x-full`}
                    >
                        <BsArrowDown 
                            onClick={() => handleCalculate()}
                        />
                    </div>
                </div>

                <div>
                    <p className="text-5xl font-bold italic"><span className="text-purple-500">{result.years}</span> years</p>
                    <p className="text-5xl font-bold italic"><span className="text-purple-500">{result.months}</span> months</p>
                    <p className="text-5xl font-bold italic"><span className="text-purple-500">{result.days}</span> days</p>
                </div>

            </div>

        </main>
    )
}
