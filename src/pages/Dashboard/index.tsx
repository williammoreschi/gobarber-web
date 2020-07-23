import React, { useCallback, useState } from 'react';
import { FiPower, FiClock } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import logo from '../../assets/logo.svg';
import {
  Container,
  Headar,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';
import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = useCallback((day: Date, modifires: DayModifiers) => {
    if (modifires.available) {
      setSelectedDate(day);
    }
  }, []);
  const { signOut, user } = useAuth();
  return (
    <Container>
      <Headar>
        <HeaderContent>
          <img src={logo} alt="Gobarber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Seja Bem vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Headar>

      <Content>
        <Schedule>
          <h1>Horários Agendados</h1>
          <p>
            <span>Hoje</span>
            <span>dia 06</span>
            <span>Seguda-feira</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/2512512?v=4"
                alt="William Moreschi"
              />
              <strong>William Moreschi</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/2512512?v=4"
                  alt="William Moreschi"
                />
                <strong>William Moreschi</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                11:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/2512512?v=4"
                  alt="William Moreschi"
                />
                <strong>William Moreschi</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                16:00
              </span>
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/2512512?v=4"
                  alt="William Moreschi"
                />
                <strong>William Moreschi</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysLong={[
              'Domingo',
              'Segunda',
              'Terça',
              'Quarta',
              'Quinta',
              'Sexta',
              'Sábado',
            ]}
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
