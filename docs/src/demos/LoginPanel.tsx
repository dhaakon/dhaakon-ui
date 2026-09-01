import { LoginPanel } from '@dhaakon/ui/app';
import { Button, Checkbox, Field, Input } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ border: '1px solid var(--dhk-border)' }}>
      <LoginPanel
        brand="Dhaakon"
       
        title="Sign in"
        description="Use your dhaakon-network account."
        submit={<Button type="submit" block>Sign in</Button>}
        secondary={
          <>
            <Checkbox>Remember me</Checkbox>
            <a href="#" style={{ fontSize: 'var(--dhk-text-xs)' }}>Forgot password?</a>
          </>
        }
        footer={<>No account? <a href="#">Ask an admin</a></>}
      >
        <Field label="Email"><Input type="email" autoComplete="username" placeholder="you@dhaakon.local" /></Field>
        <Field label="Password"><Input type="password" autoComplete="current-password" /></Field>
      </LoginPanel>
    </div>
  );
}
