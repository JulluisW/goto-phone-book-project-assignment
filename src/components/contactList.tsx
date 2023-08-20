"use client";
import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
type Props = {
  contacts: [];
};

export function ContactList({ contacts }: Props) {
  const [contactList, setContactList] = useState([]);
  useEffect(() => {
    setContactList(contacts);
  }, [contacts]);

  return (
    <ul
      className={css`
        padding: 0;
      `}
    >
      {contactList.map((contact: any) => (
        <li
          key={contact.id}
          className={css`
            font-size: 24px;
            border-radius: 4px;
            list-style: none;
            &:hover {
              color: white;
            }
          `}
        >
          {contact.last_name} {contact.first_name}
          {contact.phones.map((phone: { number: string }) => (
            <span key={phone.number}>- {phone.number}</span>
          ))}
        </li>
      ))}
    </ul>
  );
}
