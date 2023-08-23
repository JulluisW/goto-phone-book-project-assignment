"use client";

//Styles
import * as styles from "./styles";

//Types
type Props = {
  first_name: String;
  last_name: String;
  phones: [
    {
      number: String;
    }
  ];
};

export function ContactCard({ props }: any) {
  //Functions

  return (
    <li className={styles.contact_card_container}>
      {props.last_name} {props.first_name}
      {console.log(props.phones)}
      {props.phones.map((phone: { number: any }) => (
        <span key={phone.number}>- {phone.number}</span>
      ))}
    </li>
  );
}
