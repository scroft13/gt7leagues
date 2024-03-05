import { d as db } from "../../chunks/db.js";
async function load() {
  const data = await db.currentUser.getUsernameList();
  let usernameList;
  if (data) {
    usernameList = data.map((x) => {
      if (x) {
        return x;
      } else
        return "";
    });
  }
  console.log(usernameList);
  return {
    usernameList
  };
}
export {
  load
};
