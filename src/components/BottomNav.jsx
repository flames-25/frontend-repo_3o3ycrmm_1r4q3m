import { Home, FileText, PlusCircle, Wallet, User } from 'lucide-react';

export default function BottomNav({ current, onChange }) {
  const items = [
    { key: 'home', label: 'Início', icon: Home },
    { key: 'antecipacao', label: 'Antecipação', icon: Wallet },
    { key: 'nova', label: 'Novo', icon: PlusCircle },
    { key: 'docs', label: 'Documentos', icon: FileText },
    { key: 'perfil', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-md">
        <div className="m-4 rounded-2xl bg-white/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex justify-between px-4 py-3">
          {items.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`flex flex-col items-center text-xs font-medium transition ${current === key ? 'text-gray-900' : 'text-gray-500'}`}
            >
              <Icon size={22} />
              <span className="mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
