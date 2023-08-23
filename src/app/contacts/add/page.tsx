//API
import { ContactForm } from "@/components";

//Components

//Styles
import * as styles from "./styles";

export default async function AddContactPage() {
  //Constants
  return (
    <main>
      <div className={styles.add_contact_title}>ADD CONTACTS</div>
      <ContactForm type="add" datas={null} />
    </main>
  );
}
