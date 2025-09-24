// Button.jsx — variatif: solid & outline
// Props utama:
// - variant: 'solid' | 'outline' (default: 'solid')
// - tone: 'primary' | 'gray' (default: 'primary')
// - size: 'sm' | 'md' | 'lg' (default: 'md')
// - full: boolean (full width)
// - disabled: boolean

export default function Button({
  children,
  variant = 'solid',
  tone = 'primary',
  size = 'md',
  full = false,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center rounded-xl font-medium transition ' +
    'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  const solid = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400',
    gray: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-400',
  };

  const outline = {
    primary:
      'border border-blue-600 text-blue-700 hover:bg-blue-50 focus:ring-blue-400',
    gray:
      'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400',
  };

  const styles =
    variant === 'outline'
      ? outline[tone] || outline.primary
      : solid[tone] || solid.primary;

  return (
    <button
      className={`${base} ${sizes[size]} ${styles} ${full ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
