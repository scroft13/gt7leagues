export const options2 = { style: 'currency', currency: 'USD' };
export const numberFormat2 = new Intl.NumberFormat('en-US', options2);

export class ApiError extends Error {
  constructor(
    public responseStatus: number,
    public message: string,
    public errors?: string[] | string,
    public fields?: Record<string, string>,
  ) {
    super(message);
  }
}

export type UserCar = {
  id: string;
  model: string;
  make: string;
  price: number;
};

export type UserInfo = {
  created_at: string;
  id: string;
  user_id: string;
  carsOwned: UserCar[];
  carsWanted: UserCar[];
};

export type Events = {
  id: number;
  start: Date;
  end: Date;
  title: string;
  extendedProps: object;
  display?: 'auto' | 'background';
  resourceIds?: number[];
  editable?: boolean;
  allDay?: boolean;
  backgroundColor: string;
};

export type PublicEvent = {
  id: number;
  startDate: Date;
  startTime: string;
  durationHrs: number;
  title: string;
  vehicleClass: string;
  doesRepeat: boolean;
  contactType: 'email' | 'discord';
  createdAt: Date;
  endDate?: Date;
  discordServer?: string;
  email?: string;
  eventInfo: string;
};
export type PublicServerEvent = {
  user_id: string | undefined;
  id: number;
  start_date: Date;
  start_time: string;
  duration_hrs: number;
  title: string;
  vehicle_class: string;
  does_repeat: boolean;
  contact_type: 'email' | 'discord';
  created_at: Date;
  end_date?: Date;
  discord_server?: string;
  email?: string;
  event_info: string;
};

export async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-cache',
  });
  if (response.ok) {
    return await response.json();
  } else if (response.status === 417) {
    const serverError = await response.json();
    throw new ApiError(response.status, serverError.message, serverError.errors);
  } else {
    throw new ApiError(response.status, response.statusText);
  }
}
