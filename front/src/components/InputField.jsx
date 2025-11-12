export default function InputField({
    id,
    label,
    type = "text",
    placeholder = "",
    required = true,
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-300"
            >
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                required={required}
                placeholder={placeholder}
                className="mt-2 w-full rounded-lg bg-gray-700 border border-gray-600 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
    );
}
