import { createClient } from "@supabase/supabase-js";
import { w as writable } from "./index2.js";
const supabase = createClient(
  "https://zruzsnhrgeffpppcliqf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpydXpzbmhyZ2VmZnBwcGNsaXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1ODgzOTYsImV4cCI6MjAxNjE2NDM5Nn0.E32Q5p61P_31o6iQbbIrXN_DMdnp7wVX-1bC1x7QThM"
);
const userStore = writable();
let user_id;
let user_email;
supabase.auth.getSession().then(({ data }) => {
  userStore.set(data.session?.user);
  user_id = data.session?.user.id;
  user_email = data.session?.user.email ?? "";
});
supabase.auth.onAuthStateChange((event, session) => {
  if (event == "SIGNED_IN" && session) {
    userStore.set(session.user);
  } else if (event == "SIGNED_OUT") {
    userStore.set(null);
  }
});
supabase.realtime;
const db = {
  get user() {
    return userStore;
  },
  signIn(email) {
    return supabase.auth.signInWithOtp({ email });
  },
  signOut() {
    return supabase.auth.signOut();
  },
  users: {
    async all() {
      const { data } = await supabase.from("userInfo").select();
      return data;
    },
    async create(email) {
      const { data } = await supabase.from("userInfo").insert({ user_id, email }).select().maybeSingle();
      return data;
    },
    async currentUsername() {
      const data = await supabase.from("userInfo").select("*").eq("user_id", user_id);
      if (data.data)
        return data.data[0].username;
    }
  },
  publicEventsList: {
    async all() {
      const { data } = await supabase.from("publicEvents").select();
      return data;
    },
    async insert(publicEvent) {
      const publicDbEvent = {
        user_id,
        created_at: publicEvent.createdAt,
        start_date: publicEvent.startDate,
        start_time: publicEvent.startTime,
        duration_hrs: publicEvent.durationHrs,
        title: publicEvent.title,
        vehicle_class: publicEvent.vehicleClass,
        is_series: publicEvent.isSeries,
        id: publicEvent.id,
        end_date: publicEvent.endDate,
        discord_server: publicEvent.discordServer,
        email: publicEvent.email,
        event_info: publicEvent.eventInfo,
        series: publicEvent.series,
        track: publicEvent.track,
        leagueName: publicEvent.leagueName
      };
      const data = await supabase.from("publicEvents").insert([publicDbEvent]);
      return data;
    }
  },
  leagues: {
    async all() {
      const { data } = await supabase.from("leagues").select();
      return data;
    },
    async create(league) {
      league.ownerId ? await supabase.from("leagues").insert(league).eq("ownerId", league.ownerId) : null;
    },
    async find(shortenedName) {
      const { data: leagues, error } = await supabase.from("leagues").select("*").eq("shortenedName", shortenedName);
      if (!error) {
        if (leagues.length != 0)
          return leagues;
      }
    },
    async findOwned() {
      const { data: leagues } = await supabase.from("leagues").select("*").eq("ownerId", user_id);
      return leagues;
    },
    async findJoined() {
      const { data: leagues } = await supabase.from("leagues").select("*").contains("memberIds", [user_email]);
      return leagues;
    },
    async join(shortenedName) {
      const { data: leagues } = await supabase.from("leagues").update({
        memberIds: [user_email]
      }).eq("shortenedName", shortenedName);
      return leagues;
    },
    async addSingleEvent(event, shortenedName) {
      const data = await supabase.from("leagues").update({
        singleEvents: [event]
      }).eq("shortenedName", shortenedName);
      return data;
    },
    async addSeries(event, shortenedName) {
      const data = await supabase.from("leagues").update({
        seriesEvents: [event]
      }).eq("shortenedName", shortenedName);
      return data;
    }
  }
};
export {
  db as d,
  supabase as s
};
