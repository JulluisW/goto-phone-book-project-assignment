//Components
import { ContactList } from "@/components";

//Hooks
import useContactAPI from "@/hooks/useContactAPI";

export default async function ContactsPage() {
  //Constants
  const { fetchContactList, fetchPaginationData } = useContactAPI();

  return (
    <main>
      <ContactList
        paging={await fetchPaginationData()}
        contacts={await fetchContactList(1)}
      />
    </main>
  );
}
