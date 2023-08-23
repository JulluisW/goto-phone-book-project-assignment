"use client";

import { useRouter } from "next/navigation";

//Components
import { Avatar, Col, Rate } from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

//Styles
import * as styles from "./styles";
import * as global_styles from "@/components/globalStyle";

//Hooks
import useContactAPI from "@/hooks/useContactAPI";

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

export async function ContactCard({ props }: any) {
  //Constants
  const router = useRouter();
  const { fetchContactList, deleteContact } = useContactAPI();

  //Functions
  const onHandleEditContact = (id: number) => {
    router.push(`/contacts/edit/${id}`);
  };

  const onHandleDeleteContact = async (id: number) => {
    try {
      const data = await deleteContact(id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Col xs={24} sm={12} md={8} lg={6} xl={6} xxl={6}>
      <div className={styles.contact_card_container}>
        <Avatar className={global_styles.avatar_style} size={40}>
          <span className={global_styles.avatar_title_style}>
            {props.last_name[0]?.toUpperCase()}
            {props.first_name[0]?.toUpperCase()}
          </span>
        </Avatar>
        <div className={styles.contact_card_description_container}>
          <span
            style={{
              display: "inline-block",
              width: "100px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "green",
              fontSize: "12px",
            }}
          >
            {props.last_name} {props.first_name}
          </span>
          {props.phones.length !== 0 ? (
            <span>{props.phones[0]?.number}</span>
          ) : null}
        </div>
        <Rate
          style={{
            marginLeft: "auto",
          }}
          count={1}
          // value={1}
        />
        {props.phones.length === 0 ? (
          <Avatar className={global_styles.avatar_style} size={40}>
            <PlusOutlined
              style={{
                color: "white",
              }}
            />
          </Avatar>
        ) : (
          <Avatar
            className={global_styles.edit_icon_style}
            size={40}
            onClick={() => onHandleEditContact(props.id)}
          >
            <EditOutlined
              style={{
                color: "white",
              }}
            />
          </Avatar>
        )}
        <Avatar
          onClick={() => onHandleDeleteContact(props.id)}
          className={global_styles.delete_icon_style}
          size={40}
        >
          <DeleteOutlined />
        </Avatar>
      </div>
    </Col>
  );
}
