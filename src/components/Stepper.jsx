export default function Stepper({ steps, current }) {
  return (
    <div className="flex items-center justify-between gap-3 px-2">
      {steps.map((label, idx) => {
        const step = idx + 1;
        const isActive = step === current;
        const isDone = step < current;
        return (
          <div key={label} className="flex-1 flex items-center">
            <div className={`flex items-center justify-center w-9 h-9 rounded-full border text-sm font-semibold transition ${
              isActive ? 'bg-gray-900 text-white border-gray-900 shadow' : isDone ? 'bg-white text-gray-900 border-gray-300' : 'bg-white text-gray-400 border-gray-200'
            }`}>
              {step}
            </div>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 rounded ${isDone ? 'bg-gray-900' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
