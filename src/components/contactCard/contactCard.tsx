"use client";

import { useRouter } from "next/navigation";

//Components
import { Avatar, Col, Rate } from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";

//Styles
import * as styles from "./styles";
import * as global_styles from "@/styles/globalStyle";

//Hooks

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
  //Constants
  const router = useRouter();

  //Functions
  const onHandleEditContact = (id: number) => {
    router.push(`/contacts/edit/${id}`);
  };

  return (
    <Col xs={24} sm={24} md={12} lg={8} xl={8} xxl={8}>
      <div className={styles.contact_card_container}>
        <Avatar className={global_styles.avatar_style} size={40}>
          <span className={global_styles.avatar_title_style}>
            {props.last_name[0]?.toUpperCase()}
            {props.first_name[0]?.toUpperCase()}
          </span>
        </Avatar>
        <div className={styles.contact_card_description_container}>
          <span>
            {props.last_name} {props.first_name}
          </span>

          <span className={styles.contact_card_span}>
            {props.phones.length !== 0
              ? `Phone: ${props.phones[0]?.number}`
              : "="}
          </span>
        </div>

        {props.phones.length === 0 ? (
          <Avatar className={global_styles.add_number_icon_style} size={40}>
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
          onClick={async () => await props.onHandleDeleteContact(props.id)}
          className={global_styles.delete_icon_style}
          size={40}
        >
          <DeleteOutlined />
        </Avatar>
        <Rate
          count={1}
          onChange={() => {
            props.setFavourites((prev: any) => {
              let newDatas = [];
              if (prev.some((data: any) => data.id == props.id)) {
                newDatas = prev.filter(
                  (prevData: any) => prevData.id !== props.id
                );
              } else {
                newDatas = [
                  ...prev,
                  {
                    id: props.id,
                    first_name: props.first_name,
                    last_name: props.last_name,
                  },
                ];
              }
              props.updateFavouriteCache(newDatas);
              props.forceUpdate();

              return newDatas;
            });
          }}
          value={props.is_fav ? 1 : 0}
        />
      </div>
    </Col>
  );
}
