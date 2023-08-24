//API
import { ContactForm } from "@/components";

//Hooks
import useContactAPI from "@/hooks/useContactAPI";

//Styles
import * as styles from "./styles";
import { redirect } from "next/navigation";

export default async function EditContactPage(props: any) {
  //Constants
  const { fetchContactByPk } = useContactAPI();

  const current_user = await fetchContactByPk(Number(props.params.id));
  console.log(Number(props.params.id));

  console.log(current_user);

  if (current_user === null) {
    redirect("/contacts");
  }

  return (
    <main>
      <div className={styles.add_contact_title}>EDIT CONTACTS</div>
      <ContactForm type="edit" datas={current_user} />
    </main>
  );
}
