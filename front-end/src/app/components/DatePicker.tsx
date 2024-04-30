import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

interface DatePickerProps {
    handleDateChange: (date: string) => void;
}
export default function DatePicker({ handleDateChange }: DatePickerProps) {

    const [birthDate, setBirthDate] = useState({
        startDate: null,
        endDate: null
    });

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setBirthDate(newValue);
        handleDateChange(newValue.startDate);
    }

    return (
        <div className="mt-5">
            <Datepicker
                asSingle={true}
                value={birthDate}
                onChange={handleValueChange}
                placeholder="Select Birthdate"
                inputClassName={"w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"}
                maxDate={new Date()}
            />
        </div>

    );

};