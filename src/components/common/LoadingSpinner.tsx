interface LoadingSpinnerProps {
    message?: string;
    size?: 'small' | 'medium' | 'large';
}




export const LoadingSpinner = ({message = "Loading", size = "medium"}: LoadingSpinnerProps) => {

    const sizeClasses = {
        small: 'w-8 h-8',
        medium: 'w-12 h-12',
        large: 'w-16 h-16'
    };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
        {/* Spinning circle */}
      <div className={`${sizeClasses[size]} border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin`} />
      {message && <p className="text-white">{message}</p>}
    </div>
  )
}

export default LoadingSpinner
