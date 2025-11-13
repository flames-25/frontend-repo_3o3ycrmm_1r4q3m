import { useState } from 'react';
import Stepper from './Stepper';
import DUXCard from './DUXCard';

export default function NewReceivableForm({ onCreated }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', whatsapp: '', cnpj: '', company: '', role: '',
    nf_number: '', nf_series: '', nf_value: '', nf_date: '', taker_cnpj: '', nf_xml: null,
    nf_pdf: null, contract_pdf: null, attachments: [],
    requested_value: '', bank: '', agency: '', account: '', receivable_type: 'duplicata', notes: ''
  });

  const base = import.meta.env.VITE_BACKEND_URL || '';

  const steps = ['Dados', 'Nota Fiscal', 'Documentos', 'Financeiro', 'Revisar'];

  const next = () => setStep((s) => Math.min(5, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'attachments') {
          v.forEach((file) => fd.append('attachments', file));
        } else if (v !== null && v !== undefined) {
          fd.append(k, v);
        }
      });
      const res = await fetch(`${base}/api/receivables`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Falha ao enviar solicitação');
      await res.json();
      onCreated?.();
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  const input = (props) => (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{props.label}</label>
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 focus-within:border-gray-400">
        <input {...props} className="flex-1 outline-none placeholder-gray-400 text-gray-900" />
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <Stepper steps={steps} current={step} />

      {step === 1 && (
        <DUXCard className="p-4 space-y-3">
          {input({ label: 'Nome', value: form.name, placeholder: 'Seu nome', onChange: (e) => update('name', e.target.value) })}
          {input({ label: 'Email', type: 'email', value: form.email, placeholder: 'voce@empresa.com', onChange: (e) => update('email', e.target.value) })}
          {input({ label: 'WhatsApp', value: form.whatsapp, placeholder: '(11) 9 9999-9999', onChange: (e) => update('whatsapp', e.target.value) })}
          {input({ label: 'CNPJ', value: form.cnpj, placeholder: '00.000.000/0000-00', onChange: (e) => update('cnpj', e.target.value) })}
          {input({ label: 'Empresa', value: form.company, placeholder: 'DUX', onChange: (e) => update('company', e.target.value) })}
          {input({ label: 'Cargo', value: form.role, placeholder: 'Diretor Financeiro', onChange: (e) => update('role', e.target.value) })}
        </DUXCard>
      )}

      {step === 2 && (
        <DUXCard className="p-4 space-y-3">
          {input({ label: 'Número NF', value: form.nf_number, onChange: (e) => update('nf_number', e.target.value) })}
          {input({ label: 'Série', value: form.nf_series, onChange: (e) => update('nf_series', e.target.value) })}
          {input({ label: 'Valor NF (R$)', type: 'number', value: form.nf_value, onChange: (e) => update('nf_value', e.target.value) })}
          {input({ label: 'Data', type: 'date', value: form.nf_date, onChange: (e) => update('nf_date', e.target.value) })}
          {input({ label: 'CNPJ Tomador', value: form.taker_cnpj, onChange: (e) => update('taker_cnpj', e.target.value) })}
          <div>
            <label className="block text-sm text-gray-600 mb-1">XML da NF</label>
            <input type="file" accept=".xml" onChange={(e) => update('nf_xml', e.target.files[0])} />
          </div>
        </DUXCard>
      )}

      {step === 3 && (
        <DUXCard className="p-4 space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">PDF da NF</label>
            <input type="file" accept="application/pdf" onChange={(e) => update('nf_pdf', e.target.files[0])} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Contrato (PDF)</label>
            <input type="file" accept="application/pdf" onChange={(e) => update('contract_pdf', e.target.files[0])} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Anexos</label>
            <input multiple type="file" onChange={(e) => update('attachments', Array.from(e.target.files))} />
          </div>
        </DUXCard>
      )}

      {step === 4 && (
        <DUXCard className="p-4 space-y-3">
          {input({ label: 'Valor Solicitado (R$)', type: 'number', value: form.requested_value, onChange: (e) => update('requested_value', e.target.value) })}
          {input({ label: 'Banco', value: form.bank, onChange: (e) => update('bank', e.target.value) })}
          {input({ label: 'Agência', value: form.agency, onChange: (e) => update('agency', e.target.value) })}
          {input({ label: 'Conta', value: form.account, onChange: (e) => update('account', e.target.value) })}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tipo de Recebível</label>
            <select value={form.receivable_type} onChange={(e) => update('receivable_type', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2">
              <option value="duplicata">Duplicata</option>
              <option value="cartao">Cartão</option>
              <option value="boleto">Boleto</option>
              <option value="outro">Outro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Observações</label>
            <textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2" rows={3} />
          </div>
        </DUXCard>
      )}

      {step === 5 && (
        <DUXCard className="p-4 space-y-2">
          <div className="text-gray-900 font-semibold">Revise os dados</div>
          <div className="text-sm text-gray-600">Confirme as informações antes de enviar.</div>
        </DUXCard>
      )}

      <div className="flex gap-3 pb-24">
        <button onClick={prev} disabled={step===1} className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700">Voltar</button>
        {step < 5 ? (
          <button onClick={next} className="flex-1 py-3 rounded-xl bg-gray-900 text-white">Continuar →</button>
        ) : (
          <button onClick={submit} disabled={loading} className="flex-1 py-3 rounded-xl bg-gray-900 text-white">{loading ? 'Enviando...' : 'Enviar →'}</button>
        )}
      </div>
    </div>
  );
}
