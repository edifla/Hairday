import type { Appointment } from "@/types/appointment";
import "./index.css";

type AgendamentosProps = {
    appointments: Appointment[];
    date: string;
    onDelete: (id: string) => void;
    onDateChange: (date: string) => void;
};

const periods = [
    { id: "morning", label: "Manhã", start: 9, end: 12, icon: "morning" },
    { id: "afternoon", label: "Tarde", start: 13, end: 18, icon: "afternoon" },
    { id: "evening", label: "Noite", start: 19, end: 21, icon: "evening" },
] as const;

const Agendamentos = ({ appointments, date, onDelete, onDateChange }: AgendamentosProps) => {
    return (
        <div className="schedule">
            <header className="scheduleHeader">
                <div className="scheduleIntro">
                    <h2>Sua agenda</h2>
                    <p>Consulte os seus cortes de cabelo agendados por dia</p>
                </div>
                <label className="scheduleDateControl" htmlFor="scheduleDate">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="3.5" y="5" width="17" height="16" rx="2" />
                        <path d="M7.5 3v4M16.5 3v4M4 9h16" />
                    </svg>
                    <input
                        id="scheduleDate"
                        type="date"
                        lang="pt-BR"
                        value={date}
                        onChange={(event) => onDateChange(event.target.value)}
                    />
                    <svg className="scheduleDateChevron" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="m7 10 5 5 5-5" />
                    </svg>
                </label>
            </header>

            <div className="periodList">
                {periods.map((period) => {
                    const periodAppointments = appointments
                        .filter((appointment) => {
                            const hour = Number(appointment.time.slice(0, 2));
                            return hour >= period.start && hour <= period.end;
                        })
                        .sort((first, second) => first.time.localeCompare(second.time));

                    return (
                        <section className="periodSection" key={period.id}>
                            <header className="periodHeader">
                                <h3>
                                    <svg className="periodIcon" viewBox="0 0 24 24" aria-hidden="true">
                                        {period.icon === "morning" && <path d="M3 18h18M5 15a7 7 0 0 1 14 0M12 3v3m-8 1 2 2m14-2-2 2M2 12h3m14 0h3" />}
                                        {period.icon === "afternoon" && <path d="M7 17a4 4 0 1 1 3.6-5.7A5 5 0 1 1 17 19H7m1-15v2m-5 1 1.5 1.5M2 13h2" />}
                                        {period.icon === "evening" && <path d="M19 15.5A8 8 0 0 1 8.5 5 8 8 0 1 0 19 15.5ZM16 4v4m-2-2h4m2 6v3m-1.5-1.5h3" />}
                                    </svg>
                                    {period.label}
                                </h3>
                                <span>{period.start}h-{period.end}h</span>
                            </header>

                            {periodAppointments.length === 0 ? (
                                <p className="emptyPeriod">
                                    Nenhum agendamento para este período
                                </p>
                            ) : (
                                <ul className="appointmentList">
                                    {periodAppointments.map((appointment) => (
                                        <li className="appointmentRow" key={appointment.id}>
                                            <time className="appointmentTime">{appointment.time}</time>
                                            <span className="appointmentClient">{appointment.clientName}</span>
                                            <button
                                                type="button"
                                                className="deleteButton"
                                                aria-label={`Excluir agendamento de ${appointment.clientName} às ${appointment.time}`}
                                                title="Excluir agendamento"
                                                onClick={() => onDelete(appointment.id)}
                                            >
                                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                                    <path d="M4 7h16M10 11v6m4-6v6M5 7l1 14h12l1-14M9 7V4h6v3" />
                                                </svg>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    );
                })}
            </div>
        </div>
    );
};

export default Agendamentos;
