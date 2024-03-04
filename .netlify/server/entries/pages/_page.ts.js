import { d as db } from "../../chunks/db.js";
async function load() {
  const data = await db.currentUser.getUsernameList();
  const usernameList = data?.map((x) => {
    if (x) {
      return x;
    } else
      return "";
  });
  return {
    usernameList
  };
}
export {
  load
};
