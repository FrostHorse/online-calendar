export interface Calendar {
  _id: string;
  name: string;
  ownerId: string;
  appointmentIds: string[];
  userIds: string[];
}
