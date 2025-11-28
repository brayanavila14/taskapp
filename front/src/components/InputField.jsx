export default function InputField({
    label,
    type,
    value,
    onChange,
    placeholder = "",
    textarea = false,
    rows = 3,
}) {
    return (
        <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-300">{label}</label>

            {textarea ? (
                <textarea
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={rows}
                    className="w-full rounded-md bg-gray-700 text-white px-3 py-2 text-sm 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    placeholder={placeholder}
                />
            ) : (
                <input
                    type={type || "text"}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full rounded-md bg-gray-700 text-white px-3 py-2 text-sm 
                    placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={placeholder}
                />
            )}
        </div>
    );
}
