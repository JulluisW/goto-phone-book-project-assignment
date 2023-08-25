//Components
import { ContactList } from "@/templates";

export default async function ContactsPage() {
  return (
    <main>
      <ContactList paging={0} contacts={[]} />
    </main>
  );
}
