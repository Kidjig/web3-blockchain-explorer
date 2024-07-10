import React, { useState } from 'react';

interface AddressInputProps {
    onSubmit: (address: string) => void;
    placeholder?: string;
    buttonText?: string;
}

const AddressInput: React.FC<AddressInputProps> = ({ 
    onSubmit, 
    placeholder = "Enter Ethereum Address", 
    buttonText = "Explore" 
}) => {
    const [address, setAddress] = useState('');
    const [isValid, setIsValid] = useState(true);

    const validateAddress = (addr: string) => {
        // Basic Ethereum address validation (starts with 0x and has 42 characters)
        return /^0x[a-fA-F0-9]{40}$/.test(addr);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (validateAddress(address)) {
            onSubmit(address);
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col sm:flex-row items-stretch">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value);
                            setIsValid(true);
                        }}
                        placeholder={placeholder}
                        className={`w-full px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 ${
                            isValid ? 'focus:ring-blue-400' : 'focus:ring-red-400'
                        } bg-gray-700 text-white transition-all duration-300 ease-in-out`}
                    />
                    {!isValid && (
                        <p className="absolute text-red-500 text-sm mt-1">
                            Please enter a valid Ethereum address
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full sm:w-auto mt-2 sm:mt-0 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-r-lg transition-colors duration-300 ease-in-out"
                >
                    {buttonText}
                </button>
            </div>
        </form>
    );
};

export default AddressInput;