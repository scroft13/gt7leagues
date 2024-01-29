import { createClient } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import type { LeagueEvent, League, ServerEvent, UserCar } from './shared';

import { goto } from '$app/navigation';

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
  createUser: {
    async all() {
      const { data } = await supabase.from('userInfo').select();
      return data;
    },
    async create(email: string) {
      console.log(email);
      const { data } = await supabase
        .from('userInfo')
        .insert({ user_id, email: email, leagues: [] })
        .select()
        .maybeSingle();

      return data;
    },
  },
  ownedCarList: {
    async update(carList: UserCar[]) {
      user_id
        ? await supabase
            .from('userInfo')
            .update({
              ownedCarList: [...carList],
            })
            .eq('user_id', user_id)
        : null;
    },
  },
  wantedCarList: {
    async update(carList: UserCar[]) {
      user_id
        ? await supabase
            .from('userInfo')
            .update({
              wantedCarList: [...carList],
            })
            .eq('user_id', user_id)
        : null;
    },
  },
  publicEventsList: {
    async all() {
      const { data } = await supabase.from('publicEvents').select();
      return data;
    },
    async insert(publicEvent: LeagueEvent) {
      // endTimeDate = new Date(publicEvent.start_date),
      // endTime = new Date(endTimeDate.setHours(endHours, endMins))

      const publicDbEvent: ServerEvent = {
        user_id: user_id,
        created_at: publicEvent.createdAt,
        start_date: publicEvent.startDate,
        start_time: publicEvent.startTime,
        duration_hrs: publicEvent.durationHrs,
        title: publicEvent.title,
        vehicle_class: publicEvent.vehicleClass,
        does_repeat: publicEvent.doesRepeat,
        contact_type: publicEvent.contactType,
        id: publicEvent.id,
        end_date: publicEvent.endDate,
        discord_server: publicEvent.discordServer,
        email: publicEvent.email,
        event_info: publicEvent.eventInfo,
        series: publicEvent.series,
        track: publicEvent.track,
      };
      user_id ? await supabase.from('publicEvents').insert([publicDbEvent]) : null;
    },
  },
  leagues: {
    async all() {
      const { data } = await supabase.from('leagues').select();
      return data;
    },
    async create(league: League) {
      console.log(league.ownerId);
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
      return goto('/league/' + shortenedName + '/noLeague');
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
  },
};
