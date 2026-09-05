import { SiteFooter } from "@dhaakon/ui/site";
export default function Demo() {
  return (
    <SiteFooter
      email="david@dhaakon.com"
      copyright="© 2026 David Poyner"
      items={[
        <a href="https://dhaakon.com" key="practice">
          Practice ↗
        </a>,
      ]}
    />
  );
}
