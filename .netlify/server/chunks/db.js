import { createClient } from "@supabase/supabase-js";
import { w as writable } from "./index2.js";
const supabase = createClient(
  "https://zruzsnhrgeffpppcliqf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpydXpzbmhyZ2VmZnBwcGNsaXFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1ODgzOTYsImV4cCI6MjAxNjE2NDM5Nn0.E32Q5p61P_31o6iQbbIrXN_DMdnp7wVX-1bC1x7QThM"
);
const userStore = writable();
supabase.auth.getSession().then(({ data }) => {
  userStore.set(data.session?.user);
  data.session?.user.id;
  data.session?.user.email ?? "";
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
  currentUser: {
    async all() {
      const { data } = await supabase.from("userInfo").select();
      return data;
    },
    async create(email, input_id) {
      const { data } = await supabase.from("userInfo").insert({ user_id: input_id, email }).select().maybeSingle();
      return data;
    },
    async currentUsername(id) {
      const data = await supabase.from("userInfo").select("*").eq("user_id", id);
      if (data.data && data.data.length >= 1) {
        return data.data[0].username;
      } else {
        return "";
      }
    },
    async checkIfUserExistsInDb(id) {
      const data = await supabase.from("userInfo").select("*").eq("user_id", id);
      if (data.data && data.data.length >= 1) {
        return true;
      } else {
        return false;
      }
    },
    async setUsername(username) {
      const user = await supabase.auth.getUser();
      const id = user.data.user?.id;
      const response = await supabase.from("userInfo").update({ username }).match({ user_id: id });
      return response;
    },
    async getUsernameList() {
      const data = await supabase.from("userInfo").select("*");
      if (data.data) {
        const usernameList = data.data?.map(
          (userInfo) => {
            return userInfo.username;
          }
        );
        return usernameList;
      } else
        return;
    },
    async getUserInfo(userId) {
      const response = await supabase.from("userInfo").select("*").match({ user_id: userId }).single();
      return response;
    },
    async getUserPic(username) {
      const response = await supabase.from("userInfo").select("imageUrl").match({ username }).single();
      return response;
    },
    async setUserPic(url, user_id2) {
      const response = await supabase.from("userInfo").update({ imageUrl: url }).eq("user_id", user_id2);
      return response;
    }
  },
  publicEventsList: {
    async all() {
      const { data } = await supabase.from("publicEvents").select();
      return data;
    },
    async insert(publicEvent, userId) {
      const publicDbEvent = {
        user_id: userId,
        created_at: publicEvent.createdAt,
        start_date: publicEvent.startDate,
        start_time: publicEvent.startTime,
        duration_hrs: publicEvent.durationHrs,
        title: publicEvent.title,
        vehicle_class: publicEvent.vehicleClass,
        is_series: publicEvent.isSeries,
        id: publicEvent.id,
        end_date: publicEvent.endDate,
        event_info: publicEvent.eventInfo,
        series: publicEvent.series,
        track: publicEvent.track,
        leagueName: publicEvent.leagueName,
        singleEventName: publicEvent.singleEventTitle,
        leagueLink: publicEvent.leagueLink
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
    async find(leagueLink) {
      const { data: leagues, error } = await supabase.from("leagues").select("*").eq("leagueLink", leagueLink);
      if (!error) {
        if (leagues.length != 0)
          return leagues;
      }
    },
    async findOwned(id) {
      const { data: leagues } = await supabase.from("leagues").select("*").eq("ownerId", id);
      return leagues;
    },
    async findJoined(username, userId) {
      const { data: leagues } = await supabase.from("leagues").select("*");
      const leaguesJoined = [];
      leagues?.forEach((league) => {
        league.members.forEach((member) => {
          if (member.username === username && league.ownerId != userId) {
            leaguesJoined.push(league);
          }
        });
      });
      return leaguesJoined;
    },
    async join(leagueLink, username, role) {
      let members = [];
      await supabase.from("leagues").select("*").eq("leagueLink", leagueLink).single().then(
        (data) => {
          members = data.data.members;
        },
        (error) => {
          return error;
        }
      );
      members?.push({ username, role });
      const { data: leagues } = await supabase.from("leagues").update({
        members
      }).eq("leagueLink", leagueLink);
      return leagues;
    },
    async addSingleEvent(event, leagueLink) {
      let events = [];
      await supabase.from("leagues").select("*").eq("leagueLink", leagueLink).single().then(
        (data2) => {
          events = data2.data.singleEvents;
        },
        (error) => {
          return error;
        }
      );
      events.push(event);
      const data = await supabase.from("leagues").update({
        singleEvents: events
      }).eq("leagueLink", leagueLink);
      return data;
    },
    async addSeries(event, leagueLink) {
      let series = [];
      await supabase.from("leagues").select("*").eq("leagueLink", leagueLink).single().then(
        (data2) => {
          series = data2.data.seriesEvents;
        },
        (error) => {
          return error;
        }
      );
      series.push(event);
      const data = await supabase.from("leagues").update({
        seriesEvents: series
      }).eq("leagueLink", leagueLink);
      return data;
    },
    async addPost(leagueId, post) {
      let posts = [];
      await supabase.from("leagues").select("*").eq("id", leagueId).single().then(
        (data) => {
          posts = data.data?.posts;
        },
        (error) => {
          return error;
        }
      );
      posts.push(post);
      const { data: leagues } = await supabase.from("leagues").update({
        posts
      }).eq("id", leagueId);
      return leagues;
    }
  }
};
export {
  db as d,
  supabase as s
};
