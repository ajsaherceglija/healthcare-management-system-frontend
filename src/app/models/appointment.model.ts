
export interface AppointmentDto {
  aid: number;
  patientId: number;
  doctorId: number;
  room: number;
  note: string;
  date: Date;
  time: string;
  status: string;
}

export interface DoctorAppointmentsView {
  requested: AppointmentDto[];
  upcoming: AppointmentDto[];
}

export const MOCK_APPOINTMENTS: AppointmentDto[] = [
  {
    aid: 1,
    patientId: 123,
    doctorId: 456,
    room: 0,
    status: 'upcoming',
    note: 'Available on Monday.',
    date: new Date(),
    time: ''
  },
  {
    aid: 2,
    patientId: 123,
    doctorId: 456,
    room: 0,
    note: 'Afternoons on Thursday.',
    date: new Date(),
    time: '',
    status: 'upcoming'
  },
  {
    aid: 3,
    patientId: 103,
    doctorId: 202,
    room: 0,
    note: 'Evenings on Friday.',
    date: new Date(),
    time: '',
    status: 'upcoming'
  }
];
