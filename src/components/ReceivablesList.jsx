import { useEffect, useState } from 'react';
import DUXCard from './DUXCard';

export default function ReceivablesList({ onOpen }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const base = import.meta.env.VITE_BACKEND_URL || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${base}/api/receivables`);
        if (!res.ok) throw new Error('Erro ao carregar lista');
        const data = await res.json();
        setItems(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [base]);

  if (loading) return <div className="text-gray-500">Carregando...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <DUXCard className="p-4 text-center text-gray-500">Nenhuma solicitação ainda.</DUXCard>
      )}
      {items.map((it) => (
        <button key={it.id} onClick={() => onOpen(it.id)} className="w-full text-left">
          <DUXCard className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">NF</div>
                <div className="text-lg font-semibold text-gray-900">R$ {it.nf_value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                <div className="text-xs text-gray-500">A receber: R$ {it.requested_value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${it.status === 'approved' ? 'bg-green-100 text-green-700' : it.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                  {it.status}
                </span>
                <div className="text-xs text-gray-400 mt-1">{it.estimated_date || '-'}</div>
              </div>
            </div>
          </DUXCard>
        </button>
      ))}
    </div>
  );
}
