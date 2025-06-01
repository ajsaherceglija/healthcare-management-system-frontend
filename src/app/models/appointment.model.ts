
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


