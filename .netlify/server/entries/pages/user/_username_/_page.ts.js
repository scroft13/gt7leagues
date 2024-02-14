import "../../../../chunks/db.js";
import { s as storedUser } from "../../../../chunks/stores.js";
import { e as error } from "../../../../chunks/index.js";
async function load({ params }) {
  if (params.username) {
    let isCurrentUser = false;
    let storedUserUsername = "";
    storedUser.subscribe((user) => {
      if (user) {
        storedUserUsername = user.username;
      }
    });
    if (storedUserUsername === params.username) {
      isCurrentUser = true;
    }
    return {
      isCurrentUser
    };
  }
  error(404, "Not found");
}
export {
  load
};
