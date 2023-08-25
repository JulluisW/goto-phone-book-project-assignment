//API
import { ContactForm } from "@/templates";

//Components

//Styles
import * as global_style from "@/styles/globalStyle";

export default async function AddContactPage() {
  //Constants
  return (
    <main>
      <h1 className={global_style.title_header_style}>ADD CONTACTS</h1>
      <ContactForm type="add" datas={null} current_id={null} />
    </main>
  );
}
