export type UserRole = 'doctor' | 'patient';

export interface User {
  uid: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  DOB: Date;
  gender: string;
  blood_group: string;
  last_visit?: string;
  department?: string;
  work_start?: string;
  work_end?: string;
  role: UserRole;
}

export const MOCK_USERS: User[] = [
  {
    uid: 123,
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    password: 'password123',
    phone: '+387 33 975 002',
    address: 'Hrasnička cesta 3a',
    city: 'Sarajevo',
    DOB: new Date('1985-01-01'),
    gender: 'Male',
    blood_group: 'A+',
    last_visit: '2024-02-15',
    role: 'patient'
  },
  {
    uid: 456,
    name: 'Dr. Jane Smith',
    email: 'jane.smith@hospital.com',
    password: 'password456',
    phone: '+387 33 975 003',
    address: 'Medical Center St 1',
    city: 'Sarajevo',
    DOB: new Date('1980-05-15'),
    gender: 'Female',
    blood_group: 'B+',
    department: 'Cardiology',
    work_start: '09:00',
    work_end: '17:00',
    role: 'doctor'
  }
];
