import { useState } from 'react';
import { VerificationCodeInput } from '@dhaakon/ui/app';

export default function Demo() {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | undefined>();
  return (
    <div style={{ display: 'grid', gap: '1rem', maxWidth: 340 }}>
      <VerificationCodeInput
        value={code}
        onChange={(v) => { setCode(v); setError(undefined); }}
        onComplete={(v) => setError(v === '123456' ? undefined : 'That code is not right.')}
        errorMessage={error}
      />
      <span className="dhk-control-desc">Try pasting a 6-digit code into any box.</span>
    </div>
  );
}
