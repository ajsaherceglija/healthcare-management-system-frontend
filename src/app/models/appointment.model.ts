export interface Appointment {
  aid: number;
  patientId: number;
  doctorId: number;
  room: number;
  note: string;
  doctor: string;
  patient: string;
  date: Date;
  time: string;
  department: string;
  status: string;
}

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    aid: 1,
    patientId: 123,
    doctorId: 456,
    doctor: 'Jane Smith',
    patient: 'John Doe',
    department: 'Cardiology',
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
    doctor: 'Jane Smith',
    patient: 'John Doe',
    department: 'Cardiology',
    room: 0,
    note: 'Afternoons on Thursday.',
    date: new Date(),
    time: '',
    status: 'pending'
  },
  {
    aid: 3,
    patientId: 103,
    doctorId: 202,
    doctor: 'Jane Smith',
    patient: 'John Doe',
    department: 'Cardiology',
    room: 0,
    note: 'Evenings on Friday.',
    date: new Date(),
    time: '',
    status: 'pending'
  }
];
