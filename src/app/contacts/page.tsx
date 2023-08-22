//API
import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";

//Components
import { ContactList } from "@/components";

//Hooks
import useContactAPI from "@/hooks/useContactAPI";

export default async function ContactsPage() {
  const { fetchContactList } = useContactAPI();

  return (
    <main>
      <ContactList contacts={fetchContactList()} />
    </main>
  );
}
