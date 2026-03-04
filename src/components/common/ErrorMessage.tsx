interface ErrorMessageProps {
    message: string;
    onDismiss?: () => void;
}


export const ErrorMessage = ({message, onDismiss}: ErrorMessageProps) => {
  return (
    <div className="p-4 bg-red-100 border border-red-400 rounded-lg flex items-center justify-between">
        <div>
        <p className="text-red-800 font-semibold">Error</p>
        <p className="text-red-700">{message}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-red-700 hover:text-red-900 font-bold"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default ErrorMessage