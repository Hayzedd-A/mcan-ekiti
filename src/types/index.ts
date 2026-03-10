export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
}

export interface Event {
  id: string;
  date: string;
  day: string;
  month: string;
  dayOfWeek: string;
  title: string;
  time: string;
  location: string;
}

export interface Executive {
  id: string;
  name: string;
  position: string;
  image: string;
}

export interface PrayerTime {
  name: string;
  time: string;
  icon: string;
}
