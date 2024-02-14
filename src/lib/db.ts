import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import type { LeagueEvent, League, ServerEvent, LeagueSeries, Post } from './shared';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
const userStore = writable();

let user_id: string | undefined;
let user_email: string;

supabase.auth.getSession().then(({ data }) => {
  userStore.set(data.session?.user);
  user_id = data.session?.user.id;
  user_email = data.session?.user.email ?? '';
});

supabase.auth.onAuthStateChange((event, session) => {
  if (event == 'SIGNED_IN' && session) {
    userStore.set(session.user);
  } else if (event == 'SIGNED_OUT') {
    userStore.set(null);
  }
});

export const realTimeEvents = supabase.realtime;

export default {
  get user() {
    return userStore;
  },
  signIn(email: string) {
    return supabase.auth.signInWithOtp({ email });
  },
  signOut() {
    return supabase.auth.signOut();
  },
  currentUser: {
    async all() {
      const { data } = await supabase.from('userInfo').select();
      return data;
    },
    async create(email: string, input_id: string) {
      const { data } = await supabase
        .from('userInfo')
        .insert({ user_id: input_id, email: email })
        .select()
        .maybeSingle();
      return data;
    },
    async currentUsername(id: string): Promise<string> {
      const data = await supabase.from('userInfo').select('*').eq('user_id', id);
      if (data.data && data.data.length >= 1) {
        return data.data[0].username;
      } else {
        return '';
      }
    },
    async checkIfUserExistsInDb(id: string): Promise<boolean> {
      const data = await supabase.from('userInfo').select('*').eq('user_id', id);
      if (data.data && data.data.length >= 1) {
        return true;
      } else {
        return false;
      }
    },
    async setUsername(username: string) {
      const user = await supabase.auth.getUser();
      const id = user.data.user?.id;
      const response = await supabase
        .from('userInfo')
        .update({ username: username })
        .match({ user_id: id });
      return response;
    },
    async getUsernameList() {
      const data = await supabase.from('userInfo').select('*');
      if (data.data) {
        const usernameList: (string | null)[] = data.data?.map(
          (userInfo: {
            user_id: string;
            created_at: Date;
            email: string;
            username: string | null;
          }) => {
            return userInfo.username;
          },
        );
        return usernameList;
      } else return;
    },
    async getUserInfo(userId: string) {
      const response = await supabase
        .from('userInfo')
        .select('*')
        .match({ user_id: userId })
        .single();

      return response;
    },
    async getUserPic(username: string) {
      const response = await supabase
        .from('userInfo')
        .select('imageUrl')
        .match({ username: username })
        .single();
      return response;
    },
    async setUserPic(url: string, user_id: string) {
      const response = await supabase
        .from('userInfo')
        .update({ imageUrl: url })
        .eq('user_id', user_id);
      return response;
    },
  },

  publicEventsList: {
    async all() {
      const { data } = await supabase.from('publicEvents').select();
      return data;
    },
    async insert(publicEvent: LeagueEvent, userId: string) {
      const publicDbEvent: ServerEvent = {
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
        leagueLink: publicEvent.leagueLink,
      };
      const data = await supabase.from('publicEvents').insert([publicDbEvent]);
      return data;
    },
  },
  leagues: {
    async all() {
      const { data } = await supabase.from('leagues').select();
      return data;
    },
    async create(league: League) {
      league.ownerId
        ? await supabase.from('leagues').insert(league).eq('ownerId', league.ownerId)
        : null;
    },
    async find(leagueLink: string) {
      const { data: leagues, error } = await supabase
        .from('leagues')
        .select('*')
        .eq('leagueLink', leagueLink);
      if (!error) {
        if (leagues.length != 0) return leagues;
      }
    },
    async findOwned(id: string) {
      const { data: leagues } = await supabase.from('leagues').select('*').eq('ownerId', id);

      return leagues;
    },
    async findJoined(username: string, userId: string) {
      const { data: leagues } = await supabase.from('leagues').select('*');
      const leaguesJoined: League[] = [];
      leagues?.forEach((league: League) => {
        league.members.forEach((member) => {
          if (member.username === username && league.ownerId != userId) {
            leaguesJoined.push(league);
          }
        });
      });
      return leaguesJoined;
    },

    async join(leagueLink: string, username: string, role: 'Manager' | 'Racer') {
      let members: { username: string; role: 'Manager' | 'Racer' }[] = [];
      await supabase
        .from('leagues')
        .select('*')
        .eq('leagueLink', leagueLink)
        .single()
        .then(
          (data) => {
            members = data.data.members;
          },
          (error) => {
            return error;
          },
        );
      members?.push({ username: username, role: role });
      const { data: leagues } = await supabase
        .from('leagues')
        .update({
          members: members,
        })
        .eq('leagueLink', leagueLink);
      return leagues;
    },
    async addSingleEvent(event: LeagueEvent, leagueLink: string) {
      let events: LeagueEvent[] = [];
      await supabase
        .from('leagues')
        .select('*')
        .eq('leagueLink', leagueLink)
        .single()
        .then(
          (data) => {
            events = data.data.singleEvents;
          },
          (error) => {
            return error;
          },
        );
      events.push(event);
      const data = await supabase
        .from('leagues')
        .update({
          singleEvents: events,
        })
        .eq('leagueLink', leagueLink);

      return data;
    },
    async addSeries(event: LeagueSeries, leagueLink: string) {
      let series: LeagueSeries[] = [];
      await supabase
        .from('leagues')
        .select('*')
        .eq('leagueLink', leagueLink)
        .single()
        .then(
          (data) => {
            series = data.data.seriesEvents;
          },
          (error) => {
            return error;
          },
        );
      series.push(event);
      const data = await supabase
        .from('leagues')
        .update({
          seriesEvents: series,
        })
        .eq('leagueLink', leagueLink);

      return data;
    },
    async addPost(leagueId: string, post: Post) {
      let posts: Post[] = [];
      await supabase
        .from('leagues')
        .select('*')
        .eq('id', leagueId)
        .single()
        .then(
          (data) => {
            posts = data.data?.posts;
          },
          (error) => {
            return error;
          },
        );
      posts.push(post);
      const { data: leagues } = await supabase
        .from('leagues')
        .update({
          posts: posts,
        })
        .eq('id', leagueId);
      return leagues;
    },
  },
};
