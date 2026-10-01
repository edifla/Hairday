export type Appointment = {
    id: string;
    clientName: string;
    date: string;
    time: string;
};

export type AppointmentDetails = Omit<Appointment, "id">;