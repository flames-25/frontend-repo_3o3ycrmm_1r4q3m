import Spline from '@splinetool/react-spline';

export default function HeaderHero({ onNotificationsClick }) {
  return (
    <div className="relative overflow-hidden rounded-b-3xl" style={{ height: 260 }}>
      <div className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#E8DFFC]/80 to-[#EAF7ED]/80 pointer-events-none" />
      <div className="relative z-10 flex items-start justify-between p-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-gray-700">Olá,</div>
          <div className="text-2xl font-semibold text-gray-900">DUX Finance</div>
          <div className="mt-2 text-gray-700">Bem-vindo de volta</div>
        </div>
        <button onClick={onNotificationsClick} className="bg-white/80 backdrop-blur-md shadow-md px-3 py-2 rounded-xl text-gray-800 hover:shadow-lg transition">
          <span className="i-bell" aria-hidden />
          🔔
        </button>
      </div>
    </div>
  );
}
