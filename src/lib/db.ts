import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import type { LeagueEvent, League, ServerEvent, LeagueSeries } from './shared';

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
  users: {
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
      }
    },
  },

  publicEventsList: {
    async all() {
      const { data } = await supabase.from('publicEvents').select();
      return data;
    },
    async insert(publicEvent: LeagueEvent) {
      const publicDbEvent: ServerEvent = {
        user_id: user_id,
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
        leagueName: publicEvent.leagueName,
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
    async find(shortenedName: string) {
      const { data: leagues, error } = await supabase
        .from('leagues')
        .select('*')
        .eq('shortenedName', shortenedName);
      if (!error) {
        if (leagues.length != 0) return leagues;
      }
    },
    async findOwned() {
      const { data: leagues } = await supabase.from('leagues').select('*').eq('ownerId', user_id);

      return leagues;
    },
    async findJoined() {
      const { data: leagues } = await supabase
        .from('leagues')
        .select('*')
        .contains('memberIds', [user_email]);
      return leagues;
    },
    async join(shortenedName: string) {
      const { data: leagues } = await supabase
        .from('leagues')
        .update({
          memberIds: [user_email],
        })
        .eq('shortenedName', shortenedName);

      return leagues;
    },
    async addSingleEvent(event: LeagueEvent, shortenedName: string) {
      const data = await supabase
        .from('leagues')
        .update({
          singleEvents: [event],
        })
        .eq('shortenedName', shortenedName);

      return data;
    },
    async addSeries(event: LeagueSeries, shortenedName: string) {
      const data = await supabase
        .from('leagues')
        .update({
          seriesEvents: [event],
        })
        .eq('shortenedName', shortenedName);

      return data;
    },
  },
};
