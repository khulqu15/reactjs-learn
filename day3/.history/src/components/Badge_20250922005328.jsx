// Badge.jsx — badge kecil dengan beberapa warna
// Props:
// - tone: 'gray' | 'blue' | 'green' | 'red' | 'yellow' (default: 'gray')
// - size: 'sm' | 'md' (default: 'sm')

export default function Badge({ children, tone = 'gray', size = 'sm', className = '' }) {
  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
  };

  const tones = {
    gray: 'bg-gray-100 text-gray-700',
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    red: 'bg-red-100 text-red-700',
    yellow: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <span
      className={`inline-flex items-center rounded-lg ${sizes[size]} ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
