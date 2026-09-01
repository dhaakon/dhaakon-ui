import { FileList } from '@dhaakon/ui/app';

export default function Demo() {
  return (
    <FileList
      onRemove={() => {}}
      files={[
        { id: '1', name: 'brain-2026-09-01.log', size: 2_400_000 },
        { id: '2', name: 'openproject-crash.log', size: 812_000, progress: 62 },
        { id: '3', name: 'core-dump.bin', size: 480_000_000, error: 'Larger than the 20 MB limit.' },
      ]}
    />
  );
}
