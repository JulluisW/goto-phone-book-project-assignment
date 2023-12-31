import { css } from "@emotion/css";
import { css as cssR } from "@emotion/react";

export const global_style = cssR`
* {
  font-family: 'Open Sans', sans-serif;
}
`;

export const header_style = css`
  width: 100%;
  display: flex;
  margin: 0;
  justify-content: space-between;
`;

export const add_button_style = css`
  border: none;
  background-color: transparent;
  font-size: 40px;
  font-weight: 600;
  cursor: pointer;
`;

export const favourite_scroller_container_style = css`
  overflow-x: scroll;
  display: flex;
  gap: 10px;
  padding: 0 0 10px 0;
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #818080;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #616060;
  }
`;

export const favourite_item_container_style = css`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const favourite_contact_image_style = css`
  border-radius: 50%;
  height: 60px;
  width: 60px;
`;

export const favourite_contact_name_style = css`
  text-align: center;
  display: inline-block;
  width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10px;
  color: white;
  text-shadow: 3px 3px brown;
  font-weight: 600;
`;

export const contacts_scroller_container_style = css`
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100vh - 400px);
  padding: 0;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #818080;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #616060;
  }
`;

export const contacts_item_container_style = css`
  border-radius: 4px;
  padding: 5px 10px;
  list-style: none;
  // box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-bottom: 1px solid rgba(211, 211, 211, 0.425);
`;
