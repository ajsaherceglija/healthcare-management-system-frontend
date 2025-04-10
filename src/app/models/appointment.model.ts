export interface Appointment {
  aid: number;
  patientId: number;
  doctorId: number;
  doctor: string;
  patient: string;
  date: string;
  time: string;
  department: string;
  room: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    aid: 1,
    patientId: 123,
    doctorId: 456,
    doctor: 'Jane Smith',
    patient: 'John Doe',
    date: '2025-03-08',
    time: '18:00',
    department: 'Cardiology',
    room: '3B',
    status: 'upcoming'
  },
  {
    aid: 2,
    patientId: 123,
    doctorId: 456,
    doctor: 'Jane Smith',
    patient: 'John Doe',
    date: '2025-03-08',
    time: '19:00',
    department: 'Cardiology',
    room: '3B',
    status: 'upcoming'
  }
];
