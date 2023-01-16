export interface Info {
  tag: { [key: string]: Array<string> };
  region: string;
  startDate: string;
  endDate: string;
  money: number;
}

export interface Plan {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  title: string;
  tag: { [key: string]: string };
  start: string;
  end: string;
  city: string;
  destination: string | null;
  totalCost: string | null;
  dayPerCost: string | null;
  travels?: Array<Travel>;
}

export interface Travel {
  destination: Destination;
  id: number;
  startDay: string;
}

export interface Destination {
  contentid: string;
  contenttypeid: string;
  firstimage: string;
  mapx: string;
  mapy: string;
  title: string;
}
