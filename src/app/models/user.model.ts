export type UserRole = 'doctor' | 'patient';

export interface UserDto {
  uid: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  dob: Date;
  gender: string;
  blood_group: string;
  role: UserRole;
  jmbg: string;
}


export const MOCK_USERS: UserDto[] = [
  {
    uid: 123,
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    password: 'password123',
    phone: '+387 33 975 002',
    address: 'Hrasnička cesta 3a',
    city: 'Sarajevo',
    dob: new Date('1985-01-01'),
    gender: 'Male',
    blood_group: 'A+',
    role: 'patient',
    jmbg: '1111111111'
  },
  {
    uid: 456,
    name: 'Dr. Jane Smith',
    email: 'jane.smith@hospital.com',
    password: 'password456',
    phone: '+387 33 975 003',
    address: 'Medical Center St 1',
    city: 'Sarajevo',
    dob: new Date('1980-05-15'),
    gender: 'Female',
    blood_group: 'B+',
    role: 'doctor',
    jmbg: '2222222'
  }
];

