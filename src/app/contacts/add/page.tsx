//API
import { ContactForm } from "@/components";

//Components

export default async function AddContactPage() {
  //Constants
  return (
    <main>
      <div>ADD CONTACTS</div>
      <ContactForm type="add" />
    </main>
  );
}
