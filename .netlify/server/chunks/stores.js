import { w as writable } from "./index2.js";
import { d as db, s as supabase } from "./db.js";
import { s as setContext, j as getContext } from "./index3.js";
function arrayOfUndefs(length) {
  return new Array(length).fill(void 0);
}
function compactArray(arr) {
  return arr.filter((obj) => obj !== void 0 && obj !== null);
}
const key = {};
function getFormContext() {
  return getContext(key);
}
function setFormContext(context) {
  return setContext(key, context);
}
function extractWrapperProps(props) {
  const _class = props["class"];
  return typeof _class === "string" ? { class: _class } : {};
}
function generateDatesWithInterval(startDate, endDate, intervalDays) {
  const dates = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + intervalDays);
  }
  return dates;
}
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function generateRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const brightness = 0.299 * red + 0.587 * green + 0.114 * blue;
  const isLightColor = brightness > 100;
  const adjustValue = isLightColor ? -50 : 50;
  const adjustedRed = clamp(red + adjustValue, 0, 255);
  const adjustedGreen = clamp(green + adjustValue, 0, 255);
  const adjustedBlue = clamp(blue + adjustValue, 0, 255);
  return `rgba(${adjustedRed}, ${adjustedGreen}, ${adjustedBlue}, .8)`;
}
const toasts = writable([]);
await updateEvents();
async function updateEvents() {
  const tempEventList = [];
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  await db.publicEventsList.all().then((eventList) => {
    if (eventList) {
      eventList.forEach((publicEvent) => {
        const formattedDateString = publicEvent.start_date?.toLocaleString("en-US", {
          timeZone: timezone
        }), endDateTime = new Date(publicEvent.start_date);
        endDateTime.setHours(endDateTime.getHours() + publicEvent.duration_hrs);
        const modifiedDateString = endDateTime.toString();
        if (!publicEvent.is_series) {
          tempEventList.push({
            id: publicEvent.id,
            start: new Date(formattedDateString),
            end: new Date(modifiedDateString),
            title: publicEvent.singleEventName ?? "" + publicEvent.leagueName,
            extendedProps: {
              leagueLink: publicEvent.leagueLink
            },
            backgroundColor: generateRandomColor()
          });
        } else {
          if (publicEvent.end_date) {
            const datesArray = generateDatesWithInterval(
              new Date(publicEvent.start_date),
              new Date(publicEvent.end_date),
              7
            );
            const eventsArray = datesArray.map((publicEventArrayItem, i) => {
              const formattedDateString2 = publicEventArrayItem.toLocaleString("en-US", {
                timeZone: timezone
              }), endDateTime2 = new Date(publicEventArrayItem);
              endDateTime2.setHours(endDateTime2.getHours() + publicEvent.duration_hrs);
              const modifiedDateString2 = endDateTime2.toString();
              return {
                id: publicEvent.id + i,
                start: new Date(formattedDateString2),
                end: new Date(modifiedDateString2),
                title: publicEvent.series + " - " + publicEvent.leagueName,
                extendedProps: {
                  leagueLink: publicEvent.leagueLink
                },
                backgroundColor: generateRandomColor()
              };
            });
            eventsArray.forEach((x) => {
              tempEventList.push(x);
            });
          }
        }
      });
    }
  });
  return tempEventList;
}
const userStore = await getCurrentUser();
async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();
  if (data.session) {
    const user = await supabase.auth.getUser();
    const data2 = await supabase.from("userInfo").select("*").eq("user_id", user.data.user?.id).single();
    if (data2.data) {
      return data2.data;
    } else {
      return null;
    }
  } else
    return null;
}
const storedUser = writable(userStore);
export {
  setFormContext as a,
  arrayOfUndefs as b,
  compactArray as c,
  extractWrapperProps as e,
  getFormContext as g,
  storedUser as s,
  toasts as t
};
