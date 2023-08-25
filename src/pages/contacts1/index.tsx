import { ContactList } from "@/templates";

export default function ContactsPage() {
  return (
    <main>
      <ContactList paging={0} contacts={[]} />
    </main>
  );
}
