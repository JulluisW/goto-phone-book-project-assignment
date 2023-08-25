//API
import { ContactForm } from "@/templates";

//Hooks
import useContactAPI from "@/hooks/useContactAPI";

//Styles
// import * as styles from "./styles";
import * as global_style from "@/styles/globalStyle";
import { redirect } from "next/navigation";

export default async function EditContactPage(props: any) {
  //Constants
  // const { fetchContactByPk } = useContactAPI();

  // const current_user = await fetchContactByPk(Number(props.params.id));

  // if (current_user === null) {
  //   redirect("/contacts");
  // }

  return (
    <main>
      <h1 className={global_style.title_header_style}>EDIT CONTACTS</h1>
      <ContactForm type="edit" datas={null} current_id={props.params.id} />
    </main>
  );
}
