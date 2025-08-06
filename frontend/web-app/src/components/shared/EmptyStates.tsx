"use client";

interface EmptyStateProps {
  message: string;
  icon?: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({ message, actionText, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-6xl mb-4 text-gray-400">📦</div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{message}</h3>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
