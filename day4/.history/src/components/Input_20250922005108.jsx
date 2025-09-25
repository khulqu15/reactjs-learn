export default function Input({
  id,
  label,
  helper,
  error,
  className = '',
  ...props
}) {
  const describedBy = error
    ? `${id}-error`
    : helper
    ? `${id}-helper`
    : undefined;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={
          'w-full px-3 py-2 rounded-xl border text-sm ' +
          (error
            ? 'border-red-400 focus:ring-2 focus:ring-red-300 focus:outline-none'
            : 'border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none') +
          ' placeholder:text-gray-400'
        }
        {...props}
      />

      {helper && !error && (
        <p id={`${id}-helper`} className="mt-1 text-xs text-gray-500">
          {helper}
        </p>
      )}

      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
