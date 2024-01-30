import { d as db } from "../../chunks/db.js";
async function load() {
  const username = await db.users.currentUsername();
  console.log(username);
  if (username) {
    return {
      username
    };
  } else
    return {
      username: null
    };
}
export {
  load
};
