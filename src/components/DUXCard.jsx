export default function DUXCard({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl shadow-[#0000000A] border border-gray-100 ${className}`} style={{ boxShadow: '0 20px 40px rgba(17,24,39,0.08)' }}>
      {children}
    </div>
  );
}
