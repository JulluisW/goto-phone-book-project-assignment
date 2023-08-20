"use client";
import React, { useEffect, useState } from "react";
type Props = {
  contacts: [];
};

export function ContactList({ contacts }: Props) {
  const [contactList, setContactList] = useState([]);
  useEffect(() => {
    setContactList(contacts);
  }, [contacts]);

  return (
    <div>
      {contactList.map((contact: any) => (
        <li key={contact.id}>
          {contact.last_name} {contact.first_name} -{" "}
          {contact.phones.map((phone: { number: string }) => (
            <span key={phone.number}>- {phone.number}</span>
          ))}
        </li>
      ))}
    </div>
  );
}
