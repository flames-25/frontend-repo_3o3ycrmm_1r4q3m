import { useEffect, useState } from 'react';
import HeaderHero from './components/HeaderHero';
import BottomNav from './components/BottomNav';
import DUXCard from './components/DUXCard';
import ReceivablesList from './components/ReceivablesList';
import NewReceivableForm from './components/NewReceivableForm';

function App() {
  const [tab, setTab] = useState('antecipacao');
  const [view, setView] = useState('list'); // list | new | detail
  const [detailId, setDetailId] = useState(null);

  useEffect(() => {
    if (tab === 'nova') setView('new');
    if (tab === 'antecipacao') setView('list');
  }, [tab]);

  const openDetail = (id) => {
    setDetailId(id);
    setView('detail');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8DFFC] to-[#EAF7ED]">
      <HeaderHero onNotificationsClick={() => alert('Notificações')} />

      <div className="max-w-md mx-auto px-4 -mt-10 relative z-10">
        <div className="mb-4 grid grid-cols-3 gap-3">
          <button onClick={() => setView('new')} className="col-span-3">
            <DUXCard className="p-4 flex items-center justify-between">
              <div>
                <div className="text-gray-900 font-semibold">Nova Solicitação</div>
                <div className="text-gray-500 text-sm">Antecipe seus recebíveis agora</div>
              </div>
              <div className="text-2xl">→</div>
            </DUXCard>
          </button>
        </div>

        <div className="mb-6">
          <div className="flex gap-2">
            <button onClick={() => setView('list')} className={`px-4 py-2 rounded-xl ${view==='list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}>Solicitações</button>
            <button onClick={() => setView('new')} className={`px-4 py-2 rounded-xl ${view==='new' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}>Nova</button>
          </div>
        </div>

        {view === 'list' && (
          <ReceivablesList onOpen={openDetail} />
        )}

        {view === 'new' && (
          <NewReceivableForm onCreated={() => setView('list')} />
        )}

        {view === 'detail' && (
          <ReceivableDetail id={detailId} onBack={() => setView('list')} />
        )}
      </div>

      <BottomNav current={tab} onChange={setTab} />
    </div>
  );
}

function ReceivableDetail({ id, onBack }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const base = import.meta.env.VITE_BACKEND_URL || '';

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${base}/api/receivables/${id}`);
      const json = await res.json();
      setData(json);
      setLoading(false);
    };
    load();
  }, [id, base]);

  if (loading) return <div className="p-4">Carregando...</div>;

  return (
    <div className="space-y-4 pb-24">
      <button onClick={onBack} className="text-gray-700">← Voltar</button>
      <DUXCard className="p-4">
        <div className="text-lg font-semibold text-gray-900">Detalhes da Solicitação</div>
        <div className="text-sm text-gray-600 mt-2">Status: {data.status}</div>
        <div className="grid grid-cols-2 gap-2 text-sm mt-4">
          <div className="text-gray-500">NF</div>
          <div className="text-gray-900">{data.nf_number} - Série {data.nf_series || '-'}</div>
          <div className="text-gray-500">Valor NF</div>
          <div className="text-gray-900">R$ {Number(data.nf_value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          <div className="text-gray-500">Solicitado</div>
          <div className="text-gray-900">R$ {Number(data.requested_value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
          <div className="text-gray-500">Banco</div>
          <div className="text-gray-900">{data.bank} / Ag {data.agency} / Cc {data.account}</div>
        </div>
      </DUXCard>

      <DUXCard className="p-4">
        <div className="text-gray-900 font-semibold">Timeline</div>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gray-900" /> Recebida</div>
          <div className="flex items-center gap-2 text-gray-500"><span className="w-2 h-2 rounded-full bg-gray-300" /> Em análise</div>
          <div className="flex items-center gap-2 text-gray-500"><span className="w-2 h-2 rounded-full bg-gray-300" /> Aprovada</div>
        </div>
      </DUXCard>
    </div>
  );
}

export default App;
