import { Radio, RadioGroup } from '@dhaakon/ui';

export default function Demo() {
  return (
    <RadioGroup label="Deployment target" defaultValue="local">
      <Radio value="local" description="Runs on the NUC. ~$8/month in electricity.">Local</Radio>
      <Radio value="hetzner" description="8 vCPU / 16 GB dedicated. ~$35/month.">Hetzner</Radio>
      <Radio value="aws" description="m5.xlarge + 500 GB gp3. ~$180/month.">AWS</Radio>
    </RadioGroup>
  );
}
