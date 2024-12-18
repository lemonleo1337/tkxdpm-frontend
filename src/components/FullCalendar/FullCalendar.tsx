import timeGridPlugin from '@fullcalendar/timegrid';
import viLocale from '@fullcalendar/core/locales/vi';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { FC } from 'react';

export interface FullCalendarProps {
    className?: string;
    events?: any;
    eventClick?: any;
}

const Calendar: FC<FullCalendarProps> = ({
    className = "",
    events,
    eventClick }) => {
    return (
        <div className={`full-calendar ${className}`}>
            <FullCalendar
                plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={viLocale}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                buttonText={{
                    today: 'Hôm nay',
                    month: 'Tháng',
                    week: 'Tuần',
                    day: 'Ngày'
                }}
                events={events}
                editable={false}
                selectable={false}
                selectMirror={false}
                dayMaxEvents={true}
                eventClick={eventClick}
            />
        </div>
    );
}
export default Calendar;